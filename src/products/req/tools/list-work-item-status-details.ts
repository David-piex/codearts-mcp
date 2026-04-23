import { asItemResult } from "../../../contracts/tool-result.js";
import { reqListWorkItemStatusDetailsInput } from "../schemas.js";

type ReqStatusOption = {
  id?: string;
  name?: string;
};

type ReqStatusFieldConfig = {
  custom?: boolean;
  default_option?: ReqStatusOption[];
  default_options?: ReqStatusOption[];
  default_value?: string;
  field?: string;
  field_type?: string;
  is_required?: number;
  is_visible?: boolean;
  last?: boolean;
  name?: string;
  option?: ReqStatusOption[];
  options?: string;
  position?: number;
  project_id?: string;
  tracker_list?: number[];
  type_options?: string;
};

type ReqStatusDetail = {
  id?: number;
  status_id?: string;
  name?: string;
  is_closed?: number;
  position?: number;
  default_done_ratio?: number;
  is_initial?: number;
  issue_field_configs?: ReqStatusFieldConfig[];
  flag?: number;
  status_attribute?: number;
  issue_status_attribute?: {
    project_id?: string;
    name?: string;
    type?: string;
  };
};

function normalizeOptions(items?: ReqStatusOption[]) {
  return (items ?? []).map((item) => ({
    id: item.id,
    name: item.name
  }));
}

function normalizeFieldConfigs(items?: ReqStatusFieldConfig[]) {
  return (items ?? []).map((item) => ({
    custom: item.custom,
    defaultOption: normalizeOptions(item.default_option),
    defaultOptions: normalizeOptions(item.default_options),
    defaultValue: item.default_value,
    field: item.field,
    fieldType: item.field_type,
    requiredFlag: item.is_required,
    visible: item.is_visible,
    last: item.last,
    name: item.name,
    option: normalizeOptions(item.option),
    options: item.options,
    position: item.position,
    projectId: item.project_id,
    trackerList: item.tracker_list,
    typeOptions: item.type_options
  }));
}

function normalizeStatus(item: ReqStatusDetail) {
  return {
    id: item.id,
    statusId: item.status_id,
    name: item.name,
    closed: item.is_closed === 1,
    position: item.position,
    defaultDoneRatio: item.default_done_ratio,
    initial: item.is_initial === 1,
    issueFieldConfigs: normalizeFieldConfigs(item.issue_field_configs),
    flag: item.flag,
    statusAttributeId: item.status_attribute,
    statusAttribute: item.issue_status_attribute
      ? {
          projectId: item.issue_status_attribute.project_id,
          name: item.issue_status_attribute.name,
          type: item.issue_status_attribute.type
        }
      : undefined
  };
}

type ReqWorkItemStatusDetails = {
  project_id: string;
  tracker_id: 2 | 3 | 5 | 6 | 7;
  grouped_statuses: Record<string, ReqStatusDetail[]>;
  issue_statuses: ReqStatusDetail[];
};

export function mapReqWorkItemStatusDetails(input: ReqWorkItemStatusDetails) {
  return asItemResult(`Loaded work item status details for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    groupKeys: Object.keys(input.grouped_statuses),
    groupedStatuses: Object.fromEntries(
      Object.entries(input.grouped_statuses).map(([key, items]) => [key, items.map(normalizeStatus)])
    ),
    statuses: input.issue_statuses.map(normalizeStatus)
  });
}

type ReqListWorkItemStatusDetailsClient = {
  listWorkItemStatusDetails: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<ReqWorkItemStatusDetails>;
};

export function createReqListWorkItemStatusDetailsHandler(client: ReqListWorkItemStatusDetailsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemStatusDetailsInput.parse(input);
    const response = await client.listWorkItemStatusDetails(parsed);
    const result = mapReqWorkItemStatusDetails(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
