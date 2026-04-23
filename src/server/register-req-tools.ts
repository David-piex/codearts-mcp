import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createReqClient } from "../products/req/client.js";
import {
  reqCheckProjectNameInput,
  reqCreateProjectInput,
  reqDeleteProjectInput,
  reqCreateWorkItemInput,
  reqGetProjectInput,
  reqGetWorkItemInput,
  reqListIterationsInput,
  reqListNotAddedProjectsInput,
  reqListProjectMembersInput,
  reqListProjectsInput,
  reqListWorkItemsInput,
  reqUpdateProjectInput,
  reqUpdateWorkItemInput
} from "../products/req/schemas.js";
import { createReqCheckProjectNameHandler } from "../products/req/tools/check-project-name.js";
import { createReqCreateProjectHandler } from "../products/req/tools/create-project.js";
import { createReqDeleteProjectHandler } from "../products/req/tools/delete-project.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqGetProjectHandler } from "../products/req/tools/get-project.js";
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqListIterationsHandler } from "../products/req/tools/list-iterations.js";
import { createReqListNotAddedProjectsHandler } from "../products/req/tools/list-not-added-projects.js";
import { createReqListProjectMembersHandler } from "../products/req/tools/list-project-members.js";
import { createReqListProjectsHandler } from "../products/req/tools/list-projects.js";
import { createReqListWorkItemsHandler } from "../products/req/tools/list-work-items.js";
import { createReqUpdateProjectHandler } from "../products/req/tools/update-project.js";
import { createReqUpdateWorkItemHandler } from "../products/req/tools/update-work-item.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type ReqStdioClient = ReturnType<typeof createReqClient>;

const reqToolDefinitions = {
  "req_create_project": defineProductTool({
    description: "Create CodeArts Req project",
    inputSchema: reqCreateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateProjectHandler,
    rateLimitAction: "req_create_project"
  }),
  "req_update_project": defineProductTool({
    description: "Update CodeArts Req project",
    inputSchema: reqUpdateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectHandler,
    rateLimitAction: "req_update_project"
  }),
  "req_delete_project": defineProductTool({
    description: "Delete CodeArts Req project",
    inputSchema: reqDeleteProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteProjectHandler,
    rateLimitAction: "req_delete_project"
  }),
  "req_check_project_name": defineProductTool({
    description: "Check whether a CodeArts Req project name exists",
    inputSchema: reqCheckProjectNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCheckProjectNameHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCheckProjectNameHandler
  }),
  "req_list_not_added_projects": defineProductTool({
    description: "List CodeArts Req projects not yet added to the current domain",
    inputSchema: reqListNotAddedProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListNotAddedProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListNotAddedProjectsHandler
  }),
  "req_list_projects": defineProductTool({
    description: "List CodeArts Req projects",
    inputSchema: reqListProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectsHandler
  }),
  "req_get_project": defineProductTool({
    description: "Get CodeArts Req project detail",
    inputSchema: reqGetProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetProjectHandler
  }),
  "req_create_work_item": defineProductTool({
    description: "Create CodeArts Req work item",
    inputSchema: reqCreateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemHandler,
    rateLimitAction: "req_create_work_item"
  }),
  "req_list_work_items": defineProductTool({
    description: "List CodeArts Req work items",
    inputSchema: reqListWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemsHandler
  }),
  "req_get_work_item": defineProductTool({
    description: "Get CodeArts Req work item detail",
    inputSchema: reqGetWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemHandler
  }),
  "req_list_iterations": defineProductTool({
    description: "List CodeArts Req iterations",
    inputSchema: reqListIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListIterationsHandler
  }),
  "req_update_work_item": defineProductTool({
    description: "Update CodeArts Req work item",
    inputSchema: reqUpdateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateWorkItemHandler,
    rateLimitAction: "req_update_work_item"
  }),
  "req_list_project_members": defineProductTool({
    description: "List CodeArts Req project members",
    inputSchema: reqListProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectMembersHandler
  })
} as const;

export function registerReqTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: ReqStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: reqToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
