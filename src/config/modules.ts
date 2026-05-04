import {
  createLocalizedText,
  LocalizedText,
  normalizeLocalizedText,
  normalizeLocalizedTextAllowEmpty
} from "@/config/localized-text";
import { parseCarouselImageFilenames } from "@/lib/carousel-images";

export type ModuleId =
  | "heroCarousel"
  | "envelope"
  | "poem"
  | "ourSong"
  | "countdown"
  | "dressCode"
  | "gifts"
  | "ourStory"
  | "schedule"
  | "photoMosaic"
  | "faq"
  | "rsvp";

export type ModuleDefinition = {
  id: ModuleId;
  enabled: boolean;
};

/** Amorea envelope + wax seal + letter modal — no configurable props yet. */
export type EnvelopeProps = Record<string, never>;

/** One slide in the Amorea image stack: image URL/path/filename + localized title & subtitle. */
export type CarouselSlideConfig = {
  /** Full URL, site path (`/...`), or filename under `public/carousel/images/`. */
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
};

export type HeroCarouselProps = {
  autoplayMs: number;
  showDots: boolean;
  carouselSlides: CarouselSlideConfig[];
  stackAutoplayMs: number;
  slideOneTitle: LocalizedText;
  slideOneSubtitle: LocalizedText;
  slideTwoTitle: LocalizedText;
  slideTwoSubtitle: LocalizedText;
  slideThreeTitle: LocalizedText;
  slideThreeSubtitle: LocalizedText;
};

/** Countdown has no module props; RSVP deadline is shown in RSVP + closing only. */
export type CountdownProps = Record<string, never>;

/** Fallback label when admin leaves title blank and no legacy track/artist. */
export const DEFAULT_SONG_DISPLAY_TITLE = "Gala - Freed from desire!";

export type OurSongProps = {
  title: LocalizedText;
  /** Absolute or relative URL; empty uses bundled `/audio/gala_free_from_desiree.mp3`. */
  audioUrl: string;
  /** Main line under the player; per locale. Empty → legacy track/artist or default title. */
  songTitle: LocalizedText;
  trackName: LocalizedText;
  artistName: LocalizedText;
};

export type DressCodeProps = {
  title: LocalizedText;
  description: LocalizedText;
};

export type GiftsProps = {
  title: LocalizedText;
  message: LocalizedText;
  /** Opens from the badge row (e.g. “Click”). */
  modalOpenButtonLabel: LocalizedText;
  modalTitle: LocalizedText;
  modalSubtitle: LocalizedText;
  /** Main copy: registry links, bank details, honeymoon fund, etc. */
  modalBody: LocalizedText;
};

export type StoryProps = {
  title: LocalizedText;
};

export type PoemProps = {
  title: LocalizedText;
  titleFontFamily: string;
  titleFontSizePx: number;
  subtitle: LocalizedText;
  subtitleFontFamily: string;
  subtitleFontSizePx: number;
  body: LocalizedText;
  bodyFontFamily: string;
  bodyFontSizePx: number;
};

export type ScheduleProps = {
  showAperitivoRow: boolean;
  showPartyRow: boolean;
  ceremonyLabel: LocalizedText;
  aperitivoLabel: LocalizedText;
  dinnerLabel: LocalizedText;
  partyLabel: LocalizedText;
};

export type PhotoMosaicProps = {
  columns: number;
};

export type FaqProps = {
  title: LocalizedText;
};

export type RsvpProps = {
  title: LocalizedText;
};

export type ModulePropsMap = {
  heroCarousel: HeroCarouselProps;
  envelope: EnvelopeProps;
  poem: PoemProps;
  ourSong: OurSongProps;
  countdown: CountdownProps;
  dressCode: DressCodeProps;
  gifts: GiftsProps;
  ourStory: StoryProps;
  schedule: ScheduleProps;
  photoMosaic: PhotoMosaicProps;
  faq: FaqProps;
  rsvp: RsvpProps;
};

export const moduleFlags: ModuleDefinition[] = [
  { id: "heroCarousel", enabled: true },
  { id: "envelope", enabled: true },
  { id: "poem", enabled: true },
  { id: "ourSong", enabled: true },
  { id: "countdown", enabled: true },
  { id: "dressCode", enabled: true },
  { id: "gifts", enabled: true },
  { id: "ourStory", enabled: true },
  { id: "schedule", enabled: true },
  { id: "photoMosaic", enabled: true },
  { id: "faq", enabled: true },
  { id: "rsvp", enabled: true }
];

export const moduleOrder: ModuleId[] = [
  "heroCarousel",
  "envelope",
  "poem",
  "ourSong",
  "dressCode",
  "gifts",
  "countdown",
  "ourStory",
  "schedule",
  "photoMosaic",
  "faq",
  "rsvp"
];

export const defaultModuleProps: ModulePropsMap = {
  envelope: {},
  heroCarousel: {
    autoplayMs: 5000,
    showDots: true,
    carouselSlides: [
      {
        image: "01.png",
        title: createLocalizedText({ en: "We are getting married", es: "Nos casamos", ro: "Ne casatorim" }),
        subtitle: createLocalizedText({
          en: "{bride} & {groom} — {date}",
          es: "{bride} y {groom} — {date}",
          ro: "{bride} si {groom} — {date}"
        })
      },
      {
        image: "02.webp",
        title: createLocalizedText({
          en: "A day to remember",
          es: "Un dia para recordar",
          ro: "O zi de neuitat"
        }),
        subtitle: createLocalizedText({
          en: "Ceremony, dinner and dancing together",
          es: "Ceremonia, cena y baile juntos",
          ro: "Ceremonie, cina si dans impreuna"
        })
      },
      {
        image: "03.webp",
        title: createLocalizedText({
          en: "Join our celebration",
          es: "Unete celebrarii",
          ro: "Alatura-te celebrarii"
        }),
        subtitle: createLocalizedText({
          en: "RSVP and plan your trip with us",
          es: "Confirma tu asistencia",
          ro: "Confirma prezenta"
        })
      }
    ],
    stackAutoplayMs: 4000,
    slideOneTitle: createLocalizedText({ en: "We are getting married", es: "Nos casamos", ro: "Ne casatorim" }),
    slideOneSubtitle: createLocalizedText({
      en: "{bride} & {groom} - {date}",
      es: "{bride} y {groom} - {date}",
      ro: "{bride} si {groom} - {date}"
    }),
    slideTwoTitle: createLocalizedText({
      en: "A day to remember",
      es: "Un dia para recordar",
      ro: "O zi de neuitat"
    }),
    slideTwoSubtitle: createLocalizedText({
      en: "Ceremony, dinner and dancing together",
      es: "Ceremonia, cena y baile juntos",
      ro: "Ceremonie, cina si dans impreuna"
    }),
    slideThreeTitle: createLocalizedText({
      en: "Join our celebration",
      es: "Unete celebrarii",
      ro: "Alatura-te celebrarii"
    }),
    slideThreeSubtitle: createLocalizedText({
      en: "RSVP and plan your trip with us",
      es: "Confirma prezenta si planifica calatoria cu noi",
      ro: "Confirma prezenta si planifica drumul alaturi de noi"
    })
  },
  poem: {
    title: createLocalizedText({ en: "For you", es: "Para ti", ro: "Pentru tine" }),
    titleFontFamily: '"Great Vibes", "Brittany", cursive',
    titleFontSizePx: 36,
    subtitle: createLocalizedText({ en: "", es: "", ro: "" }),
    subtitleFontFamily: '"Cormorant Garamond", Georgia, serif',
    subtitleFontSizePx: 18,
    body: createLocalizedText({
      en: "Every love story is beautiful, but ours is my favorite.",
      es: "Cada historia de amor es hermosa, pero la nuestra es mi favorita.",
      ro: "Fiecare poveste de dragoste e frumoasa, dar a noastra e preferata mea."
    }),
    bodyFontFamily: '"Cormorant Garamond", Georgia, serif',
    bodyFontSizePx: 17
  },
  ourSong: {
    title: createLocalizedText({
      en: "Press play to hear our song",
      es: "Dale play para escuchar nuestra cancion",
      ro: "Apasa play pentru cantecul nostru"
    }),
    audioUrl: "",
    songTitle: createLocalizedText({ en: "", es: "", ro: "" }),
    trackName: createLocalizedText({
      en: "Perfect",
      es: "Perfect",
      ro: "Perfect"
    }),
    artistName: createLocalizedText({
      en: "Ed Sheeran",
      es: "Ed Sheeran",
      ro: "Ed Sheeran"
    })
  },
  countdown: {},
  dressCode: {
    title: createLocalizedText({ en: "Dress Code", es: "Dress Code", ro: "Dress Code" }),
    description: createLocalizedText({
      en: "Formal evening. Gentlemen in suits, ladies in floor-length gowns.",
      es: "Formal de noche. Caballeros con traje, damas con vestido largo.",
      ro: "Formal de seara. Domni in costume, doamne in rochii lungi."
    })
  },
  gifts: {
    title: createLocalizedText({ en: "Gifts", es: "Regalos", ro: "Cadouri" }),
    message: createLocalizedText({
      en: "Your company is the most important gift. Any gift will be received with love.",
      es: "Su compañía es lo más importante. Cualquier regalo lo recibiremos con cariño.",
      ro: "Prezenta voastra este cel mai important cadou. Orice dar va fi primit cu drag."
    }),
    modalOpenButtonLabel: createLocalizedText({
      en: "Click",
      es: "Ver más",
      ro: "Detalii"
    }),
    modalTitle: createLocalizedText({
      en: "Wedding gifts",
      es: "Lista de regalos",
      ro: "Cadouri de nunta"
    }),
    modalSubtitle: createLocalizedText({
      en: "Thank you for thinking of us.",
      es: "Gracias por pensar en nosotros.",
      ro: "Va multumim ca va ganditi la noi."
    }),
    modalBody: createLocalizedText({
      en: "If you would like to give a gift, a contribution toward our honeymoon or future home would mean the world. For bank transfer details or registry links, please reach out by email or ask us on the day.",
      es: "Si desean regalarnos algo, una contribucion para nuestra luna de miel o nuestro hogar sera muy apreciada. Para datos bancarios o enlaces de lista, escribannos por correo o preguntennos el dia del evento.",
      ro: "Daca doriti sa faceti un cadou, o contributie pentru luna de miere sau casuta noastra inseamna foarte mult. Pentru date bancare sau link-uri de lista, scrieti-ne pe email sau intrebati-ne in ziua evenimentului."
    })
  },
  ourStory: { title: createLocalizedText({ en: "Our Story", es: "Nuestra Historia", ro: "Povestea Noastra" }) },
  schedule: {
    showAperitivoRow: false,
    showPartyRow: true,
    ceremonyLabel: createLocalizedText({ en: "Ceremony", es: "Ceremonia", ro: "Ceremonie" }),
    aperitivoLabel: createLocalizedText({ en: "Aperitivo", es: "Aperitivo", ro: "Aperitivo" }),
    dinnerLabel: createLocalizedText({ en: "Dinner", es: "Cena", ro: "Cina" }),
    partyLabel: createLocalizedText({ en: "Party", es: "Fiesta", ro: "Petrecere" })
  },
  photoMosaic: { columns: 3 },
  faq: { title: createLocalizedText({ en: "FAQ", es: "Preguntas", ro: "Intrebari" }) },
  rsvp: { title: createLocalizedText({ en: "RSVP", es: "Confirmacion", ro: "Confirmare" }) }
};

export function getVisibleModuleOrder(): ModuleId[] {
  const enabled = new Set(moduleFlags.filter((m) => m.enabled).map((m) => m.id));
  return moduleOrder.filter((id) => enabled.has(id));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Merges stored per-locale strings; explicit `""` is kept (unlike `normalizeLocalizedText`,
 * which drops empty strings and can leave another language’s default stuck on disk).
 */
function normalizeCarouselLocalizedField(raw: unknown, fallback: LocalizedText): LocalizedText {
  return normalizeLocalizedTextAllowEmpty(raw, fallback);
}

function normalizeCarouselSlideConfig(raw: unknown, fallback: CarouselSlideConfig): CarouselSlideConfig {
  if (!isRecord(raw)) {
    return {
      image: fallback.image,
      title: normalizeCarouselLocalizedField(undefined, fallback.title),
      subtitle: normalizeCarouselLocalizedField(undefined, fallback.subtitle)
    };
  }
  const image = typeof raw.image === "string" ? raw.image.trim() : fallback.image;
  return {
    image: image.length > 0 ? image : fallback.image,
    title: normalizeCarouselLocalizedField(raw.title, fallback.title),
    subtitle: normalizeCarouselLocalizedField(raw.subtitle, fallback.subtitle)
  };
}

function migrateCarouselSlidesFromLegacy(hero: Record<string, unknown>): CarouselSlideConfig[] | null {
  const listRaw = hero.carouselImageList;
  if (typeof listRaw !== "string") return null;
  const files = parseCarouselImageFilenames(listRaw);
  if (files.length === 0) return null;
  const d = defaultModuleProps.heroCarousel;
  const titles: LocalizedText[] = [d.slideOneTitle, d.slideTwoTitle, d.slideThreeTitle];
  const subs: LocalizedText[] = [d.slideOneSubtitle, d.slideTwoSubtitle, d.slideThreeSubtitle];
  return files.map((file, i) => {
    const idx = Math.min(i, 2);
    return {
      image: file,
      title: titles[idx]!,
      subtitle: subs[idx]!
    };
  });
}

function normalizeHeroCarouselSlides(hero: Record<string, unknown>): CarouselSlideConfig[] {
  const raw = hero.carouselSlides;
  const fallbacks = defaultModuleProps.heroCarousel.carouselSlides;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((item, i) =>
      normalizeCarouselSlideConfig(item, fallbacks[Math.min(i, fallbacks.length - 1)]!)
    );
  }
  return migrateCarouselSlidesFromLegacy(hero) ?? fallbacks;
}

export function normalizeModuleProps(input: unknown): ModulePropsMap {
  if (!isRecord(input)) {
    return defaultModuleProps;
  }

  const hero = isRecord(input.heroCarousel) ? input.heroCarousel : {};
  const poem = isRecord(input.poem) ? input.poem : {};
  const song = isRecord(input.ourSong) ? input.ourSong : {};
  const dressCode = isRecord(input.dressCode) ? input.dressCode : {};
  const gifts = isRecord(input.gifts) ? input.gifts : {};
  const story = isRecord(input.ourStory) ? input.ourStory : {};
  const schedule = isRecord(input.schedule) ? input.schedule : {};
  const photo = isRecord(input.photoMosaic) ? input.photoMosaic : {};
  const faq = isRecord(input.faq) ? input.faq : {};
  const rsvp = isRecord(input.rsvp) ? input.rsvp : {};

  return {
    envelope: {},
    heroCarousel: {
      autoplayMs:
        typeof hero.autoplayMs === "number" && Number.isFinite(hero.autoplayMs)
          ? hero.autoplayMs
          : defaultModuleProps.heroCarousel.autoplayMs,
      showDots: typeof hero.showDots === "boolean" ? hero.showDots : defaultModuleProps.heroCarousel.showDots,
      carouselSlides: normalizeHeroCarouselSlides(hero),
      stackAutoplayMs:
        typeof hero.stackAutoplayMs === "number" && Number.isFinite(hero.stackAutoplayMs)
          ? hero.stackAutoplayMs
          : defaultModuleProps.heroCarousel.stackAutoplayMs,
      slideOneTitle: normalizeLocalizedText(hero.slideOneTitle, defaultModuleProps.heroCarousel.slideOneTitle),
      slideOneSubtitle: normalizeLocalizedText(
        hero.slideOneSubtitle,
        defaultModuleProps.heroCarousel.slideOneSubtitle
      ),
      slideTwoTitle: normalizeLocalizedText(hero.slideTwoTitle, defaultModuleProps.heroCarousel.slideTwoTitle),
      slideTwoSubtitle: normalizeLocalizedText(
        hero.slideTwoSubtitle,
        defaultModuleProps.heroCarousel.slideTwoSubtitle
      ),
      slideThreeTitle: normalizeLocalizedText(
        hero.slideThreeTitle,
        defaultModuleProps.heroCarousel.slideThreeTitle
      ),
      slideThreeSubtitle: normalizeLocalizedText(
        hero.slideThreeSubtitle,
        defaultModuleProps.heroCarousel.slideThreeSubtitle
      )
    },
    poem: {
      title: normalizeLocalizedText(poem.title, defaultModuleProps.poem.title),
      titleFontFamily:
        typeof poem.titleFontFamily === "string" && poem.titleFontFamily.length > 0
          ? poem.titleFontFamily
          : defaultModuleProps.poem.titleFontFamily,
      titleFontSizePx:
        typeof poem.titleFontSizePx === "number" && Number.isFinite(poem.titleFontSizePx)
          ? poem.titleFontSizePx
          : defaultModuleProps.poem.titleFontSizePx,
      subtitle: normalizeLocalizedText(poem.subtitle, defaultModuleProps.poem.subtitle),
      subtitleFontFamily:
        typeof poem.subtitleFontFamily === "string" && poem.subtitleFontFamily.length > 0
          ? poem.subtitleFontFamily
          : defaultModuleProps.poem.subtitleFontFamily,
      subtitleFontSizePx:
        typeof poem.subtitleFontSizePx === "number" && Number.isFinite(poem.subtitleFontSizePx)
          ? poem.subtitleFontSizePx
          : defaultModuleProps.poem.subtitleFontSizePx,
      body: normalizeLocalizedText(poem.body, defaultModuleProps.poem.body),
      bodyFontFamily:
        typeof poem.bodyFontFamily === "string" && poem.bodyFontFamily.length > 0
          ? poem.bodyFontFamily
          : defaultModuleProps.poem.bodyFontFamily,
      bodyFontSizePx:
        typeof poem.bodyFontSizePx === "number" && Number.isFinite(poem.bodyFontSizePx)
          ? poem.bodyFontSizePx
          : defaultModuleProps.poem.bodyFontSizePx
    },
    ourSong: {
      title: normalizeLocalizedText(song.title, defaultModuleProps.ourSong.title),
      audioUrl: typeof song.audioUrl === "string" ? song.audioUrl : defaultModuleProps.ourSong.audioUrl,
      songTitle: normalizeLocalizedText(song.songTitle, defaultModuleProps.ourSong.songTitle),
      trackName: normalizeLocalizedText(song.trackName, defaultModuleProps.ourSong.trackName),
      artistName: normalizeLocalizedText(song.artistName, defaultModuleProps.ourSong.artistName)
    },
    countdown: {},
    dressCode: {
      title: normalizeLocalizedText(dressCode.title, defaultModuleProps.dressCode.title),
      description: normalizeLocalizedText(dressCode.description, defaultModuleProps.dressCode.description)
    },
    gifts: {
      title: normalizeLocalizedText(gifts.title, defaultModuleProps.gifts.title),
      message: normalizeLocalizedTextAllowEmpty(gifts.message, defaultModuleProps.gifts.message),
      modalOpenButtonLabel: normalizeLocalizedText(
        gifts.modalOpenButtonLabel,
        defaultModuleProps.gifts.modalOpenButtonLabel
      ),
      modalTitle: normalizeLocalizedText(gifts.modalTitle, defaultModuleProps.gifts.modalTitle),
      modalSubtitle: normalizeLocalizedText(gifts.modalSubtitle, defaultModuleProps.gifts.modalSubtitle),
      modalBody: normalizeLocalizedText(gifts.modalBody, defaultModuleProps.gifts.modalBody)
    },
    ourStory: {
      title: normalizeLocalizedText(story.title, defaultModuleProps.ourStory.title)
    },
    schedule: {
      showAperitivoRow:
        typeof schedule.showAperitivoRow === "boolean"
          ? schedule.showAperitivoRow
          : defaultModuleProps.schedule.showAperitivoRow,
      showPartyRow:
        typeof schedule.showPartyRow === "boolean"
          ? schedule.showPartyRow
          : defaultModuleProps.schedule.showPartyRow,
      ceremonyLabel: normalizeLocalizedText(
        schedule.ceremonyLabel,
        defaultModuleProps.schedule.ceremonyLabel
      ),
      aperitivoLabel: normalizeLocalizedText(schedule.aperitivoLabel, defaultModuleProps.schedule.aperitivoLabel),
      dinnerLabel: normalizeLocalizedText(schedule.dinnerLabel, defaultModuleProps.schedule.dinnerLabel),
      partyLabel: normalizeLocalizedText(schedule.partyLabel, defaultModuleProps.schedule.partyLabel)
    },
    photoMosaic: {
      columns:
        typeof photo.columns === "number" && Number.isFinite(photo.columns)
          ? photo.columns
          : defaultModuleProps.photoMosaic.columns
    },
    faq: {
      title: normalizeLocalizedText(faq.title, defaultModuleProps.faq.title)
    },
    rsvp: {
      title: normalizeLocalizedText(rsvp.title, defaultModuleProps.rsvp.title)
    }
  };
}
