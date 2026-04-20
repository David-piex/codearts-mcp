import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createPipelineClient } from "../products/pipeline/client.js";
import {
  pipelineApproveRunInput,
  pipelineGetInput,
  pipelineListArtifactsInput,
  pipelineGetManualReviewContextInput,
  pipelineGetRunLogInput,
  pipelineGetRunParametersInput,
  pipelineGetStepOutputsInput,
  pipelineGetRunInput,
  pipelineGetRunDetailInput,
  pipelineRejectRunInput,
  pipelineRetryRunInput,
  pipelineListInput,
  pipelineListRunsInput,
  pipelineListTemplatesInput,
  pipelineRunInput,
  pipelineStopRunInput
} from "../products/pipeline/schemas.js";
import { createPipelineApproveRunHandler } from "../products/pipeline/tools/approve-run.js";
import { createPipelineGetManualReviewContextHandler } from "../products/pipeline/tools/get-manual-review-context.js";
import { createPipelineGetPipelineHandler } from "../products/pipeline/tools/get-pipeline.js";
import { createPipelineGetRunDetailHandler } from "../products/pipeline/tools/get-run-detail.js";
import { createPipelineGetRunLogHandler } from "../products/pipeline/tools/get-run-log.js";
import { createPipelineGetRunParametersHandler } from "../products/pipeline/tools/get-run-parameters.js";
import { createPipelineGetRunHandler } from "../products/pipeline/tools/get-run.js";
import { createPipelineGetStepOutputsHandler } from "../products/pipeline/tools/get-step-outputs.js";
import { createPipelineListArtifactsHandler } from "../products/pipeline/tools/list-artifacts.js";
import { createPipelineListPipelinesHandler } from "../products/pipeline/tools/list-pipelines.js";
import { createPipelineListRunsHandler } from "../products/pipeline/tools/list-runs.js";
import { createPipelineListTemplatesHandler } from "../products/pipeline/tools/list-templates.js";
import { createPipelineRejectRunHandler } from "../products/pipeline/tools/reject-run.js";
import { createPipelineRetryRunHandler } from "../products/pipeline/tools/retry-run.js";
import { createPipelineRunPipelineHandler } from "../products/pipeline/tools/run-pipeline.js";
import { createPipelineStopRunHandler } from "../products/pipeline/tools/stop-run.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type PipelineStdioClient = ReturnType<typeof createPipelineClient>;

const pipelineToolDefinitions = {
  "pipeline_list_pipelines": defineProductTool({
    description: "List CodeArts Pipelines",
    inputSchema: pipelineListInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPipelinesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPipelinesHandler
  }),
  "pipeline_get_run": defineProductTool({
    description: "Get CodeArts Pipeline run detail",
    inputSchema: pipelineGetRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunHandler
  }),
  "pipeline_list_artifacts": defineProductTool({
    description: "List CodeArts Pipeline artifacts",
    inputSchema: pipelineListArtifactsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListArtifactsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListArtifactsHandler
  }),
  "pipeline_get_run_detail": defineProductTool({
    description: "Get CodeArts Pipeline run detail",
    inputSchema: pipelineGetRunDetailInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunDetailHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunDetailHandler
  }),
  "pipeline_get_run_parameters": defineProductTool({
    description: "Get CodeArts Pipeline run parameters",
    inputSchema: pipelineGetRunParametersInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunParametersHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunParametersHandler
  }),
  "pipeline_get_run_log": defineProductTool({
    description: "Get CodeArts Pipeline run step log",
    inputSchema: pipelineGetRunLogInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunLogHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunLogHandler
  }),
  "pipeline_get_manual_review_context": defineProductTool({
    description: "Get CodeArts Pipeline manual review context",
    inputSchema: pipelineGetManualReviewContextInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetManualReviewContextHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetManualReviewContextHandler
  }),
  "pipeline_get_step_outputs": defineProductTool({
    description: "Get CodeArts Pipeline step outputs",
    inputSchema: pipelineGetStepOutputsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetStepOutputsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetStepOutputsHandler
  }),
  "pipeline_get_pipeline": defineProductTool({
    description: "Get CodeArts Pipeline detail",
    inputSchema: pipelineGetInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPipelineHandler
  }),
  "pipeline_run_pipeline": defineProductTool({
    description: "Run CodeArts Pipeline",
    inputSchema: pipelineRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRunPipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRunPipelineHandler,
    rateLimitAction: "pipeline_run_pipeline"
  }),
  "pipeline_stop_run": defineProductTool({
    description: "Stop CodeArts Pipeline run",
    inputSchema: pipelineStopRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineStopRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineStopRunHandler,
    rateLimitAction: "pipeline_stop_run"
  }),
  "pipeline_retry_run": defineProductTool({
    description: "Retry CodeArts Pipeline run",
    inputSchema: pipelineRetryRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRetryRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRetryRunHandler,
    rateLimitAction: "pipeline_retry_run"
  }),
  "pipeline_approve_run": defineProductTool({
    description: "Approve CodeArts Pipeline manual review",
    inputSchema: pipelineApproveRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineApproveRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineApproveRunHandler,
    rateLimitAction: "pipeline_approve_run"
  }),
  "pipeline_reject_run": defineProductTool({
    description: "Reject CodeArts Pipeline manual review",
    inputSchema: pipelineRejectRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRejectRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRejectRunHandler,
    rateLimitAction: "pipeline_reject_run"
  }),
  "pipeline_list_templates": defineProductTool({
    description: "List CodeArts Pipeline templates",
    inputSchema: pipelineListTemplatesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListTemplatesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListTemplatesHandler
  }),
  "pipeline_list_runs": defineProductTool({
    description: "List CodeArts Pipeline runs",
    inputSchema: pipelineListRunsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListRunsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListRunsHandler
  })
} as const;

export function registerPipelineTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: PipelineStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: pipelineToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
