# CodeArts MCP 功能 API 参考

生成日期：2026-04-25

本文档列出当前 HTTP MCP 模式暴露的每个功能 API。所有功能 API 都使用同一个 HTTP 入口：`POST /mcp`；JSON-RPC 方法固定为 `tools/call`；具体功能由 `params.name` 指定。会话、鉴权、错误响应和完整 HTTP 调用流程请先阅读 [HTTP-MCP-Interface](./HTTP-MCP-Interface.md)。

工具名、参数名和 JSON Schema 是实际调用契约，必须保持英文原值；本文档中的中文说明用于帮助理解功能含义。

## 通用调用格式

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "<tool-name>",
    "arguments": {}
  }
}
```

请求头：

```http
content-type: application/json
mcp-session-id: <session-id>
authorization: Bearer <auth-token>
```

## 模块目录

| 模块 | API 数量 |
| --- | ---: |
| [鉴权 / 会话](#鉴权--会话) | 2 |
| [Req 需求管理](#req-需求管理) | 174 |
| [Repo 代码仓](#repo-代码仓) | 25 |
| [Pipeline 流水线](#pipeline-流水线) | 77 |
| [Check 代码检查](#check-代码检查) | 8 |
| [TestPlan 测试计划](#testplan-测试计划) | 7 |
| [Deploy 部署](#deploy-部署) | 59 |
| [Build 构建](#build-构建) | 22 |
| [Artifact 制品仓](#artifact-制品仓) | 12 |
| **合计** | **386** |

## 鉴权 / 会话

| API | 中文说明 |
| --- | --- |
| `auth_clear_session` | 清除并撤销当前 MCP 会话的华为云凭证。 |
| `auth_configure_session` | 为当前 MCP 会话配置华为云 AK/SK、区域和可选服务 base URL。 |

### auth_clear_session

中文说明：清除并撤销当前 MCP 会话的华为云凭证。

原始工具说明：Clear Huawei Cloud credentials for the current MCP session

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `auth_clear_session` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "auth_clear_session",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {}
}
```

### auth_configure_session

中文说明：为当前 MCP 会话配置华为云 AK/SK、区域和可选服务 base URL。

原始工具说明：Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides.

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `auth_configure_session` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `access_key` | 是 | `string` |  |  |
| `secret_key` | 是 | `string` |  |  |
| `region` | 是 | `string` |  |  |
| `req_base_url` | 否 | `string` |  |  |
| `repo_base_url` | 否 | `string` |  |  |
| `pipeline_base_url` | 否 | `string` |  |  |
| `check_base_url` | 否 | `string` |  |  |
| `testplan_base_url` | 否 | `string` |  |  |
| `deploy_base_url` | 否 | `string` |  |  |
| `build_base_url` | 否 | `string` |  |  |
| `artifact_base_url` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "auth_configure_session",
    "arguments": {
      "access_key": "<access_key>",
      "secret_key": "<secret_key>",
      "region": "<region>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "access_key": {
      "type": "string",
      "minLength": 1
    },
    "secret_key": {
      "type": "string",
      "minLength": 1
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "req_base_url": {
      "type": "string",
      "format": "uri"
    },
    "repo_base_url": {
      "type": "string",
      "format": "uri"
    },
    "pipeline_base_url": {
      "type": "string",
      "format": "uri"
    },
    "check_base_url": {
      "type": "string",
      "format": "uri"
    },
    "testplan_base_url": {
      "type": "string",
      "format": "uri"
    },
    "deploy_base_url": {
      "type": "string",
      "format": "uri"
    },
    "build_base_url": {
      "type": "string",
      "format": "uri"
    },
    "artifact_base_url": {
      "type": "string",
      "format": "uri"
    }
  },
  "required": [
    "access_key",
    "secret_key",
    "region"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Req 需求管理

| API | 中文说明 |
| --- | --- |
| `req_add_iteration_work_items` | 新增Req 需求管理的迭代工作项。 |
| `req_add_plan_work_items` | 新增Req 需求管理的计划工作项。 |
| `req_add_project_member` | 新增Req 需求管理的项目成员。 |
| `req_add_work_item_comment` | 新增Req 需求管理的工作项评论。 |
| `req_add_work_item_work_hour` | 新增Req 需求管理的工作项工作hour。 |
| `req_batch_add_project_members` | 批量Req 需求管理的add项目成员。 |
| `req_batch_create_ipd_issues` | 批量Req 需求管理的createipd问题。 |
| `req_batch_delete_ipd_issues` | 批量Req 需求管理的deleteipd问题。 |
| `req_batch_delete_iterations` | 批量Req 需求管理的delete迭代。 |
| `req_batch_delete_project_members` | 批量Req 需求管理的delete项目成员。 |
| `req_batch_delete_work_items` | 批量Req 需求管理的delete工作项。 |
| `req_batch_transfer_ipd_work_item_flow` | 批量Req 需求管理的transferipd工作项流程。 |
| `req_batch_update_ipd_issues` | 批量Req 需求管理的updateipd问题。 |
| `req_batch_update_work_items` | 批量Req 需求管理的update工作项。 |
| `req_check_project_name` | checkReq 需求管理的项目name。 |
| `req_check_work_item_status_name` | checkReq 需求管理的工作项状态name。 |
| `req_clear_plan_work_items` | 清除Req 需求管理的计划工作项。 |
| `req_copy_work_items` | copyReq 需求管理的工作项。 |
| `req_count_work_item_tree` | countReq 需求管理的工作项树。 |
| `req_create_ipd_feature_set` | 创建Req 需求管理的ipdfeatureset。 |
| `req_create_ipd_issue` | 创建Req 需求管理的ipd问题。 |
| `req_create_ipd_label` | 创建Req 需求管理的ipdlabel。 |
| `req_create_ipd_module` | 创建Req 需求管理的ipdmodule。 |
| `req_create_ipd_work_hour` | 创建Req 需求管理的ipd工作hour。 |
| `req_create_iteration` | 创建Req 需求管理的迭代。 |
| `req_create_iteration_work_item` | 创建Req 需求管理的迭代工作项。 |
| `req_create_plan` | 创建Req 需求管理的计划。 |
| `req_create_plan_work_item` | 创建Req 需求管理的计划工作项。 |
| `req_create_project` | 创建Req 需求管理的项目。 |
| `req_create_project_module` | 创建Req 需求管理的项目module。 |
| `req_create_work_item` | 创建Req 需求管理的工作项。 |
| `req_create_work_item_template` | 创建Req 需求管理的工作项模板。 |
| `req_delete_attachment` | 删除Req 需求管理的附件。 |
| `req_delete_ipd_feature_set` | 删除Req 需求管理的ipdfeatureset。 |
| `req_delete_ipd_issue_image` | 删除Req 需求管理的ipd问题图片。 |
| `req_delete_ipd_label` | 删除Req 需求管理的ipdlabel。 |
| `req_delete_ipd_module` | 删除Req 需求管理的ipdmodule。 |
| `req_delete_ipd_work_hour` | 删除Req 需求管理的ipd工作hour。 |
| `req_delete_iteration` | 删除Req 需求管理的迭代。 |
| `req_delete_plan` | 删除Req 需求管理的计划。 |
| `req_delete_project` | 删除Req 需求管理的项目。 |
| `req_delete_project_module` | 删除Req 需求管理的项目module。 |
| `req_delete_project_template` | 删除Req 需求管理的项目模板。 |
| `req_delete_work_item` | 删除Req 需求管理的工作项。 |
| `req_download_attachment` | 下载Req 需求管理的附件。 |
| `req_download_image_file` | 下载Req 需求管理的图片文件。 |
| `req_download_ipd_issue_attachment` | 下载Req 需求管理的ipd问题附件。 |
| `req_download_ipd_issue_image` | 下载Req 需求管理的ipd问题图片。 |
| `req_get_current_user_info` | 获取Req 需求管理的current用户信息。 |
| `req_get_current_user_role` | 获取Req 需求管理的current用户role。 |
| `req_get_ipd_e2e_graph` | 获取Req 需求管理的ipde2e图。 |
| `req_get_ipd_issue` | 获取Req 需求管理的ipd问题。 |
| `req_get_ipd_project_field_option_used` | 获取Req 需求管理的ipd项目fieldoptionused。 |
| `req_get_ipd_statistic_dashboard` | 获取Req 需求管理的ipdstatisticdashboard。 |
| `req_get_ipd_tenant_field_option_used` | 获取Req 需求管理的ipdtenantfieldoptionused。 |
| `req_get_ipd_tenant_field_used` | 获取Req 需求管理的ipdtenantfieldused。 |
| `req_get_ipd_work_item_flow_detail` | 获取Req 需求管理的ipd工作项流程详情。 |
| `req_get_ir` | 获取Req 需求管理的ir。 |
| `req_get_iteration` | 获取Req 需求管理的迭代。 |
| `req_get_plan` | 获取Req 需求管理的计划。 |
| `req_get_project` | 获取Req 需求管理的项目。 |
| `req_get_project_bug_density` | 获取Req 需求管理的项目bugdensity。 |
| `req_get_project_bugs_per_developer` | 获取Req 需求管理的项目bugsperdeveloper。 |
| `req_get_project_completion_rate` | 获取Req 需求管理的项目completionrate。 |
| `req_get_project_due_days_after` | 获取Req 需求管理的项目duedaysafter。 |
| `req_get_project_public_config` | 获取Req 需求管理的项目public配置。 |
| `req_get_project_summary` | 获取Req 需求管理的项目summary。 |
| `req_get_project_workhour_config` | 获取Req 需求管理的项目workhour配置。 |
| `req_get_work_item` | 获取Req 需求管理的工作项。 |
| `req_get_work_item_completion_rate` | 获取Req 需求管理的工作项completionrate。 |
| `req_get_work_item_index_counts` | 获取Req 需求管理的工作项indexcounts。 |
| `req_get_work_item_issue_details` | 获取Req 需求管理的工作项问题详情。 |
| `req_get_work_item_status_rule_flag` | 获取Req 需求管理的工作项状态ruleflag。 |
| `req_get_work_item_template_config` | 获取Req 需求管理的工作项模板配置。 |
| `req_group_ipd_issues` | groupReq 需求管理的ipd问题。 |
| `req_leave_project` | leaveReq 需求管理的项目。 |
| `req_list_associated_commits` | 查询列表Req 需求管理的associatedcommits。 |
| `req_list_associated_issues` | 查询列表Req 需求管理的associated问题。 |
| `req_list_associated_test_cases` | 查询列表Req 需求管理的associatedtest用例。 |
| `req_list_associated_wikis` | 查询列表Req 需求管理的associatedwikis。 |
| `req_list_board_work_item_status_records` | 查询列表Req 需求管理的board工作项状态记录。 |
| `req_list_board_work_item_workflow_config` | 查询列表Req 需求管理的board工作项workflow配置。 |
| `req_list_board_work_items` | 查询列表Req 需求管理的board工作项。 |
| `req_list_cache_data` | 查询列表Req 需求管理的cachedata。 |
| `req_list_child_work_items` | 查询列表Req 需求管理的child工作项。 |
| `req_list_ipd_attached_wikis` | 查询列表Req 需求管理的ipdattachedwikis。 |
| `req_list_ipd_category_statuses` | 查询列表Req 需求管理的ipdcategory状态。 |
| `req_list_ipd_feature_sets` | 查询列表Req 需求管理的ipdfeaturesets。 |
| `req_list_ipd_issue_attachments` | 查询列表Req 需求管理的ipd问题附件。 |
| `req_list_ipd_issue_fields` | 查询列表Req 需求管理的ipd问题fields。 |
| `req_list_ipd_issue_relation_config` | 查询列表Req 需求管理的ipd问题relation配置。 |
| `req_list_ipd_issue_tree` | 查询列表Req 需求管理的ipd问题树。 |
| `req_list_ipd_issues` | 查询列表Req 需求管理的ipd问题。 |
| `req_list_ipd_labels` | 查询列表Req 需求管理的ipdlabels。 |
| `req_list_ipd_modules` | 查询列表Req 需求管理的ipdmodules。 |
| `req_list_ipd_project_fields` | 查询列表Req 需求管理的ipd项目fields。 |
| `req_list_ipd_project_users` | 查询列表Req 需求管理的ipd项目用户。 |
| `req_list_ipd_projects` | 查询列表Req 需求管理的ipd项目。 |
| `req_list_ipd_snapshot_features` | 查询列表Req 需求管理的ipdsnapshotfeatures。 |
| `req_list_ipd_snapshot_versions` | 查询列表Req 需求管理的ipdsnapshot版本。 |
| `req_list_ipd_statuses` | 查询列表Req 需求管理的ipd状态。 |
| `req_list_ipd_tenant_fields` | 查询列表Req 需求管理的ipdtenantfields。 |
| `req_list_ipd_tenant_issues` | 查询列表Req 需求管理的ipdtenant问题。 |
| `req_list_ipd_work_hour_categories` | 查询列表Req 需求管理的ipd工作hourcategories。 |
| `req_list_ipd_work_hours` | 查询列表Req 需求管理的ipd工作hours。 |
| `req_list_ipd_workflow_fields` | 查询列表Req 需求管理的ipdworkflowfields。 |
| `req_list_ipd_workflow_templates` | 查询列表Req 需求管理的ipdworkflowtemplates。 |
| `req_list_ir_children` | 查询列表Req 需求管理的irchildren。 |
| `req_list_ir_histories` | 查询列表Req 需求管理的ir历史记录。 |
| `req_list_issue_severities` | 查询列表Req 需求管理的问题severities。 |
| `req_list_iteration_status_statistics` | 查询列表Req 需求管理的迭代状态统计。 |
| `req_list_iteration_work_items` | 查询列表Req 需求管理的迭代工作项。 |
| `req_list_iterations` | 查询列表Req 需求管理的迭代。 |
| `req_list_job_cache_boards` | 查询列表Req 需求管理的任务cacheboards。 |
| `req_list_not_added_projects` | 查询列表Req 需求管理的notadded项目。 |
| `req_list_optional_work_item_status_configs` | 查询列表Req 需求管理的optional工作项状态配置。 |
| `req_list_plan_addable_work_items` | 查询列表Req 需求管理的计划addable工作项。 |
| `req_list_plan_work_items` | 查询列表Req 需求管理的计划工作项。 |
| `req_list_plans` | 查询列表Req 需求管理的计划。 |
| `req_list_program_fields` | 查询列表Req 需求管理的programfields。 |
| `req_list_programs` | 查询列表Req 需求管理的programs。 |
| `req_list_project_bug_statistics` | 查询列表Req 需求管理的项目bug统计。 |
| `req_list_project_demand_statistics` | 查询列表Req 需求管理的项目demand统计。 |
| `req_list_project_domains` | 查询列表Req 需求管理的项目domains。 |
| `req_list_project_members` | 查询列表Req 需求管理的项目成员。 |
| `req_list_project_modules` | 查询列表Req 需求管理的项目modules。 |
| `req_list_project_work_hour_types` | 查询列表Req 需求管理的项目工作hourtypes。 |
| `req_list_project_work_hours` | 查询列表Req 需求管理的项目工作hours。 |
| `req_list_project_work_item_records` | 查询列表Req 需求管理的项目工作项记录。 |
| `req_list_projects` | 查询列表Req 需求管理的项目。 |
| `req_list_related_users` | 查询列表Req 需求管理的related用户。 |
| `req_list_rr_histories` | 查询列表Req 需求管理的rr历史记录。 |
| `req_list_rr_statuses` | 查询列表Req 需求管理的rr状态。 |
| `req_list_rrs` | 查询列表Req 需求管理的rrs。 |
| `req_list_user_features` | 查询列表Req 需求管理的用户features。 |
| `req_list_work_item_comments` | 查询列表Req 需求管理的工作项评论。 |
| `req_list_work_item_custom_fields` | 查询列表Req 需求管理的工作项customfields。 |
| `req_list_work_item_records` | 查询列表Req 需求管理的工作项记录。 |
| `req_list_work_item_status_attributes` | 查询列表Req 需求管理的工作项状态attributes。 |
| `req_list_work_item_status_configs` | 查询列表Req 需求管理的工作项状态配置。 |
| `req_list_work_item_status_details` | 查询列表Req 需求管理的工作项状态详情。 |
| `req_list_work_item_statuses` | 查询列表Req 需求管理的工作项状态。 |
| `req_list_work_item_tags` | 查询列表Req 需求管理的工作项tags。 |
| `req_list_work_item_templates` | 查询列表Req 需求管理的工作项templates。 |
| `req_list_work_item_tracker_handlers` | 查询列表Req 需求管理的工作项trackerhandlers。 |
| `req_list_work_item_tree` | 查询列表Req 需求管理的工作项树。 |
| `req_list_work_item_work_hours` | 查询列表Req 需求管理的工作项工作hours。 |
| `req_list_work_item_workflow_config` | 查询列表Req 需求管理的工作项workflow配置。 |
| `req_list_work_items` | 查询列表Req 需求管理的工作项。 |
| `req_query_iteration_immovable_issues` | 查询Req 需求管理的迭代immovable问题。 |
| `req_transfer_ipd_work_item_flow` | transferReq 需求管理的ipd工作项流程。 |
| `req_update_cache_data` | 更新Req 需求管理的cachedata。 |
| `req_update_ipd_feature_set` | 更新Req 需求管理的ipdfeatureset。 |
| `req_update_ipd_label` | 更新Req 需求管理的ipdlabel。 |
| `req_update_ipd_module` | 更新Req 需求管理的ipdmodule。 |
| `req_update_ipd_project_field` | 更新Req 需求管理的ipd项目field。 |
| `req_update_ipd_tenant_field` | 更新Req 需求管理的ipdtenantfield。 |
| `req_update_ipd_work_hour` | 更新Req 需求管理的ipd工作hour。 |
| `req_update_iteration` | 更新Req 需求管理的迭代。 |
| `req_update_iteration_state` | 更新Req 需求管理的迭代state。 |
| `req_update_plan` | 更新Req 需求管理的计划。 |
| `req_update_plan_image` | 更新Req 需求管理的计划图片。 |
| `req_update_project` | 更新Req 需求管理的项目。 |
| `req_update_project_member_role` | 更新Req 需求管理的项目成员role。 |
| `req_update_project_module` | 更新Req 需求管理的项目module。 |
| `req_update_project_template` | 更新Req 需求管理的项目模板。 |
| `req_update_work_item` | 更新Req 需求管理的工作项。 |
| `req_update_work_item_comment` | 更新Req 需求管理的工作项评论。 |
| `req_update_work_item_flow` | 更新Req 需求管理的工作项流程。 |
| `req_upload_attachment` | 上传Req 需求管理的附件。 |
| `req_upload_ipd_issue_attachment` | 上传Req 需求管理的ipd问题附件。 |
| `req_upload_ipd_issue_image` | 上传Req 需求管理的ipd问题图片。 |
| `req_upload_work_item_image` | 上传Req 需求管理的工作项图片。 |
| `req_validate_module_name` | validateReq 需求管理的modulename。 |

### req_add_iteration_work_items

中文说明：新增Req 需求管理的迭代工作项。

原始工具说明：Add work items to a CodeArts Req iteration

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_add_iteration_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `work_item_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_iteration_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>",
      "work_item_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_plan_work_items

中文说明：新增Req 需求管理的计划工作项。

原始工具说明：Add work items to a CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_add_plan_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `work_item_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_plan_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>",
      "work_item_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_project_member

中文说明：新增Req 需求管理的项目成员。

原始工具说明：Add member to a CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_add_project_member` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `user_id` | 是 | `unknown` |  |  |
| `domain_id` | 是 | `unknown` |  |  |
| `domain_name` | 否 | `string` |  |  |
| `role_id` | 否 | `number` |  | 可选值：-1：3：4：5：6：7：8：9：10：11 |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_project_member",
    "arguments": {
      "project_id": "<project_id>",
      "user_id": "<user_id>",
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_name": {
      "type": "string",
      "minLength": 1
    },
    "role_id": {
      "type": "number",
      "enum": [
        -1,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_id",
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_work_item_comment

中文说明：新增Req 需求管理的工作项评论。

原始工具说明：Add comment to a CodeArts Req work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_add_work_item_comment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `content` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_work_item_comment",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "content": "<content>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_work_item_work_hour

中文说明：新增Req 需求管理的工作项工作hour。

原始工具说明：Add a work hour record to a CodeArts Req work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_add_work_item_work_hour` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_work_item_work_hour",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_batch_add_project_members

中文说明：批量Req 需求管理的add项目成员。

原始工具说明：Add multiple members to a CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_add_project_members` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `members` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_add_project_members",
    "arguments": {
      "project_id": "<project_id>",
      "members": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "members": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "role_id": {
            "type": "number",
            "enum": [
              -1,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11
            ]
          }
        },
        "required": [
          "user_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "members"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_create_ipd_issues

中文说明：批量Req 需求管理的createipd问题。

原始工具说明：Batch create CodeArts Req IPD issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_create_ipd_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issues` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_create_ipd_issues",
    "arguments": {
      "project_id": "<project_id>",
      "issues": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "minLength": 1
          },
          "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 256
          },
          "description": {
            "type": "string",
            "maxLength": 500000
          },
          "parent_id": {
            "$ref": "#/properties/project_id"
          },
          "status": {
            "type": "string",
            "minLength": 1
          },
          "assignee": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id"
              },
              "name": {
                "type": "string"
              },
              "nick_name": {
                "type": "string"
              }
            },
            "additionalProperties": true
          },
          "assigned_cc": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            },
            "maxItems": 50
          },
          "submitted_by": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            }
          },
          "recipient": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            }
          },
          "labels": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/project_id"
                },
                "label_type": {
                  "type": "string"
                },
                "color": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            }
          },
          "custom_fields": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": [
                    "string",
                    "number",
                    "boolean",
                    "null"
                  ]
                }
              },
              "required": [
                "code",
                "value"
              ],
              "additionalProperties": false
            }
          },
          "priority": {
            "type": "string"
          },
          "workload": {
            "type": "string"
          },
          "plan_pi": {
            "$ref": "#/properties/project_id"
          },
          "plan_iteration": {
            "$ref": "#/properties/project_id"
          },
          "business_domain": {
            "type": "string"
          },
          "feature_set": {
            "$ref": "#/properties/project_id"
          },
          "extra_fields": {
            "type": "object",
            "additionalProperties": {}
          },
          "children": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": {}
            }
          },
          "ir2feature": {
            "type": "string"
          },
          "ir2rr": {
            "type": "string"
          },
          "related_network_security": {
            "type": "string"
          },
          "collaboratives": {
            "type": "string"
          }
        },
        "required": [
          "category",
          "title",
          "description",
          "status"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issues"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_ipd_issues

中文说明：批量Req 需求管理的deleteipd问题。

原始工具说明：Batch delete CodeArts Req IPD issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_delete_ipd_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_ids` | 是 | `array` |  |  |
| `is_permanent_delete` | 否 | `boolean` |  |  |
| `src_project_id` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_ipd_issues",
    "arguments": {
      "project_id": "<project_id>",
      "issue_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 50
    },
    "is_permanent_delete": {
      "type": "boolean"
    },
    "src_project_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_iterations

中文说明：批量Req 需求管理的delete迭代。

原始工具说明：Delete multiple CodeArts Req iterations

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_delete_iterations` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_iterations",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_project_members

中文说明：批量Req 需求管理的delete项目成员。

原始工具说明：Remove multiple members from a CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_delete_project_members` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `user_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_project_members",
    "arguments": {
      "project_id": "<project_id>",
      "user_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_work_items

中文说明：批量Req 需求管理的delete工作项。

原始工具说明：Delete multiple CodeArts Req work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_delete_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 100
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_transfer_ipd_work_item_flow

中文说明：批量Req 需求管理的transferipd工作项流程。

原始工具说明：Batch transfer CodeArts Req IPD work item flow

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_transfer_ipd_work_item_flow` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_ids` | 是 | `array` |  |  |
| `issue_category` | 是 | `string` |  |  |
| `flow_code` | 是 | `string` |  |  |
| `is_recover` | 否 | `boolean` | false |  |
| `process_context` | 否 | `object` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_transfer_ipd_work_item_flow",
    "arguments": {
      "project_id": "<project_id>",
      "issue_ids": [],
      "issue_category": "<issue_category>",
      "flow_code": "<flow_code>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    },
    "flow_code": {
      "type": "string",
      "minLength": 1
    },
    "is_recover": {
      "type": "boolean",
      "default": false
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids",
    "issue_category",
    "flow_code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_ipd_issues

中文说明：批量Req 需求管理的updateipd问题。

原始工具说明：Batch update CodeArts Req IPD issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_update_ipd_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_ids` | 是 | `array` |  |  |
| `attribute` | 是 | `object` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_ipd_issues",
    "arguments": {
      "project_id": "<project_id>",
      "issue_ids": [],
      "attribute": {}
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "attribute": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string",
          "minLength": 1
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "maxLength": 256
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50000
        },
        "parent_id": {
          "$ref": "#/properties/project_id"
        },
        "status": {
          "type": "string"
        },
        "assignee": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "#/properties/project_id"
            },
            "name": {
              "type": "string"
            },
            "nick_name": {
              "type": "string"
            }
          },
          "additionalProperties": true
        },
        "assigned_cc": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          },
          "maxItems": 50
        },
        "submitted_by": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          }
        },
        "recipient": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          }
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id"
              },
              "label_type": {
                "type": "string"
              },
              "color": {
                "type": "string"
              },
              "title": {
                "type": "string"
              }
            },
            "additionalProperties": true
          }
        },
        "custom_fields": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "code": {
                "type": "string",
                "minLength": 1
              },
              "value": {
                "type": [
                  "string",
                  "number",
                  "boolean",
                  "null"
                ]
              }
            },
            "required": [
              "code",
              "value"
            ],
            "additionalProperties": false
          }
        },
        "priority": {
          "type": "string"
        },
        "workload": {
          "type": "string"
        },
        "plan_pi": {
          "$ref": "#/properties/project_id"
        },
        "plan_iteration": {
          "$ref": "#/properties/project_id"
        },
        "business_domain": {
          "type": "string"
        },
        "feature_set": {
          "$ref": "#/properties/project_id"
        },
        "extra_fields": {
          "type": "object",
          "additionalProperties": {}
        }
      },
      "required": [
        "category"
      ],
      "additionalProperties": true
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids",
    "attribute"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_work_items

中文说明：批量Req 需求管理的update工作项。

原始工具说明：Batch update CodeArts Req work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_batch_update_work_items` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_work_items",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_check_project_name

中文说明：checkReq 需求管理的项目name。

原始工具说明：Check whether a CodeArts Req project name exists

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_check_project_name` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_check_project_name",
    "arguments": {
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_check_work_item_status_name

中文说明：checkReq 需求管理的工作项状态name。

原始工具说明：Check whether a CodeArts Req work item status name already exists

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_check_work_item_status_name` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `status_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_check_work_item_status_name",
    "arguments": {
      "project_id": "<project_id>",
      "status_name": "<status_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    }
  },
  "required": [
    "project_id",
    "status_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_clear_plan_work_items

中文说明：清除Req 需求管理的计划工作项。

原始工具说明：Clear work items from a CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_clear_plan_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_clear_plan_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_copy_work_items

中文说明：copyReq 需求管理的工作项。

原始工具说明：Copy CodeArts Req work items between projects

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_copy_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `from_project_id` | 是 | `string` |  |  |
| `to_project_id` | 是 | `unknown` |  |  |
| `work_item_ids` | 是 | `array` |  |  |
| `copy_comments` | 否 | `boolean` | false |  |
| `copy_work_hours` | 否 | `boolean` | false |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_copy_work_items",
    "arguments": {
      "from_project_id": "<from_project_id>",
      "to_project_id": "<to_project_id>",
      "work_item_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "from_project_id": {
      "type": "string",
      "minLength": 1
    },
    "to_project_id": {
      "$ref": "#/properties/from_project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/from_project_id"
      },
      "minItems": 1
    },
    "copy_comments": {
      "type": "boolean",
      "default": false
    },
    "copy_work_hours": {
      "type": "boolean",
      "default": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "from_project_id",
    "to_project_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_count_work_item_tree

中文说明：countReq 需求管理的工作项树。

原始工具说明：Count CodeArts Req work items in tree mode

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_count_work_item_tree` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `tracker_ids` | 否 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_count_work_item_tree",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_ids": {
      "type": "array",
      "items": {
        "type": "number",
        "enum": [
          2,
          3,
          5,
          6,
          7
        ]
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_feature_set

中文说明：创建Req 需求管理的ipdfeatureset。

原始工具说明：Create CodeArts Req IPD feature set

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_ipd_feature_set` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `title` | 是 | `string` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_feature_set",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "parent_id": "<parent_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_issue

中文说明：创建Req 需求管理的ipd问题。

原始工具说明：Create CodeArts Req IPD issue

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_ipd_issue` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `title` | 是 | `string` |  |  |
| `description` | 是 | `string` |  |  |
| `category` | 是 | `string` |  |  |
| `assignee` | 是 | `unknown` |  |  |
| `status` | 否 | `string` |  |  |
| `src_domain` | 否 | `unknown` |  |  |
| `submitted_by` | 否 | `unknown` |  |  |
| `domain_id` | 否 | `unknown` |  |  |
| `recipient` | 否 | `array` |  |  |
| `expect_delivery_time` | 否 | `integer` |  |  |
| `priority` | 否 | `string` |  |  |
| `assigned_cc` | 否 | `array` |  |  |
| `plan_pi` | 否 | `unknown` |  |  |
| `plan_iteration` | 否 | `unknown` |  |  |
| `plan_start_date` | 否 | `integer` |  |  |
| `plan_end_date` | 否 | `integer` |  |  |
| `workload_man_day` | 否 | `number` |  |  |
| `business_domain` | 否 | `string` |  |  |
| `need_break` | 否 | `string` |  |  |
| `extra_fields` | 否 | `object` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_issue",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "description": "<description>",
      "category": "<category>",
      "assignee": "<assignee>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string",
      "maxLength": 500000
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "status": {
      "type": "string"
    },
    "src_domain": {
      "$ref": "#/properties/project_id"
    },
    "submitted_by": {
      "$ref": "#/properties/project_id"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "recipient": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "expect_delivery_time": {
      "type": "integer"
    },
    "priority": {
      "type": "string"
    },
    "assigned_cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "maxItems": 50
    },
    "plan_pi": {
      "$ref": "#/properties/project_id"
    },
    "plan_iteration": {
      "$ref": "#/properties/project_id"
    },
    "plan_start_date": {
      "type": "integer"
    },
    "plan_end_date": {
      "type": "integer"
    },
    "workload_man_day": {
      "type": "number"
    },
    "business_domain": {
      "type": "string"
    },
    "need_break": {
      "type": "string"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "description",
    "category",
    "assignee"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_label

中文说明：创建Req 需求管理的ipdlabel。

原始工具说明：Create CodeArts Req IPD label

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_ipd_label` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `label_type` | 是 | `string` |  |  |
| `color` | 是 | `string` |  |  |
| `title` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_label",
    "arguments": {
      "project_id": "<project_id>",
      "label_type": "<label_type>",
      "color": "<color>",
      "title": "<title>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "label_type": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "label_type",
    "color",
    "title"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_module

中文说明：创建Req 需求管理的ipdmodule。

原始工具说明：Create CodeArts Req IPD module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_ipd_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `display_value` | 是 | `string` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `description` | 否 | `string` |  |  |
| `assignee` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_module",
    "arguments": {
      "project_id": "<project_id>",
      "display_value": "<display_value>",
      "parent_id": "<parent_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "display_value",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_work_hour

中文说明：创建Req 需求管理的ipd工作hour。

原始工具说明：Create CodeArts Req IPD work hour record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_ipd_work_hour` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `work_date_begin` | 是 | `string` |  |  |
| `work_date_end` | 是 | `string` |  |  |
| `work_hours` | 是 | `string \| number` |  |  |
| `work_hour_type` | 是 | `anyOf` |  |  |
| `include_weekend` | 是 | `boolean` |  |  |
| `work_hour_category` | 否 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_work_hour",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "work_date_begin": "<work_date_begin>",
      "work_date_end": "<work_date_end>",
      "work_hours": "<work_hours>",
      "work_hour_type": "<work_hour_type>",
      "include_weekend": true
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "work_date_begin": {
      "type": "string",
      "minLength": 1
    },
    "work_date_end": {
      "type": "string",
      "minLength": 1
    },
    "work_hours": {
      "type": [
        "string",
        "number"
      ]
    },
    "work_hour_type": {
      "anyOf": [
        {
          "type": "number",
          "const": 1
        },
        {
          "type": "number",
          "const": 2
        },
        {
          "type": "string",
          "minLength": 1
        }
      ]
    },
    "include_weekend": {
      "type": "boolean"
    },
    "work_hour_category": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "work_date_begin",
    "work_date_end",
    "work_hours",
    "work_hour_type",
    "include_weekend"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_iteration

中文说明：创建Req 需求管理的迭代。

原始工具说明：Create CodeArts Req iteration

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_iteration` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `begin_time` | 是 | `string` |  |  |
| `end_time` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_iteration",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "begin_time": "<begin_time>",
      "end_time": "<end_time>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "begin_time",
    "end_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_iteration_work_item

中文说明：创建Req 需求管理的迭代工作项。

原始工具说明：Create CodeArts Req iteration work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_iteration_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `title` | 是 | `string` |  |  |
| `work_item_type` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `priority_id` | 否 | `integer` |  |  |
| `module_id` | 否 | `unknown` |  |  |
| `severity_id` | 否 | `integer` |  |  |
| `assigned_id` | 否 | `unknown` |  |  |
| `done_ratio` | 否 | `integer` |  |  |
| `expected_work_hours` | 否 | `integer` |  |  |
| `start_date` | 否 | `integer` |  |  |
| `due_date` | 否 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_iteration_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>",
      "title": "<title>",
      "work_item_type": "<work_item_type>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_plan

中文说明：创建Req 需求管理的计划。

原始工具说明：Create CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_plan` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `type` | 是 | `string` |  | 可选值：gantt：mind |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_plan",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "type": "gantt"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "enum": [
        "gantt",
        "mind"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_plan_work_item

中文说明：创建Req 需求管理的计划工作项。

原始工具说明：Create CodeArts Req plan work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_plan_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `title` | 是 | `string` |  |  |
| `work_item_type` | 是 | `string` |  |  |
| `parent_work_item_id` | 否 | `unknown` |  |  |
| `description` | 否 | `string` |  |  |
| `iteration_id` | 否 | `unknown` |  |  |
| `module_id` | 否 | `unknown` |  |  |
| `priority_id` | 否 | `integer` |  |  |
| `severity_id` | 否 | `integer` |  |  |
| `status_id` | 否 | `integer` |  |  |
| `assigned_id` | 否 | `unknown` |  |  |
| `done_ratio` | 否 | `integer` |  |  |
| `expected_work_hours` | 否 | `integer` |  |  |
| `start_date` | 否 | `integer` |  |  |
| `due_date` | 否 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_plan_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>",
      "title": "<title>",
      "work_item_type": "<work_item_type>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project

中文说明：创建Req 需求管理的项目。

原始工具说明：Create CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_project` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project",
    "arguments": {
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project_module

中文说明：创建Req 需求管理的项目module。

原始工具说明：Create CodeArts Req project module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_project_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `module_name` | 是 | `string` |  |  |
| `owner_user_id` | 是 | `unknown` |  |  |
| `parent_module_id` | 否 | `integer` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_module",
    "arguments": {
      "project_id": "<project_id>",
      "module_name": "<module_name>",
      "owner_user_id": "<owner_user_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id"
    },
    "parent_module_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_name",
    "owner_user_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item

中文说明：创建Req 需求管理的工作项。

原始工具说明：Create CodeArts Req work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `title` | 是 | `string` |  |  |
| `work_item_type` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `priority_id` | 否 | `integer` |  |  |
| `iteration_id` | 否 | `unknown` |  |  |
| `module_id` | 否 | `unknown` |  |  |
| `severity_id` | 否 | `integer` |  |  |
| `assigned_id` | 否 | `unknown` |  |  |
| `done_ratio` | 否 | `integer` |  |  |
| `expected_work_hours` | 否 | `integer` |  |  |
| `start_date` | 否 | `integer` |  |  |
| `due_date` | 否 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "work_item_type": "<work_item_type>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item_template

中文说明：创建Req 需求管理的工作项模板。

原始工具说明：Create or update a CodeArts Req work item template

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_create_work_item_template` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item_template",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_delete_attachment

中文说明：删除Req 需求管理的附件。

原始工具说明：Delete a CodeArts Req work item attachment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_attachment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `attachment_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_attachment",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "attachment_id": "<attachment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_feature_set

中文说明：删除Req 需求管理的ipdfeatureset。

原始工具说明：Delete CodeArts Req IPD feature set

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_ipd_feature_set` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `feature_set_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_feature_set",
    "arguments": {
      "project_id": "<project_id>",
      "feature_set_id": "<feature_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "feature_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_issue_image

中文说明：删除Req 需求管理的ipd问题图片。

原始工具说明：Delete image from CodeArts Req IPD issue description

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_ipd_issue_image` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `file_name` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_issue_image",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "file_name": "<file_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_label

中文说明：删除Req 需求管理的ipdlabel。

原始工具说明：Delete CodeArts Req IPD label

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_ipd_label` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `label_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_label",
    "arguments": {
      "project_id": "<project_id>",
      "label_id": "<label_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "label_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "label_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_module

中文说明：删除Req 需求管理的ipdmodule。

原始工具说明：Delete CodeArts Req IPD module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_ipd_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `module_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_module",
    "arguments": {
      "project_id": "<project_id>",
      "module_id": "<module_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_work_hour

中文说明：删除Req 需求管理的ipd工作hour。

原始工具说明：Delete CodeArts Req IPD work hour record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_ipd_work_hour` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `workhour_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_work_hour",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "workhour_id": "<workhour_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "workhour_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "workhour_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_iteration

中文说明：删除Req 需求管理的迭代。

原始工具说明：Delete CodeArts Req iteration

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_iteration` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_iteration",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_plan

中文说明：删除Req 需求管理的计划。

原始工具说明：Delete CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_plan` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project

中文说明：删除Req 需求管理的项目。

原始工具说明：Delete CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_project` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project_module

中文说明：删除Req 需求管理的项目module。

原始工具说明：Delete CodeArts Req project module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_project_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `module_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project_module",
    "arguments": {
      "project_id": "<project_id>",
      "module_id": "<module_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project_template

中文说明：删除Req 需求管理的项目模板。

原始工具说明：Delete a CodeArts Req project template

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_project_template` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project_template",
    "arguments": {
      "template_id": "<template_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_work_item

中文说明：删除Req 需求管理的工作项。

原始工具说明：Delete CodeArts Req work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_delete_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_attachment

中文说明：下载Req 需求管理的附件。

原始工具说明：Download a CodeArts Req work item attachment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_download_attachment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `attachment_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_attachment",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "attachment_id": "<attachment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_image_file

中文说明：下载Req 需求管理的图片文件。

原始工具说明：Download a CodeArts Req image file

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_download_image_file` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `image_uri` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_image_file",
    "arguments": {
      "project_id": "<project_id>",
      "image_uri": "<image_uri>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "image_uri": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "image_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_ipd_issue_attachment

中文说明：下载Req 需求管理的ipd问题附件。

原始工具说明：Download CodeArts Req IPD issue attachment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_download_ipd_issue_attachment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `attachment_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_ipd_issue_attachment",
    "arguments": {
      "project_id": "<project_id>",
      "attachment_id": "<attachment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_ipd_issue_image

中文说明：下载Req 需求管理的ipd问题图片。

原始工具说明：Download image from CodeArts Req IPD issue description

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_download_ipd_issue_image` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `file_name` | 是 | `string` |  |  |
| `field_code` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_ipd_issue_image",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "file_name": "<file_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "field_code": {
      "type": "string",
      "maxLength": 64
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_info

中文说明：获取Req 需求管理的current用户信息。

原始工具说明：Get current CodeArts Req user info

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_current_user_info` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_current_user_info",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_role

中文说明：获取Req 需求管理的current用户role。

原始工具说明：Get current CodeArts Req user role in a project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_current_user_role` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_current_user_role",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_e2e_graph

中文说明：获取Req 需求管理的ipde2e图。

原始工具说明：Get CodeArts Req IPD E2E trace graph

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_e2e_graph` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `category` | 是 | `string` |  |  |
| `is_src` | 否 | `boolean` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_e2e_graph",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "category": "<category>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "is_src": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_issue

中文说明：获取Req 需求管理的ipd问题。

原始工具说明：Get CodeArts Req IPD issue detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_issue` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `version` | 否 | `string` | "v2" | 可选值：v1：v2 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_issue",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "version": {
      "type": "string",
      "enum": [
        "v1",
        "v2"
      ],
      "default": "v2"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_project_field_option_used

中文说明：获取Req 需求管理的ipd项目fieldoptionused。

原始工具说明：Get CodeArts Req IPD project field option usage

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_project_field_option_used` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `code` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_project_field_option_used",
    "arguments": {
      "project_id": "<project_id>",
      "code": "<code>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "code": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_statistic_dashboard

中文说明：获取Req 需求管理的ipdstatisticdashboard。

原始工具说明：Get CodeArts Req IPD statistic dashboard

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_statistic_dashboard` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `classification` | 是 | `string` |  | 可选值：requirement：bug |
| `plan` | 否 | `object` |  |  |
| `created_date` | 否 | `object` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_statistic_dashboard",
    "arguments": {
      "project_id": "<project_id>",
      "classification": "requirement"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "classification": {
      "type": "string",
      "enum": [
        "requirement",
        "bug"
      ]
    },
    "plan": {
      "type": "object",
      "properties": {
        "plan_pi": {
          "type": "string"
        },
        "plan_iteration": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "created_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "classification"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_tenant_field_option_used

中文说明：获取Req 需求管理的ipdtenantfieldoptionused。

原始工具说明：Get CodeArts Req IPD tenant field option usage

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_tenant_field_option_used` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `code` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_tenant_field_option_used",
    "arguments": {
      "code": "<code>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_tenant_field_used

中文说明：获取Req 需求管理的ipdtenantfieldused。

原始工具说明：Get CodeArts Req IPD tenant field usage

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_tenant_field_used` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `field_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_tenant_field_used",
    "arguments": {
      "field_id": "<field_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "field_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "field_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_work_item_flow_detail

中文说明：获取Req 需求管理的ipd工作项流程详情。

原始工具说明：Get CodeArts Req IPD work item flow detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ipd_work_item_flow_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `issue_category` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_work_item_flow_detail",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "issue_category": "<issue_category>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "issue_category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ir

中文说明：获取Req 需求管理的ir。

原始工具说明：Get a CodeArts Req requirement pool IR detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_ir` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  |  |
| `ir_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ir",
    "arguments": {
      "program_id": "<program_id>",
      "ir_id": "<ir_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "ir_id": {
      "$ref": "#/properties/program_id"
    }
  },
  "required": [
    "program_id",
    "ir_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_iteration

中文说明：获取Req 需求管理的迭代。

原始工具说明：Get CodeArts Req iteration detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_iteration` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `iteration_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_iteration",
    "arguments": {
      "iteration_id": "<iteration_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "iteration_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_plan

中文说明：获取Req 需求管理的计划。

原始工具说明：Get CodeArts Req plan detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_plan` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project

中文说明：获取Req 需求管理的项目。

原始工具说明：Get CodeArts Req project detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_bug_density

中文说明：获取Req 需求管理的项目bugdensity。

原始工具说明：Get CodeArts Req project bug density metric

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_bug_density` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `date_range` | 否 | `string` |  |  |
| `metric_type` | 否 | `string` |  |  |
| `dividend` | 否 | `object` |  |  |
| `divisor` | 否 | `object` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_bug_density",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "date_range": {
      "type": "string",
      "minLength": 1
    },
    "metric_type": {
      "type": "string",
      "minLength": 1
    },
    "dividend": {
      "type": "object",
      "properties": {
        "custom_fields": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "minLength": 1
              },
              "options": {
                "type": "string",
                "minLength": 1
              }
            },
            "additionalProperties": false
          },
          "minItems": 1
        }
      },
      "additionalProperties": false
    },
    "divisor": {
      "type": "object",
      "properties": {
        "custom_fields": {
          "type": "array",
          "items": {
            "$ref": "#/properties/dividend/properties/custom_fields/items"
          },
          "minItems": 1
        }
      },
      "additionalProperties": false
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_bugs_per_developer

中文说明：获取Req 需求管理的项目bugsperdeveloper。

原始工具说明：Get CodeArts Req project bugs per developer metric

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_bugs_per_developer` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_bugs_per_developer",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_completion_rate

中文说明：获取Req 需求管理的项目completionrate。

原始工具说明：Get CodeArts Req project completion rate metric

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_completion_rate` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `date_range` | 否 | `string` |  |  |
| `metric_type` | 否 | `string` |  |  |
| `sprint_id` | 否 | `unknown` |  |  |
| `dividend` | 否 | `object` |  |  |
| `divisor` | 否 | `object` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_completion_rate",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "date_range": {
      "type": "string",
      "minLength": 1
    },
    "metric_type": {
      "type": "string",
      "minLength": 1
    },
    "sprint_id": {
      "$ref": "#/properties/project_id"
    },
    "dividend": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "divisor": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_due_days_after

中文说明：获取Req 需求管理的项目duedaysafter。

原始工具说明：Get CodeArts Req project due-days-after config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_due_days_after` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_due_days_after",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_public_config

中文说明：获取Req 需求管理的项目public配置。

原始工具说明：Get CodeArts Req project public config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_public_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_public_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_summary

中文说明：获取Req 需求管理的项目summary。

原始工具说明：Get CodeArts Req project summary

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_summary` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_summary",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_workhour_config

中文说明：获取Req 需求管理的项目workhour配置。

原始工具说明：Get CodeArts Req project workhour config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_project_workhour_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_workhour_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item

中文说明：获取Req 需求管理的工作项。

原始工具说明：Get CodeArts Req work item detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_completion_rate

中文说明：获取Req 需求管理的工作项completionrate。

原始工具说明：Get CodeArts Req work item completion rates

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item_completion_rate` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_completion_rate",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_index_counts

中文说明：获取Req 需求管理的工作项indexcounts。

原始工具说明：Get CodeArts Req work item index counts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item_index_counts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_index_counts",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_issue_details

中文说明：获取Req 需求管理的工作项问题详情。

原始工具说明：Get CodeArts Req work item issue details from the V2 detail endpoint

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item_issue_details` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `include` | 否 | `string` | "children,parent" |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_issue_details",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "include": {
      "type": "string",
      "minLength": 1,
      "default": "children,parent"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_status_rule_flag

中文说明：获取Req 需求管理的工作项状态ruleflag。

原始工具说明：Get CodeArts Req work item status rule flag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item_status_rule_flag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_status_rule_flag",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_template_config

中文说明：获取Req 需求管理的工作项模板配置。

原始工具说明：Get CodeArts Req work item template config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_get_work_item_template_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_template_config",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_group_ipd_issues

中文说明：groupReq 需求管理的ipd问题。

原始工具说明：Group CodeArts Req IPD issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_group_ipd_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `issue_type` | 是 | `string` |  |  |
| `group_field_id` | 是 | `unknown` |  |  |
| `is_project_group` | 否 | `boolean` |  |  |
| `group_sort` | 否 | `string` |  | 可选值：asc：desc |
| `filter` | 否 | `array` |  |  |
| `filter_mode` | 否 | `string` | "AND_OR" | 可选值：OR_AND：AND_OR |
| `sort` | 否 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_group_ipd_issues",
    "arguments": {
      "project_id": "<project_id>",
      "issue_type": "<issue_type>",
      "group_field_id": "<group_field_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "group_field_id": {
      "$ref": "#/properties/project_id"
    },
    "is_project_group": {
      "type": "boolean"
    },
    "group_sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "operator": {
              "type": "string"
            }
          },
          "additionalProperties": true
        }
      },
      "maxItems": 200
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    }
  },
  "required": [
    "project_id",
    "issue_type",
    "group_field_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_leave_project

中文说明：leaveReq 需求管理的项目。

原始工具说明：Leave a CodeArts Req project as the current member

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_leave_project` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_leave_project",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_commits

中文说明：查询列表Req 需求管理的associatedcommits。

原始工具说明：List CodeArts Req associated commits

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_associated_commits` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `type` | 否 | `string` | "commit" | 可选值：commit：branch |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_commits",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "enum": [
        "commit",
        "branch"
      ],
      "default": "commit"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_issues

中文说明：查询列表Req 需求管理的associated问题。

原始工具说明：List CodeArts Req associated issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_associated_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_issues",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_test_cases

中文说明：查询列表Req 需求管理的associatedtest用例。

原始工具说明：List CodeArts Req associated test cases

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_associated_test_cases` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_test_cases",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_wikis

中文说明：查询列表Req 需求管理的associatedwikis。

原始工具说明：List CodeArts Req associated wikis

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_associated_wikis` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_wikis",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_item_status_records

中文说明：查询列表Req 需求管理的board工作项状态记录。

原始工具说明：List CodeArts Req board work item status records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_board_work_item_status_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_item_status_records",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_item_workflow_config

中文说明：查询列表Req 需求管理的board工作项workflow配置。

原始工具说明：List CodeArts Req board work item workflow config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_board_work_item_workflow_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `board_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_item_workflow_config",
    "arguments": {
      "project_id": "<project_id>",
      "board_id": "<board_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "board_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "board_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_items

中文说明：查询列表Req 需求管理的board工作项。

原始工具说明：List CodeArts Req board work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_board_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `created_time_interval` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_items",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "created_time_interval": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_cache_data

中文说明：查询列表Req 需求管理的cachedata。

原始工具说明：List CodeArts Req cache data

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_cache_data` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  |  |
| `type` | 否 | `string` | "backlog" |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_cache_data",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "backlog"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_child_work_items

中文说明：查询列表Req 需求管理的child工作项。

原始工具说明：List CodeArts Req child work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_child_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `subject` | 否 | `string` |  |  |
| `query_type` | 否 | `string` | "basic" | 可选值：basic：custom：query |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_child_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "parent_id": "<parent_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    },
    "query_type": {
      "type": "string",
      "enum": [
        "basic",
        "custom",
        "query"
      ],
      "default": "basic"
    }
  },
  "required": [
    "project_id",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_attached_wikis

中文说明：查询列表Req 需求管理的ipdattachedwikis。

原始工具说明：List CodeArts Req IPD issue attached wikis

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_attached_wikis` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `category` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_attached_wikis",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_category_statuses

中文说明：查询列表Req 需求管理的ipdcategory状态。

原始工具说明：List CodeArts Req IPD category statuses

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_category_statuses` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `category_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_category_statuses",
    "arguments": {
      "project_id": "<project_id>",
      "category_id": "<category_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_feature_sets

中文说明：查询列表Req 需求管理的ipdfeaturesets。

原始工具说明：List CodeArts Req IPD feature sets

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_feature_sets` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `snapshot_version_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_feature_sets",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_attachments

中文说明：查询列表Req 需求管理的ipd问题附件。

原始工具说明：List CodeArts Req IPD issue attachments

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_issue_attachments` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `source_project_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_attachments",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "source_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_fields

中文说明：查询列表Req 需求管理的ipd问题fields。

原始工具说明：List CodeArts Req IPD issue fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_issue_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `category_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_fields",
    "arguments": {
      "project_id": "<project_id>",
      "category_id": "<category_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_relation_config

中文说明：查询列表Req 需求管理的ipd问题relation配置。

原始工具说明：List CodeArts Req IPD issue relation config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_issue_relation_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_relation_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_tree

中文说明：查询列表Req 需求管理的ipd问题树。

原始工具说明：List CodeArts Req IPD issue tree

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_issue_tree` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `category` | 是 | `string` |  |  |
| `keyword` | 否 | `string` |  |  |
| `number` | 否 | `array` |  |  |
| `plan` | 否 | `array` |  |  |
| `modified_date` | 否 | `object` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_tree",
    "arguments": {
      "project_id": "<project_id>",
      "category": "<category>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "keyword": {
      "type": "string"
    },
    "number": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "plan": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "plan_pi": {
            "type": "string"
          },
          "plan_iteration": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "additionalProperties": true
      }
    },
    "modified_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issues

中文说明：查询列表Req 需求管理的ipd问题。

原始工具说明：List CodeArts Req IPD issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `issue_type` | 是 | `string` |  |  |
| `filter` | 否 | `array` |  |  |
| `filter_mode` | 否 | `string` | "AND_OR" | 可选值：OR_AND：AND_OR |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issues",
    "arguments": {
      "project_id": "<project_id>",
      "issue_type": "<issue_type>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    }
  },
  "required": [
    "project_id",
    "issue_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_labels

中文说明：查询列表Req 需求管理的ipdlabels。

原始工具说明：List CodeArts Req IPD labels

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_labels` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_labels",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_modules

中文说明：查询列表Req 需求管理的ipdmodules。

原始工具说明：List CodeArts Req IPD modules

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_modules` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_modules",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_project_fields

中文说明：查询列表Req 需求管理的ipd项目fields。

原始工具说明：List CodeArts Req IPD project fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_project_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_project_fields",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_project_users

中文说明：查询列表Req 需求管理的ipd项目用户。

原始工具说明：List CodeArts Req IPD project users

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_project_users` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_project_users",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_projects

中文说明：查询列表Req 需求管理的ipd项目。

原始工具说明：List CodeArts Req IPD projects

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_projects` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `search` | 否 | `string` |  |  |
| `model` | 否 | `string` |  | 可选值：10001：10002：10003 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_projects",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "search": {
      "type": "string"
    },
    "model": {
      "type": "string",
      "enum": [
        "10001",
        "10002",
        "10003"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_snapshot_features

中文说明：查询列表Req 需求管理的ipdsnapshotfeatures。

原始工具说明：List CodeArts Req IPD snapshot features

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_snapshot_features` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `snapshot_version_id` | 是 | `unknown` |  |  |
| `feature_set_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_snapshot_features",
    "arguments": {
      "project_id": "<project_id>",
      "snapshot_version_id": "<snapshot_version_id>",
      "feature_set_id": "<feature_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id"
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "snapshot_version_id",
    "feature_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_snapshot_versions

中文说明：查询列表Req 需求管理的ipdsnapshot版本。

原始工具说明：List CodeArts Req IPD feature set snapshot versions

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_snapshot_versions` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_snapshot_versions",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_statuses

中文说明：查询列表Req 需求管理的ipd状态。

原始工具说明：List CodeArts Req IPD statuses

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_statuses` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `category_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_statuses",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_tenant_fields

中文说明：查询列表Req 需求管理的ipdtenantfields。

原始工具说明：List CodeArts Req IPD tenant fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_tenant_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `search` | 否 | `string` |  |  |
| `sort_info` | 否 | `object` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_tenant_fields",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "search": {
      "type": "string"
    },
    "sort_info": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "asc": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_tenant_issues

中文说明：查询列表Req 需求管理的ipdtenant问题。

原始工具说明：List CodeArts Req IPD tenant issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_tenant_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 否 | `anyOf` |  |  |
| `issue_type` | 是 | `string` |  |  |
| `filter` | 否 | `array` |  |  |
| `filter_mode` | 否 | `string` | "AND_OR" | 可选值：OR_AND：AND_OR |
| `sort` | 否 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_tenant_issues",
    "arguments": {
      "issue_type": "<issue_type>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/project_id/anyOf/0"
          },
          "maxItems": 10
        }
      ]
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "operator": {
              "type": "string"
            }
          },
          "additionalProperties": true
        }
      },
      "maxItems": 200
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    }
  },
  "required": [
    "issue_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_work_hour_categories

中文说明：查询列表Req 需求管理的ipd工作hourcategories。

原始工具说明：List CodeArts Req IPD work hour categories

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_work_hour_categories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `display_value` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_work_hour_categories",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "maxLength": 30
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_work_hours

中文说明：查询列表Req 需求管理的ipd工作hours。

原始工具说明：List CodeArts Req IPD work hour records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_work_hours` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `plan_pi` | 否 | `array` |  |  |
| `plan_iteration` | 否 | `array` |  |  |
| `workitem_id` | 否 | `array` |  |  |
| `created_by` | 否 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_work_hours",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_pi": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "plan_iteration": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "workitem_id": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "created_by": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_workflow_fields

中文说明：查询列表Req 需求管理的ipdworkflowfields。

原始工具说明：List CodeArts Req IPD workflow fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_workflow_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `category_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_workflow_fields",
    "arguments": {
      "project_id": "<project_id>",
      "category_id": "<category_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_workflow_templates

中文说明：查询列表Req 需求管理的ipdworkflowtemplates。

原始工具说明：List CodeArts Req IPD workflow templates

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ipd_workflow_templates` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `category_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_workflow_templates",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ir_children

中文说明：查询列表Req 需求管理的irchildren。

原始工具说明：List CodeArts Req requirement pool IR children

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ir_children` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `program_id` | 是 | `string` |  |  |
| `ir_id` | 是 | `unknown` |  |  |
| `query_type` | 是 | `string` |  | 可选值：RR：ITEMS |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ir_children",
    "arguments": {
      "program_id": "<program_id>",
      "ir_id": "<ir_id>",
      "query_type": "RR"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "ir_id": {
      "$ref": "#/properties/program_id"
    },
    "query_type": {
      "type": "string",
      "enum": [
        "RR",
        "ITEMS"
      ]
    }
  },
  "required": [
    "program_id",
    "ir_id",
    "query_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ir_histories

中文说明：查询列表Req 需求管理的ir历史记录。

原始工具说明：List CodeArts Req requirement pool IR history records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_ir_histories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `ir_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ir_histories",
    "arguments": {
      "ir_id": "<ir_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "ir_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "ir_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_issue_severities

中文说明：查询列表Req 需求管理的问题severities。

原始工具说明：List CodeArts Req issue severities

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_issue_severities` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_issue_severities",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_status_statistics

中文说明：查询列表Req 需求管理的迭代状态统计。

原始工具说明：List CodeArts Req iteration status statistics

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_iteration_status_statistics` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `tracker_id` | 否 | `integer` |  |  |
| `status_id` | 否 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iteration_status_statistics",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_work_items

中文说明：查询列表Req 需求管理的迭代工作项。

原始工具说明：List CodeArts Req work items in an iteration

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_iteration_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `tracker_id` | 否 | `number` |  | 可选值：2：3：5：6：7 |
| `status_id` | 否 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iteration_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iterations

中文说明：查询列表Req 需求管理的迭代。

原始工具说明：List CodeArts Req iterations

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_iterations` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iterations",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_job_cache_boards

中文说明：查询列表Req 需求管理的任务cacheboards。

原始工具说明：List CodeArts Req board cache fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_job_cache_boards` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `type` | 否 | `string` | "board" |  |
| `region` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_job_cache_boards",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "board"
    },
    "region": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_not_added_projects

中文说明：查询列表Req 需求管理的notadded项目。

原始工具说明：List CodeArts Req projects not yet added to the current domain

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_not_added_projects` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_not_added_projects",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_optional_work_item_status_configs

中文说明：查询列表Req 需求管理的optional工作项状态配置。

原始工具说明：List CodeArts Req optional work item status configs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_optional_work_item_status_configs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_optional_work_item_status_configs",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plan_addable_work_items

中文说明：查询列表Req 需求管理的计划addable工作项。

原始工具说明：List addable work items for a CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_plan_addable_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `subject` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plan_addable_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plan_work_items

中文说明：查询列表Req 需求管理的计划工作项。

原始工具说明：List CodeArts Req work items in a plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_plan_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `subject` | 否 | `string` |  |  |
| `show_type` | 否 | `string` | "list" | 可选值：list：tree |
| `tracker_id` | 否 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plan_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    },
    "show_type": {
      "type": "string",
      "enum": [
        "list",
        "tree"
      ],
      "default": "list"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plans

中文说明：查询列表Req 需求管理的计划。

原始工具说明：List CodeArts Req plans

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_plans` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `status_id` | 否 | `integer` |  |  |
| `plan_id` | 否 | `unknown` |  |  |
| `search` | 否 | `string` |  |  |
| `user_ids` | 否 | `array` |  |  |
| `sort` | 否 | `string` |  |  |
| `type` | 否 | `string` |  | 可选值：gantt：mind |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plans",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "search": {
      "type": "string"
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "sort": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "enum": [
        "gantt",
        "mind"
      ]
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_program_fields

中文说明：查询列表Req 需求管理的programfields。

原始工具说明：List CodeArts Req program IR or RR fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_program_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  |  |
| `field_type` | 是 | `string` |  | 可选值：IR：RR |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_program_fields",
    "arguments": {
      "program_id": "<program_id>",
      "field_type": "IR"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "field_type": {
      "type": "string",
      "enum": [
        "IR",
        "RR"
      ]
    }
  },
  "required": [
    "program_id",
    "field_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_programs

中文说明：查询列表Req 需求管理的programs。

原始工具说明：List CodeArts Req project spaces / programs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_programs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `search` | 否 | `string` |  |  |
| `sort_key` | 否 | `string` |  | 可选值：name：created_time |
| `sort_dir` | 否 | `string` |  | 可选值：ASC：DESC：asc：desc |
| `is_watched` | 否 | `boolean` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_programs",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "sort_key": {
      "type": "string",
      "enum": [
        "name",
        "created_time"
      ]
    },
    "sort_dir": {
      "type": "string",
      "enum": [
        "ASC",
        "DESC",
        "asc",
        "desc"
      ]
    },
    "is_watched": {
      "type": "boolean"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_bug_statistics

中文说明：查询列表Req 需求管理的项目bug统计。

原始工具说明：List CodeArts Req project bug statistics

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_bug_statistics` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_bug_statistics",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_demand_statistics

中文说明：查询列表Req 需求管理的项目demand统计。

原始工具说明：List CodeArts Req project demand statistics

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_demand_statistics` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_demand_statistics",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_domains

中文说明：查询列表Req 需求管理的项目domains。

原始工具说明：List CodeArts Req project domains

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_domains` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_domains",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_members

中文说明：查询列表Req 需求管理的项目成员。

原始工具说明：List CodeArts Req project members

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_members` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_members",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_modules

中文说明：查询列表Req 需求管理的项目modules。

原始工具说明：List CodeArts Req project modules

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_modules` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_modules",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_hour_types

中文说明：查询列表Req 需求管理的项目工作hourtypes。

原始工具说明：List CodeArts Req project work hour types

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_work_hour_types` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `status` | 否 | `number` |  | 可选值：1：2 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hour_types",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "number",
      "enum": [
        1,
        2
      ]
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_hours

中文说明：查询列表Req 需求管理的项目工作hours。

原始工具说明：List CodeArts Req project work hour records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_work_hours` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_ids` | 是 | `array` |  |  |
| `begin_time` | 否 | `string` |  |  |
| `end_time` | 否 | `string` |  |  |
| `work_hours_dates` | 否 | `string` |  |  |
| `work_hours_types` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hours",
    "arguments": {
      "project_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "work_hours_dates": {
      "type": "string",
      "minLength": 1
    },
    "work_hours_types": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_item_records

中文说明：查询列表Req 需求管理的项目工作项记录。

原始工具说明：List CodeArts Req project work item records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_project_work_item_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `operated_time_interval` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_item_records",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "operated_time_interval": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_projects

中文说明：查询列表Req 需求管理的项目。

原始工具说明：List CodeArts Req projects

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_projects` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `organization_id` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_projects",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "organization_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_related_users

中文说明：查询列表Req 需求管理的related用户。

原始工具说明：List CodeArts Req related users

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_related_users` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_related_users",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rr_histories

中文说明：查询列表Req 需求管理的rr历史记录。

原始工具说明：List CodeArts Req requirement pool RR history records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_rr_histories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `rr_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rr_histories",
    "arguments": {
      "rr_id": "<rr_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "rr_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "rr_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rr_statuses

中文说明：查询列表Req 需求管理的rr状态。

原始工具说明：List CodeArts Req requirement pool RR statuses

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_rr_statuses` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  |  |
| `rr_ids` | 是 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rr_statuses",
    "arguments": {
      "program_id": "<program_id>",
      "rr_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "rr_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/program_id"
      },
      "minItems": 1,
      "maxItems": 100
    }
  },
  "required": [
    "program_id",
    "rr_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rrs

中文说明：查询列表Req 需求管理的rrs。

原始工具说明：List CodeArts Req requirement pool RRs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_rrs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `program_id` | 是 | `string` |  |  |
| `query_type` | 否 | `string` | "ALL" | 可选值：ALL：DST：SRC |
| `include_deleted` | 否 | `boolean` |  |  |
| `updated_time_interval` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rrs",
    "arguments": {
      "program_id": "<program_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "query_type": {
      "type": "string",
      "enum": [
        "ALL",
        "DST",
        "SRC"
      ],
      "default": "ALL"
    },
    "include_deleted": {
      "type": "boolean"
    },
    "updated_time_interval": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "program_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_user_features

中文说明：查询列表Req 需求管理的用户features。

原始工具说明：List CodeArts Req user features

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_user_features` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_user_features",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_comments

中文说明：查询列表Req 需求管理的工作项评论。

原始工具说明：List CodeArts Req work item comments

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_comments` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_comments",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_custom_fields

中文说明：查询列表Req 需求管理的工作项customfields。

原始工具说明：List CodeArts Req work item custom fields

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_custom_fields` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 否 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_custom_fields",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_records

中文说明：查询列表Req 需求管理的工作项记录。

原始工具说明：List CodeArts Req work item records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `journalized_type` | 否 | `string` | "Issue" |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_records",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "journalized_type": {
      "type": "string",
      "minLength": 1,
      "default": "Issue"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_attributes

中文说明：查询列表Req 需求管理的工作项状态attributes。

原始工具说明：List CodeArts Req work item status attributes

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_status_attributes` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_attributes",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_configs

中文说明：查询列表Req 需求管理的工作项状态配置。

原始工具说明：List CodeArts Req work item status configs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_status_configs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_configs",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_details

中文说明：查询列表Req 需求管理的工作项状态详情。

原始工具说明：List CodeArts Req work item status details

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_status_details` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_details",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_statuses

中文说明：查询列表Req 需求管理的工作项状态。

原始工具说明：List CodeArts Req work item statuses

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_statuses` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_statuses",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tags

中文说明：查询列表Req 需求管理的工作项tags。

原始工具说明：List CodeArts Req work item tags

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_tags` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `name` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tags",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_templates

中文说明：查询列表Req 需求管理的工作项templates。

原始工具说明：List CodeArts Req work item templates

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_templates` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 否 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_templates",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tracker_handlers

中文说明：查询列表Req 需求管理的工作项trackerhandlers。

原始工具说明：List CodeArts Req work item tracker handlers

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_tracker_handlers` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tracker_handlers",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tree

中文说明：查询列表Req 需求管理的工作项树。

原始工具说明：List CodeArts Req work items in tree mode

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_tree` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `project_id` | 是 | `string` |  |  |
| `tracker_ids` | 否 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tree",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_ids": {
      "type": "array",
      "items": {
        "type": "number",
        "enum": [
          2,
          3,
          5,
          6,
          7
        ]
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_work_hours

中文说明：查询列表Req 需求管理的工作项工作hours。

原始工具说明：List CodeArts Req work hour records for a work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_work_hours` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_work_hours",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_workflow_config

中文说明：查询列表Req 需求管理的工作项workflow配置。

原始工具说明：List CodeArts Req work item workflow config

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_item_workflow_config` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tracker_id` | 是 | `number` |  | 可选值：2：3：5：6：7 |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_workflow_config",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": 2
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ]
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_items

中文说明：查询列表Req 需求管理的工作项。

原始工具说明：List CodeArts Req work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_list_work_items` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_items",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_query_iteration_immovable_issues

中文说明：查询Req 需求管理的迭代immovable问题。

原始工具说明：Query CodeArts Req iteration immovable issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_query_iteration_immovable_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `version_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_query_iteration_immovable_issues",
    "arguments": {
      "project_id": "<project_id>",
      "version_id": "<version_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_transfer_ipd_work_item_flow

中文说明：transferReq 需求管理的ipd工作项流程。

原始工具说明：Transfer CodeArts Req IPD work item flow

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_transfer_ipd_work_item_flow` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `issue_category` | 是 | `string` |  |  |
| `flow_code` | 是 | `string` |  |  |
| `process_context` | 否 | `object` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_transfer_ipd_work_item_flow",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "issue_category": "<issue_category>",
      "flow_code": "<flow_code>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    },
    "flow_code": {
      "type": "string",
      "minLength": 1
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "issue_category",
    "flow_code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_cache_data

中文说明：更新Req 需求管理的cachedata。

原始工具说明：Update CodeArts Req cache data

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_cache_data` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_cache_data",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_feature_set

中文说明：更新Req 需求管理的ipdfeatureset。

原始工具说明：Update CodeArts Req IPD feature set

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_feature_set` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `feature_set_id` | 是 | `unknown` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `title` | 否 | `string` |  |  |
| `position_float` | 否 | `number` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_feature_set",
    "arguments": {
      "project_id": "<project_id>",
      "feature_set_id": "<feature_set_id>",
      "parent_id": "<parent_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "position_float": {
      "type": "number"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "feature_set_id",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_label

中文说明：更新Req 需求管理的ipdlabel。

原始工具说明：Update CodeArts Req IPD label

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_label` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_label",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_module

中文说明：更新Req 需求管理的ipdmodule。

原始工具说明：Update CodeArts Req IPD module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `display_value` | 是 | `string` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `description` | 否 | `string` |  |  |
| `assignee` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |
| `module_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_module",
    "arguments": {
      "project_id": "<project_id>",
      "display_value": "<display_value>",
      "parent_id": "<parent_id>",
      "module_id": "<module_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "display_value",
    "parent_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_project_field

中文说明：更新Req 需求管理的ipd项目field。

原始工具说明：Update CodeArts Req IPD project field

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_project_field` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_project_field",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_tenant_field

中文说明：更新Req 需求管理的ipdtenantfield。

原始工具说明：Update CodeArts Req IPD tenant field

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_tenant_field` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_tenant_field",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_work_hour

中文说明：更新Req 需求管理的ipd工作hour。

原始工具说明：Update CodeArts Req IPD work hour record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_ipd_work_hour` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_work_hour",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_iteration

中文说明：更新Req 需求管理的迭代。

原始工具说明：Update CodeArts Req iteration

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_iteration` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `begin_time` | 否 | `string` |  |  |
| `end_time` | 否 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `status` | 否 | `string` |  | 可选值：0：1：2 |
| `over_type` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_iteration",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "0",
        "1",
        "2"
      ]
    },
    "over_type": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_iteration_state

中文说明：更新Req 需求管理的迭代state。

原始工具说明：Update CodeArts Req iteration state

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_iteration_state` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `iteration_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `status` | 是 | `string` |  | 可选值：0：1：2 |
| `due_date` | 否 | `string` |  |  |
| `start_date` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_iteration_state",
    "arguments": {
      "project_id": "<project_id>",
      "iteration_id": "<iteration_id>",
      "name": "<name>",
      "status": "0"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "0",
        "1",
        "2"
      ]
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "name",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_plan

中文说明：更新Req 需求管理的计划。

原始工具说明：Update CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_plan` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_plan_image

中文说明：更新Req 需求管理的计划图片。

原始工具说明：Update image for a CodeArts Req plan

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_plan_image` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |
| `img_url` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_plan_image",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>",
      "img_url": "<img_url>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "img_url": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "img_url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project

中文说明：更新Req 需求管理的项目。

原始工具说明：Update CodeArts Req project

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_project` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_member_role

中文说明：更新Req 需求管理的项目成员role。

原始工具说明：Update a CodeArts Req project member role

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_project_member_role` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `user_id` | 是 | `unknown` |  |  |
| `role_id` | 是 | `number` |  | 可选值：-1：3：4：5：6：7：8：9 |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_member_role",
    "arguments": {
      "project_id": "<project_id>",
      "user_id": "<user_id>",
      "role_id": -1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "role_id": {
      "type": "number",
      "enum": [
        -1,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_id",
    "role_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_module

中文说明：更新Req 需求管理的项目module。

原始工具说明：Update CodeArts Req project module

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_project_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `module_id` | 是 | `unknown` |  |  |
| `module_name` | 是 | `string` |  |  |
| `owner_user_id` | 是 | `unknown` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_module",
    "arguments": {
      "project_id": "<project_id>",
      "module_id": "<module_id>",
      "module_name": "<module_name>",
      "owner_user_id": "<owner_user_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id",
    "module_name",
    "owner_user_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_template

中文说明：更新Req 需求管理的项目模板。

原始工具说明：Update a CodeArts Req project template

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_project_template` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_template",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_work_item

中文说明：更新Req 需求管理的工作项。

原始工具说明：Update CodeArts Req work item

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_work_item` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `title` | 否 | `string` |  |  |
| `work_item_type` | 否 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `status_id` | 否 | `integer` |  |  |
| `priority_id` | 否 | `integer` |  |  |
| `iteration_id` | 否 | `unknown` |  |  |
| `module_id` | 否 | `unknown` |  |  |
| `severity_id` | 否 | `integer` |  |  |
| `assigned_id` | 否 | `unknown` |  |  |
| `done_ratio` | 否 | `integer` |  |  |
| `expected_work_hours` | 否 | `integer` |  |  |
| `start_date` | 否 | `integer` |  |  |
| `due_date` | 否 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item_comment

中文说明：更新Req 需求管理的工作项评论。

原始工具说明：Update a CodeArts Req work item comment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_work_item_comment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `comment_id` | 是 | `unknown` |  |  |
| `content` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item_comment",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "comment_id": "<comment_id>",
      "content": "<content>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "comment_id": {
      "$ref": "#/properties/project_id"
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "comment_id",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item_flow

中文说明：更新Req 需求管理的工作项流程。

原始工具说明：Update CodeArts Req work item flow

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_update_work_item_flow` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `status_id` | 是 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item_flow",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "status_id": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "status_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_attachment

中文说明：上传Req 需求管理的附件。

原始工具说明：Upload a CodeArts Req work item attachment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_upload_attachment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `work_item_id` | 是 | `unknown` |  |  |
| `file_path` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_attachment",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_ipd_issue_attachment

中文说明：上传Req 需求管理的ipd问题附件。

原始工具说明：Upload attachment to CodeArts Req IPD issue

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_upload_ipd_issue_attachment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `file_path` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_ipd_issue_attachment",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_ipd_issue_image

中文说明：上传Req 需求管理的ipd问题图片。

原始工具说明：Upload image to CodeArts Req IPD issue description

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_upload_ipd_issue_image` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `issue_id` | 是 | `unknown` |  |  |
| `file_path` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_ipd_issue_image",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_work_item_image

中文说明：上传Req 需求管理的工作项图片。

原始工具说明：Upload an image for CodeArts Req work items

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_upload_work_item_image` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `file_path` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_work_item_image",
    "arguments": {
      "project_id": "<project_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_validate_module_name

中文说明：validateReq 需求管理的modulename。

原始工具说明：Validate whether a CodeArts Req module name already exists

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `req_validate_module_name` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `module_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_validate_module_name",
    "arguments": {
      "project_id": "<project_id>",
      "module_name": "<module_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    }
  },
  "required": [
    "project_id",
    "module_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Repo 代码仓

| API | 中文说明 |
| --- | --- |
| `repo_close_merge_request` | closeRepo 代码仓的mergerequest。 |
| `repo_compare_refs` | compareRepo 代码仓的refs。 |
| `repo_create_merge_request` | 创建Repo 代码仓的mergerequest。 |
| `repo_create_merge_request_discussion` | 创建Repo 代码仓的mergerequestdiscussion。 |
| `repo_create_repository` | 创建Repo 代码仓的仓库。 |
| `repo_create_tag` | 创建Repo 代码仓的tag。 |
| `repo_delete_tag` | 删除Repo 代码仓的tag。 |
| `repo_get_branch` | 获取Repo 代码仓的branch。 |
| `repo_get_commit` | 获取Repo 代码仓的commit。 |
| `repo_get_file` | 获取Repo 代码仓的文件。 |
| `repo_get_merge_request` | 获取Repo 代码仓的mergerequest。 |
| `repo_get_repository` | 获取Repo 代码仓的仓库。 |
| `repo_get_tag` | 获取Repo 代码仓的tag。 |
| `repo_list_branches` | 查询列表Repo 代码仓的branches。 |
| `repo_list_commits` | 查询列表Repo 代码仓的commits。 |
| `repo_list_events` | 查询列表Repo 代码仓的events。 |
| `repo_list_merge_request_changes` | 查询列表Repo 代码仓的mergerequestchanges。 |
| `repo_list_merge_request_discussions` | 查询列表Repo 代码仓的mergerequestdiscussions。 |
| `repo_list_merge_requests` | 查询列表Repo 代码仓的mergerequests。 |
| `repo_list_protected_branches` | 查询列表Repo 代码仓的protectedbranches。 |
| `repo_list_repositories` | 查询列表Repo 代码仓的仓库。 |
| `repo_list_repository_labels` | 查询列表Repo 代码仓的仓库labels。 |
| `repo_list_tags` | 查询列表Repo 代码仓的tags。 |
| `repo_merge_merge_request` | mergeRepo 代码仓的mergerequest。 |
| `repo_review_merge_request` | reviewRepo 代码仓的mergerequest。 |

### repo_close_merge_request

中文说明：closeRepo 代码仓的mergerequest。

原始工具说明：Close CodeArts Repo merge request

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_close_merge_request` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_close_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_compare_refs

中文说明：compareRepo 代码仓的refs。

原始工具说明：Compare CodeArts Repo refs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_compare_refs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `from` | 是 | `string` |  |  |
| `to` | 是 | `string` |  |  |
| `straight` | 否 | `boolean` |  |  |
| `ignore_whitespace_change` | 否 | `boolean` |  |  |
| `view` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_compare_refs",
    "arguments": {
      "repository_id": "<repository_id>",
      "from": "<from>",
      "to": "<to>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "from": {
      "type": "string",
      "minLength": 1
    },
    "to": {
      "type": "string",
      "minLength": 1
    },
    "straight": {
      "type": "boolean"
    },
    "ignore_whitespace_change": {
      "type": "boolean"
    },
    "view": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "from",
    "to"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_merge_request

中文说明：创建Repo 代码仓的mergerequest。

原始工具说明：Create CodeArts Repo merge request

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_create_merge_request` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `source_branch` | 是 | `string` |  |  |
| `target_branch` | 是 | `string` |  |  |
| `title` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "source_branch": "<source_branch>",
      "target_branch": "<target_branch>",
      "title": "<title>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "source_branch",
    "target_branch",
    "title"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_merge_request_discussion

中文说明：创建Repo 代码仓的mergerequestdiscussion。

原始工具说明：Create CodeArts Repo merge request discussion

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_create_merge_request_discussion` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |
| `body` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request_discussion",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "body": "<body>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "body": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "body"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_repository

中文说明：创建Repo 代码仓的仓库。

原始工具说明：Create CodeArts Repo repository

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_create_repository` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `import_members` | 否 | `integer` |  |  |
| `template_id` | 否 | `string` |  |  |
| `visibility_level` | 否 | `number` |  | 可选值：0：20 |
| `import_url` | 否 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `gitignore_id` | 否 | `string` |  |  |
| `license_id` | 否 | `integer` |  |  |
| `enable_readme` | 否 | `anyOf` |  |  |
| `caller` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "pattern": "^[A-Za-z][A-Za-z0-9_-]*$"
    },
    "import_members": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "visibility_level": {
      "type": "number",
      "enum": [
        0,
        20
      ]
    },
    "import_url": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "gitignore_id": {
      "type": "string",
      "minLength": 1
    },
    "license_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "enable_readme": {
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "integer",
          "minimum": 0,
          "maximum": 1
        }
      ]
    },
    "caller": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_uuid",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_tag

中文说明：创建Repo 代码仓的tag。

原始工具说明：Create CodeArts Repo tag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_create_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `tag_name` | 是 | `string` |  |  |
| `ref` | 是 | `string` |  |  |
| `message` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_tag",
    "arguments": {
      "repository_id": "<repository_id>",
      "tag_name": "<tag_name>",
      "ref": "<ref>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    },
    "ref": {
      "type": "string",
      "minLength": 1
    },
    "message": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "tag_name",
    "ref"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_tag

中文说明：删除Repo 代码仓的tag。

原始工具说明：Delete CodeArts Repo tag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_delete_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `tag_name` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_tag",
    "arguments": {
      "repository_id": "<repository_id>",
      "tag_name": "<tag_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "tag_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_branch

中文说明：获取Repo 代码仓的branch。

原始工具说明：Get CodeArts Repo branch detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_branch` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `branch_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_branch",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch_name": "<branch_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "branch_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "branch_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_commit

中文说明：获取Repo 代码仓的commit。

原始工具说明：Get CodeArts Repo commit detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_commit` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `commit_sha` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_commit",
    "arguments": {
      "repository_id": "<repository_id>",
      "commit_sha": "<commit_sha>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "commit_sha": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "commit_sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_file

中文说明：获取Repo 代码仓的文件。

原始工具说明：Get CodeArts Repo file content

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_file` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `file_path` | 是 | `string` |  |  |
| `branch` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "branch": "<branch>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_merge_request

中文说明：获取Repo 代码仓的mergerequest。

原始工具说明：Get CodeArts Repo merge request detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_merge_request` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_repository

中文说明：获取Repo 代码仓的仓库。

原始工具说明：Get CodeArts Repo repository detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_repository` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_tag

中文说明：获取Repo 代码仓的tag。

原始工具说明：Get CodeArts Repo tag detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_get_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `tag_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_tag",
    "arguments": {
      "repository_id": "<repository_id>",
      "tag_name": "<tag_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "tag_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_branches

中文说明：查询列表Repo 代码仓的branches。

原始工具说明：List CodeArts Repo branches

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_branches` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_branches",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_commits

中文说明：查询列表Repo 代码仓的commits。

原始工具说明：List CodeArts Repo commits

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_commits` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |
| `ref_name` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_commits",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ref_name": {
      "type": "string"
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_events

中文说明：查询列表Repo 代码仓的events。

原始工具说明：List CodeArts Repo events

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_events` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_events",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_changes

中文说明：查询列表Repo 代码仓的mergerequestchanges。

原始工具说明：List CodeArts Repo merge request changes

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_merge_request_changes` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_changes",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_discussions

中文说明：查询列表Repo 代码仓的mergerequestdiscussions。

原始工具说明：List CodeArts Repo merge request discussions

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_merge_request_discussions` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_discussions",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_requests

中文说明：查询列表Repo 代码仓的mergerequests。

原始工具说明：List CodeArts Repo merge requests

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_merge_requests` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |
| `state` | 否 | `string` |  | 可选值：all：opened：closed：merged |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_requests",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "state": {
      "type": "string",
      "enum": [
        "all",
        "opened",
        "closed",
        "merged"
      ]
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_protected_branches

中文说明：查询列表Repo 代码仓的protectedbranches。

原始工具说明：List CodeArts Repo protected branches

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_protected_branches` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_protected_branches",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repositories

中文说明：查询列表Repo 代码仓的仓库。

原始工具说明：List CodeArts Repo repositories

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_repositories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repositories",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_labels

中文说明：查询列表Repo 代码仓的仓库labels。

原始工具说明：List CodeArts Repo repository labels

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_repository_labels` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_labels",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_tags

中文说明：查询列表Repo 代码仓的tags。

原始工具说明：List CodeArts Repo tags

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_list_tags` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tags",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_merge_merge_request

中文说明：mergeRepo 代码仓的mergerequest。

原始工具说明：Merge CodeArts Repo merge request

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_merge_merge_request` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |
| `squash` | 否 | `boolean` |  |  |
| `force_merge` | 否 | `boolean` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_merge_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "squash": {
      "type": "boolean"
    },
    "force_merge": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_review_merge_request

中文说明：reviewRepo 代码仓的mergerequest。

原始工具说明：Review CodeArts Repo merge request

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `repo_review_merge_request` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |
| `merge_request_iid` | 是 | `unknown` |  |  |
| `action_type` | 是 | `string` |  | 可选值：approve：reject：reset |
| `approver_comment` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_review_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "action_type": "approve"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "action_type": {
      "type": "string",
      "enum": [
        "approve",
        "reject",
        "reset"
      ]
    },
    "approver_comment": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "action_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Pipeline 流水线

| API | 中文说明 |
| --- | --- |
| `pipeline_approve_run` | approvePipeline 流水线的run。 |
| `pipeline_bind_variable_groups_to_pipeline` | bindPipeline 流水线的变量组to流水线。 |
| `pipeline_create_extension_endpoint` | 创建Pipeline 流水线的extensionendpoint。 |
| `pipeline_create_group` | 创建Pipeline 流水线的组。 |
| `pipeline_create_project_strategy` | 创建Pipeline 流水线的项目strategy。 |
| `pipeline_create_rule` | 创建Pipeline 流水线的rule。 |
| `pipeline_create_strategy` | 创建Pipeline 流水线的strategy。 |
| `pipeline_create_tag` | 创建Pipeline 流水线的tag。 |
| `pipeline_create_variable_group` | 创建Pipeline 流水线的变量组。 |
| `pipeline_delete_extension_endpoint` | 删除Pipeline 流水线的extensionendpoint。 |
| `pipeline_delete_group` | 删除Pipeline 流水线的组。 |
| `pipeline_delete_pipeline` | 删除Pipeline 流水线的流水线。 |
| `pipeline_delete_project_strategy` | 删除Pipeline 流水线的项目strategy。 |
| `pipeline_delete_rule` | 删除Pipeline 流水线的rule。 |
| `pipeline_delete_strategy` | 删除Pipeline 流水线的strategy。 |
| `pipeline_delete_tag` | 删除Pipeline 流水线的tag。 |
| `pipeline_delete_variable_group` | 删除Pipeline 流水线的变量组。 |
| `pipeline_disable_pipeline` | disablePipeline 流水线的流水线。 |
| `pipeline_enable_pipeline` | enablePipeline 流水线的流水线。 |
| `pipeline_get_extension_endpoint` | 获取Pipeline 流水线的extensionendpoint。 |
| `pipeline_get_extension_module` | 获取Pipeline 流水线的extensionmodule。 |
| `pipeline_get_manual_review_context` | 获取Pipeline 流水线的manualreviewcontext。 |
| `pipeline_get_pipeline` | 获取Pipeline 流水线的流水线。 |
| `pipeline_get_plugin_inputs` | 获取Pipeline 流水线的plugininputs。 |
| `pipeline_get_plugin_outputs` | 获取Pipeline 流水线的pluginoutputs。 |
| `pipeline_get_plugin_version` | 获取Pipeline 流水线的plugin版本。 |
| `pipeline_get_project_strategy` | 获取Pipeline 流水线的项目strategy。 |
| `pipeline_get_project_strategy_detail` | 获取Pipeline 流水线的项目strategy详情。 |
| `pipeline_get_project_strategy_related_info` | 获取Pipeline 流水线的项目strategyrelated信息。 |
| `pipeline_get_rule` | 获取Pipeline 流水线的rule。 |
| `pipeline_get_rule_related_info` | 获取Pipeline 流水线的rulerelated信息。 |
| `pipeline_get_run` | 获取Pipeline 流水线的run。 |
| `pipeline_get_run_detail` | 获取Pipeline 流水线的run详情。 |
| `pipeline_get_run_log` | 获取Pipeline 流水线的run日志。 |
| `pipeline_get_run_parameters` | 获取Pipeline 流水线的run参数。 |
| `pipeline_get_step_outputs` | 获取Pipeline 流水线的步骤outputs。 |
| `pipeline_get_strategy` | 获取Pipeline 流水线的strategy。 |
| `pipeline_get_strategy_related_info` | 获取Pipeline 流水线的strategyrelated信息。 |
| `pipeline_get_variable_group` | 获取Pipeline 流水线的变量组。 |
| `pipeline_inherit_project_strategy` | inheritPipeline 流水线的项目strategy。 |
| `pipeline_list_artifacts` | 查询列表Pipeline 流水线的制品。 |
| `pipeline_list_available_publishers` | 查询列表Pipeline 流水线的availablepublishers。 |
| `pipeline_list_base_plugins` | 查询列表Pipeline 流水线的baseplugins。 |
| `pipeline_list_base_plugins_paged` | 查询列表Pipeline 流水线的basepluginspaged。 |
| `pipeline_list_extension_endpoints` | 查询列表Pipeline 流水线的extensionendpoints。 |
| `pipeline_list_extension_modules` | 查询列表Pipeline 流水线的extensionmodules。 |
| `pipeline_list_groups` | 查询列表Pipeline 流水线的组。 |
| `pipeline_list_pipeline_variable_groups` | 查询列表Pipeline 流水线的流水线变量组。 |
| `pipeline_list_pipelines` | 查询列表Pipeline 流水线的流水线。 |
| `pipeline_list_plugin_versions` | 查询列表Pipeline 流水线的plugin版本。 |
| `pipeline_list_plugins` | 查询列表Pipeline 流水线的plugins。 |
| `pipeline_list_project_strategies` | 查询列表Pipeline 流水线的项目strategies。 |
| `pipeline_list_publishers` | 查询列表Pipeline 流水线的publishers。 |
| `pipeline_list_rule_types` | 查询列表Pipeline 流水线的ruletypes。 |
| `pipeline_list_rules` | 查询列表Pipeline 流水线的rules。 |
| `pipeline_list_runs` | 查询列表Pipeline 流水线的runs。 |
| `pipeline_list_stage_plugins` | 查询列表Pipeline 流水线的阶段plugins。 |
| `pipeline_list_strategies` | 查询列表Pipeline 流水线的strategies。 |
| `pipeline_list_strategy_children` | 查询列表Pipeline 流水线的strategychildren。 |
| `pipeline_list_tags` | 查询列表Pipeline 流水线的tags。 |
| `pipeline_list_templates` | 查询列表Pipeline 流水线的templates。 |
| `pipeline_list_variable_groups` | 查询列表Pipeline 流水线的变量组。 |
| `pipeline_move_pipelines_to_group` | 移动Pipeline 流水线的流水线to组。 |
| `pipeline_reject_run` | rejectPipeline 流水线的run。 |
| `pipeline_retry_run` | 重试Pipeline 流水线的run。 |
| `pipeline_run_pipeline` | 运行Pipeline 流水线的流水线。 |
| `pipeline_set_tags_for_pipelines` | setPipeline 流水线的tagsfor流水线。 |
| `pipeline_stop_run` | 停止Pipeline 流水线的run。 |
| `pipeline_switch_project_strategy` | switchPipeline 流水线的项目strategy。 |
| `pipeline_switch_strategy` | switchPipeline 流水线的strategy。 |
| `pipeline_update_extension_endpoint` | 更新Pipeline 流水线的extensionendpoint。 |
| `pipeline_update_group` | 更新Pipeline 流水线的组。 |
| `pipeline_update_project_strategy` | 更新Pipeline 流水线的项目strategy。 |
| `pipeline_update_rule` | 更新Pipeline 流水线的rule。 |
| `pipeline_update_strategy` | 更新Pipeline 流水线的strategy。 |
| `pipeline_update_tag` | 更新Pipeline 流水线的tag。 |
| `pipeline_update_variable_group` | 更新Pipeline 流水线的变量组。 |

### pipeline_approve_run

中文说明：approvePipeline 流水线的run。

原始工具说明：Approve CodeArts Pipeline manual review

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_approve_run` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `job_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_approve_run",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "job_id": "<job_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_bind_variable_groups_to_pipeline

中文说明：bindPipeline 流水线的变量组to流水线。

原始工具说明：Bind CodeArts Pipeline variable groups to pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_bind_variable_groups_to_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `pipeline_group_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_bind_variable_groups_to_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "pipeline_group_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "pipeline_group_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "pipeline_group_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_extension_endpoint

中文说明：创建Pipeline 流水线的extensionendpoint。

原始工具说明：Create CodeArts Pipeline extension endpoint

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_extension_endpoint` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  |  |
| `region_name` | 否 | `string` |  |  |
| `module_id` | 否 | `string` |  |  |
| `name` | 否 | `string` |  |  |
| `url` | 否 | `string` |  |  |
| `authorization` | 否 | `object` |  |  |
| `data` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_extension_endpoint",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "url": {
      "type": "string",
      "minLength": 1
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {}
        },
        "scheme": {
          "type": "string",
          "minLength": 1
        }
      },
      "additionalProperties": false
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_group

中文说明：创建Pipeline 流水线的组。

原始工具说明：Create CodeArts Pipeline group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `parent_id` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_group",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_project_strategy

中文说明：创建Pipeline 流水线的项目strategy。

原始工具说明：Create CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `rules` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "rules": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_rule

中文说明：创建Pipeline 流水线的rule。

原始工具说明：Create CodeArts Pipeline rule

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_rule` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `type` | 是 | `string` |  |  |
| `layout_content` | 是 | `string` |  |  |
| `plugin_id` | 否 | `string` |  |  |
| `plugin_name` | 否 | `string` |  |  |
| `plugin_version` | 否 | `string` |  |  |
| `content` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_rule",
    "arguments": {
      "domain_id": "<domain_id>",
      "name": "<name>",
      "type": "<type>",
      "layout_content": "<layout_content>",
      "content": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "layout_content": {
      "type": "string",
      "minLength": 1
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1
          },
          "can_modify_when_inherit": {
            "type": "boolean"
          },
          "editable": {
            "type": "boolean"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "operator": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1
                },
                "is_valid": {
                  "type": "boolean"
                }
              },
              "required": [
                "key",
                "type",
                "name",
                "value",
                "value_type"
              ],
              "additionalProperties": false
            },
            "minItems": 1
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "name",
    "type",
    "layout_content",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_strategy

中文说明：创建Pipeline 流水线的strategy。

原始工具说明：Create CodeArts Pipeline strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `rules` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_strategy",
    "arguments": {
      "domain_id": "<domain_id>",
      "name": "<name>",
      "rules": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_tag

中文说明：创建Pipeline 流水线的tag。

原始工具说明：Create CodeArts Pipeline tag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `color` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_tag",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "color": "<color>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "color"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_variable_group

中文说明：创建Pipeline 流水线的变量组。

原始工具说明：Create CodeArts Pipeline variable group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_create_variable_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `variables` | 否 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_variable_group",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "sequence": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          },
          "is_secret": {
            "type": "boolean"
          },
          "description": {
            "type": "string"
          }
        },
        "additionalProperties": false
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_extension_endpoint

中文说明：删除Pipeline 流水线的extensionendpoint。

原始工具说明：Delete CodeArts Pipeline extension endpoint

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_extension_endpoint` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  |  |
| `project_id` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_extension_endpoint",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_group

中文说明：删除Pipeline 流水线的组。

原始工具说明：Delete CodeArts Pipeline group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_pipeline

中文说明：删除Pipeline 流水线的流水线。

原始工具说明：Delete CodeArts Pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_project_strategy

中文说明：删除Pipeline 流水线的项目strategy。

原始工具说明：Delete CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_rule

中文说明：删除Pipeline 流水线的rule。

原始工具说明：Delete CodeArts Pipeline rule

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_rule` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_rule",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_id": "<rule_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_strategy

中文说明：删除Pipeline 流水线的strategy。

原始工具说明：Delete CodeArts Pipeline strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_strategy",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_tag

中文说明：删除Pipeline 流水线的tag。

原始工具说明：Delete CodeArts Pipeline tag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tag_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_tag",
    "arguments": {
      "project_id": "<project_id>",
      "tag_id": "<tag_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tag_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_variable_group

中文说明：删除Pipeline 流水线的变量组。

原始工具说明：Delete CodeArts Pipeline variable group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_delete_variable_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_variable_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_disable_pipeline

中文说明：disablePipeline 流水线的流水线。

原始工具说明：Disable CodeArts Pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_disable_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_disable_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_enable_pipeline

中文说明：enablePipeline 流水线的流水线。

原始工具说明：Enable CodeArts Pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_enable_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_enable_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_extension_endpoint

中文说明：获取Pipeline 流水线的extensionendpoint。

原始工具说明：Get CodeArts Pipeline extension endpoint detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_extension_endpoint` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extension_endpoint",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_extension_module

中文说明：获取Pipeline 流水线的extensionmodule。

原始工具说明：Get CodeArts Pipeline extension module detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_extension_module` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `module_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extension_module",
    "arguments": {
      "module_id": "<module_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "module_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_manual_review_context

中文说明：获取Pipeline 流水线的manualreviewcontext。

原始工具说明：Get CodeArts Pipeline manual review context

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_manual_review_context` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_manual_review_context",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipeline

中文说明：获取Pipeline 流水线的流水线。

原始工具说明：Get CodeArts Pipeline detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_inputs

中文说明：获取Pipeline 流水线的plugininputs。

原始工具说明：Get CodeArts Pipeline plugin inputs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_plugin_inputs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `plugin_name` | 是 | `string` |  |  |
| `display_name` | 是 | `string` |  |  |
| `version` | 是 | `string` |  |  |
| `plugin_attribution` | 是 | `string` |  | 可选值：custom：official |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_inputs",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "display_name": "<display_name>",
      "version": "<version>",
      "plugin_attribution": "custom"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "display_name",
    "version",
    "plugin_attribution"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_outputs

中文说明：获取Pipeline 流水线的pluginoutputs。

原始工具说明：Get CodeArts Pipeline plugin outputs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_plugin_outputs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `plugin_name` | 是 | `string` |  |  |
| `display_name` | 是 | `string` |  |  |
| `version` | 是 | `string` |  |  |
| `plugin_attribution` | 是 | `string` |  | 可选值：custom：official |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_outputs",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "display_name": "<display_name>",
      "version": "<version>",
      "plugin_attribution": "custom"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "display_name",
    "version",
    "plugin_attribution"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_version

中文说明：获取Pipeline 流水线的plugin版本。

原始工具说明：Get CodeArts Pipeline plugin version detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_plugin_version` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `plugin_name` | 是 | `string` |  |  |
| `version` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_version",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "version": "<version>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "version"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy

中文说明：获取Pipeline 流水线的项目strategy。

原始工具说明：Get CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy_detail

中文说明：获取Pipeline 流水线的项目strategy详情。

原始工具说明：Get CodeArts Pipeline project strategy detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_project_strategy_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy_detail",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy_related_info

中文说明：获取Pipeline 流水线的项目strategyrelated信息。

原始工具说明：Get CodeArts Pipeline project strategy related info

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_project_strategy_related_info` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy_related_info",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_rule

中文说明：获取Pipeline 流水线的rule。

原始工具说明：Get CodeArts Pipeline rule detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_rule` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_rule",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_id": "<rule_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_rule_related_info

中文说明：获取Pipeline 流水线的rulerelated信息。

原始工具说明：Get CodeArts Pipeline rule related info

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_rule_related_info` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_rule_related_info",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_id": "<rule_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run

中文说明：获取Pipeline 流水线的run。

原始工具说明：Get CodeArts Pipeline run detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_run` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_detail

中文说明：获取Pipeline 流水线的run详情。

原始工具说明：Get CodeArts Pipeline run detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_run_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_detail",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_log

中文说明：获取Pipeline 流水线的run日志。

原始工具说明：Get CodeArts Pipeline run step log

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_run_log` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `job_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_log",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "job_id": "<job_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_parameters

中文说明：获取Pipeline 流水线的run参数。

原始工具说明：Get CodeArts Pipeline run parameters

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_run_parameters` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_parameters",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_step_outputs

中文说明：获取Pipeline 流水线的步骤outputs。

原始工具说明：Get CodeArts Pipeline step outputs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_step_outputs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `step_run_ids` | 是 | `array` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_step_outputs",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "step_run_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "step_run_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "step_run_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_strategy

中文说明：获取Pipeline 流水线的strategy。

原始工具说明：Get CodeArts Pipeline strategy detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `cloud_project_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_strategy",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_strategy_related_info

中文说明：获取Pipeline 流水线的strategyrelated信息。

原始工具说明：Get CodeArts Pipeline strategy related info

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_strategy_related_info` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_strategy_related_info",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_variable_group

中文说明：获取Pipeline 流水线的变量组。

原始工具说明：Get CodeArts Pipeline variable group detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_get_variable_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_variable_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_inherit_project_strategy

中文说明：inheritPipeline 流水线的项目strategy。

原始工具说明：Inherit CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_inherit_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `parent_id` | 是 | `unknown` |  |  |
| `rules` | 否 | `array` |  |  |
| `is_valid` | 是 | `boolean` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_inherit_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "parent_id": "<parent_id>",
      "is_valid": true
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "rules": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "parent_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_artifacts

中文说明：查询列表Pipeline 流水线的制品。

原始工具说明：List CodeArts Pipeline artifacts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_artifacts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_artifacts",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_available_publishers

中文说明：查询列表Pipeline 流水线的availablepublishers。

原始工具说明：List CodeArts Pipeline available publishers

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_available_publishers` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_available_publishers",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_base_plugins

中文说明：查询列表Pipeline 流水线的baseplugins。

原始工具说明：List CodeArts Pipeline base plugins

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_base_plugins` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_base_plugins",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_base_plugins_paged

中文说明：查询列表Pipeline 流水线的basepluginspaged。

原始工具说明：List CodeArts Pipeline base plugins (paged)

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_base_plugins_paged` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_base_plugins_paged",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_extension_endpoints

中文说明：查询列表Pipeline 流水线的extensionendpoints。

原始工具说明：List CodeArts Pipeline extension endpoints

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_extension_endpoints` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `region_name` | 是 | `string` |  |  |
| `module_id` | 否 | `string` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_extension_endpoints",
    "arguments": {
      "project_id": "<project_id>",
      "region_name": "<region_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "project_id",
    "region_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_extension_modules

中文说明：查询列表Pipeline 流水线的extensionmodules。

原始工具说明：List CodeArts Pipeline extension modules

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_extension_modules` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `locations` | 是 | `array` |  |  |
| `project_id` | 否 | `string` |  |  |
| `region_name` | 否 | `string` |  |  |
| `name` | 否 | `string` |  |  |
| `product_line` | 否 | `string` |  |  |
| `tags` | 否 | `array` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_extension_modules",
    "arguments": {
      "locations": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "locations": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "product_line": {
      "type": "string",
      "minLength": 1
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "locations"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_groups

中文说明：查询列表Pipeline 流水线的组。

原始工具说明：List CodeArts Pipeline groups

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_groups` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipeline_variable_groups

中文说明：查询列表Pipeline 流水线的流水线变量组。

原始工具说明：List CodeArts Pipeline variable groups for pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_pipeline_variable_groups` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipeline_variable_groups",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipelines

中文说明：查询列表Pipeline 流水线的流水线。

原始工具说明：List CodeArts Pipelines

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_pipelines` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipelines",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_plugin_versions

中文说明：查询列表Pipeline 流水线的plugin版本。

原始工具说明：List CodeArts Pipeline plugin versions

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_plugin_versions` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `plugin_name` | 是 | `string` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_plugin_versions",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id",
    "plugin_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_plugins

中文说明：查询列表Pipeline 流水线的plugins。

原始工具说明：List CodeArts Pipeline plugins

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_plugins` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |
| `plugin_attribution` | 否 | `string` |  | 可选值：custom：official |
| `business_type` | 否 | `array` |  |  |
| `maintainer` | 否 | `string` |  |  |
| `plugin_name` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_plugins",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    },
    "business_type": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Build",
          "Gate",
          "Deploy",
          "Test",
          "Normal"
        ]
      }
    },
    "maintainer": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_project_strategies

中文说明：查询列表Pipeline 流水线的项目strategies。

原始工具说明：List CodeArts Pipeline project strategies

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_project_strategies` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `offset` | 是 | `integer` |  |  |
| `limit` | 是 | `integer` |  |  |
| `include_tenant_rule_set` | 否 | `boolean` | false |  |
| `name` | 否 | `string` |  |  |
| `is_valid` | 否 | `boolean` |  |  |
| `type` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_project_strategies",
    "arguments": {
      "project_id": "<project_id>",
      "offset": 1,
      "limit": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": false
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "is_valid": {
      "type": "boolean"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_publishers

中文说明：查询列表Pipeline 流水线的publishers。

原始工具说明：List CodeArts Pipeline publishers

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_publishers` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_publishers",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_rule_types

中文说明：查询列表Pipeline 流水线的ruletypes。

原始工具说明：List CodeArts Pipeline rule types

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_rule_types` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `organization_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_rule_types",
    "arguments": {
      "organization_id": "<organization_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "organization_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "organization_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_rules

中文说明：查询列表Pipeline 流水线的rules。

原始工具说明：List CodeArts Pipeline rules

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_rules` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `offset` | 是 | `integer` |  |  |
| `limit` | 是 | `integer` |  |  |
| `cloud_project_id` | 否 | `unknown` |  |  |
| `type` | 否 | `string` |  |  |
| `name` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_rules",
    "arguments": {
      "domain_id": "<domain_id>",
      "offset": 1,
      "limit": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_runs

中文说明：查询列表Pipeline 流水线的runs。

原始工具说明：List CodeArts Pipeline runs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_runs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_runs",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_stage_plugins

中文说明：查询列表Pipeline 流水线的阶段plugins。

原始工具说明：List CodeArts Pipeline stage plugins

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_stage_plugins` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `use_condition` | 是 | `string` |  |  |
| `business_type` | 否 | `array` |  |  |
| `deploy_type` | 否 | `string` |  |  |
| `comp_extend_type` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_stage_plugins",
    "arguments": {
      "domain_id": "<domain_id>",
      "use_condition": "<use_condition>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "use_condition": {
      "type": "string",
      "minLength": 1
    },
    "business_type": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Build",
          "Gate",
          "Deploy",
          "Test",
          "Normal"
        ]
      }
    },
    "deploy_type": {
      "type": "string",
      "minLength": 1
    },
    "comp_extend_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "use_condition"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_strategies

中文说明：查询列表Pipeline 流水线的strategies。

原始工具说明：List CodeArts Pipeline strategies

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_strategies` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `offset` | 是 | `integer` |  |  |
| `limit` | 是 | `integer` |  |  |
| `include_tenant_rule_set` | 否 | `boolean` | true |  |
| `name` | 否 | `string` |  |  |
| `is_valid` | 否 | `boolean` |  |  |
| `type` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_strategies",
    "arguments": {
      "domain_id": "<domain_id>",
      "offset": 1,
      "limit": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": true
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "is_valid": {
      "type": "boolean"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_strategy_children

中文说明：查询列表Pipeline 流水线的strategychildren。

原始工具说明：List CodeArts Pipeline strategy children

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_strategy_children` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `offset` | 否 | `integer` | 0 |  |
| `limit` | 否 | `integer` | 20 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_strategy_children",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_tags

中文说明：查询列表Pipeline 流水线的tags。

原始工具说明：List CodeArts Pipeline tags

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_tags` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `proj_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_tags",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "proj_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_templates

中文说明：查询列表Pipeline 流水线的templates。

原始工具说明：List CodeArts Pipeline templates

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_templates` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `tenant_id` | 是 | `string` |  |  |
| `language` | 否 | `string` |  |  |
| `is_system` | 否 | `boolean` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_templates",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string"
    },
    "is_system": {
      "type": "boolean"
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_variable_groups

中文说明：查询列表Pipeline 流水线的变量组。

原始工具说明：List CodeArts Pipeline variable groups

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_list_variable_groups` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `name` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_variable_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_move_pipelines_to_group

中文说明：移动Pipeline 流水线的流水线to组。

原始工具说明：Move CodeArts Pipelines to group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_move_pipelines_to_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `group_id` | 是 | `unknown` |  |  |
| `pipelines` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_move_pipelines_to_group",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>",
      "pipelines": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "group_id": {
      "$ref": "#/properties/project_id"
    },
    "pipelines": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pipeline_id": {
            "$ref": "#/properties/project_id"
          },
          "pipeline_name": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "pipeline_id",
          "pipeline_name"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "group_id",
    "pipelines"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_reject_run

中文说明：rejectPipeline 流水线的run。

原始工具说明：Reject CodeArts Pipeline manual review

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_reject_run` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `job_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_reject_run",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "job_id": "<job_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_retry_run

中文说明：重试Pipeline 流水线的run。

原始工具说明：Retry CodeArts Pipeline run

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_retry_run` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_retry_run",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_run_pipeline

中文说明：运行Pipeline 流水线的流水线。

原始工具说明：Run CodeArts Pipeline

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_run_pipeline` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_id` | 是 | `unknown` |  |  |
| `branch` | 否 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_run_pipeline",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "branch": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 1024
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_set_tags_for_pipelines

中文说明：setPipeline 流水线的tagsfor流水线。

原始工具说明：Set CodeArts Pipeline tags for pipelines

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_set_tags_for_pipelines` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `pipeline_ids` | 是 | `array` |  |  |
| `tag_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_set_tags_for_pipelines",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_ids": [],
      "tag_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "tag_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_ids",
    "tag_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_stop_run

中文说明：停止Pipeline 流水线的run。

原始工具说明：Stop CodeArts Pipeline run

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_stop_run` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  |  |
| `run_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_stop_run",
    "arguments": {
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "run_id": {
      "$ref": "#/properties/pipeline_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_project_strategy

中文说明：switchPipeline 流水线的项目strategy。

原始工具说明：Switch CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_switch_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `is_valid` | 是 | `boolean` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>",
      "is_valid": true
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_strategy

中文说明：switchPipeline 流水线的strategy。

原始工具说明：Switch CodeArts Pipeline strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_switch_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `is_valid` | 是 | `boolean` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_strategy",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>",
      "is_valid": true
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_extension_endpoint

中文说明：更新Pipeline 流水线的extensionendpoint。

原始工具说明：Update CodeArts Pipeline extension endpoint

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_extension_endpoint` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  |  |
| `project_id` | 否 | `string` |  |  |
| `region_name` | 否 | `string` |  |  |
| `module_id` | 否 | `string` |  |  |
| `name` | 否 | `string` |  |  |
| `url` | 否 | `string` |  |  |
| `authorization` | 否 | `object` |  |  |
| `data` | 否 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_extension_endpoint",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "url": {
      "type": "string",
      "minLength": 1
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {}
        },
        "scheme": {
          "type": "string",
          "minLength": 1
        }
      },
      "additionalProperties": false
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_group

中文说明：更新Pipeline 流水线的组。

原始工具说明：Update CodeArts Pipeline group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_project_strategy

中文说明：更新Pipeline 流水线的项目strategy。

原始工具说明：Update CodeArts Pipeline project strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_project_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `rules` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_project_strategy",
    "arguments": {
      "project_id": "<project_id>",
      "rule_set_id": "<rule_set_id>",
      "name": "<name>",
      "rules": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_rule

中文说明：更新Pipeline 流水线的rule。

原始工具说明：Update CodeArts Pipeline rule

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_rule` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `type` | 是 | `string` |  |  |
| `plugin_id` | 否 | `string` |  |  |
| `plugin_name` | 否 | `string` |  |  |
| `plugin_version` | 否 | `string` |  |  |
| `content` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_rule",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_id": "<rule_id>",
      "name": "<name>",
      "type": "<type>",
      "content": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1
          },
          "can_modify_when_inherit": {
            "type": "boolean"
          },
          "editable": {
            "type": "boolean"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "operator": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1
                },
                "is_valid": {
                  "type": "boolean"
                }
              },
              "required": [
                "key",
                "type",
                "name",
                "value",
                "value_type"
              ],
              "additionalProperties": false
            },
            "minItems": 1
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_id",
    "name",
    "type",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_strategy

中文说明：更新Pipeline 流水线的strategy。

原始工具说明：Update CodeArts Pipeline strategy

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_strategy` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  |  |
| `rule_set_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `rules` | 否 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_strategy",
    "arguments": {
      "domain_id": "<domain_id>",
      "rule_set_id": "<rule_set_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_tag

中文说明：更新Pipeline 流水线的tag。

原始工具说明：Update CodeArts Pipeline tag

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_tag` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `tag_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `color` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_tag",
    "arguments": {
      "project_id": "<project_id>",
      "tag_id": "<tag_id>",
      "name": "<name>",
      "color": "<color>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tag_id",
    "name",
    "color"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_variable_group

中文说明：更新Pipeline 流水线的变量组。

原始工具说明：Update CodeArts Pipeline variable group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `pipeline_update_variable_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` |  |  |
| `variables` | 否 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_variable_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "sequence": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          },
          "is_secret": {
            "type": "boolean"
          },
          "description": {
            "type": "string"
          }
        },
        "additionalProperties": false
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Check 代码检查

| API | 中文说明 |
| --- | --- |
| `check_create_task` | 创建Check 代码检查的任务。 |
| `check_get_metrics` | 获取Check 代码检查的metrics。 |
| `check_get_task` | 获取Check 代码检查的任务。 |
| `check_list_rulesets` | 查询列表Check 代码检查的rulesets。 |
| `check_list_task_issues` | 查询列表Check 代码检查的任务问题。 |
| `check_list_tasks` | 查询列表Check 代码检查的任务。 |
| `check_run_task` | 运行Check 代码检查的任务。 |
| `check_stop_task` | 停止Check 代码检查的任务。 |

### check_create_task

中文说明：创建Check 代码检查的任务。

原始工具说明：Create CodeArts Check task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_create_task` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `task_name` | 是 | `string` |  |  |
| `git_url` | 是 | `string` |  |  |
| `git_branch` | 是 | `string` |  |  |
| `language` | 是 | `string` |  |  |
| `rule_set_id` | 否 | `unknown` |  |  |
| `task_type` | 否 | `string` |  | 可选值：full：incremental |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_create_task",
    "arguments": {
      "project_id": "<project_id>",
      "task_name": "<task_name>",
      "git_url": "<git_url>",
      "git_branch": "<git_branch>",
      "language": "<language>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "git_url": {
      "type": "string",
      "format": "uri"
    },
    "git_branch": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "task_type": {
      "type": "string",
      "enum": [
        "full",
        "incremental"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_name",
    "git_url",
    "git_branch",
    "language"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_metrics

中文说明：获取Check 代码检查的metrics。

原始工具说明：Get CodeArts Check task metrics

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_get_metrics` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  |  |
| `task_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_metrics",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_task

中文说明：获取Check 代码检查的任务。

原始工具说明：Get CodeArts Check task detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_get_task` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_rulesets

中文说明：查询列表Check 代码检查的rulesets。

原始工具说明：List CodeArts Check rulesets

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_list_rulesets` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `language` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_rulesets",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_task_issues

中文说明：查询列表Check 代码检查的任务问题。

原始工具说明：List CodeArts Check task issues

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_list_task_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `task_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_issues",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_tasks

中文说明：查询列表Check 代码检查的任务。

原始工具说明：List CodeArts Check tasks

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_list_tasks` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_tasks",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_run_task

中文说明：运行Check 代码检查的任务。

原始工具说明：Run CodeArts Check task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_run_task` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_run_task",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_stop_task

中文说明：停止Check 代码检查的任务。

原始工具说明：Stop CodeArts Check task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `check_stop_task` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_stop_task",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## TestPlan 测试计划

| API | 中文说明 |
| --- | --- |
| `testplan_get_case` | 获取TestPlan 测试计划的用例。 |
| `testplan_get_plan` | 获取TestPlan 测试计划的计划。 |
| `testplan_list_cases` | 查询列表TestPlan 测试计划的用例。 |
| `testplan_list_issues` | 查询列表TestPlan 测试计划的问题。 |
| `testplan_list_plans` | 查询列表TestPlan 测试计划的计划。 |
| `testplan_list_runs` | 查询列表TestPlan 测试计划的runs。 |
| `testplan_run_cases` | 运行TestPlan 测试计划的用例。 |

### testplan_get_case

中文说明：获取TestPlan 测试计划的用例。

原始工具说明：Get CodeArts TestPlan case detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_get_case` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `case_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_case",
    "arguments": {
      "project_id": "<project_id>",
      "case_id": "<case_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "case_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "case_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_plan

中文说明：获取TestPlan 测试计划的计划。

原始工具说明：Get CodeArts TestPlan plan detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_get_plan` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_cases

中文说明：查询列表TestPlan 测试计划的用例。

原始工具说明：List CodeArts TestPlan cases

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_list_cases` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_cases",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_issues

中文说明：查询列表TestPlan 测试计划的问题。

原始工具说明：List CodeArts TestPlan requirement tree

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_list_issues` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_issues",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_plans

中文说明：查询列表TestPlan 测试计划的计划。

原始工具说明：List CodeArts TestPlan plans

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_list_plans` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_plans",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_runs

中文说明：查询列表TestPlan 测试计划的runs。

原始工具说明：List CodeArts TestPlan runs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_list_runs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `plan_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_runs",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_run_cases

中文说明：运行TestPlan 测试计划的用例。

原始工具说明：Run CodeArts TestPlan cases

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `testplan_run_cases` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `execute_list` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_run_cases",
    "arguments": {
      "project_id": "<project_id>",
      "execute_list": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "execute_list": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "case_id": {
            "$ref": "#/properties/project_id"
          }
        },
        "required": [
          "case_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "execute_list"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Deploy 部署

| API | 中文说明 |
| --- | --- |
| `deploy_add_v4_environment_hosts` | 新增Deploy 部署的v4环境主机。 |
| `deploy_cancel_v4_deploy_record` | 取消Deploy 部署的v4部署记录。 |
| `deploy_create_application` | 创建Deploy 部署的应用。 |
| `deploy_create_environment` | 创建Deploy 部署的环境。 |
| `deploy_create_task_by_template` | 创建Deploy 部署的任务by模板。 |
| `deploy_delete_v4_cluster_hosts` | 删除Deploy 部署的v4集群主机。 |
| `deploy_delete_v4_environment_hosts` | 删除Deploy 部署的v4环境主机。 |
| `deploy_get_app` | 获取Deploy 部署的应用。 |
| `deploy_get_app_log` | 获取Deploy 部署的应用日志。 |
| `deploy_get_deploy_source_detail` | 获取Deploy 部署的部署来源详情。 |
| `deploy_get_execution_params` | 获取Deploy 部署的执行params。 |
| `deploy_get_history_detail` | 获取Deploy 部署的历史记录详情。 |
| `deploy_get_host_group` | 获取Deploy 部署的主机组。 |
| `deploy_get_last_record_detail` | 获取Deploy 部署的last记录详情。 |
| `deploy_get_runtime_variables` | 获取Deploy 部署的运行时变量。 |
| `deploy_get_status` | 获取Deploy 部署的状态。 |
| `deploy_get_task` | 获取Deploy 部署的任务。 |
| `deploy_get_template_detail` | 获取Deploy 部署的模板详情。 |
| `deploy_get_v4_cluster` | 获取Deploy 部署的v4集群。 |
| `deploy_get_v4_cluster_count` | 获取Deploy 部署的v4集群数量。 |
| `deploy_get_v4_cluster_host` | 获取Deploy 部署的v4集群主机。 |
| `deploy_get_v4_deploy_record` | 获取Deploy 部署的v4部署记录。 |
| `deploy_get_v4_deploy_record_step_detail` | 获取Deploy 部署的v4部署记录步骤详情。 |
| `deploy_get_v4_deploy_record_step_logs` | 获取Deploy 部署的v4部署记录步骤日志。 |
| `deploy_get_v4_environment` | 获取Deploy 部署的v4环境。 |
| `deploy_get_v4_environment_resource_detail` | 获取Deploy 部署的v4环境资源详情。 |
| `deploy_import_hosts_to_environment` | 导入Deploy 部署的主机to环境。 |
| `deploy_list_app_host_groups` | 查询列表Deploy 部署的应用主机组。 |
| `deploy_list_app_operations_log` | 查询列表Deploy 部署的应用操作日志。 |
| `deploy_list_apps` | 查询列表Deploy 部署的apps。 |
| `deploy_list_deployment_units` | 查询列表Deploy 部署的部署单元。 |
| `deploy_list_environment_hosts` | 查询列表Deploy 部署的环境主机。 |
| `deploy_list_environments` | 查询列表Deploy 部署的环境。 |
| `deploy_list_histories` | 查询列表Deploy 部署的历史记录。 |
| `deploy_list_host_group_environments` | 查询列表Deploy 部署的主机组环境。 |
| `deploy_list_host_group_hosts` | 查询列表Deploy 部署的主机组主机。 |
| `deploy_list_host_groups` | 查询列表Deploy 部署的主机组。 |
| `deploy_list_system_configs` | 查询列表Deploy 部署的系统配置。 |
| `deploy_list_tasks` | 查询列表Deploy 部署的任务。 |
| `deploy_list_v4_applications` | 查询列表Deploy 部署的v4应用。 |
| `deploy_list_v4_cluster_hosts` | 查询列表Deploy 部署的v4集群主机。 |
| `deploy_list_v4_clusters` | 查询列表Deploy 部署的v4clusters。 |
| `deploy_list_v4_deploy_records` | 查询列表Deploy 部署的v4部署记录。 |
| `deploy_list_v4_environment_applications` | 查询列表Deploy 部署的v4环境应用。 |
| `deploy_list_v4_environment_hosts` | 查询列表Deploy 部署的v4环境主机。 |
| `deploy_list_v4_environments` | 查询列表Deploy 部署的v4环境。 |
| `deploy_list_v4_orchestrations` | 查询列表Deploy 部署的v4编排。 |
| `deploy_list_variable_history` | 查询列表Deploy 部署的变量历史记录。 |
| `deploy_list_variables` | 查询列表Deploy 部署的变量。 |
| `deploy_modify_application` | 修改Deploy 部署的应用。 |
| `deploy_pass_v4_manual_check` | 通过Deploy 部署的v4manualcheck。 |
| `deploy_query_variables` | 查询Deploy 部署的变量。 |
| `deploy_refuse_v4_manual_check` | 拒绝Deploy 部署的v4manualcheck。 |
| `deploy_rerun_v4_deploy_record` | 重新运行Deploy 部署的v4部署记录。 |
| `deploy_retry_v4_deploy_record` | 重试Deploy 部署的v4部署记录。 |
| `deploy_rollback_app` | 回滚Deploy 部署的应用。 |
| `deploy_rollback_v4_deploy_record` | 回滚Deploy 部署的v4部署记录。 |
| `deploy_start_app` | 启动Deploy 部署的应用。 |
| `deploy_stop_app` | 停止Deploy 部署的应用。 |

### deploy_add_v4_environment_hosts

中文说明：新增Deploy 部署的v4环境主机。

原始工具说明：Add hosts into a CodeArts Deploy v4 environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_add_v4_environment_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |
| `cluster_id` | 是 | `unknown` |  |  |
| `host_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_add_v4_environment_hosts",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>",
      "cluster_id": "<cluster_id>",
      "host_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "environment_id",
    "cluster_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_cancel_v4_deploy_record

中文说明：取消Deploy 部署的v4部署记录。

原始工具说明：Cancel CodeArts Deploy v4 deploy record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_cancel_v4_deploy_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_cancel_v4_deploy_record",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_application

中文说明：创建Deploy 部署的应用。

原始工具说明：Create CodeArts Deploy application

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_create_application` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` | "" |  |
| `timeout` | 否 | `number \| null` |  |  |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} |  |
| `slave_cluster_id` | 否 | `string` | "" |  |
| `slave_resource_type` | 否 | `string` | "" |  |
| `create_type` | 否 | `string` | "template" |  |
| `is_draft` | 否 | `boolean` | false |  |
| `group_id` | 否 | `string` |  |  |
| `agency_urn` | 否 | `string` |  |  |
| `arrange_infos` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_application",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "arrange_infos": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "default": ""
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0"
        },
        "artifact_source_system": {
          "type": "string",
          "default": ""
        },
        "artifact_type": {
          "type": "string",
          "default": ""
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      }
    },
    "slave_cluster_id": {
      "type": "string",
      "default": ""
    },
    "slave_resource_type": {
      "type": "string",
      "default": ""
    },
    "create_type": {
      "type": "string",
      "default": "template"
    },
    "is_draft": {
      "type": "boolean",
      "default": false
    },
    "group_id": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "template_id": {
            "$ref": "#/properties/project_id"
          },
          "operation_list": {
            "type": "array",
            "items": {},
            "default": []
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "arrange_infos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_environment

中文说明：创建Deploy 部署的环境。

原始工具说明：Create CodeArts Deploy environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_create_environment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `os` | 否 | `string` | "linux" |  |
| `deploy_type` | 否 | `integer` | 0 |  |
| `description` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_environment",
    "arguments": {
      "application_id": "<application_id>",
      "project_id": "<project_id>",
      "name": "<name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "os": {
      "type": "string",
      "minLength": 1,
      "default": "linux"
    },
    "deploy_type": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "application_id",
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_task_by_template

中文说明：创建Deploy 部署的任务by模板。

原始工具说明：Create CodeArts Deploy task from template

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_create_task_by_template` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `project_name` | 是 | `string` |  |  |
| `template_id` | 是 | `unknown` |  |  |
| `task_name` | 是 | `string` |  |  |
| `configs` | 否 | `array` | [] |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_task_by_template",
    "arguments": {
      "project_id": "<project_id>",
      "project_name": "<project_name>",
      "template_id": "<template_id>",
      "task_name": "<task_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "project_name": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/project_id"
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "configs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "description": {
            "type": "string"
          },
          "value": {
            "type": "string"
          },
          "static_status": {
            "type": "integer"
          },
          "limits": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                }
              },
              "required": [
                "name"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": []
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "project_name",
    "template_id",
    "task_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_delete_v4_cluster_hosts

中文说明：删除Deploy 部署的v4集群主机。

原始工具说明：Delete hosts from a CodeArts Deploy v4 cluster

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_delete_v4_cluster_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_id` | 是 | `unknown` |  |  |
| `host_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_v4_cluster_hosts",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_id": "<cluster_id>",
      "host_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_delete_v4_environment_hosts

中文说明：删除Deploy 部署的v4环境主机。

原始工具说明：Delete hosts from a CodeArts Deploy v4 environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_delete_v4_environment_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |
| `host_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_v4_environment_hosts",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>",
      "host_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "environment_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_app

中文说明：获取Deploy 部署的应用。

原始工具说明：Get CodeArts Deploy application detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_app` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_app",
    "arguments": {
      "application_id": "<application_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "application_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_app_log

中文说明：获取Deploy 部署的应用日志。

原始工具说明：Get CodeArts Deploy application log

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_app_log` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `step_id` | 否 | `unknown` |  |  |
| `offset` | 否 | `string` | "0" |  |
| `end_offset` | 否 | `string` | "0" |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_app_log",
    "arguments": {
      "application_id": "<application_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/application_id"
    },
    "step_id": {
      "$ref": "#/properties/application_id"
    },
    "offset": {
      "type": "string",
      "default": "0"
    },
    "end_offset": {
      "type": "string",
      "default": "0"
    }
  },
  "required": [
    "application_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_deploy_source_detail

中文说明：获取Deploy 部署的部署来源详情。

原始工具说明：Get CodeArts Deploy task source detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_deploy_source_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_deploy_source_detail",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_execution_params

中文说明：获取Deploy 部署的执行params。

原始工具说明：Get CodeArts Deploy execution params

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_execution_params` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_execution_params",
    "arguments": {
      "task_id": "<task_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_history_detail

中文说明：获取Deploy 部署的历史记录详情。

原始工具说明：Get CodeArts Deploy history detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_history_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_history_detail",
    "arguments": {
      "task_id": "<task_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_host_group

中文说明：获取Deploy 部署的主机组。

原始工具说明：Get CodeArts Deploy host group detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_host_group` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_last_record_detail

中文说明：获取Deploy 部署的last记录详情。

原始工具说明：Get CodeArts Deploy v4 orchestration last record detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_last_record_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `orchestration_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_last_record_detail",
    "arguments": {
      "project_id": "<project_id>",
      "orchestration_id": "<orchestration_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "orchestration_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "orchestration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_runtime_variables

中文说明：获取Deploy 部署的运行时变量。

原始工具说明：Get CodeArts Deploy runtime variables

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_runtime_variables` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `app_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_runtime_variables",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_status

中文说明：获取Deploy 部署的状态。

原始工具说明：Get CodeArts Deploy task status

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_status` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `record_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_status",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_task

中文说明：获取Deploy 部署的任务。

原始工具说明：Get CodeArts Deploy task detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_task` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_task",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_template_detail

中文说明：获取Deploy 部署的模板详情。

原始工具说明：Get CodeArts Deploy template detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_template_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  |  |
| `task_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_template_detail",
    "arguments": {
      "template_id": "<template_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/template_id"
    }
  },
  "required": [
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster

中文说明：获取Deploy 部署的v4集群。

原始工具说明：Get CodeArts Deploy v4 cluster detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_cluster` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_id` | 是 | `unknown` |  |  |
| `cluster_type` | 是 | `string` |  | 可选值：host：container |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_id": "<cluster_id>",
      "cluster_type": "host"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster_count

中文说明：获取Deploy 部署的v4集群数量。

原始工具说明：Get CodeArts Deploy v4 cluster counts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_cluster_count` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_type` | 是 | `string` |  | 可选值：host：container |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster_count",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_type": "host"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    }
  },
  "required": [
    "project_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster_host

中文说明：获取Deploy 部署的v4集群主机。

原始工具说明：Get CodeArts Deploy v4 cluster host detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_cluster_host` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_id` | 是 | `unknown` |  |  |
| `host_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster_host",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_id": "<cluster_id>",
      "host_id": "<host_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "host_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record

中文说明：获取Deploy 部署的v4部署记录。

原始工具说明：Get CodeArts Deploy v4 deploy record detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_deploy_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `step_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record_step_detail

中文说明：获取Deploy 部署的v4部署记录步骤详情。

原始工具说明：Get CodeArts Deploy v4 deploy record step detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_deploy_record_step_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record_step_detail",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record_step_logs

中文说明：获取Deploy 部署的v4部署记录步骤日志。

原始工具说明：Get CodeArts Deploy v4 deploy record step logs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_deploy_record_step_logs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record_step_logs",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_environment

中文说明：获取Deploy 部署的v4环境。

原始工具说明：Get CodeArts Deploy v4 environment detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_environment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_environment",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_environment_resource_detail

中文说明：获取Deploy 部署的v4环境资源详情。

原始工具说明：Get CodeArts Deploy v4 environment resource detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_get_v4_environment_resource_detail` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_environment_resource_detail",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_import_hosts_to_environment

中文说明：导入Deploy 部署的主机to环境。

原始工具说明：Import hosts into a CodeArts Deploy environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_import_hosts_to_environment` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |
| `group_id` | 是 | `unknown` |  |  |
| `host_ids` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_import_hosts_to_environment",
    "arguments": {
      "application_id": "<application_id>",
      "environment_id": "<environment_id>",
      "group_id": "<group_id>",
      "host_ids": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/application_id"
    },
    "group_id": {
      "$ref": "#/properties/application_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/application_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "application_id",
    "environment_id",
    "group_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_app_host_groups

中文说明：查询列表Deploy 部署的应用主机组。

原始工具说明：List CodeArts Deploy host groups available to an application

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_app_host_groups` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `application_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_app_host_groups",
    "arguments": {
      "application_id": "<application_id>",
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    }
  },
  "required": [
    "application_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_app_operations_log

中文说明：查询列表Deploy 部署的应用操作日志。

原始工具说明：List CodeArts Deploy application operation logs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_app_operations_log` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `app_id` | 是 | `string` |  |  |
| `page_size` | 否 | `integer` | 20 |  |
| `page_index` | 否 | `integer` | 1 |  |
| `start_date` | 否 | `string` |  |  |
| `end_date` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_app_operations_log",
    "arguments": {
      "app_id": "<app_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "app_id": {
      "type": "string",
      "minLength": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "page_index": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "start_date": {
      "type": "string"
    },
    "end_date": {
      "type": "string"
    }
  },
  "required": [
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_apps

中文说明：查询列表Deploy 部署的apps。

原始工具说明：List CodeArts Deploy applications

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_apps` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_apps",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_deployment_units

中文说明：查询列表Deploy 部署的部署单元。

原始工具说明：List CodeArts Deploy deployment units for an application

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_deployment_units` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `app_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_deployment_units",
    "arguments": {
      "project_id": "<project_id>",
      "app_id": "<app_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_environment_hosts

中文说明：查询列表Deploy 部署的环境主机。

原始工具说明：List CodeArts Deploy hosts in an environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_environment_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `application_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_environment_hosts",
    "arguments": {
      "application_id": "<application_id>",
      "environment_id": "<environment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/application_id"
    }
  },
  "required": [
    "application_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_environments

中文说明：查询列表Deploy 部署的环境。

原始工具说明：List CodeArts Deploy application environments

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_environments` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `application_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_environments",
    "arguments": {
      "application_id": "<application_id>",
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    }
  },
  "required": [
    "application_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_histories

中文说明：查询列表Deploy 部署的历史记录。

原始工具说明：List CodeArts Deploy histories

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_histories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `task_id` | 是 | `unknown` |  |  |
| `start_date` | 否 | `string` |  |  |
| `end_date` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_histories",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    },
    "start_date": {
      "type": "string"
    },
    "end_date": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_group_environments

中文说明：查询列表Deploy 部署的主机组环境。

原始工具说明：List CodeArts Deploy environments linked to a host group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_host_group_environments` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `group_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_group_environments",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_group_hosts

中文说明：查询列表Deploy 部署的主机组主机。

原始工具说明：List CodeArts Deploy hosts in a host group

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_host_group_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `group_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_group_hosts",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_groups

中文说明：查询列表Deploy 部署的主机组。

原始工具说明：List CodeArts Deploy host groups

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_host_groups` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_system_configs

中文说明：查询列表Deploy 部署的系统配置。

原始工具说明：List CodeArts Deploy system config keys

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_system_configs` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_system_configs",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_tasks

中文说明：查询列表Deploy 部署的任务。

原始工具说明：List CodeArts Deploy tasks

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_tasks` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_tasks",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_applications

中文说明：查询列表Deploy 部署的v4应用。

原始工具说明：List CodeArts Deploy v4 applications

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_applications` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `limit` | 否 | `integer` | 20 |  |
| `offset` | 否 | `integer` | 0 |  |
| `keyword` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_applications",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "keyword": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_cluster_hosts

中文说明：查询列表Deploy 部署的v4集群主机。

原始工具说明：List CodeArts Deploy v4 cluster hosts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_cluster_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_cluster_hosts",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_id": "<cluster_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "project_id",
    "cluster_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_clusters

中文说明：查询列表Deploy 部署的v4clusters。

原始工具说明：List CodeArts Deploy v4 clusters

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_clusters` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `cluster_type` | 是 | `string` |  | 可选值：host：container |
| `body` | 否 | `object` | {} |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_clusters",
    "arguments": {
      "project_id": "<project_id>",
      "cluster_type": "host"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "project_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_deploy_records

中文说明：查询列表Deploy 部署的v4部署记录。

原始工具说明：List CodeArts Deploy v4 deploy records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_deploy_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `limit` | 否 | `integer` | 20 |  |
| `offset` | 否 | `integer` | 0 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_deploy_records",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environment_applications

中文说明：查询列表Deploy 部署的v4环境应用。

原始工具说明：List CodeArts Deploy v4 applications under an environment

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_environment_applications` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |
| `limit` | 否 | `integer` | 20 |  |
| `offset` | 否 | `integer` | 0 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environment_applications",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environment_hosts

中文说明：查询列表Deploy 部署的v4环境主机。

原始工具说明：List CodeArts Deploy v4 environment hosts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_environment_hosts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `environment_id` | 是 | `unknown` |  |  |
| `query` | 否 | `object` | {} |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environment_hosts",
    "arguments": {
      "project_id": "<project_id>",
      "environment_id": "<environment_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "query": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      },
      "default": {}
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environments

中文说明：查询列表Deploy 部署的v4环境。

原始工具说明：List CodeArts Deploy v4 environments

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_environments` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `limit` | 否 | `integer` | 20 |  |
| `offset` | 否 | `integer` | 0 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environments",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_orchestrations

中文说明：查询列表Deploy 部署的v4编排。

原始工具说明：List CodeArts Deploy v4 orchestrations

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_v4_orchestrations` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `app_id` | 是 | `unknown` |  |  |
| `limit` | 否 | `integer` | 20 |  |
| `offset` | 否 | `integer` | 0 |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_orchestrations",
    "arguments": {
      "project_id": "<project_id>",
      "app_id": "<app_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id",
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_variable_history

中文说明：查询列表Deploy 部署的变量历史记录。

原始工具说明：List CodeArts Deploy variable history by scope

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_variable_history` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_variable_history",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_list_variables

中文说明：查询列表Deploy 部署的变量。

原始工具说明：List CodeArts Deploy variables by scope

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_list_variables` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_variables",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_modify_application

中文说明：修改Deploy 部署的应用。

原始工具说明：Modify CodeArts Deploy application

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_modify_application` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `name` | 是 | `string` |  |  |
| `description` | 否 | `string` | "" |  |
| `timeout` | 否 | `number \| null` |  |  |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} |  |
| `slave_cluster_id` | 否 | `string` | "" |  |
| `slave_resource_type` | 否 | `string` | "" |  |
| `create_type` | 否 | `string` | "template" |  |
| `is_draft` | 否 | `boolean` | false |  |
| `group_id` | 否 | `string` |  |  |
| `agency_urn` | 否 | `string` |  |  |
| `arrange_infos` | 是 | `array` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_modify_application",
    "arguments": {
      "id": "<id>",
      "project_id": "<project_id>",
      "name": "<name>",
      "arrange_infos": []
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "default": ""
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0"
        },
        "artifact_source_system": {
          "type": "string",
          "default": ""
        },
        "artifact_type": {
          "type": "string",
          "default": ""
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      }
    },
    "slave_cluster_id": {
      "type": "string",
      "default": ""
    },
    "slave_resource_type": {
      "type": "string",
      "default": ""
    },
    "create_type": {
      "type": "string",
      "default": "template"
    },
    "is_draft": {
      "type": "boolean",
      "default": false
    },
    "group_id": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/id"
          },
          "deploy_system": {
            "type": "string"
          },
          "template_id": {
            "$ref": "#/properties/id"
          },
          "operation_list": {
            "type": "array",
            "items": {},
            "default": []
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "id",
    "project_id",
    "name",
    "arrange_infos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_pass_v4_manual_check

中文说明：通过Deploy 部署的v4manualcheck。

原始工具说明：Pass CodeArts Deploy v4 manual check step

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_pass_v4_manual_check` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_pass_v4_manual_check",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_query_variables

中文说明：查询Deploy 部署的变量。

原始工具说明：Query CodeArts Deploy variables by scope

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_query_variables` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_query_variables",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_refuse_v4_manual_check

中文说明：拒绝Deploy 部署的v4manualcheck。

原始工具说明：Refuse CodeArts Deploy v4 manual check step

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_refuse_v4_manual_check` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `step_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_refuse_v4_manual_check",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rerun_v4_deploy_record

中文说明：重新运行Deploy 部署的v4部署记录。

原始工具说明：Rerun CodeArts Deploy v4 deploy record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_rerun_v4_deploy_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rerun_v4_deploy_record",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_retry_v4_deploy_record

中文说明：重试Deploy 部署的v4部署记录。

原始工具说明：Retry CodeArts Deploy v4 deploy record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_retry_v4_deploy_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_retry_v4_deploy_record",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rollback_app

中文说明：回滚Deploy 部署的应用。

原始工具说明：Rollback CodeArts Deploy task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_rollback_app` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rollback_app",
    "arguments": {
      "task_id": "<task_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rollback_v4_deploy_record

中文说明：回滚Deploy 部署的v4部署记录。

原始工具说明：Rollback CodeArts Deploy v4 deploy record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_rollback_v4_deploy_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `body` | 否 | `object` | {} |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rollback_v4_deploy_record",
    "arguments": {
      "project_id": "<project_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_start_app

中文说明：启动Deploy 部署的应用。

原始工具说明：Start CodeArts Deploy task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_start_app` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `trigger_source` | 否 | `number \| string` |  | 可选值：0：1：0：1 |
| `params` | 否 | `array` | [] |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_start_app",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "trigger_source": {
      "type": [
        "number",
        "string"
      ],
      "enum": [
        0,
        1,
        "0",
        "1"
      ]
    },
    "params": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": []
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_stop_app

中文说明：停止Deploy 部署的应用。

原始工具说明：Stop CodeArts Deploy task

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `deploy_stop_app` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  |  |
| `record_id` | 是 | `unknown` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_stop_app",
    "arguments": {
      "task_id": "<task_id>",
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Build 构建

| API | 中文说明 |
| --- | --- |
| `build_append_job_step` | 追加Build 构建的任务步骤。 |
| `build_append_release_upload_step` | 追加Build 构建的发布上传步骤。 |
| `build_configure_release_upload_step` | 配置Build 构建的发布上传步骤。 |
| `build_get_error_log` | 获取Build 构建的错误日志。 |
| `build_get_full_stages` | 获取Build 构建的完整阶段。 |
| `build_get_history_details` | 获取Build 构建的历史记录详情。 |
| `build_get_info_record` | 获取Build 构建的信息记录。 |
| `build_get_job` | 获取Build 构建的任务。 |
| `build_get_project_record_statistics` | 获取Build 构建的项目记录统计。 |
| `build_get_real_time_log` | 获取Build 构建的实时time日志。 |
| `build_get_record` | 获取Build 构建的记录。 |
| `build_get_record_flow_graph` | 获取Build 构建的记录流程图。 |
| `build_get_record_script` | 获取Build 构建的记录脚本。 |
| `build_list_build_parameters` | 查询列表Build 构建的构建参数。 |
| `build_list_jobs` | 查询列表Build 构建的任务。 |
| `build_list_project_records` | 查询列表Build 构建的项目记录。 |
| `build_list_records` | 查询列表Build 构建的记录。 |
| `build_prepare_deployable_node_app` | 准备Build 构建的deployable节点应用。 |
| `build_prepare_node_runtime_bundle` | 准备Build 构建的节点运行时bundle。 |
| `build_run_job` | 运行Build 构建的任务。 |
| `build_stop_job` | 停止Build 构建的任务。 |
| `build_update_job_step` | 更新Build 构建的任务步骤。 |

### build_append_job_step

中文说明：追加Build 构建的任务步骤。

原始工具说明：Append a new step to a CodeArts Build job

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_append_job_step` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `step_name` | 是 | `string` |  |  |
| `module_id` | 是 | `string` |  |  |
| `enable` | 否 | `boolean` | true |  |
| `version` | 否 | `string` |  |  |
| `image` | 否 | `string` |  |  |
| `command` | 否 | `string` |  |  |
| `pre_condition` | 否 | `string` |  |  |
| `properties` | 否 | `object` |  |  |
| `insert_after_step_name` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_append_job_step",
    "arguments": {
      "job_id": "<job_id>",
      "step_name": "<step_name>",
      "module_id": "<module_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "enable": {
      "type": "boolean",
      "default": true
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "image": {
      "type": "string",
      "minLength": 1
    },
    "command": {
      "type": "string",
      "minLength": 1
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1
    },
    "properties": {
      "type": "object",
      "additionalProperties": {}
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "step_name",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_append_release_upload_step

中文说明：追加Build 构建的发布上传步骤。

原始工具说明：Append the official release repository upload step to a CodeArts Build job

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_append_release_upload_step` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `path` | 是 | `string` |  |  |
| `package_name` | 否 | `string` |  |  |
| `package_version` | 否 | `string` |  |  |
| `custom_upload_path` | 否 | `string` |  |  |
| `upload_tool` | 否 | `string` | "curl" |  |
| `continue_on_failure` | 否 | `boolean` | false |  |
| `step_name` | 否 | `string` | "Upload package to release repository" |  |
| `pre_condition` | 否 | `string` | "SUCCESS" |  |
| `insert_after_step_name` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_append_release_upload_step",
    "arguments": {
      "job_id": "<job_id>",
      "path": "<path>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "package_name": {
      "type": "string",
      "minLength": 1
    },
    "package_version": {
      "type": "string",
      "minLength": 1
    },
    "custom_upload_path": {
      "type": "string",
      "minLength": 1
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl"
    },
    "continue_on_failure": {
      "type": "boolean",
      "default": false
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1,
      "default": "SUCCESS"
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_configure_release_upload_step

中文说明：配置Build 构建的发布上传步骤。

原始工具说明：Configure an existing release repository upload step in a CodeArts Build job

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_configure_release_upload_step` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `step_name` | 否 | `string` | "Upload package to release repository" |  |
| `file` | 是 | `string` |  |  |
| `package_name` | 否 | `string` |  |  |
| `build_version` | 否 | `string` |  |  |
| `custom_upload_path` | 否 | `string` |  |  |
| `upload_tool` | 否 | `string` | "curl" |  |
| `remain_origin_path` | 否 | `string` | "FLAT" |  |
| `pre_condition` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_configure_release_upload_step",
    "arguments": {
      "job_id": "<job_id>",
      "file": "<file>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository"
    },
    "file": {
      "type": "string",
      "minLength": 1
    },
    "package_name": {
      "type": "string",
      "minLength": 1
    },
    "build_version": {
      "type": "string",
      "minLength": 1
    },
    "custom_upload_path": {
      "type": "string"
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl"
    },
    "remain_origin_path": {
      "type": "string",
      "minLength": 1,
      "default": "FLAT"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "file"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_error_log

中文说明：获取Build 构建的错误日志。

原始工具说明：Get CodeArts Build error log analysis

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_error_log` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `job_id` | 是 | `string` |  |  |
| `build_no` | 是 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_error_log",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_full_stages

中文说明：获取Build 构建的完整阶段。

原始工具说明：Get CodeArts Build full stages

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_full_stages` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  |  |
| `cascade` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_full_stages",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    },
    "cascade": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_history_details

中文说明：获取Build 构建的历史记录详情。

原始工具说明：Get CodeArts Build history details

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_history_details` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `build_number` | 是 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_history_details",
    "arguments": {
      "job_id": "<job_id>",
      "build_number": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_number": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_number"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_info_record

中文说明：获取Build 构建的信息记录。

原始工具说明：Get CodeArts Build info record

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_info_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `build_no` | 是 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_info_record",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job

中文说明：获取Build 构建的任务。

原始工具说明：Get CodeArts Build job detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_job` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_project_record_statistics

中文说明：获取Build 构建的项目记录统计。

原始工具说明：Get CodeArts Build project record statistics

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_project_record_statistics` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  |  |
| `build_project_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_project_record_statistics",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "build_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_real_time_log

中文说明：获取Build 构建的实时time日志。

原始工具说明：Get CodeArts Build real-time log

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_real_time_log` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `build_no` | 是 | `integer` |  |  |
| `offset` | 是 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_real_time_log",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": 1,
      "offset": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no",
    "offset"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record

中文说明：获取Build 构建的记录。

原始工具说明：Get CodeArts Build record detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_record` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record_flow_graph

中文说明：获取Build 构建的记录流程图。

原始工具说明：Get CodeArts Build record flow graph

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_record_flow_graph` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_flow_graph",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record_script

中文说明：获取Build 构建的记录脚本。

原始工具说明：Get CodeArts Build record script

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_get_record_script` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_script",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_build_parameters

中文说明：查询列表Build 构建的构建参数。

原始工具说明：List CodeArts Build parameters

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_list_build_parameters` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `build_no` | 是 | `integer` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_build_parameters",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_jobs

中文说明：查询列表Build 构建的任务。

原始工具说明：List CodeArts Build jobs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_list_jobs` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_jobs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_project_records

中文说明：查询列表Build 构建的项目记录。

原始工具说明：List CodeArts Build project records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_list_project_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `build_project_id` | 否 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_project_records",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "build_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_records

中文说明：查询列表Build 构建的记录。

原始工具说明：List CodeArts Build records

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_list_records` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `job_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_records",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "job_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_prepare_deployable_node_app

中文说明：准备Build 构建的deployable节点应用。

原始工具说明：Prepare a single-file deployable Node app by appending bundling commands to a build step

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_prepare_deployable_node_app` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_prepare_deployable_node_app",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### build_prepare_node_runtime_bundle

中文说明：准备Build 构建的节点运行时bundle。

原始工具说明：Prepare a Node runtime bundle by appending packaging commands to a build step

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_prepare_node_runtime_bundle` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `step_name` | 否 | `string` |  |  |
| `output_file` | 否 | `string` | "codearts-mcp.tgz" |  |
| `staging_dir` | 否 | `string` | ".release-bundle" |  |
| `replace_existing` | 否 | `boolean` | false |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_prepare_node_runtime_bundle",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1
    },
    "output_file": {
      "type": "string",
      "minLength": 1,
      "default": "codearts-mcp.tgz"
    },
    "staging_dir": {
      "type": "string",
      "minLength": 1,
      "default": ".release-bundle"
    },
    "replace_existing": {
      "type": "boolean",
      "default": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_run_job

中文说明：运行Build 构建的任务。

原始工具说明：Run CodeArts Build job

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_run_job` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `branch` | 否 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_run_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_stop_job

中文说明：停止Build 构建的任务。

原始工具说明：Stop CodeArts Build job

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_stop_job` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  |  |
| `build_no` | 是 | `integer` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_stop_job",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": 1
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_job_step

中文说明：更新Build 构建的任务步骤。

原始工具说明：Update CodeArts Build job step image or command

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `build_update_job_step` |

参数：

无参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_step",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

## Artifact 制品仓

| API | 中文说明 |
| --- | --- |
| `artifact_delete_file` | 删除Artifact 制品仓的文件。 |
| `artifact_get_download_url` | 获取Artifact 制品仓的下载url。 |
| `artifact_get_file` | 获取Artifact 制品仓的文件。 |
| `artifact_get_file_tree` | 获取Artifact 制品仓的文件树。 |
| `artifact_get_repository` | 获取Artifact 制品仓的仓库。 |
| `artifact_list_build_archives` | 查询列表Artifact 制品仓的构建归档。 |
| `artifact_list_files` | 查询列表Artifact 制品仓的文件。 |
| `artifact_list_latest_version_files` | 查询列表Artifact 制品仓的最新版本文件。 |
| `artifact_list_repositories` | 查询列表Artifact 制品仓的仓库。 |
| `artifact_list_versions` | 查询列表Artifact 制品仓的版本。 |
| `artifact_search_artifacts` | 搜索Artifact 制品仓的制品。 |
| `artifact_show_audit` | 查看Artifact 制品仓的审计。 |

### artifact_delete_file

中文说明：删除Artifact 制品仓的文件。

原始工具说明：Delete CodeArts Artifact file

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_delete_file` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `repo_name` | 是 | `string` |  |  |
| `path` | 是 | `string` |  |  |
| `format` | 是 | `string` |  |  |
| `dry_run` | 否 | `boolean` | true |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_delete_file",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>",
      "repo_name": "<repo_name>",
      "path": "<path>",
      "format": "<format>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_download_url

中文说明：获取Artifact 制品仓的下载url。

原始工具说明：Get CodeArts Artifact file download URL

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_get_download_url` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `repo_name` | 是 | `string` |  |  |
| `path` | 是 | `string` |  |  |
| `format` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_download_url",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>",
      "repo_name": "<repo_name>",
      "path": "<path>",
      "format": "<format>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_file

中文说明：获取Artifact 制品仓的文件。

原始工具说明：Get CodeArts Artifact file detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_get_file` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `repo_name` | 是 | `string` |  |  |
| `path` | 是 | `string` |  |  |
| `format` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_file",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>",
      "repo_name": "<repo_name>",
      "path": "<path>",
      "format": "<format>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_file_tree

中文说明：获取Artifact 制品仓的文件树。

原始工具说明：Get CodeArts Artifact file tree

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_get_file_tree` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `repo_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_file_tree",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>",
      "repo_name": "<repo_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_repository

中文说明：获取Artifact 制品仓的仓库。

原始工具说明：Get CodeArts Artifact repository detail

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_get_repository` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_repository",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_build_archives

中文说明：查询列表Artifact 制品仓的构建归档。

原始工具说明：List CodeArts Artifact build archives

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_list_build_archives` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_build_archives",
    "arguments": {}
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_files

中文说明：查询列表Artifact 制品仓的文件。

原始工具说明：List CodeArts Artifact files

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_list_files` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |
| `repo_name` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_files",
    "arguments": {
      "project_id": "<project_id>",
      "repo_name": "<repo_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "repo_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_latest_version_files

中文说明：查询列表Artifact 制品仓的最新版本文件。

原始工具说明：List CodeArts Artifact latest version files

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_list_latest_version_files` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_latest_version_files",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_repositories

中文说明：查询列表Artifact 制品仓的仓库。

原始工具说明：List CodeArts Artifact repositories

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_list_repositories` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_repositories",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    }
  },
  "required": [
    "tenant_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_versions

中文说明：查询列表Artifact 制品仓的版本。

原始工具说明：List CodeArts Artifact versions

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_list_versions` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `project_id` | 是 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_versions",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_search_artifacts

中文说明：搜索Artifact 制品仓的制品。

原始工具说明：Search CodeArts Artifact artifacts

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_search_artifacts` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `artifact_name` | 是 | `string` |  |  |
| `repo_name` | 否 | `string` |  |  |
| `project_id` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_search_artifacts",
    "arguments": {
      "artifact_name": "<artifact_name>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "artifact_name": {
      "type": "string",
      "minLength": 1
    },
    "repo_name": {
      "type": "string"
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "artifact_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_show_audit

中文说明：查看Artifact 制品仓的审计。

原始工具说明：Show CodeArts Artifact audit logs

| 字段 | 值 |
| --- | --- |
| HTTP 方法 | `POST` |
| 路径 | `/mcp` |
| JSON-RPC 方法 | `tools/call` |
| 工具名 | `artifact_show_audit` |

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 |  |
| `page_size` | 否 | `integer` | 20 |  |
| `keyword` | 否 | `string` |  |  |
| `sort_by` | 否 | `string` |  |  |
| `sort_order` | 否 | `string` |  | 可选值：asc：desc |
| `tenant_id` | 是 | `string` |  |  |
| `project_id` | 是 | `unknown` |  |  |
| `module` | 是 | `string` |  |  |
| `repo` | 是 | `string` |  |  |
| `user_id` | 否 | `string` |  |  |
| `instance_id` | 否 | `string` |  |  |
| `format` | 否 | `string` |  |  |
| `resource_id` | 否 | `string` |  |  |

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_audit",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>",
      "module": "<module>",
      "repo": "<repo>"
    }
  }
}
```

参数 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "module": {
      "type": "string",
      "minLength": 1
    },
    "repo": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "type": "string"
    },
    "instance_id": {
      "type": "string"
    },
    "format": {
      "type": "string"
    },
    "resource_id": {
      "type": "string"
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "module",
    "repo"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```
