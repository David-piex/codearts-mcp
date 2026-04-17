# Build Live Validated

Last updated: `2026-04-17`

Region: `cn-north-4`

Base URL: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`

Validated with real tenant credentials.

Scanned CodeArts project ids:

- `b60f3ec187f34c35ad3033d1d6d73876`
- `eed055d650fb49dd88e49e6bdf88d344`
- `eb80951449fa4af8bac57494f0f4defd`

## Confirmed live results

- `build_list_jobs`
  - Real API call succeeds.
  - Current tenant returned empty job lists in all scanned projects.
  - Real payload shape is:
    - `result.total`
    - `result.job_list`
    - job items may include `build_project_id`
  - The MCP client has been corrected to map `result.job_list`.

## Detail paths confirmed reachable

The following routes are confirmed to be real service paths, not route misses:

- `build_get_job`
  - `GET /v1/job/{job_id}/info`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record`
  - `GET /v1/record/{record_id}/info`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record_script`
  - `GET /v1/record/{record_id}/build-script`
  - With a valid-shape non-existent id, returns `422 DEVCB.00031006`.
- `build_get_record_flow_graph`
  - `GET /v1/record/{record_id}/flow-graph`
  - With a valid-shape non-existent id, returns provider-side parameter validation `DEV.CB.032000`.

## Current uncertainty

- `build_list_project_records`
- `build_get_project_record_statistics`

These currently use `CodeArts project_id` in the client, but the official Build API describes the path parameter as `build_project_id`.
Real probes with the scanned CodeArts project ids return provider validation errors rather than route misses.
This means the input semantics still need confirmation before these two tools can be treated as truly live-correct.
The MCP layer now accepts optional `build_project_id` and will prefer it when provided.

## Follow-up targets

- Obtain a tenant with at least one real Build job.
- Confirm whether `build_project_id` differs from CodeArts `project_id` in the current tenant.
- Once a real job exists, validate:
  - `build_get_job`
  - `build_list_records`
  - `build_get_record`
  - `build_get_record_script`
  - `build_get_full_stages`
  - `build_get_real_time_log`
  - `build_get_history_details`
  - `build_list_build_parameters`
  - `build_run_job`
  - `build_stop_job`
