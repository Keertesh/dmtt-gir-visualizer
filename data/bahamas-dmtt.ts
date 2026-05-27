// ─────────────────────────────────────────────────────────────────
// BAHAMAS DMTT — Comprehensive Data
// Sources:
//  • The Bahamas Domestic Minimum Top-up Tax Act, 2024
//  • OECD Inclusive Framework / Pillar Two Model Rules
//  • Bahamas Revenue Commission (BRC) guidance
//  • IMF / World Bank economic data (open)
//  • OECD Secretariat / G20 Inclusive Framework technical notes
// ─────────────────────────────────────────────────────────────────

export const BAHAMAS_LEGISLATION = {
  actName: "Domestic Minimum Top-up Tax Act, 2024",
  actShort: "DMTT Act 2024",
  enactmentDate: "December 30, 2024",
  effectiveDate: "January 1, 2025",
  adminAuthority: "Bahamas Revenue Commission (BRC)",
  legislativeRef: "Bill No. 35 of 2024 — Domestic Minimum Top-up Tax Act",
  oecdFramework: "OECD/G20 Inclusive Framework Pillar Two — GloBE Model Rules (2021)",
  euAlignment: "Not EU member — voluntary Inclusive Framework adoption",
  approachType: "Qualified Domestic Minimum Top-up Tax (QDMTT)",
  minimumRate: 15,
  revenueThreshold: 750, // EUR millions — consolidated group
  historicCIT: 0, // % — Bahamas had zero CIT pre-DMTT
  inclusiveFrameworkJoined: "2018",
  notes:
    "The Bahamas enacted a QDMTT to protect its tax base: without DMTT, parent jurisdictions (via IIR) or other members (via UTPR) would collect top-up tax on Bahamas-source income. By adopting QDMTT, the Bahamas retains that revenue domestically while meeting OECD Inclusive Framework standards.",
};

export const BAHAMAS_COMPLIANCE_TIMELINE = [
  {
    date: "December 30, 2024",
    event: "DMTT Act 2024 enacted",
    type: "legislative",
    detail: "Bill No. 35 of 2024 signed into law. Adopts GloBE Model Rules by reference.",
  },
  {
    date: "January 1, 2025",
    event: "DMTT effective — first fiscal year begins",
    type: "effective",
    detail: "Applies to fiscal years beginning on or after January 1, 2025. Groups with Dec 31 year-end: FY2025 is the first covered year.",
  },
  {
    date: "2025 (Ongoing)",
    event: "BRC registration for constituent entities",
    type: "compliance",
    detail: "Constituent entities of qualifying MNE groups must register with the Bahamas Revenue Commission.",
  },
  {
    date: "June 30, 2026",
    event: "First GIR/DMTT return filing deadline (est.)",
    type: "filing",
    detail: "18 months from end of FY2025 for first year. Subsequent years: 15 months from year-end. Subject to BRC confirmation.",
  },
  {
    date: "June 30, 2026",
    event: "First DMTT payment due",
    type: "payment",
    detail: "Tax liability for FY2025 payable upon filing. Instalment payment rules under consultation.",
  },
  {
    date: "2026–2028",
    event: "Transitional CbCR Safe Harbour availability",
    type: "relief",
    detail: "Simplified test using CbCR data available for first 3 fiscal years (2025, 2026, 2027). Significantly reduces compliance burden.",
  },
  {
    date: "2029 onwards",
    event: "Full GloBE computation required",
    type: "compliance",
    detail: "Transitional safe harbours expire. Full jurisdiction-by-jurisdiction GloBE ETR computation mandatory.",
  },
];

export const BAHAMAS_KEY_PROVISIONS = [
  {
    title: "Revenue Threshold",
    category: "Scope",
    detail: "MNE group annual consolidated revenue ≥ €750M in at least 2 of the 4 preceding fiscal years.",
    source: "DMTT Act s.4 / GloBE Art. 1.1",
    impactLevel: "high",
  },
  {
    title: "Qualifying Domestic Minimum Top-up Tax (QDMTT)",
    category: "Mechanism",
    detail: "The Bahamas DMTT is designed as a QDMTT, meaning it qualifies for credit against IIR/UTPR imposed by other jurisdictions. QDMTT status protects the Bahamas' right to keep the top-up revenue.",
    source: "OECD QDMTT Safe Harbour Guidance (2023)",
    impactLevel: "critical",
  },
  {
    title: "Substance-Based Income Exclusion (SBIE)",
    category: "Relief",
    detail: "Payroll component: 10% × qualifying employee payroll costs (phasing to 5% by 2033). Asset component: 8% × net book value of qualifying tangible assets (phasing to 5%). Reduces taxable GloBE income.",
    source: "GloBE Art. 5.3 (adopted by Bahamas Act)",
    impactLevel: "high",
  },
  {
    title: "De Minimis Exclusion",
    category: "Relief",
    detail: "No DMTT if jurisdiction revenue < €10M AND GloBE income < €1M. Permanent exclusion applying per fiscal year.",
    source: "GloBE Art. 5.5",
    impactLevel: "medium",
  },
  {
    title: "Transitional CbCR Safe Harbour",
    category: "Relief",
    detail: "3-year simplification using Country-by-Country Report data. If CbCR shows ETR ≥ 15%, or income/revenue below de minimis: DMTT = zero for that year.",
    source: "OECD Transitional Safe Harbour Guidance (Dec 2022)",
    impactLevel: "high",
  },
  {
    title: "Globe Information Return (GIR)",
    category: "Filing",
    detail: "Annual GIR required per constituent entity. 18-month window for first year; 15 months thereafter. May be filed by UPE on behalf of Bahamas entities via exchange of information.",
    source: "DMTT Act / OECD GIR Administrative Guidance",
    impactLevel: "high",
  },
  {
    title: "Deferred Tax Recapture",
    category: "Technical",
    detail: "Deferred tax liabilities recognized pre-DMTT may be recaptured if not utilised within 5 years, increasing effective covered taxes.",
    source: "GloBE Art. 4.4.4",
    impactLevel: "medium",
  },
  {
    title: "Investment Fund Exclusion",
    category: "Exclusions",
    detail: "Investment funds that are Ultimate Parent Entities (UPEs) are excluded from GloBE. Pension funds similarly excluded. Majority of Bahamas-registered funds may fall outside scope.",
    source: "GloBE Art. 1.5",
    impactLevel: "high",
  },
  {
    title: "Shipping Income Exclusion",
    category: "Exclusions",
    detail: "International shipping income excluded from GloBE income where substantive activity tests are met. Critical for the Bahamas ship registry and cruise industry.",
    source: "GloBE Art. 3.3",
    impactLevel: "high",
  },
  {
    title: "Penalty Regime",
    category: "Enforcement",
    detail: "Penalties for non-filing and late payment under BRC administration. Specific amounts subject to BRC rules under the Revenue Administration Act.",
    source: "Bahamas Revenue Administration Act",
    impactLevel: "medium",
  },
];

export const BAHAMAS_SECTORS = [
  {
    sector: "Banking & Private Wealth",
    icon: "🏦",
    riskLevel: "High",
    riskColor: "#ef4444",
    entityCount: "150+",
    description:
      "Global banks maintain Bahamas-licensed private banking, trust, and wealth management subsidiaries. Most are constituent entities of groups with revenue well above €750M threshold.",
    keyEntities: [
      "International private banks (UBS, Credit Suisse legacy, Deutsche Bank, BNP Paribas, HSBC, Citi, RBC, Scotiabank)",
      "Trust companies and fiduciary service providers",
      "External asset managers affiliated with large banking groups",
    ],
    dmttConsiderations: [
      "Bahamas entities typically have low local income relative to group — may qualify for de minimis",
      "High payroll in private banking supports SBIE payroll component",
      "Passthrough income (dividends, interest from holding companies) may be excluded or exempt income under GloBE rules",
      "QDMTT safe harbour critical — without it, parent bank's home jurisdiction would collect top-up",
    ],
    estimatedExposure: "Low–Medium per entity; significant in aggregate",
  },
  {
    sector: "Holding Companies & SPVs",
    icon: "🏢",
    riskLevel: "Very High",
    riskColor: "#dc2626",
    entityCount: "1,000+",
    description:
      "The Bahamas hosts thousands of intermediate holding companies and special purpose vehicles for MNE groups. These entities often hold IP, equity stakes, or inter-company loans with minimal local substance.",
    keyEntities: [
      "Intermediate holding companies for Latin America / Caribbean regional structures",
      "IP holding entities (patents, trademarks, trade names)",
      "Inter-company financing vehicles",
      "Joint venture holding vehicles",
    ],
    dmttConsiderations: [
      "Low substance = minimal SBIE benefit → higher taxable GloBE income",
      "Passive income (dividends, interest, royalties) fully subject to GloBE unless excluded",
      "De minimis exclusion key — entities with <€10M revenue often excluded entirely",
      "Groups may restructure to consolidate Bahamas entities or relocate low-substance SPVs",
      "Significant compliance trigger: many MNE treasury teams unaware of Bahamas entity scope",
    ],
    estimatedExposure: "Very High — primary DMTT revenue source",
  },
  {
    sector: "Shipping & Maritime",
    icon: "🚢",
    riskLevel: "Medium",
    riskColor: "#f59e0b",
    entityCount: "500+",
    description:
      "The Bahamas is the 3rd largest ship registry globally (~900 vessels, 60M+ GT). Cruise lines are headquartered or incorporated in the Bahamas. GloBE shipping income exclusion provides significant relief.",
    keyEntities: [
      "Carnival Corporation & plc (NYSE: CCL — dual HQ Miami/Bahamas)",
      "Norwegian Cruise Line Holdings (Bermuda, Bahamas operations)",
      "MSC Cruises (privately held, Caribbean/Bahamas operations)",
      "Dry bulk, container and tanker shipping companies using Bahamas flag",
    ],
    dmttConsiderations: [
      "International shipping income excluded from GloBE if substantive activity tests met (Art. 3.3)",
      "Port and terminal income, on-shore hospitality revenue NOT excluded",
      "Cruise lines: revenue from excursions, retail, casino may be GloBE-taxable",
      "Large employee bases on ships may qualify for SBIE payroll exclusion",
      "Carnival: dual-listed entity — complex Bahamas/US treatment",
    ],
    estimatedExposure: "Low (shipping exclusion applies) — except non-shipping income streams",
  },
  {
    sector: "Insurance & Reinsurance",
    icon: "🛡️",
    riskLevel: "Medium",
    riskColor: "#f59e0b",
    entityCount: "200+",
    description:
      "The Bahamas is a top-tier captive insurance domicile regulated by the Insurance Commission of the Bahamas (ICB). Captive insurers, protected cell companies (PCCs), and reinsurers are present.",
    keyEntities: [
      "Captive insurers affiliated with Fortune 500 and FTSE 100 groups",
      "Protected Cell Companies (PCCs) for risk segmentation",
      "Life insurance holding companies",
      "Reinsurance vehicles for global insurance groups (AIG, Zurich, Munich Re subsidiaries)",
    ],
    dmttConsiderations: [
      "Captives owned by qualifying MNE groups ARE within scope",
      "Insurance technical reserves treated as covered taxes in some cases — GloBE Art. 4 adjustments complex",
      "Deferred acquisition costs, unearned premium reserves: specific GloBE adjustments required",
      "Captives with low premiums may fall under de minimis exclusion",
      "ICB regulatory capital requirements may interact with deferred tax calculations",
    ],
    estimatedExposure: "Medium — captives often below de minimis; larger insurers moderate exposure",
  },
  {
    sector: "Investment Funds",
    icon: "📈",
    riskLevel: "Low",
    riskColor: "#10b981",
    entityCount: "800+",
    description:
      "The Bahamas Securities Commission regulates ~800 registered investment funds. Most are excluded from GloBE as investment fund UPEs or are below de minimis thresholds.",
    keyEntities: [
      "Open-ended and closed-end investment funds (hedge funds, private equity)",
      "SMART funds (Bahamas-specific flexible fund structure)",
      "Family office vehicles",
      "ETF and mutual fund structures",
    ],
    dmttConsiderations: [
      "Investment funds as UPEs: EXCLUDED from GloBE entirely (Art. 1.5)",
      "Sub-funds of larger fund managers: if manager group > €750M, fund entities may be in scope",
      "Carried interest vehicles: subject to specific GloBE treatment",
      "Family office funds: typically below revenue threshold or excluded as investment funds",
      "Watch: fund management entities (GPs, advisers) are NOT excluded if part of qualifying MNE group",
    ],
    estimatedExposure: "Low — most funds excluded; management entities moderate risk",
  },
  {
    sector: "Hospitality & Real Estate",
    icon: "🏨",
    riskLevel: "High",
    riskColor: "#ef4444",
    entityCount: "50+",
    description:
      "Major resort operators, hotel developers and real estate holding companies. High-profile integrated resorts (Atlantis, Baha Mar) are anchored by entities with complex ownership structures spanning multiple jurisdictions.",
    keyEntities: [
      "Atlantis Paradise Island (Brookfield Asset Management, Toronto)",
      "Baha Mar (Chow Tai Fook Enterprises, Hong Kong)",
      "Sandals Resorts International (subsidiary of Sandals Group, Jamaica)",
      "Club Med resort entities (Fosun International, Shanghai)",
      "Real estate investment and development SPVs linked to global property groups",
    ],
    dmttConsiderations: [
      "Resort operations generate significant Bahamas-source income — directly subject to DMTT",
      "Bahamas has substantial tangible assets (buildings, fixtures) → material SBIE asset exclusion",
      "Large local workforce → significant SBIE payroll exclusion",
      "Parent groups may be large enough to trigger €750M threshold (Brookfield: C$1T+ AUM)",
      "Real estate groups: depreciation timing differences create deferred tax complexity",
      "Franchise fees, management fees flowing to parent: covered by GloBE royalty provisions",
    ],
    estimatedExposure: "High — significant local income and assets, minimal pre-existing tax shield",
  },
  {
    sector: "Oil, Gas & Energy",
    icon: "⚡",
    riskLevel: "Low–Medium",
    riskColor: "#f59e0b",
    entityCount: "30+",
    description:
      "Bahamas entities used as holding vehicles for Caribbean and Latin American upstream/downstream operations. Some LNG and pipeline projects routed through Bahamas SPVs.",
    keyEntities: [
      "Energy company holding entities (BP, Shell, ExxonMobil Caribbean subsidiaries)",
      "LNG import terminal holding companies",
      "Pipeline and infrastructure SPVs",
      "Commodity trading vehicles",
    ],
    dmttConsiderations: [
      "Holding entities with passive income: high DMTT exposure if income > de minimis",
      "Extractive income: special GloBE rules may apply (Art. 3.2 exclusions limited)",
      "High asset base for infrastructure entities supports SBIE tangible asset component",
      "Thin capitalisation within GloBE framework — inter-company debt interest treatment",
    ],
    estimatedExposure: "Low–Medium — depends on entity function and income type",
  },
  {
    sector: "Technology & Digital",
    icon: "💻",
    riskLevel: "Medium",
    riskColor: "#f59e0b",
    entityCount: "100+",
    description:
      "Technology companies, digital asset firms, and fintech entities. Post-FTX collapse, the regulatory environment has been restructured. Legitimate tech/fintech entities with Bahamas licensing persist.",
    keyEntities: [
      "Digital asset/crypto exchanges and custodians (post-FTX regulatory overhaul)",
      "Fintech companies with DARE Act licensing",
      "Software and IP holding entities for tech MNE groups",
      "e-Commerce regional distribution entities",
    ],
    dmttConsiderations: [
      "IP holding companies without substance: minimal SBIE → full GloBE exposure",
      "Digital asset companies: novel GloBE classification issues (crypto as financial instruments?)",
      "Post-FTX: BRC scrutiny heightened on digital asset entities",
      "Revenue from intangibles flowing through Bahamas: classic Pillar Two target",
      "DARE Act entities: if parent group >€750M, fully within DMTT scope",
    ],
    estimatedExposure: "Medium — especially for IP and digital asset holding structures",
  },
];

export const BAHAMAS_COMPLIANCE_CHECKLIST = [
  { step: 1, category: "Scoping", task: "Identify all Bahamas constituent entities of the MNE group", deadline: "Ongoing", priority: "critical" },
  { step: 2, category: "Scoping", task: "Confirm group consolidated revenue meets €750M threshold", deadline: "Before FY2025 end", priority: "critical" },
  { step: 3, category: "Scoping", task: "Assess each entity: investment fund exclusion? Shipping exclusion? Pension fund?", deadline: "Q1 2025", priority: "high" },
  { step: 4, category: "Registration", task: "Register qualifying entities with Bahamas Revenue Commission (BRC)", deadline: "2025", priority: "critical" },
  { step: 5, category: "Data Collection", task: "Obtain audited financial statements for each Bahamas constituent entity", deadline: "Post-FY2025 close", priority: "high" },
  { step: 6, category: "Data Collection", task: "Compile qualifying payroll data (per Art. 5.3 SBIE payroll component)", deadline: "Q2 2026", priority: "high" },
  { step: 7, category: "Data Collection", task: "Determine net book value of qualifying tangible assets (SBIE asset component)", deadline: "Q2 2026", priority: "high" },
  { step: 8, category: "Safe Harbour", task: "Assess Transitional CbCR Safe Harbour eligibility (first 3 years)", deadline: "Q1 2026", priority: "high" },
  { step: 9, category: "Safe Harbour", task: "Assess de minimis exclusion for each entity (revenue <€10M, income <€1M)", deadline: "Q1 2026", priority: "medium" },
  { step: 10, category: "Computation", task: "Compute Adjusted Covered Taxes (current + deferred, with GloBE adjustments)", deadline: "Q2 2026", priority: "critical" },
  { step: 11, category: "Computation", task: "Compute GloBE Income/Loss per entity and aggregate to jurisdiction level", deadline: "Q2 2026", priority: "critical" },
  { step: 12, category: "Computation", task: "Calculate SBIE exclusion (payroll + asset components, 2025 rates: 10%/8%)", deadline: "Q2 2026", priority: "high" },
  { step: 13, category: "Computation", task: "Calculate ETR and Top-Up Tax Percentage", deadline: "Q2 2026", priority: "critical" },
  { step: 14, category: "Filing", task: "File Globe Information Return with BRC (or via exchange if UPE in exchange partner jurisdiction)", deadline: "June 30, 2026 (est.)", priority: "critical" },
  { step: 15, category: "Filing", task: "File local Bahamas DMTT return and pay any liability", deadline: "June 30, 2026 (est.)", priority: "critical" },
  { step: 16, category: "Ongoing", task: "Monitor BRC administrative guidance updates and OECD technical notes", deadline: "Ongoing", priority: "medium" },
];

export const BAHAMAS_ETR_SCENARIOS = [
  {
    entityType: "Pure Holding Company (Dividends Only)",
    annualRevenue: 50,
    globeIncome: 45,
    payroll: 0.5,
    assets: 2,
    coveredTaxes: 0,
    sbiePayroll: 0.05, // 10% of 0.5
    sbieAssets: 0.16, // 8% of 2
    notes: "Minimal local substance. Dividend income may be excluded under Art. 7.5 (dividend exclusion) if from non-Bahamas subsidiaries.",
  },
  {
    entityType: "IP Holding Company (Royalties)",
    annualRevenue: 200,
    globeIncome: 180,
    payroll: 2,
    assets: 5,
    coveredTaxes: 0,
    sbiePayroll: 0.2,
    sbieAssets: 0.4,
    notes: "Low substance, high royalty income. Primary DMTT target. Minimal SBIE relief. Full 15% top-up likely applicable.",
  },
  {
    entityType: "Banking Subsidiary (Private Wealth)",
    annualRevenue: 80,
    globeIncome: 25,
    payroll: 30,
    assets: 15,
    coveredTaxes: 0,
    sbiePayroll: 3.0,
    sbieAssets: 1.2,
    notes: "High payroll relative to income. SBIE significantly reduces GloBE income. De minimis may apply depending on final income figure.",
  },
  {
    entityType: "Cruise Line Operator (Bahamas Entity)",
    annualRevenue: 500,
    globeIncome: 60,
    payroll: 80,
    assets: 400,
    coveredTaxes: 0,
    sbiePayroll: 8.0,
    sbieAssets: 32,
    notes: "Shipping income excluded (Art. 3.3). Only non-shipping income (excursions, retail, casino) in scope. Massive SBIE from crew payroll and vessel assets.",
  },
  {
    entityType: "Integrated Resort (Hotel Operations)",
    annualRevenue: 300,
    globeIncome: 45,
    payroll: 60,
    assets: 500,
    coveredTaxes: 0,
    sbiePayroll: 6.0,
    sbieAssets: 40,
    notes: "Strong tangible asset base (buildings, fixtures). Large local workforce. SBIE may reduce or eliminate net taxable GloBE income.",
  },
  {
    entityType: "Captive Insurance Company",
    annualRevenue: 8,
    globeIncome: 2,
    payroll: 0.3,
    assets: 12,
    coveredTaxes: 0,
    sbiePayroll: 0.03,
    sbieAssets: 0.96,
    notes: "Likely below €10M revenue de minimis threshold — DMTT excluded entirely. If slightly above: insurance-specific GloBE adjustments complex.",
  },
];

export const BAHAMAS_MACRO = {
  gdp2023: 14.7, // USD Billions (World Bank, 2023)
  corporateSector: 35, // % of GDP — financial/professional services
  registeredCompanies: 18000, // approximate IBCs etc.
  mneGroupsEstimated: 400, // MNE groups with Bahamas entities above threshold
  estimatedDMTTRevenue: {
    low: 180, // USD millions per year
    mid: 350,
    high: 600,
  },
  currentTaxRevenue: 2200, // USD millions (VAT, import duties, business licenses)
  vatRate: 10, // Bahamas VAT introduced 2015, increased 2018
  noTaxTreaties: true, // Bahamas has very few tax treaties
  exchangeAgreements: "TIEA with 30+ jurisdictions; CRS and FATCA compliant",
};

export const BAHAMAS_COMPARISON = [
  { jurisdiction: "Bahamas", historicCIT: 0, afterDMTT: 15, approach: "QDMTT", effective: "Jan 2025" },
  { jurisdiction: "Cayman Islands", historicCIT: 0, afterDMTT: 0, approach: "None enacted", effective: "N/A" },
  { jurisdiction: "British Virgin Islands", historicCIT: 0, afterDMTT: 0, approach: "Consultation", effective: "TBD" },
  { jurisdiction: "Bermuda", historicCIT: 0, afterDMTT: 15, approach: "Corporate Income Tax (15%)", effective: "Jan 2025" },
  { jurisdiction: "Cayman (future)", historicCIT: 0, afterDMTT: 15, approach: "Proposed QDMTT", effective: "2025-2026" },
  { jurisdiction: "Jersey", historicCIT: 0, afterDMTT: 15, approach: "QDMTT enacted", effective: "Jan 2025" },
  { jurisdiction: "Guernsey", historicCIT: 0, afterDMTT: 15, approach: "QDMTT enacted", effective: "Jan 2025" },
  { jurisdiction: "Isle of Man", historicCIT: 0, afterDMTT: 15, approach: "QDMTT enacted", effective: "Jan 2025" },
  { jurisdiction: "UAE (excl. free zones)", historicCIT: 0, afterDMTT: 15, approach: "QDMTT enacted", effective: "Jan 2025" },
  { jurisdiction: "Singapore", historicCIT: 17, afterDMTT: 17, approach: "QDMTT enacted", effective: "Jan 2025" },
];

export const BAHAMAS_OECD_LINKS = [
  { title: "Bahamas — OECD Inclusive Framework Member", url: "https://www.oecd.org/tax/beps/inclusive-framework-on-beps-composition.pdf" },
  { title: "OECD QDMTT Safe Harbour Guidance", url: "https://www.oecd.org/tax/beps/oecd-releases-administrative-guidance-on-the-global-minimum-tax.htm" },
  { title: "Bahamas Revenue Commission", url: "https://www.bahamas.gov.bs/brc" },
  { title: "GloBE Model Rules (2021)", url: "https://www.oecd.org/tax/beps/tax-challenges-arising-from-the-digitalisation-of-the-economy-global-anti-base-erosion-model-rules-pillar-two.htm" },
  { title: "OECD Pillar Two Implementation Status", url: "https://www.oecd.org/tax/beps/pillar-two-implementation.htm" },
  { title: "Transitional Safe Harbour Guidance", url: "https://www.oecd.org/tax/beps/safe-harbours-and-penalty-relief-global-anti-base-erosion-rules-pillar-two.pdf" },
];
