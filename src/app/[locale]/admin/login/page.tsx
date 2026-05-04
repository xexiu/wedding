import { getAuthUiText } from "@/config/auth-ui-text";
import { getAdminSessionFromCookieStore } from "@/lib/auth/guards";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

type AdminLoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminLoginPage({ params }: AdminLoginPageProps) {
  const { locale } = await params;
  const session = await getAdminSessionFromCookieStore();
  if (session?.role === "ADMIN") {
    redirect(`/${locale}/admin`);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <LoginForm locale={locale} text={getAuthUiText(locale)} />
    </main>
  );
}
