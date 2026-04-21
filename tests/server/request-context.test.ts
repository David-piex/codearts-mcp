import { describe, expect, it } from "vitest";
import {
  getCurrentRequestDiagnostics,
  recordRequestCacheHit,
  recordRequestPhase,
  recordUpstreamRequest,
  runWithRequestDiagnostics
} from "../../src/server/request-context.js";

describe("request diagnostics context", () => {
  it("aggregates upstream timing and cache hits inside a request scope", async () => {
    const result = await runWithRequestDiagnostics(async () => {
      recordRequestCacheHit("req_list_projects");
      recordUpstreamRequest({
        toolName: "req_list_projects",
        method: "GET",
        path: "/v4/projects",
        statusCode: 200,
        durationMs: 18
      });
      recordRequestPhase("auth_resolve", 3);

      return getCurrentRequestDiagnostics();
    });

    expect(result).toMatchObject({
      cacheHits: ["req_list_projects"],
      phaseTimings: [{ name: "auth_resolve", durationMs: 3 }],
      upstreamRequestCount: 1,
      upstreamDurationMs: 18,
      upstreamStatusCodes: [200]
    });
  });

  it("returns undefined outside a request scope", () => {
    expect(getCurrentRequestDiagnostics()).toBeUndefined();
  });
});
