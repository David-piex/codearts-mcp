import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedTag } from "../client.js";
import { repoBatchUpdateProtectedTagsInput } from "../schemas.js";
import { mapProtectedTagList, previewProtectedTagMutation, type ProtectedTagActionInput } from "./protected-tag-result.js";

type RepoBatchUpdateProtectedTagsClient = {
  batchUpdateProtectedTags: (input: {
    repository_id: string;
    names: string[];
    actions: ProtectedTagActionInput[];
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
};

export function createRepoBatchUpdateProtectedTagsHandler(client: RepoBatchUpdateProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoBatchUpdateProtectedTagsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: batch update protected tags", previewProtectedTagMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateProtectedTags(parsed);
    const result = mapProtectedTagList(
      `Updated ${response.tags.length} protected tags`,
      response.tags,
      1,
      response.tags.length || parsed.names.length,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
