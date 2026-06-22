import { z } from "zod";
import { asItemResult } from "../../contracts/tool-result.js";
import type { OfficialApiRequestInput, OfficialApiRequestResult } from "../official-api.js";

const officialEndpointQueryValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string(), z.number(), z.boolean()]))
]);

export const officialEndpointToolInput = z
  .object({
    path_params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
    query: z.record(z.string(), officialEndpointQueryValueSchema).optional(),
    body: z.unknown().optional(),
    dry_run: z.boolean().default(true)
  })
  .catchall(z.unknown());

export type OfficialEndpointToolInput = z.infer<typeof officialEndpointToolInput>;

export type OfficialEndpointToolDefinition = {
  name: string;
  method: OfficialApiRequestInput["method"];
  pathTemplate: string;
  description: string;
  write: boolean;
};

export type OfficialEndpointRequestClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
};

function renderPath(template: string, input: OfficialEndpointToolInput) {
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

function createRequest(
  tool: OfficialEndpointToolDefinition,
  input: OfficialEndpointToolInput
): OfficialApiRequestInput {
  return {
    method: tool.method,
    path: renderPath(tool.pathTemplate, input),
    query: input.query,
    body: input.body,
    dry_run: tool.write ? input.dry_run : false
  };
}

export function createOfficialEndpointToolHandler(
  tool: OfficialEndpointToolDefinition,
  client: OfficialEndpointRequestClient
) {
  return async (input: unknown) => {
    const parsed = officialEndpointToolInput.parse(input);
    const response = await client.requestOfficialApi(createRequest(tool, parsed));
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
