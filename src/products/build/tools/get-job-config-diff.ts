import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetJobConfigDiffInput } from "../schemas.js";

type Client = {
  getJobConfigDiff: (input: {
    job_id: string;
    revisedl_no: number;
    original_no: number;
  }) => Promise<{
    job_id: string;
    revisedl_no: number;
    original_no: number;
    diff: string;
  }>;
};

export function createBuildGetJobConfigDiffHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobConfigDiffInput.parse(input);
    const response = await client.getJobConfigDiff(parsed);
    const result = asItemResult("Loaded Build job config diff", {
      id: response.job_id,
      job_id: response.job_id,
      revisedl_no: response.revisedl_no,
      original_no: response.original_no,
      diff: response.diff
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
