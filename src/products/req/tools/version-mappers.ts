import type { ReqVersionDetailV2, ReqVersionItem } from "../client.js";
import { formatReqTimestampText } from "./time-format.js";

export function mapReqVersionItem(item: ReqVersionItem) {
  return {
    id: String(item.id),
    name: item.name,
    status: item.status,
    projectId: item.project_id,
    dueDate: item.due_date,
    dueDateText: formatReqTimestampText(item.due_date),
    effectiveDate: item.effective_date,
    effectiveDateText: formatReqTimestampText(item.effective_date),
    startDate: item.start_date,
    startDateText: formatReqTimestampText(item.start_date),
    createdOn: item.created_on,
    createdOnText: formatReqTimestampText(item.created_on),
    updatedOn: item.updated_on,
    updatedOnText: formatReqTimestampText(item.updated_on),
    isCurrent: item.is_current,
    programVersionId: item.program_version_id,
    doneRatio: item.done_ratio,
    rawVersion: item
  };
}

export function mapReqVersionDetailV2(item: ReqVersionDetailV2) {
  return {
    ...mapReqVersionItem(item),
    projectNumId: item.projectNumId,
    project: item.project,
    openedCount: item.opened_count,
    closedCount: item.closed_count,
    haveTask: item.have_task,
    total: item.total,
    rawVersion: item
  };
}
