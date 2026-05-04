"use client";

export type AdminSectionId = "configuration" | "guests" | "localization";
export const ADMIN_SECTIONS: AdminSectionId[] = ["configuration", "guests", "localization"];

export const ADMIN_SECTION_LABELS: Record<AdminSectionId, string> = {
  configuration: "Configuration",
  guests: "Users / Guests",
  localization: "Idiomas / Localization"
};

export function isAdminSectionId(value: string | null | undefined): value is AdminSectionId {
  if (!value) return false;
  return ADMIN_SECTIONS.includes(value as AdminSectionId);
}

export function resolveAdminSection(value: string | null | undefined): AdminSectionId {
  return isAdminSectionId(value) ? value : "configuration";
}

type AdminNavigationProps = {
  activeSection: AdminSectionId;
  onChangeSection: (section: AdminSectionId) => void;
};

export function AdminNavigation({ activeSection, onChangeSection }: AdminNavigationProps) {
  return (
    <aside className="w-full rounded-xl border border-rose-200 bg-rose-50/40 p-3 lg:sticky lg:top-6 lg:w-72 lg:self-start">
      <h2 className="mb-2 text-sm font-semibold text-rose-900">Admin Sections</h2>
      <nav className="flex flex-wrap gap-2 lg:flex-col">
        {ADMIN_SECTIONS.map((section) => {
          const isActive = section === activeSection;
          return (
            <button
              key={section}
              type="button"
              onClick={() => onChangeSection(section)}
              className={`min-h-10 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "border-rose-500 bg-rose-600 text-white"
                  : "border-rose-200 bg-white text-rose-900 hover:bg-rose-100"
              }`}
            >
              {ADMIN_SECTION_LABELS[section]}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
