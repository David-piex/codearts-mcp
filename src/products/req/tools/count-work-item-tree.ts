import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCountWorkItemTreeInput } from "../schemas.js";

type ReqWorkItemTreeCount = {
  project_id: string;
  total_count: number;
  tracker_ids?: number[];
  page: number;
  page_size: number;
};

export function mapReqWorkItemTreeCount(input: ReqWorkItemTreeCount) {
  return asItemResult(`Loaded work item tree count for ${input.project_id}`, {
    projectId: input.project_id,
    totalCount: input.total_count,
    trackerIds: input.tracker_ids,
    page: input.page,
    pageSize: input.page_size
  });
}

type ReqCountWorkItemTreeClient = {
  countWorkItemTree: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
  }) => Promise<ReqWorkItemTreeCount>;
};

export function createReqCountWorkItemTreeHandler(client: ReqCountWorkItemTreeClient) {
  return async (input: unknown) => {
    const parsed = reqCountWorkItemTreeInput.parse(input);
    const response = await client.countWorkItemTree(parsed);
    const result = mapReqWorkItemTreeCount(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
