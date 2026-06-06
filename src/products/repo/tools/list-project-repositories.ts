import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { repoListProjectRepositoriesInput } from "../schemas.js";
import { mapRepositories } from "./list-repositories.js";

type RepoListProjectRepositoriesClient = {
  listProjectRepositories: (input: {
    x_auth_token: string;
    project_id?: string;
    project_uuid?: string;
    page: number;
    page_size: number;
    search?: string;
    order_by?: "id" | "name" | "created_at" | "updated_at";
    sort?: "asc" | "desc";
    offset?: number;
    limit?: number;
  }) => Promise<{
    repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
    total?: number;
  }>;
};

export function createRepoListProjectRepositoriesHandler(client: RepoListProjectRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectRepositoriesInput.parse(input);
    const pageSize = parsed.limit ?? parsed.page_size;
    const page = parsed.offset !== undefined ? Math.floor(parsed.offset / pageSize) + 1 : parsed.page;
    const projectId = parsed.project_id ?? parsed.project_uuid ?? "";
    const response = await client.listProjectRepositories(parsed);
    const result = mapRepositories(response.repositories, page, pageSize, response.total);
    const text = formatListToolText(result, {
      emptyText: formatProjectScopedEmptyText({
        summary: result.summary,
        page,
        keyword: parsed.search,
        projectId,
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
