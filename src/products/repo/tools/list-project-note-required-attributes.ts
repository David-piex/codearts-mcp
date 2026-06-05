import type { RepoNoteRequiredAttributes } from "../client.js";
import { repoListProjectNoteRequiredAttributesInput } from "../schemas.js";
import { mapNoteRequiredAttributes } from "./repository-browse-result.js";

type RepoListProjectNoteRequiredAttributesClient = {
  listProjectNoteRequiredAttributes: (input: { project_id: string }) => Promise<RepoNoteRequiredAttributes>;
};

export function createRepoListProjectNoteRequiredAttributesHandler(client: RepoListProjectNoteRequiredAttributesClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectNoteRequiredAttributesInput.parse(input);
    const response = await client.listProjectNoteRequiredAttributes(parsed);
    const result = mapNoteRequiredAttributes(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
