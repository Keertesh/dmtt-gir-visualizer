"use client";
import { STATUS_COLORS, STATUS_LABELS } from "@/data/dmtt-data";

type Status = "enacted" | "draft" | "consultation" | "announced" | "none";

export default function StatusBadge({ status }: { status: Status }) {
  const color = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ backgroundColor: color }}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
