"use client";

import { LocaleConfigPayload } from "@/components/admin-modules/types";
import { LocaleMessageFieldKey, LOCALE_MESSAGE_FIELD_ORDER } from "@/components/organisms/admin-modules/locale-manager.constants";

export type LocaleValidationWarning =
  | { type: "empty"; field: LocaleMessageFieldKey }
  | { type: "duplicate"; fieldA: LocaleMessageFieldKey; fieldB: LocaleMessageFieldKey };

const DUPLICATE_CHECK_PAIRS: Array<[LocaleMessageFieldKey, LocaleMessageFieldKey]> = [
  ["save", "enabled"],
  ["save", "disabled"],
  ["enabled", "disabled"]
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getLocaleValidationWarnings(locale: LocaleConfigPayload): LocaleValidationWarning[] {
  const warnings: LocaleValidationWarning[] = [];

  for (const field of LOCALE_MESSAGE_FIELD_ORDER) {
    if (normalize(locale.messages[field]).length === 0) {
      warnings.push({ type: "empty", field });
    }
  }

  for (const [fieldA, fieldB] of DUPLICATE_CHECK_PAIRS) {
    const valueA = normalize(locale.messages[fieldA]);
    const valueB = normalize(locale.messages[fieldB]);
    if (valueA.length > 0 && valueA === valueB) {
      warnings.push({ type: "duplicate", fieldA, fieldB });
    }
  }

  return warnings;
}
