# Check Live Findings (2026-04-17)

This note records the latest real-environment verification for the CodeArts Check module in `cn-north-4`.

## Verified Environment

- Region: `cn-north-4`
- Base URL: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- Verification date: `2026-04-17`
- Real task id used during probing: `d5026e942a7b4d639f4ea6369f45a6f5`

## Current Conclusions

- `check_list_tasks`: real request succeeded and returned non-empty task data.
- `check_list_rulesets`: real request succeeded and returned non-empty ruleset data.
- `check_create_task`: now succeeds against a real CodeHub SSH repository URL.
- `check_run_task`: now succeeds after sending an empty JSON body instead of a null request body.
- `check_stop_task`: now succeeds against a real running task. The real provider response is `200` with an empty body.
- `check_get_task`: now succeeds after a completed real check run and returns top-level task summary fields.
- `check_list_task_issues`: client path has been corrected from `/issues` to `/defects-detail`. It now returns real issue data for an existing task and an empty success payload for the newly created clean task.
- `check_get_metrics`: the real route in `cn-north-4` is `/v2/{project_id}/tasks/{task_id}/metrics-summary`, and it now succeeds when `project_id` is provided.

## Code Change in This Round

- `src/products/check/client.ts`
  - `check_create_task` now sends the documented payload shape:
    - `check_type: ["source"]`
    - `rule_sets` or `language[]`
    - CodeHub creation validated with SSH `git_url`
  - `check_run_task` and `check_stop_task` now send `{}` to satisfy the provider request-body requirement
  - `check_stop_task` now tolerates the real success response shape: `200` with an empty body
  - `check_list_task_issues` now uses:
    - `/v2/tasks/{task_id}/defects-detail`
  - Added response-field compatibility for documented defect payloads such as:
    - `defect_id`
    - `defect_level`
    - `line_number`
  - `check_get_task` now maps the real top-level defects-summary payload
  - `check_get_metrics` now uses the real project-scoped route and maps top-level `metric_info`

## Tests Added in This Round

- `tests/products/check/client.test.ts`
  - verifies create-task payload normalization
  - verifies run/stop request bodies
  - verifies empty stop responses fall back to the input `task_id`
  - verifies the `defects-detail` request path
  - verifies defect payload mapping into MCP issue items
  - verifies project-scoped metrics route selection
  - verifies top-level task-summary and metric-info mapping
- `tests/core/http/client.test.ts`
  - verifies successful empty responses are treated as `null`

## Real Probe Summary

- `GET /v2/tasks/{task_id}/defects-summary`
  - succeeded after a completed check run
- `GET /v2/tasks/{task_id}/defects-detail`
  - succeeded after correcting the path to `defects-detail`
- `GET /v2/{project_id}/tasks/{task_id}/metrics-summary`
  - succeeded after switching to the project-scoped route
- `POST /v2/tasks/{task_id}/run`
  - succeeded after sending `{}`
- `POST /v2/tasks/{task_id}/stop`
  - succeeded with a real `200` empty-body response
- `POST /v2/{project_id}/task`
  - succeeded with CodeHub SSH `git_url`

## Documentation Rule

The Check module can now be treated as live-validated at the tool level for:

- `check_create_task`
- `check_run_task`
- `check_stop_task`
- `check_get_task`
- `check_list_task_issues`
- `check_get_metrics`
- `check_list_tasks`
- `check_list_rulesets`
