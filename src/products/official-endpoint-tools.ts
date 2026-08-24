import type { OfficialEndpointToolDefinition } from "./shared-tools/official-endpoint-tool.js";

export type OfficialEndpointProductFamily =
  | "artifact"
  | "build"
  | "check"
  | "deploy"
  | "pipeline"
  | "repo"
  | "req"
  | "testplan";

export type ProductOfficialEndpointTool = OfficialEndpointToolDefinition & {
  family: OfficialEndpointProductFamily;
};

// Generated from tmp/api-audit/current-pdf-mcp-coverage.json, with 2026-08-24 online-doc additions.
export const officialEndpointTools = [
  {
    family: "artifact",
    name: "artifact_delete_cloudartifact_file_ed4025bb",
    method: "DELETE",
    pathTemplate: "/cloudartifact/v5/file",
    description: "Request CodeArts Artifact official DELETE /cloudartifact/v5/file endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_delete_cloudartifact_repositories_da06fd94",
    method: "DELETE",
    pathTemplate: "/cloudartifact/v5/repositories",
    description: "Request CodeArts Artifact official DELETE /cloudartifact/v5/repositories endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_delete_file_4c33f1f2",
    method: "DELETE",
    pathTemplate: "/v5/file",
    description: "Request CodeArts Artifact official DELETE /v5/file endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_delete_trashes_834ce210",
    method: "DELETE",
    pathTemplate: "/v5/trashes",
    description: "Request CodeArts Artifact official DELETE /v5/trashes endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_audit_ef28b3cc",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/{tenant_id}/{project_id}/{module}/{repo}/audit",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/{tenant_id}/{project_id}/{module}/{repo}/audit endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_repositories_ecd02083",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/{tenant_id}/{project_id}/{repo_id}/repositories",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_id}/repositories endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_file_detail_dfe4c08d",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-detail",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_maven_info_df83b165",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/maven/info",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/maven/info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_maven_list_97bf6cfe",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/maven/list",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/maven/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_maven_repository_843d1b07",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/maven/repository/list",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/maven/repository/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_cloudartifact_storage_190c044f",
    method: "GET",
    pathTemplate: "/cloudartifact/v5/storage",
    description: "Request CodeArts Artifact official GET /cloudartifact/v5/storage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_devreposerver_files_version_count_91af82e3",
    method: "GET",
    pathTemplate: "/devreposerver/v5/{project_id}/files/version/count",
    description: "Request CodeArts Artifact official GET /devreposerver/v5/{project_id}/files/version/count endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_devreposerver_storage_624e3af7",
    method: "GET",
    pathTemplate: "/devreposerver/v5/{project_id}/storage",
    description: "Request CodeArts Artifact official GET /devreposerver/v5/{project_id}/storage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_devreposerver_data_package_f5446e75",
    method: "GET",
    pathTemplate: "/devreposerver/v5/data/package",
    description: "Request CodeArts Artifact official GET /devreposerver/v5/data/package endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_devreposerver_data_package_info_05dd70eb",
    method: "GET",
    pathTemplate: "/devreposerver/v5/data/package/info",
    description: "Request CodeArts Artifact official GET /devreposerver/v5/data/package/info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_devreposerver_storage_4c8ab8d0",
    method: "GET",
    pathTemplate: "/devreposerver/v5/storage",
    description: "Request CodeArts Artifact official GET /devreposerver/v5/storage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_versions_count_c39ebf11",
    method: "GET",
    pathTemplate: "/v5/{project_id}/versions/count",
    description: "Request CodeArts Artifact official GET /v5/{project_id}/versions/count endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_files_info_50a6ce26",
    method: "GET",
    pathTemplate: "/v5/files/info",
    description: "Request CodeArts Artifact official GET /v5/files/info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_maven_list_c9971649",
    method: "GET",
    pathTemplate: "/v5/maven/list",
    description: "Request CodeArts Artifact official GET /v5/maven/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_get_storage_24ac971e",
    method: "GET",
    pathTemplate: "/v5/storage",
    description: "Request CodeArts Artifact official GET /v5/storage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "artifact",
    name: "artifact_post_cloudartifact_maven_project_873608e9",
    method: "POST",
    pathTemplate: "/cloudartifact/v5/maven/project/repository",
    description: "Request CodeArts Artifact official POST /cloudartifact/v5/maven/project/repository endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_post_cloudartifact_maven_repositories_40b2f4e3",
    method: "POST",
    pathTemplate: "/cloudartifact/v5/maven/repositories",
    description: "Request CodeArts Artifact official POST /cloudartifact/v5/maven/repositories endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_post_cloudartifact_maven_users_me_c2cc7c99",
    method: "POST",
    pathTemplate: "/cloudartifact/v5/maven/users/me",
    description: "Request CodeArts Artifact official POST /cloudartifact/v5/maven/users/me endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_post_cloudartifact_repositories_7f375b7e",
    method: "POST",
    pathTemplate: "/cloudartifact/v5/repositories",
    description: "Request CodeArts Artifact official POST /cloudartifact/v5/repositories endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_post_files_list_f12116c8",
    method: "POST",
    pathTemplate: "/v5/files/list",
    description: "Request CodeArts Artifact official POST /v5/files/list endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_put_cloudartifact_repositories_0ee73947",
    method: "PUT",
    pathTemplate: "/cloudartifact/v5/repositories/{role_id}/privileges",
    description: "Request CodeArts Artifact official PUT /cloudartifact/v5/repositories/{role_id}/privileges endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_put_cloudartifact_repositories_tab_c8cb7dd9",
    method: "PUT",
    pathTemplate: "/cloudartifact/v5/repositories/tab/{tab_id}",
    description: "Request CodeArts Artifact official PUT /cloudartifact/v5/repositories/tab/{tab_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "artifact",
    name: "artifact_put_trashes_d6e7934d",
    method: "PUT",
    pathTemplate: "/v5/trashes",
    description: "Request CodeArts Artifact official PUT /v5/trashes endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "build",
    name: "build_delete_templates_delete_7fa91100",
    method: "DELETE",
    pathTemplate: "/v3/templates/{uuid}/delete",
    description: "Request CodeArts Build official DELETE /v3/templates/{uuid}/delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "build",
    name: "build_get_code_git_code_branches_20ab4e40",
    method: "GET",
    pathTemplate: "/v1/code/git-code/{endpoint_id}/branches",
    description: "Request CodeArts Build official GET /v1/code/git-code/{endpoint_id}/branches endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_log_real_time_log_24c4401b",
    method: "GET",
    pathTemplate: "/v1/log/{job_id}/{build_no}/real-time-log",
    description: "Request CodeArts Build official GET /v1/log/{job_id}/{build_no}/real-time-log endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_log_stage_page_c09f6cbb",
    method: "GET",
    pathTemplate: "/v1/log/stage/page",
    description: "Request CodeArts Build official GET /v1/log/stage/page endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_log_task_step_78933f4d",
    method: "GET",
    pathTemplate: "/v1/log/task/step",
    description: "Request CodeArts Build official GET /v1/log/task/step endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_record_records_d83a7c42",
    method: "GET",
    pathTemplate: "/v1/record/{build_project_id}/records",
    description: "Request CodeArts Build official GET /v1/record/{build_project_id}/records endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_record_statistics_48ef3cbe",
    method: "GET",
    pathTemplate: "/v1/record/{build_project_id}/statistics",
    description: "Request CodeArts Build official GET /v1/record/{build_project_id}/statistics endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_record_record_info_c2ab88aa",
    method: "GET",
    pathTemplate: "/v1/record/{job_id}/{build_no}/record-info",
    description: "Request CodeArts Build official GET /v1/record/{job_id}/{build_no}/record-info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_report_junit_coverage_download_112871cc",
    method: "GET",
    pathTemplate: "/v1/report/junit/coverage/download",
    description: "Request CodeArts Build official GET /v1/report/junit/coverage/download endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_keystore_list_1e22880a",
    method: "GET",
    pathTemplate: "/v2/keystore/list",
    description: "Request CodeArts Build official GET /v2/keystore/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_jobs_record_info_700d2d87",
    method: "GET",
    pathTemplate: "/v3/jobs/{job_id}/{build_no}/record-info",
    description: "Request CodeArts Build official GET /v3/jobs/{job_id}/{build_no}/record-info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_jobs_query_80247a54",
    method: "GET",
    pathTemplate: "/v3/jobs/{job_id}/query",
    description: "Request CodeArts Build official GET /v3/jobs/{job_id}/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_download_log_d13d5ecb",
    method: "GET",
    pathTemplate: "/v4/{record_id}/download-log",
    description: "Request CodeArts Build official GET /v4/{record_id}/download-log endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_get_task_log_27885946",
    method: "GET",
    pathTemplate: "/v4/{record_id}/task-log",
    description: "Request CodeArts Build official GET /v4/{record_id}/task-log endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "build",
    name: "build_post_job_project_permission_3abbbee3",
    method: "POST",
    pathTemplate: "/v1/job/project/permission",
    description: "Request CodeArts Build official POST /v1/job/project/permission endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "build",
    name: "build_post_jobs_stop_67f81687",
    method: "POST",
    pathTemplate: "/v3/jobs/{job_id}/{build_no}/stop",
    description: "Request CodeArts Build official POST /v3/jobs/{job_id}/{build_no}/stop endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "build",
    name: "build_post_jobs_notice_update_cd7cebc4",
    method: "POST",
    pathTemplate: "/v3/jobs/notice/{job_id}/update",
    description: "Request CodeArts Build official POST /v3/jobs/notice/{job_id}/update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_delete_ruleset_c78cb768",
    method: "DELETE",
    pathTemplate: "/v2/{project_id}/ruleset/{ruleset_id}",
    description: "Request CodeArts Check official DELETE /v2/{project_id}/ruleset/{ruleset_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_delete_task_143f951d",
    method: "DELETE",
    pathTemplate: "/v3/task/{task_id}",
    description: "Request CodeArts Check official DELETE /v3/task/{task_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_delete_tenant_configs_5e05bf7f",
    method: "DELETE",
    pathTemplate: "/v1/tenant-configs/{id}",
    description: "Request CodeArts Check official DELETE /v1/tenant-configs/{id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_get_defect_dd8e1af3",
    method: "GET",
    pathTemplate: "/v1/defect",
    description: "Request CodeArts Check official GET /v1/defect endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_defects_file_content_163e628a",
    method: "GET",
    pathTemplate: "/v1/defects/file-content",
    description: "Request CodeArts Check official GET /v1/defects/file-content endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_defects_next_status_4d8c5696",
    method: "GET",
    pathTemplate: "/v1/defects/next-status",
    description: "Request CodeArts Check official GET /v1/defects/next-status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_defects_task_measures_9b5c5063",
    method: "GET",
    pathTemplate: "/v1/defects/task-measures",
    description: "Request CodeArts Check official GET /v1/defects/task-measures endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_defects_task_statistics_241ad0fb",
    method: "GET",
    pathTemplate: "/v1/defects/task-statistics",
    description: "Request CodeArts Check official GET /v1/defects/task-statistics endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_history_defect_metric_trend_aa6cf9d2",
    method: "GET",
    pathTemplate: "/v1/history/defect-metric-trend",
    description: "Request CodeArts Check official GET /v1/history/defect-metric-trend endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_log_file_9dc464ed",
    method: "GET",
    pathTemplate: "/v1/log-file",
    description: "Request CodeArts Check official GET /v1/log-file endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_cd05bfff",
    method: "GET",
    pathTemplate: "/v1/tasks",
    description: "Request CodeArts Check official GET /v1/tasks endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_measure_list_297ff819",
    method: "GET",
    pathTemplate: "/v1/tasks/{task_id}/measure-list",
    description: "Request CodeArts Check official GET /v1/tasks/{task_id}/measure-list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_pdf_file_c7821b71",
    method: "GET",
    pathTemplate: "/v1/tasks/{task_id}/pdf-file",
    description: "Request CodeArts Check official GET /v1/tasks/{task_id}/pdf-file endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_related_duplicate_blocks_9ac8cad3",
    method: "GET",
    pathTemplate: "/v1/tasks/{task_id}/related-duplicate-blocks",
    description: "Request CodeArts Check official GET /v1/tasks/{task_id}/related-duplicate-blocks endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_log_detail_937f70c1",
    method: "GET",
    pathTemplate: "/v2/{project_id}/tasks/{task_id}/log-detail",
    description: "Request CodeArts Check official GET /v2/{project_id}/tasks/{task_id}/log-detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_async_job_2924ebe9",
    method: "GET",
    pathTemplate: "/v2/async-job",
    description: "Request CodeArts Check official GET /v2/async-job endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_all_files_17d5d9b9",
    method: "GET",
    pathTemplate: "/v4/tasks/{task_id}/all-files",
    description: "Request CodeArts Check official GET /v4/tasks/{task_id}/all-files endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tenant_tenant_package_status_c81081d8",
    method: "GET",
    pathTemplate: "/v4/tenant/tenant-package-status",
    description: "Request CodeArts Check official GET /v4/tenant/tenant-package-status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_backup_backup_infos_d22f99cb",
    method: "GET",
    pathTemplate: "/v2/backup/backup-infos",
    description: "Request CodeArts Check official GET /v2/backup/backup-infos endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_config_simple_792fdd61",
    method: "GET",
    pathTemplate: "/v1/config/simple/{config_id}",
    description: "Request CodeArts Check official GET /v1/config/simple/{config_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_system_configs_11868d53",
    method: "GET",
    pathTemplate: "/v2/system-configs",
    description: "Request CodeArts Check official GET /v2/system-configs endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tasks_b6b90a38",
    method: "GET",
    pathTemplate: "/v2/tasks/",
    description: "Request CodeArts Check official GET /v2/tasks/ endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_get_tenant_configs_b7fdea2b",
    method: "GET",
    pathTemplate: "/v1/tenant-configs",
    description: "Request CodeArts Check official GET /v1/tenant-configs endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "check",
    name: "check_post_criterionsets_batch_82dc9053",
    method: "POST",
    pathTemplate: "/v1/criterionsets/batch",
    description: "Request CodeArts Check official POST /v1/criterionsets/batch endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_defects_assistant_analysis_task_71c2aaa0",
    method: "POST",
    pathTemplate: "/v1/defects/assistant-analysis/task-summary",
    description: "Request CodeArts Check official POST /v1/defects/assistant-analysis/task-summary endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_jobs_3e3cc5b2",
    method: "POST",
    pathTemplate: "/v1/jobs",
    description: "Request CodeArts Check official POST /v1/jobs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_task_02fd3e9e",
    method: "POST",
    pathTemplate: "/v3/task",
    description: "Request CodeArts Check official POST /v3/task endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_task_recover_data_e8f9b1f6",
    method: "POST",
    pathTemplate: "/v1/task/recover-data",
    description: "Request CodeArts Check official POST /v1/task/recover-data endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_tasks_a9409914",
    method: "POST",
    pathTemplate: "/v2/tasks/",
    description: "Request CodeArts Check official POST /v2/tasks/ endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_post_tenant_configs_9e2824ef",
    method: "POST",
    pathTemplate: "/v1/tenant-configs",
    description: "Request CodeArts Check official POST /v1/tenant-configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_put_plugins_8916348e",
    method: "PUT",
    pathTemplate: "/v2/plugins",
    description: "Request CodeArts Check official PUT /v2/plugins endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_put_defects_file_content_7f966b38",
    method: "PUT",
    pathTemplate: "/v1/defects/file-content",
    description: "Request CodeArts Check official PUT /v1/defects/file-content endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_put_tasks_pdf_async_job_bc6f6a3f",
    method: "PUT",
    pathTemplate: "/v1/tasks/{task_id}/pdf-async-job",
    description: "Request CodeArts Check official PUT /v1/tasks/{task_id}/pdf-async-job endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_put_tasks_stop_d00e79b6",
    method: "PUT",
    pathTemplate: "/v1/tasks/{task_id}/stop",
    description: "Request CodeArts Check official PUT /v1/tasks/{task_id}/stop endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "check",
    name: "check_put_tenant_configs_d3383ec0",
    method: "PUT",
    pathTemplate: "/v1/tenant-configs/{id}",
    description: "Request CodeArts Check official PUT /v1/tenant-configs/{id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_applications_3c383635",
    method: "DELETE",
    pathTemplate: "/v1/applications/{app_id}",
    description: "Request CodeArts Deploy official DELETE /v1/applications/{app_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_applications_environments_43e93148",
    method: "DELETE",
    pathTemplate: "/v1/applications/{application_id}/environments/{environment_id}/{host_id}",
    description: "Request CodeArts Deploy official DELETE /v1/applications/{application_id}/environments/{environment_id}/{host_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_resources_host_groups_1e7e2030",
    method: "DELETE",
    pathTemplate: "/v1/resources/host-groups/{group_id}",
    description: "Request CodeArts Deploy official DELETE /v1/resources/host-groups/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_resources_host_groups_hosts_1c20cc7c",
    method: "DELETE",
    pathTemplate: "/v1/resources/host-groups/{group_id}/hosts/{host_id}",
    description: "Request CodeArts Deploy official DELETE /v1/resources/host-groups/{group_id}/hosts/{host_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_host_groups_2d706a13",
    method: "DELETE",
    pathTemplate: "/v2/host-groups/{group_id}",
    description: "Request CodeArts Deploy official DELETE /v2/host-groups/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_host_groups_hosts_65fc6080",
    method: "DELETE",
    pathTemplate: "/v2/host-groups/{group_id}/hosts/{host_id}",
    description: "Request CodeArts Deploy official DELETE /v2/host-groups/{group_id}/hosts/{host_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_delete_tasks_ae8dc757",
    method: "DELETE",
    pathTemplate: "/v2/tasks/{task_id}",
    description: "Request CodeArts Deploy official DELETE /v2/tasks/{task_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_get_metrics_success_rate_7a84244f",
    method: "GET",
    pathTemplate: "/v2/{project_id}/metrics/success-rate",
    description: "Request CodeArts Deploy official GET /v2/{project_id}/metrics/success-rate endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "deploy",
    name: "deploy_get_projects_applications_messages_0a909575",
    method: "GET",
    pathTemplate: "/v2/projects/{project_id}/applications/{app_id}/messages",
    description: "Request CodeArts Deploy official GET /v2/projects/{project_id}/applications/{app_id}/messages endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "deploy",
    name: "deploy_post_resources_host_groups_6a926285",
    method: "POST",
    pathTemplate: "/v1/resources/host-groups",
    description: "Request CodeArts Deploy official POST /v1/resources/host-groups endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_resources_host_groups_hosts_69e49263",
    method: "POST",
    pathTemplate: "/v1/resources/host-groups/{group_id}/hosts",
    description: "Request CodeArts Deploy official POST /v1/resources/host-groups/{group_id}/hosts endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_resources_host_groups_hosts_batch_bd918392",
    method: "POST",
    pathTemplate: "/v1/resources/host-groups/{group_id}/hosts/batch-delete",
    description: "Request CodeArts Deploy official POST /v1/resources/host-groups/{group_id}/hosts/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_resources_host_groups_hosts_b635db8a",
    method: "POST",
    pathTemplate: "/v1/resources/host-groups/{group_id}/hosts/replication",
    description: "Request CodeArts Deploy official POST /v1/resources/host-groups/{group_id}/hosts/replication endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_host_groups_b7fb2358",
    method: "POST",
    pathTemplate: "/v2/host-groups",
    description: "Request CodeArts Deploy official POST /v2/host-groups endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_host_groups_hosts_40490a2c",
    method: "POST",
    pathTemplate: "/v2/host-groups/{group_id}/hosts",
    description: "Request CodeArts Deploy official POST /v2/host-groups/{group_id}/hosts endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_post_tasks_records_rollback_d29ab9ee",
    method: "POST",
    pathTemplate: "/v2/tasks/{task_id}/records/{record_id}/rollback",
    description: "Request CodeArts Deploy official POST /v2/tasks/{task_id}/records/{record_id}/rollback endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_applications_disable_70260846",
    method: "PUT",
    pathTemplate: "/v1/applications/{app_id}/disable",
    description: "Request CodeArts Deploy official PUT /v1/applications/{app_id}/disable endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_resources_host_groups_38128aaf",
    method: "PUT",
    pathTemplate: "/v1/resources/host-groups/{group_id}",
    description: "Request CodeArts Deploy official PUT /v1/resources/host-groups/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_resources_host_groups_hosts_1ea6aa7d",
    method: "PUT",
    pathTemplate: "/v1/resources/host-groups/{group_id}/hosts/{host_id}",
    description: "Request CodeArts Deploy official PUT /v1/resources/host-groups/{group_id}/hosts/{host_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_host_groups_7e085a2c",
    method: "PUT",
    pathTemplate: "/v2/host-groups/{group_id}",
    description: "Request CodeArts Deploy official PUT /v2/host-groups/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_host_groups_hosts_04148b02",
    method: "PUT",
    pathTemplate: "/v2/host-groups/{group_id}/hosts/{host_id}",
    description: "Request CodeArts Deploy official PUT /v2/host-groups/{group_id}/hosts/{host_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "deploy",
    name: "deploy_put_applications_permissions_8cc45f8d",
    method: "PUT",
    pathTemplate: "/v3/applications/permissions",
    description: "Request CodeArts Deploy official PUT /v3/applications/permissions endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_delete_publisher_delete_57b6ab3b",
    method: "DELETE",
    pathTemplate: "/v1/{domain_id}/publisher/delete",
    description: "Request CodeArts Pipeline official DELETE /v1/{domain_id}/publisher/delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_delete_serviceconnect_endpoints_d941afb3",
    method: "DELETE",
    pathTemplate: "/v1/serviceconnection/endpoints/{uuid}",
    description: "Request CodeArts Pipeline official DELETE /v1/serviceconnection/endpoints/{uuid} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_delete_extension_info_delete_f3fb8463",
    method: "DELETE",
    pathTemplate: "/v3/{domain_id}/extension/info/delete",
    description: "Request CodeArts Pipeline official DELETE /v3/{domain_id}/extension/info/delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_delete_pipelines_f20767fd",
    method: "DELETE",
    pathTemplate: "/v3/pipelines/{pipeline_id}",
    description: "Request CodeArts Pipeline official DELETE /v3/pipelines/{pipeline_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_delete_pac_pipelines_actions_03cf040f",
    method: "DELETE",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/{pipeline_id}/{pipeline_run_id}",
    description: "Request CodeArts Pipeline official DELETE /v6/{domain_id}/api/pac/pipelines/actions/{pipeline_id}/{pipeline_run_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_get_agent_plugin_all_version_8654a68a",
    method: "GET",
    pathTemplate: "/v1/{domain_id}/agent-plugin/all-version",
    description: "Request CodeArts Pipeline official GET /v1/{domain_id}/agent-plugin/all-version endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_extensions_modules_a8b48eb1",
    method: "GET",
    pathTemplate: "/v1/extensions/modules",
    description: "Request CodeArts Pipeline official GET /v1/extensions/modules endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_serviceconnect_oauth_6a592552",
    method: "GET",
    pathTemplate: "/v1/serviceconnection/oauth/authorization_url",
    description: "Request CodeArts Pipeline official GET /v1/serviceconnection/oauth/authorization_url endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_artifact_versions_86f2bf09",
    method: "GET",
    pathTemplate: "/v2/{cloud_project_id}/artifact/versions",
    description: "Request CodeArts Pipeline official GET /v2/{cloud_project_id}/artifact/versions endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_code_branches_2b5b4be7",
    method: "GET",
    pathTemplate: "/v2/{cloud_project_id}/code/branches",
    description: "Request CodeArts Pipeline official GET /v2/{cloud_project_id}/code/branches endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_code_repositories_page_fb58be1c",
    method: "GET",
    pathTemplate: "/v2/{cloud_project_id}/code/repositories/page",
    description: "Request CodeArts Pipeline official GET /v2/{cloud_project_id}/code/repositories/page endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_change_request_oplog_query_2e25ba54",
    method: "GET",
    pathTemplate: "/v2/{cloudProjectId}/change-request/{changeRequestId}/oplog/query",
    description: "Request CodeArts Pipeline official GET /v2/{cloudProjectId}/change-request/{changeRequestId}/oplog/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_change_request_creator_list_7daaa52d",
    method: "GET",
    pathTemplate: "/v2/{cloudProjectId}/change-request/creator/list/search",
    description: "Request CodeArts Pipeline official GET /v2/{cloudProjectId}/change-request/creator/list/search endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_change_request_releasing_query_a4f71756",
    method: "GET",
    pathTemplate: "/v2/{cloudProjectId}/change-request/releasing/query",
    description: "Request CodeArts Pipeline official GET /v2/{cloudProjectId}/change-request/releasing/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_cicd_devuc_auth_query_dea0860d",
    method: "GET",
    pathTemplate: "/v2/{cloudProjectId}/cicd/devuc-auth/query",
    description: "Request CodeArts Pipeline official GET /v2/{cloudProjectId}/cicd/devuc-auth/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_tenant_rule_sets_detail_7774400e",
    method: "GET",
    pathTemplate: "/v2/{domain_id}/tenant/rule-sets/{rule_set_id}/detail",
    description: "Request CodeArts Pipeline official GET /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_tenant_rule_sets_children_3446c018",
    method: "GET",
    pathTemplate: "/v2/{domainId}/tenant/rule-sets/{ruleSetId}/children",
    description: "Request CodeArts Pipeline official GET /v2/{domainId}/tenant/rule-sets/{ruleSetId}/children endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_actions_all_361d529e",
    method: "GET",
    pathTemplate: "/v3/{domain_id}/actions/all",
    description: "Request CodeArts Pipeline official GET /v3/{domain_id}/actions/all endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_actions_detail_32de0964",
    method: "GET",
    pathTemplate: "/v3/{domain_id}/actions/detail",
    description: "Request CodeArts Pipeline official GET /v3/{domain_id}/actions/detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_extension_detail_67d4b676",
    method: "GET",
    pathTemplate: "/v3/{domain_id}/extension/detail",
    description: "Request CodeArts Pipeline official GET /v3/{domain_id}/extension/detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_build_records_eb6191ad",
    method: "GET",
    pathTemplate: "/v3/pipelines/{pipeline_id}/build-records",
    description: "Request CodeArts Pipeline official GET /v3/pipelines/{pipeline_id}/build-records endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_detail_336a1c76",
    method: "GET",
    pathTemplate: "/v3/pipelines/{pipeline_id}/detail",
    description: "Request CodeArts Pipeline official GET /v3/pipelines/{pipeline_id}/detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_status_a6754e16",
    method: "GET",
    pathTemplate: "/v3/pipelines/{pipeline_id}/status",
    description: "Request CodeArts Pipeline official GET /v3/pipelines/{pipeline_id}/status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_build_result_08f2ceb8",
    method: "GET",
    pathTemplate: "/v3/pipelines/build-result",
    description: "Request CodeArts Pipeline official GET /v3/pipelines/build-result endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_status_f2c5bcd6",
    method: "GET",
    pathTemplate: "/v3/pipelines/status",
    description: "Request CodeArts Pipeline official GET /v3/pipelines/status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_templates_31c8ee10",
    method: "GET",
    pathTemplate: "/v3/templates",
    description: "Request CodeArts Pipeline official GET /v3/templates endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_templates_2f79c06e",
    method: "GET",
    pathTemplate: "/v3/templates/{template_id}",
    description: "Request CodeArts Pipeline official GET /v3/templates/{template_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipeline_notices_notice_detail_74f258c0",
    method: "GET",
    pathTemplate: "/v5/{project_id}/api/pipeline-notices/{pipeline_id}/notice/detail",
    description: "Request CodeArts Pipeline official GET /v5/{project_id}/api/pipeline-notices/{pipeline_id}/notice/detail endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipeline_tag_list_07963e31",
    method: "GET",
    pathTemplate: "/v5/{project_id}/api/pipeline-tag/list",
    description: "Request CodeArts Pipeline official GET /v5/{project_id}/api/pipeline-tag/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_pipelines_component_check_8d8d2b91",
    method: "GET",
    pathTemplate: "/v5/{project_id}/api/pipelines/component/check",
    description: "Request CodeArts Pipeline official GET /v5/{project_id}/api/pipelines/component/check endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_dashboard_concurrency_09ee4de3",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/dashboard/concurrency",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/dashboard/concurrency endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_dashboard_executions_overview_6372a9b1",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/dashboard/executions-overview",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/dashboard/executions-overview endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_dashboard_pipeline_count_5c50b2bf",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/dashboard/pipeline-count",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/dashboard/pipeline-count endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_package_specs_count_down_c783c5a1",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/package-specs/count-down",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/package-specs/count-down endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_package_specs_is_freeze_12173619",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/package-specs/is-freeze",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/package-specs/is-freeze endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_package_specs_unauthorized_b14c69ea",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/package-specs/unauthorized-feature",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/package-specs/unauthorized-feature endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_package_specs_usage_0539c634",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/package-specs/usage",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/package-specs/usage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_popup_status_069582cd",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/popup-status",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/popup-status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_project_query_related_project_d93797a4",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/project/query-related-project",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/project/query-related-project endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_whitelist_query_3cc8e969",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/whitelist/query",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/whitelist/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_whitelist_record_visible_days_59bf3825",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/whitelist/record-visible-days",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/whitelist/record-visible-days endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_get_whitelist_repository_number_ec85abf2",
    method: "GET",
    pathTemplate: "/v5/{tenant_id}/api/whitelist/repository-number",
    description: "Request CodeArts Pipeline official GET /v5/{tenant_id}/api/whitelist/repository-number endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "pipeline",
    name: "pipeline_post_agent_plugin_create_f86c47c0",
    method: "POST",
    pathTemplate: "/v1/{domain_id}/agent-plugin/create",
    description: "Request CodeArts Pipeline official POST /v1/{domain_id}/agent-plugin/create endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_publisher_create_cece4f4a",
    method: "POST",
    pathTemplate: "/v1/{domain_id}/publisher/create",
    description: "Request CodeArts Pipeline official POST /v1/{domain_id}/publisher/create endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_publisher_detail_a832d0a3",
    method: "POST",
    pathTemplate: "/v1/{domain_id}/publisher/detail",
    description: "Request CodeArts Pipeline official POST /v1/{domain_id}/publisher/detail endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipeline_change_requests_search_477046ff",
    method: "POST",
    pathTemplate: "/v2/{cloudProjectId}/pipeline/change-requests/search",
    description: "Request CodeArts Pipeline official POST /v2/{cloudProjectId}/pipeline/change-requests/search endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_extension_info_add_3491c6e8",
    method: "POST",
    pathTemplate: "/v3/{domain_id}/extension/info/add",
    description: "Request CodeArts Pipeline official POST /v3/{domain_id}/extension/info/add endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_extension_info_update_8d9358f7",
    method: "POST",
    pathTemplate: "/v3/{domain_id}/extension/info/update",
    description: "Request CodeArts Pipeline official POST /v3/{domain_id}/extension/info/update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_extension_upload_0ab66896",
    method: "POST",
    pathTemplate: "/v3/{domain_id}/extension/upload",
    description: "Request CodeArts Pipeline official POST /v3/{domain_id}/extension/upload endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipeline_templates_list_527190c6",
    method: "POST",
    pathTemplate: "/v3/pipeline/templates/list",
    description: "Request CodeArts Pipeline official POST /v3/pipeline/templates/list endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_stop_b5f0fb89",
    method: "POST",
    pathTemplate: "/v3/pipelines/{pipeline_id}/stop",
    description: "Request CodeArts Pipeline official POST /v3/pipelines/{pipeline_id}/stop endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipeline_templates_create_a5440fe1",
    method: "POST",
    pathTemplate: "/v5/{project_id}/api/pipeline-templates/{template_id}/create-pipeline",
    description: "Request CodeArts Pipeline official POST /v5/{project_id}/api/pipeline-templates/{template_id}/create-pipeline endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_pipeline_runs_list_4e1ace94",
    method: "POST",
    pathTemplate: "/v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/list-legacy",
    description: "Request CodeArts Pipeline official POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/list-legacy endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_webhook_switch_446cf887",
    method: "POST",
    pathTemplate: "/v5/{project_id}/api/pipelines/{pipeline_id}/webhook/switch",
    description: "Request CodeArts Pipeline official POST /v5/{project_id}/api/pipelines/{pipeline_id}/webhook/switch endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_batch_runs_ede5d31a",
    method: "POST",
    pathTemplate: "/v5/{project_id}/api/pipelines/batch-runs",
    description: "Request CodeArts Pipeline official POST /v5/{project_id}/api/pipelines/batch-runs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_callback_run_43c0b817",
    method: "POST",
    pathTemplate: "/v5/{projectId}/pipelines/{pipelineId}/callback-run/{region}",
    description: "Request CodeArts Pipeline official POST /v5/{projectId}/pipelines/{pipelineId}/callback-run/{region} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_webhook_callback_run_f053daab",
    method: "POST",
    pathTemplate: "/v5/{projectId}/pipelines/{pipelineId}/webhook/callback-run/{region}",
    description: "Request CodeArts Pipeline official POST /v5/{projectId}/pipelines/{pipelineId}/webhook/callback-run/{region} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pipelines_check_rights_cd9a0fd6",
    method: "POST",
    pathTemplate: "/v5/{tenant_id}/api/pipelines/check-rights",
    description: "Request CodeArts Pipeline official POST /v5/{tenant_id}/api/pipelines/check-rights endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_run_ea58e731",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/{pipeline_id}/run",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/{pipeline_id}/run endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_d49ac317",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_actors_b5085887",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/actors",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions/actors endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_events_69f81e45",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/events",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions/events endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_rerun_8dcce5b7",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/rerun",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions/rerun endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_run_404c6bc8",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/run",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions/run endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_post_pac_pipelines_actions_yml_bddf3fcd",
    method: "POST",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/actions/yml-register",
    description: "Request CodeArts Pipeline official POST /v6/{domain_id}/api/pac/pipelines/actions/yml-register endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_put_change_request_repos_update_b7a9bcf7",
    method: "PUT",
    pathTemplate: "/v2/{cloudProjectId}/change-request/{changeRequestId}/repos/update",
    description: "Request CodeArts Pipeline official PUT /v2/{cloudProjectId}/change-request/{changeRequestId}/repos/update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_put_change_request_status_update_91e502cc",
    method: "PUT",
    pathTemplate: "/v2/{cloudProjectId}/change-request/{changeRequestId}/status/update",
    description: "Request CodeArts Pipeline official PUT /v2/{cloudProjectId}/change-request/{changeRequestId}/status/update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "pipeline",
    name: "pipeline_put_pac_pipelines_cdba332d",
    method: "PUT",
    pathTemplate: "/v6/{domain_id}/api/pac/pipelines/{pipeline_id}",
    description: "Request CodeArts Pipeline official PUT /v6/{domain_id}/api/pac/pipelines/{pipeline_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_hooks_dbdf3d02",
    method: "DELETE",
    pathTemplate: "/v1/repositories/{group_name}/{repository_name}/hooks/{hook_id}",
    description: "Request CodeArts Repo official DELETE /v1/repositories/{group_name}/{repository_name}/hooks/{hook_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_deploy_keys_f22fb9f9",
    method: "DELETE",
    pathTemplate: "/v1/repositories/{repository_id}/deploy_keys/{key_id}",
    description: "Request CodeArts Repo official DELETE /v1/repositories/{repository_id}/deploy_keys/{key_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_bfe20cec",
    method: "DELETE",
    pathTemplate: "/v1/repositories/{repository_uuid}",
    description: "Request CodeArts Repo official DELETE /v1/repositories/{repository_uuid} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_members_3a8be189",
    method: "DELETE",
    pathTemplate: "/v1/repositories/{repository_uuid}/members/{member_id}",
    description: "Request CodeArts Repo official DELETE /v1/repositories/{repository_uuid}/members/{member_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_deploy_keys_8908f606",
    method: "DELETE",
    pathTemplate: "/v2/repositories/{repository_id}/deploy-keys/{key_id}",
    description: "Request CodeArts Repo official DELETE /v2/repositories/{repository_id}/deploy-keys/{key_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_protected_branches_9d268092",
    method: "DELETE",
    pathTemplate: "/v2/repositories/{repository_id}/protected-branches",
    description: "Request CodeArts Repo official DELETE /v2/repositories/{repository_id}/protected-branches endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_protected_branches_a82a73f5",
    method: "DELETE",
    pathTemplate: "/v2/repositories/{repository_id}/protected-branches/{branch_name}",
    description: "Request CodeArts Repo official DELETE /v2/repositories/{repository_id}/protected-branches/{branch_name} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_protected_tags_cbccfeeb",
    method: "DELETE",
    pathTemplate: "/v2/repositories/{repository_id}/protected-tags/{name}",
    description: "Request CodeArts Repo official DELETE /v2/repositories/{repository_id}/protected-tags/{name} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_groups_hooks_2dc6d4f5",
    method: "DELETE",
    pathTemplate: "/v4/groups/{group_id}/hooks/{hook_id}",
    description: "Request CodeArts Repo official DELETE /v4/groups/{group_id}/hooks/{hook_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_groups_merge_requests_template_ce366152",
    method: "DELETE",
    pathTemplate: "/v4/groups/{group_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official DELETE /v4/groups/{group_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_projects_hooks_edb30d3c",
    method: "DELETE",
    pathTemplate: "/v4/projects/{project_id}/hooks/{hook_id}",
    description: "Request CodeArts Repo official DELETE /v4/projects/{project_id}/hooks/{hook_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_projects_merge_requests_template_1c4a248e",
    method: "DELETE",
    pathTemplate: "/v4/projects/{project_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official DELETE /v4/projects/{project_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_deploy_keys_0eeb6b27",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/deploy-keys/{key_id}",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/deploy-keys/{key_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_hooks_b964e30b",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/hooks/{hook_id}",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/hooks/{hook_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_merge_requests_3f33c4ce",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_protected_branch_b8c28055",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/protected-branch",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/protected-branch endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_protected_tag_74fa6545",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/protected-tag",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/protected-tag endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_repositories_repository_tag_9e91bf60",
    method: "DELETE",
    pathTemplate: "/v4/repositories/{repository_id}/repository/tag",
    description: "Request CodeArts Repo official DELETE /v4/repositories/{repository_id}/repository/tag endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_delete_users_impersonation_bearer_tokens_5fbef924",
    method: "DELETE",
    pathTemplate: "/v4/users/impersonation-bearer-tokens/{impersonation_bearer_token_id}",
    description: "Request CodeArts Repo official DELETE /v4/users/impersonation-bearer-tokens/{impersonation_bearer_token_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_get_projects_repositories_908d7cd5",
    method: "GET",
    pathTemplate: "/v1/projects/{project_uuid}/repositories",
    description: "Request CodeArts Repo official GET /v1/projects/{project_uuid}/repositories endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_commits_00d17315",
    method: "GET",
    pathTemplate: "/v1/repositories/{group_name}/{repository_name}/commits",
    description: "Request CodeArts Repo official GET /v1/repositories/{group_name}/{repository_name}/commits endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_hooks_fd3e1ead",
    method: "GET",
    pathTemplate: "/v1/repositories/{group_name}/{repository_name}/hooks",
    description: "Request CodeArts Repo official GET /v1/repositories/{group_name}/{repository_name}/hooks endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_314ba4f7",
    method: "GET",
    pathTemplate: "/v1/repositories/{repository_uuid}",
    description: "Request CodeArts Repo official GET /v1/repositories/{repository_uuid} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_branch_image_d4fa1be6",
    method: "GET",
    pathTemplate: "/v1/repositories/{repository_uuid}/branch/{branch_name}/image",
    description: "Request CodeArts Repo official GET /v1/repositories/{repository_uuid}/branch/{branch_name}/image endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_members_b8f7e94c",
    method: "GET",
    pathTemplate: "/v1/repositories/{repository_uuid}/members",
    description: "Request CodeArts Repo official GET /v1/repositories/{repository_uuid}/members endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repositories_27ecf7b7",
    method: "GET",
    pathTemplate: "/v2/projects/{project_uuid}/repositories",
    description: "Request CodeArts Repo official GET /v2/projects/{project_uuid}/repositories endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repository_commits_a12d740b",
    method: "GET",
    pathTemplate: "/v2/projects/{repo_id}/repository/commits",
    description: "Request CodeArts Repo official GET /v2/projects/{repo_id}/repository/commits endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repository_commits_9616b2f4",
    method: "GET",
    pathTemplate: "/v2/projects/{repo_id}/repository/commits/{sha}",
    description: "Request CodeArts Repo official GET /v2/projects/{repo_id}/repository/commits/{sha} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repository_commits_diff_9a5c3ba7",
    method: "GET",
    pathTemplate: "/v2/projects/{repo_id}/repository/commits/{sha}/diff",
    description: "Request CodeArts Repo official GET /v2/projects/{repo_id}/repository/commits/{sha}/diff endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repository_files_0fcb416b",
    method: "GET",
    pathTemplate: "/v2/projects/{repo_id}/repository/files/{file_path}",
    description: "Request CodeArts Repo official GET /v2/projects/{repo_id}/repository/files/{file_path} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_repositories_3f986948",
    method: "GET",
    pathTemplate: "/v2/projects/repositories",
    description: "Request CodeArts Repo official GET /v2/projects/repositories endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_merge_request_ce1459de",
    method: "GET",
    pathTemplate: "/v2/repositories/{repository_id}/merge_request/{merge_request_id}",
    description: "Request CodeArts Repo official GET /v2/repositories/{repository_id}/merge_request/{merge_request_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_review_setting_878352e9",
    method: "GET",
    pathTemplate: "/v2/repositories/{repository_id}/review_setting",
    description: "Request CodeArts Repo official GET /v2/repositories/{repository_id}/review_setting endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_cba07848",
    method: "GET",
    pathTemplate: "/v2/repositories/{repository_uuid}",
    description: "Request CodeArts Repo official GET /v2/repositories/{repository_uuid} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_archive_f45a9c24",
    method: "GET",
    pathTemplate: "/v2/repositories/{repository_uuid}/archive",
    description: "Request CodeArts Repo official GET /v2/repositories/{repository_uuid}/archive endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_groups_637449e8",
    method: "GET",
    pathTemplate: "/v4/{project_id}/groups/{group_id}",
    description: "Request CodeArts Repo official GET /v4/{project_id}/groups/{group_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_groups_merge_requests_reviewers_147eb83f",
    method: "GET",
    pathTemplate: "/v4/groups/{group_id}/merge-requests/reviewers",
    description: "Request CodeArts Repo official GET /v4/groups/{group_id}/merge-requests/reviewers endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_groups_permissions_resources_d9409406",
    method: "GET",
    pathTemplate: "/v4/groups/permissions/resources",
    description: "Request CodeArts Repo official GET /v4/groups/permissions/resources endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_merge_requests_reviewers_f04b72e0",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/merge-requests/reviewers",
    description: "Request CodeArts Repo official GET /v4/projects/{project_id}/merge-requests/reviewers endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_projects_usage_3fbfa804",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/usage",
    description: "Request CodeArts Repo official GET /v4/projects/{project_id}/usage endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_e2e_setting_f13c6174",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/e2e-setting",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/e2e-setting endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_management_members_4d816faa",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/management-members",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/management-members endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_merge_requests_conflict_78242a89",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/merge-requests/conflict",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/merge-requests/conflict endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_repository_archive_bb8b1f07",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/repository/archive",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/repository/archive endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_repository_tags_d25d2036",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/repository/tags",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/repository/tags endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_repository_upper_files_74f25ade",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/repository/upper-files-tree",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/repository/upper-files-tree endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_review_setting_36d7fd8c",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/review-setting",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/review-setting endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_repositories_transfer_task_3876f204",
    method: "GET",
    pathTemplate: "/v4/repositories/{repository_id}/transfer-task",
    description: "Request CodeArts Repo official GET /v4/repositories/{repository_id}/transfer-task endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_tenant_setting_a95a3e82",
    method: "GET",
    pathTemplate: "/v4/tenant/setting",
    description: "Request CodeArts Repo official GET /v4/tenant/setting endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_user_gpg_keys_d0754748",
    method: "GET",
    pathTemplate: "/v4/user/gpg-keys",
    description: "Request CodeArts Repo official GET /v4/user/gpg-keys endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_user_recent_push_events_13f7ca44",
    method: "GET",
    pathTemplate: "/v4/user/recent-push-events",
    description: "Request CodeArts Repo official GET /v4/user/recent-push-events endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_get_users_impersonation_bearer_tokens_1cc42a02",
    method: "GET",
    pathTemplate: "/v4/users/impersonation-bearer-tokens",
    description: "Request CodeArts Repo official GET /v4/users/impersonation-bearer-tokens endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "repo",
    name: "repo_post_repository_names_validations_13148e24",
    method: "POST",
    pathTemplate: "/api/v4/repository-names/validations",
    description: "Request CodeArts Repo official POST /api/v4/repository-names/validations endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_repositories_hooks_cf84809a",
    method: "POST",
    pathTemplate: "/v1/repositories/{group_name}/{repository_name}/hooks",
    description: "Request CodeArts Repo official POST /v1/repositories/{group_name}/{repository_name}/hooks endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_projects_repository_commits_4666f0cc",
    method: "POST",
    pathTemplate: "/v2/projects/{repo_id}/repository/commits",
    description: "Request CodeArts Repo official POST /v2/projects/{repo_id}/repository/commits endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_projects_repositories_e143bba0",
    method: "POST",
    pathTemplate: "/v2/projects/repositories",
    description: "Request CodeArts Repo official POST /v2/projects/repositories endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_groups_bc1b5085",
    method: "POST",
    pathTemplate: "/v4/{project_id}/groups",
    description: "Request CodeArts Repo official POST /v4/{project_id}/groups endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_repositories_members_7d2de4d2",
    method: "POST",
    pathTemplate: "/v4/repositories/{repository_id}/members",
    description: "Request CodeArts Repo official POST /v4/repositories/{repository_id}/members endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_repositories_repository_tags_13efa16b",
    method: "POST",
    pathTemplate: "/v4/repositories/{repository_id}/repository/tags",
    description: "Request CodeArts Repo official POST /v4/repositories/{repository_id}/repository/tags endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_post_users_impersonation_bearer_tokens_9c26f145",
    method: "POST",
    pathTemplate: "/v4/users/impersonation-bearer-tokens",
    description: "Request CodeArts Repo official POST /v4/users/impersonation-bearer-tokens endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repositories_branch_protect_1596d582",
    method: "PUT",
    pathTemplate: "/v2/repositories/{repository_id}/branch/{branch_name}/protect",
    description: "Request CodeArts Repo official PUT /v2/repositories/{repository_id}/branch/{branch_name}/protect endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repositories_merge_requests_approval_737afd30",
    method: "PUT",
    pathTemplate: "/v2/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval",
    description: "Request CodeArts Repo official PUT /v2/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_groups_merge_requests_template_d16a20e6",
    method: "PUT",
    pathTemplate: "/v4/groups/{group_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official PUT /v4/groups/{group_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_projects_merge_requests_template_2331d2f8",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official PUT /v4/projects/{project_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repositories_merge_requests_approval_1b256854",
    method: "PUT",
    pathTemplate: "/v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval",
    description: "Request CodeArts Repo official PUT /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repositories_merge_requests_template_0ccdac80",
    method: "PUT",
    pathTemplate: "/v4/repositories/{repository_id}/merge-requests/template/{template_id}",
    description: "Request CodeArts Repo official PUT /v4/repositories/{repository_id}/merge-requests/template/{template_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repositories_transfer_task_f0dc68db",
    method: "PUT",
    pathTemplate: "/v4/repositories/{repository_id}/transfer-task",
    description: "Request CodeArts Repo official PUT /v4/repositories/{repository_id}/transfer-task endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "repo",
    name: "repo_put_repository_123456_permissions_code_bd564ad3",
    method: "PUT",
    pathTemplate: "/v4/repository/123456/permissions/code",
    description: "Request CodeArts Repo official PUT /v4/repository/123456/permissions/code endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_delete_ipdprojectserv_projects_issues_acbf75c4",
    method: "DELETE",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/issues/batch",
    description: "Request CodeArts Req official DELETE /v1/ipdprojectservice/projects/{project_id}/issues/batch endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_feature_set_bb6455f7",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/feature-set/query",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/{project_id}/feature-set/query endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_issues_0e75c908",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/issues/{issue_id}",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/{project_id}/issues/{issue_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_status_a259d134",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/status",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/{project_id}/status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_work_hour_9c39022e",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/work-hour/options",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/{project_id}/work-hour/options endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_workflow_a43840bd",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/workflow-template",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/{project_id}/workflow-template endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_ipd_fc7f9279",
    method: "GET",
    pathTemplate: "/v1/ipdprojectservice/projects/ipd",
    description: "Request CodeArts Req official GET /v1/ipdprojectservice/projects/ipd endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_related_user_all_6efe43c0",
    method: "GET",
    pathTemplate: "/v1/related-user/{project_id}/all",
    description: "Request CodeArts Req official GET /v1/related-user/{project_id}/all endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_ipdprojectserv_projects_issues_28569cef",
    method: "GET",
    pathTemplate: "/v2/ipdprojectservice/projects/{project_id}/issues/{issue_id}",
    description: "Request CodeArts Req official GET /v2/ipdprojectservice/projects/{project_id}/issues/{issue_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_project_template_template_f852c483",
    method: "GET",
    pathTemplate: "/v2/project-template/template",
    description: "Request CodeArts Req official GET /v2/project-template/template endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_projects_templates_4bc3be7e",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/templates",
    description: "Request CodeArts Req official GET /v4/projects/{project_id}/templates endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_iterations_histories_50dc28a3",
    method: "GET",
    pathTemplate: "/v4/iterations/{iteration_id}/histories",
    description: "Request CodeArts Req official GET /v4/iterations/{iteration_id}/histories endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_get_projects_work_hours_type_3579c7c2",
    method: "GET",
    pathTemplate: "/v5/projects/{project_uuid}/work-hours-type",
    description: "Request CodeArts Req official GET /v5/projects/{project_uuid}/work-hours-type endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "req",
    name: "req_post_ipdprojectserv_projects_process_4e60de3e",
    method: "POST",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/process-instances",
    description: "Request CodeArts Req official POST /v1/ipdprojectservice/projects/{project_id}/process-instances endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_post_modules_184bd111",
    method: "POST",
    pathTemplate: "/v2/{module}/modules",
    description: "Request CodeArts Req official POST /v2/{module}/modules endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_post_issues_export_reqs_new_4284f3ab",
    method: "POST",
    pathTemplate: "/v2/issues/export-reqs-new",
    description: "Request CodeArts Req official POST /v2/issues/export-reqs-new endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_post_project_template_template_55a95e36",
    method: "POST",
    pathTemplate: "/v2/project-template/template",
    description: "Request CodeArts Req official POST /v2/project-template/template endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_post_projects_issues_work_hours_bb67e5fa",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/issues/{issue_id}/work-hours",
    description: "Request CodeArts Req official POST /v4/projects/{project_id}/issues/{issue_id}/work-hours endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_put_ipdprojectserv_projects_process_22855e56",
    method: "PUT",
    pathTemplate: "/v1/ipdprojectservice/projects/{project_id}/process-instances/{id}",
    description: "Request CodeArts Req official PUT /v1/ipdprojectservice/projects/{project_id}/process-instances/{id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "req",
    name: "req_put_modules_a155b794",
    method: "PUT",
    pathTemplate: "/v2/{module}/modules",
    description: "Request CodeArts Req official PUT /v2/{module}/modules endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_attask_cancel_favorites_5b682fa3",
    method: "DELETE",
    pathTemplate: "/attask/v1/cancel/favorites/{user}/{task_id}",
    description: "Request CodeArts TestPlan official DELETE /attask/v1/cancel/favorites/{user}/{task_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_gt3_kserver_iterators_issues_772319e9",
    method: "DELETE",
    pathTemplate: "/GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues",
    description: "Request CodeArts TestPlan official DELETE /GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_gt3_kserver_branches_1705d148",
    method: "DELETE",
    pathTemplate: "/GT3KServer/v4/branches/{branch_id}",
    description: "Request CodeArts TestPlan official DELETE /GT3KServer/v4/branches/{branch_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_gt3_kserver_features_4bc87ece",
    method: "DELETE",
    pathTemplate: "/GT3KServer/v4/features/{feature_uri}",
    description: "Request CodeArts TestPlan official DELETE /GT3KServer/v4/features/{feature_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_gt3_kserver_iterators_4896ee26",
    method: "DELETE",
    pathTemplate: "/GT3KServer/v4/iterators/{iterator_id}/testcases/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /GT3KServer/v4/iterators/{iterator_id}/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_gt3_kserver_testcases_batch_20a07696",
    method: "DELETE",
    pathTemplate: "/GT3KServer/v4/testcases/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /GT3KServer/v4/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_basic_aws_b911a425",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/basic-aws",
    description: "Request CodeArts TestPlan official DELETE /v1/{project_id}/basic-aws endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_task_e212ea43",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/task",
    description: "Request CodeArts TestPlan official DELETE /v1/{project_id}/task endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcase_dataset_64a11e07",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/testcase/{case_uri}/dataset/{group_id}",
    description: "Request CodeArts TestPlan official DELETE /v1/{project_id}/testcase/{case_uri}/dataset/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_projects_tasks_45f43e56",
    method: "DELETE",
    pathTemplate: "/v1/projects/{service_id}/tasks",
    description: "Request CodeArts TestPlan official DELETE /v1/projects/{service_id}/tasks endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_basic_aws_a38977d1",
    method: "DELETE",
    pathTemplate: "/v2/{project_id}/basic-aws",
    description: "Request CodeArts TestPlan official DELETE /v2/{project_id}/basic-aws endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_basic_aw_8bd6dfd1",
    method: "DELETE",
    pathTemplate: "/v3/{project_id}/basic-aw/{aw_id}",
    description: "Request CodeArts TestPlan official DELETE /v3/{project_id}/basic-aw/{aw_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcases_5af3dd91",
    method: "DELETE",
    pathTemplate: "/v3/{project_id}/testcases",
    description: "Request CodeArts TestPlan official DELETE /v3/{project_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_project_templates_testcase_bc497e37",
    method: "DELETE",
    pathTemplate: "/v4/{domain_id}/project/templates/{template_uri}/testcase/field/{uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/{domain_id}/project/templates/{template_uri}/testcase/field/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_environmentlab_cb8fe05e",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/environmentlabel",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/environmentlabel endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_iterators_issues_ba8fc59e",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/issues",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/iterators/{iterator_uri}/issues endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_systemconfig_tasktemplate_ids_ac1a1955",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/systemconfig/tasktemplateIds",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/systemconfig/tasktemplateIds endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_tasks_testcases_batch_delete_3553d8c9",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/tasks/testcases/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/tasks/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcase_field_e8dc219d",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/testcase/field/{uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/testcase/field/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_versions_custom_reports_3306cb33",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/custom-reports/{report_uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/versions/{version_uri}/custom-reports/{report_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_versions_custom_template_bbce9348",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/custom-template/{template_uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/{project_id}/versions/{version_uri}/custom-template/{template_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_branches_0d52d4cc",
    method: "DELETE",
    pathTemplate: "/v4/branches/{branch_uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/branches/{branch_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_branches_batch_delete_eb5dff10",
    method: "DELETE",
    pathTemplate: "/v4/branches/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /v4/branches/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_features_49be8133",
    method: "DELETE",
    pathTemplate: "/v4/features/{feature_uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/features/{feature_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_iterators_7e98a6a8",
    method: "DELETE",
    pathTemplate: "/v4/iterators/{iterator_uri}",
    description: "Request CodeArts TestPlan official DELETE /v4/iterators/{iterator_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_iterators_testcases_batch_17e0e08c",
    method: "DELETE",
    pathTemplate: "/v4/iterators/{iterator_uri}/testcases/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /v4/iterators/{iterator_uri}/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_projects_services_26799f59",
    method: "DELETE",
    pathTemplate: "/v4/projects/{project_id}/services/{service_id}",
    description: "Request CodeArts TestPlan official DELETE /v4/projects/{project_id}/services/{service_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_projects_user_defined_configs_99822e17",
    method: "DELETE",
    pathTemplate: "/v4/projects/{project_id}/user-defined-configs/{config_id}",
    description: "Request CodeArts TestPlan official DELETE /v4/projects/{project_id}/user-defined-configs/{config_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcases_relations_c1975d83",
    method: "DELETE",
    pathTemplate: "/v4/testcases/{case_uri}/relations",
    description: "Request CodeArts TestPlan official DELETE /v4/testcases/{case_uri}/relations endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcases_batch_delete_ignore_3b3a6758",
    method: "DELETE",
    pathTemplate: "/v4/testcases/batch-delete/ignore/relation",
    description: "Request CodeArts TestPlan official DELETE /v4/testcases/batch-delete/ignore/relation endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_delete_testcases_review_batch_delete_bcced863",
    method: "DELETE",
    pathTemplate: "/v4/testcases/review/batch-delete",
    description: "Request CodeArts TestPlan official DELETE /v4/testcases/review/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_get_gt3_kserver_test_types_23fb6b10",
    method: "GET",
    pathTemplate: "/GT3KServer/v4/{project_id}/test-types",
    description: "Request CodeArts TestPlan official GET /GT3KServer/v4/{project_id}/test-types endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_gt3_kserver_disclaimer_ec4fefc9",
    method: "GET",
    pathTemplate: "/GT3KServer/v4/disclaimer",
    description: "Request CodeArts TestPlan official GET /GT3KServer/v4/disclaimer endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_gt3_kserver_domain_info_bce94789",
    method: "GET",
    pathTemplate: "/GT3KServer/v4/domain/info",
    description: "Request CodeArts TestPlan official GET /GT3KServer/v4/domain/info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_gt3_kserver_testcases_53a29840",
    method: "GET",
    pathTemplate: "/GT3KServer/v4/testcases/{testcase_id}",
    description: "Request CodeArts TestPlan official GET /GT3KServer/v4/testcases/{testcase_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_script_filerouter_ed7a89de",
    method: "GET",
    pathTemplate: "/script/v1/filerouter",
    description: "Request CodeArts TestPlan official GET /script/v1/filerouter endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_script_script_get_progress_0595f6c2",
    method: "GET",
    pathTemplate: "/script/v1/script/getProgress/{progressUri}",
    description: "Request CodeArts TestPlan official GET /script/v1/script/getProgress/{progressUri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testreport_progress_c42721fc",
    method: "GET",
    pathTemplate: "/testreport/v4/progress/{operation_uri}",
    description: "Request CodeArts TestPlan official GET /testreport/v4/progress/{operation_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testreport_versions_custom_96fe8729",
    method: "GET",
    pathTemplate: "/testreport/v5/{project_id}/versions/{version_id}/custom-reports",
    description: "Request CodeArts TestPlan official GET /testreport/v5/{project_id}/versions/{version_id}/custom-reports endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_service_config_2e7fc266",
    method: "GET",
    pathTemplate: "/v1/{project_id}/service/config",
    description: "Request CodeArts TestPlan official GET /v1/{project_id}/service/config endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_templates_1a4fb352",
    method: "GET",
    pathTemplate: "/v1/{project_id}/templates",
    description: "Request CodeArts TestPlan official GET /v1/{project_id}/templates endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_echotest_concurrency_status_8e0f2af4",
    method: "GET",
    pathTemplate: "/v1/echotest/concurrency/status",
    description: "Request CodeArts TestPlan official GET /v1/echotest/concurrency/status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_progress_812a95d9",
    method: "GET",
    pathTemplate: "/v1/progress/{id}",
    description: "Request CodeArts TestPlan official GET /v1/progress/{id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_project_9c01db4d",
    method: "GET",
    pathTemplate: "/v1/project/{project_id}",
    description: "Request CodeArts TestPlan official GET /v1/project/{project_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_task_export_ad37ea3b",
    method: "GET",
    pathTemplate: "/v1/projects/{service_id}/task/{task_id}/export",
    description: "Request CodeArts TestPlan official GET /v1/projects/{service_id}/task/{task_id}/export endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_testcase_history_35cbe2fd",
    method: "GET",
    pathTemplate: "/v2/projects/{project_id}/testcase-history",
    description: "Request CodeArts TestPlan official GET /v2/projects/{project_id}/testcase-history endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_testsuite_history_56f9e33a",
    method: "GET",
    pathTemplate: "/v2/projects/{project_id}/testsuite-history",
    description: "Request CodeArts TestPlan official GET /v2/projects/{project_id}/testsuite-history endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_basic_aw_variable_659461eb",
    method: "GET",
    pathTemplate: "/v3/{project_id}/basic-aw/{aw_id}/variable",
    description: "Request CodeArts TestPlan official GET /v3/{project_id}/basic-aw/{aw_id}/variable endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testcase_1906b2c4",
    method: "GET",
    pathTemplate: "/v3/{project_id}/testcase/{tmss_case_uri}",
    description: "Request CodeArts TestPlan official GET /v3/{project_id}/testcase/{tmss_case_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_project_templates_a2ac4219",
    method: "GET",
    pathTemplate: "/v4/{domain_id}/project/templates",
    description: "Request CodeArts TestPlan official GET /v4/{domain_id}/project/templates endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_basic_aw_b0f68349",
    method: "GET",
    pathTemplate: "/v4/{project_id}/basic-aw/{aw_id}",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/basic-aw/{aw_id} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_environmentlab_7ad74aab",
    method: "GET",
    pathTemplate: "/v4/{project_id}/environmentlabel/{label_uri}",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/environmentlabel/{label_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_environmentlab_list_a96dbbf6",
    method: "GET",
    pathTemplate: "/v4/{project_id}/environmentlabel/list",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/environmentlabel/list endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_image_29e1efdf",
    method: "GET",
    pathTemplate: "/v4/{project_id}/image/{parent}/{sub}/{file_name}/{file_type}",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/image/{parent}/{sub}/{file_name}/{file_type} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_industry_types_f39cc118",
    method: "GET",
    pathTemplate: "/v4/{project_id}/industry-types",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/industry-types endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_iterators_case_uris_3fc77552",
    method: "GET",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/case-uris",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/iterators/{iterator_uri}/case-uris endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_resources_attachments_a7dd87d9",
    method: "GET",
    pathTemplate: "/v4/{project_id}/resources/{resource_uri}/attachments",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/resources/{resource_uri}/attachments endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_resources_exist_3b5aca94",
    method: "GET",
    pathTemplate: "/v4/{project_id}/resources/{resource_uri}/exist",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/resources/{resource_uri}/exist endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_tasks_22883f59",
    method: "GET",
    pathTemplate: "/v4/{project_id}/tasks/{task_uri}",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/tasks/{task_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_test_reports_83613ccd",
    method: "GET",
    pathTemplate: "/v4/{project_id}/test-reports",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/test-reports endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testcase_722c415e",
    method: "GET",
    pathTemplate: "/v4/{project_id}/testcase/{tmss_case_uri}",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/testcase/{tmss_case_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testcases_relation_options_981de9fa",
    method: "GET",
    pathTemplate: "/v4/{project_id}/testcases/relation/options",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/testcases/relation/options endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_versions_rule_check_tasks_summary_0ad49710",
    method: "GET",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/rule-check/tasks/{task_uri}/summary",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/versions/{version_uri}/rule-check/tasks/{task_uri}/summary endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_workitem_iterators_3c53c7bd",
    method: "GET",
    pathTemplate: "/v4/{project_id}/workitem/{workitem_id}/iterators",
    description: "Request CodeArts TestPlan official GET /v4/{project_id}/workitem/{workitem_id}/iterators endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_versions_progress_reports_cd561f28",
    method: "GET",
    pathTemplate: "/v4/{project_uuid}/versions/{version_uri}/progress-reports",
    description: "Request CodeArts TestPlan official GET /v4/{project_uuid}/versions/{version_uri}/progress-reports endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_domain_template_resource_number_051238ee",
    method: "GET",
    pathTemplate: "/v4/domain/{domain_id}/template/{template_uri}/resource-number-rule",
    description: "Request CodeArts TestPlan official GET /v4/domain/{domain_id}/template/{template_uri}/resource-number-rule endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_domain_detail_info_827ff951",
    method: "GET",
    pathTemplate: "/v4/domain/detail-info",
    description: "Request CodeArts TestPlan official GET /v4/domain/detail-info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_domain_need_popup_e94e1743",
    method: "GET",
    pathTemplate: "/v4/domain/need-popup",
    description: "Request CodeArts TestPlan official GET /v4/domain/need-popup endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_domain_tmss_portal_bef93c30",
    method: "GET",
    pathTemplate: "/v4/domain/tmss-portal",
    description: "Request CodeArts TestPlan official GET /v4/domain/tmss-portal endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_progress_94fe0677",
    method: "GET",
    pathTemplate: "/v4/progress/{operation_uri}",
    description: "Request CodeArts TestPlan official GET /v4/progress/{operation_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_progress_testimport_c3423f51",
    method: "GET",
    pathTemplate: "/v4/progress/{operation_uri}/testimport",
    description: "Request CodeArts TestPlan official GET /v4/progress/{operation_uri}/testimport endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_domain_detail_info_9b285a73",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/domain/detail-info",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/domain/detail-info endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_feature_statuses_4fa346da",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/feature-statuses",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/feature-statuses endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_notice_migrate_03dac626",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/notice/migrate",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/notice/migrate endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_testcases_2315f6e2",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/testcases/{testcase_uri}",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/testcases/{testcase_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_ticket_e03318cb",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/ticket",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/ticket endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_workitem_status_625a720b",
    method: "GET",
    pathTemplate: "/v4/projects/{project_id}/workitem/status",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_id}/workitem/status endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_filters_3c0d1ee1",
    method: "GET",
    pathTemplate: "/v4/projects/{project_uuid}/filters",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_uuid}/filters endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_projects_user_defined_configs_8c3cb65d",
    method: "GET",
    pathTemplate: "/v4/projects/{project_uuid}/user-defined-configs",
    description: "Request CodeArts TestPlan official GET /v4/projects/{project_uuid}/user-defined-configs endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_service_offering_578fd980",
    method: "GET",
    pathTemplate: "/v4/service/offering",
    description: "Request CodeArts TestPlan official GET /v4/service/offering endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_systemconfig_tasktemplate_18a627b1",
    method: "GET",
    pathTemplate: "/v4/systemconfig/tasktemplate",
    description: "Request CodeArts TestPlan official GET /v4/systemconfig/tasktemplate endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_tasks_execution_parameters_34f6c038",
    method: "GET",
    pathTemplate: "/v4/tasks/{task_uri}/execution-parameters",
    description: "Request CodeArts TestPlan official GET /v4/tasks/{task_uri}/execution-parameters endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_testhub_projects_tasks_07b47cb6",
    method: "GET",
    pathTemplate: "/v4/testhub/projects/{project_id}/tasks/{task_uri}",
    description: "Request CodeArts TestPlan official GET /v4/testhub/projects/{project_id}/tasks/{task_uri} endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_get_versions_custom_reports_02bfc6cc",
    method: "GET",
    pathTemplate: "/v5/{project_id}/versions/{version_uri}/custom-reports",
    description: "Request CodeArts TestPlan official GET /v5/{project_id}/versions/{version_uri}/custom-reports endpoint through a dedicated MCP tool",
    write: false
  },
  {
    family: "testplan",
    name: "testplan_post_attask_add_favorites_ff941f1b",
    method: "POST",
    pathTemplate: "/attask/v1/add/favorites",
    description: "Request CodeArts TestPlan official POST /attask/v1/add/favorites endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_group_re_execution_9bf8d6c2",
    method: "POST",
    pathTemplate: "/attask/v1/task-group/re-execution",
    description: "Request CodeArts TestPlan official POST /attask/v1/task-group/re-execution endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_cloudtest_delete_095c75dd",
    method: "POST",
    pathTemplate: "/attask/v1/task/cloudtest/deleteTaskModel",
    description: "Request CodeArts TestPlan official POST /attask/v1/task/cloudtest/deleteTaskModel endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_cloudtest_query_task_b484e620",
    method: "POST",
    pathTemplate: "/attask/v1/task/cloudtest/queryTaskCaseDetail",
    description: "Request CodeArts TestPlan official POST /attask/v1/task/cloudtest/queryTaskCaseDetail endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_execution_logs_0a6f0c28",
    method: "POST",
    pathTemplate: "/attask/v1/task/execution/logs",
    description: "Request CodeArts TestPlan official POST /attask/v1/task/execution/logs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_query_favorites_ce2532ff",
    method: "POST",
    pathTemplate: "/attask/v1/task/query/favorites",
    description: "Request CodeArts TestPlan official POST /attask/v1/task/query/favorites endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_task_testcase_export_b397207b",
    method: "POST",
    pathTemplate: "/attask/v1/task/testcaseExport",
    description: "Request CodeArts TestPlan official POST /attask/v1/task/testcaseExport endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_taskgroup_copy_8001b983",
    method: "POST",
    pathTemplate: "/attask/v1/taskgroup/copy",
    description: "Request CodeArts TestPlan official POST /attask/v1/taskgroup/copy endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_ticc_teps_by_group_6a77f3bd",
    method: "POST",
    pathTemplate: "/attask/v1/ticc/tepsByGroup/{serviceId}",
    description: "Request CodeArts TestPlan official POST /attask/v1/ticc/tepsByGroup/{serviceId} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_attask_taskmodel_execution_433f11c2",
    method: "POST",
    pathTemplate: "/attask/v3/taskmodel/execution",
    description: "Request CodeArts TestPlan official POST /attask/v3/taskmodel/execution endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_config_systemconfig_tasktemplate_a52c167f",
    method: "POST",
    pathTemplate: "/config/v2/systemconfig/tasktemplate",
    description: "Request CodeArts TestPlan official POST /config/v2/systemconfig/tasktemplate endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_config_systemconfig_tasktemplate_4548d599",
    method: "POST",
    pathTemplate: "/config/v2/systemconfig/tasktemplate/tasktemplateids",
    description: "Request CodeArts TestPlan official POST /config/v2/systemconfig/tasktemplate/tasktemplateids endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_iterators_issues_56cf3bd4",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_iterators_issues_e3902372",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues/batch-query",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/iterators/{iterator_id}/issues/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_testcases_comments_ea7f0eb5",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/testcases/{testcase_id}/comments",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/testcases/{testcase_id}/comments endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_testcases_tasks_aabec445",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/testcases/tasks/batch-query",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/testcases/tasks/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_versions_custom_8c2a8aa6",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/versions/{version_id}/custom-reports",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/versions/{version_id}/custom-reports endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_versions_issue_tree_caa1cee4",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/versions/{version_id}/issue-tree",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/versions/{version_id}/issue-tree endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_versions_tasks_batch_48b12cb9",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/{project_id}/versions/{version_id}/tasks/batch-query",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/{project_id}/versions/{version_id}/tasks/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_branches_58fa8611",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/branches",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/branches endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_features_76fbfbd8",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/features",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/features endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_iterators_5112a271",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/iterators",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/iterators endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_iterators_testcases_358f37de",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/iterators/{iterator_id}/testcases/batch-add",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/iterators/{iterator_id}/testcases/batch-add endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_iterators_batch_9e0e2a59",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/iterators/batch-query",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/iterators/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_testcases_batch_add_344485cf",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/testcases/batch-add",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/testcases/batch-add endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_gt3_kserver_versions_testcases_752534ea",
    method: "POST",
    pathTemplate: "/GT3KServer/v4/versions/{version_id}/testcases",
    description: "Request CodeArts TestPlan official POST /GT3KServer/v4/versions/{version_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testreport_versions_requirements_41720607",
    method: "POST",
    pathTemplate: "/testreport/v4/{project_id}/versions/{version_id}/requirements/overview",
    description: "Request CodeArts TestPlan official POST /testreport/v4/{project_id}/versions/{version_id}/requirements/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testreport_versions_requirements_7510d10c",
    method: "POST",
    pathTemplate: "/testreport/v5/{project_id}/versions/{version_id}/requirements/overview",
    description: "Request CodeArts TestPlan official POST /testreport/v5/{project_id}/versions/{version_id}/requirements/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_asset_tree_667ba716",
    method: "POST",
    pathTemplate: "/v1/{project_id}/asset-tree/{asset_id}/{parent_id}",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/asset-tree/{asset_id}/{parent_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_asset_export_0752d3bb",
    method: "POST",
    pathTemplate: "/v1/{project_id}/asset/{asset_id}/export",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/asset/{asset_id}/export endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_asset_import_f0755636",
    method: "POST",
    pathTemplate: "/v1/{project_id}/asset/{asset_id}/import",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/asset/{asset_id}/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_basic_aw_c981e33f",
    method: "POST",
    pathTemplate: "/v1/{project_id}/basic-aw",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/basic-aw endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_basic_aw_refresh_to_all_filter_1e204171",
    method: "POST",
    pathTemplate: "/v1/{project_id}/basic-aw/refresh-to-all/filter",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/basic-aw/refresh-to-all/filter endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_casehistory_dataset_cc317e94",
    method: "POST",
    pathTemplate: "/v1/{project_id}/casehistory/dataset/{task_id}/{case_uri}",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/casehistory/dataset/{task_id}/{case_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_dns_mapping_c9d8964d",
    method: "POST",
    pathTemplate: "/v1/{project_id}/dns-mapping",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/dns-mapping endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_issues_testcases_batch_query_47abe3ff",
    method: "POST",
    pathTemplate: "/v1/{project_id}/issues/testcases/batch-query",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/issues/testcases/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_local_config_d4e7e957",
    method: "POST",
    pathTemplate: "/v1/{project_id}/local/{property}/config",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/local/{property}/config endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_notice_config_notice_b61486da",
    method: "POST",
    pathTemplate: "/v1/{project_id}/notice_config/notice",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/notice_config/notice endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_service_config_303b634f",
    method: "POST",
    pathTemplate: "/v1/{project_id}/service/config",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/service/config endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_dataset_19f22fe7",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcase/{case_uri}/dataset/{group_id}",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/testcase/{case_uri}/dataset/{group_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_histories_batch_query_5ede72d8",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcases/{testcase_id}/histories/batch-query",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/testcases/{testcase_id}/histories/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_update_aw_name_view_ca536325",
    method: "POST",
    pathTemplate: "/v1/{project_id}/update_awName_view",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/update_awName_view endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_update_time_out_view_832c4ae8",
    method: "POST",
    pathTemplate: "/v1/{project_id}/update_timeOut_view",
    description: "Request CodeArts TestPlan official POST /v1/{project_id}/update_timeOut_view endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_c7e187ea",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}",
    description: "Request CodeArts TestPlan official POST /v1/projects/{project_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_plans_c6553c30",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/plans",
    description: "Request CodeArts TestPlan official POST /v1/projects/{project_id}/plans endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_plans_testcases_batch_feede5a6",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/plans/{plan_id}/testcases/batch-add",
    description: "Request CodeArts TestPlan official POST /v1/projects/{project_id}/plans/{plan_id}/testcases/batch-add endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_testcases_395afe3c",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/testcases",
    description: "Request CodeArts TestPlan official POST /v1/projects/{project_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_testcases_batch_delete_ab351c4d",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/testcases/batch-delete",
    description: "Request CodeArts TestPlan official POST /v1/projects/{project_id}/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_alert_group_users_8a5c4ecd",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/alert/group/users",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/alert/group/users endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_dashboards_alarm_81f6f1db",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/dashboards/alarm/statistics",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/dashboards/alarm/statistics endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_service_configs_b1d15849",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/service/configs",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/service/configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_task_export_523d5ca2",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/task/{task_id}/export",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/task/{task_id}/export endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_task_settings_c36eb8dd",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/task/settings",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/task/settings endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_tasks_import_a358d038",
    method: "POST",
    pathTemplate: "/v1/projects/{service_id}/tasks/import",
    description: "Request CodeArts TestPlan official POST /v1/projects/{service_id}/tasks/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_services_13bd29aa",
    method: "POST",
    pathTemplate: "/v1/services",
    description: "Request CodeArts TestPlan official POST /v1/services endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_basic_aw_87eca834",
    method: "POST",
    pathTemplate: "/v2/{project_id}/basic-aw",
    description: "Request CodeArts TestPlan official POST /v2/{project_id}/basic-aw endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_templates_d960adb1",
    method: "POST",
    pathTemplate: "/v2/{project_id}/templates",
    description: "Request CodeArts TestPlan official POST /v2/{project_id}/templates endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_3a2a7956",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcase",
    description: "Request CodeArts TestPlan official POST /v2/{project_id}/testcase endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_dashboards_alarm_msgs_7c4c70ef",
    method: "POST",
    pathTemplate: "/v2/projects/{service_id}/dashboards/alarm/msgs",
    description: "Request CodeArts TestPlan official POST /v2/projects/{service_id}/dashboards/alarm/msgs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_dashboards_lines_476131a0",
    method: "POST",
    pathTemplate: "/v2/projects/{service_id}/dashboards/lines",
    description: "Request CodeArts TestPlan official POST /v2/projects/{service_id}/dashboards/lines endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_dashboards_scatters_46b22d74",
    method: "POST",
    pathTemplate: "/v2/projects/{service_id}/dashboards/scatters",
    description: "Request CodeArts TestPlan official POST /v2/projects/{service_id}/dashboards/scatters endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_basic_aw_copy_68f068be",
    method: "POST",
    pathTemplate: "/v3/{project_id}/basic-aw/{aw_id}/copy",
    description: "Request CodeArts TestPlan official POST /v3/{project_id}/basic-aw/{aw_id}/copy endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_74efd919",
    method: "POST",
    pathTemplate: "/v3/{project_id}/testcase",
    description: "Request CodeArts TestPlan official POST /v3/{project_id}/testcase endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_3e3c6e85",
    method: "POST",
    pathTemplate: "/v3/{project_id}/testcases",
    description: "Request CodeArts TestPlan official POST /v3/{project_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_hutaf_ticc_tm_task_objs_87d70f03",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/task-objs/favorites/summary",
    description: "Request CodeArts TestPlan official POST /v3/hutaf-ticc/tm/task-objs/favorites/summary endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_hutaf_ticc_tm_tasks_testcase_6fb75933",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/tasks/testcase_blocks/process",
    description: "Request CodeArts TestPlan official POST /v3/hutaf-ticc/tm/tasks/testcase_blocks/process endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_hutaf_ticc_tm_tep_agent_deploy_5000a2bc",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/tep-agent/deploy-package/download",
    description: "Request CodeArts TestPlan official POST /v3/hutaf-ticc/tm/tep-agent/deploy-package/download endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_hutaf_ticc_tm_tep_agent_deploy_ae6ca343",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/tep-agent/deploy-package/progress",
    description: "Request CodeArts TestPlan official POST /v3/hutaf-ticc/tm/tep-agent/deploy-package/progress endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_hutaf_ticc_tm_teps_actions_batch_3a952795",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/teps/actions/batch/delete",
    description: "Request CodeArts TestPlan official POST /v3/hutaf-ticc/tm/teps/actions/batch/delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_project_templates_field_configs_3e635dee",
    method: "POST",
    pathTemplate: "/v4/{domain_id}/project/templates/{template_uri}/field-configs/refresh",
    description: "Request CodeArts TestPlan official POST /v4/{domain_id}/project/templates/{template_uri}/field-configs/refresh endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_project_templates_testcase_field_e0bceb41",
    method: "POST",
    pathTemplate: "/v4/{domain_id}/project/templates/{template_uri}/testcase/field",
    description: "Request CodeArts TestPlan official POST /v4/{domain_id}/project/templates/{template_uri}/testcase/field endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_batch_add_automatic_testcases_188207e8",
    method: "POST",
    pathTemplate: "/v4/{project_id}/batch/add/automatic/testcases",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/batch/add/automatic/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_environmentlab_63510b3f",
    method: "POST",
    pathTemplate: "/v4/{project_id}/environmentlabel",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/environmentlabel endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterator_copy_58b8c27c",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterator/{iterator_uri}/copy",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterator/{iterator_uri}/copy endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_defects_batch_query_3566a014",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/defects/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/defects/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_issues_a73764eb",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/issues",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/issues endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_issues_batch_query_77ec3a29",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/issues/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/issues/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_issues_query_tree_0a68ab8e",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/issues/query-tree",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/issues/query-tree endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_testcases_batch_query_0be7c57d",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/testcases/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/testcases/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_testcases_issues_batch_fbf37e8a",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/testcases/issues/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/testcases/issues/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_testcases_nonexistent_ac47623f",
    method: "POST",
    pathTemplate: "/v4/{project_id}/iterators/{iterator_uri}/testcases/nonexistent",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/iterators/{iterator_uri}/testcases/nonexistent endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_resource_number_rule_6538d3a8",
    method: "POST",
    pathTemplate: "/v4/{project_id}/resource-number-rule",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/resource-number-rule endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_resource_pools_ef1c720d",
    method: "POST",
    pathTemplate: "/v4/{project_id}/resource-pools",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/resource-pools endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_resource_uri_9f59c6a2",
    method: "POST",
    pathTemplate: "/v4/{project_id}/resource-uri",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/resource-uri endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_tasks_results_847a36cd",
    method: "POST",
    pathTemplate: "/v4/{project_id}/tasks/{task_uri}/results",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/tasks/{task_uri}/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_tasks_start_51a08d12",
    method: "POST",
    pathTemplate: "/v4/{project_id}/tasks/{task_uri}/start",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/tasks/{task_uri}/start endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_tasks_stop_4a2d5c07",
    method: "POST",
    pathTemplate: "/v4/{project_id}/tasks/{task_uri}/stop",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/tasks/{task_uri}/stop endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_d3c7445c",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcase",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/testcase endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_field_f8376cc2",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcase/field",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/testcase/field endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_8033d790",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcases",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_batch_query_b79fb568",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcases/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/testcases/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_tasks_batch_query_40a326e4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcases/tasks/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/testcases/tasks/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_custom_template_0638fb7f",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/custom-template",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/custom-template endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_defects_batch_query_d52bbd36",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/defects/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/defects/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_execute_results_batch_6638b552",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/execute/results/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/execute/results/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_reports_37847d74",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/reports",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/reports endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_rule_check_cfc2c55d",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/rule-check",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/rule-check endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_task_testcases_results_fb201ab4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/task/testcases/results",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/task/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_test_reports_custom_146589c7",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/test-reports/{report_uri}/custom-infos",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/test-reports/{report_uri}/custom-infos endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_results_init_b25f81f0",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/{case_uri}/results/init",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/{case_uri}/results/init endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_stop_8faac47d",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/{case_uri}/stop",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/{case_uri}/stop endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_batch_execute_cec56165",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/batch-execute",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/batch-execute endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_export_c8fae740",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/export",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/export endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_import_c6003971",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/import",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_result_import_94f1ec27",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/testcases/result/import",
    description: "Request CodeArts TestPlan official POST /v4/{project_id}/versions/{version_uri}/testcases/result/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_branch_testcases_plans_d5364132",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/branch/{branch_uri}/testcases/plans",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/branch/{branch_uri}/testcases/plans endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_error_testcases_export_d11ab3aa",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/error-testcases/export",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/error-testcases/export endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_templates_download_006d8015",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/templates/download",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/templates/download endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_templates_testresult_download_01e7d829",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/templates/testresult/download",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/templates/testresult/download endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_progress_reports_b55813c8",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/versions/{version_uri}/progress-reports",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/versions/{version_uri}/progress-reports endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_results_d5c947fe",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/versions/{version_uri}/testcases/{case_uri}/results",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/versions/{version_uri}/testcases/{case_uri}/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_results_8c10ab7c",
    method: "POST",
    pathTemplate: "/v4/{project_uuid}/versions/{version_uri}/testcases/results",
    description: "Request CodeArts TestPlan official POST /v4/{project_uuid}/versions/{version_uri}/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_branches_1a2a3a2a",
    method: "POST",
    pathTemplate: "/v4/branches",
    description: "Request CodeArts TestPlan official POST /v4/branches endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_branches_testcases_import_2fa585fa",
    method: "POST",
    pathTemplate: "/v4/branches/{branch_uri}/testcases/import",
    description: "Request CodeArts TestPlan official POST /v4/branches/{branch_uri}/testcases/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_branches_testcases_merge_6c32e308",
    method: "POST",
    pathTemplate: "/v4/branches/{branch_uri}/testcases/merge",
    description: "Request CodeArts TestPlan official POST /v4/branches/{branch_uri}/testcases/merge endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_domain_template_resource_number_c50db3a5",
    method: "POST",
    pathTemplate: "/v4/domain/{domain_id}/template/{template_uri}/resource-number-rule",
    description: "Request CodeArts TestPlan official POST /v4/domain/{domain_id}/template/{template_uri}/resource-number-rule endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_features_f31834ec",
    method: "POST",
    pathTemplate: "/v4/features",
    description: "Request CodeArts TestPlan official POST /v4/features endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_010f803a",
    method: "POST",
    pathTemplate: "/v4/iterators",
    description: "Request CodeArts TestPlan official POST /v4/iterators endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_testcases_batch_add_0b99e607",
    method: "POST",
    pathTemplate: "/v4/iterators/{iterator_uri}/testcases/batch-add",
    description: "Request CodeArts TestPlan official POST /v4/iterators/{iterator_uri}/testcases/batch-add endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_iterators_info_batch_query_0e4542c1",
    method: "POST",
    pathTemplate: "/v4/iterators/info/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/iterators/info/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_project_branch_testcases_import_e0c04368",
    method: "POST",
    pathTemplate: "/v4/project/{project_uuid}/branch/{branch_uri}/testcases/import",
    description: "Request CodeArts TestPlan official POST /v4/project/{project_uuid}/branch/{branch_uri}/testcases/import endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_project_demo_a5ce52ed",
    method: "POST",
    pathTemplate: "/v4/project/{project_uuid}/demo/{demo_type}",
    description: "Request CodeArts TestPlan official POST /v4/project/{project_uuid}/demo/{demo_type} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_project_harmony_demo_7af44818",
    method: "POST",
    pathTemplate: "/v4/project/{project_uuid}/harmony/demo",
    description: "Request CodeArts TestPlan official POST /v4/project/{project_uuid}/harmony/demo endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_data_aging_config_4b94727b",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/data-aging-config",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/data-aging-config endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_field_configs_option_e213951d",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/field-configs/option-value/used",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/field-configs/option-value/used endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_field_configs_refresh_575cad34",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/field-configs/refresh",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/field-configs/refresh endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_field_configs_used_a25678f7",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/field-configs/used",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/field-configs/used endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_home_overview_2509f0d2",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/home/overview",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/home/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_report_overview_764a836b",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/report/overview",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/report/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_service_types_overview_62f3a718",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/service-types/overview",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/service-types/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_services_b0ede398",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/services",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/services endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_services_ba269114",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/services/{service_id}/{repo}",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/services/{service_id}/{repo} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_user_defined_configs_675c8cea",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/user-defined-configs/refresh",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_id}/user-defined-configs/refresh endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_filters_1a2339a3",
    method: "POST",
    pathTemplate: "/v4/projects/{project_uuid}/filters",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_uuid}/filters endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_synctestcases_0779f0f3",
    method: "POST",
    pathTemplate: "/v4/projects/{project_uuid}/synctestcases",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_uuid}/synctestcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_synctestcasesp_74595690",
    method: "POST",
    pathTemplate: "/v4/projects/{project_uuid}/synctestcasesprocess",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_uuid}/synctestcasesprocess endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_user_defined_configs_1d11d88f",
    method: "POST",
    pathTemplate: "/v4/projects/{project_uuid}/user-defined-configs",
    description: "Request CodeArts TestPlan official POST /v4/projects/{project_uuid}/user-defined-configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_projects_member_34295699",
    method: "POST",
    pathTemplate: "/v4/projects/member",
    description: "Request CodeArts TestPlan official POST /v4/projects/member endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_recycle_039c5c9e",
    method: "POST",
    pathTemplate: "/v4/recycle",
    description: "Request CodeArts TestPlan official POST /v4/recycle endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_recycle_1513f6b6",
    method: "POST",
    pathTemplate: "/v4/recycle/{uri}",
    description: "Request CodeArts TestPlan official POST /v4/recycle/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_resources_histories_batch_query_6e6ef734",
    method: "POST",
    pathTemplate: "/v4/resources/{resource_uri}/histories/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/resources/{resource_uri}/histories/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_systemconfig_tasktemplate_2962e507",
    method: "POST",
    pathTemplate: "/v4/systemconfig/tasktemplate",
    description: "Request CodeArts TestPlan official POST /v4/systemconfig/tasktemplate endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_snapshot_03a4a370",
    method: "POST",
    pathTemplate: "/v4/testcase-snapshot",
    description: "Request CodeArts TestPlan official POST /v4/testcase-snapshot endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_autotask_19904aed",
    method: "POST",
    pathTemplate: "/v4/testcase/autotask",
    description: "Request CodeArts TestPlan official POST /v4/testcase/autotask endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcase_search_used_for_9e7d7977",
    method: "POST",
    pathTemplate: "/v4/testcase/search/used-for-automation",
    description: "Request CodeArts TestPlan official POST /v4/testcase/search/used-for-automation endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_relations_abed8393",
    method: "POST",
    pathTemplate: "/v4/testcases/{case_uri}/relations",
    description: "Request CodeArts TestPlan official POST /v4/testcases/{case_uri}/relations endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_batch_query_used_for_41e92f1e",
    method: "POST",
    pathTemplate: "/v4/testcases/batch-query/used-for-automation",
    description: "Request CodeArts TestPlan official POST /v4/testcases/batch-query/used-for-automation endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_review_overview_aed0dcba",
    method: "POST",
    pathTemplate: "/v4/testcases/review/overview",
    description: "Request CodeArts TestPlan official POST /v4/testcases/review/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_review_search_2cd65406",
    method: "POST",
    pathTemplate: "/v4/testcases/review/search",
    description: "Request CodeArts TestPlan official POST /v4/testcases/review/search endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_etl_query_data_list_b6adb979",
    method: "POST",
    pathTemplate: "/v4/testhub/etl/query/data-list",
    description: "Request CodeArts TestPlan official POST /v4/testhub/etl/query/data-list endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_etl_query_data_total_bbe73b03",
    method: "POST",
    pathTemplate: "/v4/testhub/etl/query/data-total",
    description: "Request CodeArts TestPlan official POST /v4/testhub/etl/query/data-total endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_etl_query_max_row_size_4a48eae2",
    method: "POST",
    pathTemplate: "/v4/testhub/etl/query/max-row-size",
    description: "Request CodeArts TestPlan official POST /v4/testhub/etl/query/max-row-size endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_data_dashboard_b4eb9857",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/data-dashboard/overview",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/data-dashboard/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_issues_d7d16283",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/issues/testcases/batch-query",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/issues/testcases/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_testcases_6ed3408a",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_testcases_batch_781266e7",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/batch-delete",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/testcases/batch-delete endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_testcases_e65e4b80",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/defect-info/list-by-creation-time",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/testcases/defect-info/list-by-creation-time endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_testcases_370c0af5",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/execute-info/statistic-by-user",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/testcases/execute-info/statistic-by-user endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_testcases_00881105",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/results",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testhub_projects_versions_test_fbf07a94",
    method: "POST",
    pathTemplate: "/v4/testhub/projects/{project_id}/versions/{version_uri}/test-reports",
    description: "Request CodeArts TestPlan official POST /v4/testhub/projects/{project_id}/versions/{version_uri}/test-reports endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_user_disclaimer_70f2a368",
    method: "POST",
    pathTemplate: "/v4/user/disclaimer",
    description: "Request CodeArts TestPlan official POST /v4/user/disclaimer endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_user_etl_query_data_list_ffc032ab",
    method: "POST",
    pathTemplate: "/v4/user/etl/query/data-list",
    description: "Request CodeArts TestPlan official POST /v4/user/etl/query/data-list endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_user_etl_query_data_total_553ccabc",
    method: "POST",
    pathTemplate: "/v4/user/etl/query/data-total",
    description: "Request CodeArts TestPlan official POST /v4/user/etl/query/data-total endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_58cefd99",
    method: "POST",
    pathTemplate: "/v4/versions/{version_uri}/testcases",
    description: "Request CodeArts TestPlan official POST /v4/versions/{version_uri}/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_workitems_relations_testrelation_297fab30",
    method: "POST",
    pathTemplate: "/v4/workitems/{work_item_id}/relations/testrelation",
    description: "Request CodeArts TestPlan official POST /v4/workitems/{work_item_id}/relations/testrelation endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_workitems_relations_430a4f72",
    method: "POST",
    pathTemplate: "/v4/workitems/{workitem_id}/relations",
    description: "Request CodeArts TestPlan official POST /v4/workitems/{workitem_id}/relations endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_tasks_testcases_batch_query_2f6d4993",
    method: "POST",
    pathTemplate: "/v5/{project_id}/tasks/{task_uri}/testcases/batch-query",
    description: "Request CodeArts TestPlan official POST /v5/{project_id}/tasks/{task_uri}/testcases/batch-query endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_tasks_add_testcase_301c1d43",
    method: "POST",
    pathTemplate: "/v5/{project_id}/tasks/add/testcase",
    description: "Request CodeArts TestPlan official POST /v5/{project_id}/tasks/add/testcase endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_testcases_uris_37dd77e7",
    method: "POST",
    pathTemplate: "/v5/{project_id}/testcases/uris",
    description: "Request CodeArts TestPlan official POST /v5/{project_id}/testcases/uris endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_requirements_overview_9b2f66ec",
    method: "POST",
    pathTemplate: "/v5/{project_id}/versions/{version_uri}/requirements/overview",
    description: "Request CodeArts TestPlan official POST /v5/{project_id}/versions/{version_uri}/requirements/overview endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_post_versions_testcases_results_5ba5fea9",
    method: "POST",
    pathTemplate: "/v5/{project_id}/versions/{version_uri}/testcases/results",
    description: "Request CodeArts TestPlan official POST /v5/{project_id}/versions/{version_uri}/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_attask_task_stop_task_b4dab481",
    method: "PUT",
    pathTemplate: "/attask/v1/task/{taskId}/stopTask",
    description: "Request CodeArts TestPlan official PUT /attask/v1/task/{taskId}/stopTask endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_config_systemconfig_tasktemplate_0e1bcf29",
    method: "PUT",
    pathTemplate: "/config/v2/systemconfig/tasktemplate",
    description: "Request CodeArts TestPlan official PUT /config/v2/systemconfig/tasktemplate endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_testcases_comments_5fdb6450",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/{project_id}/testcases/{testcase_id}/comments/{comment_id}",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/{project_id}/testcases/{testcase_id}/comments/{comment_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_branches_ab007d8b",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/branches/{branch_id}",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/branches/{branch_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_features_ebc3e375",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/features/{feature_uri}",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/features/{feature_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_features_move_768e3bf7",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/features/{feature_uri}/move",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/features/{feature_uri}/move endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_iterators_a4d21c32",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/iterators/{iterator_id}",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/iterators/{iterator_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_projects_field_e2265b4d",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/projects/{project_id}/field-configs",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/projects/{project_id}/field-configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_testcases_8525c7c8",
    method: "PUT",
    pathTemplate: "/GT3KServer/v4/testcases/{testcase_id}",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v4/testcases/{testcase_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_gt3_kserver_testcases_batch_0fceac1c",
    method: "PUT",
    pathTemplate: "/GT3KServer/v5/{project_id}/testcases/batch-update",
    description: "Request CodeArts TestPlan official PUT /GT3KServer/v5/{project_id}/testcases/batch-update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_asset_a2f56281",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/asset",
    description: "Request CodeArts TestPlan official PUT /v1/{project_id}/asset endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_asset_tree_74de128b",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/asset-tree",
    description: "Request CodeArts TestPlan official PUT /v1/{project_id}/asset-tree endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_basic_aw_64c18975",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/basic-aw/{api_id}",
    description: "Request CodeArts TestPlan official PUT /v1/{project_id}/basic-aw/{api_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_mindmaps_basic_info_44f6603c",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/mindmaps/{id}/basic-info",
    description: "Request CodeArts TestPlan official PUT /v1/{project_id}/mindmaps/{id}/basic-info endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_testcases_2b2ca57e",
    method: "PUT",
    pathTemplate: "/v1/projects/{project_id}/testcases/{testcase_id}",
    description: "Request CodeArts TestPlan official PUT /v1/projects/{project_id}/testcases/{testcase_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_basic_aw_mark_58d92eac",
    method: "PUT",
    pathTemplate: "/v2/{project_id}/basic-aw/{aw_id}/mark",
    description: "Request CodeArts TestPlan official PUT /v2/{project_id}/basic-aw/{aw_id}/mark endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_basic_aw_740e7723",
    method: "PUT",
    pathTemplate: "/v3/{project_id}/basic-aw/{aw_id}",
    description: "Request CodeArts TestPlan official PUT /v3/{project_id}/basic-aw/{aw_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcase_30c2bae4",
    method: "PUT",
    pathTemplate: "/v3/{project_id}/testcase/{tmss_case_uri}",
    description: "Request CodeArts TestPlan official PUT /v3/{project_id}/testcase/{tmss_case_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_project_templates_field_configs_fd48d0d6",
    method: "PUT",
    pathTemplate: "/v4/{domain_id}/project/templates/{template_uri}/field-configs",
    description: "Request CodeArts TestPlan official PUT /v4/{domain_id}/project/templates/{template_uri}/field-configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_project_templates_testcase_field_c014e15f",
    method: "PUT",
    pathTemplate: "/v4/{domain_id}/project/templates/{template_uri}/testcase/field/{uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{domain_id}/project/templates/{template_uri}/testcase/field/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_environmentlab_cff9810f",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/environmentlabel/{label_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{project_id}/environmentlabel/{label_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcase_3c86b8f0",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/testcase/{tmss_case_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{project_id}/testcase/{tmss_case_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcase_field_3631b832",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/testcase/field/{uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{project_id}/testcase/field/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_versions_custom_reports_1a7b294a",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/custom-reports/{report_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{project_id}/versions/{version_uri}/custom-reports/{report_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_versions_custom_template_2cdbcd74",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/custom-template/{template_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/{project_id}/versions/{version_uri}/custom-template/{template_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_versions_testcases_results_32b4dfe5",
    method: "PUT",
    pathTemplate: "/v4/{project_uuid}/versions/{version_uri}/testcases/results",
    description: "Request CodeArts TestPlan official PUT /v4/{project_uuid}/versions/{version_uri}/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_batch_update_testcases_7139dc74",
    method: "PUT",
    pathTemplate: "/v4/batch/update/testcases",
    description: "Request CodeArts TestPlan official PUT /v4/batch/update/testcases endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_branches_9afba01f",
    method: "PUT",
    pathTemplate: "/v4/branches/{branch_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/branches/{branch_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_domain_template_resource_number_3358868e",
    method: "PUT",
    pathTemplate: "/v4/domain/{domain_id}/template/{template_uri}/resource-number-rule/{uri}",
    description: "Request CodeArts TestPlan official PUT /v4/domain/{domain_id}/template/{template_uri}/resource-number-rule/{uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_features_d7c1d23c",
    method: "PUT",
    pathTemplate: "/v4/features/{feature_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/features/{feature_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_iterators_368dddb7",
    method: "PUT",
    pathTemplate: "/v4/iterators/{iterator_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/iterators/{iterator_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_customized_columns_3d93a96e",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/customized-columns",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/customized-columns endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_domain_template_e5d35e6a",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/domain/template/{template_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/domain/template/{template_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_field_configs_7da5fba5",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/field-configs",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/field-configs endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_field_configs_option_b05423f2",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/field-configs/option-value/sort",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/field-configs/option-value/sort endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_field_configs_sort_c7495e16",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/field-configs/sort",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/field-configs/sort endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_filters_c7339b99",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/filters/{filter_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/filters/{filter_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_model_config_082fd36a",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/model-config",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/model-config endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_services_eab7340e",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/services/{service_id}",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/services/{service_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_user_defined_configs_7206386f",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/user-defined-configs/{config_id}",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/user-defined-configs/{config_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_user_defined_configs_e10777b5",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/user-defined-configs/sort",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_id}/user-defined-configs/sort endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_projects_system_config_dc6db31d",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_uuid}/system-config",
    description: "Request CodeArts TestPlan official PUT /v4/projects/{project_uuid}/system-config endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_systemconfig_tasktemplate_8cfaf52a",
    method: "PUT",
    pathTemplate: "/v4/systemconfig/tasktemplate",
    description: "Request CodeArts TestPlan official PUT /v4/systemconfig/tasktemplate endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcases_c7e2564e",
    method: "PUT",
    pathTemplate: "/v4/testcases/{case_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/testcases/{case_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcases_review_0f016657",
    method: "PUT",
    pathTemplate: "/v4/testcases/review/{review_uri}",
    description: "Request CodeArts TestPlan official PUT /v4/testcases/review/{review_uri} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testhub_projects_testcases_80a29041",
    method: "PUT",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/{testcase_id}",
    description: "Request CodeArts TestPlan official PUT /v4/testhub/projects/{project_id}/testcases/{testcase_id} endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testhub_projects_testcases_ab5c3602",
    method: "PUT",
    pathTemplate: "/v4/testhub/projects/{project_id}/testcases/results",
    description: "Request CodeArts TestPlan official PUT /v4/testhub/projects/{project_id}/testcases/results endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_tasks_0c31638d",
    method: "PUT",
    pathTemplate: "/v5/{project_id}/tasks",
    description: "Request CodeArts TestPlan official PUT /v5/{project_id}/tasks endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
  {
    family: "testplan",
    name: "testplan_put_testcases_batch_update_52d1f56d",
    method: "PUT",
    pathTemplate: "/v5/{project_id}/testcases/batch-update",
    description: "Request CodeArts TestPlan official PUT /v5/{project_id}/testcases/batch-update endpoint through a dedicated MCP tool (dry-run by default)",
    write: true
  },
] as const satisfies readonly ProductOfficialEndpointTool[];

export const officialEndpointToolNames = officialEndpointTools.map((tool) => tool.name);

export function getOfficialEndpointTool(name: string) {
  return officialEndpointTools.find((tool) => tool.name === name);
}

export function getOfficialEndpointToolsByFamily(family: OfficialEndpointProductFamily) {
  return officialEndpointTools.filter((tool) => tool.family === family);
}

export function getOfficialEndpointToolNamesByFamily(family: OfficialEndpointProductFamily) {
  return getOfficialEndpointToolsByFamily(family).map((tool) => tool.name);
}
