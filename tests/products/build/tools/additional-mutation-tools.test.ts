import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import {
  createBuildAddKeystorePermissionHandler,
  createBuildAutoExecuteJobHandler,
  createBuildBatchDeleteJobsHandler,
  createBuildBatchSetAgencyHandler,
  createBuildBatchUpdateJobPermissionsHandler,
  createBuildCheckWebhookUrlHandler,
  createBuildClearRecyclingJobsHandler,
  createBuildCopyJobHandler,
  createBuildCreateJobGroupHandler,
  createBuildCreateJobHandler,
  createBuildDeleteJobGroupHandler,
  createBuildDeleteJobHandler,
  createBuildDeleteJobV3Handler,
  createBuildDeleteKeystoreHandler,
  createBuildDeleteKeystorePermissionHandler,
  createBuildDeleteRecyclingJobsHandler,
  createBuildDeleteTemplateHandler,
  createBuildFollowCustomTemplateHandler,
  createBuildFollowJobHandler,
  createBuildFollowOfficialTemplateHandler,
  createBuildMoveJobGroupHandler,
  createBuildRecoverJobV3Handler,
  createBuildRestoreRecyclingJobsHandler,
  createBuildSaveTemplateUsedInfoHandler,
  createBuildSetKeepTimeHandler,
  createBuildSwapJobGroupHandler,
  createBuildUnfollowCustomTemplateHandler,
  createBuildUnfollowJobHandler,
  createBuildUnfollowOfficialTemplateHandler,
  createBuildUpdateJobNoticeHandler,
  createBuildUploadKeystoreHandler,
  createBuildUpdateJobRolePermissionHandler
} from "../../../../src/products/build/tools/additional-mutation-tools.js";

describe("build additional mutation tools", () => {
  it("returns dry-run previews without executing", async () => {
    const handler = createBuildDeleteRecyclingJobsHandler({
      deleteRecyclingJobs: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({ job_ids: ["job-1"] });

    expect(result.structuredContent.item).toEqual({
      jobIds: ["job-1"],
      executed: false
    });
  });

  it("maps delete and keep-time responses", async () => {
    const deleteHandler = createBuildDeleteJobHandler({
      deleteJob: async () => ({
        job_id: "job-1",
        project_id: "project-1",
        status: "success"
      })
    });
    const keepTimeHandler = createBuildSetKeepTimeHandler({
      setKeepTime: async () => ({
        keep_time: 29,
        status: "success"
      })
    });

    const deleteResult = await deleteHandler({ job_id: "job-1", dry_run: false });
    const keepTimeResult = await keepTimeHandler({ keep_time: 29, dry_run: false });

    expect(deleteResult.structuredContent.item).toEqual({
      id: "job-1",
      projectId: "project-1",
      status: "success",
      executed: true
    });
    expect(keepTimeResult.structuredContent.item).toEqual({
      keepTime: 29,
      status: "success",
      executed: true
    });
  });

  it("maps recycling and follow responses", async () => {
    const clearHandler = createBuildClearRecyclingJobsHandler({
      clearRecyclingJobs: async () => ({
        status: "success"
      })
    });
    const restoreHandler = createBuildRestoreRecyclingJobsHandler({
      restoreRecyclingJobs: async () => ({
        job_ids: ["job-2"],
        status: "success"
      })
    });
    const followHandler = createBuildFollowJobHandler({
      followJob: async () => ({
        job_id: "job-3",
        favorite: true,
        status: "success"
      })
    });
    const unfollowHandler = createBuildUnfollowJobHandler({
      unfollowJob: async () => ({
        job_id: "job-3",
        favorite: false,
        status: "success"
      })
    });

    const clearResult = await clearHandler({ dry_run: false });
    const restoreResult = await restoreHandler({ job_ids: ["job-2"], dry_run: false });
    const followResult = await followHandler({ job_id: "job-3", dry_run: false });
    const unfollowResult = await unfollowHandler({ job_id: "job-3", dry_run: false });

    expect(clearResult.structuredContent.item).toEqual({
      status: "success",
      executed: true
    });
    expect(restoreResult.structuredContent.item).toEqual({
      jobIds: ["job-2"],
      status: "success",
      executed: true
    });
    expect(followResult.structuredContent.item).toEqual({
      id: "job-3",
      favorite: true,
      status: "success",
      executed: true
    });
    expect(unfollowResult.structuredContent.item).toEqual({
      id: "job-3",
      favorite: false,
      status: "success",
      executed: true
    });
  });

  it("maps template, keystore, and v3 job responses", async () => {
    const deleteTemplateHandler = createBuildDeleteTemplateHandler({
      deleteTemplate: async () => ({
        uuid: "tpl-1",
        status: "success"
      })
    });
    const saveTemplateUsedInfoHandler = createBuildSaveTemplateUsedInfoHandler({
      saveTemplateUsedInfo: async () => ({
        job_id: "job-1",
        template_id: "tpl-1",
        status: "success",
        result: "success"
      })
    });
    const followCustomTemplateHandler = createBuildFollowCustomTemplateHandler({
      followCustomTemplate: async () => ({
        uuid: "tpl-custom-1",
        favorite: true,
        status: "success"
      })
    });
    const unfollowCustomTemplateHandler = createBuildUnfollowCustomTemplateHandler({
      unfollowCustomTemplate: async () => ({
        uuid: "tpl-custom-1",
        favorite: false,
        status: "success"
      })
    });
    const followOfficialTemplateHandler = createBuildFollowOfficialTemplateHandler({
      followOfficialTemplate: async () => ({
        uuid: "tpl-official-1",
        favorite: true,
        status: "success"
      })
    });
    const unfollowOfficialTemplateHandler = createBuildUnfollowOfficialTemplateHandler({
      unfollowOfficialTemplate: async () => ({
        uuid: "tpl-official-1",
        favorite: false,
        status: "success"
      })
    });
    const deleteKeystoreHandler = createBuildDeleteKeystoreHandler({
      deleteKeystore: async () => ({
        keystore_id: "key-1",
        status: "success"
      })
    });
    const deleteKeystorePermissionHandler = createBuildDeleteKeystorePermissionHandler({
      deleteKeystorePermission: async () => ({
        permission_id: "perm-1",
        status: "success"
      })
    });
    const deleteJobV3Handler = createBuildDeleteJobV3Handler({
      deleteJobV3: async () => ({
        job_id: "job-v3",
        project_id: "project-v3",
        status: "success"
      })
    });
    const recoverJobV3Handler = createBuildRecoverJobV3Handler({
      recoverJobV3: async () => ({
        job_id: "job-v3",
        status: "success"
      })
    });

    const deleteTemplateResult = await deleteTemplateHandler({ uuid: "tpl-1", dry_run: false });
    const saveTemplateUsedInfoResult = await saveTemplateUsedInfoHandler({
      job_id: "job-1",
      template_id: "tpl-1",
      dry_run: false
    });
    const followCustomTemplateResult = await followCustomTemplateHandler({ uuid: "tpl-custom-1", dry_run: false });
    const unfollowCustomTemplateResult = await unfollowCustomTemplateHandler({ uuid: "tpl-custom-1", dry_run: false });
    const followOfficialTemplateResult = await followOfficialTemplateHandler({ uuid: "tpl-official-1", dry_run: false });
    const unfollowOfficialTemplateResult = await unfollowOfficialTemplateHandler({ uuid: "tpl-official-1", dry_run: false });
    const deleteKeystoreResult = await deleteKeystoreHandler({ keystore_id: "key-1", dry_run: false });
    const deleteKeystorePermissionResult = await deleteKeystorePermissionHandler({ permission_id: "perm-1", dry_run: false });
    const deleteJobV3Result = await deleteJobV3Handler({ job_id: "job-v3", dry_run: false });
    const recoverJobV3Result = await recoverJobV3Handler({ job_id: "job-v3", dry_run: false });

    expect(deleteTemplateResult.structuredContent.item).toEqual({
      id: "tpl-1",
      status: "success",
      executed: true
    });
    expect(saveTemplateUsedInfoResult.structuredContent.item).toEqual({
      id: "job-1",
      templateId: "tpl-1",
      status: "success",
      result: "success",
      executed: true
    });
    expect(followCustomTemplateResult.structuredContent.item).toEqual({
      id: "tpl-custom-1",
      favorite: true,
      status: "success",
      executed: true
    });
    expect(unfollowCustomTemplateResult.structuredContent.item).toEqual({
      id: "tpl-custom-1",
      favorite: false,
      status: "success",
      executed: true
    });
    expect(followOfficialTemplateResult.structuredContent.item).toEqual({
      id: "tpl-official-1",
      favorite: true,
      status: "success",
      executed: true
    });
    expect(unfollowOfficialTemplateResult.structuredContent.item).toEqual({
      id: "tpl-official-1",
      favorite: false,
      status: "success",
      executed: true
    });
    expect(deleteKeystoreResult.structuredContent.item).toEqual({
      id: "key-1",
      status: "success",
      executed: true
    });
    expect(deleteKeystorePermissionResult.structuredContent.item).toEqual({
      id: "perm-1",
      status: "success",
      executed: true
    });
    expect(deleteJobV3Result.structuredContent.item).toEqual({
      id: "job-v3",
      projectId: "project-v3",
      status: "success",
      executed: true
    });
    expect(recoverJobV3Result.structuredContent.item).toEqual({
      id: "job-v3",
      status: "success",
      executed: true
    });
  });

  it("maps admin mutation responses", async () => {
    const checkWebhookUrlHandler = createBuildCheckWebhookUrlHandler({
      checkWebhookUrl: async (input) => ({
        ...input,
        status: "success"
      })
    });
    const autoExecuteJobHandler = createBuildAutoExecuteJobHandler({
      autoExecuteJob: async () => ({
        job_id: "job-2",
        status: "success"
      })
    });
    const batchUpdateJobPermissionsHandler = createBuildBatchUpdateJobPermissionsHandler({
      batchUpdateJobPermissions: async () => ({
        project_id: "project-1",
        job_ids: ["job-a", "job-b"],
        status: "success"
      })
    });
    const batchDeleteJobsHandler = createBuildBatchDeleteJobsHandler({
      batchDeleteJobs: async () => ({
        job_ids: ["job-a", "job-b"],
        project_id: "project-1",
        deleted_job_id: "job-a",
        status: "success"
      })
    });
    const batchSetAgencyHandler = createBuildBatchSetAgencyHandler({
      batchSetAgency: async () => ({
        job_ids: ["job-a", "job-b"],
        agency_urn: "iam::test:agency:build",
        status: "success"
      })
    });
    const updateJobRolePermissionHandler = createBuildUpdateJobRolePermissionHandler({
      updateJobRolePermission: async () => ({
        job_id: "job-2",
        role_id: "5",
        permission_name: "is_modify",
        permission_value: true,
        status: "success"
      })
    });
    const moveJobGroupHandler = createBuildMoveJobGroupHandler({
      moveJobGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        jobs: [{ job_id: "job-a", group_path_id: "path-1" }],
        status: "success"
      })
    });
    const swapJobGroupHandler = createBuildSwapJobGroupHandler({
      swapJobGroup: async () => ({
        project_id: "project-1",
        source_group_id: "group-a",
        target_group_id: "group-b",
        status: "success"
      })
    });
    const deleteJobGroupHandler = createBuildDeleteJobGroupHandler({
      deleteJobGroup: async () => ({
        project_id: "project-1",
        id: "group-1",
        status: "success",
        result: null
      })
    });
    const addKeystorePermissionHandler = createBuildAddKeystorePermissionHandler({
      addKeystorePermission: async () => ({
        keystore_id: "key-1",
        user_id: "user-1",
        user_name: "alice",
        status: "success"
      })
    });

    expect((await checkWebhookUrlHandler({
      job_id: "job-2",
      notice_type: "DING_TALK",
      webhook_url: "https://oapi.example.com/hook",
      dry_run: false
    })).structuredContent.item).toEqual({
      id: "job-2",
      noticeType: "DING_TALK",
      webhookUrl: "https://oapi.example.com/hook",
      status: "success",
      result: undefined,
      executed: true
    });
    expect((await autoExecuteJobHandler({ job_id: "job-2", dry_run: false })).structuredContent.item).toEqual({
      id: "job-2",
      status: "success",
      result: undefined,
      executed: true
    });
    expect((await batchUpdateJobPermissionsHandler({
      project_id: "project-1",
      job_ids: ["job-a", "job-b"],
      permissions: [{ role_id: -1, is_view: true }],
      dry_run: false
    })).structuredContent.item).toEqual({
      projectId: "project-1",
      jobIds: ["job-a", "job-b"],
      status: "success",
      executed: true
    });
    expect((await batchDeleteJobsHandler({ job_ids: ["job-a", "job-b"], dry_run: false })).structuredContent.item).toEqual({
      jobIds: ["job-a", "job-b"],
      projectId: "project-1",
      deletedJobId: "job-a",
      status: "success",
      executed: true
    });
    expect((await batchSetAgencyHandler({
      job_ids: ["job-a", "job-b"],
      agency_urn: "iam::test:agency:build",
      dry_run: false
    })).structuredContent.item).toEqual({
      jobIds: ["job-a", "job-b"],
      agencyUrn: "iam::test:agency:build",
      status: "success",
      executed: true
    });
    expect((await updateJobRolePermissionHandler({
      job_id: "job-2",
      role_id: "5",
      permission_name: "is_modify",
      permission_value: true,
      dry_run: false
    })).structuredContent.item).toEqual({
      id: "job-2",
      roleId: "5",
      permissionName: "is_modify",
      permissionValue: true,
      status: "success",
      executed: true
    });
    expect((await moveJobGroupHandler({
      project_id: "project-1",
      group_id: "group-1",
      jobs: [{ job_id: "job-a", job_name: "Build-A" }],
      dry_run: false
    })).structuredContent.item).toEqual({
      projectId: "project-1",
      groupId: "group-1",
      jobs: [{ job_id: "job-a", group_path_id: "path-1" }],
      status: "success",
      executed: true
    });
    expect((await deleteJobGroupHandler({
      project_id: "project-1",
      id: "group-1",
      dry_run: false
    })).structuredContent.item).toEqual({
      projectId: "project-1",
      groupId: "group-1",
      status: "success",
      result: null,
      executed: true
    });
    expect((await swapJobGroupHandler({
      project_id: "project-1",
      source_group_id: "group-a",
      target_group_id: "group-b",
      dry_run: false
    })).structuredContent.item).toEqual({
      projectId: "project-1",
      sourceGroupId: "group-a",
      targetGroupId: "group-b",
      status: "success",
      executed: true
    });
    expect((await addKeystorePermissionHandler({
      keystore_id: "key-1",
      user_id: "user-1",
      user_name: "alice",
      setting: false,
      delete: false,
      modify: false,
      usage: false,
      can_absent: true,
      dry_run: false
    })).structuredContent.item).toEqual({
      id: "key-1",
      userId: "user-1",
      userName: "alice",
      status: "success",
      executed: true
    });
  });

  it("maps create, copy, notice, group-create, and keystore-upload responses", async () => {
    const createJobHandler = createBuildCreateJobHandler({
      createJob: async () => ({
        project_id: "project-1",
        job_name: "build-new",
        job_id: "job-new-1",
        status: "success",
        raw: { id: "job-new-1" }
      })
    });
    const copyJobHandler = createBuildCopyJobHandler({
      copyJob: async () => ({
        project_id: "project-1",
        copy_job_id: "job-src",
        job_name: "build-copy",
        job_id: "job-copy-1",
        status: "success",
        raw: { id: "job-copy-1" }
      })
    });
    const updateNoticeHandler = createBuildUpdateJobNoticeHandler({
      updateJobNotice: async () => ({
        job_id: "job-1",
        status: "success",
        raw: { status: "success" }
      })
    });
    const createGroupHandler = createBuildCreateJobGroupHandler({
      createJobGroup: async () => ({
        project_id: "project-1",
        id: "group-new-1",
        group_id: "job-group-1",
        name: "Group-A",
        parent_id: "parent-1",
        status: "success",
        raw: { id: "group-new-1" }
      })
    });
    const uploadKeystoreHandler = createBuildUploadKeystoreHandler({
      uploadKeystore: async () => ({
        file_name: "android.jks",
        privacy: true,
        description: "android signing",
        status: "success",
        raw: { id: "key-1" }
      })
    });

    const createJobResult = await createJobHandler({
      project_id: "project-1",
      job_name: "build-new",
      dry_run: false
    });
    const copyJobResult = await copyJobHandler({
      project_id: "project-1",
      copy_job_id: "job-src",
      job_name: "build-copy",
      dry_run: false
    });
    const updateNoticeResult = await updateNoticeHandler({
      job_id: "job-1",
      notice_type: "DING_TALK",
      enabled_event_type_names: ["buildJobSuccess"],
      dry_run: false
    });
    const createGroupResult = await createGroupHandler({
      project_id: "project-1",
      name: "Group-A",
      parent_id: "parent-1",
      dry_run: false
    });
    const uploadKeystoreResult = await uploadKeystoreHandler({
      file_path: resolve("tests/fixtures/build/android.jks"),
      privacy: true,
      description: "android signing",
      dry_run: false
    });

    expect(createJobResult.structuredContent.item).toEqual({
      id: "job-new-1",
      projectId: "project-1",
      name: "build-new",
      status: "success",
      raw: { id: "job-new-1" },
      executed: true
    });
    expect(copyJobResult.structuredContent.item).toEqual({
      id: "job-copy-1",
      projectId: "project-1",
      sourceJobId: "job-src",
      name: "build-copy",
      status: "success",
      raw: { id: "job-copy-1" },
      executed: true
    });
    expect(updateNoticeResult.structuredContent.item).toEqual({
      id: "job-1",
      noticeType: "DING_TALK",
      enabledEventTypeNames: ["buildJobSuccess"],
      status: "success",
      raw: { status: "success" },
      executed: true
    });
    expect(createGroupResult.structuredContent.item).toEqual({
      id: "group-new-1",
      projectId: "project-1",
      name: "Group-A",
      parentId: "parent-1",
      groupId: "job-group-1",
      status: "success",
      raw: { id: "group-new-1" },
      executed: true
    });
    expect(uploadKeystoreResult.structuredContent.item).toEqual({
      fileName: "android.jks",
      privacy: true,
      description: "android signing",
      status: "success",
      raw: { id: "key-1" },
      executed: true
    });
  });
});
