import { describe, expect, it } from "vitest";
import {
  createRepoListImpersonationTokensHandler,
  mapImpersonationTokens
} from "../../../../src/products/repo/tools/list-impersonation-tokens.js";

describe("mapImpersonationTokens", () => {
  it("returns normalized token metadata without token secrets", () => {
    const result = mapImpersonationTokens(
      [
        {
          id: 27169,
          name: "source-import",
          revoked: false,
          created_at: "2025-02-28T17:04:03.000+08:00",
          scopes: ["download", "push"],
          active: true,
          expires_at: "2026-03-30T00:00:00.000+08:00",
          impersonation: true,
          description: null
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toEqual({
      id: "27169",
      name: "source-import",
      revoked: false,
      active: true,
      scopes: ["download", "push"],
      createdAt: "2025-02-28T17:04:03.000+08:00",
      expiresAt: "2026-03-30T00:00:00.000+08:00",
      impersonation: true,
      description: undefined
    });
    expect(result.page_info?.total).toBe(1);
  });
});

describe("createRepoListImpersonationTokensHandler", () => {
  it("calls the client with parsed filters", async () => {
    const handler = createRepoListImpersonationTokensHandler({
      listImpersonationTokens: async (input) => {
        expect(input).toMatchObject({
          page: 1,
          page_size: 20,
          state: "active",
          search: "source"
        });
        return { tokens: [], total: 0 };
      }
    });

    const result = await handler({ state: "active", search: "source" });

    expect(result.structuredContent.summary).toContain("0 impersonation tokens");
  });
});
