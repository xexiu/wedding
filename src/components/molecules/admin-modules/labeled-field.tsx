"use client";

import { AdminHint } from "@/components/atoms/admin-modules/admin-hint";
import { ReactNode } from "react";

type LabeledFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function LabeledField({ label, hint, children, className }: LabeledFieldProps) {
  return (
    <label className={className ?? "flex min-w-0 flex-col gap-1"}>
      <span className="text-sm font-medium text-rose-900">{label}</span>
      {children}
      <AdminHint text={hint} />
    </label>
  );
}
