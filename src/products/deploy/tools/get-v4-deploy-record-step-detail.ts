import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4DeployRecordStepDetailInput } from "../schemas.js";

type DeployGetV4DeployRecordStepDetailClient = {
  getV4DeployRecordStepDetail: (input: {
    project_id: string;
    record_id: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    raw: unknown;
  }>;
};

export function createDeployGetV4DeployRecordStepDetailHandler(
  client: DeployGetV4DeployRecordStepDetailClient
) {
  return async (input: unknown) => {
    const parsed = deployGetV4DeployRecordStepDetailInput.parse(input);
    const response = await client.getV4DeployRecordStepDetail(parsed);
    const result = asItemResult(
      `Loaded v4 deploy record step detail for ${response.record_id}`,
      {
        projectId: response.project_id,
        recordId: response.record_id
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
