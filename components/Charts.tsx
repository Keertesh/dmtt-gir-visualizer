"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ReferenceLine, ComposedChart, Area,
} from "recharts";
import {
  DMTT_COUNTRIES, ETR_COMPARISON_DATA, PILLAR_TWO_TIMELINE,
  STATUS_COLORS, REGION_SUMMARY, GIR_REQUIREMENTS,
} from "@/data/dmtt-data";

const CHART_COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#6b7280"];

// 1. Implementation Status by Region
export function RegionStatusChart() {
  const data = Object.entries(REGION_SUMMARY).map(([region, counts]) => ({
    region: region.replace("Asia-Pacific", "APAC").replace("Americas", "Americas").replace("Middle East", "MidEast"),
    enacted: counts.enacted || 0,
    draft: counts.draft || 0,
    consultation: counts.consultation || 0,
    announced: counts.announced || 0,
    none: counts.none || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="region" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
          itemStyle={{ color: "#94a3b8" }}
        />
        <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
        <Bar dataKey="enacted" name="Enacted" fill={STATUS_COLORS.enacted} stackId="a" radius={[0, 0, 0, 0]} />
        <Bar dataKey="draft" name="Draft" fill={STATUS_COLORS.draft} stackId="a" />
        <Bar dataKey="consultation" name="Consultation" fill={STATUS_COLORS.consultation} stackId="a" />
        <Bar dataKey="announced" name="Announced" fill={STATUS_COLORS.announced} stackId="a" />
        <Bar dataKey="none" name="None" fill={STATUS_COLORS.none} stackId="a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// 2. ETR vs 15% Minimum
export function ETRComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={ETR_COMPARISON_DATA} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="country"
          tick={{ fill: "#94a3b8", fontSize: 10 }}
          angle={-40}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 35]} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
          formatter={(value: any) => [`${value}%`, ""]}
        />
        <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
        <Bar dataKey="statutory" name="Statutory CIT Rate" fill="#3b82f6" opacity={0.7} />
        <Bar dataKey="effectiveEstimate" name="Estimated ETR" fill="#10b981" opacity={0.9} />
        <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="6 3" strokeWidth={2} label={{ value: "15% Minimum", position: "insideTopRight", fill: "#ef4444", fontSize: 11 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// 3. Global DMTT Status Pie
export function GlobalStatusPie() {
  const counts = DMTT_COUNTRIES.reduce((acc, c) => {
    acc[c.dmttStatus] = (acc[c.dmttStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(counts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={{ stroke: "#475569" }}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          itemStyle={{ color: "#94a3b8" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// 4. CIT Rate Trends (from OECD data)
export function CITTrendChart({ data }: { data: { country: string; rate2018: number; rate2020: number; rate2022: number; rate2023: number }[] }) {
  const topCountries = data.slice(0, 12);
  const chartData = [
    { year: "2018", ...topCountries.reduce((a, c) => ({ ...a, [c.country.replace(" ", "")]: c.rate2018 }), {}) },
    { year: "2020", ...topCountries.reduce((a, c) => ({ ...a, [c.country.replace(" ", "")]: c.rate2020 }), {}) },
    { year: "2022", ...topCountries.reduce((a, c) => ({ ...a, [c.country.replace(" ", "")]: c.rate2022 }), {}) },
    { year: "2023", ...topCountries.reduce((a, c) => ({ ...a, [c.country.replace(" ", "")]: c.rate2023 }), {}) },
  ];

  const lineColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#84cc16", "#ec4899", "#a78bfa", "#34d399", "#fbbf24"];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 40]} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
          formatter={(v: any) => `${v}%`}
        />
        <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5} label={{ value: "15% GloBE min", fill: "#ef4444", fontSize: 10 }} />
        {topCountries.map((c, i) => (
          <Line
            key={c.country}
            type="monotone"
            dataKey={c.country.replace(" ", "")}
            name={c.country}
            stroke={lineColors[i % lineColors.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// 5. GIR Filing Requirements Chart
export function GIRFilingChart() {
  const data = GIR_REQUIREMENTS.map((r) => ({
    country: r.country.replace("United ", "").replace("South ", "S. "),
    features: [
      r.localFilingRequired ? 1 : 0,
      r.exchangePartner ? 1 : 0,
      r.xmlSchema ? 1 : 0,
      r.extensionAvailable ? 1 : 0,
    ].reduce((a, b) => a + b, 0),
    localFiling: r.localFilingRequired ? 1 : 0,
    exchange: r.exchangePartner ? 1 : 0,
    xmlSchema: r.xmlSchema ? 1 : 0,
    extension: r.extensionAvailable ? 1 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="country" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 4]} tickCount={5} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
        />
        <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
        <Bar dataKey="localFiling" name="Local Filing Required" fill="#10b981" stackId="a" />
        <Bar dataKey="exchange" name="Exchange Partner" fill="#3b82f6" stackId="a" />
        <Bar dataKey="xmlSchema" name="XML Schema" fill="#8b5cf6" stackId="a" />
        <Bar dataKey="extension" name="Extension Available" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// 6. Revenue Impact Chart
export function RevenueImpactChart() {
  const data = DMTT_COUNTRIES
    .filter((c) => c.estimatedRevenue !== null)
    .sort((a, b) => (b.estimatedRevenue || 0) - (a.estimatedRevenue || 0))
    .slice(0, 12)
    .map((c) => ({
      country: c.name.replace("United ", "").replace("South ", "S."),
      revenue: c.estimatedRevenue,
      etr: c.estimatedETR,
      color: STATUS_COLORS[c.dmttStatus],
    }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 50 }} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `$${v.toLocaleString()}M`} />
        <YAxis dataKey="country" type="category" tick={{ fill: "#94a3b8", fontSize: 11 }} width={80} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
          formatter={(v: any) => [`$${Number(v).toLocaleString()}M`, "Est. Revenue"]}
        />
        <Bar dataKey="revenue" name="Est. Annual Revenue" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} opacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
