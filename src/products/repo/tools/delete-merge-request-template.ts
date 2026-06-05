import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteMergeRequestTemplateInput } from "../schemas.js";

type RepoDeleteMergeRequestTemplateClient = {
  deleteMergeRequestTemplate: (input: {
    repository_id: string;
    template_id: string;
  }) => Promise<{
    repository_id: string;
    template_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteMergeRequestTemplateHandler(client: RepoDeleteMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteMergeRequestTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete merge request template", {
        repositoryId: parsed.repository_id,
        templateId: parsed.template_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMergeRequestTemplate(parsed);
    const result = asItemResult("Deleted merge request template", {
      repositoryId: response.repository_id,
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
