import type { RepoMergeRequestTemplate } from "../client.js";
import { repoCreateGroupMergeRequestTemplateInput } from "../schemas.js";
import {
  mapMergeRequestTemplate,
  previewMergeRequestTemplateMutation
} from "./merge-request-settings-result.js";

type RepoCreateGroupMergeRequestTemplateClient = {
  createGroupMergeRequestTemplate: (input: {
    group_id: string;
    template_name: string;
    merge_request_title?: string;
    description?: string;
    auto_extract_mr_title?: number;
    is_wip?: boolean;
    is_default?: boolean;
  }) => Promise<RepoMergeRequestTemplate>;
};

export function createRepoCreateGroupMergeRequestTemplateHandler(client: RepoCreateGroupMergeRequestTemplateClient) {
  return async (input: unknown) => {
    const parsed = repoCreateGroupMergeRequestTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewMergeRequestTemplateMutation("Dry run: create group merge request template", {
        groupId: parsed.group_id,
        templateName: parsed.template_name,
        mergeRequestTitle: parsed.merge_request_title,
        description: parsed.description,
        autoExtractMrTitle: parsed.auto_extract_mr_title,
        isWip: parsed.is_wip,
        isDefault: parsed.is_default
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createGroupMergeRequestTemplate(parsed);
    const result = mapMergeRequestTemplate(response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
