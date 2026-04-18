# Live Readiness Checklist

Applies to:

- Region: `cn-north-4`
- Validation date: `2026-04-19`
- Active modules: Req / Repo / Pipeline / Check / TestPlan / Deploy / Build / Artifact

## At a Glance

| Module | First tool to try | Key ids | Recommended endpoint | Current status |
| --- | --- | --- | --- | --- |
| Req | `req_list_projects` | `project_id` | `https://projectman-ext.cn-north-4.myhuaweicloud.com` | Validated |
| Repo | `repo_list_repositories` | `project_id`, `repository_id` | `https://codehub-ext.cn-north-4.myhuaweicloud.com` | Validated |
| Pipeline | `pipeline_list_pipelines` | `project_id`, `pipeline_id` | `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com` | Validated |
| Check | `check_list_tasks` | `project_id`, `task_id` | `https://codecheck-ext.cn-north-4.myhuaweicloud.com` | Validated |
| TestPlan | `testplan_list_plans` | `project_id`, `plan_id` | `https://cloudtest-ext.cn-north-4.myhuaweicloud.com` | Partial |
| Deploy | `deploy_list_apps` | `project_id`, `application_id` | `https://codearts-deploy.cn-north-4.myhuaweicloud.com` | Partial |
| Build | `build_list_jobs` | `job_id`, `record_id` | `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com` | Validated |
| Artifact | `artifact_list_repositories` | `project_id`, `tenant_id` | `https://artifact.cn-north-4.myhuaweicloud.cn` | Partial |

## Suggested Order

1. Validate `Req / Repo / Pipeline` first
2. Then validate `Build / Check`
3. Leave `Deploy / TestPlan / Artifact` for the final round because they depend more on existing tenant data

## Notes

- `Artifact` often requires a real `tenant_id`
- prefer `dry_run` before real writes
- `Deploy` partial status is now mostly about template/runtime age and rollback samples, not missing basic app/environment/host paths
- `Artifact` partial status is now mostly about Beijing 4 unpublished routes, not missing local MCP implementation
- use `docs/wiki/Module-Live-Readiness.md` as the source of truth for current live status
