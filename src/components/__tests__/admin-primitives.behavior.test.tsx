import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { AdminHint } from "@/components/atoms/admin-modules/admin-hint";
import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { AdminSelect } from "@/components/atoms/admin-modules/admin-select";
import { LocaleSelectControl } from "@/components/molecules/admin-modules/locale-select-control";
import { LabeledField } from "@/components/molecules/admin-modules/labeled-field";
import { ToggleRow } from "@/components/molecules/admin-modules/toggle-row";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";

describe("admin primitives", () => {
  test("AdminHint renders nothing without text", () => {
    const { container } = render(React.createElement(AdminHint, {}));
    expect(container.firstChild).toBeNull();
  });

  test("AdminInput and AdminSelect render with value", () => {
    render(
      React.createElement("div", {}, [
        React.createElement(AdminInput, { key: "i", value: "hello", onChange: () => undefined }),
        React.createElement(
          AdminSelect,
          { key: "s", value: "en", onChange: () => undefined },
          React.createElement("option", { value: "en" }, "en")
        )
      ])
    );
    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
    expect(screen.getByDisplayValue("en")).toBeInTheDocument();
  });

  test("AdminButton triggers click", () => {
    const onClick = vi.fn();
    render(React.createElement(AdminButton, { onClick }, "Save"));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalled();
  });

  test("LabeledField and ToggleRow render and toggle", () => {
    const onChange = vi.fn();
    render(
      React.createElement("div", {}, [
        React.createElement(
          LabeledField,
          {
            key: "l",
            label: "Label",
            hint: "Hint",
            children: React.createElement(AdminInput, { value: "x", onChange: () => undefined })
          }
        ),
        React.createElement(ToggleRow, { key: "t", label: "Enabled", checked: true, onChange })
      ])
    );
    expect(screen.getByText("Hint")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalled();
  });

  test("LocaleSelectControl changes locale", () => {
    const onChange = vi.fn();
    render(
      React.createElement(LocaleSelectControl, {
        label: "Locale:",
        value: "en",
        options: ["en", "es", "ro"],
        onChange
      })
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "es" } });
    expect(onChange).toHaveBeenCalledWith("es");
  });
});
