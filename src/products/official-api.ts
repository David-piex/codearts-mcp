import { z } from "zod";
import { asItemResult } from "../contracts/tool-result.js";
import { AppError } from "../core/errors/app-error.js";
import type { ReturnTypeCreateHttpClient } from "./types.js";

const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const safePathPattern = /^\/[A-Za-z0-9._~!$&'()*+,;=:@/%{}-]*(?:\?[A-Za-z0-9._~!$&'()*+,;=:@/?%{}-]*)?$/;

export const officialApiRequestInput = z.object({
  method: z.enum(allowedMethods),
  path: z.string().min(1).regex(safePathPattern, "path must be a relative API path beginning with /"),
  query: z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.union([z.string(), z.number(), z.boolean()]))])).optional(),
  body: z.unknown().optional(),
  dry_run: z.boolean().default(true)
});

export type OfficialApiRequestInput = z.infer<typeof officialApiRequestInput>;

export type OfficialApiRequestResult = {
  method: string;
  path: string;
  dryRun: boolean;
  response?: unknown;
};

function appendQuery(path: string, query?: OfficialApiRequestInput["query"]) {
  if (!query) {
    return path;
  }

  const [basePath, existingQuery = ""] = path.split("?", 2);
  const params = new URLSearchParams(existingQuery);

  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, String(item));
      }
      continue;
    }

    params.set(key, String(value));
  }

  const rendered = params.toString();
  return rendered ? `${basePath}?${rendered}` : basePath;
}

function assertAllowedProductPath(product: string, path: string, allowedPrefixes: readonly string[]) {
  if (path.includes("..") || path.startsWith("//")) {
    throw new AppError("validation_error", "path must not contain traversal or protocol-relative segments.");
  }

  const pathWithoutQuery = path.split("?", 1)[0].toLowerCase();

  if (!allowedPrefixes.some((prefix) => pathWithoutQuery.startsWith(prefix.toLowerCase()))) {
    throw new AppError(
      "validation_error",
      `${product} official API bridge only allows documented ${product} API path prefixes.`
    );
  }
}

async function dispatchOfficialApiRequest(
  http: ReturnTypeCreateHttpClient,
  method: OfficialApiRequestInput["method"],
  path: string,
  body: unknown
) {
  switch (method) {
    case "GET":
      return http.get(path);
    case "POST":
      return http.post(path, body);
    case "PUT":
      return http.put(path, body);
    case "PATCH":
      return http.patch(path, body);
    case "DELETE":
      return http.delete(path, body);
  }
}

export function createOfficialApiRequester(options: {
  product: string;
  http: ReturnTypeCreateHttpClient;
  allowedPrefixes: readonly string[];
}) {
  return {
    async requestOfficialApi(input: OfficialApiRequestInput): Promise<OfficialApiRequestResult> {
      const parsed = officialApiRequestInput.parse(input);
      const path = appendQuery(parsed.path, parsed.query);

      assertAllowedProductPath(options.product, path, options.allowedPrefixes);

      if (parsed.method !== "GET" && parsed.dry_run) {
        return {
          method: parsed.method,
          path,
          dryRun: true,
          response: {
            skipped: true,
            reason: "dry_run is true; no upstream request was sent."
          }
        };
      }

      const response = await dispatchOfficialApiRequest(options.http, parsed.method, path, parsed.body);

      return {
        method: parsed.method,
        path,
        dryRun: false,
        response
      };
    }
  };
}

export function createOfficialApiRequestHandler(client: {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
}) {
  return async (input: unknown) => {
    const parsed = officialApiRequestInput.parse(input);
    const response = await client.requestOfficialApi(parsed);
    const result = asItemResult(
      `${response.method} ${response.path}${response.dryRun ? " dry-run" : " completed"}`,
      response,
      response.response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
