# CodeArts MCP API 参考

这份文档是全局 API 入口，覆盖当前 MCP Server 暴露的 8 个 CodeArts 服务。Req 的接口面最深，单独维护在 [Req-API-Reference](./Req-API-Reference.md)；每个 MCP 工具的完整参数表和 JSON Schema 请查看 [Function-API-Reference](./Function-API-Reference.md)。本页用于快速了解各服务的工具范围、基础 URL、读写规模和使用边界。

当前规模：

| 模块 | 工具数 | 读接口 | 写接口 | 基础 URL 环境变量 |
| --- | ---: | ---: | ---: | --- |
| Req | 200 | 119 | 81 | `HUAWEICLOUD_REQ_BASE_URL` |
| Repo | 25 | 17 | 8 | `HUAWEICLOUD_REPO_BASE_URL` |
| Pipeline | 77 | 42 | 35 | `HUAWEICLOUD_PIPELINE_BASE_URL` |
| Check | 8 | 5 | 3 | `HUAWEICLOUD_CHECK_BASE_URL` |
| TestPlan | 7 | 6 | 1 | `HUAWEICLOUD_TESTPLAN_BASE_URL` |
| Deploy | 59 | 44 | 15 | `HUAWEICLOUD_DEPLOY_BASE_URL` |
| Build | 22 | 14 | 8 | `HUAWEICLOUD_BUILD_BASE_URL` |
| Artifact | 12 | 11 | 1 | `HUAWEICLOUD_ARTIFACT_BASE_URL` |

产品工具合计 `410` 个。HTTP 共享模式额外提供 `auth_configure_session` 和 `auth_clear_session` 两个会话工具，因此 HTTP MCP 总工具数为 `412`。

## 通用运行环境

最小真实环境变量：

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

安全规则：

- 读接口在配置 AK/SK 和区域后通常可以直接调用。
- 写接口受服务端限速保护，很多写接口默认支持 `dry_run` 预览。
- 真实写入冒烟测试必须使用明确的样例 ID，并开启对应模块的写入开关变量。
- 不要把 AK/SK 写入文档、提交记录、共享 shell 配置或日志。

## Req

Req 覆盖需求和项目协作，包括 Scrum 项目管理、成员、模块、迭代、计划、工作项、评论、附件、状态和配置读取、看板/缓存读取、需求池读取，以及 IPD 读写能力。

关键入口工具：

| 领域 | 工具 |
| --- | --- |
| 项目 | `req_list_projects`, `req_get_project`, `req_create_project`, `req_update_project`, `req_delete_project` |
| 迭代 | `req_list_iterations`, `req_get_iteration`, `req_create_iteration`, `req_update_iteration`, `req_delete_iteration` |
| 工作项 | `req_list_work_items`, `req_get_work_item`, `req_create_work_item`, `req_update_work_item`, `req_delete_work_item` |
| 需求池 | `req_list_programs`, `req_get_ir`, `req_list_rrs`, `req_list_rr_statuses` |
| IPD | `req_list_ipd_projects`, `req_get_ipd_issue`, `req_create_ipd_issue`, `req_batch_update_ipd_issues`, `req_transfer_ipd_work_item_flow` |
| 本次增量 | `req_batch_create_tracker_config`, `req_batch_delete_release_plans`, `req_batch_update_release_plan_baseline`, `req_cancel_project_domain`, `req_change_release_plan_status`, `req_create_ipd_change_review_form`, `req_create_ipd_process_instance`, `req_create_project_domain`, `req_create_project_status_config`, `req_create_release_plan`, `req_delete_ipd_change_review_form`, `req_delete_ipd_process_instance`, `req_get_ipd_process_instance`, `req_get_ipd_review_form`, `req_get_release_plan`, `req_list_ipd_change_review_issue_approvers`, `req_list_ipd_process_instances`, `req_list_ipd_review_forms`, `req_list_ipd_review_role_users`, `req_list_release_plans`, `req_update_ipd_change_review_form`, `req_update_ipd_process_instance`, `req_update_project_domain`, `req_update_release_plan`, `req_update_tracker_config`, `req_update_working_hours` |

完整 Req API 参考：[Req-API-Reference](./Req-API-Reference.md)。

近期真实环境状态：

- 默认 Req 真实环境冒烟测试：`17 passed`。
- 开启写入开关的 Req 真实环境冒烟测试：`17 passed`。
- 已完成真实写闭环：项目创建、更新、删除。
- 更深的 Scrum/IPD 写闭环仍需要一次性样例 ID。

## Repo

Repo 覆盖 CodeHub 代码仓协作，包括仓库、分支、提交、文件、标签、合并请求、MR 评论和评审。

| 工具 | 用途 |
| --- | --- |
| `repo_list_repositories` | 查询仓库列表 |
| `repo_get_repository` | 获取仓库详情 |
| `repo_create_repository` | 创建仓库 |
| `repo_list_branches` / `repo_get_branch` | 查询分支列表或分支详情 |
| `repo_list_commits` / `repo_get_commit` | 查询提交列表或提交详情 |
| `repo_get_file` | 读取仓库文件内容 |
| `repo_list_tags` / `repo_get_tag` | 查询标签列表或标签详情 |
| `repo_create_tag` / `repo_delete_tag` | 创建或删除标签 |
| `repo_list_merge_requests` / `repo_get_merge_request` | 查询合并请求列表或详情 |
| `repo_create_merge_request` | 创建合并请求 |
| `repo_close_merge_request` | 关闭合并请求 |
| `repo_merge_merge_request` | 合并合并请求 |
| `repo_review_merge_request` | 审批或驳回合并请求 |
| `repo_create_merge_request_discussion` | 新增 MR 讨论 |
| `repo_list_merge_request_discussions` | 查询 MR 讨论列表 |
| `repo_list_merge_request_changes` | 查询 MR 变更文件 |
| `repo_compare_refs` | 比较分支、标签或提交 |
| `repo_list_events` | 查询仓库事件 |
| `repo_list_protected_branches` | 查询保护分支 |
| `repo_list_repository_labels` | 查询仓库标签 |

当前真实环境状态：Repo 标记为 `Validated`，仓库创建已覆盖真实 AK/SK 测试。

## Pipeline

Pipeline 覆盖流水线读取、运行和治理能力，包括运行记录、日志、制品、人工审核、分组、标签、变量组、规则、策略、扩展、插件和模板。

| 领域 | 工具 |
| --- | --- |
| 流水线 | `pipeline_list_pipelines`, `pipeline_get_pipeline`, `pipeline_run_pipeline`, `pipeline_retry_run`, `pipeline_stop_run`, `pipeline_enable_pipeline`, `pipeline_disable_pipeline`, `pipeline_delete_pipeline` |
| 运行记录 | `pipeline_list_runs`, `pipeline_get_run`, `pipeline_get_run_detail`, `pipeline_get_run_log`, `pipeline_get_run_parameters`, `pipeline_get_step_outputs`, `pipeline_list_artifacts` |
| 人工审核 | `pipeline_get_manual_review_context`, `pipeline_approve_run`, `pipeline_reject_run` |
| 分组 | `pipeline_list_groups`, `pipeline_create_group`, `pipeline_update_group`, `pipeline_delete_group`, `pipeline_move_pipelines_to_group` |
| 标签 | `pipeline_list_tags`, `pipeline_create_tag`, `pipeline_update_tag`, `pipeline_delete_tag`, `pipeline_set_tags_for_pipelines` |
| 变量组 | `pipeline_list_variable_groups`, `pipeline_get_variable_group`, `pipeline_create_variable_group`, `pipeline_update_variable_group`, `pipeline_delete_variable_group`, `pipeline_bind_variable_groups_to_pipeline`, `pipeline_list_pipeline_variable_groups` |
| 规则 | `pipeline_list_rules`, `pipeline_get_rule`, `pipeline_create_rule`, `pipeline_update_rule`, `pipeline_delete_rule`, `pipeline_list_rule_types`, `pipeline_get_rule_related_info` |
| 策略 | `pipeline_list_strategies`, `pipeline_get_strategy`, `pipeline_create_strategy`, `pipeline_update_strategy`, `pipeline_delete_strategy`, `pipeline_switch_strategy`, `pipeline_list_strategy_children`, `pipeline_get_strategy_related_info` |
| 项目策略 | `pipeline_list_project_strategies`, `pipeline_get_project_strategy`, `pipeline_get_project_strategy_detail`, `pipeline_create_project_strategy`, `pipeline_update_project_strategy`, `pipeline_delete_project_strategy`, `pipeline_switch_project_strategy`, `pipeline_inherit_project_strategy`, `pipeline_get_project_strategy_related_info` |
| 扩展 | `pipeline_list_extension_endpoints`, `pipeline_get_extension_endpoint`, `pipeline_create_extension_endpoint`, `pipeline_update_extension_endpoint`, `pipeline_delete_extension_endpoint`, `pipeline_list_extension_modules`, `pipeline_get_extension_module` |
| 插件和模板 | `pipeline_list_plugins`, `pipeline_list_base_plugins`, `pipeline_list_base_plugins_paged`, `pipeline_list_stage_plugins`, `pipeline_list_plugin_versions`, `pipeline_get_plugin_version`, `pipeline_get_plugin_inputs`, `pipeline_get_plugin_outputs`, `pipeline_list_available_publishers`, `pipeline_list_publishers`, `pipeline_list_templates` |

当前真实环境状态：部分验证。核心运行路径已有真实环境覆盖，治理类工具还需要更多租户样例。

## Check

Check 覆盖 CodeArts Check 的检查任务、规则集、问题列表和指标读取。

| 工具 | 用途 |
| --- | --- |
| `check_list_tasks` | 查询检查任务列表 |
| `check_get_task` | 获取检查任务详情 |
| `check_create_task` | 创建检查任务 |
| `check_run_task` | 运行检查任务 |
| `check_stop_task` | 停止检查任务 |
| `check_list_rulesets` | 查询规则集列表 |
| `check_list_task_issues` | 查询任务问题列表 |
| `check_get_metrics` | 获取检查指标 |

当前真实环境状态：已验证。

## TestPlan

TestPlan 覆盖测试计划、用例、关联需求、执行记录和用例执行。

| 工具 | 用途 |
| --- | --- |
| `testplan_list_plans` | 查询测试计划列表 |
| `testplan_get_plan` | 获取测试计划详情 |
| `testplan_list_cases` | 查询测试用例列表 |
| `testplan_get_case` | 获取测试用例详情 |
| `testplan_list_issues` | 查询测试计划关联需求树 |
| `testplan_list_runs` | 查询测试执行记录 |
| `testplan_run_cases` | 执行测试用例 |

当前真实环境状态：部分验证。北京四部分上游路径并非对所有租户开放。

## Deploy

Deploy 覆盖应用部署、部署任务、历史记录、主机组、环境、变量和 v4 部署资源。

| 领域 | 工具 |
| --- | --- |
| 应用 | `deploy_list_apps`, `deploy_get_app`, `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_stop_app`, `deploy_rollback_app`, `deploy_list_app_operations_log`, `deploy_list_app_host_groups` |
| 任务 | `deploy_list_tasks`, `deploy_get_task`, `deploy_create_task_by_template`, `deploy_get_template_detail`, `deploy_get_execution_params`, `deploy_get_deploy_source_detail`, `deploy_get_runtime_variables` |
| 历史 | `deploy_list_histories`, `deploy_get_history_detail`, `deploy_get_last_record_detail`, `deploy_get_status`, `deploy_get_app_log` |
| 主机组 | `deploy_list_host_groups`, `deploy_get_host_group`, `deploy_list_host_group_hosts`, `deploy_list_host_group_environments` |
| 环境 | `deploy_list_environments`, `deploy_create_environment`, `deploy_list_environment_hosts`, `deploy_add_v4_environment_hosts`, `deploy_delete_v4_environment_hosts`, `deploy_import_hosts_to_environment` |
| 变量 | `deploy_list_variables`, `deploy_query_variables`, `deploy_list_variable_history` |
| v4 应用/环境 | `deploy_list_v4_applications`, `deploy_list_v4_environments`, `deploy_get_v4_environment`, `deploy_list_v4_environment_applications`, `deploy_get_v4_environment_resource_detail`, `deploy_list_v4_environment_hosts` |
| v4 集群 | `deploy_list_v4_clusters`, `deploy_get_v4_cluster`, `deploy_get_v4_cluster_count`, `deploy_list_v4_cluster_hosts`, `deploy_get_v4_cluster_host`, `deploy_delete_v4_cluster_hosts` |
| v4 部署记录 | `deploy_list_v4_deploy_records`, `deploy_get_v4_deploy_record`, `deploy_get_v4_deploy_record_step_detail`, `deploy_get_v4_deploy_record_step_logs`, `deploy_cancel_v4_deploy_record`, `deploy_retry_v4_deploy_record`, `deploy_rerun_v4_deploy_record`, `deploy_rollback_v4_deploy_record` |
| v4 人工审核 | `deploy_pass_v4_manual_check`, `deploy_refuse_v4_manual_check` |
| v4 其他 | `deploy_list_v4_orchestrations`, `deploy_list_deployment_units`, `deploy_list_system_configs` |

当前真实环境状态：部分验证。读路径和部分受控写路径已有覆盖，启动、停止、回滚这类执行型路径需要显式样例变量。

## Build

Build 覆盖构建任务、构建记录、日志、参数，以及构建步骤和发布仓上传配置的辅助工具。

| 工具 | 用途 |
| --- | --- |
| `build_list_jobs` | 查询构建任务列表 |
| `build_get_job` | 获取构建任务详情 |
| `build_run_job` | 运行构建任务 |
| `build_stop_job` | 停止构建任务 |
| `build_list_records` | 查询构建记录列表 |
| `build_get_record` | 获取构建记录详情 |
| `build_get_history_details` | 获取构建历史详情 |
| `build_get_info_record` | 获取构建信息记录 |
| `build_get_full_stages` | 获取完整阶段信息 |
| `build_get_record_flow_graph` | 获取构建记录流程图 |
| `build_get_record_script` | 获取构建记录脚本 |
| `build_get_real_time_log` | 获取实时日志 |
| `build_get_error_log` | 获取错误日志分析 |
| `build_list_build_parameters` | 查询构建参数 |
| `build_list_project_records` | 查询项目构建记录 |
| `build_get_project_record_statistics` | 获取项目构建记录统计 |
| `build_append_job_step` | 追加构建步骤 |
| `build_update_job_step` | 更新构建步骤 |
| `build_append_release_upload_step` | 追加发布仓上传步骤 |
| `build_configure_release_upload_step` | 配置发布仓上传步骤 |
| `build_prepare_node_runtime_bundle` | 准备 Node 运行时打包辅助命令 |
| `build_prepare_deployable_node_app` | 准备可部署 Node 应用辅助命令 |

当前真实环境状态：已验证。

## Artifact

Artifact 覆盖制品仓、版本、文件、下载地址、构建归档、制品搜索和审计日志。

| 工具 | 用途 |
| --- | --- |
| `artifact_list_repositories` | 查询制品仓列表 |
| `artifact_get_repository` | 获取制品仓详情 |
| `artifact_list_versions` | 查询版本列表 |
| `artifact_list_files` | 查询文件列表 |
| `artifact_list_latest_version_files` | 查询最新版本文件 |
| `artifact_get_file_tree` | 获取文件树 |
| `artifact_get_file` | 获取文件详情 |
| `artifact_get_download_url` | 获取文件下载地址 |
| `artifact_list_build_archives` | 查询构建归档 |
| `artifact_search_artifacts` | 搜索制品 |
| `artifact_show_audit` | 查看审计日志 |
| `artifact_delete_file` | 删除制品文件 |

当前真实环境状态：部分验证。部分 Artifact API 在北京四受区域或租户能力限制。

## 完整工具清单

本清单用于检查 MCP 客户端暴露情况，或编写允许/拒绝策略。Req 工具数量较多，完整 Req 清单放在 [Req-API-Reference](./Req-API-Reference.md)，避免本页过长。

### Repo

`repo_close_merge_request`, `repo_compare_refs`, `repo_create_merge_request`, `repo_create_merge_request_discussion`, `repo_create_repository`, `repo_create_tag`, `repo_delete_tag`, `repo_get_branch`, `repo_get_commit`, `repo_get_file`, `repo_get_merge_request`, `repo_get_repository`, `repo_get_tag`, `repo_list_branches`, `repo_list_commits`, `repo_list_events`, `repo_list_merge_request_changes`, `repo_list_merge_request_discussions`, `repo_list_merge_requests`, `repo_list_protected_branches`, `repo_list_repositories`, `repo_list_repository_labels`, `repo_list_tags`, `repo_merge_merge_request`, `repo_review_merge_request`

### Pipeline

`pipeline_approve_run`, `pipeline_bind_variable_groups_to_pipeline`, `pipeline_create_extension_endpoint`, `pipeline_create_group`, `pipeline_create_project_strategy`, `pipeline_create_rule`, `pipeline_create_strategy`, `pipeline_create_tag`, `pipeline_create_variable_group`, `pipeline_delete_extension_endpoint`, `pipeline_delete_group`, `pipeline_delete_pipeline`, `pipeline_delete_project_strategy`, `pipeline_delete_rule`, `pipeline_delete_strategy`, `pipeline_delete_tag`, `pipeline_delete_variable_group`, `pipeline_disable_pipeline`, `pipeline_enable_pipeline`, `pipeline_get_extension_endpoint`, `pipeline_get_extension_module`, `pipeline_get_manual_review_context`, `pipeline_get_pipeline`, `pipeline_get_plugin_inputs`, `pipeline_get_plugin_outputs`, `pipeline_get_plugin_version`, `pipeline_get_project_strategy`, `pipeline_get_project_strategy_detail`, `pipeline_get_project_strategy_related_info`, `pipeline_get_rule`, `pipeline_get_rule_related_info`, `pipeline_get_run`, `pipeline_get_run_detail`, `pipeline_get_run_log`, `pipeline_get_run_parameters`, `pipeline_get_step_outputs`, `pipeline_get_strategy`, `pipeline_get_strategy_related_info`, `pipeline_get_variable_group`, `pipeline_inherit_project_strategy`, `pipeline_list_artifacts`, `pipeline_list_available_publishers`, `pipeline_list_base_plugins`, `pipeline_list_base_plugins_paged`, `pipeline_list_extension_endpoints`, `pipeline_list_extension_modules`, `pipeline_list_groups`, `pipeline_list_pipeline_variable_groups`, `pipeline_list_pipelines`, `pipeline_list_plugin_versions`, `pipeline_list_plugins`, `pipeline_list_project_strategies`, `pipeline_list_publishers`, `pipeline_list_rule_types`, `pipeline_list_rules`, `pipeline_list_runs`, `pipeline_list_stage_plugins`, `pipeline_list_strategies`, `pipeline_list_strategy_children`, `pipeline_list_tags`, `pipeline_list_templates`, `pipeline_list_variable_groups`, `pipeline_move_pipelines_to_group`, `pipeline_reject_run`, `pipeline_retry_run`, `pipeline_run_pipeline`, `pipeline_set_tags_for_pipelines`, `pipeline_stop_run`, `pipeline_switch_project_strategy`, `pipeline_switch_strategy`, `pipeline_update_extension_endpoint`, `pipeline_update_group`, `pipeline_update_project_strategy`, `pipeline_update_rule`, `pipeline_update_strategy`, `pipeline_update_tag`, `pipeline_update_variable_group`

### Check

`check_create_task`, `check_get_metrics`, `check_get_task`, `check_list_rulesets`, `check_list_task_issues`, `check_list_tasks`, `check_run_task`, `check_stop_task`

### TestPlan

`testplan_get_case`, `testplan_get_plan`, `testplan_list_cases`, `testplan_list_issues`, `testplan_list_plans`, `testplan_list_runs`, `testplan_run_cases`

### Deploy

`deploy_add_v4_environment_hosts`, `deploy_cancel_v4_deploy_record`, `deploy_create_application`, `deploy_create_environment`, `deploy_create_task_by_template`, `deploy_delete_v4_cluster_hosts`, `deploy_delete_v4_environment_hosts`, `deploy_get_app`, `deploy_get_app_log`, `deploy_get_deploy_source_detail`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_host_group`, `deploy_get_last_record_detail`, `deploy_get_runtime_variables`, `deploy_get_status`, `deploy_get_task`, `deploy_get_template_detail`, `deploy_get_v4_cluster`, `deploy_get_v4_cluster_count`, `deploy_get_v4_cluster_host`, `deploy_get_v4_deploy_record`, `deploy_get_v4_deploy_record_step_detail`, `deploy_get_v4_deploy_record_step_logs`, `deploy_get_v4_environment`, `deploy_get_v4_environment_resource_detail`, `deploy_import_hosts_to_environment`, `deploy_list_app_host_groups`, `deploy_list_app_operations_log`, `deploy_list_apps`, `deploy_list_deployment_units`, `deploy_list_environments`, `deploy_list_environment_hosts`, `deploy_list_histories`, `deploy_list_host_group_environments`, `deploy_list_host_group_hosts`, `deploy_list_host_groups`, `deploy_list_system_configs`, `deploy_list_tasks`, `deploy_list_v4_applications`, `deploy_list_v4_cluster_hosts`, `deploy_list_v4_clusters`, `deploy_list_v4_deploy_records`, `deploy_list_v4_environment_applications`, `deploy_list_v4_environment_hosts`, `deploy_list_v4_environments`, `deploy_list_v4_orchestrations`, `deploy_list_variable_history`, `deploy_list_variables`, `deploy_modify_application`, `deploy_pass_v4_manual_check`, `deploy_query_variables`, `deploy_refuse_v4_manual_check`, `deploy_rerun_v4_deploy_record`, `deploy_retry_v4_deploy_record`, `deploy_rollback_app`, `deploy_rollback_v4_deploy_record`, `deploy_start_app`, `deploy_stop_app`

### Build

`build_append_job_step`, `build_append_release_upload_step`, `build_configure_release_upload_step`, `build_get_error_log`, `build_get_full_stages`, `build_get_history_details`, `build_get_info_record`, `build_get_job`, `build_get_project_record_statistics`, `build_get_real_time_log`, `build_get_record`, `build_get_record_flow_graph`, `build_get_record_script`, `build_list_build_parameters`, `build_list_jobs`, `build_list_project_records`, `build_list_records`, `build_prepare_deployable_node_app`, `build_prepare_node_runtime_bundle`, `build_run_job`, `build_stop_job`, `build_update_job_step`

### Artifact

`artifact_delete_file`, `artifact_get_download_url`, `artifact_get_file`, `artifact_get_file_tree`, `artifact_get_repository`, `artifact_list_build_archives`, `artifact_list_files`, `artifact_list_latest_version_files`, `artifact_list_repositories`, `artifact_list_versions`, `artifact_search_artifacts`, `artifact_show_audit`

## 相关文档

- [Req-API-Reference](./Req-API-Reference.md)
- [HTTP-MCP-Interface](./HTTP-MCP-Interface.md)
- [Function-API-Reference](./Function-API-Reference.md)
- [Module-Functions-Overview](./Module-Functions-Overview.md)
- [Capability-Matrix](./Capability-Matrix.md)
- [Module-Live-Readiness](./Module-Live-Readiness.md)
- [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
