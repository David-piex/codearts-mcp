import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import {
  buildAddKeystorePermissionInput,
  buildAutoExecuteJobInput,
  buildBatchDeleteJobsInput,
  buildBatchSetAgencyInput,
  buildBatchUpdateJobPermissionsInput,
  buildCheckWebhookUrlInput,
  buildClearRecyclingJobsInput,
  buildDeleteJobGroupInput,
  buildDisableJobInput,
  buildDisableJobNoticeInput,
  buildDisableJobV3Input,
  buildDeleteJobV3Input,
  buildDeleteJobInput,
  buildDeleteKeystoreInput,
  buildDeleteKeystorePermissionInput,
  buildEditKeystorePermissionInput,
  buildDeleteRecyclingJobsInput,
  buildDeleteTemplateInput,
  buildCreateTemplateInput,
  buildCreateTemplateV3Input,
  buildFollowCustomTemplateInput,
  buildFollowJobInput,
  buildFollowOfficialTemplateInput,
  buildCopyJobInput,
  buildCreateJobGroupInput,
  buildCreateJobInput,
  buildRecoverJobV3Input,
  buildRestoreRecyclingJobsInput,
  buildSaveTemplateUsedInfoInput,
  buildSetKeepTimeInput,
  buildUnfollowCustomTemplateInput,
  buildUnfollowJobInput,
  buildUnfollowOfficialTemplateInput,
  buildUpdateJobNoticeInput,
  buildUploadKeystoreInput,
  buildUpdateKeystoreInput,
  buildUploadJunitCoverageInput,
  buildUploadJunitReportInput,
  buildUpdateJobRolePermissionInput,
  buildMoveJobGroupInput,
  buildSwapJobGroupInput
  ,
  buildUpdateJobGroupInput
} from "../schemas.js";

export function createBuildDeleteJobHandler(client: {
  deleteJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    project_id?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteJobInput.parse(input);
    const preview = asItemResult(`Dry run: delete build job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteJob({ job_id: parsed.job_id });
    const result = asItemResult(`Deleted build job ${response.job_id}`, {
      id: response.job_id,
      projectId: response.project_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDisableJobHandler(client: {
  disableJob: (input: { job_id: string; disabled: boolean; reason?: string }) => Promise<{
    job_id: string;
    disabled: boolean;
    reason?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDisableJobInput.parse(input);
    const preview = asItemResult(`Dry run: disable build job ${parsed.job_id}`, {
      id: parsed.job_id,
      disabled: parsed.disabled,
      reason: parsed.reason,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.disableJob(parsed);
    const result = asItemResult(`Updated build job disable state ${response.job_id}`, {
      id: response.job_id,
      disabled: response.disabled,
      reason: response.reason,
      status: response.status,
      executed: true
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildSetKeepTimeHandler(client: {
  setKeepTime: (input: { keep_time: number }) => Promise<{
    keep_time: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildSetKeepTimeInput.parse(input);
    const preview = asItemResult(`Dry run: set Build recycling keep time to ${parsed.keep_time} day(s)`, {
      keepTime: parsed.keep_time,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.setKeepTime({ keep_time: parsed.keep_time });
    const result = asItemResult(`Set Build recycling keep time to ${response.keep_time} day(s)`, {
      keepTime: response.keep_time,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDeleteRecyclingJobsHandler(client: {
  deleteRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteRecyclingJobsInput.parse(input);
    const preview = asItemResult(`Dry run: permanently delete ${parsed.job_ids.length} Build recycling job(s)`, {
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteRecyclingJobs({ job_ids: parsed.job_ids });
    const result = asItemResult(`Deleted ${response.job_ids.length} Build recycling job(s)`, {
      jobIds: response.job_ids,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildClearRecyclingJobsHandler(client: {
  clearRecyclingJobs: () => Promise<{
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildClearRecyclingJobsInput.parse(input);
    const preview = asItemResult("Dry run: clear all Build recycling jobs", {
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.clearRecyclingJobs();
    const result = asItemResult("Cleared all Build recycling jobs", {
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildRestoreRecyclingJobsHandler(client: {
  restoreRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildRestoreRecyclingJobsInput.parse(input);
    const preview = asItemResult(`Dry run: restore ${parsed.job_ids.length} Build recycling job(s)`, {
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.restoreRecyclingJobs({ job_ids: parsed.job_ids });
    const result = asItemResult(`Restored ${response.job_ids.length} Build recycling job(s)`, {
      jobIds: response.job_ids,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildFollowJobHandler(client: {
  followJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildFollowJobInput.parse(input);
    const preview = asItemResult(`Dry run: follow build job ${parsed.job_id}`, {
      id: parsed.job_id,
      favorite: true,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.followJob({ job_id: parsed.job_id });
    const result = asItemResult(`Followed build job ${response.job_id}`, {
      id: response.job_id,
      favorite: response.favorite,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildUnfollowJobHandler(client: {
  unfollowJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUnfollowJobInput.parse(input);
    const preview = asItemResult(`Dry run: unfollow build job ${parsed.job_id}`, {
      id: parsed.job_id,
      favorite: false,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.unfollowJob({ job_id: parsed.job_id });
    const result = asItemResult(`Unfollowed build job ${response.job_id}`, {
      id: response.job_id,
      favorite: response.favorite,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDeleteTemplateHandler(client: {
  deleteTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteTemplateInput.parse(input);
    const preview = asItemResult(`Dry run: delete build template ${parsed.uuid}`, {
      id: parsed.uuid,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteTemplate({ uuid: parsed.uuid });
    const result = asItemResult(`Deleted build template ${response.uuid}`, {
      id: response.uuid,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildSaveTemplateUsedInfoHandler(client: {
  saveTemplateUsedInfo: (input: { job_id: string; template_id: string }) => Promise<{
    job_id: string;
    template_id: string;
    status?: string;
    result?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildSaveTemplateUsedInfoInput.parse(input);
    const preview = asItemResult(`Dry run: save template ${parsed.template_id} usage for build job ${parsed.job_id}`, {
      id: parsed.job_id,
      templateId: parsed.template_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.saveTemplateUsedInfo({
      job_id: parsed.job_id,
      template_id: parsed.template_id
    });
    const result = asItemResult(`Saved template ${response.template_id} usage for build job ${response.job_id}`, {
      id: response.job_id,
      templateId: response.template_id,
      status: response.status,
      result: response.result,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

function createTemplateFavoriteHandler(options: {
  noun: string;
  favorite: boolean;
  parse: (input: unknown) => { uuid: string; dry_run: boolean };
  call: (uuid: string) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = options.parse(input);
    const preview = asItemResult(
      `Dry run: ${options.favorite ? "follow" : "unfollow"} ${options.noun} ${parsed.uuid}`,
      {
        id: parsed.uuid,
        favorite: options.favorite,
        executed: !parsed.dry_run
      }
    );

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await options.call(parsed.uuid);
    const result = asItemResult(
      `${options.favorite ? "Followed" : "Unfollowed"} ${options.noun} ${response.uuid}`,
      {
        id: response.uuid,
        favorite: response.favorite,
        status: response.status,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildFollowCustomTemplateHandler(client: {
  followCustomTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return createTemplateFavoriteHandler({
    noun: "build custom template",
    favorite: true,
    parse: (input) => buildFollowCustomTemplateInput.parse(input),
    call: (uuid) => client.followCustomTemplate({ uuid })
  });
}

export function createBuildUnfollowCustomTemplateHandler(client: {
  unfollowCustomTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return createTemplateFavoriteHandler({
    noun: "build custom template",
    favorite: false,
    parse: (input) => buildUnfollowCustomTemplateInput.parse(input),
    call: (uuid) => client.unfollowCustomTemplate({ uuid })
  });
}

export function createBuildFollowOfficialTemplateHandler(client: {
  followOfficialTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return createTemplateFavoriteHandler({
    noun: "build official template",
    favorite: true,
    parse: (input) => buildFollowOfficialTemplateInput.parse(input),
    call: (uuid) => client.followOfficialTemplate({ uuid })
  });
}

export function createBuildUnfollowOfficialTemplateHandler(client: {
  unfollowOfficialTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return createTemplateFavoriteHandler({
    noun: "build official template",
    favorite: false,
    parse: (input) => buildUnfollowOfficialTemplateInput.parse(input),
    call: (uuid) => client.unfollowOfficialTemplate({ uuid })
  });
}

export function createBuildDeleteKeystoreHandler(client: {
  deleteKeystore: (input: { keystore_id: string }) => Promise<{
    keystore_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteKeystoreInput.parse(input);
    const preview = asItemResult(`Dry run: delete build keystore ${parsed.keystore_id}`, {
      id: parsed.keystore_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteKeystore({ keystore_id: parsed.keystore_id });
    const result = asItemResult(`Deleted build keystore ${response.keystore_id}`, {
      id: response.keystore_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDeleteKeystorePermissionHandler(client: {
  deleteKeystorePermission: (input: { permission_id: string }) => Promise<{
    permission_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteKeystorePermissionInput.parse(input);
    const preview = asItemResult(`Dry run: delete build keystore permission ${parsed.permission_id}`, {
      id: parsed.permission_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteKeystorePermission({ permission_id: parsed.permission_id });
    const result = asItemResult(`Deleted build keystore permission ${response.permission_id}`, {
      id: response.permission_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDeleteJobV3Handler(client: {
  deleteJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    project_id?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteJobV3Input.parse(input);
    const preview = asItemResult(`Dry run: delete Build v3 job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteJobV3({ job_id: parsed.job_id });
    const result = asItemResult(`Deleted Build v3 job ${response.job_id}`, {
      id: response.job_id,
      projectId: response.project_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildRecoverJobV3Handler(client: {
  recoverJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildRecoverJobV3Input.parse(input);
    const preview = asItemResult(`Dry run: recover Build v3 job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.recoverJobV3({ job_id: parsed.job_id });
    const result = asItemResult(`Recovered Build v3 job ${response.job_id}`, {
      id: response.job_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDisableJobV3Handler(client: {
  disableJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDisableJobV3Input.parse(input);
    const preview = asItemResult(`Dry run: disable build v3 job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.disableJobV3(parsed);
    const result = asItemResult(`Disabled build v3 job ${response.job_id}`, {
      id: response.job_id,
      status: response.status,
      executed: true
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCheckWebhookUrlHandler(client: {
  checkWebhookUrl: (input: {
    job_id: string;
    notice_type: string;
    webhook_url: string;
  }) => Promise<{
    job_id: string;
    notice_type: string;
    webhook_url: string;
    status?: string;
    result?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCheckWebhookUrlInput.parse(input);
    const preview = asItemResult(`Dry run: check build webhook URL for job ${parsed.job_id}`, {
      id: parsed.job_id,
      noticeType: parsed.notice_type,
      webhookUrl: parsed.webhook_url,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.checkWebhookUrl(parsed);
    const result = asItemResult(`Checked build webhook URL for job ${response.job_id}`, {
      id: response.job_id,
      noticeType: response.notice_type,
      webhookUrl: response.webhook_url,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildAutoExecuteJobHandler(client: {
  autoExecuteJob: (input: {
    job_id: string;
    event_type?: string;
    ref?: string;
    after?: string;
    before?: string;
    commits?: Array<Record<string, unknown>>;
    repository?: Record<string, unknown>;
  }) => Promise<{
    job_id: string;
    status?: string;
    result?: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildAutoExecuteJobInput.parse(input);
    const preview = asItemResult(`Dry run: auto-execute build job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.autoExecuteJob(parsed);
    const result = asItemResult(`Auto-executed build job ${response.job_id}`, {
      id: response.job_id,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildBatchUpdateJobPermissionsHandler(client: {
  batchUpdateJobPermissions: (input: {
    project_id: string;
    job_ids: string[];
    project_switch?: boolean;
    permissions: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    job_ids: string[];
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildBatchUpdateJobPermissionsInput.parse(input);
    const preview = asItemResult(`Dry run: update permissions for ${parsed.job_ids.length} build job(s)`, {
      projectId: parsed.project_id,
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.batchUpdateJobPermissions(parsed);
    const result = asItemResult(`Updated permissions for ${response.job_ids.length} build job(s)`, {
      projectId: response.project_id,
      jobIds: response.job_ids,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildBatchDeleteJobsHandler(client: {
  batchDeleteJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    project_id?: string;
    deleted_job_id?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildBatchDeleteJobsInput.parse(input);
    const preview = asItemResult(`Dry run: batch-delete ${parsed.job_ids.length} build job(s)`, {
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.batchDeleteJobs(parsed);
    const result = asItemResult(`Batch-deleted ${response.job_ids.length} build job(s)`, {
      jobIds: response.job_ids,
      projectId: response.project_id,
      deletedJobId: response.deleted_job_id,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildBatchSetAgencyHandler(client: {
  batchSetAgency: (input: { job_ids: string[]; agency_urn?: string }) => Promise<{
    job_ids: string[];
    agency_urn?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildBatchSetAgencyInput.parse(input);
    const preview = asItemResult(`Dry run: set agency for ${parsed.job_ids.length} build job(s)`, {
      jobIds: parsed.job_ids,
      agencyUrn: parsed.agency_urn,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.batchSetAgency(parsed);
    const result = asItemResult(`Set agency for ${response.job_ids.length} build job(s)`, {
      jobIds: response.job_ids,
      agencyUrn: response.agency_urn,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildUpdateJobRolePermissionHandler(client: {
  updateJobRolePermission: (input: {
    job_id: string;
    role_id: string;
    permission_name: string;
    permission_value: boolean;
  }) => Promise<{
    job_id: string;
    role_id: string;
    permission_name: string;
    permission_value: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUpdateJobRolePermissionInput.parse(input);
    const preview = asItemResult(`Dry run: update build job role permission ${parsed.permission_name}`, {
      id: parsed.job_id,
      roleId: parsed.role_id,
      permissionName: parsed.permission_name,
      permissionValue: parsed.permission_value,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.updateJobRolePermission(parsed);
    const result = asItemResult(`Updated build job role permission ${response.permission_name}`, {
      id: response.job_id,
      roleId: response.role_id,
      permissionName: response.permission_name,
      permissionValue: response.permission_value,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildMoveJobGroupHandler(client: {
  moveJobGroup: (input: {
    project_id: string;
    group_id: string;
    jobs: Array<{ job_id: string; job_name: string }>;
  }) => Promise<{
    project_id: string;
    group_id: string;
    jobs: Array<{ job_id?: string; group_path_id?: string }>;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildMoveJobGroupInput.parse(input);
    const preview = asItemResult(`Dry run: move ${parsed.jobs.length} build job(s) to group ${parsed.group_id}`, {
      projectId: parsed.project_id,
      groupId: parsed.group_id,
      jobIds: parsed.jobs.map((job) => job.job_id),
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.moveJobGroup(parsed);
    const result = asItemResult(`Moved ${parsed.jobs.length} build job(s) to group ${response.group_id}`, {
      projectId: response.project_id,
      groupId: response.group_id,
      jobs: response.jobs,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildUpdateJobGroupHandler(client: {
  updateJobGroup: (input: {
    project_id: string;
    id: string;
    name: string;
    parent_id?: string;
    ordinal?: number;
    path_id?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    id: string;
    name: string;
    parent_id?: string;
    ordinal?: number;
    path_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUpdateJobGroupInput.parse(input);
    const preview = asItemResult(`Dry run: update build job group ${parsed.id}`, {
      id: parsed.id,
      projectId: parsed.project_id,
      name: parsed.name,
      parentId: parsed.parent_id,
      ordinal: parsed.ordinal,
      pathId: parsed.path_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.updateJobGroup(parsed);
    const result = asItemResult(`Updated build job group ${response.id}`, {
      id: response.id,
      projectId: response.project_id,
      name: response.name,
      parentId: response.parent_id,
      ordinal: response.ordinal,
      pathId: response.path_id,
      status: response.status,
      raw: response.raw,
      executed: true
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildDeleteJobGroupHandler(client: {
  deleteJobGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    project_id: string;
    id: string;
    status?: string;
    result?: unknown;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteJobGroupInput.parse(input);
    const preview = asItemResult(`Dry run: delete build job group ${parsed.id}`, {
      projectId: parsed.project_id,
      groupId: parsed.id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.deleteJobGroup(parsed);
    const result = asItemResult(`Deleted build job group ${response.id}`, {
      projectId: response.project_id,
      groupId: response.id,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildSwapJobGroupHandler(client: {
  swapJobGroup: (input: {
    project_id: string;
    source_group_id: string;
    target_group_id: string;
  }) => Promise<{
    project_id: string;
    source_group_id: string;
    target_group_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildSwapJobGroupInput.parse(input);
    const preview = asItemResult(`Dry run: swap build groups ${parsed.source_group_id} and ${parsed.target_group_id}`, {
      projectId: parsed.project_id,
      sourceGroupId: parsed.source_group_id,
      targetGroupId: parsed.target_group_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.swapJobGroup(parsed);
    const result = asItemResult(`Swapped build groups ${response.source_group_id} and ${response.target_group_id}`, {
      projectId: response.project_id,
      sourceGroupId: response.source_group_id,
      targetGroupId: response.target_group_id,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildAddKeystorePermissionHandler(client: {
  addKeystorePermission: (input: {
    keystore_id: string;
    user_id: string;
    user_name: string;
    setting: boolean;
    delete: boolean;
    modify: boolean;
    usage: boolean;
    can_absent: boolean;
  }) => Promise<{
    keystore_id: string;
    user_id: string;
    user_name: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildAddKeystorePermissionInput.parse(input);
    const preview = asItemResult(`Dry run: add build keystore permission for user ${parsed.user_name}`, {
      id: parsed.keystore_id,
      userId: parsed.user_id,
      userName: parsed.user_name,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.addKeystorePermission(parsed);
    const result = asItemResult(`Added build keystore permission for user ${response.user_name}`, {
      id: response.keystore_id,
      userId: response.user_id,
      userName: response.user_name,
      status: response.status,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildEditKeystorePermissionHandler(client: {
  editKeystorePermission: (input: {
    x_auth_token: string;
    id: string;
    keystore_id: string;
    user_name: string;
    modify: boolean;
    usage: boolean;
    delete: boolean;
    can_absent: boolean;
  }) => Promise<{
    id: string;
    keystore_id: string;
    user_name: string;
    status?: string;
    result?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildEditKeystorePermissionInput.parse(input);
    const preview = asItemResult(`Dry run: edit build keystore permission ${parsed.id}`, {
      id: parsed.id,
      keystoreId: parsed.keystore_id,
      userName: parsed.user_name,
      modify: parsed.modify,
      usage: parsed.usage,
      delete: parsed.delete,
      canAbsent: parsed.can_absent,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.editKeystorePermission(parsed);
    const result = asItemResult(`Edited build keystore permission ${response.id}`, {
      id: response.id,
      keystoreId: response.keystore_id,
      userName: response.user_name,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCreateJobHandler(client: {
  createJob: (input: {
    project_id: string;
    job_name: string;
    arch?: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    job_name: string;
    job_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCreateJobInput.parse(input);
    const preview = asItemResult(`Dry run: create build job ${parsed.job_name}`, {
      projectId: parsed.project_id,
      name: parsed.job_name,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.createJob(parsed);
    const result = asItemResult(`Created build job ${response.job_name}`, {
      id: response.job_id,
      projectId: response.project_id,
      name: response.job_name,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCopyJobHandler(client: {
  copyJob: (input: {
    project_id: string;
    copy_job_id: string;
    job_name: string;
    arch?: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    copy_job_id: string;
    job_name: string;
    job_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCopyJobInput.parse(input);
    const preview = asItemResult(`Dry run: copy build job ${parsed.copy_job_id} to ${parsed.job_name}`, {
      projectId: parsed.project_id,
      sourceJobId: parsed.copy_job_id,
      name: parsed.job_name,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.copyJob(parsed);
    const result = asItemResult(`Copied build job to ${response.job_name}`, {
      id: response.job_id,
      projectId: response.project_id,
      sourceJobId: response.copy_job_id,
      name: response.job_name,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildUpdateJobNoticeHandler(client: {
  updateJobNotice: (input: {
    job_id: string;
    notice_type: string;
    enabled_event_type_names: string[];
    send_switch?: string;
    webhook_url?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    job_id: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUpdateJobNoticeInput.parse(input);
    const preview = asItemResult(`Dry run: update build job notice ${parsed.notice_type} for ${parsed.job_id}`, {
      id: parsed.job_id,
      noticeType: parsed.notice_type,
      enabledEventTypeNames: parsed.enabled_event_type_names,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.updateJobNotice(parsed);
    const result = asItemResult(`Updated build job notice ${parsed.notice_type} for ${response.job_id}`, {
      id: response.job_id,
      noticeType: parsed.notice_type,
      enabledEventTypeNames: parsed.enabled_event_type_names,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildDisableJobNoticeHandler(client: {
  disableJobNotice: (input: { job_id: string; notice_type: string }) => Promise<{
    job_id: string;
    notice_type: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDisableJobNoticeInput.parse(input);
    const preview = asItemResult(`Dry run: disable build job notice ${parsed.notice_type} for ${parsed.job_id}`, {
      id: parsed.job_id,
      noticeType: parsed.notice_type,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.disableJobNotice(parsed);
    const result = asItemResult(`Disabled build job notice ${response.notice_type} for ${response.job_id}`, {
      id: response.job_id,
      noticeType: response.notice_type,
      status: response.status,
      executed: true
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCreateJobGroupHandler(client: {
  createJobGroup: (input: {
    project_id: string;
    name: string;
    parent_id?: string;
    id?: string;
    group_id?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    id?: string;
    group_id?: string;
    name: string;
    parent_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCreateJobGroupInput.parse(input);
    const preview = asItemResult(`Dry run: create build job group ${parsed.name}`, {
      projectId: parsed.project_id,
      name: parsed.name,
      parentId: parsed.parent_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.createJobGroup(parsed);
    const result = asItemResult(`Created build job group ${response.name}`, {
      id: response.id ?? response.group_id,
      projectId: response.project_id,
      name: response.name,
      parentId: response.parent_id,
      groupId: response.group_id,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

function detectBuildKeystoreContentType(fileName: string) {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith(".jks")) return "application/octet-stream";
  if (normalized.endsWith(".keystore")) return "application/octet-stream";
  if (normalized.endsWith(".pem")) return "application/x-pem-file";
  if (normalized.endsWith(".crt")) return "application/x-x509-ca-cert";
  if (normalized.endsWith(".key")) return "application/octet-stream";
  if (normalized.endsWith(".xml")) return "application/xml";
  return "application/octet-stream";
}

export function createBuildUploadKeystoreHandler(client: {
  uploadKeystore: (input: {
    file_name: string;
    file_content: Uint8Array;
    privacy?: boolean;
    description?: string;
    content_type?: string;
  }) => Promise<{
    file_name: string;
    privacy?: boolean;
    description?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUploadKeystoreInput.parse(input);
    const fileName = basename(parsed.file_path);
    const preview = asItemResult(`Dry run: upload build keystore ${fileName}`, {
      filePath: parsed.file_path,
      fileName,
      privacy: parsed.privacy,
      description: parsed.description,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadKeystore({
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      privacy: parsed.privacy,
      description: parsed.description,
      content_type: detectBuildKeystoreContentType(fileName)
    });
    const result = asItemResult(`Uploaded build keystore ${response.file_name}`, {
      fileName: response.file_name,
      privacy: response.privacy,
      description: response.description,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCreateTemplateHandler(client: {
  createTemplate: (input: {
    x_auth_token: string;
    name: string;
    description?: string;
    tool_type?: string;
    template: Record<string, unknown>;
    parameters?: Array<Record<string, unknown>>;
    resource_limit?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    name: string;
    uuid?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCreateTemplateInput.parse(input);
    const preview = asItemResult(`Dry run: create build template ${parsed.name}`, {
      name: parsed.name,
      toolType: parsed.tool_type,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.createTemplate(parsed);
    const result = asItemResult(`Created build template ${response.name}`, {
      id: response.uuid,
      name: response.name,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildCreateTemplateV3Handler(client: {
  createTemplateV3: (input: {
    x_auth_token: string;
    name: string;
    description?: string;
    tool_type?: string;
    template: Record<string, unknown>;
    parameters?: Array<Record<string, unknown>>;
    resource_limit?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    name: string;
    uuid?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildCreateTemplateV3Input.parse(input);
    const preview = asItemResult(`Dry run: create build v3 template ${parsed.name}`, {
      name: parsed.name,
      toolType: parsed.tool_type,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.createTemplateV3(parsed);
    const result = asItemResult(`Created build v3 template ${response.name}`, {
      id: response.uuid,
      name: response.name,
      status: response.status,
      raw: response.raw,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildUpdateKeystoreHandler(client: {
  updateKeystore: (input: {
    x_auth_token: string;
    id: string;
    keystore_name: string;
    share?: number;
    description?: string;
  }) => Promise<{
    id: string;
    keystore_name: string;
    share?: number;
    description?: string;
    status?: string;
    result?: unknown;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUpdateKeystoreInput.parse(input);
    const preview = asItemResult(`Dry run: update build keystore ${parsed.id}`, {
      id: parsed.id,
      keystoreName: parsed.keystore_name,
      share: parsed.share,
      description: parsed.description,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const response = await client.updateKeystore(parsed);
    const result = asItemResult(`Updated build keystore ${response.id}`, {
      id: response.id,
      keystoreName: response.keystore_name,
      share: response.share,
      description: response.description,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

function detectBuildUploadContentType(fileName: string) {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith(".xml")) return "application/xml";
  if (normalized.endsWith(".json")) return "application/json";
  if (normalized.endsWith(".txt")) return "text/plain";
  if (normalized.endsWith(".html")) return "text/html";
  return "application/octet-stream";
}

export function createBuildUploadJunitReportHandler(client: {
  uploadJunitReport: (input: {
    job_id: string;
    build_no: number;
    node_id: string;
    files: Array<{ file_name: string; file_content: Uint8Array; content_type?: string }>;
  }) => Promise<{
    job_id: string;
    build_no: number;
    node_id: string;
    file_names: string[];
    status?: string;
    result?: unknown;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUploadJunitReportInput.parse(input);
    const fileNames = parsed.file_paths.map((filePath) => basename(filePath));
    const preview = asItemResult(`Dry run: upload ${fileNames.length} JUnit report file(s) for ${parsed.job_id}`, {
      jobId: parsed.job_id,
      buildNo: parsed.build_no,
      nodeId: parsed.node_id,
      fileNames,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const files = await Promise.all(parsed.file_paths.map(async (filePath) => {
      const fileName = basename(filePath);
      const content = await readFile(filePath);
      return {
        file_name: fileName,
        file_content: new Uint8Array(content),
        content_type: detectBuildUploadContentType(fileName)
      };
    }));

    const response = await client.uploadJunitReport({
      job_id: parsed.job_id,
      build_no: parsed.build_no,
      node_id: parsed.node_id,
      files
    });
    const result = asItemResult(`Uploaded ${response.file_names.length} JUnit report file(s) for ${response.job_id}`, {
      jobId: response.job_id,
      buildNo: response.build_no,
      nodeId: response.node_id,
      fileNames: response.file_names,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createBuildUploadJunitCoverageHandler(client: {
  uploadJunitCoverage: (input: {
    job_id: string;
    build_no: number;
    node_id: string;
    files: Array<{ file_name: string; file_content: Uint8Array; content_type?: string }>;
  }) => Promise<{
    job_id: string;
    build_no: number;
    node_id: string;
    file_names: string[];
    status?: string;
    result?: unknown;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUploadJunitCoverageInput.parse(input);
    const fileNames = parsed.file_paths.map((filePath) => basename(filePath));
    const preview = asItemResult(`Dry run: upload ${fileNames.length} JUnit coverage file(s) for ${parsed.job_id}`, {
      jobId: parsed.job_id,
      buildNo: parsed.build_no,
      nodeId: parsed.node_id,
      fileNames,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return { content: [{ type: "text" as const, text: preview.summary }], structuredContent: preview };
    }

    const files = await Promise.all(parsed.file_paths.map(async (filePath) => {
      const fileName = basename(filePath);
      const content = await readFile(filePath);
      return {
        file_name: fileName,
        file_content: new Uint8Array(content),
        content_type: detectBuildUploadContentType(fileName)
      };
    }));

    const response = await client.uploadJunitCoverage({
      job_id: parsed.job_id,
      build_no: parsed.build_no,
      node_id: parsed.node_id,
      files
    });
    const result = asItemResult(`Uploaded ${response.file_names.length} JUnit coverage file(s) for ${response.job_id}`, {
      jobId: response.job_id,
      buildNo: response.build_no,
      nodeId: response.node_id,
      fileNames: response.file_names,
      status: response.status,
      result: response.result,
      executed: true
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
