"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { AdminSelect } from "@/components/atoms/admin-modules/admin-select";
import { TemplateControlsProps } from "@/components/admin-modules/organisms.types";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import { LAYOUT_FONT_STYLES, isLayoutFontStyle } from "@/config/layout-settings";
import { MotionControls } from "@/components/organisms/admin-modules/motion-controls";
import { isTemplateId } from "@/components/organisms/admin-modules/template-controls.helpers";
import { CADENCE_PRESETS, isCadencePreset } from "@/themes/cadence";
import { templates } from "@/themes/templates";

export function TemplateControls({
  templateId,
  cadencePreset,
  layoutSettings,
  motionSettings,
  setTemplateId,
  setCadencePreset,
  setLayoutSettings,
  setMotionSettings,
  onApplyTemplateDefaults
}: TemplateControlsProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  const cadenceLabels = {
    "mobile-tight": ADMIN_UI_TEXT.TEMPLATE_CONTROLS.CADENCE_OPTION_MOBILE_TIGHT,
    "mobile-balanced": ADMIN_UI_TEXT.TEMPLATE_CONTROLS.CADENCE_OPTION_MOBILE_BALANCED,
    "desktop-editorial": ADMIN_UI_TEXT.TEMPLATE_CONTROLS.CADENCE_OPTION_DESKTOP_EDITORIAL
  } as const;
  const fontStyleLabels = {
    elegant: ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_FONT_STYLE_ELEGANT,
    editorial: ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_FONT_STYLE_EDITORIAL,
    modern: ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_FONT_STYLE_MODERN
  } as const;
  const updateLayout = <K extends keyof typeof layoutSettings>(key: K, value: (typeof layoutSettings)[K]) => {
    setLayoutSettings({ ...layoutSettings, [key]: value });
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex items-center gap-2 text-sm text-rose-900">
          {ADMIN_UI_TEXT.TEMPLATE_CONTROLS.ACTIVE_TEMPLATE_LABEL}
          <AdminSelect
            value={templateId}
            onChange={(e) => {
              const candidate = e.target.value;
              if (isTemplateId(candidate)) {
                setTemplateId(candidate);
              }
            }}
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </AdminSelect>
        </label>
        <label className="flex items-center gap-2 text-sm text-rose-900">
          {ADMIN_UI_TEXT.TEMPLATE_CONTROLS.CADENCE_PRESET_LABEL}
          <AdminSelect
            value={cadencePreset}
            onChange={(event) => {
              const candidate = event.target.value;
              if (isCadencePreset(candidate)) {
                setCadencePreset(candidate);
              }
            }}
          >
            {CADENCE_PRESETS.map((preset) => (
              <option key={preset} value={preset}>
                {cadenceLabels[preset]}
              </option>
            ))}
          </AdminSelect>
        </label>
        <div className="sm:justify-self-start lg:justify-self-end">
          <AdminButton type="button" onClick={onApplyTemplateDefaults}>
            {ADMIN_UI_TEXT.TEMPLATE_CONTROLS.APPLY_DEFAULTS_BUTTON}
          </AdminButton>
        </div>
      </div>
      <div className="rounded-md border border-rose-200 bg-rose-50/50 p-3">
        <p className="mb-2 text-sm font-semibold text-rose-900">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_TITLE}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_FONT_STYLE}</span>
            <AdminSelect
              value={layoutSettings.fontStyle}
              onChange={(event) => {
                const value = event.target.value;
                if (!isLayoutFontStyle(value)) return;
                updateLayout("fontStyle", value);
              }}
            >
              {LAYOUT_FONT_STYLES.map((style) => (
                <option key={style} value={style}>
                  {fontStyleLabels[style]}
                </option>
              ))}
            </AdminSelect>
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_TITLE_SCALE}</span>
            <input
              type="range"
              className="w-full"
              min={0.8}
              max={1.4}
              step={0.05}
              value={layoutSettings.titleScale}
              onChange={(event) => updateLayout("titleScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_BODY_SCALE}</span>
            <input
              type="range"
              className="w-full"
              min={0.85}
              max={1.3}
              step={0.05}
              value={layoutSettings.bodyScale}
              onChange={(event) => updateLayout("bodyScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_SCRIPT_SCALE}</span>
            <input
              type="range"
              className="w-full"
              min={0.8}
              max={1.5}
              step={0.05}
              value={layoutSettings.scriptScale}
              onChange={(event) => updateLayout("scriptScale", Number(event.target.value))}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-rose-800">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.FONT_SIZE_ROLE_HINT}</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_TITLE_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.pageTitleSizeScale}
              onChange={(event) => updateLayout("pageTitleSizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_SUBTITLE_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.pageSubtitleSizeScale}
              onChange={(event) => updateLayout("pageSubtitleSizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_BODY_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.pageBodySizeScale}
              onChange={(event) => updateLayout("pageBodySizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_TITLE_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.cardTitleSizeScale}
              onChange={(event) => updateLayout("cardTitleSizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_SUBTITLE_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.cardSubtitleSizeScale}
              onChange={(event) => updateLayout("cardSubtitleSizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_BODY_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.cardBodySizeScale}
              onChange={(event) => updateLayout("cardBodySizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_TITLE_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.subCardTitleSizeScale}
              onChange={(event) => updateLayout("subCardTitleSizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900 sm:col-span-2 lg:col-span-3">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_BODY_SIZE}</span>
            <input
              type="range"
              className="w-full"
              min={0.65}
              max={1.8}
              step={0.05}
              value={layoutSettings.subCardBodySizeScale}
              onChange={(event) => updateLayout("subCardBodySizeScale", Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_CARD_WIDTH}</span>
            <input
              type="number"
              className="w-full rounded border border-rose-200 px-2 py-1"
              min={420}
              max={860}
              value={layoutSettings.cardMaxWidthPx}
              onChange={(event) => updateLayout("cardMaxWidthPx", Number(event.target.value || 600))}
            />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.LAYOUT_CARD_RADIUS}</span>
            <input
              type="number"
              className="w-full rounded border border-rose-200 px-2 py-1"
              min={0}
              max={28}
              value={layoutSettings.cardRadiusPx}
              onChange={(event) => updateLayout("cardRadiusPx", Number(event.target.value || 10))}
            />
          </label>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_BG}</span>
            <input type="color" className="h-10 w-full rounded border border-rose-200" value={layoutSettings.pageBackgroundColor} onChange={(event) => updateLayout("pageBackgroundColor", event.target.value)} />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_BG}</span>
            <input type="color" className="h-10 w-full rounded border border-rose-200" value={layoutSettings.cardBackgroundColor} onChange={(event) => updateLayout("cardBackgroundColor", event.target.value)} />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_BORDER_COLOR}</span>
            <input type="color" className="h-10 w-full rounded border border-rose-200" value={layoutSettings.cardBorderColor} onChange={(event) => updateLayout("cardBorderColor", event.target.value)} />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_BORDER_WIDTH}</span>
            <input type="number" min={0} max={8} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.cardBorderWidthPx} onChange={(event) => updateLayout("cardBorderWidthPx", Number(event.target.value || 0))} />
          </label>
          <label className="block text-sm text-rose-900">
            <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_SHADOW_OPACITY}</span>
            <input type="range" min={0} max={0.35} step={0.01} className="w-full" value={layoutSettings.cardShadowOpacity} onChange={(event) => updateLayout("cardShadowOpacity", Number(event.target.value))} />
          </label>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_FONT_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.pageFontWeight} onChange={(event) => updateLayout("pageFontWeight", Number(event.target.value || 400))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_TITLE_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.pageTitleFontWeight} onChange={(event) => updateLayout("pageTitleFontWeight", Number(event.target.value || 700))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_TITLE_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.cardTitleFontWeight} onChange={(event) => updateLayout("cardTitleFontWeight", Number(event.target.value || 700))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_SUBTITLE_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.pageSubtitleFontWeight} onChange={(event) => updateLayout("pageSubtitleFontWeight", Number(event.target.value || 500))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_SUBTITLE_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.cardSubtitleFontWeight} onChange={(event) => updateLayout("cardSubtitleFontWeight", Number(event.target.value || 500))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_PAGE_BODY_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.pageBodyFontWeight} onChange={(event) => updateLayout("pageBodyFontWeight", Number(event.target.value || 400))} /></label>
          <label className="block text-sm text-rose-900 sm:col-span-2 lg:col-span-3"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.DESIGN_CARD_BODY_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.cardBodyFontWeight} onChange={(event) => updateLayout("cardBodyFontWeight", Number(event.target.value || 400))} /></label>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_BG}</span><input type="color" className="h-10 w-full rounded border border-rose-200" value={layoutSettings.subCardBackgroundColor} onChange={(event) => updateLayout("subCardBackgroundColor", event.target.value)} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_BORDER_COLOR}</span><input type="color" className="h-10 w-full rounded border border-rose-200" value={layoutSettings.subCardBorderColor} onChange={(event) => updateLayout("subCardBorderColor", event.target.value)} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_BORDER_WIDTH}</span><input type="number" min={0} max={8} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.subCardBorderWidthPx} onChange={(event) => updateLayout("subCardBorderWidthPx", Number(event.target.value || 0))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_RADIUS}</span><input type="number" min={0} max={28} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.subCardRadiusPx} onChange={(event) => updateLayout("subCardRadiusPx", Number(event.target.value || 8))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_SHADOW_OPACITY}</span><input type="range" min={0} max={0.35} step={0.01} className="w-full" value={layoutSettings.subCardShadowOpacity} onChange={(event) => updateLayout("subCardShadowOpacity", Number(event.target.value))} /></label>
          <label className="block text-sm text-rose-900"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_TITLE_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.subCardTitleFontWeight} onChange={(event) => updateLayout("subCardTitleFontWeight", Number(event.target.value || 600))} /></label>
          <label className="block text-sm text-rose-900 sm:col-span-2 lg:col-span-3"><span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.SUBCARD_BODY_WEIGHT}</span><input type="number" min={300} max={900} step={100} className="w-full rounded border border-rose-200 px-2 py-1" value={layoutSettings.subCardBodyFontWeight} onChange={(event) => updateLayout("subCardBodyFontWeight", Number(event.target.value || 400))} /></label>
        </div>
      </div>
      <MotionControls motionSettings={motionSettings} setMotionSettings={setMotionSettings} />
    </div>
  );
}
