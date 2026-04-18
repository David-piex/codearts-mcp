import { describe, expect, it } from "vitest";
import { createDeployDeleteV4ClusterHostsHandler } from "../../../../src/products/deploy/tools/delete-v4-cluster-hosts.js";
import { createDeployGetV4ClusterHandler } from "../../../../src/products/deploy/tools/get-v4-cluster.js";
import { createDeployGetV4ClusterHostHandler } from "../../../../src/products/deploy/tools/get-v4-cluster-host.js";
import { createDeployListV4ClusterHostsHandler } from "../../../../src/products/deploy/tools/list-v4-cluster-hosts.js";
import { createDeployListV4ClustersHandler } from "../../../../src/products/deploy/tools/list-v4-clusters.js";
import { createDeployListV4EnvironmentHostsHandler } from "../../../../src/products/deploy/tools/list-v4-environment-hosts.js";

describe("deploy v4 cluster handlers", () => {
  it("maps v4 clusters into MCP output", async () => {
    const handler = createDeployListV4ClustersHandler({
      listV4Clusters: async () => ({
        project_id: "project-1",
        cluster_type: "host",
        total: 1,
        clusters: [
          {
            cluster_id: "cluster-1",
            name: "111",
            cluster_type: "host",
            description: "demo"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      cluster_type: "host",
      body: {}
    });

    expect(result.structuredContent.summary).toContain("1 v4 clusters");
    expect(result.structuredContent.items).toEqual([
      {
        id: "cluster-1",
        projectId: "project-1",
        name: "111",
        clusterType: "host",
        description: "demo"
      }
    ]);
  });

  it("maps v4 cluster detail into MCP output", async () => {
    const handler = createDeployGetV4ClusterHandler({
      getV4Cluster: async () => ({
        project_id: "project-1",
        cluster_id: "cluster-1",
        cluster_type: "host",
        cluster: {
          cluster_id: "cluster-1",
          name: "111",
          cluster_type: "host",
          description: "demo"
        },
        raw: { id: "cluster-1" }
      })
    });

    const result = await handler({
      project_id: "project-1",
      cluster_id: "cluster-1",
      cluster_type: "host"
    });

    expect(result.structuredContent.item).toEqual({
      id: "cluster-1",
      projectId: "project-1",
      clusterType: "host",
      name: "111",
      description: "demo"
    });
  });

  it("maps v4 cluster hosts into MCP output", async () => {
    const handler = createDeployListV4ClusterHostsHandler({
      listV4ClusterHosts: async () => ({
        project_id: "project-1",
        cluster_id: "cluster-1",
        total: 1,
        hosts: [
          {
            host_id: "host-1",
            name: "ecs-1",
            ip: "1.1.1.1",
            os: "linux",
            connection_status: "online"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      cluster_id: "cluster-1",
      body: {}
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "host-1",
        projectId: "project-1",
        clusterId: "cluster-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        connectionStatus: "online"
      }
    ]);
  });

  it("maps v4 cluster host detail into MCP output", async () => {
    const handler = createDeployGetV4ClusterHostHandler({
      getV4ClusterHost: async () => ({
        project_id: "project-1",
        cluster_id: "cluster-1",
        host_id: "host-1",
        host: {
          host_id: "host-1",
          name: "ecs-1",
          ip: "1.1.1.1",
          os: "linux",
          connection_status: "online"
        },
        raw: { id: "host-1" }
      })
    });

    const result = await handler({
      project_id: "project-1",
      cluster_id: "cluster-1",
      host_id: "host-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "host-1",
      projectId: "project-1",
      clusterId: "cluster-1",
      name: "ecs-1",
      ip: "1.1.1.1",
      os: "linux",
      connectionStatus: "online"
    });
  });

  it("previews delete v4 cluster hosts in dry run mode", async () => {
    const handler = createDeployDeleteV4ClusterHostsHandler({
      deleteV4ClusterHosts: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      cluster_id: "cluster-1",
      host_ids: ["host-1"],
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      clusterId: "cluster-1",
      hostIds: ["host-1"],
      executed: false
    });
  });

  it("maps v4 environment hosts into MCP output", async () => {
    const handler = createDeployListV4EnvironmentHostsHandler({
      listV4EnvironmentHosts: async () => ({
        project_id: "project-1",
        environment_id: "env-1",
        total: 1,
        hosts: [
          {
            host_id: "host-1",
            name: "ecs-1",
            ip: "1.1.1.1",
            os: "linux",
            connection_status: "online"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      environment_id: "env-1",
      query: {}
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "host-1",
        projectId: "project-1",
        environmentId: "env-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        connectionStatus: "online"
      }
    ]);
  });
});
