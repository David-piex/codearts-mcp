import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactDeleteFileInput } from "../schemas.js";

export function previewArtifactDeleteFile(input: {
  repo_name: string;
  path: string;
  format: string;
  file_name?: string;
  size?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete artifact file ${input.path}`, {
    id: input.path,
    repositoryName: input.repo_name,
    format: input.format,
    fileName: input.file_name,
    size: input.size,
    executed: !input.dry_run
  });
}

export function mapDeletedArtifactFile(input: {
  repo_name: string;
  path: string;
  format: string;
  deleted: boolean;
}) {
  return asItemResult(`Deleted artifact file ${input.path}`, {
    id: input.path,
    repositoryName: input.repo_name,
    format: input.format,
    deleted: input.deleted,
    executed: true
  });
}

type ArtifactDeleteFileClient = {
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
  deleteFile: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    deleted: boolean;
  }>;
};

export function createArtifactDeleteFileHandler(client: ArtifactDeleteFileClient) {
  return async (input: unknown) => {
    const parsed = artifactDeleteFileInput.parse(input);

    if (parsed.dry_run) {
      const file = await client.getFile(parsed);
      const result = previewArtifactDeleteFile({
        ...parsed,
        file_name: file.name,
        size: file.size
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteFile(parsed);
    const result = mapDeletedArtifactFile({
      repo_name: parsed.repo_name,
      path: response.path,
      format: parsed.format,
      deleted: response.deleted
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
