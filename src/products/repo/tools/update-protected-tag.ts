import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedTag } from "../client.js";
import { repoUpdateProtectedTagInput } from "../schemas.js";
import { mapProtectedTagItem, previewProtectedTagMutation, type ProtectedTagActionInput } from "./protected-tag-result.js";

type RepoUpdateProtectedTagClient = {
  updateProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
    actions: ProtectedTagActionInput[];
  }) => Promise<RepoProtectedTag>;
};

export function createRepoUpdateProtectedTagHandler(client: RepoUpdateProtectedTagClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateProtectedTagInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update protected tag", previewProtectedTagMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProtectedTag(parsed);
    const result = mapProtectedTagItem("Updated protected tag", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
