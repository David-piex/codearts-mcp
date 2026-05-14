import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createBuildClient } from "../../../src/products/build/client.js";

async function readReachable<T>(operation: () => Promise<T>) {
  try {
    return {
      ok: true as const,
      value: await operation()
    };
  } catch (error: any) {
    return {
      ok: false as const,
      error
    };
  }
}

function expectReachedProvider(result: Awaited<ReturnType<typeof readReachable>>) {
  if (result.ok) {
    expect(result.value).toBeDefined();
    return;
  }

  expect(result.error).toMatchObject({
    category: expect.stringMatching(/^(provider_error|not_found)$/),
    status: expect.any(Number)
  });
}

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

function readGitCodeEndpointId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_GIT_CODE_ENDPOINT_ID?.trim();
}

function readGitCodeRepositoryName(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_BUILD_LIVE_GIT_CODE_REPOSITORY_NAME?.trim();
}

function createPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  page: number;
  page_size: number;
} & T {
  return {
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    page: number;
    page_size: number;
  } & T;
}

function createProjectPageInput<T extends Record<string, unknown>>(
  projectId: string,
  overrides?: T
): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: projectId,
    ...createPageInput(overrides)
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createJobPageInput<T extends Record<string, unknown>>(
  jobId: string,
  overrides?: T
): {
  job_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    job_id: jobId,
    ...createPageInput(overrides)
  } as {
    job_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createRecordInput<T extends Record<string, unknown>>(
  recordId: string,
  overrides?: T
): {
  record_id: string;
} & T {
  return {
    record_id: recordId,
    ...(overrides ?? {})
  } as {
    record_id: string;
  } & T;
}

function createJobBuildInput<T extends Record<string, unknown>>(
  jobId: string,
  buildNo: number,
  overrides?: T
): {
  job_id: string;
  build_no: number;
} & T {
  return {
    job_id: jobId,
    build_no: buildNo,
    ...(overrides ?? {})
  } as {
    job_id: string;
    build_no: number;
  } & T;
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
    const gitCodeEndpointId = readGitCodeEndpointId(process.env);
    const gitCodeRepositoryName = readGitCodeRepositoryName(process.env);

    it("lists jobs across configured projects and gets the known live job", async () => {
      const [jobLists, job] = await Promise.all([
        Promise.all(
          projectIds.map((candidateProjectId) =>
            client.listJobs(createProjectPageInput(candidateProjectId))
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
        client.listRecords(createJobPageInput(jobId)),
        client.listProjectRecords(
          createProjectPageInput(projectId, {
            build_project_id: buildProjectId
          })
        ),
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
        client.getRecord(createRecordInput(recordId)),
        client.getRecordScript(createRecordInput(recordId)),
        client.listBuildParameters(createJobBuildInput(jobId, infoBuildNo)),
        client.getFullStages(
          createRecordInput(recordId, {
            cascade: true
          })
        )
      ]);

      expect(record.record_id).toBe(recordId);
      expect(typeof script.record_id).toBe("string");
      expect(Array.isArray(parameters.parameters)).toBe(true);
      expect(typeof stages.build_stages).toBe("object");
    }, 30000);

    it("gets info, history details, real-time log, and error log for known builds", async () => {
      const [info, history, realTimeLog, errorLog] = await Promise.all([
        client.getInfoRecord(createJobBuildInput(jobId, infoBuildNo)),
        client.getHistoryDetails({
          job_id: jobId,
          build_number: historyBuildNo
        }),
        client.getRealTimeLog(
          createJobBuildInput(jobId, historyBuildNo, {
            offset: 0
          })
        ),
        client.getErrorLog(
          createJobBuildInput(jobId, historyBuildNo, createPageInput())
        )
      ]);

      expect(info.number === undefined || typeof info.number === "number").toBe(true);
      expect(history.job_id).toBe(jobId);
      expect(realTimeLog.build_no).toBe(historyBuildNo);
      expect(Array.isArray(errorLog.error_nodes)).toBe(true);
    }, 30000);

    it("gets flow graph for the known live record and still rejects a non-existent probe id", async () => {
      const flowGraph = await client.getRecordFlowGraph(createRecordInput(recordId));

      expect(flowGraph.record_id).toBe(recordId);
      expect(Array.isArray(flowGraph.nodes)).toBe(true);
      expect(Array.isArray(flowGraph.edges)).toBe(true);

      await expect(
        client.getRecordFlowGraph(createRecordInput(probeRecordId))
      ).rejects.toMatchObject({
        code: "DEVCB.00031006",
        status: 422
      });
    }, 30000);

    it("reaches stop on the known live build sample", async () => {
      try {
        const result = await client.stopJob({
          ...createJobBuildInput(jobId, stopBuildNo)
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

    it("gets Build domain and permission metadata", async () => {
      const [
        userPermission,
        packageQuota,
        chargeType,
        federation,
        domainStatus,
        relatedProjects,
        permissionRoles,
        internalPermission,
        jobPermission
      ] = await Promise.all([
        readReachable(() => client.getDomainUserPermission({ project_id: projectId })),
        readReachable(() => client.getDomainPackageQuota({ project_id: projectId })),
        readReachable(() => client.getDomainChargeType()),
        readReachable(() => client.getDomainFederation()),
        readReachable(() => client.getDomainStatus()),
        readReachable(() => client.getDomainRelatedProjects()),
        readReachable(() => client.listJobPermissionRoles({ job_id: jobId })),
        readReachable(() => client.getJobPermissionInternal()),
        readReachable(() => client.getJobPermission({ project_id: projectId, job_id: jobId }))
      ]);

      expectReachedProvider(userPermission);
      expectReachedProvider(packageQuota);
      expectReachedProvider(chargeType);
      expectReachedProvider(federation);
      expectReachedProvider(domainStatus);
      expectReachedProvider(relatedProjects);
      expectReachedProvider(permissionRoles);
      expectReachedProvider(internalPermission);
      expectReachedProvider(jobPermission);

      if (userPermission.ok) expect(userPermission.value.project_id).toBe(projectId);
      if (packageQuota.ok) expect(packageQuota.value.project_id).toBe(projectId);
      if (chargeType.ok) expect(typeof chargeType.value.raw).toBe("object");
      if (federation.ok) expect(typeof federation.value.raw).toBe("object");
      if (domainStatus.ok) expect(typeof domainStatus.value.raw).toBe("object");
      if (relatedProjects.ok) expect(Array.isArray(relatedProjects.value.projects)).toBe(true);
      if (permissionRoles.ok) expect(Array.isArray(permissionRoles.value.roles)).toBe(true);
      if (internalPermission.ok) expect(typeof internalPermission.value.raw).toBe("object");
      if (jobPermission.ok) expect(jobPermission.value.job_id).toBe(jobId);
    }, 30000);

    it("gets Build source metadata reads", async () => {
      const job = await readReachable(() => client.getJob({ job_id: jobId }));
      const repositoryName =
        gitCodeRepositoryName ??
        (job.ok
          ? job.value.scm_repositories[0]?.repo_name ?? job.value.scm_repositories[0]?.url
          : undefined) ??
        "repo";
      const [tags, reportBranches, reportRepositories, specs] = await Promise.all([
        readReachable(() => client.listCodeTags({
          scm_type: "codehub",
          page: 1,
          page_size: 20
        })),
        readReachable(() => client.listReportBranches({
          job_id: jobId,
          repository_name: repositoryName
        })),
        readReachable(() => client.listReportRepositories({ job_id: jobId })),
        readReachable(() => client.listResourceSpecs({
          project_id: projectId,
          arch: "x86-64"
        }))
      ]);

      expectReachedProvider(tags);
      expectReachedProvider(reportBranches);
      expectReachedProvider(reportRepositories);
      expectReachedProvider(specs);

      if (tags.ok) expect(Array.isArray(tags.value.tags)).toBe(true);
      if (reportBranches.ok) expect(Array.isArray(reportBranches.value.branches)).toBe(true);
      if (reportRepositories.ok) expect(Array.isArray(reportRepositories.value.repositories)).toBe(true);
      if (specs.ok) expect(Array.isArray(specs.value.specs)).toBe(true);
    }, 30000);

    it.runIf(gitCodeEndpointId)("gets Git code repository and branch metadata", async () => {
      const [repositories, branches] = await Promise.all([
        client.listGitCodeRepositories({
          endpoint_id: gitCodeEndpointId as string
        }),
        client.listGitCodeBranches({
          endpoint_id: gitCodeEndpointId as string,
          repository_name: gitCodeRepositoryName
        })
      ]);

      expect(Array.isArray(repositories.repositories)).toBe(true);
      expect(Array.isArray(branches.branches)).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createBuildClient live smoke", () => {});
}
