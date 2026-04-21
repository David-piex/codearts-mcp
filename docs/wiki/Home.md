# CodeArts MCP Wiki

这页是项目文档总入口。  
如果你想快速判断这个仓库是什么、现在做到哪里、怎么部署、怎么测试，从这里开始即可。

## 当前文档整理原则

截至 `2026-04-21`，文档已经按下面四条主线重新收口：

- 入口总览
  - `README.md`
  - `docs/wiki/Home.md`
- 接入与部署
  - `docs/wiki/Getting-Started.md`
  - `docs/wiki/Team-Deployment.md`
- 测试、联调与排障
  - `docs/wiki/Testing-and-Live-Ops.md`
  - `docs/wiki/Troubleshooting.md`
- 当前实现与模块级真实状态
  - `docs/wiki/Current-Implementation-Status-2026-04-17.md`
  - `docs/wiki/*-Live-Validated.md`

说明：

- `Current-Implementation-Status-2026-04-17.md` 这个文件名保留历史日期，是为了保持统计脚本和外部引用稳定
- 文件内部内容与自动统计区块会随当前仓库状态持续刷新，不代表内容停留在 `2026-04-17`

## 第一次接触这个项目先看什么

1. [Getting Started](./Getting-Started.md)
2. [Team Deployment](./Team-Deployment.md)
3. [Testing and Live Ops](./Testing-and-Live-Ops.md)
4. [Current Implementation Status](./Current-Implementation-Status-2026-04-17.md)

## 如果你想快速建立项目深度理解

- [Architecture Deep Dive](./Architecture-Deep-Dive.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- `docs/product-overview.md`
- `docs/service-profile.md`

## 如果你想看当前真实可用度

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

对应明细页：

- [Req Live Validated](./Req-Live-Validated.md)
- [Check Live Validated](./Check-Live-Validated.md)
- [Build Live Validated](./Build-Live-Validated.md)
- [Deploy Live Validated](./Deploy-Live-Validated.md)
- [Artifact Live Validated](./Artifact-Live-Validated.md)
- [TestPlan Live Validated](./TestPlan-Live-Validated.md)

## 如果你想部署团队共享服务

先看：

1. [Team Deployment](./Team-Deployment.md)
2. [Testing and Live Ops](./Testing-and-Live-Ops.md)
3. [Troubleshooting](./Troubleshooting.md)

目前已经验证过一台公网共享实例：

- `http://123.249.85.184/health`
- `http://123.249.85.184/mcp`

这轮验证覆盖了：

- `initialize`
- `tools/list`
- `auth_configure_session`
- cookie / `auth_token` 重连
- 读路径抽样
- Req / Pipeline / Deploy 的受控写路径联调

## 当前最重要的维护结论

- 共享 `http` 模式已经具备持久化鉴权、会话恢复、写路径联调与回归测试
- 高频列表工具已补共享缓存和 in-flight dedupe
- 服务内缓存命中后，很多高频调用已经下降到毫秒级
- 外部偶发慢调用或 `502`，更可能来自入口网络层，而不是 Node 进程内部处理
- 当前文档不再把“模块实现状态”“接入示例”“历史 live 检查碎片”分散到多个重复页面里

## 建议保留关注的根文档

- `README.md`
- `docs/product-overview.md`
- `docs/service-profile.md`
- `docs/faq.md`
- `docs/release-checklist.md`
