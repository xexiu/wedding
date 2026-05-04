"use client";

import { SelectHTMLAttributes } from "react";

type AdminSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

const DEFAULT_SELECT_CLASS = "min-h-10 rounded-md border border-rose-200 px-2 py-1 text-sm";

export function AdminSelect({ className, ...props }: AdminSelectProps) {
  return <select {...props} className={className ?? DEFAULT_SELECT_CLASS} />;
}
