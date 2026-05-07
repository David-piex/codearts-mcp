import type { RepoTenantKmsGrant } from "../client.js";
import { repoShowTenantKMSGrantInput } from "../schemas.js";
import { mapTenantKmsGrant } from "./tenant-result.js";

type RepoShowTenantKmsGrantClient = {
  showTenantKMSGrant: (input: {
    tenant_id: string;
  }) => Promise<RepoTenantKmsGrant>;
};

export function createRepoShowTenantKmsGrantHandler(client: RepoShowTenantKmsGrantClient) {
  return async (input: unknown) => {
    const parsed = repoShowTenantKMSGrantInput.parse(input);
    const response = await client.showTenantKMSGrant(parsed);
    const result = mapTenantKmsGrant("Fetched tenant KMS grant status", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
