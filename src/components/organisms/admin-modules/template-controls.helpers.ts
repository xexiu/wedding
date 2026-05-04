"use client";

import { TemplateIdGuard } from "@/components/organisms/admin-modules/template-controls.types";
import { TemplateId, templates } from "@/themes/templates";

export const isTemplateId: TemplateIdGuard = (value: string): value is TemplateId => {
  return templates.some((template) => template.id === value);
};
