import "./globals.css";
import { AppProviders } from "./providers";
import { APP_SHELL_TEXT } from "@/config/app-shell-text";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: APP_SHELL_TEXT.METADATA_TITLE,
  description: APP_SHELL_TEXT.METADATA_DESCRIPTION
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={APP_SHELL_TEXT.HTML_DEFAULT_LANG}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
