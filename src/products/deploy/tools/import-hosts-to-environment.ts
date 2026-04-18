import { asItemResult } from "../../../contracts/tool-result.js";
import { deployImportHostsToEnvironmentInput } from "../schemas.js";

export function previewImportHostsToEnvironment(input: {
  application_id: string;
  environment_id: string;
  group_id: string;
  host_ids: string[];
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: import hosts into deploy environment ${input.environment_id}`, {
    applicationId: input.application_id,
    environmentId: input.environment_id,
    groupId: input.group_id,
    hostIds: input.host_ids,
    executed: !input.dry_run
  });
}

export function mapImportedHostsToEnvironment(input: {
  application_id: string;
  environment_id: string;
  group_id: string;
  host_ids: string[];
  imported: boolean;
}) {
  return asItemResult(`Imported hosts into deploy environment ${input.environment_id}`, {
    applicationId: input.application_id,
    environmentId: input.environment_id,
    groupId: input.group_id,
    hostIds: input.host_ids,
    imported: input.imported,
    executed: true
  });
}

type DeployImportHostsToEnvironmentClient = {
  importHostsToEnvironment: (input: {
    application_id: string;
    environment_id: string;
    group_id: string;
    host_ids: string[];
  }) => Promise<{
    application_id: string;
    environment_id: string;
    group_id: string;
    host_ids: string[];
    imported: boolean;
  }>;
};

export function createDeployImportHostsToEnvironmentHandler(
  client: DeployImportHostsToEnvironmentClient
) {
  return async (input: unknown) => {
    const parsed = deployImportHostsToEnvironmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewImportHostsToEnvironment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.importHostsToEnvironment(parsed);
    const result = mapImportedHostsToEnvironment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
