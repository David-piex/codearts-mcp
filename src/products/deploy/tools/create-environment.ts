import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCreateEnvironmentInput } from "../schemas.js";

export function previewCreateEnvironment(input: {
  application_id: string;
  project_id: string;
  name: string;
  os: string;
  deploy_type: number;
  description?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create deploy environment ${input.name}`, {
    applicationId: input.application_id,
    projectId: input.project_id,
    name: input.name,
    os: input.os,
    deployType: input.deploy_type,
    description: input.description,
    executed: !input.dry_run
  });
}

export function mapCreatedEnvironment(input: {
  application_id: string;
  environment_id: string;
  name: string;
  project_id: string;
  os: string;
  deploy_type?: number;
  description?: string;
}) {
  return asItemResult(`Created deploy environment ${input.name}`, {
    id: input.environment_id,
    applicationId: input.application_id,
    projectId: input.project_id,
    name: input.name,
    os: input.os,
    deployType: input.deploy_type,
    description: input.description,
    executed: true
  });
}

type DeployCreateEnvironmentClient = {
  createEnvironment: (input: {
    application_id: string;
    project_id: string;
    name: string;
    os: string;
    deploy_type?: number;
    description?: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    name: string;
    project_id: string;
    os: string;
    deploy_type?: number;
    description?: string;
  }>;
};

export function createDeployCreateEnvironmentHandler(client: DeployCreateEnvironmentClient) {
  return async (input: unknown) => {
    const parsed = deployCreateEnvironmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateEnvironment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createEnvironment(parsed);
    const result = mapCreatedEnvironment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
