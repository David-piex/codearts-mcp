import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactListBuildArchivesInput } from "../schemas.js";

export function mapArtifactBuildArchives(
  items: Array<{
    id: string;
    name: string;
    size?: string;
    download_url?: string;
    md5?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} build archives found`,
    items.map((item) => ({
      id: item.id,
      archiveId: item.id,
      name: item.name,
      size: item.size,
      downloadUrl: item.download_url,
      md5: item.md5
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactListBuildArchivesClient = {
  listBuildArchives: (input: {
    page: number;
    page_size: number;
    keyword?: string;
    parent_id?: string;
    build_id?: string;
    build_no?: string;
    repo_branch?: string;
  }) => Promise<{
    archives: Array<{
      id: string;
      name: string;
      size?: string;
      download_url?: string;
      md5?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactListBuildArchivesHandler(client: ArtifactListBuildArchivesClient) {
  return async (input: unknown) => {
    const parsed = artifactListBuildArchivesInput.parse(input);
    const response = await client.listBuildArchives(parsed);
    const result = mapArtifactBuildArchives(
      response.archives,
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
