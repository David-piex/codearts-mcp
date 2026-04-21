# 当前实现状态（tracked file name 保留 `2026-04-17`）

这页回答的是：当前仓库已经实现到哪里、哪些模块已经完成真实闭环、共享 HTTP 写链路是否已经真正打通。

说明：

- 这个文件名保留了历史日期，是为了保持统计脚本和外部引用稳定
- 文件内部内容会随当前仓库状态持续刷新

## 模块完成度快照

<!-- GENERATED:implementation-status-table:start -->
| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 8 | 6 | 2 | Validated | Project and work-item read/write loops now have real AK/SK validation on a writable sampled project. |
| Repo | 24 | 17 | 7 | Validated | Full module-level live loop completed. |
| Pipeline | 16 | 11 | 5 | Validated | Full module-level live loop completed. |
| Check | 8 | 5 | 3 | Validated | Full tool-level live loop completed. |
| TestPlan | 7 | 6 | 1 | Partial | Two scanned projects now return real plan samples; 4 routes are re-confirmed as unpublished in Beijing 4. |
| Deploy | 59 | 44 | 15 | Partial | The detailed Deploy page is the source of truth for the expanded v4 surface. `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, `deploy_stop_app`, and `deploy_rollback_app` now all have real AK/SK validation on at least one healthy path. The remaining practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`). |
| Build | 22 | 14 | 8 | Validated | All 22 tools are now AK/SK Full on the current surface, including the 3 helper/configuration tools through real dry-run previews on the live job config. |
| Artifact | 12 | 11 | 1 | Partial | Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4. |
<!-- GENERATED:implementation-status-table:end -->

## 总体数字

<!-- GENERATED:implementation-status-totals:start -->
- Product modules implemented: `8`
- Product tools implemented: `156`
- Auth/session tools implemented: `2`
- Total MCP tools exposed: `158`
<!-- GENERATED:implementation-status-totals:end -->

## 当前项目状态的简明结论

已完成模块级 live 闭环：

- Req
- Repo
- Pipeline
- Check
- Build

仍处于 `Partial` 的模块，主要不是“没实现”，而是受以下现实边界影响：

- 当前租户样本不足
- 北京四存在未发布路由
- Deploy 的历史模板 runtime 仍偏旧

## 当前共享 HTTP 侧也已经走到哪里

共享 `http` 模式不再只是“能列工具”，而是已经完成：

- 持久化鉴权
- cookie / `auth_token` 会话恢复
- 高频读路径缓存
- Req / Pipeline / Deploy 写路径联调
- live smoke 与回归测试覆盖

最近一轮部署后真实联调已确认：

- `tools/list` 返回 `158` 个工具
- `auth_configure_session` 可稳定建立用户会话
- `req_create_work_item` 可真实写入
- `pipeline_run_pipeline` 可真实触发
- `deploy_start_app` 已可到达真实上游 Deploy 写链路

## 仍未达到 `AK/SK Full` 的部分

| Module | Current state | Remaining items |
| --- | --- | --- |
| Artifact | `5 Full / 7 Unpublished` | `artifact_delete_file`, `artifact_list_build_archives`, `artifact_list_files`, `artifact_get_file`, `artifact_get_download_url`, `artifact_search_artifacts`, `artifact_show_audit` |
| TestPlan | `1 Full / 2 Reachable / 4 Unpublished` | Reachable: `testplan_list_issues`, `testplan_list_cases`; Unpublished: `testplan_get_plan`, `testplan_list_runs`, `testplan_get_case`, `testplan_run_cases` |
| Deploy | `Partial` | `deploy_import_hosts_to_environment` remains `AK/SK Reachable`; practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`); explicit skipped route: `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts` |

## 当前最关键的工程性结论

- `Deploy`
  - 当前 `Partial` 的主要原因已经不是控制面没写完，而是健康模板与真实样本边界
- `Artifact`
  - 当前 `Partial` 的主要原因已经不是本地 MCP 没实现，而是北京四确实存在未发布路由
- `Build`
  - 当前暴露出的 `22` 个工具已经达到完整 `AK/SK` 验证
- `Req`
  - 读写链路都已完成真实验证
- shared HTTP
  - 当前已经可以作为团队共享入口持续使用，不再只是实验性入口

## 推荐配套页面

- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Build-Live-Validated.md`
- `docs/wiki/Artifact-Live-Validated.md`
- `docs/wiki/TestPlan-Live-Validated.md`
