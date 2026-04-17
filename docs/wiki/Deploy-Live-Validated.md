# Deploy Live Validated

Last updated: `2026-04-17`

Region: `cn-north-4`

Base URL: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`

Validated with real tenant credentials against the `Demo` project:

- `project_id`: `b60f3ec187f34c35ad3033d1d6d73876`
- `application_id`: `61a79c91060b43909b9cd8c5e33ba43a`
- `task_id`: `8f49acfaa7ea4725b87627dc2902f19a`

## Confirmed live results

- `deploy_list_apps`
  - Non-empty success.
- `deploy_list_tasks`
  - Non-empty success.
- `deploy_get_app`
  - Non-empty success, including `arrange_infos`.
- `deploy_get_task`
  - Non-empty success.
- `deploy_list_app_operations_log`
  - Non-empty success after fixing the path to `POST /v1/applications/{app_id}/operations/log`.
  - Real sample returned `3` logs.
- `deploy_list_histories`
  - The live service only accepts `GET /v2/{project_id}/task/{task_id}/history`.
  - `start_date` and `end_date` are both required.
  - Calling without dates returns provider error `400 APIGW.0106`.
  - Calling with both dates succeeds; current sample returned an empty list.
- `deploy_get_status`
  - Success on `GET /v2/tasks/{task_id}/state`.
  - Real payload shape is `status`, `elapsed_time`, and `step_state`.
  - The MCP mapping now surfaces `state`, `elapsed_time`, and `step_states`.

## Rejected paths and assumptions

- `POST /v1/applications/operations/list`
  - Wrong path. Real tenant validation confirmed this should not be used.
- `GET /v1/projects/{project_id}/tasks/{task_id}/histories`
  - Returns `404 APIGW.0101`.
- `GET /v2/{project_id}/task/{task_id}/history` without dates
  - Returns `400 APIGW.0106`.
- "No dates should fall back to a legacy histories endpoint"
  - False for the current tenant and region.

## Current deploy status

Deploy is no longer "empty-only" in this tenant:

- Applications and tasks have real non-empty samples.
- Operations logs have real non-empty samples.
- Histories are live-validated but currently empty for the tested date range.
- Status is live-validated with real step metadata.

## Record-bound endpoints

Current tenant state: no deploy execution record exists in any scanned CodeArts project as of `2026-04-17`.

Scanned projects:

- `Demo` (`b60f3ec187f34c35ad3033d1d6d73876`)
- `housekeeper` (`eed055d650fb49dd88e49e6bdf88d344`)
- `体验项目` (`eb80951449fa4af8bac57494f0f4defd`)

Validated path reachability with a valid-shape non-existent `record_id`:

- `deploy_get_history_detail`
  - `GET /v2/tasks/{task_id}/state?record_id={record_id}&step_state=true`
  - Reaches service layer and returns `404 Deploy.00011303` (`无执行记录`).
- `deploy_get_app_log`
  - `GET /v1/applications/{application_id}/records/{record_id}/logs`
  - Reaches service layer and returns `404 Deploy.00011303` (`无执行记录`).
- `deploy_get_execution_params`
  - `GET /v2/history/tasks/{task_id}/params?record_id={record_id}`
  - Reaches service layer and returns `400 Deploy.00011303` (`无执行记录`).
  - Legacy fallback path `GET /v1/tasks/{task_id}/records/{record_id}/execution-params` is not published in this environment and returns `404 APIGW.0101`.

Client behavior updated accordingly:

- `getExecutionParams` no longer masks a real provider error by falling back to the unpublished legacy path.
- HTTP error parsing now extracts `error_code` and `error_msg` even when the provider incorrectly labels the body as `text/html`.

## Follow-up targets

- Validate `deploy_get_history_detail` with a real `record_id`.
- Validate `deploy_get_execution_params` with a real `record_id`.
- Validate `deploy_get_app_log` with a real `record_id`.
- Validate `deploy_start_app` / `deploy_stop_app` / `deploy_rollback_app` only when a safe real execution target is available.
