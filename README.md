# CodeArts MCP

`codearts-mcp` 是一个面向华为云 CodeArts 中国站的 MCP Server，目标是把 Req、Repo、Pipeline、Check、TestPlan、Deploy、Build、Artifact 这些分散的产品接口，收口成一套可本地使用、也可团队共享部署的统一 MCP 工具层。

它支持两种接入方式：

- `stdio`
  - 适合个人本地接入 MCP 客户端
- `http + session`
  - 适合团队共享一个 MCP 服务入口，但每个用户仍使用自己的 `AK/SK`

当前仓库已经收敛到 `8` 个核心产品模块，并暴露：

<!-- GENERATED:readme-exposure-summary:start -->
- `8` product modules
- `156` product tools
- `2` session/auth tools for shared `http` mode
- `158` total MCP tools in shared `http` mode
<!-- GENERATED:readme-exposure-summary:end -->

## 3 分钟部署使用

如果你是第一次接触这个项目，直接走这条主路径就行：

### 第 1 步：服务器管理员启动共享服务

先复制环境变量模板：

```bash
cp .env.example .env
```

把 `.env` 至少改成下面这样：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

然后二选一启动：

方式 A，直接用 Docker Compose：

```bash
docker compose up -d --build
```

方式 B，宿主机直接跑：

```bash
npm install
npm run build
node dist/src/server/index.js
```

### 第 2 步：团队成员在客户端里添加 MCP 服务

客户端配置最小示例：

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

如果客户端不会保留 cookie，可以在第一次鉴权成功后，把返回的 `auth_token` 固定到 URL：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://your-server-ip/mcp?auth_token=replace-with-auth-token"
    }
  }
}
```

### 第 3 步：第一次连接后先调用 `auth_configure_session`

首次调用参数：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

标准区域通常只需要这三个字段；只有确实使用非标准路由时，才需要额外传入各产品的 `*_base_url`。

### 第 4 步：看到这些就算接通成功

服务端：

- `GET /health` 可访问
- `POST /mcp` 可访问

客户端：

- `tools/list` 能列出工具
- `auth_configure_session` 成功返回
- 下面四个读工具至少能正常调用：
  - `req_list_projects`
  - `repo_list_repositories`
  - `pipeline_list_pipelines`
  - `build_list_jobs`

如果四个读工具通了，通常说明共享链路已经是健康的，后面就可以继续进入具体模块和写路径。

## 详细部署与使用

### 1. 团队共享部署

这是当前最推荐的使用方式。

#### 服务器管理员需要做什么

最小环境变量：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

如果你对外暴露的是 HTTPS，建议再加：

```env
MCP_AUTH_COOKIE_SECURE=true
```

推荐启动方式：

- 标准容器部署：

```bash
docker compose up -d --build
```

- 宿主机直跑：

```bash
npm install
npm run build
node dist/src/server/index.js
```

#### 团队成员需要做什么

1. 在客户端里添加共享 MCP 服务地址
2. 连上后先调用 `auth_configure_session`
3. 先跑四个低风险读工具：
   - `req_list_projects`
   - `repo_list_repositories`
   - `pipeline_list_pipelines`
   - `build_list_jobs`

共享的是同一个 MCP 服务入口，不是共享同一套业务凭证。每个用户后续调用的产品工具都会使用他自己的 `AK/SK`。

#### 标准区域为什么通常不需要手填 `*_base_url`

标准情况下，服务端会根据 `region` 自动推导产品地址。北京四 `cn-north-4` 默认对应：

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`

所以大多数成员只需要自己的：

- `AK`
- `SK`
- `region`

### 2. 本地个人使用

如果你只是自己在本机接入 MCP 客户端，可以走 `stdio`。

最小环境变量：

```env
MCP_TRANSPORT=stdio
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

启动：

```bash
npm install
npm run build
node dist/src/server/index.js
```

成功标志：

- 客户端能正常拉起 `node dist/src/server/index.js`
- `req_list_projects`
- `repo_list_repositories`
- `pipeline_list_pipelines`
- `build_list_jobs`

这四个读工具能通，通常说明本地接入已经正常。

## 推荐的最小验证顺序

### 共享 `http`

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

### 本地 `stdio`

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

## 这个项目现在做到哪里了

截至 `2026-04-21`，北京四 `cn-north-4` 的最近一轮真实联调已经确认：

- 共享 `http` 模式可稳定完成：
  - `initialize`
  - `tools/list`
  - `auth_configure_session`
  - cookie / `auth_token` 重连
- 读路径已完成真实验证：
  - `req_list_projects`
  - `repo_list_repositories`
  - `pipeline_list_pipelines`
  - `build_list_jobs`
- 写路径已完成受控联调：
  - `req_create_work_item`
  - `pipeline_run_pipeline`
  - `deploy_start_app`
    - 当前样本返回的是“该应用需走流水线发布”的受控业务错误，这说明写链路已真正到达上游服务
- 高频读工具已补共享缓存与 in-flight dedupe，缓存命中后服务内很多调用已下降到毫秒级

已完成模块级 live 闭环：

- Req
- Repo
- Pipeline
- Check
- Build

已实现且可用，但仍受真实租户样本或区域发布限制：

- TestPlan
- Deploy
- Artifact

## 模块现状总表

<!-- GENERATED:readme-module-numbers:start -->
| Module | Tools | Live status | Current breakdown |
| --- | --- | --- | --- |
| Req | 8 | Validated | `8 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Repo | 24 | Validated | `24 Full` |
| Pipeline | 16 | Validated | `16 Full` |
| Check | 8 | Validated | `8 Full` |
| TestPlan | 7 | Partial | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` |
| Deploy | 59 | Partial | Expanded surface; see `docs/wiki/Deploy-Live-Validated.md` for the current live split |
| Build | 22 | Validated | `22 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Artifact | 12 | Partial | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` |
<!-- GENERATED:readme-module-numbers:end -->

## 当前已验证的一台共享联调实例

截至 `2026-04-20`，我们已经在下列公网实例上完成了一轮真实部署与深度联调：

- 地址：`http://123.249.85.184`
- 健康检查：`http://123.249.85.184/health`
- MCP 入口：`http://123.249.85.184/mcp`
- 部署形态：
  - `systemd + nginx`
  - Node 运行时位于 `/opt/node22`
  - 应用目录位于 `/root/codearts-mcp`

这轮验证证明：

- 仓库不仅能在本地 `stdio` 模式工作
- 也已经能以共享 `http` 形态对外服务，并完成真实会话恢复、读路径与受控写路径联调

## 维护命令

- `npm run build`
  - 构建 TypeScript
- `npm test`
  - 运行测试
- `npm run lint`
  - 执行 lint
- `npm run probe:edge`
  - 对共享 HTTP 入口做多轮连通性与延迟采样
- `npm run stats:modules`
  - 输出模块统计
- `npm run stats:check-docs`
  - 检查 README / Wiki 统计块是否漂移
- `npm run stats:sync-docs`
  - 同步自动统计区块

## Shared HTTP 持久化鉴权

共享 `http` 模式支持持久化鉴权：

- 用户第一次调用 `auth_configure_session` 后，服务端会加密保存该用户凭证
- 客户端保留 cookie 时，后续正常重连不需要再次填写 `AK/SK`
- 客户端不保留 cookie 时，也可以把返回的 `auth_token` 固定写到 `/mcp?auth_token=...`
- 若需撤销当前用户已保存的凭证，调用 `auth_clear_session`

运维侧需要稳定保存两项：

- `MCP_AUTH_MASTER_KEY`
- `MCP_AUTH_DATA_PATH`

否则服务重启后将无法恢复已有会话。

## 进阶文档入口

如果你已经完成部署，后面按这个顺序继续看最省时间：

1. `docs/wiki/Home.md`
2. `docs/wiki/Getting-Started.md`
3. `docs/wiki/Team-Deployment.md`
4. `docs/wiki/Testing-and-Live-Ops.md`
5. `docs/wiki/Troubleshooting.md`

如果你想快速建立项目深度理解，继续看：

- `docs/product-overview.md`
- `docs/service-profile.md`
- `docs/wiki/Architecture-Deep-Dive.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`

如果你想看模块级真实验证细节，继续看：

- `docs/wiki/Req-Live-Validated.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/wiki/Build-Live-Validated.md`
- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Artifact-Live-Validated.md`
- `docs/wiki/TestPlan-Live-Validated.md`
