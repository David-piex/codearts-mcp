import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteGroupMergeRequestTemplateInput } from "../schemas.js";

type RepoDeleteGroupMergeRequestTemplateClient = {
  deleteGroupMergeRequestTemplate: (input: {
    group_id: string;
    template_id: string;
  }) => Promise<{
    group_id: string;
    template_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteGroupMergeRequestTemplateHandler(client: RepoDeleteGroupMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteGroupMergeRequestTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete group merge request template", {
        groupId: parsed.group_id,
        templateId: parsed.template_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteGroupMergeRequestTemplate(parsed);
    const result = asItemResult("Deleted group merge request template", {
      groupId: response.group_id,
      templateId: response.template_id,
      deleted: response.deleted,
      executed: true
    });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
