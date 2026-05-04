"use client";

import { CadencePreset, DEFAULT_CADENCE_PRESET } from "@/themes/cadence";

type SectionPixelTokens = {
  HERO: {
    SHELL: string;
    WRAP: string;
    ENVELOPE: string;
    KICKER: string;
    NAMES: string;
    SEAL_WRAP: string;
    SEAL_OUTER: string;
    SEAL_INNER: string;
    TITLE: string;
    SUBTITLE: string;
  };
  COUNTDOWN: {
    CARD: string;
    KICKER: string;
    GRID: string;
    BLOCK: string;
    NUMBER: string;
    LABEL: string;
    FOOTER: string;
    DATE: string;
  };
  SCHEDULE: {
    WRAP: string;
    CARD: string;
    TITLE: string;
    BODY: string;
    META_ROW: string;
    META_TEXT: string;
    LOCATION_BUTTON: string;
    PARTY: string;
  };
  RSVP: {
    CARD: string;
    SEAL: string;
    SEAL_INNER: string;
    TITLE: string;
    FORM_STACK: string;
    FIELD: string;
    INPUT_LABEL: string;
    INPUT: string;
    CTA: string;
    CONTACT: string;
  };
};

type SectionPixelTokensOverride = {
  [K in keyof SectionPixelTokens]?: Partial<SectionPixelTokens[K]>;
};

const BASE_SECTION_PIXEL_TOKENS: SectionPixelTokens = {
  HERO: {
    SHELL:
      "mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r px-4 pb-6 pt-5 text-center shadow-sm sm:mt-6 sm:rounded-3xl sm:px-6 sm:pb-8 sm:pt-7 lg:px-8 lg:pb-10 lg:pt-8",
    WRAP: "mx-auto mb-5 w-full max-w-[360px] rounded-[20px] border border-slate-200 bg-white/92 p-3 shadow-sm sm:mb-6 sm:max-w-[420px] sm:p-4 md:max-w-[460px]",
    ENVELOPE: "rounded-[16px] bg-[#6f8fc8] px-4 pb-5 pt-4 text-white shadow-inner sm:px-5 sm:pb-6 sm:pt-5",
    KICKER: "text-[10px] uppercase tracking-[0.28em] opacity-90 sm:text-xs sm:tracking-[0.3em]",
    NAMES: "mt-1.5 text-[30px] leading-[0.92] tracking-[0.01em] sm:text-[36px] md:text-[40px]",
    SEAL_WRAP: "-mt-3.5 flex justify-center sm:-mt-4.5",
    SEAL_OUTER: "h-8 w-8 rounded-full border-2 border-[#d9bf85] bg-[#efe2c6] shadow sm:h-10 sm:w-10",
    SEAL_INNER: "m-1 h-4 w-4 rounded-full border border-[#d1b173] sm:m-[6px] sm:h-5 sm:w-5",
    TITLE: "text-[42px] font-bold leading-[0.9] tracking-[0.01em] sm:text-[56px] md:text-[64px]",
    SUBTITLE: "mt-2.5 text-[18px] leading-[1.14] tracking-[0.01em] sm:mt-3 sm:text-[22px] md:text-[26px]"
  },
  COUNTDOWN: {
    CARD: "rounded-[22px] border border-slate-200 bg-white/82 px-4 pb-5 pt-4 text-center shadow-sm sm:px-6 sm:pb-7 sm:pt-6 md:px-7 md:pb-8 md:pt-7",
    KICKER: "text-[11px] tracking-[0.34em] text-slate-500 sm:text-xs",
    GRID: "mt-3.5 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-4",
    BLOCK: "rounded-[14px] border border-slate-200 bg-white px-2.5 pb-2.5 pt-3 sm:px-3 sm:pb-3 sm:pt-4",
    NUMBER: "text-[44px] font-semibold leading-[0.9] tracking-[0.01em] text-slate-800 sm:text-[58px] md:text-[64px]",
    LABEL: "mt-1.5 text-[10px] uppercase tracking-[0.26em] text-slate-500 sm:text-xs",
    FOOTER: "mt-4.5 text-[17px] uppercase tracking-[0.2em] text-slate-600 sm:text-[20px]",
    DATE: "mt-2.5 text-sm leading-snug text-slate-600 sm:text-base"
  },
  SCHEDULE: {
    WRAP: "space-y-3.5 sm:space-y-4.5",
    CARD: "rounded-[16px] border border-slate-200 bg-white/88 px-4 pb-4 pt-3.5 shadow-sm sm:px-5 sm:pb-5 sm:pt-4.5",
    TITLE: "text-[36px] leading-[0.9] tracking-[0.01em] sm:text-[42px] md:text-[46px]",
    BODY: "mt-2.5 text-sm leading-[1.3] text-slate-700 sm:text-base",
    META_ROW: "mt-3.5 flex items-center justify-between gap-2",
    META_TEXT: "text-[11px] uppercase tracking-[0.22em] text-slate-600 sm:text-xs",
    LOCATION_BUTTON:
      "inline-block rounded-full border border-slate-300 bg-white px-4 py-[6px] text-center text-[10px] uppercase tracking-[0.17em] text-slate-700 no-underline sm:px-5 sm:text-xs",
    PARTY: "rounded-[14px] border border-slate-200 bg-white/80 px-3 py-3.5 text-sm leading-snug text-slate-700 sm:text-base"
  },
  RSVP: {
    CARD: "relative mx-auto max-w-lg rounded-[22px] border border-slate-200 bg-white px-4 pb-4 pt-5 shadow-sm sm:px-6 sm:pb-6 sm:pt-7",
    SEAL: "pointer-events-none absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-2 border-[#d9bf85] bg-[#efe2c6] shadow sm:-top-7 sm:h-12 sm:w-12",
    SEAL_INNER: "absolute inset-1 rounded-full border border-[#d1b173] sm:inset-[6px]",
    TITLE: "mb-3.5 text-center text-[33px] leading-[0.9] tracking-[0.01em] sm:mb-4.5 sm:text-[40px]",
    FORM_STACK: "space-y-2.5",
    FIELD: "space-y-0.5",
    INPUT_LABEL:
      "block text-left text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.24em]",
    INPUT: "min-h-10 w-full rounded border border-slate-300 px-3 text-sm leading-tight text-slate-600 sm:min-h-11 sm:text-[15px]",
    CTA: "mt-2.5 w-full rounded-full px-4 py-[10px] text-sm tracking-[0.01em] sm:text-[15px]",
    CONTACT: "mt-4.5 break-words text-center text-sm leading-snug text-slate-600 sm:text-base"
  }
};

const CADENCE_OVERRIDES: Record<CadencePreset, SectionPixelTokensOverride> = {
  "mobile-tight": {
    HERO: {
      SHELL:
        "mx-auto mt-3 w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r px-3 pb-5 pt-4 text-center shadow-sm sm:mt-5 sm:rounded-3xl sm:px-5 sm:pb-7 sm:pt-6 lg:px-7 lg:pb-9 lg:pt-7",
      WRAP: "mx-auto mb-4 w-full max-w-[350px] rounded-[20px] border border-slate-200 bg-white/92 p-2.5 shadow-sm sm:mb-5 sm:max-w-[410px] sm:p-3.5 md:max-w-[450px]",
      TITLE: "text-[40px] font-bold leading-[0.9] tracking-[0.01em] sm:text-[52px] md:text-[60px]",
      SUBTITLE: "mt-2 text-[17px] leading-[1.12] tracking-[0.01em] sm:mt-2.5 sm:text-[21px] md:text-[24px]"
    },
    COUNTDOWN: {
      CARD: "rounded-[22px] border border-slate-200 bg-white/82 px-3.5 pb-4.5 pt-3.5 text-center shadow-sm sm:px-5 sm:pb-6 sm:pt-5 md:px-6 md:pb-7 md:pt-6",
      GRID: "mt-3 grid grid-cols-3 gap-2 sm:mt-3.5 sm:gap-3",
      FOOTER: "mt-4 text-[16px] uppercase tracking-[0.18em] text-slate-600 sm:text-[18px]"
    },
    SCHEDULE: {
      WRAP: "space-y-3 sm:space-y-4",
      CARD: "rounded-[16px] border border-slate-200 bg-white/88 px-3.5 pb-3.5 pt-3 shadow-sm sm:px-4.5 sm:pb-4.5 sm:pt-4",
      META_ROW: "mt-3 flex items-center justify-between gap-2"
    },
    RSVP: {
      CARD: "relative mx-auto max-w-lg rounded-[22px] border border-slate-200 bg-white px-3.5 pb-3.5 pt-4.5 shadow-sm sm:px-5 sm:pb-5 sm:pt-6",
      TITLE: "mb-3 text-center text-[31px] leading-[0.9] tracking-[0.01em] sm:mb-4 sm:text-[38px]",
      FORM_STACK: "space-y-2",
      CONTACT: "mt-4 break-words text-center text-sm leading-snug text-slate-600 sm:text-[15px]"
    }
  },
  "mobile-balanced": {},
  "desktop-editorial": {
    HERO: {
      SHELL:
        "mx-auto mt-5 w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r px-5 pb-7 pt-6 text-center shadow-sm sm:mt-7 sm:rounded-3xl sm:px-7 sm:pb-9 sm:pt-8 lg:px-10 lg:pb-12 lg:pt-10",
      WRAP: "mx-auto mb-6 w-full max-w-[380px] rounded-[20px] border border-slate-200 bg-white/92 p-3.5 shadow-sm sm:mb-7 sm:max-w-[440px] sm:p-4.5 md:max-w-[480px]",
      KICKER: "text-[11px] uppercase tracking-[0.32em] opacity-90 sm:text-xs sm:tracking-[0.34em]",
      TITLE: "text-[44px] font-bold leading-[0.9] tracking-[0.012em] sm:text-[60px] md:text-[68px]",
      SUBTITLE: "mt-3 text-[19px] leading-[1.16] tracking-[0.012em] sm:mt-3.5 sm:text-[24px] md:text-[28px]"
    },
    COUNTDOWN: {
      CARD: "rounded-[22px] border border-slate-200 bg-white/82 px-5 pb-6 pt-5 text-center shadow-sm sm:px-7 sm:pb-8 sm:pt-7 md:px-8 md:pb-9 md:pt-8",
      GRID: "mt-4 grid grid-cols-3 gap-2.5 sm:mt-4.5 sm:gap-4.5",
      NUMBER: "text-[46px] font-semibold leading-[0.9] tracking-[0.012em] text-slate-800 sm:text-[62px] md:text-[68px]",
      FOOTER: "mt-5 text-[18px] uppercase tracking-[0.22em] text-slate-600 sm:text-[22px]"
    },
    SCHEDULE: {
      WRAP: "space-y-4 sm:space-y-5",
      CARD: "rounded-[16px] border border-slate-200 bg-white/88 px-5 pb-5 pt-4 shadow-sm sm:px-6 sm:pb-6 sm:pt-5",
      TITLE: "text-[38px] leading-[0.9] tracking-[0.012em] sm:text-[46px] md:text-[50px]",
      BODY: "mt-3 text-sm leading-[1.36] text-slate-700 sm:text-base",
      META_ROW: "mt-4 flex items-center justify-between gap-2"
    },
    RSVP: {
      CARD: "relative mx-auto max-w-lg rounded-[22px] border border-slate-200 bg-white px-5 pb-5 pt-6 shadow-sm sm:px-7 sm:pb-7 sm:pt-8",
      TITLE: "mb-4 text-center text-[34px] leading-[0.9] tracking-[0.012em] sm:mb-5 sm:text-[42px]",
      FORM_STACK: "space-y-3",
      CTA: "mt-3 w-full rounded-full px-4 py-[11px] text-sm tracking-[0.012em] sm:text-[15px]",
      CONTACT: "mt-5 break-words text-center text-sm leading-snug text-slate-600 sm:text-base"
    }
  }
};

export function getSectionPixelTokens(cadencePreset: CadencePreset = DEFAULT_CADENCE_PRESET) {
  return {
    ...BASE_SECTION_PIXEL_TOKENS,
    HERO: { ...BASE_SECTION_PIXEL_TOKENS.HERO, ...CADENCE_OVERRIDES[cadencePreset].HERO },
    COUNTDOWN: { ...BASE_SECTION_PIXEL_TOKENS.COUNTDOWN, ...CADENCE_OVERRIDES[cadencePreset].COUNTDOWN },
    SCHEDULE: { ...BASE_SECTION_PIXEL_TOKENS.SCHEDULE, ...CADENCE_OVERRIDES[cadencePreset].SCHEDULE },
    RSVP: { ...BASE_SECTION_PIXEL_TOKENS.RSVP, ...CADENCE_OVERRIDES[cadencePreset].RSVP }
  };
}

export const SECTION_PIXEL_TOKENS = getSectionPixelTokens();
