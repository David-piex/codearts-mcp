import { repoListPersonalMergeRequestsInput } from "../schemas.js";
import { mapMergeRequests } from "./list-merge-requests.js";

type RepoListPersonalMergeRequestsClient = {
  listPersonalMergeRequests: (input: {
    page: number;
    page_size: number;
    state: "all" | "opened" | "closed" | "locked" | "merged";
    order_by?: "created_at" | "updated_at" | "merged_at";
    sort?: "asc" | "desc";
    labels?: string;
    created_before?: string;
    created_after?: string;
    updated_after?: string;
    updated_before?: string;
    view?: "simple" | "basic";
    author_id?: string;
    scope?: "created_by_me" | "assigned_to_me" | "need_my_review" | "need_my_approve" | "all";
    source_branch?: string;
    target_branch?: string;
    search?: string;
    wip?: string;
    merged_by?: string;
    merged_after?: string;
    merged_before?: string;
    only_count?: boolean;
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

export function createRepoListPersonalMergeRequestsHandler(client: RepoListPersonalMergeRequestsClient) {
  return async (input: unknown) => {
    const parsed = repoListPersonalMergeRequestsInput.parse(input);
    const response = await client.listPersonalMergeRequests(parsed);
    const result = mapMergeRequests(response.merge_requests, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
