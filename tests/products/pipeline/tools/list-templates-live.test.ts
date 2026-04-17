import { describe, expect, it } from "vitest";
import { createPipelineListTemplatesHandler } from "../../../../src/products/pipeline/tools/list-templates.js";

describe("createPipelineListTemplatesHandler", () => {
  it("maps pipeline templates into MCP output", async () => {
    const handler = createPipelineListTemplatesHandler({
      listTemplates: async () => ({
        templates: [
          {
            id: "tpl-1",
            name: "Java Maven",
            icon: "java",
            manifest_version: "3.0",
            language: "java",
            description: "Java CI template",
            is_system: true,
            region: "cn-north-4"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ tenant_id: "tenant-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "tpl-1",
        name: "Java Maven",
        icon: "java",
        manifestVersion: "3.0",
        language: "java",
        description: "Java CI template",
        isSystem: true,
        region: "cn-north-4"
      }
    ]);
  });
});
