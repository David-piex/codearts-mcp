import { describe, expect, it } from "vitest";
import {
  deriveProbeFindings,
  formatProbeReport,
  summarizeProbeIteration,
  summarizeProbeRun,
  type ProbeSample
} from "../../src/server/edge-probe.js";

function createSuccessSample(
  step: ProbeSample["step"],
  durationMs: number,
  statusCode = 200
): ProbeSample {
  return {
    step,
    startedAt: "2026-04-20T23:10:00.000Z",
    durationMs,
    ok: true,
    statusCode
  };
}

function createFailedInitializeSample(
  overrides: Partial<ProbeSample> = {}
): ProbeSample {
  return {
    step: "initialize",
    startedAt: "2026-04-20T23:11:00.000Z",
    durationMs: 120,
    ok: false,
    errorType: "http_error",
    statusCode: 502,
    errorMessage: "Bad Gateway",
    ...overrides
  } as ProbeSample;
}

function createProbeReport(
  overrides: Partial<{
    options: {
      url: string;
      region: string;
      iterations: number;
      timeoutMs: number;
      sleepMs: number;
    };
    iterations: Array<ReturnType<typeof summarizeProbeIteration>>;
    samples: ProbeSample[];
    findings: string[];
  }> = {}
) {
  const samples =
    overrides.samples ??
    [createSuccessSample("health", 10), createSuccessSample("initialize", 15)];

  return {
    options: {
      url: "http://127.0.0.1/mcp",
      region: "cn-north-4",
      iterations: 1,
      timeoutMs: 30_000,
      sleepMs: 0,
      ...(overrides.options ?? {})
    },
    iterations:
      overrides.iterations ??
      [summarizeProbeIteration(1, [createSuccessSample("health", 10), createSuccessSample("initialize", 15)])],
    samples,
    summary: summarizeProbeRun(samples),
    findings:
      overrides.findings ??
      ["No obvious ingress-vs-application split was detected from the current sample set."]
  } as const;
}

describe("edge probe summary", () => {
  it("summarizes per-step latency percentiles and success counts", () => {
    const summary = summarizeProbeRun([
      createSuccessSample("health", 20),
      createSuccessSample("health", 30),
      createSuccessSample("initialize", 15),
      createSuccessSample("initialize", 25),
      createSuccessSample("auth_configure_session", 40),
      createSuccessSample("auth_configure_session", 50)
    ]);

    expect(summary.totals).toEqual({
      samples: 6,
      ok: 6,
      failed: 0
    });
    expect(summary.steps.health).toMatchObject({
      samples: 2,
      ok: 2,
      failed: 0,
      p50DurationMs: 30,
      p95DurationMs: 20
    });
    expect(summary.steps.initialize).toMatchObject({
      samples: 2,
      ok: 2,
      failed: 0,
      p50DurationMs: 25
    });
    expect(summary.steps.auth_configure_session).toMatchObject({
      samples: 2,
      ok: 2,
      failed: 0,
      p50DurationMs: 50
    });
  });

  it("flags likely edge instability when health succeeds but initialize sees 502/network failures", () => {
    const samples: ProbeSample[] = [
      createSuccessSample("health", 10),
      createSuccessSample("health", 11),
      createFailedInitializeSample(),
      createFailedInitializeSample({
        startedAt: "2026-04-20T23:11:10.000Z",
        durationMs: 90,
        errorType: "network_error",
        statusCode: undefined,
        errorMessage: "socket hang up"
      }),
      createSuccessSample("auth_configure_session", 12)
    ];

    const summary = summarizeProbeRun(samples);
    const findings = deriveProbeFindings(summary);

    expect(summary.steps.initialize).toMatchObject({
      samples: 2,
      ok: 0,
      failed: 2,
      statusCodes: [502]
    });
    expect(findings).toContain(
      "Health probes are succeeding while initialize is seeing 502/network failures, which points to ingress or edge instability before MCP request handling completes."
    );
  });

  it("classifies a timeout after healthy probes as likely edge instability", () => {
    const iteration = summarizeProbeIteration(3, [
      createSuccessSample("health", 15),
      {
        step: "initialize",
        startedAt: "2026-04-20T23:12:00.000Z",
        durationMs: 30_000,
        ok: false,
        errorType: "timeout",
        errorMessage: "The operation was aborted due to timeout"
      }
    ]);

    expect(iteration).toMatchObject({
      iteration: 3,
      overallOk: false,
      likelyOrigin: "likely_edge",
      failedSteps: ["initialize"]
    });
    expect(iteration.notes).toContain(
      "health succeeded before MCP initialization failed, which suggests ingress or transport instability ahead of application handling"
    );
  });

  it("formats ndjson output with iteration and summary records", () => {
    const report = createProbeReport();

    const lines = formatProbeReport(report, "ndjson").trim().split("\n");

    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0])).toMatchObject({
      type: "iteration",
      iteration: 1,
      likelyOrigin: "healthy"
    });
    expect(JSON.parse(lines[1])).toMatchObject({
      type: "summary",
      totals: {
        samples: 2,
        ok: 2,
        failed: 0
      }
    });
  });

  it("formats summary output with totals and likely-origin counts", () => {
    const report = createProbeReport({
      options: {
        iterations: 2,
        sleepMs: 500,
        url: "http://127.0.0.1/mcp",
        region: "cn-north-4",
        timeoutMs: 30_000
      },
      iterations: [
        summarizeProbeIteration(1, [createSuccessSample("health", 10), createSuccessSample("initialize", 15)]),
        summarizeProbeIteration(2, [
          createSuccessSample("health", 11),
          createFailedInitializeSample({
            startedAt: "2026-04-20T23:13:00.000Z"
          })
        ])
      ],
      samples: [
        createSuccessSample("health", 10),
        createSuccessSample("initialize", 15),
        createSuccessSample("health", 11),
        createFailedInitializeSample({
          startedAt: "2026-04-20T23:13:00.000Z"
        })
      ],
      findings: [
        "Health probes are succeeding while initialize is seeing 502/network failures, which points to ingress or edge instability before MCP request handling completes."
      ]
    });

    const output = formatProbeReport(report, "summary");

    expect(output).toContain("totals: 4 samples, 3 ok, 1 failed");
    expect(output).toContain("likely origins: healthy=1, likely_edge=1");
    expect(output).toContain("sampling pause: 500ms");
  });
});
