import "./globals.css";
import { AppProviders } from "./providers";
import { APP_SHELL_TEXT } from "@/config/app-shell-text";
import { defaultLocale } from "@/config/locales";
import { getSiteConfig } from "@/lib/site-config-store";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await getSiteConfig();
    const brideName = config.weddingDetails.brideName.trim();
    const groomName = config.weddingDetails.groomName.trim();
    const namesTitle = [brideName, groomName].filter(Boolean).join(" & ");
    const localizedSubtitle = config.weddingDetails.eventSubtitle[defaultLocale];
    const subtitle = typeof localizedSubtitle === "string" ? localizedSubtitle.trim() : "";

    return {
      title: namesTitle || APP_SHELL_TEXT.METADATA_TITLE,
      description: subtitle || APP_SHELL_TEXT.METADATA_DESCRIPTION
    };
  } catch {
    return {
      title: APP_SHELL_TEXT.METADATA_TITLE,
      description: APP_SHELL_TEXT.METADATA_DESCRIPTION
    };
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={APP_SHELL_TEXT.HTML_DEFAULT_LANG}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
