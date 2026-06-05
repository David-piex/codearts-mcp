import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoUpdateProjectNoteRequiredAttributesInput } from "../schemas.js";
import {
  mapNoteRequiredAttributesResult,
  previewNoteRequiredAttributesMutation
} from "./repository-browse-result.js";

type Client = {
  updateProjectNoteRequiredAttributes: (input: {
    project_id: string;
    is_assignee_id_required?: boolean;
    is_review_categories_required?: boolean;
    is_review_modules_required?: boolean;
  }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoUpdateProjectNoteRequiredAttributesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectNoteRequiredAttributesInput.parse(input);

    if (parsed.dry_run) {
      const result = previewNoteRequiredAttributesMutation("Dry run: update project note required attributes", {
        projectId: parsed.project_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateProjectNoteRequiredAttributes(request);
    const result = mapNoteRequiredAttributesResult("Updated project note required attributes", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
