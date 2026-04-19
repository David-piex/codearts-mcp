# Build Live Validated

Last updated: `2026-04-19`

Region: `cn-north-4`

Base URL: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`

Validated with real tenant credentials.

Repository live-smoke entry:

- `tests/products/build/client-live-smoke.test.ts`

Additional live helper probes:

- `tests/products/build/tools/configure-release-upload-step-live.test.ts`
- `tests/products/build/tools/prepare-deployable-node-app-live.test.ts`
- `tests/products/build/tools/prepare-node-runtime-bundle-live.test.ts`

Scanned CodeArts project ids:

- `b60f3ec187f34c35ad3033d1d6d73876`
- `eed055d650fb49dd88e49e6bdf88d344`
- `eb80951449fa4af8bac57494f0f4defd`

## Confirmed live results

- `build_list_jobs`
  - Real API call succeeds.
  - Current tenant `Codearts-mcp` project now confirms one real Build job:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - `job_name`: `codearts-mcp-93003743`
  - Real payload shape is:
    - `result.total`
    - `result.job_list`
    - job items may use `job_name` instead of `name`
    - job items may include `build_project_id`
  - The provider page index is zero-based:
    - `page_index=0` returns the first page
    - `page_index=1` skips the first page in this tenant
  - The MCP client has been corrected to:
    - map `result.job_list`
    - map `job_name`
    - use zero-based `page_index`
  - Re-running the consolidated client smoke later showed the list route is still live, but sampled project lists can drift back to empty while direct `build_get_job(job_id)` remains successful.

- `build_get_job`
  - Real API call succeeds against the confirmed job id.
  - Published route:
    - `GET /v1/job/{job_id}/config`
  - Real response includes:
    - `job_name`
    - `project_id`
    - `scms[].build_type`
    - `steps[].properties.image`
    - `steps[].properties.command`
  - Current MCP output now also derives release-library publishing hints from the returned steps:
    - `releasePublishingDetected`
    - `releasePublishingStepCount`
    - `releasePublishingStepNames`
  - Real current job result:
    - `releasePublishingDetected: true`
    - `releasePublishingStepCount: 2`
  - This matches the live job config:
    - the current tenant's sampled Build job now contains:
      - `Npm构建`
      - `Upload package to release repository`
    - the `Npm构建` step already contains both helper markers:
      - `# codex-node-runtime-bundle:start`
      - `# codex-deployable-node-app:start`

- `build_list_records`
  - Real API call succeeds against the confirmed job id.
  - Confirmed real route:
    - `GET /v1/record/{job_id}/list`
  - Current tenant returns 5 real build history items for the confirmed job.
  - MCP output now also surfaces:
    - `build_no`
    - `daily_build_number`
  - Published route:
    - `GET /v1/record/{job_id}/list`
  - The provider rejects overly large time windows:
    - `CB.00031105`
    - `查询时间区间不能大于31天`
  - The provider interprets query time strings as local wall-clock time, not UTC timestamps.
  - The MCP client now:
    - constrains the default query window to the most recent 30 days
    - formats `start_time/end_time` in local time

- `build_run_job`
  - Real API call succeeds against the confirmed job id.
  - Real provider payload uses:
    - `result.actual_build_number`
    - `result.daily_build_number`
    - `result.octopus_job_name`
  - The MCP client now maps:
    - `build_no`
    - `daily_build_number`
  - Real tenant behavior:
    - original job config used `build_type=tag`, which produced `SCHEDULE_FAILURE` for early samples
    - overriding execute payload with `scm.build_type=branch` produced real running builds
    - the MCP client now auto-loads the current job config before execution and sends:
      - `scm.build_type=branch`
      - the requested branch, or the configured scm branch when no explicit branch is provided
    - confirmed successful trigger samples:
      - build `4`: entered `Running`, finished `FAILURE`
      - build `5`: entered `Running`, later stopped and finished `ABORTED`
      - build `7`: entered `Running`, finished `SUCCESS`
      - build `8`: entered `InQueue/Running`, finished `SUCCESS`

- `build_get_info_record`
  - Real API call succeeds for confirmed builds:
    - build `2`
    - build `3`
  - Real response includes:
    - `number`
    - `daily_build_number`
    - `job_running_status`
    - `state`
    - `executor`
    - `trigger_type`
    - `scm_type`

- `build_list_build_parameters`
  - Real API call succeeds for confirmed builds:
    - build `2`
    - build `3`
  - Current tenant returned an empty parameter list for both builds.

- `build_list_project_records`
  - Real API call succeeds with real:
    - `build_project_id`: `8e729e8a-1286-4d9e-bed2-a4bbbfeb582a`
  - Current tenant returns 3 real project-level build records.
  - Real payload shape is:
    - `result.pagination`
    - `result.data`

- `build_get_project_record_statistics`
  - Real API call succeeds with real:
    - `build_project_id`: `8e729e8a-1286-4d9e-bed2-a4bbbfeb582a`
  - Current tenant returns:
    - `total: 5`

- `build_get_record`
  - Real API call succeeds with real:
    - `build_record_id`: `b06f2e3e-e5be-4e8f-8a99-91783c96d6fd`
  - The route consumes the real `build_record_id`, not the `record-info.id` value.
  - Real response also includes useful schedule diagnostics such as:
    - `status_code`
    - `execution_id`
    - `build_yml_path`
    - `daily_build_number`
    - `repository`
    - `branch`

- `build_get_record_script`
  - Real API call succeeds with real:
    - `build_record_id`: `b06f2e3e-e5be-4e8f-8a99-91783c96d6fd`
  - Real response may use `result` directly as a string.

- `build_get_full_stages`
  - Real API call succeeds with real:
    - `build_record_id`: `b06f2e3e-e5be-4e8f-8a99-91783c96d6fd`
  - Current tenant returns an empty `build_stages` object for the sampled failed records.

- `build_get_record_flow_graph`
  - Real API call succeeds with real:
    - `build_record_id`: `b06f2e3e-e5be-4e8f-8a99-91783c96d6fd`
  - Current tenant returns:
    - `nodes: []`
    - `edges: []`
  - Current conclusion:
    - the route is now fully live-validated
    - the sampled record currently produces an empty flow graph payload rather than a route or auth failure

- `build_get_history_details`
  - Real API call succeeds on running/real-executed samples.
  - Confirmed real route:
    - `GET /v3/jobs/{job_id}/{build_number}/history-details`
  - Real success sample:
    - build `4`
  - Real response includes:
    - `job_name`
    - `project_id`
    - `project_name`
    - `build_steps`

- `build_get_real_time_log`
  - Real API call succeeds on a real executed sample.
  - Confirmed real route:
    - `GET /v3/jobs/{job_id}/{build_no}/real-time-log?offset={offset}`
  - Real success sample:
    - build `4`
  - Real response returns full log text content.

- `build_get_error_log`
  - Real API call succeeds on a real executed sample.
  - Confirmed real route:
    - `GET /v1/log/{job_id}/{build_no}/analysis`
  - Real success sample:
    - build `4`
  - Real response includes:
    - `job_name`
    - `error_nodes`
    - `error_info.error_code`
    - `error_info.error_message`

- `build_stop_job`
  - Real API call succeeds on a running build sample.
  - Confirmed real route:
    - `POST /v3/jobs/stop`
  - Real success sample:
    - build `5`
  - Provider may return an empty body for successful stop requests.
  - The MCP client now treats `null`/empty successful responses as `stopped: true`.

- `build_append_job_step`
  - `dry_run` now performs a real live preview against:
    - `GET /v1/job/{job_id}/config`
  - Real validated preview sample on:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - existing step: `Npm构建`
    - appended step preview:
      - `step_name`: `Upload package to release repository`
      - `module_id`: `official.release.upload`
      - `properties.path`: `demo.zip`
      - `properties.name`: `codearts-mcp`
      - `properties.version`: `1.0.0`
  - Real preview result:
    - current `step_count: 1`
    - previewed `step_count: 2`
  - Real write-path confidence is additionally backed by a no-op same-value `build_update_job_step` write against the same job:
    - provider accepted the update request
    - subsequent `build_get_job` confirmed the job still remained unchanged

- `build_append_release_upload_step`
  - `dry_run` now performs a real live preview through the specialized MCP handler.
  - Real validated preview sample on:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - inserted after live step: `Npm构建`
  - Real previewed appended step:
    - `step_name`: `Upload package to release repository`
    - `module_id`: `official.release.upload`
    - `properties.path`: `demo.zip`
    - `properties.name`: `codearts-mcp`
    - `properties.version`: `1.0.0`
    - `properties.upload_tool`: `curl`
  - Real preview result:
    - current `step_count: 1`
    - previewed `step_count: 2`
  - Current boundary:
    - this specialized tool is live-validated in preview mode
    - it intentionally has not yet been executed against the live Build job

- `build_configure_release_upload_step`
  - `dry_run` now performs a real live preview against the existing live release upload step.
  - Real validated preview sample on:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - target step: `Upload package to release repository`
    - preview input:
      - `file`: `codearts-mcp.tgz`
      - `package_name`: `codearts-mcp`
      - `build_version`: `1.0.0`
      - `custom_upload_path`: `/codearts-mcp/1.0.0`
  - Real preview result includes:
    - `module_id`: `devcloud2018.codeci_action_20018.action`
    - `upload_tool`: `curl`
    - `remain_origin_path`: `FLAT`

- `build_prepare_node_runtime_bundle`
  - `dry_run` now performs a real live preview against the current `Npm构建` step.
  - Real validated preview sample on:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - target step: `Npm构建`
    - preview input:
      - `output_file`: `codearts-mcp.tgz`
      - `staging_dir`: `.release-bundle`
  - Real preview result confirms:
    - `alreadyConfigured: true`
    - `updatedCommand` still contains `# codex-node-runtime-bundle:start`

- `build_prepare_deployable_node_app`
  - `dry_run` now performs a real live preview against the current `Npm构建` step.
  - Real validated preview sample on:
    - `job_id`: `cb9308bf8ece41909247bacd26b32cad`
    - target step: `Npm构建`
    - preview input:
      - `entry_file`: `src/server/deploy-entry.ts`
      - `output_file`: `app.js`
      - `target_runtime`: `node20`
  - Real preview result confirms:
    - `alreadyConfigured: true`
    - `updatedCommand` still contains `# codex-deployable-node-app:start`

## Current closure

- `Build` is now fully `AK/SK Full` on the currently exposed 22-tool surface.
- The three former helper/configuration gaps are now backed by explicit real dry-run live tests:
  - `build_configure_release_upload_step`
  - `build_prepare_node_runtime_bundle`
  - `build_prepare_deployable_node_app`

## Detail paths confirmed reachable

The following routes are confirmed to be real service paths, not route misses:

- `build_get_job`
  - `GET /v1/job/{job_id}/config`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record`
  - `GET /v1/record/{record_id}/info`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record_script`
  - `GET /v1/record/{record_id}/build-script`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record_flow_graph`
  - `GET /v1/record/{record_id}/flow-graph`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
  - With the real sampled record id above, the current tenant returns a successful empty graph payload.
- `build_get_full_stages`
  - `GET /v1/record/{record_id}/full-stages?cascade=true`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_history_details`
  - `GET /v3/jobs/{job_id}/{build_number}/history-details`
  - The older `GET /v1/job/{job_id}/{build_number}/history-details` route is not published in this environment and returns `404 APIGW.0101`.
  - With a valid-shape non-existent id, the v3 route returns `422 CB.00031006`.
  - With real builds `2` and `3`, the current tenant returns:
    - `403 CB.00031059`
    - `任务尚未构建或历史已删除，不存在构建历史`
  - With real build `4`, the current tenant returns a successful history-details payload.
- `build_list_build_parameters`
  - `GET /v1/job/{job_id}/{build_no}/history-parameters`
  - The older `GET /v1/job/{job_id}/{build_no}/parameters` route is not published in this environment and returns `404 APIGW.0101`.
  - With a valid-shape non-existent id, the published route returns `422 DEVCB.00031006`.
- `build_list_records`
  - `GET /v1/record/{job_id}/list?page_index={page}&page_size={page_size}&start_time=...&end_time=...`
  - The older non-official `POST /v1/record/brief` path returns provider-side generic failure (`422 DEVCB.00030000`) and should not be used.
  - The alternate `GET /v3/jobs/{job_id}/build-info-records` route is published, but in this tenant the v1 route is the one returning real build history items.
  - With a valid-shape non-existent id, the v1 route returns `422 DEVCB.00031006`.
- `build_get_real_time_log`
  - `GET /v3/jobs/{job_id}/{build_no}/real-time-log?offset={offset}`
  - With a valid-shape non-existent id, the route returns `422 CB.00031006`.
  - With real builds `2` and `3`, the current tenant returns:
    - `500 CB.00030004`
    - `调用Octopus服务异常`
  - With real build `4`, the current tenant returns a successful log payload with full text content.
- `build_get_error_log`
  - `GET /v1/log/{job_id}/{build_no}/analysis`
  - With a valid-shape non-existent id, the route returns `422 DEVCB.00031006`.
  - With real `build_record_id + build_no`, the current tenant returns provider validation:
    - `400 DEV.CB.032011`
    - `任务id参数不合法`
  - With real build `4` using `job_id + build_no`, the current tenant returns a successful analysis payload.
- `build_stop_job`
  - `POST /v3/jobs/stop`
  - Real provider may return stringified JSON error payloads rather than normal JSON.
  - With real finished build `3`, the current tenant returns:
    - `400 DEV.CB.032302`
    - `任务状态已刷新,请刷新页面后重试`
  - With real running build `5`, the current tenant accepts the stop request and the subsequent info-record state becomes `ABORTED`.
  - The MCP client now:
    - surfaces stringified provider errors correctly
    - treats empty successful responses as a real stop success
- `build_append_job_step`
  - `GET /v1/job/{job_id}/config`
  - `dry_run` is now real-live validated because it computes the append preview from the fetched live config instead of returning a static echo.
  - The execute path intentionally remains tenant-safe in this document:
    - preview is real-live validated
    - underlying `POST /v1/job/update` write acceptance is validated separately via same-value `build_update_job_step`
    - an actual appended-step write has not been committed on the live tenant yet
- `build_append_release_upload_step`
  - Uses the same underlying live config preview path as `build_append_job_step`, but fixes the appended module to:
    - `official.release.upload`
  - The current tenant preview proves the specialized parameter mapping is correct at the MCP layer:
    - `path`
    - `name`
    - `version`
    - `upload_tool`
  - Actual write execution is still intentionally deferred until a real package-producing build step is in place

## Follow-up targets

## Suggested live-smoke env overrides

- `HUAWEICLOUD_BUILD_LIVE_PROJECT_ID`
- `HUAWEICLOUD_BUILD_LIVE_PROJECT_IDS`
- `HUAWEICLOUD_BUILD_LIVE_JOB_ID`
- `HUAWEICLOUD_BUILD_LIVE_BUILD_PROJECT_ID`
- `HUAWEICLOUD_BUILD_LIVE_RECORD_ID`
- `HUAWEICLOUD_BUILD_LIVE_INFO_BUILD_NO`
- `HUAWEICLOUD_BUILD_LIVE_HISTORY_BUILD_NO`
- `HUAWEICLOUD_BUILD_LIVE_STOP_BUILD_NO`
- `HUAWEICLOUD_BUILD_LIVE_PROBE_RECORD_ID`

- Continue validating additional success states beyond `FAILURE` / `ABORTED`.
- Re-check whether the now-successful Build outputs can advance Deploy-side `release_id` / `app_component_list`.
- Capture a non-empty flow-graph sample from a richer build execution.
- Continue sweeping remaining Build endpoints for payload-shape drift across tenants.
