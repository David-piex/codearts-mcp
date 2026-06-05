import type { RepoMergeRequestVersion } from "../client.js";
import { repoListMergeRequestVersionsInput } from "../schemas.js";
import { mapMergeRequestVersions } from "./merge-request-read-result.js";

type RepoListMergeRequestVersionsClient = {
  listMergeRequestVersions: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    versions: RepoMergeRequestVersion[];
    total?: number;
  }>;
};

export function createRepoListMergeRequestVersionsHandler(
  client: RepoListMergeRequestVersionsClient
) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestVersionsInput.parse(input);
    const response = await client.listMergeRequestVersions(parsed);
    const result = mapMergeRequestVersions(
      response.versions,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
