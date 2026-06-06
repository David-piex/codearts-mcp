import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoVerifyUserSshPrivateKeyResult } from "../client.js";
import { repoVerifyUserSshPrivateKeyInput } from "../schemas.js";

export function previewVerifyUserSshPrivateKey(input: {
  x_auth_token: string;
  repository_uuid: string;
  private_key: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: verify current user SSH private key", {
    repositoryUuid: input.repository_uuid,
    tokenProvided: input.x_auth_token.length > 0,
    privateKeyProvided: input.private_key.length > 0,
    executed: !input.dry_run
  });
}

export function mapVerifiedUserSshPrivateKey(input: RepoVerifyUserSshPrivateKeyResult) {
  return asItemResult("Verified current user SSH private key", {
    repositoryUuid: input.repository_uuid,
    result: input.result,
    status: input.status,
    executed: true
  });
}

type RepoVerifyUserSshPrivateKeyClient = {
  verifyUserSshPrivateKey: (input: {
    x_auth_token: string;
    repository_uuid: string;
    private_key: string;
  }) => Promise<RepoVerifyUserSshPrivateKeyResult>;
};

export function createRepoVerifyUserSshPrivateKeyHandler(client: RepoVerifyUserSshPrivateKeyClient) {
  return async (input: unknown) => {
    const parsed = repoVerifyUserSshPrivateKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewVerifyUserSshPrivateKey(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.verifyUserSshPrivateKey(request);
    const result = mapVerifiedUserSshPrivateKey(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
