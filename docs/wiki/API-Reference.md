# CodeArts MCP API Reference

这份文档是全局 API 入口，覆盖当前 MCP Server 暴露的 8 个 CodeArts 服务。Req 的接口面最深，单独维护在 [Req-API-Reference](./Req-API-Reference.md)；本页给出所有服务的工具清单、基础 URL、读写规模和使用边界。

当前规模：

| Module | Tools | Read | Write | Base URL env |
| --- | ---: | ---: | ---: | --- |
| Req | 174 | 110 | 64 | `HUAWEICLOUD_REQ_BASE_URL` |
| Repo | 25 | 17 | 8 | `HUAWEICLOUD_REPO_BASE_URL` |
| Pipeline | 77 | 42 | 35 | `HUAWEICLOUD_PIPELINE_BASE_URL` |
| Check | 8 | 5 | 3 | `HUAWEICLOUD_CHECK_BASE_URL` |
| TestPlan | 7 | 6 | 1 | `HUAWEICLOUD_TESTPLAN_BASE_URL` |
| Deploy | 59 | 44 | 15 | `HUAWEICLOUD_DEPLOY_BASE_URL` |
| Build | 22 | 14 | 8 | `HUAWEICLOUD_BUILD_BASE_URL` |
| Artifact | 12 | 11 | 1 | `HUAWEICLOUD_ARTIFACT_BASE_URL` |

Product tools total: `384`. Shared HTTP mode adds `auth_configure_session` and `auth_revoke_session`, so the shared HTTP total is `386`.

## Common Runtime

Minimum live environment:

```env
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_BASE_URL=https://codearts.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REPO_BASE_URL=https://codehub-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_PIPELINE_BASE_URL=https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_CHECK_BASE_URL=https://codecheck-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_TESTPLAN_BASE_URL=https://cloudtest-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_DEPLOY_BASE_URL=https://codearts-deploy.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_BUILD_BASE_URL=https://cloudbuild-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_ARTIFACT_BASE_URL=https://artifact.cn-north-4.myhuaweicloud.cn
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

Safety rules:

- Read tools can usually run directly once AK/SK and region are configured.
- Write tools are rate-limited by the server and often support `dry_run`.
- Live smoke write paths should use explicit sample IDs and module-specific gate variables.
- Do not store AK/SK in docs, commits, or shared shell profiles.

## Req

Req covers demand/project collaboration. It includes Scrum project management, members, modules, iterations, plans, work items, comments, attachments, status/config reads, board/cache reads, requirement pool reads, and IPD reads/writes.

Key entry tools:

| Area | Tools |
| --- | --- |
| Project | `req_list_projects`, `req_get_project`, `req_create_project`, `req_update_project`, `req_delete_project` |
| Iteration | `req_list_iterations`, `req_get_iteration`, `req_create_iteration`, `req_update_iteration`, `req_delete_iteration` |
| Work item | `req_list_work_items`, `req_get_work_item`, `req_create_work_item`, `req_update_work_item`, `req_delete_work_item` |
| Requirement pool | `req_list_programs`, `req_get_ir`, `req_list_rrs`, `req_list_rr_statuses` |
| IPD | `req_list_ipd_projects`, `req_get_ipd_issue`, `req_create_ipd_issue`, `req_batch_update_ipd_issues`, `req_transfer_ipd_work_item_flow` |

Full Req API reference: [Req-API-Reference](./Req-API-Reference.md).

Recent live status:

- Default Req live smoke: `17 passed`.
- Write-gate Req live smoke: `17 passed`.
- Actual real write closure: project create/update/delete.
- Deeper Scrum/IPD write closures still need disposable sample IDs.

## Repo

Repo covers CodeHub repository collaboration: repositories, branches, commits, files, tags, merge requests, MR comments and reviews.

| Tool | Purpose |
| --- | --- |
| `repo_list_repositories` | List repositories |
| `repo_get_repository` | Get repository detail |
| `repo_create_repository` | Create repository |
| `repo_list_branches` / `repo_get_branch` | Read branches |
| `repo_list_commits` / `repo_get_commit` | Read commits |
| `repo_get_file` | Read file content |
| `repo_list_tags` / `repo_get_tag` | Read tags |
| `repo_create_tag` / `repo_delete_tag` | Manage tags |
| `repo_list_merge_requests` / `repo_get_merge_request` | Read merge requests |
| `repo_create_merge_request` | Create merge request |
| `repo_close_merge_request` | Close merge request |
| `repo_merge_merge_request` | Merge merge request |
| `repo_review_merge_request` | Review merge request |
| `repo_create_merge_request_discussion` | Add MR discussion |
| `repo_list_merge_request_discussions` | List MR discussions |
| `repo_list_merge_request_changes` | List MR changes |
| `repo_compare_refs` | Compare branches/tags/commits |
| `repo_list_events` | List repository events |
| `repo_list_protected_branches` | List protected branches |
| `repo_list_repository_labels` | List repository labels |

Current live status: Repo is marked `Validated`; repository creation has real AK/SK coverage.

## Pipeline

Pipeline covers pipeline read/execution and governance: runs, logs, artifacts, manual review, groups, tags, variable groups, rules, strategies, extensions, plugins and templates.

| Area | Tools |
| --- | --- |
| Pipeline read | `pipeline_list_pipelines`, `pipeline_get_pipeline`, `pipeline_list_runs`, `pipeline_get_run`, `pipeline_get_run_detail`, `pipeline_get_run_log`, `pipeline_get_run_parameters` |
| Pipeline execution | `pipeline_run_pipeline`, `pipeline_retry_run`, `pipeline_stop_run`, `pipeline_approve_run`, `pipeline_reject_run`, `pipeline_get_manual_review_context` |
| Artifacts and steps | `pipeline_list_artifacts`, `pipeline_get_step_outputs` |
| Groups | `pipeline_list_groups`, `pipeline_create_group`, `pipeline_update_group`, `pipeline_delete_group`, `pipeline_move_pipelines_to_group` |
| Tags | `pipeline_list_tags`, `pipeline_create_tag`, `pipeline_update_tag`, `pipeline_delete_tag`, `pipeline_set_tags_for_pipelines` |
| Variable groups | `pipeline_list_variable_groups`, `pipeline_get_variable_group`, `pipeline_create_variable_group`, `pipeline_update_variable_group`, `pipeline_delete_variable_group`, `pipeline_bind_variable_groups_to_pipeline`, `pipeline_list_pipeline_variable_groups` |
| Rules | `pipeline_list_rules`, `pipeline_get_rule`, `pipeline_create_rule`, `pipeline_update_rule`, `pipeline_delete_rule`, `pipeline_list_rule_types`, `pipeline_get_rule_related_info` |
| Strategies | `pipeline_list_strategies`, `pipeline_get_strategy`, `pipeline_create_strategy`, `pipeline_update_strategy`, `pipeline_delete_strategy`, `pipeline_switch_strategy`, `pipeline_list_strategy_children`, `pipeline_get_strategy_related_info` |
| Project strategies | `pipeline_list_project_strategies`, `pipeline_get_project_strategy`, `pipeline_get_project_strategy_detail`, `pipeline_create_project_strategy`, `pipeline_update_project_strategy`, `pipeline_delete_project_strategy`, `pipeline_switch_project_strategy`, `pipeline_inherit_project_strategy`, `pipeline_get_project_strategy_related_info` |
| Extensions | `pipeline_list_extension_endpoints`, `pipeline_get_extension_endpoint`, `pipeline_create_extension_endpoint`, `pipeline_update_extension_endpoint`, `pipeline_delete_extension_endpoint`, `pipeline_list_extension_modules`, `pipeline_get_extension_module` |
| Plugins/templates | `pipeline_list_plugins`, `pipeline_list_base_plugins`, `pipeline_list_base_plugins_paged`, `pipeline_list_stage_plugins`, `pipeline_list_plugin_versions`, `pipeline_get_plugin_version`, `pipeline_get_plugin_inputs`, `pipeline_get_plugin_outputs`, `pipeline_list_available_publishers`, `pipeline_list_publishers`, `pipeline_list_templates` |
| Pipeline state | `pipeline_enable_pipeline`, `pipeline_disable_pipeline`, `pipeline_delete_pipeline` |

Current live status: Partial. Core execution paths have live coverage, while many governance tools still need broader tenant samples.

## Check

Check covers CodeArts Check tasks, rulesets, issues and metrics.

| Tool | Purpose |
| --- | --- |
| `check_list_tasks` | List check tasks |
| `check_get_task` | Get task detail |
| `check_create_task` | Create check task |
| `check_run_task` | Run check task |
| `check_stop_task` | Stop check task |
| `check_list_rulesets` | List rulesets |
| `check_list_task_issues` | List task issues |
| `check_get_metrics` | Get task metrics |

Current live status: Validated.

## TestPlan

TestPlan covers test plans, cases, issues, run records and case execution.

| Tool | Purpose |
| --- | --- |
| `testplan_list_plans` | List test plans |
| `testplan_get_plan` | Get test plan detail |
| `testplan_list_cases` | List test cases |
| `testplan_get_case` | Get test case detail |
| `testplan_list_issues` | List related issues |
| `testplan_list_runs` | List run records |
| `testplan_run_cases` | Run test cases |

Current live status: Partial. Some Beijing 4 upstream paths are not published for all tenants.

## Deploy

Deploy covers application deployment, tasks, histories, host groups, environments, variables and v4 deployment resources.

| Area | Tools |
| --- | --- |
| Applications | `deploy_list_apps`, `deploy_get_app`, `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_stop_app`, `deploy_rollback_app`, `deploy_list_app_operations_log`, `deploy_list_app_host_groups` |
| Tasks | `deploy_list_tasks`, `deploy_get_task`, `deploy_create_task_by_template`, `deploy_get_template_detail`, `deploy_get_execution_params`, `deploy_get_deploy_source_detail`, `deploy_get_runtime_variables` |
| Histories | `deploy_list_histories`, `deploy_get_history_detail`, `deploy_get_last_record_detail`, `deploy_get_status`, `deploy_get_app_log` |
| Host groups | `deploy_list_host_groups`, `deploy_get_host_group`, `deploy_list_host_group_hosts`, `deploy_list_host_group_environments` |
| Environments | `deploy_list_environments`, `deploy_create_environment`, `deploy_list_environment_hosts`, `deploy_add_v4_environment_hosts`, `deploy_delete_v4_environment_hosts`, `deploy_import_hosts_to_environment` |
| Variables | `deploy_list_variables`, `deploy_query_variables`, `deploy_list_variable_history` |
| v4 applications/environments | `deploy_list_v4_applications`, `deploy_list_v4_environments`, `deploy_get_v4_environment`, `deploy_list_v4_environment_applications`, `deploy_get_v4_environment_resource_detail`, `deploy_list_v4_environment_hosts` |
| v4 clusters | `deploy_list_v4_clusters`, `deploy_get_v4_cluster`, `deploy_get_v4_cluster_count`, `deploy_list_v4_cluster_hosts`, `deploy_get_v4_cluster_host`, `deploy_delete_v4_cluster_hosts` |
| v4 deploy records | `deploy_list_v4_deploy_records`, `deploy_get_v4_deploy_record`, `deploy_get_v4_deploy_record_step_detail`, `deploy_get_v4_deploy_record_step_logs`, `deploy_cancel_v4_deploy_record`, `deploy_retry_v4_deploy_record`, `deploy_rerun_v4_deploy_record`, `deploy_rollback_v4_deploy_record` |
| v4 manual checks | `deploy_pass_v4_manual_check`, `deploy_refuse_v4_manual_check` |
| v4 misc | `deploy_list_v4_orchestrations`, `deploy_list_deployment_units`, `deploy_list_system_configs` |

Current live status: Partial. Read paths and some controlled writes have coverage; start/stop/rollback execute-class paths need explicit sample variables.

## Build

Build covers build jobs, records, logs, parameters and helper tools for job-step/release-upload setup.

| Tool | Purpose |
| --- | --- |
| `build_list_jobs` | List build jobs |
| `build_get_job` | Get build job detail |
| `build_run_job` | Run build job |
| `build_stop_job` | Stop build job |
| `build_list_records` | List build records |
| `build_get_record` | Get build record detail |
| `build_get_history_details` | Get history details |
| `build_get_info_record` | Get info record |
| `build_get_full_stages` | Get full stages |
| `build_get_record_flow_graph` | Get record flow graph |
| `build_get_record_script` | Get record script |
| `build_get_real_time_log` | Get real-time log |
| `build_get_error_log` | Get error log |
| `build_list_build_parameters` | List build parameters |
| `build_list_project_records` | List project records |
| `build_get_project_record_statistics` | Get project record statistics |
| `build_append_job_step` | Append job step |
| `build_update_job_step` | Update job step |
| `build_append_release_upload_step` | Append release upload step |
| `build_configure_release_upload_step` | Configure release upload step |
| `build_prepare_node_runtime_bundle` | Prepare Node runtime bundle helper |
| `build_prepare_deployable_node_app` | Prepare deployable Node app helper |

Current live status: Validated.

## Artifact

Artifact covers repositories, versions, files, downloads, build archives, search and audit.

| Tool | Purpose |
| --- | --- |
| `artifact_list_repositories` | List artifact repositories |
| `artifact_get_repository` | Get repository detail |
| `artifact_list_versions` | List versions |
| `artifact_list_files` | List files |
| `artifact_list_latest_version_files` | List latest version files |
| `artifact_get_file_tree` | Get file tree |
| `artifact_get_file` | Get file detail |
| `artifact_get_download_url` | Get download URL |
| `artifact_list_build_archives` | List build archives |
| `artifact_search_artifacts` | Search artifacts |
| `artifact_show_audit` | Show audit detail |
| `artifact_delete_file` | Delete file |

Current live status: Partial. Some artifact APIs are region/tenant gated in Beijing 4.

## Full Tool Inventory

This inventory is useful when checking MCP client exposure or writing allow/deny policies.

### Repo

`repo_close_merge_request`, `repo_compare_refs`, `repo_create_merge_request`, `repo_create_merge_request_discussion`, `repo_create_repository`, `repo_create_tag`, `repo_delete_tag`, `repo_get_branch`, `repo_get_commit`, `repo_get_file`, `repo_get_merge_request`, `repo_get_repository`, `repo_get_tag`, `repo_list_branches`, `repo_list_commits`, `repo_list_events`, `repo_list_merge_request_changes`, `repo_list_merge_request_discussions`, `repo_list_merge_requests`, `repo_list_protected_branches`, `repo_list_repositories`, `repo_list_repository_labels`, `repo_list_tags`, `repo_merge_merge_request`, `repo_review_merge_request`

### Pipeline

`pipeline_approve_run`, `pipeline_bind_variable_groups_to_pipeline`, `pipeline_create_extension_endpoint`, `pipeline_create_group`, `pipeline_create_project_strategy`, `pipeline_create_rule`, `pipeline_create_strategy`, `pipeline_create_tag`, `pipeline_create_variable_group`, `pipeline_delete_extension_endpoint`, `pipeline_delete_group`, `pipeline_delete_pipeline`, `pipeline_delete_project_strategy`, `pipeline_delete_rule`, `pipeline_delete_strategy`, `pipeline_delete_tag`, `pipeline_delete_variable_group`, `pipeline_disable_pipeline`, `pipeline_enable_pipeline`, `pipeline_get_extension_endpoint`, `pipeline_get_extension_module`, `pipeline_get_manual_review_context`, `pipeline_get_pipeline`, `pipeline_get_plugin_inputs`, `pipeline_get_plugin_outputs`, `pipeline_get_plugin_version`, `pipeline_get_project_strategy`, `pipeline_get_project_strategy_detail`, `pipeline_get_project_strategy_related_info`, `pipeline_get_rule`, `pipeline_get_rule_related_info`, `pipeline_get_run`, `pipeline_get_run_detail`, `pipeline_get_run_log`, `pipeline_get_run_parameters`, `pipeline_get_step_outputs`, `pipeline_get_strategy`, `pipeline_get_strategy_related_info`, `pipeline_get_variable_group`, `pipeline_inherit_project_strategy`, `pipeline_list_artifacts`, `pipeline_list_available_publishers`, `pipeline_list_base_plugins`, `pipeline_list_base_plugins_paged`, `pipeline_list_extension_endpoints`, `pipeline_list_extension_modules`, `pipeline_list_groups`, `pipeline_list_pipeline_variable_groups`, `pipeline_list_pipelines`, `pipeline_list_plugin_versions`, `pipeline_list_plugins`, `pipeline_list_project_strategies`, `pipeline_list_publishers`, `pipeline_list_rule_types`, `pipeline_list_rules`, `pipeline_list_runs`, `pipeline_list_stage_plugins`, `pipeline_list_strategies`, `pipeline_list_strategy_children`, `pipeline_list_tags`, `pipeline_list_templates`, `pipeline_list_variable_groups`, `pipeline_move_pipelines_to_group`, `pipeline_reject_run`, `pipeline_retry_run`, `pipeline_run_pipeline`, `pipeline_set_tags_for_pipelines`, `pipeline_stop_run`, `pipeline_switch_project_strategy`, `pipeline_switch_strategy`, `pipeline_update_extension_endpoint`, `pipeline_update_group`, `pipeline_update_project_strategy`, `pipeline_update_rule`, `pipeline_update_strategy`, `pipeline_update_tag`, `pipeline_update_variable_group`

### Check

`check_create_task`, `check_get_metrics`, `check_get_task`, `check_list_rulesets`, `check_list_task_issues`, `check_list_tasks`, `check_run_task`, `check_stop_task`

### TestPlan

`testplan_get_case`, `testplan_get_plan`, `testplan_list_cases`, `testplan_list_issues`, `testplan_list_plans`, `testplan_list_runs`, `testplan_run_cases`

### Deploy

`deploy_add_v4_environment_hosts`, `deploy_cancel_v4_deploy_record`, `deploy_create_application`, `deploy_create_environment`, `deploy_create_task_by_template`, `deploy_delete_v4_cluster_hosts`, `deploy_delete_v4_environment_hosts`, `deploy_get_app`, `deploy_get_app_log`, `deploy_get_deploy_source_detail`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_host_group`, `deploy_get_last_record_detail`, `deploy_get_runtime_variables`, `deploy_get_status`, `deploy_get_task`, `deploy_get_template_detail`, `deploy_get_v4_cluster`, `deploy_get_v4_cluster_count`, `deploy_get_v4_cluster_host`, `deploy_get_v4_deploy_record`, `deploy_get_v4_deploy_record_step_detail`, `deploy_get_v4_deploy_record_step_logs`, `deploy_get_v4_environment`, `deploy_get_v4_environment_resource_detail`, `deploy_import_hosts_to_environment`, `deploy_list_app_host_groups`, `deploy_list_app_operations_log`, `deploy_list_apps`, `deploy_list_deployment_units`, `deploy_list_environment_hosts`, `deploy_list_environments`, `deploy_list_histories`, `deploy_list_host_group_environments`, `deploy_list_host_group_hosts`, `deploy_list_host_groups`, `deploy_list_system_configs`, `deploy_list_tasks`, `deploy_list_v4_applications`, `deploy_list_v4_cluster_hosts`, `deploy_list_v4_clusters`, `deploy_list_v4_deploy_records`, `deploy_list_v4_environment_applications`, `deploy_list_v4_environment_hosts`, `deploy_list_v4_environments`, `deploy_list_v4_orchestrations`, `deploy_list_variable_history`, `deploy_list_variables`, `deploy_modify_application`, `deploy_pass_v4_manual_check`, `deploy_query_variables`, `deploy_refuse_v4_manual_check`, `deploy_rerun_v4_deploy_record`, `deploy_retry_v4_deploy_record`, `deploy_rollback_app`, `deploy_rollback_v4_deploy_record`, `deploy_start_app`, `deploy_stop_app`

### Build

`build_append_job_step`, `build_append_release_upload_step`, `build_configure_release_upload_step`, `build_get_error_log`, `build_get_full_stages`, `build_get_history_details`, `build_get_info_record`, `build_get_job`, `build_get_project_record_statistics`, `build_get_real_time_log`, `build_get_record`, `build_get_record_flow_graph`, `build_get_record_script`, `build_list_build_parameters`, `build_list_jobs`, `build_list_project_records`, `build_list_records`, `build_prepare_deployable_node_app`, `build_prepare_node_runtime_bundle`, `build_run_job`, `build_stop_job`, `build_update_job_step`

### Artifact

`artifact_delete_file`, `artifact_get_download_url`, `artifact_get_file`, `artifact_get_file_tree`, `artifact_get_repository`, `artifact_list_build_archives`, `artifact_list_files`, `artifact_list_latest_version_files`, `artifact_list_repositories`, `artifact_list_versions`, `artifact_search_artifacts`, `artifact_show_audit`

Req has 174 tools; keep the full Req inventory in [Req-API-Reference](./Req-API-Reference.md) to avoid making this page unwieldy.

## Related Docs

- [Req-API-Reference](./Req-API-Reference.md)
- [Module-Functions-Overview](./Module-Functions-Overview.md)
- [Capability-Matrix](./Capability-Matrix.md)
- [Module-Live-Readiness](./Module-Live-Readiness.md)
- [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
