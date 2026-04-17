# Govern Live Validated

This page records the latest confirmed live status of the CodeArts Govern module in `cn-north-4`.

## Scope

Validated with real `AK/SK`, real endpoints, and real tenant data.

Base URL:
- `https://devsecurity.cn-north-4.myhuaweicloud.com`

Verification date:
- `2026-04-17`

Project id used for verification:
- `b60f3ec187f34c35ad3033d1d6d73876`

## Successfully Validated Read Tools

| Tool | Status | Evidence |
| --- | --- | --- |
| `govern_get_quota_info` | Validated | Real response returned `package_quota: 0`, `concurrent_task: 0`, `valid: false` |
| `govern_get_osi_statistics` | Validated | Real response returned `software: 10089` |
| `govern_list_osi_item_names` | Validated | Real response returned non-empty item list for `software_name=openssl` |
| `govern_list_osi_item_versions` | Validated | Real response returned non-empty version list for `software_name=openssl` |
| `govern_get_osi_item_detail` | Validated | Real response returned full component detail for `OpenSSL / openssl-3.0.19` |
| `govern_list_osi_item_vulns` | Validated | Real response returned a valid empty list for `OpenSSL / openssl-3.0.19` |

## Detail Paths Confirmed Reachable

The following tools do not yet have a real owned task sample in this tenant, but their routes are confirmed to be real service paths rather than route misses.

| Tool | Probe Result | Meaning |
| --- | --- | --- |
| `govern_get_task_status` | `403 SG.03101200` | Request reached service-level ownership/permission check |
| `govern_get_open_source_summary` | `403 SG.03101200` | Request reached service-level ownership/permission check |
| `govern_get_open_source_report` | `403 SG.03101200` | Request reached service-level ownership/permission check |

## Known Gaps

- `govern_list_tasks`
  - Still not implemented because no trustworthy public URI has been confirmed
- `sbc/osi/item/dependency`
  - Still returns `APIGW.0101` in the real Beijing 4 environment
- Real task lifecycle/report flow samples are still missing for:
  - `govern_create_task`
  - `govern_stop_task`
  - `govern_delete_task`
  - `govern_create_pdf_report`
  - `govern_get_pdf_report_status`
  - `govern_download_pdf_report`
  - `govern_create_excel_report`
  - `govern_get_excel_report_status`
  - `govern_download_excel_report`

## Input Constraints Confirmed

- `govern_get_osi_item_detail`
- `govern_list_osi_item_vulns`

These currently work reliably with:

- `software_name + software_version`

Artifact-only input is still not recommended in this tenant because provider-side validation can still fail with missing `group_id`.

## Related Docs

- [Home](./Home.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)
