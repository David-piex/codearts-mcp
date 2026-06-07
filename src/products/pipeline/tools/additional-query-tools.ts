import {
  pipelineGetAcceptFreeDeclarationInput,
  pipelineGetPluginMetricsInput,
  pipelineGetTenantPopupStatusInput,
  pipelineShowTemplateTaskStatusInput
} from "../schemas.js";
import { createPipelineRawItemHandler, createPipelineRawListHandler } from "./raw-query-tools.js";

export const createPipelineGetPluginMetricsHandler = (client: {
  getPluginMetrics: (input: {
    domain_id: string;
    body: Array<Record<string, unknown>>;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
}) =>
  createPipelineRawListHandler({
    inputSchema: pipelineGetPluginMetricsInput,
    call: (input) => client.getPluginMetrics(input),
    noun: "Pipeline plugin metric",
    itemKey: "pluginMetric",
    rawKey: "pluginMetrics"
  });

export const createPipelineGetTenantPopupStatusHandler = (client: {
  getTenantPopupStatus: (input: {
    tenant_id: string;
    project_id: string;
  }) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
}) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetTenantPopupStatusInput,
    call: (input) => client.getTenantPopupStatus(input),
    summary: "Loaded Pipeline tenant popup status",
    itemKey: "tenantPopupStatus",
    id: (input) => input.tenant_id
  });

export const createPipelineGetAcceptFreeDeclarationHandler = (client: {
  getAcceptFreeDeclaration: (input: {
    tenant_id: string;
  }) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
}) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetAcceptFreeDeclarationInput,
    call: (input) => client.getAcceptFreeDeclaration(input),
    summary: "Loaded Pipeline accept-free declaration status",
    itemKey: "acceptFreeDeclaration",
    id: (input) => input.tenant_id
  });

export const createPipelineShowTemplateTaskStatusHandler = (client: {
  showTemplateTaskStatus: (input: {
    task_id: string;
  }) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
}) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineShowTemplateTaskStatusInput,
    call: (input) => client.showTemplateTaskStatus(input),
    summary: "Loaded Pipeline template task status",
    itemKey: "templateTaskStatus",
    id: (input, response) =>
      typeof response.item.task_id === "string" ? response.item.task_id : input.task_id
  });
