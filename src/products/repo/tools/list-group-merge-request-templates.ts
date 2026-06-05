import type { RepoMergeRequestTemplate } from "../client.js";
import { repoListGroupMergeRequestTemplatesInput } from "../schemas.js";
import { mapMergeRequestTemplatesList } from "./merge-request-settings-result.js";

type RepoListGroupMergeRequestTemplatesClient = {
  listGroupMergeRequestTemplates: (input: {
    group_id: string;
    page: number;
    page_size: number;
    template_name?: string;
  }) => Promise<{ templates: RepoMergeRequestTemplate[]; total?: number }>;
};

export function createRepoListGroupMergeRequestTemplatesHandler(client: RepoListGroupMergeRequestTemplatesClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupMergeRequestTemplatesInput.parse(input);
    const response = await client.listGroupMergeRequestTemplates(parsed);
    const result = mapMergeRequestTemplatesList("merge request", response.templates, parsed.page, parsed.page_size, response.total);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
