import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoShowNoteRequiredAttributesInput } from "../schemas.js";
import { mapNoteRequiredAttributes } from "./repository-browse-result.js";

type RepoShowNoteRequiredAttributesClient = {
  showNoteRequiredAttributes: (input: { repository_id: string }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoShowNoteRequiredAttributesHandler(client: RepoShowNoteRequiredAttributesClient) {
  return async (input: unknown) => {
    const parsed = repoShowNoteRequiredAttributesInput.parse(input);
    const response = await client.showNoteRequiredAttributes(parsed);
    const result = mapNoteRequiredAttributes(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
