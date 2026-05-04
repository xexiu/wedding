"use client";

import { STATUS_TEXT } from "@/components/admin-modules/constants";
import { TemplateId } from "@/themes/templates";

export type AdminMutationAction =
  | "save"
  | "exportYaml"
  | "importYaml"
  | "applyTemplateDefaults";

const SUCCESS_MESSAGES: Record<Exclude<AdminMutationAction, "applyTemplateDefaults">, string> = {
  save: STATUS_TEXT.SAVED,
  exportYaml: STATUS_TEXT.YAML_EXPORTED,
  importYaml: STATUS_TEXT.YAML_IMPORTED
};

const ERROR_MESSAGES: Record<Exclude<AdminMutationAction, "applyTemplateDefaults">, string> = {
  save: STATUS_TEXT.FAILED,
  exportYaml: STATUS_TEXT.YAML_EXPORT_FAILED,
  importYaml: STATUS_TEXT.YAML_IMPORT_FAILED
};

export function getMutationSuccessStatus(action: Exclude<AdminMutationAction, "applyTemplateDefaults">): string {
  return SUCCESS_MESSAGES[action];
}

export function getMutationErrorStatus(action: Exclude<AdminMutationAction, "applyTemplateDefaults">): string {
  return ERROR_MESSAGES[action];
}

export function getTemplateAppliedStatus(templateId: TemplateId): string {
  return `${STATUS_TEXT.TEMPLATE_APPLIED_PREFIX} ${templateId} ${STATUS_TEXT.TEMPLATE_APPLIED_SUFFIX}`;
}
