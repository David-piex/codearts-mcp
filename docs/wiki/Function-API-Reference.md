# CodeArts MCP Function API Reference

Generated date: 2026-04-25

This document lists every function API exposed by the current HTTP MCP mode. All function APIs use the same HTTP endpoint: `POST /mcp`. The JSON-RPC method is `tools/call`, and the concrete function is selected by `params.name`. Read [HTTP-MCP-Interface](./HTTP-MCP-Interface.md) first for session, authentication, and error handling.

## Common Call Shape

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

Headers:

```http
content-type: application/json
mcp-session-id: <session-id>
authorization: Bearer <auth-token>
```

## Module Index

| Module | API count |
| --- | ---: |
| [Auth / Session](#auth-session) | 2 |
| [Req](#req) | 174 |
| [Repo](#repo) | 25 |
| [Pipeline](#pipeline) | 77 |
| [Check](#check) | 8 |
| [TestPlan](#testplan) | 7 |
| [Deploy](#deploy) | 59 |
| [Build](#build) | 22 |
| [Artifact](#artifact) | 12 |
| **Total** | **386** |

## Auth / Session

| API | Description |
| --- | --- |
| `auth_clear_session` | Clear Huawei Cloud credentials for the current MCP session |
| `auth_configure_session` | Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides. |

### auth_clear_session

Description: Clear Huawei Cloud credentials for the current MCP session

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `auth_clear_session` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {}
}
```

### auth_configure_session

Description: Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides.

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `auth_configure_session` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `access_key` | yes | `string` |  |  |
| `secret_key` | yes | `string` |  |  |
| `region` | yes | `string` |  |  |
| `req_base_url` | no | `string` |  |  |
| `repo_base_url` | no | `string` |  |  |
| `pipeline_base_url` | no | `string` |  |  |
| `check_base_url` | no | `string` |  |  |
| `testplan_base_url` | no | `string` |  |  |
| `deploy_base_url` | no | `string` |  |  |
| `build_base_url` | no | `string` |  |  |
| `artifact_base_url` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

## Req

| API | Description |
| --- | --- |
| `req_add_iteration_work_items` | Add work items to a CodeArts Req iteration |
| `req_add_plan_work_items` | Add work items to a CodeArts Req plan |
| `req_add_project_member` | Add member to a CodeArts Req project |
| `req_add_work_item_comment` | Add comment to a CodeArts Req work item |
| `req_add_work_item_work_hour` | Add a work hour record to a CodeArts Req work item |
| `req_batch_add_project_members` | Add multiple members to a CodeArts Req project |
| `req_batch_create_ipd_issues` | Batch create CodeArts Req IPD issues |
| `req_batch_delete_ipd_issues` | Batch delete CodeArts Req IPD issues |
| `req_batch_delete_iterations` | Delete multiple CodeArts Req iterations |
| `req_batch_delete_project_members` | Remove multiple members from a CodeArts Req project |
| `req_batch_delete_work_items` | Delete multiple CodeArts Req work items |
| `req_batch_transfer_ipd_work_item_flow` | Batch transfer CodeArts Req IPD work item flow |
| `req_batch_update_ipd_issues` | Batch update CodeArts Req IPD issues |
| `req_batch_update_work_items` | Batch update CodeArts Req work items |
| `req_check_project_name` | Check whether a CodeArts Req project name exists |
| `req_check_work_item_status_name` | Check whether a CodeArts Req work item status name already exists |
| `req_clear_plan_work_items` | Clear work items from a CodeArts Req plan |
| `req_copy_work_items` | Copy CodeArts Req work items between projects |
| `req_count_work_item_tree` | Count CodeArts Req work items in tree mode |
| `req_create_ipd_feature_set` | Create CodeArts Req IPD feature set |
| `req_create_ipd_issue` | Create CodeArts Req IPD issue |
| `req_create_ipd_label` | Create CodeArts Req IPD label |
| `req_create_ipd_module` | Create CodeArts Req IPD module |
| `req_create_ipd_work_hour` | Create CodeArts Req IPD work hour record |
| `req_create_iteration` | Create CodeArts Req iteration |
| `req_create_iteration_work_item` | Create CodeArts Req iteration work item |
| `req_create_plan` | Create CodeArts Req plan |
| `req_create_plan_work_item` | Create CodeArts Req plan work item |
| `req_create_project` | Create CodeArts Req project |
| `req_create_project_module` | Create CodeArts Req project module |
| `req_create_work_item` | Create CodeArts Req work item |
| `req_create_work_item_template` | Create or update a CodeArts Req work item template |
| `req_delete_attachment` | Delete a CodeArts Req work item attachment |
| `req_delete_ipd_feature_set` | Delete CodeArts Req IPD feature set |
| `req_delete_ipd_issue_image` | Delete image from CodeArts Req IPD issue description |
| `req_delete_ipd_label` | Delete CodeArts Req IPD label |
| `req_delete_ipd_module` | Delete CodeArts Req IPD module |
| `req_delete_ipd_work_hour` | Delete CodeArts Req IPD work hour record |
| `req_delete_iteration` | Delete CodeArts Req iteration |
| `req_delete_plan` | Delete CodeArts Req plan |
| `req_delete_project` | Delete CodeArts Req project |
| `req_delete_project_module` | Delete CodeArts Req project module |
| `req_delete_project_template` | Delete a CodeArts Req project template |
| `req_delete_work_item` | Delete CodeArts Req work item |
| `req_download_attachment` | Download a CodeArts Req work item attachment |
| `req_download_image_file` | Download a CodeArts Req image file |
| `req_download_ipd_issue_attachment` | Download CodeArts Req IPD issue attachment |
| `req_download_ipd_issue_image` | Download image from CodeArts Req IPD issue description |
| `req_get_current_user_info` | Get current CodeArts Req user info |
| `req_get_current_user_role` | Get current CodeArts Req user role in a project |
| `req_get_ipd_e2e_graph` | Get CodeArts Req IPD E2E trace graph |
| `req_get_ipd_issue` | Get CodeArts Req IPD issue detail |
| `req_get_ipd_project_field_option_used` | Get CodeArts Req IPD project field option usage |
| `req_get_ipd_statistic_dashboard` | Get CodeArts Req IPD statistic dashboard |
| `req_get_ipd_tenant_field_option_used` | Get CodeArts Req IPD tenant field option usage |
| `req_get_ipd_tenant_field_used` | Get CodeArts Req IPD tenant field usage |
| `req_get_ipd_work_item_flow_detail` | Get CodeArts Req IPD work item flow detail |
| `req_get_ir` | Get a CodeArts Req requirement pool IR detail |
| `req_get_iteration` | Get CodeArts Req iteration detail |
| `req_get_plan` | Get CodeArts Req plan detail |
| `req_get_project` | Get CodeArts Req project detail |
| `req_get_project_bug_density` | Get CodeArts Req project bug density metric |
| `req_get_project_bugs_per_developer` | Get CodeArts Req project bugs per developer metric |
| `req_get_project_completion_rate` | Get CodeArts Req project completion rate metric |
| `req_get_project_due_days_after` | Get CodeArts Req project due-days-after config |
| `req_get_project_public_config` | Get CodeArts Req project public config |
| `req_get_project_summary` | Get CodeArts Req project summary |
| `req_get_project_workhour_config` | Get CodeArts Req project workhour config |
| `req_get_work_item` | Get CodeArts Req work item detail |
| `req_get_work_item_completion_rate` | Get CodeArts Req work item completion rates |
| `req_get_work_item_index_counts` | Get CodeArts Req work item index counts |
| `req_get_work_item_issue_details` | Get CodeArts Req work item issue details from the V2 detail endpoint |
| `req_get_work_item_status_rule_flag` | Get CodeArts Req work item status rule flag |
| `req_get_work_item_template_config` | Get CodeArts Req work item template config |
| `req_group_ipd_issues` | Group CodeArts Req IPD issues |
| `req_leave_project` | Leave a CodeArts Req project as the current member |
| `req_list_associated_commits` | List CodeArts Req associated commits |
| `req_list_associated_issues` | List CodeArts Req associated issues |
| `req_list_associated_test_cases` | List CodeArts Req associated test cases |
| `req_list_associated_wikis` | List CodeArts Req associated wikis |
| `req_list_board_work_item_status_records` | List CodeArts Req board work item status records |
| `req_list_board_work_item_workflow_config` | List CodeArts Req board work item workflow config |
| `req_list_board_work_items` | List CodeArts Req board work items |
| `req_list_cache_data` | List CodeArts Req cache data |
| `req_list_child_work_items` | List CodeArts Req child work items |
| `req_list_ipd_attached_wikis` | List CodeArts Req IPD issue attached wikis |
| `req_list_ipd_category_statuses` | List CodeArts Req IPD category statuses |
| `req_list_ipd_feature_sets` | List CodeArts Req IPD feature sets |
| `req_list_ipd_issue_attachments` | List CodeArts Req IPD issue attachments |
| `req_list_ipd_issue_fields` | List CodeArts Req IPD issue fields |
| `req_list_ipd_issue_relation_config` | List CodeArts Req IPD issue relation config |
| `req_list_ipd_issue_tree` | List CodeArts Req IPD issue tree |
| `req_list_ipd_issues` | List CodeArts Req IPD issues |
| `req_list_ipd_labels` | List CodeArts Req IPD labels |
| `req_list_ipd_modules` | List CodeArts Req IPD modules |
| `req_list_ipd_project_fields` | List CodeArts Req IPD project fields |
| `req_list_ipd_project_users` | List CodeArts Req IPD project users |
| `req_list_ipd_projects` | List CodeArts Req IPD projects |
| `req_list_ipd_snapshot_features` | List CodeArts Req IPD snapshot features |
| `req_list_ipd_snapshot_versions` | List CodeArts Req IPD feature set snapshot versions |
| `req_list_ipd_statuses` | List CodeArts Req IPD statuses |
| `req_list_ipd_tenant_fields` | List CodeArts Req IPD tenant fields |
| `req_list_ipd_tenant_issues` | List CodeArts Req IPD tenant issues |
| `req_list_ipd_work_hour_categories` | List CodeArts Req IPD work hour categories |
| `req_list_ipd_work_hours` | List CodeArts Req IPD work hour records |
| `req_list_ipd_workflow_fields` | List CodeArts Req IPD workflow fields |
| `req_list_ipd_workflow_templates` | List CodeArts Req IPD workflow templates |
| `req_list_ir_children` | List CodeArts Req requirement pool IR children |
| `req_list_ir_histories` | List CodeArts Req requirement pool IR history records |
| `req_list_issue_severities` | List CodeArts Req issue severities |
| `req_list_iteration_status_statistics` | List CodeArts Req iteration status statistics |
| `req_list_iteration_work_items` | List CodeArts Req work items in an iteration |
| `req_list_iterations` | List CodeArts Req iterations |
| `req_list_job_cache_boards` | List CodeArts Req board cache fields |
| `req_list_not_added_projects` | List CodeArts Req projects not yet added to the current domain |
| `req_list_optional_work_item_status_configs` | List CodeArts Req optional work item status configs |
| `req_list_plan_addable_work_items` | List addable work items for a CodeArts Req plan |
| `req_list_plan_work_items` | List CodeArts Req work items in a plan |
| `req_list_plans` | List CodeArts Req plans |
| `req_list_program_fields` | List CodeArts Req program IR or RR fields |
| `req_list_programs` | List CodeArts Req project spaces / programs |
| `req_list_project_bug_statistics` | List CodeArts Req project bug statistics |
| `req_list_project_demand_statistics` | List CodeArts Req project demand statistics |
| `req_list_project_domains` | List CodeArts Req project domains |
| `req_list_project_members` | List CodeArts Req project members |
| `req_list_project_modules` | List CodeArts Req project modules |
| `req_list_project_work_hour_types` | List CodeArts Req project work hour types |
| `req_list_project_work_hours` | List CodeArts Req project work hour records |
| `req_list_project_work_item_records` | List CodeArts Req project work item records |
| `req_list_projects` | List CodeArts Req projects |
| `req_list_related_users` | List CodeArts Req related users |
| `req_list_rr_histories` | List CodeArts Req requirement pool RR history records |
| `req_list_rr_statuses` | List CodeArts Req requirement pool RR statuses |
| `req_list_rrs` | List CodeArts Req requirement pool RRs |
| `req_list_user_features` | List CodeArts Req user features |
| `req_list_work_item_comments` | List CodeArts Req work item comments |
| `req_list_work_item_custom_fields` | List CodeArts Req work item custom fields |
| `req_list_work_item_records` | List CodeArts Req work item records |
| `req_list_work_item_status_attributes` | List CodeArts Req work item status attributes |
| `req_list_work_item_status_configs` | List CodeArts Req work item status configs |
| `req_list_work_item_status_details` | List CodeArts Req work item status details |
| `req_list_work_item_statuses` | List CodeArts Req work item statuses |
| `req_list_work_item_tags` | List CodeArts Req work item tags |
| `req_list_work_item_templates` | List CodeArts Req work item templates |
| `req_list_work_item_tracker_handlers` | List CodeArts Req work item tracker handlers |
| `req_list_work_item_tree` | List CodeArts Req work items in tree mode |
| `req_list_work_item_work_hours` | List CodeArts Req work hour records for a work item |
| `req_list_work_item_workflow_config` | List CodeArts Req work item workflow config |
| `req_list_work_items` | List CodeArts Req work items |
| `req_query_iteration_immovable_issues` | Query CodeArts Req iteration immovable issues |
| `req_transfer_ipd_work_item_flow` | Transfer CodeArts Req IPD work item flow |
| `req_update_cache_data` | Update CodeArts Req cache data |
| `req_update_ipd_feature_set` | Update CodeArts Req IPD feature set |
| `req_update_ipd_label` | Update CodeArts Req IPD label |
| `req_update_ipd_module` | Update CodeArts Req IPD module |
| `req_update_ipd_project_field` | Update CodeArts Req IPD project field |
| `req_update_ipd_tenant_field` | Update CodeArts Req IPD tenant field |
| `req_update_ipd_work_hour` | Update CodeArts Req IPD work hour record |
| `req_update_iteration` | Update CodeArts Req iteration |
| `req_update_iteration_state` | Update CodeArts Req iteration state |
| `req_update_plan` | Update CodeArts Req plan |
| `req_update_plan_image` | Update image for a CodeArts Req plan |
| `req_update_project` | Update CodeArts Req project |
| `req_update_project_member_role` | Update a CodeArts Req project member role |
| `req_update_project_module` | Update CodeArts Req project module |
| `req_update_project_template` | Update a CodeArts Req project template |
| `req_update_work_item` | Update CodeArts Req work item |
| `req_update_work_item_comment` | Update a CodeArts Req work item comment |
| `req_update_work_item_flow` | Update CodeArts Req work item flow |
| `req_upload_attachment` | Upload a CodeArts Req work item attachment |
| `req_upload_ipd_issue_attachment` | Upload attachment to CodeArts Req IPD issue |
| `req_upload_ipd_issue_image` | Upload image to CodeArts Req IPD issue description |
| `req_upload_work_item_image` | Upload an image for CodeArts Req work items |
| `req_validate_module_name` | Validate whether a CodeArts Req module name already exists |

### req_add_iteration_work_items

Description: Add work items to a CodeArts Req iteration

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_add_iteration_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `work_item_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Add work items to a CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_add_plan_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `work_item_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Add member to a CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_add_project_member` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `user_id` | yes | `unknown` |  |  |
| `domain_id` | yes | `unknown` |  |  |
| `domain_name` | no | `string` |  |  |
| `role_id` | no | `number` |  | enum: -1, 3, 4, 5, 6, 7, 8, 9, 10, 11 |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Add comment to a CodeArts Req work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_add_work_item_comment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `content` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Add a work hour record to a CodeArts Req work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_add_work_item_work_hour` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_batch_add_project_members

Description: Add multiple members to a CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_add_project_members` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `members` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Batch create CodeArts Req IPD issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_create_ipd_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issues` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Batch delete CodeArts Req IPD issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_delete_ipd_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_ids` | yes | `array` |  |  |
| `is_permanent_delete` | no | `boolean` |  |  |
| `src_project_id` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete multiple CodeArts Req iterations

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_delete_iterations` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Remove multiple members from a CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_delete_project_members` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `user_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete multiple CodeArts Req work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_delete_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Batch transfer CodeArts Req IPD work item flow

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_transfer_ipd_work_item_flow` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_ids` | yes | `array` |  |  |
| `issue_category` | yes | `string` |  |  |
| `flow_code` | yes | `string` |  |  |
| `is_recover` | no | `boolean` | false |  |
| `process_context` | no | `object` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Batch update CodeArts Req IPD issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_update_ipd_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_ids` | yes | `array` |  |  |
| `attribute` | yes | `object` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Batch update CodeArts Req work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_batch_update_work_items` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_check_project_name

Description: Check whether a CodeArts Req project name exists

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_check_project_name` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Check whether a CodeArts Req work item status name already exists

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_check_work_item_status_name` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `status_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Clear work items from a CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_clear_plan_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Copy CodeArts Req work items between projects

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_copy_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_project_id` | yes | `string` |  |  |
| `to_project_id` | yes | `unknown` |  |  |
| `work_item_ids` | yes | `array` |  |  |
| `copy_comments` | no | `boolean` | false |  |
| `copy_work_hours` | no | `boolean` | false |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Count CodeArts Req work items in tree mode

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_count_work_item_tree` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `tracker_ids` | no | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req IPD feature set

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_ipd_feature_set` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `title` | yes | `string` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req IPD issue

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_ipd_issue` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `title` | yes | `string` |  |  |
| `description` | yes | `string` |  |  |
| `category` | yes | `string` |  |  |
| `assignee` | yes | `unknown` |  |  |
| `status` | no | `string` |  |  |
| `src_domain` | no | `unknown` |  |  |
| `submitted_by` | no | `unknown` |  |  |
| `domain_id` | no | `unknown` |  |  |
| `recipient` | no | `array` |  |  |
| `expect_delivery_time` | no | `integer` |  |  |
| `priority` | no | `string` |  |  |
| `assigned_cc` | no | `array` |  |  |
| `plan_pi` | no | `unknown` |  |  |
| `plan_iteration` | no | `unknown` |  |  |
| `plan_start_date` | no | `integer` |  |  |
| `plan_end_date` | no | `integer` |  |  |
| `workload_man_day` | no | `number` |  |  |
| `business_domain` | no | `string` |  |  |
| `need_break` | no | `string` |  |  |
| `extra_fields` | no | `object` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req IPD label

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_ipd_label` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `label_type` | yes | `string` |  |  |
| `color` | yes | `string` |  |  |
| `title` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req IPD module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_ipd_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `display_value` | yes | `string` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `description` | no | `string` |  |  |
| `assignee` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req IPD work hour record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_ipd_work_hour` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `work_date_begin` | yes | `string` |  |  |
| `work_date_end` | yes | `string` |  |  |
| `work_hours` | yes | `string \| number` |  |  |
| `work_hour_type` | yes | `anyOf` |  |  |
| `include_weekend` | yes | `boolean` |  |  |
| `work_hour_category` | no | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req iteration

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_iteration` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `begin_time` | yes | `string` |  |  |
| `end_time` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req iteration work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_iteration_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `title` | yes | `string` |  |  |
| `work_item_type` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `priority_id` | no | `integer` |  |  |
| `module_id` | no | `unknown` |  |  |
| `severity_id` | no | `integer` |  |  |
| `assigned_id` | no | `unknown` |  |  |
| `done_ratio` | no | `integer` |  |  |
| `expected_work_hours` | no | `integer` |  |  |
| `start_date` | no | `integer` |  |  |
| `due_date` | no | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_plan` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `type` | yes | `string` |  | enum: gantt, mind |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req plan work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_plan_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `title` | yes | `string` |  |  |
| `work_item_type` | yes | `string` |  |  |
| `parent_work_item_id` | no | `unknown` |  |  |
| `description` | no | `string` |  |  |
| `iteration_id` | no | `unknown` |  |  |
| `module_id` | no | `unknown` |  |  |
| `priority_id` | no | `integer` |  |  |
| `severity_id` | no | `integer` |  |  |
| `status_id` | no | `integer` |  |  |
| `assigned_id` | no | `unknown` |  |  |
| `done_ratio` | no | `integer` |  |  |
| `expected_work_hours` | no | `integer` |  |  |
| `start_date` | no | `integer` |  |  |
| `due_date` | no | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_project` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req project module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_project_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `module_name` | yes | `string` |  |  |
| `owner_user_id` | yes | `unknown` |  |  |
| `parent_module_id` | no | `integer` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Req work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `title` | yes | `string` |  |  |
| `work_item_type` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `priority_id` | no | `integer` |  |  |
| `iteration_id` | no | `unknown` |  |  |
| `module_id` | no | `unknown` |  |  |
| `severity_id` | no | `integer` |  |  |
| `assigned_id` | no | `unknown` |  |  |
| `done_ratio` | no | `integer` |  |  |
| `expected_work_hours` | no | `integer` |  |  |
| `start_date` | no | `integer` |  |  |
| `due_date` | no | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create or update a CodeArts Req work item template

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_create_work_item_template` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_delete_attachment

Description: Delete a CodeArts Req work item attachment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_attachment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `attachment_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req IPD feature set

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_ipd_feature_set` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `feature_set_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete image from CodeArts Req IPD issue description

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_ipd_issue_image` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `file_name` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req IPD label

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_ipd_label` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `label_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req IPD module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_ipd_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `module_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req IPD work hour record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_ipd_work_hour` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `workhour_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req iteration

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_iteration` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_plan` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_project` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req project module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_project_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `module_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete a CodeArts Req project template

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_project_template` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Req work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_delete_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Download a CodeArts Req work item attachment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_download_attachment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `attachment_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Download a CodeArts Req image file

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_download_image_file` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `image_uri` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Download CodeArts Req IPD issue attachment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_download_ipd_issue_attachment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `attachment_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Download image from CodeArts Req IPD issue description

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_download_ipd_issue_image` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `file_name` | yes | `string` |  |  |
| `field_code` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get current CodeArts Req user info

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_current_user_info` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_role

Description: Get current CodeArts Req user role in a project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_current_user_role` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD E2E trace graph

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_e2e_graph` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `category` | yes | `string` |  |  |
| `is_src` | no | `boolean` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD issue detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_issue` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `version` | no | `string` | "v2" | enum: v1, v2 |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD project field option usage

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_project_field_option_used` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `code` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD statistic dashboard

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_statistic_dashboard` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `classification` | yes | `string` |  | enum: requirement, bug |
| `plan` | no | `object` |  |  |
| `created_date` | no | `object` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD tenant field option usage

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_tenant_field_option_used` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD tenant field usage

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_tenant_field_used` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req IPD work item flow detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ipd_work_item_flow_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `issue_category` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get a CodeArts Req requirement pool IR detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_ir` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `program_id` | yes | `string` |  |  |
| `ir_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req iteration detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_iteration` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `iteration_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req plan detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_plan` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project bug density metric

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_bug_density` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `date_range` | no | `string` |  |  |
| `metric_type` | no | `string` |  |  |
| `dividend` | no | `object` |  |  |
| `divisor` | no | `object` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project bugs per developer metric

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_bugs_per_developer` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project completion rate metric

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_completion_rate` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `date_range` | no | `string` |  |  |
| `metric_type` | no | `string` |  |  |
| `sprint_id` | no | `unknown` |  |  |
| `dividend` | no | `object` |  |  |
| `divisor` | no | `object` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project due-days-after config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_due_days_after` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project public config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_public_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project summary

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_summary` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req project workhour config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_project_workhour_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item completion rates

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item_completion_rate` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item index counts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item_index_counts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item issue details from the V2 detail endpoint

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item_issue_details` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `include` | no | `string` | "children,parent" |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item status rule flag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item_status_rule_flag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Req work item template config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_get_work_item_template_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: Group CodeArts Req IPD issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_group_ipd_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `issue_type` | yes | `string` |  |  |
| `group_field_id` | yes | `unknown` |  |  |
| `is_project_group` | no | `boolean` |  |  |
| `group_sort` | no | `string` |  | enum: asc, desc |
| `filter` | no | `array` |  |  |
| `filter_mode` | no | `string` | "AND_OR" | enum: OR_AND, AND_OR |
| `sort` | no | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Leave a CodeArts Req project as the current member

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_leave_project` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req associated commits

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_associated_commits` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `type` | no | `string` | "commit" | enum: commit, branch |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req associated issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_associated_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req associated test cases

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_associated_test_cases` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req associated wikis

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_associated_wikis` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req board work item status records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_board_work_item_status_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req board work item workflow config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_board_work_item_workflow_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `board_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req board work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_board_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `created_time_interval` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req cache data

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_cache_data` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | no | `string` |  |  |
| `type` | no | `string` | "backlog" |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req child work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_child_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `subject` | no | `string` |  |  |
| `query_type` | no | `string` | "basic" | enum: basic, custom, query |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issue attached wikis

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_attached_wikis` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `category` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD category statuses

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_category_statuses` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `category_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD feature sets

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_feature_sets` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `snapshot_version_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issue attachments

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_issue_attachments` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `source_project_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issue fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_issue_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `category_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issue relation config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_issue_relation_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issue tree

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_issue_tree` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `category` | yes | `string` |  |  |
| `keyword` | no | `string` |  |  |
| `number` | no | `array` |  |  |
| `plan` | no | `array` |  |  |
| `modified_date` | no | `object` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `issue_type` | yes | `string` |  |  |
| `filter` | no | `array` |  |  |
| `filter_mode` | no | `string` | "AND_OR" | enum: OR_AND, AND_OR |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD labels

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_labels` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD modules

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_modules` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD project fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_project_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD project users

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_project_users` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD projects

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_projects` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | no | `string` |  |  |
| `model` | no | `string` |  | enum: 10001, 10002, 10003 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD snapshot features

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_snapshot_features` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `snapshot_version_id` | yes | `unknown` |  |  |
| `feature_set_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD feature set snapshot versions

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_snapshot_versions` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD statuses

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_statuses` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `category_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD tenant fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_tenant_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `search` | no | `string` |  |  |
| `sort_info` | no | `object` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD tenant issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_tenant_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | no | `anyOf` |  |  |
| `issue_type` | yes | `string` |  |  |
| `filter` | no | `array` |  |  |
| `filter_mode` | no | `string` | "AND_OR" | enum: OR_AND, AND_OR |
| `sort` | no | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD work hour categories

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_work_hour_categories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `display_value` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD work hour records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_work_hours` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `plan_pi` | no | `array` |  |  |
| `plan_iteration` | no | `array` |  |  |
| `workitem_id` | no | `array` |  |  |
| `created_by` | no | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD workflow fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_workflow_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `category_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req IPD workflow templates

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ipd_workflow_templates` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `category_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req requirement pool IR children

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ir_children` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `program_id` | yes | `string` |  |  |
| `ir_id` | yes | `unknown` |  |  |
| `query_type` | yes | `string` |  | enum: RR, ITEMS |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req requirement pool IR history records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_ir_histories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `ir_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req issue severities

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_issue_severities` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_status_statistics

Description: List CodeArts Req iteration status statistics

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_iteration_status_statistics` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `tracker_id` | no | `integer` |  |  |
| `status_id` | no | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work items in an iteration

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_iteration_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `tracker_id` | no | `number` |  | enum: 2, 3, 5, 6, 7 |
| `status_id` | no | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req iterations

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_iterations` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req board cache fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_job_cache_boards` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `type` | no | `string` | "board" |  |
| `region` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req projects not yet added to the current domain

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_not_added_projects` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req optional work item status configs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_optional_work_item_status_configs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List addable work items for a CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_plan_addable_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `subject` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work items in a plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_plan_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `subject` | no | `string` |  |  |
| `show_type` | no | `string` | "list" | enum: list, tree |
| `tracker_id` | no | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req plans

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_plans` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `status_id` | no | `integer` |  |  |
| `plan_id` | no | `unknown` |  |  |
| `search` | no | `string` |  |  |
| `user_ids` | no | `array` |  |  |
| `sort` | no | `string` |  |  |
| `type` | no | `string` |  | enum: gantt, mind |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req program IR or RR fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_program_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `program_id` | yes | `string` |  |  |
| `field_type` | yes | `string` |  | enum: IR, RR |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project spaces / programs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_programs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `search` | no | `string` |  |  |
| `sort_key` | no | `string` |  | enum: name, created_time |
| `sort_dir` | no | `string` |  | enum: ASC, DESC, asc, desc |
| `is_watched` | no | `boolean` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project bug statistics

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_bug_statistics` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project demand statistics

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_demand_statistics` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project domains

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_domains` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project members

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_members` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project modules

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_modules` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project work hour types

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_work_hour_types` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `status` | no | `number` |  | enum: 1, 2 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project work hour records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_work_hours` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_ids` | yes | `array` |  |  |
| `begin_time` | no | `string` |  |  |
| `end_time` | no | `string` |  |  |
| `work_hours_dates` | no | `string` |  |  |
| `work_hours_types` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req project work item records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_project_work_item_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `operated_time_interval` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req projects

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_projects` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `organization_id` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req related users

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_related_users` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req requirement pool RR history records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_rr_histories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `rr_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req requirement pool RR statuses

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_rr_statuses` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `program_id` | yes | `string` |  |  |
| `rr_ids` | yes | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req requirement pool RRs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_rrs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `program_id` | yes | `string` |  |  |
| `query_type` | no | `string` | "ALL" | enum: ALL, DST, SRC |
| `include_deleted` | no | `boolean` |  |  |
| `updated_time_interval` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req user features

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_user_features` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item comments

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_comments` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item custom fields

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_custom_fields` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | no | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `journalized_type` | no | `string` | "Issue" |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item status attributes

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_status_attributes` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item status configs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_status_configs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item status details

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_status_details` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item statuses

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_statuses` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item tags

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_tags` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `name` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item templates

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_templates` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | no | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item tracker handlers

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_tracker_handlers` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work items in tree mode

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_tree` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `project_id` | yes | `string` |  |  |
| `tracker_ids` | no | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work hour records for a work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_work_hours` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work item workflow config

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_item_workflow_config` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tracker_id` | yes | `number` |  | enum: 2, 3, 5, 6, 7 |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Req work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_list_work_items` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Query CodeArts Req iteration immovable issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_query_iteration_immovable_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `version_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Transfer CodeArts Req IPD work item flow

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_transfer_ipd_work_item_flow` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `issue_category` | yes | `string` |  |  |
| `flow_code` | yes | `string` |  |  |
| `process_context` | no | `object` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req cache data

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_cache_data` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_feature_set

Description: Update CodeArts Req IPD feature set

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_feature_set` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `feature_set_id` | yes | `unknown` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `title` | no | `string` |  |  |
| `position_float` | no | `number` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req IPD label

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_label` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_module

Description: Update CodeArts Req IPD module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `display_value` | yes | `string` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `description` | no | `string` |  |  |
| `assignee` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |
| `module_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req IPD project field

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_project_field` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_tenant_field

Description: Update CodeArts Req IPD tenant field

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_tenant_field` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_work_hour

Description: Update CodeArts Req IPD work hour record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_ipd_work_hour` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_iteration

Description: Update CodeArts Req iteration

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_iteration` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `begin_time` | no | `string` |  |  |
| `end_time` | no | `string` |  |  |
| `description` | no | `string` |  |  |
| `status` | no | `string` |  | enum: 0, 1, 2 |
| `over_type` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req iteration state

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_iteration_state` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `iteration_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `status` | yes | `string` |  | enum: 0, 1, 2 |
| `due_date` | no | `string` |  |  |
| `start_date` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_plan` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update image for a CodeArts Req plan

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_plan_image` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |
| `img_url` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req project

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_project` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update a CodeArts Req project member role

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_project_member_role` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `user_id` | yes | `unknown` |  |  |
| `role_id` | yes | `number` |  | enum: -1, 3, 4, 5, 6, 7, 8, 9 |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req project module

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_project_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `module_id` | yes | `unknown` |  |  |
| `module_name` | yes | `string` |  |  |
| `owner_user_id` | yes | `unknown` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update a CodeArts Req project template

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_project_template` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_work_item

Description: Update CodeArts Req work item

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_work_item` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `title` | no | `string` |  |  |
| `work_item_type` | no | `string` |  |  |
| `description` | no | `string` |  |  |
| `status_id` | no | `integer` |  |  |
| `priority_id` | no | `integer` |  |  |
| `iteration_id` | no | `unknown` |  |  |
| `module_id` | no | `unknown` |  |  |
| `severity_id` | no | `integer` |  |  |
| `assigned_id` | no | `unknown` |  |  |
| `done_ratio` | no | `integer` |  |  |
| `expected_work_hours` | no | `integer` |  |  |
| `start_date` | no | `integer` |  |  |
| `due_date` | no | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update a CodeArts Req work item comment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_work_item_comment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `comment_id` | yes | `unknown` |  |  |
| `content` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Req work item flow

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_update_work_item_flow` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `status_id` | yes | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Upload a CodeArts Req work item attachment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_upload_attachment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `work_item_id` | yes | `unknown` |  |  |
| `file_path` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Upload attachment to CodeArts Req IPD issue

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_upload_ipd_issue_attachment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `file_path` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Upload image to CodeArts Req IPD issue description

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_upload_ipd_issue_image` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `issue_id` | yes | `unknown` |  |  |
| `file_path` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Upload an image for CodeArts Req work items

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_upload_work_item_image` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `file_path` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Validate whether a CodeArts Req module name already exists

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `req_validate_module_name` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `module_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

## Repo

| API | Description |
| --- | --- |
| `repo_close_merge_request` | Close CodeArts Repo merge request |
| `repo_compare_refs` | Compare CodeArts Repo refs |
| `repo_create_merge_request` | Create CodeArts Repo merge request |
| `repo_create_merge_request_discussion` | Create CodeArts Repo merge request discussion |
| `repo_create_repository` | Create CodeArts Repo repository |
| `repo_create_tag` | Create CodeArts Repo tag |
| `repo_delete_tag` | Delete CodeArts Repo tag |
| `repo_get_branch` | Get CodeArts Repo branch detail |
| `repo_get_commit` | Get CodeArts Repo commit detail |
| `repo_get_file` | Get CodeArts Repo file content |
| `repo_get_merge_request` | Get CodeArts Repo merge request detail |
| `repo_get_repository` | Get CodeArts Repo repository detail |
| `repo_get_tag` | Get CodeArts Repo tag detail |
| `repo_list_branches` | List CodeArts Repo branches |
| `repo_list_commits` | List CodeArts Repo commits |
| `repo_list_events` | List CodeArts Repo events |
| `repo_list_merge_request_changes` | List CodeArts Repo merge request changes |
| `repo_list_merge_request_discussions` | List CodeArts Repo merge request discussions |
| `repo_list_merge_requests` | List CodeArts Repo merge requests |
| `repo_list_protected_branches` | List CodeArts Repo protected branches |
| `repo_list_repositories` | List CodeArts Repo repositories |
| `repo_list_repository_labels` | List CodeArts Repo repository labels |
| `repo_list_tags` | List CodeArts Repo tags |
| `repo_merge_merge_request` | Merge CodeArts Repo merge request |
| `repo_review_merge_request` | Review CodeArts Repo merge request |

### repo_close_merge_request

Description: Close CodeArts Repo merge request

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_close_merge_request` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Compare CodeArts Repo refs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_compare_refs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `from` | yes | `string` |  |  |
| `to` | yes | `string` |  |  |
| `straight` | no | `boolean` |  |  |
| `ignore_whitespace_change` | no | `boolean` |  |  |
| `view` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Repo merge request

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_create_merge_request` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `source_branch` | yes | `string` |  |  |
| `target_branch` | yes | `string` |  |  |
| `title` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Repo merge request discussion

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_create_merge_request_discussion` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |
| `body` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Repo repository

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_create_repository` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_uuid` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `import_members` | no | `integer` |  |  |
| `template_id` | no | `string` |  |  |
| `visibility_level` | no | `number` |  | enum: 0, 20 |
| `import_url` | no | `string` |  |  |
| `description` | no | `string` |  |  |
| `gitignore_id` | no | `string` |  |  |
| `license_id` | no | `integer` |  |  |
| `enable_readme` | no | `anyOf` |  |  |
| `caller` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Repo tag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_create_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `tag_name` | yes | `string` |  |  |
| `ref` | yes | `string` |  |  |
| `message` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Repo tag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_delete_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `tag_name` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo branch detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_branch` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `branch_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo commit detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_commit` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `commit_sha` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo file content

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_file` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `file_path` | yes | `string` |  |  |
| `branch` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo merge request detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_merge_request` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo repository detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_repository` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Repo tag detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_get_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `tag_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo branches

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_branches` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo commits

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_commits` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |
| `ref_name` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo events

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_events` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo merge request changes

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_merge_request_changes` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo merge request discussions

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_merge_request_discussions` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo merge requests

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_merge_requests` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |
| `state` | no | `string` |  | enum: all, opened, closed, merged |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo protected branches

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_protected_branches` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo repositories

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_repositories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo repository labels

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_repository_labels` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Repo tags

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_list_tags` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Merge CodeArts Repo merge request

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_merge_merge_request` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |
| `squash` | no | `boolean` |  |  |
| `force_merge` | no | `boolean` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Review CodeArts Repo merge request

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `repo_review_merge_request` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |
| `merge_request_iid` | yes | `unknown` |  |  |
| `action_type` | yes | `string` |  | enum: approve, reject, reset |
| `approver_comment` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

## Pipeline

| API | Description |
| --- | --- |
| `pipeline_approve_run` | Approve CodeArts Pipeline manual review |
| `pipeline_bind_variable_groups_to_pipeline` | Bind CodeArts Pipeline variable groups to pipeline |
| `pipeline_create_extension_endpoint` | Create CodeArts Pipeline extension endpoint |
| `pipeline_create_group` | Create CodeArts Pipeline group |
| `pipeline_create_project_strategy` | Create CodeArts Pipeline project strategy |
| `pipeline_create_rule` | Create CodeArts Pipeline rule |
| `pipeline_create_strategy` | Create CodeArts Pipeline strategy |
| `pipeline_create_tag` | Create CodeArts Pipeline tag |
| `pipeline_create_variable_group` | Create CodeArts Pipeline variable group |
| `pipeline_delete_extension_endpoint` | Delete CodeArts Pipeline extension endpoint |
| `pipeline_delete_group` | Delete CodeArts Pipeline group |
| `pipeline_delete_pipeline` | Delete CodeArts Pipeline |
| `pipeline_delete_project_strategy` | Delete CodeArts Pipeline project strategy |
| `pipeline_delete_rule` | Delete CodeArts Pipeline rule |
| `pipeline_delete_strategy` | Delete CodeArts Pipeline strategy |
| `pipeline_delete_tag` | Delete CodeArts Pipeline tag |
| `pipeline_delete_variable_group` | Delete CodeArts Pipeline variable group |
| `pipeline_disable_pipeline` | Disable CodeArts Pipeline |
| `pipeline_enable_pipeline` | Enable CodeArts Pipeline |
| `pipeline_get_extension_endpoint` | Get CodeArts Pipeline extension endpoint detail |
| `pipeline_get_extension_module` | Get CodeArts Pipeline extension module detail |
| `pipeline_get_manual_review_context` | Get CodeArts Pipeline manual review context |
| `pipeline_get_pipeline` | Get CodeArts Pipeline detail |
| `pipeline_get_plugin_inputs` | Get CodeArts Pipeline plugin inputs |
| `pipeline_get_plugin_outputs` | Get CodeArts Pipeline plugin outputs |
| `pipeline_get_plugin_version` | Get CodeArts Pipeline plugin version detail |
| `pipeline_get_project_strategy` | Get CodeArts Pipeline project strategy |
| `pipeline_get_project_strategy_detail` | Get CodeArts Pipeline project strategy detail |
| `pipeline_get_project_strategy_related_info` | Get CodeArts Pipeline project strategy related info |
| `pipeline_get_rule` | Get CodeArts Pipeline rule detail |
| `pipeline_get_rule_related_info` | Get CodeArts Pipeline rule related info |
| `pipeline_get_run` | Get CodeArts Pipeline run detail |
| `pipeline_get_run_detail` | Get CodeArts Pipeline run detail |
| `pipeline_get_run_log` | Get CodeArts Pipeline run step log |
| `pipeline_get_run_parameters` | Get CodeArts Pipeline run parameters |
| `pipeline_get_step_outputs` | Get CodeArts Pipeline step outputs |
| `pipeline_get_strategy` | Get CodeArts Pipeline strategy detail |
| `pipeline_get_strategy_related_info` | Get CodeArts Pipeline strategy related info |
| `pipeline_get_variable_group` | Get CodeArts Pipeline variable group detail |
| `pipeline_inherit_project_strategy` | Inherit CodeArts Pipeline project strategy |
| `pipeline_list_artifacts` | List CodeArts Pipeline artifacts |
| `pipeline_list_available_publishers` | List CodeArts Pipeline available publishers |
| `pipeline_list_base_plugins` | List CodeArts Pipeline base plugins |
| `pipeline_list_base_plugins_paged` | List CodeArts Pipeline base plugins (paged) |
| `pipeline_list_extension_endpoints` | List CodeArts Pipeline extension endpoints |
| `pipeline_list_extension_modules` | List CodeArts Pipeline extension modules |
| `pipeline_list_groups` | List CodeArts Pipeline groups |
| `pipeline_list_pipeline_variable_groups` | List CodeArts Pipeline variable groups for pipeline |
| `pipeline_list_pipelines` | List CodeArts Pipelines |
| `pipeline_list_plugin_versions` | List CodeArts Pipeline plugin versions |
| `pipeline_list_plugins` | List CodeArts Pipeline plugins |
| `pipeline_list_project_strategies` | List CodeArts Pipeline project strategies |
| `pipeline_list_publishers` | List CodeArts Pipeline publishers |
| `pipeline_list_rule_types` | List CodeArts Pipeline rule types |
| `pipeline_list_rules` | List CodeArts Pipeline rules |
| `pipeline_list_runs` | List CodeArts Pipeline runs |
| `pipeline_list_stage_plugins` | List CodeArts Pipeline stage plugins |
| `pipeline_list_strategies` | List CodeArts Pipeline strategies |
| `pipeline_list_strategy_children` | List CodeArts Pipeline strategy children |
| `pipeline_list_tags` | List CodeArts Pipeline tags |
| `pipeline_list_templates` | List CodeArts Pipeline templates |
| `pipeline_list_variable_groups` | List CodeArts Pipeline variable groups |
| `pipeline_move_pipelines_to_group` | Move CodeArts Pipelines to group |
| `pipeline_reject_run` | Reject CodeArts Pipeline manual review |
| `pipeline_retry_run` | Retry CodeArts Pipeline run |
| `pipeline_run_pipeline` | Run CodeArts Pipeline |
| `pipeline_set_tags_for_pipelines` | Set CodeArts Pipeline tags for pipelines |
| `pipeline_stop_run` | Stop CodeArts Pipeline run |
| `pipeline_switch_project_strategy` | Switch CodeArts Pipeline project strategy |
| `pipeline_switch_strategy` | Switch CodeArts Pipeline strategy |
| `pipeline_update_extension_endpoint` | Update CodeArts Pipeline extension endpoint |
| `pipeline_update_group` | Update CodeArts Pipeline group |
| `pipeline_update_project_strategy` | Update CodeArts Pipeline project strategy |
| `pipeline_update_rule` | Update CodeArts Pipeline rule |
| `pipeline_update_strategy` | Update CodeArts Pipeline strategy |
| `pipeline_update_tag` | Update CodeArts Pipeline tag |
| `pipeline_update_variable_group` | Update CodeArts Pipeline variable group |

### pipeline_approve_run

Description: Approve CodeArts Pipeline manual review

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_approve_run` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `job_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Bind CodeArts Pipeline variable groups to pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_bind_variable_groups_to_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `pipeline_group_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline extension endpoint

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_extension_endpoint` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | no | `string` |  |  |
| `region_name` | no | `string` |  |  |
| `module_id` | no | `string` |  |  |
| `name` | no | `string` |  |  |
| `url` | no | `string` |  |  |
| `authorization` | no | `object` |  |  |
| `data` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `parent_id` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `rules` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline rule

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_rule` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `type` | yes | `string` |  |  |
| `layout_content` | yes | `string` |  |  |
| `plugin_id` | no | `string` |  |  |
| `plugin_name` | no | `string` |  |  |
| `plugin_version` | no | `string` |  |  |
| `content` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `rules` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline tag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `color` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Pipeline variable group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_create_variable_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `variables` | no | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline extension endpoint

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_extension_endpoint` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `uuid` | yes | `string` |  |  |
| `project_id` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline rule

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_rule` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline tag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tag_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete CodeArts Pipeline variable group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_delete_variable_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Disable CodeArts Pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_disable_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Enable CodeArts Pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_enable_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline extension endpoint detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_extension_endpoint` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `uuid` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline extension module detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_extension_module` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `module_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline manual review context

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_manual_review_context` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline plugin inputs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_plugin_inputs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `plugin_name` | yes | `string` |  |  |
| `display_name` | yes | `string` |  |  |
| `version` | yes | `string` |  |  |
| `plugin_attribution` | yes | `string` |  | enum: custom, official |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline plugin outputs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_plugin_outputs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `plugin_name` | yes | `string` |  |  |
| `display_name` | yes | `string` |  |  |
| `version` | yes | `string` |  |  |
| `plugin_attribution` | yes | `string` |  | enum: custom, official |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline plugin version detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_plugin_version` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `plugin_name` | yes | `string` |  |  |
| `version` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline project strategy detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_project_strategy_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline project strategy related info

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_project_strategy_related_info` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline rule detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_rule` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline rule related info

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_rule_related_info` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline run detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_run` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline run detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_run_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline run step log

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_run_log` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `job_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline run parameters

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_run_parameters` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline step outputs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_step_outputs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `step_run_ids` | yes | `array` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline strategy detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `cloud_project_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline strategy related info

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_strategy_related_info` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Pipeline variable group detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_get_variable_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Inherit CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_inherit_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `parent_id` | yes | `unknown` |  |  |
| `rules` | no | `array` |  |  |
| `is_valid` | yes | `boolean` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline artifacts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_artifacts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline available publishers

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_available_publishers` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline base plugins

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_base_plugins` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline base plugins (paged)

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_base_plugins_paged` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline extension endpoints

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_extension_endpoints` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `region_name` | yes | `string` |  |  |
| `module_id` | no | `string` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline extension modules

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_extension_modules` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `locations` | yes | `array` |  |  |
| `project_id` | no | `string` |  |  |
| `region_name` | no | `string` |  |  |
| `name` | no | `string` |  |  |
| `product_line` | no | `string` |  |  |
| `tags` | no | `array` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline groups

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_groups` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline variable groups for pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_pipeline_variable_groups` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipelines

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_pipelines` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline plugin versions

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_plugin_versions` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `plugin_name` | yes | `string` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline plugins

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_plugins` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |
| `plugin_attribution` | no | `string` |  | enum: custom, official |
| `business_type` | no | `array` |  |  |
| `maintainer` | no | `string` |  |  |
| `plugin_name` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline project strategies

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_project_strategies` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `offset` | yes | `integer` |  |  |
| `limit` | yes | `integer` |  |  |
| `include_tenant_rule_set` | no | `boolean` | false |  |
| `name` | no | `string` |  |  |
| `is_valid` | no | `boolean` |  |  |
| `type` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline publishers

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_publishers` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline rule types

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_rule_types` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline rules

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_rules` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `offset` | yes | `integer` |  |  |
| `limit` | yes | `integer` |  |  |
| `cloud_project_id` | no | `unknown` |  |  |
| `type` | no | `string` |  |  |
| `name` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline runs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_runs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline stage plugins

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_stage_plugins` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `use_condition` | yes | `string` |  |  |
| `business_type` | no | `array` |  |  |
| `deploy_type` | no | `string` |  |  |
| `comp_extend_type` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline strategies

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_strategies` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `offset` | yes | `integer` |  |  |
| `limit` | yes | `integer` |  |  |
| `include_tenant_rule_set` | no | `boolean` | true |  |
| `name` | no | `string` |  |  |
| `is_valid` | no | `boolean` |  |  |
| `type` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline strategy children

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_strategy_children` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `offset` | no | `integer` | 0 |  |
| `limit` | no | `integer` | 20 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline tags

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_tags` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `proj_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline templates

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_templates` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `tenant_id` | yes | `string` |  |  |
| `language` | no | `string` |  |  |
| `is_system` | no | `boolean` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Pipeline variable groups

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_list_variable_groups` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `name` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Move CodeArts Pipelines to group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_move_pipelines_to_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `group_id` | yes | `unknown` |  |  |
| `pipelines` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Reject CodeArts Pipeline manual review

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_reject_run` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `job_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Retry CodeArts Pipeline run

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_retry_run` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Run CodeArts Pipeline

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_run_pipeline` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_id` | yes | `unknown` |  |  |
| `branch` | no | `string` |  |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Set CodeArts Pipeline tags for pipelines

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_set_tags_for_pipelines` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `pipeline_ids` | yes | `array` |  |  |
| `tag_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Stop CodeArts Pipeline run

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_stop_run` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `pipeline_id` | yes | `string` |  |  |
| `run_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Switch CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_switch_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `is_valid` | yes | `boolean` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Switch CodeArts Pipeline strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_switch_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `is_valid` | yes | `boolean` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline extension endpoint

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_extension_endpoint` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `uuid` | yes | `string` |  |  |
| `project_id` | no | `string` |  |  |
| `region_name` | no | `string` |  |  |
| `module_id` | no | `string` |  |  |
| `name` | no | `string` |  |  |
| `url` | no | `string` |  |  |
| `authorization` | no | `object` |  |  |
| `data` | no | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline project strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_project_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `rules` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline rule

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_rule` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `type` | yes | `string` |  |  |
| `plugin_id` | no | `string` |  |  |
| `plugin_name` | no | `string` |  |  |
| `plugin_version` | no | `string` |  |  |
| `content` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline strategy

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_strategy` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | yes | `string` |  |  |
| `rule_set_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `rules` | no | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline tag

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_tag` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `tag_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `color` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Pipeline variable group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `pipeline_update_variable_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `description` | no | `string` |  |  |
| `variables` | no | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

## Check

| API | Description |
| --- | --- |
| `check_create_task` | Create CodeArts Check task |
| `check_get_metrics` | Get CodeArts Check task metrics |
| `check_get_task` | Get CodeArts Check task detail |
| `check_list_rulesets` | List CodeArts Check rulesets |
| `check_list_task_issues` | List CodeArts Check task issues |
| `check_list_tasks` | List CodeArts Check tasks |
| `check_run_task` | Run CodeArts Check task |
| `check_stop_task` | Stop CodeArts Check task |

### check_create_task

Description: Create CodeArts Check task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_create_task` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `task_name` | yes | `string` |  |  |
| `git_url` | yes | `string` |  |  |
| `git_branch` | yes | `string` |  |  |
| `language` | yes | `string` |  |  |
| `rule_set_id` | no | `unknown` |  |  |
| `task_type` | no | `string` |  | enum: full, incremental |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Check task metrics

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_get_metrics` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | no | `string` |  |  |
| `task_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Check task detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_get_task` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Check rulesets

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_list_rulesets` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `language` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Check task issues

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_list_task_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `task_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Check tasks

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_list_tasks` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Run CodeArts Check task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_run_task` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Stop CodeArts Check task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `check_stop_task` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

## TestPlan

| API | Description |
| --- | --- |
| `testplan_get_case` | Get CodeArts TestPlan case detail |
| `testplan_get_plan` | Get CodeArts TestPlan plan detail |
| `testplan_list_cases` | List CodeArts TestPlan cases |
| `testplan_list_issues` | List CodeArts TestPlan requirement tree |
| `testplan_list_plans` | List CodeArts TestPlan plans |
| `testplan_list_runs` | List CodeArts TestPlan runs |
| `testplan_run_cases` | Run CodeArts TestPlan cases |

### testplan_get_case

Description: Get CodeArts TestPlan case detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_get_case` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `case_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts TestPlan plan detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_get_plan` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts TestPlan cases

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_list_cases` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts TestPlan requirement tree

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_list_issues` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts TestPlan plans

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_list_plans` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts TestPlan runs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_list_runs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `plan_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Run CodeArts TestPlan cases

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `testplan_run_cases` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `execute_list` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

## Deploy

| API | Description |
| --- | --- |
| `deploy_add_v4_environment_hosts` | Add hosts into a CodeArts Deploy v4 environment |
| `deploy_cancel_v4_deploy_record` | Cancel CodeArts Deploy v4 deploy record |
| `deploy_create_application` | Create CodeArts Deploy application |
| `deploy_create_environment` | Create CodeArts Deploy environment |
| `deploy_create_task_by_template` | Create CodeArts Deploy task from template |
| `deploy_delete_v4_cluster_hosts` | Delete hosts from a CodeArts Deploy v4 cluster |
| `deploy_delete_v4_environment_hosts` | Delete hosts from a CodeArts Deploy v4 environment |
| `deploy_get_app` | Get CodeArts Deploy application detail |
| `deploy_get_app_log` | Get CodeArts Deploy application log |
| `deploy_get_deploy_source_detail` | Get CodeArts Deploy task source detail |
| `deploy_get_execution_params` | Get CodeArts Deploy execution params |
| `deploy_get_history_detail` | Get CodeArts Deploy history detail |
| `deploy_get_host_group` | Get CodeArts Deploy host group detail |
| `deploy_get_last_record_detail` | Get CodeArts Deploy v4 orchestration last record detail |
| `deploy_get_runtime_variables` | Get CodeArts Deploy runtime variables |
| `deploy_get_status` | Get CodeArts Deploy task status |
| `deploy_get_task` | Get CodeArts Deploy task detail |
| `deploy_get_template_detail` | Get CodeArts Deploy template detail |
| `deploy_get_v4_cluster` | Get CodeArts Deploy v4 cluster detail |
| `deploy_get_v4_cluster_count` | Get CodeArts Deploy v4 cluster counts |
| `deploy_get_v4_cluster_host` | Get CodeArts Deploy v4 cluster host detail |
| `deploy_get_v4_deploy_record` | Get CodeArts Deploy v4 deploy record detail |
| `deploy_get_v4_deploy_record_step_detail` | Get CodeArts Deploy v4 deploy record step detail |
| `deploy_get_v4_deploy_record_step_logs` | Get CodeArts Deploy v4 deploy record step logs |
| `deploy_get_v4_environment` | Get CodeArts Deploy v4 environment detail |
| `deploy_get_v4_environment_resource_detail` | Get CodeArts Deploy v4 environment resource detail |
| `deploy_import_hosts_to_environment` | Import hosts into a CodeArts Deploy environment |
| `deploy_list_app_host_groups` | List CodeArts Deploy host groups available to an application |
| `deploy_list_app_operations_log` | List CodeArts Deploy application operation logs |
| `deploy_list_apps` | List CodeArts Deploy applications |
| `deploy_list_deployment_units` | List CodeArts Deploy deployment units for an application |
| `deploy_list_environment_hosts` | List CodeArts Deploy hosts in an environment |
| `deploy_list_environments` | List CodeArts Deploy application environments |
| `deploy_list_histories` | List CodeArts Deploy histories |
| `deploy_list_host_group_environments` | List CodeArts Deploy environments linked to a host group |
| `deploy_list_host_group_hosts` | List CodeArts Deploy hosts in a host group |
| `deploy_list_host_groups` | List CodeArts Deploy host groups |
| `deploy_list_system_configs` | List CodeArts Deploy system config keys |
| `deploy_list_tasks` | List CodeArts Deploy tasks |
| `deploy_list_v4_applications` | List CodeArts Deploy v4 applications |
| `deploy_list_v4_cluster_hosts` | List CodeArts Deploy v4 cluster hosts |
| `deploy_list_v4_clusters` | List CodeArts Deploy v4 clusters |
| `deploy_list_v4_deploy_records` | List CodeArts Deploy v4 deploy records |
| `deploy_list_v4_environment_applications` | List CodeArts Deploy v4 applications under an environment |
| `deploy_list_v4_environment_hosts` | List CodeArts Deploy v4 environment hosts |
| `deploy_list_v4_environments` | List CodeArts Deploy v4 environments |
| `deploy_list_v4_orchestrations` | List CodeArts Deploy v4 orchestrations |
| `deploy_list_variable_history` | List CodeArts Deploy variable history by scope |
| `deploy_list_variables` | List CodeArts Deploy variables by scope |
| `deploy_modify_application` | Modify CodeArts Deploy application |
| `deploy_pass_v4_manual_check` | Pass CodeArts Deploy v4 manual check step |
| `deploy_query_variables` | Query CodeArts Deploy variables by scope |
| `deploy_refuse_v4_manual_check` | Refuse CodeArts Deploy v4 manual check step |
| `deploy_rerun_v4_deploy_record` | Rerun CodeArts Deploy v4 deploy record |
| `deploy_retry_v4_deploy_record` | Retry CodeArts Deploy v4 deploy record |
| `deploy_rollback_app` | Rollback CodeArts Deploy task |
| `deploy_rollback_v4_deploy_record` | Rollback CodeArts Deploy v4 deploy record |
| `deploy_start_app` | Start CodeArts Deploy task |
| `deploy_stop_app` | Stop CodeArts Deploy task |

### deploy_add_v4_environment_hosts

Description: Add hosts into a CodeArts Deploy v4 environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_add_v4_environment_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |
| `cluster_id` | yes | `unknown` |  |  |
| `host_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Cancel CodeArts Deploy v4 deploy record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_cancel_v4_deploy_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Deploy application

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_create_application` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `name` | yes | `string` |  |  |
| `description` | no | `string` | "" |  |
| `timeout` | no | `number \| null` |  |  |
| `trigger` | no | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} |  |
| `slave_cluster_id` | no | `string` | "" |  |
| `slave_resource_type` | no | `string` | "" |  |
| `create_type` | no | `string` | "template" |  |
| `is_draft` | no | `boolean` | false |  |
| `group_id` | no | `string` |  |  |
| `agency_urn` | no | `string` |  |  |
| `arrange_infos` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Deploy environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_create_environment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `application_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `os` | no | `string` | "linux" |  |
| `deploy_type` | no | `integer` | 0 |  |
| `description` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Create CodeArts Deploy task from template

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_create_task_by_template` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `project_name` | yes | `string` |  |  |
| `template_id` | yes | `unknown` |  |  |
| `task_name` | yes | `string` |  |  |
| `configs` | no | `array` | [] |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete hosts from a CodeArts Deploy v4 cluster

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_delete_v4_cluster_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_id` | yes | `unknown` |  |  |
| `host_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Delete hosts from a CodeArts Deploy v4 environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_delete_v4_environment_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |
| `host_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy application detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_app` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `application_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy application log

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_app_log` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `application_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `step_id` | no | `unknown` |  |  |
| `offset` | no | `string` | "0" |  |
| `end_offset` | no | `string` | "0" |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy task source detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_deploy_source_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy execution params

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_execution_params` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy history detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_history_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy host group detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_host_group` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 orchestration last record detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_last_record_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `orchestration_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy runtime variables

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_runtime_variables` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `app_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy task status

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_status` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `record_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy task detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_task` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy template detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_template_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | yes | `string` |  |  |
| `task_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 cluster detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_cluster` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_id` | yes | `unknown` |  |  |
| `cluster_type` | yes | `string` |  | enum: host, container |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 cluster counts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_cluster_count` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_type` | yes | `string` |  | enum: host, container |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 cluster host detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_cluster_host` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_id` | yes | `unknown` |  |  |
| `host_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 deploy record detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_deploy_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `step_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 deploy record step detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_deploy_record_step_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 deploy record step logs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_deploy_record_step_logs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 environment detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_environment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Deploy v4 environment resource detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_get_v4_environment_resource_detail` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Import hosts into a CodeArts Deploy environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_import_hosts_to_environment` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `application_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |
| `group_id` | yes | `unknown` |  |  |
| `host_ids` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy host groups available to an application

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_app_host_groups` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `application_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy application operation logs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_app_operations_log` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `app_id` | yes | `string` |  |  |
| `page_size` | no | `integer` | 20 |  |
| `page_index` | no | `integer` | 1 |  |
| `start_date` | no | `string` |  |  |
| `end_date` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy applications

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_apps` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy deployment units for an application

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_deployment_units` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `app_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy hosts in an environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_environment_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `application_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy application environments

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_environments` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `application_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy histories

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_histories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `task_id` | yes | `unknown` |  |  |
| `start_date` | no | `string` |  |  |
| `end_date` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy environments linked to a host group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_host_group_environments` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `group_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy hosts in a host group

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_host_group_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `group_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy host groups

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_host_groups` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy system config keys

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_system_configs` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_tasks

Description: List CodeArts Deploy tasks

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_tasks` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 applications

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_applications` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `limit` | no | `integer` | 20 |  |
| `offset` | no | `integer` | 0 |  |
| `keyword` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 cluster hosts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_cluster_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 clusters

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_clusters` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `cluster_type` | yes | `string` |  | enum: host, container |
| `body` | no | `object` | {} |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 deploy records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_deploy_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `limit` | no | `integer` | 20 |  |
| `offset` | no | `integer` | 0 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 applications under an environment

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_environment_applications` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |
| `limit` | no | `integer` | 20 |  |
| `offset` | no | `integer` | 0 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 environment hosts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_environment_hosts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `environment_id` | yes | `unknown` |  |  |
| `query` | no | `object` | {} |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 environments

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_environments` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `limit` | no | `integer` | 20 |  |
| `offset` | no | `integer` | 0 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy v4 orchestrations

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_v4_orchestrations` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `app_id` | yes | `unknown` |  |  |
| `limit` | no | `integer` | 20 |  |
| `offset` | no | `integer` | 0 |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Deploy variable history by scope

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_variable_history` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_list_variables

Description: List CodeArts Deploy variables by scope

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_list_variables` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_modify_application

Description: Modify CodeArts Deploy application

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_modify_application` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `name` | yes | `string` |  |  |
| `description` | no | `string` | "" |  |
| `timeout` | no | `number \| null` |  |  |
| `trigger` | no | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} |  |
| `slave_cluster_id` | no | `string` | "" |  |
| `slave_resource_type` | no | `string` | "" |  |
| `create_type` | no | `string` | "template" |  |
| `is_draft` | no | `boolean` | false |  |
| `group_id` | no | `string` |  |  |
| `agency_urn` | no | `string` |  |  |
| `arrange_infos` | yes | `array` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Pass CodeArts Deploy v4 manual check step

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_pass_v4_manual_check` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Query CodeArts Deploy variables by scope

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_query_variables` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_refuse_v4_manual_check

Description: Refuse CodeArts Deploy v4 manual check step

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_refuse_v4_manual_check` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `step_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Rerun CodeArts Deploy v4 deploy record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_rerun_v4_deploy_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Retry CodeArts Deploy v4 deploy record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_retry_v4_deploy_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Rollback CodeArts Deploy task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_rollback_app` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Rollback CodeArts Deploy v4 deploy record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_rollback_v4_deploy_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `body` | no | `object` | {} |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Start CodeArts Deploy task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_start_app` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `trigger_source` | no | `number \| string` |  | enum: 0, 1, 0, 1 |
| `params` | no | `array` | [] |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Stop CodeArts Deploy task

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `deploy_stop_app` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | yes | `string` |  |  |
| `record_id` | yes | `unknown` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

## Build

| API | Description |
| --- | --- |
| `build_append_job_step` | Append a new step to a CodeArts Build job |
| `build_append_release_upload_step` | Append the official release repository upload step to a CodeArts Build job |
| `build_configure_release_upload_step` | Configure an existing release repository upload step in a CodeArts Build job |
| `build_get_error_log` | Get CodeArts Build error log analysis |
| `build_get_full_stages` | Get CodeArts Build full stages |
| `build_get_history_details` | Get CodeArts Build history details |
| `build_get_info_record` | Get CodeArts Build info record |
| `build_get_job` | Get CodeArts Build job detail |
| `build_get_project_record_statistics` | Get CodeArts Build project record statistics |
| `build_get_real_time_log` | Get CodeArts Build real-time log |
| `build_get_record` | Get CodeArts Build record detail |
| `build_get_record_flow_graph` | Get CodeArts Build record flow graph |
| `build_get_record_script` | Get CodeArts Build record script |
| `build_list_build_parameters` | List CodeArts Build parameters |
| `build_list_jobs` | List CodeArts Build jobs |
| `build_list_project_records` | List CodeArts Build project records |
| `build_list_records` | List CodeArts Build records |
| `build_prepare_deployable_node_app` | Prepare a single-file deployable Node app by appending bundling commands to a build step |
| `build_prepare_node_runtime_bundle` | Prepare a Node runtime bundle by appending packaging commands to a build step |
| `build_run_job` | Run CodeArts Build job |
| `build_stop_job` | Stop CodeArts Build job |
| `build_update_job_step` | Update CodeArts Build job step image or command |

### build_append_job_step

Description: Append a new step to a CodeArts Build job

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_append_job_step` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `step_name` | yes | `string` |  |  |
| `module_id` | yes | `string` |  |  |
| `enable` | no | `boolean` | true |  |
| `version` | no | `string` |  |  |
| `image` | no | `string` |  |  |
| `command` | no | `string` |  |  |
| `pre_condition` | no | `string` |  |  |
| `properties` | no | `object` |  |  |
| `insert_after_step_name` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Append the official release repository upload step to a CodeArts Build job

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_append_release_upload_step` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `path` | yes | `string` |  |  |
| `package_name` | no | `string` |  |  |
| `package_version` | no | `string` |  |  |
| `custom_upload_path` | no | `string` |  |  |
| `upload_tool` | no | `string` | "curl" |  |
| `continue_on_failure` | no | `boolean` | false |  |
| `step_name` | no | `string` | "Upload package to release repository" |  |
| `pre_condition` | no | `string` | "SUCCESS" |  |
| `insert_after_step_name` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Configure an existing release repository upload step in a CodeArts Build job

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_configure_release_upload_step` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `step_name` | no | `string` | "Upload package to release repository" |  |
| `file` | yes | `string` |  |  |
| `package_name` | no | `string` |  |  |
| `build_version` | no | `string` |  |  |
| `custom_upload_path` | no | `string` |  |  |
| `upload_tool` | no | `string` | "curl" |  |
| `remain_origin_path` | no | `string` | "FLAT" |  |
| `pre_condition` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build error log analysis

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_error_log` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `job_id` | yes | `string` |  |  |
| `build_no` | yes | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build full stages

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_full_stages` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `record_id` | yes | `string` |  |  |
| `cascade` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build history details

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_history_details` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `build_number` | yes | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build info record

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_info_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `build_no` | yes | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build job detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_job` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build project record statistics

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_project_record_statistics` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | yes | `string` |  |  |
| `build_project_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build real-time log

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_real_time_log` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `build_no` | yes | `integer` |  |  |
| `offset` | yes | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build record detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_record` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `record_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build record flow graph

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_record_flow_graph` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `record_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Build record script

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_get_record_script` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `record_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Build parameters

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_list_build_parameters` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `build_no` | yes | `integer` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Build jobs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_list_jobs` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Build project records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_list_project_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `build_project_id` | no | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Build records

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_list_records` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `job_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Prepare a single-file deployable Node app by appending bundling commands to a build step

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_prepare_deployable_node_app` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### build_prepare_node_runtime_bundle

Description: Prepare a Node runtime bundle by appending packaging commands to a build step

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_prepare_node_runtime_bundle` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `step_name` | no | `string` |  |  |
| `output_file` | no | `string` | "codearts-mcp.tgz" |  |
| `staging_dir` | no | `string` | ".release-bundle" |  |
| `replace_existing` | no | `boolean` | false |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Run CodeArts Build job

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_run_job` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `branch` | no | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Stop CodeArts Build job

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_stop_job` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | yes | `string` |  |  |
| `build_no` | yes | `integer` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Update CodeArts Build job step image or command

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `build_update_job_step` |

Arguments:

No arguments.

Call example:

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

Argument JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

## Artifact

| API | Description |
| --- | --- |
| `artifact_delete_file` | Delete CodeArts Artifact file |
| `artifact_get_download_url` | Get CodeArts Artifact file download URL |
| `artifact_get_file` | Get CodeArts Artifact file detail |
| `artifact_get_file_tree` | Get CodeArts Artifact file tree |
| `artifact_get_repository` | Get CodeArts Artifact repository detail |
| `artifact_list_build_archives` | List CodeArts Artifact build archives |
| `artifact_list_files` | List CodeArts Artifact files |
| `artifact_list_latest_version_files` | List CodeArts Artifact latest version files |
| `artifact_list_repositories` | List CodeArts Artifact repositories |
| `artifact_list_versions` | List CodeArts Artifact versions |
| `artifact_search_artifacts` | Search CodeArts Artifact artifacts |
| `artifact_show_audit` | Show CodeArts Artifact audit logs |

### artifact_delete_file

Description: Delete CodeArts Artifact file

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_delete_file` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `repo_name` | yes | `string` |  |  |
| `path` | yes | `string` |  |  |
| `format` | yes | `string` |  |  |
| `dry_run` | no | `boolean` | true |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Artifact file download URL

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_get_download_url` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `repo_name` | yes | `string` |  |  |
| `path` | yes | `string` |  |  |
| `format` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Artifact file detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_get_file` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `repo_name` | yes | `string` |  |  |
| `path` | yes | `string` |  |  |
| `format` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Artifact file tree

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_get_file_tree` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `repo_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Get CodeArts Artifact repository detail

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_get_repository` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Artifact build archives

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_list_build_archives` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Artifact files

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_list_files` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |
| `repo_name` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Artifact latest version files

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_list_latest_version_files` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Artifact repositories

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_list_repositories` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: List CodeArts Artifact versions

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_list_versions` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `project_id` | yes | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Search CodeArts Artifact artifacts

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_search_artifacts` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `artifact_name` | yes | `string` |  |  |
| `repo_name` | no | `string` |  |  |
| `project_id` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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

Description: Show CodeArts Artifact audit logs

| Field | Value |
| --- | --- |
| HTTP Method | `POST` |
| Path | `/mcp` |
| JSON-RPC method | `tools/call` |
| Tool name | `artifact_show_audit` |

Arguments:

| Argument | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | no | `integer` | 1 |  |
| `page_size` | no | `integer` | 20 |  |
| `keyword` | no | `string` |  |  |
| `sort_by` | no | `string` |  |  |
| `sort_order` | no | `string` |  | enum: asc, desc |
| `tenant_id` | yes | `string` |  |  |
| `project_id` | yes | `unknown` |  |  |
| `module` | yes | `string` |  |  |
| `repo` | yes | `string` |  |  |
| `user_id` | no | `string` |  |  |
| `instance_id` | no | `string` |  |  |
| `format` | no | `string` |  |  |
| `resource_id` | no | `string` |  |  |

Call example:

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

Argument JSON Schema:

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
