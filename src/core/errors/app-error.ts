export type ErrorCategory =
  | "auth_error"
  | "not_found"
  | "validation_error"
  | "provider_error"
  | "rate_limit";

export class AppError extends Error {
  constructor(
    public category: ErrorCategory,
    message: string,
    public code?: string,
    public requestId?: string,
    public status?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function normalizeProviderError(input: {
  status: number;
  message: string;
  code?: string;
  requestId?: string;
}): AppError {
  if (input.status === 401 || input.status === 403) {
    return new AppError("auth_error", input.message, input.code, input.requestId, input.status);
  }

  if (input.status === 404) {
    return new AppError("not_found", input.message, input.code, input.requestId, input.status);
  }

  return new AppError("provider_error", input.message, input.code, input.requestId, input.status);
}
