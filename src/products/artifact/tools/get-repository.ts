import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactGetRepositoryInput } from "../schemas.js";

export function mapArtifactRepository(input: {
  id: string;
  name: string;
  project_id?: string;
  format?: string;
  description?: string;
}) {
  return asItemResult(`Loaded artifact repository ${input.name}`, {
    id: input.id,
    repositoryId: input.id,
    name: input.name,
    projectId: input.project_id,
    format: input.format,
    description: input.description
  });
}

type ArtifactGetRepositoryClient = {
  getRepository: (input: { repository_id: string }) => Promise<{
    id: string;
    name: string;
    project_id?: string;
    format?: string;
    description?: string;
  }>;
};

export function createArtifactGetRepositoryHandler(client: ArtifactGetRepositoryClient) {
  return async (input: unknown) => {
    const parsed = artifactGetRepositoryInput.parse(input);
    const response = await client.getRepository(parsed);
    const result = mapArtifactRepository(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
