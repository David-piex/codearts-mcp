# 模块真实可用性

这页用来回答“如果今天直接接入，这些模块分别能不能用、应该先从哪个工具试”的问题。结论基于截至 `2026-04-19` 的北京四 `cn-north-4` 真实租户验证。

| Module | Recommended First Tool | `project_id` Type | Current Live State | Non-empty Prerequisite |
| --- | --- | --- | --- | --- |
| Req | `req_list_projects` | none | Validated | Existing CodeArts projects; one writable project for full work-item closure |
| Repo | `repo_list_repositories` | CodeArts project UUID | Validated | Existing repositories |
| Pipeline | `pipeline_list_pipelines` | CodeArts project UUID | Validated | Existing pipelines |
| Check | `check_list_tasks` / `check_list_rulesets` | CodeArts project UUID | Validated | Existing check tasks or rulesets |
| TestPlan | `testplan_list_plans` | CodeArts project UUID | Partial | TestPlan is now confirmed on 2 of 4 scanned projects; richer plan/case/run data is still needed for non-empty validation |
| Deploy | `deploy_list_apps` | CodeArts project UUID | Partial | Existing deploy apps/tasks/histories |
| Build | `build_list_jobs` | CodeArts project UUID | Validated | Existing build jobs/records |
| Artifact | `artifact_list_repositories` | CodeArts project UUID + account `tenant_id` | Partial | Existing artifact repositories/versions/files |

## 已有非空真实验证的模块

- Repo
- Pipeline
- Check
- Build
- Req

## 当前仍为 `Partial` 的模块

- Deploy
- TestPlan
- Artifact

## 关键细节结论

### Req

- `req_list_projects`、`req_get_project`、`req_list_iterations`、`req_list_project_members`
  - 都已经有真实租户验证
- `req_list_work_items` 和 `req_get_work_item`
  - 已确认在已发布的 `/issues` 路由族上真实可用
- `req_create_work_item` 和 `req_update_work_item`
  - 已在可写项目 `7bd39587c14048aebdadd0f9c22b1402` 上取得真实成功样本

### Artifact

- `artifact_get_file_tree`
- `artifact_get_repository`

这些路由当前真实可用。

- 最新 MCP 输出规范化：
  - repository outputs 现在也暴露 `repositoryId`
  - version outputs 现在也暴露 `versionId`
  - build archive outputs 现在也暴露 `archiveId`
  - file outputs 现在也暴露 `fileId`

- `artifact_delete_file`
- `artifact_list_build_archives`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_search_artifacts`
- `artifact_show_audit`

这些在北京四当前仍返回 `APIGW.0101`，应视为 `Region Unpublished`。

### TestPlan

- `testplan_list_plans`
  - 在两个扫描项目上能返回真实样本
- `testplan_list_issues` 和 `testplan_list_cases`
  - 路由真实可达，但当前已知计划上返回空结果
- `testplan_get_plan`、`testplan_list_runs`、`testplan_get_case`
  - 当前在北京四返回 `APIGW.0101`

### Build

- `build_list_jobs`、`build_get_job`、`build_list_records`
  - 都已有真实非空样本
- `build_run_job` 和 `build_stop_job`
  - 在当前租户都已有真实执行样本
- `build_get_info_record`、`build_get_record`、`build_get_record_script`、`build_get_history_details`、`build_get_real_time_log`、`build_get_error_log`、`build_list_project_records`、`build_get_project_record_statistics`、`build_get_record_flow_graph`
  - 都已取得真实成功样本
- `build_list_build_parameters`、`build_get_full_stages`、`build_get_record_flow_graph`
  - 当前真实可达，但在采样构建上可能返回空业务结果

### Deploy

- 当前健康 Node.js 模板路径已经对下列 record 绑定能力取得真实成功验证：
  - `deploy_start_app`
  - `deploy_get_execution_params`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_stop_app`
  - `deploy_rollback_app`
- 当前剩余的实际阻塞已经是模板 runtime 老旧，而不是基础 app/environment/host 资源缺失
