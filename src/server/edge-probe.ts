import process from "node:process";

export type ProbeStep = "health" | "initialize" | "auth_configure_session";
export type ProbeOutputFormat = "json" | "ndjson" | "summary";
export type ProbeLikelyOrigin = "healthy" | "likely_edge" | "likely_application" | "unknown";

export type ProbeSample = {
  iteration?: number;
  step: ProbeStep;
  startedAt: string;
  durationMs: number;
  ok: boolean;
  statusCode?: number;
  errorType?: "http_error" | "network_error" | "timeout";
  errorMessage?: string;
};

export type ProbeStepSummary = {
  samples: number;
  ok: number;
  failed: number;
  minDurationMs?: number;
  p50DurationMs?: number;
  p95DurationMs?: number;
  maxDurationMs?: number;
  statusCodes: number[];
  errorTypes: Array<NonNullable<ProbeSample["errorType"]>>;
};

export type ProbeRunSummary = {
  totals: {
    samples: number;
    ok: number;
    failed: number;
  };
  steps: Record<ProbeStep, ProbeStepSummary>;
};

export type ProbeIterationSummary = {
  iteration: number;
  sampleCount: number;
  overallOk: boolean;
  failedSteps: ProbeStep[];
  likelyOrigin: ProbeLikelyOrigin;
  notes: string[];
};

export type ProbeReport = {
  options: {
    url: string;
    region: string;
    iterations: number;
    timeoutMs: number;
    sleepMs: number;
  };
  iterations: readonly ProbeIterationSummary[];
  samples: readonly ProbeSample[];
  summary: ProbeRunSummary;
  findings: readonly string[];
};

type EdgeProbeOptions = {
  url: string;
  accessKey: string;
  secretKey: string;
  region: string;
  iterations: number;
  timeoutMs: number;
  sleepMs: number;
  output: ProbeOutputFormat;
};

function createEmptyStepSummary(): ProbeStepSummary {
  return {
    samples: 0,
    ok: 0,
    failed: 0,
    statusCodes: [],
    errorTypes: []
  };
}

function percentileDuration(values: number[], percentile: number) {
  if (values.length === 0) {
    return undefined;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index =
    percentile === 0.5
      ? Math.floor(sorted.length / 2)
      : Math.max(0, Math.ceil(sorted.length * percentile) - 2);

  return sorted[index];
}

export function summarizeProbeRun(samples: ProbeSample[]): ProbeRunSummary {
  const steps: Record<ProbeStep, ProbeStepSummary> = {
    health: createEmptyStepSummary(),
    initialize: createEmptyStepSummary(),
    auth_configure_session: createEmptyStepSummary()
  };

  for (const sample of samples) {
    const summary = steps[sample.step];
    summary.samples += 1;

    if (sample.ok) {
      summary.ok += 1;
    } else {
      summary.failed += 1;
    }

    if (sample.statusCode !== undefined && !summary.statusCodes.includes(sample.statusCode)) {
      summary.statusCodes.push(sample.statusCode);
      summary.statusCodes.sort((left, right) => left - right);
    }

    if (sample.errorType && !summary.errorTypes.includes(sample.errorType)) {
      summary.errorTypes.push(sample.errorType);
      summary.errorTypes.sort();
    }
  }

  for (const summary of Object.values(steps)) {
    const durations = samples
      .filter((sample) => steps[sample.step] === summary)
      .map((sample) => sample.durationMs);

    if (durations.length === 0) {
      continue;
    }

    const sorted = [...durations].sort((left, right) => left - right);
    summary.minDurationMs = sorted[0];
    summary.p50DurationMs = percentileDuration(sorted, 0.5);
    summary.p95DurationMs = percentileDuration(sorted, 0.95);
    summary.maxDurationMs = sorted[sorted.length - 1];
  }

  const ok = samples.filter((sample) => sample.ok).length;

  return {
    totals: {
      samples: samples.length,
      ok,
      failed: samples.length - ok
    },
    steps
  };
}

export function deriveProbeFindings(summary: ProbeRunSummary): string[] {
  const findings: string[] = [];
  const health = summary.steps.health;
  const initialize = summary.steps.initialize;
  const auth = summary.steps.auth_configure_session;
  const healthHealthy = health.samples > 0 && health.failed === 0;
  const initializeEdgeFailure =
    initialize.failed > 0 &&
    (
      initialize.statusCodes.includes(502) ||
      initialize.errorTypes.includes("network_error") ||
      initialize.errorTypes.includes("timeout")
    );

  if (healthHealthy && initializeEdgeFailure) {
    findings.push(
      "Health probes are succeeding while initialize is seeing 502/network failures, which points to ingress or edge instability before MCP request handling completes."
    );
  }

  if (
    initialize.ok > 0 &&
    auth.ok > 0 &&
    initialize.p95DurationMs !== undefined &&
    auth.p95DurationMs !== undefined &&
    auth.p95DurationMs > initialize.p95DurationMs * 3
  ) {
    findings.push(
      "auth_configure_session is materially slower than initialize, so credential persistence or surrounding edge behavior deserves a closer look."
    );
  }

  if (findings.length === 0) {
    findings.push("No obvious ingress-vs-application split was detected from the current sample set.");
  }

  return findings;
}

function isLikelyEdgeFailure(sample: ProbeSample) {
  return (
    sample.statusCode === 502 ||
    sample.errorType === "network_error" ||
    sample.errorType === "timeout"
  );
}

export function summarizeProbeIteration(
  iteration: number,
  samples: ProbeSample[]
): ProbeIterationSummary {
  const failedSteps = samples.filter((sample) => !sample.ok).map((sample) => sample.step);

  if (failedSteps.length === 0) {
    return {
      iteration,
      sampleCount: samples.length,
      overallOk: true,
      failedSteps: [],
      likelyOrigin: "healthy",
      notes: ["all probe steps completed successfully"]
    };
  }

  const health = samples.find((sample) => sample.step === "health");
  const initialize = samples.find((sample) => sample.step === "initialize" && !sample.ok);
  const auth = samples.find((sample) => sample.step === "auth_configure_session" && !sample.ok);

  if (health?.ok && initialize && isLikelyEdgeFailure(initialize)) {
    return {
      iteration,
      sampleCount: samples.length,
      overallOk: false,
      failedSteps,
      likelyOrigin: "likely_edge",
      notes: [
        "health succeeded before MCP initialization failed, which suggests ingress or transport instability ahead of application handling"
      ]
    };
  }

  if (health?.ok && auth && isLikelyEdgeFailure(auth)) {
    return {
      iteration,
      sampleCount: samples.length,
      overallOk: false,
      failedSteps,
      likelyOrigin: "likely_edge",
      notes: [
        "session establishment succeeded before auth configuration failed, so the edge or transport path still deserves attention"
      ]
    };
  }

  if (samples.some((sample) => !sample.ok && sample.errorType === "http_error")) {
    return {
      iteration,
      sampleCount: samples.length,
      overallOk: false,
      failedSteps,
      likelyOrigin: "likely_application",
      notes: ["the probe reached the application and received an HTTP error response"]
    };
  }

  return {
    iteration,
    sampleCount: samples.length,
    overallOk: false,
    failedSteps,
    likelyOrigin: "unknown",
    notes: ["the failure pattern did not clearly isolate edge or application behavior"]
  };
}

function summarizeLikelyOrigins(iterations: readonly ProbeIterationSummary[]) {
  const counts: Record<ProbeLikelyOrigin, number> = {
    healthy: 0,
    likely_edge: 0,
    likely_application: 0,
    unknown: 0
  };

  for (const iteration of iterations) {
    counts[iteration.likelyOrigin] += 1;
  }

  return counts;
}

export function formatProbeReport(report: ProbeReport, format: ProbeOutputFormat) {
  if (format === "json") {
    return JSON.stringify(report, null, 2);
  }

  if (format === "ndjson") {
    const iterationLines = report.iterations.map((iteration) =>
      JSON.stringify({
        type: "iteration",
        ...iteration
      })
    );

    iterationLines.push(
      JSON.stringify({
        type: "summary",
        totals: report.summary.totals,
        likelyOrigins: summarizeLikelyOrigins(report.iterations),
        findings: report.findings
      })
    );

    return iterationLines.join("\n");
  }

  const likelyOrigins = summarizeLikelyOrigins(report.iterations);
  const lines = [
    `url: ${report.options.url}`,
    `region: ${report.options.region}`,
    `iterations: ${report.options.iterations}`,
    `timeout: ${report.options.timeoutMs}ms`,
    `sampling pause: ${report.options.sleepMs}ms`,
    `totals: ${report.summary.totals.samples} samples, ${report.summary.totals.ok} ok, ${report.summary.totals.failed} failed`,
    `likely origins: healthy=${likelyOrigins.healthy}, likely_edge=${likelyOrigins.likely_edge}, likely_application=${likelyOrigins.likely_application}, unknown=${likelyOrigins.unknown}`
  ];

  for (const finding of report.findings) {
    lines.push(`finding: ${finding}`);
  }

  return lines.join("\n");
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function requestJson(
  url: string,
  payload: unknown,
  options: {
    timeoutMs: number;
    sessionId?: string;
  }
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const headers: Record<string, string> = {
      accept: "application/json, text/event-stream",
      "content-type": "application/json"
    };

    if (options.sessionId) {
      headers["mcp-session-id"] = options.sessionId;
      headers["mcp-protocol-version"] = "2025-03-26";
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    return {
      statusCode: response.status,
      headers: response.headers,
      bodyText: await response.text()
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runSingleSample(options: EdgeProbeOptions, iteration: number): Promise<ProbeSample[]> {
  const samples: ProbeSample[] = [];
  const healthStartedAt = new Date().toISOString();
  const healthStartedMs = Date.now();

  try {
    const healthResponse = await fetch(new URL("/health", options.url), {
      signal: AbortSignal.timeout(options.timeoutMs)
    });
    samples.push({
      iteration,
      step: "health",
      startedAt: healthStartedAt,
      durationMs: Date.now() - healthStartedMs,
      ok: healthResponse.ok,
      statusCode: healthResponse.status,
      errorType: healthResponse.ok ? undefined : "http_error",
      errorMessage: healthResponse.ok ? undefined : healthResponse.statusText
    });
  } catch (error) {
    samples.push({
      iteration,
      step: "health",
      startedAt: healthStartedAt,
      durationMs: Date.now() - healthStartedMs,
      ok: false,
      errorType: error instanceof DOMException ? "timeout" : "network_error",
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    return samples;
  }

  const initializeStartedAt = new Date().toISOString();
  const initializeStartedMs = Date.now();
  let sessionId: string | undefined;

  try {
    const initializeResponse = await requestJson(
      options.url,
      {
        jsonrpc: "2.0",
        id: `initialize-${Date.now()}`,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: {
            name: "codearts-edge-probe",
            version: "0.1.0"
          }
        }
      },
      { timeoutMs: options.timeoutMs }
    );

    sessionId = initializeResponse.headers.get("mcp-session-id") ?? undefined;
    samples.push({
      iteration,
      step: "initialize",
      startedAt: initializeStartedAt,
      durationMs: Date.now() - initializeStartedMs,
      ok: initializeResponse.statusCode >= 200 && initializeResponse.statusCode < 300,
      statusCode: initializeResponse.statusCode,
      errorType:
        initializeResponse.statusCode >= 200 && initializeResponse.statusCode < 300
          ? undefined
          : "http_error",
      errorMessage:
        initializeResponse.statusCode >= 200 && initializeResponse.statusCode < 300
          ? undefined
          : initializeResponse.bodyText
    });
  } catch (error) {
    samples.push({
      iteration,
      step: "initialize",
      startedAt: initializeStartedAt,
      durationMs: Date.now() - initializeStartedMs,
      ok: false,
      errorType: error instanceof DOMException ? "timeout" : "network_error",
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    return samples;
  }

  if (!sessionId) {
    return samples;
  }

  const authStartedAt = new Date().toISOString();
  const authStartedMs = Date.now();

  try {
    const authResponse = await requestJson(
      options.url,
      {
        jsonrpc: "2.0",
        id: `auth-${Date.now()}`,
        method: "tools/call",
        params: {
          name: "auth_configure_session",
          arguments: {
            access_key: options.accessKey,
            secret_key: options.secretKey,
            region: options.region
          }
        }
      },
      {
        timeoutMs: options.timeoutMs,
        sessionId
      }
    );

    samples.push({
      iteration,
      step: "auth_configure_session",
      startedAt: authStartedAt,
      durationMs: Date.now() - authStartedMs,
      ok: authResponse.statusCode >= 200 && authResponse.statusCode < 300,
      statusCode: authResponse.statusCode,
      errorType:
        authResponse.statusCode >= 200 && authResponse.statusCode < 300
          ? undefined
          : "http_error",
      errorMessage:
        authResponse.statusCode >= 200 && authResponse.statusCode < 300
          ? undefined
          : authResponse.bodyText
    });
  } catch (error) {
    samples.push({
      iteration,
      step: "auth_configure_session",
      startedAt: authStartedAt,
      durationMs: Date.now() - authStartedMs,
      ok: false,
      errorType: error instanceof DOMException ? "timeout" : "network_error",
      errorMessage: error instanceof Error ? error.message : String(error)
    });
  }

  return samples;
}

function parseCliArgs(argv: string[]): EdgeProbeOptions {
  const values = new Map<string, string>();

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith("--")) {
      continue;
    }

    values.set(current.slice(2), argv[index + 1] ?? "");
    index += 1;
  }

  const url = values.get("url") ?? process.env.CODEARTS_MCP_URL ?? "http://127.0.0.1/mcp";
  const accessKey = values.get("access-key") ?? process.env.HUAWEICLOUD_AK ?? "";
  const secretKey = values.get("secret-key") ?? process.env.HUAWEICLOUD_SK ?? "";
  const region = values.get("region") ?? process.env.HUAWEICLOUD_REGION ?? "cn-north-4";
  const iterations = Number(values.get("iterations") ?? "5");
  const timeoutMs = Number(values.get("timeout-ms") ?? "30000");
  const sleepMs = Number(values.get("sleep-ms") ?? "0");
  const output = (values.get("output") ?? "json") as ProbeOutputFormat;

  if (!accessKey || !secretKey) {
    throw new Error("access-key and secret-key are required");
  }

  if (!["json", "ndjson", "summary"].includes(output)) {
    throw new Error("output must be one of: json, ndjson, summary");
  }

  return {
    url,
    accessKey,
    secretKey,
    region,
    iterations,
    timeoutMs,
    sleepMs,
    output
  };
}

export async function runEdgeProbe(options: EdgeProbeOptions) {
  const samples: ProbeSample[] = [];
  const iterations: ProbeIterationSummary[] = [];

  for (let iteration = 0; iteration < options.iterations; iteration += 1) {
    const sampleSet = await runSingleSample(options, iteration + 1);
    samples.push(...sampleSet);
    iterations.push(summarizeProbeIteration(iteration + 1, sampleSet));

    if (options.sleepMs > 0 && iteration < options.iterations - 1) {
      await delay(options.sleepMs);
    }
  }

  const summary = summarizeProbeRun(samples);
  const findings = deriveProbeFindings(summary);

  return {
    options: {
      url: options.url,
      region: options.region,
      iterations: options.iterations,
      timeoutMs: options.timeoutMs,
      sleepMs: options.sleepMs
    },
    iterations,
    samples,
    summary,
    findings
  } satisfies ProbeReport;
}

async function main() {
  const options = parseCliArgs(process.argv.slice(2));
  const report = await runEdgeProbe(options);
  console.log(formatProbeReport(report, options.output));
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
