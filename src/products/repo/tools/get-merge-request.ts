import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetMergeRequestInput } from "../schemas.js";

export function mapMergeRequestDetail(input: {
  id: number | string;
  iid?: number;
  repository_id?: number | string;
  title?: string;
  description?: string;
  state?: string;
  source_branch?: string;
  target_branch?: string;
  created_at?: string;
  updated_at?: string;
  author?: { name?: string; nick_name?: string };
  web_url?: string;
}) {
  return asItemResult(`Loaded merge request ${input.iid ?? input.id}`, {
    id: String(input.id),
    iid: input.iid,
    repositoryId: input.repository_id === undefined ? undefined : String(input.repository_id),
    title: input.title,
    description: input.description,
    state: input.state,
    sourceBranch: input.source_branch,
    targetBranch: input.target_branch,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    authorName: input.author?.name,
    authorNickName: input.author?.nick_name,
    webUrl: input.web_url
  });
}

type RepoGetMergeRequestClient = {
  getMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    created_at?: string;
    updated_at?: string;
    author?: { name?: string; nick_name?: string };
    web_url?: string;
  }>;
};

export function createRepoGetMergeRequestHandler(client: RepoGetMergeRequestClient) {
  return async (input: unknown) => {
    const parsed = repoGetMergeRequestInput.parse(input);
    const response = await client.getMergeRequest(parsed);
    const result = mapMergeRequestDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
