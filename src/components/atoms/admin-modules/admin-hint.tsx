"use client";

type AdminHintProps = {
  text?: string;
};

export function AdminHint({ text }: AdminHintProps) {
  if (!text) {
    return null;
  }

  return <span className="text-xs text-rose-700">{text}</span>;
}
