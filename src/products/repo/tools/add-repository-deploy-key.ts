import { createHash } from "node:crypto";
import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryDeployKey } from "../client.js";
import { repoAddRepositoryDeployKeyInput } from "../schemas.js";

function fingerprintInputKey(key: string) {
  return createHash("sha256").update(key, "utf8").digest("hex").slice(0, 16);
}

export function previewAddRepositoryDeployKey(input: {
  repository_id: string;
  key_title: string;
  key: string;
  can_push?: boolean;
  application?: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: add repository deploy key", {
    repositoryId: input.repository_id,
    keyTitle: input.key_title,
    keyFingerprint: fingerprintInputKey(input.key),
    canPush: input.can_push,
    application: input.application,
    executed: !input.dry_run
  });
}

export function mapAddedRepositoryDeployKey(input: RepoRepositoryDeployKey) {
  return asItemResult("Added repository deploy key", {
    id:
      input.id !== undefined
        ? String(input.id)
        : input.key_id !== undefined
          ? String(input.key_id)
          : undefined,
    keyId:
      input.key_id !== undefined
        ? String(input.key_id)
        : input.id !== undefined
          ? String(input.id)
          : undefined,
    title: input.title ?? input.key_title,
    keyTitle: input.key_title ?? input.title,
    fingerprint: input.fingerprint,
    canPush: input.can_push,
    application: input.application,
    createdAt: input.created_at,
    executed: true
  });
}

type RepoAddRepositoryDeployKeyClient = {
  addRepositoryDeployKey: (input: {
    repository_id: string;
    key_title: string;
    key: string;
    can_push?: boolean;
    application?: string;
  }) => Promise<RepoRepositoryDeployKey>;
};

export function createRepoAddRepositoryDeployKeyHandler(client: RepoAddRepositoryDeployKeyClient) {
  return async (input: unknown) => {
    const parsed = repoAddRepositoryDeployKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddRepositoryDeployKey(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.addRepositoryDeployKey(request);
    const result = mapAddedRepositoryDeployKey(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
