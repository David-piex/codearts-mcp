import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCheckApplicationCreatableInput } from "../schemas.js";

type Client = {
  checkApplicationCreatable: (input: { project_id: string }) => Promise<{
    project_id: string;
    creatable: boolean;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployCheckApplicationCreatableHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployCheckApplicationCreatableInput.parse(input);
    const response = await client.checkApplicationCreatable(parsed);
    const result = asItemResult(`Checked deploy application creatable permission for ${response.project_id}`, {
      id: response.project_id,
      projectId: response.project_id,
      creatable: response.creatable,
      status: response.status,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
