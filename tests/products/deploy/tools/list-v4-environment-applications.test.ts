import { describe, expect, it } from "vitest";
import { createDeployListV4EnvironmentApplicationsHandler } from "../../../../src/products/deploy/tools/list-v4-environment-applications.js";

describe("createDeployListV4EnvironmentApplicationsHandler", () => {
  it("maps v4 environment applications into MCP output", async () => {
    const handler = createDeployListV4EnvironmentApplicationsHandler({
      listV4EnvironmentApplications: async () => ({
        project_id: "project-1",
        environment_id: "env-1",
        total: 1,
        applications: [
          {
            app_id: "app-1",
            name: "demo-app",
            project_id: "project-1",
            description: "demo"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.summary).toContain("1 v4 environment applications");
    expect(result.structuredContent.items).toEqual([
      {
        id: "app-1",
        environmentId: "env-1",
        name: "demo-app",
        projectId: "project-1",
        description: "demo"
      }
    ]);
  });

  it("falls back to response project_id for v4 environment application items", async () => {
    const handler = createDeployListV4EnvironmentApplicationsHandler({
      listV4EnvironmentApplications: async () => ({
        project_id: "project-1",
        environment_id: "env-1",
        total: 1,
        applications: [
          {
            app_id: "app-2",
            name: "demo-app-2",
            description: "demo-2"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "app-2",
        environmentId: "env-1",
        name: "demo-app-2",
        projectId: "project-1",
        description: "demo-2"
      }
    ]);
  });

  it("adds a project-scoped hint when the v4 environment application list is empty on the first page", async () => {
    const handler = createDeployListV4EnvironmentApplicationsHandler({
      listV4EnvironmentApplications: async () => ({
        project_id: "project-empty",
        environment_id: "env-empty",
        total: 0,
        applications: [],
        raw: { total: 0 }
      })
    });

    const result = await handler({
      project_id: "project-empty",
      environment_id: "env-empty",
      limit: 20,
      offset: 0
    });

    expect(result.content[0]?.text).toContain("Loaded 0 v4 environment applications");
    expect(result.content[0]?.text).toContain("If you expected v4 environment applications here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
