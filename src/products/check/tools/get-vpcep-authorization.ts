import { checkGetVpcepAuthorizationInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getVpcepAuthorization: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetVpcepAuthorizationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetVpcepAuthorizationInput.parse(input);
    const response = await client.getVpcepAuthorization(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check VPC endpoint authorization ${parsed.task_id}`,
      parsed.task_id,
      "authorization",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
