import { describe, expect, it, vi } from "vitest";
import { createStructuredLogger } from "../../src/server/logger.js";

describe("createStructuredLogger", () => {
  it("emits a JSON line with a stable structured envelope", () => {
    const sink = vi.fn();
    const logger = createStructuredLogger({
      component: "http_server",
      now: () => new Date("2026-04-21T10:02:00.000Z"),
      sink
    });

    logger.info({
      event: "http_request_completed",
      message: "HTTP request completed",
      path: "/health",
      statusCode: 200
    });

    expect(sink).toHaveBeenCalledTimes(1);
    expect(JSON.parse(sink.mock.calls[0][0] as string)).toEqual({
      timestamp: "2026-04-21T10:02:00.000Z",
      level: "info",
      component: "http_server",
      event: "http_request_completed",
      message: "HTTP request completed",
      path: "/health",
      statusCode: 200
    });
  });
});
