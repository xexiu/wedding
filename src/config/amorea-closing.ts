export type AmoreaClosingCopy = {
  bodyLines: [string, string];
  footer: string;
};

const BY_LOCALE: Record<string, AmoreaClosingCopy> = {
  en: {
    bodyLines: ["With all our love,", "we kindly ask you to confirm your attendance"],
    footer: "invite.amoreastudio.com"
  },
  es: {
    bodyLines: ["Con mucho cariño,", "agradeceremos nos confirme su asistencia"],
    footer: "invite.amoreastudio.com"
  },
  ro: {
    bodyLines: ["Cu toată dragostea,", "vă rugăm să confirmați prezența"],
    footer: "invite.amoreastudio.com"
  }
};

export function getAmoreaClosingCopy(locale: string): AmoreaClosingCopy {
  return BY_LOCALE[locale] ?? BY_LOCALE.en;
}
