import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteProjectMergeRequestTemplateInput } from "../schemas.js";

type RepoDeleteProjectMergeRequestTemplateClient = {
  deleteProjectMergeRequestTemplate: (input: {
    project_id: string;
    template_id: string;
  }) => Promise<{
    project_id: string;
    template_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteProjectMergeRequestTemplateHandler(client: RepoDeleteProjectMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteProjectMergeRequestTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete project merge request template", {
        projectId: parsed.project_id,
        templateId: parsed.template_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectMergeRequestTemplate(parsed);
    const result = asItemResult("Deleted project merge request template", {
      projectId: response.project_id,
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
