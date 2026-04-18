# Client Examples

## Local `stdio`

Good for personal local use:

```json
{
  "mcpServers": {
    "codearts-mcp": {
      "command": "node",
      "args": ["dist/src/server/index.js"],
      "env": {
        "HUAWEICLOUD_AK": "your-ak",
        "HUAWEICLOUD_SK": "your-sk",
        "HUAWEICLOUD_REGION": "cn-north-4",
        "MCP_SERVER_NAME": "codearts-mcp",
        "MCP_SERVER_VERSION": "0.1.0"
      }
    }
  }
}
```

For standard regions, that is enough. The server resolves the standard CodeArts product endpoints from `region`.

Only add per-product `HUAWEICLOUD_*_BASE_URL` overrides if your tenant really uses non-standard routes.

## Shared `http + session`

Good for shared team deployment:

```json
{
  "mcpServers": {
    "codearts-shared": {
      "transport": {
        "type": "http",
        "url": "https://your-domain.example.com/mcp"
      }
    }
  }
}
```

After connecting, call `auth_configure_session` before using product tools.

In shared deployment, the server can be deployed once for the team, but each user still uses their own:

- `AK`
- `SK`
- `region`

Typical shared usage:

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

For standard regions, per-product `*_base_url` overrides are optional.

## Recommendations

- prefer `stdio` for personal usage
- prefer `http + session` for team usage
- if you only want to verify connectivity, start with `Req / Repo / Pipeline` read tools
