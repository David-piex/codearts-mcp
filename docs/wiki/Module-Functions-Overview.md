# Module Functions Overview

这一页不讲实现细节，也不讲官方 API 对齐率，只回答一个更直接的问题：

现在这 8 个模块分别能帮你做什么。

## 总体判断

- `Req / Repo / Check / Build` 已经可以直接进入日常协作链路。
- `Pipeline / Deploy` 能力很强，但更依赖真实租户样本和 live 边界判断。
- `TestPlan / Artifact` 已有实用查询面，不过仍受部分区域发布状态影响。

## 模块总览

| 模块 | 中文定位 | 现在能做什么 | 典型工具 | 当前建议 |
| --- | --- | --- | --- | --- |
| Req | 需求、项目协作与工作项治理 | 已覆盖 `project / module / member / iteration / plan / work-item / collaboration / config-read / board-read / cache-read / program-read / requirement-pool-read / ipd-read / ipd-config-write / ipd-work-item-write / ipd-work-hour / ipd-field-config` 17 个资源面，可做项目管理、成员协作、迭代治理、规划本身、规划内工作项管理、需求池/项目空间读取、IPD 基础读取、IPD 树/关联 Wiki/分组/租户列表/统计仪表盘读取、IPD 特性集/追溯/状态读取、IPD 模块/标签/特性集维护、IPD 工作项创建/批量变更/流程流转/附件/图片、IPD 工时管理、IPD 字段配置维护、工作项协作、状态配置读取、看板读取和字段缓存读取 | `req_list_projects` `req_create_project` `req_list_project_members` `req_create_iteration` `req_create_plan` `req_create_work_item` | 核心链路可直接用，规划写面、需求池/项目空间读取、IPD 读取基础面、IPD 写面与状态/公共配置读面先结合 live 边界使用 |
| Repo | 代码仓库协作 | 查仓库、分支、提交、文件、MR，创建仓库，发起/评审/合并 MR，也能查看导入记录和维护远程镜像配置 | `repo_list_repositories` `repo_create_repository` `repo_create_merge_request` `repo_get_remote_mirror` | 原 25 个协作工具适合直接使用；导入/远程镜像工具已实现，仍需 live 样本补验 |
| Pipeline | 流水线执行与治理 | 查流水线、运行记录、手动审批、重试/停止，也能管理分组、标签、变量组、规则、策略和扩展点 | `pipeline_list_pipelines` `pipeline_run_pipeline` `pipeline_create_group` | 适合进阶自动化 |
| Check | 代码检查 | 查规则集、查检查任务、看问题、看指标、查缺陷过滤、PDF/异步任务、创建/执行/停止检查任务和 dry-run 配置写入 | `check_list_rulesets` `check_list_task_issues` `check_list_issues_by_filter` `check_create_pdf_async_job` | 适合和 Repo / Build 搭配 |
| TestPlan | 测试计划与测试用例 | 查测试计划、查用例、查问题、查看运行记录、批量执行用例 | `testplan_list_plans` `testplan_list_cases` `testplan_run_cases` | 先按租户可用性使用 |
| Deploy | 部署编排与环境资源 | 查应用、任务、环境、主机组、部署记录，创建应用/环境/任务，做启动/停止/回滚，也支持 v4 资源读取 | `deploy_list_apps` `deploy_create_task_by_template` `deploy_start_app` | 联调前先确认样本 |
| Build | 编译构建 | 查构建任务、构建记录、日志、参数、模板、keystore、通知和构建状态详情，运行/停止任务，也支持补步骤和发布上传步骤配置 | `build_list_jobs` `build_get_job_info` `build_get_build_details` `build_get_real_time_log` | 适合直接接入 CI/CD |
| Artifact | 制品仓库 | 查仓库、版本、文件树、下载地址、构建归档和审计 | `artifact_list_repositories` `artifact_list_versions` `artifact_get_download_url` | 适合做制品追踪 |

## Req

Req 是当前最像“把项目协作动作做成 MCP 工具”的模块，而且已经不只是最初那 8 个核心工具。

当前 Req 已扩展到 `243` 个工具，基本可以按 17 个资源面理解：

- `project`：`req_list_projects` `req_get_project` `req_create_project` `req_update_project` `req_delete_project` `req_check_project_name` `req_list_not_added_projects`
- `module`：`req_list_project_modules` `req_create_project_module` `req_update_project_module` `req_delete_project_module`
- `member`：`req_list_project_members` `req_add_project_member` `req_batch_add_project_members` `req_batch_delete_project_members` `req_update_project_member_role` `req_leave_project`
- `iteration`：`req_list_iterations` `req_get_iteration` `req_create_iteration` `req_update_iteration` `req_delete_iteration` `req_batch_delete_iterations` `req_update_iteration_state` `req_query_iteration_immovable_issues`
- `plan`：`req_list_plans` `req_get_plan` `req_create_plan` `req_update_plan` `req_delete_plan` `req_update_plan_image` `req_create_plan_work_item` `req_list_plan_addable_work_items` `req_list_plan_work_items` `req_add_plan_work_items` `req_clear_plan_work_items`
- `work-item core`：`req_list_work_items` `req_get_work_item` `req_get_work_item_issue_details` `req_create_work_item` `req_update_work_item` `req_delete_work_item` `req_batch_update_work_items` `req_list_work_item_records`
- `collaboration`：`req_list_work_item_comments` `req_add_work_item_comment` `req_update_work_item_comment` `req_list_associated_issues` `req_list_associated_commits` `req_list_associated_test_cases` `req_list_related_users` `req_update_work_item_flow`
- `config-read`：`req_list_work_item_statuses` `req_list_work_item_status_attributes` `req_list_work_item_status_details` `req_list_work_item_status_configs` `req_list_optional_work_item_status_configs` `req_get_project_public_config` `req_list_work_item_workflow_config` `req_list_work_item_templates` `req_get_work_item_template_config` `req_list_work_item_custom_fields` `req_get_work_item_status_rule_flag` `req_list_work_item_tracker_handlers`
- `board-read`：`req_list_board_work_items` `req_list_board_work_item_status_records` `req_list_board_work_item_workflow_config`
- `cache-read`：`req_list_job_cache_boards` `req_list_cache_data`
- `program-read`：`req_list_programs` `req_list_program_fields`
- `requirement-pool-read`：`req_get_ir` `req_list_ir_children` `req_list_ir_histories` `req_list_rrs` `req_list_rr_statuses` `req_list_rr_histories` `req_list_issue_severities`
- `ipd-read`：`req_list_ipd_projects` `req_list_ipd_project_users` `req_get_ipd_issue` `req_list_ipd_issues` `req_list_ipd_issue_tree` `req_list_ipd_attached_wikis` `req_group_ipd_issues` `req_list_ipd_tenant_issues` `req_get_ipd_statistic_dashboard` `req_list_ipd_modules` `req_list_ipd_statuses` `req_list_ipd_issue_relation_config` `req_list_ipd_labels` `req_list_ipd_project_fields` `req_list_ipd_issue_fields` `req_list_ipd_workflow_templates` `req_list_ipd_workflow_fields` `req_list_ipd_snapshot_versions` `req_list_ipd_feature_sets` `req_list_ipd_snapshot_features` `req_get_ipd_e2e_graph` `req_list_ipd_category_statuses` `req_get_ipd_work_item_flow_detail`
- `ipd-config-write`：`req_create_ipd_module` `req_update_ipd_module` `req_delete_ipd_module` `req_create_ipd_label` `req_update_ipd_label` `req_delete_ipd_label` `req_create_ipd_feature_set` `req_update_ipd_feature_set` `req_delete_ipd_feature_set`
- `ipd-work-item-write`：`req_create_ipd_issue` `req_batch_create_ipd_issues` `req_batch_update_ipd_issues` `req_batch_delete_ipd_issues` `req_transfer_ipd_work_item_flow` `req_batch_transfer_ipd_work_item_flow` `req_upload_ipd_issue_attachment` `req_list_ipd_issue_attachments` `req_download_ipd_issue_attachment` `req_upload_ipd_issue_image` `req_delete_ipd_issue_image` `req_download_ipd_issue_image`
- `ipd-work-hour`：`req_list_ipd_work_hours` `req_list_ipd_work_hour_categories` `req_create_ipd_work_hour` `req_update_ipd_work_hour` `req_delete_ipd_work_hour`
- `ipd-field-config`：`req_list_ipd_tenant_fields` `req_get_ipd_tenant_field_used` `req_get_ipd_tenant_field_option_used` `req_get_ipd_project_field_option_used` `req_update_ipd_tenant_field` `req_update_ipd_project_field`

它现在适合的场景：

- 让 AI 先列项目，再进入成员、迭代、工作项上下文继续操作。
- 在一个 Scrum 项目里做“查项目 -> 查工作项 -> 改状态/标题 -> 回写评论/看记录”的连续协作。
- 在规划上下文里直接补规划图片，或从计划上下文直接创建工作项。
- 读取工作项状态属性、状态详情、状态配置、可选状态配置和项目公共配置，帮助 agent 理解项目当前的状态流转规则。
- 用 `dry_run=true` 先预演高风险写操作，再决定是否真正执行。

更准确地说，Req 的“功能面”已经覆盖到 Scrum 常用协作层，并补到了规划本身 + 规划内工作项管理 + 规划图片更新 + 计划上下文创建工作项、需求池/项目空间只读面、IPD 读取基础面、IPD 树/关联 Wiki/分组/租户列表/统计仪表盘读取、IPD 特性集/追溯/状态读取、IPD 模块/标签/特性集写面、IPD 工作项写面、IPD 附件/图片与工时管理、IPD 字段配置写面，以及状态/模板/字段/缓存/看板读面；其中 `/v3/plan/{project_id}/managements` 没有新增独立 MCP 工具，而是并入 `req_list_plans` 的增强过滤能力。但真实 AK/SK live 验证目前仍主要集中在项目、成员、迭代读取和 work-item core 读写，新增规划写面、规划内工作项管理写面、规划图片更新、计划上下文创建工作项、需求池/项目空间只读面、IPD 读取基础面、IPD 配置写面与配置读面都不要默认按“全部已 live”理解。

看 Req 当前哪些路径已经做过真实联调，直接看 [Req-Live-Validated](./Req-Live-Validated.md)。

## Repo

Repo 是当前最接近“代码协作工作台”的模块。

适合场景：

- 查看仓库、分支、提交、标签、文件内容。
- 围绕 Merge Request 做创建、讨论、评审、合并、关闭。
- 直接从 MCP 里创建一个新仓库。
- 查询当前用户的仓库导入记录：`repo_list_personal_repository_import_records`。
- 关联、查询、更新远程镜像配置，并启动远程镜像同步任务：`repo_associate_remote_mirror`、`repo_get_remote_mirror`、`repo_update_remote_mirror`、`repo_start_remote_mirror_synchronization`。

## Pipeline

Pipeline 已经不是只会“跑流水线”。

当前同时覆盖：

- 执行面：列表、详情、运行、重试、审批、停止。
- 治理面：标签、分组、变量组、规则、策略。
- 扩展面：插件、发布者、扩展模块、扩展端点。

## Check

Check 聚焦静态质量分析。

适合场景：

- 看检查任务的问题和指标。
- 查询规则集。
- 触发或停止检查任务。
- 查询官方缺陷过滤、异步任务、PDF 文件和智能摘要。
- dry-run 预览缺陷状态、质量门禁、忽略文件和检查模式更新。

## TestPlan

TestPlan 聚焦测试计划、测试用例和执行情况。

适合场景：

- 查项目下有哪些测试计划和测试用例。
- 关联测试计划中的问题。
- 在租户和区域允许的情况下批量执行用例。

## Deploy

Deploy 已经不只是传统应用部署查询，也扩到了 v4 环境、集群和部署记录面。

适合场景：

- 查应用、环境、主机组、记录、变量。
- 从模板创建部署任务。
- 做受控的启动、停止、回滚。
- 围绕 v4 环境和部署记录做进一步自动化。

## Build

Build 很适合和 Pipeline / Deploy 串联。

适合场景：

- 查构建任务和构建记录。
- 看实时日志、错误日志、阶段信息、脚本。
- 查任务构建信息、构建状态详情、完成后步骤日志分页、模板、keystore 和通知。
- 运行或停止构建任务。
- 对发布上传步骤做预配置或增量修改。

## Artifact

Artifact 更偏向“制品可见性”和“下载/追踪能力”。

适合场景：

- 查仓库、版本、文件树。
- 获取下载地址。
- 查询构建归档与审计信息。
- 做受控文件删除。

## 如果你是按场景选模块

### 想做项目协作

- 先看 `Req`
- 再配 `Repo`

### 想做代码评审和质量门禁

- 先看 `Repo`
- 再配 `Check`

### 想做 CI/CD 自动化

- 先看 `Build`
- 再配 `Pipeline`
- 真正落部署时再接 `Deploy`

### 想做制品追踪

- 先看 `Build`
- 再配 `Artifact`

## 下一步看什么

- 想按角色选模块和阅读路径：看 [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)
- 想看 Req 当前真实 AK/SK 边界：看 [Req-Live-Validated](./Req-Live-Validated.md)
- 想看模块规模和 live 缺口：看 [Capability-Matrix](./Capability-Matrix.md)
- 想看真实 AK/SK 联调状态：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
- 想看测试和部署联调策略：看 [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
