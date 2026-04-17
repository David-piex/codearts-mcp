import { describe, expect, it } from "vitest";
import { mapMergeRequestChanges } from "../../../../src/products/repo/tools/list-merge-request-changes.js";

describe("mapMergeRequestChanges", () => {
  it("returns normalized merge request changes with pagination", () => {
    const result = mapMergeRequestChanges(
      [
        {
          old_path: "src/old.ts",
          new_path: "src/new.ts",
          new_file: false,
          deleted_file: false,
          renamed_file: true,
          diff: "@@ -1 +1 @@"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "src/new.ts",
        oldPath: "src/old.ts",
        newPath: "src/new.ts",
        newFile: false,
        deletedFile: false,
        renamedFile: true,
        diff: "@@ -1 +1 @@"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
