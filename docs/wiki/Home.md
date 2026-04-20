# CodeArts MCP Wiki

这里是 `codearts-mcp` 的中文入口页。

如果你只想快速搞清楚这个项目是什么、现在能用到什么程度、应该先看哪些文档，从这里开始就够了。

## 项目简介

`codearts-mcp` 是一个面向华为云 CodeArts 中国站的 MCP Server。

当前仓库聚焦 `8` 个核心模块，支持两种接入方式：

- 本地个人使用：`stdio`
- 团队共享部署：`http + session`

## 当前最重要的结论

截至 `2026-04-19`，北京四 `cn-north-4` 的真实 AK/SK 验证结果是：

- 已完整闭环：
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- 已实现且能用，但仍受真实租户/区域限制：
  - TestPlan
  - Deploy
  - Artifact

这里的 `Partial` 一般不表示“没写完”，而更常表示：

- 当前租户没有足够业务数据
- 北京四该官方路由未发布
- 写路径虽然已经 MCP 化，但还缺安全真实正样本

## 先看哪几页

### 第一次接触这个项目

- [Getting Started](./Getting-Started.md)
- [Team Deployment](./Team-Deployment.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)

### 想知道“现在到底写了多少、哪些能用”

- [Current Implementation Status (2026-04-17)](./Current-Implementation-Status-2026-04-17.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [AK/SK Verification Ledger (2026-04-17)](./AKSK-Verification-Ledger-2026-04-17.md)

### 想看模块级真实验证细节

- [Req Live Validated](./Req-Live-Validated.md)
- [Check Live Validated](./Check-Live-Validated.md)
- [Build Live Validated](./Build-Live-Validated.md)
- [Deploy Live Validated](./Deploy-Live-Validated.md)
- [Artifact Live Validated](./Artifact-Live-Validated.md)
- [TestPlan Live Validated](./TestPlan-Live-Validated.md)

### 遇到问题时

- [Troubleshooting](./Troubleshooting.md)

## 当前模块概览

- `Req`
  - 项目与工作项读写已经真实闭环
- `Repo`
  - 仓库、分支、文件、提交、合并请求已完整可用
- `Pipeline`
  - 流水线运行、审批、重试、停止等主干能力已完整可用
- `Check`
  - 代码检查主干能力已完整可用
- `Build`
  - 构建主干能力已完整可用，辅助配置类工具也已真实校验
- `Deploy`
  - 主干控制面已可用，当前主要受模板/runtime 老旧与 `v4` 样本不足影响
- `Artifact`
  - 已发布主干路由已覆盖，当前主要问题是北京四有未发布路由
- `TestPlan`
  - 已发布读面可用，但多个 detail/run 路由在北京四仍未发布

## 部署方式怎么选

### 个人使用

选 `stdio`：

- 本地最简单
- 直接读取启动环境变量里的 `AK/SK/region`

### 团队共享

选 `http + session`：

- 服务端只部署一份
- 每个用户在自己的 session 中配置自己的 `AK/SK`
- 不需要共用一套业务账号

## 北京四标准地址参考

标准情况下通常不需要手填，下面主要用于排障：

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`

## 相关根文档

- `README.md`
- `docs/quickstart.md`
- `docs/client-examples.md`
- `docs/faq.md`
- `docs/product-overview.md`
- `docs/service-profile.md`
- `docs/tool-examples.md`
- `docs/wiki/Team-Deployment.md`
