import { repoListCommitAssociatedRefsInput } from "../schemas.js";
import { mapCommitAssociatedRefs } from "./repository-browse-result.js";

type RepoListCommitAssociatedRefsClient = {
  listCommitAssociatedRefs: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
    type: "branch" | "tag";
  }) => Promise<{
    refs: string[];
    total?: number;
  }>;
};

export function createRepoListCommitAssociatedRefsHandler(client: RepoListCommitAssociatedRefsClient) {
  return async (input: unknown) => {
    const parsed = repoListCommitAssociatedRefsInput.parse(input);
    const response = await client.listCommitAssociatedRefs(parsed);
    const result = mapCommitAssociatedRefs(response.refs, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
