import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetDeploySourceDetailInput } from "../schemas.js";

export function mapDeploySourceDetail(input: {
  task_id: string;
  trigger_source?: string;
  artifact_source_system?: string;
  artifact_type?: string;
}) {
  return asItemResult(`Loaded deploy source detail ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    triggerSource: input.trigger_source,
    artifactSourceSystem: input.artifact_source_system,
    artifactType: input.artifact_type
  });
}

type DeployGetDeploySourceDetailClient = {
  getDeploySourceDetail: (input: { task_id: string }) => Promise<{
    task_id: string;
    trigger_source?: string;
    artifact_source_system?: string;
    artifact_type?: string;
  }>;
};

export function createDeployGetDeploySourceDetailHandler(
  client: DeployGetDeploySourceDetailClient
) {
  return async (input: unknown) => {
    const parsed = deployGetDeploySourceDetailInput.parse(input);
    const response = await client.getDeploySourceDetail(parsed);
    const result = mapDeploySourceDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
