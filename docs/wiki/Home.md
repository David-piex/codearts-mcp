# CodeArts MCP Wiki

这里是 `codearts-mcp` 的中文入口页。  
如果你想快速搞清楚这个项目是什么、现在做到什么程度、哪些页面最值得先看，从这里开始就够了。

## 最新刷新说明

本页已按 `2026-04-20` 的项目状态重新整理。

这次刷新重点补了三类信息：

- 项目深度理解路径
- 当前共享 `http` 模式的真实运行方式
- 测试 / live 验证 / 性能结论的最新入口

说明：

- 仓库里有一页历史文件名仍保留为 `Current-Implementation-Status-2026-04-17.md`
- 但它内部的生成区块仍会随着当前代码和统计脚本同步，不代表内容停留在 `2026-04-17`

## 先看哪几页

### 第一次接触这个项目

- [Getting Started](./Getting-Started.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Architecture Deep Dive](./Architecture-Deep-Dive.md)
- [Testing and Live Ops](./Testing-and-Live-Ops.md)

### 想知道“现在到底做到了哪里”

- [Current Implementation Status (tracked file)](./Current-Implementation-Status-2026-04-17.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)
- [Unavailable Items For Users](./Unavailable-Items-For-Users.md)

### 想按模块看真实验证细节

- [Req Live Validated](./Req-Live-Validated.md)
- [Check Live Validated](./Check-Live-Validated.md)
- [Build Live Validated](./Build-Live-Validated.md)
- [Deploy Live Validated](./Deploy-Live-Validated.md)
- [Artifact Live Validated](./Artifact-Live-Validated.md)
- [TestPlan Live Validated](./TestPlan-Live-Validated.md)

### 想部署、联调或排障

- [Team Deployment](./Team-Deployment.md)
- [Testing and Live Ops](./Testing-and-Live-Ops.md)
- [Troubleshooting](./Troubleshooting.md)

## 当前最重要的结论

截至 `2026-04-20`，北京四 `cn-north-4` 的真实 `AK/SK` 验证结论可以概括为：

- 已完成模块级 live 闭环：
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- 已实现且可用，但仍受真实租户样本或区域发布限制：
  - TestPlan
  - Deploy
  - Artifact

这里的 `Partial` 主要不是“代码没写完”，而是：

- 当前租户缺少稳定非空样本
- 北京四仍存在未发布路由
- Deploy 的健康路径仍受老旧模板 runtime 影响

## 当前项目形态

`codearts-mcp` 当前暴露的是一套聚焦 CodeArts 核心产品面的 MCP 工具层：

- `8` 个产品模块
- `156` 个产品工具
- `2` 个共享 `http` 模式下的 auth/session 工具

接入方式分两类：

- `stdio`
  - 适合个人本地使用
- `http + session`
  - 适合团队共享部署，每个用户使用自己的 `AK/SK`

## 这次最值得特别知道的维护结论

- 共享 `http` 模式已经具备持久化鉴权、会话复用、写路径联调和回归测试
- 高频列表请求已经做了短 TTL 缓存
- 服务内部日志显示，缓存命中后很多工具处理已经到了毫秒级
- 外部偶发高延迟和 `502` 目前更像入口网络层问题，而不是 MCP 业务逻辑慢

## 根文档

除了 wiki，下面几份根文档也建议一起看：

- `README.md`
- `docs/product-overview.md`
- `docs/service-profile.md`
