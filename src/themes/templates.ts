import { createLocalizedText } from "@/config/localized-text";
import { defaultModuleProps, ModulePropsMap } from "@/config/modules";
import { defaultWeddingDetails, WeddingDetails } from "@/config/wedding-details";
import { ThemeTokenValues } from "@/themes/theme-tokens";

export type TemplateId = "amorea-signature" | "classic" | "botanical-deluxe" | "dark-luxury" | "ivory-editorial";

export type TemplateStyles = {
  pageBg: string;
  heroCard: string;
  sectionCard: string;
  carouselCard: string;
};

type TemplateConfig = {
  id: TemplateId;
  label: string;
  styles: TemplateStyles;
  defaults: {
    weddingDetails: WeddingDetails;
    moduleProps: ModulePropsMap;
    themeTokenValues: ThemeTokenValues;
  };
};

const localized = (en: string, es: string, ro: string) => createLocalizedText({ en, es, ro });

export const templates: TemplateConfig[] = [
  {
    id: "amorea-signature",
    label: "Amorea Signature",
    styles: {
      pageBg: "invitation-amorea-page",
      heroCard: "invitation-amorea-hero",
      sectionCard: "invitation-amorea-section",
      carouselCard: "invitation-amorea-carousel"
    },
    defaults: {
      weddingDetails: defaultWeddingDetails,
      moduleProps: defaultModuleProps,
      themeTokenValues: {
        primary: "#1a1a2e",
        secondary: "#dce4f0",
        accent: "#4a6da7",
        surface: "#ffffff",
        text: "#4a4a6a",
        buttonBg: "#3f67ab",
        buttonText: "#ffffff",
        buttonRadius: 6
      }
    }
  },
  {
    id: "classic",
    label: "Blue Floral Classic",
    styles: {
      pageBg: "invitation-default-page bg-gradient-to-b from-slate-50 via-white to-blue-50",
      heroCard: "invitation-default-hero",
      sectionCard: "invitation-default-section",
      carouselCard: "invitation-default-carousel from-[#d7e5ff] via-[#f9fbff] to-[#b8cff4]"
    },
    defaults: {
      weddingDetails: defaultWeddingDetails,
      moduleProps: defaultModuleProps,
      themeTokenValues: {
        primary: "#1f325e",
        secondary: "#adc2e8",
        accent: "#6f8fc8",
        surface: "#ffffff",
        text: "#2a3550",
        buttonBg: "#4e6fa9",
        buttonText: "#ffffff",
        buttonRadius: 18
      }
    }
  },
  {
    id: "botanical-deluxe",
    label: "Botanical Deluxe",
    styles: {
      pageBg: "bg-gradient-to-b from-emerald-50 to-rose-50",
      heroCard: "bg-emerald-50/70",
      sectionCard: "border-emerald-100 bg-white/80",
      carouselCard: "from-emerald-200 via-rose-100 to-amber-100"
    },
    defaults: {
      weddingDetails: {
        ...defaultWeddingDetails,
        venueName: {
          en: "Botanical Garden Hall",
          es: "Salon Jardin Botanico",
          ro: "Salon Gradina Botanica"
        },
        eventSubtitle: {
          en: "A botanical celebration",
          es: "Una celebracion botanica",
          ro: "O celebrare botanica"
        },
        contactEmail: "botanical@example.com"
      },
      moduleProps: {
        ...defaultModuleProps,
        heroCarousel: { ...defaultModuleProps.heroCarousel, autoplayMs: 4500, showDots: true },
        ourStory: { title: localized("Our Story", "Nuestra Historia", "Povestea Noastra") }
      },
      themeTokenValues: {
        primary: "#166534",
        secondary: "#84cc16",
        accent: "#f43f5e",
        surface: "#fdfcf8",
        text: "#14532d",
        buttonBg: "#166534",
        buttonText: "#ffffff",
        buttonRadius: 14
      }
    }
  },
  {
    id: "dark-luxury",
    label: "Dark Luxury",
    styles: {
      pageBg: "bg-gradient-to-b from-zinc-900 to-neutral-800",
      heroCard: "bg-zinc-900/60 border border-zinc-700",
      sectionCard: "border-zinc-700 bg-zinc-900/70 text-zinc-100",
      carouselCard: "from-zinc-700 via-neutral-700 to-zinc-800"
    },
    defaults: {
      weddingDetails: {
        ...defaultWeddingDetails,
        venueName: {
          en: "Grand Noir Ballroom",
          es: "Salon Grand Noir",
          ro: "Salon Grand Noir"
        },
        eventSubtitle: {
          en: "An elegant black-tie evening",
          es: "Una noche elegante de etiqueta",
          ro: "O seara eleganta black-tie"
        },
        contactEmail: "luxury@example.com"
      },
      moduleProps: {
        ...defaultModuleProps,
        heroCarousel: { ...defaultModuleProps.heroCarousel, autoplayMs: 5500, showDots: true },
        faq: { title: localized("Guest Guide", "Guia", "Ghid Invitati") },
        rsvp: { title: localized("Confirm Presence", "Confirmar", "Confirmare Prezenta") }
      },
      themeTokenValues: {
        primary: "#f9fafb",
        secondary: "#d4d4d8",
        accent: "#facc15",
        surface: "#18181b",
        text: "#f4f4f5",
        buttonBg: "#f9fafb",
        buttonText: "#111827",
        buttonRadius: 4
      }
    }
  },
  {
    id: "ivory-editorial",
    label: "Ivory Editorial",
    styles: {
      pageBg: "bg-gradient-to-b from-stone-50 to-amber-50",
      heroCard: "bg-stone-50/80",
      sectionCard: "border-amber-100 bg-white/80",
      carouselCard: "from-amber-100 via-stone-100 to-rose-100"
    },
    defaults: {
      weddingDetails: {
        ...defaultWeddingDetails,
        venueName: {
          en: "Ivory Estate",
          es: "Finca Ivory",
          ro: "Domeniul Ivory"
        },
        eventSubtitle: {
          en: "An editorial-inspired ceremony",
          es: "Una ceremonia estilo editorial",
          ro: "O ceremonie in stil editorial"
        },
        contactEmail: "editorial@example.com"
      },
      moduleProps: {
        ...defaultModuleProps,
        ourStory: { title: localized("Editorial Story", "Historia Editorial", "Poveste Editoriala") },
        photoMosaic: { columns: 4 }
      },
      themeTokenValues: {
        primary: "#7c2d12",
        secondary: "#d6d3d1",
        accent: "#b45309",
        surface: "#fffbeb",
        text: "#44403c",
        buttonBg: "#7c2d12",
        buttonText: "#fff7ed",
        buttonRadius: 8
      }
    }
  }
];

export function getTemplateStyles(templateId: TemplateId): TemplateStyles {
  return templates.find((x) => x.id === templateId)?.styles ?? templates[0].styles;
}

export function getTemplateDefaults(templateId: TemplateId): TemplateConfig["defaults"] {
  return templates.find((x) => x.id === templateId)?.defaults ?? templates[0].defaults;
}

export function getTemplateThemeTokenValues(templateId: TemplateId): ThemeTokenValues {
  return getTemplateDefaults(templateId).themeTokenValues;
}
