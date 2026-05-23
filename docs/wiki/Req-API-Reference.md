# Req MCP API 参考

这份文档面向调用方和后续维护者，说明当前 `Req` 模块已经暴露的 MCP 工具、调用边界、写入安全策略和真实 AK/SK smoke 验证状态。其他 CodeArts 服务的 API 总览见 [API-Reference](./API-Reference.md)。

当前规模：

<!-- GENERATED:req-api-reference-scale:start -->
| 范围 | 数量 |
| --- | ---: |
| Req MCP 工具 | 201 |
| 读工具 | 117 |
| 写工具 | 84 |
| 产品工具总数 | 876 |
| 含鉴权的共享 HTTP 工具 | 878 |
<!-- GENERATED:req-api-reference-scale:end -->

2026-04-27 覆盖增量：

- 项目域写入：`req_create_project_domain`, `req_update_project_domain`, `req_cancel_project_domain`
- 状态配置写入：`req_create_project_status_config`, `req_batch_create_tracker_config`, `req_update_tracker_config`
- 发布/迭代计划：`req_list_release_plans`, `req_get_release_plan`, `req_create_release_plan`, `req_update_release_plan`, `req_batch_delete_release_plans`, `req_batch_update_release_plan_baseline`, `req_change_release_plan_status`
- IPD 评审读取：`req_list_ipd_change_review_issue_approvers`, `req_list_ipd_review_forms`, `req_get_ipd_review_form`, `req_get_ipd_process_instance`, `req_list_ipd_process_instances`, `req_list_ipd_review_role_users`
- IPD 评审写入：`req_create_ipd_change_review_form`, `req_update_ipd_change_review_form`, `req_delete_ipd_change_review_form`, `req_create_ipd_process_instance`, `req_update_ipd_process_instance`, `req_delete_ipd_process_instance`
- Scrum 工时写入：`req_update_working_hours`

## 设计边界

`Req` MCP 工具不是对官方 PDF 的机械 1:1 镜像，而是把高频项目协作路径整理成适合 agent 调用的工具面。

当前重点覆盖：

- Scrum 项目、成员、模块、迭代、规划、工作项和协作路径。
- 工作项状态、模板、字段、公共配置、看板和缓存读取。
- 需求池 / 项目空间只读路径，包括 Program、IR、RR 和严重程度。
- IPD 项目、工作项、模块、标签、特性集、流程、附件、图片、工时和字段配置。
- 高风险写操作默认 dry-run 或显式 gate，避免普通 live smoke 误写真实租户数据。

## 接入方式

### stdio

适合本地个人使用。凭据从环境变量读取。

```env
MCP_TRANSPORT=stdio
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_BASE_URL=https://codearts.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
```

### 共享 HTTP

适合团队共享入口。用户先调用 `auth_configure_session` 写入自己的 AK/SK，后续产品工具按会话隔离调用。

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

## 写入安全策略

Req 写工具遵循两个层面的安全策略：

| 层级 | 行为 |
| --- | --- |
| 工具输入 | 多数写工具支持 `dry_run`，默认优先预演，不直接写真实资源 |
| 真实 smoke | 写入用例必须显式打开 `HUAWEICLOUD_REQ_LIVE_ENABLE_*_MUTATIONS` gate，并且部分路径还要求提供可回收样本 ID |

不要把 `HUAWEICLOUD_REQ_LIVE_ENABLE_*_MUTATIONS=true` 放进长期共享环境。它们只应在一次性验证命令或临时 CI job 中启用。

## 字段对应说明

完整字段表以 [Function-API-Reference-Req](./Function-API-Reference-Req.md) 为准；也可以从 [Function-API-Reference](./Function-API-Reference.md) 总目录进入。那份模块明细已经给每个 Req MCP 工具参数补上“字段对应”，用于把 MCP 字段和原始 CodeArts Req/PDF API 字段一一对上。

常见对应关系：

| MCP 字段 | 原始 CodeArts Req 字段 | 说明 |
| --- | --- | --- |
| `project_id` | `project_id` / `projectUUId` | V4 工作项接口多为路径参数 `project_id`；部分 V2/规划接口请求体使用 `projectUUId` |
| `title` | `name` / `subject` | V4 创建/更新工作项对应 `name`；计划上下文创建工作项对应 `subject` |
| `work_item_type` | `tracker_id` | MCP 支持传 `task`、`bug`、`epic`、`feature`、`story` 或数字字符串，调用前转成 `tracker_id` |
| `parent_work_item_id` | `parent_issue_id` | 创建子工作项时使用 |
| `work_item_id` | `issue_id` | 路径或请求字段中的工作项 ID |
| `work_item_ids` | `id` / `issueIds` / `issue_ids` | 批量接口按原始 API 需要转换为数组或逗号分隔字符串 |
| `dry_run` | 无 | MCP 安全开关，不提交给原始 API |

几个容易混淆的接口：

- `req_create_work_item`：`title -> name`，`work_item_type -> tracker_id`，`parent_work_item_id -> parent_issue_id`，`start_date/due_date` 对应 PDF 中开始/结束时间语义。
- `req_create_plan_work_item`：走 `/v2/issues/create`，`project_id -> projectUUId`，`title -> subject`，其余工作项字段按原始计划上下文创建接口提交。
- `req_batch_update_work_items`：`work_item_ids -> id`，状态、优先级、严重程度、处理人、开发人员、完成度、迭代、模块等更新字段进入请求体 `attribute.*`。
- `req_copy_work_items`：`from_project_id -> fromProjectUUId`，`to_project_id -> toProjectUUId`，`work_item_ids -> issueIds`，工具会把数组拼成原始接口需要的逗号字符串。

## Scrum API 面

### 项目

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_projects` | 读 | 查询当前用户可见 Scrum 项目 |
| `req_get_project` | 读 | 获取项目详情 |
| `req_check_project_name` | 读 | 检查项目名是否存在 |
| `req_list_not_added_projects` | 读 | 查询域内未添加项目 |
| `req_create_project` | 写 | 创建 Scrum 项目 |
| `req_update_project` | 写 | 更新 Scrum 项目 |
| `req_delete_project` | 写 | 删除 Scrum 项目 |

真实 smoke 状态：项目读取已验证；打开 `HUAWEICLOUD_REQ_LIVE_ENABLE_PROJECT_MUTATIONS=true` 后，项目创建、更新、删除闭环已通过。真实 `getProject` 详情响应可能省略 `description` 字段，因此测试只在返回该字段时校验。

示例：

```json
{
  "tool": "req_create_project",
  "arguments": {
    "name": "mcp-live-project",
    "description": "created by codearts-mcp",
    "dry_run": true
  }
}
```

### 成员

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_project_members` | 读 | 查询项目成员 |
| `req_add_project_member` | 写 | 添加项目成员 |
| `req_batch_add_project_members` | 写 | 批量添加成员 |
| `req_batch_delete_project_members` | 写 | 批量移除成员 |
| `req_update_project_member_role` | 写 | 修改成员角色 |
| `req_leave_project` | 写 | 当前用户离开项目 |

真实 smoke 状态：成员列表读取已验证；成员写路径仍需要可回收成员样本，暂不建议在普通 live smoke 中开启。

### 迭代

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_iterations` | 读 | 获取指定项目迭代列表 |
| `req_get_iteration` | 读 | 查看迭代详情 |
| `req_list_iteration_work_items` | 读 | 查询迭代工作项 |
| `req_list_iteration_status_statistics` | 读 | 查询迭代状态统计 |
| `req_query_iteration_immovable_issues` | 读 | 查询不可移动工作项 |
| `req_create_iteration` | 写 | 创建 Scrum 项目迭代 |
| `req_update_iteration` | 写 | 更新 Scrum 项目迭代 |
| `req_update_iteration_state` | 写 | 更新迭代状态 |
| `req_delete_iteration` | 写 | 删除迭代 |
| `req_batch_delete_iterations` | 写 | 批量删除迭代 |

真实 smoke 状态：迭代列表、详情读取已验证。写闭环需要同时配置 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_ITERATION_MUTATIONS=true`。

### 规划

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_plans` | 读 | 查询规划列表，包含 `/v3/plan/{project_id}/managements` 的过滤能力 |
| `req_get_plan` | 读 | 获取规划详情 |
| `req_list_plan_addable_work_items` | 读 | 查询当前规划可添加工作项 |
| `req_list_plan_work_items` | 读 | 查询规划内工作项 |
| `req_create_plan` | 写 | 创建规划 |
| `req_update_plan` | 写 | 更新规划 |
| `req_delete_plan` | 写 | 删除规划 |
| `req_update_plan_image` | 写 | 更新规划图片 |
| `req_create_plan_work_item` | 写 | 在规划上下文创建工作项 |
| `req_add_plan_work_items` | 写 | 向规划加入工作项 |
| `req_clear_plan_work_items` | 写 | 清空规划内工作项 |

真实 smoke 状态：规划读取已进入 live smoke；规划写路径仍等待可回收规划样本。

### 工作项

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_work_items` | 读 | 查询工作项列表，保留 `rawWorkItem` 原始字段并补充可读时间 |
| `req_get_work_item` | 读 | 获取工作项详情，返回结果可直接查看分配人（`assignee` / `assignedToName`），保留 `rawWorkItem` / `raw` 原始字段并补充可读时间 |
| `req_get_work_item_issue_details` | 读 | 获取官方 V2 工作项详情，工具会把 `journals` 映射为 `comments`，返回结果可直接查看分配人（`assignee` / `assignedToName`），并保留 `rawIssue` 原始响应 |
| `req_count_work_item_tree` | 读 | 统计工作项树 |
| `req_list_work_item_tree` | 读 | 查询工作项树，保留 `rawWorkItem` 原始字段并补充可读时间 |
| `req_list_child_work_items` | 读 | 查询子工作项 |
| `req_list_work_item_records` | 读 | 查询工作项变更记录，保留 `rawRecord` 原始字段并补充可读时间 |
| `req_list_project_work_item_records` | 读 | 查询项目级工作项记录 |
| `req_create_work_item` | 写 | 创建工作项 |
| `req_update_work_item` | 写 | 更新工作项 |
| `req_delete_work_item` | 写 | 删除工作项 |
| `req_batch_update_work_items` | 写 | 批量更新工作项 |
| `req_copy_work_items` | 写 | 复制工作项 |
| `req_update_work_item_flow` | 写 | 修改工作项状态并联动责任人 |

说明：`req_list_work_items`、`req_get_work_item`、`req_list_work_item_tree` 和 `req_list_work_item_records` 会保留官方响应中的原始字段，分别通过 `rawWorkItem` / `rawRecord` 以及顶层 `raw` 返回，避免上游新增字段在 MCP 映射时丢失；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 或 `createdTimeText` 这类 Asia/Shanghai 可读时间。`req_list_user_features` 兼容官方返回数组、`features`/`result`/`data` 包裹数组以及对象字典形态，避免响应形态变化导致读取失败。`req_list_iteration_status_statistics` 的 `status_id` 是上游必填查询参数，MCP schema 也按必填校验。

说明：`req_get_work_item_issue_details` 只调用官方原始 `IssueDetailsV2 /v2/issues/show`，工具默认透传 `include=children,parent`，并把返回里的 `journals` 映射为 `comments`；该工具不会 fallback 到 `req_get_work_item` 或评论列表接口。返回字段会显式包含基础信息、时间、状态类型、优先级/严重程度、人员、项目结构、自定义字段、附件、标签、锁版本、关注/私有/删除状态和评论字段；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 这类 Asia/Shanghai 可读时间；并通过 `rawIssue` / `raw` 保留官方 V2 原始 issue 响应。

真实 smoke 状态：基础读路径已验证；工作项写闭环需要 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID`。状态流转还需要稳定的目标 `status_id` 样本。

工作项类型说明：`req_create_work_item`、`req_update_work_item`、`req_create_plan_work_item` 使用入参 `work_item_type`，内部会转换为官方 `tracker_id`。支持传名称或数字字符串：`task`/`"2"` 表示 Task，`bug`/`"3"` 表示 Bug，`epic`/`"5"` 表示 Epic，`feature`/`"6"` 表示 Feature，`story`/`"7"` 表示 Story。也就是说可用 tracker_id 集合是 `2、3、5、6、7`。

责任人说明：创建或更新工作项时可以传 `assigned_id` 关联责任人；该值是项目成员用户 ID，可先调用 `req_list_project_members` 获取。

开发人员和父工作项说明：创建、更新或批量更新工作项时可以传 `developer_id` 指定开发人员。创建普通工作项、迭代工作项或计划工作项时可以传 `parent_work_item_id` 创建子工作项；MCP 会把它映射为官方字段 `parent_issue_id`。


常用枚举映射：

- 工作项类型 / `tracker_id`：`2`=Task/任务，`3`=Bug/缺陷，`5`=Epic，`6`=Feature，`7`=Story。`work_item_type` 可以传 `task`、`bug`、`epic`、`feature`、`story`，也可以传数字字符串。
- 工作项状态 / `status_id`：`1`=新建，`2`=进行中，`3`=已解决，`4`=测试中，`5`=已关闭，`6`=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。
- 项目成员角色 / `role_id`：`-1`=项目创建者，`3`=项目经理，`4`=开发人员，`5`=测试经理，`6`=测试人员，`7`=参与者，`8`=浏览者，`9`=运维经理；部分接口还允许 `10`、`11` 等扩展角色，以租户配置为准。
- 计划类型 / `type`：`gantt`=甘特图，`mind`=思维导图。
- 计划工作项展示 / `show_type`：`list`=列表，`tree`=树形。
- 需求池字段 / `field_type`：`IR`=原始需求字段，`RR`=研发需求字段。
- 需求池查询 / `query_type`：IR 子项查询支持 `RR`、`ITEMS`；RR 列表支持 `ALL`、`DST`、`SRC`。
- IPD 过滤 / `filter_mode`：`AND_OR`=组内 AND、组间 OR；`OR_AND`=组内 OR、组间 AND。
- IPD 统计 / `classification`：`requirement`=需求，`bug`=缺陷。



### 协作与附件

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_work_item_comments` | 读 | 查询评论 |
| `req_add_work_item_comment` | 写 | 新增评论 |
| `req_update_work_item_comment` | 写 | 更新评论 |
| `req_list_associated_issues` | 读 | 查询关联缺陷 |
| `req_list_associated_commits` | 读 | 查询关联提交 |
| `req_list_associated_test_cases` | 读 | 查询关联测试用例 |
| `req_list_associated_wikis` | 读 | 查询关联 Wiki |
| `req_list_related_users` | 读 | 查询相关用户 |
| `req_upload_attachment` | 写 | 上传工作项附件 |
| `req_download_attachment` | 读 | 下载附件 |
| `req_delete_attachment` | 写 | 删除附件 |
| `req_upload_work_item_image` | 写 | 上传工作项图片 |
| `req_download_image_file` | 读 | 下载图片 |

真实 smoke 状态：评论读已覆盖；评论写需要 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` 和 `HUAWEICLOUD_REQ_LIVE_ENABLE_COMMENT_MUTATIONS=true`。

## 配置与看板 API 面

| 工具分组 | 工具 |
| --- | --- |
| 状态与配置读取 | `req_list_work_item_statuses`, `req_list_work_item_status_attributes`, `req_list_work_item_status_details`, `req_list_work_item_status_configs`, `req_list_optional_work_item_status_configs`, `req_check_work_item_status_name` |
| 模板与字段读取 | `req_list_work_item_templates`, `req_get_work_item_template_config`, `req_list_work_item_custom_fields`, `req_create_work_item_template` |
| 工作流与公共配置 | `req_list_work_item_workflow_config`, `req_get_work_item_status_rule_flag`, `req_list_work_item_tracker_handlers`, `req_get_project_public_config` |
| 看板读取 | `req_list_board_work_items`, `req_list_board_work_item_status_records`, `req_list_board_work_item_workflow_config` |
| 缓存读写 | `req_list_job_cache_boards`, `req_list_cache_data`, `req_update_cache_data` |
| 工时读写 | `req_list_project_work_hour_types`, `req_list_project_work_hours`, `req_list_work_item_work_hours`, `req_add_work_item_work_hour` |

真实 smoke 状态：状态、模板、工作流、公共配置、看板和缓存读路径已通过基础 live smoke；非空样本质量仍需要继续补。

## 项目空间与需求池 API 面

| 工具 | 类型 | 用途 |
| --- | --- | --- |
| `req_list_programs` | 读 | 查询项目空间 |
| `req_list_program_fields` | 读 | 查询项目空间字段 |
| `req_get_ir` | 读 | 获取 IR 详情 |
| `req_list_ir_children` | 读 | 查询 IR 子节点 |
| `req_list_ir_histories` | 读 | 查询 IR 历史 |
| `req_list_rrs` | 读 | 查询 RR 列表 |
| `req_list_rr_statuses` | 读 | 查询 RR 状态 |
| `req_list_rr_histories` | 读 | 查询 RR 历史 |
| `req_list_issue_severities` | 读 | 查询严重程度 |

PDF 复核结论：当前 PDF 中没有明确搜到需求池 IR/RR 的官方创建、更新、删除接口；需求池写面后续需要继续从文档细节或真实接口行为确认。

真实 smoke 状态：已纳入 live smoke。当前北京四样本中 `req_list_issue_severities` 可达，`req_list_programs` 对当前 AK 返回权限边界 `403 PM.00000014`，因此 Program/IR/RR 非空样本仍待有权限租户验证。

## IPD API 面

### IPD 读取

| 分组 | 工具 |
| --- | --- |
| 项目与用户 | `req_list_ipd_projects`, `req_list_ipd_project_users` |
| 工作项读取 | `req_get_ipd_issue`, `req_list_ipd_issues`, `req_list_ipd_issue_tree`, `req_group_ipd_issues`, `req_list_ipd_tenant_issues` |
| Wiki / 统计 | `req_list_ipd_attached_wikis`, `req_get_ipd_statistic_dashboard` |
| 配置读取 | `req_list_ipd_modules`, `req_list_ipd_statuses`, `req_list_ipd_issue_relation_config`, `req_list_ipd_labels`, `req_list_ipd_project_fields`, `req_list_ipd_issue_fields` |
| 工作流读取 | `req_list_ipd_workflow_templates`, `req_list_ipd_workflow_fields`, `req_get_ipd_work_item_flow_detail`, `req_list_ipd_category_statuses` |
| 特性集 / E2E | `req_list_ipd_snapshot_versions`, `req_list_ipd_feature_sets`, `req_list_ipd_snapshot_features`, `req_get_ipd_e2e_graph` |
| 租户字段 | `req_list_ipd_tenant_fields`, `req_get_ipd_tenant_field_used`, `req_get_ipd_tenant_field_option_used`, `req_get_ipd_project_field_option_used` |

真实 smoke 状态：租户级 IPD 可达性已验证；当前 AK 的 IPD 项目列表为空，所以项目级 IPD 非空样本仍待补。`req_list_ipd_projects` 的 `model` 现已支持自定义模型值，并兼容 `model_id` 别名透传筛选。

### IPD 配置写入

| 工具 | 用途 |
| --- | --- |
| `req_create_ipd_module` | 创建 IPD 模块 |
| `req_update_ipd_module` | 更新 IPD 模块 |
| `req_delete_ipd_module` | 删除 IPD 模块 |
| `req_create_ipd_label` | 创建 IPD 标签 |
| `req_update_ipd_label` | 更新 IPD 标签 |
| `req_delete_ipd_label` | 删除 IPD 标签 |
| `req_create_ipd_feature_set` | 创建特性集 |
| `req_update_ipd_feature_set` | 更新特性集 |
| `req_delete_ipd_feature_set` | 删除特性集 |

需要的 live smoke 样本：

- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_MODULE_PARENT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_FEATURE_SET_PARENT_ID`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS=true`

### IPD 工作项写入

| 工具 | 用途 |
| --- | --- |
| `req_create_ipd_issue` | 创建 IPD 工作项 |
| `req_batch_create_ipd_issues` | 批量创建 IPD 工作项 |
| `req_batch_update_ipd_issues` | 批量更新 IPD 工作项 |
| `req_batch_delete_ipd_issues` | 批量删除 IPD 工作项 |
| `req_transfer_ipd_work_item_flow` | 单工作项流程流转 |
| `req_batch_transfer_ipd_work_item_flow` | 批量流程流转 |

需要的 live smoke 样本：

- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_ASSIGNEE`
- `HUAWEICLOUD_REQ_LIVE_IPD_STATUS`
- `HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_CATEGORY`
- `HUAWEICLOUD_REQ_LIVE_IPD_FLOW_CODE`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ISSUE_MUTATIONS=true`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FLOW_MUTATIONS=true`

### IPD 附件与图片

| 工具 | 用途 |
| --- | --- |
| `req_upload_ipd_issue_attachment` | 上传 IPD 工作项附件 |
| `req_list_ipd_issue_attachments` | 查询附件 |
| `req_download_ipd_issue_attachment` | 下载附件 |
| `req_upload_ipd_issue_image` | 上传图片 |
| `req_download_ipd_issue_image` | 下载图片 |
| `req_delete_ipd_issue_image` | 删除图片 |

需要的 live smoke 样本：

- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_ID`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ATTACHMENT_MUTATIONS=true`

### IPD 工时

| 工具 | 用途 |
| --- | --- |
| `req_list_ipd_work_hours` | 查询 IPD 工时 |
| `req_list_ipd_work_hour_categories` | 查询工时类别 |
| `req_create_ipd_work_hour` | 创建工时 |
| `req_update_ipd_work_hour` | 更新工时 |
| `req_delete_ipd_work_hour` | 删除工时 |

需要的 live smoke 样本：

- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_ISSUE_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_TYPE`
- `HUAWEICLOUD_REQ_LIVE_IPD_WORK_HOUR_CATEGORY`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS=true`

### IPD 字段配置

| 工具 | 用途 |
| --- | --- |
| `req_update_ipd_tenant_field` | 更新租户字段配置 |
| `req_update_ipd_project_field` | 更新项目字段配置 |

需要的 live smoke 样本：

- `HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_TENANT_FIELD_DISPLAY_NAME`
- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_ID`
- `HUAWEICLOUD_REQ_LIVE_IPD_PROJECT_FIELD_DISPLAY_NAME`
- `HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS=true`

## 真实 Smoke

默认读向 smoke：

```powershell
$env:HUAWEICLOUD_AK="your-ak"
$env:HUAWEICLOUD_SK="your-sk"
$env:HUAWEICLOUD_REGION="cn-north-4"
$env:HUAWEICLOUD_BASE_URL="https://codearts.cn-north-4.myhuaweicloud.com"
$env:HUAWEICLOUD_REQ_BASE_URL="https://projectman-ext.cn-north-4.myhuaweicloud.com"
$env:MCP_SERVER_NAME="codearts-mcp"
$env:MCP_SERVER_VERSION="0.1.0"
npx vitest run tests\products\req\client-live-smoke.test.ts --reporter=verbose
```

打开写入 gate 的一次性命令示例：

```powershell
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_PROJECT_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_ITERATION_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_COMMENT_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_CONFIG_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ISSUE_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_ATTACHMENT_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_WORK_HOUR_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FLOW_MUTATIONS="true"
$env:HUAWEICLOUD_REQ_LIVE_ENABLE_IPD_FIELD_CONFIG_MUTATIONS="true"
npx vitest run tests\products\req\client-live-smoke.test.ts --reporter=verbose
```

最近一次验证结果：

| 测试 | 结果 |
| --- | --- |
| 默认 Req 真实 smoke | 17 项通过 |
| 打开写入 gate 的 Req 真实 smoke | 17 项通过 |
| 真实写入闭环 | 项目创建/更新/删除已通过 |
| 已打开 gate 但缺少样本的闭环 | 迭代、Scrum 工作项、评论、IPD 配置、IPD 工作项、IPD 附件/图片、IPD 工时、IPD 流程、IPD 字段配置 |

## 当前缺口

| 缺口 | 后续需要 |
| --- | --- |
| Scrum 迭代 / 工作项 / 评论写入 smoke | 提供指向可丢弃项目的 `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID` |
| Program / IR / RR 非空读取 | 提供具备 Program 权限的租户，以及样本 `PROGRAM_ID`, `IR_ID`, `RR_ID` |
| IPD 项目级读取 | 提供至少一个 IPD 项目和非空工作项/树/ Wiki /统计样本的租户 |
| IPD 配置写入 | 提供可丢弃模块、标签和特性集父级样本 |
| IPD 工作项写入和流程流转 | 提供可丢弃 IPD 项目、处理人、状态、分类和流程代码 |
| IPD 附件 / 图片 | 提供可丢弃 IPD 工作项 ID |
| IPD 工时 | 提供可丢弃 IPD 工作项和工时类型/类别 |
| IPD 配置写入 | 提供可回滚的租户/项目字段样本 |

## 相关文档

- [API-Reference](./API-Reference.md)
- [Req-Live-Validated](./Req-Live-Validated.md)
- [Module-Functions-Overview](./Module-Functions-Overview.md)
- [Official-API-Alignment](./Official-API-Alignment.md)
- [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
