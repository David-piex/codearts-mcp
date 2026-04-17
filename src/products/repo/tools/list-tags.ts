import { asListResult } from "../../../contracts/tool-result.js";
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

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
