import {
  testPlanListVariableSynchronizationInput,
  testPlanListVariableSynchronizationTwoInput,
  testPlanShowMindmapCreatorNameInput,
  testPlanShowTaskStatusInput,
  testPlanShowTaskStatusTwoInput
} from "../schemas.js";
import { mapTestPlanRecordItem, mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  getApiTestTaskStatus: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{ task_id: string; status?: string; raw: Record<string, unknown> }>;
  getApiTestTaskStatusV2: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{ task_id: string; status?: string; raw: Record<string, unknown> }>;
  getMindmapCreatorName: (input: { project_id: string }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getVariableSynchronization: (input: {
    project_id: string;
    variable_name: string;
    group_id?: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
  getVariableSynchronizationV2: (input: {
    project_id: string;
    variable_name: string;
    group_id?: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanShowTaskStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowTaskStatusInput.parse(input);
    const response = await client.getApiTestTaskStatus(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded official task status ${response.task_id}`,
      response.task_id,
      "task",
      response.raw,
      { projectId: parsed.project_id, status: response.status }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanShowTaskStatusTwoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowTaskStatusTwoInput.parse(input);
    const response = await client.getApiTestTaskStatusV2(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded official v2 task status ${response.task_id}`,
      response.task_id,
      "task",
      response.raw,
      { projectId: parsed.project_id, status: response.status }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanShowMindmapCreatorNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowMindmapCreatorNameInput.parse(input);
    const response = await client.getMindmapCreatorName(parsed);
    const result = mapTestPlanValueItem(
      `Loaded official mindmap creator names for ${parsed.project_id}`,
      parsed.project_id,
      "creator",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanListVariableSynchronizationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariableSynchronizationInput.parse(input);
    const response = await client.getVariableSynchronization(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded official variable synchronization info for ${parsed.variable_name}`,
      parsed.variable_name,
      "synchronization",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanListVariableSynchronizationTwoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariableSynchronizationTwoInput.parse(input);
    const response = await client.getVariableSynchronizationV2(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded official v2 variable synchronization info for ${parsed.variable_name}`,
      parsed.variable_name,
      "synchronization",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
