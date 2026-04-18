import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactGetDownloadUrlInput } from "../schemas.js";

export function mapArtifactDownloadUrl(input: {
  path: string;
  name: string;
  tenant_id?: string;
  project_id?: string;
  repo_name?: string;
  format?: string;
  download_url?: string;
  expires_at?: string;
}) {
  return asItemResult(`Loaded artifact download URL ${input.name}`, {
    id: input.path,
    fileId: input.path,
    path: input.path,
    name: input.name,
    tenantId: input.tenant_id,
    projectId: input.project_id,
    repoName: input.repo_name,
    format: input.format,
    downloadUrl: input.download_url,
    expiresAt: input.expires_at
  });
}

type ArtifactGetDownloadUrlClient = {
  getDownloadUrl: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    name: string;
    download_url?: string;
    expires_at?: string;
  }>;
};

export function createArtifactGetDownloadUrlHandler(client: ArtifactGetDownloadUrlClient) {
  return async (input: unknown) => {
    const parsed = artifactGetDownloadUrlInput.parse(input);
    const response = await client.getDownloadUrl(parsed);
    const result = mapArtifactDownloadUrl({
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
