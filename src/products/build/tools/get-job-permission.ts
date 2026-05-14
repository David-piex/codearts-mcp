import { buildGetJobPermissionInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getJobPermission: (input: { project_id: string; job_id: string }) => Promise<{
    project_id: string;
    job_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetJobPermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobPermissionInput.parse(input);
    const response = await client.getJobPermission(parsed);
    const result = mapBuildRecordItem(
      `Loaded Build job permission ${parsed.job_id}`,
      parsed.job_id,
      "permission",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
