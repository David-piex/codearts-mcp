# 能力矩阵

这页用于汇总当前仓库已经实现的 MCP 能力，并结合本地测试和截至 `2026-04-19` 的北京四 `cn-north-4` 真实 `AK/SK` 验证结果，给出模块级视角的能力快照。

## 字段说明

- `Read`
  - 已实现的读工具数量
- `Write`
  - 已实现的写工具数量
- `Live`
  - 当前真实联调状态
- `Key Gaps`
  - 当前模块剩余的主要闭环缺口

## 当前矩阵

<!-- GENERATED:capability-matrix:start -->
| Module | Read | Write | Live | Key Gaps |
| --- | --- | --- | --- | --- |
| Req | 6 | 2 | Validated | Project and work-item read/write paths are now fully live-validated |
| Repo | 17 | 8 | Validated | All 25 Repo tools, including `repo_create_repository`, now have real AK/SK validation on the writable sampled project |
| Pipeline | 42 | 35 | Partial | The original execution surface is live-validated, but the 51 newly added extension-endpoint/group/variable-group/rule-management/tag-management/tenant-strategy/project-strategy tools still need real AK/SK validation |
| Check | 5 | 3 | Validated | Tool-level live closure is complete |
| TestPlan | 6 | 1 | Partial | `get_plan / list_runs / get_case / run_cases` are unpublished in Beijing 4 |
| Deploy | 44 | 15 | Partial | Expanded Deploy v4 environment/record/variable surface is implemented; the detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md` |
| Build | 14 | 8 | Validated | All 22 tools are now fully live-validated, including the 3 helper/configuration tools via real dry-run previews |
| Artifact | 11 | 1 | Partial | 5 tools are fully live-validated, and 7 routes are now re-confirmed by live smoke as unpublished in Beijing 4 |
<!-- GENERATED:capability-matrix:end -->

## 当前重点

### 已完整验证

- Req
- Repo
- Pipeline
- Check
- Build

### 已实现且可用，但仍受真实条件限制

- TestPlan
- Deploy
- Artifact

## 说明

### TestPlan

- `testplan_list_plans`
  - 已在两个扫描到真实计划数据的项目上完成验证
- `testplan_list_issues` 和 `testplan_list_cases`
  - 路由可达，但当前已知真实计划上结果仍为空
- `testplan_get_plan`、`testplan_list_runs`、`testplan_get_case`、`testplan_run_cases`
  - 当前在北京四仍返回 `APIGW.0101`

### Artifact

- `artifact_get_file_tree`、`artifact_get_repository`、`artifact_list_repositories`、`artifact_list_versions`、`artifact_list_latest_version_files`
  - 已完成真实联调验证
- `artifact_delete_file`、`artifact_list_build_archives`、`artifact_list_files`、`artifact_get_file`、`artifact_get_download_url`、`artifact_search_artifacts`、`artifact_show_audit`
  - 当前在北京四仍属于未发布路由
- 这 `7` 条未发布结论已经由集中式真实 `AK/SK` smoke 覆盖，不再只是单次手工探测
- 当前本地 MCP 输出也已统一补齐更稳定的类型化 id：
  - repository ids
  - version ids
  - archive ids
  - file ids

### Build

- 当前已经具备真实样本的能力包括：
  - job listing
  - job detail
  - record listing
  - record detail
  - script
  - history details
  - real-time log
  - error log
  - run
  - stop
  - project-level record views
- `build_list_build_parameters`、`build_get_full_stages`、`build_get_record_flow_graph`
  - 在采样构建上可以真实调用成功，但业务结果可能为空

### Deploy

- 当前已经具备真实样本的能力包括：
  - application listing
  - app-visible host-group listing
  - environment creation
  - environment-host listing
  - task listing
  - host-group listing
  - host-group detail
  - host-group host listing
- `Codearts-mcp`
  - 当前租户里已经具备真实 app、task、environment 以及已连接主机链路
- `deploy_list_host_group_environments`
  - 在当前已知真实 host group 上已经可以返回非空结果
- 旧的 `Deploy.00011042` 结论已经不再适合作为当前主结论
- 健康的 Node.js 模板路径现在已经能创建真实执行记录，并验证：
  - `deploy_start_app`
  - `deploy_get_execution_params`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_stop_app`
- 当前主要阻塞已经后移到老旧模板 runtime：
  - `Node v10.9.0`
  - `forever`
