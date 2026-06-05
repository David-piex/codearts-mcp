import type { RepoMergeRequestTemplate } from "../client.js";
import { repoListProjectMergeRequestTemplatesInput } from "../schemas.js";
import { mapMergeRequestTemplatesList } from "./merge-request-settings-result.js";

type RepoListProjectMergeRequestTemplatesClient = {
  listProjectMergeRequestTemplates: (input: {
    project_id: string;
    page: number;
    page_size: number;
    template_name?: string;
  }) => Promise<{ templates: RepoMergeRequestTemplate[]; total?: number }>;
};

export function createRepoListProjectMergeRequestTemplatesHandler(client: RepoListProjectMergeRequestTemplatesClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectMergeRequestTemplatesInput.parse(input);
    const response = await client.listProjectMergeRequestTemplates(parsed);
    const result = mapMergeRequestTemplatesList("merge request", response.templates, parsed.page, parsed.page_size, response.total);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
