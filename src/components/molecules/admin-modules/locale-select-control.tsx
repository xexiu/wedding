"use client";

import { AdminSelect } from "@/components/atoms/admin-modules/admin-select";
import { LocaleCode } from "@/components/admin-modules/types";

type LocaleSelectControlProps = {
  label: string;
  value: LocaleCode;
  options: LocaleCode[];
  onChange: (locale: LocaleCode) => void;
};

export function LocaleSelectControl({ label, value, options, onChange }: LocaleSelectControlProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-rose-700">{label}</span>
      <AdminSelect value={value} className="min-h-9 rounded-md border border-rose-200 px-2 py-1 text-sm" onChange={(e) => onChange(e.target.value as LocaleCode)}>
        {options.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </AdminSelect>
    </div>
  );
}
