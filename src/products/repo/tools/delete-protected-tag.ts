import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteProtectedTagInput } from "../schemas.js";

export function previewDeleteProtectedTag(input: {
  repository_id: string;
  tag_name: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete protected tag", {
    repositoryId: input.repository_id,
    tagName: input.tag_name,
    executed: !input.dry_run
  });
}

export function mapDeletedProtectedTag(input: { tag_name: string; deleted: boolean }) {
  return asItemResult("Deleted protected tag", {
    id: input.tag_name,
    tagName: input.tag_name,
    deleted: input.deleted,
    executed: true
  });
}

type RepoDeleteProtectedTagClient = {
  deleteProtectedTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<{
    tag_name: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteProtectedTagHandler(client: RepoDeleteProtectedTagClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteProtectedTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProtectedTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProtectedTag(parsed);
    const result = mapDeletedProtectedTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
