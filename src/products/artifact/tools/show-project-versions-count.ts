import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowProjectVersionsCountInput } from "../schemas.js";

export function mapArtifactProjectVersionsCount(input: {
  project_id: string;
  count?: number;
  raw?: unknown;
}) {
  return asItemResult(
    `Loaded artifact version count for project ${input.project_id}`,
    {
      id: input.project_id,
      projectId: input.project_id,
      count: input.count
    },
    input.raw
  );
}

type ArtifactShowProjectVersionsCountClient = {
  showProjectVersionsCount: (input: {
    project_id: string;
    name?: string;
    status?: string;
  }) => Promise<{
    count?: number;
    total?: number;
    raw?: unknown;
  }>;
};

export function createArtifactShowProjectVersionsCountHandler(
  client: ArtifactShowProjectVersionsCountClient
) {
  return async (input: unknown) => {
    const parsed = artifactShowProjectVersionsCountInput.parse(input);
    const response = await client.showProjectVersionsCount(parsed);
    const result = mapArtifactProjectVersionsCount({
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
