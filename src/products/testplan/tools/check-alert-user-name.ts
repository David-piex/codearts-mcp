import { testPlanCheckAlertUserNameInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  checkAlertUserName: (input: {
    service_id: string;
    user_name: string;
    user_id?: string;
  }) => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
};

export function createTestPlanCheckAlertUserNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCheckAlertUserNameInput.parse(input);
    const response = await client.checkAlertUserName(parsed);
    const result = mapTestPlanValueItem(
      `Checked alert user name ${parsed.user_name}`,
      parsed.user_name,
      "check",
      response.value,
      response.raw,
      { serviceId: parsed.service_id, userId: parsed.user_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
