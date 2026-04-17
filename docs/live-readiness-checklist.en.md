# Live Readiness Checklist

This checklist is the shortest path to understand what is already live-validated in the Beijing 4 tenant, what kind of IDs each module expects, which endpoint should be used, and what must exist before you can get non-empty business data.

Applies to:

- Region: `cn-north-4`
- Validation date: `2026-04-16`
- Repository: `codearts-mcp`

## At A Glance

| Module | First tool to try | `project_id` type | Recommended endpoint | Current live status | Requirement for non-empty data |
| --- | --- | --- | --- | --- | --- |
| Req | `req_list_projects` | Not tied to a CodeArts project | `https://projectman-ext.cn-north-4.myhuaweicloud.com` | Validated | Tenant already has projects |
| Repo | `repo_list_repositories` | CodeArts project UUID | `https://codehub-ext.cn-north-4.myhuaweicloud.com` | Validated | Project already has repositories |
| Pipeline | `pipeline_list_pipelines` | CodeArts project UUID | `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com` | Validated | Project already has pipelines |
| Check | `check_list_tasks` / `check_list_rulesets` | CodeArts project UUID | `https://codecheck-ext.cn-north-4.myhuaweicloud.com` | Validated | Existing check tasks for task discovery; rulesets can be non-empty without tasks |
| TestPlan | `testplan_list_plans` | CodeArts project UUID | `https://cloudtest-ext.cn-north-4.myhuaweicloud.com` | Empty-but-validated | Project has TestPlan enabled and already contains plans/cases |
| Deploy | `deploy_list_apps` | CodeArts project UUID | `https://codearts-deploy.cn-north-4.myhuaweicloud.com` | Empty-but-validated | Tenant already has deploy apps or deploy histories |
| Build | `build_list_jobs` | CodeArts project UUID | `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com` | Empty-but-validated | Project already has build jobs or records |
| Artifact | `artifact_list_repositories` | CodeArts project UUID + tenant id | `https://artifact.cn-north-4.myhuaweicloud.cn` | Empty-but-validated | Tenant already has artifact repositories or versions |
| Govern | `govern_get_quota_info` | CodeArts project UUID | `https://devsecurity.cn-north-4.myhuaweicloud.com` | Empty-but-validated | Tenant has governance enabled and real governance tasks |
| Inspector | `inspector_list_domains` | CodeArts project UUID | `https://vss.myhuaweicloud.com` | Empty-but-validated | Tenant already has configured scan domains and scan tasks |
| PerfTest | `perftest_list_projects` | Regional IAM project id | `https://cpts.cn-north-4.myhuaweicloud.com` | Empty-but-validated | Account has PerfTest enabled and already contains projects/tasks |

## ID Rules

- Most CodeArts modules use the CodeArts project UUID.
- `perftest_*` is the main exception: `project_id` must be the regional IAM project id.
- `artifact_*` also needs `tenant_id` in addition to `project_id`.

## What Has Already Been Confirmed Live

### Clearly live and usable

- `req_*` returns real project data.
- `repo_*` returns real repository, branch, and compare data.
- `pipeline_*` returns real pipeline and run data.
- `check_list_tasks` returns a real check task.
- `check_list_rulesets` returns real rulesets.

### Reachable, but currently empty or not enabled in this tenant

- `testplan_list_plans` returns `CLOUDTEST.00012003`
  - This indicates the project does not have TestPlan enabled.
- `perftest_list_projects` returns `SVCSTG.CPTS.4031009`
  - This indicates the account has not opened PerfTest.
- `govern_get_quota_info` returns `valid: false` and zero quota
  - This indicates governance is not enabled for the current tenant.
- `inspector_list_domains` returns `200` with `domains: []`
  - This indicates the Inspector API is reachable, but there are no configured domains yet.
- `deploy/build/artifact` return empty collections
  - This indicates the API path and parsing are valid, but the tenant currently lacks business data.

### Detail paths that are already confirmed wired

- `govern_get_task_status`, `govern_get_open_source_summary`, `govern_get_open_source_report`
  - A fabricated task id returns `APIGW.0106` parameter validation.
  - That confirms the official `sbc/*` paths exist and are being validated by the gateway.
- `inspector_get_task`, `inspector_list_results`, `inspector_list_ports`, `inspector_list_business_risks`, `inspector_get_report_status`
  - A fabricated task id returns `CodeArtsInspector.00009999`.
  - That confirms the request reaches the Inspector service ACL/ownership layer instead of failing at routing.

## Fastest Troubleshooting Order

1. Use `req_list_projects` first to validate AK/SK, region, and basic connectivity.
2. Then use `repo_list_repositories` and `pipeline_list_pipelines` to validate common CodeArts endpoints.
3. After that, validate the target module with its first read-only tool.
4. For `TestPlan / PerfTest / Inspector / Govern`, read the error code first before assuming the MCP implementation is broken.

## How To Interpret Common Returns

| Return | First interpretation |
| --- | --- |
| `CLOUDTEST.00012003` | The project has not enabled TestPlan |
| `SVCSTG.CPTS.4031009` | The account has not enabled PerfTest |
| `CodeArtsInspector.00009999` | Inspector detail path is wired, but the task does not belong to the current account or does not exist |
| `APIGW.0106` on `govern_*` detail path | Govern SBC detail path is wired, but the parameter is invalid |

## Related Docs

- `docs/quickstart.md`
- `docs/tool-examples.md`
- `docs/faq.md`
- `docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md`
