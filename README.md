# CodeArts MCP

`codearts-mcp` 是一个面向华为云 CodeArts 中国站的 MCP Server。

它把 CodeArts 的多个产品模块统一封装成一套 MCP 工具，支持两种使用方式：

- 本地个人使用：`stdio`
- 团队共享部署：`http + session`

当前仓库已经收敛到 `8` 个核心产品模块，并暴露：

<!-- GENERATED:readme-exposure-summary:start -->
- `8` product modules
- `156` product tools
- `2` session/auth tools for shared `http` mode
- `158` total MCP tools in shared `http` mode
<!-- GENERATED:readme-exposure-summary:end -->

## 这个项目解决什么问题

如果你直接对接 CodeArts 官方接口，通常会遇到这些问题：

- 各产品接口风格不一致
- 不同模块的 `project_id`、`tenant_id`、记录 id 含义容易混
- 团队共享部署时，既想共用 MCP 服务，又不想共用一套业务账号
- 很多接口是否在北京四真实可用，需要实际 AK/SK 验证后才知道

这个项目的目标就是把这些问题收口成一套统一的 MCP 使用方式：

- 统一鉴权
- 统一工具命名
- 统一返回结构
- 对当前北京四真实可用情况给出明确文档，而不是只停留在代码实现层

## 当前覆盖的 CodeArts 模块

- Req / ProjectMan
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## 当前可用情况

截至 `2026-04-20`，在 `cn-north-4`（北京四）真实 AK/SK 验证下：

- 已完整闭环：
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- 已实现且能用，但仍有真实租户/区域限制：
  - TestPlan
  - Deploy
  - Artifact

这里的 `Partial` 主要不是“没做完”，而是：

- 当前租户业务数据不足
- 某些官方路由在北京四没有发布
- 某些写操作虽然已经 MCP 化，但还缺安全的真实正样本闭环

## 最近一轮刷新后的维护结论

- 共享 `http` 模式已经具备持久化鉴权、session 复用、写路径联调和回归测试
- 高频列表工具已经补了短 TTL 缓存：
  - `pipeline_list_pipelines`
  - `req_list_projects`
  - `repo_list_repositories`
  - `build_list_jobs`
- 这些高频列表读路径现在统一走 shared read-through cache，并带有 in-flight dedupe
  - 相同参数并发命中冷缓存时，只会发起一次上游请求
- 服务进程内部日志显示，缓存命中后的很多工具调用已经下降到毫秒级
- shared HTTP request log 现在会额外记录：
  - `cacheHits`
  - `upstreamRequestCount`
  - `upstreamDurationMs`
  - `upstreamStatusCodes`
- 共享层现在会额外补两类可操作提示：
  - 工具报错时，尽量追加按产品归类的权限/服务开通/项目归属 hint
  - 高频项目级列表返回空结果时，尽量提示先确认 `project_id`、服务配置和账号可见性
- 基础 HTTP client 现在只对 `GET` 开启受控韧性策略
  - 单次读取超时上限 `8s`
  - 瞬时失败时只重试 `1` 次
- 外部偶发高延迟和 `502` 目前更像入口网络层问题，而不是 MCP 业务处理本身

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

## 最值得先知道的结论

- `Req / Repo / Pipeline / Check / Build`
  - 当前暴露出来的 MCP 面已经可以直接用
- `Deploy`
  - 绝大多数主干能力已经可用
  - 当前默认建议先走经典链路，不要先从 `v4` 开始
  - 当前主要问题不是“没 MCP 化”，而是模板/runtime 较旧、部分 `v4` 记录链路缺正样本
- `Artifact`
  - 所有当前已发布的主干路由都已有对应 MCP 工具
  - 主要缺口是北京四仍有 `7` 条未发布路由
- `TestPlan`
  - 已发布读面可以用
  - `get_plan / list_runs / get_case / run_cases` 目前仍是北京四未发布

## 两种部署/使用方式

### 1. 本地个人使用

适合个人开发、自己在本机接入 MCP 客户端。

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

### 2. 团队共享部署

适合把 MCP 服务部署到一台服务器上，让多人共用同一个服务地址。

共享模式下：

- 服务器只部署一份 MCP 服务
- 每个用户仍然使用自己的华为云 `AK/SK`
- 每个用户在自己的 MCP 会话里调用 `auth_configure_session`
- 标准区域通常只需要：
  - `access_key`
  - `secret_key`
  - `region`

共享部署时，服务器侧还需要额外准备持久化鉴权环境变量：

```env
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
# optional:
# MCP_AUTH_COOKIE_NAME=codearts_mcp_auth
# MCP_AUTH_COOKIE_SECURE=true
# MCP_AUTH_TOKEN_TTL_SECONDS=2592000
```

标准共享用法：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

对于标准区域，服务端会根据 `region` 自动补全各产品的标准地址；只有确实使用非标准路由时，才需要手动传 `*_base_url`。

如果你直接用仓库自带部署模板：

- `.env.example`
  - 已包含共享 HTTP 持久化鉴权所需的关键变量示例
- `docker-compose.yml`
  - 已挂载 `./.codearts-mcp` 作为持久化凭证存储目录
- `ecosystem.config.cjs`
  - 已为 PM2 共享 HTTP 模式预留 `MCP_AUTH_*` 配置入口

## 快速开始

安装与构建：

```bash
npm install
npm run build
```

如果你只想快速验证接通，建议先按这个顺序试：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

这样可以最快把“鉴权/区域/基础 endpoint 问题”和“具体产品问题”区分开。

## 北京四标准地址参考

大多数用户不需要手填，下面这组地址主要用于排障或定制路由时参考：

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`

## 推荐阅读顺序

- 先看总览：
  - `docs/wiki/Home.md`
  - `docs/product-overview.md`
  - `docs/service-profile.md`
- 再看接入：
  - `docs/quickstart.md`
  - `docs/client-examples.md`
  - `docs/wiki/Getting-Started.md`
  - `docs/wiki/Team-Deployment.md`
- 如果你要快速建立项目深度理解：
  - `docs/wiki/Architecture-Deep-Dive.md`
  - `docs/wiki/Testing-and-Live-Ops.md`
- 再看当前真实状态：
  - `docs/wiki/Capability-Matrix.md`
  - `docs/wiki/Module-Live-Readiness.md`
  - `docs/wiki/Unavailable-Items-For-Users.md`
  - `docs/wiki/Deploy-Classic-Path.md`
  - `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- 如果你关心细节验证：
  - `docs/wiki/Deploy-Live-Validated.md`
  - `docs/wiki/Artifact-Live-Validated.md`
  - `docs/wiki/TestPlan-Live-Validated.md`
  - `docs/wiki/Build-Live-Validated.md`
- 如果你要给团队部署共享服务：
  - `docs/wiki/Team-Deployment.md`

## 维护命令

- `npm run build`
  - 构建 TypeScript
- `npm test`
  - 跑测试
- `npm run lint`
  - 代码风格检查
- `npm run stats:modules`
  - 输出模块统计
- `npm run stats:check-docs`
  - 检查 README / wiki 统计是否漂移
- `npm run stats:sync-docs`
  - 同步自动统计区块

## Shared HTTP Auth Persistence

共享 HTTP 模式现在支持持久化鉴权：

- 服务器使用 `MCP_AUTH_MASTER_KEY` 对每个用户的 `AK/SK` 做加密存储
- 持久化文件路径默认是 `MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json`
- 用户第一次调用 `auth_configure_session` 后，服务端会签发稳定的 auth cookie/token
- 如果客户端保留 cookie，同一个用户后续正常重连时，不需要再次填写 `AK/SK`
- 如果客户端不保留 cookie，可以把返回的 `auth_token` 固定写进 `/mcp?auth_token=...` 来跨对话复用
- 如果要主动撤销当前用户保存的凭证，调用 `auth_clear_session`

服务器部署时建议至少配置：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

运维上再记住两点：

- `MCP_AUTH_MASTER_KEY` 必须稳定保存；改掉以后，旧的已保存凭证将无法解密，用户需要重新配置
- `MCP_AUTH_DATA_PATH` 最好放在持久化磁盘；文件丢失后，服务端就无法恢复已保存的用户身份

## 共享 HTTP 客户端配置模板

如果你要把它部署到服务器给多人共用，客户端配置里通常只需要写 MCP 地址，不要直接写 `AK/SK`。

适合 Cursor / Codex Desktop 一类客户端的写法：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "https://your-host.example.com/mcp"
    }
  }
}
```

连上后，第一步调用：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

如果是北京四标准环境，通常只需要这三个字段；只有租户明确使用了非标准路由，才需要额外补各产品的 `*_base_url`。

如果你的客户端切换对话后不会保留 cookie，推荐把第一次返回的 `auth_token` 固定到 MCP URL：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "https://your-host.example.com/mcp?auth_token=replace-with-auth-token"
    }
  }
}
```

这样只要：

- 没有调用 `auth_clear_session`
- 服务端的 `MCP_AUTH_MASTER_KEY` 没变
- 持久化鉴权文件没有丢失
- token 没过期

就不需要在新对话里重新填写 `AK/SK`。
