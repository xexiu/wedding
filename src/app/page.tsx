import { redirect } from "next/navigation";
import { APP_SHELL_TEXT } from "@/config/app-shell-text";

export default function RootPage() {
  redirect(APP_SHELL_TEXT.LOCALE_REDIRECT_PATH);
}
