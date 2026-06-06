import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateRepositoryPipelineInput } from "../schemas.js";
import {
  mapRepositoryPipelineMutation,
  previewRepositorySimpleMutation
} from "./repository-settings-result.js";

type RepoUpdateRepositoryPipelineClient = {
  updateRepositoryPipeline: (input: {
    x_auth_token: string;
    repository_uuid: string;
  }) => Promise<{
    repository_uuid: string;
    result?: boolean;
    status?: string;
  }>;
};

export function createRepoUpdateRepositoryPipelineHandler(client: RepoUpdateRepositoryPipelineClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryPipelineInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewRepositorySimpleMutation("Dry run: update repository pipeline state", {
        repositoryUuid: parsed.repository_uuid,
        tokenProvided: true
      });
      const result = asItemResult(preview.summary, preview.item);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateRepositoryPipeline(request);
    const result = mapRepositoryPipelineMutation("Updated repository pipeline state", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
