# codearts-mcp Wiki

`codearts-mcp` is an MCP server for Huawei Cloud CodeArts in the China region.

The current repository is intentionally narrowed to `8` active product modules and supports:

- `stdio` for local personal usage
- `http + session` for shared team deployment

## Start Here

- [Getting Started](./Getting-Started.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)
- [Current Implementation Status (2026-04-17)](./Current-Implementation-Status-2026-04-17.md)
- [AK/SK Verification Ledger (2026-04-17)](./AKSK-Verification-Ledger-2026-04-17.md)
- [Req Live Validated](./Req-Live-Validated.md)
- [Check Live Validated](./Check-Live-Validated.md)
- [Build Live Validated](./Build-Live-Validated.md)
- [Deploy Live Validated](./Deploy-Live-Validated.md)
- [Artifact Live Validated](./Artifact-Live-Validated.md)
- [TestPlan Live Validated](./TestPlan-Live-Validated.md)
- [Troubleshooting](./Troubleshooting.md)

## Current State

- `Req / Repo / Pipeline / Check / Build`
  - Fully live-validated in `cn-north-4`
- `TestPlan / Deploy / Artifact`
  - Implemented, tested, and partially live-validated with real `AK/SK`

## What Works Now

- `Req`
  - 可以直接用，读写都已经做过真实 `AK/SK` 闭环验证
- `Repo`
  - 可以直接用，模块级闭环完成
- `Pipeline`
  - 可以直接用，模块级闭环完成
- `Check`
  - 可以直接用，工具级闭环完成
- `Build`
  - 主要能力已经可直接用
  - 当前是 `19` 个工具真实闭环，`3` 个辅助配置工具是 `Code/Test Only`
- `Deploy`
  - 主体 MCP 能力已经能用
  - 当前重点不是“没实现”，而是：
    - 少数真实写路径还依赖健康模板/runtime
    - `rollback` 还缺真实可回滚样本
- `Artifact`
  - 已发布路由对应的 MCP 工具能用
  - 当前重点不是“没实现”，而是北京四还有 `7` 条路由未发布
- `TestPlan`
  - 已发布读路由能用
  - 当前主要受北京四未发布路由限制

## Latest MCP Output Shape

- `Deploy`
  - record/task/status/log/detail outputs have been normalized with clearer typed ids and preserved request context such as `taskId`, `recordId`, and `stepId`
- `Artifact`
  - repository/version/archive/file outputs now expose clearer typed ids such as `repositoryId`, `versionId`, `archiveId`, and `fileId`
- Source-of-truth detail pages:
  - [Deploy Live Validated](./Deploy-Live-Validated.md)
  - [Artifact Live Validated](./Artifact-Live-Validated.md)

In this repository, `Partial` usually does not mean "not implemented". It usually means one of these:

- the current tenant does not have enough business data
- the real route exists but current permissions or execution records are missing
- the route is not published in Beijing 4
- the write path is implemented, but there is no safe real execution sample yet

## Standard Beijing 4 Endpoints Reference

For standard regions, users usually do not need to fill these manually. The server resolves them from `region`. Keep this list only as a debugging or custom-route reference.

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`

## Important Notes

- `artifact_*` tools commonly need both `tenant_id` and `project_id`
- `testplan_*` tools depend on TestPlan being enabled on the target project
- shared deployment does not mean shared business credentials
- `Deploy` partial status is now mostly about runtime/template limits or missing rollback samples, not missing basic resource paths
- `Artifact` partial status is now mostly about Beijing 4 unpublished routes, not missing local MCP implementations

## Root Docs

- `README.md`
- `docs/quickstart.md`
- `docs/client-examples.md`
- `docs/live-readiness-checklist.md`
- `docs/faq.md`
