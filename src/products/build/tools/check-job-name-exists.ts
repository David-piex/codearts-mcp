import { buildCheckJobNameExistsInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  checkJobNameExists: (input: { project_id: string; job_name: string }) => Promise<{
    project_id: string;
    job_name: string;
    exists?: boolean;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildCheckJobNameExistsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildCheckJobNameExistsInput.parse(input);
    const response = await client.checkJobNameExists(parsed);
    const result = mapBuildRecordItem(
      "Checked Build job name existence",
      response.job_name,
      "check",
      response.raw,
      {
        project_id: response.project_id,
        job_name: response.job_name,
        exists: response.exists
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
