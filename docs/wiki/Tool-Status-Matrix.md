# Tool Status Matrix

基于当前仓库实现、测试文件分布，以及 `2026-04-17` 北京四真实联调结果整理。

这个页面的目标不是重复 README 的工具列表，而是回答两个更具体的问题：

- 哪些 CodeArts 子功能已经 MCP 化
- 每个 tool 当前处于“已实现 / 有单测 / 有 live / 已真实验证 / 仍有缺口”的哪一层

## Status Legend

- `Validated`: 已做真实联调，且当前租户拿到过成功响应
- `Empty-but-validated`: 已命中真实服务并成功返回，但当前样本为空或当前租户业务数据不足
- `Partial`: 已实现，但真实闭环仍不完整
- `Validated (manual)`: 当前没有独立 live 测试文件，但已手工做过真实验证

## Summary

| Module | Tools | Unit-Tested | Live-Tested | Overall Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 8 | 8 | 8 | Validated | 模块级真实闭环已完成 |
| Repo | 24 | 24 | 24 | Validated | 模块级真实闭环已完成 |
| Pipeline | 16 | 16 | 16 | Validated | 模块级真实闭环已完成 |
| Check | 8 | 8 | 8 | Validated | 工具级真实闭环已完成 |
| TestPlan | 7 | 0 | 7 | Empty-but-validated | 当前租户未开通 TestPlan |
| Deploy | 13 | 0 | 13 | Empty-but-validated | 路径已验证，缺真实 app/task/history |
| Build | 16 | 3 | 16 | Empty-but-validated | 路径已验证，缺真实 job/record |
| Artifact | 12 | 3 | 12 | Empty-but-validated | 路径已验证，缺真实 repository/version/file |
| Govern | 28 | 25 | 4 | Partial | 已实现 28 tools；仍保留明确缺口 |
| Inspector | 8 | 1 | 7 | Empty-but-validated | 路径已验证，缺真实 domain/task |
| PerfTest | 9 | 0 | 9 | Empty-but-validated | 当前账号未开通 PerfTest |

## Check

| Tool | Kind | Unit Test | Live Test | Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `check_create_task` | write | yes | yes | Validated | 已用 CodeHub SSH `git_url` 真实创建成功 |
| `check_get_metrics` | read | yes | yes | Validated | 已核实真实路径 `/v2/{project_id}/tasks/{task_id}/metrics-summary` |
| `check_get_task` | read | yes | yes | Validated | 已用完成检查的真实任务验证成功 |
| `check_list_rulesets` | read | yes | yes | Validated | 真实非空 ruleset 已验证 |
| `check_list_task_issues` | read | yes | yes | Validated | 已修正到 `defects-detail`，真实返回过非空和空列表两种样本 |
| `check_list_tasks` | read | yes | yes | Validated | 真实非空 task 列表已验证 |
| `check_run_task` | write | yes | yes | Validated | 已核实发送 `{}` 后真实触发成功 |
| `check_stop_task` | write | yes | yes | Validated | 已用真实运行中任务验证；成功响应为 `200` 空 body |

## Req

| Tool | Kind | Unit Test | Live Test | Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `req_create_work_item` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `req_get_project` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_get_work_item` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_list_iterations` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_list_project_members` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_list_projects` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_list_work_items` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `req_update_work_item` | write | yes | yes | Validated | 真实非空 live 已验证 |

## Repo

| Tool | Kind | Unit Test | Live Test | Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `repo_close_merge_request` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_compare_refs` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_create_merge_request` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_create_merge_request_discussion` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_create_tag` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_delete_tag` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_branch` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_commit` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_file` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_merge_request` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_repository` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_get_tag` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_branches` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_commits` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_events` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_merge_request_changes` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_merge_request_discussions` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_merge_requests` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_protected_branches` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_repositories` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_repository_labels` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_list_tags` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_merge_merge_request` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `repo_review_merge_request` | write | yes | yes | Validated | 真实非空 live 已验证 |

## Pipeline

| Tool | Kind | Unit Test | Live Test | Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `pipeline_approve_run` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_manual_review_context` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_pipeline` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_run` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_run_detail` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_run_log` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_run_parameters` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_get_step_outputs` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_list_artifacts` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_list_pipelines` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_list_runs` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_list_templates` | read | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_reject_run` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_retry_run` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_run_pipeline` | write | yes | yes | Validated | 真实非空 live 已验证 |
| `pipeline_stop_run` | write | yes | yes | Validated | 真实非空 live 已验证 |

## Govern

当前 Govern 需要单独看，因为它不是“没做”，而是“实现很多，但 live 闭环层次不完全一致”。

明确已知缺口：

- `govern_list_tasks` 仍未实现，因为公开文档和真实环境都还没有可信正式 URI
- `sbc/osi/item/dependency` 当前北京四真实环境仍返回 `APIGW.0101`，不作为可接入接口
- `govern_get_osi_item_detail` / `govern_list_osi_item_vulns` 当前只建议用 `software_name + software_version`

## Related Docs

- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/check-live-findings-2026-04-17.md`
