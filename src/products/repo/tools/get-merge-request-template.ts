import type { RepoMergeRequestTemplate } from "../client.js";
import { repoGetMergeRequestTemplateInput } from "../schemas.js";
import { mapMergeRequestTemplate } from "./merge-request-settings-result.js";

type RepoGetMergeRequestTemplateClient = {
  getMergeRequestTemplate: (input: {
    repository_id: string;
    template_id: string;
  }) => Promise<RepoMergeRequestTemplate>;
};

export function createRepoGetMergeRequestTemplateHandler(client: RepoGetMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoGetMergeRequestTemplateInput.parse(input);
    const response = await client.getMergeRequestTemplate(parsed);
    const result = mapMergeRequestTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
