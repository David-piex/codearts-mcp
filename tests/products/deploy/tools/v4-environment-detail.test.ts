import { describe, expect, it } from "vitest";
import { createDeployAddV4EnvironmentHostsHandler } from "../../../../src/products/deploy/tools/add-v4-environment-hosts.js";
import { createDeployDeleteV4EnvironmentHostsHandler } from "../../../../src/products/deploy/tools/delete-v4-environment-hosts.js";
import { createDeployGetV4ClusterCountHandler } from "../../../../src/products/deploy/tools/get-v4-cluster-count.js";
import { createDeployGetV4EnvironmentHandler } from "../../../../src/products/deploy/tools/get-v4-environment.js";
import { createDeployGetV4EnvironmentResourceDetailHandler } from "../../../../src/products/deploy/tools/get-v4-environment-resource-detail.js";

describe("deploy v4 environment and cluster detail handlers", () => {
  it("maps v4 cluster count into MCP output", async () => {
    const handler = createDeployGetV4ClusterCountHandler({
      getV4ClusterCount: async () => ({
        project_id: "project-1",
        cluster_type: "host",
        counts: { ecs: 2, third_party: 1 },
        raw: { ecs: 2, third_party: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      cluster_type: "host"
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      clusterType: "host",
      counts: { ecs: 2, thirdParty: 1 }
    });
  });

  it("maps v4 environment detail into MCP output", async () => {
    const handler = createDeployGetV4EnvironmentHandler({
      getV4Environment: async () => ({
        project_id: "project-1",
        environment_id: "env-1",
        environment: {
          environment_id: "env-1",
          name: "prod",
          description: "demo"
        },
        raw: { id: "env-1" }
      })
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "env-1",
      projectId: "project-1",
      name: "prod",
      description: "demo"
    });
  });

  it("maps v4 environment resource detail into MCP output", async () => {
    const handler = createDeployGetV4EnvironmentResourceDetailHandler({
      getV4EnvironmentResourceDetail: async () => ({
        project_id: "project-1",
        environment_id: "env-1",
        raw: {
          host_num: 2,
          cluster_num: 1
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "env-1",
      projectId: "project-1",
      environmentId: "env-1",
      hostCount: 2,
      clusterCount: 1
    });
    expect(result.structuredContent.raw).toEqual({
      host_num: 2,
      cluster_num: 1
    });
  });

  it("previews add v4 environment hosts in dry run mode", async () => {
    const handler = createDeployAddV4EnvironmentHostsHandler({
      addV4EnvironmentHosts: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1",
      cluster_id: "cluster-1",
      host_ids: ["host-1"],
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      environmentId: "env-1",
      clusterId: "cluster-1",
      hostIds: ["host-1"],
      executed: false
    });
  });

  it("previews delete v4 environment hosts in dry run mode", async () => {
    const handler = createDeployDeleteV4EnvironmentHostsHandler({
      deleteV4EnvironmentHosts: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1",
      host_ids: ["host-1"],
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      environmentId: "env-1",
      hostIds: ["host-1"],
      executed: false
    });
  });
});
