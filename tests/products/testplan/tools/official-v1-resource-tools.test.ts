import { describe, expect, it } from "vitest";
import { createTestPlanDownloadAssetTemplateHandler } from "../../../../src/products/testplan/tools/download-asset-template.js";
import { createTestPlanExportMindmapHandler } from "../../../../src/products/testplan/tools/export-mindmap.js";

describe("official TestPlan v1 resource tools", () => {
  it("maps asset template download metadata into MCP output", async () => {
    const handler = createTestPlanDownloadAssetTemplateHandler({
      downloadAssetTemplate: async () => ({
        template_id: "asset-template-1",
        name: "Asset template",
        raw: {
          id: "asset-template-1",
          name: "Asset template"
        }
      })
    });

    const result = await handler({
      project_id: "project-1"
    });

    expect(result.content[0]?.text).toContain(
      "Loaded asset template download metadata Asset template"
    );
    expect(result.structuredContent.item).toEqual({
      id: "asset-template-1",
      templateId: "asset-template-1",
      name: "Asset template",
      template: {
        id: "asset-template-1",
        name: "Asset template"
      }
    });
  });

  it("maps mindmap export metadata into MCP output", async () => {
    const handler = createTestPlanExportMindmapHandler({
      exportMindmap: async () => ({
        mindmap_id: "mindmap-1",
        name: "Checkout flow",
        raw: {
          id: "mindmap-1",
          name: "Checkout flow"
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      id: "mindmap-1"
    });

    expect(result.content[0]?.text).toContain(
      "Loaded mindmap export metadata Checkout flow"
    );
    expect(result.structuredContent.item).toEqual({
      id: "mindmap-1",
      mindmapId: "mindmap-1",
      name: "Checkout flow",
      export: {
        id: "mindmap-1",
        name: "Checkout flow"
      }
    });
  });
});
