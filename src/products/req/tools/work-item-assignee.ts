import { buildReqFullName } from "./user-name.js";

export type ReqWorkItemAssignee = {
  id?: number | string;
  user_id?: string;
  userId?: string;
  user_num_id?: number | string;
  userNumId?: number | string;
  assigned_user_id?: string;
  assigned_user_num_id?: number | string;
  identifier?: string;
  name?: string;
  user_name?: string;
  userName?: string;
  nick_name?: string;
  nickName?: string;
  assigned_nick_name?: string;
  assignedNickName?: string;
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
};

export function pickReqAssigneeDisplayName(input?: ReqWorkItemAssignee) {
  if (!input) {
    return undefined;
  }

  const fullName = buildReqFullName(input.first_name ?? input.firstName, input.last_name ?? input.lastName);

  return (
    input.assigned_nick_name ??
    input.assignedNickName ??
    input.nick_name ??
    input.nickName ??
    fullName ??
    input.name ??
    input.user_name ??
    input.userName ??
    input.assigned_user_id ??
    input.user_id ??
    input.userId ??
    input.identifier
  );
}

export function mapReqAssignee(input?: ReqWorkItemAssignee) {
  if (!input) {
    return undefined;
  }

  return {
    id: typeof input.id === "undefined" ? undefined : String(input.id),
    userId: input.assigned_user_id ?? input.user_id ?? input.userId ?? input.identifier,
    userNumId:
      typeof input.assigned_user_num_id !== "undefined"
        ? input.assigned_user_num_id
        : typeof input.user_num_id !== "undefined"
          ? input.user_num_id
          : typeof input.userNumId !== "undefined"
            ? input.userNumId
            : undefined,
    nickName: input.assigned_nick_name ?? input.assignedNickName ?? input.nick_name ?? input.nickName,
    name: input.name ?? input.user_name ?? input.userName,
    displayName: pickReqAssigneeDisplayName(input)
  };
}

export function mapReqWorkItemAssignee(input: {
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
}) {
  const assignee = mapReqAssignee(input.assigned_to ?? input.assigned_user);
  if (assignee) {
    return assignee;
  }

  const fallbackId = input.assigned_id ?? input.assigned_to_id;
  if (typeof fallbackId === "undefined") {
    return undefined;
  }

  return {
    id: String(fallbackId),
    userId: String(fallbackId),
    userNumId: fallbackId,
    nickName: undefined,
    name: undefined,
    displayName: String(fallbackId)
  };
}
