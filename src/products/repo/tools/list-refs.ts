import { repoListRefsInput } from "../schemas.js";
import { mapRefs } from "./repository-navigation-result.js";

type RepoListRefsClient = {
  listRefs: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    type?: "branch" | "tag";
    search?: string;
  }) => Promise<{
    refs: string[];
    total?: number;
  }>;
};

export function createRepoListRefsHandler(client: RepoListRefsClient) {
  return async (input: unknown) => {
    const parsed = repoListRefsInput.parse(input);
    const response = await client.listRefs(parsed);
    const result = mapRefs(response.refs, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
