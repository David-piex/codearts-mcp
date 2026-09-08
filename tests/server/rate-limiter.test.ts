import { describe, expect, it } from "vitest";
import { createFixedWindowRateLimiter } from "../../src/server/rate-limiter.js";

describe("fixed window rate limiter", () => {
  it("drops expired keys and keeps the key map bounded", () => {
    let currentTime = 1_000;
    const limiter = createFixedWindowRateLimiter({
      maxRequests: 10,
      windowMs: 100,
      maxKeys: 2,
      now: () => currentTime
    });

    limiter.check("session-a", "read");
    limiter.check("session-b", "read");
    currentTime += 101;
    limiter.check("session-c", "read");

    expect(() => limiter.check("session-a", "read")).not.toThrow();
  });
});
