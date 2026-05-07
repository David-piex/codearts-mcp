import type { RepoTenantCMK } from "../client.js";
import { repoListTenantCMKsInput } from "../schemas.js";
import { mapTenantCMKsList } from "./tenant-result.js";

type RepoListTenantCMKsClient = {
  listTenantCMKs: (input: {
    tenant_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    cmks: RepoTenantCMK[];
    total?: number;
  }>;
};

export function createRepoListTenantCMKsHandler(client: RepoListTenantCMKsClient) {
  return async (input: unknown) => {
    const parsed = repoListTenantCMKsInput.parse(input);
    const response = await client.listTenantCMKs(parsed);
    const result = mapTenantCMKsList(
      `${response.cmks.length} tenant CMKs found${response.total !== undefined ? ` (total: ${response.total})` : ""}`,
      response.cmks,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
