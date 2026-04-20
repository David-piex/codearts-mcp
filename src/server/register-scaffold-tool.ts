import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type RegisterableServer = Pick<McpServer, "registerTool">;

export function registerScaffoldTool(options: {
  toolName: string;
  server: RegisterableServer;
}) {
  options.server.registerTool(
    options.toolName,
    {
      title: options.toolName,
      description: `CodeArts Phase 1 tool: ${options.toolName}`
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text: `${options.toolName} is scaffolded but not yet backed by live Huawei Cloud requests.`
        }
      ]
    })
  );
}
