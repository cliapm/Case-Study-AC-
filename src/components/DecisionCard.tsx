type DecisionCardProps = {
  code: string;
  title: string;
  text: string;
  selected?: boolean;
  onToggle?: () => void;
};

export function DecisionCard({ code, title, text, selected = false, onToggle }: DecisionCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? "border-[#9e1b2b] bg-[#fff3f5] shadow-sm" : "border-slate-200 bg-slate-50 hover:border-[#0d2d4f] hover:bg-white"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#0d2d4f] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">{code}</span>
        <span className="text-xs font-medium text-slate-500">{selected ? "Selected" : "Unselected"}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
    </button>
  );
}
