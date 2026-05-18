import type { RepoRepositoryTemplate } from "../client.js";
import { repoListRepositoryTemplatesInput } from "../schemas.js";
import { mapRepositoryTemplatesList } from "./repository-settings-result.js";

type RepoListRepositoryTemplatesClient = {
  listRepositoryTemplates: (input: {
    page: number;
    page_size: number;
    type: "SYSTEM,USER" | "SYSTEM" | "USER";
    platform?: string;
    pipeline?: "SupportPipeline" | "UnsupportedPipeline";
    search?: string;
    enter_type?: string;
    date_order?: "up" | "down";
    language?: string;
    project_id?: string;
  }) => Promise<{
    templates: RepoRepositoryTemplate[];
    total?: number;
  }>;
};

export function createRepoListRepositoryTemplatesHandler(client: RepoListRepositoryTemplatesClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryTemplatesInput.parse(input);
    const response = await client.listRepositoryTemplates(parsed);
    const result = mapRepositoryTemplatesList(response.templates, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
