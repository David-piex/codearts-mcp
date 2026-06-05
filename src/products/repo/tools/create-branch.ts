import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateBranchInput } from "../schemas.js";
import { mapRepoBranch } from "./get-branch.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoCreateBranchClient = {
  createBranch: (input: {
    repository_id: string;
    branch: string;
    ref: string;
    description?: string;
    related_ids?: string[];
  }) => Promise<{
    name: string;
    protected?: boolean;
    default?: boolean;
    can_delete?: boolean;
    can_read?: boolean;
    can_download?: boolean;
    can_push?: boolean;
    web_url?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
    merged?: boolean;
    created_at?: string;
    description?: string;
    create_source?: string;
    create_source_exists?: boolean;
  }>;
};

export function createRepoCreateBranchHandler(client: RepoCreateBranchClient) {
  return async (input: unknown) => {
    const parsed = repoCreateBranchInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: create repository branch", {
        repositoryId: parsed.repository_id,
        branch: parsed.branch,
        ref: parsed.ref,
        description: parsed.description,
        relatedIds: parsed.related_ids
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createBranch(request);
    const branch = mapRepoBranch(response);
    const result = asItemResult("Created repository branch", {
      ...branch.item,
      canDelete: response.can_delete,
      canRead: response.can_read,
      canDownload: response.can_download,
      merged: response.merged,
      createdAt: response.created_at,
      description: response.description,
      createSource: response.create_source,
      createSourceExists: response.create_source_exists,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
