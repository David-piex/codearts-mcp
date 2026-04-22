import { describe, expect, it, vi } from "vitest";
import { createHttpClient } from "../../../src/core/http/client.js";
import {
  getCurrentRequestDiagnostics,
  runWithRequestDiagnostics
} from "../../../src/server/request-context.js";

const baseUrl = "https://example.com";
const signedAuthHeader = "SDK-HMAC-SHA256 signed";

function createClient(
  fetcher: ReturnType<typeof vi.fn>,
  overrides?: Partial<Parameters<typeof createHttpClient>[0]>
) {
  return createHttpClient({
    baseUrl,
    authHeaders: async () => ({ Authorization: signedAuthHeader }),
    fetcher: fetcher as never,
    ...(overrides ?? {})
  });
}

function createJsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...(init ?? {})
  });
}

describe("createHttpClient", () => {
  it("attaches auth headers and parses json", async () => {
    const fetcher = vi.fn().mockResolvedValue(createJsonResponse({ id: "p-1" }));
    const client = createClient(fetcher);

    const result = await client.get("/v1/projects");

    expect(fetcher).toHaveBeenCalled();
    expect(result).toEqual({ id: "p-1" });
  });

  it("supports put requests", async () => {
    const fetcher = vi.fn().mockResolvedValue(createJsonResponse({ ok: true }));
    const client = createClient(fetcher);

    const result = await client.put("/v1/projects/p-1", { name: "demo" });

    expect(fetcher).toHaveBeenCalled();
    expect(result).toEqual({ ok: true });
  });

  it("supports delete requests with a json body", async () => {
    const fetcher = vi.fn().mockResolvedValue(createJsonResponse({ ok: true }));
    const client = createClient(fetcher);

    const result = await client.delete("/v1/projects/p-1/hosts", ["host-1"]);

    expect(result).toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledWith(
      `${baseUrl}/v1/projects/p-1/hosts`,
      expect.objectContaining({
        method: "DELETE",
        body: JSON.stringify(["host-1"])
      })
    );
  });

  it("treats successful empty responses as null", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response("", {
        status: 200,
        headers: { "content-type": "text/plain; charset=UTF-8" }
      })
    );

    const client = createClient(fetcher);

    const result = await client.post("/v1/tasks/task-1/stop", {});

    expect(result).toBeNull();
  });

  it("supports multipart form uploads", async () => {
    let signedBody: string | Uint8Array | undefined;
    let signedHeaders: Record<string, string> | undefined;
    const fetcher = vi.fn().mockResolvedValue(createJsonResponse({ ok: true }));
    const client = createClient(fetcher, {
      authHeaders: async ({ body, headers }) => {
        signedBody = body;
        signedHeaders = headers;
        return { Authorization: signedAuthHeader, ...headers };
      },
    });

    const form = new FormData();
    form.append("upload_id", "upload-1");
    form.append("part_number", "1");
    form.append("file", new Blob(["hello multipart"]), "chunk.bin");

    const result = await client.postMultipart("/v1/upload", form);

    expect(result).toEqual({ ok: true });
    expect(signedBody).toBeInstanceOf(Uint8Array);
    expect(signedHeaders?.["content-type"]).toContain("multipart/form-data; boundary=");
    expect(fetcher).toHaveBeenCalledWith(
      `${baseUrl}/v1/upload`,
      expect.objectContaining({
        method: "POST",
        body: expect.any(Uint8Array),
        headers: expect.objectContaining({
          Authorization: signedAuthHeader
        })
      })
    );
  });

  it("surfaces provider error_code and error_msg from json responses", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          error_code: "SG.03111300",
          error_msg: "The current scan quota has been used up. Please purchase a scan quota first"
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json",
            "x-request-id": "request-1"
          }
        }
      )
    );

    const client = createClient(fetcher);

    await expect(client.post("/v1/upload", { ok: false })).rejects.toMatchObject({
      category: "provider_error",
      code: "SG.03111300",
      requestId: "request-1",
      status: 400,
      message: "The current scan quota has been used up. Please purchase a scan quota first"
    });
  });

  it("surfaces camelCase provider errors from json responses", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          errorCode: "CC.00050021.400",
          errorMsg: "参数非法或无效"
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json",
            "x-request-id": "request-2"
          }
        }
      )
    );

    const client = createClient(fetcher);

    await expect(client.post("/v1/upload", { ok: false })).rejects.toMatchObject({
      category: "provider_error",
      code: "CC.00050021.400",
      requestId: "request-2",
      status: 400,
      message: "参数非法或无效"
    });
  });

  it("supports binary downloads", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: {
          "content-type": "application/pdf",
          "content-disposition": 'attachment; filename="report.pdf"'
        }
      })
    );

    const client = createClient(fetcher);

    const result = await client.getBinary("/v1/report");

    expect(Array.from(result.body)).toEqual([1, 2, 3]);
    expect(result.contentType).toBe("application/pdf");
    expect(result.fileName).toBe("report.pdf");
  });

  it("parses json-shaped provider errors even when content-type is text/html", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          error: { code: "DEV-12-10303", reason: "无执行记录" },
          status: "error",
          error_code: "Deploy.00011303",
          error_msg: "无执行记录"
        }),
        {
          status: 400,
          headers: {
            "content-type": "text/html; charset=UTF-8",
            "x-request-id": "request-3"
          }
        }
      )
    );

    const client = createClient(fetcher);

    await expect(client.get("/v2/tasks/task-1/state?record_id=record-1")).rejects.toMatchObject({
      category: "provider_error",
      code: "Deploy.00011303",
      requestId: "request-3",
      status: 400,
      message: "无执行记录"
    });
  });
  it("retries a transient GET once before succeeding and records upstream diagnostics", async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("socket hang up"))
      .mockResolvedValueOnce(createJsonResponse({ ok: true }));

    const client = createClient(fetcher);

    const diagnostics = await runWithRequestDiagnostics(async () => {
      await expect(client.get("/health")).resolves.toEqual({ ok: true });
      return getCurrentRequestDiagnostics();
    });

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(diagnostics).toMatchObject({
      upstreamRequestCount: 2,
      upstreamStatusCodes: [200]
    });
  });

  it("does not retry write requests", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("socket hang up"));
    const client = createClient(fetcher);

    await expect(client.post("/projects", { name: "demo" })).rejects.toThrow("socket hang up");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
