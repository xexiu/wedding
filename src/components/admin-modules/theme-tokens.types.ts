"use client";

import { ThemeTokens } from "@/themes/theme-tokens";
import { Dispatch, SetStateAction } from "react";

export type ThemeTokensEditorProps = {
  themeTokens: ThemeTokens;
  setThemeTokens: Dispatch<SetStateAction<ThemeTokens>>;
};
