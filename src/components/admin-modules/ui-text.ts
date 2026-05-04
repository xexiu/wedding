"use client";

import { AdminUiText, ADMIN_UI_TEXT_EN, mergeAdminUiTextWithDefaults } from "@/config/admin-ui-text-bundles";
import { Messages } from "@/i18n/messages";
import { ReactNode, createContext, createElement, useContext } from "react";

const AdminUiTextContext = createContext<AdminUiText>(ADMIN_UI_TEXT_EN);

type AdminUiTextProviderProps = {
  locale: string;
  messages: Messages;
  children: ReactNode;
};

export function AdminUiTextProvider({ locale, messages, children }: AdminUiTextProviderProps) {
  const value = mergeAdminUiTextWithDefaults(messages.adminUi, locale);
  return createElement(AdminUiTextContext.Provider, { value }, children);
}

export function useAdminUiText() {
  return useContext(AdminUiTextContext);
}
