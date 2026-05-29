import { describe, expect, it } from "vitest";
import {
  createBuildGetBuildDetailsHandler,
  createBuildGetJobRunningStatusV3Handler,
  createBuildGetJobInfoHandler,
  createBuildGetJobOutputHandler,
  createBuildGetOutputInfoV3Handler,
  createBuildGetRecordInfoV4Handler,
  createBuildGetTaskLogPageHandler,
  createBuildListAllJobsHandler,
  createBuildListBriefRecordsHandler,
  createBuildListCustomTemplatesHandler,
  createBuildListJobHistoryV3Handler,
  createBuildListJobNoticesV3Handler,
  createBuildListJobUpdateHistoryHandler,
  createBuildListKeystoreFilesHandler,
  createBuildListUsableKeystoreNamesHandler
} from "../../../../src/products/build/tools/additional-read-tools.js";

describe("Build additional read tool handlers", () => {
  it("maps job update history as a list result", async () => {
    const handler = createBuildListJobUpdateHistoryHandler({
      listJobUpdateHistory: async () => ({
        history: [{ id: "h1", name: "config changed" }],
        total: 1
      })
    } as never);

    const result = await handler({ job_id: "job-1" });

    expect(result.structuredContent.summary).toBe("1 Build job update history records found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "h1",
      name: "config changed"
    });
    expect(result.content[0]?.text).toContain("config changed");
  });

  it("maps job output as an item result", async () => {
    const handler = createBuildGetJobOutputHandler({
      getJobOutput: async () => ({
        job_id: "job-1",
        build_no: 2,
        raw: { output: "ok" }
      })
    } as never);

    const result = await handler({ job_id: "job-1", build_no: 2 });

    expect(result.structuredContent.item).toMatchObject({
      id: "job-1#2",
      jobId: "job-1",
      buildNo: 2,
      output: { output: "ok" }
    });
  });

  it("maps new Build official read query handlers", async () => {
    const allJobs = await createBuildListAllJobsHandler({
      listAllJobs: async () => ({
        jobs: [{ id: "job-1", name: "gateway" }],
        total: 1,
        raw: { total: 1 }
      })
    } as never)({ page: 1, page_size: 10 });
    const briefRecords = await createBuildListBriefRecordsHandler({
      listBriefRecords: async () => ({
        records: [{ id: "record-1", job_id: "job-1" }],
        total: 1,
        raw: { total: 1 }
      })
    } as never)({ build_project_ids: ["build-project-1"] });
    const history = await createBuildListJobHistoryV3Handler({
      listJobHistoryV3: async () => ({
        records: [{ id: "history-1", status: "success" }],
        total: 1,
        raw: { total: 1 }
      })
    } as never)({ job_id: "job-1", page: 1, page_size: 10 });
    const status = await createBuildGetJobRunningStatusV3Handler({
      getJobRunningStatusV3: async () => ({
        job_id: "job-1",
        value: true,
        raw: { is_running: true }
      })
    } as never)({ job_id: "job-1" });

    expect(allJobs.structuredContent.items?.[0]).toMatchObject({
      id: "job-1",
      name: "gateway",
      job: { id: "job-1", name: "gateway" }
    });
    expect(briefRecords.structuredContent.items?.[0]).toMatchObject({
      id: "record-1",
      record: { id: "record-1", job_id: "job-1" }
    });
    expect(history.structuredContent.items?.[0]).toMatchObject({
      id: "history-1",
      record: { id: "history-1", status: "success" }
    });
    expect(status.structuredContent.item).toMatchObject({
      id: "job-1",
      value: true,
      status: { is_running: true }
    });
  });

  it("maps keystore file metadata without exposing file contents", async () => {
    const handler = createBuildListKeystoreFilesHandler({
      listKeystoreFiles: async () => ({
        files: [{ id: "ks1", name: "signing-key" }],
        total: 1
      })
    } as never);

    const result = await handler({ query: { page: 1 } });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "ks1",
      name: "signing-key",
      file: { id: "ks1", name: "signing-key" }
    });
  });

  it("maps newly dedicated official read tools", async () => {
    const jobInfo = await createBuildGetJobInfoHandler({
      getJobInfo: async () => ({
        job_id: "job-1",
        raw: { name: "build-main" }
      })
    } as never)({ job_id: "job-1" });

    const buildDetails = await createBuildGetBuildDetailsHandler({
      getBuildDetails: async () => ({
        job_id: "job-1",
        build_no: 3,
        raw: { building: false }
      })
    } as never)({ job_id: "job-1", build_no: 3 });

    const logPage = await createBuildGetTaskLogPageHandler({
      getTaskLogPage: async () => ({
        job_id: "job-1",
        build_no: 3,
        step_id: 2,
        raw: { logs: ["done"] }
      })
    } as never)({ job_id: "job-1", build_no: 3, step_id: 2 });

    const outputInfo = await createBuildGetOutputInfoV3Handler({
      getOutputInfoV3: async () => ({
        job_id: "job-1",
        build_no: 3,
        raw: { output: "pkg.zip" }
      })
    } as never)({ job_id: "job-1", build_no: 3 });

    const recordInfo = await createBuildGetRecordInfoV4Handler({
      getRecordInfoV4: async () => ({
        job_id: "job-1",
        build_no: 3,
        raw: { status: "success" }
      })
    } as never)({ job_id: "job-1", build_no: 3 });

    const customTemplates = await createBuildListCustomTemplatesHandler({
      listCustomTemplates: async () => ({
        templates: [{ uuid: "tpl-1", name: "Custom" }],
        total: 1
      })
    } as never)({ page: 1, page_size: 10 });

    const usableKeystores = await createBuildListUsableKeystoreNamesHandler({
      listUsableKeystoreNames: async () => ({
        files: [{ id: "ks-1", keystore_name: "android.jks" }],
        total: 1
      })
    } as never)({});

    const notices = await createBuildListJobNoticesV3Handler({
      listJobNoticesV3: async () => ({
        job_id: "job-1",
        notices: [{ id: "notice-1", endpoint: "email" }],
        total: 1
      })
    } as never)({ job_id: "job-1" });

    expect(jobInfo.structuredContent.item).toMatchObject({
      id: "job-1",
      jobInfo: { name: "build-main" }
    });
    expect(buildDetails.structuredContent.item).toMatchObject({
      id: "job-1#3",
      buildNo: 3,
      details: { building: false }
    });
    expect(logPage.structuredContent.item).toMatchObject({
      id: "job-1#3:2",
      stepId: 2,
      log: { logs: ["done"] }
    });
    expect(outputInfo.structuredContent.item).toMatchObject({
      id: "job-1#3",
      buildNo: 3,
      outputInfo: { output: "pkg.zip" }
    });
    expect(recordInfo.structuredContent.item).toMatchObject({
      id: "job-1#3",
      buildNo: 3,
      recordInfo: { status: "success" }
    });
    expect(customTemplates.structuredContent.items?.[0]).toMatchObject({
      id: "tpl-1",
      name: "Custom"
    });
    expect(usableKeystores.structuredContent.items?.[0]).toMatchObject({
      id: "ks-1",
      file: { id: "ks-1", keystore_name: "android.jks" }
    });
    expect(notices.structuredContent.items?.[0]).toMatchObject({
      id: "notice-1",
      notice: { id: "notice-1", endpoint: "email" }
    });
  });
});
