import { describe, expect, it } from "vitest";
import { createRepoListRepositoryLabelsHandler } from "../../../../src/products/repo/tools/list-repository-labels.js";

describe("createRepoListRepositoryLabelsHandler", () => {
  it("maps repository labels into MCP output", async () => {
    const handler = createRepoListRepositoryLabelsHandler({
      listRepositoryLabels: async () => ({
        labels: [
          {
            id: 198,
            name: "Critical",
            color: "#F21313",
            description: "Fix critical defects",
            text_color: "#FFFFFF",
            is_expired: false,
            open_merge_requests_count: 2,
            priority: 10,
            is_repository_label: true
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "198",
      name: "Critical",
      color: "#F21313",
      description: "Fix critical defects",
      textColor: "#FFFFFF",
      expired: false,
      openMergeRequestsCount: 2,
      priority: 10,
      repositoryLabel: true
    });
  });
});
