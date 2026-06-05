import { asItemResult } from "../../../contracts/tool-result.js";
import { deployUpdateApplicationEnvironmentInput } from "../schemas.js";

export function previewUpdateApplicationEnvironment(input: {
  application_id: string;
  environment_id: string;
  name?: string;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update deploy environment ${input.environment_id}`, {
    applicationId: input.application_id,
    environmentId: input.environment_id,
    name: input.name,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapUpdatedApplicationEnvironment(input: {
  application_id: string;
  environment_id: string;
  name?: string;
  description?: string;
  status?: string;
}) {
  return asItemResult(`Updated deploy environment ${input.environment_id}`, {
    id: input.environment_id,
    applicationId: input.application_id,
    environmentId: input.environment_id,
    name: input.name,
    description: input.description,
    status: input.status,
    executed: true
  });
}

type DeployUpdateApplicationEnvironmentClient = {
  updateApplicationEnvironment: (input: {
    application_id: string;
    environment_id: string;
    name?: string;
    description?: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    id?: string;
    status?: string;
  }>;
};

export function createDeployUpdateApplicationEnvironmentHandler(
  client: DeployUpdateApplicationEnvironmentClient
) {
  return async (input: unknown) => {
    const parsed = deployUpdateApplicationEnvironmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateApplicationEnvironment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateApplicationEnvironment(parsed);
    const result = mapUpdatedApplicationEnvironment({
      application_id: response.application_id,
      environment_id: response.id ?? response.environment_id,
      name: parsed.name,
      description: parsed.description,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
