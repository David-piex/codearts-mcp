import { describe, expect, it, vi } from "vitest";
import { createSessionAwareHandler } from "../../src/server/session-aware-handler.js";
import { createFixedWindowRateLimiter } from "../../src/server/rate-limiter.js";

describe("session aware handler factory", () => {
  it("resolves the product client from the session runtime when no injected client is provided", async () => {
    const runtimeClient = { kind: "runtime" };
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async (input: unknown) => ({ client, input });
    });
    const getClient = vi.fn(() => runtimeClient);

    const handler = createSessionAwareHandler({
      getClient,
      createProductHandler,
      injectedClient: undefined
    });

    await expect(handler({ page: 1 }, { sessionId: "session-a" })).resolves.toEqual({
      client: runtimeClient,
      input: { page: 1 }
    });

    expect(getClient).toHaveBeenCalledWith({
      sessionId: "session-a"
    });
    expect(createProductHandler).toHaveBeenCalledWith(runtimeClient);
  });

  it("uses the injected client without resolving session runtime clients", async () => {
    const injectedClient = { kind: "injected" };
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async (input: unknown) => ({ client, input });
    });
    const getClient = vi.fn();

    const handler = createSessionAwareHandler({
      injectedClient,
      createProductHandler,
      getClient
    });

    await expect(handler({ page: 2 }, { sessionId: "session-b" })).resolves.toEqual({
      client: injectedClient,
      input: { page: 2 }
    });

    expect(getClient).not.toHaveBeenCalled();
    expect(createProductHandler).toHaveBeenCalledWith(injectedClient);
  });

  it("reuses the derived product handler for repeated calls with the same client", async () => {
    const runtimeClient = { kind: "runtime" };
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async (input: unknown) => ({ client, input });
    });
    const getClient = vi.fn(() => runtimeClient);
    const handler = createSessionAwareHandler({
      getClient,
      createProductHandler
    });

    await expect(handler({ page: 1 }, { sessionId: "session-a" })).resolves.toEqual({
      client: runtimeClient,
      input: { page: 1 }
    });
    await expect(handler({ page: 2 }, { sessionId: "session-a" })).resolves.toEqual({
      client: runtimeClient,
      input: { page: 2 }
    });

    expect(createProductHandler).toHaveBeenCalledTimes(1);
  });

  it("rebuilds the product handler after the resolved client changes", async () => {
    const firstClient = { kind: "runtime-a" };
    const secondClient = { kind: "runtime-b" };
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async () => ({ client });
    });
    const getClient = vi
      .fn<() => { kind: string }>()
      .mockReturnValueOnce(firstClient)
      .mockReturnValueOnce(secondClient);
    const handler = createSessionAwareHandler({
      getClient,
      createProductHandler
    });

    await expect(handler(undefined, { sessionId: "session-a" })).resolves.toEqual({
      client: firstClient
    });
    await expect(handler(undefined, { sessionId: "session-b" })).resolves.toEqual({
      client: secondClient
    });

    expect(createProductHandler).toHaveBeenCalledTimes(2);
    expect(createProductHandler).toHaveBeenNthCalledWith(1, firstClient);
    expect(createProductHandler).toHaveBeenNthCalledWith(2, secondClient);
  });

  it("can reject repeated write operations before resolving the runtime client", async () => {
    let now = 10_000;
    const limiter = createFixedWindowRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      now: () => now
    });
    const getClient = vi.fn(() => ({ kind: "runtime" }));
    const createProductHandler = vi.fn((client: { kind: string }) => {
      return async () => ({ client });
    });
    const handler = createSessionAwareHandler({
      getClient,
      createProductHandler,
      beforeHandle: (_input, extra) => {
        limiter.check(`demo_write:${extra.sessionId}`, "demo_write");
      }
    });

    await expect(handler(undefined, { sessionId: "session-write" })).resolves.toEqual({
      client: { kind: "runtime" }
    });

    await expect(handler(undefined, { sessionId: "session-write" })).rejects.toThrow(
      /Too many demo_write requests/
    );
    expect(getClient).toHaveBeenCalledTimes(1);

    now += 60_001;

    await expect(handler(undefined, { sessionId: "session-write" })).resolves.toEqual({
      client: { kind: "runtime" }
    });
    expect(getClient).toHaveBeenCalledTimes(2);
  });
});
