import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoUpdateProjectGeneralPolicyInput } from "../schemas.js";
import {
  mapProjectGeneralPolicy,
  previewProjectGeneralPolicyMutation
} from "./project-settings-result.js";

type RepoUpdateProjectGeneralPolicyClient = {
  updateProjectGeneralPolicy: (input: {
    project_id: string;
    disable_fork?: boolean;
    branch_name_regex?: string;
    tag_name_regex?: string;
    generate_pre_merge_ref?: boolean;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoUpdateProjectGeneralPolicyHandler(
  client: RepoUpdateProjectGeneralPolicyClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectGeneralPolicyInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update project general policy",
        previewProjectGeneralPolicyMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Updated project general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
