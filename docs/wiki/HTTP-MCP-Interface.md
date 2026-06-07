# CodeArts MCP HTTP 接口文档

本文档面向要直接接入 `codearts-mcp` HTTP 服务的客户端开发者，说明 HTTP 端点、MCP JSON-RPC 请求格式、会话复用、鉴权配置、工具调用和错误响应。每个功能的完整 API 参数请从 [Function-API-Reference](./Function-API-Reference.md) 进入对应模块明细页查看，工具清单总览请参考 [API-Reference](./API-Reference.md)，Req 深度接口请参考 [Req-API-Reference](./Req-API-Reference.md)。

## 1. 基础信息

| 项 | 值 |
| --- | --- |
| 本地直连 | `http://127.0.0.1:3000` |
| 本地 nginx / docker | `http://127.0.0.1` |
| 当前部署示例 | `http://123.249.85.184` |
| 协议 | MCP Streamable HTTP + JSON-RPC 2.0 |
| 业务入口 | `POST /mcp` |
| 会话头 | `mcp-session-id` |
| 内容类型 | `application/json` |

业务能力不以传统 REST 路由暴露，而是通过 MCP 的 `tools/list` 和 `tools/call` 统一访问。也就是说，`/mcp` 是唯一业务调用入口，具体能力由 `tools/call.params.name` 决定。

## 2. HTTP 端点

| Method | Path | 说明 | 是否需要 MCP 会话 |
| --- | --- | --- | --- |
| `GET` | `/` | 存活检查 | 否 |
| `GET` | `/health` | 存活检查 | 否 |
| `GET` | `/health/ready` | 就绪检查，包含鉴权持久化文件可读写状态 | 否 |
| `GET` | `/diagnostics/session-reuse` | 会话复用诊断快照 | 否 |
| `POST` | `/mcp` | MCP JSON-RPC 请求入口 | 首次 `initialize` 不需要，之后需要 |
| `DELETE` | `/mcp` | 关闭 MCP 会话 | 是 |
| `GET` | `/mcp` | 不支持 SSE，固定返回 405 | 否 |

### 2.1 存活检查

```bash
curl http://127.0.0.1:3000/health
```

响应：

```json
{
  "status": "ok"
}
```

### 2.2 就绪检查

```bash
curl http://127.0.0.1:3000/health/ready
```

成功响应：

```json
{
  "status": "ready",
  "checks": {
    "http": "ok",
    "auth_persistence": "ok"
  },
  "details": {
    "authDataPath": ".codearts-mcp/auth-store.json"
  }
}
```

如果鉴权持久化路径不可用，HTTP 状态码为 `503`：

```json
{
  "status": "not_ready",
  "checks": {
    "http": "ok",
    "auth_persistence": "error"
  },
  "details": {
    "authDataPath": ".codearts-mcp/auth-store.json",
    "authPersistenceError": "auth data path exists but is not a file"
  }
}
```

### 2.3 会话复用诊断

```bash
curl http://127.0.0.1:3000/diagnostics/session-reuse
```

响应结构：

```json
{
  "status": "ok",
  "diagnostics": {
    "recentRequests": []
  }
}
```

诊断内容用于排查客户端是否正确携带 `mcp-session-id`、是否重复初始化、工具调用落在哪个会话上。

## 3. MCP 调用生命周期

### 3.1 初始化会话

首次访问 `POST /mcp` 必须发送 `initialize`。服务端会在响应头返回 `mcp-session-id`，后续所有 MCP 请求都要携带这个头。

```bash
curl -i http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-11-25",
      "capabilities": {},
      "clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      }
    }
  }'
```

响应头示例：

```http
mcp-session-id: 6a78b6c4-9f1e-4db7-8e4f-c12b6c7c7e33
content-type: application/json
```

响应体示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2025-11-25",
    "capabilities": {
      "tools": {}
    },
    "serverInfo": {
      "name": "codearts-mcp",
      "version": "0.1.0"
    }
  }
}
```

### 3.2 发送 initialized 通知

部分 MCP 客户端会在 `initialize` 后发送通知：

```bash
curl http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -H "mcp-session-id: <session-id>" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized"
  }'
```

通知没有 `id`，通常不需要消费响应体。

### 3.3 查询工具列表

```bash
curl http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -H "mcp-session-id: <session-id>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list",
    "params": {}
  }'
```

响应中每个工具都会带 `name`、`description`、`inputSchema`：

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "req_list_projects",
        "description": "List CodeArts Req projects",
        "inputSchema": {
          "type": "object",
          "properties": {}
        }
      }
    ]
  }
}
```

客户端应以 `tools/list` 返回的 `inputSchema` 作为最终参数契约，文档中的样例用于说明常见调用方式。

### 3.4 通过 CLI 访问 HTTP MCP

如果你只是想从命令行调用共享 `/mcp`，不用手写 JSON-RPC，可以直接用 CLI：

```powershell
npm run cli -- call req_list_projects `
  --transport http `
  --endpoint http://127.0.0.1:3000/mcp `
  --token replace-with-auth-token `
  --input '{"page":1,"page_size":20}' `
  --format table
```

这条命令内部发送的仍然是标准 MCP `tools/call` 请求；`--token` 会写入 `Authorization: Bearer <token>`。

更多 CLI 用法见 [CLI-Usage](./CLI-Usage.md)。

## 4. 鉴权与会话

HTTP 模式下有两个共享鉴权工具：

| 工具 | 说明 |
| --- | --- |
| `auth_configure_session` | 为当前 MCP 会话配置华为云 AK/SK、区域和可选服务 base URL |
| `auth_clear_session` | 清除并撤销当前会话凭证 |

不要把真实 AK/SK 写入代码、文档、日志或 issue。生产环境建议只在服务端受控配置或一次性会话配置中传入。

### 4.1 配置当前会话凭证

```bash
curl -i http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -H "mcp-session-id: <session-id>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "auth_configure_session",
      "arguments": {
        "access_key": "<huaweicloud-ak>",
        "secret_key": "<huaweicloud-sk>",
        "region": "cn-north-4"
      }
    }
  }'
```

可选覆盖参数：

```json
{
  "req_base_url": "https://projectman-ext.cn-north-4.myhuaweicloud.com",
  "repo_base_url": "https://codehub-ext.cn-north-4.myhuaweicloud.com",
  "pipeline_base_url": "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
  "check_base_url": "https://codearts-check.cn-north-4.myhuaweicloud.com",
  "testplan_base_url": "https://testplan-ext.cn-north-4.myhuaweicloud.com",
  "deploy_base_url": "https://clouddeploy-ext.cn-north-4.myhuaweicloud.com",
  "build_base_url": "https://codeartsbuild-ext.cn-north-4.myhuaweicloud.com",
  "artifact_base_url": "https://cloudartifact-ext.cn-north-4.myhuaweicloud.com"
}
```

成功响应会设置鉴权 Cookie，并在 `structuredContent` 中返回可复用的 `auth_token`：

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Session <session-id> configured for cn-north-4..."
      }
    ],
    "structuredContent": {
      "session_id": "<session-id>",
      "auth_id": "<auth-id>",
      "configured": true,
      "region": "cn-north-4",
      "token_issued": true,
      "auth_token": "<opaque-token>",
      "token_preview": "abc123...",
      "cookie_expected": true,
      "bearer_supported": true,
      "query_token_supported": false
    }
  }
}
```

### 4.2 复用凭证

客户端可以用两种方式复用已配置凭证：

| 方式 | 示例 |
| --- | --- |
| Cookie | `Cookie: codearts_mcp_auth=<opaque-token>` |
| Bearer | `Authorization: Bearer <opaque-token>` |

如果请求携带了有效 token，服务端会把 token 对应的凭证绑定到当前 MCP session。Query token 默认关闭，因为 URL 容易进入代理日志、浏览器历史和监控系统；只有遗留客户端确实无法设置 header 或保留 Cookie 时，才应显式启用 `MCP_AUTH_ALLOW_QUERY_TOKEN=true`。

### 4.3 清除会话凭证

```bash
curl http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -H "mcp-session-id: <session-id>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "auth_clear_session",
      "arguments": {}
    }
  }'
```

响应：

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Session <session-id> credentials cleared."
      }
    ],
    "structuredContent": {
      "session_id": "<session-id>",
      "cleared": true
    }
  }
}
```

## 5. 工具调用接口

所有业务工具都使用同一个 JSON-RPC 方法：

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "method": "tools/call",
  "params": {
    "name": "<tool-name>",
    "arguments": {}
  }
}
```

### 5.1 查询项目列表

```bash
curl http://127.0.0.1:3000/mcp \
  -H "content-type: application/json" \
  -H "mcp-session-id: <session-id>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 10,
    "method": "tools/call",
    "params": {
      "name": "req_list_projects",
      "arguments": {
        "limit": 20
      }
    }
  }'
```

响应结构通常包含面向人看的 `content` 和面向程序消费的 `structuredContent`：

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 projects."
      }
    ],
    "structuredContent": {
      "projects": []
    }
  }
}
```

### 5.2 查询代码仓列表

```json
{
  "jsonrpc": "2.0",
  "id": 11,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repositories",
    "arguments": {
      "project_id": "<project-id>",
      "limit": 20
    }
  }
}
```

### 5.3 查询流水线列表

```json
{
  "jsonrpc": "2.0",
  "id": 12,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipelines",
    "arguments": {
      "project_id": "<project-id>",
      "limit": 20
    }
  }
}
```

### 5.4 查询构建任务列表

```json
{
  "jsonrpc": "2.0",
  "id": 13,
  "method": "tools/call",
  "params": {
    "name": "build_list_jobs",
    "arguments": {
      "project_id": "<project-id>",
      "limit": 20
    }
  }
}
```

### 5.5 写入类工具

写入类工具会走 HTTP 模式的写入限流。常见参数里如果支持 `dry_run: true`，会只做参数构造和预检，不发起真实写入。

```json
{
  "jsonrpc": "2.0",
  "id": 14,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item",
    "arguments": {
      "project_id": "<project-id>",
      "subject": "接口联调样例",
      "tracker_id": 2,
      "dry_run": true
    }
  }
}
```

具体写入工具是否支持 `dry_run` 以及必填字段，以 `tools/list` 的 `inputSchema` 为准。

## 6. 关闭会话

```bash
curl -X DELETE http://127.0.0.1:3000/mcp \
  -H "mcp-session-id: <session-id>"
```

如果缺少 session：

```json
{
  "error": "Missing MCP session ID."
}
```

如果传入了未知或已过期 session：

```json
{
  "error": "Unknown MCP session ID."
}
```

## 7. 错误响应

### 7.1 未初始化会话

非 `initialize` 请求没有携带 `mcp-session-id` 时：

```http
HTTP/1.1 400 Bad Request
```

```json
{
  "error": "Missing MCP session ID."
}
```

携带未知或已过期 `mcp-session-id` 时：

```http
HTTP/1.1 404 Not Found
```

```json
{
  "error": "Unknown MCP session ID."
}
```

### 7.2 不支持 SSE

```http
HTTP/1.1 405 Method Not Allowed
allow: POST, DELETE
```

```json
{
  "error": "GET /mcp SSE is not supported by this deployment. Use POST /mcp for MCP requests."
}
```

### 7.3 未知路径

```json
{
  "error": "Not found."
}
```

### 7.4 工具执行错误

工具参数错误、上游 CodeArts 返回错误、鉴权失败等通常作为 MCP 工具结果返回：

```json
{
  "jsonrpc": "2.0",
  "id": 20,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "auth_error: No credentials are configured for this session."
      }
    ],
    "isError": true
  }
}
```

只有 HTTP handler 自身异常才会返回 `500`：

```json
{
  "error": "Internal server error"
}
```

### 7.5 Origin 不在白名单

携带 `Origin` 的浏览器请求必须匹配 `MCP_HTTP_ALLOWED_ORIGINS`：

```http
HTTP/1.1 403 Forbidden
```

```json
{
  "error": "Origin is not allowed for MCP requests."
}
```

## 8. 限流与缓存

| 类型 | 规则 |
| --- | --- |
| 鉴权写入 | `auth_configure_session`、`auth_clear_session` 每个 session 默认每 60 秒最多 3000 次，可用 `MCP_AUTH_WRITE_RATE_LIMIT_*` 调整 |
| 产品写入 | HTTP 模式下按 action/session 默认每 60 秒最多 3000 次，可用 `MCP_PRODUCT_WRITE_RATE_LIMIT_*` 调整 |
| dry run | 解析到 `dry_run: true` 的产品写入请求不计入真实写入限流 |
| 读缓存 | 部分高频列表工具支持 TTL 缓存，具体由环境变量控制 |

## 9. HTTP 模式环境变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `MCP_SERVER_NAME` | MCP server 名称 | 无，必填 |
| `MCP_SERVER_VERSION` | MCP server 版本 | 无，必填 |
| `MCP_HTTP_PORT` | HTTP 监听端口 | `3000` |
| `MCP_HTTP_HOST` | HTTP 监听地址；本地默认只监听回环地址，共享/容器部署需显式设为 `0.0.0.0` | `127.0.0.1` |
| `MCP_HTTP_ALLOWED_ORIGINS` | 允许携带 `Origin` 访问 `/mcp` 的浏览器来源，多个值用英文逗号分隔 | 空 |
| `MCP_PRODUCT_WRITE_RATE_LIMIT_MAX_REQUESTS` | 产品写入每个 action/session 的限流次数 | `3000` |
| `MCP_PRODUCT_WRITE_RATE_LIMIT_WINDOW_MS` | 产品写入限流窗口，单位毫秒 | `60000` |
| `MCP_AUTH_MASTER_KEY` | HTTP 持久化凭证加密主密钥 | HTTP 模式必填 |
| `MCP_AUTH_DATA_PATH` | 持久化鉴权数据文件 | `.codearts-mcp/auth-store.json` |
| `MCP_AUTH_COOKIE_NAME` | 鉴权 Cookie 名称 | `codearts_mcp_auth` |
| `MCP_AUTH_COOKIE_SECURE` | 是否设置 Secure Cookie | `false` |
| `MCP_AUTH_TOKEN_TTL_SECONDS` | 鉴权 token TTL | `2592000` |
| `MCP_AUTH_ALLOW_QUERY_TOKEN` | 是否允许 `/mcp?auth_token=...` 兼容模式 | `false` |
| `MCP_AUTH_WRITE_RATE_LIMIT_MAX_REQUESTS` | 鉴权写入每个 session 的限流次数 | `3000` |
| `MCP_AUTH_WRITE_RATE_LIMIT_WINDOW_MS` | 鉴权写入限流窗口，单位毫秒 | `60000` |
| `MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS` | Req 项目列表读缓存 TTL | 由代码默认策略决定 |
| `MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS` | Repo 仓库列表读缓存 TTL | 由代码默认策略决定 |
| `MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS` | Pipeline 列表读缓存 TTL | 由代码默认策略决定 |
| `MCP_BUILD_LIST_JOBS_CACHE_TTL_MS` | Build 任务列表读缓存 TTL | 由代码默认策略决定 |

静态 stdio 模式还需要 `HUAWEICLOUD_AK`、`HUAWEICLOUD_SK`、`HUAWEICLOUD_REGION`。HTTP 多用户模式推荐使用 `auth_configure_session` 为每个 MCP 会话配置凭证。

服务 base URL 可通过环境变量或 `auth_configure_session` 覆盖：

| 服务 | 环境变量 |
| --- | --- |
| 通用 | `HUAWEICLOUD_BASE_URL` |
| Req | `HUAWEICLOUD_REQ_BASE_URL` |
| Repo | `HUAWEICLOUD_REPO_BASE_URL` |
| Pipeline | `HUAWEICLOUD_PIPELINE_BASE_URL` |
| Check | `HUAWEICLOUD_CHECK_BASE_URL` |
| TestPlan | `HUAWEICLOUD_TESTPLAN_BASE_URL` |
| Deploy | `HUAWEICLOUD_DEPLOY_BASE_URL` |
| Build | `HUAWEICLOUD_BUILD_BASE_URL` |
| Artifact | `HUAWEICLOUD_ARTIFACT_BASE_URL` |

## 10. 接入建议

1. 启动后先请求 `/health/ready`，确认服务和鉴权持久化可用。
2. 第一次连接只发送 `initialize`，保存响应头里的 `mcp-session-id`。
3. 调用 `auth_configure_session` 配置凭证，并保存返回的 `auth_token`。
4. 后续请求同时携带 `mcp-session-id` 和 Cookie 或 Bearer token。
5. 通过 `tools/list` 生成客户端侧参数表单或校验逻辑。
6. 写入接口先使用支持的 `dry_run: true` 预检，再执行真实写入。
7. 退出或换租户时调用 `auth_clear_session`，最后 `DELETE /mcp` 关闭 session。
