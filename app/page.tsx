"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Globe2, BarChart3, FileText, Calculator, BookOpen,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, Info,
  ExternalLink, ChevronRight, Building2, Scale, Layers, Anchor,
} from "lucide-react";
import {
  DMTT_COUNTRIES, GIR_REQUIREMENTS, PILLAR_TWO_TIMELINE,
  SAFE_HARBOUR_DATA, STATUS_LABELS,
} from "@/data/dmtt-data";
import StatusBadge from "@/components/StatusBadge";
import CountryTable from "@/components/CountryTable";
import DMTTCalculator from "@/components/DMTTCalculator";
import BahamasTab from "@/components/BahamasTab";
import {
  RegionStatusChart, ETRComparisonChart, GlobalStatusPie,
  GIRFilingChart, RevenueImpactChart,
} from "@/components/Charts";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: 360, background: "#0f172a", borderRadius: 12 }}>
      <div className="text-slate-500 text-sm">Loading map…</div>
    </div>
  ),
});

const TABS = [
  { id: "overview", label: "Overview", icon: Globe2 },
  { id: "countries", label: "Countries", icon: Building2 },
  { id: "gir", label: "GIR Data", icon: FileText },
  { id: "rates", label: "Tax Rates", icon: BarChart3 },
  { id: "calculator", label: "DMTT Calc", icon: Calculator },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "bahamas", label: "🇧🇸 Bahamas", icon: Anchor, highlight: true },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mapField, setMapField] = useState<"dmttStatus" | "girStatus" | "irmStatus" | "utprStatus">("dmttStatus");
  const [citData, setCitData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [apiSource, setApiSource] = useState<string>("");

  const enacted = DMTT_COUNTRIES.filter((c) => c.dmttStatus === "enacted").length;
  const draft = DMTT_COUNTRIES.filter((c) => c.dmttStatus === "draft").length;
  const pillarTwoAdopted = DMTT_COUNTRIES.filter((c) => c.pillarTwoAdopted).length;
  const totalRevenue = DMTT_COUNTRIES.reduce((s, c) => s + (c.estimatedRevenue || 0), 0);
  const below15 = DMTT_COUNTRIES.filter((c) => c.estimatedETR !== null && c.estimatedETR < 15).length;

  useEffect(() => {
    if (activeTab === "rates" && citData.length === 0) {
      setDataLoading(true);
      fetch("/api/oecd?dataset=cit_rates")
        .then((r) => r.json())
        .then((json) => {
          setApiSource(json.source);
          setCitData(json.data || []);
        })
        .catch(() => setApiSource("error"))
        .finally(() => setDataLoading(false));
    }
  }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", background: "#020817" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0f172a 100%)", borderBottom: "1px solid #1e293b" }}>
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", borderRadius: 12, padding: 10 }}>
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DMTT &amp; GIR Visualizer</h1>
                <p className="text-slate-400 text-sm">OECD Pillar Two Global Minimum Tax Tracker · Updated May 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2" style={{ background: "#10b98110", border: "1px solid #10b98130", borderRadius: 99, padding: "6px 12px" }}>
                <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                <span className="text-emerald-400 text-xs font-medium">Live OECD Data</span>
              </div>
              <a href="https://www.oecd.org/tax/beps/pillar-two-implementation.htm" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />OECD Source
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div style={{ background: "#0a0f1e", borderBottom: "1px solid #1e293b" }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <StatChip icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} value={enacted} label="Jurisdictions Enacted" color="#10b981" />
            <StatChip icon={<Clock className="w-4 h-4 text-amber-400" />} value={draft} label="In Draft/Consultation" color="#f59e0b" />
            <StatChip icon={<Globe2 className="w-4 h-4 text-blue-400" />} value={pillarTwoAdopted} label="Pillar Two Committed" color="#3b82f6" />
            <StatChip icon={<TrendingUp className="w-4 h-4 text-violet-400" />} value={`$${(totalRevenue / 1000).toFixed(0)}B`} label="Est. Annual Revenue" color="#8b5cf6" />
            <StatChip icon={<AlertTriangle className="w-4 h-4 text-red-400" />} value={below15} label="ETR Below 15% Min" color="#ef4444" />
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #1e293b", marginBottom: 24 }}>
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              const isHighlight = (tab as any).highlight;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
                  style={{
                    color: active ? "#fff" : isHighlight ? "#34d399" : "#94a3b8",
                    borderBottom: active ? `2px solid ${isHighlight ? "#10b981" : "#8b5cf6"}` : "2px solid transparent",
                    background: isHighlight && !active ? "#10b98108" : "transparent",
                  }}>
                  <Icon className="w-4 h-4" />{tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Info Banner */}
            <div style={{ background: "linear-gradient(135deg, #1a1040, #0f1f3d)", border: "1px solid #2d1b69", borderRadius: 12, padding: 20 }}>
              <div className="flex items-start gap-4">
                <div style={{ background: "#7c3aed20", border: "1px solid #7c3aed40", borderRadius: 10, padding: 10, flexShrink: 0 }}>
                  <Info className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">About DMTT &amp; GIR</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The <strong className="text-violet-300">Domestic Minimum Top-up Tax (DMTT)</strong> is a key component
                    of the OECD/G20 Pillar Two Global Minimum Tax framework, ensuring multinational enterprises (MNEs) pay
                    at least a <strong className="text-emerald-400">15% effective tax rate</strong> in every jurisdiction.
                    The <strong className="text-blue-300">Globe Information Return (GIR)</strong> is the standardized filing
                    mechanism collecting GloBE computation data. This tool tracks implementation across{" "}
                    {DMTT_COUNTRIES.length} jurisdictions using open OECD and World Bank data.
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-white font-semibold text-lg">Global Implementation Map</h2>
                <div className="flex gap-2 flex-wrap">
                  {(["dmttStatus", "girStatus", "irmStatus", "utprStatus"] as const).map((f) => (
                    <button key={f} onClick={() => setMapField(f)}
                      className="px-3 py-1 text-xs rounded-full font-medium transition-all"
                      style={{ background: mapField === f ? "#7c3aed" : "#1e293b", color: mapField === f ? "white" : "#94a3b8", border: `1px solid ${mapField === f ? "#7c3aed" : "#334155"}` }}>
                      {f.replace("Status", "").toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <WorldMap highlightField={mapField} />
              <p className="text-slate-500 text-xs mt-3">Hover any circle for details. Colors show implementation status. Source: OECD Pillar Two tracker (2025).</p>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-violet-400" />DMTT Status by Region</h3>
                <RegionStatusChart />
              </div>
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Layers className="w-4 h-4 text-violet-400" />Global DMTT Adoption</h3>
                <GlobalStatusPie />
              </div>
            </div>

            {/* Revenue */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-violet-400" />Estimated Annual DMTT Revenue (USD Millions)</h3>
              <p className="text-slate-400 text-xs mb-4">Top 12 jurisdictions. Source: OECD/IMF revenue impact estimates.</p>
              <RevenueImpactChart />
            </div>

            {/* Safe Harbours */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-violet-400" />Pillar Two Safe Harbours &amp; Exclusions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAFE_HARBOUR_DATA.map((sh, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, border: "1px solid #334155" }}>
                    <div className="flex items-start gap-3">
                      <div style={{ background: "#7c3aed20", borderRadius: 8, padding: 8, flexShrink: 0 }}>
                        <CheckCircle2 className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{sh.name}</div>
                        <div className="text-slate-400 text-xs mt-1">{sh.description}</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140", borderRadius: 99, padding: "2px 8px", fontSize: 10 }}>{sh.applicableYears}</span>
                          <span style={{ background: "#3b82f620", color: "#3b82f6", border: "1px solid #3b82f640", borderRadius: 99, padding: "2px 8px", fontSize: 10 }}>{sh.threshold}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COUNTRIES ── */}
        {activeTab === "countries" && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
            <h2 className="text-white font-semibold text-lg mb-1">Jurisdiction Tracker</h2>
            <p className="text-slate-400 text-sm mb-4">
              DMTT, GIR, IIR and UTPR status across {DMTT_COUNTRIES.length} jurisdictions. Click rows to expand legislative notes.
              Red ETR = below 15% minimum rate.
            </p>
            <CountryTable />
          </div>
        )}

        {/* ── GIR ── */}
        {activeTab === "gir" && (
          <div className="space-y-6">
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h2 className="text-white font-semibold text-lg mb-1 flex items-center gap-2"><FileText className="w-5 h-5 text-violet-400" />Globe Information Return (GIR) Requirements</h2>
              <p className="text-slate-400 text-sm mb-4">Filing requirements by jurisdiction. Source: OECD Administrative Guidance + local tax authority publications.</p>
              <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <h3 className="text-white font-medium mb-3 text-sm">GIR Feature Completeness by Jurisdiction</h3>
                <GIRFilingChart />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}>
                      {["Jurisdiction", "Filing Deadline", "First FY", "Local Filing", "Exchange", "XML", "Extension", "Non-Filing Penalty"].map((h) => (
                        <th key={h} className="text-left p-3 text-slate-300 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GIR_REQUIREMENTS.map((r, i) => (
                      <tr key={r.iso2} style={{ borderBottom: "1px solid #1e293b", background: i % 2 === 0 ? "transparent" : "#0f172a20" }}
                        className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3"><div className="flex items-center gap-2"><span className="text-lg">{getFlag(r.iso2)}</span><span className="text-white">{r.country}</span></div></td>
                        <td className="p-3 text-slate-300 text-xs">{r.filingDeadline}</td>
                        <td className="p-3"><span style={{ background: "#3b82f620", color: "#3b82f6", borderRadius: 99, padding: "2px 8px", fontSize: 11, border: "1px solid #3b82f640" }}>FY {r.firstFiscalYear}</span></td>
                        <td className="p-3 text-center">{r.localFilingRequired ? <CheckMark /> : <XMark />}</td>
                        <td className="p-3 text-center">{r.exchangePartner ? <CheckMark /> : <XMark />}</td>
                        <td className="p-3 text-center">{r.xmlSchema ? <CheckMark /> : <XMark />}</td>
                        <td className="p-3 text-center">{r.extensionAvailable ? <CheckMark /> : <XMark />}</td>
                        <td className="p-3 text-slate-400 text-xs">{r.penaltyForNonFiling}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-slate-500">All deadlines subject to change — verify with local counsel. Data as of May 2025.</div>
            </div>

            {/* GIR Fields */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-4">Key GIR Data Fields (OECD Model)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GIR_SECTIONS.map((section, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16 }}>
                    <div className="text-violet-400 font-medium text-sm mb-2">{section.title}</div>
                    <ul className="space-y-1">
                      {section.fields.map((f, j) => (
                        <li key={j} className="text-slate-400 text-xs flex items-start gap-1.5">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-slate-600 flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAX RATES ── */}
        {activeTab === "rates" && (
          <div className="space-y-6">
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h2 className="text-white font-semibold text-lg">Corporate Tax Rate Data</h2>
                  <p className="text-slate-400 text-sm">
                    OECD Corporate Income Tax rates via public SDMX API.{" "}
                    {apiSource === "oecd_api" && <span className="text-emerald-400">✓ Live OECD API</span>}
                    {apiSource === "fallback" && <span className="text-amber-400">⚡ Cached OECD data</span>}
                    {apiSource === "error" && <span className="text-red-400">⚠ Local fallback data</span>}
                  </p>
                </div>
                <div className="text-xs text-slate-500 rounded-lg px-3 py-2" style={{ background: "#1e293b", border: "1px solid #334155" }}>
                  Source: OECD SDMX API<br />
                  <code className="text-violet-400">sdmx.oecd.org/public/rest</code>
                </div>
              </div>
              {dataLoading ? (
                <div className="flex items-center justify-center h-64 text-slate-400">Fetching OECD data…</div>
              ) : (
                <>
                  <h3 className="text-slate-300 font-medium mb-3 text-sm">CIT Rate vs ETR vs 15% GloBE Minimum</h3>
                  <ETRComparisonChart />
                  {citData.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-slate-300 font-medium mb-3 text-sm">Statutory CIT Rates 2018–2023 (OECD Data)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}>
                              {["Country", "2018", "2020", "2022", "2023", "vs 15%"].map((h) => (
                                <th key={h} className={`p-2 font-medium text-slate-300 ${h !== "Country" ? "text-right" : "text-left"}`}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {citData.slice(0, 25).map((row: any, i: number) => {
                              const current = row.rate2023 ?? row.rate2022 ?? 0;
                              const gap = current - 15;
                              return (
                                <tr key={i} style={{ borderBottom: "1px solid #1e293b", background: i % 2 === 0 ? "transparent" : "#0f172a20" }}>
                                  <td className="p-2 text-white">{row.country}</td>
                                  <td className="p-2 text-right text-slate-400 font-mono">{row.rate2018}%</td>
                                  <td className="p-2 text-right text-slate-400 font-mono">{row.rate2020}%</td>
                                  <td className="p-2 text-right text-slate-400 font-mono">{row.rate2022}%</td>
                                  <td className="p-2 text-right text-white font-mono font-medium">{row.rate2023}%</td>
                                  <td className="p-2 text-right font-mono" style={{ color: gap >= 0 ? "#10b981" : "#ef4444" }}>
                                    {gap >= 0 ? "+" : ""}{gap.toFixed(1)}%
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-xs text-slate-500 mt-2">Statutory rates shown; effective rates differ. Source: OECD Corporate Tax Statistics (public).</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── CALCULATOR ── */}
        {activeTab === "calculator" && (
          <div className="space-y-6">
            <DMTTCalculator />
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-3">GloBE Computation Steps (Art. 5.1–5.3 Model Rules)</h3>
              <div className="space-y-3">
                {GLOBE_STEPS.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div style={{ background: "#7c3aed", color: "white", borderRadius: 99, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-slate-200 text-sm font-medium">{step.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h2 className="text-white font-semibold text-lg mb-6">Pillar Two Implementation Timeline</h2>
              <div className="relative pl-8">
                <div style={{ position: "absolute", left: 12, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #7c3aed, #1e293b)" }} />
                {PILLAR_TWO_TIMELINE.map((event, i) => (
                  <div key={i} className="relative mb-8">
                    <div style={{ position: "absolute", left: -20, top: 0, width: 16, height: 16, borderRadius: "50%", background: "#7c3aed", border: "3px solid #4c1d95" }} />
                    <div style={{ background: "#1e293b", borderRadius: 10, padding: 16, border: "1px solid #334155" }}>
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <span style={{ background: "#7c3aed20", color: "#a78bfa", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 600, border: "1px solid #7c3aed40" }}>{event.year}</span>
                        <span style={{ background: "#10b98120", color: "#10b981", borderRadius: 99, padding: "2px 8px", fontSize: 11, border: "1px solid #10b98140" }}>{event.countries} jurisdictions</span>
                      </div>
                      <div className="text-slate-200 font-medium text-sm">{event.event}</div>
                    </div>
                  </div>
                ))}
                <div className="relative mb-8">
                  <div style={{ position: "absolute", left: -20, top: 0, width: 16, height: 16, borderRadius: "50%", background: "#334155", border: "3px solid #1e293b" }} />
                  <div style={{ background: "#1a1040", borderRadius: 10, padding: 16, border: "1px dashed #4c1d95" }}>
                    <span style={{ background: "#7c3aed10", color: "#6b21a8", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 600, border: "1px dashed #4c1d95" }}>2027–2033</span>
                    <div className="text-slate-400 font-medium text-sm mt-2">SBIE exclusion rates phase to 5% floor; full STTR treaty network</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule Structure */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-4">Pillar Two Rule Hierarchy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PILLAR_RULES.map((rule, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, border: "1px solid #334155" }}>
                    <div style={{ background: rule.color + "20", borderRadius: 8, padding: 8, display: "inline-block", marginBottom: 10 }}>
                      <rule.icon className="w-5 h-5" style={{ color: rule.color }} />
                    </div>
                    <div className="text-white font-medium text-sm mb-1">{rule.name}</div>
                    <div style={{ color: rule.color, fontSize: 11, marginBottom: 6 }}>{rule.abbr}</div>
                    <div className="text-slate-400 text-xs">{rule.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <h3 className="text-white font-semibold mb-4">Open Data Sources Used</h3>
              <div className="space-y-3">
                {DATA_SOURCES.map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg transition-colors group"
                    style={{ background: "#1e293b", border: "1px solid #334155" }}>
                    <div>
                      <div className="text-white font-medium text-sm group-hover:text-violet-300 transition-colors">{src.name}</div>
                      <div className="text-slate-400 text-xs">{src.desc}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-violet-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BAHAMAS ── */}
        {activeTab === "bahamas" && <BahamasTab />}

      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e293b", marginTop: 48 }}>
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-slate-500 space-y-1">
          <div>Built with OECD SDMX API · World Bank Open Data · Pillar Two public legislative trackers</div>
          <div>Educational tool only — not for tax filing. Verify all data with qualified tax advisors.</div>
          <div>
            <a href="https://www.oecd.org/tax/beps/" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:text-violet-400">OECD Pillar Two Framework</a>
            {" · "}
            <a href="https://sdmx.oecd.org/public/rest/" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:text-violet-400">OECD SDMX API</a>
            {" · "}
            <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:text-violet-400">World Bank Open Data</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────

function StatChip({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <div style={{ background: "#0f172a", border: `1px solid ${color}30`, borderRadius: 10, padding: "12px 16px" }}>
      <div className="flex items-center gap-2 mb-1">{icon}<span className="text-slate-400 text-xs">{label}</span></div>
      <div style={{ color, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function CheckMark() { return <span style={{ color: "#10b981", fontSize: 16 }}>✓</span>; }
function XMark() { return <span style={{ color: "#ef4444", fontSize: 16 }}>✗</span>; }
function getFlag(iso2: string): string {
  return iso2.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// ── Static Content ────────────────────────────────────

const GIR_SECTIONS = [
  {
    title: "Entity Information",
    fields: ["Constituent Entity identification", "Tax identification numbers", "Jurisdiction of residence", "MNE group membership", "Ownership structure", "Permanent establishment info"],
  },
  {
    title: "GloBE Income & Tax",
    fields: ["Adjusted pre-tax income", "Covered taxes (current)", "Deferred tax adjustments", "Substance-based exclusions", "Intra-group transactions", "Deferred tax liability recapture"],
  },
  {
    title: "Top-Up Tax Computation",
    fields: ["Jurisdictional ETR calculation", "GloBE income allocation", "Top-up tax amount", "DMTT credit applied", "IIR/UTPR allocation", "Safe harbour elections"],
  },
];

const GLOBE_STEPS = [
  { title: "Determine Covered Entities", desc: "Identify constituent entities of the MNE group with consolidated revenue ≥ €750M" },
  { title: "Compute GloBE Income/Loss", desc: "Adjust financial accounts per GloBE rules (excluding excluded entities)" },
  { title: "Identify Adjusted Covered Taxes", desc: "Current + deferred taxes, adjusted for timing differences and deferred tax recapture" },
  { title: "Compute Substance-Based Income Exclusion", desc: "5–10% × payroll + 5–8% × net book value of tangible assets (phases to 5%)" },
  { title: "Calculate Effective Tax Rate (ETR)", desc: "ETR = Adjusted Covered Taxes ÷ (GloBE Income − SBIE)" },
  { title: "Determine Top-Up Tax Percentage", desc: "Top-up % = max(0, 15% − ETR). Apply to net GloBE income." },
  { title: "Apply QDMTT Credit", desc: "QDMTT credited first against any IIR/UTPR liability for the jurisdiction" },
  { title: "File GIR & Local Return", desc: "Submit Globe Information Return + local DMTT return per jurisdiction deadlines" },
];

const PILLAR_RULES: { name: string; abbr: string; desc: string; color: string; icon: any }[] = [
  { name: "Income Inclusion Rule", abbr: "IIR", desc: "Parent entity collects top-up tax on low-taxed income of constituent entities", color: "#10b981", icon: TrendingUp },
  { name: "Undertaxed Profits Rule", abbr: "UTPR", desc: "Backstop rule — other group members collect top-up where IIR doesn't apply", color: "#3b82f6", icon: Scale },
  { name: "Domestic Min. Top-up Tax", abbr: "DMTT / QDMTT", desc: "Jurisdiction's own top-up tax that takes priority over IIR/UTPR", color: "#8b5cf6", icon: Building2 },
];

const DATA_SOURCES = [
  { name: "OECD SDMX REST API", desc: "Corporate tax rates, GloBE model rules, global statistics", url: "https://sdmx.oecd.org/public/rest/" },
  { name: "OECD Corporate Tax Statistics", desc: "Annual ETR data by jurisdiction — open access publication", url: "https://www.oecd.org/tax/tax-policy/corporate-tax-statistics.htm" },
  { name: "OECD Pillar Two Implementation", desc: "Official jurisdiction-level adoption status tracker", url: "https://www.oecd.org/tax/beps/pillar-two-implementation.htm" },
  { name: "World Bank Open Data API", desc: "GDP, trade, and macroeconomic context data", url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD" },
  { name: "OECD Tax Database", desc: "Full historical statutory CIT rates — open access Excel", url: "https://www.oecd.org/tax/tax-policy/tax-database/" },
  { name: "OECD Administrative Guidance", desc: "GIR technical specs and XML schema documentation", url: "https://www.oecd.org/tax/beps/oecd-releases-administrative-guidance-on-the-global-minimum-tax.htm" },
];
