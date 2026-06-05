import type { RepoCommitDiffMetadata } from "../client.js";
import { repoShowCommitDiffMetadataInput } from "../schemas.js";
import { mapCommitDiffMetadata } from "./repository-navigation-result.js";

type RepoShowCommitDiffMetadataClient = {
  showCommitDiffMetadata: (input: {
    repository_id: string;
    sha: string;
  }) => Promise<RepoCommitDiffMetadata>;
};

export function createRepoShowCommitDiffMetadataHandler(client: RepoShowCommitDiffMetadataClient) {
  return async (input: unknown) => {
    const parsed = repoShowCommitDiffMetadataInput.parse(input);
    const response = await client.showCommitDiffMetadata(parsed);
    const result = mapCommitDiffMetadata(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
