import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetBranchInput } from "../schemas.js";

export function mapRepoBranch(input: {
  name: string;
  protected?: boolean;
  default?: boolean;
  can_push?: boolean;
  web_url?: string;
  commit?: {
    id?: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    created_at?: string;
  };
}) {
  return asItemResult(`Loaded branch ${input.name}`, {
    id: input.name,
    name: input.name,
    protected: input.protected,
    default: input.default,
    canPush: input.can_push,
    webUrl: input.web_url,
    commit: input.commit
      ? {
          id: input.commit.id,
          shortId: input.commit.short_id,
          title: input.commit.title,
          authorName: input.commit.author_name,
          createdAt: input.commit.created_at
        }
      : undefined
  });
}

type RepoGetBranchClient = {
  getBranch: (input: { repository_id: string; branch_name: string }) => Promise<{
    name: string;
    protected?: boolean;
    default?: boolean;
    can_push?: boolean;
    web_url?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
};

export function createRepoGetBranchHandler(client: RepoGetBranchClient) {
  return async (input: unknown) => {
    const parsed = repoGetBranchInput.parse(input);
    const response = await client.getBranch(parsed);
    const result = mapRepoBranch(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
