import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoUserGpgKey } from "../client.js";
import { repoListUserGpgKeysInput } from "../schemas.js";

type Client = {
  listUserGpgKeys: (input: {
    query?: string;
  }) => Promise<{
    keys: RepoUserGpgKey[];
    total?: number;
  }>;
};

export function createRepoListUserGpgKeysHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListUserGpgKeysInput.parse(input);
    const response = await client.listUserGpgKeys(parsed);
    const result = asListResult(
      `${response.keys.length} user GPG keys found`,
      response.keys.map((item) => ({
        id: item.id !== undefined ? String(item.id) : undefined,
        title: item.title,
        description: item.description,
        fingerprint: item.fingerprint,
        primaryKeyId: item.primary_keyid,
        active: item.active,
        createdAt: item.created_at,
        emailsWithVerifiedStatus: item.emails_with_verified_status,
        subkeys: (item.subkeys ?? []).map((subkey) => ({
          id: subkey.id !== undefined ? String(subkey.id) : undefined,
          fingerprint: subkey.fingerprint,
          gpgKeyId: subkey.gpg_key_id !== undefined ? String(subkey.gpg_key_id) : undefined,
          keyId: subkey.keyid
        }))
      })),
      toPageInfo(1, response.keys.length || response.total || 0, response.total)
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
