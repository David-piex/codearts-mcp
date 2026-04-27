import { asItemResult } from "../../../contracts/tool-result.js";

export type ReqStatusConfig = {
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

export function normalizeStatusConfig(item: ReqStatusConfig) {
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

export function mapStatusMutationResult(
  summary: string,
  input: {
    project_id: string;
    tracker_id?: number;
    status?: string;
    statuses?: ReqStatusConfig[];
    result?: Record<string, unknown>;
  }
) {
  return asItemResult(summary, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    status: input.status,
    result: input.result,
    statuses: input.statuses?.map(normalizeStatusConfig),
    executed: true
  });
}
