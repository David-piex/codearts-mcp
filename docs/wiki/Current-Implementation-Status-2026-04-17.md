# Current Implementation Status (2026-04-17)

This page is the corrected implementation snapshot after the latest `Req`, `Artifact`, `TestPlan`, `Build`, and `Deploy` live-validation work.

## Module completion snapshot

<!-- GENERATED:implementation-status-table:start -->
| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 8 | 6 | 2 | Validated | Project and work-item read/write loops now have real AK/SK validation on a writable sampled project. |
| Repo | 24 | 17 | 7 | Validated | Full module-level live loop completed. |
| Pipeline | 16 | 11 | 5 | Validated | Full module-level live loop completed. |
| Check | 8 | 5 | 3 | Validated | Full tool-level live loop completed. |
| TestPlan | 7 | 6 | 1 | Partial | Two scanned projects now return real plan samples; 4 routes are re-confirmed as unpublished in Beijing 4. |
| Deploy | 59 | 44 | 15 | Partial | The detailed Deploy page is the source of truth for the expanded v4 surface. `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, and `deploy_stop_app` now all have real AK/SK validation on at least one healthy path. The remaining real blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`), plus a rollback-eligible sample for `deploy_rollback_app`. |
| Build | 22 | 14 | 8 | Validated | 19 tools are fully AK/SK validated on the current surface, while 3 helper/configuration tools are currently covered by code/test validation only. |
| Artifact | 12 | 11 | 1 | Partial | Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4. |
<!-- GENERATED:implementation-status-table:end -->

## Overall numbers

<!-- GENERATED:implementation-status-totals:start -->
- Product modules implemented: `8`
- Product tools implemented: `156`
- Auth/session tools implemented: `2`
- Total MCP tools exposed: `158`
<!-- GENERATED:implementation-status-totals:end -->

## Latest live-state summary

- `Build`
  - `19/22` are `AK/SK Full`
  - `3/22` remain `Code/Test Only`
- `Req`
  - `8/8` are `AK/SK Full`
  - `0/8` remain `Code/Test Only`
- `Artifact`
  - `5/12` are `AK/SK Full`
  - `7/12` are `Region Unpublished`
- `TestPlan`
  - `1/7` is `AK/SK Full`
  - `2/7` are `AK/SK Reachable`
  - `4/7` are `Region Unpublished`
- `Deploy`
  - `59/59` are implemented in code
  - the detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md`
  - current explicit skip: `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts`

## Latest MCP normalization summary

- `Deploy`
  - record/detail outputs now use more consistent entity ids:
    - `deploy_get_history_detail`: `id = record_id`, with separate `taskId`
    - `deploy_get_v4_deploy_record`: `id = record_id`
    - `deploy_get_last_record_detail`: `id = resolved record id`
    - `deploy_get_v4_environment_resource_detail`: `id = environment_id`
  - request context is now preserved more consistently:
    - `deploy_get_status` now carries explicit `taskId` and preserves request-scoped `recordId`
    - `deploy_get_app_log` now carries explicit `recordId` and preserves request-scoped `stepId`
    - `deploy_get_execution_params` now carries `taskId` + `recordId` both on each item and in outer `scope`
    - `deploy_get_runtime_variables` and `deploy_query_variables` now duplicate scope into each item
  - `deploy_list_system_configs` now uses `id = name`

- `Artifact`
  - repository outputs now expose:
    - `repositoryId`
  - version outputs now expose:
    - `versionId`
  - build archive outputs now expose:
    - `archiveId`
  - file outputs now expose:
    - `fileId`
  - search outputs now also preserve:
    - request-derived `projectId`
    - fallback `repositoryName`

- current practical meaning
  - `Deploy` partial status is now mostly about runtime/template age and rollback sample gaps, not missing basic app/environment/host control-plane paths
  - `Artifact` partial status is now mostly about Beijing 4 unpublished routes, not missing local MCP implementations

## Deploy detail

### Already written

- `deploy_list_apps`
- `deploy_list_app_host_groups`
- `deploy_list_host_groups`
- `deploy_get_host_group`
- `deploy_list_host_group_hosts`
- `deploy_list_host_group_environments`
- `deploy_create_environment`
- `deploy_create_application`
- `deploy_modify_application`
- `deploy_create_task_by_template`
- `deploy_list_environment_hosts`
- `deploy_import_hosts_to_environment`
- `deploy_list_system_configs`
- `deploy_list_app_operations_log`
- `deploy_list_environments`
- `deploy_list_tasks`
- `deploy_get_app`
- `deploy_get_task`
- `deploy_get_app_log`
- `deploy_get_execution_params`
- `deploy_list_histories`
- `deploy_get_status`
- `deploy_get_history_detail`
- `deploy_start_app`
- `deploy_stop_app`
- `deploy_rollback_app`

### Already validated against the real service

- Non-empty live samples:
  - `deploy_list_apps`
  - `deploy_list_app_host_groups`
  - `deploy_list_host_groups`
  - `deploy_get_host_group`
  - `deploy_list_host_group_hosts`
  - `deploy_list_host_group_environments`
  - `deploy_create_environment`
  - `deploy_create_application`
  - `deploy_modify_application`
  - `deploy_list_environment_hosts`
  - `deploy_list_tasks`
  - `deploy_get_app`
  - `deploy_get_task`
  - `deploy_list_environments`
  - `deploy_list_app_operations_log`
  - `deploy_list_system_configs`
  - `deploy_create_task_by_template`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_get_execution_params`
  - `deploy_start_app`
  - `deploy_stop_app`
- Empty but live-valid:
  - `deploy_list_histories` with required `start_date + end_date`
- Service-layer reachable with safe real probes:
  - `deploy_import_hosts_to_environment`
  - `deploy_rollback_app`

## Notes

- `Deploy` is not "not implemented". It is fully written at the tool level.
- The detailed Deploy wiki page is now ahead of this roll-up table for the expanded v4 host/environment routes and the real record-bound execution path.
- Some additional Deploy portal routes were discovered from HAR, such as `configs/get` and `package_spec`, but they currently behave as browser-session-only endpoints and are therefore not exposed as AK/SK MCP tools.
- The remaining v4 host-tag write route is no longer an active implementation target in the current tenant:
  - frontend bundle evidence confirms the route exists
  - current sampled app/environment state does not expose a reproducible gray-release UI path
  - the user explicitly approved skipping this item for now
- `deploy_get_template_detail` remains implemented from frontend evidence but region-unpublished in Beijing 4.
- The main remaining blocker is no longer “no real deploy execution record”:
  - real execution records now exist on the HAR-derived healthy Node.js template path
  - `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_status`, `deploy_get_history_detail`, `deploy_get_app_log`, and `deploy_stop_app` have all been validated against those real records
  - the older app-created path can still hit `Deploy.00011042`, but that is no longer the headline Deploy summary
  - the healthy HAR-template path now accepts the real Build-produced package `/codearts-mcp/1.0.0/codearts-mcp.tgz`
  - `下载软件包` succeeds and the provider-generated download URL resolves correctly
  - the new failure has moved later to the template runtime:
    - the template installs `Node v10.9.0`
    - later `停止nodeJs服务` installs and checks `forever`
    - `forever` fails under Node 10 because one dependency uses unsupported numeric separators
  - this means the next practical gap is updating or replacing that outdated Node.js deploy template path, not package visibility
  - `deploy_rollback_app` still needs a rollback-eligible real execution sample

## Build detail

### Already written

- `build_list_jobs`
- `build_get_job`
- `build_list_records`
- `build_get_error_log`
- `build_get_history_details`
- `build_get_full_stages`
- `build_get_info_record`
- `build_get_real_time_log`
- `build_get_record`
- `build_get_record_script`
- `build_list_build_parameters`
- `build_list_project_records`
- `build_get_project_record_statistics`
- `build_get_record_flow_graph`
- `build_configure_release_upload_step`
- `build_prepare_deployable_node_app`
- `build_prepare_node_runtime_bundle`
- `build_run_job`
- `build_append_job_step`
- `build_append_release_upload_step`
- `build_stop_job`
- `build_update_job_step`

### Already validated against the real service

- Non-empty live samples:
  - `build_list_jobs`
  - `build_get_job`
  - `build_list_records`
  - `build_get_info_record`
  - `build_list_project_records`
  - `build_get_project_record_statistics`
  - `build_get_record`
  - `build_get_record_script`
  - `build_get_history_details`
  - `build_get_real_time_log`
- `build_get_error_log`
- `build_run_job`
- `build_append_job_step`
- `build_append_release_upload_step`
- `build_stop_job`
- `build_update_job_step`
- Empty but live-valid:
  - `build_list_build_parameters`
  - `build_get_full_stages`
  - `build_get_record_flow_graph`

### Notes

- `Build` is now fully AK/SK validated for the currently exposed tool surface.
- The remaining 3 Build tools are helper/configuration tools that are currently covered by code/test validation only:
  - `build_configure_release_upload_step`
  - `build_prepare_deployable_node_app`
  - `build_prepare_node_runtime_bundle`
- Real job, record, run, log, stop, and flow-graph samples now exist in Beijing 4.
- `build_append_job_step` is no longer a blind dry-run echo:
  - it now loads the real current job config and computes the inserted step preview against that payload
  - on the current tenant this preview was validated against job `cb9308bf8ece41909247bacd26b32cad`
  - the live preview correctly reports `1 -> 2` steps when inserting `official.release.upload` after `Npm构建`
- `build_append_release_upload_step` now wraps the official release-repository upload module behind a safer dedicated MCP surface:
  - it fixes `module_id=official.release.upload`
  - it maps release-upload properties such as `path`, `name`, `version`, and `upload_tool`
  - on the current tenant, its real `dry_run` preview also reports `1 -> 2` steps on job `cb9308bf8ece41909247bacd26b32cad`
- The shared `/v1/job/update` write path was re-validated on `2026-04-18` with a same-value no-op `build_update_job_step` request:
  - provider accepted the update
  - follow-up `build_get_job` confirmed the job remained unchanged
- `build_list_records` now also returns `build_no` and `daily_build_number`, which makes follow-up log/detail queries directly scriptable.
- Real root cause for the latest `SCHEDULE_FAILURE` sample was `scms[0].build_type=tag`.
- `build_run_job` now reads the current job config and forces branch checkout execution with the configured or requested branch.
- Real builds `#7` and `#8` now complete successfully after this fix.
- `build_get_record` now also surfaces richer diagnosis fields such as `status_code`, `execution_id`, `build_yml_path`, and `daily_build_number`.
- `build_get_job` now also derives whether the job contains a release-library publishing step.
- That older conclusion is no longer current.
- On `2026-04-18`, the same real Build job was extended and live-validated to:
  - create `codearts-mcp.tgz`
  - append a real release upload step
  - upload successfully to `/codearts-mcp/1.0.0/`
- The Build job can now feed the healthy Deploy path with a real package input.

## Related pages

- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Build-Live-Validated.md`
- `docs/wiki/Req-Live-Validated.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/wiki/Artifact-Live-Validated.md`
- `docs/wiki/TestPlan-Live-Validated.md`
