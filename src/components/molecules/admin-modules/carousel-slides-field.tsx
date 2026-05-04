"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { AdminHint } from "@/components/atoms/admin-modules/admin-hint";
import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { toLocalizedRecord } from "@/components/admin-modules/helpers";
import { LabeledField } from "@/components/molecules/admin-modules/labeled-field";
import { CarouselSlideConfig } from "@/config/modules";
import { createLocalizedText } from "@/config/localized-text";

type CarouselSlidesFieldProps = {
  label: string;
  hint?: string;
  value: CarouselSlideConfig[];
  /** Which language row to edit (top “Idioma” in admin). */
  localeForProps: string;
  onChange: (next: CarouselSlideConfig[]) => void;
};

export function CarouselSlidesField({ label, hint, value, localeForProps, onChange }: CarouselSlidesFieldProps) {
  const slides = Array.isArray(value) ? value : [];

  function updateSlide(index: number, patch: Partial<CarouselSlideConfig>) {
    onChange(slides.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function updateSlideLocalized(
    index: number,
    key: "title" | "subtitle",
    locale: string,
    text: string
  ) {
    onChange(
      slides.map((s, i) => {
        if (i !== index) return s;
        const existing = s[key];
        return {
          ...s,
          [key]: { ...toLocalizedRecord(existing), [locale]: text }
        };
      })
    );
  }

  function addSlide() {
    onChange([
      ...slides,
      {
        image: "",
        title: createLocalizedText(""),
        subtitle: createLocalizedText("")
      }
    ]);
  }

  function removeSlide(index: number) {
    if (slides.length <= 1) return;
    onChange(slides.filter((_, i) => i !== index));
  }

  return (
    <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
      <span className="text-sm font-medium text-rose-900">{label}</span>
      <AdminHint text={hint} />
      <p className="text-xs text-rose-800">
        Each slide has separate title/subtitle per language. Switch <strong>Idioma</strong> above to edit English vs Spanish vs Romanian — clearing one language does not erase the others.
      </p>
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div key={index} className="rounded-md border border-rose-200 bg-rose-50/40 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-rose-900">Slide {index + 1}</span>
              <AdminButton
                type="button"
                className="rounded px-2 py-1 text-xs text-rose-800 disabled:opacity-40"
                onClick={() => removeSlide(index)}
                disabled={slides.length <= 1}
              >
                Remove
              </AdminButton>
            </div>
            <LabeledField label="Image (URL, /path, or filename in /carousel/images/)" className="mb-2">
              <AdminInput
                type="text"
                value={slide.image}
                onChange={(e) => updateSlide(index, { image: e.target.value })}
                className="min-h-10 w-full rounded-md border border-rose-200 px-3 py-2 font-mono text-sm"
              />
            </LabeledField>
            <LabeledField label={`Title (${localeForProps})`} className="mb-2">
              <AdminInput
                type="text"
                value={toLocalizedRecord(slide.title)[localeForProps] ?? ""}
                onChange={(e) => updateSlideLocalized(index, "title", localeForProps, e.target.value)}
                className="min-h-10 w-full rounded-md border border-rose-200 px-3 py-2 text-sm"
              />
            </LabeledField>
            <LabeledField label={`Subtitle (${localeForProps})`}>
              <AdminInput
                type="text"
                value={toLocalizedRecord(slide.subtitle)[localeForProps] ?? ""}
                onChange={(e) => updateSlideLocalized(index, "subtitle", localeForProps, e.target.value)}
                className="min-h-10 w-full rounded-md border border-rose-200 px-3 py-2 text-sm"
              />
            </LabeledField>
          </div>
        ))}
        <AdminButton
          type="button"
          className="rounded-md bg-rose-100 px-3 py-2 text-sm text-rose-900"
          onClick={addSlide}
        >
          Add slide
        </AdminButton>
      </div>
    </div>
  );
}
