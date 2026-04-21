import { describe, expect, it, vi } from "vitest";
import { createReadThroughCache } from "../../../src/core/cache/read-through-cache.js";

describe("read-through cache", () => {
  it("deduplicates concurrent reads for the same key", async () => {
    let calls = 0;
    const cache = createReadThroughCache<string, number>({
      ttlMs: 15_000,
      now: () => 1_000
    });

    const loader = vi.fn(async () => {
      calls += 1;
      return 42;
    });

    const [left, right] = await Promise.all([
      cache.getOrLoad("projects", loader),
      cache.getOrLoad("projects", loader)
    ]);

    expect(left.value).toBe(42);
    expect(right.value).toBe(42);
    expect(calls).toBe(1);
  });

  it("serves cached values until ttl expiry", async () => {
    let currentTime = 1_000;
    const cache = createReadThroughCache<string, number>({
      ttlMs: 50,
      now: () => currentTime
    });

    const loader = vi.fn(async () => 7);

    await cache.getOrLoad("projects", loader);
    currentTime = 1_020;
    const cached = await cache.getOrLoad("projects", loader);

    expect(cached.cacheHit).toBe(true);
    expect(loader).toHaveBeenCalledTimes(1);
  });
});
