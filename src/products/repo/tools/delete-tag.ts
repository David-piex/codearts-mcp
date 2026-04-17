import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteTagInput } from "../schemas.js";

export function previewDeleteTag(input: {
  repository_id: string;
  tag_name: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete tag ${input.tag_name}`, {
    repositoryId: input.repository_id,
    tagName: input.tag_name,
    executed: !input.dry_run
  });
}

export function mapDeletedTag(input: { tag_name: string; deleted: boolean }) {
  return asItemResult(`Deleted tag ${input.tag_name}`, {
    id: input.tag_name,
    tagName: input.tag_name,
    deleted: input.deleted,
    executed: true
  });
}

type RepoDeleteTagClient = {
  deleteTag: (input: { repository_id: string; tag_name: string }) => Promise<{
    tag_name: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteTagHandler(client: RepoDeleteTagClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTag(parsed);
    const result = mapDeletedTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
