# CodeArts MCP

> 面向华为云 CodeArts 中国站的统一 MCP Server，把 Req、Repo、Pipeline、Check、TestPlan、Deploy、Build、Artifact 这 8 个产品模块收敛成一套可本地接入、也可团队共享部署的 MCP 工具层。

## 项目定位

这个项目解决的是两个实际问题：

- 把 CodeArts 多产品、多域名、多鉴权上下文的调用方式，统一成一套稳定的 MCP 工具接口
- 让团队可以共享一个 `http` 入口，但每个成员仍然使用自己的 `AK/SK` 独立操作

它不是“把官方所有 PDF API 原样 1:1 镜像”。

当前实现重点是：

- 高频读路径可用、稳定、可缓存
- 关键写路径可控、可限流、可做真实联调
- 明确区分“已实现”“已 live 验证”“区域未发布 / 样本受限”

## 3 分钟开始

### 方式 A：团队共享 `http`

1. 复制环境变量模板并填写最小配置

```bash
cp .env.example .env
```

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

2. 启动服务

```bash
docker compose up -d --build
```

3. 在 MCP 客户端中添加共享入口

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

4. 首次连接后调用 `auth_configure_session`

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

5. 用下面 4 个低风险读工具做首轮验证

- `req_list_projects`
- `repo_list_repositories`
- `pipeline_list_pipelines`
- `build_list_jobs`

如果客户端不保留 Cookie，可以把首次鉴权返回的 `auth_token` 固定到 URL：

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

### 方式 B：本地 `stdio`

```env
MCP_TRANSPORT=stdio
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

```bash
npm install
npm run build
node dist/src/server/index.js
```

## 部署方式对比

| 模式 | 适用场景 | 优点 | 注意点 |
| --- | --- | --- | --- |
| Docker Compose | 团队共享，推荐 | 启动快、隔离简单、便于交付 | 需要 Docker 环境 |
| PM2 + Nginx | 团队共享，无 Docker | 方便接现有主机运维体系 | 需要自己管进程和反代 |
| 本地 stdio | 个人调试、本机接入 | 最直接 | 不适合多人共享 |

## 当前能力概览

<!-- GENERATED:readme-exposure-summary:start -->
- `8` product modules
- `218` product tools
- `2` session/auth tools for shared `http` mode
- `220` total MCP tools in shared `http` mode
<!-- GENERATED:readme-exposure-summary:end -->

工具读写分布：读操作 `145`，写操作 `73`。

<!-- GENERATED:readme-module-numbers:start -->
| Module | Tools | Live status | Current breakdown |
| --- | --- | --- | --- |
| Req | 8 | Validated | `8 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Repo | 25 | Validated | `25 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Pipeline | 77 | Partial | `16 Full / 0 Reachable / 0 Unpublished / 51 Code` |
| Check | 8 | Validated | `8 Full` |
| TestPlan | 7 | Partial | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` |
| Deploy | 59 | Partial | Expanded v4 surface with partial live closure; see `docs/wiki/Module-Live-Readiness.md` |
| Build | 22 | Validated | `22 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Artifact | 12 | Partial | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` |
<!-- GENERATED:readme-module-numbers:end -->

Live 状态说明：

- `Validated`：当前模块工具已经完成真实 AK/SK 联调闭环
- `Partial`：代码已实现，但仍存在区域未发布、租户样本不足或 execute-class 资源前置条件

## 环境变量参考

### 共享 `http` 最小变量

| 变量 | 说明 |
| --- | --- |
| `MCP_TRANSPORT` | 设为 `http` |
| `MCP_HTTP_PORT` | HTTP 监听端口，默认 `3000` |
| `MCP_SERVER_NAME` | 服务名 |
| `MCP_SERVER_VERSION` | 服务版本 |
| `MCP_AUTH_MASTER_KEY` | 会话加密主密钥 |
| `MCP_AUTH_DATA_PATH` | 会话持久化文件路径，默认 `.codearts-mcp/auth-store.json` |

### 本地 `stdio` 最小变量

| 变量 | 说明 |
| --- | --- |
| `MCP_TRANSPORT` | 设为 `stdio` |
| `HUAWEICLOUD_AK` | 华为云 AK |
| `HUAWEICLOUD_SK` | 华为云 SK |
| `HUAWEICLOUD_REGION` | 区域，例如 `cn-north-4` |
| `MCP_SERVER_NAME` | 服务名 |
| `MCP_SERVER_VERSION` | 服务版本 |

### 共享会话与安全相关变量

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `MCP_AUTH_COOKIE_NAME` | 鉴权 Cookie 名称 | `codearts_mcp_auth` |
| `MCP_AUTH_COOKIE_SECURE` | HTTPS 下是否设置 Secure | `false` |
| `MCP_AUTH_TOKEN_TTL_SECONDS` | `auth_token` 过期时间 | `2592000` |

### 读缓存 TTL 变量

| 变量 | 说明 |
| --- | --- |
| `MCP_REQ_LIST_PROJECTS_CACHE_TTL_MS` | Req 项目列表缓存 TTL |
| `MCP_REPO_LIST_REPOSITORIES_CACHE_TTL_MS` | Repo 仓库列表缓存 TTL |
| `MCP_PIPELINE_LIST_PIPELINES_CACHE_TTL_MS` | Pipeline 流水线列表缓存 TTL |
| `MCP_BUILD_LIST_JOBS_CACHE_TTL_MS` | Build 任务列表缓存 TTL |

### 产品地址覆盖变量

标准区域下通常不需要手填产品地址；服务会根据 `region` 自动推导。只有走非标准路由时，才需要覆盖：

- `HUAWEICLOUD_BASE_URL`
- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`
- `HUAWEICLOUD_CHECK_BASE_URL`
- `HUAWEICLOUD_TESTPLAN_BASE_URL`
- `HUAWEICLOUD_DEPLOY_BASE_URL`
- `HUAWEICLOUD_BUILD_BASE_URL`
- `HUAWEICLOUD_ARTIFACT_BASE_URL`

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地 `stdio` 开发启动 |
| `npm run dev:http` | 本地 `http` 开发启动 |
| `npm run build` | TypeScript 编译 |
| `npm test` | 全量测试 |
| `npm run test:fast` | 无隔离模式测试 |
| `npm run test:isolate` | 隔离模式测试 |
| `npm run lint` | 代码规范检查 |
| `npm run stats:modules` | 输出模块统计 |
| `npm run stats:check-docs` | 检查 README / Wiki 统计块是否漂移 |
| `npm run stats:sync-docs` | 同步统计块到文档 |
| `npm run probe:edge` | 对共享 `http` 入口做连通性与延迟采样 |

## 项目结构

```text
codearts-mcp/
├── src/
│   ├── core/              # 通用配置、鉴权、缓存、HTTP、错误处理
│   ├── products/          # 8 个产品模块的 client / schema / tool 实现
│   ├── server/            # stdio/http 入口、会话、工具注册、限流、统计
│   └── contracts/         # 共享类型与 schema
├── deploy/                # Docker / Nginx / PM2 部署脚本
├── tests/                 # 单测、集成、live smoke、HTTP 联调测试
├── Dockerfile
├── docker-compose.yml
├── docker-compose.ssl.yml
└── ecosystem.config.cjs
```

## 文档入口

如果你想快速建立项目理解，按这个顺序看最省时间：

1. `docs/wiki/Home.md`
2. `docs/wiki/Getting-Started.md`
3. `docs/wiki/Role-Based-Entry-Paths.md`
4. `docs/wiki/Typical-Workflow-Playbooks.md`
5. `docs/wiki/Module-Functions-Overview.md`
6. `docs/wiki/Architecture-Deep-Dive.md`
7. `docs/wiki/Capability-Matrix.md`
8. `docs/wiki/Module-Live-Readiness.md`
9. `docs/wiki/Testing-and-Live-Ops.md`
10. `docs/wiki/Official-API-Alignment.md`
11. `docs/wiki/Troubleshooting.md`

## 当前文档维护策略

- `README` 只保留部署、接入、能力边界和文档导航
- 自动统计只同步到 `README`、`docs/wiki/Capability-Matrix.md`、`docs/wiki/Module-Live-Readiness.md`
- 更细的 live 结果、联调策略和 API 对齐信息统一放在 wiki，避免 README 继续膨胀
