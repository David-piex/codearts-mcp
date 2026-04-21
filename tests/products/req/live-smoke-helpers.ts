import type { ReqClient } from "../../../src/products/req/client.js";

type WorkItemSummary = Awaited<ReturnType<ReqClient["listWorkItems"]>>["work_items"][number];

export async function findListedWorkItem(
  client: Pick<ReqClient, "listWorkItems">,
  input: {
    projectId: string;
    workItemId: string;
    pageSize?: number;
    maxPages?: number;
  }
): Promise<
  | {
      page: number;
      item: WorkItemSummary;
    }
  | undefined
> {
  const pageSize = input.pageSize ?? 20;
  const maxPages = input.maxPages ?? 5;

  for (let page = 1; page <= maxPages; page += 1) {
    const listed = await client.listWorkItems({
      project_id: input.projectId,
      page,
      page_size: pageSize
    });
    const found = listed.work_items.find((item) => String(item.id) === input.workItemId);

    if (found) {
      return {
        page,
        item: found
      };
    }

    if (listed.work_items.length < pageSize) {
      break;
    }
  }

  return undefined;
}
