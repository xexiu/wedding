"use client";

import { LocaleCode } from "@/components/admin-modules/types";
import { ModuleId, ModulePropsMap } from "@/config/modules";
import { Dispatch, SetStateAction } from "react";

export type ModulePropsEditorProps = {
  order: ModuleId[];
  localeForProps: LocaleCode;
  localeOptions: LocaleCode[];
  setLocaleForProps: Dispatch<SetStateAction<LocaleCode>>;
  moduleProps: ModulePropsMap;
  setModuleProps: Dispatch<SetStateAction<ModulePropsMap>>;
};
