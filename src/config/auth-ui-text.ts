import { defaultLocale } from "@/config/locales";

type AuthUiText = {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  loginButton: string;
  loginButtonLoading: string;
  invalidCredentials: string;
};

const AUTH_UI_TEXT: Record<string, AuthUiText> = {
  en: {
    title: "Admin Login",
    subtitle: "Sign in to manage wedding modules and locale configuration.",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginButton: "Sign In",
    loginButtonLoading: "Signing in...",
    invalidCredentials: "Invalid email or password."
  },
  es: {
    title: "Acceso Admin",
    subtitle: "Inicia sesion para gestionar modulos y configuracion de idiomas.",
    emailLabel: "Correo",
    passwordLabel: "Contrasena",
    loginButton: "Iniciar sesion",
    loginButtonLoading: "Se proceseaza...",
    invalidCredentials: "Correo o contrasena invalidos."
  },
  ro: {
    title: "Autentificare Admin",
    subtitle: "Conecteaza-te pentru a administra modulele si localele.",
    emailLabel: "Email",
    passwordLabel: "Parola",
    loginButton: "Conectare",
    loginButtonLoading: "Se proceseaza...",
    invalidCredentials: "Email sau parola invalida."
  }
};

export function getAuthUiText(locale: string): AuthUiText {
  return AUTH_UI_TEXT[locale] ?? AUTH_UI_TEXT[defaultLocale];
}
