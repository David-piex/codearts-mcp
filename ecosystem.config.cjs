module.exports = {
  apps: [
    {
      name: "codearts-mcp",
      script: "dist/src/server/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        MCP_TRANSPORT: "http",
        MCP_HTTP_PORT: "3000",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0",
        MCP_AUTH_MASTER_KEY: process.env.MCP_AUTH_MASTER_KEY,
        MCP_AUTH_DATA_PATH:
          process.env.MCP_AUTH_DATA_PATH ?? ".codearts-mcp/auth-store.json",
        MCP_AUTH_COOKIE_NAME:
          process.env.MCP_AUTH_COOKIE_NAME ?? "codearts_mcp_auth",
        MCP_AUTH_COOKIE_SECURE:
          process.env.MCP_AUTH_COOKIE_SECURE ?? "false",
        MCP_AUTH_TOKEN_TTL_SECONDS:
          process.env.MCP_AUTH_TOKEN_TTL_SECONDS ?? "2592000"
      }
    }
  ]
};
