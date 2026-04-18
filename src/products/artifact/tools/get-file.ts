import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactGetFileInput } from "../schemas.js";

export function mapArtifactFile(input: {
  path: string;
  name: string;
  tenant_id?: string;
  project_id?: string;
  repo_name?: string;
  format?: string;
  download_uri?: string;
  size?: string;
  md5?: string;
}) {
  return asItemResult(`Loaded artifact file ${input.name}`, {
    id: input.path,
    fileId: input.path,
    path: input.path,
    name: input.name,
    tenantId: input.tenant_id,
    projectId: input.project_id,
    repoName: input.repo_name,
    format: input.format,
    downloadUri: input.download_uri,
    size: input.size,
    md5: input.md5
  });
}

type ArtifactGetFileClient = {
  getFile: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    name: string;
    download_uri?: string;
    size?: string;
    md5?: string;
  }>;
};

export function createArtifactGetFileHandler(client: ArtifactGetFileClient) {
  return async (input: unknown) => {
    const parsed = artifactGetFileInput.parse(input);
    const response = await client.getFile(parsed);
    const result = mapArtifactFile({
      ...response,
      tenant_id: parsed.tenant_id,
      project_id: parsed.project_id,
      repo_name: parsed.repo_name,
      format: parsed.format
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
