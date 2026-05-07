import { asItemResult } from "../../../contracts/tool-result.js";
import { repoBatchDeleteRepositoryFilePushPermissionsInput } from "../schemas.js";

export function previewBatchDeleteRepositoryFilePushPermissions(input: {
  repository_id: string;
  ids: Array<string | number>;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: batch delete repository file push permissions", {
    repositoryId: input.repository_id,
    ids: input.ids.map((id) => String(id)),
    count: input.ids.length,
    executed: !input.dry_run
  });
}

export function mapBatchDeletedRepositoryFilePushPermissions(input: {
  ids: Array<string | number>;
  deleted: boolean;
}) {
  return asItemResult("Deleted repository file push permissions", {
    ids: input.ids.map((id) => String(id)),
    count: input.ids.length,
    deleted: input.deleted,
    executed: true
  });
}

type RepoBatchDeleteRepositoryFilePushPermissionsClient = {
  batchDeleteRepositoryFilePushPermissions: (input: {
    repository_id: string;
    ids: Array<string | number>;
  }) => Promise<{
    ids: Array<string | number>;
    deleted: boolean;
  }>;
};

export function createRepoBatchDeleteRepositoryFilePushPermissionsHandler(
  client: RepoBatchDeleteRepositoryFilePushPermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoBatchDeleteRepositoryFilePushPermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteRepositoryFilePushPermissions(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteRepositoryFilePushPermissions(parsed);
    const result = mapBatchDeletedRepositoryFilePushPermissions(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
