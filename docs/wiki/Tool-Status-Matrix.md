# Tool Status Matrix

Status matrix based on the current repository implementation, local tests, and the latest real Beijing 4 (`cn-north-4`) validation as of `2026-04-19`.

## Status Legend

- `AK/SK Full`
  - Verified with real `AK/SK`, a real Huawei Cloud endpoint, and a successful business response.
- `AK/SK Reachable`
  - Verified against the real service, but blocked by tenant data, permissions, or missing execution records.
- `Region Unpublished`
  - Implemented locally, but the real region currently returns `APIGW.0101`.
- `Code/Test Only`
  - Implemented and locally tested, but not yet confirmed with real `AK/SK`.

## Module Summary

<!-- GENERATED:tool-status-module-summary:start -->
| Module | Tools | Real-Live Summary | Current Conclusion |
| --- | --- | --- | --- |
| Req | 8 | `8 Full` | Project and work-item read/write paths are fully live-validated. |
| Repo | 24 | `24 Full` | Module-level closure is complete. |
| Pipeline | 16 | `16 Full` | Module-level closure is complete. |
| Check | 8 | `8 Full` | Tool-level closure is complete. |
| TestPlan | 7 | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` | Real plan samples now exist on two projects, but detail/run routes are still unpublished in Beijing 4. |
| Deploy | 59 | Expanded surface; see `docs/wiki/Deploy-Live-Validated.md` | The Deploy MCP surface now includes v4 application/environment/cluster/record/variable tools. The detailed live split is maintained in the dedicated Deploy page. |
| Build | 22 | `19 Full / 0 Reachable / 0 Unpublished / 3 Code` | The remote Build surface is fully live-validated for 19 tools; 3 helper/configuration tools are currently covered by code/test validation only. |
| Artifact | 12 | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` | Five tools are fully validated; seven routes are unpublished in Beijing 4. The current tenant now exposes a real published file sample at `/codearts-mcp/1.0.0/codearts-mcp.tgz`. |
<!-- GENERATED:tool-status-module-summary:end -->

## Latest Shape Notes

- `Deploy`
  - record-bound and detail-style tools now preserve typed identifiers and request context more consistently, especially around `recordId`, `taskId`, and `stepId`
- `Artifact`
  - repository/version/archive/file lines now expose stable typed ids alongside their primary `id`

## Fully Closed Modules

- Req
- Repo
- Pipeline
- Check
- Build

## Partially Closed Modules

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
- `AK/SK Full (empty but successful business response)`
  - `deploy_list_host_group_environments`
- `AK/SK Reachable`
  - `deploy_import_hosts_to_environment`
  - `deploy_rollback_app`
  - note:
    - `deploy_get_app_log`
    - `deploy_get_execution_params`
    - `deploy_get_history_detail`
    - `deploy_start_app`
    - `deploy_stop_app`
    - these are no longer only theoretical; the real healthy Node.js template path now has successful record-bound validation, and the detailed page is the source of truth for the latest split

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

- MCP output note:
  - even for unpublished routes, the local MCP surface is implemented and now normalized with typed ids such as `repositoryId`, `versionId`, `archiveId`, and `fileId`

## Related Docs

- `docs/wiki/AKSK-Verification-Ledger-2026-04-17.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
