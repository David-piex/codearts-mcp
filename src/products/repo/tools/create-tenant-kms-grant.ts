import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTenantKmsGrant } from "../client.js";
import { repoCreateTenantKMSGrantInput } from "../schemas.js";
import { mapTenantKmsGrant } from "./tenant-result.js";
import { previewTenantKmsGrantMutation } from "./tenant-mutation-result.js";

type RepoCreateTenantKmsGrantClient = {
  createTenantKMSGrant: (input: {
    tenant_id: string;
    key?: string | null;
    title?: string | number;
  }) => Promise<RepoTenantKmsGrant>;
};

export function createRepoCreateTenantKmsGrantHandler(client: RepoCreateTenantKmsGrantClient) {
  return async (input: unknown) => {
    const parsed = repoCreateTenantKMSGrantInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantKmsGrantMutation(parsed);
      const result = asItemResult("Prepared tenant KMS grant creation", preview);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createTenantKMSGrant(request);
    const result = mapTenantKmsGrant("Created tenant KMS grant", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
