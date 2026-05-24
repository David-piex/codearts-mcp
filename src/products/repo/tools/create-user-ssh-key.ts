import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoUserSshKey } from "../client.js";
import { repoCreateUserSshKeyInput } from "../schemas.js";

type RepoCreateUserSshKeyClient = {
  createUserSshKey: (input: {
    title?: string | number;
    key?: string | null;
  }) => Promise<RepoUserSshKey>;
};

export function previewCreateUserSshKey(input: {
  title?: string | number;
  key?: string | null;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: create current user SSH key", {
    title: input.title,
    keyProvided: input.key !== undefined && input.key !== null && input.key.length > 0,
    executed: !input.dry_run
  });
}

export function mapCreatedUserSshKey(item: RepoUserSshKey) {
  return asItemResult("Created current user SSH key", {
    id: item.id !== undefined ? String(item.id) : undefined,
    title: item.title,
    key: item.key,
    createdAt: item.created_at,
    executed: true
  });
}

export function createRepoCreateUserSshKeyHandler(client: RepoCreateUserSshKeyClient) {
  return async (input: unknown) => {
    const parsed = repoCreateUserSshKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateUserSshKey(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createUserSshKey(request);
    const result = mapCreatedUserSshKey(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
