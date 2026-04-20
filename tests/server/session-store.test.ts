import { describe, expect, it } from "vitest";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session auth binding store", () => {
  it("stores auth identity per MCP session", () => {
    const store = createSessionCredentialStore();

    store.bind("session-a", "auth-1");

    expect(store.getAuthId("session-a")).toBe("auth-1");
    expect(store.getAuthId("session-b")).toBeUndefined();
  });

  it("clears one MCP session binding without affecting others", () => {
    const store = createSessionCredentialStore();

    store.bind("session-a", "auth-1");
    store.bind("session-b", "auth-2");

    store.clear("session-a");

    expect(store.getAuthId("session-a")).toBeUndefined();
    expect(store.getAuthId("session-b")).toBe("auth-2");
  });

  it("expires stale bindings when their TTL elapses", () => {
    let now = 1_000;
    const store = createSessionCredentialStore({
      ttlMs: 500,
      now: () => now
    });

    store.bind("session-a", "auth-1");
    expect(store.getAuthId("session-a")).toBe("auth-1");

    now = 1_501;

    expect(store.getAuthId("session-a")).toBeUndefined();
  });

  it("refreshes binding expiry when the same session is rebound", () => {
    let now = 2_000;
    const store = createSessionCredentialStore({
      ttlMs: 500,
      now: () => now
    });

    store.bind("session-a", "auth-1");
    now = 2_300;
    store.bind("session-a", "auth-1");

    now = 2_650;
    expect(store.getAuthId("session-a")).toBe("auth-1");

    now = 2_801;
    expect(store.getAuthId("session-a")).toBeUndefined();
  });
});
