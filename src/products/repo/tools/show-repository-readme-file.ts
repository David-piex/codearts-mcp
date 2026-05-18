import type { RepoReadmeFile } from "../client.js";
import { repoShowRepositoryReadmeFileInput } from "../schemas.js";
import { mapRepositoryReadmeFile } from "./repository-browse-result.js";

type RepoShowRepositoryReadmeFileClient = {
  showRepositoryReadmeFile: (input: { repository_id: string }) => Promise<RepoReadmeFile>;
};

export function createRepoShowRepositoryReadmeFileHandler(client: RepoShowRepositoryReadmeFileClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryReadmeFileInput.parse(input);
    const response = await client.showRepositoryReadmeFile(parsed);
    const result = mapRepositoryReadmeFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
