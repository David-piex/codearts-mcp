import { testPlanGetProjectProgressInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getProjectProgress: (input: { project_id: string; operation_uri: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectProgressHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectProgressInput.parse(input);
    const response = await client.getProjectProgress(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded project progress ${parsed.operation_uri}`,
      parsed.operation_uri,
      "progress",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
