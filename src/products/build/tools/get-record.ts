import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetRecordInput } from "../schemas.js";

export function mapBuildRecord(input: {
  record_id: string;
  job_id?: string;
  status?: string;
  trigger_type?: string;
  commit_id?: string;
}) {
  return asItemResult(`Loaded build record ${input.record_id}`, {
    id: input.record_id,
    jobId: input.job_id,
    status: input.status,
    triggerType: input.trigger_type,
    commitId: input.commit_id
  });
}

type BuildGetRecordClient = {
  getRecord: (input: { record_id: string }) => Promise<{
    record_id: string;
    job_id?: string;
    status?: string;
    trigger_type?: string;
    commit_id?: string;
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
