"use client";

import { AdminSelect } from "@/components/atoms/admin-modules/admin-select";
import { useAdminUiText } from "@/components/admin-modules/ui-text";
import { MotionSettings, REVEAL_STYLES, RevealStyle, isRevealStyle } from "@/config/motion-settings";
import {
  MOTION_STAGGER_MAX,
  MOTION_STAGGER_MIN,
  MOTION_STAGGER_STEP
} from "@/components/organisms/admin-modules/motion-controls.constants";

type MotionControlsProps = {
  motionSettings: MotionSettings;
  setMotionSettings: (value: MotionSettings) => void;
};

export function MotionControls({ motionSettings, setMotionSettings }: MotionControlsProps) {
  const ADMIN_UI_TEXT = useAdminUiText();
  const styleLabels: Record<RevealStyle, string> = {
    fade: ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_STYLE_FADE,
    "slide-up": ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_STYLE_SLIDE_UP,
    "zoom-in": ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_STYLE_ZOOM_IN
  };

  return (
    <div className="rounded-md border border-rose-200 bg-rose-50/50 p-3">
      <p className="mb-2 text-sm font-semibold text-rose-900">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_TITLE}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm text-rose-900">
          <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_SCROLL_REVEAL}</span>
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={motionSettings.scrollRevealEnabled}
            onChange={(event) =>
              setMotionSettings({
                ...motionSettings,
                scrollRevealEnabled: event.target.checked
              })
            }
          />
        </label>
        <label className="block text-sm text-rose-900">
          <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_REVEAL_STYLE}</span>
          <AdminSelect
            value={motionSettings.revealStyle}
            onChange={(event) => {
              const candidate = event.target.value;
              if (!isRevealStyle(candidate)) return;
              setMotionSettings({
                ...motionSettings,
                revealStyle: candidate
              });
            }}
          >
            {REVEAL_STYLES.map((style) => (
              <option key={style} value={style}>
                {styleLabels[style]}
              </option>
            ))}
          </AdminSelect>
        </label>
        <label className="block text-sm text-rose-900">
          <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_STAGGER_MS}</span>
          <input
            type="number"
            min={MOTION_STAGGER_MIN}
            max={MOTION_STAGGER_MAX}
            step={MOTION_STAGGER_STEP}
            className="w-full rounded border border-rose-200 px-2 py-1"
            value={motionSettings.staggerMs}
            onChange={(event) =>
              setMotionSettings({
                ...motionSettings,
                staggerMs: Math.max(MOTION_STAGGER_MIN, Math.min(MOTION_STAGGER_MAX, Number(event.target.value || 0)))
              })
            }
          />
        </label>
        <label className="block text-sm text-rose-900">
          <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_CARD_HOVER}</span>
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={motionSettings.cardHoverEnabled}
            onChange={(event) =>
              setMotionSettings({
                ...motionSettings,
                cardHoverEnabled: event.target.checked
              })
            }
          />
        </label>
        <label className="block text-sm text-rose-900">
          <span className="mb-1 block">{ADMIN_UI_TEXT.TEMPLATE_CONTROLS.MOTION_BUTTON_PULSE}</span>
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={motionSettings.buttonPulseEnabled}
            onChange={(event) =>
              setMotionSettings({
                ...motionSettings,
                buttonPulseEnabled: event.target.checked
              })
            }
          />
        </label>
      </div>
    </div>
  );
}
