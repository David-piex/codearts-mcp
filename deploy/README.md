# 服务器部署手册

这份文档面向第一次把 `codearts-mcp` 部署到服务器的人。

目标是部署出一套可供团队共享使用的 HTTP MCP 服务：

- 服务端首选暴露统一 `/mcp` 入口，一次提供全部产品工具
- 旧的 8 个产品级 `/mcp/<family>` 入口仍作为兼容路径保留
- 每个用户用自己的 `AK/SK`
- 默认多用户模式下，用户首次调用 `auth_configure_session` 后，服务端加密持久化保存凭证
- 单账号模式可在 `.env` 预置 `HUAWEICLOUD_AK/SK/REGION` 与 `MCP_AUTH_STATIC_TOKEN`，客户端用固定 Bearer header 连接，无需自然语言鉴权
- 正常重连或服务重启后，不需要重复填写 `AK/SK`

同一实例还可以同时暴露 8 个产品级子入口：

- `/mcp/req`
- `/mcp/repo`
- `/mcp/pipeline`
- `/mcp/check`
- `/mcp/testplan`
- `/mcp/deploy`
- `/mcp/build`
- `/mcp/artifact`

这些子入口共用同一套鉴权持久化、Cookie 与 `auth_token`，但每个入口的 `mcp-session-id` 独立管理。

## 1. 推荐部署方式

优先推荐两种：

1. Docker Compose
2. PM2 + 宿主机 Nginx

如果你只是想最快落地，优先选 Docker Compose。

## 2. 最低要求

- Node.js 22
- Docker / Docker Compose
  - 如果你走容器部署
- 可持久化磁盘目录
  - 用来保存 `.codearts-mcp/auth-store.json`

## 3. 方式一: Docker Compose

### 第一步: 准备环境变量

在仓库根目录执行：

```bash
cp deploy/.env.shared.example .env
```

如果你想直接自动初始化，也可以执行：

```bash
bash deploy/bootstrap-shared.sh
```

这个脚本会：

- 复制 `deploy/.env.shared.example` 到根目录 `.env`
- 自动生成 `MCP_AUTH_MASTER_KEY`
- 创建宿主机持久化目录 `./.codearts-mcp`

如果你希望后续统一用仓库脚本管理启动和重启，也可以直接用：

```bash
bash deploy/preflight-shared.sh
bash deploy/manage-shared.sh start
```

至少修改这几个值：

```env
MCP_TRANSPORT=http
MCP_HTTP_PORT=3000
MCP_HTTP_HOST=0.0.0.0
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
MCP_AUTH_DATA_PATH=/app/.codearts-mcp/auth-store.json
# 请求体上限，防止异常 MCP 请求耗尽 Node.js 内存
MCP_HTTP_MAX_REQUEST_BODY_BYTES=8388608
# 共享实例最多保留的 MCP session 数；达到上限会批量回收最老的空闲 session
MCP_HTTP_MAX_SESSIONS=512
# 无请求 session 的回收时间；0 表示不因空闲失效，依靠 session 总量上限保护内存
MCP_HTTP_SESSION_IDLE_TIMEOUT_MS=0
# 共享容器的 Node.js 堆上限，应低于宿主机可用内存
NODE_OPTIONS=--max-old-space-size=2560
# 可选：只暴露指定产品族，例如 req,repo
# MCP_ENABLED_PRODUCT_FAMILIES=req,repo
```

如果你的公网入口是 HTTPS，建议同时改成：

```env
MCP_AUTH_COOKIE_SECURE=true
```

### 第二步: 启动

```bash
docker compose up -d --build
```

或者使用统一管理脚本：

```bash
bash deploy/manage-shared.sh start
```

`manage-shared.sh` 在启动前会自动执行一次部署前自检：

- 检查 `.env` 是否存在
- 检查 `MCP_AUTH_MASTER_KEY` 是否还是占位值
- 检查 `.codearts-mcp` 是否存在
- 在 HTTPS 模式下检查证书文件是否齐全

### 第三步: 检查服务

```bash
curl http://127.0.0.1/health
```

期望返回：

```json
{"status":"ok"}
```

也建议再看一下容器健康状态：

```bash
docker compose ps
```

期望 `codearts-mcp` 服务状态为 `healthy`。

### 第四步: 持久化检查

当前仓库的 `docker-compose.yml` 已经把宿主机目录：

- `./.codearts-mcp`

挂载到容器内：

- `/app/.codearts-mcp`

所以要确认这件事：

- 宿主机上的 `./.codearts-mcp` 不会被临时清理

否则服务重启后，已保存的用户凭证会丢失。

### 常用运维命令

仓库还提供了一个辅助脚本：

```bash
bash deploy/ops-shared.sh status
bash deploy/ops-shared.sh logs
bash deploy/ops-shared.sh backup-auth
bash deploy/ops-shared.sh restore-auth .codearts-mcp/backups/auth-store-YYYYMMDD-HHMMSS.json
bash deploy/ops-shared.sh show-auth-store
```

它分别用于：

- 查看 Compose 服务状态和本机 `/health`
- 查看最近日志
- 备份 `.codearts-mcp/auth-store.json`
- 从备份恢复 `.codearts-mcp/auth-store.json`
- 查看 auth-store 文件位置和大小

## 4. 方式二: PM2

### 第一步: 构建

```bash
npm install
npm run build
```

### 第二步: 设置环境变量

至少准备：

```bash
export MCP_TRANSPORT=http
export MCP_HTTP_PORT=3000
export MCP_HTTP_HOST=127.0.0.1
export MCP_SERVER_NAME=codearts-mcp
export MCP_SERVER_VERSION=0.1.0
export MCP_AUTH_MASTER_KEY=replace-with-a-long-random-secret
export MCP_AUTH_DATA_PATH=.codearts-mcp/auth-store.json
export MCP_HTTP_MAX_REQUEST_BODY_BYTES=8388608
```

如果你的入口是 HTTPS：

```bash
export MCP_AUTH_COOKIE_SECURE=true
```

### 第三步: 启动

```bash
pm2 start ecosystem.config.cjs
```

或者使用统一管理脚本：

```bash
bash deploy/manage-shared-pm2.sh build
bash deploy/manage-shared-pm2.sh start
```

### 第四步: 检查

```bash
pm2 logs codearts-mcp
curl http://127.0.0.1:3000/health
```

如果你走 PM2，也可以用：

```bash
bash deploy/manage-shared-pm2.sh status
bash deploy/manage-shared-pm2.sh logs
bash deploy/manage-shared-pm2.sh health
```

## 5. Nginx 反向代理

仓库已提供模板：

- `deploy/nginx/codearts-mcp.conf`
- `deploy/nginx/codearts-mcp-ssl.conf`

如果 HTTPS 已在更上层网关终止，通常直接用：

- `deploy/nginx/codearts-mcp.conf`

如果要让 nginx 直接监听 `443` 并加载证书，使用：

- `deploy/nginx/codearts-mcp-ssl.conf`

更多说明见：

- `deploy/nginx/README.md`

如果你直接用仓库里的 Docker Compose 并希望 nginx 处理 HTTPS，可以这样启动：

```bash
docker compose -f docker-compose.yml -f docker-compose.ssl.yml up -d --build
```

或者使用统一管理脚本：

```bash
bash deploy/manage-shared.sh start-ssl
```

前提是你已经把证书文件放到：

- `deploy/nginx/ssl/fullchain.pem`
- `deploy/nginx/ssl/privkey.pem`

另外，HTTPS 模式下必须保证：

- `MCP_AUTH_COOKIE_SECURE=true`

当前仓库里的 `docker-compose.ssl.yml` 会覆盖注入这个值。
如果你的 `.env` 里还没改成 `true`，`deploy/preflight-shared.sh --ssl` 会给出提醒，但不会阻止基于 HTTPS 覆盖文件的启动。

## 6. 对外暴露什么地址

推荐只暴露两个路径：

- `/health`

旧客户端如果仍按产品拆分接入，也可以继续使用这些兼容路径：

- `/mcp/req`
- `/mcp/repo`
- `/mcp/pipeline`
- `/mcp/check`
- `/mcp/testplan`
- `/mcp/deploy`
- `/mcp/build`
- `/mcp/artifact`

例如：

- `https://your-domain.example.com/mcp/req`
- `https://your-domain.example.com/mcp/repo`
- `https://your-domain.example.com/health`

## 7. 团队成员第一次怎么用

团队成员在客户端里加共享 HTTP MCP 地址，例如：

```json
{
  "mcpServers": {
    "codearts": {
      "type": "http",
      "url": "https://your-domain.example.com/mcp"
    }
  }
}
```

然后第一步调用：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

也就是调用：

- `auth_configure_session`

首次配置成功后，再跑这四个低风险读接口做验证：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

## 8. 最容易踩的坑

- 把 `MCP_AUTH_MASTER_KEY` 改了
  - 旧的已保存凭证将无法解密，所有用户都需要重新配置
- 没有持久化 `MCP_AUTH_DATA_PATH`
  - 服务重启后已保存凭证丢失
- HTTP 公网入口却没开 `MCP_AUTH_COOKIE_SECURE`
  - 安全性会差，HTTPS 部署下建议开启
- 在服务器环境里写死一套公共 `AK/SK`
  - 这不符合共享 HTTP 模式的设计
- 看到客户端日志里短暂 `Disconnected` 就判断服务坏了
  - 先看工具是否还能调用，再判断是不是 transport 重连

## 9. 推荐排障顺序

1. 先看 `/health` 是否正常
2. 再看客户端能不能 `listTools`
3. 再看当前用户是否成功调用过 `auth_configure_session`
4. 再用低风险读接口验证：
   - `req_list_projects`
   - `repo_list_repositories`
   - `pipeline_list_pipelines`
   - `build_list_jobs`

## 10. 相关文件

- `deploy/bootstrap-shared.sh`
- `deploy/preflight-shared.sh`
- `deploy/manage-shared.sh`
- `deploy/manage-shared-pm2.sh`
- `deploy/ops-shared.sh`
- `deploy/.env.shared.example`
- `docker-compose.yml`
- `docker-compose.ssl.yml`
- `ecosystem.config.cjs`
- `deploy/nginx/README.md`
- `docs/wiki/Team-Deployment.md`
- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/faq.md`
