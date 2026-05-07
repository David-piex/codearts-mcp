import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedTag } from "../client.js";
import { repoCreateProjectProtectedTagsInput } from "../schemas.js";
import { mapProtectedTagItem } from "./protected-tag-result.js";

type ProjectProtectedTagActionInput = {
  action?: "read" | "create-delete" | "create";
  enable?: boolean;
  user_ids?: Array<string | number>;
  user_team_ids?: Array<string | number>;
  related_role_ids?: string[];
  user_names?: string[];
  user_team_names?: string[];
};

type RepoCreateProjectProtectedTagsClient = {
  createProjectProtectedTags: (input: {
    project_id: string;
    name: string;
    actions?: ProjectProtectedTagActionInput[];
  }) => Promise<RepoProtectedTag>;
};

export function createRepoCreateProjectProtectedTagsHandler(client: RepoCreateProjectProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoCreateProjectProtectedTagsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create project protected tag", {
        projectId: parsed.project_id,
        names: [parsed.name],
        actionCount: parsed.actions?.length ?? 0,
        actions: (parsed.actions ?? []).map((action) => ({
          action: action.action,
          enable: action.enable,
          userCount: action.user_ids?.length ?? 0,
          userNameCount: action.user_names?.length ?? 0,
          userTeamCount: action.user_team_ids?.length ?? 0,
          userTeamNameCount: action.user_team_names?.length ?? 0,
          roleCount: action.related_role_ids?.length ?? 0
        })),
        executed: !parsed.dry_run
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectProtectedTags(parsed);
    const result = mapProtectedTagItem("Created project protected tag", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
