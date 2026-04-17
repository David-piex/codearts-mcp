import { describe, expect, it } from "vitest";
import { createPerfTestGetProjectHandler } from "../../../../src/products/perftest/tools/get-project.js";

describe("createPerfTestGetProjectHandler", () => {
  it("maps perftest project into MCP output", async () => {
    const handler = createPerfTestGetProjectHandler({
      getProject: async () => ({
        id: 1,
        name: "demo",
        group: "tenant-1"
      })
    });

    const result = await handler({ project_id: "project-1", test_suite_id: 1 });

    expect(result.structuredContent.item).toMatchObject({ id: "1", group: "tenant-1" });
  });
});
