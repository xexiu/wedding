"use client";

import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { toLocalizedRecord } from "@/components/admin-modules/helpers";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import { LabeledField } from "@/components/molecules/admin-modules/labeled-field";
import { WeddingDetailsEditorProps } from "@/components/organisms/admin-modules/wedding-details-editor.types";
import { weddingDetailsFields } from "@/config/wedding-details-form";

export function WeddingDetailsEditor({
  localeForProps,
  weddingDetails,
  setWeddingDetails
}: WeddingDetailsEditorProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-rose-900 sm:text-xl">{ADMIN_UI_TEXT.WEDDING_DETAILS.TITLE}</h2>
      <p className="mt-1 text-xs text-rose-700">{ADMIN_UI_TEXT.WEDDING_DETAILS.DESCRIPTION}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {weddingDetailsFields.map((field) => {
          const value = weddingDetails[field.key];

          if (field.kind === "select") {
            return (
              <LabeledField key={field.key} label={field.label} hint={field.hint} className="flex min-w-0 flex-col gap-1 sm:col-span-2">
                <select
                  value={String(value ?? "")}
                  onChange={(e) =>
                    setWeddingDetails((prev) => ({ ...prev, [field.key]: e.target.value as never }))
                  }
                  className="min-h-10 rounded-md border border-rose-200 bg-white px-3 py-2 text-base text-rose-950 sm:text-sm"
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </LabeledField>
            );
          }

          if (field.kind === "localizedText") {
            const localized = toLocalizedRecord(value);
            return (
              <LabeledField
                key={field.key}
                label={`${field.label} (${localeForProps})`}
                hint={field.hint}
                className="flex min-w-0 flex-col gap-1 sm:col-span-2"
              >
                <AdminInput
                  type="text"
                  value={localized[localeForProps]}
                  onChange={(e) =>
                    setWeddingDetails((prev) => ({
                      ...prev,
                      [field.key]: {
                        ...toLocalizedRecord(prev[field.key]),
                        [localeForProps]: e.target.value
                      }
                    }))
                  }
                  className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-base text-rose-950 sm:text-sm"
                />
              </LabeledField>
            );
          }

          return (
            <LabeledField key={field.key} label={field.label} hint={field.hint}>
              <AdminInput
                type={field.kind}
                value={String(value ?? "")}
                onChange={(e) => setWeddingDetails((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-base text-rose-950 sm:text-sm"
              />
            </LabeledField>
          );
        })}
      </div>
    </div>
  );
}
