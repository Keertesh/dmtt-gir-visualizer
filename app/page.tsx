"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2, BarChart3, FileText, Calculator, BookOpen,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, Info,
  ExternalLink, ChevronRight, Building2, Scale, Layers, Anchor,
  Menu, X, Zap,
} from "lucide-react";
import {
  DMTT_COUNTRIES, GIR_REQUIREMENTS, PILLAR_TWO_TIMELINE,
  SAFE_HARBOUR_DATA,
} from "@/data/dmtt-data";
import StatusBadge from "@/components/StatusBadge";
import CountryTable from "@/components/CountryTable";
import DMTTCalculator from "@/components/DMTTCalculator";
import BahamasTab from "@/components/BahamasTab";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlowCard, { FadeIn, StaggerIn, StaggerItem } from "@/components/GlowCard";
import {
  RegionStatusChart, ETRComparisonChart, GlobalStatusPie,
  GIRFilingChart, RevenueImpactChart,
} from "@/components/Charts";

const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center shimmer-bg" style={{ height: 360, borderRadius: 12 }}>
      <div className="text-slate-500 text-sm">Loading map…</div>
    </div>
  ),
});

const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });

const TABS = [
  { id: "overview",    label: "Overview",   icon: Globe2,     color: "#8b5cf6" },
  { id: "countries",   label: "Countries",  icon: Building2,  color: "#3b82f6" },
  { id: "gir",         label: "GIR Data",   icon: FileText,   color: "#06b6d4" },
  { id: "rates",       label: "Tax Rates",  icon: BarChart3,  color: "#f59e0b" },
  { id: "calculator",  label: "DMTT Calc",  icon: Calculator, color: "#ec4899" },
  { id: "timeline",    label: "Timeline",   icon: Clock,      color: "#a78bfa" },
  { id: "bahamas",     label: "🇧🇸 Bahamas", icon: Anchor,     color: "#10b981", highlight: true },
];

const TAB_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.2 } }),
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [prevTab, setPrevTab] = useState("overview");
  const [direction, setDirection] = useState(1);
  const [mapField, setMapField] = useState<"dmttStatus"|"girStatus"|"irmStatus"|"utprStatus">("dmttStatus");
  const [citData, setCitData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [apiSource, setApiSource] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  const enacted      = DMTT_COUNTRIES.filter((c) => c.dmttStatus === "enacted").length;
  const draft        = DMTT_COUNTRIES.filter((c) => c.dmttStatus === "draft").length;
  const pillar2      = DMTT_COUNTRIES.filter((c) => c.pillarTwoAdopted).length;
  const totalRevenue = DMTT_COUNTRIES.reduce((s, c) => s + (c.estimatedRevenue || 0), 0);
  const below15      = DMTT_COUNTRIES.filter((c) => c.estimatedETR !== null && c.estimatedETR < 15).length;

  const switchTab = (id: string) => {
    const oldIdx = TABS.findIndex((t) => t.id === activeTab);
    const newIdx = TABS.findIndex((t) => t.id === id);
    setDirection(newIdx >= oldIdx ? 1 : -1);
    setPrevTab(activeTab);
    setActiveTab(id);
    setMobileMenuOpen(false);
    // scroll tab into view on mobile
    const el = tabScrollRef.current?.querySelector(`[data-tab="${id}"]`) as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    if (activeTab === "rates" && citData.length === 0) {
      setDataLoading(true);
      fetch("/api/oecd?dataset=cit_rates")
        .then((r) => r.json())
        .then((j) => { setApiSource(j.source); setCitData(j.data || []); })
        .catch(() => setApiSource("error"))
        .finally(() => setDataLoading(false));
    }
  }, [activeTab]);

  const activeColor = TABS.find((t) => t.id === activeTab)?.color || "#8b5cf6";

  return (
    <div style={{ minHeight: "100vh", background: "#020817" }} className="grid-pattern">

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="sticky-header" style={{ background: "rgba(2,8,23,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <ParticleField count={40} />
          <div className="aurora-container">
            <div className="aurora-blob aurora-1" />
            <div className="aurora-blob aurora-2" />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
            <div className="flex items-center justify-between gap-3">
              {/* Logo + title */}
              <div className="flex items-center gap-3 min-w-0">
                <motion.div
                  style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius: 12, padding: 10, flexShrink: 0 }}
                  animate={{ boxShadow: ["0 0 0px #7c3aed", "0 0 20px #7c3aed60", "0 0 0px #7c3aed"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="float-anim"
                >
                  <Scale className="w-6 h-6 text-white" />
                </motion.div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-white leading-tight gradient-text cursor">
                    DMTT &amp; GIR Visualizer
                  </h1>
                  <p className="text-slate-400 text-xs hidden sm:block">OECD Pillar Two Global Minimum Tax Tracker</p>
                </div>
              </div>

              {/* Right badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.div
                  className="hidden sm:flex items-center gap-2"
                  style={{ background: "#10b98110", border: "1px solid #10b98130", borderRadius: 99, padding: "5px 10px" }}
                  animate={{ borderColor: ["#10b98130","#10b98170","#10b98130"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="status-live w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
                  <span className="text-emerald-400 text-xs font-medium">Live OECD Data</span>
                </motion.div>
                <a href="https://www.oecd.org/tax/beps/" target="_blank" rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors">
                  <ExternalLink className="w-3 h-3" />Source
                </a>
                {/* Mobile menu button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="sm:hidden p-2 rounded-lg"
                  style={{ background: "#1e293b", border: "1px solid #334155" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden overflow-hidden"
              style={{ background: "rgba(2,8,23,0.97)", borderBottom: "1px solid #1e293b" }}
            >
              <div className="px-4 py-3 grid grid-cols-2 gap-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left"
                      style={{
                        background: active ? `${tab.color}18` : "#1e293b",
                        border: `1px solid ${active ? tab.color + "50" : "#334155"}`,
                        color: active ? tab.color : "#94a3b8",
                      }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop tab bar */}
        <div className="max-w-7xl mx-auto px-4 tab-container hidden sm:block" style={{ borderBottom: "1px solid #1e293b" }}>
          <div ref={tabScrollRef} className="tab-scroll">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap glow-btn"
                  style={{
                    color: active ? tab.color : tab.highlight ? "#34d399" : "#64748b",
                    background: "transparent",
                    borderBottom: active ? `2px solid ${tab.color}` : "2px solid transparent",
                    position: "relative",
                  }}
                  whileHover={{ color: tab.color }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      style={{
                        position: "absolute", bottom: -1, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, ${tab.color}, transparent)`,
                        borderRadius: 99,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <div style={{ background: "#060d1f", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <StaggerIn className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            <StaggerItem>
              <StatChip
                icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                value={<AnimatedCounter to={enacted} suffix="" />}
                label="Enacted" color="#10b981"
              />
            </StaggerItem>
            <StaggerItem>
              <StatChip
                icon={<Clock className="w-3.5 h-3.5 text-amber-400" />}
                value={<AnimatedCounter to={draft} />}
                label="In Draft" color="#f59e0b"
              />
            </StaggerItem>
            <StaggerItem>
              <StatChip
                icon={<Globe2 className="w-3.5 h-3.5 text-blue-400" />}
                value={<AnimatedCounter to={pillar2} />}
                label="P2 Committed" color="#3b82f6"
              />
            </StaggerItem>
            <StaggerItem>
              <StatChip
                icon={<TrendingUp className="w-3.5 h-3.5 text-violet-400" />}
                value={<><AnimatedCounter to={Math.round(totalRevenue / 1000)} prefix="$" suffix="B" /></>}
                label="Est. Revenue" color="#8b5cf6"
              />
            </StaggerItem>
            <StaggerItem className="col-span-2 sm:col-span-1">
              <StatChip
                icon={<AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                value={<AnimatedCounter to={below15} />}
                label="ETR Below 15%" color="#ef4444"
              />
            </StaggerItem>
          </StaggerIn>
        </div>
      </div>

      {/* ── MAIN ───────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Mobile active tab label */}
        <div className="sm:hidden mb-4 flex items-center gap-2">
          {(() => { const t = TABS.find(t => t.id === activeTab)!; const Icon = t.icon; return (
            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ background: `${t.color}15`, border: `1px solid ${t.color}40`, color: t.color }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={activeTab}>
              <Icon className="w-4 h-4" />{t.label}
            </motion.div>
          );})()}
          <div className="sm:hidden ml-auto">
            <div className="tab-scroll flex gap-1.5" style={{ maxWidth: "200px" }}>
              {TABS.map((t) => (
                <button key={t.id} onClick={() => switchTab(t.id)}
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all"
                  style={{ background: activeTab === t.id ? t.color : "#334155", transform: activeTab === t.id ? "scale(1.4)" : "scale(1)" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab content with slide animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={TAB_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
          >

            {/* ── OVERVIEW ────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-4 sm:space-y-6">

                {/* Info banner */}
                <motion.div
                  className="grad-border-animated"
                  style={{ padding: "18px 20px" }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      style={{ background: "#7c3aed20", border: "1px solid #7c3aed40", borderRadius: 10, padding: 9, flexShrink: 0 }}
                      animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Info className="w-4 h-4 text-violet-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-white font-semibold mb-1 text-sm sm:text-base">About DMTT &amp; GIR</h2>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        The <strong className="text-violet-300">Domestic Minimum Top-up Tax (DMTT)</strong> ensures MNEs pay at least a{" "}
                        <strong className="text-emerald-400 glow-emerald">15% effective tax rate</strong> in every jurisdiction.
                        The <strong className="text-blue-300">Globe Information Return (GIR)</strong> is the standardized filing mechanism.
                        This tool tracks implementation across <strong className="text-white">{DMTT_COUNTRIES.length} jurisdictions</strong> using open OECD &amp; World Bank APIs.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Map */}
                <GlowCard style={{ padding: 18 }} delay={0.1}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-violet-400" />Global Implementation Map
                    </h2>
                    <div className="flex gap-1.5 flex-wrap">
                      {(["dmttStatus","girStatus","irmStatus","utprStatus"] as const).map((f) => (
                        <motion.button key={f} onClick={() => setMapField(f)} whileTap={{ scale: 0.92 }}
                          className="px-2.5 py-1 text-xs rounded-full font-medium transition-all"
                          style={{ background: mapField===f ? "#7c3aed" : "#1e293b", color: mapField===f ? "white" : "#64748b", border: `1px solid ${mapField===f ? "#7c3aed" : "#334155"}` }}>
                          {f.replace("Status","").toUpperCase()}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <WorldMap highlightField={mapField} />
                  <p className="text-slate-600 text-xs mt-2">Hover circles for details · Bahamas shown with larger indicator</p>
                </GlowCard>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <GlowCard style={{ padding: 18 }} delay={0.15} glowColor="#8b5cf6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <BarChart3 className="w-4 h-4 text-violet-400" />DMTT Status by Region
                    </h3>
                    <RegionStatusChart />
                  </GlowCard>
                  <GlowCard style={{ padding: 18 }} delay={0.2} glowColor="#3b82f6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Layers className="w-4 h-4 text-violet-400" />Global DMTT Adoption
                    </h3>
                    <GlobalStatusPie />
                  </GlowCard>
                </div>

                {/* Revenue chart */}
                <GlowCard style={{ padding: 18 }} delay={0.25} glowColor="#10b981">
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="w-4 h-4 text-violet-400" />Estimated Annual DMTT Revenue (USD Millions)
                  </h3>
                  <p className="text-slate-400 text-xs mb-4">Top 12 jurisdictions · Source: OECD/IMF estimates</p>
                  <RevenueImpactChart />
                </GlowCard>

                {/* Safe harbours */}
                <GlowCard style={{ padding: 18 }} delay={0.3}>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <BookOpen className="w-4 h-4 text-violet-400" />Pillar Two Safe Harbours &amp; Exclusions
                  </h3>
                  <StaggerIn className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {SAFE_HARBOUR_DATA.map((sh, i) => (
                      <StaggerItem key={i}>
                        <motion.div
                          style={{ background: "#1e293b", borderRadius: 10, padding: 14, border: "1px solid #334155", height: "100%" }}
                          whileHover={{ background: "#253451", borderColor: "#7c3aed50" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start gap-3">
                            <div style={{ background: "#7c3aed20", borderRadius: 8, padding: 7, flexShrink: 0 }}>
                              <CheckCircle2 className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm mb-1">{sh.name}</div>
                              <div className="text-slate-400 text-xs mb-2">{sh.description}</div>
                              <div className="flex gap-1.5 flex-wrap">
                                <span style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140", borderRadius: 99, padding: "2px 7px", fontSize: 10 }}>{sh.applicableYears}</span>
                                <span style={{ background: "#3b82f620", color: "#3b82f6", border: "1px solid #3b82f640", borderRadius: 99, padding: "2px 7px", fontSize: 10 }}>{sh.threshold}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerIn>
                </GlowCard>
              </div>
            )}

            {/* ── COUNTRIES ───────────────────────────── */}
            {activeTab === "countries" && (
              <GlowCard style={{ padding: "18px 16px sm:20px" }}>
                <h2 className="text-white font-semibold text-base sm:text-lg mb-1">Jurisdiction Tracker</h2>
                <p className="text-slate-400 text-xs sm:text-sm mb-4">
                  {DMTT_COUNTRIES.length} jurisdictions · Click rows to expand · Red ETR = below 15%
                </p>
                <CountryTable />
              </GlowCard>
            )}

            {/* ── GIR ─────────────────────────────────── */}
            {activeTab === "gir" && (
              <div className="space-y-4 sm:space-y-6">
                <GlowCard style={{ padding: "18px 16px" }} glowColor="#06b6d4">
                  <h2 className="text-white font-semibold text-base sm:text-lg mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />Globe Information Return (GIR)
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mb-4">Filing requirements by jurisdiction. Source: OECD Administrative Guidance + local tax authority publications.</p>
                  <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 14, marginBottom: 18 }}>
                    <div className="text-white font-medium mb-2 text-sm">Feature Completeness by Jurisdiction</div>
                    <GIRFilingChart />
                  </div>
                  <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full text-xs sm:text-sm min-w-[600px]">
                      <thead>
                        <tr style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}>
                          {["Jurisdiction","Deadline","First FY","Local","Exchange","XML","Ext.","Penalty"].map((h) => (
                            <th key={h} className="text-left p-2 sm:p-3 text-slate-300 font-medium text-xs">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {GIR_REQUIREMENTS.map((r, i) => (
                          <motion.tr key={r.iso2} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                            style={{ borderBottom: "1px solid #1e293b", background: i%2===0?"transparent":"#0f172a20" }}
                            className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-2 sm:p-3"><div className="flex items-center gap-1.5"><span>{getFlag(r.iso2)}</span><span className="text-white font-medium truncate max-w-[80px] sm:max-w-none">{r.country}</span></div></td>
                            <td className="p-2 sm:p-3 text-slate-400 text-xs">{r.filingDeadline.split(" ").slice(0,3).join(" ")}</td>
                            <td className="p-2 sm:p-3"><span style={{ background: "#3b82f620", color: "#3b82f6", borderRadius: 99, padding: "1px 6px", fontSize: 10, border: "1px solid #3b82f640" }}>FY{r.firstFiscalYear}</span></td>
                            <td className="p-2 sm:p-3 text-center">{r.localFilingRequired ? <CM/> : <XM/>}</td>
                            <td className="p-2 sm:p-3 text-center">{r.exchangePartner ? <CM/> : <XM/>}</td>
                            <td className="p-2 sm:p-3 text-center">{r.xmlSchema ? <CM/> : <XM/>}</td>
                            <td className="p-2 sm:p-3 text-center">{r.extensionAvailable ? <CM/> : <XM/>}</td>
                            <td className="p-2 sm:p-3 text-slate-400 text-xs hidden sm:table-cell">{r.penaltyForNonFiling}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlowCard>

                <GlowCard style={{ padding: "18px 16px" }}>
                  <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Key GIR Data Fields (OECD Model)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {GIR_SECTIONS.map((section, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <div style={{ background: "#1e293b", borderRadius: 10, padding: 14, height: "100%" }}>
                          <div className="text-violet-400 font-medium text-sm mb-2">{section.title}</div>
                          <ul className="space-y-1">
                            {section.fields.map((f, j) => (
                              <li key={j} className="text-slate-400 text-xs flex items-start gap-1.5">
                                <ChevronRight className="w-3 h-3 mt-0.5 text-slate-600 flex-shrink-0" />{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </GlowCard>
              </div>
            )}

            {/* ── TAX RATES ───────────────────────────── */}
            {activeTab === "rates" && (
              <div className="space-y-4 sm:space-y-6">
                <GlowCard style={{ padding: "18px 16px" }} glowColor="#f59e0b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <div>
                      <h2 className="text-white font-semibold text-base sm:text-lg">Corporate Tax Rate Data</h2>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        OECD SDMX API ·{" "}
                        {apiSource==="oecd_api" && <span className="text-emerald-400">✓ Live OECD API</span>}
                        {apiSource==="fallback" && <span className="text-amber-400">⚡ Cached data</span>}
                        {apiSource==="error" && <span className="text-red-400">⚠ Local fallback</span>}
                      </p>
                    </div>
                    <div className="text-xs text-slate-500 rounded-lg px-3 py-2 self-start sm:self-auto" style={{ background: "#1e293b", border: "1px solid #334155" }}>
                      <code className="text-violet-400">sdmx.oecd.org/public/rest</code>
                    </div>
                  </div>
                  {dataLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => <div key={i} className="h-10 rounded-lg shimmer-bg" />)}
                    </div>
                  ) : (
                    <>
                      <h3 className="text-slate-300 font-medium mb-3 text-xs sm:text-sm">CIT Rate vs ETR vs 15% GloBE Minimum</h3>
                      <ETRComparisonChart />
                      {citData.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-slate-300 font-medium mb-3 text-xs sm:text-sm">Statutory CIT Rates 2018–2023</h3>
                          <div className="overflow-x-auto -mx-2 sm:mx-0">
                            <table className="w-full text-xs min-w-[400px]">
                              <thead>
                                <tr style={{ background: "#1e293b", borderBottom: "1px solid #334155" }}>
                                  {["Country","2018","2020","2022","2023","vs 15%"].map((h) => (
                                    <th key={h} className={`p-2 font-medium text-slate-300 ${h!=="Country"?"text-right":"text-left"}`}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {citData.slice(0,25).map((row: any, i: number) => {
                                  const cur = row.rate2023 ?? row.rate2022 ?? 0;
                                  const gap = cur - 15;
                                  return (
                                    <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                      viewport={{ once: true }} transition={{ delay: i*0.03 }}
                                      style={{ borderBottom: "1px solid #1e293b", background: i%2===0?"transparent":"#0f172a20" }}>
                                      <td className="p-2 text-white">{row.country}</td>
                                      <td className="p-2 text-right text-slate-500 font-mono">{row.rate2018}%</td>
                                      <td className="p-2 text-right text-slate-500 font-mono">{row.rate2020}%</td>
                                      <td className="p-2 text-right text-slate-400 font-mono">{row.rate2022}%</td>
                                      <td className="p-2 text-right text-white font-mono font-medium">{row.rate2023}%</td>
                                      <td className="p-2 text-right font-mono" style={{ color: gap>=0?"#10b981":"#ef4444" }}>{gap>=0?"+":""}{gap.toFixed(1)}%</td>
                                    </motion.tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </GlowCard>
              </div>
            )}

            {/* ── CALCULATOR ──────────────────────────── */}
            {activeTab === "calculator" && (
              <div className="space-y-4 sm:space-y-6">
                <DMTTCalculator />
                <GlowCard style={{ padding: "18px 16px" }} glowColor="#ec4899">
                  <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">GloBE Computation Steps</h3>
                  <div className="space-y-3">
                    {GLOBE_STEPS.map((step, i) => (
                      <FadeIn key={i} delay={i * 0.06}>
                        <div className="flex items-start gap-3">
                          <motion.div
                            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "white", borderRadius: 99, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, boxShadow: "0 0 12px #7c3aed60" }}
                            whileHover={{ scale: 1.2, boxShadow: "0 0 20px #7c3aed" }}
                          >{i+1}</motion.div>
                          <div>
                            <div className="text-slate-200 text-sm font-medium">{step.title}</div>
                            <div className="text-slate-500 text-xs mt-0.5">{step.desc}</div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </GlowCard>
              </div>
            )}

            {/* ── TIMELINE ────────────────────────────── */}
            {activeTab === "timeline" && (
              <div className="space-y-4 sm:space-y-6">
                <GlowCard style={{ padding: "18px 16px" }} glowColor="#a78bfa">
                  <h2 className="text-white font-semibold text-base sm:text-lg mb-6">Pillar Two Implementation Timeline</h2>
                  <div className="relative pl-7 sm:pl-8">
                    <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #7c3aed, transparent)" }} />
                    {PILLAR_TWO_TIMELINE.map((event, i) => (
                      <FadeIn key={i} delay={i * 0.08}>
                        <div className="relative mb-6 sm:mb-8">
                          <motion.div
                            style={{ position: "absolute", left: -21, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#7c3aed", border: "2px solid #4c1d95" }}
                            animate={{ boxShadow: ["0 0 0 0 #7c3aed60","0 0 0 6px #7c3aed00"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                          <motion.div style={{ background: "#1e293b", borderRadius: 10, padding: 14, border: "1px solid #334155" }}
                            whileHover={{ borderColor: "#7c3aed60" }}>
                            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                              <span style={{ background: "#7c3aed20", color: "#a78bfa", borderRadius: 99, padding: "2px 9px", fontSize: 11, fontWeight: 600, border: "1px solid #7c3aed40" }}>{event.year}</span>
                              <span style={{ background: "#10b98120", color: "#10b981", borderRadius: 99, padding: "1px 7px", fontSize: 10, border: "1px solid #10b98140" }}>{event.countries} jurisdictions</span>
                            </div>
                            <div className="text-slate-200 font-medium text-sm">{event.event}</div>
                          </motion.div>
                        </div>
                      </FadeIn>
                    ))}
                    <FadeIn delay={PILLAR_TWO_TIMELINE.length * 0.08}>
                      <div className="relative mb-6">
                        <div style={{ position: "absolute", left: -21, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#334155", border: "2px solid #1e293b" }} />
                        <div style={{ background: "#1a1040", borderRadius: 10, padding: 14, border: "1px dashed #4c1d95" }}>
                          <span style={{ background: "#7c3aed10", color: "#6b21a8", borderRadius: 99, padding: "2px 9px", fontSize: 11, fontWeight: 600, border: "1px dashed #4c1d95" }}>2027–2033</span>
                          <div className="text-slate-400 text-sm mt-1.5">SBIE rates phase to 5% floor · Full STTR treaty network</div>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </GlowCard>

                <GlowCard style={{ padding: "18px 16px" }}>
                  <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Pillar Two Rule Hierarchy</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PILLAR_RULES.map((rule, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <motion.div style={{ background: "#1e293b", borderRadius: 10, padding: 16, border: "1px solid #334155", height: "100%" }}
                          whileHover={{ borderColor: `${rule.color}60`, background: "#1e293b" }}>
                          <motion.div style={{ background: rule.color+"20", borderRadius: 8, padding: 8, display: "inline-block", marginBottom: 10 }}
                            whileHover={{ scale: 1.1 }}>
                            <rule.icon className="w-5 h-5" style={{ color: rule.color }} />
                          </motion.div>
                          <div className="text-white font-medium text-sm mb-1">{rule.name}</div>
                          <div style={{ color: rule.color, fontSize: 11, marginBottom: 5 }}>{rule.abbr}</div>
                          <div className="text-slate-400 text-xs">{rule.desc}</div>
                        </motion.div>
                      </FadeIn>
                    ))}
                  </div>
                </GlowCard>

                <GlowCard style={{ padding: "18px 16px" }}>
                  <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Open Data Sources</h3>
                  <div className="space-y-2">
                    {DATA_SOURCES.map((src, i) => (
                      <FadeIn key={i} delay={i * 0.06}>
                        <motion.a href={src.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl group"
                          style={{ background: "#1e293b", border: "1px solid #334155" }}
                          whileHover={{ background: "#253451", borderColor: "#7c3aed50", x: 4 }}>
                          <div>
                            <div className="text-white font-medium text-sm group-hover:text-violet-300 transition-colors">{src.name}</div>
                            <div className="text-slate-400 text-xs">{src.desc}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-violet-400 flex-shrink-0 ml-2" />
                        </motion.a>
                      </FadeIn>
                    ))}
                  </div>
                </GlowCard>
              </div>
            )}

            {/* ── BAHAMAS ─────────────────────────────── */}
            {activeTab === "bahamas" && <BahamasTab />}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 40 }}>
        <div className="max-w-7xl mx-auto px-4 py-5 text-center text-xs text-slate-600 space-y-1">
          <div>OECD SDMX API · World Bank Open Data · Pillar Two public legislative trackers</div>
          <div>Educational only — not for tax filing. Verify with qualified advisors.</div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[["OECD Pillar Two","https://www.oecd.org/tax/beps/"],["OECD SDMX API","https://sdmx.oecd.org/public/rest/"],["World Bank Data","https://data.worldbank.org/"]].map(([l,u]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────

function StatChip({ icon, value, label, color }: { icon: React.ReactNode; value: React.ReactNode; label: string; color: string }) {
  return (
    <motion.div
      style={{ background: "#0a0f1e", border: `1px solid ${color}25`, borderRadius: 10, padding: "10px 14px" }}
      whileHover={{ borderColor: `${color}60`, background: "#0f172a" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">{icon}<span className="text-slate-500 text-xs truncate">{label}</span></div>
      <div className="font-bold text-xl sm:text-2xl num-reveal" style={{ color, textShadow: `0 0 20px ${color}50` }}>{value}</div>
    </motion.div>
  );
}

function CM() { return <motion.span style={{ color: "#10b981", fontSize: 15 }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>✓</motion.span>; }
function XM() { return <span style={{ color: "#ef4444", fontSize: 15 }}>✗</span>; }
function getFlag(iso2: string) { return iso2.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0))); }

// ── Static data ──────────────────────────────────────────────────

const GIR_SECTIONS = [
  { title: "Entity Information", fields: ["Constituent Entity ID","Tax numbers","Jurisdiction of residence","MNE group membership","Ownership structure","PE info"] },
  { title: "GloBE Income & Tax", fields: ["Adjusted pre-tax income","Covered taxes (current)","Deferred tax adjustments","SBIE exclusions","Intra-group transactions","DTL recapture"] },
  { title: "Top-Up Tax Computation", fields: ["Jurisdictional ETR calc","GloBE income allocation","Top-up tax amount","DMTT credit applied","IIR/UTPR allocation","Safe harbour elections"] },
];

const GLOBE_STEPS = [
  { title: "Determine Covered Entities", desc: "MNE groups with consolidated revenue ≥ €750M in at least 2 of 4 preceding years" },
  { title: "Compute GloBE Income/Loss", desc: "Adjust financial accounts per GloBE rules (Art. 3)" },
  { title: "Identify Adjusted Covered Taxes", desc: "Current + deferred taxes adjusted for timing differences (Art. 4)" },
  { title: "Substance-Based Income Exclusion", desc: "10% × payroll + 8% × tangible assets (phasing to 5% by 2033, Art. 5.3)" },
  { title: "Calculate Effective Tax Rate", desc: "ETR = Adjusted Covered Taxes ÷ (GloBE Income − SBIE)" },
  { title: "Determine Top-Up Tax %", desc: "Top-up % = max(0, 15% − ETR). Applied to net GloBE income." },
  { title: "Apply QDMTT Credit", desc: "Domestic QDMTT credited first against IIR/UTPR (Art. 10)" },
  { title: "File GIR & Local Return", desc: "Globe Information Return + local DMTT return per deadline" },
];

const PILLAR_RULES: { name: string; abbr: string; desc: string; color: string; icon: any }[] = [
  { name: "Income Inclusion Rule", abbr: "IIR", desc: "Parent collects top-up tax on low-taxed income of constituent entities", color: "#10b981", icon: TrendingUp },
  { name: "Undertaxed Profits Rule", abbr: "UTPR", desc: "Backstop — other group members collect where IIR doesn't apply", color: "#3b82f6", icon: Scale },
  { name: "Domestic Minimum Top-up Tax", abbr: "DMTT / QDMTT", desc: "Jurisdiction's own top-up tax taking priority over IIR/UTPR", color: "#8b5cf6", icon: Building2 },
];

const DATA_SOURCES = [
  { name: "OECD SDMX REST API", desc: "Corporate tax rates & GloBE data", url: "https://sdmx.oecd.org/public/rest/" },
  { name: "OECD Corporate Tax Statistics", desc: "Annual ETR data by jurisdiction", url: "https://www.oecd.org/tax/tax-policy/corporate-tax-statistics.htm" },
  { name: "OECD Pillar Two Implementation", desc: "Official adoption status tracker", url: "https://www.oecd.org/tax/beps/pillar-two-implementation.htm" },
  { name: "World Bank Open Data API", desc: "GDP and macroeconomic context", url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD" },
  { name: "OECD Tax Database", desc: "Historical statutory CIT rates", url: "https://www.oecd.org/tax/tax-policy/tax-database/" },
  { name: "OECD Administrative Guidance", desc: "GIR technical specs & XML schema", url: "https://www.oecd.org/tax/beps/oecd-releases-administrative-guidance-on-the-global-minimum-tax.htm" },
];
