import { asItemResult } from "../../../contracts/tool-result.js";
import { deployDeleteV4ClusterHostsInput } from "../schemas.js";

export function previewDeleteV4ClusterHosts(input: {
  project_id: string;
  cluster_id: string;
  host_ids: string[];
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete hosts from v4 cluster ${input.cluster_id}`, {
    projectId: input.project_id,
    clusterId: input.cluster_id,
    hostIds: input.host_ids,
    executed: !input.dry_run
  });
}

type DeployDeleteV4ClusterHostsClient = {
  deleteV4ClusterHosts: (input: {
    project_id: string;
    cluster_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployDeleteV4ClusterHostsHandler(client: DeployDeleteV4ClusterHostsClient) {
  return async (input: unknown) => {
    const parsed = deployDeleteV4ClusterHostsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteV4ClusterHosts(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteV4ClusterHosts(parsed);
    const result = asItemResult(
      `Deleted hosts from v4 cluster ${response.cluster_id}`,
      {
        projectId: response.project_id,
        clusterId: response.cluster_id,
        hostIds: response.host_ids,
        status: response.status,
        executed: true
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
