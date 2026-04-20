# 当前实现状态（2026-04-17）

这页是最近一轮 `Req`、`Artifact`、`TestPlan`、`Build`、`Deploy` 真实联调之后的修正版实现快照，回答的是“现在仓库里到底已经写到哪里、哪些已经真实跑通”。

## 模块完成度快照

<!-- GENERATED:implementation-status-table:start -->
| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 8 | 6 | 2 | Validated | Project and work-item read/write loops now have real AK/SK validation on a writable sampled project. |
| Repo | 24 | 17 | 7 | Validated | Full module-level live loop completed. |
| Pipeline | 16 | 11 | 5 | Validated | Full module-level live loop completed. |
| Check | 8 | 5 | 3 | Validated | Full tool-level live loop completed. |
| TestPlan | 7 | 6 | 1 | Partial | Two scanned projects now return real plan samples; 4 routes are re-confirmed as unpublished in Beijing 4. |
| Deploy | 59 | 44 | 15 | Partial | The detailed Deploy page is the source of truth for the expanded v4 surface. `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, `deploy_stop_app`, and `deploy_rollback_app` now all have real AK/SK validation on at least one healthy path. The remaining practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`). |
| Build | 22 | 14 | 8 | Validated | All 22 tools are now AK/SK Full on the current surface, including the 3 helper/configuration tools through real dry-run previews on the live job config. |
| Artifact | 12 | 11 | 1 | Partial | Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4. |
<!-- GENERATED:implementation-status-table:end -->

## 总体数字

<!-- GENERATED:implementation-status-totals:start -->
- Product modules implemented: `8`
- Product tools implemented: `156`
- Auth/session tools implemented: `2`
- Total MCP tools exposed: `158`
<!-- GENERATED:implementation-status-totals:end -->

## 最新真实状态摘要

- `Build`
  - `22/22` are `AK/SK Full`
  - `0/22` remain `Code/Test Only`
- `Req`
  - `8/8` are `AK/SK Full`
  - `0/8` remain `Code/Test Only`
- `Artifact`
  - `5/12` are `AK/SK Full`
  - `7/12` are `Region Unpublished`
- `TestPlan`
  - `1/7` is `AK/SK Full`
  - `2/7` are `AK/SK Reachable`
  - `4/7` are `Region Unpublished`
- `Deploy`
  - `59/59` are implemented in code
  - `deploy_rollback_app` is now real-live validated
  - the detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md`
  - current explicit skip: `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts`

## 仍未达到 `AK/SK Full` 的部分

| Module | Current state | Remaining items |
| --- | --- | --- |
| Artifact | `5 Full / 7 Unpublished` | `artifact_delete_file`, `artifact_list_build_archives`, `artifact_list_files`, `artifact_get_file`, `artifact_get_download_url`, `artifact_search_artifacts`, `artifact_show_audit` |
| TestPlan | `1 Full / 2 Reachable / 4 Unpublished` | Reachable: `testplan_list_issues`, `testplan_list_cases`; Unpublished: `testplan_get_plan`, `testplan_list_runs`, `testplan_get_case`, `testplan_run_cases` |
| Deploy | `Partial` | `deploy_import_hosts_to_environment` remains `AK/SK Reachable`; practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`); explicit skipped route: `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts` |

## 最新 MCP 输出规范化摘要

- `Deploy`
  - record/detail 输出现在更统一地使用实体 id：
    - `deploy_get_history_detail`: `id = record_id`, with separate `taskId`
    - `deploy_get_v4_deploy_record`: `id = record_id`
    - `deploy_get_last_record_detail`: `id = resolved record id`
    - `deploy_get_v4_environment_resource_detail`: `id = environment_id`
  - request context 现在保留得更一致：
    - `deploy_get_status` now carries explicit `taskId` and preserves request-scoped `recordId`
    - `deploy_get_app_log` now carries explicit `recordId` and preserves request-scoped `stepId`
    - `deploy_get_execution_params` now carries `taskId` + `recordId` both on each item and in outer `scope`
    - `deploy_get_runtime_variables` and `deploy_query_variables` now duplicate scope into each item
  - `deploy_list_system_configs` now uses `id = name`

- `Artifact`
  - repository outputs 现在暴露：
    - `repositoryId`
  - version outputs 现在暴露：
    - `versionId`
  - build archive outputs 现在暴露：
    - `archiveId`
  - file outputs 现在暴露：
    - `fileId`
  - search outputs 现在也保留：
    - request-derived `projectId`
    - fallback `repositoryName`

## 实际含义

- `Deploy`
  - 当前 `Partial` 的主要原因已经不是控制面没写完，而是模板/runtime 老旧，以及少数 rollback / v4 样本仍不足
- `Artifact`
  - 当前 `Partial` 的主要原因已经不是本地 MCP 没实现，而是北京四确实还有未发布路由

## Deploy 细节

### 已经写完

- `deploy_list_apps`
- `deploy_list_app_host_groups`
- `deploy_list_host_groups`
- `deploy_get_host_group`
- `deploy_list_host_group_hosts`
- `deploy_list_host_group_environments`
- `deploy_create_environment`
- `deploy_create_application`
- `deploy_modify_application`
- `deploy_create_task_by_template`
- `deploy_list_environment_hosts`
- `deploy_import_hosts_to_environment`
- `deploy_list_system_configs`
- `deploy_list_app_operations_log`
- `deploy_list_environments`
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

### 已经对真实服务做过验证

- 非空真实样本：
  - `deploy_list_apps`
  - `deploy_list_app_host_groups`
  - `deploy_list_host_groups`
  - `deploy_get_host_group`
  - `deploy_list_host_group_hosts`
  - `deploy_list_host_group_environments`
  - `deploy_create_environment`
  - `deploy_create_application`
  - `deploy_modify_application`
  - `deploy_list_environment_hosts`
  - `deploy_list_tasks`
  - `deploy_get_app`
  - `deploy_get_task`
  - `deploy_list_environments`
  - `deploy_list_app_operations_log`
  - `deploy_list_system_configs`
  - `deploy_create_task_by_template`
  - `deploy_get_status`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_get_execution_params`
  - `deploy_start_app`
  - `deploy_stop_app`
- 空结果但真实可达：
  - `deploy_list_histories` with required `start_date + end_date`
- 服务层真实可达，但仍缺完整成功业务样本：
  - `deploy_import_hosts_to_environment`

## 备注

- `Deploy` 不是“没实现”，而是工具面已经写完，真实环境剩余的是样本和模板问题
- 针对扩大的 `v4` host/environment 路由与真实 record 执行链路，详细页 `docs/wiki/Deploy-Live-Validated.md` 已经比这张汇总表更细
- 从 HAR 里还发现了一些额外 Deploy portal 路由，比如 `configs/get` 和 `package_spec`
  - 但它们当前更像浏览器 session 路由，不适合作为 `AK/SK` MCP 工具暴露
- `2026-04-19` 最新模板管理 HAR 已经再次给出经典 `POST /deployman/open/v1/applications/list` 的正样本，`total_num: 14`
- 同一份 HAR 仍没有给出 `v4` app / deploy-record / orchestration 家族的正向浏览器样本，所以这些工具仍更适合归类为“代码已实现 + 路由可达 + 当前租户样本不足”
- `6` 个 `Deploy` `v4` 写预览工具现在在当前已知 record-detail 样本不足时，不再在 `dry_run` 直接硬失败，而是退化为本地预览
- 剩余的 `v4` host-tag 写路由已经不再是当前租户下的主动实现目标：
  - 前端 bundle 证据说明路由存在
  - 当前样本 app/environment 状态并没有暴露可稳定复现的灰度发布 UI 路径
  - 用户已明确同意本轮先跳过
- `deploy_get_template_detail`
  - 仍然是基于前端证据实现，但在北京四属于未发布
- 当前主要阻塞已经不再是“没有真实部署执行记录”：
  - 真实执行记录已经出现在 HAR 反推得到的健康 Node.js 模板路径上
  - `deploy_start_app`、`deploy_get_execution_params`、`deploy_get_status`、`deploy_get_history_detail`、`deploy_get_app_log`、`deploy_stop_app`、`deploy_rollback_app` 都已有真实 record 验证
  - `deploy_get_task` 对任务元数据和步骤名已经真实可用，但当前健康任务响应仍不稳定暴露 `steps[].params`
  - 更老的 app-created 路径仍可能打到 `Deploy.00011042`，但这已经不是当前 Deploy 的主结论
  - 健康 HAR 模板路径现在已经能接受真实 Build 产物 `/codearts-mcp/1.0.0/codearts-mcp.tgz`
  - `下载软件包` 已成功，provider 生成的下载 URL 也能正确解析
  - 新的失败已经后移到模板 runtime：
    - 模板安装 `Node v10.9.0`
    - 后续 `停止nodeJs服务` 会安装并检查 `forever`
    - `forever` 在 Node 10 下失败，因为某依赖使用了不兼容的 numeric separators
  - 这意味着下一步真正要解决的是更新或替换这条老旧 Node.js 部署模板路径，而不是软件包可见性问题
  - `deploy_rollback_app` 现在也已在失败源回滚探测上做过真实验证

## Build 细节

### 已经写完

- `build_list_jobs`
- `build_get_job`
- `build_list_records`
- `build_get_error_log`
- `build_get_history_details`
- `build_get_full_stages`
- `build_get_info_record`
- `build_get_real_time_log`
- `build_get_record`
- `build_get_record_script`
- `build_list_build_parameters`
- `build_list_project_records`
- `build_get_project_record_statistics`
- `build_get_record_flow_graph`
- `build_configure_release_upload_step`
- `build_prepare_deployable_node_app`
- `build_prepare_node_runtime_bundle`
- `build_run_job`
- `build_append_job_step`
- `build_append_release_upload_step`
- `build_stop_job`
- `build_update_job_step`

### 已经对真实服务做过验证

- 非空真实样本：
  - `build_list_jobs`
  - `build_get_job`
  - `build_list_records`
  - `build_get_info_record`
  - `build_list_project_records`
  - `build_get_project_record_statistics`
  - `build_get_record`
  - `build_get_record_script`
  - `build_get_history_details`
  - `build_get_real_time_log`
- `build_get_error_log`
- `build_run_job`
- `build_append_job_step`
- `build_append_release_upload_step`
- `build_stop_job`
- `build_update_job_step`
- 空结果但真实可达：
  - `build_list_build_parameters`
  - `build_get_full_stages`
  - `build_get_record_flow_graph`

### 备注

- `Build` 在当前暴露的工具面上已经达到完整 `AK/SK` 验证
- `3` 个 helper/configuration 工具已经不再只是 code/test-only：
  - `build_configure_release_upload_step`
    - 已在真实 release upload step 上完成 `dry_run` 预览验证
  - `build_prepare_deployable_node_app`
    - 已在真实 `Npm构建` step 上完成 `dry_run` 预览验证
  - `build_prepare_node_runtime_bundle`
    - 已在真实 `Npm构建` step 上完成 `dry_run` 预览验证
- 北京四下已经具备真实的 job、record、run、log、stop、flow-graph 样本
- `build_append_job_step`
  - 不再是盲目的 `dry_run` echo
  - 现在会先读取真实当前 job 配置，再基于该 payload 计算插入步骤预览
  - 在当前租户中，该预览已针对 job `cb9308bf8ece41909247bacd26b32cad` 验证
  - 在 `Npm构建` 后插入 `official.release.upload` 时，实时预览正确给出 `1 -> 2` steps
- `build_append_release_upload_step`
  - 现在以更安全的专用 MCP 面封装官方 release repository upload 模块
  - 固定使用 `module_id=official.release.upload`
  - 会映射 `path`、`name`、`version`、`upload_tool` 等 release-upload 属性
  - 在当前租户中，其真实 `dry_run` 预览同样能在 job `cb9308bf8ece41909247bacd26b32cad` 上给出 `1 -> 2`
- 共享 `/v1/job/update` 写路径已在 `2026-04-18` 用同值 no-op `build_update_job_step` 请求重新验证：
  - provider 接受更新
  - 后续 `build_get_job` 也确认 job 未被破坏
- `build_list_records`
  - 现在额外返回 `build_no` 和 `daily_build_number`
  - 使后续日志/详情查询可以直接脚本化
- 最新 `SCHEDULE_FAILURE` 样本的真实根因是 `scms[0].build_type=tag`
- `build_run_job`
  - 现在会读取当前 job 配置，并用已配置或请求指定的 branch 强制走 branch checkout 执行
- 修复后，真实构建 `#7` 和 `#8` 都已成功完成
- `build_get_record`
  - 现在还会补充更丰富的诊断字段，例如 `status_code`、`execution_id`、`build_yml_path`、`daily_build_number`
- `build_get_job`
  - 现在也会推导当前 job 是否包含 release library 发布步骤
- 旧的 Build 结论已不再适用
- 在 `2026-04-18`，同一个真实 Build job 已被扩展并完成真实验证，可做到：
  - 生成 `codearts-mcp.tgz`
  - 追加真实 release upload step
  - 成功上传到 `/codearts-mcp/1.0.0/`
- 这条 Build job 现在已经能为健康 Deploy 路径提供真实软件包输入

## 相关页面

- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Build-Live-Validated.md`
- `docs/wiki/Req-Live-Validated.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/wiki/Artifact-Live-Validated.md`
- `docs/wiki/TestPlan-Live-Validated.md`
