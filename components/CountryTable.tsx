"use client";
import { useState, useMemo } from "react";
import { DMTT_COUNTRIES, CountryDMTT, STATUS_COLORS } from "@/data/dmtt-data";
import StatusBadge from "./StatusBadge";
import { Search, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

type SortField = "name" | "region" | "statutoryCITRate" | "estimatedETR" | "dmttStatus" | "estimatedRevenue";
type FilterStatus = "all" | "enacted" | "draft" | "consultation" | "announced" | "none";

export default function CountryTable({ onSelect }: { onSelect?: (c: CountryDMTT) => void }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterRegion, setFilterRegion] = useState("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const regions = ["All", ...Array.from(new Set(DMTT_COUNTRIES.map((c) => c.region)))];

  const filtered = useMemo(() => {
    return DMTT_COUNTRIES
      .filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.iso2.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || c.dmttStatus === filterStatus;
        const matchRegion = filterRegion === "All" || c.region === filterRegion;
        return matchSearch && matchStatus && matchRegion;
      })
      .sort((a, b) => {
        let aVal: string | number = a[sortField] ?? "";
        let bVal: string | number = b[sortField] ?? "";
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return sortDir === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
  }, [search, sortField, sortDir, filterStatus, filterRegion]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field ? (
      sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
    ) : (
      <ArrowUpDown className="w-3 h-3 opacity-30" />
    );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
        >
          <option value="all">All DMTT Statuses</option>
          <option value="enacted">Enacted</option>
          <option value="draft">Draft Legislation</option>
          <option value="consultation">Consultation</option>
          <option value="announced">Announced</option>
          <option value="none">Not Adopted</option>
        </select>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
        >
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="text-slate-400 text-sm">
        Showing <span className="text-white font-medium">{filtered.length}</span> of {DMTT_COUNTRIES.length} jurisdictions
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              <th className="text-left p-3">
                <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium">
                  Country <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-3">
                <button onClick={() => handleSort("region")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium">
                  Region <SortIcon field="region" />
                </button>
              </th>
              <th className="text-left p-3">
                <button onClick={() => handleSort("dmttStatus")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium">
                  DMTT <SortIcon field="dmttStatus" />
                </button>
              </th>
              <th className="text-left p-3 hidden md:table-cell">GIR</th>
              <th className="text-left p-3 hidden lg:table-cell">IIR</th>
              <th className="text-left p-3 hidden lg:table-cell">UTPR</th>
              <th className="text-right p-3">
                <button onClick={() => handleSort("statutoryCITRate")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium ml-auto">
                  CIT % <SortIcon field="statutoryCITRate" />
                </button>
              </th>
              <th className="text-right p-3 hidden sm:table-cell">
                <button onClick={() => handleSort("estimatedETR")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium ml-auto">
                  ETR % <SortIcon field="estimatedETR" />
                </button>
              </th>
              <th className="text-right p-3 hidden md:table-cell">
                <button onClick={() => handleSort("estimatedRevenue")} className="flex items-center gap-1 text-slate-300 hover:text-white font-medium ml-auto">
                  Rev. (USD M) <SortIcon field="estimatedRevenue" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((country, i) => {
              const isExpanded = expandedRow === country.iso2;
              const etrBelow15 = country.estimatedETR !== null && country.estimatedETR < 15;
              return (
                <>
                  <tr
                    key={country.iso2}
                    className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                      i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-800/20"
                    } hover:bg-slate-700/40`}
                    onClick={() => {
                      setExpandedRow(isExpanded ? null : country.iso2);
                      onSelect?.(country);
                    }}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{getFlag(country.iso2)}</span>
                        <div>
                          <div className="text-white font-medium">{country.name}</div>
                          <div className="text-slate-500 text-xs">{country.iso2}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400 text-xs">{country.region}</td>
                    <td className="p-3"><StatusBadge status={country.dmttStatus} /></td>
                    <td className="p-3 hidden md:table-cell"><StatusBadge status={country.girStatus} /></td>
                    <td className="p-3 hidden lg:table-cell"><StatusBadge status={country.irmStatus} /></td>
                    <td className="p-3 hidden lg:table-cell"><StatusBadge status={country.utprStatus} /></td>
                    <td className="p-3 text-right">
                      <span className="text-white font-mono">{country.statutoryCITRate}%</span>
                    </td>
                    <td className="p-3 text-right hidden sm:table-cell">
                      {country.estimatedETR !== null ? (
                        <span className={`font-mono font-medium ${etrBelow15 ? "text-red-400" : "text-emerald-400"}`}>
                          {country.estimatedETR}%
                          {etrBelow15 && <span className="ml-1 text-xs">⚠</span>}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="p-3 text-right hidden md:table-cell">
                      {country.estimatedRevenue ? (
                        <span className="text-blue-400 font-mono">${country.estimatedRevenue.toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${country.iso2}-exp`} className="bg-slate-800/60 border-b border-slate-600">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-300 font-medium mb-2">Legislative Notes</div>
                            <p className="text-slate-400">{country.notes}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-700/50 rounded-lg p-2">
                              <div className="text-slate-400 mb-1">Effective Date</div>
                              <div className="text-white">{country.effectiveDate || "TBD"}</div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-2">
                              <div className="text-slate-400 mb-1">Pillar Two Adopted</div>
                              <div className={country.pillarTwoAdopted ? "text-emerald-400" : "text-red-400"}>
                                {country.pillarTwoAdopted ? "✓ Yes" : "✗ No"}
                              </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-2">
                              <div className="text-slate-400 mb-1">Est. Annual Revenue</div>
                              <div className="text-blue-400">
                                {country.estimatedRevenue ? `$${country.estimatedRevenue.toLocaleString()}M` : "N/A"}
                              </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-2">
                              <div className="text-slate-400 mb-1">ETR vs 15% Min</div>
                              <div className={country.estimatedETR && country.estimatedETR < 15 ? "text-red-400" : "text-emerald-400"}>
                                {country.estimatedETR !== null
                                  ? country.estimatedETR < 15
                                    ? `⚠ ${(15 - country.estimatedETR).toFixed(1)}% gap`
                                    : `✓ +${(country.estimatedETR - 15).toFixed(1)}%`
                                  : "N/A"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Unicode flag emoji from ISO2
function getFlag(iso2: string): string {
  return iso2.toUpperCase().replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt(0))
  );
}
