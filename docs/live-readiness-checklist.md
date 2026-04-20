# 真实可用性检查表

适用范围：

- Region: `cn-north-4`
- Validation date: `2026-04-20`
- Active modules: Req / Repo / Pipeline / Check / TestPlan / Deploy / Build / Artifact

## 一眼看懂

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

## 推荐验证顺序

1. 先验证 `Req / Repo / Pipeline`
2. 再验证 `Build / Check`
3. 把 `Deploy / TestPlan / Artifact` 放到最后一轮，因为它们更依赖租户里的真实业务数据

## 说明

- `Artifact` 往往需要真实 `tenant_id`
- 写操作建议优先使用 `dry_run`
- `Deploy` 当前 `Partial` 的主要原因已经是模板/runtime 老旧和 rollback 样本问题，而不是基础 app/environment/host 路径缺失
- `Artifact` 当前 `Partial` 的主要原因已经是北京四未发布路由，而不是本地 MCP 没实现
- 当前真实可用状态请以 `docs/wiki/Module-Live-Readiness.md` 为准
