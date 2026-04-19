# 团队共享部署

这页只回答一个问题：如果把 `codearts-mcp` 部署到服务器，团队里的其他人应该怎么接入。

## 结论先说

推荐模式是：

- 服务端部署 `http`
- 每个用户第一次在自己的客户端里调用一次 `auth_configure_session`
- 标准区域通常只传：
  - `access_key`
  - `secret_key`
  - `region`

这意味着共享的是同一个 MCP 服务入口，不是共享同一套华为云业务凭证。
现在服务端也支持把每个用户的凭证加密持久化保存，客户端正常重连时不需要重复填写 `AK/SK`。

## 服务端怎么部署

先安装并构建：

```bash
npm install
npm run build
```

最小环境变量：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
```

如果你是通过 HTTPS 对外提供服务，建议再配：

```env
MCP_AUTH_COOKIE_SECURE=true
```

启动：

```bash
node dist/src/server/index.js
```

默认监听地址：

- `0.0.0.0:${MCP_HTTP_PORT}`

如果你直接用仓库里的 Docker Compose 模板，建议这样起步：

1. 复制 `.env.example` 为 `.env`
2. 在 `.env` 里至少填好：
   - `MCP_TRANSPORT=http`
   - `MCP_AUTH_MASTER_KEY`
   - `MCP_AUTH_DATA_PATH`
3. 执行：

```bash
docker compose up -d --build
```

当前仓库里的 `docker-compose.yml` 已经做了两件关键事：

- 把持久化鉴权目录挂载到宿主机的 `./.codearts-mcp`
- 把 `MCP_AUTH_MASTER_KEY`、cookie 配置、TTL 等共享 HTTP 所需变量传入容器

## 团队成员怎么接

团队成员在客户端里连共享 MCP 服务后，第一步先调用：

- `auth_configure_session`

标准北京四示例：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

成功后：

- 这个用户后续调用的各产品工具都会使用他自己的凭证
- 客户端正常重连时，服务端会通过稳定的 auth cookie/token 自动恢复身份
- 只有首次配置、主动调用 `auth_clear_session`，或者服务端更换了主密钥后，才需要重新配置

## 给团队成员的最小接入步骤

1. 在客户端里添加共享 HTTP MCP 服务地址
2. 连接后调用 `auth_configure_session`
3. 先跑四个低风险读接口：
   - `req_list_projects`
   - `repo_list_repositories`
   - `pipeline_list_pipelines`
   - `build_list_jobs`
4. 确认基础链路正常后，再进入具体业务模块

## 为什么通常不需要手填各产品地址

标准情况下，服务端会根据 `region` 自动推导各产品标准地址。

北京四 `cn-north-4` 默认会推导为：

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`

所以大多数团队成员只需要自己的：

- `AK`
- `SK`
- `region`

## 什么情况下才需要自定义 `*_base_url`

只有在下面这些情况才建议额外传：

- 你的租户明确走了非标准产品路由
- 你在做排障，需要暂时强制指定某个产品地址
- 你所在区域不是默认标准路由组合

如果不是这些情况，直接传 `AK/SK/region` 更稳，文档和排障成本也更低。

## 运维侧需要注意的事

- `MCP_AUTH_MASTER_KEY` 必须稳定保存
  - 如果换了这个值，服务端将无法解密之前已经保存的用户凭证，用户需要重新配置
- `MCP_AUTH_DATA_PATH` 应该放在持久化磁盘上
  - 如果这个文件丢失，服务端就无法恢复已保存的用户身份
- 如果对外是 HTTPS，建议开启 `MCP_AUTH_COOKIE_SECURE=true`
- 共享部署不需要在服务器环境变量里预置某个固定业务账号的 `AK/SK`
- 如果你用 Docker Compose，确认宿主机上的 `./.codearts-mcp` 不会被临时清空

## 如何判断“连接问题”还是“鉴权问题”

看客户端日志时，建议这样判断：

- 如果 `listTools` 已经成功列出工具，说明共享 MCP 服务本身是可达的
- 如果日志里出现 `onClose` / `Disconnected`，但下一次又自动连上，通常只是客户端 transport 重建
- 只有当具体工具调用返回 `auth_error`，或者提示当前没有已配置的华为云凭证时，才需要重新检查 `auth_configure_session`

## 相关代码依据

- `src/server/http-app.ts`
  - 健康检查为 `GET /health`
  - MCP 入口为 `/mcp`
  - 负责根据请求里的 cookie / bearer 恢复 auth 上下文
- `src/server/create-server.ts`
  - `auth_configure_session` 接收 `access_key`、`secret_key`、`region` 和可选 `*_base_url`
  - HTTP 业务工具会按 `auth_id` 解析真实用户凭证
- `src/server/auth-repository.ts`
  - 服务端持久化保存加密后的鉴权记录
- `src/core/config/region-defaults.ts`
  - `resolveRegionDefaults(region)` 负责生成标准产品地址

## 相关文档

- `README.md`
- `docs/quickstart.md`
- `docs/client-examples.md`
- `docs/faq.md`
- `docs/wiki/Getting-Started.md`
