import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactListLatestVersionFilesInput } from "../schemas.js";

export function mapArtifactLatestVersionFiles(
  projectId: string,
  items: Array<{
    path?: string;
    name?: string;
    version?: string;
    repo_name?: string;
    size?: string;
    modified_at?: string;
  }>,
  page = 1,
  pageSize = items.length || 1,
  total?: number
) {
  return asListResult(
    `${items.length} latest artifact version files found`,
    items.map((item) => ({
      id: item.path ?? item.name ?? "",
      projectId,
      path: item.path,
      name: item.name,
      version: item.version,
      repoName: item.repo_name,
      size: item.size,
      modifiedAt: item.modified_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactListLatestVersionFilesClient = {
  listLatestVersionFiles: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    files: Array<{
      path?: string;
      name?: string;
      version?: string;
      repo_name?: string;
      size?: string;
      modified_at?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactListLatestVersionFilesHandler(
  client: ArtifactListLatestVersionFilesClient
) {
  return async (input: unknown) => {
    const parsed = artifactListLatestVersionFilesInput.parse(input);
    const response = await client.listLatestVersionFiles(parsed);
    const result = mapArtifactLatestVersionFiles(
      parsed.project_id,
      response.files,
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
