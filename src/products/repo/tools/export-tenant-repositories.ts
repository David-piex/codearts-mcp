import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTenantRepository } from "../client.js";
import { repoExportTenantRepositoriesInput } from "../schemas.js";
import { previewTenantRepositoryExport } from "./tenant-mutation-result.js";

type RepoExportTenantRepositoriesClient = {
  exportTenantRepositories: (input: {
    repository_ids?: Array<string | number>;
  }) => Promise<{
    status?: string;
  }>;
};

export function createRepoExportTenantRepositoriesHandler(client: RepoExportTenantRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoExportTenantRepositoriesInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantRepositoryExport(parsed);
      return {
        content: [{ type: "text" as const, text: "Prepared tenant repository export" }],
        structuredContent: asItemResult("Prepared tenant repository export", preview)
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.exportTenantRepositories(request);
    const result = asItemResult("Exported tenant repositories", {
      status: response.status ?? "success"
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
