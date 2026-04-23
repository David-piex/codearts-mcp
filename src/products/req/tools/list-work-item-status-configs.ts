import { asItemResult } from "../../../contracts/tool-result.js";
import { reqListWorkItemStatusConfigsInput } from "../schemas.js";

type ReqStatusConfig = {
  trackerList?: number[];
  id?: string;
  statusId?: number;
  definedName?: string;
  description?: string;
  position?: number;
  flag?: number;
  is_closed?: boolean;
  is_initial?: boolean;
  statusAttribute?: number;
  statusAttributeName?: string;
  issueStatusAttribute?: {
    id?: number | string;
    name?: string;
    type?: string;
  };
  trackerId?: number;
};

type ReqWorkItemStatusConfigs = {
  project_id: string;
  tracker_id: 2 | 3 | 5 | 6 | 7;
  issue_statuses: ReqStatusConfig[];
  workitem_readonly_mode?: boolean;
};

function normalizeStatusConfig(item: ReqStatusConfig) {
  return {
    trackerList: item.trackerList,
    id: item.id,
    statusId: item.statusId,
    definedName: item.definedName,
    description: item.description,
    position: item.position,
    flag: item.flag,
    closed: item.is_closed,
    initial: item.is_initial,
    statusAttributeId: item.statusAttribute,
    statusAttributeName: item.statusAttributeName,
    statusAttribute: item.issueStatusAttribute
      ? {
          id: item.issueStatusAttribute.id,
          name: item.issueStatusAttribute.name,
          type: item.issueStatusAttribute.type
        }
      : undefined,
    trackerId: item.trackerId
  };
}

export function mapReqWorkItemStatusConfigs(input: ReqWorkItemStatusConfigs) {
  return asItemResult(`Loaded work item status configs for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    workItemReadonlyMode: input.workitem_readonly_mode,
    statuses: input.issue_statuses.map(normalizeStatusConfig)
  });
}

type ReqListWorkItemStatusConfigsClient = {
  listWorkItemStatusConfigs: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<ReqWorkItemStatusConfigs>;
};

export function createReqListWorkItemStatusConfigsHandler(client: ReqListWorkItemStatusConfigsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemStatusConfigsInput.parse(input);
    const response = await client.listWorkItemStatusConfigs(parsed);
    const result = mapReqWorkItemStatusConfigs(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
