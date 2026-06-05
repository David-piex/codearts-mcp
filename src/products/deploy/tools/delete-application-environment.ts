import { asItemResult } from "../../../contracts/tool-result.js";
import { deployDeleteApplicationEnvironmentInput } from "../schemas.js";

export function previewDeleteApplicationEnvironment(input: {
  application_id: string;
  environment_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete deploy environment ${input.environment_id}`, {
    applicationId: input.application_id,
    environmentId: input.environment_id,
    executed: !input.dry_run
  });
}

export function mapDeletedApplicationEnvironment(input: {
  application_id: string;
  environment_id: string;
  status?: string;
}) {
  return asItemResult(`Deleted deploy environment ${input.environment_id}`, {
    id: input.environment_id,
    applicationId: input.application_id,
    environmentId: input.environment_id,
    status: input.status,
    executed: true
  });
}

type DeployDeleteApplicationEnvironmentClient = {
  deleteApplicationEnvironment: (input: {
    application_id: string;
    environment_id: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    id?: string;
    status?: string;
  }>;
};

export function createDeployDeleteApplicationEnvironmentHandler(
  client: DeployDeleteApplicationEnvironmentClient
) {
  return async (input: unknown) => {
    const parsed = deployDeleteApplicationEnvironmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteApplicationEnvironment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteApplicationEnvironment(parsed);
    const result = mapDeletedApplicationEnvironment({
      application_id: response.application_id,
      environment_id: response.id ?? response.environment_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
