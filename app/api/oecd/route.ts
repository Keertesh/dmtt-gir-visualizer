import { NextRequest, NextResponse } from "next/server";

// OECD SDMX Public API - Corporate Tax Statistics
// Docs: https://sdmx.oecd.org/public/rest/
const OECD_SDMX_BASE = "https://sdmx.oecd.org/public/rest";
const WORLD_BANK_BASE = "https://api.worldbank.org/v2";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dataset = searchParams.get("dataset") || "cit_rates";

  try {
    if (dataset === "cit_rates") {
      // OECD Corporate Income Tax Rates
      const url = `${OECD_SDMX_BASE}/data/OECD.CTP.TPS,DSD_CTS_BTR@DF_CTS_BTR/A..CIT.....?startPeriod=2018&endPeriod=2023&format=jsondata&dimensionAtObservation=AllDimensions`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 }, // cache 24h
      });

      if (!res.ok) {
        // Fallback to static data if OECD API is unavailable
        return NextResponse.json({ source: "fallback", data: FALLBACK_CIT_RATES });
      }

      const json = await res.json();
      return NextResponse.json({ source: "oecd_api", data: json });
    }

    if (dataset === "gdp") {
      // World Bank GDP data for context
      const url = `${WORLD_BANK_BASE}/country/all/indicator/NY.GDP.MKTP.CD?format=json&per_page=300&mrv=1&date=2022`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (!res.ok) throw new Error("World Bank API unavailable");
      const json = await res.json();
      return NextResponse.json({ source: "world_bank", data: json });
    }

    if (dataset === "tax_revenue") {
      // OECD Global Revenue Statistics
      const url = `${OECD_SDMX_BASE}/data/OECD.CTP.TPS,DSD_REV@DF_REV/A..._T.4100..TAXGDP?startPeriod=2019&endPeriod=2022&format=jsondata&dimensionAtObservation=AllDimensions`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        return NextResponse.json({ source: "fallback", data: FALLBACK_TAX_REVENUE });
      }
      const json = await res.json();
      return NextResponse.json({ source: "oecd_api", data: json });
    }

    return NextResponse.json({ error: "Unknown dataset" }, { status: 400 });
  } catch (err) {
    console.error("OECD API error:", err);
    return NextResponse.json({ source: "fallback", data: FALLBACK_CIT_RATES });
  }
}

// Fallback static data from OECD Tax Database (public)
// Source: OECD (2023), Corporate Tax Statistics, https://www.oecd.org/tax/tax-policy/corporate-tax-statistics.htm
const FALLBACK_CIT_RATES = [
  { iso2: "AU", country: "Australia", rate2018: 30, rate2020: 30, rate2022: 30, rate2023: 30 },
  { iso2: "AT", country: "Austria", rate2018: 25, rate2020: 25, rate2022: 25, rate2023: 23 },
  { iso2: "BE", country: "Belgium", rate2018: 29.58, rate2020: 25, rate2022: 25, rate2023: 25 },
  { iso2: "BR", country: "Brazil", rate2018: 34, rate2020: 34, rate2022: 34, rate2023: 34 },
  { iso2: "CA", country: "Canada", rate2018: 26.5, rate2020: 26.5, rate2022: 26.5, rate2023: 26.5 },
  { iso2: "CN", country: "China", rate2018: 25, rate2020: 25, rate2022: 25, rate2023: 25 },
  { iso2: "CY", country: "Cyprus", rate2018: 12.5, rate2020: 12.5, rate2022: 12.5, rate2023: 12.5 },
  { iso2: "CZ", country: "Czech Republic", rate2018: 19, rate2020: 19, rate2022: 19, rate2023: 19 },
  { iso2: "DK", country: "Denmark", rate2018: 22, rate2020: 22, rate2022: 22, rate2023: 22 },
  { iso2: "FI", country: "Finland", rate2018: 20, rate2020: 20, rate2022: 20, rate2023: 20 },
  { iso2: "FR", country: "France", rate2018: 33.33, rate2020: 32, rate2022: 25, rate2023: 25 },
  { iso2: "DE", country: "Germany", rate2018: 29.9, rate2020: 29.9, rate2022: 29.9, rate2023: 29.9 },
  { iso2: "HK", country: "Hong Kong", rate2018: 16.5, rate2020: 16.5, rate2022: 16.5, rate2023: 16.5 },
  { iso2: "HU", country: "Hungary", rate2018: 9, rate2020: 9, rate2022: 9, rate2023: 9 },
  { iso2: "IE", country: "Ireland", rate2018: 12.5, rate2020: 12.5, rate2022: 12.5, rate2023: 12.5 },
  { iso2: "IL", country: "Israel", rate2018: 23, rate2020: 23, rate2022: 23, rate2023: 23 },
  { iso2: "IT", country: "Italy", rate2018: 27.9, rate2020: 27.9, rate2022: 27.9, rate2023: 27.9 },
  { iso2: "JP", country: "Japan", rate2018: 29.74, rate2020: 29.74, rate2022: 29.74, rate2023: 29.74 },
  { iso2: "KR", country: "South Korea", rate2018: 27.5, rate2020: 25, rate2022: 26.5, rate2023: 26.5 },
  { iso2: "LU", country: "Luxembourg", rate2018: 26.01, rate2020: 24.94, rate2022: 24.94, rate2023: 24.94 },
  { iso2: "MY", country: "Malaysia", rate2018: 24, rate2020: 24, rate2022: 24, rate2023: 24 },
  { iso2: "MT", country: "Malta", rate2018: 35, rate2020: 35, rate2022: 35, rate2023: 35 },
  { iso2: "MX", country: "Mexico", rate2018: 30, rate2020: 30, rate2022: 30, rate2023: 30 },
  { iso2: "NL", country: "Netherlands", rate2018: 25, rate2020: 25, rate2022: 25.8, rate2023: 25.8 },
  { iso2: "NZ", country: "New Zealand", rate2018: 28, rate2020: 28, rate2022: 28, rate2023: 28 },
  { iso2: "NO", country: "Norway", rate2018: 23, rate2020: 22, rate2022: 22, rate2023: 22 },
  { iso2: "PL", country: "Poland", rate2018: 19, rate2020: 19, rate2022: 19, rate2023: 19 },
  { iso2: "PT", country: "Portugal", rate2018: 21, rate2020: 21, rate2022: 21, rate2023: 21 },
  { iso2: "SA", country: "Saudi Arabia", rate2018: 20, rate2020: 20, rate2022: 20, rate2023: 20 },
  { iso2: "SG", country: "Singapore", rate2018: 17, rate2020: 17, rate2022: 17, rate2023: 17 },
  { iso2: "ZA", country: "South Africa", rate2018: 28, rate2020: 28, rate2022: 27, rate2023: 27 },
  { iso2: "ES", country: "Spain", rate2018: 25, rate2020: 25, rate2022: 25, rate2023: 25 },
  { iso2: "SE", country: "Sweden", rate2018: 22, rate2020: 21.4, rate2022: 20.6, rate2023: 20.6 },
  { iso2: "CH", country: "Switzerland", rate2018: 17.77, rate2020: 14.9, rate2022: 14.9, rate2023: 14.9 },
  { iso2: "TH", country: "Thailand", rate2018: 20, rate2020: 20, rate2022: 20, rate2023: 20 },
  { iso2: "AE", country: "UAE", rate2018: 0, rate2020: 0, rate2022: 9, rate2023: 9 },
  { iso2: "GB", country: "United Kingdom", rate2018: 19, rate2020: 19, rate2022: 19, rate2023: 25 },
  { iso2: "US", country: "United States", rate2018: 21, rate2020: 21, rate2022: 21, rate2023: 21 },
  { iso2: "VN", country: "Vietnam", rate2018: 20, rate2020: 20, rate2022: 20, rate2023: 20 },
];

const FALLBACK_TAX_REVENUE = [
  { iso2: "AU", country: "Australia", corporateTaxToGDP: 5.5 },
  { iso2: "GB", country: "United Kingdom", corporateTaxToGDP: 3.8 },
  { iso2: "DE", country: "Germany", corporateTaxToGDP: 2.7 },
  { iso2: "FR", country: "France", corporateTaxToGDP: 3.2 },
  { iso2: "JP", country: "Japan", corporateTaxToGDP: 4.1 },
  { iso2: "US", country: "United States", corporateTaxToGDP: 1.8 },
  { iso2: "IE", country: "Ireland", corporateTaxToGDP: 6.2 },
  { iso2: "CH", country: "Switzerland", corporateTaxToGDP: 3.6 },
];
