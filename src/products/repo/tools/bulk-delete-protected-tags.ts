import { asItemResult } from "../../../contracts/tool-result.js";
import { repoBulkDeleteProtectedTagsInput } from "../schemas.js";

export function previewBulkDeleteProtectedTags(input: {
  repository_id: string;
  names: string[];
  dry_run: boolean;
}) {
  return asItemResult("Dry run: bulk delete protected tags", {
    repositoryId: input.repository_id,
    names: input.names,
    count: input.names.length,
    executed: !input.dry_run
  });
}

export function mapBulkDeletedProtectedTags(input: { names: string[]; deleted: boolean }) {
  return asItemResult("Deleted protected tags", {
    names: input.names,
    count: input.names.length,
    deleted: input.deleted,
    executed: true
  });
}

type RepoBulkDeleteProtectedTagsClient = {
  bulkDeleteProtectedTags: (input: {
    repository_id: string;
    names: string[];
  }) => Promise<{
    names: string[];
    deleted: boolean;
  }>;
};

export function createRepoBulkDeleteProtectedTagsHandler(client: RepoBulkDeleteProtectedTagsClient) {
  return async (input: unknown) => {
    const parsed = repoBulkDeleteProtectedTagsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBulkDeleteProtectedTags(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.bulkDeleteProtectedTags(parsed);
    const result = mapBulkDeletedProtectedTags(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
