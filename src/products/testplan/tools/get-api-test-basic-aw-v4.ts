import { testPlanGetApiTestBasicAwV4Input } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestBasicAwV4: (input: {
    project_id: string;
    aw_id: string;
    is_api?: boolean;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetApiTestBasicAwV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestBasicAwV4Input.parse(input);
    const response = await client.getApiTestBasicAwV4(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test v4 basic AW ${parsed.aw_id}`,
      parsed.aw_id,
      "aw",
      response.raw,
      { projectId: parsed.project_id, isApi: parsed.is_api }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
