import {
  fetchAdminModulesConfig,
  patchAdminModulesYaml,
  postAdminModulesYamlExport,
  putAdminModulesConfig
} from "@/components/admin-modules/query-fetchers";
import { DEFAULT_LAYOUT_SETTINGS } from "@/config/layout-settings";
import { DEFAULT_MOTION_SETTINGS } from "@/config/motion-settings";
import { defaultModuleProps } from "@/config/modules";
import { defaultWeddingDetails } from "@/config/wedding-details";
import { describe, expect, test, vi } from "vitest";
import { SiteConfigPayload } from "@/components/admin-modules/types";

const mockPayload: SiteConfigPayload = {
  templateId: "classic",
  cadencePreset: "mobile-balanced",
  layoutSettings: DEFAULT_LAYOUT_SETTINGS,
  motionSettings: DEFAULT_MOTION_SETTINGS,
  moduleFlags: [{ id: "heroCarousel", enabled: true }],
  moduleOrder: ["heroCarousel"],
  weddingDetails: defaultWeddingDetails,
  moduleProps: structuredClone(defaultModuleProps),
  themeTokens: {
    primary: { inherit: true, value: "#123456" },
    secondary: { inherit: true, value: "#123456" },
    accent: { inherit: true, value: "#123456" },
    surface: { inherit: true, value: "#123456" },
    text: { inherit: true, value: "#123456" },
    buttonBg: { inherit: true, value: "#123456" },
    buttonText: { inherit: true, value: "#123456" },
    buttonRadius: { inherit: true, value: 10 }
  }
};

describe("query-fetchers", () => {
  test("fetchAdminModulesConfig returns parsed payload", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(mockPayload), { status: 200 })));
    await expect(fetchAdminModulesConfig()).resolves.toEqual(mockPayload);
  });

  test("putAdminModulesConfig throws on failed response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })));
    await expect(putAdminModulesConfig(mockPayload as unknown as SiteConfigPayload)).rejects.toThrow("Request failed with status 500");
  });

  test("patchAdminModulesYaml posts yaml payload", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(mockPayload), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await patchAdminModulesYaml("a: b");
    expect(fetchMock).toHaveBeenCalledWith("/api/admin/modules", expect.objectContaining({ method: "PATCH" }));
  });

  test("postAdminModulesYamlExport returns empty string fallback", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({}), { status: 200 })));
    await expect(postAdminModulesYamlExport()).resolves.toBe("");
  });
});
