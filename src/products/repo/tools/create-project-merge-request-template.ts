import type { RepoMergeRequestTemplate } from "../client.js";
import { repoCreateProjectMergeRequestTemplateInput } from "../schemas.js";
import {
  mapMergeRequestTemplate,
  previewMergeRequestTemplateMutation
} from "./merge-request-settings-result.js";

type RepoCreateProjectMergeRequestTemplateClient = {
  createProjectMergeRequestTemplate: (input: {
    project_id: string;
    template_name: string;
    merge_request_title?: string;
    description?: string;
    auto_extract_mr_title?: number;
    is_wip?: boolean;
    is_default?: boolean;
  }) => Promise<RepoMergeRequestTemplate>;
};

export function createRepoCreateProjectMergeRequestTemplateHandler(client: RepoCreateProjectMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoCreateProjectMergeRequestTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewMergeRequestTemplateMutation("Dry run: create project merge request template", {
        projectId: parsed.project_id,
        templateName: parsed.template_name,
        mergeRequestTitle: parsed.merge_request_title,
        description: parsed.description,
        autoExtractMrTitle: parsed.auto_extract_mr_title,
        isWip: parsed.is_wip,
        isDefault: parsed.is_default
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectMergeRequestTemplate(parsed);
    const result = mapMergeRequestTemplate(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
