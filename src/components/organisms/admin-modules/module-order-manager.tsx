"use client";

import { AdminButton } from "@/components/atoms/admin-modules/admin-button";
import { ModuleOrderManagerProps } from "@/components/admin-modules/organisms.types";
import { moveItem, toggleModule } from "@/components/admin-modules-state";

export function ModuleOrderManager({
  locale,
  order,
  flags,
  setOrder,
  setFlags,
  enabledLabel,
  disabledLabel
}: ModuleOrderManagerProps) {
  return (
    <div className="mt-5 space-y-3">
      {order.map((moduleId, idx) => {
        const def = flags.find((x) => x.id === moduleId);
        const enabled = def?.enabled ?? false;

        return (
          <div
            key={moduleId}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(idx))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = Number(e.dataTransfer.getData("text/plain"));
              const to = idx;
              if (Number.isNaN(from) || from === to) return;
              setOrder((prev) => moveItem(prev, from, to));
            }}
            className="flex cursor-grab flex-col items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-3 transition-colors duration-200 hover:bg-rose-100 active:cursor-grabbing sm:flex-row sm:items-center sm:justify-between sm:px-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-rose-300 bg-white text-rose-700"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h10M10 12h10M10 18h10M4 6h.01M4 12h.01M4 18h.01" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-rose-900">{moduleId}</p>
                <p className="text-xs text-rose-700">/{locale}</p>
              </div>
            </div>
            <AdminButton
              onClick={() => setFlags((prev) => toggleModule(prev, moduleId))}
              className={`min-h-10 rounded-md px-3 py-2 text-sm ${enabled ? "bg-emerald-600 text-white" : "bg-zinc-300 text-zinc-800"}`}
            >
              {enabled ? enabledLabel : disabledLabel}
            </AdminButton>
          </div>
        );
      })}
    </div>
  );
}
