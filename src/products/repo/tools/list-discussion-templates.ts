import type { RepoMergeRequestTemplate } from "../client.js";
import { repoListDiscussionTemplatesInput } from "../schemas.js";
import { mapMergeRequestTemplatesList } from "./merge-request-settings-result.js";

type RepoListDiscussionTemplatesClient = {
  listDiscussionTemplates: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ templates: RepoMergeRequestTemplate[]; total?: number }>;
};

export function createRepoListDiscussionTemplatesHandler(client: RepoListDiscussionTemplatesClient) {
  return async (input: unknown) => {
    const parsed = repoListDiscussionTemplatesInput.parse(input);
    const response = await client.listDiscussionTemplates(parsed);
    const result = mapMergeRequestTemplatesList(
      "discussion",
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
