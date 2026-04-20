# AK/SK 验证台账（2026-04-17）

这页按工具粒度记录当前真实 `AK/SK` 验证状态，是判断“哪些功能已经真实跑通、哪些仍受租户或区域限制”的底账。

## 状态说明

- `AK/SK Full`
  - 已用真实 `AK/SK`、真实华为云端点和成功业务响应验证
- `AK/SK Reachable`
  - 已确认打到真实端点，但被租户数据、权限、配额或执行记录缺失阻塞
- `Code/Test Only`
  - 仓库中已实现，并有本地构建/测试覆盖，但尚未完成真实 `AK/SK` 端到端确认
- `Region Unpublished`
  - 仓库中已实现，但当前区域真实返回 `APIGW.0101`

## Req

全部 `8` 个工具均为 `AK/SK Full`。

- `req_list_projects`
- `req_get_project`
- `req_list_iterations`
- `req_list_project_members`
- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`

## Repo

全部 `24` 个工具均为 `AK/SK Full`。

- `repo_list_repositories`
- `repo_get_repository`
- `repo_list_branches`
- `repo_get_branch`
- `repo_list_commits`
- `repo_get_commit`
- `repo_get_file`
- `repo_list_merge_requests`
- `repo_get_merge_request`
- `repo_create_merge_request`
- `repo_review_merge_request`
- `repo_merge_merge_request`
- `repo_close_merge_request`
- `repo_list_merge_request_changes`
- `repo_create_merge_request_discussion`
- `repo_list_merge_request_discussions`
- `repo_list_protected_branches`
- `repo_list_repository_labels`
- `repo_create_tag`
- `repo_delete_tag`
- `repo_list_tags`
- `repo_get_tag`
- `repo_compare_refs`
- `repo_list_events`

## Pipeline

全部 `16` 个工具均为 `AK/SK Full`。

- `pipeline_list_pipelines`
- `pipeline_list_artifacts`
- `pipeline_get_pipeline`
- `pipeline_list_runs`
- `pipeline_get_run`
- `pipeline_get_run_detail`
- `pipeline_get_run_parameters`
- `pipeline_get_run_log`
- `pipeline_get_manual_review_context`
- `pipeline_get_step_outputs`
- `pipeline_reject_run`
- `pipeline_retry_run`
- `pipeline_approve_run`
- `pipeline_stop_run`
- `pipeline_run_pipeline`
- `pipeline_list_templates`

## Check

全部 `8` 个工具均为 `AK/SK Full`。

- `check_list_tasks`
- `check_get_task`
- `check_create_task`
- `check_run_task`
- `check_stop_task`
- `check_list_task_issues`
- `check_get_metrics`
- `check_list_rulesets`

## Deploy

`AK/SK Full`

- `deploy_list_apps`
- `deploy_list_app_operations_log`
- `deploy_list_environments`
- `deploy_list_tasks`
- `deploy_get_app`
- `deploy_get_task`
- `deploy_get_status`
- `deploy_list_histories`

`AK/SK Reachable`

- `deploy_get_app_log`
- `deploy_get_execution_params`
- `deploy_get_history_detail`
- `deploy_start_app`
- `deploy_stop_app`
- `deploy_rollback_app`

## Build

`AK/SK Full`

- `build_list_jobs`
- `build_get_job`
- `build_list_records`
- `build_get_error_log`
- `build_get_history_details`
- `build_get_full_stages`
- `build_get_info_record`
- `build_get_real_time_log`
- `build_list_build_parameters`
- `build_list_project_records`
- `build_get_project_record_statistics`
- `build_run_job`
- `build_get_record`
- `build_get_record_script`
- `build_get_record_flow_graph`
- `build_stop_job`

## Artifact

`AK/SK Full`

- `artifact_get_file_tree`
- `artifact_get_repository`
- `artifact_list_repositories`
- `artifact_list_versions`
- `artifact_list_latest_version_files`

`Region Unpublished`

- `artifact_delete_file`
- `artifact_list_build_archives`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_search_artifacts`
- `artifact_show_audit`

## TestPlan

`AK/SK Full`

- `testplan_list_plans`

`AK/SK Reachable`

- `testplan_list_cases`
- `testplan_list_issues`

`Region Unpublished`

- `testplan_get_plan`
- `testplan_get_case`
- `testplan_list_runs`
- `testplan_run_cases`

## 总结

- `AK/SK Full`
  - 当前证据最强，表示已经完成真实闭环
- `AK/SK Reachable`
  - 已确认真实端点可达，但业务闭环仍被现实条件阻塞
- `Code/Test Only`
  - 代码层面已完成，但仍缺真实租户证据
- `Region Unpublished`
  - 本地实现已就绪，但被华为云区域发布状态阻塞
