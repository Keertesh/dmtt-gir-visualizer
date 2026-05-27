"use client";
import { useState } from "react";
import { Calculator, Info, TrendingUp } from "lucide-react";

export default function DMTTCalculator() {
  const [revenue, setRevenue] = useState<string>("750");
  const [income, setIncome] = useState<string>("100");
  const [taxPaid, setTaxPaid] = useState<string>("10");
  const [payroll, setPayroll] = useState<string>("80");
  const [assets, setAssets] = useState<string>("200");
  const [year, setYear] = useState<string>("2026");

  const revNum = parseFloat(revenue) || 0;
  const incomeNum = parseFloat(income) || 0;
  const taxNum = parseFloat(taxPaid) || 0;
  const payrollNum = parseFloat(payroll) || 0;
  const assetsNum = parseFloat(assets) || 0;
  const yearNum = parseInt(year) || 2026;

  // Pillar Two SBIE calculation (substance-based income exclusion)
  // Phase-in rates per OECD model rules
  const payrollRate = yearNum <= 2025 ? 0.10 : yearNum <= 2026 ? 0.09 : yearNum <= 2027 ? 0.08 : yearNum <= 2028 ? 0.07 : yearNum <= 2029 ? 0.06 : 0.05;
  const assetRate = yearNum <= 2025 ? 0.08 : yearNum <= 2026 ? 0.07 : yearNum <= 2027 ? 0.07 : yearNum <= 2028 ? 0.06 : yearNum <= 2029 ? 0.06 : 0.05;

  const sbieAmount = payrollNum * payrollRate + assetsNum * assetRate;

  // Adjusted Covered Taxes (simplified)
  const adjustedTax = taxNum;

  // Globe Income
  const adjustedIncome = Math.max(0, incomeNum - sbieAmount);

  // Effective Tax Rate
  const etr = adjustedIncome > 0 ? (adjustedTax / adjustedIncome) * 100 : 0;

  // De Minimis check
  const deMinimisRevenue = revNum < 10; // < €10M revenue
  const deMinimisIncome = incomeNum < 1; // < €1M income
  const deMinimis = deMinimisRevenue && deMinimisIncome;

  // Top-up Tax
  const minimumRate = 15;
  const topUpRate = Math.max(0, minimumRate - etr);
  const dmttAmount = adjustedIncome * (topUpRate / 100);

  const isCompliant = etr >= 15 || deMinimis;

  return (
    <div className="bg-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-violet-500/20 rounded-lg">
          <Calculator className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">DMTT Top-Up Tax Estimator</h3>
          <p className="text-slate-400 text-sm">Simplified Pillar Two GloBE income calculation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inputs */}
        <div className="space-y-3">
          <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider">Inputs (€ Millions)</h4>

          <InputField
            label="Jurisdiction Revenue"
            value={revenue}
            onChange={setRevenue}
            hint="Total revenue in this jurisdiction"
          />
          <InputField
            label="GloBE Income"
            value={income}
            onChange={setIncome}
            hint="Adjusted pre-tax income (GloBE)"
          />
          <InputField
            label="Adjusted Covered Taxes"
            value={taxPaid}
            onChange={setTaxPaid}
            hint="Current + deferred taxes paid"
          />
          <InputField
            label="Qualifying Payroll"
            value={payroll}
            onChange={setPayroll}
            hint="Eligible employee payroll costs"
          />
          <InputField
            label="Qualifying Tangible Assets"
            value={assets}
            onChange={setAssets}
            hint="Net book value of tangible assets"
          />
          <div>
            <label className="text-slate-400 text-xs block mb-1">Fiscal Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider">Calculation Results</h4>

          <ResultCard label="SBIE Exclusion" value={`€${sbieAmount.toFixed(2)}M`} color="blue" hint={`${(payrollRate * 100).toFixed(0)}% payroll + ${(assetRate * 100).toFixed(0)}% assets`} />
          <ResultCard label="Adjusted GloBE Income" value={`€${adjustedIncome.toFixed(2)}M`} color="slate" />
          <ResultCard label="Effective Tax Rate (ETR)" value={`${etr.toFixed(2)}%`} color={etr >= 15 ? "green" : "red"} />
          <ResultCard label="Top-Up Rate Required" value={`${topUpRate.toFixed(2)}%`} color={topUpRate > 0 ? "amber" : "green"} />

          <div className={`rounded-xl p-4 border-2 ${isCompliant ? "bg-emerald-950/50 border-emerald-500/40" : "bg-red-950/50 border-red-500/40"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">DMTT Liability</span>
              {deMinimis && (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  De Minimis Applies
                </span>
              )}
            </div>
            <div className={`text-3xl font-bold ${isCompliant ? "text-emerald-400" : "text-red-400"}`}>
              {deMinimis ? "€0.00M" : `€${dmttAmount.toFixed(2)}M`}
            </div>
            <div className={`text-sm mt-1 ${isCompliant ? "text-emerald-500" : "text-red-500"}`}>
              {isCompliant
                ? deMinimis
                  ? "✓ De minimis exclusion applies — no DMTT due"
                  : "✓ ETR meets 15% minimum — no top-up required"
                : `✗ Top-up of ${topUpRate.toFixed(2)}% required to reach 15% minimum`}
            </div>
          </div>

          {/* SBIE phase-in info */}
          <div className="bg-slate-700/50 rounded-lg p-3 text-xs text-slate-400 space-y-1">
            <div className="font-medium text-slate-300 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> SBIE Phase-In Rates ({yearNum})
            </div>
            <div className="flex justify-between">
              <span>Payroll component:</span>
              <span className="text-blue-400">{(payrollRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Tangible assets component:</span>
              <span className="text-blue-400">{(assetRate * 100).toFixed(0)}%</span>
            </div>
            <div className="text-slate-500 mt-1">
              Rates phase down to 5% by 2033 per OECD Model Rules Art. 5.3
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-slate-500 border-t border-slate-700 pt-3">
        ⚠️ This is a simplified educational estimate only. Actual DMTT calculations require full GloBE computation
        per OECD Model Rules (2021) and local implementing legislation. Consult qualified tax advisors.
        Not valid for tax filing purposes.
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div>
      <label className="text-slate-400 text-xs block mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">€</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
          min="0"
          step="0.1"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">M</span>
      </div>
      {hint && <div className="text-slate-600 text-xs mt-0.5">{hint}</div>}
    </div>
  );
}

function ResultCard({ label, value, color, hint }: { label: string; value: string; color: string; hint?: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
    slate: "text-slate-300",
  };
  return (
    <div className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="text-slate-400 text-xs">{label}</div>
        {hint && <div className="text-slate-500 text-xs">{hint}</div>}
      </div>
      <div className={`font-bold text-lg ${colors[color] || "text-white"}`}>{value}</div>
    </div>
  );
}
