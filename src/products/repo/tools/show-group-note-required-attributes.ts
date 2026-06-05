import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoShowGroupNoteRequiredAttributesInput } from "../schemas.js";
import { mapNoteRequiredAttributes } from "./repository-browse-result.js";

type RepoShowGroupNoteRequiredAttributesClient = {
  showGroupNoteRequiredAttributes: (input: { group_id: string }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoShowGroupNoteRequiredAttributesHandler(client: RepoShowGroupNoteRequiredAttributesClient) {
  return async (input: unknown) => {
    const parsed = repoShowGroupNoteRequiredAttributesInput.parse(input);
    const response = await client.showGroupNoteRequiredAttributes(parsed);
    const result = mapNoteRequiredAttributes(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
