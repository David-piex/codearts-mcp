import { describe, expect, it } from "vitest";
import {
  createBuildClearRecyclingJobsHandler,
  createBuildDeleteJobHandler,
  createBuildDeleteRecyclingJobsHandler,
  createBuildFollowJobHandler,
  createBuildRestoreRecyclingJobsHandler,
  createBuildSetKeepTimeHandler,
  createBuildUnfollowJobHandler
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
});
