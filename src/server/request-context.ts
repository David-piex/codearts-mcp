import { AsyncLocalStorage } from "node:async_hooks";

export type UpstreamRequestDiagnostic = {
  toolName?: string;
  method: string;
  path: string;
  statusCode?: number;
  durationMs: number;
};

export type RequestDiagnostics = {
  cacheHits: string[];
  phaseTimings: Array<{
    name: string;
    durationMs: number;
  }>;
  upstreamRequestCount: number;
  upstreamDurationMs: number;
  upstreamStatusCodes: number[];
};

const storage = new AsyncLocalStorage<RequestDiagnostics>();

export function runWithRequestDiagnostics<T>(work: () => T | Promise<T>) {
  return storage.run(
    {
      cacheHits: [],
      phaseTimings: [],
      upstreamRequestCount: 0,
      upstreamDurationMs: 0,
      upstreamStatusCodes: []
    },
    work
  );
}

export function getCurrentRequestDiagnostics() {
  return storage.getStore();
}

export function recordRequestCacheHit(toolName: string) {
  const current = storage.getStore();

  if (!current) {
    return;
  }

  current.cacheHits.push(toolName);
}

export function recordRequestPhase(name: string, durationMs: number) {
  const current = storage.getStore();

  if (!current) {
    return;
  }

  current.phaseTimings.push({
    name,
    durationMs
  });
}

export function recordUpstreamRequest(input: UpstreamRequestDiagnostic) {
  const current = storage.getStore();

  if (!current) {
    return;
  }

  current.upstreamRequestCount += 1;
  current.upstreamDurationMs += input.durationMs;

  if (input.statusCode !== undefined) {
    current.upstreamStatusCodes.push(input.statusCode);
  }
}
