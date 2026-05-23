import type { RepoFileContent } from "../client.js";
import { repoGetRepositoryFileContentV4Input } from "../schemas.js";
import { mapRepositoryFileContentV4 } from "./repository-browse-result.js";

type Client = {
  getRepositoryFileContentV4: (input: {
    repository_id: string;
    file_path: string;
    sha: string;
  }) => Promise<RepoFileContent>;
};

export function createRepoGetRepositoryFileContentV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryFileContentV4Input.parse(input);
    const response = await client.getRepositoryFileContentV4(parsed);
    const result = mapRepositoryFileContentV4(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
