import type { AuthHeadersProvider } from "../auth/types.js";
import { normalizeProviderError } from "../errors/app-error.js";

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

type BinaryResponse = {
  body: Uint8Array;
  contentType?: string;
  fileName?: string;
};

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

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as {
      error_code?: string;
      error_msg?: string;
      errorCode?: string;
      errorMsg?: string;
    };

    return {
      status: response.status,
      message: payload.error_msg || payload.errorMsg || response.statusText || "Provider request failed",
      code: payload.error_code || payload.errorCode,
      requestId
    };
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
      };

      return {
        status: response.status,
        message: payload.error_msg || payload.errorMsg || response.statusText || "Provider request failed",
        code: payload.error_code || payload.errorCode,
        requestId
      };
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

export function createHttpClient(input: HttpClientInput) {
  const fetcher = input.fetcher ?? fetch;

  async function fetchResponse(method: string, path: string, body?: unknown) {
    const url = new URL(path, input.baseUrl).toString();
    const prepared = await prepareRequestBody(url, method, body);
    const headers = await input.authHeaders({
      method,
      url,
      body: prepared.signedBody,
      headers: prepared.headers
    });
    const response = await fetcher(url, { method, headers, body: prepared.body });

    if (!response.ok) {
      throw normalizeProviderError(await readProviderError(response));
    }

    return response;
  }

  async function request(method: string, path: string, body?: unknown) {
    const response = await fetchResponse(method, path, body);

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

  async function requestBinary(method: string, path: string, body?: unknown): Promise<BinaryResponse> {
    const response = await fetchResponse(method, path, body);
    const arrayBuffer = await response.arrayBuffer();

    return {
      body: new Uint8Array(arrayBuffer),
      contentType: response.headers.get("content-type") ?? undefined,
      fileName: parseFileName(response.headers.get("content-disposition"))
    };
  }

  return {
    get: (path: string) => request("GET", path),
    getBinary: (path: string) => requestBinary("GET", path),
    post: (path: string, body?: unknown) => request("POST", path, body),
    postMultipart: (path: string, body: FormData) => request("POST", path, body),
    put: (path: string, body?: unknown) => request("PUT", path, body),
    patch: (path: string, body?: unknown) => request("PATCH", path, body),
    delete: (path: string, body?: unknown) => request("DELETE", path, body)
  };
}
