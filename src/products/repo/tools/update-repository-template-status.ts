import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateRepositoryTemplateStatusInput } from "../schemas.js";
import {
  mapRepositoryTemplateStatusMutation,
  previewRepositorySimpleMutation
} from "./repository-settings-result.js";

type RepoUpdateRepositoryTemplateStatusClient = {
  updateRepositoryTemplateStatus: (input: {
    x_auth_token: string;
    repository_uuid: string;
    template_type: "SHARE" | "PUBLIC";
    code_title?: string;
    creator_name?: string;
    code_description?: string;
    languages?: string[];
    plateform?: string[];
    entertype?: string[];
  }) => Promise<{
    result?: string | null;
    status?: string;
  }>;
};

export function createRepoUpdateRepositoryTemplateStatusHandler(client: RepoUpdateRepositoryTemplateStatusClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryTemplateStatusInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewRepositorySimpleMutation("Dry run: update repository template status", {
        repositoryUuid: parsed.repository_uuid,
        tokenProvided: true,
        templateType: parsed.template_type,
        codeTitle: parsed.code_title,
        creatorName: parsed.creator_name,
        codeDescription: parsed.code_description,
        languages: parsed.languages,
        plateform: parsed.plateform,
        entertype: parsed.entertype
      });
      const result = asItemResult(preview.summary, preview.item);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateRepositoryTemplateStatus(request);
    const result = mapRepositoryTemplateStatusMutation("Updated repository template status", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
