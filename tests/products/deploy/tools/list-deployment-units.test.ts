import { describe, expect, it } from "vitest";
import { createDeployListDeploymentUnitsHandler } from "../../../../src/products/deploy/tools/list-deployment-units.js";

describe("createDeployListDeploymentUnitsHandler", () => {
  it("maps deployment units into MCP output", async () => {
    const handler = createDeployListDeploymentUnitsHandler({
      listDeploymentUnits: async () => ({
        project_id: "project-1",
        app_id: "app-1",
        deployment_units: [
          {
            id: "du-1",
            environment_id: "env-1",
            environment_name: "prod",
            cluster_id: "cluster-1",
            cluster_name: "cce-1",
            namespace: "default"
          }
        ],
        raw: [{ id: "du-1" }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      app_id: "app-1"
    });

    expect(result.structuredContent.summary).toContain("1 deployment units");
    expect(result.structuredContent.items).toEqual([
      {
        id: "du-1",
        projectId: "project-1",
        appId: "app-1",
        environmentId: "env-1",
        environmentName: "prod",
        clusterId: "cluster-1",
        clusterName: "cce-1",
        namespace: "default"
      }
    ]);
  });
});
