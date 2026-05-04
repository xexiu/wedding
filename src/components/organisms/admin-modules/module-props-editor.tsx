"use client";

import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { toLocalizedRecord } from "@/components/admin-modules/helpers";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import { LabeledField } from "@/components/molecules/admin-modules/labeled-field";
import { CarouselSlidesField } from "@/components/molecules/admin-modules/carousel-slides-field";
import { LocaleSelectControl } from "@/components/molecules/admin-modules/locale-select-control";
import { ToggleRow } from "@/components/molecules/admin-modules/toggle-row";
import { ModulePropsEditorProps } from "@/components/organisms/admin-modules/module-props-editor.types";
import { CarouselSlideConfig } from "@/config/modules";
import { modulePropsFields } from "@/config/module-props-form";

export function ModulePropsEditor({
  order,
  localeForProps,
  localeOptions,
  setLocaleForProps,
  moduleProps,
  setModuleProps
}: ModulePropsEditorProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-rose-900 sm:text-xl">{ADMIN_UI_TEXT.MODULE_PROPS.TITLE}</h2>
        <LocaleSelectControl
          label={ADMIN_UI_TEXT.MODULE_PROPS.LOCALE_LABEL}
          value={localeForProps}
          options={localeOptions}
          onChange={setLocaleForProps}
        />
      </div>
      <p className="mt-1 text-xs text-rose-700">
        {ADMIN_UI_TEXT.MODULE_PROPS.DESCRIPTION}
      </p>
      <div className="mt-4 space-y-3">
        {order.map((moduleId) => (
          <div key={moduleId} className="rounded-lg border border-rose-200 p-3">
            <p className="mb-2 text-sm font-semibold text-rose-900">{moduleId}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {modulePropsFields[moduleId].map((field) => {
                const current = moduleProps[moduleId] as Record<string, unknown>;
                const value = current[field.key];
                if (field.kind === "boolean") {
                  return (
                    <ToggleRow
                      key={field.key}
                      label={field.label}
                      checked={Boolean(value)}
                      onChange={(checked) =>
                        setModuleProps((prev) => ({
                          ...prev,
                          [moduleId]: { ...prev[moduleId], [field.key]: checked }
                        }))
                      }
                    />
                  );
                }

                if (field.kind === "number") {
                  const numeric = typeof value === "number" ? value : 0;
                  return (
                    <LabeledField key={field.key} label={field.label} hint={field.hint}>
                      <AdminInput
                        type="number"
                        min={field.min}
                        max={field.max}
                        step={field.step ?? 1}
                        value={numeric}
                        onChange={(e) =>
                          setModuleProps((prev) => ({
                            ...prev,
                            [moduleId]: {
                              ...prev[moduleId],
                              [field.key]: Number(e.target.value)
                            }
                          }))
                        }
                        className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
                      />
                    </LabeledField>
                  );
                }

                if (field.kind === "plainText") {
                  const str = typeof value === "string" ? value : "";
                  return (
                    <LabeledField key={field.key} label={field.label} hint={field.hint}>
                      <AdminInput
                        type="text"
                        value={str}
                        onChange={(e) =>
                          setModuleProps((prev) => ({
                            ...prev,
                            [moduleId]: { ...prev[moduleId], [field.key]: e.target.value }
                          }))
                        }
                        className="min-h-10 w-full rounded-md border border-rose-200 px-3 py-2 text-sm"
                      />
                    </LabeledField>
                  );
                }

                if (field.kind === "multiline") {
                  const str = typeof value === "string" ? value : "";
                  return (
                    <LabeledField
                      key={field.key}
                      label={field.label}
                      hint={field.hint}
                      className="sm:col-span-2"
                    >
                      <textarea
                        value={str}
                        rows={5}
                        onChange={(e) =>
                          setModuleProps((prev) => ({
                            ...prev,
                            [moduleId]: { ...prev[moduleId], [field.key]: e.target.value }
                          }))
                        }
                        className="min-h-[120px] w-full rounded-md border border-rose-200 px-3 py-2 font-mono text-sm"
                      />
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
                          setModuleProps((prev) => {
                            const existing = (prev[moduleId] as Record<string, unknown>)[field.key];
                            return {
                              ...prev,
                              [moduleId]: {
                                ...prev[moduleId],
                                [field.key]: {
                                  ...toLocalizedRecord(existing),
                                  [localeForProps]: e.target.value
                                }
                              }
                            };
                          })
                        }
                        className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm"
                      />
                    </LabeledField>
                  );
                }

                if (field.kind === "localizedMultiline") {
                  const localized = toLocalizedRecord(value);
                  return (
                    <LabeledField
                      key={field.key}
                      label={`${field.label} (${localeForProps})`}
                      hint={field.hint}
                      className="flex min-w-0 flex-col gap-1 sm:col-span-2"
                    >
                      <textarea
                        value={localized[localeForProps]}
                        rows={8}
                        onChange={(e) =>
                          setModuleProps((prev) => {
                            const existing = (prev[moduleId] as Record<string, unknown>)[field.key];
                            return {
                              ...prev,
                              [moduleId]: {
                                ...prev[moduleId],
                                [field.key]: {
                                  ...toLocalizedRecord(existing),
                                  [localeForProps]: e.target.value
                                }
                              }
                            };
                          })
                        }
                        className="min-h-[160px] w-full rounded-md border border-rose-200 px-3 py-2 text-sm"
                      />
                    </LabeledField>
                  );
                }

                if (field.kind === "carouselSlides") {
                  const slides = Array.isArray(value) ? (value as CarouselSlideConfig[]) : [];
                  return (
                    <CarouselSlidesField
                      key={field.key}
                      label={field.label}
                      hint={field.hint}
                      value={slides}
                      localeForProps={localeForProps}
                      onChange={(next) =>
                        setModuleProps((prev) => ({
                          ...prev,
                          [moduleId]: { ...prev[moduleId], [field.key]: next }
                        }))
                      }
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
