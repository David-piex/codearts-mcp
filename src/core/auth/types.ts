export type AuthHeadersProvider = (input: {
  method: string;
  url: string;
  body?: string | Uint8Array;
  headers: Record<string, string>;
}) => Promise<Record<string, string>>;
