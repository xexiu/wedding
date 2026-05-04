import { AdminModules } from "@/components/admin-modules";
import { LocalePreferenceSync } from "@/components/locale-preference-sync";
import { isLocale } from "@/config/locales";
import { getSiteConfig } from "@/lib/site-config-store";
import { getEnabledLocaleCodes } from "@/lib/locales-store";
import { getAdminSessionFromCookieStore } from "@/lib/auth/guards";
import { getMessages } from "@/i18n/messages";
import { notFound, redirect } from "next/navigation";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getAdminSessionFromCookieStore();
  if (!session || session.role !== "ADMIN") {
    redirect(`/${locale}/admin/login`);
  }
  const enabledLocales = await getEnabledLocaleCodes();
  if (!isLocale(locale, enabledLocales)) return notFound();
  const messages = await getMessages(locale);
  const config = await getSiteConfig();

  return (
    <main className="min-h-screen bg-rose-50 px-3 py-5 sm:px-4 sm:py-8">
      <LocalePreferenceSync locale={locale} templateId={config.templateId} layoutSettings={config.layoutSettings} />
      <AdminModules locale={locale} messages={messages} />
    </main>
  );
}
