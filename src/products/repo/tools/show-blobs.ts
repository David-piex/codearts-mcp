import type { RepoBlob } from "../client.js";
import { repoShowBlobsInput } from "../schemas.js";
import { mapBlobs } from "./repository-navigation-result.js";

type RepoShowBlobsClient = {
  showBlobs: (input: { repository_id: string; blob_id: string }) => Promise<{
    blobs: RepoBlob[];
    total?: number;
  }>;
};

export function createRepoShowBlobsHandler(client: RepoShowBlobsClient) {
  return async (input: unknown) => {
    const parsed = repoShowBlobsInput.parse(input);
    const response = await client.showBlobs(parsed);
    const result = mapBlobs(response.blobs, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
