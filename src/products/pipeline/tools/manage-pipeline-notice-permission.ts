import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineSwitchNoticeInput,
  pipelineSwitchPermissionInput,
  pipelineUpdateNoticeStatusInput,
  pipelineUpdateOfficialNoticeInput,
  pipelineUpdateRolePermissionInput,
  pipelineUpdateThirdPartyNoticeInput,
  pipelineUpdateUserPermissionInput
} from "../schemas.js";

export function previewPipelineWrite(summary: string, item: Record<string, unknown>) {
  return asItemResult(`Dry run: ${summary}`, {
    ...item,
    executed: false
  });
}

export function mapPipelineWrite(summary: string, item: Record<string, unknown>) {
  return asItemResult(summary, {
    ...item,
    executed: true
  });
}

export function createPipelineUpdateOfficialNoticeHandler(client: {
  updateOfficialNotice: (input: Omit<ReturnType<typeof pipelineUpdateOfficialNoticeInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateOfficialNoticeInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      eventType: parsed.event_type,
      noticeData: parsed.notice_data
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`update official notice for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Updated official notice for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.updateOfficialNotice(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineSwitchNoticeHandler(client: {
  switchNotice: (input: Omit<ReturnType<typeof pipelineSwitchNoticeInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineSwitchNoticeInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      noticeType: parsed.notice_type,
      noticeSwitch: parsed.notice_switch
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`switch notice for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Switched notice for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.switchNotice(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateThirdPartyNoticeHandler(client: {
  updateThirdPartyNotice: (input: Omit<ReturnType<typeof pipelineUpdateThirdPartyNoticeInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateThirdPartyNoticeInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      noticeId: parsed.notice_id,
      noticeType: parsed.notice_type,
      noticeStatus: parsed.notice_status,
      sendUrl: parsed.send_url
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`update third party notice for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Updated third party notice for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.updateThirdPartyNotice(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateNoticeStatusHandler(client: {
  updateNoticeStatus: (input: Omit<ReturnType<typeof pipelineUpdateNoticeStatusInput.parse>, "dry_run">) => Promise<{ enabled: boolean }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateNoticeStatusInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      type: parsed.type,
      enable: parsed.enable
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`update notice status for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Updated notice status for pipeline ${parsed.pipeline_id}`, {
          ...item,
          enabled: (await client.updateNoticeStatus(parsed)).enabled
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateRolePermissionHandler(client: {
  updateRolePermission: (input: Omit<ReturnType<typeof pipelineUpdateRolePermissionInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateRolePermissionInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      roleId: parsed.role_id
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`update role permission for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Updated role permission for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.updateRolePermission(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateUserPermissionHandler(client: {
  updateUserPermission: (input: Omit<ReturnType<typeof pipelineUpdateUserPermissionInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateUserPermissionInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      userId: parsed.user_id
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`update user permission for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Updated user permission for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.updateUserPermission(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineSwitchPermissionHandler(client: {
  switchPermission: (input: Omit<ReturnType<typeof pipelineSwitchPermissionInput.parse>, "dry_run">) => Promise<{ status: string }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineSwitchPermissionInput.parse(input);
    const item = {
      projectId: parsed.project_id,
      pipelineId: parsed.pipeline_id,
      flag: parsed.flag
    };
    const result = parsed.dry_run
      ? previewPipelineWrite(`switch permission for pipeline ${parsed.pipeline_id}`, item)
      : mapPipelineWrite(`Switched permission for pipeline ${parsed.pipeline_id}`, {
          ...item,
          status: (await client.switchPermission(parsed)).status
        });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
