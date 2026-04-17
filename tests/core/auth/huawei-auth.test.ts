import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";

describe("createHuaweiAuthHeaders", () => {
  it("signs requests with AK/SK using SDK-HMAC-SHA256", async () => {
    const authHeaders = createHuaweiAuthHeaders("test-ak", "test-sk", {
      now: () => new Date("2026-04-15T06:00:00.000Z")
    });

    const headers = await authHeaders({
      method: "GET",
      url: "https://example.com/v4/projects?limit=20&offset=0",
      headers: {
        host: "example.com"
      }
    });

    expect(headers["X-Sdk-Date"]).toBe("20260415T060000Z");
    expect(headers.Authorization).toContain("SDK-HMAC-SHA256 Access=test-ak");
    expect(headers.Authorization).toContain("SignedHeaders=host;x-sdk-date");
    expect(headers.Authorization).toBe(
      "SDK-HMAC-SHA256 Access=test-ak, SignedHeaders=host;x-sdk-date, Signature=419a35f367eef32c93f891c5c911e8aaec6a2415b7033eb0f2730ca6dbcb8005"
    );
  });

  it("normalizes canonical uri with trailing slash like Huawei official SDK", async () => {
    const authHeaders = createHuaweiAuthHeaders("test-ak", "test-sk", {
      now: () => new Date("2026-04-15T06:00:00.000Z")
    });

    const withoutSlash = await authHeaders({
      method: "GET",
      url: "https://example.com/v4/projects?limit=20&offset=0",
      headers: {
        host: "example.com"
      }
    });
    const withSlash = await authHeaders({
      method: "GET",
      url: "https://example.com/v4/projects/?limit=20&offset=0",
      headers: {
        host: "example.com"
      }
    });

    expect(withoutSlash.Authorization).toBe(withSlash.Authorization);
  });
});
