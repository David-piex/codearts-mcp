import { describe, expect, it } from "vitest";
import { createDeployListEnvironmentsHandler } from "../../../../src/products/deploy/tools/list-environments.js";

describe("createDeployListEnvironmentsHandler", () => {
  it("maps deploy environments into MCP output", async () => {
    const handler = createDeployListEnvironmentsHandler({
      listEnvironments: async () => ({
        environments: [
          {
            environment_id: "env-1",
            name: "prod-env",
            os_type: "linux",
            category: "host",
            instance_count: 2
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      application_id: "app-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 deploy environments found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "env-1",
        applicationId: "app-1",
        projectId: "project-1",
        name: "prod-env",
        osType: "linux",
        category: "host",
        instanceCount: 2
      }
    ]);
  });

  it("adds a project-scoped hint when the deploy environment list is empty", async () => {
    const handler = createDeployListEnvironmentsHandler({
      listEnvironments: async () => ({
        environments: [],
        total: 0
      })
    });

    const result = await handler({
      application_id: "app-1",
      project_id: "project-empty",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 deploy environments found");
    expect(result.content[0]?.text).toContain("If you expected deploy environments here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
