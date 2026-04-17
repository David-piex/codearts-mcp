# 工具参数示例库

这份文档提供当前业务工具中的高频最小输入示例。

使用建议：

- 先从这里复制一份最小 JSON
- 再替换成你自己的 `project_id`、`repository_id`、`pipeline_id`
- 写操作建议先用 `dry_run: true`
- 这份文档优先覆盖最常用工具，不追求逐个枚举所有工具

> 说明：本页优先覆盖已实现工具中的高频最小输入示例，不追求逐个枚举所有工具。

## Req

### `req_list_projects`

```json
{
  "page": 1,
  "page_size": 20
}
```

### `req_get_project`

```json
{
  "project_id": "project-id"
}
```

### `req_list_work_items`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `req_get_work_item`

```json
{
  "project_id": "project-id",
  "work_item_id": "123"
}
```

### `req_create_work_item`

```json
{
  "project_id": "project-id",
  "title": "新增登录能力",
  "work_item_type": "story",
  "description": "支持账号密码登录",
  "dry_run": true
}
```

### `req_update_work_item`

```json
{
  "project_id": "project-id",
  "work_item_id": "123",
  "title": "更新后的标题",
  "description": "更新后的描述",
  "status_id": 2,
  "dry_run": true
}
```

### `req_list_iterations`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `req_list_project_members`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

## Repo

### `repo_list_repositories`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `repo_get_repository`

```json
{
  "repository_id": "repository-id"
}
```

### `repo_list_branches`

```json
{
  "repository_id": "repository-id",
  "page": 1,
  "page_size": 20
}
```

### `repo_get_branch`

```json
{
  "repository_id": "repository-id",
  "branch_name": "release/1.2.0"
}
```

### `repo_list_commits`

```json
{
  "repository_id": "repository-id",
  "page": 1,
  "page_size": 20,
  "ref_name": "main"
}
```

### `repo_get_commit`

```json
{
  "repository_id": "repository-id",
  "commit_sha": "commit-sha"
}
```

### `repo_get_file`

```json
{
  "repository_id": "repository-id",
  "file_path": "README.md",
  "branch": "main"
}
```

### `repo_list_merge_requests`

```json
{
  "repository_id": "repository-id",
  "page": 1,
  "page_size": 20,
  "state": "opened"
}
```

### `repo_get_merge_request`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1"
}
```

### `repo_list_merge_request_changes`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1",
  "page": 1,
  "page_size": 20
}
```

### `repo_list_merge_request_discussions`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1",
  "page": 1,
  "page_size": 20
}
```

### `repo_create_merge_request_discussion`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1",
  "body": "请补一条回归测试覆盖这个分支场景",
  "dry_run": true
}
```

### `repo_review_merge_request`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1",
  "action_type": "approve",
  "approver_comment": "实现和测试都看过了，可以继续",
  "dry_run": true
}
```

### `repo_merge_merge_request`

```json
{
  "repository_id": "repository-id",
  "merge_request_iid": "1",
  "squash": true,
  "dry_run": true
}
```

### `repo_list_protected_branches`

```json
{
  "repository_id": "repository-id",
  "page": 1,
  "page_size": 20
}
```

### `repo_list_repository_labels`

```json
{
  "repository_id": "repository-id",
  "page": 1,
  "page_size": 20
}
```

### `repo_create_tag`

```json
{
  "repository_id": "repository-id",
  "tag_name": "release-2026-04-16",
  "ref": "main",
  "message": "阶段版本归档",
  "dry_run": true
}
```

### `repo_delete_tag`

```json
{
  "repository_id": "repository-id",
  "tag_name": "release-2026-04-16",
  "dry_run": true
}
```

### `repo_get_tag`

```json
{
  "repository_id": "repository-id",
  "tag_name": "release-2026-04-16"
}
```

### `repo_compare_refs`

```json
{
  "repository_id": "repository-id",
  "from": "main",
  "to": "release/1.2.0",
  "straight": true,
  "ignore_whitespace_change": true
}
```

## Pipeline

### `pipeline_list_pipelines`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `pipeline_get_pipeline`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id"
}
```

### `pipeline_list_runs`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "page": 1,
  "page_size": 20
}
```

### `pipeline_get_run`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id"
}
```

### `pipeline_list_artifacts`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id"
}
```

### `pipeline_get_step_outputs`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "step_run_ids": ["step-run-id"]
}
```

### `pipeline_get_run_detail`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id"
}
```

### `pipeline_get_run_parameters`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id"
}
```

### `pipeline_get_run_log`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "job_id": "job-run-id",
  "step_id": "step-run-id"
}
```

### `pipeline_get_manual_review_context`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id"
}
```

### `govern_get_task_status`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_alter_quota_info`

```json
{
  "project_id": "project-id",
  "resource_id": "resource-id",
  "change_mode": 1,
  "product_info": [
    {
      "resource_size": 5,
      "resource_size_measure_id": 17
    }
  ],
  "dry_run": true
}
```

### `govern_create_task`

```json
{
  "project_id": "project-id",
  "file_path": "/secbinarycheck/pre-signed/2026/04/16/demo.jar",
  "file_name": "demo.jar",
  "file_size": 1048576,
  "dry_run": true
}
```

### `govern_create_task_multipart_file`

```json
{
  "project_id": "project-id",
  "file_path": "/tmp/demo.jar",
  "file_name": "demo.jar",
  "dry_run": true
}
```

### `govern_upload_task_multipart_file`

```json
{
  "project_id": "project-id",
  "file_path": "/tmp/demo.jar",
  "file_name": "demo.jar",
  "upload_id": "upload-id",
  "part_number": 1,
  "part_size": 5242880,
  "local_file": "D:/tmp/demo.part1",
  "dry_run": true
}
```

### `govern_notify_task_multipart_file`

```json
{
  "project_id": "project-id",
  "file_path": "/tmp/demo.jar",
  "file_name": "demo.jar",
  "upload_id": "upload-id",
  "dry_run": true
}
```

### `govern_get_open_source_summary`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_get_open_source_report`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_get_osi_item_detail`

```json
{
  "project_id": "project-id",
  "software_name": "openssl",
  "software_version": "openssl-3.0.19"
}
```

### `govern_get_osi_statistics`

```json
{
  "project_id": "project-id"
}
```

### `govern_get_quota_info`

```json
{
  "project_id": "project-id"
}
```

### `govern_get_user_info`

```json
{
  "project_id": "project-id",
  "user_id": "user-id"
}
```

### `govern_get_vuln_info`

```json
{
  "project_id": "project-id",
  "cve_id": "CVE-2023-4751"
}
```

### `govern_list_sbc_vuln_map`

```json
{
  "project_id": "project-id",
  "start_time": "2023-09-04 16:00:00",
  "end_time": "2023-09-05 00:00:00"
}
```

### `govern_list_osi_item_names`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 10,
  "software_name": "openssl"
}
```

### `govern_list_osi_item_versions`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 10,
  "software_name": "openssl"
}
```

### `govern_list_osi_item_vulns`

```json
{
  "project_id": "project-id",
  "software_name": "openssl",
  "software_version": "openssl-3.0.19"
}
```

说明：
- `govern_get_osi_item_detail` 和 `govern_list_osi_item_vulns` 当前已在北京四真实环境验证通过，推荐直接使用 `software_name + software_version` 组合。
- 当前不建议只传 `artifact_id` 调用这两条 OSI detail/vuln 接口；北京四真实环境会继续要求 `group_id`，而该请求形态还没有被可靠确认。
- `sbc/osi/item/dependency` 虽然出现在官方 PDF 权限表中，但北京四真实环境当前仍返回 `APIGW.0101`，因此本仓库暂未暴露对应 MCP 工具。

### `govern_get_info_leak_summary`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_get_sec_compile_summary`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_get_sec_config_summary`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_create_pdf_report`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "dry_run": true
}
```

### `govern_get_pdf_report_status`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_download_pdf_report`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "local_output": "D:/tmp/report.pdf",
  "dry_run": true
}
```

### `govern_create_excel_report`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "dry_run": true
}
```

### `govern_get_excel_report_status`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `govern_download_excel_report`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "local_output": "D:/tmp/report.xlsx",
  "dry_run": true
}
```

### `govern_stop_task`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "dry_run": true
}
```

### `govern_delete_task`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "dry_run": true
}
```

### `inspector_list_domains`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `inspector_get_task`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

### `inspector_list_task_histories`

```json
{
  "project_id": "project-id",
  "domain_id": "domain-id",
  "page": 1,
  "page_size": 20
}
```

### `inspector_list_results`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "page": 1,
  "page_size": 20
}
```

### `inspector_list_ports`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "page": 1,
  "page_size": 20
}
```

### `inspector_list_business_risks`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "page": 1,
  "page_size": 20
}
```

### `inspector_get_report_status`

```json
{
  "project_id": "project-id",
  "task_id": "task-id"
}
```

`inspector_*` tools use the CodeArts project UUID, and the recommended endpoint is `https://vss.myhuaweicloud.com`.

### `perftest_list_projects`

```json
{
  "project_id": "regional-iam-project-id",
  "page": 1,
  "page_size": 20
}
```

`project_id` here is the regional IAM project id, not the CodeArts project UUID.
The same rule applies to the other `perftest_*` tools in this section.

### `perftest_get_project`

```json
{
  "project_id": "project-id",
  "test_suite_id": 1
}
```

### `perftest_list_tasks`

```json
{
  "project_id": "project-id",
  "test_suite_id": 1,
  "page": 1,
  "page_size": 20
}
```

### `perftest_get_task`

```json
{
  "project_id": "project-id",
  "task_id": 11
}
```

### `perftest_list_variables`

```json
{
  "project_id": "project-id",
  "test_suite_id": 1,
  "variable_type": 2
}
```

### `perftest_list_task_cases`

```json
{
  "project_id": "project-id",
  "task_id": 11
}
```

### `perftest_list_latest_runs`

```json
{
  "project_id": "project-id",
  "task_id": 11
}
```

### `perftest_list_offline_reports`

```json
{
  "project_id": "project-id",
  "task_id": 11
}
```

### `perftest_get_report`

```json
{
  "project_id": "project-id",
  "task_run_id": 101,
  "case_run_id": 201,
  "brokens_limit_count": 60
}
```

### `pipeline_run_pipeline`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "branch": "main",
  "dry_run": true
}
```

### `pipeline_retry_run`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "dry_run": true
}
```

### `pipeline_approve_run`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "job_id": "job-run-id",
  "step_id": "step-run-id",
  "dry_run": true
}
```

### `pipeline_stop_run`

```json
{
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "dry_run": true
}
```

### `pipeline_list_templates`

```json
{
  "tenant_id": "tenant-id",
  "page": 1,
  "page_size": 20
}
```

### `pipeline_reject_run`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "run_id": "run-id",
  "job_id": "job-run-id",
  "step_id": "step-run-id",
  "dry_run": true
}
```

## Check

### `check_get_task`

```json
{
  "task_id": "task-id"
}
```

### `check_list_task_issues`

```json
{
  "task_id": "task-id",
  "page": 1,
  "page_size": 20
}
```

### `check_get_metrics`

```json
{
  "task_id": "task-id"
}
```

### `check_list_rulesets`

```json
{
  "project_id": "project-id",
  "language": "java",
  "page": 1,
  "page_size": 20
}
```

### `check_list_tasks`

```json
{
  "page": 1,
  "page_size": 20,
  "project_id": "project-id"
}
```

### `check_create_task`

```json
{
  "project_id": "project-id",
  "task_name": "gateway-main",
  "git_url": "https://codehub.example.com/gateway.git",
  "git_branch": "main",
  "language": "java",
  "dry_run": true
}
```

### `check_run_task`

```json
{
  "task_id": "task-id",
  "dry_run": true
}
```

### `check_stop_task`

```json
{
  "task_id": "task-id",
  "dry_run": true
}
```

## Deploy

### `deploy_start_app`

```json
{
  "task_id": "task-id",
  "dry_run": true
}
```

### `deploy_stop_app`

```json
{
  "task_id": "task-id",
  "record_id": "record-id",
  "dry_run": true
}
```

### `deploy_rollback_app`

```json
{
  "task_id": "task-id",
  "record_id": "record-id",
  "dry_run": true
}
```

### `deploy_get_history_detail`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_list_apps`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `deploy_get_app`

```json
{
  "application_id": "app-id"
}
```

### `deploy_list_histories`

```json
{
  "project_id": "project-id",
  "task_id": "task-id",
  "page": 1,
  "page_size": 20,
  "start_date": "2026-04-01",
  "end_date": "2026-04-16"
}
```

### `deploy_get_status`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_list_tasks`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `deploy_list_app_operations_log`

```json
{
  "app_id": "app-id",
  "page_size": 10,
  "page_index": 1
}
```

### `deploy_get_task`

```json
{
  "task_id": "task-id"
}
```

### `deploy_get_execution_params`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_get_app_log`

```json
{
  "application_id": "app-id",
  "record_id": "record-id",
  "step_id": "step-id",
  "offset": "0",
  "end_offset": "0"
}
```

## TestPlan

### `testplan_list_plans`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `testplan_get_plan`

```json
{
  "project_id": "project-id",
  "plan_id": "plan-id"
}
```

### `testplan_list_cases`

```json
{
  "project_id": "project-id",
  "plan_id": "plan-id",
  "page": 1,
  "page_size": 20
}
```

### `testplan_get_case`

```json
{
  "project_id": "project-id",
  "case_id": "case-id"
}
```

### `testplan_list_runs`

```json
{
  "project_id": "project-id",
  "plan_id": "plan-id",
  "page": 1,
  "page_size": 20
}
```

### `testplan_list_issues`

```json
{
  "project_id": "project-id",
  "plan_id": "plan-id"
}
```

### `testplan_run_cases`

```json
{
  "project_id": "project-id",
  "execute_list": [
    {
      "case_id": "case-id"
    }
  ],
  "dry_run": true
}
```

## Artifact

### `artifact_list_repositories`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `artifact_get_repository`

```json
{
  "repository_id": "repository-id"
}
```

### `artifact_list_files`

```json
{
  "project_id": "project-id",
  "repo_name": "libs-release",
  "page": 1,
  "page_size": 20
}
```

### `artifact_get_file`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "repo_name": "libs-release",
  "path": "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
  "format": "maven2"
}
```

### `artifact_list_build_archives`

```json
{
  "page": 1,
  "page_size": 20
}
```

### `artifact_list_versions`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `artifact_get_file_tree`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "repo_name": "libs-release"
}
```

### `artifact_get_download_url`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "repo_name": "libs-release",
  "path": "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
  "format": "maven2"
}
```

### `artifact_search_artifacts`

```json
{
  "artifact_name": "gateway",
  "page": 1,
  "page_size": 10
}
```

### `artifact_list_latest_version_files`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `artifact_show_audit`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "module": "file",
  "repo": "libs-release",
  "page": 1,
  "page_size": 20
}
```

## Build

### `build_list_jobs`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `build_list_project_records`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `build_get_job`

```json
{
  "job_id": "job-id"
}
```

### `build_list_records`

```json
{
  "job_id": "job-id",
  "page": 1,
  "page_size": 20
}
```

### `build_get_record`

```json
{
  "record_id": "record-id"
}
```

### `build_get_real_time_log`

```json
{
  "job_id": "job-id",
  "build_no": 33,
  "offset": 0
}
```

### `build_get_project_record_statistics`

```json
{
  "project_id": "project-id"
}
```

### `build_get_error_log`

```json
{
  "job_id": "job-id",
  "build_no": 33,
  "page": 1,
  "page_size": 10
}
```

### `build_get_history_details`

```json
{
  "job_id": "job-id",
  "build_number": 33
}
```

### `build_get_full_stages`

```json
{
  "record_id": "record-id",
  "cascade": true
}
```

### `build_get_record_flow_graph`

```json
{
  "record_id": "record-id"
}
```

### `build_get_info_record`

```json
{
  "job_id": "job-id",
  "build_no": 33
}
```

### `build_list_build_parameters`

```json
{
  "job_id": "job-id",
  "build_no": 33
}
```

### `build_get_record_script`

```json
{
  "record_id": "record-id"
}
```

### `build_stop_job`

```json
{
  "job_id": "job-id",
  "build_no": 33,
  "dry_run": true
}
```

### `build_run_job`

```json
{
  "job_id": "job-id",
  "branch": "main",
  "dry_run": true
}
```

### `artifact_delete_file`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "repo_name": "libs-release",
  "path": "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
  "format": "maven2",
  "dry_run": true
}
```

## 使用建议

### 第一次验证最推荐的三个工具

优先尝试：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`

### 第一次执行写操作时

优先把这些工具的 `dry_run` 设为 `true`：

- `req_create_work_item`
- `req_update_work_item`
- `pipeline_run_pipeline`
- `pipeline_retry_run`
- `pipeline_approve_run`
- `pipeline_reject_run`
- `pipeline_stop_run`
- `check_create_task`
- `check_run_task`
- `check_stop_task`
- `deploy_start_app`
- `deploy_rollback_app`
- `deploy_stop_app`
- `build_stop_job`
- `artifact_delete_file`
- `testplan_run_cases`

### 最常需要替换的字段

你通常需要替换：

- `project_id`
- `repository_id`
- `pipeline_id`
- `tenant_id`
- `work_item_id`
- `merge_request_iid`
- `run_id`
