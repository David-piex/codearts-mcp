import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowProjectStorageInfoInput } from "../schemas.js";

export function mapArtifactProjectStorageInfo(input: {
  project_id: string;
  used?: string;
  total?: string;
  file_count?: number;
  raw?: unknown;
}) {
  return asItemResult(
    `Loaded artifact storage info for project ${input.project_id}`,
    {
      id: input.project_id,
      projectId: input.project_id,
      used: input.used,
      total: input.total,
      fileCount: input.file_count
    },
    input.raw
  );
}

type ArtifactShowProjectStorageInfoClient = {
  showProjectStorageInfo: (input: {
    project_id: string;
    status?: string;
  }) => Promise<{
    used?: string;
    total?: string;
    file_count?: number;
    raw?: unknown;
  }>;
};

export function createArtifactShowProjectStorageInfoHandler(
  client: ArtifactShowProjectStorageInfoClient
) {
  return async (input: unknown) => {
    const parsed = artifactShowProjectStorageInfoInput.parse(input);
    const response = await client.showProjectStorageInfo(parsed);
    const result = mapArtifactProjectStorageInfo({
      project_id: parsed.project_id,
      ...response
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
