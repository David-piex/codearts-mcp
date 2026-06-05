import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteGroupInput } from "../schemas.js";
import { previewGroupMutation } from "./group-result.js";

type Client = {
  deleteGroup: (input: {
    project_id: string;
    group_id: string;
  }) => Promise<{
    project_id: string;
    group_id: string;
    deleted: boolean;
    message?: string;
  }>;
};

export function createRepoDeleteGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoDeleteGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGroupMutation("Dry run: delete group", {
        projectId: parsed.project_id,
        groupId: parsed.group_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteGroup(parsed);
    const result = asItemResult(`Deleted group ${parsed.group_id}`, {
      projectId: response.project_id,
      groupId: response.group_id,
      deleted: response.deleted,
      message: response.message
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
