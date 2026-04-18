import { asItemResult } from "../../../contracts/tool-result.js";
import { deployDeleteV4EnvironmentHostsInput } from "../schemas.js";

export function previewDeleteV4EnvironmentHosts(input: {
  project_id: string;
  environment_id: string;
  host_ids: string[];
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete hosts from v4 environment ${input.environment_id}`, {
    projectId: input.project_id,
    environmentId: input.environment_id,
    hostIds: input.host_ids,
    executed: !input.dry_run
  });
}

type DeployDeleteV4EnvironmentHostsClient = {
  deleteV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    environment_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployDeleteV4EnvironmentHostsHandler(
  client: DeployDeleteV4EnvironmentHostsClient
) {
  return async (input: unknown) => {
    const parsed = deployDeleteV4EnvironmentHostsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteV4EnvironmentHosts(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteV4EnvironmentHosts(parsed);
    const result = asItemResult(
      `Deleted hosts from v4 environment ${response.environment_id}`,
      {
        projectId: response.project_id,
        environmentId: response.environment_id,
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
