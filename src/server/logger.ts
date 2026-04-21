export type StructuredLogLevel = "info" | "error";

export type StructuredLogPayload = {
  event: string;
  message?: string;
  [key: string]: unknown;
};

export type StructuredLogger = {
  info: (payload: StructuredLogPayload) => void;
  error: (payload: StructuredLogPayload) => void;
};

export function createStructuredLogger(options: {
  component: string;
  sink?: (line: string) => void;
  now?: () => Date;
}): StructuredLogger {
  const sink = options.sink ?? ((line: string) => console.info(line));
  const now = options.now ?? (() => new Date());

  function write(level: StructuredLogLevel, payload: StructuredLogPayload) {
    sink(
      JSON.stringify({
        timestamp: now().toISOString(),
        level,
        component: options.component,
        ...payload
      })
    );
  }

  return {
    info(payload) {
      write("info", payload);
    },
    error(payload) {
      write("error", payload);
    }
  };
}
