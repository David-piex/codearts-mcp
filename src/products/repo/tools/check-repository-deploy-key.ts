import { createHash } from "node:crypto";
import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCheckRepositoryDeployKeyInput } from "../schemas.js";

function fingerprintInputKey(key: string) {
  return createHash("sha256").update(key, "utf8").digest("hex").slice(0, 16);
}

export function previewCheckRepositoryDeployKey(input: {
  repository_id: string;
  key: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: check repository deploy key", {
    repositoryId: input.repository_id,
    keyFingerprint: fingerprintInputKey(input.key),
    executed: !input.dry_run
  });
}

export function mapRepositoryDeployKeyCheck(input: {
  repository_id: string;
  key: string;
  exists: boolean;
}) {
  return asItemResult("Checked repository deploy key", {
    repositoryId: input.repository_id,
    keyFingerprint: fingerprintInputKey(input.key),
    exists: input.exists,
    executed: true
  });
}

type RepoCheckRepositoryDeployKeyClient = {
  checkRepositoryDeployKey: (input: {
    repository_id: string;
    key: string;
  }) => Promise<{
    exists: boolean;
  }>;
};

export function createRepoCheckRepositoryDeployKeyHandler(client: RepoCheckRepositoryDeployKeyClient) {
  return async (input: unknown) => {
    const parsed = repoCheckRepositoryDeployKeyInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCheckRepositoryDeployKey(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.checkRepositoryDeployKey(parsed);
    const result = mapRepositoryDeployKeyCheck({ ...parsed, exists: response.exists });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
