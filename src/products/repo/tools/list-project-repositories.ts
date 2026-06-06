import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { repoListProjectRepositoriesInput } from "../schemas.js";
import { mapRepositories } from "./list-repositories.js";

type RepoListProjectRepositoriesClient = {
  listProjectRepositories: (input: {
    x_auth_token: string;
    project_uuid: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
    total?: number;
  }>;
};

export function createRepoListProjectRepositoriesHandler(client: RepoListProjectRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectRepositoriesInput.parse(input);
    const response = await client.listProjectRepositories(parsed);
    const result = mapRepositories(response.repositories, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      emptyText: formatProjectScopedEmptyText({
        summary: result.summary,
        page: parsed.page,
        keyword: parsed.search,
        projectId: parsed.project_uuid,
        resourceLabel: "repositories",
        serviceLabel: "Repo"
      }),
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "sshUrl", get: (item) => (item as { sshUrl?: string }).sshUrl },
        { label: "httpUrl", get: (item) => (item as { httpUrl?: string }).httpUrl }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
