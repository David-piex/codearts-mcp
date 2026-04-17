import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetAppInput } from "../schemas.js";

export function mapDeployApp(input: {
  application_id: string;
  name: string;
  project_id?: string;
  deploy_type?: string;
  description?: string;
  arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
}) {
  return asItemResult(`Loaded deploy application ${input.name}`, {
    id: input.application_id,
    name: input.name,
    projectId: input.project_id,
    deployType: input.deploy_type,
    description: input.description,
    taskCount: input.arrange_infos?.length ?? 0,
    taskIds: input.arrange_infos?.map((task) => task.id).filter((id): id is string => Boolean(id)) ?? []
  });
}

type DeployGetAppClient = {
  getApp: (input: { application_id: string }) => Promise<{
    application_id: string;
    name: string;
    project_id?: string;
    deploy_type?: string;
    description?: string;
    arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
  }>;
};

export function createDeployGetAppHandler(client: DeployGetAppClient) {
  return async (input: unknown) => {
    const parsed = deployGetAppInput.parse(input);
    const response = await client.getApp(parsed);
    const result = mapDeployApp(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
