const tagColors: Record<string, string> = {
  Paper: "bg-emerald-500/10 text-emerald-600",
  "Technical Report": "bg-blue-500/10 text-blue-600",
  Preprint: "bg-amber-500/10 text-amber-600",
  Survey: "bg-purple-500/10 text-purple-600",
  Workshop: "bg-rose-500/10 text-rose-600",
};

const defaultColor = "bg-black/5 text-black/60";

export function ResearchBadge({ tag }: { tag: string }) {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full ${tagColors[tag] ?? defaultColor}`}
    >
      {tag}
    </span>
  );
}
