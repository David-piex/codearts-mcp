import { describe, expect, it } from "vitest";
import { createRepoListMergeRequestChangesHandler } from "../../../../src/products/repo/tools/list-merge-request-changes.js";

describe("createRepoListMergeRequestChangesHandler", () => {
  it("maps merge request changes into MCP output", async () => {
    const handler = createRepoListMergeRequestChangesHandler({
      listMergeRequestChanges: async () => ({
        changes: [
          {
            old_path: "src/old.ts",
            new_path: "src/new.ts",
            new_file: false,
            deleted_file: false,
            renamed_file: true,
            diff: "@@ -1 +1 @@"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", merge_request_iid: "7", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "src/new.ts",
      oldPath: "src/old.ts",
      newPath: "src/new.ts",
      newFile: false,
      deletedFile: false,
      renamedFile: true,
      diff: "@@ -1 +1 @@"
    });
  });
});
