import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetRecordInput } from "../schemas.js";

export function mapBuildRecord(input: {
  record_id: string;
  job_id?: string;
  status?: string;
  status_code?: number;
  trigger_type?: string;
  commit_id?: string;
  branch?: string;
  repository?: string;
  execution_id?: string;
  error_message?: string;
  build_yml_path?: string;
  daily_build_number?: string;
}) {
  return asItemResult(`Loaded build record ${input.record_id}`, {
    id: input.record_id,
    jobId: input.job_id,
    status: input.status,
    statusCode: input.status_code,
    triggerType: input.trigger_type,
    commitId: input.commit_id,
    branch: input.branch,
    repository: input.repository,
    executionId: input.execution_id,
    errorMessage: input.error_message,
    buildYmlPath: input.build_yml_path,
    dailyBuildNumber: input.daily_build_number
  });
}

type BuildGetRecordClient = {
  getRecord: (input: { record_id: string }) => Promise<{
    record_id: string;
    job_id?: string;
    status?: string;
    status_code?: number;
    trigger_type?: string;
    commit_id?: string;
    branch?: string;
    repository?: string;
    execution_id?: string;
    error_message?: string;
    build_yml_path?: string;
    daily_build_number?: string;
  }>;
};

export function createBuildGetRecordHandler(client: BuildGetRecordClient) {
  return async (input: unknown) => {
    const parsed = buildGetRecordInput.parse(input);
    const response = await client.getRecord(parsed);
    const result = mapBuildRecord(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
