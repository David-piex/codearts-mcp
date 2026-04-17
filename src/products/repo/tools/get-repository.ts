import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetRepositoryInput } from "../schemas.js";

export function mapRepositoryDetail(input: {
  id: number | string;
  name: string;
  description?: string;
  default_branch?: string;
  ssh_url_to_repo?: string;
  http_url_to_repo?: string;
  project_id?: string;
  project_name?: string;
}) {
  return asItemResult(`Loaded repository ${input.name}`, {
    id: String(input.id),
    name: input.name,
    description: input.description,
    defaultBranch: input.default_branch,
    sshUrl: input.ssh_url_to_repo,
    httpUrl: input.http_url_to_repo,
    projectId: input.project_id,
    projectName: input.project_name
  });
}

type RepoGetRepositoryClient = {
  getRepository: (input: { repository_id: string }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    default_branch?: string;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    project_id?: string;
    project_name?: string;
  }>;
};

export function createRepoGetRepositoryHandler(client: RepoGetRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryInput.parse(input);
    const response = await client.getRepository(parsed);
    const result = mapRepositoryDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
