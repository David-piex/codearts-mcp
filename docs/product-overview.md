# 产品总览

当前仓库只保留这 `8` 个 CodeArts 核心模块：

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## 项目定位

`codearts-mcp` 是一层统一的 CodeArts MCP Server 封装，目标是把多产品、多接口风格的 CodeArts 能力，收敛成：

- 统一鉴权方式
- 统一传输方式
- 统一工具命名
- 统一返回结构

## 模块边界

- `Req`
  - 项目、迭代、成员、工作项读写
- `Repo`
  - 仓库、分支、提交、文件、标签、合并请求
- `Pipeline`
  - 流水线、运行记录、日志、审批、重试、停止、触发
- `Check`
  - 代码检查任务、规则集、问题、指标与执行
- `TestPlan`
  - 测试计划、用例、执行记录、相关问题
- `Deploy`
  - 应用、任务、部署记录、日志、启动、停止、回滚
- `Build`
  - 构建任务、记录、阶段、日志、参数与执行
- `Artifact`
  - 制品仓、版本、文件、下载、审计、删除

## 当前推荐阅读方式

- 如果你第一次接触这个项目：
  - 先看 `README.md`
  - 再看 `docs/wiki/Home.md`
- 如果你关心“现在到底哪些能用”：
  - 看 `docs/wiki/Module-Live-Readiness.md`
  - 看 `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- 如果你关心某个模块的真实验证细节：
  - 看 `docs/wiki/*-Live-Validated.md`
