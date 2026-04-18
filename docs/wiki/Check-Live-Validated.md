# Check Live Validated

Last updated: `2026-04-17`

Region: `cn-north-4`

Base URL: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`

Validated with real `AK/SK`, real endpoints, and real tenant data.

Repository live-smoke entry:

- `tests/products/check/client-live-smoke.test.ts`

## Tool Status

| Tool | Status | Evidence |
| --- | --- | --- |
| `check_list_tasks` | Validated | Returned real non-empty task list |
| `check_list_rulesets` | Validated | Returned real non-empty ruleset list |
| `check_create_task` | Validated | Created real task with CodeHub SSH `git_url` |
| `check_run_task` | Validated | Real trigger succeeded after sending `{}` |
| `check_stop_task` | Validated | Real stop succeeded; provider returned `200` with empty body |
| `check_get_task` | Validated | Returned real summary fields after completed check |
| `check_get_metrics` | Validated | Real route confirmed as `/v2/{project_id}/tasks/{task_id}/metrics-summary` |
| `check_list_task_issues` | Validated | Real route confirmed as `defects-detail`; observed both non-empty and empty successful responses |

## Key Real Findings

- `check_create_task` must use the documented payload shape:
  - `check_type: ["source"]`
  - `rule_sets` or `language[]`
- CodeHub repository creation was validated with SSH `git_url`, not HTTPS.
- `check_run_task` and `check_stop_task` need `{}` as request body.
- `check_stop_task` success response may be an empty body.
- `check_get_task` reads from `defects-summary`, but the real success payload is a top-level object.
- `check_get_metrics` is project-scoped in the real environment.
- `check_list_task_issues` must use `/defects-detail`, not `/issues`.

## Real Sample IDs

- Existing task with real issues:
  - `d5026e942a7b4d639f4ea6369f45a6f5`
- Newly created clean task:
  - `db8b9d30a38e45c09ab61dc9cf392844`

## Suggested live-smoke env overrides

- `HUAWEICLOUD_CHECK_LIVE_PROJECT_ID`
- `HUAWEICLOUD_CHECK_LIVE_TASK_ID`

## Related Docs

- [Home](./Home.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Check Live Findings 2026-04-17](../check-live-findings-2026-04-17.md)
