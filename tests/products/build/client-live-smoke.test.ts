import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createBuildClient } from "../../../src/products/build/client.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_BUILD_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_PROJECT_ID?.trim() || "b60f3ec187f34c35ad3033d1d6d73876";
}

function readProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_BUILD_LIVE_PROJECT_IDS?.trim();

  if (!raw) {
    return [
      "b60f3ec187f34c35ad3033d1d6d73876",
      "eed055d650fb49dd88e49e6bdf88d344",
      "eb80951449fa4af8bac57494f0f4defd"
    ];
  }

  const ids = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : ["b60f3ec187f34c35ad3033d1d6d73876"];
}

function readJobId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_JOB_ID?.trim() || "cb9308bf8ece41909247bacd26b32cad";
}

function readBuildProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_BUILD_PROJECT_ID?.trim() || "8e729e8a-1286-4d9e-bed2-a4bbbfeb582a";
}

function readRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_RECORD_ID?.trim() || "b06f2e3e-e5be-4e8f-8a99-91783c96d6fd";
}

function readInfoBuildNo(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_BUILD_LIVE_INFO_BUILD_NO?.trim();
  return raw ? Number(raw) : 2;
}

function readHistoryBuildNo(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_BUILD_LIVE_HISTORY_BUILD_NO?.trim();
  return raw ? Number(raw) : 4;
}

function readStopBuildNo(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_BUILD_LIVE_STOP_BUILD_NO?.trim();
  return raw ? Number(raw) : 5;
}

function readProbeRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_PROBE_RECORD_ID?.trim() || "00000000-0000-0000-0000-000000000000";
}

if (hasLiveEnv(process.env)) {
  describe("createBuildClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.buildBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createBuildClient(http);
    const projectId = readProjectId(process.env);
    const projectIds = readProjectIds(process.env);
    const jobId = readJobId(process.env);
    const buildProjectId = readBuildProjectId(process.env);
    const recordId = readRecordId(process.env);
    const infoBuildNo = readInfoBuildNo(process.env);
    const historyBuildNo = readHistoryBuildNo(process.env);
    const stopBuildNo = readStopBuildNo(process.env);
    const probeRecordId = readProbeRecordId(process.env);

    it("lists jobs across configured projects and gets the known live job", async () => {
      const [jobLists, job] = await Promise.all([
        Promise.all(
          projectIds.map((candidateProjectId) =>
            client.listJobs({
              project_id: candidateProjectId,
              page: 1,
              page_size: 20
            })
          )
        ),
        client.getJob({
          job_id: jobId
        })
      ]);

      expect(jobLists.every((entry) => Array.isArray(entry.jobs))).toBe(true);
      expect(job.job_id).toBe(jobId);
      expect(typeof job.name).toBe("string");
    }, 30000);

    it("lists job records and project-level records/statistics", async () => {
      const [records, projectRecords, statistics] = await Promise.all([
        client.listRecords({
          job_id: jobId,
          page: 1,
          page_size: 20
        }),
        client.listProjectRecords({
          project_id: projectId,
          build_project_id: buildProjectId,
          page: 1,
          page_size: 20
        }),
        client.getProjectRecordStatistics({
          project_id: projectId,
          build_project_id: buildProjectId
        })
      ]);

      expect(Array.isArray(records.records)).toBe(true);
      expect(records.records.length).toBeGreaterThan(0);
      expect(Array.isArray(projectRecords.records)).toBe(true);
      expect(projectRecords.records.length).toBeGreaterThan(0);
      expect(statistics.total === undefined || typeof statistics.total === "number").toBe(true);
    }, 30000);

    it("gets record detail, script, parameters, and full stages", async () => {
      const [record, script, parameters, stages] = await Promise.all([
        client.getRecord({
          record_id: recordId
        }),
        client.getRecordScript({
          record_id: recordId
        }),
        client.listBuildParameters({
          job_id: jobId,
          build_no: infoBuildNo
        }),
        client.getFullStages({
          record_id: recordId,
          cascade: true
        })
      ]);

      expect(record.record_id).toBe(recordId);
      expect(typeof script.record_id).toBe("string");
      expect(Array.isArray(parameters.parameters)).toBe(true);
      expect(typeof stages.build_stages).toBe("object");
    }, 30000);

    it("gets info, history details, real-time log, and error log for known builds", async () => {
      const [info, history, realTimeLog, errorLog] = await Promise.all([
        client.getInfoRecord({
          job_id: jobId,
          build_no: infoBuildNo
        }),
        client.getHistoryDetails({
          job_id: jobId,
          build_number: historyBuildNo
        }),
        client.getRealTimeLog({
          job_id: jobId,
          build_no: historyBuildNo,
          offset: 0
        }),
        client.getErrorLog({
          job_id: jobId,
          build_no: historyBuildNo,
          page: 1,
          page_size: 20
        })
      ]);

      expect(info.number === undefined || typeof info.number === "number").toBe(true);
      expect(history.job_id).toBe(jobId);
      expect(realTimeLog.build_no).toBe(historyBuildNo);
      expect(Array.isArray(errorLog.error_nodes)).toBe(true);
    }, 30000);

    it("gets flow graph for the known live record and still rejects a non-existent probe id", async () => {
      const flowGraph = await client.getRecordFlowGraph({
        record_id: recordId
      });

      expect(flowGraph.record_id).toBe(recordId);
      expect(Array.isArray(flowGraph.nodes)).toBe(true);
      expect(Array.isArray(flowGraph.edges)).toBe(true);

      await expect(
        client.getRecordFlowGraph({
          record_id: probeRecordId
        })
      ).rejects.toMatchObject({
        code: "DEVCB.00031006",
        status: 422
      });
    }, 30000);

    it("reaches stop on the known live build sample", async () => {
      try {
        const result = await client.stopJob({
          job_id: jobId,
          build_no: stopBuildNo
        });

        expect(result.job_id).toBe(jobId);
        expect(result.build_no).toBe(stopBuildNo);
        expect(result.result).toBe(true);
      } catch (error: any) {
        expect(error).toMatchObject({
          code: "DEV.CB.032302",
          status: 400
        });
      }
    }, 30000);
  });
} else {
  describe.skip("createBuildClient live smoke", () => {});
}
