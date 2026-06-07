import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/sdk/types.js";

export const DEFAULT_MCP_PROTOCOL_VERSION = LATEST_PROTOCOL_VERSION;

export function resolveMcpProtocolVersion(source: Record<string, string | undefined>) {
  return (
    source.CODEARTS_MCP_PROTOCOL_VERSION ??
    source.MCP_PROTOCOL_VERSION ??
    DEFAULT_MCP_PROTOCOL_VERSION
  );
}
