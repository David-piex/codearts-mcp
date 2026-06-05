import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCheckHostGroupCreatableInput } from "../schemas.js";

type Client = {
  checkHostGroupCreatable: (input: { project_id: string }) => Promise<{
    project_id: string;
    can_created: boolean;
    raw: unknown;
  }>;
};

export function createDeployCheckHostGroupCreatableHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployCheckHostGroupCreatableInput.parse(input);
    const response = await client.checkHostGroupCreatable(parsed);
    const result = asItemResult(`Checked deploy host group creatable permission for ${response.project_id}`, {
      id: response.project_id,
      projectId: response.project_id,
      canCreated: response.can_created,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
