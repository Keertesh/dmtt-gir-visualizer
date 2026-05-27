"use client";

import { useState } from "react";
import {
  BAHAMAS_LEGISLATION,
  BAHAMAS_COMPLIANCE_TIMELINE,
  BAHAMAS_KEY_PROVISIONS,
  BAHAMAS_SECTORS,
  BAHAMAS_COMPLIANCE_CHECKLIST,
  BAHAMAS_ETR_SCENARIOS,
  BAHAMAS_MACRO,
  BAHAMAS_COMPARISON,
  BAHAMAS_OECD_LINKS,
} from "@/data/bahamas-dmtt";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, ComposedChart, Area, Line,
} from "recharts";
import {
  CheckCircle2, AlertTriangle, Clock, ExternalLink, ChevronDown,
  ChevronUp, Info, Scale, Building2, TrendingUp, FileText,
  ShieldCheck, Layers, Calculator, BookOpen, AlertCircle,
} from "lucide-react";

const SECTION_TABS = [
  { id: "overview", label: "Overview" },
  { id: "legislation", label: "Legislation" },
  { id: "taxpayers", label: "Potential Taxpayers" },
  { id: "scenarios", label: "ETR Scenarios" },
  { id: "checklist", label: "Compliance Checklist" },
  { id: "comparison", label: "Peer Comparison" },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
  low: "#6b7280",
};

const IMPACT_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high: "#f59e0b",
  medium: "#3b82f6",
};

const TYPE_COLORS: Record<string, string> = {
  legislative: "#8b5cf6",
  effective: "#10b981",
  compliance: "#f59e0b",
  filing: "#3b82f6",
  payment: "#ef4444",
  relief: "#06b6d4",
};

export default function BahamasTab() {
  const [section, setSection] = useState("overview");
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [expandedProvision, setExpandedProvision] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (step: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      next.has(step) ? next.delete(step) : next.add(step);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0c1a3a 0%, #1a1040 40%, #0c2a1a 100%)",
          border: "1px solid #1e3a5f",
          borderRadius: 14,
          padding: "24px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #10b98108, transparent)", pointerEvents: "none" }} />
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>🇧🇸</div>
            <div>
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h2 className="text-2xl font-bold text-white">The Bahamas DMTT</h2>
                <span style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>
                  ✓ Enacted Jan 2025
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                The Bahamas enacted a <strong className="text-emerald-400">Qualified Domestic Minimum Top-up Tax (QDMTT)</strong> effective
                January 1, 2025 — a historic shift from its traditional zero corporate income tax regime. As an OECD Inclusive Framework
                member since 2018, the Bahamas adopted DMTT to retain top-up tax revenue domestically rather than ceding it to
                parent jurisdictions via IIR/UTPR.
              </p>
              <div className="flex gap-4 mt-3 flex-wrap text-xs text-slate-400">
                <span>📋 {BAHAMAS_LEGISLATION.actName}</span>
                <span>🏛️ {BAHAMAS_LEGISLATION.adminAuthority}</span>
                <span>📅 Effective: {BAHAMAS_LEGISLATION.effectiveDate}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            <MiniStat label="Min. Tax Rate" value="15%" color="#10b981" />
            <MiniStat label="Revenue Threshold" value="€750M" color="#3b82f6" />
            <MiniStat label="Prior CIT Rate" value="0%" color="#ef4444" />
            <MiniStat label="Est. Annual Revenue" value={`$${BAHAMAS_MACRO.estimatedDMTTRevenue.mid}M`} color="#8b5cf6" />
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ borderBottom: "1px solid #1e293b" }}>
        <div className="flex gap-0 overflow-x-auto">
          {SECTION_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSection(t.id)}
              className="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                color: section === t.id ? "#fff" : "#64748b",
                borderBottom: section === t.id ? "2px solid #10b981" : "2px solid transparent",
                background: "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      {section === "overview" && (
        <div className="space-y-6">
          {/* Key stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "MNE Groups Estimated in Scope", value: `~${BAHAMAS_MACRO.mneGroupsEstimated}`, icon: Building2, color: "#8b5cf6" },
              { label: "Registered Companies (IBCs etc.)", value: `${BAHAMAS_MACRO.registeredCompanies.toLocaleString()}+`, icon: FileText, color: "#3b82f6" },
              { label: "Est. DMTT Revenue (Mid)", value: `$${BAHAMAS_MACRO.estimatedDMTTRevenue.mid}M`, icon: TrendingUp, color: "#10b981" },
              { label: "GDP (2023)", value: `$${BAHAMAS_MACRO.gdp2023}B`, icon: Scale, color: "#f59e0b" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#0f172a", border: `1px solid ${s.color}25`, borderRadius: 10, padding: 16 }}>
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  <span className="text-slate-400 text-xs">{s.label}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Why DMTT matters for Bahamas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" /> Why the Bahamas Enacted DMTT
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { title: "Revenue Sovereignty", desc: "Without DMTT, parent jurisdictions (UK, Germany, Japan etc.) collect top-up tax on Bahamas profits via IIR. QDMTT keeps that revenue in Nassau." },
                  { title: "OECD Compliance", desc: "As an Inclusive Framework member since 2018, Bahamas faces reputational and blacklist risks for non-adoption of minimum standards." },
                  { title: "Competitive Neutrality", desc: "With Bermuda, Jersey, Guernsey, Isle of Man and UAE all adopting QDMTT, Bahamas risked competitive disadvantage by being alone in ceding top-up revenue." },
                  { title: "Investment Preservation", desc: "QDMTT status protects existing Bahamas investment structures from being unwound due to Pillar Two 'leakage' concerns of MNE tax teams." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">{item.title}: </span>
                      <span className="text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue estimate chart */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Estimated DMTT Revenue Range
              </h3>
              <p className="text-slate-400 text-xs mb-4">Annual USD millions — OECD/IMF scenario estimates</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={[
                    { scenario: "Conservative", value: BAHAMAS_MACRO.estimatedDMTTRevenue.low, color: "#6b7280" },
                    { scenario: "Base Case", value: BAHAMAS_MACRO.estimatedDMTTRevenue.mid, color: "#10b981" },
                    { scenario: "Optimistic", value: BAHAMAS_MACRO.estimatedDMTTRevenue.high, color: "#3b82f6" },
                  ]}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="scenario" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                    formatter={(v: any) => [`$${v}M USD`, "Est. Revenue"]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {[
                      { color: "#6b7280" },
                      { color: "#10b981" },
                      { color: "#3b82f6" },
                    ].map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="text-xs text-slate-500 mt-2">Context: Bahamas total tax revenue ~$2.2B (VAT + duties). DMTT adds material new stream.</div>
            </div>
          </div>

          {/* Timeline preview */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" /> Key Dates &amp; Deadlines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {BAHAMAS_COMPLIANCE_TIMELINE.map((item, i) => (
                <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 14, borderLeft: `3px solid ${TYPE_COLORS[item.type] || "#334155"}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: TYPE_COLORS[item.type], fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                      {item.type}
                    </span>
                  </div>
                  <div className="text-white font-medium text-sm mb-0.5">{item.event}</div>
                  <div className="text-slate-400 text-xs mb-1">{item.date}</div>
                  <div className="text-slate-500 text-xs">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LEGISLATION ── */}
      {section === "legislation" && (
        <div className="space-y-6">
          {/* Act details */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" /> Legislative Framework
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Act Name", value: BAHAMAS_LEGISLATION.actName },
                { label: "Enactment Date", value: BAHAMAS_LEGISLATION.enactmentDate },
                { label: "Effective Date", value: BAHAMAS_LEGISLATION.effectiveDate },
                { label: "Administering Authority", value: BAHAMAS_LEGISLATION.adminAuthority },
                { label: "Approach", value: BAHAMAS_LEGISLATION.approachType },
                { label: "OECD Framework", value: BAHAMAS_LEGISLATION.oecdFramework },
                { label: "Minimum Tax Rate", value: `${BAHAMAS_LEGISLATION.minimumRate}%` },
                { label: "Revenue Threshold", value: `€${BAHAMAS_LEGISLATION.revenueThreshold}M consolidated group revenue` },
                { label: "Inclusive Framework Joined", value: BAHAMAS_LEGISLATION.inclusiveFrameworkJoined },
                { label: "Historic CIT Rate", value: `${BAHAMAS_LEGISLATION.historicCIT}% (zero)` },
              ].map((row, i) => (
                <div key={i} style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px" }} className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 text-xs flex-shrink-0">{row.label}</span>
                  <span className="text-white text-xs font-medium text-right">{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1040", border: "1px solid #2d1b69", borderRadius: 10, padding: 16 }}>
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{BAHAMAS_LEGISLATION.notes}</p>
              </div>
            </div>
          </div>

          {/* Key provisions */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Key Provisions &amp; Technical Rules
            </h3>
            <div className="space-y-2">
              {BAHAMAS_KEY_PROVISIONS.map((prov, i) => {
                const isExpanded = expandedProvision === prov.title;
                return (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 10, border: "1px solid #334155", overflow: "hidden" }}>
                    <button
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setExpandedProvision(isExpanded ? null : prov.title)}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${IMPACT_COLORS[prov.impactLevel] || "#334155"}20`, color: IMPACT_COLORS[prov.impactLevel] || "#94a3b8", border: `1px solid ${IMPACT_COLORS[prov.impactLevel] || "#334155"}40` }}
                        >
                          {prov.impactLevel.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{prov.category}</span>
                        <span className="text-white font-medium text-sm">{prov.title}</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-slate-700 pt-3 space-y-2">
                        <p className="text-slate-300 text-sm leading-relaxed">{prov.detail}</p>
                        <div className="text-slate-500 text-xs font-mono">{prov.source}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* OECD links */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-emerald-400" /> Official Sources &amp; References
            </h3>
            <div className="space-y-2">
              {BAHAMAS_OECD_LINKS.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg group transition-colors"
                  style={{ background: "#1e293b", border: "1px solid #334155" }}>
                  <span className="text-slate-200 text-sm group-hover:text-emerald-400 transition-colors">{link.title}</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── POTENTIAL TAXPAYERS ── */}
      {section === "taxpayers" && (
        <div className="space-y-4">
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> Potential DMTT Taxpayer Sectors
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              MNE groups with Bahamas constituent entities and consolidated group revenue ≥ €750M are within scope.
              Click any sector to expand DMTT analysis. Risk level reflects estimated DMTT exposure per entity.
            </p>

            {/* Risk summary chart */}
            <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div className="text-white font-medium text-sm mb-3">Sector Risk Overview</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={BAHAMAS_SECTORS.map((s) => ({
                    sector: s.sector.split(" ")[0] + (s.sector.split(" ")[1] ? " " + s.sector.split(" ")[1].slice(0, 5) : ""),
                    entities: parseInt(s.entityCount.replace(/[^0-9]/g, "")) || 50,
                    color: s.riskColor,
                  }))}
                  margin={{ top: 5, right: 10, left: 10, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="sector" tick={{ fill: "#64748b", fontSize: 9 }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                    formatter={(v: any) => [`${v}+`, "Est. Entities"]}
                  />
                  <Bar dataKey="entities" radius={[4, 4, 0, 0]}>
                    {BAHAMAS_SECTORS.map((s, i) => <Cell key={i} fill={s.riskColor} opacity={0.8} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sector cards */}
            <div className="space-y-3">
              {BAHAMAS_SECTORS.map((sector, i) => {
                const isExpanded = expandedSector === sector.sector;
                return (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 12, border: `1px solid ${sector.riskColor}30`, overflow: "hidden" }}>
                    <button
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setExpandedSector(isExpanded ? null : sector.sector)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-2xl flex-shrink-0">{sector.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-semibold text-sm">{sector.sector}</span>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${sector.riskColor}20`, color: sector.riskColor, border: `1px solid ${sector.riskColor}40` }}
                            >
                              {sector.riskLevel} Risk
                            </span>
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5 truncate">{sector.entityCount} entities · {sector.estimatedExposure}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                        <span className="text-slate-400 text-xs hidden sm:block">{isExpanded ? "Hide" : "View Analysis"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-700 p-5 space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">{sector.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Key entity types */}
                          <div style={{ background: "#0f172a", borderRadius: 10, padding: 16 }}>
                            <div className="text-white font-medium text-sm mb-2 flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Representative Entity Types
                            </div>
                            <ul className="space-y-1.5">
                              {sector.keyEntities.map((entity, j) => (
                                <li key={j} className="text-slate-400 text-xs flex items-start gap-2">
                                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">›</span>
                                  {entity}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* DMTT considerations */}
                          <div style={{ background: "#0f172a", borderRadius: 10, padding: 16 }}>
                            <div className="text-white font-medium text-sm mb-2 flex items-center gap-2">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> DMTT Considerations
                            </div>
                            <ul className="space-y-1.5">
                              {sector.dmttConsiderations.map((c, j) => (
                                <li key={j} className="text-slate-400 text-xs flex items-start gap-2">
                                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div style={{ background: "#1a1040", border: "1px solid #2d1b69", borderRadius: 8, padding: 12 }}>
                          <span className="text-violet-400 text-xs font-semibold">ESTIMATED EXPOSURE: </span>
                          <span className="text-slate-300 text-xs">{sector.estimatedExposure}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── ETR SCENARIOS ── */}
      {section === "scenarios" && (
        <div className="space-y-6">
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" /> GloBE ETR Scenarios for Bahamas Entities
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Illustrative DMTT calculations for typical Bahamas entity types. SBIE uses 2025 rates (10% payroll, 8% assets).
              All figures in € millions. For illustration only — not tax advice.
            </p>

            {BAHAMAS_ETR_SCENARIOS.map((sc, i) => {
              const sbie = sc.sbiePayroll + sc.sbieAssets;
              const adjustedIncome = Math.max(0, sc.globeIncome - sbie);
              const etr = adjustedIncome > 0 ? (sc.coveredTaxes / adjustedIncome) * 100 : 0;
              const topUp = Math.max(0, 15 - etr);
              const dmttLiability = adjustedIncome * (topUp / 100);
              const deMinimis = sc.annualRevenue < 10 && sc.globeIncome < 1;
              const finalLiability = deMinimis ? 0 : dmttLiability;

              return (
                <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${finalLiability > 0 ? "#ef4444" : "#10b981"}30` }}>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">{sc.entityType}</span>
                      {deMinimis && (
                        <span style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140", borderRadius: 99, padding: "2px 8px", fontSize: 10 }}>
                          De Minimis — No DMTT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">ETR:</span>
                      <span className={`font-bold text-lg ${etr >= 15 || deMinimis ? "text-emerald-400" : "text-red-400"}`}>
                        {deMinimis ? "N/A" : `${etr.toFixed(1)}%`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                    {[
                      { label: "Revenue", value: `€${sc.annualRevenue}M` },
                      { label: "GloBE Income", value: `€${sc.globeIncome}M` },
                      { label: "SBIE (Payroll)", value: `€${sc.sbiePayroll}M` },
                      { label: "SBIE (Assets)", value: `€${sc.sbieAssets}M` },
                      { label: "Total SBIE", value: `€${sbie.toFixed(2)}M`, highlight: true },
                      { label: "Adj. GloBE Income", value: `€${adjustedIncome.toFixed(2)}M`, highlight: true },
                      { label: "Covered Taxes", value: `€${sc.coveredTaxes}M` },
                      { label: "Top-Up Rate", value: `${topUp.toFixed(1)}%`, alert: topUp > 0 },
                    ].map((field, j) => (
                      <div key={j} style={{ background: "#0f172a", borderRadius: 8, padding: "8px 12px" }}>
                        <div className="text-slate-500 text-xs mb-0.5">{field.label}</div>
                        <div className={`font-mono font-medium ${field.alert ? "text-red-400" : field.highlight ? "text-white" : "text-slate-300"}`}>
                          {field.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DMTT liability */}
                  <div className={`rounded-lg p-3 flex items-center justify-between ${finalLiability > 0 ? "bg-red-950/50 border border-red-500/30" : "bg-emerald-950/50 border border-emerald-500/30"}`}>
                    <div className="text-sm text-slate-300">
                      {deMinimis ? "✓ De minimis exclusion applies" : finalLiability > 0 ? `✗ DMTT top-up required at ${topUp.toFixed(1)}%` : "✓ No DMTT — ETR meets 15%"}
                    </div>
                    <div className={`text-2xl font-bold ${finalLiability > 0 ? "text-red-400" : "text-emerald-400"}`}>
                      €{finalLiability.toFixed(2)}M
                    </div>
                  </div>

                  <div className="text-slate-500 text-xs mt-3 border-t border-slate-700 pt-3 leading-relaxed">
                    📝 {sc.notes}
                  </div>
                </div>
              );
            })}

            {/* Comparison bar chart */}
            <div style={{ background: "#1e293b", borderRadius: 12, padding: 20 }}>
              <div className="text-white font-medium mb-3 text-sm">DMTT Liability Comparison Across Scenario Types</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={BAHAMAS_ETR_SCENARIOS.map((sc) => {
                    const sbie = sc.sbiePayroll + sc.sbieAssets;
                    const adjIncome = Math.max(0, sc.globeIncome - sbie);
                    const etr = adjIncome > 0 ? (sc.coveredTaxes / adjIncome) * 100 : 0;
                    const topUp = Math.max(0, 15 - etr);
                    const liability = (sc.annualRevenue < 10 && sc.globeIncome < 1) ? 0 : adjIncome * (topUp / 100);
                    return {
                      type: sc.entityType.split("(")[0].trim().split(" ").slice(0, 3).join(" "),
                      liability: parseFloat(liability.toFixed(2)),
                    };
                  })}
                  margin={{ top: 5, right: 10, left: 10, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                  <XAxis dataKey="type" tick={{ fill: "#64748b", fontSize: 9 }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={(v) => `€${v}M`} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} formatter={(v: any) => [`€${v}M`, "Est. DMTT"]} />
                  <Bar dataKey="liability" radius={[4, 4, 0, 0]} name="Est. DMTT">
                    {BAHAMAS_ETR_SCENARIOS.map((sc, i) => {
                      const sbie = sc.sbiePayroll + sc.sbieAssets;
                      const adjIncome = Math.max(0, sc.globeIncome - sbie);
                      const etr = adjIncome > 0 ? (sc.coveredTaxes / adjIncome) * 100 : 0;
                      const topUp = Math.max(0, 15 - etr);
                      const liability = (sc.annualRevenue < 10 && sc.globeIncome < 1) ? 0 : adjIncome * (topUp / 100);
                      return <Cell key={i} fill={liability > 0 ? "#ef4444" : "#10b981"} opacity={0.85} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPLIANCE CHECKLIST ── */}
      {section === "checklist" && (
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bahamas DMTT Compliance Checklist
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">Click items to mark complete. {checkedItems.size}/{BAHAMAS_COMPLIANCE_CHECKLIST.length} done.</p>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ background: "#1e293b", borderRadius: 99, height: 8, width: 160, overflow: "hidden" }}>
                <div style={{ background: "#10b981", height: "100%", width: `${(checkedItems.size / BAHAMAS_COMPLIANCE_CHECKLIST.length) * 100}%`, transition: "width 0.3s ease", borderRadius: 99 }} />
              </div>
              <span className="text-emerald-400 text-sm font-bold">{Math.round((checkedItems.size / BAHAMAS_COMPLIANCE_CHECKLIST.length) * 100)}%</span>
            </div>
          </div>

          {/* Group by category */}
          {["Scoping", "Registration", "Data Collection", "Safe Harbour", "Computation", "Filing", "Ongoing"].map((cat) => {
            const items = BAHAMAS_COMPLIANCE_CHECKLIST.filter((item) => item.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="mb-4">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{cat}</div>
                <div className="space-y-2">
                  {items.map((item, i) => {
                    const done = checkedItems.has(item.step);
                    return (
                      <div
                        key={i}
                        onClick={() => toggleCheck(item.step)}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all"
                        style={{ background: done ? "#0f2d1f" : "#1e293b", border: `1px solid ${done ? "#10b98140" : "#334155"}`, opacity: done ? 0.7 : 1 }}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${done ? "line-through text-slate-500" : "text-white"}`}>{item.task}</div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-slate-500 text-xs">📅 {item.deadline}</span>
                            <span
                              className="text-xs font-medium px-1.5 py-0.5 rounded"
                              style={{ background: `${PRIORITY_COLORS[item.priority]}20`, color: PRIORITY_COLORS[item.priority] }}
                            >
                              {item.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-4">
            ⚠️ This checklist is a general guide. Engage qualified Bahamas-licensed tax advisors and the Bahamas Revenue Commission directly for entity-specific compliance requirements.
          </div>
        </div>
      )}

      {/* ── PEER COMPARISON ── */}
      {section === "comparison" && (
        <div className="space-y-6">
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Bahamas vs Peer Zero-Tax Jurisdictions
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              How the Bahamas DMTT compares with other traditional zero-tax jurisdictions adopting Pillar Two.
            </p>

            {/* Chart */}
            <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={BAHAMAS_COMPARISON}
                  margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="jurisdiction" tick={{ fill: "#64748b", fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis domain={[0, 20]} tick={{ fill: "#64748b", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} formatter={(v: any) => [`${v}%`, ""]} />
                  <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="5 3" strokeWidth={2} label={{ value: "15% Global Min", fill: "#ef4444", fontSize: 10 }} />
                  <Bar dataKey="historicCIT" name="Historic CIT Rate" fill="#334155" opacity={0.8} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="afterDMTT" name="After DMTT / New Rate" fill="#10b981" opacity={0.85} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}>
                    {["Jurisdiction", "Historic CIT", "After DMTT", "Approach", "Effective Date"].map((h) => (
                      <th key={h} className="text-left p-3 text-slate-300 font-medium text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {BAHAMAS_COMPARISON.map((row, i) => {
                    const isBahamas = row.jurisdiction === "Bahamas";
                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: "1px solid #1e293b",
                          background: isBahamas ? "#0c1f0c" : i % 2 === 0 ? "transparent" : "#0f172a20",
                          border: isBahamas ? "1px solid #10b98140" : undefined,
                        }}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {isBahamas && <span className="text-lg">🇧🇸</span>}
                            <span className={`font-medium ${isBahamas ? "text-emerald-300" : "text-white"}`}>{row.jurisdiction}</span>
                            {isBahamas && <span style={{ background: "#10b98120", color: "#10b981", borderRadius: 99, padding: "1px 6px", fontSize: 9, border: "1px solid #10b98140" }}>THIS JURISD.</span>}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-red-400">{row.historicCIT}%</td>
                        <td className="p-3 font-mono" style={{ color: row.afterDMTT >= 15 ? "#10b981" : row.afterDMTT === 0 ? "#ef4444" : "#f59e0b" }}>
                          {row.afterDMTT}%
                        </td>
                        <td className="p-3 text-slate-400 text-xs">{row.approach}</td>
                        <td className="p-3 text-slate-400 text-xs">{row.effective}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic implications */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Strategic Implications for MNEs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIC_IMPLICATIONS.map((item, i) => (
                <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: `3px solid ${item.color}` }}>
                  <div className="text-white font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "10px 14px", border: `1px solid ${color}30`, minWidth: 110 }}>
      <div className="text-slate-400 text-xs mb-0.5">{label}</div>
      <div className="font-bold text-lg" style={{ color }}>{value}</div>
    </div>
  );
}

// ── Static content ──────────────────────────────────────────

const STRATEGIC_IMPLICATIONS = [
  {
    title: "Structure Review Required",
    color: "#ef4444",
    detail: "MNE groups with Bahamas holding companies, IP vehicles or financing SPVs should urgently review GloBE income and ETR per entity. Low-substance entities face full 15% top-up.",
  },
  {
    title: "QDMTT Safe Harbour Opportunity",
    color: "#10b981",
    detail: "Bahamas QDMTT status means top-up paid in Nassau is credited against IIR charged in parent jurisdiction. Groups choosing to pay Bahamas DMTT avoid parent-level top-up tax.",
  },
  {
    title: "Substance Investment Case",
    color: "#3b82f6",
    detail: "SBIE significantly reduces DMTT for entities with genuine local operations. Adding qualifying payroll and tangible assets in the Bahamas can materially reduce top-up liability.",
  },
  {
    title: "De Minimis Planning",
    color: "#f59e0b",
    detail: "Multiple Bahamas entities with <€10M revenue each may individually qualify for de minimis exclusion. Conversely, consolidating entities may inadvertently breach the threshold.",
  },
  {
    title: "Transitional Safe Harbour (2025–2027)",
    color: "#8b5cf6",
    detail: "Three-year CbCR safe harbour reduces Year 1–3 compliance burden dramatically. Prioritise getting CbCR data correctly structured — it directly determines DMTT liability for first 3 years.",
  },
  {
    title: "GIR Filing Coordination",
    color: "#06b6d4",
    detail: "If UPE is in a GIR exchange partner jurisdiction, the parent can file the Bahamas GIR centrally. Coordinate with group tax to avoid duplicate or missing filings.",
  },
];
