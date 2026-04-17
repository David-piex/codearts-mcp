import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetCommitInput } from "../schemas.js";

export function mapRepoCommit(input: {
  id: string;
  short_id?: string;
  title?: string;
  author_name?: string;
  message?: string;
}) {
  return asItemResult(`Loaded commit ${input.id}`, {
    id: input.id,
    shortId: input.short_id,
    title: input.title,
    authorName: input.author_name,
    message: input.message
  });
}

type RepoGetCommitClient = {
  getCommit: (input: { repository_id: string; commit_sha: string }) => Promise<{
    id: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    message?: string;
  }>;
};

export function createRepoGetCommitHandler(client: RepoGetCommitClient) {
  return async (input: unknown) => {
    const parsed = repoGetCommitInput.parse(input);
    const response = await client.getCommit(parsed);
    const result = mapRepoCommit(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
