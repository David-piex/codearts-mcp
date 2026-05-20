import { testPlanGetApiTestProjectInfoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestProjectInfo: (input: {
    project_id: string;
    group_id?: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetApiTestProjectInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestProjectInfoInput.parse(input);
    const response = await client.getApiTestProjectInfo(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test project info for ${parsed.project_id}`,
      parsed.project_id,
      "project",
      response.raw,
      { projectId: parsed.project_id, groupId: parsed.group_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
