import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedTag } from "../client.js";
import { repoBatchCreateProtectedTagsInput } from "../schemas.js";
import { mapProtectedTagList, previewProtectedTagMutation, type ProtectedTagActionInput } from "./protected-tag-result.js";

type RepoBatchCreateProtectedTagsClient = {
  batchCreateProtectedTags: (input: {
    repository_id: string;
    names: string[];
    actions?: ProtectedTagActionInput[];
  }) => Promise<{
    tags: RepoProtectedTag[];
    total?: number;
  }>;
};

export function createRepoBatchCreateProtectedTagsHandler(client: RepoBatchCreateProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoBatchCreateProtectedTagsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: batch create protected tags", previewProtectedTagMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchCreateProtectedTags(parsed);
    const result = mapProtectedTagList(
      `Created ${response.tags.length} protected tags`,
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
