import { asItemResult, type ToolResult } from "../../../contracts/tool-result.js";
import {
  testPlanListVariablesByGroupWithSensitiveInput,
  testPlanShowAwNameViewInput,
  testPlanShowSensitivePropertyByIdInput,
  testPlanShowTimeOutViewInput,
  testPlanShowVariablesDecryptInput
} from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type RawRecord = Record<string, unknown>;

type Client = {
  listApiTestAwNameViews: (input: { project_id: string }) => Promise<{
    views: RawRecord[];
    total?: number;
  }>;
  listTimeoutSettings: (input: { project_id: string }) => Promise<{
    settings: RawRecord[];
    total?: number;
  }>;
  listVariablesByGroupWithSensitive: (input: {
    project_id: string;
    group_id?: string;
  }) => Promise<{
    variables: RawRecord[];
    total?: number;
  }>;
  showSensitivePropertyById: (input: {
    project_id: string;
    group_id: string;
    var_id: string;
  }) => Promise<{
    variable_id: string;
    value?: unknown;
    redacted: boolean;
    raw: RawRecord;
  }>;
  showVariablesDecrypt: (input: {
    project_id: string;
    variable_id: string;
  }) => Promise<{
    variable_id: string;
    value?: unknown;
    redacted: boolean;
    raw: RawRecord;
  }>;
};

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
    structuredContent: result
  };
}

export function createTestPlanShowAwNameViewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowAwNameViewInput.parse(input);
    const response = await client.listApiTestAwNameViews(parsed);

    return listResponse(mapTestPlanRecordList(response.views, response.total, "AW name view settings", "view"));
  };
}

export function createTestPlanShowTimeOutViewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowTimeOutViewInput.parse(input);
    const response = await client.listTimeoutSettings(parsed);

    return listResponse(mapTestPlanRecordList(response.settings, response.total, "timeout view settings", "setting"));
  };
}

export function createTestPlanListVariablesByGroupWithSensitiveHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListVariablesByGroupWithSensitiveInput.parse(input);
    const response = await client.listVariablesByGroupWithSensitive(parsed);
    const result = mapTestPlanRecordList(
      response.variables,
      response.total,
      "variables by group with sensitive values redacted",
      "variable"
    );

    return listResponse(result);
  };
}

export function createTestPlanShowSensitivePropertyByIdHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowSensitivePropertyByIdInput.parse(input);
    const response = await client.showSensitivePropertyById(parsed);
    const result = asItemResult(`Loaded redacted sensitive property for variable ${response.variable_id}`, {
      id: response.variable_id,
      variableId: response.variable_id,
      value: response.value,
      redacted: response.redacted,
      sensitiveProperty: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanShowVariablesDecryptHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanShowVariablesDecryptInput.parse(input);
    const response = await client.showVariablesDecrypt(parsed);
    const result = asItemResult(`Loaded redacted decrypted variable value for ${response.variable_id}`, {
      id: response.variable_id,
      variableId: response.variable_id,
      value: response.value,
      redacted: response.redacted,
      decryptedVariable: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
