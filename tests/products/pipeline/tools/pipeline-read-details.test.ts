import { describe, expect, it } from "vitest";
import { createPipelineGetTemplateHandler, mapPipelineTemplate } from "../../../../src/products/pipeline/tools/get-template.js";
import { createPipelineGetWebhookInfoHandler } from "../../../../src/products/pipeline/tools/get-webhook-info.js";
import { createPipelineListPipelineVarsHandler } from "../../../../src/products/pipeline/tools/list-pipeline-vars.js";

describe("Pipeline read detail tools", () => {
  it("maps pipeline template detail", () => {
    const result = mapPipelineTemplate({
      id: "tpl-1",
      name: "Node.js",
      manifest_version: "3.0",
      language: "nodejs",
      is_system: true,
      region: "cn-north-4",
      template: { id: "tpl-1", name: "Node.js" }
    });

    expect(result.item).toEqual({
      id: "tpl-1",
      name: "Node.js",
      icon: undefined,
      manifestVersion: "3.0",
      language: "nodejs",
      description: undefined,
      isSystem: true,
      region: "cn-north-4",
      template: { id: "tpl-1", name: "Node.js" }
    });
  });

  it("returns pipeline webhook info", async () => {
    const handler = createPipelineGetWebhookInfoHandler({
      getWebhookInfo: async () => ({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        webhook: { id: "webhook-1", name: "default webhook" }
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline webhook info pipe-1");
    expect(result.structuredContent.item?.webhook).toEqual({
      id: "webhook-1",
      name: "default webhook"
    });
    expect(result.structuredContent.projectId).toBe("project-1");
  });

  it("returns pipeline variables", async () => {
    const handler = createPipelineListPipelineVarsHandler({
      listPipelineVars: async () => ({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        variables: [{ id: "var-1", name: "APP_ENV", value: "prod" }],
        total: 1,
        raw: { variables: [{ id: "var-1", name: "APP_ENV", value: "prod" }], total: 1 }
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline variables");
    expect(result.structuredContent.items?.[0]?.variable).toEqual({
      id: "var-1",
      name: "APP_ENV",
      value: "prod"
    });
    expect(result.structuredContent.pipelineId).toBe("pipe-1");
  });

  it("returns pipeline template detail from the handler", async () => {
    const handler = createPipelineGetTemplateHandler({
      getTemplate: async () => ({
        id: "tpl-1",
        name: "Node.js",
        manifest_version: "3.0",
        template: { id: "tpl-1", name: "Node.js" }
      })
    });

    const result = await handler({ tenant_id: "tenant-1", template_id: "tpl-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline template Node.js");
    expect(result.structuredContent.item?.id).toBe("tpl-1");
    expect(result.structuredContent.item?.template).toEqual({ id: "tpl-1", name: "Node.js" });
  });
});
