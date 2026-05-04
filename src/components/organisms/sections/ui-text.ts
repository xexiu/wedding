type SectionUiText = {
  heroInvitation: string;
  heroEnvelopeClickHint: string;
  amoreaLetterPretitle: string;
  amoreaSeatsLine: string;
  countdownTitle: string;
  countdownKicker: string;
  countdownDays: string;
  countdownHours: string;
  countdownMinutes: string;
  countdownFooter: string;
  scheduleTitle: string;
  scheduleTimeLabel: string;
  scheduleLocationButton: string;
  rsvpConfirmationTitle: string;
  /** Line under RSVP title: prefix before formatted RSVP deadline date. */
  rsvpConfirmBeforeDatePrefix: string;
  /** Closing footer band: prefix before formatted RSVP deadline. */
  closingRsvpDeadlinePrefix: string;
  rsvpConfirmButton: string;
  rsvpDeclineButton: string;
  rsvpCompanionNamesLabel: string;
  /** Legend for family / friends / work / other choice on public RSVP */
  rsvpGuestGroupLegend: string;
  rsvpGuestGroupFamily: string;
  rsvpGuestGroupFriends: string;
  rsvpGuestGroupWork: string;
  rsvpGuestGroupOther: string;
  rsvpRequestedSongsLabel: string;
  rsvpSubmitSuccess: string;
  rsvpSubmitError: string;
  rsvpContactLabel: string;
  photoMosaicTitle: string;
  photoMosaicPlaceholder: string;
  faqPlaceholder: string;
  storyPlaceholder: string;
  poemFallbackTitle: string;
};

const SECTION_UI_TEXT_EN: SectionUiText = {
  heroInvitation: "Invitation",
  heroEnvelopeClickHint: "CLICK TO OPEN",
  amoreaLetterPretitle: "WE HAVE THE HONOUR OF INVITING YOU TO THE WEDDING OF",
  amoreaSeatsLine: "WE HAVE RESERVED (1) SEAT(S) FOR YOU",
  countdownTitle: "Countdown",
  countdownKicker: "LEFT",
  countdownDays: "Days",
  countdownHours: "Hours",
  countdownMinutes: "Minutes",
  countdownFooter: "Until our big day",
  scheduleTitle: "Schedule",
  scheduleTimeLabel: "Time",
  scheduleLocationButton: "Location",
  rsvpConfirmationTitle: "RSVP Confirmation",
  rsvpConfirmBeforeDatePrefix: "Please confirm by ",
  closingRsvpDeadlinePrefix: "RSVP by ",
  rsvpConfirmButton: "Click here to confirm",
  rsvpDeclineButton: "I cannot attend",
  rsvpCompanionNamesLabel: "Companion name(s)",
  rsvpGuestGroupLegend: "You are joining us as",
  rsvpGuestGroupFamily: "Family",
  rsvpGuestGroupFriends: "Friends",
  rsvpGuestGroupWork: "Work",
  rsvpGuestGroupOther: "Other",
  rsvpRequestedSongsLabel: "Requested song(s)",
  rsvpSubmitSuccess: "Your RSVP has been saved",
  rsvpSubmitError: "Could not save RSVP. Please try again.",
  rsvpContactLabel: "Contact",
  photoMosaicTitle: "Photo Mosaic",
  photoMosaicPlaceholder: "Drop your photos here later. Current columns config:",
  faqPlaceholder: "This section can be used as a visual companion to bot YAML responses.",
  storyPlaceholder: "From first coffee to forever: a simple modular section placeholder.",
  poemFallbackTitle: "Poem"
};

const SECTION_UI_TEXT_ES: SectionUiText = {
  heroInvitation: "Tu invitación",
  heroEnvelopeClickHint: "DA CLICK PARA ABRIR",
  amoreaLetterPretitle: "TENEMOS EL HONOR DE INVITARTE A LA BODA DE",
  amoreaSeatsLine: "HEMOS RESERVADO (1) CUPO(S) PARA TI",
  countdownTitle: "Cuenta regresiva",
  countdownKicker: "Faltan...",
  countdownDays: "Dias",
  countdownHours: "Horas",
  countdownMinutes: "Minutos",
  countdownFooter: "Para nuestro gran dia",
  scheduleTitle: "Agenda",
  scheduleTimeLabel: "Hora",
  scheduleLocationButton: "Ubicacion",
  rsvpConfirmationTitle: "Confirmacion de asistencia",
  rsvpConfirmBeforeDatePrefix: "Antes del ",
  closingRsvpDeadlinePrefix: "Confirmación de asistencia antes del ",
  rsvpConfirmButton: "Click aqui para confirmar",
  rsvpDeclineButton: "No puedo asistir",
  rsvpCompanionNamesLabel: "Nombre Acompanante(s)",
  rsvpGuestGroupLegend: "Nos acompanas como",
  rsvpGuestGroupFamily: "Familia",
  rsvpGuestGroupFriends: "Amigos",
  rsvpGuestGroupWork: "Trabajo",
  rsvpGuestGroupOther: "Otro",
  rsvpRequestedSongsLabel: "Cancion(es) solicitada(s)",
  rsvpSubmitSuccess: "Tu confirmacion fue guardada",
  rsvpSubmitError: "No se pudo guardar la confirmacion. Intenta de nuevo.",
  rsvpContactLabel: "Contacto",
  photoMosaicTitle: "Mosaico de fotos",
  photoMosaicPlaceholder: "Agrega tus fotos aqui mas tarde. Configuracion actual de columnas:",
  faqPlaceholder: "Esta seccion se puede usar como apoyo visual para respuestas del bot en YAML.",
  storyPlaceholder: "Desde el primer cafe hasta siempre: una seccion modular de ejemplo.",
  poemFallbackTitle: "Poema"
};

const SECTION_UI_TEXT_RO: SectionUiText = {
  heroInvitation: "Invitația ta",
  heroEnvelopeClickHint: "APĂSAȚI PENTRU A DESCHIDE",
  amoreaLetterPretitle: "AVEM ONOAREA DE A VĂ INVITA LA NUNTA",
  amoreaSeatsLine: "AM REZERVAT (1) LOC(URI) PENTRU DVS.",
  countdownTitle: "Numaratoare inversa",
  countdownKicker: "MAI SUNT",
  countdownDays: "Zile",
  countdownHours: "Ore",
  countdownMinutes: "Minute",
  countdownFooter: "Pana la ziua noastra speciala",
  scheduleTitle: "Program",
  scheduleTimeLabel: "Ora",
  scheduleLocationButton: "Locatie",
  rsvpConfirmationTitle: "Confirmare participare",
  rsvpConfirmBeforeDatePrefix: "Confirmați până la ",
  closingRsvpDeadlinePrefix: "Confirmare participare până la ",
  rsvpConfirmButton: "Click aici pentru confirmare",
  rsvpDeclineButton: "Nu pot participa",
  rsvpCompanionNamesLabel: "Nume insotitor(i)",
  rsvpGuestGroupLegend: "Ne insotesti ca",
  rsvpGuestGroupFamily: "Familie",
  rsvpGuestGroupFriends: "Prieteni",
  rsvpGuestGroupWork: "Serviciu",
  rsvpGuestGroupOther: "Altul",
  rsvpRequestedSongsLabel: "Melodie(i) dorita(e)",
  rsvpSubmitSuccess: "Confirmarea ta a fost salvata",
  rsvpSubmitError: "Nu am putut salva confirmarea. Incearca din nou.",
  rsvpContactLabel: "Contact",
  photoMosaicTitle: "Mosaic foto",
  photoMosaicPlaceholder: "Adauga fotografiile aici mai tarziu. Configuratia curenta de coloane:",
  faqPlaceholder: "Aceasta sectiune poate fi folosita ca suport vizual pentru raspunsurile botului din YAML.",
  storyPlaceholder: "De la prima cafea pana la pentru totdeauna: o sectiune modulara simpla.",
  poemFallbackTitle: "Poezie"
};

const SECTION_UI_TEXT_BY_LOCALE: Record<string, SectionUiText> = {
  en: SECTION_UI_TEXT_EN,
  es: SECTION_UI_TEXT_ES,
  ro: SECTION_UI_TEXT_RO
};

export function getSectionUiText(locale: string): SectionUiText {
  return SECTION_UI_TEXT_BY_LOCALE[locale] ?? SECTION_UI_TEXT_EN;
}
