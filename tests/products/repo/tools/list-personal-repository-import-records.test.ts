import { describe, expect, it } from "vitest";
import {
  createRepoListPersonalRepositoryImportRecordsHandler,
  mapPersonalRepositoryImportRecords
} from "../../../../src/products/repo/tools/list-personal-repository-import-records.js";

describe("mapPersonalRepositoryImportRecords", () => {
  it("returns normalized import records", () => {
    const result = mapPersonalRepositoryImportRecords(
      [
        {
          id: 1,
          state: "finished",
          repository: { id: 2, name: "demo" },
          origin_full_name: "owner/demo",
          source_type: "github",
          created_at: "2026-01-01T00:00:00Z"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toEqual({
      id: "1",
      state: "finished",
      repositoryId: "2",
      repositoryName: "demo",
      originFullName: "owner/demo",
      sourceUrl: undefined,
      sourceType: "github",
      createdAt: "2026-01-01T00:00:00Z",
      finishedAt: undefined,
      targetProjectId: undefined
    });
    expect(result.page_info?.total).toBe(1);
  });
});

describe("createRepoListPersonalRepositoryImportRecordsHandler", () => {
  it("calls the client with parsed filters", async () => {
    const handler = createRepoListPersonalRepositoryImportRecordsHandler({
      listPersonalRepositoryImportRecords: async (input) => {
        expect(input).toMatchObject({
          page: 1,
          page_size: 20,
          state: "importing"
        });
        return { records: [], total: 0 };
      }
    });

    const result = await handler({ state: "importing" });

    expect(result.structuredContent.summary).toContain("0 repository import records");
  });
});
