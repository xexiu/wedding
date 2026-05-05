"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { WaxSeal } from "@/components/atoms/wax-seal";
import { translate } from "@/components/organisms/sections/helpers";
import { formatWeddingDateLabel } from "@/lib/format-wedding-date";
import { getSectionPixelTokens } from "@/components/organisms/sections/pixel-tokens";
import { RsvpSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import type { GuestGroup } from "@/config/rsvp-enums";
import { GUEST_GROUP_VALUES } from "@/config/rsvp-enums";
import { FormEvent, useId, useMemo, useRef, useState } from "react";

type PublicRsvpStatus = "ATTENDING" | "DECLINED";

function normalizeApiFieldErrors(raw: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, msg] of Object.entries(raw)) {
    const root = key.split(".")[0] ?? key;
    const canon =
      root === "plusOneNames" || key.startsWith("plusOneNames")
        ? "plusOneNames"
        : root === "requestedSongs" || key.startsWith("requestedSongs")
          ? "requestedSongs"
          : root;
    if (!out[canon]) {
      out[canon] = msg;
    }
  }
  return out;
}

function guestGroupLabel(group: GuestGroup, ui: ReturnType<typeof getSectionUiText>): string {
  switch (group) {
    case "FAMILY":
      return ui.rsvpGuestGroupFamily;
    case "FRIENDS":
      return ui.rsvpGuestGroupFriends;
    case "WORK":
      return ui.rsvpGuestGroupWork;
    default:
      return ui.rsvpGuestGroupOther;
  }
}

function withRequiredSuffix(label: string, suffix: string): string {
  return `${label} ${suffix}`.trim();
}

export function RsvpSection({ details, props, locale, cadencePreset, theme }: RsvpSectionProps) {
  const uiText = getSectionUiText(locale);
  const SECTION_PIXEL_TOKENS = useMemo(() => getSectionPixelTokens(cadencePreset), [cadencePreset]);
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [dietary, setDietary] = useState("");
  const [plusOneNames, setPlusOneNames] = useState("");
  const [requestedSongs, setRequestedSongs] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedRsvpStatus, setSelectedRsvpStatus] = useState<PublicRsvpStatus>("ATTENDING");
  const [guestGroup, setGuestGroup] = useState<GuestGroup>("OTHER");
  const successDialogRef = useRef<HTMLDialogElement>(null);
  const errorDialogRef = useRef<HTMLDialogElement>(null);
  const rsvpDeadlineLabel = useMemo(
    () => formatWeddingDateLabel(details.rsvpDeadline, locale),
    [details.rsvpDeadline, locale]
  );
  const fieldId = useId();
  const id = (key: string) => `${fieldId}-${key}`;

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setDietary("");
    setPlusOneNames("");
    setRequestedSongs("");
    setGuestGroup("OTHER");
    setSelectedRsvpStatus("ATTENDING");
    setFieldErrors({});
    setServerErrorMessage(null);
  }

  function fieldLabelForApiKey(apiKey: string): string {
    switch (apiKey) {
      case "name":
        return translate(details.rsvpNameLabel, locale);
      case "email":
        return translate(details.rsvpEmailLabel, locale);
      case "phone":
        return translate(details.rsvpPhoneLabel, locale);
      case "notes":
        return translate(details.rsvpNotesLabel, locale);
      case "dietaryRestrictions":
        return translate(details.rsvpDietaryLabel, locale);
      case "plusOneNames":
        return translate(details.rsvpPlusOneLabel, locale);
      case "requestedSongs":
        return translate(details.rsvpRequestedSongsLabel, locale);
      case "group":
        return uiText.rsvpGuestGroupLegend;
      case "rsvpStatus":
        return translate(details.rsvpAttendingLabel, locale);
      default:
        return apiKey;
    }
  }

  function inputErrorRing(apiKey: string): string {
    return fieldErrors[apiKey]
      ? " ring-2 ring-red-600 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
      : "";
  }

  async function submitRsvp(rsvpStatus: PublicRsvpStatus) {
    setIsSaving(true);
    setFieldErrors({});
    setServerErrorMessage(null);
    try {
      const payload = {
        name,
        email,
        phone,
        notes,
        dietaryRestrictions: dietary,
        plusOneNames: plusOneNames
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        requestedSongs: requestedSongs
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        rsvpStatus,
        group: guestGroup
      };
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data && typeof data === "object" && "ok" in data && (data as { ok: boolean }).ok === true) {
        resetForm();
        successDialogRef.current?.showModal();
        return;
      }

      if (
        response.status === 400 &&
        data &&
        typeof data === "object" &&
        "fieldErrors" in data &&
        typeof (data as { fieldErrors?: unknown }).fieldErrors === "object" &&
        (data as { fieldErrors: Record<string, string> }).fieldErrors !== null
      ) {
        const raw = (data as { fieldErrors: Record<string, string> }).fieldErrors;
        setFieldErrors(normalizeApiFieldErrors(raw));
        errorDialogRef.current?.showModal();
        return;
      }

      const msg =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string"
          ? (data as { message: string }).message
          : uiText.rsvpModalServerErrorBody;
      setServerErrorMessage(msg);
      errorDialogRef.current?.showModal();
    } catch {
      setServerErrorMessage(uiText.rsvpSubmitError);
      errorDialogRef.current?.showModal();
    } finally {
      setIsSaving(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitRsvp(selectedRsvpStatus);
  }

  const feedbackDialogs = (
    <>
      <dialog
        ref={successDialogRef}
        className="max-w-md rounded-xl border border-rose-200 bg-white p-6 text-slate-800 shadow-2xl backdrop:bg-black/50 dark:border-rose-900 dark:bg-slate-900 dark:text-slate-100"
      >
        <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-100">{uiText.rsvpModalSuccessTitle}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{uiText.rsvpModalSuccessBody}</p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            onClick={() => successDialogRef.current?.close()}
          >
            {uiText.rsvpModalDismiss}
          </button>
        </div>
      </dialog>
      <dialog
        ref={errorDialogRef}
        className="max-w-md rounded-xl border border-rose-200 bg-white p-6 text-slate-800 shadow-2xl backdrop:bg-black/50 dark:border-rose-900 dark:bg-slate-900 dark:text-slate-100"
        onClose={() => {
          setServerErrorMessage(null);
          setFieldErrors({});
        }}
      >
        <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-100">{uiText.rsvpModalErrorTitle}</h3>
        {serverErrorMessage ? (
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">{serverErrorMessage}</p>
        ) : Object.keys(fieldErrors).length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {Object.entries(fieldErrors).map(([key, msg]) => (
              <li key={key} className="leading-snug">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {fieldLabelForApiKey(key)}:
                </span>{" "}
                {msg}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{uiText.rsvpSubmitError}</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            onClick={() => errorDialogRef.current?.close()}
          >
            {uiText.rsvpModalDismiss}
          </button>
        </div>
      </dialog>
    </>
  );

  if (isAmorea) {
    return (
      <>
        <SectionShell showHeading={false} title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
        <div className="amorea-rsvp amorea-rsvp--exact">
          <div className="amorea-rsvp-frame subcard-level-2">
            <p className="amorea-rsvp-title subcard-title">{uiText.rsvpConfirmationTitle}</p>
            {rsvpDeadlineLabel ? (
              <p className="amorea-rsvp-deadline-note">
                {uiText.rsvpConfirmBeforeDatePrefix}
                <time dateTime={details.rsvpDeadline.trim()}>{rsvpDeadlineLabel}</time>
              </p>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("name")}>
                  {translate(details.rsvpNameLabel, locale)}
                </label>
                <input
                  id={id("name")}
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("name")}`}
                  aria-invalid={fieldErrors.name ? true : undefined}
                  required
                />
              </div>
              <fieldset
                className={`amorea-rsvp-field amorea-rsvp-fieldset${inputErrorRing("group")}`}
                aria-invalid={fieldErrors.group ? true : undefined}
              >
                <legend className="amorea-rsvp-label">{uiText.rsvpGuestGroupLegend}</legend>
                <div className="amorea-rsvp-radios">
                  {GUEST_GROUP_VALUES.map((value) => (
                    <label key={value} className="amorea-rsvp-radio-row">
                      <input
                        type="radio"
                        name={id("guest-group")}
                        value={value}
                        checked={guestGroup === value}
                        onChange={() => setGuestGroup(value)}
                      />
                      <span>{guestGroupLabel(value, uiText)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <p className="amorea-rsvp-question" id={id("attending-prompt")}>
                {translate(details.rsvpAttendingLabel, locale)}?
              </p>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("email")}>
                  {translate(details.rsvpEmailLabel, locale)}
                </label>
                <input
                  id={id("email")}
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("email")}`}
                  aria-invalid={fieldErrors.email ? true : undefined}
                  type="email"
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("phone")}>
                  {withRequiredSuffix(translate(details.rsvpPhoneLabel, locale), uiText.rsvpRequiredFieldSuffix)}
                </label>
                <input
                  id={id("phone")}
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("phone")}`}
                  aria-invalid={fieldErrors.phone ? true : undefined}
                  required
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("plus-one")}>
                  {translate(details.rsvpPlusOneLabel, locale)}
                </label>
                <input
                  id={id("plus-one")}
                  name="plus-one"
                  value={plusOneNames}
                  onChange={(event) => setPlusOneNames(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("plusOneNames")}`}
                  aria-invalid={fieldErrors.plusOneNames ? true : undefined}
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("songs")}>
                  {translate(details.rsvpRequestedSongsLabel, locale)}
                </label>
                <input
                  id={id("songs")}
                  name="requested-songs"
                  value={requestedSongs}
                  onChange={(event) => setRequestedSongs(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("requestedSongs")}`}
                  aria-invalid={fieldErrors.requestedSongs ? true : undefined}
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("dietary")}>
                  {translate(details.rsvpDietaryLabel, locale)}
                </label>
                <input
                  id={id("dietary")}
                  name="dietary"
                  value={dietary}
                  onChange={(event) => setDietary(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("dietaryRestrictions")}`}
                  aria-invalid={fieldErrors.dietaryRestrictions ? true : undefined}
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("notes")}>
                  {translate(details.rsvpNotesLabel, locale)}
                </label>
                <input
                  id={id("notes")}
                  name="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className={`amorea-rsvp-input${inputErrorRing("notes")}`}
                  aria-invalid={fieldErrors.notes ? true : undefined}
                />
              </div>
              <button
                type="submit"
                className="amorea-rsvp-yes"
                onClick={() => setSelectedRsvpStatus("ATTENDING")}
                disabled={isSaving}
                aria-describedby={id("attending-prompt")}
              >
                {translate(details.rsvpConfirmButtonLabel, locale)}
              </button>
              <button
                type="submit"
                className="amorea-rsvp-no"
                onClick={() => setSelectedRsvpStatus("DECLINED")}
                disabled={isSaving}
                aria-describedby={id("attending-prompt")}
              >
                {translate(details.rsvpDeclineButtonLabel, locale)}
              </button>
            </form>
          </div>
        </div>
      </SectionShell>
        {feedbackDialogs}
      </>
    );
  }

  return (
    <>
      <SectionShell title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
      <div className={`amorea-rsvp ${SECTION_PIXEL_TOKENS.RSVP.CARD}`}>
        <WaxSeal
          outerClassName={SECTION_PIXEL_TOKENS.RSVP.SEAL}
          innerClassName={SECTION_PIXEL_TOKENS.RSVP.SEAL_INNER}
          symbol="♥"
        />
        <p className={SECTION_PIXEL_TOKENS.RSVP.TITLE} style={{ color: "var(--theme-primary)" }}>
          {uiText.rsvpConfirmationTitle}
        </p>
        {rsvpDeadlineLabel ? (
          <p className="mb-3 text-center text-sm text-slate-600">
            {uiText.rsvpConfirmBeforeDatePrefix}
            <time dateTime={details.rsvpDeadline.trim()}>{rsvpDeadlineLabel}</time>
          </p>
        ) : null}
        <form className={SECTION_PIXEL_TOKENS.RSVP.FORM_STACK} onSubmit={handleSubmit}>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("name")}>
              {translate(details.rsvpNameLabel, locale)}
            </label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("name")}`}
              aria-invalid={fieldErrors.name ? true : undefined}
              required
            />
          </div>
          <fieldset
            className={`${SECTION_PIXEL_TOKENS.RSVP.FIELD}${inputErrorRing("group")}`}
            aria-invalid={fieldErrors.group ? true : undefined}
          >
            <legend className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} mb-2 block`}>
              {uiText.rsvpGuestGroupLegend}
            </legend>
            <div className="flex flex-col gap-2">
              {GUEST_GROUP_VALUES.map((value) => (
                <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
                  <input
                    type="radio"
                    name={id("guest-group")}
                    value={value}
                    checked={guestGroup === value}
                    onChange={() => setGuestGroup(value)}
                    className="h-4 w-4 shrink-0 accent-[var(--theme-primary)]"
                  />
                  <span>{guestGroupLabel(value, uiText)}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("email")}>
              {translate(details.rsvpEmailLabel, locale)}
            </label>
            <input
              id={id("email")}
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("email")}`}
              aria-invalid={fieldErrors.email ? true : undefined}
              type="email"
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("phone")}>
              {withRequiredSuffix(translate(details.rsvpPhoneLabel, locale), uiText.rsvpRequiredFieldSuffix)}
            </label>
            <input
              id={id("phone")}
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("phone")}`}
              aria-invalid={fieldErrors.phone ? true : undefined}
              required
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("dietary")}>
              {translate(details.rsvpDietaryLabel, locale)}
            </label>
            <input
              id={id("dietary")}
              name="dietary"
              value={dietary}
              onChange={(event) => setDietary(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("dietaryRestrictions")}`}
              aria-invalid={fieldErrors.dietaryRestrictions ? true : undefined}
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("plus-one")}>
              {translate(details.rsvpPlusOneLabel, locale)}
            </label>
            <input
              id={id("plus-one")}
              name="plus-one"
              value={plusOneNames}
              onChange={(event) => setPlusOneNames(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("plusOneNames")}`}
              aria-invalid={fieldErrors.plusOneNames ? true : undefined}
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("songs")}>
              {translate(details.rsvpRequestedSongsLabel, locale)}
            </label>
            <input
              id={id("songs")}
              name="requested-songs"
              value={requestedSongs}
              onChange={(event) => setRequestedSongs(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("requestedSongs")}`}
              aria-invalid={fieldErrors.requestedSongs ? true : undefined}
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("notes")}>
              {translate(details.rsvpNotesLabel, locale)}
            </label>
            <input
              id={id("notes")}
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className={`${SECTION_PIXEL_TOKENS.RSVP.INPUT}${inputErrorRing("notes")}`}
              aria-invalid={fieldErrors.notes ? true : undefined}
            />
          </div>
          <p className="mb-1 text-center text-xs text-slate-500" id={id("attending-prompt-default")}>
            {translate(details.rsvpAttendingLabel, locale)}?
          </p>
          <button
            type="submit"
            className={SECTION_PIXEL_TOKENS.RSVP.CTA}
            onClick={() => setSelectedRsvpStatus("ATTENDING")}
            disabled={isSaving}
            aria-describedby={id("attending-prompt-default")}
            style={{
              backgroundColor: "var(--theme-button-bg)",
              color: "var(--theme-button-text)"
            }}
          >
            {translate(details.rsvpConfirmButtonLabel, locale)}
          </button>
          <button
            type="submit"
            className={SECTION_PIXEL_TOKENS.RSVP.CTA}
            onClick={() => setSelectedRsvpStatus("DECLINED")}
            disabled={isSaving}
            aria-describedby={id("attending-prompt-default")}
            style={{
              backgroundColor: "var(--theme-surface)",
              color: "var(--theme-primary)",
              border: "1px solid var(--theme-secondary)"
            }}
          >
            {translate(details.rsvpDeclineButtonLabel, locale)}
          </button>
        </form>
      </div>
      <p className={SECTION_PIXEL_TOKENS.RSVP.CONTACT}>
        {uiText.rsvpContactLabel}: {details.contactEmail} / {details.contactPhone}
      </p>
    </SectionShell>
      {feedbackDialogs}
    </>
  );
}
