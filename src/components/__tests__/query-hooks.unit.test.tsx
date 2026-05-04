import {
  useAdminModulesConfigQuery,
  useExportYamlMutation,
  useImportYamlMutation,
  useSaveAdminModulesMutation
} from "@/components/admin-modules/query-hooks";
import {
  fetchAdminModulesConfig,
  patchAdminModulesYaml,
  postAdminModulesYamlExport,
  putAdminModulesConfig
} from "@/components/admin-modules/query-fetchers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import React from "react";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/components/admin-modules/query-fetchers", () => ({
  fetchAdminModulesConfig: vi.fn(),
  putAdminModulesConfig: vi.fn(),
  patchAdminModulesYaml: vi.fn(),
  postAdminModulesYamlExport: vi.fn()
}));

function createWrapper() {
  const queryClient = new QueryClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe("query-hooks", () => {
  test("useAdminModulesConfigQuery runs fetcher", async () => {
    vi.mocked(fetchAdminModulesConfig).mockResolvedValueOnce({} as never);
    const { result } = renderHook(() => useAdminModulesConfigQuery(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test("useSaveAdminModulesMutation delegates to put fetcher", async () => {
    vi.mocked(putAdminModulesConfig).mockResolvedValueOnce({} as never);
    const { result } = renderHook(() => useSaveAdminModulesMutation(), { wrapper: createWrapper() });
    await result.current.mutateAsync({} as never);
    expect(putAdminModulesConfig).toHaveBeenCalled();
  });

  test("useImportYamlMutation delegates to patch fetcher", async () => {
    vi.mocked(patchAdminModulesYaml).mockResolvedValueOnce({} as never);
    const { result } = renderHook(() => useImportYamlMutation(), { wrapper: createWrapper() });
    await result.current.mutateAsync("yaml");
    expect(patchAdminModulesYaml).toHaveBeenCalledWith("yaml");
  });

  test("useExportYamlMutation delegates to export fetcher", async () => {
    vi.mocked(postAdminModulesYamlExport).mockResolvedValueOnce("yaml");
    const { result } = renderHook(() => useExportYamlMutation(), { wrapper: createWrapper() });
    await expect(result.current.mutateAsync()).resolves.toBe("yaml");
  });
});
