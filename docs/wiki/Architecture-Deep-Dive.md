# Architecture Deep Dive

这页面向维护者、测试同学和后续接手项目的人，目的是快速建立对 `codearts-mcp` 的结构化理解。

## 1. 项目到底是什么

`codearts-mcp` 是一个把华为云 CodeArts 多产品面统一封装成 MCP 工具的服务层。

它不是单个产品的 SDK，也不是单纯的接口代理，而是一层：

- 工具命名统一层
- 输入输出规范统一层
- 双传输模式统一层
- 共享会话鉴权统一层
- live 状态表达统一层

## 2. 顶层代码结构

### `src/core`

放通用能力：

- 华为云 AK/SK 签名
- HTTP 请求包装
- 错误规范化
- 区域默认地址解析
- 工具结果格式化

### `src/products`

按产品拆分，每个模块通常包含：

- `client.ts`
  - 负责和真实产品 API 对话
- `schemas.ts`
  - 输入 schema
- `tools/*.ts`
  - MCP tool handler

### `src/server`

放服务编排逻辑：

- 启动入口
- MCP server 组装
- stdio / http 模式切换
- auth/session 持久化
- session-aware handler
- 工具注册
- 模块统计与文档同步脚本

### `tests`

测试分成几层：

- client 单测
- server 单测
- http 共享模式 smoke
- write path integration
- live smoke

## 3. 两种传输模式

### `stdio`

典型路径：

- 启动进程
- 从环境变量读取 `AK/SK/region`
- 直接构建产品 client
- 注册工具

适合：

- 个人本地使用
- 本机直接挂 MCP 客户端

### `http + session`

典型路径：

1. 客户端发 `initialize`
2. 客户端调用 `auth_configure_session`
3. 服务端加密保存 `AK/SK`
4. 后续工具请求通过 cookie / token / session 恢复当前用户
5. 服务端按当前用户构建或复用产品 client
6. 请求落到具体产品工具

适合：

- 团队共享部署
- 多用户复用同一个 MCP 服务地址

## 4. 共享 HTTP 模式的核心链路

最关键的文件链路如下：

- `src/server/http.ts`
  - 创建 HTTP server，负责入口 keep-alive 和启动
- `src/server/http-app.ts`
  - 处理 `/health`、`/mcp`、MCP session、请求日志、auth cookie hook
- `src/server/auth-context.ts`
  - 从 cookie / bearer / query token / session 解析用户身份
- `src/server/auth-repository.ts`
  - 持久化保存凭证，当前基于文件
- `src/server/auth-session-runtime.ts`
  - 按 `authId` 解密凭证，构造产品 client，并做缓存
- `src/server/session-aware-handler.ts`
  - 在工具执行前按 session 选对 client，并缓存 handler
- `src/server/register-*.ts`
  - 把产品能力注册成 MCP 工具

## 5. 工具是怎么注册出来的

工具注册是分层完成的：

1. `create-server.ts`
   - 创建 MCP Server
   - 注册 auth 工具
   - 枚举所有工具名
2. `register-product-tools.ts`
   - 依次把工具名分发给各产品注册器
3. `register-req-tools.ts` / `register-repo-tools.ts` 等
   - 定义每个工具的 schema、描述、handler、session-aware client 选择逻辑
4. `src/products/*/tools/*.ts`
   - 产出具体工具的业务结果

这个结构的核心好处是：

- 工具面按模块组织清晰
- 单个工具的输入输出容易单测
- client 和 handler 分离，便于 live 校验

## 6. 当前最关键的运行时优化

截至 `2026-04-20`，当前项目已经做了几类明确优化：

### 用户级 client 复用

- `auth-session-runtime.ts`
- 同一个 `authId` 下缓存产品 client
- 默认 TTL `60s`

### 持久化仓库热路径节流

- `auth-repository.ts`
- 文件签名检查节流，避免每次请求频繁 `stat`

### 高频列表查询短缓存

已经补到这些 client：

- Pipeline `listPipelines`
- Req `listProjects`
- Repo `listRepositories`
- Build `listJobs`

### HTTP 入口观测与连接优化

- `http-app.ts`
  - 请求日志现在会记录 `sessionId / mcpMethod / toolName`
- `http.ts`
  - 服务端显式开启 keep-alive
  - keep-alive 与 header timeout 已统一收敛

## 7. 当前最容易误判的地方

### 误判 1：`Partial` 就等于没实现

不对。当前很多 `Partial` 实际是：

- 区域未发布
- 租户样本不足
- 老旧 Deploy runtime 限制

### 误判 2：外部调用慢就等于 Node handler 慢

也不对。最近联调已经看到：

- 服务内部日志里，缓存命中后的很多请求处理是 `1-3ms`
- 外部仍可能看到高延迟甚至偶发 `502`

这意味着剩余热点已经部分转移到入口链路，而不是 MCP 业务代码本身。

### 误判 3：共享 `http` 模式只是演示级能力

不对。当前共享模式已经具备：

- 持久化鉴权
- cookie / token 重连
- session-aware 写路径
- 写路径集成测试
- live smoke

## 8. 维护这个项目时最该盯住的点

- 文档统计脚本
  - `src/server/module-stats*.ts`
- auth/session 正确性
  - `auth-context.ts`
  - `auth-repository.ts`
  - `auth-session-runtime.ts`
- 写路径回归
  - `tests/server/write-path-integration.test.ts`
- 共享 http 模式回归
  - `tests/server/http-app.test.ts`
  - `tests/server/http.test.ts`
  - `tests/server/http-live-smoke.test.ts`
- 外部链路稳定性
  - 需要结合服务器日志与真实入口压测一起判断

## 9. 推荐搭配阅读

- `docs/product-overview.md`
- `docs/service-profile.md`
- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
