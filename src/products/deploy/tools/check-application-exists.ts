import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCheckApplicationExistsInput } from "../schemas.js";

type Client = {
  checkApplicationExists: (input: { project_id: string; name: string }) => Promise<{
    project_id: string;
    name: string;
    exists: boolean;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployCheckApplicationExistsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployCheckApplicationExistsInput.parse(input);
    const response = await client.checkApplicationExists(parsed);
    const result = asItemResult(`Checked deploy application name ${response.name}`, {
      id: response.name,
      projectId: response.project_id,
      name: response.name,
      exists: response.exists,
      status: response.status,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
