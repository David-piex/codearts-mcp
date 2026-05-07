import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProtectedBranch } from "../client.js";
import { repoCreateProjectProtectedBranchesInput } from "../schemas.js";
import {
  mapProtectedBranchItem,
  previewProtectedBranchMutation,
  type ProtectedBranchActionInput
} from "./protected-branch-result.js";

type RepoCreateProjectProtectedBranchesClient = {
  createProjectProtectedBranches: (input: {
    project_id: string;
    name: string;
    actions?: ProtectedBranchActionInput[];
  }) => Promise<RepoProtectedBranch>;
};

export function createRepoCreateProjectProtectedBranchesHandler(client: RepoCreateProjectProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoCreateProjectProtectedBranchesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create project protected branch", {
        ...previewProtectedBranchMutation({
          repository_id: parsed.project_id,
          names: [parsed.name],
          actions: parsed.actions,
          dry_run: parsed.dry_run
        }),
        projectId: parsed.project_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectProtectedBranches(parsed);
    const result = mapProtectedBranchItem("Created project protected branch", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
