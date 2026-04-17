import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetTagInput } from "../schemas.js";

export function mapRepoTag(input: {
  name: string;
  message?: string;
  target?: string;
  commit?: {
    id?: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    created_at?: string;
  };
}) {
  return asItemResult(`Loaded tag ${input.name}`, {
    id: input.name,
    name: input.name,
    message: input.message,
    target: input.target,
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

type RepoGetTagClient = {
  getTag: (input: { repository_id: string; tag_name: string }) => Promise<{
    name: string;
    message?: string;
    target?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
};

export function createRepoGetTagHandler(client: RepoGetTagClient) {
  return async (input: unknown) => {
    const parsed = repoGetTagInput.parse(input);
    const response = await client.getTag(parsed);
    const result = mapRepoTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
