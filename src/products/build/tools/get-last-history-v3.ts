import { buildGetLastHistoryV3Input } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getLastHistoryV3: (input: {
    project_id: string;
    repository_name: string;
  }) => Promise<{
    project_id: string;
    repository_name: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetLastHistoryV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetLastHistoryV3Input.parse(input);
    const response = await client.getLastHistoryV3(parsed);
    const result = mapBuildRecordItem(
      "Loaded Build v3 last successful history",
      response.project_id,
      "history",
      response.raw,
      {
        projectId: response.project_id,
        repositoryName: response.repository_name
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
