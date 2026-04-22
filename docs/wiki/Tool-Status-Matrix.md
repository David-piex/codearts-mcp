# 工具状态矩阵

这页按工具粒度汇总当前仓库的真实状态，依据包括当前代码实现、本地测试，以及截至 `2026-04-19` 的北京四 `cn-north-4` 真实 `AK/SK` 验证结果。

## 状态说明

- `AK/SK Full`
  - 已用真实 `AK/SK`、真实华为云端点和成功业务响应验证
- `AK/SK Reachable`
  - 已确认打到真实服务，但被租户数据、权限或执行记录缺失阻塞
- `Region Unpublished`
  - 本地已实现，但目标区域当前真实返回 `APIGW.0101`
- `Code/Test Only`
  - 已实现并做过本地测试，但尚未完成真实 `AK/SK` 确认

## 模块汇总

<!-- GENERATED:tool-status-module-summary:start -->
| Module | Tools | Real-Live Summary | Current Conclusion |
| --- | --- | --- | --- |
| Req | 8 | `8 Full` | Project and work-item read/write paths are fully live-validated. |
| Repo | 25 | `25 Full / 0 Reachable / 0 Unpublished / 0 Code` | `repo_create_repository` has joined the previously validated Repo surface, so the full 25-tool module is now AK/SK Full. |
| Pipeline | 77 | `16 Full / 0 Reachable / 0 Unpublished / 51 Code` | Core execution closure remains complete, but the new extension-endpoint/tag/group/variable-group/rule-management/tenant-strategy/project-strategy tools still need live AK/SK validation. |
| Check | 8 | `8 Full` | Tool-level closure is complete. |
| TestPlan | 7 | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` | Real plan samples now exist on two projects, but detail/run routes are still unpublished in Beijing 4. |
| Deploy | 59 | Expanded surface; see `docs/wiki/Deploy-Live-Validated.md` | The Deploy MCP surface now includes v4 application/environment/cluster/record/variable tools. The detailed live split is maintained in the dedicated Deploy page. |
| Build | 22 | `22 Full / 0 Reachable / 0 Unpublished / 0 Code` | The remote Build surface is now fully live-validated, including the 3 helper/configuration tools via real dry-run previews on the live job config. |
| Artifact | 12 | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` | Five tools are fully validated; seven routes are unpublished in Beijing 4. The current tenant now exposes a real published file sample at `/codearts-mcp/1.0.0/codearts-mcp.tgz`. |
<!-- GENERATED:tool-status-module-summary:end -->

## 最新输出形态说明

- `Deploy`
  - 与 record/detail 相关的工具，现在对 `recordId`、`taskId`、`stepId` 等 typed identifier 与请求上下文的保留更一致
- `Artifact`
  - repository/version/archive/file 现在都会在主 `id` 之外补充更稳定的 typed id 字段

## 已完整闭环的模块

- Req
- Repo
- Check
- Build

## 部分闭环模块

### Pipeline

- `AK/SK Full`
  - 原有 16 个执行链工具
- `Code`
  - `pipeline_delete_pipeline`
  - `pipeline_disable_pipeline`
  - `pipeline_enable_pipeline`
  - `pipeline_list_groups`
  - `pipeline_create_group`
  - `pipeline_update_group`
  - `pipeline_delete_group`
  - `pipeline_move_pipelines_to_group`
  - note:
    - 这一批工具已经完成单元回归与注册层回归
    - 真实 AK/SK live 写路径联调还未补完

### TestPlan

- `AK/SK Full`
  - `testplan_list_plans`
- `AK/SK Reachable`
  - `testplan_list_cases`
  - `testplan_list_issues`
- `Region Unpublished`
  - `testplan_get_plan`
  - `testplan_get_case`
  - `testplan_list_runs`
  - `testplan_run_cases`

### Deploy

- `AK/SK Full`
  - `deploy_create_application`
  - `deploy_modify_application`
  - `deploy_create_task_by_template`
  - `deploy_create_environment`
  - `deploy_list_apps`
  - `deploy_list_app_host_groups`
  - `deploy_list_host_groups`
  - `deploy_get_host_group`
  - `deploy_list_host_group_hosts`
  - `deploy_list_app_operations_log`
  - `deploy_list_environment_hosts`
  - `deploy_list_environments`
  - `deploy_list_tasks`
  - `deploy_get_app`
  - `deploy_get_task`
  - `deploy_get_status`
  - `deploy_list_histories`
  - `deploy_get_app_log`
  - `deploy_get_execution_params`
  - `deploy_get_history_detail`
  - `deploy_start_app`
  - `deploy_stop_app`
  - `deploy_rollback_app`
- `AK/SK Full (empty but successful business response)`
  - `deploy_list_host_group_environments`
- `AK/SK Reachable`
  - `deploy_import_hosts_to_environment`
  - note:
    - 当前剩余的实际阻塞主要是老旧 Node.js 模板 runtime：`Node v10.9.0` + `forever`
    - `v4` app / environment / deploy-record / orchestration discovery 家族工具已实现且路由可达，但在当前租户里仍受样本数据限制
    - `6` 个 `v4` record 写预览工具现在在 record detail 样本不足时会退化为本地 `dry_run` 预览，而不是直接硬失败
    - `2026-04-19` 最新模板管理 HAR 再次证明浏览器端当前主流仍在走经典 `v1/applications/list`，而不是明确的 `v4` 正样本发现链路
    - 当前明确跳过、且不在本轮闭环范围内的路由是 `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts`

### Artifact

- `AK/SK Full`
  - `artifact_get_file_tree`
  - `artifact_get_repository`
  - `artifact_list_repositories`
  - `artifact_list_versions`
  - `artifact_list_latest_version_files`
- `Region Unpublished`
  - `artifact_delete_file`
  - `artifact_list_build_archives`
  - `artifact_list_files`
  - `artifact_get_file`
  - `artifact_get_download_url`
  - `artifact_search_artifacts`
  - `artifact_show_audit`

## MCP 输出补充说明

- 即便是当前未发布的 Artifact 路由，本地 MCP 层也已经写完，并统一补齐了：
  - `repositoryId`
  - `versionId`
  - `archiveId`
  - `fileId`

## 相关文档

- `docs/wiki/AKSK-Verification-Ledger-2026-04-17.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
