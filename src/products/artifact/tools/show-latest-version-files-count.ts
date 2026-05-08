import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowLatestVersionFilesCountInput } from "../schemas.js";

export function mapArtifactLatestVersionFilesCount(input: {
  project_id: string;
  count?: number;
  raw?: unknown;
}) {
  return asItemResult(
    `Loaded latest artifact file count for project ${input.project_id}`,
    {
      id: input.project_id,
      projectId: input.project_id,
      count: input.count
    },
    input.raw
  );
}

type ArtifactShowLatestVersionFilesCountClient = {
  showLatestVersionFilesCount: (input: {
    project_id: string;
    name?: string;
    status?: string;
  }) => Promise<{
    count?: number;
    total?: number;
    raw?: unknown;
  }>;
};

export function createArtifactShowLatestVersionFilesCountHandler(
  client: ArtifactShowLatestVersionFilesCountClient
) {
  return async (input: unknown) => {
    const parsed = artifactShowLatestVersionFilesCountInput.parse(input);
    const response = await client.showLatestVersionFilesCount(parsed);
    const result = mapArtifactLatestVersionFilesCount({
      project_id: parsed.project_id,
      count: response.count ?? response.total,
      raw: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
