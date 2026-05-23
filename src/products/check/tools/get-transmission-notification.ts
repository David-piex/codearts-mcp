import { checkGetTransmissionNotificationInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTransmissionNotification: (input: {
    is_check_project: 0 | 1;
    domain_id?: string;
    project_id?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTransmissionNotificationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTransmissionNotificationInput.parse(input);
    const response = await client.getTransmissionNotification(parsed);
    const id = parsed.project_id ?? parsed.domain_id ?? `is-check-project-${parsed.is_check_project}`;
    const result = mapCheckRecordItem(
      `Loaded Check transmission notification ${id}`,
      id,
      "notification",
      response.raw,
      { isCheckProject: parsed.is_check_project }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
