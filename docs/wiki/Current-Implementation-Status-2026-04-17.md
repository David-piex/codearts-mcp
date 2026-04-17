# Current Implementation Status (2026-04-17)

This page is the corrected implementation snapshot after the latest `Deploy` live validation work.

## Module completion snapshot

| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 8 | 6 | 2 | Validated | Full module-level live loop completed. |
| Repo | 24 | 17 | 7 | Validated | Full module-level live loop completed. |
| Pipeline | 16 | 10 | 6 | Validated | Full module-level live loop completed. |
| Check | 8 | 5 | 3 | Validated | Full tool-level live loop completed. |
| TestPlan | 7 | 6 | 1 | Empty-but-validated | Tenant has not enabled TestPlan. |
| Deploy | 13 | 10 | 3 | Partial | Real samples exist for apps, tasks, operations log, and status; current tenant has no deploy execution record yet. |
| Build | 16 | 14 | 2 | Empty-but-validated | Paths validated; tenant lacks real build job/record samples. |
| Artifact | 12 | 11 | 1 | Empty-but-validated | Paths validated; tenant lacks real repository/version/file samples. |
| Govern | 29 | 21 | 8 | Partial | Major coverage implemented; `govern_list_tasks` remains unresolved, and `sbc/osi/item/dependency` is now implemented client-side but still not published in the current region. |
| Inspector | 8 | 8 | 0 | Empty-but-validated | Paths validated; tenant lacks real scan task samples. |
| PerfTest | 9 | 9 | 0 | Empty-but-validated | Tenant has not enabled PerfTest. |

## Overall numbers

- Product modules implemented: `11`
- Product tools implemented: `150`
- Auth/session tools implemented: `2`
- Total MCP tools exposed: `152`

## Deploy detail

### Already written

- `deploy_list_apps`
- `deploy_list_app_operations_log`
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
  - `deploy_list_tasks`
  - `deploy_get_app`
  - `deploy_get_task`
  - `deploy_list_app_operations_log`
  - `deploy_get_status`
- Empty but live-valid:
  - `deploy_list_histories` with required `start_date + end_date`
- Service-layer reachable but blocked by missing execution record:
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_get_execution_params`
- Safe `dry_run` handlers written but not yet real-executed:
  - `deploy_start_app`
  - `deploy_stop_app`
  - `deploy_rollback_app`

## Notes

- `Deploy` is not "not implemented". It is fully written at the tool level.
- The main remaining blocker is tenant data, not missing MCP code:
  - no real deploy execution `record_id`
  - therefore record-bound read/write flows cannot finish end-to-end live validation yet

## Related pages

- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/wiki/Govern-Live-Validated.md`
