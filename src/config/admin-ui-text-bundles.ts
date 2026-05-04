import type { Messages } from "@/i18n/messages";

export type AdminUiText = {
  TEMPLATE_CONTROLS: {
    ACTIVE_TEMPLATE_LABEL: string;
    CADENCE_PRESET_LABEL: string;
    CADENCE_OPTION_MOBILE_TIGHT: string;
    CADENCE_OPTION_MOBILE_BALANCED: string;
    CADENCE_OPTION_DESKTOP_EDITORIAL: string;
    MOTION_TITLE: string;
    MOTION_SCROLL_REVEAL: string;
    MOTION_REVEAL_STYLE: string;
    MOTION_STAGGER_MS: string;
    MOTION_CARD_HOVER: string;
    MOTION_BUTTON_PULSE: string;
    MOTION_STYLE_FADE: string;
    MOTION_STYLE_SLIDE_UP: string;
    MOTION_STYLE_ZOOM_IN: string;
    LAYOUT_TITLE: string;
    LAYOUT_FONT_STYLE: string;
    LAYOUT_FONT_STYLE_ELEGANT: string;
    LAYOUT_FONT_STYLE_EDITORIAL: string;
    LAYOUT_FONT_STYLE_MODERN: string;
    LAYOUT_TITLE_SCALE: string;
    LAYOUT_BODY_SCALE: string;
    LAYOUT_SCRIPT_SCALE: string;
    FONT_SIZE_ROLE_HINT: string;
    DESIGN_PAGE_TITLE_SIZE: string;
    DESIGN_PAGE_SUBTITLE_SIZE: string;
    DESIGN_PAGE_BODY_SIZE: string;
    DESIGN_CARD_TITLE_SIZE: string;
    DESIGN_CARD_SUBTITLE_SIZE: string;
    DESIGN_CARD_BODY_SIZE: string;
    SUBCARD_TITLE_SIZE: string;
    SUBCARD_BODY_SIZE: string;
    LAYOUT_CARD_WIDTH: string;
    LAYOUT_CARD_RADIUS: string;
    DESIGN_PAGE_BG: string;
    DESIGN_CARD_BG: string;
    DESIGN_CARD_BORDER_COLOR: string;
    DESIGN_CARD_BORDER_WIDTH: string;
    DESIGN_CARD_SHADOW_OPACITY: string;
    DESIGN_PAGE_FONT_WEIGHT: string;
    DESIGN_PAGE_TITLE_WEIGHT: string;
    DESIGN_CARD_TITLE_WEIGHT: string;
    DESIGN_PAGE_SUBTITLE_WEIGHT: string;
    DESIGN_CARD_SUBTITLE_WEIGHT: string;
    DESIGN_PAGE_BODY_WEIGHT: string;
    DESIGN_CARD_BODY_WEIGHT: string;
    SUBCARD_BG: string;
    SUBCARD_BORDER_COLOR: string;
    SUBCARD_BORDER_WIDTH: string;
    SUBCARD_RADIUS: string;
    SUBCARD_SHADOW_OPACITY: string;
    SUBCARD_TITLE_WEIGHT: string;
    SUBCARD_BODY_WEIGHT: string;
    APPLY_DEFAULTS_BUTTON: string;
  };
  WEDDING_DETAILS: { TITLE: string; DESCRIPTION: string };
  MODULE_PROPS: { TITLE: string; DESCRIPTION: string; LOCALE_LABEL: string };
  LOCALES: {
    TITLE: string;
    DESCRIPTION: string;
    CODE_LABEL: string;
    NAME_LABEL: string;
    ENABLED_LABEL: string;
    DEFAULT_LABEL: string;
    MESSAGES_TITLE: string;
    MESSAGES_DESCRIPTION: string;
    MESSAGE_LABEL_TITLE: string;
    MESSAGE_LABEL_SUBTITLE: string;
    MESSAGE_LABEL_ADMIN_TITLE: string;
    MESSAGE_LABEL_ADMIN_DESCRIPTION: string;
    MESSAGE_LABEL_SAVE: string;
    MESSAGE_LABEL_ENABLED: string;
    MESSAGE_LABEL_DISABLED: string;
    VALIDATION_TITLE: string;
    VALIDATION_EMPTY_PREFIX: string;
    VALIDATION_DUPLICATE_PREFIX: string;
    ADD_CODE_PLACEHOLDER: string;
    ADD_NAME_PLACEHOLDER: string;
    ADD_BUTTON: string;
  };
  THEME_TOKENS: { TITLE: string; DESCRIPTION: string; INHERIT_LABEL: string; BUTTON_RADIUS_LABEL: string };
  YAML_PANEL: { TITLE: string; PLACEHOLDER: string; EXPORT_BUTTON: string; IMPORT_BUTTON: string };
  ADMIN_CONTAINER: { LOADING: string; LOAD_FAILED: string };
};

export const ADMIN_UI_TEXT_EN: AdminUiText = {
  TEMPLATE_CONTROLS: {
    ACTIVE_TEMPLATE_LABEL: "Active template",
    CADENCE_PRESET_LABEL: "Cadence preset",
    CADENCE_OPTION_MOBILE_TIGHT: "Mobile Tight",
    CADENCE_OPTION_MOBILE_BALANCED: "Mobile Balanced",
    CADENCE_OPTION_DESKTOP_EDITORIAL: "Desktop Editorial",
    MOTION_TITLE: "Motion Effects",
    MOTION_SCROLL_REVEAL: "Scroll reveal",
    MOTION_REVEAL_STYLE: "Reveal style",
    MOTION_STAGGER_MS: "Stagger (ms)",
    MOTION_CARD_HOVER: "Card hover lift",
    MOTION_BUTTON_PULSE: "Button pulse",
    MOTION_STYLE_FADE: "Fade",
    MOTION_STYLE_SLIDE_UP: "Slide up",
    MOTION_STYLE_ZOOM_IN: "Zoom in",
    LAYOUT_TITLE: "Typography and card layout",
    LAYOUT_FONT_STYLE: "Font style",
    LAYOUT_FONT_STYLE_ELEGANT: "Elegant",
    LAYOUT_FONT_STYLE_EDITORIAL: "Editorial",
    LAYOUT_FONT_STYLE_MODERN: "Modern",
    LAYOUT_TITLE_SCALE: "Title scale",
    LAYOUT_BODY_SCALE: "Body scale",
    LAYOUT_SCRIPT_SCALE: "Script scale",
    FONT_SIZE_ROLE_HINT: "Font size by role (multiplier on top of the scales above; 1 = default)",
    DESIGN_PAGE_TITLE_SIZE: "Page title size",
    DESIGN_PAGE_SUBTITLE_SIZE: "Page subtitle size",
    DESIGN_PAGE_BODY_SIZE: "Page body text size",
    DESIGN_CARD_TITLE_SIZE: "Card title size",
    DESIGN_CARD_SUBTITLE_SIZE: "Card subtitle size",
    DESIGN_CARD_BODY_SIZE: "Card body text size",
    SUBCARD_TITLE_SIZE: "Subcard title size",
    SUBCARD_BODY_SIZE: "Subcard body text size",
    LAYOUT_CARD_WIDTH: "Card width (px)",
    LAYOUT_CARD_RADIUS: "Card radius (px)",
    DESIGN_PAGE_BG: "Page background",
    DESIGN_CARD_BG: "Card background",
    DESIGN_CARD_BORDER_COLOR: "Card border color",
    DESIGN_CARD_BORDER_WIDTH: "Card border width (px)",
    DESIGN_CARD_SHADOW_OPACITY: "Card shadow opacity",
    DESIGN_PAGE_FONT_WEIGHT: "Page font weight",
    DESIGN_PAGE_TITLE_WEIGHT: "Page title weight",
    DESIGN_CARD_TITLE_WEIGHT: "Card title weight",
    DESIGN_PAGE_SUBTITLE_WEIGHT: "Page subtitle weight",
    DESIGN_CARD_SUBTITLE_WEIGHT: "Card subtitle weight",
    DESIGN_PAGE_BODY_WEIGHT: "Page body weight",
    DESIGN_CARD_BODY_WEIGHT: "Card body weight",
    SUBCARD_BG: "Subcard background",
    SUBCARD_BORDER_COLOR: "Subcard border color",
    SUBCARD_BORDER_WIDTH: "Subcard border width (px)",
    SUBCARD_RADIUS: "Subcard radius (px)",
    SUBCARD_SHADOW_OPACITY: "Subcard shadow opacity",
    SUBCARD_TITLE_WEIGHT: "Subcard title weight",
    SUBCARD_BODY_WEIGHT: "Subcard body weight",
    APPLY_DEFAULTS_BUTTON: "Apply Template Defaults"
  },
  WEDDING_DETAILS: {
    TITLE: "Wedding details and inputs",
    DESCRIPTION: "Locale-aware fields are edited using the locale selector below."
  },
  MODULE_PROPS: {
    TITLE: "Dynamic module props",
    DESCRIPTION: "No-code editor driven by schema metadata. Fields are validated by manifest schema on save/import.",
    LOCALE_LABEL: "Locale:"
  },
  LOCALES: {
    TITLE: "Locales",
    DESCRIPTION: "Add, enable, disable, and set the default language without redeploying.",
    CODE_LABEL: "Code",
    NAME_LABEL: "Name",
    ENABLED_LABEL: "Enabled",
    DEFAULT_LABEL: "Default",
    MESSAGES_TITLE: "Message bundle",
    MESSAGES_DESCRIPTION: "Translate site and admin chrome strings for this locale.",
    MESSAGE_LABEL_TITLE: "Site title",
    MESSAGE_LABEL_SUBTITLE: "Site subtitle",
    MESSAGE_LABEL_ADMIN_TITLE: "Admin title",
    MESSAGE_LABEL_ADMIN_DESCRIPTION: "Admin description",
    MESSAGE_LABEL_SAVE: "Save button",
    MESSAGE_LABEL_ENABLED: "Enabled label",
    MESSAGE_LABEL_DISABLED: "Disabled label",
    VALIDATION_TITLE: "Translation warnings",
    VALIDATION_EMPTY_PREFIX: "Empty required field:",
    VALIDATION_DUPLICATE_PREFIX: "Potential duplicate semantic labels:",
    ADD_CODE_PLACEHOLDER: "fr",
    ADD_NAME_PLACEHOLDER: "French",
    ADD_BUTTON: "Add Locale"
  },
  THEME_TOKENS: {
    TITLE: "Theme Tokens",
    DESCRIPTION: "Canva-style color and button controls. Disable inherit to override template defaults per token.",
    INHERIT_LABEL: "Inherit",
    BUTTON_RADIUS_LABEL: "Button Radius"
  },
  YAML_PANEL: {
    TITLE: "Config YAML import/export",
    PLACEHOLDER:
      "Full export (v2) includes site + languages. Paste on production and Import. Flat site-only YAML from older exports still works.",
    EXPORT_BUTTON: "Export YAML",
    IMPORT_BUTTON: "Import YAML"
  },
  ADMIN_CONTAINER: {
    LOADING: "Loading admin configuration...",
    LOAD_FAILED: "Failed to load admin configuration."
  }
};

export const ADMIN_UI_TEXT_ES: AdminUiText = {
  TEMPLATE_CONTROLS: {
    ACTIVE_TEMPLATE_LABEL: "Plantilla activa",
    CADENCE_PRESET_LABEL: "Preset de cadencia",
    CADENCE_OPTION_MOBILE_TIGHT: "Movil compacto",
    CADENCE_OPTION_MOBILE_BALANCED: "Movil balanceado",
    CADENCE_OPTION_DESKTOP_EDITORIAL: "Desktop editorial",
    MOTION_TITLE: "Efectos de movimiento",
    MOTION_SCROLL_REVEAL: "Revelado al hacer scroll",
    MOTION_REVEAL_STYLE: "Estilo de revelado",
    MOTION_STAGGER_MS: "Retardo escalonado (ms)",
    MOTION_CARD_HOVER: "Elevacion en hover",
    MOTION_BUTTON_PULSE: "Pulso en botones",
    MOTION_STYLE_FADE: "Desvanecer",
    MOTION_STYLE_SLIDE_UP: "Subir",
    MOTION_STYLE_ZOOM_IN: "Zoom",
    LAYOUT_TITLE: "Tipografia y layout de tarjetas",
    LAYOUT_FONT_STYLE: "Estilo de fuente",
    LAYOUT_FONT_STYLE_ELEGANT: "Elegante",
    LAYOUT_FONT_STYLE_EDITORIAL: "Editorial",
    LAYOUT_FONT_STYLE_MODERN: "Moderno",
    LAYOUT_TITLE_SCALE: "Escala de titulos",
    LAYOUT_BODY_SCALE: "Escala de cuerpo",
    LAYOUT_SCRIPT_SCALE: "Escala script",
    FONT_SIZE_ROLE_HINT: "Tamano de fuente por rol (multiplicador sobre las escalas; 1 = por defecto)",
    DESIGN_PAGE_TITLE_SIZE: "Tamano titulo pagina",
    DESIGN_PAGE_SUBTITLE_SIZE: "Tamano subtitulo pagina",
    DESIGN_PAGE_BODY_SIZE: "Tamano texto pagina",
    DESIGN_CARD_TITLE_SIZE: "Tamano titulo tarjeta",
    DESIGN_CARD_SUBTITLE_SIZE: "Tamano subtitulo tarjeta",
    DESIGN_CARD_BODY_SIZE: "Tamano texto tarjeta",
    SUBCARD_TITLE_SIZE: "Tamano titulo subtarjetas",
    SUBCARD_BODY_SIZE: "Tamano texto subtarjetas",
    LAYOUT_CARD_WIDTH: "Ancho de tarjeta (px)",
    LAYOUT_CARD_RADIUS: "Radio de tarjeta (px)",
    DESIGN_PAGE_BG: "Fondo de pagina",
    DESIGN_CARD_BG: "Fondo de tarjetas",
    DESIGN_CARD_BORDER_COLOR: "Color del borde",
    DESIGN_CARD_BORDER_WIDTH: "Grosor del borde (px)",
    DESIGN_CARD_SHADOW_OPACITY: "Opacidad de sombra",
    DESIGN_PAGE_FONT_WEIGHT: "Peso fuente pagina",
    DESIGN_PAGE_TITLE_WEIGHT: "Peso titulo pagina",
    DESIGN_CARD_TITLE_WEIGHT: "Peso titulo tarjeta",
    DESIGN_PAGE_SUBTITLE_WEIGHT: "Peso subtitulo pagina",
    DESIGN_CARD_SUBTITLE_WEIGHT: "Peso subtitulo tarjeta",
    DESIGN_PAGE_BODY_WEIGHT: "Peso texto pagina",
    DESIGN_CARD_BODY_WEIGHT: "Peso texto tarjeta",
    SUBCARD_BG: "Fondo subtarjetas",
    SUBCARD_BORDER_COLOR: "Color borde subtarjetas",
    SUBCARD_BORDER_WIDTH: "Grosor borde subtarjetas (px)",
    SUBCARD_RADIUS: "Radio subtarjetas (px)",
    SUBCARD_SHADOW_OPACITY: "Opacidad sombra subtarjetas",
    SUBCARD_TITLE_WEIGHT: "Peso titulo subtarjetas",
    SUBCARD_BODY_WEIGHT: "Peso texto subtarjetas",
    APPLY_DEFAULTS_BUTTON: "Aplicar valores de plantilla"
  },
  WEDDING_DETAILS: {
    TITLE: "Detalles de boda e inputs",
    DESCRIPTION: "Los campos por idioma se editan usando el selector de idioma."
  },
  MODULE_PROPS: {
    TITLE: "Propiedades dinamicas de modulos",
    DESCRIPTION: "Editor sin codigo basado en metadatos de esquema. Los campos se validan al guardar/importar.",
    LOCALE_LABEL: "Idioma:"
  },
  LOCALES: {
    TITLE: "Idiomas",
    DESCRIPTION: "Agrega, habilita, deshabilita y define el idioma por defecto sin redeploy.",
    CODE_LABEL: "Codigo",
    NAME_LABEL: "Nombre",
    ENABLED_LABEL: "Habilitado",
    DEFAULT_LABEL: "Por defecto",
    MESSAGES_TITLE: "Bundle de mensajes",
    MESSAGES_DESCRIPTION: "Traduce textos de interfaz del sitio y del admin para este idioma.",
    MESSAGE_LABEL_TITLE: "Titulo del sitio",
    MESSAGE_LABEL_SUBTITLE: "Subtitulo del sitio",
    MESSAGE_LABEL_ADMIN_TITLE: "Titulo de admin",
    MESSAGE_LABEL_ADMIN_DESCRIPTION: "Descripcion de admin",
    MESSAGE_LABEL_SAVE: "Boton guardar",
    MESSAGE_LABEL_ENABLED: "Etiqueta activo",
    MESSAGE_LABEL_DISABLED: "Etiqueta inactivo",
    VALIDATION_TITLE: "Advertencias de traduccion",
    VALIDATION_EMPTY_PREFIX: "Campo requerido vacio:",
    VALIDATION_DUPLICATE_PREFIX: "Posible duplicado semantico:",
    ADD_CODE_PLACEHOLDER: "fr",
    ADD_NAME_PLACEHOLDER: "Frances",
    ADD_BUTTON: "Agregar idioma"
  },
  THEME_TOKENS: {
    TITLE: "Tokens de tema",
    DESCRIPTION: "Controles tipo Canva para colores y botones. Desactiva heredar para sobrescribir la plantilla.",
    INHERIT_LABEL: "Heredar",
    BUTTON_RADIUS_LABEL: "Radio de boton"
  },
  YAML_PANEL: {
    TITLE: "Importar/exportar YAML de configuracion",
    PLACEHOLDER:
      "La exportacion completa (v2) incluye sitio e idiomas. Pegar en produccion e Importar. El YAML plano antiguo sigue funcionando.",
    EXPORT_BUTTON: "Exportar YAML",
    IMPORT_BUTTON: "Importar YAML"
  },
  ADMIN_CONTAINER: {
    LOADING: "Cargando configuracion del admin...",
    LOAD_FAILED: "Error al cargar configuracion del admin."
  }
};

export const ADMIN_UI_TEXT_RO: AdminUiText = {
  TEMPLATE_CONTROLS: {
    ACTIVE_TEMPLATE_LABEL: "Template activ",
    CADENCE_PRESET_LABEL: "Preset de cadenta",
    CADENCE_OPTION_MOBILE_TIGHT: "Mobil compact",
    CADENCE_OPTION_MOBILE_BALANCED: "Mobil echilibrat",
    CADENCE_OPTION_DESKTOP_EDITORIAL: "Desktop editorial",
    MOTION_TITLE: "Efecte de miscare",
    MOTION_SCROLL_REVEAL: "Reveal la scroll",
    MOTION_REVEAL_STYLE: "Stil reveal",
    MOTION_STAGGER_MS: "Intarziere in cascada (ms)",
    MOTION_CARD_HOVER: "Elevare card la hover",
    MOTION_BUTTON_PULSE: "Puls butoane",
    MOTION_STYLE_FADE: "Fade",
    MOTION_STYLE_SLIDE_UP: "Slide up",
    MOTION_STYLE_ZOOM_IN: "Zoom in",
    LAYOUT_TITLE: "Tipografie si layout carduri",
    LAYOUT_FONT_STYLE: "Stil font",
    LAYOUT_FONT_STYLE_ELEGANT: "Elegant",
    LAYOUT_FONT_STYLE_EDITORIAL: "Editorial",
    LAYOUT_FONT_STYLE_MODERN: "Modern",
    LAYOUT_TITLE_SCALE: "Scara titlu",
    LAYOUT_BODY_SCALE: "Scara text",
    LAYOUT_SCRIPT_SCALE: "Scara script",
    FONT_SIZE_ROLE_HINT: "Marime font pe rol (inmultitor peste scarile globale; 1 = implicit)",
    DESIGN_PAGE_TITLE_SIZE: "Marime titlu pagina",
    DESIGN_PAGE_SUBTITLE_SIZE: "Marime subtitlu pagina",
    DESIGN_PAGE_BODY_SIZE: "Marime text pagina",
    DESIGN_CARD_TITLE_SIZE: "Marime titlu card",
    DESIGN_CARD_SUBTITLE_SIZE: "Marime subtitlu card",
    DESIGN_CARD_BODY_SIZE: "Marime text card",
    SUBCARD_TITLE_SIZE: "Marime titlu subcard",
    SUBCARD_BODY_SIZE: "Marime text subcard",
    LAYOUT_CARD_WIDTH: "Latime card (px)",
    LAYOUT_CARD_RADIUS: "Raza card (px)",
    DESIGN_PAGE_BG: "Fundal pagina",
    DESIGN_CARD_BG: "Fundal carduri",
    DESIGN_CARD_BORDER_COLOR: "Culoare bordura",
    DESIGN_CARD_BORDER_WIDTH: "Grosime bordura (px)",
    DESIGN_CARD_SHADOW_OPACITY: "Opacitate umbra",
    DESIGN_PAGE_FONT_WEIGHT: "Greutate font pagina",
    DESIGN_PAGE_TITLE_WEIGHT: "Greutate titlu pagina",
    DESIGN_CARD_TITLE_WEIGHT: "Greutate titlu card",
    DESIGN_PAGE_SUBTITLE_WEIGHT: "Greutate subtitlu pagina",
    DESIGN_CARD_SUBTITLE_WEIGHT: "Greutate subtitlu card",
    DESIGN_PAGE_BODY_WEIGHT: "Greutate text pagina",
    DESIGN_CARD_BODY_WEIGHT: "Greutate text card",
    SUBCARD_BG: "Fundal subcarduri",
    SUBCARD_BORDER_COLOR: "Culoare bordura subcarduri",
    SUBCARD_BORDER_WIDTH: "Grosime bordura subcarduri (px)",
    SUBCARD_RADIUS: "Raza subcarduri (px)",
    SUBCARD_SHADOW_OPACITY: "Opacitate umbra subcarduri",
    SUBCARD_TITLE_WEIGHT: "Greutate titlu subcard",
    SUBCARD_BODY_WEIGHT: "Greutate text subcard",
    APPLY_DEFAULTS_BUTTON: "Aplica valorile template-ului"
  },
  WEDDING_DETAILS: {
    TITLE: "Detalii nunta si campuri",
    DESCRIPTION: "Campurile pe limba se editeaza folosind selectorul de limba."
  },
  MODULE_PROPS: {
    TITLE: "Proprietati dinamice module",
    DESCRIPTION: "Editor no-code bazat pe schema. Campurile sunt validate la salvare/import.",
    LOCALE_LABEL: "Limba:"
  },
  LOCALES: {
    TITLE: "Limbi",
    DESCRIPTION: "Adauga, activeaza, dezactiveaza si seteaza limba implicita fara redeploy.",
    CODE_LABEL: "Cod",
    NAME_LABEL: "Nume",
    ENABLED_LABEL: "Activat",
    DEFAULT_LABEL: "Implicit",
    MESSAGES_TITLE: "Pachet mesaje",
    MESSAGES_DESCRIPTION: "Tradu textele de interfata pentru site si admin in aceasta limba.",
    MESSAGE_LABEL_TITLE: "Titlu site",
    MESSAGE_LABEL_SUBTITLE: "Subtitlu site",
    MESSAGE_LABEL_ADMIN_TITLE: "Titlu admin",
    MESSAGE_LABEL_ADMIN_DESCRIPTION: "Descriere admin",
    MESSAGE_LABEL_SAVE: "Buton salveaza",
    MESSAGE_LABEL_ENABLED: "Eticheta activ",
    MESSAGE_LABEL_DISABLED: "Eticheta inactiv",
    VALIDATION_TITLE: "Avertismente traduceri",
    VALIDATION_EMPTY_PREFIX: "Camp obligatoriu gol:",
    VALIDATION_DUPLICATE_PREFIX: "Posibil duplicat semantic:",
    ADD_CODE_PLACEHOLDER: "fr",
    ADD_NAME_PLACEHOLDER: "Franceza",
    ADD_BUTTON: "Adauga limba"
  },
  THEME_TOKENS: {
    TITLE: "Tokeni tema",
    DESCRIPTION: "Controale Canva pentru culori si butoane. Dezactiveaza mostenirea pentru override.",
    INHERIT_LABEL: "Mosteneste",
    BUTTON_RADIUS_LABEL: "Raza buton"
  },
  YAML_PANEL: {
    TITLE: "Import/export YAML configuratie",
    PLACEHOLDER:
      "Exportul complet (v2) include site + limbi. Lipeste in productie si Importa. YAML vechi (doar site) merge in continuare.",
    EXPORT_BUTTON: "Exporta YAML",
    IMPORT_BUTTON: "Importa YAML"
  },
  ADMIN_CONTAINER: {
    LOADING: "Se incarca configuratia admin...",
    LOAD_FAILED: "Nu s-a putut incarca configuratia admin."
  }
};

export const ADMIN_UI_TEXT_BY_LOCALE: Record<string, AdminUiText> = {
  en: ADMIN_UI_TEXT_EN,
  es: ADMIN_UI_TEXT_ES,
  ro: ADMIN_UI_TEXT_RO
};

export function defaultAdminUiText(locale: string): AdminUiText {
  return ADMIN_UI_TEXT_BY_LOCALE[locale] ?? ADMIN_UI_TEXT_EN;
}

export function mergeAdminUiTextWithDefaults(value: unknown, locale: string): AdminUiText {
  const fallback = defaultAdminUiText(locale);
  if (typeof value !== "object" || value === null) {
    return fallback;
  }
  const record = value as Partial<AdminUiText>;
  return {
    TEMPLATE_CONTROLS: {
      ...fallback.TEMPLATE_CONTROLS,
      ...(record.TEMPLATE_CONTROLS ?? {})
    },
    WEDDING_DETAILS: {
      ...fallback.WEDDING_DETAILS,
      ...(record.WEDDING_DETAILS ?? {})
    },
    MODULE_PROPS: {
      ...fallback.MODULE_PROPS,
      ...(record.MODULE_PROPS ?? {})
    },
    LOCALES: {
      ...fallback.LOCALES,
      ...(record.LOCALES ?? {})
    },
    THEME_TOKENS: {
      ...fallback.THEME_TOKENS,
      ...(record.THEME_TOKENS ?? {})
    },
    YAML_PANEL: {
      ...fallback.YAML_PANEL,
      ...(record.YAML_PANEL ?? {})
    },
    ADMIN_CONTAINER: {
      ...fallback.ADMIN_CONTAINER,
      ...(record.ADMIN_CONTAINER ?? {})
    }
  };
}

export function defaultMessagesByLocale(locale: string): Messages {
  const normalized = locale.toLowerCase();
  if (normalized === "es") {
    return {
      title: "Nos casamos",
      subtitle: "Sitio de boda modular",
      adminTitle: "Panel de Modulos",
      adminDescription: "Arrastra para ordenar y activar modulos",
      save: "Guardar",
      enabled: "Activo",
      disabled: "Inactivo",
      adminUi: defaultAdminUiText("es")
    };
  }
  if (normalized === "ro") {
    return {
      title: "Ne casatorim",
      subtitle: "Website de nunta modular",
      adminTitle: "Administrare Module",
      adminDescription: "Trage pentru ordine si activeaza module",
      save: "Salveaza",
      enabled: "Activ",
      disabled: "Inactiv",
      adminUi: defaultAdminUiText("ro")
    };
  }

  return {
    title: "We are getting married",
    subtitle: "A modular wedding website",
    adminTitle: "Modules Admin",
    adminDescription: "Drag to reorder and toggle modules",
    save: "Save",
    enabled: "Enabled",
    disabled: "Disabled",
    adminUi: defaultAdminUiText("en")
  };
}
