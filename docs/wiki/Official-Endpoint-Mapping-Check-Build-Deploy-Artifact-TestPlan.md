# Official Endpoint Mapping: Check / Build / Deploy / Artifact / TestPlan

这页是 `Official-Endpoint-Mapping-Req-Repo-Pipeline.md` 的补完页。

目标不是再讲一遍“模块整体差距”，而是继续把剩余 5 个模块的 MCP 工具，往官方 PDF 的 operation 或路径族上压实。

说明:

- 这里统一使用 `Official Operation / Family` 这一列。
- 如果官方 PDF 里能直接定位到稳定的 CamelCase operation 名，就写 operation 名。
- 如果官方 PDF 更像是按路径族或版本面在组织，难以稳定提取单一 operation 名，就写 `... family`，并在备注里说明这是路径级对齐。
- `Direct` 表示当前 MCP 工具与官方接口语义基本 1:1。
- `Derived` 表示 MCP 工具复用了官方接口，但对响应、兼容路径或参数做了二次整理。
- `Composite` 表示 MCP 工具由多个官方接口或一次“读配置 + 写回”的组合动作构成。

## Check

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `check_create_task` | `CreateTaskV2` | Direct | `POST /v2/{project_id}/task` | 当前 provider 直接走 v2 新建任务主链 |
| `check_list_tasks` | `ShowTaskListByProjectIdV2` | Direct | `GET /v2/{project_id}/tasks?...` / `GET /v2/tasks?...` | 同时兼容项目内列表和全局列表视角 |
| `check_get_task` | `defects-summary family` | Derived | `GET /v2/tasks/{task_id}/defects-summary` | 不是完整 task detail endpoint 镜像，而是用缺陷概要接口整理轻量任务详情 |
| `check_list_task_issues` | `ShowTaskDefectsV2` | Direct | `GET /v2/tasks/{task_id}/defects-detail?...` | 缺陷详情列表主链 |
| `check_get_metrics` | `ShowTaskCmetrics` | Direct | `GET /v2/{project_id}/tasks/{task_id}/metrics-summary` / `GET /v2/tasks/{task_id}/metrics-summary` | 代码度量概要主链 |
| `check_list_rulesets` | `ListRulesets` | Direct | `GET /v2/{project_id}/rulesets?...` | 规则集列表 |
| `check_run_task` | `RunTaskV2` | Direct | `POST /v2/tasks/{task_id}/run` | 执行检查任务 |
| `check_stop_task` | `StopTaskByIdV2` | Direct | `POST /v2/tasks/{task_id}/stop` | 终止检查任务 |

## Build

### Read / Execute

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `build_list_jobs` | `ShowJobListByProjectId` | Direct | `GET /v1/job/{project_id}/list?...` | 项目下构建任务列表 |
| `build_get_job` | `ShowJobConfig` | Direct | `GET /v1/job/{job_id}/config` | 构建任务详情 |
| `build_run_job` | `ExecuteJob` | Derived | `GET /v1/job/{job_id}/config` + `POST /v1/job/execute` | MCP 会先读一次 job config，补齐 branch 等运行上下文 |
| `build_stop_job` | `StopJob` | Direct | `POST /v3/jobs/stop` | 当前代码走待下线路径族，和官方文档一致 |
| `build_list_records` | `ListBuildInfoRecordByJobId` | Direct | `GET /v1/record/{job_id}/list?...` | 任务构建记录列表 |
| `build_get_record` | `ShowBuildRecord` | Direct | `GET /v1/record/{record_id}/info` | 指定构建记录详情 |
| `build_get_info_record` | `ShowBuildInfoRecord` | Direct | `GET /v1/record/{job_id}/{build_no}/build-info-record` | 指定 job/build_no 的简要构建信息 |
| `build_get_history_details` | `ShowHistoryDetails` | Direct | `GET /v3/jobs/{job_id}/{build_number}/history-details` | 构建历史详情 |
| `build_list_project_records` | `ListRecords` | Direct | `GET /v1/record/{build_project_id}/records?...` | 指定工程构建记录列表 |
| `build_get_project_record_statistics` | `ShowJobTotal` | Direct | `GET /v1/record/{build_project_id}/statistics` | 构建历史页统计 |
| `build_list_build_parameters` | `ListBuildParameter` | Direct | `GET /v1/job/{job_id}/{build_no}/history-parameters` | 详情页构建参数 |
| `build_get_full_stages` | `ShowBuildRecordFullStages` | Direct | `GET /v1/record/{record_id}/full-stages?...` | 阶段信息 |
| `build_get_record_flow_graph` | `ShowBuildRecordFlowGraph` | Direct | `GET /v1/record/{record_id}/flow-graph` | 官方 PDF 使用 `{build_flow_record_id}` 命名，provider 这里统一成 `record_id` |
| `build_get_record_script` | `ShowBuildRecordBuildScript` | Direct | `GET /v1/record/{record_id}/build-script` | 构建脚本 |
| `build_get_real_time_log` | `real-time-log family` | Derived | `GET /v3/jobs/{job_id}/{build_no}/real-time-log?...` | 官方文档存在 v1/v3 两套实时日志面，MCP 直接使用 v3 偏流式路径 |
| `build_get_error_log` | `ShowLogAnalysis` | Direct | `GET /v1/log/{job_id}/{build_no}/analysis?...` | 失败错误日志分析 |

### Config / Helper

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `build_update_job_step` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 先读配置，再按 step 名局部更新 |
| `build_append_job_step` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 不是官方单一 endpoint，而是“读配置后插入 step” |
| `build_append_release_upload_step` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 在构建任务里追加官方制品上传 step |
| `build_configure_release_upload_step` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 定位既有上传 step 并重写其参数 |
| `build_prepare_node_runtime_bundle` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 项目增强 helper，不是官方原子 API |
| `build_prepare_deployable_node_app` | `ShowJobConfig` + `UpdateNewJob` | Composite | `GET /v1/job/{job_id}/config` + `POST /v1/job/update` | 针对 Node 单文件部署包的增强 helper |

## Deploy

说明:

- Deploy 是当前最接近“产品级 MCP 化”的模块，但官方 PDF 同时混有老面、推荐面和 v4 面。
- legacy `v1 / v2` 面的大部分 operation 能从 PDF 目录直接定位。
- `v4` 面在当前文档里更适合按路径族对齐，因此这部分统一写成 `... family`。

### Legacy App / Task / Environment

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `deploy_list_apps` | `ListAllApp` | Direct | `POST /v1/applications/list` | 推荐应用列表接口 |
| `deploy_create_application` | `CreateApp` | Direct | `POST /v1/applications` | 推荐新建应用接口 |
| `deploy_modify_application` | `UpdateAppInfo` | Direct | `PUT /v1/applications` | 修改应用配置 |
| `deploy_get_app` | `ShowAppDetailById` | Direct | `GET /v1/applications/{application_id}/info` | 推荐应用详情接口 |
| `deploy_get_app_log` | `ShowAppLog` | Direct | `GET /v1/applications/{application_id}/records/{record_id}/logs?...` | 应用全量日志 |
| `deploy_create_task_by_template` | `CreateDeployTaskByTemplate` | Direct | `POST /v2/tasks/template-task` | 通过模板建部署任务 |
| `deploy_list_tasks` | `ListTask` | Direct | `GET /v2/{project_id}/tasks/list?...` | 任务列表 |
| `deploy_get_task` | `ShowTask` family | Derived | `GET /v2/tasks/{task_id}`<br>`GET /v2/task/detail/{task_id}` | 代码同时兼容两条任务详情路径 |
| `deploy_get_deploy_source_detail` | `ShowTaskTrigger` family | Direct | `GET /v2/task/trigger/detail?task_id=...` | 任务触发源/制品源详情 |
| `deploy_get_template_detail` | `template detail family` | Direct | `GET /v1/deploytemplate/template/{template_id}/getTemplate?...` | 模板详情读取 |
| `deploy_start_app` | `StartDeployTask` | Direct | `POST /v2/tasks/{task_id}/start` | 启动部署 |
| `deploy_stop_app` | `StopDeployTaskRecordV2` | Direct | `PUT /v2/tasks/{task_id}/records/{record_id}/stop` | 停止部署 |
| `deploy_rollback_app` | `RollbackRecords` | Derived | `POST /v2/tasks/{task_id}/start` | provider 通过 `record_id` 驱动回滚语义，不是单独 rollback 路径 |
| `deploy_list_histories` | `ListDeployTaskHistoryByDate` family | Direct | `GET /v2/{project_id}/task/{task_id}/history?...` | 历史部署记录列表 |
| `deploy_get_history_detail` | `task state detail family` | Direct | `GET /v2/tasks/{task_id}/state?record_id=...&step_state=true` | 记录详情与 step state |
| `deploy_get_status` | `ShowDeployStatus` family | Direct | `GET /v2/tasks/{task_id}/state?...` | 部署状态摘要 |
| `deploy_get_execution_params` | `execution params family` | Derived | `GET /v2/history/tasks/{task_id}/params?record_id=...`<br>`GET /v1/tasks/{task_id}/records/{record_id}/execution-params` | 兼容两条执行参数读取链 |

### Host Group / Environment / Operations Log

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `deploy_list_app_host_groups` | `ListHostGroupBaseInfos` | Direct | `GET /v1/applications/{application_id}/host-groups/base/infos?...` | 应用侧可用主机组 |
| `deploy_list_host_groups` | `ListHostGroups` | Direct | `GET /v1/resources/host-groups?...` | 主机组列表 |
| `deploy_get_host_group` | `host-group detail family` | Direct | `GET /v1/resources/host-groups/{group_id}` | 主机组详情 |
| `deploy_list_host_group_hosts` | `host-group hosts family` | Direct | `GET /v1/resources/host-groups/{group_id}/hosts?...` | 主机组下主机列表 |
| `deploy_list_host_group_environments` | `ListAssociateEnvironmentsInfos` | Direct | `GET /v1/resources/host-groups/{group_id}/environments/infos?...` | 主机组关联环境信息 |
| `deploy_create_environment` | `CreateEnvironment` | Direct | `POST /v1/applications/{application_id}/environments` | 应用下创建环境 |
| `deploy_list_environments` | `ListEnvironments` | Direct | `GET /v1/applications/{application_id}/environments?...` | 环境列表 |
| `deploy_list_environment_hosts` | `ListEnvironmentHosts` | Direct | `GET /v1/applications/{application_id}/environments/{environment_id}/hosts?...` | 环境内主机列表 |
| `deploy_import_hosts_to_environment` | `ImportHostToEnvironment` | Direct | `POST /v1/applications/{application_id}/environments/{environment_id}/hosts/import` | 向环境导入主机 |
| `deploy_list_app_operations_log` | `application operations log family` | Direct | `POST /v1/applications/{app_id}/operations/log` | 应用操作日志 |
| `deploy_list_system_configs` | `ListSystemConfigs` | Direct | `GET /v3/system/configs` | 系统配置键列表 |

### Variables

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `deploy_get_runtime_variables` | `runtime variables family` | Direct | `GET /v4/projects/{project_id}/runtime-variables?...` | v4 运行时变量 |
| `deploy_list_variables` | `variables family` | Direct | `GET /v4/projects/{project_id}/variables?...` | 变量列表 |
| `deploy_query_variables` | `variables query family` | Direct | `GET /v4/projects/{project_id}/variables/query?...` | 变量查询 |
| `deploy_list_variable_history` | `variable history family` | Direct | `GET /v4/projects/{project_id}/variables/history?...` | 变量历史 |

### V4 Application / Cluster / Environment / Orchestration / Record

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `deploy_list_v4_applications` | `v4 application list family` | Direct | `POST /v4/applications/list` | v4 应用面入口 |
| `deploy_list_v4_clusters` | `v4 cluster list family` | Direct | `POST /v4/projects/{project_id}/clusters/list` | 集群列表 |
| `deploy_get_v4_cluster_count` | `v4 cluster count family` | Direct | `GET /v4/projects/{project_id}/clusters/count?...` | 集群数量统计 |
| `deploy_get_v4_cluster` | `v4 cluster detail family` | Direct | `GET /v4/projects/{project_id}/clusters/{cluster_id}?cluster_type=...` | 集群详情 |
| `deploy_get_v4_cluster_host` | `v4 cluster host detail family` | Direct | `GET /v4/projects/{project_id}/clusters/{cluster_id}/hosts/{host_id}` | 集群主机详情 |
| `deploy_list_v4_cluster_hosts` | `v4 cluster hosts family` | Direct | `POST /v4/projects/{project_id}/clusters/{cluster_id}/hosts/list` | 集群主机列表 |
| `deploy_get_v4_environment` | `v4 environment detail family` | Direct | `GET /v4/projects/{project_id}/environments/{environment_id}` | 环境详情 |
| `deploy_get_v4_environment_resource_detail` | `v4 environment resource detail family` | Direct | `GET /v4/projects/{project_id}/environments/{environment_id}/resource-detail` | 环境资源详情 |
| `deploy_list_v4_environment_hosts` | `v4 environment hosts family` | Direct | `GET /v4/projects/{project_id}/environments/{environment_id}/hosts?...` | v4 环境主机列表 |
| `deploy_list_v4_environments` | `v4 environment list family` | Direct | `POST /v4/projects/{project_id}/environments/list` | v4 环境列表 |
| `deploy_list_v4_environment_applications` | `v4 environment applications family` | Direct | `POST /v4/projects/{project_id}/environments/{environment_id}/applications-list` | 环境下应用列表 |
| `deploy_list_deployment_units` | `v4 deployment units family` | Direct | `GET /v4/projects/{project_id}/applications/{app_id}/deployment-units` | 应用部署单元列表 |
| `deploy_list_v4_orchestrations` | `v4 orchestration list family` | Direct | `POST /v4/projects/{project_id}/orchestrations/list` | 编排列表 |
| `deploy_list_v4_deploy_records` | `v4 deploy record list family` | Direct | `POST /v4/projects/{project_id}/deploy-records` | v4 部署记录列表 |
| `deploy_get_last_record_detail` | `v4 last record detail family` | Direct | `GET /v4/projects/{project_id}/orchestrations/{orchestration_id}/last-record-detail` | 编排最近一次记录详情 |
| `deploy_get_v4_deploy_record` | `v4 deploy record detail family` | Direct | `GET /v4/projects/{project_id}/deploy-records/{record_id}?...` | 记录详情 |
| `deploy_get_v4_deploy_record_step_detail` | `v4 deploy record step detail family` | Direct | `GET /v4/projects/{project_id}/deploy-records/{record_id}/step-detail` | step 详情 |
| `deploy_get_v4_deploy_record_step_logs` | `v4 deploy record step logs family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/step/{step_id}/logs` | step 日志 |

### V4 Write Path

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `deploy_add_v4_environment_hosts` | `v4 environment hosts mutation family` | Direct | `POST /v4/projects/{project_id}/environments/{environment_id}/hosts` | 向环境加主机 |
| `deploy_delete_v4_environment_hosts` | `v4 environment hosts mutation family` | Direct | `DELETE /v4/projects/{project_id}/environments/{environment_id}/hosts` | 从环境删主机 |
| `deploy_delete_v4_cluster_hosts` | `v4 cluster hosts mutation family` | Direct | `DELETE /v4/projects/{project_id}/clusters/{cluster_id}/hosts/batch-delete` | 从集群删主机 |
| `deploy_cancel_v4_deploy_record` | `v4 deploy record cancel family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/cancel` | 取消记录 |
| `deploy_rerun_v4_deploy_record` | `v4 deploy record rerun family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/rerun` | 重新执行 |
| `deploy_retry_v4_deploy_record` | `v4 deploy record retry family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/retry` | 失败后重试 |
| `deploy_rollback_v4_deploy_record` | `v4 deploy record rollback family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/rollback` | v4 回滚 |
| `deploy_pass_v4_manual_check` | `v4 manual check pass family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/step/{step_id}/pass` | 放行人工审核 |
| `deploy_refuse_v4_manual_check` | `v4 manual check refuse family` | Direct | `POST /v4/projects/{project_id}/deploy-records/{record_id}/step/{step_id}/refuse` | 驳回人工审核 |

## Artifact

说明:

- Artifact 官方 PDF 同时存在“发布库文件管理”“仓库详情”“文件管理”“审计日志”等多个面。
- 当前 MCP 主要收口的是仓库/版本/文件主链，并对文件详情下载做了一层统一。

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `artifact_list_repositories` | `ListAllRepositories` | Direct | `GET /cloudartifact/v5/{tenant_id}/{project_id}/repositories?...` | 仓库列表 |
| `artifact_get_repository` | `ShowRepository` / `ShowRepositoryInfo` | Derived | `GET /cloudartifact/v5/repositories/{repository_id}` | MCP 统一成 `repository_id` 直读，不再要求项目级组合路径 |
| `artifact_get_file_tree` | `ShowFileTree` | Direct | `GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-tree?...` | 仓库目录树 |
| `artifact_list_files` | `ListFiles` | Direct | `POST /cloudartifact/v5/file-detail` | 官方“文件/项目列表”家族 |
| `artifact_get_file` | `ShowFileDetailByFullName` / `ListArtifactoryComponent` | Derived | `GET /cloudartifact/v5/file-detail?...` | 统一成按 `tenant_id + project_id + repo_name + path + format` 取详情 |
| `artifact_get_download_url` | `ShowFileDetailByFullName` / `ListArtifactoryComponent` | Derived | `GET /cloudartifact/v5/file-detail?...` | 从同一详情链里提取下载链接 |
| `artifact_delete_file` | `DeleteArtifactFile` family | Derived | `DELETE /cloudartifact/v5/file-detail?...` | 当前聚焦非 Maven 文件删除语义 |
| `artifact_list_build_archives` | `ListFileBuildArchives` | Direct | `GET /cloudartifact/v5/build-archives?...` | 构建归档包列表 |
| `artifact_list_latest_version_files` | `latest version files family` | Direct | `GET /devreposerver/v5/{project_id}/files/version?...` | 路径和官方 PDF 对齐，目录侧未暴露稳定 CamelCase 名 |
| `artifact_list_versions` | `versions family` | Direct | `GET /v5/{project_id}/versions?...` | 发布库版本列表主链 |
| `artifact_search_artifacts` | `SearchArtifacts` | Direct | `POST /cloudartifact/v5/artifacts` | 统筹搜索 |
| `artifact_show_audit` | `ShowAudit` | Direct | `GET /cloudartifact/v5/audit?...` | 审计日志 |

## TestPlan

说明:

- TestPlan 官方 PDF 面很大，但当前 MCP 只抓了计划/需求树/用例/执行这条薄主链。
- 其中一部分 `GT3KServer/v4` 路径在 PDF 里能明确定位 URI，但 operation 名不是都容易从目录稳定提取，所以这里保留 `... family` 表述。

| MCP Tool | Official Operation / Family | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `testplan_list_plans` | `ShowPlans` | Direct | `GET /v1/projects/{project_id}/plans?...` | 项目下测试计划列表 |
| `testplan_get_plan` | `plan detail family` | Direct | `GET /v1/projects/{project_id}/plans/{plan_id}` | 路径与官方 PDF 对齐，但目录抽取时未单独稳定抓到该 operation 名 |
| `testplan_list_issues` | `ShowIssuesByPlanId` | Direct | `GET /v1/projects/{project_id}/plans/{plan_id}/issues?...` | 测试计划需求树 |
| `testplan_list_cases` | `ListAllTestCases` | Direct | `POST /GT3KServer/v4/{project_id}/testcases/batch-query` | 用例列表 |
| `testplan_get_case` | `testcase detail family` | Direct | `GET /GT3KServer/v4/{project_id}/testcases/{case_id}` | 路径级对齐 |
| `testplan_list_runs` | `plan runs family` | Direct | `GET /v1/projects/{project_id}/plans/{plan_id}/runs?...` | 路径级对齐，当前北京四 live 发布仍不完整 |
| `testplan_run_cases` | `CreateTasks` family | Derived | `POST /GT3KServer/v4/{project_id}/testcases/execute` | MCP 只暴露“执行给定 case 列表”这一层能力 |

## 这页怎么和前一页配合读

推荐顺序:

1. 先看 `Official-API-Alignment.md`
   - 判断整体到底是“精选子集”还是“接近产品级覆盖”
2. 再看 `Official-Category-Coverage-Matrix.md`
   - 判断差距主要集中在哪些官方大类
3. 然后看 `Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
   - 看最核心三条主链的逐工具映射
4. 最后看这页
   - 看剩余模块的逐工具或逐路径族映射

## 现在仍然没补完的地方

即使加上这页，当前官方文档对齐工作仍然没有做到:

- Req / Repo / Pipeline 的外围非主链接口逐项映射
- Deploy v4 每个路径族在官方 PDF 里的页面号与章节索引回填
- TestPlan 更外围的报告、评审、资源池、自动化任务等大面逐项 gap 表
- “官方 operation -> 当前未实现原因 -> 推荐优先级”的全量 backfill 清单
