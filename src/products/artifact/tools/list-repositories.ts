import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactListRepositoriesInput } from "../schemas.js";

export function mapArtifactRepositories(
  items: Array<{
    id: string;
    name: string;
    project_id?: string;
    format?: string;
    description?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} artifact repositories found`,
    items.map((item) => ({
      id: item.id,
      repositoryId: item.id,
      name: item.name,
      projectId: item.project_id,
      format: item.format,
      description: item.description
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactListRepositoriesClient = {
  listRepositories: (input: {
    tenant_id: string;
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    repositories: Array<{
      id: string;
      name: string;
      project_id?: string;
      format?: string;
      description?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactListRepositoriesHandler(client: ArtifactListRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = artifactListRepositoriesInput.parse(input);
    const response = await client.listRepositories(parsed);
    const result = mapArtifactRepositories(
      response.repositories,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.keyword,
          projectId: parsed.project_id,
          resourceLabel: "artifact repositories",
          serviceLabel: "Artifact"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
