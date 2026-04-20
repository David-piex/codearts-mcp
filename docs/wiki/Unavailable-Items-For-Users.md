# 当前不能用项清单

这页只回答一件事：

如果你今天直接接入 `codearts-mcp`，`Deploy / TestPlan / Artifact` 里哪些工具先不要试，或者不要把它们当成稳定能力来依赖。

结论基于 `2026-04-19` 在北京四 `cn-north-4` 的真实 `AK/SK` 验证。

这不是“实现进度账本”，而是一张面向使用者的避坑清单。

## 先看结论

- `Req / Repo / Pipeline / Check / Build`
  - 当前可以直接用，不在这页展开
- `TestPlan`
  - 目前只建议把 `testplan_list_plans` 当成稳定首选
- `Artifact`
  - 目前只建议优先用已验证的读工具，不要碰文件详情/下载/审计/删除这一组
- `Deploy`
  - 经典主干链路可用
  - 不建议把 `v4` 发现/详情/写预览链路当成当前租户下的首选演示路径

## Deploy

下面这些不是“没 MCP 化”，而是“现在不适合当首选能力”。

| 工具 / 链路 | 当前状态 | 你大概率会看到什么 | 现在建议怎么做 |
| --- | --- | --- | --- |
| `deploy_list_v4_applications` `deploy_list_v4_environments` `deploy_list_v4_deploy_records` `deploy_list_v4_orchestrations` | 路由已发布，但当前租户没有正样本 | 空列表，或 `records: []` | 先走经典链路：`deploy_list_apps`、`deploy_list_tasks`、`deploy_list_environments`、`deploy_list_histories` |
| `deploy_get_v4_deploy_record` `deploy_get_last_record_detail` | 路由已发布，但当前租户缺少可复用的 `v4` 记录 / 编排样本 | `Deploy.00021534`、`部署记录不存在`，或拿不到可用 id | 先改用 `deploy_get_history_detail`、`deploy_get_status`、`deploy_get_app_log` |
| `deploy_cancel_v4_deploy_record` `deploy_rerun_v4_deploy_record` `deploy_retry_v4_deploy_record` `deploy_rollback_v4_deploy_record` `deploy_pass_v4_manual_check` `deploy_refuse_v4_manual_check` | `dry_run` 可用，但真实执行仍依赖当前租户有正样本 `v4` record | `dry_run` 能预览，真实执行不适合当稳定承诺 | 先把可执行演示放在经典链路：`deploy_start_app`、`deploy_stop_app`、`deploy_rollback_app` |
| `deploy_create_task_by_template` + `deploy_start_app`（旧 Node.js 模板链路） | 控制面已打通，但模板 runtime 老旧 | 可以创建任务和记录，但后续可能卡在 `Node v10.9.0` + `forever` 模板步骤 | 如果你要验证“工具能不能调通”，可以试；如果你要验证“业务能不能稳定部署”，不要把这条旧模板路径当通用成功路径 |

当前 `Deploy` 真正推荐的首选入口：

- `deploy_list_apps`
- `deploy_get_app`
- `deploy_list_tasks`
- `deploy_get_task`
- `deploy_start_app`
- `deploy_get_status`
- `deploy_get_history_detail`
- `deploy_get_app_log`
- `deploy_stop_app`
- `deploy_rollback_app`

## TestPlan

`TestPlan` 当前的核心问题很直接：有一组路由在北京四还没发布，另一组虽然能调通，但当前样本还是空的。

| 工具 | 当前状态 | 你大概率会看到什么 | 现在建议怎么做 |
| --- | --- | --- | --- |
| `testplan_get_plan` | 北京四未发布 | `APIGW.0101` | 先不要试，改用 `testplan_list_plans` |
| `testplan_list_runs` | 北京四未发布 | `APIGW.0101` | 先不要试，当前不能作为稳定能力承诺 |
| `testplan_get_case` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `testplan_run_cases` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `testplan_list_issues` | 路由可达，但当前已知真实计划上都是空结果 | `issues: []` | 可以拿来验证连通性，但不要期待当前租户立刻拿到业务数据 |
| `testplan_list_cases` | 路由可达，但当前已知真实计划上都是空结果 | `cases: []` | 可以拿来验证连通性，但不要拿它做“已有测试资产”的演示 |

当前 `TestPlan` 真正推荐的首选入口：

- `testplan_list_plans`

如果只是想确认你的 `AK/SK`、区域和项目权限没问题，`testplan_list_plans` 足够了。

## Artifact

`Artifact` 当前最明确：有 7 个工具在北京四就是未发布，不是你参数写错了。

| 工具 | 当前状态 | 你大概率会看到什么 | 现在建议怎么做 |
| --- | --- | --- | --- |
| `artifact_list_build_archives` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_search_artifacts` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_list_files` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_get_file` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_get_download_url` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_show_audit` | 北京四未发布 | `APIGW.0101` | 先不要试 |
| `artifact_delete_file` | 北京四未发布 | `APIGW.0101` | 先不要试 |

当前 `Artifact` 真正推荐的首选入口：

- `artifact_list_repositories`
- `artifact_list_versions`
- `artifact_list_latest_version_files`
- `artifact_get_repository`
- `artifact_get_file_tree`

如果你只是想确认当前租户有没有实际发布物，优先看：

- `artifact_list_versions`
- `artifact_list_latest_version_files`

## 最后怎么判断是不是工具坏了

可以按下面这条简单规则判断：

- 返回 `APIGW.0101`
  - 优先理解成“北京四当前未发布”，不是你这边参数错了
- 返回空列表 / 空对象
  - 先理解成“当前租户没有正样本”，不是 MCP 工具没实现
- 能创建记录，但执行卡在模板步骤
  - 优先理解成“模板/runtime 本身老旧或不兼容”，不是控制面没打通

如果你要给团队成员一张最短说明，直接告诉他们：

- `Deploy` 先走经典链路，不要先碰 `v4`
- `TestPlan` 先只用 `testplan_list_plans`
- `Artifact` 先只用版本 / 文件树 / 仓库读取，别碰文件详情与删除
