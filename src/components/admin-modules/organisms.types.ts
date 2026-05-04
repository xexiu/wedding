"use client";

import { ModuleDefinition, ModuleId } from "@/config/modules";
import { CadencePreset } from "@/themes/cadence";
import { MotionSettings } from "@/config/motion-settings";
import { LayoutSettings } from "@/config/layout-settings";
import { TemplateId } from "@/themes/templates";
import { Dispatch, SetStateAction } from "react";

export type TemplateControlsProps = {
  templateId: TemplateId;
  cadencePreset: CadencePreset;
  layoutSettings: LayoutSettings;
  motionSettings: MotionSettings;
  setTemplateId: (value: TemplateId) => void;
  setCadencePreset: (value: CadencePreset) => void;
  setLayoutSettings: (value: LayoutSettings) => void;
  setMotionSettings: (value: MotionSettings) => void;
  onApplyTemplateDefaults: () => void;
};

export type ModuleOrderManagerProps = {
  locale: string;
  order: ModuleId[];
  flags: ModuleDefinition[];
  setOrder: Dispatch<SetStateAction<ModuleId[]>>;
  setFlags: Dispatch<SetStateAction<ModuleDefinition[]>>;
  enabledLabel: string;
  disabledLabel: string;
};

export type YamlConfigPanelProps = {
  yamlText: string;
  setYamlText: (value: string) => void;
  exportYaml: () => void;
  importYaml: () => void;
  saving: boolean;
};

export type SaveActionBarProps = {
  saving: boolean;
  saveLabel: string;
  onSave: () => void;
  status: string;
};
