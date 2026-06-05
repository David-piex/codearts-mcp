import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoUpdateNoteRequiredAttributesInput } from "../schemas.js";
import {
  mapNoteRequiredAttributesResult,
  previewNoteRequiredAttributesMutation
} from "./repository-browse-result.js";

type Client = {
  updateNoteRequiredAttributes: (input: {
    repository_id: string;
    is_assignee_id_required?: boolean;
    is_review_categories_required?: boolean;
    is_review_modules_required?: boolean;
  }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoUpdateNoteRequiredAttributesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateNoteRequiredAttributesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewNoteRequiredAttributesMutation("Dry run: update repository note required attributes", {
        repositoryId: parsed.repository_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateNoteRequiredAttributes(request);
    const result = mapNoteRequiredAttributesResult("Updated repository note required attributes", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
