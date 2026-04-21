import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListTagsInput } from "../schemas.js";

export function mapRepoTags(
  items: Array<{
    name: string;
    is_double_name?: boolean;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} tags found`,
    items.map((item) => ({
      id: item.name,
      name: item.name,
      doubleName: item.is_double_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListTagsClient = {
  listTags: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tags: Array<{
      name: string;
      is_double_name?: boolean;
    }>;
    total?: number;
  }>;
};

export function createRepoListTagsHandler(client: RepoListTagsClient) {
  return async (input: unknown) => {
    const parsed = repoListTagsInput.parse(input);
    const response = await client.listTags(parsed);
    const result = mapRepoTags(response.tags, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "name", get: (item) => (item as { name?: string }).name },
            {
              label: "doubleName",
              get: (item) => (item as { doubleName?: boolean }).doubleName
            }
          ]
        })
      : parsed.page > 1
        ? result.summary
        : [
            result.summary,
            "",
            `Hint: If you expected tags here, confirm repository_id \`${parsed.repository_id}\` points to a repository visible to the current account and that tag discovery is available for it.`
          ].join("\n");

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
