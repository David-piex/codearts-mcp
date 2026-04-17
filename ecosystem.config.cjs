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
        MCP_SERVER_VERSION: "0.1.0"
      }
    }
  ]
};
