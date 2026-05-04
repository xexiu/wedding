"use client";

import { AdminUiText } from "@/config/admin-ui-text-bundles";
import {
  AdminUiPath,
  LocaleMessageFieldKey
} from "@/components/organisms/admin-modules/locale-manager.constants";
import { LocaleValidationWarning } from "@/components/organisms/admin-modules/locale-manager.validation";
import { Messages } from "@/i18n/messages";

export function getLocaleMessageFieldLabel(text: AdminUiText, key: LocaleMessageFieldKey): string {
  switch (key) {
    case "title":
      return text.LOCALES.MESSAGE_LABEL_TITLE;
    case "subtitle":
      return text.LOCALES.MESSAGE_LABEL_SUBTITLE;
    case "adminTitle":
      return text.LOCALES.MESSAGE_LABEL_ADMIN_TITLE;
    case "adminDescription":
      return text.LOCALES.MESSAGE_LABEL_ADMIN_DESCRIPTION;
    case "save":
      return text.LOCALES.MESSAGE_LABEL_SAVE;
    case "enabled":
      return text.LOCALES.MESSAGE_LABEL_ENABLED;
    case "disabled":
      return text.LOCALES.MESSAGE_LABEL_DISABLED;
    default:
      return key;
  }
}

export function formatLocaleWarning(warning: LocaleValidationWarning, text: AdminUiText): string {
  if (warning.type === "empty") {
    return `${text.LOCALES.VALIDATION_EMPTY_PREFIX} ${getLocaleMessageFieldLabel(text, warning.field)}`;
  }

  return `${text.LOCALES.VALIDATION_DUPLICATE_PREFIX} ${getLocaleMessageFieldLabel(text, warning.fieldA)} / ${getLocaleMessageFieldLabel(text, warning.fieldB)}`;
}

export function getAdminUiPathValue(messages: Messages, path: AdminUiPath): string {
  const [group, key] = path.split(".");
  const groupValue = messages.adminUi[group as keyof Messages["adminUi"]] as Record<string, string> | undefined;
  return groupValue?.[key] ?? "";
}

export function setAdminUiPathValue(messages: Messages, path: AdminUiPath, value: string): Messages {
  const [group, key] = path.split(".");
  const groupKey = group as keyof Messages["adminUi"];
  const currentGroup = messages.adminUi[groupKey] as Record<string, string>;
  return {
    ...messages,
    adminUi: {
      ...messages.adminUi,
      [groupKey]: {
        ...currentGroup,
        [key]: value
      }
    }
  };
}
