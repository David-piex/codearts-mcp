import { asItemResult } from "../../../contracts/tool-result.js";
import { reqListOptionalWorkItemStatusConfigsInput } from "../schemas.js";

type ReqOptionalStatusConfig = {
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

type ReqOptionalWorkItemStatusConfigs = {
  project_id: string;
  tracker_id: 2 | 3 | 5 | 6 | 7;
  issue_statuses: ReqOptionalStatusConfig[];
};

function normalizeStatusConfig(item: ReqOptionalStatusConfig) {
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

export function mapReqOptionalWorkItemStatusConfigs(input: ReqOptionalWorkItemStatusConfigs) {
  return asItemResult(`Loaded optional work item status configs for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    statuses: input.issue_statuses.map(normalizeStatusConfig)
  });
}

type ReqListOptionalWorkItemStatusConfigsClient = {
  listOptionalWorkItemStatusConfigs: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<ReqOptionalWorkItemStatusConfigs>;
};

export function createReqListOptionalWorkItemStatusConfigsHandler(
  client: ReqListOptionalWorkItemStatusConfigsClient
) {
  return async (input: unknown) => {
    const parsed = reqListOptionalWorkItemStatusConfigsInput.parse(input);
    const response = await client.listOptionalWorkItemStatusConfigs(parsed);
    const result = mapReqOptionalWorkItemStatusConfigs(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
