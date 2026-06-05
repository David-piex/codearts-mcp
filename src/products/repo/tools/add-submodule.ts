import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoSubmoduleMutationResult } from "../client.js";
import { repoAddSubmoduleInput } from "../schemas.js";
import {
  mapSubmoduleMutationResult,
  previewSubmoduleMutation
} from "./user-settings-result.js";

type Client = {
  addSubmodule: (input: {
    repository_id: string;
    branch_name: string;
    file_path: string;
    subrepo_id: string;
    commit_message: string;
    subrepo_branch: string;
  }) => Promise<RepoSubmoduleMutationResult>;
};

export function createRepoAddSubmoduleHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoAddSubmoduleInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: add repository submodule", previewSubmoduleMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.addSubmodule(request);
    const result = mapSubmoduleMutationResult("Added repository submodule", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
