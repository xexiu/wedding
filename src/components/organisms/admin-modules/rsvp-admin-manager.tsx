"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { AdminInput } from "@/components/atoms/admin-modules/admin-input";
import { AdminSelect } from "@/components/atoms/admin-modules/admin-select";
import { useAdminRsvpQuery, useSaveAdminRsvpMutation } from "@/components/admin-modules/query-hooks";
import { adminModulesQueryKeys } from "@/components/admin-modules/query-keys";
import { RsvpAdminPayload, RsvpGuestPayload } from "@/components/admin-modules/types";
import {
  createEmptyGuest,
  GUEST_GROUP_OPTIONS,
  RSVP_ADMIN_TEXT,
  RSVP_STATUS_OPTIONS
} from "@/components/organisms/admin-modules/rsvp-admin.constants";
import type { GuestGroup, RsvpStatus } from "@/config/rsvp-enums";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useMemo, useState } from "react";

function toCsv(values: string[]): string {
  return values.join(", ");
}

function fromCsv(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function truncateCell(s: string, max: number): string {
  const t = s.trim();
  if (!t) return "—";
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

function formatRegistered(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return "—";
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function labelForGroup(value: GuestGroup): string {
  return GUEST_GROUP_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function labelForRsvp(value: RsvpStatus): string {
  return RSVP_STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

type SortKey = "registered-desc" | "registered-asc" | "name-asc" | "name-desc";

type IndexedGuest = { guest: RsvpGuestPayload; index: number };

export function RsvpAdminManager() {
  const queryClient = useQueryClient();
  const query = useAdminRsvpQuery();
  const saveMutation = useSaveAdminRsvpMutation();
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState<RsvpAdminPayload>({
    config: { rsvpDeadline: "", eventDetails: "" },
    guests: []
  });

  const [filterRsvp, setFilterRsvp] = useState<RsvpStatus | "">("");
  const [filterGroup, setFilterGroup] = useState<GuestGroup | "">("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("registered-desc");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!query.data) return;
    setDraft(query.data);
  }, [query.data]);

  const stats = useMemo(() => {
    const g = draft.guests;
    return {
      total: g.length,
      attending: g.filter((x) => x.rsvpStatus === "ATTENDING").length,
      declined: g.filter((x) => x.rsvpStatus === "DECLINED").length,
      pending: g.filter((x) => x.rsvpStatus === "PENDING").length
    };
  }, [draft.guests]);

  const filteredRows = useMemo(() => {
    let rows: IndexedGuest[] = draft.guests.map((guest, index) => ({ guest, index }));
    if (filterRsvp) {
      rows = rows.filter((r) => r.guest.rsvpStatus === filterRsvp);
    }
    if (filterGroup) {
      rows = rows.filter((r) => r.guest.group === filterGroup);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(({ guest }) => {
        const hay = [guest.name, guest.email, guest.phone, guest.notes].join(" ").toLowerCase();
        return hay.includes(q);
      });
    }
    const sorted = [...rows];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case "name-asc":
          return a.guest.name.localeCompare(b.guest.name, undefined, { sensitivity: "base" });
        case "name-desc":
          return b.guest.name.localeCompare(a.guest.name, undefined, { sensitivity: "base" });
        case "registered-asc": {
          const ta = a.guest.createdAt ? new Date(a.guest.createdAt).valueOf() : 0;
          const tb = b.guest.createdAt ? new Date(b.guest.createdAt).valueOf() : 0;
          return ta - tb;
        }
        case "registered-desc":
        default: {
          const ta = a.guest.createdAt ? new Date(a.guest.createdAt).valueOf() : 0;
          const tb = b.guest.createdAt ? new Date(b.guest.createdAt).valueOf() : 0;
          return tb - ta;
        }
      }
    });
    return sorted;
  }, [draft.guests, filterRsvp, filterGroup, search, sortKey]);

  function setGuest(index: number, updater: (guest: RsvpGuestPayload) => RsvpGuestPayload) {
    setDraft((prev) => ({
      ...prev,
      guests: prev.guests.map((guest, guestIndex) => (guestIndex === index ? updater(guest) : guest))
    }));
  }

  function removeGuest(index: number) {
    setExpandedIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
    setDraft((prev) => ({
      ...prev,
      guests: prev.guests.filter((_, guestIndex) => guestIndex !== index)
    }));
  }

  function addGuest() {
    setDraft((prev) => {
      const newIndex = prev.guests.length;
      const nextGuests = [...prev.guests, createEmptyGuest()];
      setTimeout(() => setExpandedIndex(newIndex), 0);
      return { ...prev, guests: nextGuests };
    });
  }

  async function save() {
    setStatus("");
    try {
      const saved = await saveMutation.mutateAsync(draft);
      setDraft(saved);
      queryClient.setQueryData(adminModulesQueryKeys.rsvp(), saved);
      await queryClient.invalidateQueries({ queryKey: adminModulesQueryKeys.rsvp() });
      setStatus(RSVP_ADMIN_TEXT.SAVE_OK);
    } catch {
      setStatus(RSVP_ADMIN_TEXT.SAVE_FAILED);
    }
  }

  function toggleExpanded(index: number) {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="mt-6 rounded-xl border border-rose-200 p-4">
      <h2 className="text-lg font-semibold text-rose-900">{RSVP_ADMIN_TEXT.TITLE}</h2>
      <p className="mt-1 text-sm text-rose-800">{RSVP_ADMIN_TEXT.DESCRIPTION}</p>

      {query.isLoading ? <p className="mt-3 text-sm text-rose-700">Loading guest data...</p> : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.DEADLINE_LABEL}</span>
          <AdminInput
            type="datetime-local"
            value={draft.config.rsvpDeadline}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                config: { ...prev.config, rsvpDeadline: event.target.value }
              }))
            }
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.EVENT_DETAILS_LABEL}</span>
          <textarea
            className="min-h-20 w-full rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-950"
            value={draft.config.eventDetails}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                config: { ...prev.config, eventDetails: event.target.value }
              }))
            }
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-rose-900">{RSVP_ADMIN_TEXT.GUESTS_LABEL}</h3>
        <AdminButton type="button" onClick={addGuest}>
          {RSVP_ADMIN_TEXT.ADD_GUEST}
        </AdminButton>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-rose-800">
        <span>{RSVP_ADMIN_TEXT.SUMMARY_TOTAL(stats.total)}</span>
        <span className="text-rose-300">·</span>
        <span>{RSVP_ADMIN_TEXT.SUMMARY_ATTENDING(stats.attending)}</span>
        <span className="text-rose-300">·</span>
        <span>{RSVP_ADMIN_TEXT.SUMMARY_DECLINED(stats.declined)}</span>
        <span className="text-rose-300">·</span>
        <span>{RSVP_ADMIN_TEXT.SUMMARY_PENDING(stats.pending)}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        <label className="flex min-w-[160px] flex-col gap-1">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.FILTER_RSVP_STATUS_LABEL}</span>
          <AdminSelect
            value={filterRsvp}
            onChange={(event) => setFilterRsvp(event.target.value as RsvpStatus | "")}
          >
            <option value="">{RSVP_ADMIN_TEXT.FILTER_RSVP_ALL}</option>
            {RSVP_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </AdminSelect>
        </label>
        <label className="flex min-w-[140px] flex-col gap-1">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.FILTER_GROUP_LABEL}</span>
          <AdminSelect
            value={filterGroup}
            onChange={(event) => setFilterGroup(event.target.value as GuestGroup | "")}
          >
            <option value="">{RSVP_ADMIN_TEXT.FILTER_GROUP_ALL}</option>
            {GUEST_GROUP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </AdminSelect>
        </label>
        <label className="flex min-w-[200px] flex-1 flex-col gap-1">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.SEARCH_PLACEHOLDER}</span>
          <AdminInput
            type="search"
            placeholder={RSVP_ADMIN_TEXT.SEARCH_PLACEHOLDER}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="flex min-w-[200px] flex-col gap-1">
          <span className="text-xs text-rose-800">{RSVP_ADMIN_TEXT.SORT_LABEL}</span>
          <AdminSelect value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="registered-desc">{RSVP_ADMIN_TEXT.SORT_REGISTERED_DESC}</option>
            <option value="registered-asc">{RSVP_ADMIN_TEXT.SORT_REGISTERED_ASC}</option>
            <option value="name-asc">{RSVP_ADMIN_TEXT.SORT_NAME_ASC}</option>
            <option value="name-desc">{RSVP_ADMIN_TEXT.SORT_NAME_DESC}</option>
          </AdminSelect>
        </label>
      </div>

      <p className="mt-2 text-xs text-rose-700">
        {RSVP_ADMIN_TEXT.TABLE_SHOWING(filteredRows.length, draft.guests.length)}
      </p>

      <div className="mt-3 overflow-x-auto rounded-lg border border-rose-100">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm text-rose-950">
          <thead>
            <tr className="border-b border-rose-200 bg-rose-100/90 text-xs uppercase tracking-wide text-rose-900">
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_NAME}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_EMAIL}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_PHONE}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_GROUP}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_RSVP}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_PLUS_COUNT}</th>
              <th className="max-w-[140px] px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_PLUS_NAMES}</th>
              <th className="max-w-[120px] px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_SONGS}</th>
              <th className="max-w-[100px] px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_DIETARY}</th>
              <th className="max-w-[100px] px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_NOTES}</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_REGISTERED}</th>
              <th className="px-3 py-2 font-semibold">{RSVP_ADMIN_TEXT.TABLE_COL_ACTIONS}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-rose-600">
                  {RSVP_ADMIN_TEXT.TABLE_EMPTY_FILTER}
                </td>
              </tr>
            ) : (
              filteredRows.map(({ guest, index }) => (
                <Fragment key={guest.id != null ? `guest-${guest.id}` : `draft-${index}`}>
                  <tr className="border-b border-rose-100 transition-colors hover:bg-rose-50/70">
                    <td className="max-w-[160px] px-3 py-2 font-medium">{truncateCell(guest.name, 48)}</td>
                    <td className="max-w-[180px] px-3 py-2">{truncateCell(guest.email, 36)}</td>
                    <td className="whitespace-nowrap px-3 py-2">{truncateCell(guest.phone, 18)}</td>
                    <td className="px-3 py-2">{labelForGroup(guest.group)}</td>
                    <td className="px-3 py-2">{labelForRsvp(guest.rsvpStatus)}</td>
                    <td className="px-3 py-2 tabular-nums">{guest.plusOneCount}</td>
                    <td className="max-w-[140px] px-3 py-2">{truncateCell(toCsv(guest.plusOneNames), 40)}</td>
                    <td className="max-w-[120px] px-3 py-2">{truncateCell(toCsv(guest.requestedSongs), 36)}</td>
                    <td className="max-w-[100px] px-3 py-2">{truncateCell(guest.dietaryRestrictions, 28)}</td>
                    <td className="max-w-[100px] px-3 py-2">{truncateCell(guest.notes, 28)}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-xs text-rose-800">
                      {formatRegistered(guest.createdAt ?? "")}
                    </td>
                    <td className="px-3 py-2">
                      <AdminButton type="button" onClick={() => toggleExpanded(index)}>
                        {expandedIndex === index ? RSVP_ADMIN_TEXT.TABLE_COLLAPSE : RSVP_ADMIN_TEXT.TABLE_EXPAND}
                      </AdminButton>
                    </td>
                  </tr>
                  {expandedIndex === index ? (
                    <tr key={`edit-${guest.id ?? `new-${index}`}`} className="border-b border-rose-200 bg-rose-50/50">
                      <td colSpan={12} className="px-3 py-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-rose-800">
                          {RSVP_ADMIN_TEXT.DETAILS_HEADING}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <AdminInput
                            placeholder="Name"
                            value={guest.name}
                            onChange={(event) => setGuest(index, (item) => ({ ...item, name: event.target.value }))}
                          />
                          <AdminInput
                            placeholder="Email"
                            value={guest.email}
                            onChange={(event) => setGuest(index, (item) => ({ ...item, email: event.target.value }))}
                          />
                          <AdminInput
                            placeholder="Phone"
                            value={guest.phone}
                            onChange={(event) => setGuest(index, (item) => ({ ...item, phone: event.target.value }))}
                          />
                          <AdminSelect
                            value={guest.group}
                            onChange={(event) =>
                              setGuest(index, (item) => ({
                                ...item,
                                group: event.target.value as RsvpGuestPayload["group"]
                              }))
                            }
                          >
                            {GUEST_GROUP_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </AdminSelect>
                          <AdminSelect
                            value={guest.rsvpStatus}
                            onChange={(event) =>
                              setGuest(index, (item) => ({
                                ...item,
                                rsvpStatus: event.target.value as RsvpGuestPayload["rsvpStatus"]
                              }))
                            }
                          >
                            {RSVP_STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </AdminSelect>
                          <AdminInput
                            type="number"
                            min={0}
                            placeholder="Plus One Count"
                            value={String(guest.plusOneCount)}
                            onChange={(event) =>
                              setGuest(index, (item) => ({
                                ...item,
                                plusOneCount: Number(event.target.value || 0)
                              }))
                            }
                          />
                          <AdminInput
                            className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-950 sm:col-span-2"
                            placeholder={RSVP_ADMIN_TEXT.PLUS_ONE_NAMES_PLACEHOLDER}
                            value={toCsv(guest.plusOneNames)}
                            onChange={(event) =>
                              setGuest(index, (item) => ({ ...item, plusOneNames: fromCsv(event.target.value) }))
                            }
                          />
                          <AdminInput
                            className="min-h-10 rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-950 sm:col-span-2"
                            placeholder={RSVP_ADMIN_TEXT.SONGS_PLACEHOLDER}
                            value={toCsv(guest.requestedSongs)}
                            onChange={(event) =>
                              setGuest(index, (item) => ({ ...item, requestedSongs: fromCsv(event.target.value) }))
                            }
                          />
                          <AdminInput
                            className="sm:col-span-2"
                            placeholder="Dietary Restrictions"
                            value={guest.dietaryRestrictions}
                            onChange={(event) =>
                              setGuest(index, (item) => ({ ...item, dietaryRestrictions: event.target.value }))
                            }
                          />
                          <textarea
                            className="min-h-20 w-full rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-950 sm:col-span-2"
                            placeholder={RSVP_ADMIN_TEXT.NOTES_PLACEHOLDER}
                            value={guest.notes}
                            onChange={(event) => setGuest(index, (item) => ({ ...item, notes: event.target.value }))}
                          />
                        </div>
                        <div className="mt-3">
                          <AdminButton type="button" onClick={() => removeGuest(index)}>
                            Remove Guest
                          </AdminButton>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <AdminButton type="button" onClick={save} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? RSVP_ADMIN_TEXT.SAVING : RSVP_ADMIN_TEXT.SAVE}
        </AdminButton>
        {status ? <p className="text-sm text-rose-800">{status}</p> : null}
      </div>
    </section>
  );
}
