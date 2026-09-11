type MetricCardProps = {
  label: string;
  value: string;
  tone?: "default" | "accent" | "success";
};

export function MetricCard({ label, value, tone = "default" }: MetricCardProps) {
  const toneClass = {
    default: "bg-white text-slate-900",
    accent: "bg-[#0d2d4f] text-white",
    success: "bg-emerald-50 text-emerald-800",
  }[tone];

  return (
    <div className={`rounded-2xl border border-slate-200 p-4 shadow-sm ${toneClass}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}
