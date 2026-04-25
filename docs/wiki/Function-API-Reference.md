# CodeArts MCP 功能 API 参考

生成日期：2026-04-25

本文档列出当前 HTTP MCP 模式暴露的每个功能 API。所有功能 API 都使用同一个 HTTP 入口：`POST /mcp`；JSON-RPC 方法固定为 `tools/call`；具体功能由 `params.name` 指定。会话、鉴权、错误响应和完整 HTTP 调用流程请先阅读 [HTTP-MCP-Interface](./HTTP-MCP-Interface.md)。

工具名、参数名和 JSON Schema 是实际调用契约，必须保持英文原值；参数表和 JSON Schema 中的 `description` 字段用于说明每个字段的作用。

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
| `auth_clear_session` | 清除当前 MCP 会话中已配置的华为云访问凭证。 |
| `auth_configure_session` | 为当前 MCP 会话配置华为云 AK/SK、区域和可选服务 base URL。 |

### auth_clear_session

中文说明：清除当前 MCP 会话中已配置的华为云访问凭证。

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
| `access_key` | 是 | `string` |  | 华为云访问密钥 ID，用于当前 MCP 会话鉴权。 |
| `secret_key` | 是 | `string` |  | 华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。 |
| `region` | 是 | `string` |  | 华为云区域标识，例如 cn-north-4。 |
| `req_base_url` | 否 | `string` |  | Req 服务的基础 URL，用于覆盖默认区域路由。 |
| `repo_base_url` | 否 | `string` |  | Repo 服务的基础 URL，用于覆盖默认区域路由。 |
| `pipeline_base_url` | 否 | `string` |  | Pipeline 服务的基础 URL，用于覆盖默认区域路由。 |
| `check_base_url` | 否 | `string` |  | Check 服务的基础 URL，用于覆盖默认区域路由。 |
| `testplan_base_url` | 否 | `string` |  | TestPlan 服务的基础 URL，用于覆盖默认区域路由。 |
| `deploy_base_url` | 否 | `string` |  | Deploy 服务的基础 URL，用于覆盖默认区域路由。 |
| `build_base_url` | 否 | `string` |  | Build 服务的基础 URL，用于覆盖默认区域路由。 |
| `artifact_base_url` | 否 | `string` |  | Artifact 服务的基础 URL，用于覆盖默认区域路由。 |

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
      "minLength": 1,
      "description": "华为云访问密钥 ID，用于当前 MCP 会话鉴权。"
    },
    "secret_key": {
      "type": "string",
      "minLength": 1,
      "description": "华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。"
    },
    "region": {
      "type": "string",
      "minLength": 1,
      "description": "华为云区域标识，例如 cn-north-4。"
    },
    "req_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Req 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "repo_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Repo 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "pipeline_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Pipeline 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "check_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Check 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "testplan_base_url": {
      "type": "string",
      "format": "uri",
      "description": "TestPlan 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "deploy_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Deploy 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "build_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Build 服务的基础 URL，用于覆盖默认区域路由。"
    },
    "artifact_base_url": {
      "type": "string",
      "format": "uri",
      "description": "Artifact 服务的基础 URL，用于覆盖默认区域路由。"
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
| `req_add_iteration_work_items` | 添加Req 需求管理的迭代工作项。 |
| `req_add_plan_work_items` | 添加Req 需求管理的计划工作项。 |
| `req_add_project_member` | 添加Req 需求管理的项目成员。 |
| `req_add_work_item_comment` | 添加Req 需求管理的工作项评论。 |
| `req_add_work_item_work_hour` | 添加Req 需求管理的工作项工时。 |
| `req_batch_add_project_members` | 添加Req 需求管理的项目成员。 |
| `req_batch_create_ipd_issues` | 创建Req 需求管理的IPD 工作项。 |
| `req_batch_delete_ipd_issues` | 删除Req 需求管理的IPD 工作项。 |
| `req_batch_delete_iterations` | 删除Req 需求管理的迭代。 |
| `req_batch_delete_project_members` | 删除Req 需求管理的项目成员。 |
| `req_batch_delete_work_items` | 删除Req 需求管理的工作项。 |
| `req_batch_transfer_ipd_work_item_flow` | 流转Req 需求管理的IPD工作项流程。 |
| `req_batch_update_ipd_issues` | 更新Req 需求管理的IPD 工作项。 |
| `req_batch_update_work_items` | 更新Req 需求管理的工作项。 |
| `req_check_project_name` | 检查Req 需求管理的项目name。 |
| `req_check_work_item_status_name` | 检查Req 需求管理的工作项状态name。 |
| `req_clear_plan_work_items` | 清空Req 需求管理的计划工作项。 |
| `req_copy_work_items` | 复制Req 需求管理的工作项。 |
| `req_count_work_item_tree` | 统计Req 需求管理的工作项树形数据。 |
| `req_create_ipd_feature_set` | 创建Req 需求管理的IPD特性集。 |
| `req_create_ipd_issue` | 创建Req 需求管理的IPD 工作项。 |
| `req_create_ipd_label` | 创建Req 需求管理的IPD标签。 |
| `req_create_ipd_module` | 创建Req 需求管理的IPD模块。 |
| `req_create_ipd_work_hour` | 创建Req 需求管理的IPD工时。 |
| `req_create_iteration` | 创建Req 需求管理的迭代。 |
| `req_create_iteration_work_item` | 创建Req 需求管理的迭代工作项。 |
| `req_create_plan` | 创建Req 需求管理的计划。 |
| `req_create_plan_work_item` | 创建Req 需求管理的计划工作项。 |
| `req_create_project` | 创建Req 需求管理的项目。 |
| `req_create_project_module` | 创建Req 需求管理的项目模块。 |
| `req_create_work_item` | 创建Req 需求管理的工作项。 |
| `req_create_work_item_template` | 创建Req 需求管理的工作项模板。 |
| `req_delete_attachment` | 删除Req 需求管理的附件。 |
| `req_delete_ipd_feature_set` | 删除Req 需求管理的IPD特性集。 |
| `req_delete_ipd_issue_image` | 删除Req 需求管理的IPD 工作项图片。 |
| `req_delete_ipd_label` | 删除Req 需求管理的IPD标签。 |
| `req_delete_ipd_module` | 删除Req 需求管理的IPD模块。 |
| `req_delete_ipd_work_hour` | 删除Req 需求管理的IPD工时。 |
| `req_delete_iteration` | 删除Req 需求管理的迭代。 |
| `req_delete_plan` | 删除Req 需求管理的计划。 |
| `req_delete_project` | 删除Req 需求管理的项目。 |
| `req_delete_project_module` | 删除Req 需求管理的项目模块。 |
| `req_delete_project_template` | 删除Req 需求管理的项目模板。 |
| `req_delete_work_item` | 删除Req 需求管理的工作项。 |
| `req_download_attachment` | 下载Req 需求管理的附件。 |
| `req_download_image_file` | 下载Req 需求管理的图片文件。 |
| `req_download_ipd_issue_attachment` | 下载Req 需求管理的IPD 工作项附件。 |
| `req_download_ipd_issue_image` | 下载Req 需求管理的IPD 工作项图片。 |
| `req_get_current_user_info` | 获取Req 需求管理的当前用户信息。 |
| `req_get_current_user_role` | 获取Req 需求管理的当前用户角色。 |
| `req_get_ipd_e2e_graph` | 获取Req 需求管理的IPDe2egraph。 |
| `req_get_ipd_issue` | 获取Req 需求管理的IPD 工作项。 |
| `req_get_ipd_project_field_option_used` | 获取Req 需求管理的IPD项目字段optionused。 |
| `req_get_ipd_statistic_dashboard` | 获取Req 需求管理的IPDstatisticdashboard。 |
| `req_get_ipd_tenant_field_option_used` | 获取Req 需求管理的IPDtenant字段optionused。 |
| `req_get_ipd_tenant_field_used` | 获取Req 需求管理的IPDtenant字段used。 |
| `req_get_ipd_work_item_flow_detail` | 获取Req 需求管理的IPD工作项流程detail。 |
| `req_get_ir` | 获取Req 需求管理的ir。 |
| `req_get_iteration` | 获取Req 需求管理的迭代。 |
| `req_get_plan` | 获取Req 需求管理的计划。 |
| `req_get_project` | 获取Req 需求管理的项目。 |
| `req_get_project_bug_density` | 获取Req 需求管理的项目缺陷密度。 |
| `req_get_project_bugs_per_developer` | 获取Req 需求管理的项目人均缺陷。 |
| `req_get_project_completion_rate` | 获取Req 需求管理的项目完成率。 |
| `req_get_project_due_days_after` | 获取Req 需求管理的项目duedaysafter。 |
| `req_get_project_public_config` | 获取Req 需求管理的项目公共配置。 |
| `req_get_project_summary` | 获取Req 需求管理的项目概览。 |
| `req_get_project_workhour_config` | 获取Req 需求管理的项目workhour配置。 |
| `req_get_work_item` | 获取Req 需求管理的工作项。 |
| `req_get_work_item_completion_rate` | 获取Req 需求管理的工作项完成率。 |
| `req_get_work_item_index_counts` | 获取Req 需求管理的工作项indexcounts。 |
| `req_get_work_item_issue_details` | 获取Req 需求管理的工作项工作项details。 |
| `req_get_work_item_status_rule_flag` | 获取Req 需求管理的工作项状态规则flag。 |
| `req_get_work_item_template_config` | 获取Req 需求管理的工作项模板配置。 |
| `req_group_ipd_issues` | 分组查询Req 需求管理的IPD 工作项。 |
| `req_leave_project` | 离开Req 需求管理的项目。 |
| `req_list_associated_commits` | 查询列表Req 需求管理的关联对象提交。 |
| `req_list_associated_issues` | 查询列表Req 需求管理的关联对象工作项。 |
| `req_list_associated_test_cases` | 查询列表Req 需求管理的关联对象test用例。 |
| `req_list_associated_wikis` | 查询列表Req 需求管理的关联对象Wiki。 |
| `req_list_board_work_item_status_records` | 查询列表Req 需求管理的看板工作项状态记录。 |
| `req_list_board_work_item_workflow_config` | 查询列表Req 需求管理的看板工作项工作流配置。 |
| `req_list_board_work_items` | 查询列表Req 需求管理的看板工作项。 |
| `req_list_cache_data` | 查询列表Req 需求管理的缓存数据。 |
| `req_list_child_work_items` | 查询列表Req 需求管理的子项工作项。 |
| `req_list_ipd_attached_wikis` | 查询列表Req 需求管理的IPDattachedWiki。 |
| `req_list_ipd_category_statuses` | 查询列表Req 需求管理的IPD分类状态。 |
| `req_list_ipd_feature_sets` | 查询列表Req 需求管理的IPD特性集。 |
| `req_list_ipd_issue_attachments` | 查询列表Req 需求管理的IPD 工作项附件。 |
| `req_list_ipd_issue_fields` | 查询列表Req 需求管理的IPD 工作项字段。 |
| `req_list_ipd_issue_relation_config` | 查询列表Req 需求管理的IPD 工作项relation配置。 |
| `req_list_ipd_issue_tree` | 查询列表Req 需求管理的IPD 工作项树形数据。 |
| `req_list_ipd_issues` | 查询列表Req 需求管理的IPD 工作项。 |
| `req_list_ipd_labels` | 查询列表Req 需求管理的IPD标签。 |
| `req_list_ipd_modules` | 查询列表Req 需求管理的IPD模块。 |
| `req_list_ipd_project_fields` | 查询列表Req 需求管理的IPD项目字段。 |
| `req_list_ipd_project_users` | 查询列表Req 需求管理的IPD项目用户。 |
| `req_list_ipd_projects` | 查询列表Req 需求管理的IPD项目。 |
| `req_list_ipd_snapshot_features` | 查询列表Req 需求管理的IPDsnapshotfeatures。 |
| `req_list_ipd_snapshot_versions` | 查询列表Req 需求管理的IPDsnapshot版本。 |
| `req_list_ipd_statuses` | 查询列表Req 需求管理的IPD状态。 |
| `req_list_ipd_tenant_fields` | 查询列表Req 需求管理的IPDtenant字段。 |
| `req_list_ipd_tenant_issues` | 查询列表Req 需求管理的IPDtenant工作项。 |
| `req_list_ipd_work_hour_categories` | 查询列表Req 需求管理的IPD工时分类。 |
| `req_list_ipd_work_hours` | 查询列表Req 需求管理的IPD工时。 |
| `req_list_ipd_workflow_fields` | 查询列表Req 需求管理的IPD工作流字段。 |
| `req_list_ipd_workflow_templates` | 查询列表Req 需求管理的IPD工作流模板。 |
| `req_list_ir_children` | 查询列表Req 需求管理的irchildren。 |
| `req_list_ir_histories` | 查询列表Req 需求管理的irhistories。 |
| `req_list_issue_severities` | 查询列表Req 需求管理的工作项severities。 |
| `req_list_iteration_status_statistics` | 查询列表Req 需求管理的迭代状态statistics。 |
| `req_list_iteration_work_items` | 查询列表Req 需求管理的迭代工作项。 |
| `req_list_iterations` | 查询列表Req 需求管理的迭代。 |
| `req_list_job_cache_boards` | 查询列表Req 需求管理的任务cacheboards。 |
| `req_list_not_added_projects` | 查询列表Req 需求管理的notadded项目。 |
| `req_list_optional_work_item_status_configs` | 查询列表Req 需求管理的可选工作项状态配置。 |
| `req_list_plan_addable_work_items` | 查询列表Req 需求管理的计划addable工作项。 |
| `req_list_plan_work_items` | 查询列表Req 需求管理的计划工作项。 |
| `req_list_plans` | 查询列表Req 需求管理的计划。 |
| `req_list_program_fields` | 查询列表Req 需求管理的program字段。 |
| `req_list_programs` | 查询列表Req 需求管理的programs。 |
| `req_list_project_bug_statistics` | 查询列表Req 需求管理的项目缺陷统计。 |
| `req_list_project_demand_statistics` | 查询列表Req 需求管理的项目需求统计。 |
| `req_list_project_domains` | 查询列表Req 需求管理的项目domains。 |
| `req_list_project_members` | 查询列表Req 需求管理的项目成员。 |
| `req_list_project_modules` | 查询列表Req 需求管理的项目模块。 |
| `req_list_project_work_hour_types` | 查询列表Req 需求管理的项目工时types。 |
| `req_list_project_work_hours` | 查询列表Req 需求管理的项目工时。 |
| `req_list_project_work_item_records` | 查询列表Req 需求管理的项目工作项记录。 |
| `req_list_projects` | 查询列表Req 需求管理的项目。 |
| `req_list_related_users` | 查询列表Req 需求管理的相关用户。 |
| `req_list_rr_histories` | 查询列表Req 需求管理的rrhistories。 |
| `req_list_rr_statuses` | 查询列表Req 需求管理的rr状态。 |
| `req_list_rrs` | 查询列表Req 需求管理的rrs。 |
| `req_list_user_features` | 查询列表Req 需求管理的用户features。 |
| `req_list_work_item_comments` | 查询列表Req 需求管理的工作项评论。 |
| `req_list_work_item_custom_fields` | 查询列表Req 需求管理的工作项自定义字段。 |
| `req_list_work_item_records` | 查询列表Req 需求管理的工作项记录。 |
| `req_list_work_item_status_attributes` | 查询列表Req 需求管理的工作项状态属性。 |
| `req_list_work_item_status_configs` | 查询列表Req 需求管理的工作项状态配置。 |
| `req_list_work_item_status_details` | 查询列表Req 需求管理的工作项状态详情。 |
| `req_list_work_item_statuses` | 查询列表Req 需求管理的工作项状态。 |
| `req_list_work_item_tags` | 查询列表Req 需求管理的工作项标签。 |
| `req_list_work_item_templates` | 查询列表Req 需求管理的工作项模板。 |
| `req_list_work_item_tracker_handlers` | 查询列表Req 需求管理的工作项处理人配置。 |
| `req_list_work_item_tree` | 查询列表Req 需求管理的工作项树形数据。 |
| `req_list_work_item_work_hours` | 查询列表Req 需求管理的工作项工时。 |
| `req_list_work_item_workflow_config` | 查询列表Req 需求管理的工作项工作流配置。 |
| `req_list_work_items` | 查询列表Req 需求管理的工作项。 |
| `req_query_iteration_immovable_issues` | 查询Req 需求管理的迭代immovable工作项。 |
| `req_transfer_ipd_work_item_flow` | 流转Req 需求管理的IPD工作项流程。 |
| `req_update_cache_data` | 更新Req 需求管理的缓存数据。 |
| `req_update_ipd_feature_set` | 更新Req 需求管理的IPD特性集。 |
| `req_update_ipd_label` | 更新Req 需求管理的IPD标签。 |
| `req_update_ipd_module` | 更新Req 需求管理的IPD模块。 |
| `req_update_ipd_project_field` | 更新Req 需求管理的IPD项目字段。 |
| `req_update_ipd_tenant_field` | 更新Req 需求管理的IPDtenant字段。 |
| `req_update_ipd_work_hour` | 更新Req 需求管理的IPD工时。 |
| `req_update_iteration` | 更新Req 需求管理的迭代。 |
| `req_update_iteration_state` | 更新Req 需求管理的迭代state。 |
| `req_update_plan` | 更新Req 需求管理的计划。 |
| `req_update_plan_image` | 更新Req 需求管理的计划图片。 |
| `req_update_project` | 更新Req 需求管理的项目。 |
| `req_update_project_member_role` | 更新Req 需求管理的项目成员role。 |
| `req_update_project_module` | 更新Req 需求管理的项目模块。 |
| `req_update_project_template` | 更新Req 需求管理的项目模板。 |
| `req_update_work_item` | 更新Req 需求管理的工作项。 |
| `req_update_work_item_comment` | 更新Req 需求管理的工作项评论。 |
| `req_update_work_item_flow` | 更新Req 需求管理的工作项流程。 |
| `req_upload_attachment` | 上传Req 需求管理的附件。 |
| `req_upload_ipd_issue_attachment` | 上传Req 需求管理的IPD 工作项附件。 |
| `req_upload_ipd_issue_image` | 上传Req 需求管理的IPD 工作项图片。 |
| `req_upload_work_item_image` | 上传Req 需求管理的工作项图片。 |
| `req_validate_module_name` | 校验Req 需求管理的模块name。 |

### req_add_iteration_work_items

中文说明：添加Req 需求管理的迭代工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `work_item_ids` | 是 | `array` |  | 工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：添加Req 需求管理的计划工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `work_item_ids` | 是 | `array` |  | 工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：添加Req 需求管理的项目成员。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_id` | 是 | `unknown` |  | 用户 ID。用于定位项目成员、操作者或需要授权的用户。 |
| `domain_id` | 是 | `unknown` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `domain_name` | 否 | `string` |  | 租户/组织名称。添加成员或展示组织信息时使用。 |
| `role_id` | 否 | `number` |  | 项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "user_id": {
      "$ref": "#/properties/project_id",
      "description": "用户 ID。用于定位项目成员、操作者或需要授权的用户。"
    },
    "domain_id": {
      "$ref": "#/properties/project_id",
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "domain_name": {
      "type": "string",
      "minLength": 1,
      "description": "租户/组织名称。添加成员或展示组织信息时使用。"
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
      ],
      "description": "项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：添加Req 需求管理的工作项评论。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `content` | 是 | `string` |  | 规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "content": {
      "type": "string",
      "minLength": 1,
      "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：添加Req 需求管理的工作项工时。

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

中文说明：添加Req 需求管理的项目成员。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `members` | 是 | `array` |  | 成员列表。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "members": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id",
            "description": "用户 ID。用于定位项目成员、操作者或需要授权的用户。"
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
            ],
            "description": "项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。"
          }
        },
        "required": [
          "user_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "成员列表。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的IPD 工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issues` | 是 | `array` |  | IPD 工作项批量请求体列表。每个元素描述一个要创建或更新的 IPD 工作项。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "minLength": 1,
            "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
          },
          "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 256,
            "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
          },
          "description": {
            "type": "string",
            "maxLength": 500000,
            "description": "对象的详细描述或备注信息。"
          },
          "parent_id": {
            "$ref": "#/properties/project_id",
            "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
          },
          "status": {
            "type": "string",
            "minLength": 1,
            "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
          },
          "assignee": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id",
                "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
              },
              "name": {
                "type": "string",
                "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
              },
              "nick_name": {
                "type": "string",
                "description": "issues 参数，按对应 CodeArts API 要求传入。"
              }
            },
            "additionalProperties": true,
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "assigned_cc": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            },
            "maxItems": 50,
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "submitted_by": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            },
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "recipient": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            },
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "labels": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/project_id",
                  "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
                },
                "label_type": {
                  "type": "string",
                  "description": "issues 参数，按对应 CodeArts API 要求传入。"
                },
                "color": {
                  "type": "string",
                  "description": "颜色值，通常用于标签或展示配置。"
                },
                "title": {
                  "type": "string",
                  "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
                }
              },
              "additionalProperties": true
            },
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "custom_fields": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "字段/配置编码。用于查询字段选项使用情况或配置项。"
                },
                "value": {
                  "type": [
                    "string",
                    "number",
                    "boolean",
                    "null"
                  ],
                  "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
                }
              },
              "required": [
                "code",
                "value"
              ],
              "additionalProperties": false
            },
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "priority": {
            "type": "string",
            "description": "priority 参数，按对应 CodeArts API 要求传入。"
          },
          "workload": {
            "type": "string",
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "plan_pi": {
            "$ref": "#/properties/project_id",
            "description": "plan pi 参数，按对应 CodeArts API 要求传入。"
          },
          "plan_iteration": {
            "$ref": "#/properties/project_id",
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "business_domain": {
            "type": "string",
            "description": "业务域，用于按业务线或领域归类。"
          },
          "feature_set": {
            "$ref": "#/properties/project_id",
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "extra_fields": {
            "type": "object",
            "additionalProperties": {},
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "children": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": {}
            },
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "ir2feature": {
            "type": "string",
            "description": "ir2feature 参数，按对应 CodeArts API 要求传入。"
          },
          "ir2rr": {
            "type": "string",
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
          },
          "related_network_security": {
            "type": "string",
            "description": "related network security 参数，按对应 CodeArts API 要求传入。"
          },
          "collaboratives": {
            "type": "string",
            "description": "issues 参数，按对应 CodeArts API 要求传入。"
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
      "minItems": 1,
      "description": "issues 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD 工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array` |  | IPD 工作项 ID 列表。用于批量更新、删除或流程流转。 |
| `is_permanent_delete` | 否 | `boolean` |  | 是否永久删除，true 表示执行不可恢复删除。 |
| `src_project_id` | 否 | `unknown` |  | 源项目 ID。跨项目复制、删除或迁移资源时用于定位来源项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 50,
      "description": "IPD 工作项 ID 列表。用于批量更新、删除或流程流转。"
    },
    "is_permanent_delete": {
      "type": "boolean",
      "description": "是否永久删除，true 表示执行不可恢复删除。"
    },
    "src_project_id": {
      "$ref": "#/properties/project_id",
      "description": "源项目 ID。跨项目复制、删除或迁移资源时用于定位来源项目。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的迭代。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_ids` | 是 | `array` |  | iteration ID 列表，用于批量操作。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "iteration ID 列表，用于批量操作。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的项目成员。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_ids` | 是 | `array` |  | 用户 ID 列表。用于批量成员、权限或过滤操作。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "用户 ID 列表。用于批量成员、权限或过滤操作。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_ids` | 是 | `array` |  | 工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 100,
      "description": "工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：流转Req 需求管理的IPD工作项流程。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array` |  | IPD 工作项 ID 列表。用于批量更新、删除或流程流转。 |
| `issue_category` | 是 | `string` |  | IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。 |
| `flow_code` | 是 | `string` |  | 流程流转编码，表示要执行的状态流转动作。 |
| `is_recover` | 否 | `boolean` | false | 是否按恢复流程处理。 |
| `process_context` | 否 | `object` |  | 流程流转上下文，按工作流要求传入。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "IPD 工作项 ID 列表。用于批量更新、删除或流程流转。"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。"
    },
    "flow_code": {
      "type": "string",
      "minLength": 1,
      "description": "流程流转编码，表示要执行的状态流转动作。"
    },
    "is_recover": {
      "type": "boolean",
      "default": false,
      "description": "是否按恢复流程处理。"
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {},
      "description": "流程流转上下文，按工作流要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Req 需求管理的IPD 工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array` |  | IPD 工作项 ID 列表。用于批量更新、删除或流程流转。 |
| `attribute` | 是 | `object` |  | 批量更新的属性集合。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "IPD 工作项 ID 列表。用于批量更新、删除或流程流转。"
    },
    "attribute": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string",
          "minLength": 1,
          "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "maxLength": 256,
          "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50000,
          "description": "对象的详细描述或备注信息。"
        },
        "parent_id": {
          "$ref": "#/properties/project_id",
          "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
        },
        "status": {
          "type": "string",
          "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
        },
        "assignee": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "#/properties/project_id",
              "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
            },
            "name": {
              "type": "string",
              "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
            },
            "nick_name": {
              "type": "string",
              "description": "批量更新的属性集合。"
            }
          },
          "additionalProperties": true,
          "description": "批量更新的属性集合。"
        },
        "assigned_cc": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          },
          "maxItems": 50,
          "description": "批量更新的属性集合。"
        },
        "submitted_by": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          },
          "description": "批量更新的属性集合。"
        },
        "recipient": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          },
          "description": "批量更新的属性集合。"
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id",
                "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
              },
              "label_type": {
                "type": "string",
                "description": "批量更新的属性集合。"
              },
              "color": {
                "type": "string",
                "description": "颜色值，通常用于标签或展示配置。"
              },
              "title": {
                "type": "string",
                "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
              }
            },
            "additionalProperties": true
          },
          "description": "批量更新的属性集合。"
        },
        "custom_fields": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "code": {
                "type": "string",
                "minLength": 1,
                "description": "字段/配置编码。用于查询字段选项使用情况或配置项。"
              },
              "value": {
                "type": [
                  "string",
                  "number",
                  "boolean",
                  "null"
                ],
                "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
              }
            },
            "required": [
              "code",
              "value"
            ],
            "additionalProperties": false
          },
          "description": "批量更新的属性集合。"
        },
        "priority": {
          "type": "string",
          "description": "priority 参数，按对应 CodeArts API 要求传入。"
        },
        "workload": {
          "type": "string",
          "description": "批量更新的属性集合。"
        },
        "plan_pi": {
          "$ref": "#/properties/project_id",
          "description": "plan pi 参数，按对应 CodeArts API 要求传入。"
        },
        "plan_iteration": {
          "$ref": "#/properties/project_id",
          "description": "批量更新的属性集合。"
        },
        "business_domain": {
          "type": "string",
          "description": "业务域，用于按业务线或领域归类。"
        },
        "feature_set": {
          "$ref": "#/properties/project_id",
          "description": "批量更新的属性集合。"
        },
        "extra_fields": {
          "type": "object",
          "additionalProperties": {},
          "description": "批量更新的属性集合。"
        }
      },
      "required": [
        "category"
      ],
      "additionalProperties": true,
      "description": "批量更新的属性集合。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Req 需求管理的工作项。

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

中文说明：检查Req 需求管理的项目name。

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
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |

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
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
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

中文说明：检查Req 需求管理的工作项状态name。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status_name` | 是 | `string` |  | 状态名称。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "status_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15,
      "description": "状态名称。"
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

中文说明：清空Req 需求管理的计划工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：复制Req 需求管理的工作项。

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
| `from_project_id` | 是 | `string` |  | 源项目 ID。复制工作项时用于指定复制来源。 |
| `to_project_id` | 是 | `unknown` |  | 目标项目 ID。复制工作项时用于指定复制目标。 |
| `work_item_ids` | 是 | `array` |  | 工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。 |
| `copy_comments` | 否 | `boolean` | false | 复制工作项时是否同时复制评论。 |
| `copy_work_hours` | 否 | `boolean` | false | 是否复制工时。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "源项目 ID。复制工作项时用于指定复制来源。"
    },
    "to_project_id": {
      "$ref": "#/properties/from_project_id",
      "description": "目标项目 ID。复制工作项时用于指定复制目标。"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/from_project_id"
      },
      "minItems": 1,
      "description": "工作项 ID 列表。用于批量删除、复制、更新或加入计划/迭代。"
    },
    "copy_comments": {
      "type": "boolean",
      "default": false,
      "description": "复制工作项时是否同时复制评论。"
    },
    "copy_work_hours": {
      "type": "boolean",
      "default": false,
      "description": "是否复制工时。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：统计Req 需求管理的工作项树形数据。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_ids` | 否 | `array` |  | Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
      "minItems": 1,
      "description": "Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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

中文说明：创建Req 需求管理的IPD特性集。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的IPD 工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `description` | 是 | `string` |  | 对象的详细描述或备注信息。 |
| `category` | 是 | `string` |  | 分类编码。用于按需求、缺陷等对象类型查询或创建。 |
| `assignee` | 是 | `unknown` |  | 责任人信息或责任人 ID，格式以对应接口要求为准。 |
| `status` | 否 | `string` |  | 状态值。Scrum 迭代状态可取 "0"、"1"、"2"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。 |
| `src_domain` | 否 | `unknown` |  | 来源租户或域标识。 |
| `submitted_by` | 否 | `unknown` |  | 提交人。 |
| `domain_id` | 否 | `unknown` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `recipient` | 否 | `array` |  | 接收人列表。 |
| `expect_delivery_time` | 否 | `integer` |  | 期望交付时间。 |
| `priority` | 否 | `string` |  | 优先级。 |
| `assigned_cc` | 否 | `array` |  | 抄送人列表。 |
| `plan_pi` | 否 | `unknown` |  | PI 计划。 |
| `plan_iteration` | 否 | `unknown` |  | 计划迭代标识。 |
| `plan_start_date` | 否 | `integer` |  | 计划开始时间。 |
| `plan_end_date` | 否 | `integer` |  | 计划结束时间。 |
| `workload_man_day` | 否 | `number` |  | 工作量，单位为人天。 |
| `business_domain` | 否 | `string` |  | 业务域，用于按业务线或领域归类。 |
| `need_break` | 否 | `string` |  | 是否需要拆分。 |
| `extra_fields` | 否 | `object` |  | 扩展字段对象，按官方接口要求传入。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "description": "arguments 参数，按对应 CodeArts API 要求传入。",
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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "description": {
      "type": "string",
      "maxLength": 500000,
      "description": "对象的详细描述或备注信息。"
    },
    "category": {
      "type": "string",
      "minLength": 1,
      "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
    },
    "assignee": {
      "$ref": "#/properties/project_id",
      "description": "责任人信息或责任人 ID，格式以对应接口要求为准。"
    },
    "status": {
      "type": "string",
      "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
    },
    "src_domain": {
      "$ref": "#/properties/project_id",
      "description": "来源租户或域标识。"
    },
    "submitted_by": {
      "$ref": "#/properties/project_id",
      "description": "提交人。"
    },
    "domain_id": {
      "$ref": "#/properties/project_id",
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "recipient": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "接收人列表。"
    },
    "expect_delivery_time": {
      "type": "integer",
      "description": "期望交付时间。"
    },
    "priority": {
      "type": "string",
      "description": "优先级。"
    },
    "assigned_cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "maxItems": 50,
      "description": "抄送人列表。"
    },
    "plan_pi": {
      "$ref": "#/properties/project_id",
      "description": "PI 计划。"
    },
    "plan_iteration": {
      "$ref": "#/properties/project_id",
      "description": "计划迭代标识。"
    },
    "plan_start_date": {
      "type": "integer",
      "description": "计划开始时间。"
    },
    "plan_end_date": {
      "type": "integer",
      "description": "计划结束时间。"
    },
    "workload_man_day": {
      "type": "number",
      "description": "工作量，单位为人天。"
    },
    "business_domain": {
      "type": "string",
      "description": "业务域，用于按业务线或领域归类。"
    },
    "need_break": {
      "type": "string",
      "description": "是否需要拆分。"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {},
      "description": "扩展字段对象，按官方接口要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的IPD标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `label_type` | 是 | `string` |  | 标签类型。 |
| `color` | 是 | `string` |  | 颜色值，通常用于标签或展示配置。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "label_type": {
      "type": "string",
      "minLength": 1,
      "description": "标签类型。"
    },
    "color": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16,
      "description": "颜色值，通常用于标签或展示配置。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的IPD模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 是 | `string` |  | 展示名称或显示值。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `assignee` | 否 | `unknown` |  | 责任人信息或责任人 ID，格式以对应 IPD 接口为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30,
      "description": "展示名称或显示值。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "description": {
      "type": "string",
      "maxLength": 255,
      "description": "对象的详细描述或备注信息。"
    },
    "assignee": {
      "$ref": "#/properties/project_id",
      "description": "责任人信息或责任人 ID，格式以对应 IPD 接口为准。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的IPD工时。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `work_date_begin` | 是 | `string` |  | 工时开始日期。 |
| `work_date_end` | 是 | `string` |  | 工时结束日期。 |
| `work_hours` | 是 | `string \| number` |  | 工时数。 |
| `work_hour_type` | 是 | `number \| number \| string` |  | 工时类型：1、2 或租户自定义字符串；具体含义以项目工时类型配置为准。 |
| `include_weekend` | 是 | `boolean` |  | 是否包含周末。 |
| `work_hour_category` | 否 | `string` |  | 工时分类。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "work_date_begin": {
      "type": "string",
      "minLength": 1,
      "description": "工时开始日期。"
    },
    "work_date_end": {
      "type": "string",
      "minLength": 1,
      "description": "工时结束日期。"
    },
    "work_hours": {
      "type": [
        "string",
        "number"
      ],
      "description": "工时数。"
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
      ],
      "description": "工时类型：1、2 或租户自定义字符串；具体含义以项目工时类型配置为准。"
    },
    "include_weekend": {
      "type": "boolean",
      "description": "是否包含周末。"
    },
    "work_hour_category": {
      "type": "string",
      "description": "工时分类。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `begin_time` | 是 | `string` |  | 开始时间。 |
| `end_time` | 是 | `string` |  | 结束时间。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "begin_time": {
      "type": "string",
      "minLength": 1,
      "description": "开始时间。"
    },
    "end_time": {
      "type": "string",
      "minLength": 1,
      "description": "结束时间。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `unknown` |  | 父工作项 ID。创建子工作项时传入该字段，MCP 会映射为官方请求体字段 parent_issue_id。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `module_id` | 否 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。 |
| `assigned_id` | 否 | `unknown` |  | 关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。 |
| `developer_id` | 否 | `unknown` |  | 开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。 |
| `done_ratio` | 否 | `integer` |  | 完成度百分比，用于表示工作项当前完成进度。 |
| `expected_work_hours` | 否 | `integer` |  | 预计工时，用于记录计划投入的工作小时数。 |
| `start_date` | 否 | `integer` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `due_date` | 否 | `integer` |  | 计划完成或截止日期。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1,
      "description": "工作项类型，会映射为 Scrum tracker_id：task/\"2\"=Task/任务，bug/\"3\"=Bug/缺陷，epic/\"5\"=Epic，feature/\"6\"=Feature，story/\"7\"=Story。"2\"、\"3\"、\"5\"、\"6\"、\"7\"。"
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "父工作项 ID。创建子工作项时传入该字段，MCP 会映射为官方请求体字段 parent_issue_id。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。"
    },
    "assigned_id": {
      "$ref": "#/properties/project_id",
      "description": "关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。"
    },
    "developer_id": {
      "$ref": "#/properties/project_id",
      "description": "开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0,
      "description": "完成度百分比，用于表示工作项当前完成进度。"
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0,
      "description": "预计工时，用于记录计划投入的工作小时数。"
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "计划完成或截止日期。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `type` | 是 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "type": {
      "type": "string",
      "enum": [
        "gantt",
        "mind"
      ],
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `unknown` |  | 父工作项 ID。创建计划工作项或子工作项时用于挂到父级。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `iteration_id` | 否 | `unknown` |  | 迭代唯一标识。 |
| `module_id` | 否 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |
| `assigned_id` | 否 | `unknown` |  | 关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。 |
| `developer_id` | 否 | `unknown` |  | 开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。 |
| `done_ratio` | 否 | `integer` |  | 完成度百分比，用于表示工作项当前完成进度。 |
| `expected_work_hours` | 否 | `integer` |  | 预计工时，用于记录计划投入的工作小时数。 |
| `start_date` | 否 | `integer` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `due_date` | 否 | `integer` |  | 计划完成或截止日期。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1,
      "description": "工作项类型，会映射为 Scrum tracker_id：task/\"2\"=Task/任务，bug/\"3\"=Bug/缺陷，epic/\"5\"=Epic，feature/\"6\"=Feature，story/\"7\"=Story。"2\"、\"3\"、\"5\"、\"6\"、\"7\"。"
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "父工作项 ID。创建计划工作项或子工作项时用于挂到父级。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
    },
    "assigned_id": {
      "$ref": "#/properties/project_id",
      "description": "关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。"
    },
    "developer_id": {
      "$ref": "#/properties/project_id",
      "description": "开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0,
      "description": "完成度百分比，用于表示工作项当前完成进度。"
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0,
      "description": "预计工时，用于记录计划投入的工作小时数。"
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "计划完成或截止日期。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Req 需求管理的项目模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_name` | 是 | `string` |  | 模块名称。用于创建或更新项目模块。 |
| `owner_user_id` | 是 | `unknown` |  | 模块负责人用户 ID。创建或更新项目模块时指定负责人。 |
| `parent_module_id` | 否 | `integer` |  | 父模块 ID。创建项目模块时用于构建模块层级。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30,
      "description": "模块名称。用于创建或更新项目模块。"
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id",
      "description": "模块负责人用户 ID。创建或更新项目模块时指定负责人。"
    },
    "parent_module_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "父模块 ID。创建项目模块时用于构建模块层级。"
    },
    "description": {
      "type": "string",
      "maxLength": 255,
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `unknown` |  | 父工作项 ID。创建子工作项时传入该字段，MCP 会映射为官方请求体字段 parent_issue_id。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `iteration_id` | 否 | `unknown` |  | 迭代唯一标识。 |
| `module_id` | 否 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。 |
| `assigned_id` | 否 | `unknown` |  | 关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。 |
| `developer_id` | 否 | `unknown` |  | 开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。 |
| `done_ratio` | 否 | `integer` |  | 完成度百分比，用于表示工作项当前完成进度。 |
| `expected_work_hours` | 否 | `integer` |  | 预计工时，用于记录计划投入的工作小时数。 |
| `start_date` | 否 | `integer` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `due_date` | 否 | `integer` |  | 计划完成或截止日期。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1,
      "description": "工作项类型，会映射为 Scrum tracker_id：task/\"2\"=Task/任务，bug/\"3\"=Bug/缺陷，epic/\"5\"=Epic，feature/\"6\"=Feature，story/\"7\"=Story。"2\"、\"3\"、\"5\"、\"6\"、\"7\"。"
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "父工作项 ID。创建子工作项时传入该字段，MCP 会映射为官方请求体字段 parent_issue_id。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。"
    },
    "assigned_id": {
      "$ref": "#/properties/project_id",
      "description": "关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。"
    },
    "developer_id": {
      "$ref": "#/properties/project_id",
      "description": "开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0,
      "description": "完成度百分比，用于表示工作项当前完成进度。"
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0,
      "description": "预计工时，用于记录计划投入的工作小时数。"
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "计划完成或截止日期。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `attachment_id` | 是 | `unknown` |  | 附件 ID。用于下载或删除工作项/IPD 附件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id",
      "description": "附件 ID。用于下载或删除工作项/IPD 附件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD特性集。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `feature_set_id` | 是 | `unknown` |  | IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD 工作项图片。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `file_name` | 是 | `string` |  | 文件名。用于上传、下载或删除图片/附件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "file_name": {
      "type": "string",
      "minLength": 1,
      "description": "文件名。用于上传、下载或删除图片/附件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `label_id` | 是 | `unknown` |  | IPD 标签 ID。用于更新或删除 IPD 标签。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "label_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 标签 ID。用于更新或删除 IPD 标签。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的IPD工时。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `workhour_id` | 是 | `unknown` |  | 工时记录 ID。用于更新或删除 IPD 工时记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "workhour_id": {
      "$ref": "#/properties/project_id",
      "description": "工时记录 ID。用于更新或删除 IPD 工时记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Req 需求管理的项目模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `template_id` | 是 | `string` |  | 模板 ID。用于按模板创建部署任务、应用或查询模板详情。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `attachment_id` | 是 | `unknown` |  | 附件 ID。用于下载或删除工作项/IPD 附件。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id",
      "description": "附件 ID。用于下载或删除工作项/IPD 附件。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `image_uri` | 是 | `string` |  | 图片 URI。用于下载 Req 图片文件。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "image_uri": {
      "type": "string",
      "minLength": 1,
      "description": "图片 URI。用于下载 Req 图片文件。"
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

中文说明：下载Req 需求管理的IPD 工作项附件。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `attachment_id` | 是 | `unknown` |  | 附件 ID。用于下载或删除工作项/IPD 附件。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id",
      "description": "附件 ID。用于下载或删除工作项/IPD 附件。"
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

中文说明：下载Req 需求管理的IPD 工作项图片。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `file_name` | 是 | `string` |  | 文件名。用于上传、下载或删除图片/附件。 |
| `field_code` | 否 | `string` |  | 字段编码。用于定位字段配置或图片上传字段。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "file_name": {
      "type": "string",
      "minLength": 1,
      "description": "文件名。用于上传、下载或删除图片/附件。"
    },
    "field_code": {
      "type": "string",
      "maxLength": 64,
      "description": "字段编码。用于定位字段配置或图片上传字段。"
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

中文说明：获取Req 需求管理的当前用户信息。

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

中文说明：获取Req 需求管理的当前用户角色。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：获取Req 需求管理的IPDe2egraph。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `category` | 是 | `string` |  | 分类编码。用于按需求、缺陷等对象类型查询或创建。 |
| `is_src` | 否 | `boolean` |  | 是否src。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "category": {
      "type": "string",
      "minLength": 1,
      "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
    },
    "is_src": {
      "type": "boolean",
      "description": "是否src。"
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

中文说明：获取Req 需求管理的IPD 工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `version` | 否 | `string` | "v2" | 接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "version": {
      "type": "string",
      "enum": [
        "v1",
        "v2"
      ],
      "default": "v2",
      "description": "接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。"
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

中文说明：获取Req 需求管理的IPD项目字段optionused。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `code` | 是 | `string` |  | 字段/配置编码。用于查询字段选项使用情况或配置项。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "code": {
      "type": "string",
      "minLength": 1,
      "description": "字段/配置编码。用于查询字段选项使用情况或配置项。"
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

中文说明：获取Req 需求管理的IPDstatisticdashboard。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `classification` | 是 | `string` |  | 统计分类：requirement=需求，bug=缺陷。 |
| `plan` | 否 | `object` |  | 计划或迭代过滤条件。 |
| `created_date` | 否 | `object` |  | 创建时间范围。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "classification": {
      "type": "string",
      "enum": [
        "requirement",
        "bug"
      ],
      "description": "统计分类：requirement=需求，bug=缺陷。"
    },
    "plan": {
      "type": "object",
      "properties": {
        "plan_pi": {
          "type": "string",
          "description": "计划或迭代过滤条件。"
        },
        "plan_iteration": {
          "type": "string",
          "description": "计划迭代标识。"
        }
      },
      "additionalProperties": false,
      "description": "计划或迭代过滤条件。"
    },
    "created_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string",
          "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
        },
        "end_date": {
          "type": "string",
          "description": "结束日期。用于按时间范围查询操作日志、历史记录或统计数据。"
        }
      },
      "additionalProperties": true,
      "description": "创建时间范围。"
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

中文说明：获取Req 需求管理的IPDtenant字段optionused。

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
| `code` | 是 | `string` |  | 字段/配置编码。用于查询字段选项使用情况或配置项。 |

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
      "minLength": 1,
      "description": "字段/配置编码。用于查询字段选项使用情况或配置项。"
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

中文说明：获取Req 需求管理的IPDtenant字段used。

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
| `field_id` | 是 | `string` |  | 字段 ID。用于定位 IPD 租户字段或自定义字段。 |

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
      "minLength": 1,
      "description": "字段 ID。用于定位 IPD 租户字段或自定义字段。"
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

中文说明：获取Req 需求管理的IPD工作项流程detail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `issue_category` | 是 | `string` |  | IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。"
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
| `program_id` | 是 | `string` |  | 项目空间/需求池 ID。用于定位 IR/RR 所属空间。 |
| `ir_id` | 是 | `unknown` |  | IR ID。用于定位需求池中的原始需求。 |

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
      "minLength": 1,
      "description": "项目空间/需求池 ID。用于定位 IR/RR 所属空间。"
    },
    "ir_id": {
      "$ref": "#/properties/program_id",
      "description": "IR ID。用于定位需求池中的原始需求。"
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
| `iteration_id` | 是 | `string` |  | 迭代唯一标识。 |

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
      "minLength": 1,
      "description": "迭代唯一标识。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：获取Req 需求管理的项目缺陷密度。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `date_range` | 否 | `string` |  | 日期范围。 |
| `metric_type` | 否 | `string` |  | 指标类型。 |
| `dividend` | 否 | `object` |  | 指标分子过滤条件。 |
| `divisor` | 否 | `object` |  | 指标分母过滤条件。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "date_range": {
      "type": "string",
      "minLength": 1,
      "description": "日期范围。"
    },
    "metric_type": {
      "type": "string",
      "minLength": 1,
      "description": "指标类型。"
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
                "minLength": 1,
                "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
              },
              "options": {
                "type": "string",
                "minLength": 1,
                "description": "字段选项配置。"
              }
            },
            "additionalProperties": false
          },
          "minItems": 1,
          "description": "指标分子过滤条件。"
        }
      },
      "additionalProperties": false,
      "description": "指标分子过滤条件。"
    },
    "divisor": {
      "type": "object",
      "properties": {
        "custom_fields": {
          "type": "array",
          "items": {
            "$ref": "#/properties/dividend/properties/custom_fields/items"
          },
          "minItems": 1,
          "description": "指标分母过滤条件。"
        }
      },
      "additionalProperties": false,
      "description": "指标分母过滤条件。"
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

中文说明：获取Req 需求管理的项目人均缺陷。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：获取Req 需求管理的项目完成率。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `date_range` | 否 | `string` |  | 日期范围。 |
| `metric_type` | 否 | `string` |  | 指标类型。 |
| `sprint_id` | 否 | `unknown` |  | 冲刺/迭代 ID。用于项目完成率等统计口径。 |
| `dividend` | 否 | `object` |  | 指标分子过滤条件。 |
| `divisor` | 否 | `object` |  | 指标分母过滤条件。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "date_range": {
      "type": "string",
      "minLength": 1,
      "description": "日期范围。"
    },
    "metric_type": {
      "type": "string",
      "minLength": 1,
      "description": "指标类型。"
    },
    "sprint_id": {
      "$ref": "#/properties/project_id",
      "description": "冲刺/迭代 ID。用于项目完成率等统计口径。"
    },
    "dividend": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      },
      "description": "指标分子过滤条件。"
    },
    "divisor": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      },
      "description": "指标分母过滤条件。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：获取Req 需求管理的项目公共配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：获取Req 需求管理的项目概览。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：获取Req 需求管理的工作项完成率。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：获取Req 需求管理的工作项工作项details。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `include` | 否 | `string` | "children,parent" | 详情附加项。用于指定详情接口是否包含评论、附件、关联等扩展数据。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "include": {
      "type": "string",
      "minLength": 1,
      "default": "children,parent",
      "description": "详情附加项。用于指定详情接口是否包含评论、附件、关联等扩展数据。"
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

中文说明：获取Req 需求管理的工作项状态规则flag。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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

中文说明：分组查询Req 需求管理的IPD 工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。 |
| `group_field_id` | 是 | `unknown` |  | 分组字段 ID。IPD 分组查询时指定按哪个字段分组。 |
| `is_project_group` | 否 | `boolean` |  | 是否按项目维度分组。 |
| `group_sort` | 否 | `string` |  | 分组排序方向：asc=升序，desc=降序。 |
| `filter` | 否 | `array` |  | 过滤条件列表。 |
| `filter_mode` | 否 | `string` | "AND_OR" | 过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。 |
| `sort` | 否 | `array` |  | 排序条件。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_type": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。"
    },
    "group_field_id": {
      "$ref": "#/properties/project_id",
      "description": "分组字段 ID。IPD 分组查询时指定按哪个字段分组。"
    },
    "is_project_group": {
      "type": "boolean",
      "description": "是否按项目维度分组。"
    },
    "group_sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "分组排序方向：asc=升序，desc=降序。"
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
      "maxItems": 200,
      "description": "过滤条件列表。"
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR",
      "description": "过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "排序条件。"
          },
          "asc": {
            "type": "boolean",
            "description": "asc 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "additionalProperties": true
      },
      "description": "排序条件。"
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

中文说明：离开Req 需求管理的项目。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：查询列表Req 需求管理的关联对象提交。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `type` | 否 | `string` | "commit" | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "type": {
      "type": "string",
      "enum": [
        "commit",
        "branch"
      ],
      "default": "commit",
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
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

中文说明：查询列表Req 需求管理的关联对象工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：查询列表Req 需求管理的关联对象test用例。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：查询列表Req 需求管理的关联对象Wiki。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：查询列表Req 需求管理的看板工作项状态记录。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的看板工作项工作流配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `board_id` | 是 | `unknown` |  | 看板 ID。用于查询指定看板的工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "board_id": {
      "$ref": "#/properties/project_id",
      "description": "看板 ID。用于查询指定看板的工作流配置。"
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

中文说明：查询列表Req 需求管理的看板工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `created_time_interval` | 否 | `string` |  | 创建时间范围。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "created_time_interval": {
      "type": "string",
      "description": "创建时间范围。"
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

中文说明：查询列表Req 需求管理的缓存数据。

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `type` | 否 | `string` | "backlog" | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "backlog",
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_child_work_items

中文说明：查询列表Req 需求管理的子项工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `subject` | 否 | `string` |  | 标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。 |
| `query_type` | 否 | `string` | "basic" | 查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "subject": {
      "type": "string",
      "description": "标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。"
    },
    "query_type": {
      "type": "string",
      "enum": [
        "basic",
        "custom",
        "query"
      ],
      "default": "basic",
      "description": "查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。"
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

中文说明：查询列表Req 需求管理的IPDattachedWiki。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `category` | 否 | `string` |  | 分类编码。用于按需求、缺陷等对象类型查询或创建。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "category": {
      "type": "string",
      "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
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

中文说明：查询列表Req 需求管理的IPD分类状态。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `unknown` |  | 分类 ID。用于查询某类 IPD 字段、状态或工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category_id": {
      "$ref": "#/properties/project_id",
      "description": "分类 ID。用于查询某类 IPD 字段、状态或工作流配置。"
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

中文说明：查询列表Req 需求管理的IPD特性集。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `snapshot_version_id` | 否 | `unknown` |  | 快照版本 ID。用于查询 IPD 特性集快照数据。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id",
      "description": "快照版本 ID。用于查询 IPD 特性集快照数据。"
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

中文说明：查询列表Req 需求管理的IPD 工作项附件。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `source_project_id` | 否 | `unknown` |  | 源项目 ID。下载或查询跨项目资源时用于定位来源项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "source_project_id": {
      "$ref": "#/properties/project_id",
      "description": "源项目 ID。下载或查询跨项目资源时用于定位来源项目。"
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

中文说明：查询列表Req 需求管理的IPD 工作项字段。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `unknown` |  | 分类 ID。用于查询某类 IPD 字段、状态或工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category_id": {
      "$ref": "#/properties/project_id",
      "description": "分类 ID。用于查询某类 IPD 字段、状态或工作流配置。"
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

中文说明：查询列表Req 需求管理的IPD 工作项relation配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD 工作项树形数据。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category` | 是 | `string` |  | 分类编码。用于按需求、缺陷等对象类型查询或创建。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `number` | 否 | `array` |  | 编号列表。 |
| `plan` | 否 | `array` |  | 计划或迭代过滤条件。 |
| `modified_date` | 否 | `object` |  | 修改时间范围。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category": {
      "type": "string",
      "minLength": 1,
      "description": "分类编码。用于按需求、缺陷等对象类型查询或创建。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "number": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "编号列表。"
    },
    "plan": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "plan_pi": {
            "type": "string",
            "description": "计划或迭代过滤条件。"
          },
          "plan_iteration": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "计划或迭代过滤条件。"
          }
        },
        "additionalProperties": true
      },
      "description": "计划或迭代过滤条件。"
    },
    "modified_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string",
          "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
        },
        "end_date": {
          "type": "string",
          "description": "结束日期。用于按时间范围查询操作日志、历史记录或统计数据。"
        }
      },
      "additionalProperties": true,
      "description": "修改时间范围。"
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

中文说明：查询列表Req 需求管理的IPD 工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。 |
| `filter` | 否 | `array` |  | 过滤条件列表。 |
| `filter_mode` | 否 | `string` | "AND_OR" | 过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_type": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。"
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "description": "过滤条件列表。"
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR",
      "description": "过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。"
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

中文说明：查询列表Req 需求管理的IPD标签。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD模块。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD项目字段。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD项目用户。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD项目。

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
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `model` | 否 | `string` |  | IPD 项目模型：10001、10002、10003，分别对应租户启用的不同 IPD 项目模型；具体名称以租户配置为准。 |

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
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "model": {
      "type": "string",
      "enum": [
        "10001",
        "10002",
        "10003"
      ],
      "description": "IPD 项目模型：10001、10002、10003，分别对应租户启用的不同 IPD 项目模型；具体名称以租户配置为准。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_snapshot_features

中文说明：查询列表Req 需求管理的IPDsnapshotfeatures。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `snapshot_version_id` | 是 | `unknown` |  | 快照版本 ID。用于查询 IPD 特性集快照数据。 |
| `feature_set_id` | 是 | `unknown` |  | IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id",
      "description": "快照版本 ID。用于查询 IPD 特性集快照数据。"
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。"
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

中文说明：查询列表Req 需求管理的IPDsnapshot版本。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的IPD状态。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 否 | `unknown` |  | 分类 ID。用于查询某类 IPD 字段、状态或工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category_id": {
      "$ref": "#/properties/project_id",
      "description": "分类 ID。用于查询某类 IPD 字段、状态或工作流配置。"
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

中文说明：查询列表Req 需求管理的IPDtenant字段。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_info` | 否 | `object` |  | 排序信息。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "search": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_info": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string",
          "description": "排序信息。"
        },
        "asc": {
          "type": "boolean",
          "description": "排序信息。"
        }
      },
      "additionalProperties": false,
      "description": "排序信息。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_tenant_issues

中文说明：查询列表Req 需求管理的IPDtenant工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 否 | `string | array` | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。 |
| `filter` | 否 | `array` |  | 过滤条件列表。 |
| `filter_mode` | 否 | `string` | "AND_OR" | 过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。 |
| `sort` | 否 | `array` |  | 排序条件。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
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
      ],
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_type": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项类型。用于指定需求、缺陷等 IPD 对象类别。"
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
      "maxItems": 200,
      "description": "过滤条件列表。"
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR",
      "description": "过滤条件组合方式：AND_OR 表示组内 AND、组间 OR；OR_AND 表示组内 OR、组间 AND。"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "排序条件。"
          },
          "asc": {
            "type": "boolean",
            "description": "asc 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "additionalProperties": true
      },
      "description": "排序条件。"
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

中文说明：查询列表Req 需求管理的IPD工时分类。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 否 | `string` |  | 展示值。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "display_value": {
      "type": "string",
      "maxLength": 30,
      "description": "展示值。"
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

中文说明：查询列表Req 需求管理的IPD工时。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_pi` | 否 | `array` |  | PI 计划。 |
| `plan_iteration` | 否 | `array` |  | 计划迭代。 |
| `workitem_id` | 否 | `array` |  | 工作项 ID。IPD 工时或查询条件中用于定位具体工作项。 |
| `created_by` | 否 | `array` |  | 创建人用户 ID 列表。用于按工时记录创建人过滤。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_pi": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "PI 计划。"
    },
    "plan_iteration": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "计划迭代。"
    },
    "workitem_id": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "工作项 ID。IPD 工时或查询条件中用于定位具体工作项。"
    },
    "created_by": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "创建人用户 ID 列表。用于按工时记录创建人过滤。"
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

中文说明：查询列表Req 需求管理的IPD工作流字段。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `unknown` |  | 分类 ID。用于查询某类 IPD 字段、状态或工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category_id": {
      "$ref": "#/properties/project_id",
      "description": "分类 ID。用于查询某类 IPD 字段、状态或工作流配置。"
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

中文说明：查询列表Req 需求管理的IPD工作流模板。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 否 | `unknown` |  | 分类 ID。用于查询某类 IPD 字段、状态或工作流配置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "category_id": {
      "$ref": "#/properties/project_id",
      "description": "分类 ID。用于查询某类 IPD 字段、状态或工作流配置。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `program_id` | 是 | `string` |  | 项目空间/需求池 ID。用于定位 IR/RR 所属空间。 |
| `ir_id` | 是 | `unknown` |  | IR ID。用于定位需求池中的原始需求。 |
| `query_type` | 是 | `string` |  | 查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "program_id": {
      "type": "string",
      "minLength": 1,
      "description": "项目空间/需求池 ID。用于定位 IR/RR 所属空间。"
    },
    "ir_id": {
      "$ref": "#/properties/program_id",
      "description": "IR ID。用于定位需求池中的原始需求。"
    },
    "query_type": {
      "type": "string",
      "enum": [
        "RR",
        "ITEMS"
      ],
      "description": "查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。"
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

中文说明：查询列表Req 需求管理的irhistories。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `ir_id` | 是 | `string` |  | IR ID。用于定位需求池中的原始需求。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "ir_id": {
      "type": "string",
      "minLength": 1,
      "description": "IR ID。用于定位需求池中的原始需求。"
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

中文说明：查询列表Req 需求管理的工作项severities。

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

中文说明：查询列表Req 需求管理的迭代状态statistics。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `tracker_id` | 否 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `type` | 否 | `string` | "board" | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |
| `region` | 否 | `string` |  | 华为云区域标识，例如 cn-north-4。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "board",
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    },
    "region": {
      "type": "string",
      "minLength": 1,
      "description": "华为云区域标识，例如 cn-north-4。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_optional_work_item_status_configs

中文说明：查询列表Req 需求管理的可选工作项状态配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `subject` | 否 | `string` |  | 标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "subject": {
      "type": "string",
      "description": "标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `subject` | 否 | `string` |  | 标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。 |
| `show_type` | 否 | `string` | "list" | 展示方式：list=列表，tree=树形。 |
| `tracker_id` | 否 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "subject": {
      "type": "string",
      "description": "标题/主题关键字。用于按工作项标题或主题过滤可添加/已关联工作项。"
    },
    "show_type": {
      "type": "string",
      "enum": [
        "list",
        "tree"
      ],
      "default": "list",
      "description": "展示方式：list=列表，tree=树形。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |
| `plan_id` | 否 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `user_ids` | 否 | `array` |  | 用户 ID 列表。用于批量成员、权限或过滤操作。 |
| `sort` | 否 | `string` |  | 排序条件。 |
| `type` | 否 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "search": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "用户 ID 列表。用于批量成员、权限或过滤操作。"
    },
    "sort": {
      "type": "string",
      "description": "排序条件。"
    },
    "type": {
      "type": "string",
      "enum": [
        "gantt",
        "mind"
      ],
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
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

中文说明：查询列表Req 需求管理的program字段。

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
| `program_id` | 是 | `string` |  | 项目空间/需求池 ID。用于定位 IR/RR 所属空间。 |
| `field_type` | 是 | `string` |  | 需求池字段类型：IR=原始需求字段，RR=研发需求字段。 |

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
      "minLength": 1,
      "description": "项目空间/需求池 ID。用于定位 IR/RR 所属空间。"
    },
    "field_type": {
      "type": "string",
      "enum": [
        "IR",
        "RR"
      ],
      "description": "需求池字段类型：IR=原始需求字段，RR=研发需求字段。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_key` | 否 | `string` |  | 排序字段：name=名称，created_time=创建时间。 |
| `sort_dir` | 否 | `string` |  | 排序方向：ASC/asc=升序，DESC/desc=降序。 |
| `is_watched` | 否 | `boolean` |  | 是否watched。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_key": {
      "type": "string",
      "enum": [
        "name",
        "created_time"
      ],
      "description": "排序字段：name=名称，created_time=创建时间。"
    },
    "sort_dir": {
      "type": "string",
      "enum": [
        "ASC",
        "DESC",
        "asc",
        "desc"
      ],
      "description": "排序方向：ASC/asc=升序，DESC/desc=降序。"
    },
    "is_watched": {
      "type": "boolean",
      "description": "是否watched。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_bug_statistics

中文说明：查询列表Req 需求管理的项目缺陷统计。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的项目需求统计。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的项目模块。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的项目工时types。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status` | 否 | `number` |  | 状态值。Scrum 迭代状态可取 "0"、"1"、"2"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "status": {
      "type": "number",
      "enum": [
        1,
        2
      ],
      "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
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

中文说明：查询列表Req 需求管理的项目工时。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_ids` | 是 | `array` |  | project ID 列表，用于批量操作。 |
| `begin_time` | 否 | `string` |  | 开始时间。 |
| `end_time` | 否 | `string` |  | 结束时间。 |
| `work_hours_dates` | 否 | `string` |  | 工时日期过滤条件。 |
| `work_hours_types` | 否 | `string` |  | 工时类型过滤条件。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1,
      "description": "project ID 列表，用于批量操作。"
    },
    "begin_time": {
      "type": "string",
      "minLength": 1,
      "description": "开始时间。"
    },
    "end_time": {
      "type": "string",
      "minLength": 1,
      "description": "结束时间。"
    },
    "work_hours_dates": {
      "type": "string",
      "minLength": 1,
      "description": "工时日期过滤条件。"
    },
    "work_hours_types": {
      "type": "string",
      "minLength": 1,
      "description": "工时类型过滤条件。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `operated_time_interval` | 否 | `string` |  | 操作时间范围。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "operated_time_interval": {
      "type": "string",
      "minLength": 1,
      "description": "操作时间范围。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `organization_id` | 否 | `string` |  | 组织 ID。用于查询组织级规则类型或项目列表。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "organization_id": {
      "type": "string",
      "minLength": 1,
      "description": "组织 ID。用于查询组织级规则类型或项目列表。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_related_users

中文说明：查询列表Req 需求管理的相关用户。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的rrhistories。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `rr_id` | 是 | `string` |  | RR ID。用于定位需求池中的研发需求。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "rr_id": {
      "type": "string",
      "minLength": 1,
      "description": "RR ID。用于定位需求池中的研发需求。"
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
| `program_id` | 是 | `string` |  | 项目空间/需求池 ID。用于定位 IR/RR 所属空间。 |
| `rr_ids` | 是 | `array` |  | RR ID 列表。用于批量查询 RR 状态。 |

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
      "minLength": 1,
      "description": "项目空间/需求池 ID。用于定位 IR/RR 所属空间。"
    },
    "rr_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/program_id"
      },
      "minItems": 1,
      "maxItems": 100,
      "description": "RR ID 列表。用于批量查询 RR 状态。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `program_id` | 是 | `string` |  | 项目空间/需求池 ID。用于定位 IR/RR 所属空间。 |
| `query_type` | 否 | `string` | "ALL" | 查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。 |
| `include_deleted` | 否 | `boolean` |  | 是否包含已删除数据：true=包含，false=不包含。 |
| `updated_time_interval` | 否 | `string` |  | 更新时间范围。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "program_id": {
      "type": "string",
      "minLength": 1,
      "description": "项目空间/需求池 ID。用于定位 IR/RR 所属空间。"
    },
    "query_type": {
      "type": "string",
      "enum": [
        "ALL",
        "DST",
        "SRC"
      ],
      "default": "ALL",
      "description": "查询类型。常见取值：IR 子项查询 RR=研发需求、ITEMS=条目；RR 列表查询 ALL=全部、DST=目标、SRC=来源；子工作项查询 basic/custom/query。"
    },
    "include_deleted": {
      "type": "boolean",
      "description": "是否包含已删除数据：true=包含，false=不包含。"
    },
    "updated_time_interval": {
      "type": "string",
      "minLength": 1,
      "description": "更新时间范围。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：查询列表Req 需求管理的工作项自定义字段。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 否 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `journalized_type` | 否 | `string` | "Issue" | journalized type 类型。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "journalized_type": {
      "type": "string",
      "minLength": 1,
      "default": "Issue",
      "description": "journalized type 类型。"
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

中文说明：查询列表Req 需求管理的工作项状态属性。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Req 需求管理的工作项标签。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
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

中文说明：查询列表Req 需求管理的工作项模板。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 否 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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

中文说明：查询列表Req 需求管理的工作项处理人配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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

中文说明：查询列表Req 需求管理的工作项树形数据。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_ids` | 否 | `array` |  | Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
      "minItems": 1,
      "description": "Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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

中文说明：查询列表Req 需求管理的工作项工时。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
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

中文说明：查询列表Req 需求管理的工作项工作流配置。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `number` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tracker_id": {
      "type": "number",
      "enum": [
        2,
        3,
        5,
        6,
        7
      ],
      "description": "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询Req 需求管理的迭代immovable工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `version_id` | 是 | `unknown` |  | 版本/迭代 ID。用于查询不可移动工作项等版本相关数据。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "version_id": {
      "$ref": "#/properties/project_id",
      "description": "版本/迭代 ID。用于查询不可移动工作项等版本相关数据。"
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

中文说明：流转Req 需求管理的IPD工作项流程。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `issue_category` | 是 | `string` |  | IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。 |
| `flow_code` | 是 | `string` |  | 流程流转编码，表示要执行的状态流转动作。 |
| `process_context` | 否 | `object` |  | 流程流转上下文，按工作流要求传入。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1,
      "description": "IPD 工作项分类。用于指定需求、缺陷、任务等分类编码。"
    },
    "flow_code": {
      "type": "string",
      "minLength": 1,
      "description": "流程流转编码，表示要执行的状态流转动作。"
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {},
      "description": "流程流转上下文，按工作流要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Req 需求管理的缓存数据。

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

中文说明：更新Req 需求管理的IPD特性集。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `feature_set_id` | 是 | `unknown` |  | IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `title` | 否 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `position_float` | 否 | `number` |  | 排序位置值。用于调整 IPD 特性集或树节点的展示顺序。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 特性集 ID。用于定位、更新、删除或查询特性集快照。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "position_float": {
      "type": "number",
      "description": "排序位置值。用于调整 IPD 特性集或树节点的展示顺序。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Req 需求管理的IPD标签。

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

中文说明：更新Req 需求管理的IPD模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 是 | `string` |  | 展示名称或显示值。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `assignee` | 否 | `unknown` |  | 责任人信息或责任人 ID，格式以对应 IPD 接口为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `module_id` | 是 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30,
      "description": "展示名称或显示值。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "description": {
      "type": "string",
      "maxLength": 255,
      "description": "对象的详细描述或备注信息。"
    },
    "assignee": {
      "$ref": "#/properties/project_id",
      "description": "责任人信息或责任人 ID，格式以对应 IPD 接口为准。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
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

中文说明：更新Req 需求管理的IPD项目字段。

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

中文说明：更新Req 需求管理的IPDtenant字段。

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

中文说明：更新Req 需求管理的IPD工时。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `begin_time` | 否 | `string` |  | 开始时间。 |
| `end_time` | 否 | `string` |  | 结束时间。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `status` | 否 | `string` |  | 状态值。Scrum 迭代状态可取 "0"、"1"、"2"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。 |
| `over_type` | 否 | `string` |  | over type 类型。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "begin_time": {
      "type": "string",
      "minLength": 1,
      "description": "开始时间。"
    },
    "end_time": {
      "type": "string",
      "minLength": 1,
      "description": "结束时间。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "status": {
      "type": "string",
      "enum": [
        "0",
        "1",
        "2"
      ],
      "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
    },
    "over_type": {
      "type": "string",
      "minLength": 1,
      "description": "over type 类型。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `unknown` |  | 迭代唯一标识。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `status` | 是 | `string` |  | 状态值。Scrum 迭代状态可取 "0"、"1"、"2"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。 |
| `due_date` | 否 | `string` |  | 计划完成或截止日期。 |
| `start_date` | 否 | `string` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "status": {
      "type": "string",
      "enum": [
        "0",
        "1",
        "2"
      ],
      "description": "状态值。Scrum 迭代状态可取 \"0\"、\"1\"、\"2\"；工作项状态常见映射为 1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝；具体以项目状态配置为准。"
    },
    "due_date": {
      "type": "string",
      "minLength": 1,
      "description": "计划完成或截止日期。"
    },
    "start_date": {
      "type": "string",
      "minLength": 1,
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |
| `img_url` | 是 | `string` |  | 图片 URL。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
    },
    "img_url": {
      "type": "string",
      "minLength": 1,
      "description": "图片 URL。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_id` | 是 | `unknown` |  | 用户 ID。用于定位项目成员、操作者或需要授权的用户。 |
| `role_id` | 是 | `number` |  | 项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "user_id": {
      "$ref": "#/properties/project_id",
      "description": "用户 ID。用于定位项目成员、操作者或需要授权的用户。"
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
      ],
      "description": "项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Req 需求管理的项目模块。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `module_name` | 是 | `string` |  | 模块名称。用于创建或更新项目模块。 |
| `owner_user_id` | 是 | `unknown` |  | 模块负责人用户 ID。创建或更新项目模块时指定负责人。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30,
      "description": "模块名称。用于创建或更新项目模块。"
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id",
      "description": "模块负责人用户 ID。创建或更新项目模块时指定负责人。"
    },
    "description": {
      "type": "string",
      "maxLength": 255,
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `title` | 否 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `work_item_type` | 否 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `iteration_id` | 否 | `unknown` |  | 迭代唯一标识。 |
| `module_id` | 否 | `unknown` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。 |
| `assigned_id` | 否 | `unknown` |  | 关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。 |
| `developer_id` | 否 | `unknown` |  | 开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。 |
| `done_ratio` | 否 | `integer` |  | 完成度百分比，用于表示工作项当前完成进度。 |
| `expected_work_hours` | 否 | `integer` |  | 预计工时，用于记录计划投入的工作小时数。 |
| `start_date` | 否 | `integer` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `due_date` | 否 | `integer` |  | 计划完成或截止日期。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1,
      "description": "工作项类型，会映射为 Scrum tracker_id：task/\"2\"=Task/任务，bug/\"3\"=Bug/缺陷，epic/\"5\"=Epic，feature/\"6\"=Feature，story/\"7\"=Story。"2\"、\"3\"、\"5\"、\"6\"、\"7\"。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id",
      "description": "迭代唯一标识。"
    },
    "module_id": {
      "$ref": "#/properties/project_id",
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "严重程度 ID。通常用于缺陷或问题等级；可通过 `req_list_issue_severities` 查询当前可用严重程度。"
    },
    "assigned_id": {
      "$ref": "#/properties/project_id",
      "description": "关联责任人用户 ID。创建或更新工作项时传入该字段即可指定责任人；可先调用 `req_list_project_members` 获取项目成员用户 ID。"
    },
    "developer_id": {
      "$ref": "#/properties/project_id",
      "description": "开发人员用户数字 ID。创建或更新工作项时传入该字段即可指定开发人员；可通过项目成员列表获取用户信息，官方字段为 developer_id。"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0,
      "description": "完成度百分比，用于表示工作项当前完成进度。"
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0,
      "description": "预计工时，用于记录计划投入的工作小时数。"
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "计划完成或截止日期。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `comment_id` | 是 | `unknown` |  | 评论 ID。用于更新指定工作项评论。 |
| `content` | 是 | `string` |  | 规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "comment_id": {
      "$ref": "#/properties/project_id",
      "description": "评论 ID。用于更新指定工作项评论。"
    },
    "content": {
      "type": "string",
      "minLength": 1,
      "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `status_id` | 是 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。用于更新工作项状态或按状态过滤；状态 ID 也可通过状态配置/工作流接口查询。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `unknown` |  | 工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。 |
| `file_path` | 是 | `string` |  | 本地文件路径，用于上传附件或图片。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "work_item_id": {
      "$ref": "#/properties/project_id",
      "description": "工作项 ID。用于定位 Scrum 工作项、评论、附件、流转或关联资源。"
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "description": "本地文件路径，用于上传附件或图片。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：上传Req 需求管理的IPD 工作项附件。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `file_path` | 是 | `string` |  | 本地文件路径，用于上传附件或图片。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "description": "本地文件路径，用于上传附件或图片。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：上传Req 需求管理的IPD 工作项图片。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `unknown` |  | IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。 |
| `file_path` | 是 | `string` |  | 本地文件路径，用于上传附件或图片。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "issue_id": {
      "$ref": "#/properties/project_id",
      "description": "IPD 工作项 ID。用于定位 IPD 需求、缺陷或任务。"
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "description": "本地文件路径，用于上传附件或图片。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `file_path` | 是 | `string` |  | 本地文件路径，用于上传附件或图片。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "description": "本地文件路径，用于上传附件或图片。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：校验Req 需求管理的模块name。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_name` | 是 | `string` |  | 模块名称。用于创建或更新项目模块。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30,
      "description": "模块名称。用于创建或更新项目模块。"
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
| `repo_close_merge_request` | 关闭Repo 代码仓的合并请求。 |
| `repo_compare_refs` | 处理Repo 代码仓的refs。 |
| `repo_create_merge_request` | 创建Repo 代码仓的合并请求。 |
| `repo_create_merge_request_discussion` | 创建Repo 代码仓的合并请求讨论。 |
| `repo_create_repository` | 创建Repo 代码仓的仓库。 |
| `repo_create_tag` | 创建Repo 代码仓的标签。 |
| `repo_delete_tag` | 删除Repo 代码仓的标签。 |
| `repo_get_branch` | 获取Repo 代码仓的分支。 |
| `repo_get_commit` | 获取Repo 代码仓的提交。 |
| `repo_get_file` | 获取Repo 代码仓的文件。 |
| `repo_get_merge_request` | 获取Repo 代码仓的合并请求。 |
| `repo_get_repository` | 获取Repo 代码仓的仓库。 |
| `repo_get_tag` | 获取Repo 代码仓的标签。 |
| `repo_list_branches` | 查询列表Repo 代码仓的分支。 |
| `repo_list_commits` | 查询列表Repo 代码仓的提交。 |
| `repo_list_events` | 查询列表Repo 代码仓的事件。 |
| `repo_list_merge_request_changes` | 查询列表Repo 代码仓的合并请求changes。 |
| `repo_list_merge_request_discussions` | 查询列表Repo 代码仓的合并请求讨论。 |
| `repo_list_merge_requests` | 查询列表Repo 代码仓的合并请求。 |
| `repo_list_protected_branches` | 查询列表Repo 代码仓的保护分支。 |
| `repo_list_repositories` | 查询列表Repo 代码仓的仓库。 |
| `repo_list_repository_labels` | 查询列表Repo 代码仓的仓库标签。 |
| `repo_list_tags` | 查询列表Repo 代码仓的标签。 |
| `repo_merge_merge_request` | 合并Repo 代码仓的合并请求。 |
| `repo_review_merge_request` | 评审Repo 代码仓的合并请求。 |

### repo_close_merge_request

中文说明：关闭Repo 代码仓的合并请求。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：处理Repo 代码仓的refs。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `from` | 是 | `string` |  | 起始引用。Repo 比较接口中表示源分支、标签或提交。 |
| `to` | 是 | `string` |  | 目标引用。Repo 比较接口中表示目标分支、标签或提交。 |
| `straight` | 否 | `boolean` |  | 是否直线比较。用于 Repo ref 比较接口控制比较方式。 |
| `ignore_whitespace_change` | 否 | `boolean` |  | 是否忽略空白字符变更。 |
| `view` | 否 | `string` |  | 差异展示视图。用于 Repo 比较接口选择返回格式。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "from": {
      "type": "string",
      "minLength": 1,
      "description": "起始引用。Repo 比较接口中表示源分支、标签或提交。"
    },
    "to": {
      "type": "string",
      "minLength": 1,
      "description": "目标引用。Repo 比较接口中表示目标分支、标签或提交。"
    },
    "straight": {
      "type": "boolean",
      "description": "是否直线比较。用于 Repo ref 比较接口控制比较方式。"
    },
    "ignore_whitespace_change": {
      "type": "boolean",
      "description": "是否忽略空白字符变更。"
    },
    "view": {
      "type": "string",
      "minLength": 1,
      "description": "差异展示视图。用于 Repo 比较接口选择返回格式。"
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

中文说明：创建Repo 代码仓的合并请求。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `source_branch` | 是 | `string` |  | 源分支。创建合并请求时作为变更来源。 |
| `target_branch` | 是 | `string` |  | 目标分支。创建合并请求时作为合并目标。 |
| `title` | 是 | `string` |  | 标题。用于工作项、需求、合并请求、标签等资源的展示名称。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "source_branch": {
      "type": "string",
      "minLength": 1,
      "description": "源分支。创建合并请求时作为变更来源。"
    },
    "target_branch": {
      "type": "string",
      "minLength": 1,
      "description": "目标分支。创建合并请求时作为合并目标。"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "description": "标题。用于工作项、需求、合并请求、标签等资源的展示名称。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Repo 代码仓的合并请求讨论。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |
| `body` | 是 | `string` |  | 请求体对象，用于透传该接口的扩展参数。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
    },
    "body": {
      "type": "string",
      "minLength": 1,
      "description": "请求体对象，用于透传该接口的扩展参数。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_uuid` | 是 | `string` |  | 项目 UUID。创建仓库等资源时用于定位 CodeArts 项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `import_members` | 否 | `integer` |  | 是否导入成员。创建仓库时控制是否导入项目成员。 |
| `template_id` | 否 | `string` |  | 模板 ID。用于按模板创建部署任务、应用或查询模板详情。 |
| `visibility_level` | 否 | `number` |  | 仓库可见级别：0=私有，20=公开/项目内可见（以 CodeArts Repo 租户配置为准）。 |
| `import_url` | 否 | `string` |  | 导入仓库 URL。创建仓库时可从外部仓库导入。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `gitignore_id` | 否 | `string` |  | gitignore 模板 ID。创建仓库时用于初始化忽略规则。 |
| `license_id` | 否 | `integer` |  | 许可证模板 ID。创建仓库时用于初始化许可证。 |
| `enable_readme` | 否 | `boolean \| integer` |  | 是否初始化 README：true/1=创建 README，false/0=不创建。 |
| `caller` | 否 | `string` |  | 调用来源标识。创建 Repo 仓库时用于标记调用方。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "项目 UUID。创建仓库等资源时用于定位 CodeArts 项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "pattern": "^[A-Za-z][A-Za-z0-9_-]*$",
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "import_members": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
      "description": "是否导入成员。创建仓库时控制是否导入项目成员。"
    },
    "template_id": {
      "type": "string",
      "minLength": 1,
      "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
    },
    "visibility_level": {
      "type": "number",
      "enum": [
        0,
        20
      ],
      "description": "仓库可见级别：0=私有，20=公开/项目内可见（以 CodeArts Repo 租户配置为准）。"
    },
    "import_url": {
      "type": "string",
      "minLength": 1,
      "description": "导入仓库 URL。创建仓库时可从外部仓库导入。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "gitignore_id": {
      "type": "string",
      "minLength": 1,
      "description": "gitignore 模板 ID。创建仓库时用于初始化忽略规则。"
    },
    "license_id": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "许可证模板 ID。创建仓库时用于初始化许可证。"
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
      ],
      "description": "是否初始化 README：true/1=创建 README，false/0=不创建。"
    },
    "caller": {
      "type": "string",
      "minLength": 1,
      "description": "调用来源标识。创建 Repo 仓库时用于标记调用方。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Repo 代码仓的标签。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `tag_name` | 是 | `string` |  | 标签名称。用于创建、查询或删除 Repo 标签。 |
| `ref` | 是 | `string` |  | 代码引用。可以是分支、标签或提交 SHA，用于创建标签或定位代码版本。 |
| `message` | 否 | `string` |  | 标签或提交说明。创建标签等操作时作为描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "tag_name": {
      "type": "string",
      "minLength": 1,
      "description": "标签名称。用于创建、查询或删除 Repo 标签。"
    },
    "ref": {
      "type": "string",
      "minLength": 1,
      "description": "代码引用。可以是分支、标签或提交 SHA，用于创建标签或定位代码版本。"
    },
    "message": {
      "type": "string",
      "description": "标签或提交说明。创建标签等操作时作为描述信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Repo 代码仓的标签。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `tag_name` | 是 | `string` |  | 标签名称。用于创建、查询或删除 Repo 标签。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "tag_name": {
      "type": "string",
      "minLength": 1,
      "description": "标签名称。用于创建、查询或删除 Repo 标签。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：获取Repo 代码仓的分支。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `branch_name` | 是 | `string` |  | 分支名称。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "branch_name": {
      "type": "string",
      "minLength": 1,
      "description": "分支名称。"
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

中文说明：获取Repo 代码仓的提交。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `commit_sha` | 是 | `unknown` |  | 提交 SHA。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "commit_sha": {
      "$ref": "#/properties/repository_id",
      "description": "提交 SHA。"
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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `file_path` | 是 | `string` |  | 本地文件路径，用于上传附件或图片。 |
| `branch` | 是 | `string` |  | 分支名，用于指定代码、构建或流水线运行分支。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "description": "本地文件路径，用于上传附件或图片。"
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "description": "分支名，用于指定代码、构建或流水线运行分支。"
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

中文说明：获取Repo 代码仓的合并请求。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：获取Repo 代码仓的标签。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `tag_name` | 是 | `string` |  | 标签名称。用于创建、查询或删除 Repo 标签。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "tag_name": {
      "type": "string",
      "minLength": 1,
      "description": "标签名称。用于创建、查询或删除 Repo 标签。"
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

中文说明：查询列表Repo 代码仓的分支。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：查询列表Repo 代码仓的提交。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `ref_name` | 否 | `string` |  | ref name 名称。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "ref_name": {
      "type": "string",
      "description": "ref name 名称。"
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

中文说明：查询列表Repo 代码仓的事件。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：查询列表Repo 代码仓的合并请求changes。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
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

中文说明：查询列表Repo 代码仓的合并请求讨论。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
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

中文说明：查询列表Repo 代码仓的合并请求。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `state` | 否 | `string` |  | 合并请求状态过滤：all=全部，opened=开启中，closed=已关闭，merged=已合并。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "state": {
      "type": "string",
      "enum": [
        "all",
        "opened",
        "closed",
        "merged"
      ],
      "description": "合并请求状态过滤：all=全部，opened=开启中，closed=已关闭，merged=已合并。"
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

中文说明：查询列表Repo 代码仓的保护分支。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Repo 代码仓的仓库标签。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：查询列表Repo 代码仓的标签。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：合并Repo 代码仓的合并请求。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |
| `squash` | 否 | `boolean` |  | 是否压缩提交后合并 MR。 |
| `force_merge` | 否 | `boolean` |  | 是否强制合并 MR。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
    },
    "squash": {
      "type": "boolean",
      "description": "是否压缩提交后合并 MR。"
    },
    "force_merge": {
      "type": "boolean",
      "description": "是否强制合并 MR。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：评审Repo 代码仓的合并请求。

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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |
| `merge_request_iid` | 是 | `unknown` |  | 合并请求 IID。用于定位仓库内的某个 MR。 |
| `action_type` | 是 | `string` |  | 合并请求评审动作：approve=通过，reject=驳回，reset=重置评审状态。 |
| `approver_comment` | 否 | `string` |  | 评审意见。审批或驳回合并请求时填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id",
      "description": "合并请求 IID。用于定位仓库内的某个 MR。"
    },
    "action_type": {
      "type": "string",
      "enum": [
        "approve",
        "reject",
        "reset"
      ],
      "description": "合并请求评审动作：approve=通过，reject=驳回，reset=重置评审状态。"
    },
    "approver_comment": {
      "type": "string",
      "description": "评审意见。审批或驳回合并请求时填写。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `pipeline_approve_run` | 审批通过Pipeline 流水线的run。 |
| `pipeline_bind_variable_groups_to_pipeline` | 绑定Pipeline 流水线的变量分组topipeline。 |
| `pipeline_create_extension_endpoint` | 创建Pipeline 流水线的extension扩展端点。 |
| `pipeline_create_group` | 创建Pipeline 流水线的分组。 |
| `pipeline_create_project_strategy` | 创建Pipeline 流水线的项目策略。 |
| `pipeline_create_rule` | 创建Pipeline 流水线的规则。 |
| `pipeline_create_strategy` | 创建Pipeline 流水线的策略。 |
| `pipeline_create_tag` | 创建Pipeline 流水线的标签。 |
| `pipeline_create_variable_group` | 创建Pipeline 流水线的变量分组。 |
| `pipeline_delete_extension_endpoint` | 删除Pipeline 流水线的extension扩展端点。 |
| `pipeline_delete_group` | 删除Pipeline 流水线的分组。 |
| `pipeline_delete_pipeline` | 删除Pipeline 流水线的pipeline。 |
| `pipeline_delete_project_strategy` | 删除Pipeline 流水线的项目策略。 |
| `pipeline_delete_rule` | 删除Pipeline 流水线的规则。 |
| `pipeline_delete_strategy` | 删除Pipeline 流水线的策略。 |
| `pipeline_delete_tag` | 删除Pipeline 流水线的标签。 |
| `pipeline_delete_variable_group` | 删除Pipeline 流水线的变量分组。 |
| `pipeline_disable_pipeline` | 停用Pipeline 流水线的pipeline。 |
| `pipeline_enable_pipeline` | 启用Pipeline 流水线的pipeline。 |
| `pipeline_get_extension_endpoint` | 获取Pipeline 流水线的extension扩展端点。 |
| `pipeline_get_extension_module` | 获取Pipeline 流水线的extension模块。 |
| `pipeline_get_manual_review_context` | 获取Pipeline 流水线的manualreviewcontext。 |
| `pipeline_get_pipeline` | 获取Pipeline 流水线的pipeline。 |
| `pipeline_get_plugin_inputs` | 获取Pipeline 流水线的插件inputs。 |
| `pipeline_get_plugin_outputs` | 获取Pipeline 流水线的插件outputs。 |
| `pipeline_get_plugin_version` | 获取Pipeline 流水线的插件版本。 |
| `pipeline_get_project_strategy` | 获取Pipeline 流水线的项目策略。 |
| `pipeline_get_project_strategy_detail` | 获取Pipeline 流水线的项目策略detail。 |
| `pipeline_get_project_strategy_related_info` | 获取Pipeline 流水线的项目策略relatedinfo。 |
| `pipeline_get_rule` | 获取Pipeline 流水线的规则。 |
| `pipeline_get_rule_related_info` | 获取Pipeline 流水线的规则relatedinfo。 |
| `pipeline_get_run` | 获取Pipeline 流水线的run。 |
| `pipeline_get_run_detail` | 获取Pipeline 流水线的rundetail。 |
| `pipeline_get_run_log` | 获取Pipeline 流水线的run日志。 |
| `pipeline_get_run_parameters` | 获取Pipeline 流水线的run参数。 |
| `pipeline_get_step_outputs` | 获取Pipeline 流水线的stepoutputs。 |
| `pipeline_get_strategy` | 获取Pipeline 流水线的策略。 |
| `pipeline_get_strategy_related_info` | 获取Pipeline 流水线的策略relatedinfo。 |
| `pipeline_get_variable_group` | 获取Pipeline 流水线的变量分组。 |
| `pipeline_inherit_project_strategy` | 继承Pipeline 流水线的项目策略。 |
| `pipeline_list_artifacts` | 查询列表Pipeline 流水线的制品。 |
| `pipeline_list_available_publishers` | 查询列表Pipeline 流水线的available发布者。 |
| `pipeline_list_base_plugins` | 查询列表Pipeline 流水线的base插件。 |
| `pipeline_list_base_plugins_paged` | 查询列表Pipeline 流水线的base插件paged。 |
| `pipeline_list_extension_endpoints` | 查询列表Pipeline 流水线的extension扩展端点。 |
| `pipeline_list_extension_modules` | 查询列表Pipeline 流水线的extension模块。 |
| `pipeline_list_groups` | 查询列表Pipeline 流水线的分组。 |
| `pipeline_list_pipeline_variable_groups` | 查询列表Pipeline 流水线的pipeline变量分组。 |
| `pipeline_list_pipelines` | 查询列表Pipeline 流水线的pipelines。 |
| `pipeline_list_plugin_versions` | 查询列表Pipeline 流水线的插件版本。 |
| `pipeline_list_plugins` | 查询列表Pipeline 流水线的插件。 |
| `pipeline_list_project_strategies` | 查询列表Pipeline 流水线的项目策略。 |
| `pipeline_list_publishers` | 查询列表Pipeline 流水线的发布者。 |
| `pipeline_list_rule_types` | 查询列表Pipeline 流水线的规则types。 |
| `pipeline_list_rules` | 查询列表Pipeline 流水线的规则。 |
| `pipeline_list_runs` | 查询列表Pipeline 流水线的runs。 |
| `pipeline_list_stage_plugins` | 查询列表Pipeline 流水线的阶段插件。 |
| `pipeline_list_strategies` | 查询列表Pipeline 流水线的策略。 |
| `pipeline_list_strategy_children` | 查询列表Pipeline 流水线的策略children。 |
| `pipeline_list_tags` | 查询列表Pipeline 流水线的标签。 |
| `pipeline_list_templates` | 查询列表Pipeline 流水线的模板。 |
| `pipeline_list_variable_groups` | 查询列表Pipeline 流水线的变量分组。 |
| `pipeline_move_pipelines_to_group` | 移动Pipeline 流水线的pipelinesto分组。 |
| `pipeline_reject_run` | 审批驳回Pipeline 流水线的run。 |
| `pipeline_retry_run` | 重试Pipeline 流水线的run。 |
| `pipeline_run_pipeline` | 运行Pipeline 流水线的pipeline。 |
| `pipeline_set_tags_for_pipelines` | 设置Pipeline 流水线的标签forpipelines。 |
| `pipeline_stop_run` | 停止Pipeline 流水线的run。 |
| `pipeline_switch_project_strategy` | 切换Pipeline 流水线的项目策略。 |
| `pipeline_switch_strategy` | 切换Pipeline 流水线的策略。 |
| `pipeline_update_extension_endpoint` | 更新Pipeline 流水线的extension扩展端点。 |
| `pipeline_update_group` | 更新Pipeline 流水线的分组。 |
| `pipeline_update_project_strategy` | 更新Pipeline 流水线的项目策略。 |
| `pipeline_update_rule` | 更新Pipeline 流水线的规则。 |
| `pipeline_update_strategy` | 更新Pipeline 流水线的策略。 |
| `pipeline_update_tag` | 更新Pipeline 流水线的标签。 |
| `pipeline_update_variable_group` | 更新Pipeline 流水线的变量分组。 |

### pipeline_approve_run

中文说明：审批通过Pipeline 流水线的run。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `job_id` | 是 | `unknown` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "job_id": {
      "$ref": "#/properties/project_id",
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：绑定Pipeline 流水线的变量分组topipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `pipeline_group_ids` | 是 | `array` |  | pipeline_group ID 列表，用于批量操作。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "pipeline_group_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "pipeline_group ID 列表，用于批量操作。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的extension扩展端点。

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | region name 名称。 |
| `module_id` | 否 | `string` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `url` | 否 | `string` |  | URL 地址。用于扩展端点、导入仓库或第三方服务地址。 |
| `authorization` | 否 | `object` |  | 授权配置。用于扩展端点的认证方式和参数。 |
| `data` | 否 | `unknown` |  | 扩展数据。用于透传扩展端点所需配置。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "region_name": {
      "type": "string",
      "minLength": 1,
      "description": "region name 名称。"
    },
    "module_id": {
      "type": "string",
      "minLength": 1,
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "url": {
      "type": "string",
      "minLength": 1,
      "description": "URL 地址。用于扩展端点、导入仓库或第三方服务地址。"
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {},
          "description": "授权配置。用于扩展端点的认证方式和参数。"
        },
        "scheme": {
          "type": "string",
          "minLength": 1,
          "description": "scheme 参数，按对应 CodeArts API 要求传入。"
        }
      },
      "additionalProperties": false,
      "description": "authorization 参数，按对应 CodeArts API 要求传入。"
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters",
      "description": "扩展数据。用于透传扩展端点所需配置。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_group

中文说明：创建Pipeline 流水线的分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `parent_id` | 否 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `rules` | 是 | `array` |  | 规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id",
            "description": "规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。"
          },
          "is_valid": {
            "type": "boolean",
            "description": "rules 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "rules 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的规则。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `type` | 是 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |
| `layout_content` | 是 | `string` |  | 规则布局内容。创建或更新 Pipeline 规则时用于描述规则表单/布局配置。 |
| `plugin_id` | 否 | `string` |  | 插件 ID。用于定位 Pipeline 插件。 |
| `plugin_name` | 否 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `plugin_version` | 否 | `string` |  | 插件版本。用于定位具体插件版本。 |
| `content` | 是 | `array` |  | 规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    },
    "layout_content": {
      "type": "string",
      "minLength": 1,
      "description": "规则布局内容。创建或更新 Pipeline 规则时用于描述规则表单/布局配置。"
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1,
      "description": "插件 ID。用于定位 Pipeline 插件。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1,
      "description": "插件版本。用于定位具体插件版本。"
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1,
            "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
          },
          "can_modify_when_inherit": {
            "type": "boolean",
            "description": "can modify when inherit 参数，按对应 CodeArts API 要求传入。"
          },
          "editable": {
            "type": "boolean",
            "description": "content 参数，按对应 CodeArts API 要求传入。"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1,
                  "description": "步骤属性配置对象。"
                },
                "type": {
                  "type": "string",
                  "minLength": 1,
                  "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
                },
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
                },
                "operator": {
                  "type": "string",
                  "minLength": 1,
                  "description": "content 参数，按对应 CodeArts API 要求传入。"
                },
                "value": {
                  "type": "string",
                  "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1,
                  "description": "content 参数，按对应 CodeArts API 要求传入。"
                },
                "is_valid": {
                  "type": "boolean",
                  "description": "是否valid。"
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
            "minItems": 1,
            "description": "content 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `rules` | 是 | `array` |  | 规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id",
            "description": "规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。"
          },
          "is_valid": {
            "type": "boolean",
            "description": "rules 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "rules 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `color` | 是 | `string` |  | 颜色值，通常用于标签或展示配置。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "color": {
      "type": "string",
      "minLength": 1,
      "description": "颜色值，通常用于标签或展示配置。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：创建Pipeline 流水线的变量分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `variables` | 否 | `array` |  | 变量列表。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
          },
          "sequence": {
            "type": "integer",
            "description": "变量顺序。"
          },
          "type": {
            "type": "string",
            "minLength": 1,
            "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
          },
          "value": {
            "type": "string",
            "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
          },
          "is_secret": {
            "type": "boolean",
            "description": "变量列表。"
          },
          "description": {
            "type": "string",
            "description": "对象的详细描述或备注信息。"
          }
        },
        "additionalProperties": false
      },
      "description": "变量列表。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的extension扩展端点。

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
| `uuid` | 是 | `string` |  | 扩展端点 UUID。用于定位 Pipeline 扩展端点。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "扩展端点 UUID。用于定位 Pipeline 扩展端点。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `unknown` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "id": {
      "$ref": "#/properties/project_id",
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的pipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的规则。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_id` | 是 | `unknown` |  | 规则 ID。用于定位流水线规则。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则 ID。用于定位流水线规则。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tag_id` | 是 | `unknown` |  | 标签 ID。用于更新、删除或绑定流水线标签。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tag_id": {
      "$ref": "#/properties/project_id",
      "description": "标签 ID。用于更新、删除或绑定流水线标签。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：删除Pipeline 流水线的变量分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `unknown` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "id": {
      "$ref": "#/properties/project_id",
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：停用Pipeline 流水线的pipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：启用Pipeline 流水线的pipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：获取Pipeline 流水线的extension扩展端点。

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
| `uuid` | 是 | `string` |  | 扩展端点 UUID。用于定位 Pipeline 扩展端点。 |

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
      "minLength": 1,
      "description": "扩展端点 UUID。用于定位 Pipeline 扩展端点。"
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

中文说明：获取Pipeline 流水线的extension模块。

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
| `module_id` | 是 | `string` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |

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
      "minLength": 1,
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
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

中文说明：获取Pipeline 流水线的pipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
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

中文说明：获取Pipeline 流水线的插件inputs。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `plugin_name` | 是 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `display_name` | 是 | `string` |  | display name 名称。 |
| `version` | 是 | `string` |  | 接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。 |
| `plugin_attribution` | 是 | `string` |  | 插件归属：official=官方插件，custom=自定义插件。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "display_name": {
      "type": "string",
      "minLength": 1,
      "description": "display name 名称。"
    },
    "version": {
      "type": "string",
      "minLength": 1,
      "description": "接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。"
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ],
      "description": "插件归属：official=官方插件，custom=自定义插件。"
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

中文说明：获取Pipeline 流水线的插件outputs。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `plugin_name` | 是 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `display_name` | 是 | `string` |  | display name 名称。 |
| `version` | 是 | `string` |  | 接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。 |
| `plugin_attribution` | 是 | `string` |  | 插件归属：official=官方插件，custom=自定义插件。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "display_name": {
      "type": "string",
      "minLength": 1,
      "description": "display name 名称。"
    },
    "version": {
      "type": "string",
      "minLength": 1,
      "description": "接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。"
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ],
      "description": "插件归属：official=官方插件，custom=自定义插件。"
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

中文说明：获取Pipeline 流水线的插件版本。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `plugin_name` | 是 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `version` | 是 | `string` |  | 接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "version": {
      "type": "string",
      "minLength": 1,
      "description": "接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。"
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

中文说明：获取Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
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

中文说明：获取Pipeline 流水线的项目策略detail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
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

中文说明：获取Pipeline 流水线的项目策略relatedinfo。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
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

中文说明：获取Pipeline 流水线的规则。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_id` | 是 | `unknown` |  | 规则 ID。用于定位流水线规则。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则 ID。用于定位流水线规则。"
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

中文说明：获取Pipeline 流水线的规则relatedinfo。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_id` | 是 | `unknown` |  | 规则 ID。用于定位流水线规则。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则 ID。用于定位流水线规则。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
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

中文说明：获取Pipeline 流水线的rundetail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `job_id` | 是 | `unknown` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "job_id": {
      "$ref": "#/properties/project_id",
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
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

中文说明：获取Pipeline 流水线的stepoutputs。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `step_run_ids` | 是 | `array` |  | 步骤运行 ID 列表。用于批量查询步骤输出。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "step_run_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "步骤运行 ID 列表。用于批量查询步骤输出。"
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

中文说明：获取Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `cloud_project_id` | 否 | `unknown` |  | 云项目 ID。查询租户级策略或规则时用于限定云项目范围。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id",
      "description": "云项目 ID。查询租户级策略或规则时用于限定云项目范围。"
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

中文说明：获取Pipeline 流水线的策略relatedinfo。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
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

中文说明：获取Pipeline 流水线的变量分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `unknown` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "id": {
      "$ref": "#/properties/project_id",
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
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

中文说明：继承Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `parent_id` | 是 | `unknown` |  | 父级资源 ID。用于创建模块、特性集或树形结构节点。 |
| `rules` | 否 | `array` |  | 规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。 |
| `is_valid` | 是 | `boolean` |  | 是否valid。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "parent_id": {
      "$ref": "#/properties/project_id",
      "description": "父级资源 ID。用于创建模块、特性集或树形结构节点。"
    },
    "rules": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "description": "规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。"
    },
    "is_valid": {
      "type": "boolean",
      "description": "是否valid。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
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

中文说明：查询列表Pipeline 流水线的available发布者。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
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

中文说明：查询列表Pipeline 流水线的base插件。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
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

中文说明：查询列表Pipeline 流水线的base插件paged。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的extension扩展端点。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 是 | `string` |  | region name 名称。 |
| `module_id` | 否 | `string` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "region_name": {
      "type": "string",
      "minLength": 1,
      "description": "region name 名称。"
    },
    "module_id": {
      "type": "string",
      "minLength": 1,
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的extension模块。

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
| `locations` | 是 | `array` |  | 扩展模块位置列表。用于筛选 Pipeline 扩展模块可用位置。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | region name 名称。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `product_line` | 否 | `string` |  | 产品线标识。用于筛选 Pipeline 扩展模块所属产品线。 |
| `tags` | 否 | `array` |  | 标签列表。用于筛选扩展模块、绑定标签或描述资源标签。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minItems": 1,
      "description": "扩展模块位置列表。用于筛选 Pipeline 扩展模块可用位置。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "region_name": {
      "type": "string",
      "minLength": 1,
      "description": "region name 名称。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "product_line": {
      "type": "string",
      "minLength": 1,
      "description": "产品线标识。用于筛选 Pipeline 扩展模块所属产品线。"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "description": "标签列表。用于筛选扩展模块、绑定标签或描述资源标签。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Pipeline 流水线的pipeline变量分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
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

中文说明：查询列表Pipeline 流水线的pipelines。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Pipeline 流水线的插件版本。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `plugin_name` | 是 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的插件。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `plugin_attribution` | 否 | `string` |  | 插件归属：official=官方插件，custom=自定义插件。 |
| `business_type` | 否 | `array` |  | 插件业务类型：Build=构建，Gate=准入/门禁，Deploy=部署，Test=测试，Normal=普通。 |
| `maintainer` | 否 | `string` |  | 维护者。用于按插件维护者筛选 Pipeline 插件。 |
| `plugin_name` | 否 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ],
      "description": "插件归属：official=官方插件，custom=自定义插件。"
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
      },
      "description": "插件业务类型：Build=构建，Gate=准入/门禁，Deploy=部署，Test=测试，Normal=普通。"
    },
    "maintainer": {
      "type": "string",
      "minLength": 1,
      "description": "维护者。用于按插件维护者筛选 Pipeline 插件。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
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

中文说明：查询列表Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `offset` | 是 | `integer` |  | 偏移量。用于分页或日志读取位置。 |
| `limit` | 是 | `integer` |  | 返回数量上限。用于 offset/limit 分页。 |
| `include_tenant_rule_set` | 否 | `boolean` | false | 是否包含tenantruleset。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `is_valid` | 否 | `boolean` |  | 是否valid。 |
| `type` | 否 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": false,
      "description": "是否包含tenantruleset。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "is_valid": {
      "type": "boolean",
      "description": "是否valid。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
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

中文说明：查询列表Pipeline 流水线的发布者。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的规则types。

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
| `organization_id` | 是 | `string` |  | 组织 ID。用于查询组织级规则类型或项目列表。 |

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
      "minLength": 1,
      "description": "组织 ID。用于查询组织级规则类型或项目列表。"
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

中文说明：查询列表Pipeline 流水线的规则。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `offset` | 是 | `integer` |  | 偏移量。用于分页或日志读取位置。 |
| `limit` | 是 | `integer` |  | 返回数量上限。用于 offset/limit 分页。 |
| `cloud_project_id` | 否 | `unknown` |  | 云项目 ID。查询租户级策略或规则时用于限定云项目范围。 |
| `type` | 否 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id",
      "description": "云项目 ID。查询租户级策略或规则时用于限定云项目范围。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
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

中文说明：查询列表Pipeline 流水线的阶段插件。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `use_condition` | 是 | `string` |  | 使用场景条件。用于筛选当前阶段可用插件。 |
| `business_type` | 否 | `array` |  | 插件业务类型：Build=构建，Gate=准入/门禁，Deploy=部署，Test=测试，Normal=普通。 |
| `deploy_type` | 否 | `string` |  | 部署类型。 |
| `comp_extend_type` | 否 | `string` |  | comp extend type 类型。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "use_condition": {
      "type": "string",
      "minLength": 1,
      "description": "使用场景条件。用于筛选当前阶段可用插件。"
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
      },
      "description": "插件业务类型：Build=构建，Gate=准入/门禁，Deploy=部署，Test=测试，Normal=普通。"
    },
    "deploy_type": {
      "type": "string",
      "minLength": 1,
      "description": "部署类型。"
    },
    "comp_extend_type": {
      "type": "string",
      "minLength": 1,
      "description": "comp extend type 类型。"
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

中文说明：查询列表Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `offset` | 是 | `integer` |  | 偏移量。用于分页或日志读取位置。 |
| `limit` | 是 | `integer` |  | 返回数量上限。用于 offset/limit 分页。 |
| `include_tenant_rule_set` | 否 | `boolean` | true | 是否包含tenantruleset。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `is_valid` | 否 | `boolean` |  | 是否valid。 |
| `type` | 否 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": true,
      "description": "是否包含tenantruleset。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "is_valid": {
      "type": "boolean",
      "description": "是否valid。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
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

中文说明：查询列表Pipeline 流水线的策略children。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
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

中文说明：查询列表Pipeline 流水线的标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `proj_id` | 否 | `unknown` |  | 项目 ID。部分 Pipeline 标签接口使用的项目标识别名。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "proj_id": {
      "$ref": "#/properties/project_id",
      "description": "项目 ID。部分 Pipeline 标签接口使用的项目标识别名。"
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

中文说明：查询列表Pipeline 流水线的模板。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `language` | 否 | `string` |  | 语言类型。 |
| `is_system` | 否 | `boolean` |  | 是否system。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "language": {
      "type": "string",
      "description": "语言类型。"
    },
    "is_system": {
      "type": "boolean",
      "description": "是否system。"
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

中文说明：查询列表Pipeline 流水线的变量分组。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
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

中文说明：移动Pipeline 流水线的pipelinesto分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `group_id` | 是 | `unknown` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |
| `pipelines` | 是 | `array` |  | 流水线列表。移动流水线分组时传入流水线 ID 和名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "group_id": {
      "$ref": "#/properties/project_id",
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
    },
    "pipelines": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pipeline_id": {
            "$ref": "#/properties/project_id",
            "description": "流水线列表。移动流水线分组时传入流水线 ID 和名称。"
          },
          "pipeline_name": {
            "type": "string",
            "minLength": 1,
            "description": "pipelines 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "required": [
          "pipeline_id",
          "pipeline_name"
        ],
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "pipelines 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：审批驳回Pipeline 流水线的run。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `job_id` | 是 | `unknown` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "job_id": {
      "$ref": "#/properties/project_id",
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：运行Pipeline 流水线的pipeline。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `unknown` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `branch` | 否 | `string` |  | 分支名，用于指定代码、构建或流水线运行分支。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id",
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "description": "分支名，用于指定代码、构建或流水线运行分支。"
    },
    "description": {
      "type": "string",
      "maxLength": 1024,
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：设置Pipeline 流水线的标签forpipelines。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_ids` | 是 | `array` |  | pipeline ID 列表，用于批量操作。 |
| `tag_ids` | 是 | `array` |  | tag ID 列表，用于批量操作。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "pipeline_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "pipeline ID 列表，用于批量操作。"
    },
    "tag_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "tag ID 列表，用于批量操作。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `pipeline_id` | 是 | `string` |  | 流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。 |
| `run_id` | 是 | `unknown` |  | 流水线运行 ID。用于定位某次流水线执行记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "流水线 ID。用于定位流水线、运行记录、日志、制品或变量组绑定。"
    },
    "run_id": {
      "$ref": "#/properties/pipeline_id",
      "description": "流水线运行 ID。用于定位某次流水线执行记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：切换Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `is_valid` | 是 | `boolean` |  | 是否valid。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "is_valid": {
      "type": "boolean",
      "description": "是否valid。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：切换Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `is_valid` | 是 | `boolean` |  | 是否valid。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "is_valid": {
      "type": "boolean",
      "description": "是否valid。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的extension扩展端点。

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
| `uuid` | 是 | `string` |  | 扩展端点 UUID。用于定位 Pipeline 扩展端点。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | region name 名称。 |
| `module_id` | 否 | `string` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `name` | 否 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `url` | 否 | `string` |  | URL 地址。用于扩展端点、导入仓库或第三方服务地址。 |
| `authorization` | 否 | `object` |  | 授权配置。用于扩展端点的认证方式和参数。 |
| `data` | 否 | `unknown` |  | 扩展数据。用于透传扩展端点所需配置。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "扩展端点 UUID。用于定位 Pipeline 扩展端点。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "region_name": {
      "type": "string",
      "minLength": 1,
      "description": "region name 名称。"
    },
    "module_id": {
      "type": "string",
      "minLength": 1,
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "url": {
      "type": "string",
      "minLength": 1,
      "description": "URL 地址。用于扩展端点、导入仓库或第三方服务地址。"
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {},
          "description": "授权配置。用于扩展端点的认证方式和参数。"
        },
        "scheme": {
          "type": "string",
          "minLength": 1,
          "description": "scheme 参数，按对应 CodeArts API 要求传入。"
        }
      },
      "additionalProperties": false,
      "description": "authorization 参数，按对应 CodeArts API 要求传入。"
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters",
      "description": "扩展数据。用于透传扩展端点所需配置。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `unknown` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "id": {
      "$ref": "#/properties/project_id",
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的项目策略。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `rules` | 是 | `array` |  | 规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id",
            "description": "规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。"
          },
          "is_valid": {
            "type": "boolean",
            "description": "是否valid。"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "rules 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的规则。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_id` | 是 | `unknown` |  | 规则 ID。用于定位流水线规则。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `type` | 是 | `string` |  | 类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。 |
| `plugin_id` | 否 | `string` |  | 插件 ID。用于定位 Pipeline 插件。 |
| `plugin_name` | 否 | `string` |  | 插件名称。用于查询插件版本、输入或输出定义。 |
| `plugin_version` | 否 | `string` |  | 插件版本。用于定位具体插件版本。 |
| `content` | 是 | `array` |  | 规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则 ID。用于定位流水线规则。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1,
      "description": "插件 ID。用于定位 Pipeline 插件。"
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1,
      "description": "插件名称。用于查询插件版本、输入或输出定义。"
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1,
      "description": "插件版本。用于定位具体插件版本。"
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1,
            "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
          },
          "can_modify_when_inherit": {
            "type": "boolean",
            "description": "content 参数，按对应 CodeArts API 要求传入。"
          },
          "editable": {
            "type": "boolean",
            "description": "editable 参数，按对应 CodeArts API 要求传入。"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1,
                  "description": "content 参数，按对应 CodeArts API 要求传入。"
                },
                "type": {
                  "type": "string",
                  "minLength": 1,
                  "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
                },
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
                },
                "operator": {
                  "type": "string",
                  "minLength": 1,
                  "description": "operator 参数，按对应 CodeArts API 要求传入。"
                },
                "value": {
                  "type": "string",
                  "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1,
                  "description": "value type 类型。"
                },
                "is_valid": {
                  "type": "boolean",
                  "description": "content 参数，按对应 CodeArts API 要求传入。"
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
            "minItems": 1,
            "description": "content 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "规则内容配置。创建或更新 Pipeline 规则时描述规则分组、属性和校验条件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的策略。

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
| `domain_id` | 是 | `string` |  | 租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。 |
| `rule_set_id` | 是 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `rules` | 否 | `array` |  | 规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户/组织 ID。用于定位 CodeArts 所属租户或组织范围。"
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id",
            "description": "规则列表。创建或更新策略时用于绑定规则 ID 和启用状态。"
          },
          "is_valid": {
            "type": "boolean",
            "description": "rules 参数，按对应 CodeArts API 要求传入。"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "rules 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的标签。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tag_id` | 是 | `unknown` |  | 标签 ID。用于更新、删除或绑定流水线标签。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `color` | 是 | `string` |  | 颜色值。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "tag_id": {
      "$ref": "#/properties/project_id",
      "description": "标签 ID。用于更新、删除或绑定流水线标签。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "color": {
      "type": "string",
      "minLength": 1,
      "description": "颜色值。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Pipeline 流水线的变量分组。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `unknown` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `variables` | 否 | `array` |  | 变量列表。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "id": {
      "$ref": "#/properties/project_id",
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
          },
          "sequence": {
            "type": "integer",
            "description": "变量顺序。"
          },
          "type": {
            "type": "string",
            "minLength": 1,
            "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
          },
          "value": {
            "type": "string",
            "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
          },
          "is_secret": {
            "type": "boolean",
            "description": "变量列表。"
          },
          "description": {
            "type": "string",
            "description": "对象的详细描述或备注信息。"
          }
        },
        "additionalProperties": false
      },
      "description": "变量列表。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `check_get_metrics` | 获取Check 代码检查的指标。 |
| `check_get_task` | 获取Check 代码检查的任务。 |
| `check_list_rulesets` | 查询列表Check 代码检查的规则集。 |
| `check_list_task_issues` | 查询列表Check 代码检查的任务工作项。 |
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_name` | 是 | `string` |  | 任务名称。创建检查、部署或流水线任务时使用。 |
| `git_url` | 是 | `string` |  | Git 仓库地址。 |
| `git_branch` | 是 | `string` |  | Git 分支。 |
| `language` | 是 | `string` |  | 语言类型。 |
| `rule_set_id` | 否 | `unknown` |  | 规则集 ID。用于定位代码检查或流水线策略规则集。 |
| `task_type` | 否 | `string` |  | 检查任务类型：full=全量检查，incremental=增量检查。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "task_name": {
      "type": "string",
      "minLength": 1,
      "description": "任务名称。创建检查、部署或流水线任务时使用。"
    },
    "git_url": {
      "type": "string",
      "format": "uri",
      "description": "Git 仓库地址。"
    },
    "git_branch": {
      "type": "string",
      "minLength": 1,
      "description": "Git 分支。"
    },
    "language": {
      "type": "string",
      "minLength": 1,
      "description": "语言类型。"
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id",
      "description": "规则集 ID。用于定位代码检查或流水线策略规则集。"
    },
    "task_type": {
      "type": "string",
      "enum": [
        "full",
        "incremental"
      ],
      "description": "检查任务类型：full=全量检查，incremental=增量检查。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：获取Check 代码检查的指标。

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_id` | 是 | `unknown` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "task_id": {
      "$ref": "#/properties/project_id",
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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

中文说明：查询列表Check 代码检查的规则集。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `language` | 否 | `string` |  | 语言类型。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "language": {
      "type": "string",
      "description": "语言类型。"
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

中文说明：查询列表Check 代码检查的任务工作项。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "task_id": {
      "type": "string",
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `testplan_list_issues` | 查询列表TestPlan 测试计划的工作项。 |
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `case_id` | 是 | `unknown` |  | 测试用例 ID。用于定位 TestPlan 中的测试用例。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "case_id": {
      "$ref": "#/properties/project_id",
      "description": "测试用例 ID。用于定位 TestPlan 中的测试用例。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
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

中文说明：查询列表TestPlan 测试计划的工作项。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `unknown` |  | 规划/计划 ID。用于定位 CodeArts Req 中的计划资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "plan_id": {
      "$ref": "#/properties/project_id",
      "description": "规划/计划 ID。用于定位 CodeArts Req 中的计划资源。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `execute_list` | 是 | `array` |  | 执行用例列表。运行测试用例时传入待执行的 case_id 集合。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "execute_list": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "case_id": {
            "$ref": "#/properties/project_id",
            "description": "执行用例列表。运行测试用例时传入待执行的 case_id 集合。"
          }
        },
        "required": [
          "case_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1,
      "description": "execute list 参数，按对应 CodeArts API 要求传入。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `deploy_add_v4_environment_hosts` | 添加Deploy 部署的v4环境主机。 |
| `deploy_cancel_v4_deploy_record` | 取消Deploy 部署的v4deploy记录。 |
| `deploy_create_application` | 创建Deploy 部署的应用。 |
| `deploy_create_environment` | 创建Deploy 部署的环境。 |
| `deploy_create_task_by_template` | 创建Deploy 部署的任务by模板。 |
| `deploy_delete_v4_cluster_hosts` | 删除Deploy 部署的v4集群主机。 |
| `deploy_delete_v4_environment_hosts` | 删除Deploy 部署的v4环境主机。 |
| `deploy_get_app` | 获取Deploy 部署的应用。 |
| `deploy_get_app_log` | 获取Deploy 部署的应用日志。 |
| `deploy_get_deploy_source_detail` | 获取Deploy 部署的deploy来源detail。 |
| `deploy_get_execution_params` | 获取Deploy 部署的executionparams。 |
| `deploy_get_history_detail` | 获取Deploy 部署的historydetail。 |
| `deploy_get_host_group` | 获取Deploy 部署的主机分组。 |
| `deploy_get_last_record_detail` | 获取Deploy 部署的last记录detail。 |
| `deploy_get_runtime_variables` | 获取Deploy 部署的运行时变量。 |
| `deploy_get_status` | 获取Deploy 部署的状态。 |
| `deploy_get_task` | 获取Deploy 部署的任务。 |
| `deploy_get_template_detail` | 获取Deploy 部署的模板detail。 |
| `deploy_get_v4_cluster` | 获取Deploy 部署的v4集群。 |
| `deploy_get_v4_cluster_count` | 获取Deploy 部署的v4集群count。 |
| `deploy_get_v4_cluster_host` | 获取Deploy 部署的v4集群主机。 |
| `deploy_get_v4_deploy_record` | 获取Deploy 部署的v4deploy记录。 |
| `deploy_get_v4_deploy_record_step_detail` | 获取Deploy 部署的v4deploy记录stepdetail。 |
| `deploy_get_v4_deploy_record_step_logs` | 获取Deploy 部署的v4deploy记录step日志。 |
| `deploy_get_v4_environment` | 获取Deploy 部署的v4环境。 |
| `deploy_get_v4_environment_resource_detail` | 获取Deploy 部署的v4环境resourcedetail。 |
| `deploy_import_hosts_to_environment` | 导入Deploy 部署的主机to环境。 |
| `deploy_list_app_host_groups` | 查询列表Deploy 部署的应用主机分组。 |
| `deploy_list_app_operations_log` | 查询列表Deploy 部署的应用operations日志。 |
| `deploy_list_apps` | 查询列表Deploy 部署的应用。 |
| `deploy_list_deployment_units` | 查询列表Deploy 部署的deployment单元。 |
| `deploy_list_environment_hosts` | 查询列表Deploy 部署的环境主机。 |
| `deploy_list_environments` | 查询列表Deploy 部署的环境。 |
| `deploy_list_histories` | 查询列表Deploy 部署的histories。 |
| `deploy_list_host_group_environments` | 查询列表Deploy 部署的主机分组环境。 |
| `deploy_list_host_group_hosts` | 查询列表Deploy 部署的主机分组主机。 |
| `deploy_list_host_groups` | 查询列表Deploy 部署的主机分组。 |
| `deploy_list_system_configs` | 查询列表Deploy 部署的system配置。 |
| `deploy_list_tasks` | 查询列表Deploy 部署的任务。 |
| `deploy_list_v4_applications` | 查询列表Deploy 部署的v4应用。 |
| `deploy_list_v4_cluster_hosts` | 查询列表Deploy 部署的v4集群主机。 |
| `deploy_list_v4_clusters` | 查询列表Deploy 部署的v4集群。 |
| `deploy_list_v4_deploy_records` | 查询列表Deploy 部署的v4deploy记录。 |
| `deploy_list_v4_environment_applications` | 查询列表Deploy 部署的v4环境应用。 |
| `deploy_list_v4_environment_hosts` | 查询列表Deploy 部署的v4环境主机。 |
| `deploy_list_v4_environments` | 查询列表Deploy 部署的v4环境。 |
| `deploy_list_v4_orchestrations` | 查询列表Deploy 部署的v4编排。 |
| `deploy_list_variable_history` | 查询列表Deploy 部署的变量history。 |
| `deploy_list_variables` | 查询列表Deploy 部署的变量。 |
| `deploy_modify_application` | 修改Deploy 部署的应用。 |
| `deploy_pass_v4_manual_check` | 通过Deploy 部署的v4manualcheck。 |
| `deploy_query_variables` | 查询Deploy 部署的变量。 |
| `deploy_refuse_v4_manual_check` | 拒绝Deploy 部署的v4manualcheck。 |
| `deploy_rerun_v4_deploy_record` | 重新运行Deploy 部署的v4deploy记录。 |
| `deploy_retry_v4_deploy_record` | 重试Deploy 部署的v4deploy记录。 |
| `deploy_rollback_app` | 回滚Deploy 部署的应用。 |
| `deploy_rollback_v4_deploy_record` | 回滚Deploy 部署的v4deploy记录。 |
| `deploy_start_app` | 启动Deploy 部署的应用。 |
| `deploy_stop_app` | 停止Deploy 部署的应用。 |

### deploy_add_v4_environment_hosts

中文说明：添加Deploy 部署的v4环境主机。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |
| `cluster_id` | 是 | `unknown` |  | 集群 ID。用于定位 Deploy v4 主机或容器集群。 |
| `host_ids` | 是 | `array` |  | 主机 ID 列表。用于批量添加或移除环境/集群主机。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id",
      "description": "集群 ID。用于定位 Deploy v4 主机或容器集群。"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "主机 ID 列表。用于批量添加或移除环境/集群主机。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：取消Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` | "" | 对象的详细描述或备注信息。 |
| `timeout` | 否 | `number | null` | 超时时间。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 触发器配置。 |
| `slave_cluster_id` | 否 | `string` | "" | 从属集群 ID。 |
| `slave_resource_type` | 否 | `string` | "" | 从属资源类型。 |
| `create_type` | 否 | `string` | "template" | 创建方式，例如 template 表示按模板创建。 |
| `is_draft` | 否 | `boolean` | false | 是否保存为草稿。 |
| `group_id` | 否 | `string` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |
| `agency_urn` | 否 | `string` |  | 委托 URN。 |
| `arrange_infos` | 是 | `array` |  | 部署编排信息列表，用于描述模板和操作组合。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "default": "",
      "description": "对象的详细描述或备注信息。"
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ],
      "description": "超时时间。"
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0",
          "description": "部署启动来源：0 或 \"0\" 表示普通/手动触发，1 或 \"1\" 表示流水线等外部触发；具体来源以 Deploy 返回为准。"
        },
        "artifact_source_system": {
          "type": "string",
          "default": "",
          "description": "触发器配置。"
        },
        "artifact_type": {
          "type": "string",
          "default": "",
          "description": "制品类型。"
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      },
      "description": "触发器配置。"
    },
    "slave_cluster_id": {
      "type": "string",
      "default": "",
      "description": "从属集群 ID。"
    },
    "slave_resource_type": {
      "type": "string",
      "default": "",
      "description": "从属资源类型。"
    },
    "create_type": {
      "type": "string",
      "default": "template",
      "description": "创建方式，例如 template 表示按模板创建。"
    },
    "is_draft": {
      "type": "boolean",
      "default": false,
      "description": "是否保存为草稿。"
    },
    "group_id": {
      "type": "string",
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
    },
    "agency_urn": {
      "type": "string",
      "description": "委托 URN。"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "template_id": {
            "$ref": "#/properties/project_id",
            "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
          },
          "operation_list": {
            "type": "array",
            "items": {},
            "default": [],
            "description": "部署编排信息列表，用于描述模板和操作组合。"
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1,
      "description": "部署编排信息列表，用于描述模板和操作组合。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `os` | 否 | `string` | "linux" | 操作系统类型。 |
| `deploy_type` | 否 | `integer` | 0 | 部署类型。 |
| `description` | 否 | `string` |  | 对象的详细描述或备注信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "project_id": {
      "$ref": "#/properties/application_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "os": {
      "type": "string",
      "minLength": 1,
      "default": "linux",
      "description": "操作系统类型。"
    },
    "deploy_type": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "部署类型。"
    },
    "description": {
      "type": "string",
      "description": "对象的详细描述或备注信息。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `project_name` | 是 | `string` |  | CodeArts 项目名称，通常用于模板创建或展示。 |
| `template_id` | 是 | `unknown` |  | 模板 ID。用于按模板创建部署任务、应用或查询模板详情。 |
| `task_name` | 是 | `string` |  | 任务名称。创建检查、部署或流水线任务时使用。 |
| `configs` | 否 | `array` | [] | 任务配置项列表。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "project_name": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目名称，通常用于模板创建或展示。"
    },
    "template_id": {
      "$ref": "#/properties/project_id",
      "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
    },
    "task_name": {
      "type": "string",
      "minLength": 1,
      "description": "任务名称。创建检查、部署或流水线任务时使用。"
    },
    "configs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
          },
          "type": {
            "type": "string",
            "minLength": 1,
            "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
          },
          "description": {
            "type": "string",
            "description": "对象的详细描述或备注信息。"
          },
          "value": {
            "type": "string",
            "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
          },
          "static_status": {
            "type": "integer",
            "description": "静态配置状态。"
          },
          "limits": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1,
                  "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
                },
                "value": {
                  "type": "string",
                  "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
                }
              },
              "required": [
                "name"
              ],
              "additionalProperties": false
            },
            "description": "任务配置项列表。"
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": [],
      "description": "任务配置项列表。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `unknown` |  | 集群 ID。用于定位 Deploy v4 主机或容器集群。 |
| `host_ids` | 是 | `array` |  | 主机 ID 列表。用于批量添加或移除环境/集群主机。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id",
      "description": "集群 ID。用于定位 Deploy v4 主机或容器集群。"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "主机 ID 列表。用于批量添加或移除环境/集群主机。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |
| `host_ids` | 是 | `array` |  | 主机 ID 列表。用于批量添加或移除环境/集群主机。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "description": "主机 ID 列表。用于批量添加或移除环境/集群主机。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |

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
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
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
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `step_id` | 否 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `offset` | 否 | `string` | "0" | 偏移量。用于分页或日志读取位置。 |
| `end_offset` | 否 | `string` | "0" | 日志结束偏移量。 |

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
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "record_id": {
      "$ref": "#/properties/application_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "step_id": {
      "$ref": "#/properties/application_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "offset": {
      "type": "string",
      "default": "0",
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "end_offset": {
      "type": "string",
      "default": "0",
      "description": "日志结束偏移量。"
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

中文说明：获取Deploy 部署的deploy来源detail。

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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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

中文说明：获取Deploy 部署的executionparams。

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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "record_id": {
      "$ref": "#/properties/task_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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

中文说明：获取Deploy 部署的historydetail。

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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "record_id": {
      "$ref": "#/properties/task_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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

中文说明：获取Deploy 部署的主机分组。

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
| `group_id` | 是 | `string` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |

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
      "minLength": 1,
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
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

中文说明：获取Deploy 部署的last记录detail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `orchestration_id` | 是 | `unknown` |  | 编排 ID。用于查询 Deploy v4 编排最近一次记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "orchestration_id": {
      "$ref": "#/properties/project_id",
      "description": "编排 ID。用于查询 Deploy v4 编排最近一次记录。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 否 | `unknown` |  | 应用 ID。用于定位 Deploy v4 应用或查询变量/编排。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "app_id": {
      "$ref": "#/properties/project_id",
      "description": "应用 ID。用于定位 Deploy v4 应用或查询变量/编排。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `record_id` | 否 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "record_id": {
      "$ref": "#/properties/task_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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

中文说明：获取Deploy 部署的模板detail。

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
| `template_id` | 是 | `string` |  | 模板 ID。用于按模板创建部署任务、应用或查询模板详情。 |
| `task_id` | 否 | `unknown` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |

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
      "minLength": 1,
      "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
    },
    "task_id": {
      "$ref": "#/properties/template_id",
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `unknown` |  | 集群 ID。用于定位 Deploy v4 主机或容器集群。 |
| `cluster_type` | 是 | `string` |  | Deploy v4 集群类型：host=主机集群，container=容器集群。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id",
      "description": "集群 ID。用于定位 Deploy v4 主机或容器集群。"
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ],
      "description": "Deploy v4 集群类型：host=主机集群，container=容器集群。"
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

中文说明：获取Deploy 部署的v4集群count。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_type` | 是 | `string` |  | Deploy v4 集群类型：host=主机集群，container=容器集群。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ],
      "description": "Deploy v4 集群类型：host=主机集群，container=容器集群。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `unknown` |  | 集群 ID。用于定位 Deploy v4 主机或容器集群。 |
| `host_id` | 是 | `unknown` |  | 主机 ID。用于定位集群中的单台主机。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id",
      "description": "集群 ID。用于定位 Deploy v4 主机或容器集群。"
    },
    "host_id": {
      "$ref": "#/properties/project_id",
      "description": "主机 ID。用于定位集群中的单台主机。"
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

中文说明：获取Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `step_id` | 否 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
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

中文说明：获取Deploy 部署的v4deploy记录stepdetail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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

中文说明：获取Deploy 部署的v4deploy记录step日志。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
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

中文说明：获取Deploy 部署的v4环境resourcedetail。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
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
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |
| `group_id` | 是 | `unknown` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |
| `host_ids` | 是 | `array` |  | 主机 ID 列表。用于批量添加或移除环境/集群主机。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "environment_id": {
      "$ref": "#/properties/application_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
    },
    "group_id": {
      "$ref": "#/properties/application_id",
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/application_id"
      },
      "minItems": 1,
      "description": "主机 ID 列表。用于批量添加或移除环境/集群主机。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：查询列表Deploy 部署的应用主机分组。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "application_id": {
      "type": "string",
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "project_id": {
      "$ref": "#/properties/application_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Deploy 部署的应用operations日志。

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
| `app_id` | 是 | `string` |  | 应用 ID。用于定位 Deploy v4 应用或查询变量/编排。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `page_index` | 否 | `integer` | 1 | 页码。部分 Deploy 接口使用的分页页码，通常从 1 开始。 |
| `start_date` | 否 | `string` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `end_date` | 否 | `string` |  | 结束日期。用于按时间范围查询操作日志、历史记录或统计数据。 |

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
      "minLength": 1,
      "description": "应用 ID。用于定位 Deploy v4 应用或查询变量/编排。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "page_index": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1,
      "description": "页码。部分 Deploy 接口使用的分页页码，通常从 1 开始。"
    },
    "start_date": {
      "type": "string",
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "end_date": {
      "type": "string",
      "description": "结束日期。用于按时间范围查询操作日志、历史记录或统计数据。"
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

中文说明：查询列表Deploy 部署的应用。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Deploy 部署的deployment单元。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 是 | `unknown` |  | 应用 ID。用于定位 Deploy v4 应用或查询变量/编排。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "app_id": {
      "$ref": "#/properties/project_id",
      "description": "应用 ID。用于定位 Deploy v4 应用或查询变量/编排。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "application_id": {
      "type": "string",
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "environment_id": {
      "$ref": "#/properties/application_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `application_id` | 是 | `string` |  | 部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "application_id": {
      "type": "string",
      "minLength": 1,
      "description": "部署应用 ID。用于定位 Deploy 应用、环境、主机组和部署记录。"
    },
    "project_id": {
      "$ref": "#/properties/application_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Deploy 部署的histories。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_id` | 是 | `unknown` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `start_date` | 否 | `string` |  | 开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。 |
| `end_date` | 否 | `string` |  | 结束日期。用于按时间范围查询操作日志、历史记录或统计数据。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "task_id": {
      "$ref": "#/properties/project_id",
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "start_date": {
      "type": "string",
      "description": "开始日期。用于时间范围查询；在工作项接口中表示计划开始时间。"
    },
    "end_date": {
      "type": "string",
      "description": "结束日期。用于按时间范围查询操作日志、历史记录或统计数据。"
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

中文说明：查询列表Deploy 部署的主机分组环境。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `group_id` | 是 | `string` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "group_id": {
      "type": "string",
      "minLength": 1,
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
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

中文说明：查询列表Deploy 部署的主机分组主机。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `group_id` | 是 | `string` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "group_id": {
      "type": "string",
      "minLength": 1,
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
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

中文说明：查询列表Deploy 部署的主机分组。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查询列表Deploy 部署的system配置。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `unknown` |  | 集群 ID。用于定位 Deploy v4 主机或容器集群。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id",
      "description": "集群 ID。用于定位 Deploy v4 主机或容器集群。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
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

中文说明：查询列表Deploy 部署的v4集群。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_type` | 是 | `string` |  | Deploy v4 集群类型：host=主机集群，container=容器集群。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ],
      "description": "Deploy v4 集群类型：host=主机集群，container=容器集群。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
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

中文说明：查询列表Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `unknown` |  | 部署环境 ID。用于定位环境、环境主机或环境下的应用。 |
| `query` | 否 | `object` | {} | 查询条件对象。用于传递服务端支持的筛选、分页或过滤结构。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "environment_id": {
      "$ref": "#/properties/project_id",
      "description": "部署环境 ID。用于定位环境、环境主机或环境下的应用。"
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
      "default": {},
      "description": "查询条件对象。用于传递服务端支持的筛选、分页或过滤结构。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 是 | `unknown` |  | 应用 ID。用于定位 Deploy v4 应用或查询变量/编排。 |
| `limit` | 否 | `integer` | 20 | 返回数量上限。用于 offset/limit 分页。 |
| `offset` | 否 | `integer` | 0 | 偏移量。用于分页或日志读取位置。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "app_id": {
      "$ref": "#/properties/project_id",
      "description": "应用 ID。用于定位 Deploy v4 应用或查询变量/编排。"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "返回数量上限。用于 offset/limit 分页。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0,
      "description": "偏移量。用于分页或日志读取位置。"
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

中文说明：查询列表Deploy 部署的变量history。

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
| `id` | 是 | `string` |  | 资源 ID。返回结果或嵌套对象中的通用唯一标识。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。 |
| `description` | 否 | `string` | "" | 对象的详细描述或备注信息。 |
| `timeout` | 否 | `number | null` | 超时时间。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 触发器配置。 |
| `slave_cluster_id` | 否 | `string` | "" | 从属集群 ID。 |
| `slave_resource_type` | 否 | `string` | "" | 从属资源类型。 |
| `create_type` | 否 | `string` | "template" | 创建方式，例如 template 表示按模板创建。 |
| `is_draft` | 否 | `boolean` | false | 是否保存为草稿。 |
| `group_id` | 否 | `string` |  | 分组 ID。用于流水线分组、部署主机组或资源分组。 |
| `agency_urn` | 否 | `string` |  | 委托 URN。 |
| `arrange_infos` | 是 | `array` |  | 部署编排信息列表，用于描述模板和操作组合。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
    },
    "project_id": {
      "$ref": "#/properties/id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
    },
    "description": {
      "type": "string",
      "default": "",
      "description": "对象的详细描述或备注信息。"
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ],
      "description": "超时时间。"
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0",
          "description": "部署启动来源：0 或 \"0\" 表示普通/手动触发，1 或 \"1\" 表示流水线等外部触发；具体来源以 Deploy 返回为准。"
        },
        "artifact_source_system": {
          "type": "string",
          "default": "",
          "description": "触发器配置。"
        },
        "artifact_type": {
          "type": "string",
          "default": "",
          "description": "制品类型。"
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      },
      "description": "触发器配置。"
    },
    "slave_cluster_id": {
      "type": "string",
      "default": "",
      "description": "从属集群 ID。"
    },
    "slave_resource_type": {
      "type": "string",
      "default": "",
      "description": "从属资源类型。"
    },
    "create_type": {
      "type": "string",
      "default": "template",
      "description": "创建方式，例如 template 表示按模板创建。"
    },
    "is_draft": {
      "type": "boolean",
      "default": false,
      "description": "是否保存为草稿。"
    },
    "group_id": {
      "type": "string",
      "description": "分组 ID。用于流水线分组、部署主机组或资源分组。"
    },
    "agency_urn": {
      "type": "string",
      "description": "委托 URN。"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/id",
            "description": "资源 ID。返回结果或嵌套对象中的通用唯一标识。"
          },
          "deploy_system": {
            "type": "string",
            "description": "部署编排信息列表，用于描述模板和操作组合。"
          },
          "template_id": {
            "$ref": "#/properties/id",
            "description": "模板 ID。用于按模板创建部署任务、应用或查询模板详情。"
          },
          "operation_list": {
            "type": "array",
            "items": {},
            "default": [],
            "description": "部署编排信息列表，用于描述模板和操作组合。"
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1,
      "description": "部署编排信息列表，用于描述模板和操作组合。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `step_id` | 是 | `unknown` |  | 步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "step_id": {
      "$ref": "#/properties/project_id",
      "description": "步骤 ID。用于定位流水线、部署或构建记录中的具体步骤。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：重新运行Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：重试Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "record_id": {
      "$ref": "#/properties/task_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：回滚Deploy 部署的v4deploy记录。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `body` | 否 | `object` | {} | 请求体对象，用于透传该接口的扩展参数。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "record_id": {
      "$ref": "#/properties/project_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {},
      "description": "请求体对象，用于透传该接口的扩展参数。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `trigger_source` | 否 | `number \| string` |  | 部署启动来源：0 或 "0" 表示普通/手动触发，1 或 "1" 表示流水线等外部触发；具体来源以 Deploy 返回为准。 |
| `params` | 否 | `array` | [] | 启动或执行参数列表。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
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
      ],
      "description": "部署启动来源：0 或 \"0\" 表示普通/手动触发，1 或 \"1\" 表示流水线等外部触发；具体来源以 Deploy 返回为准。"
    },
    "params": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "description": "资源名称。创建、更新或过滤资源时使用，具体资源类型由当前工具决定。"
          },
          "type": {
            "type": "string",
            "minLength": 1,
            "description": "类型。常见取值按接口区分：Req 计划 type 可取 gantt=甘特图、mind=思维导图；关联提交 type 可取 commit 或 branch；其他接口以对应服务枚举为准。"
          },
          "value": {
            "type": "string",
            "description": "字段值。用于变量、自定义字段、过滤项或配置项的具体取值。"
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": [],
      "description": "启动或执行参数列表。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `task_id` | 是 | `string` |  | 任务 ID。用于定位构建、部署、检查或测试计划任务。 |
| `record_id` | 是 | `unknown` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建、部署、检查或测试计划任务。"
    },
    "record_id": {
      "$ref": "#/properties/task_id",
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `build_append_job_step` | 追加Build 构建的任务step。 |
| `build_append_release_upload_step` | 向 Build 构建任务追加发布仓上传步骤。 |
| `build_configure_release_upload_step` | 配置 Build 构建任务中的发布仓上传步骤。 |
| `build_get_error_log` | 获取Build 构建的error日志。 |
| `build_get_full_stages` | 获取 Build 构建完整阶段信息。 |
| `build_get_history_details` | 获取Build 构建的historydetails。 |
| `build_get_info_record` | 获取Build 构建的info记录。 |
| `build_get_job` | 获取Build 构建的任务。 |
| `build_get_project_record_statistics` | 获取Build 构建的项目记录statistics。 |
| `build_get_real_time_log` | 获取 Build 构建实时日志。 |
| `build_get_record` | 获取Build 构建的记录。 |
| `build_get_record_flow_graph` | 获取Build 构建的记录流程graph。 |
| `build_get_record_script` | 获取Build 构建的记录脚本。 |
| `build_list_build_parameters` | 查询列表Build 构建的build参数。 |
| `build_list_jobs` | 查询列表Build 构建的任务。 |
| `build_list_project_records` | 查询列表Build 构建的项目记录。 |
| `build_list_records` | 查询列表Build 构建的记录。 |
| `build_prepare_deployable_node_app` | 准备Build 构建的deployablenode应用。 |
| `build_prepare_node_runtime_bundle` | 准备Build 构建的node运行时bundle。 |
| `build_run_job` | 运行Build 构建的任务。 |
| `build_stop_job` | 停止Build 构建的任务。 |
| `build_update_job_step` | 更新Build 构建的任务step。 |

### build_append_job_step

中文说明：追加Build 构建的任务step。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_name` | 是 | `string` |  | 步骤名称。 |
| `module_id` | 是 | `string` |  | 模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。 |
| `enable` | 否 | `boolean` | true | 是否启用该步骤。 |
| `version` | 否 | `string` |  | 接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。 |
| `image` | 否 | `string` |  | 步骤运行镜像。 |
| `command` | 否 | `string` |  | 要执行的命令。 |
| `pre_condition` | 否 | `string` |  | 步骤执行前置条件。 |
| `properties` | 否 | `object` |  | 步骤属性配置对象。 |
| `insert_after_step_name` | 否 | `string` |  | 插入到指定步骤之后。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "description": "步骤名称。"
    },
    "module_id": {
      "type": "string",
      "minLength": 1,
      "description": "模块 ID。用于把工作项、IPD 对象或项目模块归属到指定模块。"
    },
    "enable": {
      "type": "boolean",
      "default": true,
      "description": "是否启用该步骤。"
    },
    "version": {
      "type": "string",
      "minLength": 1,
      "description": "接口版本。IPD 工作项详情支持 v1、v2，默认 v2；插件/构建步骤中的 version 表示对应插件或步骤版本。"
    },
    "image": {
      "type": "string",
      "minLength": 1,
      "description": "步骤运行镜像。"
    },
    "command": {
      "type": "string",
      "minLength": 1,
      "description": "要执行的命令。"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1,
      "description": "步骤执行前置条件。"
    },
    "properties": {
      "type": "object",
      "additionalProperties": {},
      "description": "步骤属性配置对象。"
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1,
      "description": "插入到指定步骤之后。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：向 Build 构建任务追加发布仓上传步骤。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `path` | 是 | `string` |  | 远端或仓库内的路径。 |
| `package_name` | 否 | `string` |  | 包名称。 |
| `package_version` | 否 | `string` |  | 包版本。 |
| `custom_upload_path` | 否 | `string` |  | 自定义上传路径。 |
| `upload_tool` | 否 | `string` | "curl" | 上传工具类型。 |
| `continue_on_failure` | 否 | `boolean` | false | 步骤失败后是否继续执行。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 步骤名称。 |
| `pre_condition` | 否 | `string` | "SUCCESS" | 步骤执行前置条件。 |
| `insert_after_step_name` | 否 | `string` |  | 插入到指定步骤之后。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "description": "远端或仓库内的路径。"
    },
    "package_name": {
      "type": "string",
      "minLength": 1,
      "description": "包名称。"
    },
    "package_version": {
      "type": "string",
      "minLength": 1,
      "description": "包版本。"
    },
    "custom_upload_path": {
      "type": "string",
      "minLength": 1,
      "description": "自定义上传路径。"
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl",
      "description": "上传工具类型。"
    },
    "continue_on_failure": {
      "type": "boolean",
      "default": false,
      "description": "步骤失败后是否继续执行。"
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository",
      "description": "步骤名称。"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1,
      "default": "SUCCESS",
      "description": "步骤执行前置条件。"
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1,
      "description": "插入到指定步骤之后。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：配置 Build 构建任务中的发布仓上传步骤。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 步骤名称。 |
| `file` | 是 | `string` |  | 构建产物或上传文件路径。配置发布仓上传步骤时指定要上传的文件。 |
| `package_name` | 否 | `string` |  | 包名称。 |
| `build_version` | 否 | `string` |  | 构建版本。 |
| `custom_upload_path` | 否 | `string` |  | 自定义上传路径。 |
| `upload_tool` | 否 | `string` | "curl" | 上传工具类型。 |
| `remain_origin_path` | 否 | `string` | "FLAT" | 是否保留原始路径。 |
| `pre_condition` | 否 | `string` |  | 步骤执行前置条件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository",
      "description": "步骤名称。"
    },
    "file": {
      "type": "string",
      "minLength": 1,
      "description": "构建产物或上传文件路径。配置发布仓上传步骤时指定要上传的文件。"
    },
    "package_name": {
      "type": "string",
      "minLength": 1,
      "description": "包名称。"
    },
    "build_version": {
      "type": "string",
      "minLength": 1,
      "description": "构建版本。"
    },
    "custom_upload_path": {
      "type": "string",
      "description": "自定义上传路径。"
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl",
      "description": "上传工具类型。"
    },
    "remain_origin_path": {
      "type": "string",
      "minLength": 1,
      "default": "FLAT",
      "description": "是否保留原始路径。"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1,
      "description": "步骤执行前置条件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：获取Build 构建的error日志。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_no` | 是 | `integer` |  | 构建编号。用于读取指定构建任务的一次构建记录。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "job_id": {
      "type": "string",
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取指定构建任务的一次构建记录。"
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

中文说明：获取 Build 构建完整阶段信息。

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
| `record_id` | 是 | `string` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |
| `cascade` | 否 | `boolean` | true | 是否级联返回子阶段或子资源。 |

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
      "minLength": 1,
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
    },
    "cascade": {
      "type": "boolean",
      "default": true,
      "description": "是否级联返回子阶段或子资源。"
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

中文说明：获取Build 构建的historydetails。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_number` | 是 | `integer` |  | 构建编号。用于读取历史详情。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_number": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取历史详情。"
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

中文说明：获取Build 构建的info记录。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_no` | 是 | `integer` |  | 构建编号。用于读取指定构建任务的一次构建记录。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取指定构建任务的一次构建记录。"
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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
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

中文说明：获取Build 构建的项目记录statistics。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `build_project_id` | 否 | `unknown` |  | 构建项目 ID。用于限定构建记录统计或项目记录查询范围。 |

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
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "build_project_id": {
      "$ref": "#/properties/project_id",
      "description": "构建项目 ID。用于限定构建记录统计或项目记录查询范围。"
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

中文说明：获取 Build 构建实时日志。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_no` | 是 | `integer` |  | 构建编号。用于读取指定构建任务的一次构建记录。 |
| `offset` | 是 | `integer` |  | 偏移量。用于分页或日志读取位置。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取指定构建任务的一次构建记录。"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "description": "偏移量。用于分页或日志读取位置。"
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
| `record_id` | 是 | `string` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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

中文说明：获取Build 构建的记录流程graph。

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
| `record_id` | 是 | `string` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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
| `record_id` | 是 | `string` |  | 执行记录 ID。用于定位构建、部署或流水线的一次运行记录。 |

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
      "minLength": 1,
      "description": "执行记录 ID。用于定位构建、部署或流水线的一次运行记录。"
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

中文说明：查询列表Build 构建的build参数。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_no` | 是 | `integer` |  | 构建编号。用于读取指定构建任务的一次构建记录。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取指定构建任务的一次构建记录。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `build_project_id` | 否 | `unknown` |  | 构建项目 ID。用于限定构建记录统计或项目记录查询范围。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "build_project_id": {
      "$ref": "#/properties/project_id",
      "description": "构建项目 ID。用于限定构建记录统计或项目记录查询范围。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "job_id": {
      "type": "string",
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
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

中文说明：准备Build 构建的deployablenode应用。

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

中文说明：准备Build 构建的node运行时bundle。

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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `step_name` | 否 | `string` |  | 步骤名称。 |
| `output_file` | 否 | `string` | "codearts-mcp.tgz" | 输出文件名。 |
| `staging_dir` | 否 | `string` | ".release-bundle" | 临时打包目录。 |
| `replace_existing` | 否 | `boolean` | false | 是否替换已有配置或文件。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "description": "步骤名称。"
    },
    "output_file": {
      "type": "string",
      "minLength": 1,
      "default": "codearts-mcp.tgz",
      "description": "输出文件名。"
    },
    "staging_dir": {
      "type": "string",
      "minLength": 1,
      "default": ".release-bundle",
      "description": "临时打包目录。"
    },
    "replace_existing": {
      "type": "boolean",
      "default": false,
      "description": "是否替换已有配置或文件。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `branch` | 否 | `string` |  | 分支名，用于指定代码、构建或流水线运行分支。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "description": "分支名，用于指定代码、构建或流水线运行分支。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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
| `job_id` | 是 | `string` |  | 任务 ID。用于定位构建任务或流水线任务步骤。 |
| `build_no` | 是 | `integer` |  | 构建编号。用于读取指定构建任务的一次构建记录。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "任务 ID。用于定位构建任务或流水线任务步骤。"
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "构建编号。用于读取指定构建任务的一次构建记录。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：更新Build 构建的任务step。

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
| `artifact_get_download_url` | 获取Artifact 制品仓的下载地址。 |
| `artifact_get_file` | 获取Artifact 制品仓的文件。 |
| `artifact_get_file_tree` | 获取Artifact 制品仓的文件树形数据。 |
| `artifact_get_repository` | 获取Artifact 制品仓的仓库。 |
| `artifact_list_build_archives` | 查询列表Artifact 制品仓的build归档。 |
| `artifact_list_files` | 查询列表Artifact 制品仓的文件。 |
| `artifact_list_latest_version_files` | 查询列表Artifact 制品仓的latest版本文件。 |
| `artifact_list_repositories` | 查询列表Artifact 制品仓的仓库。 |
| `artifact_list_versions` | 查询列表Artifact 制品仓的版本。 |
| `artifact_search_artifacts` | 搜索Artifact 制品仓的制品。 |
| `artifact_show_audit` | 查看Artifact 制品仓的审计日志。 |

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
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |
| `path` | 是 | `string` |  | 远端或仓库内的路径。 |
| `format` | 是 | `string` |  | 仓库或文件格式。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "description": "远端或仓库内的路径。"
    },
    "format": {
      "type": "string",
      "minLength": 1,
      "description": "仓库或文件格式。"
    },
    "dry_run": {
      "type": "boolean",
      "default": true,
      "description": "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。"
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

中文说明：获取Artifact 制品仓的下载地址。

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
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |
| `path` | 是 | `string` |  | 远端或仓库内的路径。 |
| `format` | 是 | `string` |  | 仓库或文件格式。 |

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
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "description": "远端或仓库内的路径。"
    },
    "format": {
      "type": "string",
      "minLength": 1,
      "description": "仓库或文件格式。"
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
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |
| `path` | 是 | `string` |  | 制品、文件或上传路径。 |
| `format` | 是 | `string` |  | 仓库或文件格式。 |

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
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "description": "制品、文件或上传路径。"
    },
    "format": {
      "type": "string",
      "minLength": 1,
      "description": "仓库或文件格式。"
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

中文说明：获取Artifact 制品仓的文件树形数据。

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
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |

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
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
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
| `repository_id` | 是 | `string` |  | 代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。 |

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
      "minLength": 1,
      "description": "代码仓/制品仓 ID。用于定位 Repo 或 Artifact 中的仓库资源。"
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

中文说明：查询列表Artifact 制品仓的build归档。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
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

中文说明：查询列表Artifact 制品仓的latest版本文件。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `artifact_name` | 是 | `string` |  | 制品名称。 |
| `repo_name` | 否 | `string` |  | 仓库名称。用于定位制品仓或代码仓中的具体仓库。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "artifact_name": {
      "type": "string",
      "minLength": 1,
      "description": "制品名称。"
    },
    "repo_name": {
      "type": "string",
      "description": "仓库名称。用于定位制品仓或代码仓中的具体仓库。"
    },
    "project_id": {
      "type": "string",
      "minLength": 1,
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
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

中文说明：查看Artifact 制品仓的审计日志。

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `tenant_id` | 是 | `string` |  | 租户 ID。用于定位制品仓、流水线模板等租户范围资源。 |
| `project_id` | 是 | `unknown` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module` | 是 | `string` |  | 模块名称。 |
| `repo` | 是 | `string` |  | 仓库名称。 |
| `user_id` | 否 | `string` |  | 用户 ID。用于定位项目成员、操作者或需要授权的用户。 |
| `instance_id` | 否 | `string` |  | 实例 ID。审计日志查询时用于定位具体资源实例。 |
| `format` | 否 | `string` |  | 仓库或文件格式。 |
| `resource_id` | 否 | `string` |  | 资源 ID。审计日志或资源查询时用于限定具体资源。 |

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
      "default": 1,
      "description": "页码。用于 page/page_size 分页。"
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20,
      "description": "每页数量。用于分页查询。"
    },
    "keyword": {
      "type": "string",
      "description": "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。"
    },
    "sort_by": {
      "type": "string",
      "description": "排序字段。用于选择服务端排序字段。"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "description": "排序方向。asc 表示升序，desc 表示降序。"
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1,
      "description": "租户 ID。用于定位制品仓、流水线模板等租户范围资源。"
    },
    "project_id": {
      "$ref": "#/properties/tenant_id",
      "description": "CodeArts 项目的唯一标识，用于确定本次操作所属项目。"
    },
    "module": {
      "type": "string",
      "minLength": 1,
      "description": "模块名称。"
    },
    "repo": {
      "type": "string",
      "minLength": 1,
      "description": "仓库名称。"
    },
    "user_id": {
      "type": "string",
      "description": "用户 ID。用于定位项目成员、操作者或需要授权的用户。"
    },
    "instance_id": {
      "type": "string",
      "description": "实例 ID。审计日志查询时用于定位具体资源实例。"
    },
    "format": {
      "type": "string",
      "description": "仓库或文件格式。"
    },
    "resource_id": {
      "type": "string",
      "description": "资源 ID。审计日志或资源查询时用于限定具体资源。"
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
