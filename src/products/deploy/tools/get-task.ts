import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetTaskInput } from "../schemas.js";

export function mapDeployTask(input: {
  task_id: string;
  application_id?: string;
  name: string;
  project_id?: string;
  status?: string;
  deploy_type?: string;
  description?: string;
}) {
  return asItemResult(`Loaded deploy task ${input.task_id}`, {
    id: input.task_id,
    applicationId: input.application_id,
    name: input.name,
    projectId: input.project_id,
    status: input.status,
    deployType: input.deploy_type,
    description: input.description
  });
}

type DeployGetTaskClient = {
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    application_id?: string;
    name: string;
    project_id?: string;
    status?: string;
    deploy_type?: string;
    description?: string;
  }>;
};

export function createDeployGetTaskHandler(client: DeployGetTaskClient) {
  return async (input: unknown) => {
    const parsed = deployGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapDeployTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
