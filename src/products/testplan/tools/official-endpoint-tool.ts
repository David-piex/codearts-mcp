import { asItemResult } from "../../../contracts/tool-result.js";
import type { OfficialApiRequestInput, OfficialApiRequestResult } from "../../official-api.js";
import { testPlanOfficialEndpointToolInput } from "../schemas.js";
import type { TestPlanOfficialEndpointTool } from "../official-endpoint-tools.js";

type OfficialEndpointInput = ReturnType<typeof testPlanOfficialEndpointToolInput.parse>;

function renderPath(template: string, input: OfficialEndpointInput) {
  return template.replace(/\{([^}]+)\}/g, (_match, key: string) => {
    const value =
      input.path_params?.[key] ??
      (Object.prototype.hasOwnProperty.call(input, key)
        ? (input as Record<string, unknown>)[key]
        : undefined);

    if (value === undefined || value === null || value === "") {
      throw new Error(`Missing required path parameter: ${key}`);
    }

    return encodeURIComponent(String(value));
  });
}

function createRequest(tool: TestPlanOfficialEndpointTool, input: OfficialEndpointInput): OfficialApiRequestInput {
  return {
    method: tool.method,
    path: renderPath(tool.pathTemplate, input),
    query: input.query,
    body: input.body,
    dry_run: tool.write ? input.dry_run : false
  };
}

export function createTestPlanOfficialEndpointToolHandler(
  tool: TestPlanOfficialEndpointTool,
  client: {
    requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  }
) {
  return async (input: unknown) => {
    const parsed = testPlanOfficialEndpointToolInput.parse(input);
    const request = createRequest(tool, parsed);
    const response = await client.requestOfficialApi(request);
    const result = asItemResult(
      `${tool.name}: ${response.method} ${response.path}${response.dryRun ? " dry-run" : " completed"}`,
      {
        id: response.path,
        toolName: tool.name,
        method: response.method,
        path: response.path,
        dryRun: response.dryRun,
        response: response.response
      },
      response.response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
