# AK/SK Verification Ledger (2026-04-17)

This page tracks the current per-tool verification status.

## Status Legend

- `AK/SK Full`
  - Verified with real `AK/SK`, real Huawei Cloud endpoint, and a successful real business response.
- `AK/SK Reachable`
  - Verified with real `AK/SK` against the real endpoint, but blocked by tenant data, permissions, quota, or missing execution records.
- `Code/Test Only`
  - Implemented in the repo and covered by local build/tests, but not yet confirmed end-to-end with real `AK/SK`.
- `Region Unpublished`
  - Implemented in the repo, but the real region currently returns `APIGW.0101`.

## Req

All `8` tools are `AK/SK Full`.

- `req_list_projects`
- `req_get_project`
- `req_list_iterations`
- `req_list_project_members`
- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`

## Repo

All `24` tools are `AK/SK Full`.

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

All `16` tools are `AK/SK Full`.

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

All `8` tools are `AK/SK Full`.

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

## Summary

- `AK/SK Full`: strongest current evidence
- `AK/SK Reachable`: real endpoint confirmed, but business closure still blocked
- `Code/Test Only`: repo-complete but not yet truly closed with tenant evidence
- `Region Unpublished`: implemented locally, blocked by Huawei Cloud regional publication state
