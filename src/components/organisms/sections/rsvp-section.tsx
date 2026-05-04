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
import { FormEvent, useId, useMemo, useState } from "react";

type PublicRsvpStatus = "ATTENDING" | "DECLINED";

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
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedRsvpStatus, setSelectedRsvpStatus] = useState<PublicRsvpStatus>("ATTENDING");
  const [guestGroup, setGuestGroup] = useState<GuestGroup>("OTHER");
  const rsvpDeadlineLabel = useMemo(
    () => formatWeddingDateLabel(details.rsvpDeadline, locale),
    [details.rsvpDeadline, locale]
  );
  const fieldId = useId();
  const id = (key: string) => `${fieldId}-${key}`;

  async function submitRsvp(rsvpStatus: PublicRsvpStatus) {
    setIsSaving(true);
    setStatus("");
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
      if (!response.ok) {
        setStatus(uiText.rsvpSubmitError);
        return;
      }
      setStatus(uiText.rsvpSubmitSuccess);
    } catch {
      setStatus(uiText.rsvpSubmitError);
    } finally {
      setIsSaving(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitRsvp(selectedRsvpStatus);
  }

  if (isAmorea) {
    return (
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
                  className="amorea-rsvp-input"
                  required
                />
              </div>
              <fieldset className="amorea-rsvp-field amorea-rsvp-fieldset">
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
                  className="amorea-rsvp-input"
                  type="email"
                />
              </div>
              <div className="amorea-rsvp-field">
                <label className="amorea-rsvp-label" htmlFor={id("phone")}>
                  {translate(details.rsvpPhoneLabel, locale)}
                </label>
                <input
                  id={id("phone")}
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="amorea-rsvp-input"
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
                  className="amorea-rsvp-input"
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
                  className="amorea-rsvp-input"
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
                  className="amorea-rsvp-input"
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
                  className="amorea-rsvp-input"
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
            {status ? <p className="amorea-rsvp-note">{status}</p> : null}
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
              required
            />
          </div>
          <fieldset className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
              type="email"
            />
          </div>
          <div className={SECTION_PIXEL_TOKENS.RSVP.FIELD}>
            <label className={SECTION_PIXEL_TOKENS.RSVP.INPUT_LABEL} htmlFor={id("phone")}>
              {translate(details.rsvpPhoneLabel, locale)}
            </label>
            <input
              id={id("phone")}
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
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
              className={SECTION_PIXEL_TOKENS.RSVP.INPUT}
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
      {status ? <p className={SECTION_PIXEL_TOKENS.RSVP.CONTACT}>{status}</p> : null}
      <p className={SECTION_PIXEL_TOKENS.RSVP.CONTACT}>
        {uiText.rsvpContactLabel}: {details.contactEmail} / {details.contactPhone}
      </p>
    </SectionShell>
  );
}
