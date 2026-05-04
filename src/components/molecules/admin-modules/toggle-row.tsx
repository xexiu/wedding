"use client";

type ToggleRowProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  tone?: "default" | "muted";
};

export function ToggleRow({
  label,
  checked,
  onChange,
  className,
  tone = "default"
}: ToggleRowProps) {
  const labelClass = tone === "muted" ? "text-xs text-rose-700" : "text-sm text-rose-900";
  return (
    <label className={className ?? "flex items-center justify-between gap-2 rounded-md border border-rose-100 px-3 py-2"}>
      <span className={labelClass}>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
