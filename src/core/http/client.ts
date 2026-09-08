import type { AuthHeadersProvider } from "../auth/types.js";
import { AppError, normalizeProviderError } from "../errors/app-error.js";
import { recordUpstreamRequest } from "../../server/request-context.js";

type HttpClientInput = {
  baseUrl: string;
  authHeaders: AuthHeadersProvider;
  fetcher?: typeof fetch;
};

type PreparedRequestBody = {
  body?: BodyInit;
  signedBody?: string | Uint8Array;
  headers: Record<string, string>;
};

type RequestOptions = {
  headers?: Record<string, string>;
};

type BinaryResponse = {
  body: Uint8Array;
  contentType?: string;
  fileName?: string;
};

// CodeArts list endpoints can take more than 8 seconds before sending headers,
// especially for accounts with many repositories or projects.
const READ_REQUEST_TIMEOUT_MS = 30_000;
const READ_REQUEST_RETRY_COUNT = 1;

async function prepareRequestBody(url: string, method: string, body?: unknown): Promise<PreparedRequestBody> {
  if (body === undefined) {
    return {
      headers: { "content-type": "application/json" }
    };
  }

  if (body instanceof FormData) {
    const request = new Request(url, { method, body });
    const arrayBuffer = await request.arrayBuffer();
    const payload = new Uint8Array(arrayBuffer);

    return {
      body: payload,
      signedBody: payload,
      headers: {
        "content-type": request.headers.get("content-type") ?? "multipart/form-data"
      }
    };
  }

  const payload = JSON.stringify(body);

  return {
    body: payload,
    signedBody: payload,
    headers: { "content-type": "application/json" }
  };
}

async function readProviderError(response: Response) {
  const requestId = response.headers.get("x-request-id") ?? undefined;
  const contentType = response.headers.get("content-type") ?? "";

  function normalizePayload(payload: {
    error_code?: string;
    error_msg?: string;
    errorCode?: string;
    errorMsg?: string;
    error?: {
      code?: string;
      reason?: string;
      message?: string;
    };
    status?: string;
  }) {
    return {
      status: response.status,
      message:
        payload.error_msg ||
        payload.errorMsg ||
        payload.error?.reason ||
        payload.error?.message ||
        response.statusText ||
        "Provider request failed",
      code: payload.error_code || payload.errorCode || payload.error?.code,
      requestId
    };
  }

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as {
      error_code?: string;
      error_msg?: string;
      errorCode?: string;
      errorMsg?: string;
      error?: {
        code?: string;
        reason?: string;
        message?: string;
      };
      status?: string;
    };

    return normalizePayload(payload);
  }

  const text = await response.text();
  const trimmed = text.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const payload = JSON.parse(trimmed) as {
        error_code?: string;
        error_msg?: string;
        errorCode?: string;
        errorMsg?: string;
        error?: {
          code?: string;
          reason?: string;
          message?: string;
        };
        status?: string;
      };

      return normalizePayload(payload);
    } catch {
      // Fall through to raw text when the body only looks like JSON.
    }
  }

  return {
    status: response.status,
    message: text || response.statusText || "Provider request failed",
    requestId
  };
}

function parseFileName(contentDisposition?: string | null): string | undefined {
  if (!contentDisposition) {
    return undefined;
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i);
  if (quotedMatch?.[1]) {
    return quotedMatch[1];
  }

  const plainMatch = contentDisposition.match(/filename=([^;]+)/i);
  return plainMatch?.[1]?.trim();
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  fetcher: typeof fetch
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetcher(url, {
      ...init,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

function shouldRetryReadError(error: unknown) {
  if (error instanceof AppError) {
    return error.status !== undefined && error.status >= 500;
  }

  return true;
}

export function createHttpClient(input: HttpClientInput) {
  const fetcher = input.fetcher ?? fetch;

  async function fetchResponse(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ) {
    const url = new URL(path, input.baseUrl).toString();
    const prepared = await prepareRequestBody(url, method, body);
    const requestHeaders = {
      ...prepared.headers,
      ...options.headers
    };
    const headers = await input.authHeaders({
      method,
      url,
      body: prepared.signedBody,
      headers: requestHeaders
    });
    const maxAttempts = method === "GET" ? READ_REQUEST_RETRY_COUNT + 1 : 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const startedAt = Date.now();
      let statusCode: number | undefined;

      try {
        const response =
          method === "GET"
            ? await fetchWithTimeout(
                url,
                {
                  method,
                  headers,
                  body: prepared.body
                },
                READ_REQUEST_TIMEOUT_MS,
                fetcher
              )
            : await fetcher(url, { method, headers, body: prepared.body });

        statusCode = response.status;

        if (!response.ok) {
          throw normalizeProviderError(await readProviderError(response));
        }

        return response;
      } catch (error) {
        if (method !== "GET" || attempt >= maxAttempts || !shouldRetryReadError(error)) {
          throw error;
        }
      } finally {
        recordUpstreamRequest({
          method,
          path,
          statusCode,
          durationMs: Date.now() - startedAt
        });
      }
    }

    throw new Error(`GET ${path} exhausted retry attempts`);
  }

  async function request(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ) {
    const response = await fetchResponse(method, path, body, options);

    if (response.status === 204) {
      return null;
    }

    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type") ?? "";

    if (contentLength === "0") {
      return null;
    }

    if (!contentType.includes("application/json")) {
      const text = await response.text();
      return text.trim() === "" ? null : text;
    }

    const text = await response.text();
    return text.trim() === "" ? null : JSON.parse(text);
  }

  async function requestBinary(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<BinaryResponse> {
    const response = await fetchResponse(method, path, body, options);
    const arrayBuffer = await response.arrayBuffer();

    return {
      body: new Uint8Array(arrayBuffer),
      contentType: response.headers.get("content-type") ?? undefined,
      fileName: parseFileName(response.headers.get("content-disposition"))
    };
  }

  return {
    get: (path: string, options?: RequestOptions) => request("GET", path, undefined, options),
    getBinary: (path: string, options?: RequestOptions) => requestBinary("GET", path, undefined, options),
    post: (path: string, body?: unknown, options?: RequestOptions) => request("POST", path, body, options),
    postBinary: (path: string, body?: unknown, options?: RequestOptions) => requestBinary("POST", path, body, options),
    postMultipart: (path: string, body: FormData, options?: RequestOptions) => request("POST", path, body, options),
    put: (path: string, body?: unknown, options?: RequestOptions) => request("PUT", path, body, options),
    patch: (path: string, body?: unknown) => request("PATCH", path, body),
    delete: (path: string, body?: unknown, options?: RequestOptions) => request("DELETE", path, body, options)
  };
}
