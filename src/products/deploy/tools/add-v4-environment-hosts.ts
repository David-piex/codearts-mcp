import { asItemResult } from "../../../contracts/tool-result.js";
import { deployAddV4EnvironmentHostsInput } from "../schemas.js";

export function previewAddV4EnvironmentHosts(input: {
  project_id: string;
  environment_id: string;
  cluster_id: string;
  host_ids: string[];
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: add hosts into v4 environment ${input.environment_id}`, {
    projectId: input.project_id,
    environmentId: input.environment_id,
    clusterId: input.cluster_id,
    hostIds: input.host_ids,
    executed: !input.dry_run
  });
}

type DeployAddV4EnvironmentHostsClient = {
  addV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    cluster_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    environment_id: string;
    cluster_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployAddV4EnvironmentHostsHandler(client: DeployAddV4EnvironmentHostsClient) {
  return async (input: unknown) => {
    const parsed = deployAddV4EnvironmentHostsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddV4EnvironmentHosts(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addV4EnvironmentHosts(parsed);
    const result = asItemResult(
      `Added hosts into v4 environment ${response.environment_id}`,
      {
        projectId: response.project_id,
        environmentId: response.environment_id,
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
