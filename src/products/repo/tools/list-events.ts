import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListEventsInput } from "../schemas.js";

export function mapRepoEvents(
  items: Array<{
    id: string;
    action_name?: string;
    ref_name?: string;
    author_name?: string;
    created_at?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} events found`,
    items.map((item) => ({
      id: item.id,
      actionName: item.action_name,
      refName: item.ref_name,
      authorName: item.author_name,
      createdAt: item.created_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListEventsClient = {
  listEvents: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    events: Array<{
      id: string;
      action_name?: string;
      ref_name?: string;
      author_name?: string;
      created_at?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListEventsHandler(client: RepoListEventsClient) {
  return async (input: unknown) => {
    const parsed = repoListEventsInput.parse(input);
    const response = await client.listEvents(parsed);
    const result = mapRepoEvents(response.events, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
