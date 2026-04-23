# Req Live Validated

这一页只说明 Req 模块的真实 AK/SK 联调边界，不把“工具已经实现”直接等同于“已经真实 live 跑过”。

当前 Req 已导出 `68` 个工具，功能面覆盖：

- `project`：项目查询、创建、更新、删除、名称校验、域内未添加项目查询
- `module`：项目模块列表、创建、更新、删除
- `member`：项目成员列表、添加、批量添加、批量移除、角色调整、主动退出
- `iteration`：迭代列表、详情、创建、更新、删除、批量删除、状态更新、不可移动问题查询
- `plan`：规划列表、规划详情、创建、更新、删除、规划图片更新、计划上下文创建工作项、规划内工作项列表、当前规划可添加工作项列表、规划内工作项加入、规划内工作项清空
- `work-item core`：工作项列表、详情、创建、更新、删除、批量更新、变更记录
- `collaboration`：评论列表/新增/更新、关联缺陷、关联提交、关联测试用例、相关用户、流转更新
- `config-read`：工作项状态列表、状态属性、状态详情、状态配置、可选状态配置、项目公共配置、工作项工作流配置、工作项模板、模板字段配置、自定义字段、自动流转开关、流转默认处理人范围
- `board-read`：看板工作项列表、看板工作项状态历史、看板工作项工作流配置
- `cache-read`：卡片模式字段缓存、通用字段缓存查询

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

## 覆盖边界

- Req 写工具默认遵循 `dry_run=true` 预演策略，只有显式传 `dry_run=false` 或 client live smoke 进入专门可写分支时才执行真实写入。
- `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 只表示存在可写样本项目；iteration/comment/project 这类真实写 smoke 还需要各自的 `HUAWEICLOUD_REQ_LIVE_ENABLE_*_MUTATIONS` 门禁。
- `req_update_plan_image` 与 `req_create_plan_work_item` 虽已进入文档口径，但当前还没有纳入真实 smoke 写闭环；`/v3/plan/{project_id}/managements` 也应理解为 `req_list_plans` 的增强过滤，而不是一个已经单独 live 验证的新工具。
- 当前真实 smoke 主要验证“可达、可读、核心写路径可控”，还没有覆盖完整租户权限矩阵、批量操作矩阵和高风险回滚场景。
- 删除类操作只用于显式可写样本下的临时资源清理；常规 MCP 写工具仍应优先保留 dry-run-first 使用方式。

## 待补项

1. 给 member 管理写路径准备可回收样本，避免为了补 live 污染真实项目成员。
2. 给 `req_update_iteration_state` 和迭代批量删除补专门样本。
3. 给 `req_update_work_item_flow` 提供稳定的目标 `status_id` 来源，再进入真实 smoke。
4. 给关联缺陷、关联提交、关联测试用例、相关用户准备非空样本。
5. 如果后续继续新增真实写 smoke，先为对应资源补独立门禁，避免普通 live 环境静默扩大写入范围。
6. 给规划面补更多真实非空样本，并为 `req_create_plan` `req_update_plan` `req_delete_plan` `req_update_plan_image` `req_create_plan_work_item` `req_add_plan_work_items` `req_clear_plan_work_items` 准备可回收样本，避免长期只有“列表可达但当前项目无规划”的弱验证。

## 配合阅读

- 想先看 Req 功能面：看 [Module-Functions-Overview](./Module-Functions-Overview.md)
- 想看 Req 在官方 API 视角下对齐到哪一层：看 [Official-API-Alignment](./Official-API-Alignment.md)
- 想看所有模块的 live 状态汇总：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
