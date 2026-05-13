# Getting Started

这页只讲最短可用路径，目标是让你在最少步骤里把服务跑起来，并确认 MCP 调用真的已经打通。

## 方式 1：团队共享 `http`

### 1. 配置服务端环境变量

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

如果你准备对外提供 HTTPS，再补：

```env
MCP_AUTH_COOKIE_SECURE=true
```

### 2. 启动服务

推荐方式：

```bash
docker compose up -d --build
```

如果不用 Docker：

```bash
npm install
npm run build
node dist/src/server/index.js
```

### 3. 客户端添加 MCP 服务

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://your-server-ip/mcp"
    }
  }
}
```

### 4. 首次调用 `auth_configure_session`

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

标准区域一般只需要这三个字段。只有你确实走了非标准路由，才需要额外传 `*_base_url`。

### 5. 做最小连通验证

依次调用：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

如果 4 个读工具能返回有效结果，说明共享链路、会话鉴权和区域推导已经基本健康。

## 方式 2：本地 `stdio`

### 1. 配置本地环境变量

```env
MCP_TRANSPORT=stdio
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

### 2. 构建并启动

```bash
npm install
npm run build
node dist/src/server/index.js
```

### 3. 验证读路径

同样先跑：

- `req_list_projects`
- `repo_list_repositories`
- `pipeline_list_pipelines`
- `build_list_jobs`

## 方式 3：本地或远程 `CLI`

CLI 复用同一批 MCP 工具注册和 handler，适合脚本、CI、临时排障和不方便接 MCP 客户端的场景。

### 1. 本地直调

本地直调与 `stdio` 使用同一组环境变量：

```bash
npm run cli -- tools --format text
npm run cli -- schema req_list_projects
npm run cli -- call req_list_projects --input '{"page":1,"page_size":20}' --pretty
```

输入可以来自 JSON 字符串、文件或 stdin：

```bash
npm run cli -- call repo_list_repositories --file params.json --pretty
Get-Content -Raw params.json | npm run cli -- call repo_list_repositories --stdin --pretty
```

### 2. 远程 HTTP MCP 调用

如果已经有共享 HTTP 入口，CLI 可以直接走 `/mcp`：

```bash
npm run cli -- call req_list_projects \
  --transport http \
  --endpoint http://your-server-ip/mcp \
  --token replace-with-auth-token \
  --input '{"page":1}' \
  --pretty
```

也可以用环境变量固定远程入口：

```env
CODEARTS_CLI_TRANSPORT=http
CODEARTS_MCP_URL=http://your-server-ip/mcp
CODEARTS_MCP_AUTH_TOKEN=replace-with-auth-token
```

## 标准区域默认地址

`cn-north-4` 会自动推导为：

| 产品 | 默认地址 |
| --- | --- |
| Req | `https://projectman-ext.cn-north-4.myhuaweicloud.com` |
| Repo | `https://codehub-ext.cn-north-4.myhuaweicloud.com` |
| Pipeline | `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com` |
| Check | `https://codecheck-ext.cn-north-4.myhuaweicloud.com` |
| TestPlan | `https://cloudtest-ext.cn-north-4.myhuaweicloud.com` |
| Deploy | `https://codearts-deploy.cn-north-4.myhuaweicloud.com` |
| Build | `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com` |
| Artifact | `https://artifact.cn-north-4.myhuaweicloud.cn` |

## 会话恢复

共享 `http` 模式下：

- 客户端如果保留 Cookie，后续重连通常不需要重新输入 `AK/SK`
- 客户端如果不保留 Cookie，请用 `Authorization: Bearer <auth_token>`；不要把 token 固定到 URL query
- 若需撤销当前用户已保存的凭证，调用 `auth_clear_session`

## 下一步看什么

- 想理解实现：看 [Architecture-Deep-Dive](./Architecture-Deep-Dive.md)
- 想知道各模块做到哪里：看 [Capability-Matrix](./Capability-Matrix.md)
- 想做真实联调：看 [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
