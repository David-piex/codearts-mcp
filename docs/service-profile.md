# 服务画像

这份文档从“服务是怎么接请求、怎么找到当前用户、怎么把请求落到产品 client”的角度描述 `codearts-mcp`。

## 统一入口

服务有两个入口：

- `src/server/stdio.ts`
  - 个人本地模式
- `src/server/http.ts`
  - 团队共享模式

两种入口最终都会汇总到 `src/server/create-server.ts`，由它统一完成：

- MCP Server 创建
- 工具注册
- auth 工具注册
- 产品工具注册
- 共享 `http` 模式下的写路径限流

## 共享 HTTP 请求流

共享 `http` 模式的主要链路如下：

1. `src/server/http.ts`
   - 创建 Node HTTP Server
   - 启用 keep-alive
2. `src/server/http-app.ts`
   - 处理 `/health` 和 `/mcp`
   - 解析 initialize / tools/call
   - 维护 MCP transport session
   - 记录 `sessionId / mcpMethod / toolName`
3. `src/server/auth-context.ts`
   - 从 cookie、Bearer token、query token 或 session 里解析当前用户身份
4. `src/server/auth-session-runtime.ts`
   - 根据 `authId` 找到持久化凭证
   - 解密 `AK/SK`
   - 构造各产品 HTTP client 与产品 client
5. `src/server/session-aware-handler.ts`
   - 在每次工具调用时按 session 选对 client
   - 缓存 handler，避免重复构建
6. `src/products/*`
   - 进入具体产品 client 和 tool handler

## 会话与凭证模型

共享 `http` 模式下的凭证模型有三层：

- MCP session
  - 由 `StreamableHTTPServerTransport` 分配 `sessionId`
- auth identity
  - 由 `auth_configure_session` 创建 `authId`
- persisted credential
  - 由 `src/server/auth-repository.ts` 持久化保存加密后的 `AK/SK` 和各产品 base URL

关键点：

- `auth_configure_session`
  - 生成 `authId`
  - 加密保存凭证
  - 绑定当前 `sessionId`
  - 返回可复用的 auth token
- `auth_clear_session`
  - 撤销当前 identity
  - 清空 session 绑定
- 共享模式下，每个 session 使用自己的 `AK/SK`

## 产品注册模型

产品工具注册在 `src/server/register-product-tools.ts` 汇总，再按模块分发到：

- `register-req-tools.ts`
- `register-repo-tools.ts`
- `register-pipeline-tools.ts`
- `register-check-tools.ts`
- `register-testplan-tools.ts`
- `register-deploy-tools.ts`
- `register-build-tools.ts`
- `register-artifact-tools.ts`

这种结构的好处是：

- 模块边界清晰
- 产品 client 和 tool handler 可以分别测试
- live 验证和 wiki 状态可以按模块维护

## 运行时缓存与性能加固

当前服务端已经有几层明确的性能加固：

- `src/server/auth-session-runtime.ts`
  - 用户级产品 client 缓存，默认 TTL `60s`
- `src/server/auth-repository.ts`
  - 凭证文件签名检查节流，避免每次请求都频繁 `stat`
- `src/products/pipeline/client.ts`
  - `listPipelines` 短 TTL 缓存，现已切到 shared read-through cache
- `src/products/req/client.ts`
  - `listProjects` 短 TTL 缓存，现已切到 shared read-through cache
- `src/products/repo/client.ts`
  - `listRepositories` 短 TTL 缓存，现已切到 shared read-through cache
- `src/products/build/client.ts`
  - `listJobs` 短 TTL 缓存，现已切到 shared read-through cache
- `src/core/cache/read-through-cache.ts`
  - 统一提供 TTL 缓存与 in-flight dedupe，避免高并发冷缓存时重复打上游
- `src/server/request-context.ts`
  - 在单次 shared HTTP 请求内聚合 `cacheHits / upstreamRequestCount / upstreamDurationMs / upstreamStatusCodes`
- `src/core/http/client.ts`
  - 对 `GET` 增加 `8s` 超时与 `1` 次受控重试，写请求不做自动重试
- `src/server/http.ts`
  - HTTP keep-alive 已开启，服务端超时参数已显式收敛

## 如何理解“现在到底慢在哪里”

截至 `2026-04-20` 的最新联调结论是：

- 服务进程内部日志里，缓存命中后的很多工具调用已经是 `1-3ms`
- 首次冷请求仍会承担真实上游调用成本
- 外部链路上偶发的高延迟和 `502`，并不总能在 Node 服务日志中复现

这意味着当前性能问题可以分成两类：

- MCP 应用层
  - 已通过缓存和复用大幅下降
- 入口/网络层
  - 仍有外部链路抖动，需要结合服务器入口网络继续看

现在排查 shared HTTP 慢调用时，可以直接结合新增日志字段判断：

- `durationMs` 高、但 `upstreamDurationMs` 低
  - 更像入口链路、代理层或 transport 开销
- `cacheHits` 非空、且 `upstreamRequestCount = 0`
  - 说明本次请求完全命中进程内缓存
- `upstreamStatusCodes` 出现重复 `5xx`
  - 更应该优先排查上游服务稳定性，而不是先改 MCP handler

## 当前最值得关注的维护热点

- Deploy
  - 代码面完整度已经很高，真正阻塞点更多在老旧模板 runtime
- TestPlan / Artifact
  - 主要受北京四未发布路由限制
- 外部入口链路
  - 仍需要继续验证偶发慢调用和 `502`

## 对维护者最有帮助的文件

- `src/server/create-server.ts`
- `src/server/http.ts`
- `src/server/http-app.ts`
- `src/server/auth-session-runtime.ts`
- `src/server/auth-repository.ts`
- `src/server/session-aware-handler.ts`
- `tests/server/http-app.test.ts`
- `tests/server/http.test.ts`
- `tests/server/write-path-integration.test.ts`
