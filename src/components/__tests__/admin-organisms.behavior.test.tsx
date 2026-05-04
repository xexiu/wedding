import { ModuleOrderManager } from "@/components/organisms/admin-modules/module-order-manager";
import { SaveActionBar } from "@/components/organisms/admin-modules/save-action-bar";
import { TemplateControls } from "@/components/organisms/admin-modules/template-controls";
import { YamlConfigPanel } from "@/components/organisms/admin-modules/yaml-config-panel";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test, vi } from "vitest";

describe("admin organisms", () => {
  test("TemplateControls updates selected template and applies defaults", async () => {
    const user = userEvent.setup();
    const setTemplateId = vi.fn();
    const applyDefaults = vi.fn();

    render(
      React.createElement(TemplateControls, {
        templateId: "classic",
        cadencePreset: "mobile-balanced",
        layoutSettings: {
          fontStyle: "elegant",
          titleScale: 1,
          bodyScale: 1,
          scriptScale: 1,
          pageTitleSizeScale: 1,
          pageSubtitleSizeScale: 1,
          pageBodySizeScale: 1,
          cardTitleSizeScale: 1,
          cardSubtitleSizeScale: 1,
          cardBodySizeScale: 1,
          subCardTitleSizeScale: 1,
          subCardBodySizeScale: 1,
          cardMaxWidthPx: 600,
          cardRadiusPx: 10,
          pageBackgroundColor: "#ffffff",
          cardBackgroundColor: "#ffffff",
          cardBorderColor: "#dce4f0",
          cardBorderWidthPx: 1,
          cardShadowOpacity: 0.08,
          pageFontWeight: 400,
          pageTitleFontWeight: 700,
          cardTitleFontWeight: 700,
          pageSubtitleFontWeight: 500,
          cardSubtitleFontWeight: 500,
          pageBodyFontWeight: 400,
          cardBodyFontWeight: 400,
          subCardBackgroundColor: "#ffffff",
          subCardBorderColor: "#dce4f0",
          subCardBorderWidthPx: 1,
          subCardRadiusPx: 8,
          subCardShadowOpacity: 0.05,
          subCardTitleFontWeight: 600,
          subCardBodyFontWeight: 400
        },
        motionSettings: {
          scrollRevealEnabled: false,
          revealStyle: "fade",
          staggerMs: 80,
          cardHoverEnabled: true,
          buttonPulseEnabled: false
        },
        setTemplateId,
        setCadencePreset: vi.fn(),
        setLayoutSettings: vi.fn(),
        setMotionSettings: vi.fn(),
        onApplyTemplateDefaults: applyDefaults
      })
    );

    await user.selectOptions(screen.getAllByRole("combobox")[0], "dark-luxury");
    expect(setTemplateId).toHaveBeenCalledWith("dark-luxury");

    await user.click(screen.getByRole("button", { name: /apply template defaults/i }));
    expect(applyDefaults).toHaveBeenCalled();
  });

  test("SaveActionBar invokes save action and disables while saving", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const { rerender } = render(
      React.createElement(SaveActionBar, { saving: false, saveLabel: "Save", onSave, status: "Ready" })
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSave).toHaveBeenCalled();
    expect(screen.getByText("Ready")).toBeInTheDocument();

    rerender(React.createElement(SaveActionBar, { saving: true, saveLabel: "Save", onSave, status: "Saving" }));
    expect(screen.getByRole("button", { name: "..." })).toBeDisabled();
  });

  test("YamlConfigPanel handles input and actions", async () => {
    const user = userEvent.setup();
    const setYamlText = vi.fn();
    const exportYaml = vi.fn();
    const importYaml = vi.fn();

    render(
      React.createElement(YamlConfigPanel, {
        yamlText: "a: b",
        setYamlText,
        exportYaml,
        importYaml,
        saving: false
      })
    );

    await user.type(screen.getByRole("textbox"), "x");
    expect(setYamlText).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /export yaml/i }));
    expect(exportYaml).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: /import yaml/i }));
    expect(importYaml).toHaveBeenCalled();
  });

  test("ModuleOrderManager toggles module enabled state", async () => {
    const user = userEvent.setup();
    const setOrder = vi.fn();
    const setFlags = vi.fn();

    render(
      React.createElement(ModuleOrderManager, {
        locale: "en",
        order: ["heroCarousel"],
        flags: [{ id: "heroCarousel", enabled: true }],
        setOrder,
        setFlags,
        enabledLabel: "Enabled",
        disabledLabel: "Disabled"
      })
    );

    await user.click(screen.getByRole("button", { name: "Enabled" }));
    expect(setFlags).toHaveBeenCalled();
  });

  test("ModuleOrderManager handles drag-drop reorder", () => {
    const setOrder = vi.fn();
    const setFlags = vi.fn();

    render(
      React.createElement(ModuleOrderManager, {
        locale: "en",
        order: ["heroCarousel", "countdown"],
        flags: [
          { id: "heroCarousel", enabled: true },
          { id: "countdown", enabled: true }
        ],
        setOrder,
        setFlags,
        enabledLabel: "Enabled",
        disabledLabel: "Disabled"
      })
    );

    const cards = screen.getAllByText(/heroCarousel|countdown/).map((node) => node.closest("div") as HTMLElement);
    const dataTransfer = {
      data: "",
      setData: vi.fn((_: string, value: string) => {
        dataTransfer.data = value;
      }),
      getData: vi.fn(() => dataTransfer.data)
    };

    fireEvent.dragStart(cards[0], { dataTransfer });
    fireEvent.drop(cards[1], { dataTransfer });
    expect(setOrder).toHaveBeenCalled();
  });
});
