import type { RepoProtectedTag } from "../client.js";
import { repoListProjectProtectedTagsInput } from "../schemas.js";
import { mapProtectedTagList } from "./protected-tag-result.js";

type RepoListProjectProtectedTagsClient = {
  listProjectProtectedTags: (input: {
    project_id: string;
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
};

export function createRepoListProjectProtectedTagsHandler(client: RepoListProjectProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectProtectedTagsInput.parse(input);
    const response = await client.listProjectProtectedTags(parsed);
    const result = mapProtectedTagList(
      `${response.tags.length} project protected tags found`,
      response.tags,
      1,
      response.tags.length || response.total || 1,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
