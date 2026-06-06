import type { RepoProjectTemplateStatusRepository } from "../client.js";
import { repoListProjectTemplateStatusRepositoriesInput } from "../schemas.js";
import { mapProjectTemplateStatusRepositoriesList } from "./repository-settings-result.js";

type RepoListProjectTemplateStatusRepositoriesClient = {
  listProjectTemplateStatusRepositories: (input: {
    x_auth_token: string;
    project_uuid: string;
    page_no: number;
    page_size: number;
  }) => Promise<{
    repositories: RepoProjectTemplateStatusRepository[];
    total?: number;
  }>;
};

export function createRepoListProjectTemplateStatusRepositoriesHandler(
  client: RepoListProjectTemplateStatusRepositoriesClient
) {
  return async (input: unknown) => {
    const parsed = repoListProjectTemplateStatusRepositoriesInput.parse(input);
    const response = await client.listProjectTemplateStatusRepositories(parsed);
    const result = mapProjectTemplateStatusRepositoriesList(
      response.repositories,
      parsed.page_no,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
