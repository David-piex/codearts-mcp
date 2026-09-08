import { AppError } from "../core/errors/app-error.js";

export type RateLimiter = {
  check: (key: string, actionName: string) => void;
};

export function createFixedWindowRateLimiter(options: {
  maxRequests: number;
  windowMs: number;
  maxKeys?: number;
  now?: () => number;
}): RateLimiter {
  const now = options.now ?? Date.now;
  const maxKeys = options.maxKeys ?? 10_000;
  const requestsByKey = new Map<string, number[]>();

  return {
    check(key, actionName) {
      const currentTime = now();
      const windowStart = currentTime - options.windowMs;
      const recentRequests = (requestsByKey.get(key) ?? []).filter(
        (timestamp) => timestamp > windowStart
      );

      if (recentRequests.length === 0) {
        requestsByKey.delete(key);
      }

      if (recentRequests.length >= options.maxRequests) {
        requestsByKey.set(key, recentRequests);
        throw new AppError(
          "rate_limit",
          `Too many ${actionName} requests for this MCP session. Try again later.`,
          undefined,
          undefined,
          429
        );
      }

      recentRequests.push(currentTime);
      requestsByKey.set(key, recentRequests);

      while (requestsByKey.size > maxKeys) {
        const first = requestsByKey.keys().next().value;

        if (first === undefined) {
          break;
        }

        if (first === key) {
          const second = requestsByKey.keys().next().value;
          if (second === undefined) break;
          requestsByKey.delete(second);
        } else {
          requestsByKey.delete(first);
        }
      }
    }
  };
}
