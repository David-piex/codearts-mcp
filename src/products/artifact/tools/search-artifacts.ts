import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactSearchArtifactsInput } from "../schemas.js";

export function mapArtifactSearchResults(
  items: Array<{
    name?: string;
    relative_path?: string;
    repo?: string;
    repo_name?: string;
    display_name?: string;
    repo_type?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} artifacts found`,
    items.map((item) => ({
      id: `${item.repo ?? ""}:${item.relative_path ?? ""}/${item.name ?? ""}`,
      name: item.name ?? "",
      path: item.relative_path,
      repositoryId: item.repo,
      repositoryName: item.repo_name,
      displayName: item.display_name,
      repositoryType: item.repo_type
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactSearchArtifactsClient = {
  searchArtifacts: (input: {
    artifact_name: string;
    page: number;
    page_size: number;
    repo_name?: string;
    project_id?: string;
  }) => Promise<{
    artifacts: Array<{
      name?: string;
      relative_path?: string;
      repo?: string;
      repo_name?: string;
      display_name?: string;
      repo_type?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactSearchArtifactsHandler(client: ArtifactSearchArtifactsClient) {
  return async (input: unknown) => {
    const parsed = artifactSearchArtifactsInput.parse(input);
    const response = await client.searchArtifacts(parsed);
    const result = mapArtifactSearchResults(
      response.artifacts,
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
