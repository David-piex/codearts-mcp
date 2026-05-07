import type { RepoProtectedTag } from "../client.js";
import { repoGetProtectedTagInput } from "../schemas.js";
import { mapProtectedTagItem } from "./protected-tag-result.js";

type RepoGetProtectedTagClient = {
  getProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<RepoProtectedTag>;
};

export function createRepoGetProtectedTagHandler(client: RepoGetProtectedTagClient) {
  return async (input: unknown) => {
    const parsed = repoGetProtectedTagInput.parse(input);
    const response = await client.getProtectedTag(parsed);
    const result = mapProtectedTagItem("Fetched protected tag", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
