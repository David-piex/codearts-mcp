import { repoCreateGroupInput } from "../schemas.js";
import type { RepoRepositorySummary } from "../client.js";
import { mapGroupSummary, previewGroupMutation } from "./group-result.js";

type Client = {
  createGroup: (input: {
    project_id: string;
    name: string;
    visibility: "private" | "internal" | "public";
    description?: string;
  }) => Promise<RepoRepositorySummary>;
};

export function createRepoCreateGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoCreateGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGroupMutation("Dry run: create group", {
        projectId: parsed.project_id,
        name: parsed.name,
        visibility: parsed.visibility,
        description: parsed.description
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createGroup(parsed);
    const result = mapGroupSummary(`Created group ${response.name ?? parsed.name}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
