"use client";

import { TemplateId } from "@/themes/templates";

export type TemplateIdGuard = (value: string) => value is TemplateId;
