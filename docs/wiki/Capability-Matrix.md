# Capability Matrix

Capability snapshot based on the current repository implementation, local test coverage, and the latest real Beijing 4 (`cn-north-4`) validation as of `2026-04-19`.

## Legend

- `Read`: implemented read tools
- `Write`: implemented write tools
- `Live`: current live-validation status
- `Key Gaps`: main remaining closure gap

## Matrix

<!-- GENERATED:capability-matrix:start -->
| Module | Read | Write | Live | Key Gaps |
| --- | --- | --- | --- | --- |
| Req | 6 | 2 | Validated | Project and work-item read/write paths are now fully live-validated |
| Repo | 17 | 7 | Validated | No material gap in the currently exposed surface |
| Pipeline | 11 | 5 | Validated | More non-empty samples would help, but no structural gap remains |
| Check | 5 | 3 | Validated | Tool-level live closure is complete |
| TestPlan | 6 | 1 | Partial | `get_plan / list_runs / get_case / run_cases` are unpublished in Beijing 4 |
| Deploy | 44 | 15 | Partial | Expanded Deploy v4 environment/record/variable surface is implemented; the detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md` |
| Build | 14 | 8 | Validated | All 22 tools are now fully live-validated, including the 3 helper/configuration tools via real dry-run previews |
| Artifact | 11 | 1 | Partial | 5 tools are fully live-validated, and 7 routes are now re-confirmed by live smoke as unpublished in Beijing 4 |
<!-- GENERATED:capability-matrix:end -->

## Focus Areas

### Already fully validated

- Req
- Repo
- Pipeline
- Check
- Build

### Now partially but concretely live-validated

- TestPlan
- Deploy
- Artifact

## Notes

### TestPlan

- `testplan_list_plans` is now fully validated with real plan samples on two scanned projects.
- `testplan_list_issues` and `testplan_list_cases` are reachable and currently empty on the known live plans.
- `testplan_get_plan`, `testplan_list_runs`, `testplan_get_case`, and `testplan_run_cases` are currently `APIGW.0101` in Beijing 4.

### Artifact

- `artifact_get_file_tree`, `artifact_get_repository`, `artifact_list_repositories`, `artifact_list_versions`, and `artifact_list_latest_version_files` are now fully live-validated.
- `artifact_delete_file`, `artifact_list_build_archives`, `artifact_list_files`, `artifact_get_file`, `artifact_get_download_url`, `artifact_search_artifacts`, and `artifact_show_audit` are currently unpublished in Beijing 4.
- Those 7 unpublished-route conclusions are now covered by the consolidated real `AK/SK` smoke, not just one-off manual probes.
- The local MCP output shape has also been normalized across:
  - repository ids
  - version ids
  - archive ids
  - file ids

### Build

- Real live samples now exist for job listing, job detail, record listing, record detail, script, history details, real-time log, error log, run, stop, and project-level record views.
- `build_list_build_parameters`, `build_get_full_stages`, and `build_get_record_flow_graph` are live-valid with empty business payloads on the sampled builds.

### Deploy

- Real live samples now exist for application listing, app-visible host-group listing, environment creation, environment-host listing, task listing, host-group listing, host-group detail, and host-group host listing.
- `Codearts-mcp` now has a real app, task, environment, and connected host path.
- `deploy_list_host_group_environments` is now non-empty on the known real host group.
- the older `Deploy.00011042` conclusion is no longer the main summary
- the healthy Node.js template path now creates real execution records and validates:
  - `deploy_start_app`
  - `deploy_get_execution_params`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_stop_app`
- the current main blocker has moved later into the outdated template runtime (`Node v10.9.0` + `forever`)
