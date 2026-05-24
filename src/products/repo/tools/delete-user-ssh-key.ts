import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteUserSshKeyInput } from "../schemas.js";

type RepoDeleteUserSshKeyClient = {
  deleteUserSshKey: (input: {
    key_id: string;
  }) => Promise<{
    key_id: string;
    deleted: boolean;
  }>;
};

export function previewDeleteUserSshKey(input: {
  key_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete current user SSH key ${input.key_id}`, {
    id: input.key_id,
    keyId: input.key_id,
    executed: !input.dry_run
  });
}

export function mapDeletedUserSshKey(input: {
  key_id: string;
  deleted: boolean;
}) {
  return asItemResult(`Deleted current user SSH key ${input.key_id}`, {
    id: input.key_id,
    keyId: input.key_id,
    deleted: input.deleted,
    executed: true
  });
}

export function createRepoDeleteUserSshKeyHandler(client: RepoDeleteUserSshKeyClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteUserSshKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteUserSshKey(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteUserSshKey(request);
    const result = mapDeletedUserSshKey(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
