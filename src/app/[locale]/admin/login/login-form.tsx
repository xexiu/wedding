"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginFormText = {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  loginButton: string;
  loginButtonLoading: string;
  invalidCredentials: string;
};

type LoginFormProps = {
  locale: string;
  text: LoginFormText;
};

export function LoginForm({ locale, text }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);
    if (!response.ok) {
      setError(text.invalidCredentials);
      return;
    }

    router.push(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">{text.title}</h1>
      <p className="mt-2 text-sm text-slate-600">{text.subtitle}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-slate-700">
          {text.emailLabel}
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          {text.passwordLabel}
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? text.loginButtonLoading : text.loginButton}
        </button>
      </form>
    </div>
  );
}
