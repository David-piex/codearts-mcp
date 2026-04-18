# Module Live Readiness

Current readiness summary based on the latest real Beijing 4 (`cn-north-4`) tenant validation as of `2026-04-19`.

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

## Non-empty validated modules

- Repo
- Pipeline
- Check
- Build
- Req

## Partial modules

- Deploy
- TestPlan
- Artifact

## Notable detail-path conclusions

### Req

- `req_list_projects`, `req_get_project`, `req_list_iterations`, and `req_list_project_members` now have real tenant validation.
- `req_list_work_items` and `req_get_work_item` are now confirmed live on the published `/issues` route family.
- `req_create_work_item` and `req_update_work_item` now have real successful AK/SK samples on writable project `7bd39587c14048aebdadd0f9c22b1402`.

### Artifact

- `artifact_get_file_tree`
- `artifact_get_repository`

These routes are live and reachable.

- latest MCP output normalization:
  - repository outputs now also expose `repositoryId`
  - version outputs now also expose `versionId`
  - build archive outputs now also expose `archiveId`
  - file outputs now also expose `fileId`

- `artifact_delete_file`
- `artifact_list_build_archives`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_search_artifacts`
- `artifact_show_audit`

These currently return `APIGW.0101` in Beijing 4 and should be treated as `Region Unpublished`.

### TestPlan

- `testplan_list_plans` returns real live samples on two scanned projects.
- `testplan_list_issues` and `testplan_list_cases` are live and currently return empty results on the known plan.
- `testplan_get_plan`, `testplan_list_runs`, and `testplan_get_case` currently return `APIGW.0101` in Beijing 4.

### Build

- `build_list_jobs`, `build_get_job`, and `build_list_records` now have real non-empty live samples.
- `build_run_job` and `build_stop_job` both have real execution samples in the current tenant.
- `build_get_info_record`, `build_get_record`, `build_get_record_script`, `build_get_history_details`, `build_get_real_time_log`, `build_get_error_log`, `build_list_project_records`, `build_get_project_record_statistics`, and `build_get_record_flow_graph` all now have real success samples.
- `build_list_build_parameters`, `build_get_full_stages`, and `build_get_record_flow_graph` are live-valid and may return empty business payloads on the sampled builds.

### Deploy

- the healthy Node.js template path now has real successful record-bound validation for:
  - `deploy_start_app`
  - `deploy_get_execution_params`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_stop_app`
- the remaining practical live blocker is now template runtime age, not missing basic app/environment/host resources
