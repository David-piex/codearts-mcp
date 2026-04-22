# Official Endpoint Mapping: Req / Repo / Pipeline

这页继续往下细化:

不仅回答“模块整体对齐到什么程度”, 还回答“当前主链 MCP 工具分别对应官方 PDF 里的哪个接口能力”。

当前范围只覆盖三个最值得继续补齐的模块:

- Req
- Repo
- Pipeline

其余 5 个模块的补完页见:

- `Official-Endpoint-Mapping-Check-Build-Deploy-Artifact-TestPlan.md`

说明:

- 这里的 `Direct` 表示 MCP 工具和官方 operation 基本是 1:1 能力映射。
- `Derived` 表示 MCP 工具复用了同一官方能力族, 但做了二次整形、路径兼容或结果提炼。
- `Composite` 表示 MCP 工具是从一个或多个官方接口结果里提炼出的更高层上下文工具。

## Req

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `req_list_projects` | `ListProjectsV4` | Direct | `GET /v4/projects` | 项目列表主链直映射 |
| `req_get_project` | `ShowProjectInfoV4` | Direct | `GET /v4/projects/{project_id}` | provider 会把业务对象包在顶层 `project` 字段里, MCP 已做归一化 |
| `req_list_project_members` | `ListProjectMembersV4` | Direct | `GET /v4/projects/{project_id}/members` | 项目成员读取主链 |
| `req_list_iterations` | `ListProjectIterationsV4` | Direct | `GET /v4/projects/{project_id}/iterations` | 迭代主链 |
| `req_list_work_items` | `ListIssuesSfV4` / `ListIssuesV4` | Derived | `GET /v4/projects/{project_id}/issues` | 当前真实已发布读链走 `/issues`, 不是旧的 `/work-items` 家族 |
| `req_get_work_item` | `ShowIssueV4` | Derived | `GET /v4/projects/{project_id}/issues/{work_item_id}` | 真实 provider 已验证走 `/issues/{id}` |
| `req_create_work_item` | `CreateIssueV4` | Derived | `POST /v4/projects/{project_id}/issue` | MCP 额外做了 `priority_id` 默认值兼容 |
| `req_update_work_item` | `UpdateIssueV4` | Derived | `PUT /v4/projects/{project_id}/issues/{work_item_id}` | 更新主链和详情/列表保持同一 `issues` 业务族 |

## Pipeline

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `pipeline_list_templates` | `ListPipelineTemplates` | Direct | `POST /v5/{tenant_id}/api/pipeline-templates/list` | 模板列表 |
| `pipeline_list_pipelines` | `ListPipelines` | Direct | `POST /v5/{project_id}/api/pipelines/list` | 项目下流水线列表 |
| `pipeline_get_pipeline` | `ShowPipelineDetail` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}` | 流水线详情 |
| `pipeline_list_extension_modules` | `ListModulesDetail` | Direct | `GET /v2/extensions/modules?locations=...` | 扩展模块列表, 对外统一使用 `project_id` 输入并在内部映射到官方 `project_uuid` |
| `pipeline_get_extension_module` | `ShowModule` | Direct | `GET /v1/extensions/modules/{module_id}` | 扩展模块详情, 返回该模块的版本集合 |
| `pipeline_list_extension_endpoints` | `ListEndpointsDetails` | Direct | `GET /v1/serviceconnection/endpoints?project_uuid=...&region_name=...` | 扩展点列表, 对外统一使用 `project_id` 输入并映射到 `project_uuid` |
| `pipeline_get_extension_endpoint` | `ShowEndpoint` | Direct | `GET /v1/serviceconnection/endpoints/{uuid}` | 扩展点详情 |
| `pipeline_create_extension_endpoint` | `CreateEndpoint` | Direct | `POST /v1/serviceconnection/endpoints` | 创建扩展点 |
| `pipeline_update_extension_endpoint` | `UpdateEndpoint` | Direct | `PUT /v1/serviceconnection/endpoints/{uuid}` | 更新扩展点 |
| `pipeline_delete_extension_endpoint` | `DeleteEndpoint` | Direct | `DELETE /v1/serviceconnection/endpoints/{uuid}?project_uuid=...` | 删除扩展点 |
| `pipeline_list_tags` | `ListPipelineTags` | Direct | `GET /v5/{project_id}/api/pipeline-tag/list` | 流水线标签列表 |
| `pipeline_create_tag` | `CreatePipelineTag` | Direct | `POST /v5/{project_id}/api/pipeline-tag/create` | 创建流水线标签 |
| `pipeline_update_tag` | `UpdatePipelineTag` | Direct | `POST /v5/{project_id}/api/pipeline-tag/update` | 更新流水线标签名称与颜色 |
| `pipeline_delete_tag` | `DeletePipelineTag` | Direct | `DELETE /v5/{project_id}/api/pipeline-tag/delete?tagId={tag_id}` | 按标签 id 删除流水线标签 |
| `pipeline_set_tags_for_pipelines` | `BatchSetPipelineTag` | Direct | `POST /v5/{project_id}/api/pipeline-tag/set-tags` | 批量为流水线设置标签 |
| `pipeline_delete_pipeline` | `DeletePipeline` | Direct | `DELETE /v5/{project_id}/api/pipelines/{pipeline_id}` | 删除流水线 |
| `pipeline_disable_pipeline` | `DisablePipeline` | Direct | `PUT /v5/{project_id}/api/pipelines/{pipeline_id}/ban` | 禁用流水线 |
| `pipeline_enable_pipeline` | `EnablePipeline` | Direct | `PUT /v5/{project_id}/api/pipelines/{pipeline_id}/unban` | 启用流水线 |
| `pipeline_list_groups` | `ShowPipelineGroupTree` | Direct | `GET /v5/{project_id}/api/pipeline-group/tree` | 返回递归分组树 |
| `pipeline_create_group` | `CreatePipelineGroup` | Direct | `POST /v5/{project_id}/api/pipeline-group/create` | 创建分组 |
| `pipeline_update_group` | `UpdatePipelineGroup` | Direct | `POST /v5/{project_id}/api/pipeline-group/update` | 更新分组名称 |
| `pipeline_delete_group` | `DeletePipelineGroup` | Direct | `DELETE /v5/{project_id}/api/pipeline-group/delete?id={group_id}` | 按分组 id 删除分组 |
| `pipeline_move_pipelines_to_group` | `BatchMovePipelineToGroup` | Direct | `POST /v5/{project_id}/api/pipeline-group/pipeline/move` | 批量移动流水线到分组 |
| `pipeline_create_variable_group` | `CreateVariableGroup` | Direct | `POST /v5/{project_id}/api/pipeline/variable/group/create` | 创建流水线变量组 |
| `pipeline_update_variable_group` | `UpdateVariableGroup` | Direct | `PUT /v5/{project_id}/api/pipeline/variable/group/update` | 更新变量组名称、描述和变量项 |
| `pipeline_delete_variable_group` | `DeleteVariableGroup` | Direct | `DELETE /v5/{project_id}/api/pipeline/variable/group/delete?id={id}` | 按变量组 id 删除变量组 |
| `pipeline_bind_variable_groups_to_pipeline` | `BindVariableGroupToPipeline` | Direct | `POST /v5/{project_id}/api/pipeline/variable/group/relation` | 将一个或多个变量组绑定到指定流水线 |
| `pipeline_get_variable_group` | `ShowVariableGroupDetail` | Direct | `GET /v5/{project_id}/api/pipeline/variable/group/{id}` | 变量组详情 |
| `pipeline_list_pipeline_variable_groups` | `ListPipelineVariableGroup` | Direct | `GET /v5/{project_id}/api/pipeline/variable/group/pipeline?pipelineId={pipeline_id}` | 查看指定流水线已绑定的变量组 |
| `pipeline_list_variable_groups` | `ListVariableGroups` | Direct | `POST /v5/{project_id}/api/pipeline/variable/group/list` | 按项目分页列出变量组 |
| `pipeline_get_rule` | `ShowRule` | Direct | `GET /v2/{domain_id}/rules/{rule_id}/detail` | 规则详情 |
| `pipeline_list_rules` | `ListRule` | Direct | `GET /v2/{domain_id}/rules/query?offset=...&limit=...` | 规则列表, 支持项目、类型和名称过滤 |
| `pipeline_create_rule` | `CreateRule` | Direct | `POST /v2/{domain_id}/rules/create` | 创建规则 |
| `pipeline_update_rule` | `UpdateRule` | Direct | `PUT /v2/{domain_id}/rules/{rule_id}/update` | 更新规则 |
| `pipeline_delete_rule` | `DeleteRule` | Direct | `DELETE /v2/{domain_id}/rules/{rule_id}/delete` | 删除规则 |
| `pipeline_get_rule_related_info` | `ShowRuleRelatedInfo` | Direct | `GET /v2/{domain_id}/rules/{rule_id}/related/query` | 查看规则关联的规则集、项目和流水线数量 |
| `pipeline_list_rule_types` | `queryStrategyType` | Direct | `GET /v2/{organization_id}/types/query` | 查询可用规则类型 |
| `pipeline_get_strategy` | `ShowStrategy` | Direct | `GET /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/detail` | 租户级策略详情, 支持 `cloud_project_id` 查询参数 |
| `pipeline_list_strategies` | `ListStrategy` | Direct | `GET /v2/{domain_id}/tenant/rule-sets/query?offset=...&limit=...` | 租户级策略列表, 支持 `include_tenant_rule_set / name / is_valid / type` 过滤 |
| `pipeline_create_strategy` | `CreateStrategy` | Direct | `POST /v2/{domain_id}/tenant/rule-sets/create` | 创建租户级策略 |
| `pipeline_update_strategy` | `UpdateStrategy` | Direct | `PUT /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/update` | 更新租户级策略 |
| `pipeline_delete_strategy` | `DeleteStrategy` | Direct | `DELETE /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/delete` | 删除租户级策略 |
| `pipeline_switch_strategy` | `SwitchStrategy` | Direct | `PUT /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/switch` | 启停切换租户级策略 |
| `pipeline_get_strategy_related_info` | `ShowStrategyRelatedInfo` | Direct | `GET /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/related/query` | 查看策略关联的项目和流水线数量 |
| `pipeline_list_strategy_children` | `ListStrategyChildren` | Direct | `GET /v2/{domain_id}/tenant/rule-sets/{rule_set_id}/children` | 查看策略的子策略列表 |
| `pipeline_list_project_strategies` | `ListProjectStrategy` | Direct | `GET /v2/{project_id}/rule-sets/query?offset=...&limit=...` | 项目级策略列表, 支持 `include_tenant_rule_set / name / is_valid / type` 过滤 |
| `pipeline_get_project_strategy` | `ShowProjectStrategy` | Direct | `GET /v2/{project_id}/rule-sets/{rule_set_id}/gray/detail` | 项目级策略灰度详情, 返回展开后的规则实例集合 |
| `pipeline_get_project_strategy_related_info` | `ShowProjectStrategyRelatedInfo` | Direct | `GET /v2/{project_id}/rule-sets/{rule_set_id}/related/query` | 查看项目级策略关联的项目和流水线数量 |
| `pipeline_inherit_project_strategy` | `CreateInheritProjectStrategy` | Direct | `POST /v2/{project_id}/rule-sets/inherit` | 继承父级策略创建项目级策略 |
| `pipeline_switch_project_strategy` | `SwitchProjectStrategy` | Direct | `PUT /v2/{project_id}/rule-sets/{rule_set_id}/switch` | 启停切换项目级策略 |
| `pipeline_delete_project_strategy` | `DeleteProjectStrategy` | Direct | `DELETE /v2/{project_id}/rule-sets/{rule_set_id}/delete` | 删除项目级策略 |
| `pipeline_get_project_strategy_detail` | `ShowProjectStrategyDetail` | Direct | `GET /v2/{project_id}/rule-sets/{rule_set_id}/detail` | 项目级策略摘要详情 |
| `pipeline_update_project_strategy` | `UpdateProjectStrategy` | Direct | `PUT /v2/{project_id}/rule-sets/{rule_set_id}/update` | 更新项目级策略 |
| `pipeline_create_project_strategy` | `CreateProjectStrategy` | Direct | `POST /v2/{project_id}/rule-sets/create` | 创建项目级策略 |
| `pipeline_list_runs` | `ListPipelineRuns` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/list` | 执行记录列表 |
| `pipeline_get_run` | `ShowPipelineRunDetail` | Derived | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | MCP 只取 run detail 的较轻量子集 |
| `pipeline_get_run_detail` | `ShowPipelineRunDetail` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | 保留 stages / jobs / steps 层级结构 |
| `pipeline_run_pipeline` | `RunPipeline` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/run` | 启动流水线 |
| `pipeline_stop_run` | `StopPipelineRun` | Direct | `POST /v5/pipelines/{pipeline_id}/pipeline-runs/{run_id}/stop` | 停止执行 |
| `pipeline_retry_run` | `RetryPipelineRun` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/retry` | 重试执行 |
| `pipeline_approve_run` | `AcceptManualReview` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/pass` | 人工审核通过 |
| `pipeline_reject_run` | `RejectManualReview` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/reject` | 人工审核驳回 |
| `pipeline_get_run_parameters` | `ListRuntimeVars` | Derived | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/run-variables` | 失败时会回退到 `list-runtime-vars` 兼容路径 |
| `pipeline_get_run_log` | `ShowPipelineLog` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/jobs/{job_id}/steps/{step_id}/logs` | 步骤日志 |
| `pipeline_get_step_outputs` | `ShowStepOutputs` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/step-outputs` | 步骤输出 |
| `pipeline_list_artifacts` | `ShowPipelineArtifacts` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/artifacts` | 构建产物 |
| `pipeline_get_manual_review_context` | `ShowPipelineRunDetail` | Composite | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | 这个工具不是官方单个 endpoint 的直接翻版, 而是从 run detail 里提炼待审核步骤上下文 |

| `pipeline_list_publishers` | `ListPublisher` | Direct | `GET /v1/{domain_id}/publisher/query-all` | 4.7 publisher list |
| `pipeline_list_available_publishers` | `ListAvailablePublisher` | Direct | `GET /v1/{domain_id}/publisher/optional-publisher` | 4.7 available publisher list |
| `pipeline_list_stage_plugins` | `ListStagePlugins` | Direct | `POST /v1/{domain_id}/relation/stage-plugins` | 4.7 stage plugins |
| `pipeline_list_base_plugins` | `ListBasePlugins` | Direct | `GET /v1/{domain_id}/relation/plugin/single` | 4.7 base plugins |
| `pipeline_list_base_plugins_paged` | `ListBasePluginsNewPost` | Direct | `POST /v1/{domain_id}/relation/plugins` | 4.7 paged base plugins |
| `pipeline_list_plugins` | `ListPlugins` | Direct | `POST /v1/{domain_id}/agent-plugin/query-all` | 4.7 custom plugin list |
| `pipeline_get_plugin_inputs` | `ShowPluginInputs` | Direct | `POST /v1/{domain_id}/agent-plugin/plugin-input` | 4.7 plugin inputs |
| `pipeline_get_plugin_outputs` | `ShowPluginOutputs` | Direct | `POST /v1/{domain_id}/agent-plugin/plugin-output` | 4.7 plugin outputs |
| `pipeline_list_plugin_versions` | `ListPLuginVersion` | Direct | `GET /v1/{domain_id}/agent-plugin/query` | 4.7 plugin versions |
| `pipeline_get_plugin_version` | `ShowPluginVersion` | Direct | `GET /v1/{domain_id}/agent-plugin/detail` | 4.7 plugin version detail |

## Repo

### 仓库 / 分支 / 提交 / 文件 / 标签

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `repo_create_repository` | `CreateRepository` | Direct | `POST /v1/repositories` | 对齐官方 CreateRepository 页面；以 `project_uuid + name` 为主输入，并支持初始化字段 |
| `repo_list_repositories` | `ListProjectRepositories` | Direct | `GET /v4/projects/{project_id}/repositories` | 项目下仓库列表 |
| `repo_get_repository` | `ShowRepository` | Direct | `GET /v4/repositories/{repository_id}` | 仓库详情 |
| `repo_list_branches` | `ListBranches` | Direct | `GET /v4/repositories/{repository_id}/repository/branches` | 分支列表 |
| `repo_get_branch` | `ShowBranch` | Direct | `GET /v4/repositories/{repository_id}/repository/branch?branch_name=...` | 分支详情 |
| `repo_list_commits` | `ListCommits` | Direct | `GET /v2/projects/{repository_id}/repository/commits` | provider 当前仍走 legacy `v2` 提交路径 |
| `repo_get_commit` | `ShowCommit` | Direct | `GET /v2/projects/{repository_id}/repository/commits/{commit_sha}` | 提交详情 |
| `repo_get_file` | `ShowBlobs` | Direct | `GET /v2/projects/{repository_id}/repository/files?file_path=...&ref=...` | 文件内容读取 |
| `repo_compare_refs` | `ShowRefCompare` | Direct | `GET /v4/repositories/{repository_id}/compare?from=...&to=...` | ref/branch/tag/commit compare |
| `repo_list_tags` | `ListTags` | Direct | `GET /v2/repositories/{repository_id}/tags` | 标签列表 |
| `repo_get_tag` | `ShowTag` | Direct | `GET /v4/repositories/{repository_id}/repository/tag?tag_name=...` | 标签详情 |
| `repo_create_tag` | `CreateTag` | Direct | `POST /v2/repositories/{repository_id}/tags` | 标签创建 |
| `repo_delete_tag` | `DeleteTag` | Direct | `DELETE /v2/repositories/{repository_id}/tags/{tag_name}` | 标签删除 |
| `repo_list_events` | `ListRepositoryEvents` | Direct | `GET /v4/repositories/{repository_id}/events` | 仓库动态 |
| `repo_list_protected_branches` | `ListProtectedBranches` | Direct | `GET /v4/repositories/{repository_id}/protected-branches` | 保护分支列表 |
| `repo_list_repository_labels` | `ListRepositoryLabels` | Direct | `GET /v4/repositories/{repository_id}/labels` | 仓库标签列表 |

### Merge Request / Discussion / Review

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `repo_list_merge_requests` | `ListRepositoryMergeRequests` | Direct | `GET /v4/repositories/{repository_id}/merge-requests` | MR 列表 |
| `repo_get_merge_request` | `ShowMergeRequestDetail` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}` | MR 详情 |
| `repo_create_merge_request` | `CreateMergeRequest` | Direct | `POST /v4/repositories/{repository_id}/merge-requests` | 创建 MR |
| `repo_close_merge_request` | `UpdateMergeRequest` | Derived | `PUT /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}` | 当前通过 update 语义把 MR 置为关闭态 |
| `repo_merge_merge_request` | `MergeMergeRequest` | Direct | `PUT /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/merge` | 合入 MR |
| `repo_review_merge_request` | `ReviewMergeRequest` | Direct | `POST /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval` | 审核 / 拒绝 / reset |
| `repo_list_merge_request_changes` | `ListMergeRequestChanges` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/changes` | MR 变更列表 |
| `repo_list_merge_request_discussions` | `ListMergeRequestDiscussions` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/discussions` | 检视意见列表 |
| `repo_create_merge_request_discussion` | `CreateMergeRequestDiscussion` | Direct | `POST /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/discussions` | 创建 MR 检视意见 |

## 这页怎么用

如果你现在要判断“下一步该补哪些官方接口”, 推荐这样读:

1. 先看 `Official-API-Alignment.md`
   - 判断模块整体差距
2. 再看 `Official-Category-Coverage-Matrix.md`
   - 判断差距主要集中在哪些大类
3. 最后看这页
   - 判断当前主链工具和官方 operation 的逐项对应关系

## 当前仍然没有做的事

这页现在只剩下三类未覆盖内容:

- Req / Repo / Pipeline 的外围非主链接口逐项映射
- “官方 operation -> 当前未实现原因 -> 推荐优先级”的全量 backfill 表
- 更细的页码级索引、章节回链和优先级路线图

如果继续补, 最有价值的顺序仍然是:

1. Pipeline 扩展插件管理面
2. Repo webhook / group / permission 面
3. Req 的 Scrum / IPD 非主链能力
