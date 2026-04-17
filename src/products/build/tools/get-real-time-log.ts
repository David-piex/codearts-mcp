import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetRealTimeLogInput } from "../schemas.js";

export function mapBuildRealTimeLog(input: {
  job_id: string;
  build_no: number;
  content?: string;
  has_more_data?: boolean;
  offset?: number;
  current_offset?: number;
}) {
  return asItemResult(`Loaded build real-time log ${input.job_id}#${input.build_no}`, {
    id: input.job_id,
    buildNo: input.build_no,
    content: input.content,
    hasMoreData: input.has_more_data,
    offset: input.offset,
    currentOffset: input.current_offset
  });
}

type BuildGetRealTimeLogClient = {
  getRealTimeLog: (input: { job_id: string; build_no: number; offset: number }) => Promise<{
    job_id: string;
    build_no: number;
    content?: string;
    has_more_data?: boolean;
    offset?: number;
    current_offset?: number;
  }>;
};

export function createBuildGetRealTimeLogHandler(client: BuildGetRealTimeLogClient) {
  return async (input: unknown) => {
    const parsed = buildGetRealTimeLogInput.parse(input);
    const response = await client.getRealTimeLog(parsed);
    const result = mapBuildRealTimeLog(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
