import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetInfoRecordInput } from "../schemas.js";

export function mapBuildInfoRecord(
  jobId: string,
  buildNo: number,
  input: {
    job_running_status?: string;
    state?: string;
    executor?: string;
    trigger_type?: string;
    cost_time?: number;
    scm_type?: string;
  }
) {
  return asItemResult(`Loaded build info record ${jobId}#${buildNo}`, {
    id: jobId,
    buildNo,
    runningStatus: input.job_running_status,
    state: input.state,
    executor: input.executor,
    triggerType: input.trigger_type,
    costTime: input.cost_time,
    scmType: input.scm_type
  });
}

type BuildGetInfoRecordClient = {
  getInfoRecord: (input: { job_id: string; build_no: number }) => Promise<{
    job_running_status?: string;
    state?: string;
    executor?: string;
    trigger_type?: string;
    cost_time?: number;
    scm_type?: string;
  }>;
};

export function createBuildGetInfoRecordHandler(client: BuildGetInfoRecordClient) {
  return async (input: unknown) => {
    const parsed = buildGetInfoRecordInput.parse(input);
    const response = await client.getInfoRecord(parsed);
    const result = mapBuildInfoRecord(parsed.job_id, parsed.build_no, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
