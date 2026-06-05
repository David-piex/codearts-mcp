import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { deployBatchDeleteApplicationsInput } from "../schemas.js";

export function previewBatchDeleteApplications(input: {
  project_id: string;
  application_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: batch delete ${input.application_ids.length} deploy applications`, {
    projectId: input.project_id,
    applicationIds: input.application_ids,
    deletedCount: 0,
    executed: false
  });
}

type DeployBatchDeleteApplicationsClient = {
  batchDeleteApplications: (input: {
    project_id: string;
    application_ids: string[];
  }) => Promise<{
    project_id?: string;
    total_num?: number;
    result: Array<{
      application_id: string;
      application_name?: string;
      status?: string;
      error_reason?: string;
    }>;
    raw?: unknown;
  }>;
};

export function createDeployBatchDeleteApplicationsHandler(
  client: DeployBatchDeleteApplicationsClient
) {
  return async (input: unknown) => {
    const parsed = deployBatchDeleteApplicationsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteApplications(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteApplications(parsed);
    const result = asListResult(
      `Processed batch delete for ${response.result.length} deploy applications`,
      response.result.map((item) => ({
        id: item.application_id,
        applicationId: item.application_id,
        applicationName: item.application_name,
        status: item.status,
        errorReason: item.error_reason
      })),
      undefined,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        projectId: response.project_id ?? parsed.project_id,
        totalNum: response.total_num,
        executed: true
      }
    };
  };
}
