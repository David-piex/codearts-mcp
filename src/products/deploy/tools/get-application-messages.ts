import { asListResult } from "../../../contracts/tool-result.js";
import { deployGetApplicationMessagesInput } from "../schemas.js";

type Client = {
  getApplicationMessages: (input: {
    project_id: string;
    app_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    app_id: string;
    messages: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetApplicationMessagesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetApplicationMessagesInput.parse(input);
    const response = await client.getApplicationMessages(parsed);
    const result = asListResult(
      `${response.messages.length} deploy application messages found`,
      response.messages.map((item) => ({
        id: String(item.id ?? item.message_id ?? item.name ?? ""),
        message: item
      }))
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        projectId: response.project_id,
        appId: response.app_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
