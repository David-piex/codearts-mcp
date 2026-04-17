import { describe, expect, it } from "vitest";
import { mapRepositoryLabels } from "../../../../src/products/repo/tools/list-repository-labels.js";

describe("mapRepositoryLabels", () => {
  it("returns normalized repository labels with pagination", () => {
    const result = mapRepositoryLabels(
      [
        {
          id: 1,
          name: "bug",
          color: "#ff0000",
          description: "Bug fixes",
          text_color: "#ffffff",
          is_expired: false,
          open_merge_requests_count: 2,
          priority: 1,
          is_repository_label: true
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "1",
        name: "bug",
        color: "#ff0000",
        description: "Bug fixes",
        textColor: "#ffffff",
        expired: false,
        openMergeRequestsCount: 2,
        priority: 1,
        repositoryLabel: true
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
