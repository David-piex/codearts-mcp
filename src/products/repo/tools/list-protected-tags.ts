import type { RepoProtectedTag } from "../client.js";
import { repoListProtectedTagsInput } from "../schemas.js";
import { mapProtectedTagList } from "./protected-tag-result.js";

type RepoListProtectedTagsClient = {
  listProtectedTags: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
};

export function createRepoListProtectedTagsHandler(client: RepoListProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoListProtectedTagsInput.parse(input);
    const response = await client.listProtectedTags(parsed);
    const result = mapProtectedTagList(
      `${response.tags.length} protected tags found`,
      response.tags,
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
