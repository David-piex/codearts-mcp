import { repoListProjectMergeRequestsInput } from "../schemas.js";
import { mapMergeRequests } from "./list-merge-requests.js";

type Client = {
  listProjectMergeRequests: (input: {
    project_id: string;
    page: number;
    page_size: number;
    state?: "all" | "opened" | "closed" | "locked" | "merged";
    order_by?: "created_at" | "updated_at" | "title";
    sort?: "asc" | "desc";
    author_id?: string | number;
    source_branch?: string;
    target_branch?: string;
    search?: string;
    source_repository_id?: string;
  }) => Promise<{
    merge_requests: Array<{
      id: number | string;
      iid?: number;
      title?: string;
      state?: string;
      source_branch?: string;
      target_branch?: string;
      created_at?: string;
      updated_at?: string;
      author?: { name?: string; nick_name?: string };
      web_url?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListProjectMergeRequestsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListProjectMergeRequestsInput.parse(input);
    const response = await client.listProjectMergeRequests(parsed);
    const result = mapMergeRequests(response.merge_requests, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
