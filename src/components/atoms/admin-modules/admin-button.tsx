"use client";

import { ButtonHTMLAttributes } from "react";

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const DEFAULT_BUTTON_CLASS = "min-h-10 rounded-md bg-rose-100 px-3 py-2 text-sm text-rose-900";

export function AdminButton({ className, ...props }: AdminButtonProps) {
  return <button {...props} className={className ?? DEFAULT_BUTTON_CLASS} />;
}
