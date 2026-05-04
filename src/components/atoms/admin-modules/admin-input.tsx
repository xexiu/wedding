"use client";

import { InputHTMLAttributes } from "react";

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const DEFAULT_INPUT_CLASS =
  "min-h-10 rounded-md border border-rose-200 px-3 py-2 text-base text-rose-950 sm:text-sm";

export function AdminInput({ className, ...props }: AdminInputProps) {
  return <input {...props} className={className ?? DEFAULT_INPUT_CLASS} />;
}
