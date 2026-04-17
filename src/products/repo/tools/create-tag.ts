import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateTagInput } from "../schemas.js";

export function previewCreateTag(input: {
  repository_id: string;
  tag_name: string;
  ref: string;
  message?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create tag ${input.tag_name}`, {
    repositoryId: input.repository_id,
    tagName: input.tag_name,
    ref: input.ref,
    message: input.message,
    executed: !input.dry_run
  });
}

export function mapCreatedTag(input: { tag_name: string; ref?: string; message?: string }) {
  return asItemResult(`Created tag ${input.tag_name}`, {
    id: input.tag_name,
    tagName: input.tag_name,
    ref: input.ref,
    message: input.message,
    executed: true
  });
}

type RepoCreateTagClient = {
  createTag: (input: {
    repository_id: string;
    tag_name: string;
    ref: string;
    message?: string;
  }) => Promise<{
    tag_name: string;
    ref?: string;
    message?: string;
  }>;
};

export function createRepoCreateTagHandler(client: RepoCreateTagClient) {
  return async (input: unknown) => {
    const parsed = repoCreateTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTag(parsed);
    const result = mapCreatedTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
