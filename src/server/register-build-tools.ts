import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createBuildClient } from "../products/build/client.js";
import {
  buildAppendReleaseUploadStepInput,
  buildAppendJobStepInput,
  buildConfigureReleaseUploadStepInput,
  buildPrepareDeployableNodeAppInput,
  buildGetErrorLogInput,
  buildGetFullStagesInput,
  buildGetHistoryDetailsInput,
  buildGetInfoRecordInput,
  buildGetProjectRecordStatisticsInput,
  buildPrepareNodeRuntimeBundleInput,
  buildGetRecordFlowGraphInput,
  buildGetRecordInput,
  buildGetRecordScriptInput,
  buildGetRealTimeLogInput,
  buildGetJobInput,
  buildListBuildParametersInput,
  buildListJobsInput,
  buildListProjectRecordsInput,
  buildListRecordsInput,
  buildRunJobInput,
  buildStopJobInput,
  buildUpdateJobStepInput
} from "../products/build/schemas.js";
import { createBuildGetErrorLogHandler } from "../products/build/tools/get-error-log.js";
import { createBuildAppendReleaseUploadStepHandler } from "../products/build/tools/append-release-upload-step.js";
import { createBuildAppendJobStepHandler } from "../products/build/tools/append-job-step.js";
import { createBuildConfigureReleaseUploadStepHandler } from "../products/build/tools/configure-release-upload-step.js";
import { createBuildPrepareDeployableNodeAppHandler } from "../products/build/tools/prepare-deployable-node-app.js";
import { createBuildPrepareNodeRuntimeBundleHandler } from "../products/build/tools/prepare-node-runtime-bundle.js";
import { createBuildGetFullStagesHandler } from "../products/build/tools/get-full-stages.js";
import { createBuildGetProjectRecordStatisticsHandler } from "../products/build/tools/get-project-record-statistics.js";
import { createBuildGetRecordFlowGraphHandler } from "../products/build/tools/get-record-flow-graph.js";
import { createBuildGetRecordHandler } from "../products/build/tools/get-record.js";
import { createBuildGetRecordScriptHandler } from "../products/build/tools/get-record-script.js";
import { createBuildGetHistoryDetailsHandler } from "../products/build/tools/get-history-details.js";
import { createBuildGetInfoRecordHandler } from "../products/build/tools/get-info-record.js";
import { createBuildGetRealTimeLogHandler } from "../products/build/tools/get-real-time-log.js";
import { createBuildGetJobHandler } from "../products/build/tools/get-job.js";
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
import { createBuildListJobsHandler } from "../products/build/tools/list-jobs.js";
import { createBuildListProjectRecordsHandler } from "../products/build/tools/list-project-records.js";
import { createBuildListRecordsHandler } from "../products/build/tools/list-records.js";
import { createBuildRunJobHandler } from "../products/build/tools/run-job.js";
import { createBuildStopJobHandler } from "../products/build/tools/stop-job.js";
import { createBuildUpdateJobStepHandler } from "../products/build/tools/update-job-step.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type BuildStdioClient = ReturnType<typeof createBuildClient>;

const buildToolDefinitions = {
  "build_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Build API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.buildClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "build_list_jobs": defineProductTool({
    description: "List CodeArts Build jobs",
    inputSchema: buildListJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobsHandler
  }),
  "build_list_project_records": defineProductTool({
    description: "List CodeArts Build project records",
    inputSchema: buildListProjectRecordsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListProjectRecordsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListProjectRecordsHandler
  }),
  "build_get_project_record_statistics": defineProductTool({
    description: "Get CodeArts Build project record statistics",
    inputSchema: buildGetProjectRecordStatisticsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetProjectRecordStatisticsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetProjectRecordStatisticsHandler
  }),
  "build_get_record_flow_graph": defineProductTool({
    description: "Get CodeArts Build record flow graph",
    inputSchema: buildGetRecordFlowGraphInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordFlowGraphHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordFlowGraphHandler
  }),
  "build_get_job": defineProductTool({
    description: "Get CodeArts Build job detail",
    inputSchema: buildGetJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobHandler
  }),
  "build_get_record": defineProductTool({
    description: "Get CodeArts Build record detail",
    inputSchema: buildGetRecordInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordHandler
  }),
  "build_list_records": defineProductTool({
    description: "List CodeArts Build records",
    inputSchema: buildListRecordsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListRecordsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListRecordsHandler
  }),
  "build_run_job": defineProductTool({
    description: "Run CodeArts Build job",
    inputSchema: buildRunJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildRunJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildRunJobHandler
  }),
  "build_append_job_step": defineProductTool({
    description: "Append a new step to a CodeArts Build job",
    inputSchema: buildAppendJobStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAppendJobStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAppendJobStepHandler
  }),
  "build_append_release_upload_step": defineProductTool({
    description: "Append the official release repository upload step to a CodeArts Build job",
    inputSchema: buildAppendReleaseUploadStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAppendReleaseUploadStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAppendReleaseUploadStepHandler
  }),
  "build_configure_release_upload_step": defineProductTool({
    description: "Configure an existing release repository upload step in a CodeArts Build job",
    inputSchema: buildConfigureReleaseUploadStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildConfigureReleaseUploadStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildConfigureReleaseUploadStepHandler
  }),
  "build_prepare_node_runtime_bundle": defineProductTool({
    description: "Prepare a Node runtime bundle by appending packaging commands to a build step",
    inputSchema: buildPrepareNodeRuntimeBundleInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildPrepareNodeRuntimeBundleHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildPrepareNodeRuntimeBundleHandler
  }),
  "build_prepare_deployable_node_app": defineProductTool({
    description: "Prepare a single-file deployable Node app by appending bundling commands to a build step",
    inputSchema: buildPrepareDeployableNodeAppInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildPrepareDeployableNodeAppHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildPrepareDeployableNodeAppHandler
  }),
  "build_stop_job": defineProductTool({
    description: "Stop CodeArts Build job",
    inputSchema: buildStopJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildStopJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildStopJobHandler
  }),
  "build_update_job_step": defineProductTool({
    description: "Update CodeArts Build job step image or command",
    inputSchema: buildUpdateJobStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateJobStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateJobStepHandler
  }),
  "build_get_real_time_log": defineProductTool({
    description: "Get CodeArts Build real-time log",
    inputSchema: buildGetRealTimeLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRealTimeLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRealTimeLogHandler
  }),
  "build_get_history_details": defineProductTool({
    description: "Get CodeArts Build history details",
    inputSchema: buildGetHistoryDetailsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetHistoryDetailsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetHistoryDetailsHandler
  }),
  "build_get_error_log": defineProductTool({
    description: "Get CodeArts Build error log analysis",
    inputSchema: buildGetErrorLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetErrorLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetErrorLogHandler
  }),
  "build_get_info_record": defineProductTool({
    description: "Get CodeArts Build info record",
    inputSchema: buildGetInfoRecordInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetInfoRecordHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetInfoRecordHandler
  }),
  "build_get_record_script": defineProductTool({
    description: "Get CodeArts Build record script",
    inputSchema: buildGetRecordScriptInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordScriptHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordScriptHandler
  }),
  "build_get_full_stages": defineProductTool({
    description: "Get CodeArts Build full stages",
    inputSchema: buildGetFullStagesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetFullStagesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetFullStagesHandler
  }),
  "build_list_build_parameters": defineProductTool({
    description: "List CodeArts Build parameters",
    inputSchema: buildListBuildParametersInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListBuildParametersHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListBuildParametersHandler
  })
} as const;

export function registerBuildTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: BuildStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: buildToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
