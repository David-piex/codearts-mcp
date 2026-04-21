import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactListVersionsInput } from "../schemas.js";

export function mapArtifactVersions(
  projectId: string,
  items: Array<{
    version?: string;
    repo_name?: string;
    artifact_name?: string;
    created_at?: string;
    updated_at?: string;
    downloads?: number;
    files_count?: number;
    category?: string;
  }>,
  page = 1,
  pageSize = items.length || 1,
  total?: number
) {
  return asListResult(
    `${items.length} artifact versions found`,
    items.map((item) => ({
      id: item.version ?? "",
      versionId: item.version ?? "",
      projectId,
      version: item.version,
      repoName: item.repo_name,
      artifactName: item.artifact_name,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      downloads: item.downloads,
      fileCount: item.files_count,
      category: item.category
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactListVersionsClient = {
  listVersions: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    versions: Array<{
      version?: string;
      repo_name?: string;
      artifact_name?: string;
      created_at?: string;
      updated_at?: string;
      downloads?: number;
      files_count?: number;
      category?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactListVersionsHandler(client: ArtifactListVersionsClient) {
  return async (input: unknown) => {
    const parsed = artifactListVersionsInput.parse(input);
    const response = await client.listVersions(parsed);
    const result = mapArtifactVersions(
      parsed.project_id,
      response.versions,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? result.summary
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "artifact versions",
          serviceLabel: "Artifact"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
