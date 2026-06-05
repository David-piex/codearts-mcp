import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoUpdateGroupGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type Client = {
  updateGroupGeneralPolicy: (input: {
    group_id: string;
    disable_fork?: boolean;
    branch_name_regex?: string;
    tag_name_regex?: string;
    generate_pre_merge_ref?: boolean;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoUpdateGroupGeneralPolicyHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateGroupGeneralPolicyInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update group general policy", {
        groupId: parsed.group_id,
        disableFork: parsed.disable_fork,
        branchNameRegex: parsed.branch_name_regex,
        tagNameRegex: parsed.tag_name_regex,
        generatePreMergeRef: parsed.generate_pre_merge_ref,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateGroupGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Updated group general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
