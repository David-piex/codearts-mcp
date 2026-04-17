import { describe, expect, it } from "vitest";
import { createPerfTestListOfflineReportsHandler } from "../../../../src/products/perftest/tools/list-offline-reports.js";

describe("createPerfTestListOfflineReportsHandler", () => {
  it("maps perftest offline reports into MCP output", async () => {
    const handler = createPerfTestListOfflineReportsHandler({
      listOfflineReports: async () => ({
        log_list: [{ run_id: 101, name: "run-1", run_type: 0 }]
      })
    });

    const result = await handler({ project_id: "project-1", task_id: 11 });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "101", name: "run-1" });
  });
});
