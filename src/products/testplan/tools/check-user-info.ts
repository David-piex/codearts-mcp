import { testPlanCheckUserInfoInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  checkUserInfo: (input: { project_id: string }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckUserInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCheckUserInfoInput.parse(input);
    const response = await client.checkUserInfo(parsed);
    const result = mapTestPlanValueItem(
      `Checked user info for ${parsed.project_id}`,
      parsed.project_id,
      "check",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
