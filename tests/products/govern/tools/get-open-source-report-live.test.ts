import { describe, expect, it } from "vitest";
import { createGovernGetOpenSourceReportHandler } from "../../../../src/products/govern/tools/get-open-source-report.js";

describe("createGovernGetOpenSourceReportHandler", () => {
  it("maps govern open source report into MCP output", async () => {
    const handler = createGovernGetOpenSourceReportHandler({
      getOpenSourceReport: async () => ({
        id: "task-1",
        status: "R",
        filename: "demo.jar",
        report: "https://report.example.com/1",
        summary: {
          vuln_detail: {
            critical: 1,
            major: 2,
            minor: 3
          },
          comp_detail: {
            no_known_vuln_comp: 4,
            vulnerable_comp: 5
          }
        },
        components: [
          {
            name: "cglib",
            version: "3.3.0",
            vuln_num: 1,
            licenses: ["Apache-2.0"]
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      componentCount: 1,
      reportUrl: "https://report.example.com/1"
    });
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "cglib@3.3.0",
      vulnerabilityCount: 1
    });
  });
});
