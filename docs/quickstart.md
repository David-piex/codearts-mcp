# 快速开始

这份文档面向两类用户：

- 本地个人使用 `stdio`
- 部署到服务器给团队共用 `http + session`

## 1. 安装与构建

```bash
npm install
npm run build
```

## 2. 最小环境变量

### 本地 `stdio`

```env
MCP_TRANSPORT=stdio
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

### 共享 `http + session`

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

共享模式下，通常不需要把某个固定业务账号的 `AK/SK` 写进服务器环境变量里。每个用户都在自己的 MCP 会话中单独配置。
如果你是部署到服务器，优先参考：

- `deploy/README.md`
- `deploy/.env.shared.example`
- `.env.example`

## 3. 启动服务

### 本地模式

```bash
node dist/src/server/index.js
```

### 共享 HTTP 模式

```bash
copy deploy\.env.shared.example .env
docker compose up -d --build
```

服务默认监听：

- `0.0.0.0:${MCP_HTTP_PORT}`

## 4. 共享模式下先做什么

如果你连接的是共享 HTTP MCP 服务，第一步先调用：

- `auth_configure_session`

标准北京四下，绝大多数用户只需要传：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

服务端会根据 `region` 自动补齐标准 CodeArts 产品地址。

只有在你的租户确实使用非标准路由时，才建议额外传某些 `*_base_url`。

## 5. 建议的首轮验证顺序

建议先从低风险读接口开始：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`
5. `deploy_list_apps`

这样可以快速确认：

- `AK/SK` 是否有效
- 区域是否正确
- 主要产品地址是否正常

如果你准备继续试 `Deploy`，当前默认建议走经典链路，不要先从 `v4` 开始：

1. `deploy_list_apps`
2. `deploy_get_app`
3. `deploy_list_tasks`
4. `deploy_get_task`
5. `deploy_start_app`
6. `deploy_get_status`
7. `deploy_get_history_detail`
8. `deploy_get_app_log`

## 6. 常见注意点

- `Artifact` 往往除了 `project_id` 之外，还需要真实 `tenant_id`
- 写操作建议优先用 `dry_run: true`
- 共享部署不等于共享业务凭证
- `http + session` 模式下一定先跑 `auth_configure_session`
- 标准区域通常不需要手填各产品 `*_base_url`

## 7. 当前最实用的结论

截至目前，下面这些模块可以直接作为主用：

- Req
- Repo
- Pipeline
- Check
- Build

下面这些模块也已经 MCP 化并可用，但还存在真实区域/租户限制：

- TestPlan
- Deploy
- Artifact

其中 `Deploy` 当前最实用的结论是：

- 经典链路已经可以作为主用路径
- `v4` 先不要当默认入口
- 如果只是想做查应用、查任务、启动、看状态、看日志、停止、回滚，经典链路已经够用

详细状态请看：

- `docs/wiki/Home.md`
- `docs/wiki/Deploy-Classic-Path.md`
- `docs/wiki/Team-Deployment.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`

## 8. Shared HTTP Auth Persistence

共享 HTTP 部署现在要求服务器侧提供持久化鉴权配置：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

行为上有两个关键变化：

- 用户第一次调用 `auth_configure_session` 后，服务端会加密保存该用户的 `AK/SK`
- 如果客户端保留 cookie，后续正常重连时会自动恢复，不需要重复填写 `AK/SK`
- 如果客户端不保留 cookie，可以把返回的 `auth_token` 固定写到 `/mcp?auth_token=...`，切换对话后仍可恢复
- 如果当前用户想撤销服务端已保存的凭证，调用 `auth_clear_session`

推荐的跨对话接法：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://your-server-ip/mcp?auth_token=替换成第一次配置后返回的auth_token"
    }
  }
}
```
