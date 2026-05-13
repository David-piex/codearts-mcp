import { testPlanGetApiTestBasicAwV3Input } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestBasicAwV3: (input: {
    project_id: string;
    aw_id: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetApiTestBasicAwV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestBasicAwV3Input.parse(input);
    const response = await client.getApiTestBasicAwV3(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test v3 basic AW ${parsed.aw_id}`,
      parsed.aw_id,
      "aw",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
