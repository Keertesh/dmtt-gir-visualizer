"use client";
import { useEffect, useRef, useState } from "react";
import { DMTT_COUNTRIES, STATUS_COLORS, STATUS_LABELS, CountryDMTT } from "@/data/dmtt-data";

interface WorldMapProps {
  onCountryClick?: (country: CountryDMTT | null) => void;
  highlightField?: "dmttStatus" | "girStatus" | "irmStatus" | "utprStatus";
}

// Simplified world countries with approximate SVG paths (using viewBox 0 0 1000 500)
// This is a simplified map - in production use proper TopoJSON
const COUNTRY_POSITIONS: Record<string, { x: number; y: number; r?: number }> = {
  GB: { x: 475, y: 125 },
  IE: { x: 455, y: 128 },
  FR: { x: 482, y: 145 },
  DE: { x: 505, y: 132 },
  NL: { x: 497, y: 122 },
  BE: { x: 493, y: 131 },
  LU: { x: 498, y: 137 },
  CH: { x: 503, y: 145 },
  AT: { x: 516, y: 142 },
  CZ: { x: 517, y: 135 },
  PL: { x: 527, y: 127 },
  HU: { x: 524, y: 143 },
  SK: { x: 523, y: 138 },
  IT: { x: 508, y: 157 },
  ES: { x: 470, y: 157 },
  PT: { x: 461, y: 162 },
  DK: { x: 503, y: 112 },
  SE: { x: 513, y: 100 },
  NO: { x: 503, y: 97 },
  FI: { x: 528, y: 97 },
  MT: { x: 515, y: 172 },
  CY: { x: 551, y: 168 },
  // Americas
  US: { x: 195, y: 165 },
  CA: { x: 175, y: 130 },
  BR: { x: 295, y: 270 },
  MX: { x: 170, y: 195 },
  AR: { x: 275, y: 330 },
  BS: { x: 225, y: 195, r: 9 }, // Bahamas — highlighted larger
  BM: { x: 245, y: 185 }, // Bermuda
  // Middle East
  AE: { x: 588, y: 185 },
  SA: { x: 574, y: 183 },
  IL: { x: 553, y: 168 },
  // Asia Pacific
  JP: { x: 735, y: 147 },
  KR: { x: 718, y: 152 },
  CN: { x: 690, y: 162 },
  IN: { x: 635, y: 188 },
  SG: { x: 695, y: 233 },
  HK: { x: 710, y: 192 },
  TH: { x: 690, y: 212 },
  MY: { x: 695, y: 225 },
  VN: { x: 703, y: 210 },
  ID: { x: 710, y: 245 },
  AU: { x: 740, y: 315 },
  NZ: { x: 790, y: 345 },
  // Africa
  ZA: { x: 536, y: 335 },
};

export default function WorldMap({ onCountryClick, highlightField = "dmttStatus" }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; country: CountryDMTT | null } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getColor = (iso2: string) => {
    const country = DMTT_COUNTRIES.find((c) => c.iso2 === iso2);
    if (!country) return "#d1d5db";
    const status = country[highlightField];
    return STATUS_COLORS[status] || "#d1d5db";
  };

  return (
    <div className="relative w-full bg-slate-900 rounded-xl overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="100 80 800 320"
        className="w-full h-full"
        style={{ minHeight: 360 }}
      >
        {/* Ocean background */}
        <rect x="100" y="80" width="800" height="320" fill="#0f172a" rx="12" />

        {/* Grid lines */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
          <line key={`vl-${x}`} x1={x} y1="80" x2={x} y2="400" stroke="#1e293b" strokeWidth="0.5" />
        ))}
        {[100, 150, 200, 250, 300, 350].map((y) => (
          <line key={`hl-${y}`} x1="100" y1={y} x2="900" y2={y} stroke="#1e293b" strokeWidth="0.5" />
        ))}

        {/* Equator line */}
        <line x1="100" y1="240" x2="900" y2="240" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="4 4" />
        <text x="105" y="238" fill="#475569" fontSize="7">Equator</text>

        {/* Continent hints (rough outlines) */}
        {/* Europe */}
        <ellipse cx="505" cy="138" rx="55" ry="35" fill="#1a2744" opacity="0.3" />
        <text x="480" y="95" fill="#334155" fontSize="8" fontWeight="600">EUROPE</text>

        {/* Americas */}
        <ellipse cx="220" cy="230" rx="90" ry="120" fill="#1a2744" opacity="0.3" />
        <text x="175" y="110" fill="#334155" fontSize="8" fontWeight="600">AMERICAS</text>

        {/* Asia-Pacific */}
        <ellipse cx="690" cy="200" rx="110" ry="80" fill="#1a2744" opacity="0.3" />
        <text x="665" y="95" fill="#334155" fontSize="8" fontWeight="600">ASIA-PACIFIC</text>

        {/* Africa */}
        <ellipse cx="530" cy="290" rx="55" ry="70" fill="#1a2744" opacity="0.3" />
        <text x="510" y="215" fill="#334155" fontSize="8" fontWeight="600">AFRICA</text>

        {/* Middle East */}
        <text x="555" y="158" fill="#334155" fontSize="7" fontWeight="600">MIDDLE EAST</text>

        {/* Country circles */}
        {Object.entries(COUNTRY_POSITIONS).map(([iso2, pos]) => {
          const country = DMTT_COUNTRIES.find((c) => c.iso2 === iso2);
          const color = getColor(iso2);
          const isKnown = !!country;

          return (
            <g key={iso2}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={pos.r || 7}
                fill={color}
                opacity={isKnown ? 0.9 : 0.4}
                stroke={isKnown ? "rgba(255,255,255,0.2)" : "transparent"}
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200 hover:opacity-100"
                style={{ filter: isKnown ? `drop-shadow(0 0 4px ${color}60)` : "none" }}
                onMouseEnter={(e) => {
                  if (country) {
                    const rect = svgRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                        country,
                      });
                    }
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => onCountryClick?.(country || null)}
              />
              {isKnown && (
                <text
                  x={pos.x}
                  y={pos.y + 14}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="5"
                  className="pointer-events-none"
                >
                  {iso2}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip?.country && (
        <div
          className="absolute z-20 bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs shadow-xl pointer-events-none"
          style={{
            left: Math.min(tooltip.x + 10, 500),
            top: tooltip.y - 60,
            minWidth: 200,
          }}
        >
          <div className="font-bold text-white text-sm mb-1">{tooltip.country.name}</div>
          <div className="grid grid-cols-2 gap-1 text-slate-300">
            <span>DMTT:</span>
            <span style={{ color: STATUS_COLORS[tooltip.country.dmttStatus] }}>
              {STATUS_LABELS[tooltip.country.dmttStatus]}
            </span>
            <span>GIR:</span>
            <span style={{ color: STATUS_COLORS[tooltip.country.girStatus] }}>
              {STATUS_LABELS[tooltip.country.girStatus]}
            </span>
            <span>CIT Rate:</span>
            <span className="text-emerald-400">{tooltip.country.statutoryCITRate}%</span>
            {tooltip.country.estimatedETR && (
              <>
                <span>Est. ETR:</span>
                <span className={tooltip.country.estimatedETR < 15 ? "text-red-400" : "text-emerald-400"}>
                  {tooltip.country.estimatedETR}%
                </span>
              </>
            )}
          </div>
          <div className="mt-2 text-slate-400 text-xs border-t border-slate-600 pt-1">
            {tooltip.country.notes.substring(0, 80)}…
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-slate-800/90 rounded-lg p-2 text-xs">
        <div className="text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Status</div>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5 mb-0.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-slate-300 text-xs">{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
