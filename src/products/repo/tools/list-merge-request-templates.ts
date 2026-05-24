import type { RepoMergeRequestTemplate } from "../client.js";
import { repoListMergeRequestTemplatesInput } from "../schemas.js";
import { mapMergeRequestTemplatesList } from "./merge-request-settings-result.js";

type RepoListMergeRequestTemplatesClient = {
  listMergeRequestTemplates: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ templates: RepoMergeRequestTemplate[]; total?: number }>;
};

export function createRepoListMergeRequestTemplatesHandler(client: RepoListMergeRequestTemplatesClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestTemplatesInput.parse(input);
    const response = await client.listMergeRequestTemplates(parsed);
    const result = mapMergeRequestTemplatesList(
      "merge request",
      response.templates,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
