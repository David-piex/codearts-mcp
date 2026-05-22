# Req Live Validated

这一页只说明 Req 模块的真实 AK/SK 联调边界，不把“工具已经实现”直接等同于“已经真实 live 跑过”。

当前 Req 已导出 `201` 个工具，功能面覆盖：

- `project`：项目查询、创建、更新、删除、名称校验、域内未添加项目查询
- `module`：项目模块列表、创建、更新、删除
- `member`：项目成员列表、添加、批量添加、批量移除、角色调整、主动退出
- `iteration`：迭代列表、详情、创建、更新、删除、批量删除、状态更新、不可移动问题查询
- `plan`：规划列表、规划详情、创建、更新、删除、规划图片更新、计划上下文创建工作项、规划内工作项列表、当前规划可添加工作项列表、规划内工作项加入、规划内工作项清空
- `work-item core`：工作项列表、详情、创建、更新、删除、批量更新、变更记录；列表、详情、树和记录读取会保留官方原始字段，并补充 Asia/Shanghai 可读时间，便于直接核对描述、处理人、状态和时间
- `work-item detail`：官方 `IssueDetailsV2 /v2/issues/show` 详情读取，工具只调用该 V2 接口，并把 `journals` 映射为 `comments`，可直接查看处理人/分配人；输出显式包含基础信息、时间、状态类型、优先级/严重程度、人员、项目结构、自定义字段、附件、标签、锁版本、关注/私有/删除状态和评论字段；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 这类 Asia/Shanghai 可读时间；并通过 `rawIssue` / `raw` 保留官方 V2 原始 issue 响应
- `collaboration`：评论列表/新增/更新、关联缺陷、关联提交、关联测试用例、相关用户、流转更新
- `config-read`：工作项状态列表、状态属性、状态详情、状态配置、可选状态配置、项目公共配置、工作项工作流配置、工作项模板、模板字段配置、自定义字段、自动流转开关、流转默认处理人范围
- `board-read`：看板工作项列表、看板工作项状态历史、看板工作项工作流配置
- `cache-read`：卡片模式字段缓存、通用字段缓存查询
- `program / requirement-pool read`：项目空间列表、IR/RR 字段、IR 详情、IR 子节点、IR/RR 历史、RR 列表、RR 状态、严重程度列表
- `ipd-read`：IPD 项目、项目用户、工作项详情/列表/树、关联 Wiki、工作项分组、租户工作项列表、统计仪表盘、模块树、状态、关联配置、标签、字段、工作流配置、特性集快照、特性集树、快照特性、E2E 追溯、分类状态和工作项流程详情
- `ipd-config-write`：IPD 模块、标签、特性集的创建、更新、删除
- `ipd-work-item-write`：IPD 工作项创建、批量创建、批量更新、批量删除、单工作项流程流转、批量流程流转、附件上传/列表/下载，以及描述图片上传/删除/下载
- `ipd-work-hour`：IPD 工时查询、工时类别查询、创建工时、更新工时、删除工时
- `ipd-field-config`：IPD 租户字段列表、字段使用情况、字段选项使用情况、租户字段更新、项目字段更新

## 当前 Live 依据

当前仓库里真正面向 Req live 环境的依据主要来自：

- `tests/products/req/client-live-smoke.test.ts`

这份 smoke 会在配置好 `HUAWEICLOUD_AK`、`HUAWEICLOUD_SK`、`HUAWEICLOUD_REQ_BASE_URL` 等环境变量后，对真实 Req 样本做读写探测。文件名包含 `*-live.test.ts` 但内容仍是 handler 映射单测的，不计入真实 AK/SK 联调证据。

## 已纳入真实 AK/SK Smoke 的路径

| 路径 | 对应工具 | 当前说明 |
| --- | --- | --- |
| 项目读取 | `req_list_projects` `req_get_project` | smoke 会列出真实项目，并读取一个项目详情 |
| 项目辅助读取 | `req_check_project_name` `req_list_not_added_projects` | smoke 会在真实环境下校验候选项目名，并读取未添加项目列表 |
| 项目写闭环 | `req_create_project` `req_update_project` `req_delete_project` | 仅在显式开启 `HUAWEICLOUD_REQ_LIVE_ENABLE_PROJECT_MUTATIONS` 时执行，避免默认 live 环境误创建或删除项目 |
| 项目上下文读取 | `req_list_project_members` `req_list_iterations` `req_get_iteration` | smoke 会读取真实项目成员、迭代列表，并在存在迭代样本时读取迭代详情 |
| 规划面读取 | `req_list_plans` `req_get_plan` `req_list_plan_addable_work_items` `req_list_plan_work_items` | smoke 会先读取规划列表；`/v3/plan/{project_id}/managements` 当前并入 `req_list_plans` 的增强过滤能力，而不是新增独立工具；若项目下存在规划样本，则继续读取规划详情、规划候选工作项和规划内工作项 |
| 看板与缓存读取 | `req_list_board_work_items` `req_list_board_work_item_status_records` `req_list_job_cache_boards` `req_list_cache_data` | smoke 会对真实项目读取看板工作项、状态记录、job cache board 和 backlog/cache 字段缓存 |
| 状态/公共配置读取 | `req_list_work_item_statuses` `req_list_work_item_status_attributes` `req_list_work_item_status_details` `req_list_work_item_status_configs` `req_list_optional_work_item_status_configs` `req_get_project_public_config` `req_list_work_item_workflow_config` `req_list_work_item_templates` `req_get_work_item_template_config` `req_list_work_item_custom_fields` `req_get_work_item_status_rule_flag` `req_list_work_item_tracker_handlers` | smoke 会以 Scrum `tracker_id=7` 对真实项目做一轮状态、公共配置、工作流、模板、自定义字段、状态规则开关和默认处理人范围的只读探测 |
| 迭代写闭环 | `req_create_iteration` `req_update_iteration` `req_delete_iteration` | 仅在同时配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_ITERATION_MUTATIONS` 时执行 |
| 工作项 core 读写 | `req_create_work_item` `req_get_work_item` `req_update_work_item` `req_list_work_items` | 仅在显式配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 时跑 `create -> get -> update -> list`；如显式注入现有 `HUAWEICLOUD_REQ_LIVE_WORK_ITEM_*`，则退化为只读 `get` 检查 |
| 工作项记录与评论读取 | `req_list_work_item_records` `req_list_work_item_comments` | smoke 会对真实或临时工作项读取记录与评论列表 |
| 需求池与项目空间读取 | `req_list_programs` `req_list_program_fields` `req_get_ir` `req_list_ir_children` `req_list_ir_histories` `req_list_rrs` `req_list_rr_statuses` `req_list_rr_histories` `req_list_issue_severities` | 已纳入真实 AK/SK smoke；当前北京四样本中 `req_list_issue_severities` 可达，`req_list_programs` 对当前 AK 返回 `403 PM.00000014`，因此 program/IR/RR 非空样本仍待有权限租户继续验证 |
| IPD 读取基础面 | `req_list_ipd_projects` `req_list_ipd_project_users` `req_get_ipd_issue` `req_list_ipd_issues` `req_list_ipd_issue_tree` `req_list_ipd_attached_wikis` `req_group_ipd_issues` `req_list_ipd_tenant_issues` `req_get_ipd_statistic_dashboard` `req_list_ipd_modules` `req_list_ipd_statuses` `req_list_ipd_issue_relation_config` `req_list_ipd_labels` `req_list_ipd_project_fields` `req_list_ipd_issue_fields` `req_list_ipd_workflow_templates` `req_list_ipd_workflow_fields` `req_list_ipd_snapshot_versions` `req_list_ipd_feature_sets` `req_list_ipd_snapshot_features` `req_get_ipd_e2e_graph` `req_list_ipd_category_statuses` `req_get_ipd_work_item_flow_detail` | 已纳入真实 AK/SK smoke；当前北京四样本中 `req_list_ipd_projects`、`req_list_ipd_tenant_issues`、`req_list_ipd_tenant_fields`、`req_get_ipd_tenant_field_option_used` 可达，系统字段的 `req_get_ipd_tenant_field_used` 会返回 `PM.02175301` 边界；当前 AK 下 IPD 项目列表为空，因此项目级 IPD 非空样本仍待补 |
| IPD 配置写面 | `req_create_ipd_module` `req_update_ipd_module` `req_delete_ipd_module` `req_create_ipd_label` `req_update_ipd_label` `req_delete_ipd_label` `req_create_ipd_feature_set` `req_update_ipd_feature_set` `req_delete_ipd_feature_set` | 已按 PDF 接入 MCP，默认 dry-run 优先；live smoke 已有显式门禁脚手架，需配置 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS` 和可回收样本才执行 |
| IPD 工作项写面 | `req_create_ipd_issue` `req_batch_create_ipd_issues` `req_batch_update_ipd_issues` `req_batch_delete_ipd_issues` `req_transfer_ipd_work_item_flow` `req_batch_transfer_ipd_work_item_flow` `req_upload_ipd_issue_attachment` `req_list_ipd_issue_attachments` `req_download_ipd_issue_attachment` `req_upload_ipd_issue_image` `req_delete_ipd_issue_image` `req_download_ipd_issue_image` | 已按 PDF 接入 MCP，默认 dry-run 优先；live smoke 已有工作项创建/更新/删除、附件/图片和流程流转的显式门禁脚手架，需配置 IPD 项目/工作项样本和对应 `ENABLE_IPD_*` 变量才执行 |
| IPD 工时管理 | `req_list_ipd_work_hours` `req_list_ipd_work_hour_categories` `req_create_ipd_work_hour` `req_update_ipd_work_hour` `req_delete_ipd_work_hour` | 已按 PDF 接入 MCP，默认 dry-run 优先；live smoke 已有显式门禁脚手架，需配置 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS` 和可回收工时样本才执行 |
| IPD 字段配置 | `req_list_ipd_tenant_fields` `req_get_ipd_tenant_field_used` `req_get_ipd_tenant_field_option_used` `req_get_ipd_project_field_option_used` `req_update_ipd_tenant_field` `req_update_ipd_project_field` | 已按 PDF 接入 MCP，默认 dry-run 优先；live smoke 已有显式门禁脚手架，需配置 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS` 和可回滚字段样本才执行 |
| 评论写闭环 | `req_add_work_item_comment` `req_update_work_item_comment` | 仅在同时配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_COMMENT_MUTATIONS` 时，对临时工作项执行新增和更新评论 |
| 临时工作项清理 | `req_delete_work_item` | 仅用于显式开启评论写 smoke 时清理临时工作项 |

如果只问“当前仓库里哪段 Req 路径最接近真实闭环”，答案是：`project read + project helper read + member read + iteration read + work-item core read/write on explicit writable samples + gated comment read/write`。

## 已实现但仍需更深 Live 覆盖的范围

| 范围 | 工具 | 当前状态 |
| --- | --- | --- |
| member 管理写路径 | `req_add_project_member` `req_batch_add_project_members` `req_batch_delete_project_members` `req_update_project_member_role` `req_leave_project` | 已实现、默认 dry-run 优先；仍依赖更稳定的租户权限和可回收样本 |
| 规划写路径 | `req_create_plan` `req_update_plan` `req_delete_plan` `req_update_plan_image` `req_create_plan_work_item` `req_add_plan_work_items` `req_clear_plan_work_items` | 已实现；当前真实 smoke 仍停留在规划面读取，规划本身写路径、规划内工作项管理写路径、规划图片更新和计划上下文创建工作项都还没有进入真实 smoke 闭环，仍需要可回收样本与显式门禁后再进入 live 闭环 |
| 迭代状态与批量操作 | `req_update_iteration_state` `req_batch_delete_iterations` `req_query_iteration_immovable_issues` | 已实现；当前 smoke 先覆盖迭代 create/get/update/delete，状态和批量路径仍待专门样本 |
| 工作项批量管理 | `req_batch_update_work_items` | 已实现；仍需要安全的批量样本矩阵 |
| 协作与相关用户查询 | `req_list_associated_issues` `req_list_associated_commits` `req_list_associated_test_cases` `req_list_related_users` | 已实现；还需要真实非空样本验证返回形状与字段稳定性 |
| 工作项流转 | `req_update_work_item_flow` | 已实现；当前没有稳定、安全的 live `status_id` 来源，所以暂未放进真实 smoke 闭环 |
| 工作项配置读取的更深样本 | `req_list_work_item_statuses` `req_list_work_item_status_attributes` `req_list_work_item_status_details` `req_list_work_item_status_configs` `req_list_optional_work_item_status_configs` `req_get_project_public_config` `req_list_work_item_workflow_config` `req_list_work_item_templates` `req_get_work_item_template_config` `req_list_work_item_custom_fields` `req_get_work_item_status_rule_flag` `req_list_work_item_tracker_handlers` | 已纳入基础只读 smoke；当前仍待补非空样本质量、更多 tracker 维度，以及配置结果与真实流转场景的一致性验证 |
| 看板工作项读取的更深样本 | `req_list_board_work_items` `req_list_board_work_item_status_records` `req_list_board_work_item_workflow_config` | 已纳入看板列表与状态历史读取 smoke；board workflow config 仍待补稳定 board 样本 |
| 字段缓存读取的更深样本 | `req_list_job_cache_boards` `req_list_cache_data` | 已纳入基础读取 smoke；当前仍待补字段命中质量与更多缓存类型样本 |
| 需求池/项目空间读取 | `req_list_programs` `req_list_program_fields` `req_get_ir` `req_list_ir_children` `req_list_ir_histories` `req_list_rrs` `req_list_rr_statuses` `req_list_rr_histories` `req_list_issue_severities` | 已按 PDF 接入 MCP 并纳入 smoke；仍待有项目空间权限的真实 program/IR/RR 非空样本 |
| IPD 读取基础面 | `req_list_ipd_projects` `req_list_ipd_project_users` `req_get_ipd_issue` `req_list_ipd_issues` `req_list_ipd_issue_tree` `req_list_ipd_attached_wikis` `req_group_ipd_issues` `req_list_ipd_tenant_issues` `req_get_ipd_statistic_dashboard` `req_list_ipd_modules` `req_list_ipd_statuses` `req_list_ipd_issue_relation_config` `req_list_ipd_labels` `req_list_ipd_project_fields` `req_list_ipd_issue_fields` `req_list_ipd_workflow_templates` `req_list_ipd_workflow_fields` `req_list_ipd_snapshot_versions` `req_list_ipd_feature_sets` `req_list_ipd_snapshot_features` `req_get_ipd_e2e_graph` `req_list_ipd_category_statuses` `req_get_ipd_work_item_flow_detail` | 已按 PDF 接入 MCP 并纳入 smoke；当前 smoke 覆盖租户级可达性，仍待真实 IPD 项目、工作项、树、Wiki、分组、统计仪表盘、字段、工作流、特性集和追溯非空样本 |
| IPD 配置写面 | `req_create_ipd_module` `req_update_ipd_module` `req_delete_ipd_module` `req_create_ipd_label` `req_update_ipd_label` `req_delete_ipd_label` `req_create_ipd_feature_set` `req_update_ipd_feature_set` `req_delete_ipd_feature_set` | 已按 PDF 接入 MCP，并已有显式 live 门禁脚手架；仍待可回收模块/标签/特性集样本后执行真实写闭环 |
| IPD 工时管理 | `req_list_ipd_work_hours` `req_list_ipd_work_hour_categories` `req_create_ipd_work_hour` `req_update_ipd_work_hour` `req_delete_ipd_work_hour` | 已按 PDF 接入 MCP，并已有显式 live 门禁脚手架；仍待真实 IPD 工作项、工时类别和可回收工时样本后执行真实写闭环 |
| IPD 字段配置 | `req_list_ipd_tenant_fields` `req_get_ipd_tenant_field_used` `req_get_ipd_tenant_field_option_used` `req_get_ipd_project_field_option_used` `req_update_ipd_tenant_field` `req_update_ipd_project_field` | 已按 PDF 接入 MCP，并已有显式 live 门禁脚手架；仍待真实租户字段、项目字段、选项使用情况和可回滚字段配置样本后执行真实写闭环 |

## 覆盖边界

- Req 写工具默认遵循 `dry_run=true` 预演策略，只有显式传 `dry_run=false` 或 client live smoke 进入专门可写分支时才执行真实写入。
- `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 只表示存在可写样本项目；iteration/comment/project 这类真实写 smoke 还需要各自的 `HUAWEICLOUD_REQ_LIVE_ENABLE_*_MUTATIONS` 门禁。
- `req_update_plan_image` 与 `req_create_plan_work_item` 虽已进入文档口径，但当前还没有纳入真实 smoke 写闭环；`/v3/plan/{project_id}/managements` 也应理解为 `req_list_plans` 的增强过滤，而不是一个已经单独 live 验证的新工具。
- IPD 读取基础面、配置写面、工作项写面、工时管理和字段配置已进入 MCP；当前真实 AK/SK smoke 已覆盖租户级 IPD 可达性和无样本边界，并补齐写面显式门禁脚手架。项目级深度与写闭环仍需要准备 IPD 项目、非空工作项、树、Wiki、分组、租户视图、统计仪表盘、可回收工作项、可上传附件/图片、可回收工时、可回滚字段配置、特性集/追溯数据、可流转状态以及可回收模块/标签/特性集样本后再执行。
- 当前真实 smoke 主要验证“可达、可读、核心写路径可控”，还没有覆盖完整租户权限矩阵、批量操作矩阵和高风险回滚场景。
- 删除类操作只用于显式可写样本下的临时资源清理；常规 MCP 写工具仍应优先保留 dry-run-first 使用方式。

## 待补项

1. 给 member 管理写路径准备可回收样本，避免为了补 live 污染真实项目成员。
2. 给 `req_update_iteration_state` 和迭代批量删除补专门样本。
3. 给 `req_update_work_item_flow` 提供稳定的目标 `status_id` 来源，再进入真实 smoke。
4. 给关联缺陷、关联提交、关联测试用例、相关用户准备非空样本。
5. 如果后续继续新增真实写 smoke，先为对应资源补独立门禁，避免普通 live 环境静默扩大写入范围。
6. 给规划面补更多真实非空样本，并为 `req_create_plan` `req_update_plan` `req_delete_plan` `req_update_plan_image` `req_create_plan_work_item` `req_add_plan_work_items` `req_clear_plan_work_items` 准备可回收样本，避免长期只有“列表可达但当前项目无规划”的弱验证。
7. 给需求池/项目空间准备有权限的真实非空 IR/RR 样本，继续加深 `req_list_programs`、`req_get_ir`、`req_list_rrs` 等只读 live smoke。
8. 给 IPD 准备真实项目、用户、工作项、树、关联 Wiki、分组、租户视图、统计仪表盘、模块、字段、工作流、特性集和 E2E 追溯样本，继续加深 `req_list_ipd_projects`、`req_get_ipd_issue`、`req_list_ipd_issues`、`req_list_ipd_issue_tree`、`req_list_ipd_attached_wikis`、`req_group_ipd_issues`、`req_list_ipd_tenant_issues`、`req_get_ipd_statistic_dashboard`、`req_get_ipd_work_item_flow_detail`、`req_list_ipd_feature_sets`、`req_get_ipd_e2e_graph` 等只读 live smoke。
9. 给 IPD 配置写面准备可回收样本，打开 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS` 后执行模块/标签/特性集真实写闭环。
10. 给 IPD 工作项写面准备可回收工作项、批量操作矩阵、附件/图片样本和流程流转样本，打开对应 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_*` 门禁后执行真实写闭环。
11. 给 IPD 工时管理准备真实工作项、工时类别和可回收工时样本，打开 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS` 后执行真实写闭环。
12. 给 IPD 字段配置准备真实租户字段、项目字段、选项使用情况和可回滚字段样本，打开 `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS` 后执行真实写闭环。

## IPD 写面 Smoke 门禁变量

这些变量只用于 `tests/products/req/client-live-smoke.test.ts`，默认不设置时不会执行真实 IPD 写入：

- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`：IPD 项目 ID。
- `HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_ID`：可回收/可测试的 IPD 工作项 ID。
- `HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_CATEGORY`：工作项类型，默认 `Bug`。
- `HUAWEICLOUD_REQ_LIVE_IPD_ASSIGNEE`、`HUAWEICLOUD_REQ_LIVE_IPD_STATUS`：创建 IPD 工作项所需的处理人和状态。
- `HUAWEICLOUD_REQ_LIVE_IPD_MODULE_PARENT_ID`：配置写 smoke 创建模块时的父模块 ID。
- `HUAWEICLOUD_REQ_LIVE_IPD_FEATURE_SET_PARENT_ID`：配置写 smoke 创建特性集时的父特性集 ID。
- `HUAWEICLOUD_REQ_LIVE_IPD_LABEL_TYPE`：标签类型，默认 `requirement`。
- `HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_CATEGORY`、`HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_TYPE`：工时类别和工时类型。
- `HUAWEICLOUD_REQ_LIVE_IPD_FLOW_CODE`：流程流转目标 code。
- `HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_ID`、`HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_DISPLAY_NAME`：租户字段配置写 smoke 样本。
- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_ID`、`HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_DISPLAY_NAME`：项目字段配置写 smoke 样本。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS`：开启模块/标签/特性集写闭环。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ISSUE_MUTATIONS`：开启 IPD 工作项创建/更新/删除闭环。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ATTACHMENT_MUTATIONS`：开启附件和图片上传/删除闭环。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS`：开启工时创建/更新/删除闭环。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FLOW_MUTATIONS`：开启流程流转。
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS`：开启租户/项目字段配置更新。

## 配合阅读

- 想先看 Req 功能面：看 [Module-Functions-Overview](./Module-Functions-Overview.md)
- 想看 Req 在官方 API 视角下对齐到哪一层：看 [Official-API-Alignment](./Official-API-Alignment.md)
- 想看所有模块的 live 状态汇总：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
