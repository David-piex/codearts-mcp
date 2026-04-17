import { describe, expect, it } from "vitest";
import { createPerfTestGetReportHandler } from "../../../../src/products/perftest/tools/get-report.js";

describe("createPerfTestGetReportHandler", () => {
  it("maps perftest report into MCP output", async () => {
    const handler = createPerfTestGetReportHandler({
      getReport: async () => ({
        detail: {
          performance: { caseUri: "/cases/7", alias: "login", avgTps: 10 },
          customTransactions: [{ awId: "tx-1", alias: "api-login", avgTps: 6 }],
          detailDatas: [{ awId: "aw-1", alias: "login-api", avgTps: 5 }]
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_run_id: 101,
      case_run_id: 201,
      brokens_limit_count: 60
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "/cases/7",
      customTransactionCount: 1,
      detailRowCount: 1
    });
  });
});
