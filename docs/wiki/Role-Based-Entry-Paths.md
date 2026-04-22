# Role-Based Entry Paths

这页回答的是另一个很实际的问题：

不同角色的人，应该先看哪些模块、先读哪些页面、先跑哪些工具。

如果你不想先理解全部架构，而是想“我现在是开发 / 测试 / 运维，该怎么最快用起来”，就从这里开始。

## 一张总表

| 角色 | 优先模块 | 先看文档 | 第一批工具 | 当前建议 |
| --- | --- | --- | --- | --- |
| 开发者 | Repo / Check / Build | `Getting-Started` `Module-Functions-Overview` | `repo_list_repositories` `check_list_tasks` `build_list_jobs` | 适合直接接入 |
| 测试 / QA | TestPlan / Req / Pipeline | `Getting-Started` `Module-Live-Readiness` | `testplan_list_plans` `req_list_projects` `pipeline_list_runs` | 先确认区域可用性 |
| 运维 / 平台 | Deploy / Build / Artifact | `Testing-and-Live-Ops` `Troubleshooting` | `deploy_list_apps` `build_list_project_records` `artifact_list_versions` | 联调前先准备样本 |
| 发布 / 交付 | Build / Pipeline / Deploy | `Module-Functions-Overview` `Testing-and-Live-Ops` | `build_run_job` `pipeline_run_pipeline` `deploy_create_task_by_template` | 推荐按受控写路径推进 |
| 项目经理 / 需求负责人 | Req / Repo | `Getting-Started` `Module-Functions-Overview` | `req_list_projects` `req_list_work_items` `repo_list_merge_requests` | 适合读多写少地使用 |
| MCP 维护者 | 全部，重点看 Server / Pipeline / Deploy | `Architecture-Deep-Dive` `Capability-Matrix` `Module-Live-Readiness` | `auth_configure_session` + 各模块 smoke 工具 | 优先关注 live 闭环和文档漂移 |

## 1. 开发者

如果你的关注点是代码协作、质量反馈和构建结果，优先用这三个模块：

- `Repo`
- `Check`
- `Build`

推荐阅读顺序：

1. [Getting-Started](./Getting-Started.md)
2. [Module-Functions-Overview](./Module-Functions-Overview.md)
3. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)

建议先跑的工具：

- `repo_list_repositories`
- `repo_list_merge_requests`
- `check_list_tasks`
- `check_list_task_issues`
- `build_list_jobs`
- `build_get_real_time_log`

适合你的典型场景：

- 看仓库和 MR 当前状态
- 查代码检查结果和指标
- 看构建日志、错误日志和最近记录

## 2. 测试 / QA

如果你的关注点是测试计划、测试用例、缺陷和流水线执行，优先看：

- `TestPlan`
- `Req`
- `Pipeline`

推荐阅读顺序：

1. [Getting-Started](./Getting-Started.md)
2. [Module-Functions-Overview](./Module-Functions-Overview.md)
3. [Module-Live-Readiness](./Module-Live-Readiness.md)

建议先跑的工具：

- `testplan_list_plans`
- `testplan_list_cases`
- `req_list_work_items`
- `pipeline_list_runs`

要特别注意：

- `TestPlan` 的一部分接口受北京四发布状态影响
- 如果你要做批量执行用例，最好先看当前租户是否真的暴露了对应路由

## 3. 运维 / 平台

如果你的关注点是部署环境、构建产物、部署记录和排障，优先看：

- `Deploy`
- `Build`
- `Artifact`

推荐阅读顺序：

1. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
2. [Troubleshooting](./Troubleshooting.md)
3. [Module-Live-Readiness](./Module-Live-Readiness.md)

建议先跑的工具：

- `deploy_list_apps`
- `deploy_list_tasks`
- `deploy_list_histories`
- `build_list_project_records`
- `artifact_list_versions`

现实建议：

- 先做读路径和 dry-run 联调
- execute-class 的真实动作不要直接在共享环境盲跑
- 涉及 `Deploy` 时，先确认样本 `task_id / record_id / host_group` 是否齐全

## 4. 发布 / 交付工程师

如果你的关注点是从构建到发布的整条链路，优先模块是：

- `Build`
- `Pipeline`
- `Deploy`

推荐阅读顺序：

1. [Module-Functions-Overview](./Module-Functions-Overview.md)
2. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
3. [Troubleshooting](./Troubleshooting.md)

建议先跑的工具：

- `build_run_job`
- `pipeline_run_pipeline`
- `deploy_create_task_by_template`
- `deploy_start_app`

推荐节奏：

1. 先确认构建任务可正常读写
2. 再确认流水线可真实触发
3. 最后进入 Deploy 的受控写路径

## 5. 项目经理 / 需求负责人

如果你的目标是让 AI 帮你看项目状态，而不是直接去做高风险操作，优先看：

- `Req`
- `Repo`

推荐阅读顺序：

1. [Getting-Started](./Getting-Started.md)
2. [Module-Functions-Overview](./Module-Functions-Overview.md)

建议先跑的工具：

- `req_list_projects`
- `req_list_work_items`
- `req_list_iterations`
- `repo_list_merge_requests`

适合的用法：

- 看项目进度
- 看当前需求 / 缺陷列表
- 看 MR 流转和仓库活动

## 6. MCP 维护者 / 二开同学

如果你是要继续扩模块、补 live、修共享会话、优化文档，建议直接按维护视角阅读：

推荐阅读顺序：

1. [Architecture-Deep-Dive](./Architecture-Deep-Dive.md)
2. [Capability-Matrix](./Capability-Matrix.md)
3. [Module-Live-Readiness](./Module-Live-Readiness.md)
4. [Official-API-Alignment](./Official-API-Alignment.md)
5. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)

先关注这些代码入口：

- `src/server/index.ts`
- `src/server/http-app.ts`
- `src/server/create-server.ts`
- `src/server/product-tool-registry.ts`
- `src/server/session-aware-product-handlers.ts`
- `src/server/module-stats-docs.ts`

维护时最值得优先看的问题：

- 哪些模块代码实现很多，但 live 闭环还不够
- 哪些文档数字会随着工具增长而漂移
- 哪些 execute-class 用例需要专门样本

## 角色选型建议

如果你只想先选一条最稳的起步路径：

- 开发者：`Repo + Check + Build`
- 测试：`Req + TestPlan`
- 运维：`Build + Deploy`
- 交付：`Build + Pipeline + Deploy`
- 管理侧：`Req + Repo`

## 下一步看什么

- 想直接照着工具顺序跑：看 [Typical-Workflow-Playbooks](./Typical-Workflow-Playbooks.md)
- 想先理解模块能做什么：看 [Module-Functions-Overview](./Module-Functions-Overview.md)
- 想看模块规模和缺口：看 [Capability-Matrix](./Capability-Matrix.md)
- 想看真实联调就绪度：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
