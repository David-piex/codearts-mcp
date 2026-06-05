import { describe, expect, it } from "vitest";
import {
  createBuildDisableJobHandler,
  createBuildDisableJobNoticeHandler,
  createBuildDisableJobV3Handler,
  createBuildUpdateJobGroupHandler
} from "../../../../src/products/build/tools/additional-mutation-tools.js";

describe("build new mutation tools", () => {
  it("returns dry-run previews for new build mutations", async () => {
    const disableJobHandler = createBuildDisableJobHandler({
      disableJob: async () => {
        throw new Error("should not execute");
      }
    });
    const result = await disableJobHandler({ job_id: "job-1" });
    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      disabled: true,
      reason: "",
      executed: false
    });
  });

  it("maps new build mutation responses", async () => {
    const disableJobHandler = createBuildDisableJobHandler({
      disableJob: async () => ({ job_id: "job-1", disabled: true, reason: "maintenance", status: "success" })
    });
    const disableJobV3Handler = createBuildDisableJobV3Handler({
      disableJobV3: async () => ({ job_id: "job-v3", status: "success" })
    });
    const updateJobGroupHandler = createBuildUpdateJobGroupHandler({
      updateJobGroup: async () => ({
        project_id: "project-1",
        id: "group-1",
        name: "Group-New",
        parent_id: "parent-1",
        status: "success",
        raw: { status: "success" }
      })
    });
    const disableNoticeHandler = createBuildDisableJobNoticeHandler({
      disableJobNotice: async () => ({ job_id: "job-2", notice_type: "MESSAGE", status: "success" })
    });

    expect((await disableJobHandler({ job_id: "job-1", disabled: true, reason: "maintenance", dry_run: false })).structuredContent.item).toEqual({
      id: "job-1",
      disabled: true,
      reason: "maintenance",
      status: "success",
      executed: true
    });
    expect((await disableJobV3Handler({ job_id: "job-v3", dry_run: false })).structuredContent.item).toEqual({
      id: "job-v3",
      status: "success",
      executed: true
    });
    expect((await updateJobGroupHandler({ project_id: "project-1", id: "group-1", name: "Group-New", parent_id: "parent-1", dry_run: false })).structuredContent.item).toEqual({
      id: "group-1",
      projectId: "project-1",
      name: "Group-New",
      parentId: "parent-1",
      ordinal: undefined,
      pathId: undefined,
      status: "success",
      raw: { status: "success" },
      executed: true
    });
    expect((await disableNoticeHandler({ job_id: "job-2", notice_type: "MESSAGE", dry_run: false })).structuredContent.item).toEqual({
      id: "job-2",
      noticeType: "MESSAGE",
      status: "success",
      executed: true
    });
  });
});
