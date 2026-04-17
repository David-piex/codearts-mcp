import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactListFilesInput } from "../schemas.js";

export function mapArtifactFiles(
  items: Array<{ path: string; name: string; type?: string; size?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} artifact files found`,
    items.map((item) => ({
      id: item.path,
      name: item.name,
      type: item.type,
      size: item.size
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactListFilesClient = {
  listFiles: (input: {
    project_id: string;
    repo_name: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    files: Array<{ path: string; name: string; type?: string; size?: string }>;
    total?: number;
  }>;
};

export function createArtifactListFilesHandler(client: ArtifactListFilesClient) {
  return async (input: unknown) => {
    const parsed = artifactListFilesInput.parse(input);
    const response = await client.listFiles(parsed);
    const result = mapArtifactFiles(response.files, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
