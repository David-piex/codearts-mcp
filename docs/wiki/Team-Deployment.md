# 团队共享部署

这页回答两个问题：

- `codearts-mcp` 作为共享 MCP 服务应该怎么部署
- 团队成员接入时应该怎么用自己的 `AK/SK`

## 结论先说

推荐模式是：

- 服务端部署 `http`
- 每个用户第一次在自己的客户端里调用一次 `auth_configure_session`
- 标准区域通常只需要：
  - `access_key`
  - `secret_key`
  - `region`

共享的是同一个 MCP 服务入口，不是共享同一套华为云业务凭证。

## 当前支持的部署方式

仓库当前支持三类部署路径：

### 1. 宿主机直跑

```bash
npm install
npm run build
node dist/src/server/index.js
```

### 2. PM2

仓库内已有 `ecosystem.config.cjs`，适合长期驻留进程管理。

### 3. Docker Compose

仓库内已有 `docker-compose.yml`，适合标准容器部署；同时已预留共享鉴权持久化目录与 `MCP_AUTH_*` 配置。

## 一条已验证的部署回退方案

截至 `2026-04-20`，我们还验证过一条宿主机 fallback 部署方案：

- 主机：`123.249.85.184`
- 入口：
  - `http://123.249.85.184/health`
  - `http://123.249.85.184/mcp`
- 方式：
  - `systemd + nginx`
  - Node 运行时：`/opt/node22`
  - 应用目录：`/root/codearts-mcp`
  - 服务名：`codearts-mcp.service`

选择这条路径的原因不是仓库不支持 Docker，而是当时该服务器访问 Docker Hub 拉取基础镜像超时，因此改用宿主机进程管理完成部署验证。

结论是：

- 仓库推荐的共享 HTTP 运行形态是成立的
- 即使不走 Docker，也能稳定对外提供共享 MCP 服务

## 服务端最小环境变量

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

如果对外走 HTTPS，建议再配：

```env
MCP_AUTH_COOKIE_SECURE=true
```

## 共享模式为什么不在服务器预置固定业务账号

因为项目的共享模型是：

- 服务器提供统一 MCP 服务入口
- 每个用户的真实业务凭证保存在自己的 session / auth record 中
- 用户之间的业务身份隔离，不混用同一套 `AK/SK`

这比把一套固定业务账号塞进服务端环境变量更适合团队场景，也更利于审计与权限边界控制。

## 团队成员怎么接入

团队成员在客户端里连上共享服务后，第一步调用：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

成功后：

- 这个用户后续调用的所有产品工具都会使用他自己的凭证
- 客户端保留 cookie 时，正常重连不需要重复填写 `AK/SK`
- 客户端不保留 cookie 时，也可以改用固定 `auth_token` URL 继续复用

推荐给团队成员的客户端配置方式：

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

如果客户端不会保留 cookie，再改成：

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

## 标准区域为什么通常不需要手填 `*_base_url`

标准情况下，服务端会根据 `region` 自动推导产品地址。

北京四 `cn-north-4` 默认对应：

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

## 推荐的团队接入验收顺序

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

如果这条链路通了，再进入具体业务模块或写路径。

## 运维侧最需要稳定保存的两项

- `MCP_AUTH_MASTER_KEY`
- `MCP_AUTH_DATA_PATH`

注意：

- 如果 `MCP_AUTH_MASTER_KEY` 被更换，旧的凭证记录将无法解密，用户需要重新配置
- 如果 `MCP_AUTH_DATA_PATH` 丢失，服务端将无法恢复已保存的用户身份

## 什么时候优先看部署问题，而不是业务问题

如果你遇到的是：

- `/health` 不通
- `/mcp` 不通
- `tools/list` 列不出来

先看部署、代理和服务状态。

如果你遇到的是：

- 某个具体产品工具报权限或路由错误
- 某个列表成功但返回 `0`

优先看 `project_id`、服务开通、成员权限、当前租户样本和区域发布情况。

## 相关文档

- `README.md`
- `docs/faq.md`
- `docs/release-checklist.md`
- `docs/wiki/Getting-Started.md`
- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/wiki/Troubleshooting.md`
