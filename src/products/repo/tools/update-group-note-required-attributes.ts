import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoUpdateGroupNoteRequiredAttributesInput } from "../schemas.js";
import {
  mapNoteRequiredAttributesResult,
  previewNoteRequiredAttributesMutation
} from "./repository-browse-result.js";

type Client = {
  updateGroupNoteRequiredAttributes: (input: {
    group_id: string;
    is_assignee_id_required?: boolean;
    is_review_categories_required?: boolean;
    is_review_modules_required?: boolean;
  }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoUpdateGroupNoteRequiredAttributesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateGroupNoteRequiredAttributesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewNoteRequiredAttributesMutation("Dry run: update group note required attributes", {
        groupId: parsed.group_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateGroupNoteRequiredAttributes(request);
    const result = mapNoteRequiredAttributesResult("Updated group note required attributes", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
