# Module Live Readiness

当前结论基于 `2026-04-16` 的北京四真实租户验证。

| 模块 | 首次建议工具 | `project_id` 类型 | 当前状态 | 非空前提 |
| --- | --- | --- | --- | --- |
| Req | `req_list_projects` | 无 | Validated | 已有项目 |
| Repo | `repo_list_repositories` | CodeArts 项目 UUID | Validated | 已有仓库 |
| Pipeline | `pipeline_list_pipelines` | CodeArts 项目 UUID | Validated | 已有流水线 |
| Check | `check_list_tasks` / `check_list_rulesets` | CodeArts 项目 UUID | Validated | 已有检查任务；规则集本身可非空 |
| TestPlan | `testplan_list_plans` | CodeArts 项目 UUID | Empty-but-validated | 项目已开通 TestPlan |
| Deploy | `deploy_list_apps` | CodeArts 项目 UUID | Empty-but-validated | 已有部署应用/记录 |
| Build | `build_list_jobs` | CodeArts 项目 UUID | Empty-but-validated | 已有构建任务/记录 |
| Artifact | `artifact_list_repositories` | CodeArts 项目 UUID + tenant id | Empty-but-validated | 已有仓库/版本 |
| Govern | `govern_get_quota_info` | CodeArts 项目 UUID | Empty-but-validated | 已开通治理且已有真实任务 |
| Inspector | `inspector_list_domains` | CodeArts 项目 UUID | Empty-but-validated | 已配置扫描域名并产生任务 |
| PerfTest | `perftest_list_projects` | 区域 IAM project id | Empty-but-validated | 已开通 PerfTest 且已有工程/任务 |

## 已确认非空的模块

- Req
- Repo
- Pipeline
- Check

## 已确认路径正确但当前租户为空/未开通的模块

- TestPlan
- Deploy
- Build
- Artifact
- Govern
- Inspector
- PerfTest

## Detail path 补充结论

### Govern

- `govern_get_task_status`
- `govern_get_open_source_summary`
- `govern_get_open_source_report`

对伪造 task id 会返回 `APIGW.0106` 参数校验错误，说明官方 `sbc/*` 路径已接通。

### Inspector

- `inspector_get_task`
- `inspector_list_results`
- `inspector_list_ports`
- `inspector_list_business_risks`
- `inspector_get_report_status`

对伪造 task id 会返回 `CodeArtsInspector.00009999`，说明请求已进入服务 ACL/归属校验层，不是 route miss。
