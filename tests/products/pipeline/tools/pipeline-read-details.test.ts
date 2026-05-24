import { describe, expect, it } from "vitest";
import { createPipelineGetTemplateHandler, mapPipelineTemplate } from "../../../../src/products/pipeline/tools/get-template.js";
import { createPipelineGetWebhookInfoHandler } from "../../../../src/products/pipeline/tools/get-webhook-info.js";
import { createPipelineListPipelineVarsHandler } from "../../../../src/products/pipeline/tools/list-pipeline-vars.js";
import {
  createPipelineGetChangeRequestHandler,
  createPipelineGetDashboardConcurrencyHandler,
  createPipelineListExecutionPlansHandler,
  createPipelineListReusableJobsHandler
} from "../../../../src/products/pipeline/tools/product-query-tools.js";

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

  it("returns raw list query tool output", async () => {
    const handler = createPipelineListExecutionPlansHandler({
      listExecutionPlans: async () => ({
        records: [{ id: "plan-1", name: "Nightly" }],
        total: 1,
        raw: { records: [{ id: "plan-1", name: "Nightly" }], total: 1 }
      })
    } as never);

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline execution plans");
    expect(result.structuredContent.items?.[0]?.executionPlan).toEqual({
      id: "plan-1",
      name: "Nightly"
    });
    expect((result.structuredContent as Record<string, unknown>).executionPlans).toEqual({
      records: [{ id: "plan-1", name: "Nightly" }],
      total: 1
    });
  });

  it("returns raw item query tool output", async () => {
    const handler = createPipelineGetChangeRequestHandler({
      getChangeRequest: async () => ({
        item: { id: "cr-1", name: "Release CR" },
        raw: { id: "cr-1", name: "Release CR" }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });

    expect(result.content[0]?.text).toContain("Loaded pipeline change request");
    expect(result.structuredContent.item?.changeRequest).toEqual({
      id: "cr-1",
      name: "Release CR"
    });
  });

  it("passes defaulted pagination to reusable job query tools", async () => {
    let received: unknown;
    const handler = createPipelineListReusableJobsHandler({
      listReusableJobs: async (input: unknown) => {
        received = input;
        return {
          records: [],
          total: 0,
          raw: { records: [], total: 0 }
        };
      }
    } as never);

    await handler({ project_id: "project-1" });

    expect(received).toEqual({
      project_id: "project-1",
      offset: 0,
      limit: 20
    });
  });

  it("returns dashboard item query tool output", async () => {
    const handler = createPipelineGetDashboardConcurrencyHandler({
      getDashboardConcurrency: async () => ({
        item: { running: 2 },
        raw: { running: 2 }
      })
    } as never);

    const result = await handler({ tenant_id: "tenant-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline dashboard concurrency");
    expect(result.structuredContent.item?.dashboardConcurrency).toEqual({ running: 2 });
  });
});
