import { describe, expect, it } from "vitest";
import { createTestPlanDownloadTestDesignTemplateHandler } from "../../../../src/products/testplan/tools/download-test-design-template.js";

describe("createTestPlanDownloadTestDesignTemplateHandler", () => {
  it("maps test design template download metadata into MCP output", async () => {
    const handler = createTestPlanDownloadTestDesignTemplateHandler({
      downloadTestDesignTemplate: async () => ({
        template_id: "download-template-1",
        name: "Download template",
        raw: {
          id: "download-template-1",
          name: "Download template"
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      file_name: "template.xlsx"
    });

    expect(result.content[0]?.text).toContain(
      "Loaded test design template download metadata Download template"
    );
    expect(result.structuredContent.item).toEqual({
      id: "download-template-1",
      templateId: "download-template-1",
      name: "Download template",
      template: {
        id: "download-template-1",
        name: "Download template"
      }
    });
  });
});
