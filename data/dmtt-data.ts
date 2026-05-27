// DMTT & OECD Pillar Two GIR Data
// Sources: OECD Pillar Two Framework, country legislation trackers (public)

export interface CountryDMTT {
  iso3: string;
  iso2: string;
  name: string;
  region: string;
  // Implementation status
  dmttStatus: "enacted" | "draft" | "consultation" | "announced" | "none";
  girStatus: "enacted" | "draft" | "consultation" | "announced" | "none";
  irmStatus: "enacted" | "draft" | "consultation" | "announced" | "none"; // Income Inclusion Rule
  utprStatus: "enacted" | "draft" | "consultation" | "announced" | "none"; // Undertaxed Profits Rule
  effectiveDate: string | null;
  statutoryCITRate: number; // Corporate Income Tax rate %
  estimatedETR: number | null; // Estimated Effective Tax Rate %
  pillarTwoAdopted: boolean;
  estimatedRevenue: number | null; // USD Millions
  notes: string;
}

export interface GIRRequirement {
  country: string;
  iso2: string;
  filingDeadline: string;
  firstFiscalYear: string;
  extensionAvailable: boolean;
  localFilingRequired: boolean;
  exchangePartner: boolean;
  xmlSchema: boolean;
  penaltyForNonFiling: string;
}

export const DMTT_COUNTRIES: CountryDMTT[] = [
  // ENACTED
  {
    iso3: "GBR", iso2: "GB", name: "United Kingdom", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 25, estimatedETR: 19.8, pillarTwoAdopted: true,
    estimatedRevenue: 2100, notes: "Finance Act 2023. DMTT, IIR and UTPR all in force."
  },
  {
    iso3: "DEU", iso2: "DE", name: "Germany", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 29.9, estimatedETR: 22.1, pillarTwoAdopted: true,
    estimatedRevenue: 1800, notes: "Minimum Tax Act (MinStG) enacted Dec 2023."
  },
  {
    iso3: "FRA", iso2: "FR", name: "France", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 25, estimatedETR: 20.5, pillarTwoAdopted: true,
    estimatedRevenue: 1500, notes: "Finance Law 2024. Full Pillar Two implementation."
  },
  {
    iso3: "NLD", iso2: "NL", name: "Netherlands", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 25.8, estimatedETR: 18.7, pillarTwoAdopted: true,
    estimatedRevenue: 950, notes: "Wet minimumbelasting 2024 enacted."
  },
  {
    iso3: "CHE", iso2: "CH", name: "Switzerland", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "announced", utprStatus: "announced",
    effectiveDate: "2024-01-01", statutoryCITRate: 14.9, estimatedETR: 12.1, pillarTwoAdopted: true,
    estimatedRevenue: 1200, notes: "Constitutional amendment approved 2023. DMTT via QDMTT."
  },
  {
    iso3: "IRL", iso2: "IE", name: "Ireland", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 12.5, estimatedETR: 10.2, pillarTwoAdopted: true,
    estimatedRevenue: 2300, notes: "Finance (No.2) Act 2023. Major change from 12.5% regime."
  },
  {
    iso3: "LUX", iso2: "LU", name: "Luxembourg", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 24.94, estimatedETR: 16.8, pillarTwoAdopted: true,
    estimatedRevenue: 480, notes: "Law of 22 December 2023 transposing EU Directive."
  },
  {
    iso3: "AUT", iso2: "AT", name: "Austria", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 23, estimatedETR: 19.4, pillarTwoAdopted: true,
    estimatedRevenue: 320, notes: "MinBestG enacted December 2023."
  },
  {
    iso3: "BEL", iso2: "BE", name: "Belgium", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 25, estimatedETR: 20.1, pillarTwoAdopted: true,
    estimatedRevenue: 580, notes: "Law of 19 December 2023."
  },
  {
    iso3: "DNK", iso2: "DK", name: "Denmark", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 22, estimatedETR: 18.9, pillarTwoAdopted: true,
    estimatedRevenue: 280, notes: "Minimum Tax Act enacted December 2023."
  },
  {
    iso3: "SWE", iso2: "SE", name: "Sweden", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 20.6, estimatedETR: 17.8, pillarTwoAdopted: true,
    estimatedRevenue: 340, notes: "Lag om tilläggsskatt enacted December 2023."
  },
  {
    iso3: "NOR", iso2: "NO", name: "Norway", region: "Europe",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "enacted", utprStatus: "draft",
    effectiveDate: "2024-01-01", statutoryCITRate: 22, estimatedETR: 19.2, pillarTwoAdopted: true,
    estimatedRevenue: 290, notes: "Supplementary Tax Act 2023."
  },
  {
    iso3: "FIN", iso2: "FI", name: "Finland", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 20, estimatedETR: 17.5, pillarTwoAdopted: true,
    estimatedRevenue: 180, notes: "Lisäverolakilaki enacted December 2023."
  },
  {
    iso3: "ESP", iso2: "ES", name: "Spain", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 25, estimatedETR: 19.8, pillarTwoAdopted: true,
    estimatedRevenue: 820, notes: "Royal Decree-Law transposing EU Pillar Two Directive."
  },
  {
    iso3: "ITA", iso2: "IT", name: "Italy", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 27.9, estimatedETR: 22.6, pillarTwoAdopted: true,
    estimatedRevenue: 690, notes: "Legislative Decree 209/2023."
  },
  {
    iso3: "JPN", iso2: "JP", name: "Japan", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "draft",
    effectiveDate: "2024-04-01", statutoryCITRate: 29.74, estimatedETR: 24.8, pillarTwoAdopted: true,
    estimatedRevenue: 3200, notes: "Tax Reform Act 2023. IIR in force, UTPR deferred."
  },
  {
    iso3: "KOR", iso2: "KR", name: "South Korea", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 26.5, estimatedETR: 21.4, pillarTwoAdopted: true,
    estimatedRevenue: 980, notes: "Corporate Tax Act amended December 2023."
  },
  {
    iso3: "AUS", iso2: "AU", name: "Australia", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "enacted", utprStatus: "draft",
    effectiveDate: "2024-01-01", statutoryCITRate: 30, estimatedETR: 25.1, pillarTwoAdopted: true,
    estimatedRevenue: 1100, notes: "Treasury Laws Amendment 2024. IIR enacted, UTPR pending."
  },
  {
    iso3: "NZL", iso2: "NZ", name: "New Zealand", region: "Asia-Pacific",
    dmttStatus: "draft", girStatus: "draft", irmStatus: "draft", utprStatus: "draft",
    effectiveDate: null, statutoryCITRate: 28, estimatedETR: 22.8, pillarTwoAdopted: false,
    estimatedRevenue: 180, notes: "Consultation underway. Legislation expected 2025."
  },
  {
    iso3: "SGP", iso2: "SG", name: "Singapore", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 17, estimatedETR: 12.8, pillarTwoAdopted: true,
    estimatedRevenue: 2100, notes: "QDMTT (refundable) enacted. IIR/UTPR not adopted."
  },
  {
    iso3: "HKG", iso2: "HK", name: "Hong Kong", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 16.5, estimatedETR: 12.4, pillarTwoAdopted: true,
    estimatedRevenue: 760, notes: "HKMTT enacted. QDMTT approach only."
  },
  {
    iso3: "CAN", iso2: "CA", name: "Canada", region: "Americas",
    dmttStatus: "draft", girStatus: "draft", irmStatus: "draft", utprStatus: "draft",
    effectiveDate: null, statutoryCITRate: 26.5, estimatedETR: 21.9, pillarTwoAdopted: false,
    estimatedRevenue: 1800, notes: "Budget 2024 proposals. Legislation delayed pending US position."
  },
  {
    iso3: "USA", iso2: "US", name: "United States", region: "Americas",
    dmttStatus: "none", girStatus: "none", irmStatus: "none", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 21, estimatedETR: 13.2, pillarTwoAdopted: false,
    estimatedRevenue: null, notes: "CAMT (15% book minimum tax) enacted but not Pillar Two compliant."
  },
  {
    iso3: "BRA", iso2: "BR", name: "Brazil", region: "Americas",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "enacted", utprStatus: "draft",
    effectiveDate: "2025-01-01", statutoryCITRate: 34, estimatedETR: 23.6, pillarTwoAdopted: true,
    estimatedRevenue: 940, notes: "Provisional Measure 1262/2024. Significant developing country adopter."
  },
  {
    iso3: "MEX", iso2: "MX", name: "Mexico", region: "Americas",
    dmttStatus: "consultation", girStatus: "none", irmStatus: "consultation", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 30, estimatedETR: 24.1, pillarTwoAdopted: false,
    estimatedRevenue: 520, notes: "Studying implementation. No formal timeline."
  },
  {
    iso3: "ARE", iso2: "AE", name: "UAE", region: "Middle East",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 9, estimatedETR: 4.8, pillarTwoAdopted: true,
    estimatedRevenue: 1800, notes: "UAE CT Law amended. QDMTT approach. Free zone treatment complex."
  },
  {
    iso3: "SAU", iso2: "SA", name: "Saudi Arabia", region: "Middle East",
    dmttStatus: "consultation", girStatus: "none", irmStatus: "none", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 20, estimatedETR: 16.2, pillarTwoAdopted: false,
    estimatedRevenue: null, notes: "ZATCA studying Pillar Two. No formal proposals."
  },
  {
    iso3: "IND", iso2: "IN", name: "India", region: "Asia-Pacific",
    dmttStatus: "consultation", girStatus: "none", irmStatus: "none", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 25.17, estimatedETR: 21.3, pillarTwoAdopted: false,
    estimatedRevenue: 1200, notes: "Studying Subject-to-Tax rule. Unlikely full adoption short-term."
  },
  {
    iso3: "CHN", iso2: "CN", name: "China", region: "Asia-Pacific",
    dmttStatus: "none", girStatus: "none", irmStatus: "none", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 25, estimatedETR: 18.9, pillarTwoAdopted: false,
    estimatedRevenue: null, notes: "No public Pillar Two adoption plans announced."
  },
  {
    iso3: "ZAF", iso2: "ZA", name: "South Africa", region: "Africa",
    dmttStatus: "draft", girStatus: "none", irmStatus: "draft", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 27, estimatedETR: 22.1, pillarTwoAdopted: false,
    estimatedRevenue: 180, notes: "National Treasury draft legislation 2024."
  },
  {
    iso3: "POL", iso2: "PL", name: "Poland", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 19, estimatedETR: 16.4, pillarTwoAdopted: true,
    estimatedRevenue: 230, notes: "EU Directive transposed December 2023."
  },
  {
    iso3: "CZE", iso2: "CZ", name: "Czech Republic", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 21, estimatedETR: 17.8, pillarTwoAdopted: true,
    estimatedRevenue: 120, notes: "Act No. 416/2023 Coll."
  },
  {
    iso3: "HUN", iso2: "HU", name: "Hungary", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 9, estimatedETR: 6.9, pillarTwoAdopted: true,
    estimatedRevenue: 290, notes: "EU Directive transposed. Significant rate uplift from 9%."
  },
  {
    iso3: "PRT", iso2: "PT", name: "Portugal", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 21, estimatedETR: 17.9, pillarTwoAdopted: true,
    estimatedRevenue: 140, notes: "Law 24-E/2022 and subsequent amendments."
  },
  {
    iso3: "MLT", iso2: "MT", name: "Malta", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 35, estimatedETR: 8.2, pillarTwoAdopted: true,
    estimatedRevenue: 85, notes: "Effective rate historically low due to refund system."
  },
  {
    iso3: "CYP", iso2: "CY", name: "Cyprus", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "enacted", utprStatus: "enacted",
    effectiveDate: "2024-01-01", statutoryCITRate: 12.5, estimatedETR: 9.8, pillarTwoAdopted: true,
    estimatedRevenue: 160, notes: "EU Directive transposed December 2023."
  },
  {
    iso3: "ISR", iso2: "IL", name: "Israel", region: "Middle East",
    dmttStatus: "draft", girStatus: "none", irmStatus: "draft", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 23, estimatedETR: 18.4, pillarTwoAdopted: false,
    estimatedRevenue: 320, notes: "Considering adoption. Tech sector implications significant."
  },
  {
    iso3: "IDN", iso2: "ID", name: "Indonesia", region: "Asia-Pacific",
    dmttStatus: "none", girStatus: "none", irmStatus: "none", utprStatus: "none",
    effectiveDate: null, statutoryCITRate: 22, estimatedETR: 18.1, pillarTwoAdopted: false,
    estimatedRevenue: null, notes: "No formal plans. G20 member monitoring developments."
  },
  {
    iso3: "THA", iso2: "TH", name: "Thailand", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 20, estimatedETR: 15.2, pillarTwoAdopted: true,
    estimatedRevenue: 280, notes: "QDMTT enacted via Royal Decree. Investment incentives under review."
  },
  {
    iso3: "MYS", iso2: "MY", name: "Malaysia", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 24, estimatedETR: 18.6, pillarTwoAdopted: true,
    estimatedRevenue: 190, notes: "GMTT enacted Budget 2024."
  },
  {
    iso3: "VNM", iso2: "VN", name: "Vietnam", region: "Asia-Pacific",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2024-01-01", statutoryCITRate: 20, estimatedETR: 12.8, pillarTwoAdopted: true,
    estimatedRevenue: 180, notes: "QDMTT enacted November 2023. Major FDI destination."
  },
  {
    iso3: "BHS", iso2: "BS", name: "Bahamas", region: "Americas",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 0, estimatedETR: 0, pillarTwoAdopted: true,
    estimatedRevenue: 350, notes: "DMTT Act 2024 enacted Dec 30, 2024. QDMTT approach. Historic shift from 0% CIT. BRC administers. First filings due ~June 2026."
  },
  {
    iso3: "BMU", iso2: "BM", name: "Bermuda", region: "Americas",
    dmttStatus: "enacted", girStatus: "draft", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 15, estimatedETR: 0, pillarTwoAdopted: true,
    estimatedRevenue: 750, notes: "Corporate Income Tax Act 2023 — 15% CIT (not QDMTT approach). Massive insurance/reinsurance sector impact."
  },
  {
    iso3: "JEY", iso2: "JE", name: "Jersey", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 0, estimatedETR: 0, pillarTwoAdopted: true,
    estimatedRevenue: 280, notes: "QDMTT enacted. Historic 0% CIT replaced for qualifying MNEs. Financial services hub."
  },
  {
    iso3: "GGY", iso2: "GG", name: "Guernsey", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 0, estimatedETR: 0, pillarTwoAdopted: true,
    estimatedRevenue: 190, notes: "QDMTT enacted. Fund domicile and private wealth centre adapting to Pillar Two."
  },
  {
    iso3: "IMN", iso2: "IM", name: "Isle of Man", region: "Europe",
    dmttStatus: "enacted", girStatus: "enacted", irmStatus: "none", utprStatus: "none",
    effectiveDate: "2025-01-01", statutoryCITRate: 0, estimatedETR: 0, pillarTwoAdopted: true,
    estimatedRevenue: 120, notes: "QDMTT enacted. e-Gaming, insurance and shipping impacted."
  },
];

export const GIR_REQUIREMENTS: GIRRequirement[] = [
  { country: "United Kingdom", iso2: "GB", filingDeadline: "15 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to £10,000" },
  { country: "Germany", iso2: "DE", filingDeadline: "12 months after FY end", firstFiscalYear: "2024", extensionAvailable: false, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to €25,000" },
  { country: "France", iso2: "FR", filingDeadline: "12 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to €20,000" },
  { country: "Netherlands", iso2: "NL", filingDeadline: "15 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to €25,000" },
  { country: "Ireland", iso2: "IE", filingDeadline: "11 months after FY end", firstFiscalYear: "2024", extensionAvailable: false, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to €25,000" },
  { country: "Switzerland", iso2: "CH", filingDeadline: "12 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: false, xmlSchema: true, penaltyForNonFiling: "CHF 100,000" },
  { country: "Japan", iso2: "JP", filingDeadline: "Concurrent with CIT return", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "¥300,000" },
  { country: "South Korea", iso2: "KR", filingDeadline: "12 months after FY end", firstFiscalYear: "2024", extensionAvailable: false, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "KRW 30,000,000" },
  { country: "Australia", iso2: "AU", filingDeadline: "15 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "AUD 33,000" },
  { country: "Singapore", iso2: "SG", filingDeadline: "12 months after FY end", firstFiscalYear: "2025", extensionAvailable: true, localFilingRequired: true, exchangePartner: false, xmlSchema: true, penaltyForNonFiling: "SGD 10,000" },
  { country: "Luxembourg", iso2: "LU", filingDeadline: "15 months after FY end", firstFiscalYear: "2024", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to €25,000" },
  { country: "Brazil", iso2: "BR", filingDeadline: "12 months after FY end", firstFiscalYear: "2025", extensionAvailable: false, localFilingRequired: true, exchangePartner: false, xmlSchema: false, penaltyForNonFiling: "1-20% of tax due" },
  { country: "Bahamas", iso2: "BS", filingDeadline: "18 months (FY2025); 15 months thereafter", firstFiscalYear: "2025", extensionAvailable: false, localFilingRequired: true, exchangePartner: false, xmlSchema: false, penaltyForNonFiling: "Under BRC rules (TBC)" },
  { country: "Bermuda", iso2: "BM", filingDeadline: "15 months after FY end", firstFiscalYear: "2025", extensionAvailable: true, localFilingRequired: true, exchangePartner: false, xmlSchema: true, penaltyForNonFiling: "BMD 25,000" },
  { country: "Jersey", iso2: "JE", filingDeadline: "12 months after FY end", firstFiscalYear: "2025", extensionAvailable: true, localFilingRequired: true, exchangePartner: true, xmlSchema: true, penaltyForNonFiling: "Up to £10,000" },
];

export const PILLAR_TWO_TIMELINE = [
  { year: "2021", event: "OECD/G20 agreement on Two-Pillar Solution", countries: 137 },
  { year: "2022", event: "Model Rules & Commentary released", countries: 141 },
  { year: "2023-Q2", event: "EU Directive 2022/2523 transposition deadline", countries: 27 },
  { year: "2024-Q1", event: "First DMTT/IIR enforcement period begins", countries: 38 },
  { year: "2024-Q3", event: "First GIR filing deadlines approach", countries: 35 },
  { year: "2025-Q1", event: "UTPR enforcement period begins (most jurisdictions)", countries: 42 },
  { year: "2026", event: "STTR (Subject-to-Tax Rule) treaties effective", countries: 20 },
];

export const SAFE_HARBOUR_DATA = [
  { name: "Transitional CbCR Safe Harbour", description: "Based on Country-by-Country Report data", applicableYears: "2024-2026", threshold: "Revenue < €10B or ETR test" },
  { name: "Substance-Based Income Exclusion", description: "5-10% payroll + 5-8% tangible assets exclusion", applicableYears: "Permanent", threshold: "Phased in over 10 years" },
  { name: "De Minimis Exclusion", description: "Revenue < €10M and Income < €1M", applicableYears: "Permanent", threshold: "Per-jurisdiction test" },
  { name: "Simplified Calculations Safe Harbour", description: "Agreed simplified ETR computation", applicableYears: "2024-2026 (transitional)", threshold: "ETR ≥ 15% or CIT rate ≥ 20%" },
];

export const ETR_COMPARISON_DATA = [
  { country: "Ireland", statutory: 12.5, effectiveEstimate: 10.2, afterPillarTwo: 15 },
  { country: "Hungary", statutory: 9, effectiveEstimate: 6.9, afterPillarTwo: 15 },
  { country: "Switzerland", statutory: 14.9, effectiveEstimate: 12.1, afterPillarTwo: 15 },
  { country: "Singapore", statutory: 17, effectiveEstimate: 12.8, afterPillarTwo: 15 },
  { country: "Hong Kong", statutory: 16.5, effectiveEstimate: 12.4, afterPillarTwo: 15 },
  { country: "UAE", statutory: 9, effectiveEstimate: 4.8, afterPillarTwo: 15 },
  { country: "Cyprus", statutory: 12.5, effectiveEstimate: 9.8, afterPillarTwo: 15 },
  { country: "Netherlands", statutory: 25.8, effectiveEstimate: 18.7, afterPillarTwo: 18.7 },
  { country: "Germany", statutory: 29.9, effectiveEstimate: 22.1, afterPillarTwo: 22.1 },
  { country: "Japan", statutory: 29.74, effectiveEstimate: 24.8, afterPillarTwo: 24.8 },
];

export const STATUS_COLORS = {
  enacted: "#10b981",
  draft: "#f59e0b",
  consultation: "#3b82f6",
  announced: "#8b5cf6",
  none: "#6b7280",
};

export const STATUS_LABELS = {
  enacted: "Enacted",
  draft: "Draft Legislation",
  consultation: "Consultation",
  announced: "Announced",
  none: "Not Adopted",
};

export const REGION_SUMMARY = DMTT_COUNTRIES.reduce((acc, c) => {
  if (!acc[c.region]) acc[c.region] = { enacted: 0, draft: 0, consultation: 0, announced: 0, none: 0, total: 0 };
  acc[c.region][c.dmttStatus]++;
  acc[c.region].total++;
  return acc;
}, {} as Record<string, Record<string, number>>);
