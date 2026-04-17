import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactGetDownloadUrlInput } from "../schemas.js";

export function mapArtifactDownloadUrl(input: {
  path: string;
  name: string;
  download_url?: string;
  expires_at?: string;
}) {
  return asItemResult(`Loaded artifact download URL ${input.name}`, {
    id: input.path,
    name: input.name,
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
    const result = mapArtifactDownloadUrl(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
