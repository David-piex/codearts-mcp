# Req Live Validated

这一页只说明 Req 模块的真实 AK/SK 联调边界，不把“工具已经实现”直接等同于“已经真实 live 跑过”。

当前 Req 已导出 `44` 个工具，功能面覆盖：

- `project`：项目查询、创建、更新、删除、名称校验、域内未添加项目查询
- `module`：项目模块列表、创建、更新、删除
- `member`：项目成员列表、添加、批量添加、批量移除、角色调整、主动退出
- `iteration`：迭代列表、详情、创建、更新、删除、批量删除、状态更新、不可移动问题查询
- `work-item core`：工作项列表、详情、创建、更新、删除、批量更新、变更记录
- `collaboration`：评论列表/新增/更新、关联缺陷、关联提交、关联测试用例、相关用户、流转更新
- `config-read`：工作项状态列表、工作项流转配置、工作项模板、自定义字段

## 当前 Live 依据

当前仓库里真正面向 Req live 环境的依据主要来自：

- `tests/products/req/client-live-smoke.test.ts`

这份 smoke 会在配置好 `HUAWEICLOUD_AK`、`HUAWEICLOUD_SK`、`HUAWEICLOUD_REQ_BASE_URL` 等环境变量后，对真实 Req 样本做读写探测。文件名包含 `*-live.test.ts` 但内容仍是 handler 映射单测的用例，不计入真实 AK/SK 联调证据。

## 已纳入真实 AK/SK Smoke 的路径

| 路径                 | 对应工具                                                                                | 当前说明                                                                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 项目读取             | `req_list_projects` `req_get_project`                                                   | smoke 会列出真实项目，并读取一个项目详情                                                                                                                                  |
| 项目辅助读取         | `req_check_project_name` `req_list_not_added_projects`                                  | smoke 会在真实环境下校验候选项目名，并读取未添加项目列表                                                                                                                  |
| 项目写闭环           | `req_create_project` `req_update_project` `req_delete_project`                          | 仅在显式开启 `HUAWEICLOUD_REQ_LIVE_ENABLE_PROJECT_MUTATIONS` 时执行，避免普通 live 环境误创建或删除项目                                                                   |
| 项目上下文读取       | `req_list_project_members` `req_list_iterations` `req_get_iteration`                    | smoke 会读取真实项目成员、迭代列表，并在存在迭代样本时读取迭代详情                                                                                                        |
| 迭代写闭环           | `req_create_iteration` `req_update_iteration` `req_delete_iteration`                    | 仅在同时配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_ITERATION_MUTATIONS` 时执行                                                          |
| 工作项 core 读写     | `req_create_work_item` `req_get_work_item` `req_update_work_item` `req_list_work_items` | 仅在显式配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 时跑 `create -> get -> update -> list`；如果显式注入现有 `HUAWEICLOUD_REQ_LIVE_WORK_ITEM_*`，则退化为只读 `get` 检查 |
| 工作项记录与评论读取 | `req_list_work_item_records` `req_list_work_item_comments`                              | smoke 会对真实或临时工作项读取记录与评论列表                                                                                                                              |
| 工作项配置读取       | `req_list_work_item_statuses` `req_list_work_item_workflow_config` `req_list_work_item_templates` `req_list_work_item_custom_fields` | 工具已实现；当前仍待补真实项目样本下的状态/流转/模板/自定义字段读取 smoke                                                                                               |
| 评论写闭环           | `req_add_work_item_comment` `req_update_work_item_comment`                              | 仅在同时配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_COMMENT_MUTATIONS` 时，对临时工作项执行新增和更新评论                                |
| 临时工作项清理       | `req_delete_work_item`                                                                  | 仅用于显式开启评论写 smoke 时清理临时工作项                                                                                                                               |

如果只问“当前仓库里哪段 Req 路径最接近真实闭环”，答案是：`project read + project helper read + member read + iteration read + work-item core read/write on explicit writable samples + gated comment read/write`。

## 已实现但仍需更深 Live 覆盖的范围

| 范围               | 工具                                                                                                                                             | 当前状态                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| member 管理写路径  | `req_add_project_member` `req_batch_add_project_members` `req_batch_delete_project_members` `req_update_project_member_role` `req_leave_project` | 已实现、默认 dry-run 优先；仍依赖更稳定的租户权限和可回收样本                      |
| 迭代状态与批量操作 | `req_update_iteration_state` `req_batch_delete_iterations` `req_query_iteration_immovable_issues`                                                | 已实现；当前 smoke 先覆盖迭代 create/get/update/delete，状态和批量路径仍待专门样本 |
| 工作项批量管理     | `req_batch_update_work_items`                                                                                                                    | 已实现；仍需要安全的批量样本矩阵                                                   |
| 关联与相关用户查询 | `req_list_associated_issues` `req_list_associated_commits` `req_list_associated_test_cases` `req_list_related_users`                             | 已实现；还需要真实非空样本验证返回形状与字段稳定性                                 |
| 工作项流转         | `req_update_work_item_flow`                                                                                                                      | 已实现；当前没有稳定、安全的 live `status_id` 来源，所以暂未放入真实 smoke 闭环    |

## 覆盖边界

- Req 写工具默认遵循 `dry_run=true` 预演策略，只有显式传 `dry_run=false` 或 client live smoke 进入专门可写分支时才执行真实写入。
- `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 只表示存在可写样本项目；iteration/comment/project 这类新增真实写 smoke 还需要各自的 `HUAWEICLOUD_REQ_LIVE_ENABLE_*_MUTATIONS` 门禁。
- 当前真实 smoke 主要验证“可达、可读、核心写路径可走通”，还没有覆盖完整租户权限矩阵、批量操作矩阵和高风险回滚场景。
- 删除类操作只用于显式可写样本下的临时资源清理；常规 MCP 写工具仍应优先保留 dry-run-first 使用方式。
- 关联缺陷、关联提交、关联测试用例、相关用户等协作查询虽然已经实现，但仍需要真实非空样本来验证返回形状与字段稳定性。

## 待补项

1. 给 member 管理写路径准备可回收样本，避免为了补 live 污染真实项目成员。
2. 给 `req_update_iteration_state` 和迭代批量删除补专门样本。
3. 给 `req_update_work_item_flow` 提供稳定的目标 `status_id` 来源，再进入真实 smoke。
4. 给关联缺陷、关联提交、关联测试用例、相关用户准备非空样本。
5. 如果后续继续新增真实写 smoke，先为对应资源补独立门禁，避免普通 live 环境静默扩大写入范围。

## 配合阅读

- 想先看 Req 功能面：看 [Module-Functions-Overview](./Module-Functions-Overview.md)
- 想看 Req 在官方 API 视角下对齐到哪一层：看 [Official-API-Alignment](./Official-API-Alignment.md)
- 想看所有模块的 live 状态汇总：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
