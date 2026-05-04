"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { SaveActionBarProps } from "@/components/admin-modules/organisms.types";

export function SaveActionBar({ saving, saveLabel, onSave, status }: SaveActionBarProps) {
  return (
    <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <AdminButton
        onClick={onSave}
        disabled={saving}
        className="min-h-10 rounded-md bg-rose-700 px-4 py-2 text-white disabled:opacity-60"
      >
        {saving ? "..." : saveLabel}
      </AdminButton>
      <span className="text-sm text-rose-800">{status}</span>
    </div>
  );
}
