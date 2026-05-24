# CodeArts MCP 函数 API 参考 - 需求管理

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`需求管理`

API 数量：`240`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### req_add_iteration_work_items

所属模块：`需求管理`

说明：添加需求管理的迭代工作项。

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
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：添加需求管理的计划工作项。

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
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：添加需求管理的项目成员。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `domain_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>领域名称。 |
| `role_id` | 否 | `number \| integer` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "anyOf": [
        {
          "type": "number",
          "const": -1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
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

所属模块：`需求管理`

说明：添加需求管理的工作项评论。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 需求管理 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：添加需求管理的工作项工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_work_item_work_hour",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>",
      "work_hours": "<work_hours>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `work_hours` | 是 | `number` |  | 字段对应：<br>MCP 字段 `work_hours` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>实际工时或工时明细，用于登记、更新或查询工作量。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `due_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `start_date_timestamp` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `start_date_timestamp` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date_timestamp`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `due_date_timestamp` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `due_date_timestamp` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date_timestamp`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `use_timestamp` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `use_timestamp` ↔ 原始 CodeArts 需求管理 API 同名字段 `use_timestamp`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "work_hours": {
      "type": "number",
      "exclusiveMinimum": 0
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "start_date_timestamp": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "due_date_timestamp": {
      "$ref": "#/properties/start_date_timestamp"
    },
    "use_timestamp": {
      "type": "boolean"
    },
    "region": {
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
    "work_hours"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_apply_join_project_for_agc

所属模块：`需求管理`

说明：执行需求管理的join项目foragc。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_apply_join_project_for_agc",
    "arguments": {
      "project_id": "<project_id>",
      "domain_id": "<domain_id>",
      "user_id": "<user_id>",
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 需求管理 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "x_auth_token": {
      "type": "string",
      "minLength": 10
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_id",
    "user_id",
    "x_auth_token"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_add_project_members

所属模块：`需求管理`

说明：批量处理需求管理的add项目成员。

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
      "members": "<members>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `members` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `members` ↔ 原始 CodeArts 需求管理 API 同名字段 `members`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>成员列表，用于批量添加、导入或过滤项目/仓库/团队成员。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
            "anyOf": [
              {
                "type": "number",
                "const": -1
              },
              {
                "type": "integer",
                "exclusiveMinimum": 0
              }
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

所属模块：`需求管理`

说明：批量处理需求管理的createIPD工作项。

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
      "issues": "<issues>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issues` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `issues` ↔ 原始 CodeArts 需求管理 API 同名字段 `issues`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项或问题列表，用于批量处理、关联或查询多个问题。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
          "plan_end_date": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "integer"
              }
            ]
          },
          "link": {
            "type": "string"
          },
          "suspended": {
            "type": "boolean"
          },
          "break_status": {
            "type": "string"
          },
          "baseline": {
            "type": "string"
          },
          "status_modified_time": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "integer"
              }
            ]
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

### req_batch_create_tracker_config

所属模块：`需求管理`

说明：批量处理需求管理的createtracker配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_create_tracker_config",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": "<tracker_id>",
      "status_config_ids": "<status_config_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_config_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `status_config_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_config_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态配置 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_config_ids": {
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
    "tracker_id",
    "status_config_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_ipd_issues

所属模块：`需求管理`

说明：批量处理需求管理的deleteIPD工作项。

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
      "issue_ids": "<issue_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `issue_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `is_permanent_delete` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_permanent_delete` ↔ 原始 CodeArts 需求管理 API 同名字段 `is_permanent_delete`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否永久删除。true 表示绕过回收站直接彻底删除，请谨慎使用。 |
| `src_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `src_project_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `src_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源项目 ID，用于跨项目复制、迁移或关联场景中定位来源项目。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：批量处理需求管理的delete迭代。

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
      "iteration_ids": "<iteration_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `iteration_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：批量处理需求管理的delete项目成员。

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
      "user_ids": "<user_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `user_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_batch_delete_release_plans

所属模块：`需求管理`

说明：批量处理需求管理的delete发布计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_release_plans",
    "arguments": {
      "project_id": "<project_id>",
      "plan_ids": "<plan_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `plan_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_ids": {
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
    "plan_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_work_items

所属模块：`需求管理`

说明：批量处理需求管理的delete工作项。

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
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：批量处理需求管理的transferIPD工作项流程。

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
      "issue_ids": "<issue_ids>",
      "issue_category": "<issue_category>",
      "flow_code": "<flow_code>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `issue_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_category` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题分类，用于按缺陷、风险、代码问题等类别过滤。 |
| `flow_code` | 是 | `string` |  | 字段对应：<br>MCP 字段 `flow_code` ↔ 原始 CodeArts 需求管理 API 同名字段 `flow_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流程编码，用于定位工作流、审批流或状态流转流程。 |
| `is_recover` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `is_recover` ↔ 原始 CodeArts 需求管理 API 同名字段 `is_recover`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否恢复资源。true 表示从删除、归档或回收状态恢复。 |
| `process_context` | 否 | `object` |  | 字段对应：<br>MCP 字段 `process_context` ↔ 原始 CodeArts 需求管理 API 同名字段 `process_context`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流程上下文，承载工作流或审批流执行所需的变量和状态。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_batch_update_child_user_nicknames

所属模块：`需求管理`

说明：批量处理需求管理的update子级用户nicknames。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_child_user_nicknames",
    "arguments": {
      "users": "<users>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `users` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `users` ↔ 原始 CodeArts 需求管理 API 同名字段 `users`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "type": "string",
            "minLength": 1
          },
          "nick_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128
          }
        },
        "required": [
          "user_id",
          "nick_name"
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
    "users"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_ipd_issues

所属模块：`需求管理`

说明：批量处理需求管理的updateIPD工作项。

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
      "issue_ids": "<issue_ids>",
      "attribute": "<attribute>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `issue_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `attribute` | 是 | `object` |  | 字段对应：<br>MCP 字段 `attribute` ↔ 原始 CodeArts 需求管理 API 同名字段 `attribute`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>属性信息对象，用于提交字段属性、状态属性或资源扩展属性。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
        "plan_end_date": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            }
          ]
        },
        "link": {
          "type": "string"
        },
        "suspended": {
          "type": "boolean"
        },
        "break_status": {
          "type": "string"
        },
        "baseline": {
          "type": "string"
        },
        "status_modified_time": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            }
          ]
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

### req_batch_update_release_plan_baseline

所属模块：`需求管理`

说明：批量处理需求管理的update发布计划baseline。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_release_plan_baseline",
    "arguments": {
      "project_id": "<project_id>",
      "plan_ids": "<plan_ids>",
      "baseline": "<baseline>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `plan_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `baseline` | 是 | `"baselined" \| "unbaseline" \| "baseline-reviewing"` |  | 字段对应：<br>MCP 字段 `baseline` ↔ 原始 CodeArts 需求管理 API 同名字段 `baseline`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>基线信息或是否启用基线，用于需求、计划、测试等资源的版本基准管理。可选值：`baselined`、`unbaseline`、`baseline-reviewing`。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "baseline": {
      "type": "string",
      "enum": [
        "baselined",
        "unbaseline",
        "baseline-reviewing"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_ids",
    "baseline"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_work_items

所属模块：`需求管理`

说明：批量处理需求管理的update工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts Req API 路径参数 `project_id`。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts Req API 请求体字段 `id`，批量提交时为工作项 ID 数组。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `status_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.status_id`。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `priority_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.priority_id`。<br>工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `severity_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `severity_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.severity_id`。<br>严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.assigned_id`。<br>处理人 ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.developer_id`；工具会把可转数字的字符串转成数字 ID。<br>开发人员 ID，用于定位对应的 CodeArts 资源。 |
| `done_ratio` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `done_ratio` ↔ 原始 CodeArts Req API 请求体字段 `attribute.done_ratio`。<br>完成百分比，通常为 0 到 100 的整数，用于表示工作项或任务完成进度。 |
| `iteration_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.iteration_id`。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.module_id`。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "minItems": 1
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "developer_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
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
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_cancel_project_domain

所属模块：`需求管理`

说明：取消需求管理的项目领域。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_cancel_project_domain",
    "arguments": {
      "project_id": "<project_id>",
      "domain_id": "<domain_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_change_release_plan_status

所属模块：`需求管理`

说明：变更需求管理的发布计划状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_change_release_plan_status",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>",
      "operate": "<operate>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `operate` | 是 | `string` |  | 字段对应：<br>MCP 字段 `operate` ↔ 原始 CodeArts 需求管理 API 同名字段 `operate`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作名称或操作标识，用于指定要执行的业务动作。 |
| `move_to_sprint_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `move_to_sprint_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `move_to_sprint_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标迭代 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "operate": {
      "type": "string",
      "minLength": 1
    },
    "move_to_sprint_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "operate"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_check_project_name

所属模块：`需求管理`

说明：检查需求管理的项目name。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：检查需求管理的工作项状态name。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `status_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态名称。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：清除需求管理的计划工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：复制需求管理的工作项。

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
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `from_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `from_project_id` ↔ 原始 CodeArts Req API 请求体字段 `fromProjectUUId`。<br>来源项目 ID，用于迁移、复制或移动资源时定位原项目。 |
| `to_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `to_project_id` ↔ 原始 CodeArts Req API 请求体字段 `toProjectUUId`。<br>目标项目 ID，用于迁移、复制或移动资源时定位新项目。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts Req API 请求体字段 `issueIds`；工具会把数组按逗号拼接。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `copy_comments` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `copy_comments` ↔ 原始 CodeArts Req API 请求体字段 `copyComments`。<br>是否复制评论。true 表示复制资源时一并复制评论记录。 |
| `copy_work_hours` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `copy_work_hours` ↔ 原始 CodeArts Req API 请求体字段 `copyWorkHours`。<br>是否复制工时。true 表示复制工作项时一并复制工时记录。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：统计需求管理的工作项树。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_ids` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `tracker_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

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
        "type": "integer",
        "exclusiveMinimum": 0
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

### req_create_ipd_change_review_form

所属模块：`需求管理`

说明：创建需求管理的IPDchange评审form。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_change_review_form",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "need_approval": "<need_approval>",
      "status": "<status>",
      "cos": "<cos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category` | 否 | `string` | "CR" | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `need_approval` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `need_approval` ↔ 原始 CodeArts 需求管理 API 同名字段 `need_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否需要审批。true 表示执行前需要审批流程通过。 |
| `status` | 是 | `object` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `cc` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `cc` ↔ 原始 CodeArts 需求管理 API 同名字段 `cc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送人列表或抄送人标识，用于通知相关人员。 |
| `cos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `cos` ↔ 原始 CodeArts 需求管理 API 同名字段 `cos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>坐标或制品定位信息，通常用于制品仓内定位组织、仓库、包名、版本等层级。 |
| `plan_end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
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
    "need_approval": {
      "type": "boolean"
    },
    "status": {
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
      "additionalProperties": true
    },
    "cc": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": true
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_number": {
            "type": "string",
            "minLength": 1
          },
          "issue_category": {
            "type": "string",
            "minLength": 1
          },
          "change_type": {
            "type": "string",
            "minLength": 1
          },
          "before_change": {
            "type": "string",
            "minLength": 1
          },
          "after_change": {
            "type": "string",
            "minLength": 1
          },
          "reviewer": {
            "type": "array",
            "items": {
              "$ref": "#/properties/project_id"
            },
            "minItems": 1
          },
          "approver": {
            "type": "array",
            "items": {
              "$ref": "#/properties/project_id"
            },
            "minItems": 1
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "issue_id",
          "issue_number",
          "issue_category",
          "change_type",
          "before_change",
          "after_change",
          "reviewer",
          "approver"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "plan_end_date": {
      "type": "string"
    },
    "plan_start_date": {
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
    "need_approval",
    "status",
    "cos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_feature_set

所属模块：`需求管理`

说明：创建需求管理的IPD特性set。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：创建需求管理的IPD工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 是 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `assignee` | 是 | `string` |  | 字段对应：<br>MCP 字段 `assignee` ↔ 原始 CodeArts 需求管理 API 同名字段 `assignee`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人或负责人标识，用于指定当前责任人或按责任人过滤。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `src_domain` | 否 | `string` |  | 字段对应：<br>MCP 字段 `src_domain` ↔ 原始 CodeArts 需求管理 API 同名字段 `src_domain`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源租户或源账号标识，用于跨租户、跨账号迁移或复制场景。 |
| `submitted_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `submitted_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `submitted_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交人标识，用于按提交人过滤评审、审批或记录。 |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `recipient` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `recipient` ↔ 原始 CodeArts 需求管理 API 同名字段 `recipient`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>接收人标识或接收人列表，用于通知、消息或交付场景。 |
| `expect_delivery_time` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `expect_delivery_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `expect_delivery_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>期望交付时间，用于需求、特性或计划的目标交付日期。 |
| `priority` | 否 | `string` |  | 字段对应：<br>MCP 字段 `priority` ↔ 原始 CodeArts 需求管理 API 同名字段 `priority`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>优先级。需求管理场景通常表示工作项优先级；具体名称和取值以项目字段配置为准。 |
| `assigned_cc` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assigned_cc` ↔ 原始 CodeArts 需求管理 API 同名字段 `assigned_cc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送处理人或协同处理人列表，用于工作项通知和协作。 |
| `plan_pi` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_pi` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_pi`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>PI 计划信息，用于 IPD/敏捷场景中关联或过滤 Program Increment。 |
| `plan_iteration` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_iteration` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_iteration`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划迭代信息，用于指定计划关联的迭代或迭代范围。 |
| `plan_start_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_end_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `workload_man_day` | 否 | `number` |  | 字段对应：<br>MCP 字段 `workload_man_day` ↔ 原始 CodeArts 需求管理 API 同名字段 `workload_man_day`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>人天工作量，用于计划或统计场景中的容量评估。 |
| `business_domain` | 否 | `string` |  | 字段对应：<br>MCP 字段 `business_domain` ↔ 原始 CodeArts 需求管理 API 同名字段 `business_domain`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务领域，用于按产品线、业务域或团队范围分类。 |
| `need_break` | 否 | `string` |  | 字段对应：<br>MCP 字段 `need_break` ↔ 原始 CodeArts 需求管理 API 同名字段 `need_break`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否中断后续流程。true 表示满足条件后停止继续执行。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：创建需求管理的IPD标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `label_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `label_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `label_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签类型，用于区分系统标签、自定义标签或业务标签。 |
| `color` | 是 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 需求管理 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：创建需求管理的IPD模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `display_value` | 是 | `string` |  | 字段对应：<br>MCP 字段 `display_value` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>显示值，表示字段在界面上展示给用户看的文本。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `assignee` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assignee` ↔ 原始 CodeArts 需求管理 API 同名字段 `assignee`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人或负责人标识，用于指定当前责任人或按责任人过滤。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_create_ipd_process_instance

所属模块：`需求管理`

说明：创建需求管理的IPD流程实例instance。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_process_instance",
    "arguments": {
      "project_id": "<project_id>",
      "category": "<category>",
      "status": "<status>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `operate_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operate_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `operate_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作类型，用于区分新增、更新、删除、移动、恢复等动作。 |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `category` | 是 | `"BR" \| "GR"` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。可选值：`BR`、`GR`。 |
| `need_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `need_approval` ↔ 原始 CodeArts 需求管理 API 同名字段 `need_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否需要审批。true 表示执行前需要审批流程通过。 |
| `plan_end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `status` | 是 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `cc` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `cc` ↔ 原始 CodeArts 需求管理 API 同名字段 `cc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送人列表或抄送人标识，用于通知相关人员。 |
| `attachWikis` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `attachWikis` ↔ 原始 CodeArts 需求管理 API 同名字段 `attachWikis`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否关联 Wiki 内容或关联的 Wiki 列表，具体结构以对应接口为准。 |
| `attachDocuments` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `attachDocuments` ↔ 原始 CodeArts 需求管理 API 同名字段 `attachDocuments`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否关联文档或关联的文档列表，具体结构以对应接口为准。 |
| `ccbs` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `ccbs` ↔ 原始 CodeArts 需求管理 API 同名字段 `ccbs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送人或关注人集合，用于工作项通知、评审通知等场景。 |
| `opinions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `opinions` ↔ 原始 CodeArts 需求管理 API 同名字段 `opinions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>意见内容列表，用于审批、评审或评论场景。 |
| `cos` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `cos` ↔ 原始 CodeArts 需求管理 API 同名字段 `cos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>坐标或制品定位信息，通常用于制品仓内定位组织、仓库、包名、版本等层级。 |
| `local_attachment_names` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `local_attachment_names` ↔ 原始 CodeArts 需求管理 API 同名字段 `local_attachment_names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>本地附件名称列表，用于上传或绑定附件时对应本地文件名。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "operate_type": {
      "type": "string"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "BR",
        "GR"
      ]
    },
    "need_approval": {
      "type": "boolean"
    },
    "plan_end_date": {
      "type": "string"
    },
    "plan_start_date": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "attachWikis": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "attachDocuments": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ccbs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "curr_owner": {
            "$ref": "#/properties/project_id"
          }
        },
        "additionalProperties": true
      }
    },
    "opinions": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "number": {
            "type": "string"
          },
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_category": {
            "type": "string"
          },
          "change_type": {
            "type": "string"
          },
          "before_change": {
            "type": "string"
          },
          "after_change": {
            "type": "string"
          }
        },
        "additionalProperties": true
      }
    },
    "local_attachment_names": {
      "type": "array",
      "items": {
        "type": "string"
      }
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
    "category",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_work_hour

所属模块：`需求管理`

说明：创建需求管理的IPD工作工时。

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
      "include_weekend": "<include_weekend>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `work_date_begin` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_date_begin` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_date_begin`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时开始日期，用于按登记工时的日期范围查询。 |
| `work_date_end` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_date_end` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_date_end`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时结束日期，用于按登记工时的日期范围查询。 |
| `work_hours` | 是 | `string \| number` |  | 字段对应：<br>MCP 字段 `work_hours` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>实际工时或工时明细，用于登记、更新或查询工作量。 |
| `work_hour_type` | 是 | `integer \| string` |  | 字段对应：<br>MCP 字段 `work_hour_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hour_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时类型，用于区分开发、测试、评审等工时分类；具体字典以项目配置为准。 |
| `include_weekend` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `include_weekend` ↔ 原始 CodeArts 需求管理 API 同名字段 `include_weekend`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否包含周末。用于工时、排期或日期范围计算。 |
| `work_hour_category` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hour_category` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hour_category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时分类，用于区分不同来源或用途的工时记录。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
          "type": "integer",
          "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：创建需求管理的迭代。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `begin_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `begin_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `begin_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：创建需求管理的迭代工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ PDF/CodeArts 路径参数 `project_id`。<br>参数解释：<br>项目的 32 位 UUID，项目唯一标识。可通过查询项目列表接口获取，响应消息体中的 project_id 字段值就是项目 ID。<br>约束限制：<br>正则表达式：[A-Za-z0-9]{32}。<br>取值范围：<br>不涉及。<br>默认取值：<br>不涉及。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`；同时用于指定新工作项所属迭代。<br>参数解释：<br>迭代 ID，用于指定本次创建的工作项归属到哪个迭代。可通过获取指定项目的迭代列表接口获取。<br>约束限制：<br>创建迭代工作项时必填；正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ PDF/CodeArts 请求体字段 `name`。<br>参数解释：<br>工作项标题。MCP 字段 title 会映射到 CodeArts 创建工作项 API 的 name 字段。<br>约束限制：<br>创建工作项时必填；工具侧要求不能为空。建议用一句话说明要处理的问题或需求。<br>取值范围：<br>字符串。<br>默认取值：<br>不涉及。 |
| `work_item_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_type` ↔ PDF/CodeArts 请求体字段 `tracker_id`；工具会把 task/bug/epic/feature/story 转成 2/3/5/6/7。<br>参数解释：<br>工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 创建工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。<br>约束限制：<br>创建子工作项时父子类型需符合层级关系：Epic 只能作为 Feature 的父工作项类型；Feature 只能作为 Story 的父工作项类型；Story 只能作为任务/Task、缺陷/Bug 的父工作项类型。<br>取值范围：<br>2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。<br>默认取值：<br>不涉及。 |
| `parent_work_item_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_work_item_id` ↔ PDF/CodeArts 请求体字段 `parent_issue_id`。<br>参数解释：<br>父工作项 ID。MCP 字段 parent_work_item_id 会映射到 CodeArts 创建工作项 API 的 parent_issue_id 字段。<br>约束限制：<br>创建子工作项时必填；父工作项类型 tracker_id 不能为 2（任务/Task）或 3（缺陷/Bug）。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ PDF/CodeArts 请求体字段 `description`。<br>参数解释：<br>工作项描述，用于补充需求背景、问题现象、验收标准或处理说明。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小长度 0。<br>默认取值：<br>不涉及。 |
| `priority_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ PDF/CodeArts 请求体字段 `priority_id`。<br>参数解释：<br>工作项优先级。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（低）；2（中）；3（高）。<br>默认取值：<br>不涉及。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ PDF/CodeArts 请求体字段 `module_id`。<br>参数解释：<br>模块 ID，可在“设置 - 工作项设置 - 模块设置”中创建或查看模块。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `severity_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `severity_id` ↔ PDF/CodeArts 请求体字段 `severity_id`。<br>参数解释：<br>重要程度。通常用于缺陷、问题等级等场景。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。<br>默认取值：<br>不涉及。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ PDF/CodeArts 请求体字段 `assigned_id`。<br>参数解释：<br>处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ PDF/CodeArts 请求体字段 `developer_id`。<br>参数解释：<br>开发人员数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `done_ratio` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `done_ratio` ↔ PDF/CodeArts 请求体字段 `done_ratio`。<br>参数解释：<br>工作项完成度。<br>约束限制：<br>输入 0 表示完成度为 0%，输入 100 表示完成度为 100%。<br>取值范围：<br>最小值 0，最大值 100。<br>默认取值：<br>不涉及。 |
| `expected_work_hours` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `expected_work_hours` ↔ PDF/CodeArts 请求体字段 `expected_work_hours`。<br>参数解释：<br>预计工时。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `start_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `start_date` ↔ PDF/CodeArts 请求体字段 `begin_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>开始时间。对应 CodeArts 创建工作项文档中的开始时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `begin_time` 字段（YYYY-MM-DD）提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `due_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `due_date` ↔ PDF/CodeArts 请求体字段 `end_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>结束时间。对应 CodeArts 创建工作项文档中的结束时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `end_time` 字段（YYYY-MM-DD）提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
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
    "developer_id": {
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

所属模块：`需求管理`

说明：创建需求管理的计划。

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
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_plan_work_item

所属模块：`需求管理`

说明：创建需求管理的计划工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ CodeArts 请求体字段 `projectUUId`。<br>参数解释：<br>项目的 32 位 UUID，项目唯一标识。可通过查询项目列表接口获取，响应消息体中的 project_id 字段值就是项目 ID。<br>约束限制：<br>正则表达式：[A-Za-z0-9]{32}。<br>取值范围：<br>不涉及。<br>默认取值：<br>不涉及。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ CodeArts 请求体字段 `plan_id`。<br>参数解释：<br>计划 ID，用于指定本次创建的工作项归属到哪个计划。可通过计划列表接口获取。<br>约束限制：<br>创建计划工作项时必填；正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ CodeArts 请求体字段 `subject`。<br>参数解释：<br>工作项标题。MCP 字段 title 会映射到 CodeArts 创建工作项 API 的 name 字段。<br>约束限制：<br>创建工作项时必填；工具侧要求不能为空。建议用一句话说明要处理的问题或需求。<br>取值范围：<br>字符串。<br>默认取值：<br>不涉及。 |
| `work_item_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_type` ↔ PDF/CodeArts 请求体字段 `tracker_id`；工具会把 task/bug/epic/feature/story 转成 2/3/5/6/7。<br>参数解释：<br>工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 创建工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。<br>约束限制：<br>创建子工作项时父子类型需符合层级关系：Epic 只能作为 Feature 的父工作项类型；Feature 只能作为 Story 的父工作项类型；Story 只能作为任务/Task、缺陷/Bug 的父工作项类型。<br>取值范围：<br>2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。<br>默认取值：<br>不涉及。 |
| `parent_work_item_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_work_item_id` ↔ PDF/CodeArts 请求体字段 `parent_issue_id`。<br>参数解释：<br>父工作项 ID。MCP 字段 parent_work_item_id 会映射到 CodeArts 创建工作项 API 的 parent_issue_id 字段。<br>约束限制：<br>创建子工作项时必填；父工作项类型 tracker_id 不能为 2（任务/Task）或 3（缺陷/Bug）。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ PDF/CodeArts 请求体字段 `description`。<br>参数解释：<br>工作项描述，用于补充需求背景、问题现象、验收标准或处理说明。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小长度 0。<br>默认取值：<br>不涉及。 |
| `iteration_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`。<br>参数解释：<br>迭代 ID，用于指定工作项关联的迭代。可通过获取指定项目的迭代列表接口获取。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ PDF/CodeArts 请求体字段 `module_id`。<br>参数解释：<br>模块 ID，可在“设置 - 工作项设置 - 模块设置”中创建或查看模块。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `priority_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ PDF/CodeArts 请求体字段 `priority_id`。<br>参数解释：<br>工作项优先级。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（低）；2（中）；3（高）。<br>默认取值：<br>不涉及。 |
| `severity_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `severity_id` ↔ PDF/CodeArts 请求体字段 `severity_id`。<br>参数解释：<br>重要程度。通常用于缺陷、问题等级等场景。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。<br>默认取值：<br>不涉及。 |
| `status_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ CodeArts 请求体字段 `status_id`。<br>参数解释：<br>工作项状态 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（新建）；<br>2（进行中）；<br>3（已解决）；<br>4（测试中）；<br>5（已关闭）；<br>6（已拒绝）。<br>默认取值：<br>不涉及。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ PDF/CodeArts 请求体字段 `assigned_id`。<br>参数解释：<br>处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ PDF/CodeArts 请求体字段 `developer_id`。<br>参数解释：<br>开发人员数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `done_ratio` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `done_ratio` ↔ PDF/CodeArts 请求体字段 `done_ratio`。<br>参数解释：<br>工作项完成度。<br>约束限制：<br>输入 0 表示完成度为 0%，输入 100 表示完成度为 100%。<br>取值范围：<br>最小值 0，最大值 100。<br>默认取值：<br>不涉及。 |
| `expected_work_hours` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `expected_work_hours` ↔ PDF/CodeArts 请求体字段 `expected_work_hours`。<br>参数解释：<br>预计工时。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `start_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `start_date` ↔ CodeArts 请求体字段 `start_date`。<br>参数解释：<br>开始时间。对应 CodeArts 规划工作项创建接口中的 start_date 字段。<br>约束限制：<br>工具侧接收毫秒时间戳整数，并按 CodeArts `start_date` 字段原样提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `due_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `due_date` ↔ CodeArts 请求体字段 `due_date`。<br>参数解释：<br>结束时间。对应 CodeArts 规划工作项创建接口中的 due_date 字段。<br>约束限制：<br>工具侧接收毫秒时间戳整数，并按 CodeArts `due_date` 字段原样提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "developer_id": {
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

所属模块：`需求管理`

说明：创建需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_create_project_domain

所属模块：`需求管理`

说明：创建需求管理的项目领域。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_domain",
    "arguments": {
      "project_id": "<project_id>",
      "domain_name": "<domain_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `domain_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>领域名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 31
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project_module

所属模块：`需求管理`

说明：创建需求管理的项目模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块名称。 |
| `owner_user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `owner_user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `owner_user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者用户 ID，用于定位对应的 CodeArts 资源。 |
| `parent_module_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `parent_module_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父模块 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_create_project_status_config

所属模块：`需求管理`

说明：创建需求管理的项目状态配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_status_config",
    "arguments": {
      "project_id": "<project_id>",
      "defined_name": "<defined_name>",
      "status_attribute": "<status_attribute>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `defined_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `defined_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `defined_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>defined名称。 |
| `status_attribute` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `status_attribute` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_attribute`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态属性，用于描述状态的类别或流转属性。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "defined_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    },
    "status_attribute": {
      "type": "integer",
      "exclusiveMinimum": 0
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
    "defined_name",
    "status_attribute"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_release_plan

所属模块：`需求管理`

说明：创建需求管理的发布计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_release_plan",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "category": "<category>",
      "plan_start_date": "<plan_start_date>",
      "plan_end_date": "<plan_end_date>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `category` | 是 | `"PI" \| "Iteration" \| "PlanMilestone"` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。可选值：`PI`、`Iteration`、`PlanMilestone`。 |
| `plan_start_date` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_end_date` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `workload` | 否 | `string` |  | 字段对应：<br>MCP 字段 `workload` ↔ 原始 CodeArts 需求管理 API 同名字段 `workload`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作量，用于计划、迭代或成员维度的容量/投入统计。 |
| `owner` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 需求管理 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "category": {
      "type": "string",
      "enum": [
        "PI",
        "Iteration",
        "PlanMilestone"
      ]
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "minimum": 0
        }
      ]
    },
    "plan_end_date": {
      "$ref": "#/properties/plan_start_date"
    },
    "description": {
      "type": "string"
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "workload": {
      "type": "string"
    },
    "owner": {
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
    "category",
    "plan_start_date",
    "plan_end_date"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_version_v2

所属模块：`需求管理`

说明：创建需求管理的版本v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_version_v2",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "start_date": "<start_date>",
      "due_date": "<due_date>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `start_date` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `due_date` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "name",
    "start_date",
    "due_date"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item

所属模块：`需求管理`

说明：创建需求管理的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ PDF/CodeArts 路径参数 `project_id`。<br>参数解释：<br>项目的 32 位 UUID，项目唯一标识。可通过查询项目列表接口获取，响应消息体中的 project_id 字段值就是项目 ID。<br>约束限制：<br>正则表达式：[A-Za-z0-9]{32}。<br>取值范围：<br>不涉及。<br>默认取值：<br>不涉及。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ PDF/CodeArts 请求体字段 `name`。<br>参数解释：<br>工作项标题。MCP 字段 title 会映射到 CodeArts 创建工作项 API 的 name 字段。<br>约束限制：<br>创建工作项时必填；工具侧要求不能为空。建议用一句话说明要处理的问题或需求。<br>取值范围：<br>字符串。<br>默认取值：<br>不涉及。 |
| `work_item_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_type` ↔ PDF/CodeArts 请求体字段 `tracker_id`；工具会把 task/bug/epic/feature/story 转成 2/3/5/6/7。<br>参数解释：<br>工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 创建工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。<br>约束限制：<br>创建子工作项时父子类型需符合层级关系：Epic 只能作为 Feature 的父工作项类型；Feature 只能作为 Story 的父工作项类型；Story 只能作为任务/Task、缺陷/Bug 的父工作项类型。<br>取值范围：<br>2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。<br>默认取值：<br>不涉及。 |
| `parent_work_item_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_work_item_id` ↔ PDF/CodeArts 请求体字段 `parent_issue_id`。<br>参数解释：<br>父工作项 ID。MCP 字段 parent_work_item_id 会映射到 CodeArts 创建工作项 API 的 parent_issue_id 字段。<br>约束限制：<br>创建子工作项时必填；父工作项类型 tracker_id 不能为 2（任务/Task）或 3（缺陷/Bug）。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ PDF/CodeArts 请求体字段 `description`。<br>参数解释：<br>工作项描述，用于补充需求背景、问题现象、验收标准或处理说明。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小长度 0。<br>默认取值：<br>不涉及。 |
| `priority_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ PDF/CodeArts 请求体字段 `priority_id`。<br>参数解释：<br>工作项优先级。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（低）；2（中）；3（高）。<br>默认取值：<br>不涉及。 |
| `iteration_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`。<br>参数解释：<br>迭代 ID，可通过获取指定项目的迭代列表接口获取。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ PDF/CodeArts 请求体字段 `module_id`。<br>参数解释：<br>模块 ID，可在“设置 - 工作项设置 - 模块设置”中创建或查看模块。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `severity_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `severity_id` ↔ PDF/CodeArts 请求体字段 `severity_id`。<br>参数解释：<br>重要程度。通常用于缺陷、问题等级等场景。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。<br>默认取值：<br>不涉及。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ PDF/CodeArts 请求体字段 `assigned_id`。<br>参数解释：<br>处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ PDF/CodeArts 请求体字段 `developer_id`。<br>参数解释：<br>开发人员数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `done_ratio` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `done_ratio` ↔ PDF/CodeArts 请求体字段 `done_ratio`。<br>参数解释：<br>工作项完成度。<br>约束限制：<br>输入 0 表示完成度为 0%，输入 100 表示完成度为 100%。<br>取值范围：<br>最小值 0，最大值 100。<br>默认取值：<br>不涉及。 |
| `expected_work_hours` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `expected_work_hours` ↔ PDF/CodeArts 请求体字段 `expected_work_hours`。<br>参数解释：<br>预计工时。<br>约束限制：<br>可以为空。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `start_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `start_date` ↔ PDF/CodeArts 请求体字段 `begin_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>开始时间。对应 CodeArts 创建工作项文档中的开始时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `begin_time` 字段（YYYY-MM-DD）提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `due_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `due_date` ↔ PDF/CodeArts 请求体字段 `end_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>结束时间。对应 CodeArts 创建工作项文档中的结束时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `end_time` 字段（YYYY-MM-DD）提交。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
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
    "developer_id": {
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

所属模块：`需求管理`

说明：创建需求管理的工作项模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item_template",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `issue_field_configs` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `issue_field_configs` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_field_configs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "description": {
      "type": "string"
    },
    "issue_field_configs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "minLength": 1
          },
          "is_required": {
            "type": "integer",
            "minimum": 0
          },
          "default_value": {
            "type": "string"
          },
          "position": {
            "type": "integer",
            "minimum": 0
          },
          "is_visible": {
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
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item_with_attachment_v3

所属模块：`需求管理`

说明：创建需求管理的工作项with附件v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item_with_attachment_v3",
    "arguments": {
      "issue_call_back_param": "<issue_call_back_param>",
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `issue_call_back_param` | 是 | `object` |  | 字段对应：<br>MCP 字段 `issue_call_back_param` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_call_back_param`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 否 | `string` | "scrum" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 需求管理 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "issue_call_back_param": {
      "type": "object",
      "additionalProperties": {}
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "scrum"
    },
    "x_auth_token": {
      "type": "string",
      "minLength": 10
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "issue_call_back_param",
    "x_auth_token"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_attachment

所属模块：`需求管理`

说明：删除需求管理的附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `attachment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `attachment_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `attachment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>附件 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_delete_ipd_change_review_form

所属模块：`需求管理`

说明：删除需求管理的IPDchange评审form。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_change_review_form",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `category` | 否 | `string` | "CR" | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
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

### req_delete_ipd_feature_set

所属模块：`需求管理`

说明：删除需求管理的IPD特性set。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `feature_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_set_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `feature_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>特性集 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的IPD工作项图片。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `file_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的IPD标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `label_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `label_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `label_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的IPD模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_delete_ipd_process_instance

所属模块：`需求管理`

说明：删除需求管理的IPD流程实例instance。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_process_instance",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_delete_ipd_work_hour

所属模块：`需求管理`

说明：删除需求管理的IPD工作工时。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `workhour_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `workhour_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `workhour_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的迭代。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的项目模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的项目模板。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：删除需求管理的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：下载需求管理的附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `attachment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `attachment_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `attachment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>附件 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：下载需求管理的图片文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `image_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `image_uri` ↔ 原始 CodeArts 需求管理 API 同名字段 `image_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>镜像 URI，用于指定容器镜像完整地址。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：下载需求管理的IPD工作项附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `attachment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `attachment_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `attachment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>附件 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：下载需求管理的IPD工作项图片。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `file_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |
| `field_code` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_code` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段编码，用于定位自定义字段或系统字段。 |

输入 JSON Schema：

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

### req_export_work_items_new_v2

所属模块：`需求管理`

说明：执行需求管理的工作项newv2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_export_work_items_new_v2",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `fields` | 否 | `string` | "id,subject,tracker,status,priority,severity,assigned_to,created_on,updated_on,start_date,due_date" | 字段对应：<br>MCP 字段 `fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `export_child` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `export_child` ↔ 原始 CodeArts 需求管理 API 同名字段 `export_child`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 否 | `"tree" \| "list"` | "list" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`tree`、`list`。 |
| `time_zone` | 否 | `integer` | 8 | 字段对应：<br>MCP 字段 `time_zone` ↔ 原始 CodeArts 需求管理 API 同名字段 `time_zone`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `export_all` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `export_all` ↔ 原始 CodeArts 需求管理 API 同名字段 `export_all`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "fields": {
      "type": "string",
      "minLength": 1,
      "default": "id,subject,tracker,status,priority,severity,assigned_to,created_on,updated_on,start_date,due_date"
    },
    "export_child": {
      "type": "boolean",
      "default": true
    },
    "type": {
      "type": "string",
      "enum": [
        "tree",
        "list"
      ],
      "default": "list"
    },
    "time_zone": {
      "type": "integer",
      "default": 8
    },
    "export_all": {
      "type": "boolean",
      "default": false
    },
    "tracker_id": {
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

### req_find_iterations

所属模块：`需求管理`

说明：执行需求管理的迭代。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_find_iterations",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `updated_time_interval` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_time_interval` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_time_interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>更新时间范围，用于按最近更新时间过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "updated_time_interval": {
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

### req_get_current_user_info

所属模块：`需求管理`

说明：获取需求管理的当前用户信息。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_role

所属模块：`需求管理`

说明：获取需求管理的当前用户角色。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的IPDe2e图。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `is_src` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_src` ↔ 原始 CodeArts 需求管理 API 同名字段 `is_src`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否为源对象。true 表示该对象作为来源侧参与操作。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的IPD工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `version` | 否 | `"v1" \| "v2"` | "v2" | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 需求管理 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。可选值：`v1`、`v2`。 |

输入 JSON Schema：

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

### req_get_ipd_process_instance

所属模块：`需求管理`

说明：获取需求管理的IPD流程实例instance。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_process_instance",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

输入 JSON Schema：

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

### req_get_ipd_project_field_option_used

所属模块：`需求管理`

说明：获取需求管理的IPD项目字段optionused。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `code` | 是 | `string` |  | 字段对应：<br>MCP 字段 `code` ↔ 原始 CodeArts 需求管理 API 同名字段 `code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编码或编号，用于标识规则、字段、状态或业务对象。 |

输入 JSON Schema：

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

### req_get_ipd_review_form

所属模块：`需求管理`

说明：获取需求管理的IPD评审form。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_review_form",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>",
      "category": "<category>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `category` | 是 | `"CR" \| "BR" \| "GR"` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。可选值：`CR`、`BR`、`GR`。 |

输入 JSON Schema：

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
    "category": {
      "type": "string",
      "enum": [
        "CR",
        "BR",
        "GR"
      ]
    }
  },
  "required": [
    "project_id",
    "id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_statistic_dashboard

所属模块：`需求管理`

说明：获取需求管理的IPD统计dashboard。

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
      "classification": "<classification>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `classification` | 是 | `string` |  | 字段对应：<br>MCP 字段 `classification` ↔ 原始 CodeArts 需求管理 API 同名字段 `classification`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类标识，用于按业务分类、测试分类或资源分类过滤。 |
| `plan` | 否 | `object` |  | 字段对应：<br>MCP 字段 `plan` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划信息对象，用于提交计划名称、周期、负责人、状态等计划相关字段。 |
| `created_date` | 否 | `object` |  | 字段对应：<br>MCP 字段 `created_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建日期过滤条件或创建日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：获取需求管理的IPD租户字段optionused。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `code` | 是 | `string` |  | 字段对应：<br>MCP 字段 `code` ↔ 原始 CodeArts 需求管理 API 同名字段 `code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编码或编号，用于标识规则、字段、状态或业务对象。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的IPD租户字段used。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `field_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `field_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的IPD工作项流程详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_category` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题分类，用于按缺陷、风险、代码问题等类别过滤。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的IR。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `program_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `program_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目集 ID，用于定位对应的 CodeArts 资源。 |
| `ir_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ir_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `ir_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>IR ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的迭代。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目bug密度。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `date_range` | 否 | `string` |  | 字段对应：<br>MCP 字段 `date_range` ↔ 原始 CodeArts 需求管理 API 同名字段 `date_range`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日期范围，用于统计或列表查询的时间窗口。 |
| `metric_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `metric_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `metric_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>指标类型，用于选择要查询或统计的度量项。 |
| `dividend` | 否 | `object` |  | 字段对应：<br>MCP 字段 `dividend` ↔ 原始 CodeArts 需求管理 API 同名字段 `dividend`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>被除数，用于统计指标或计算公式。 |
| `divisor` | 否 | `object` |  | 字段对应：<br>MCP 字段 `divisor` ↔ 原始 CodeArts 需求管理 API 同名字段 `divisor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>除数，用于统计指标或计算公式。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目bugsperdeveloper。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目completionrate。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `date_range` | 否 | `string` |  | 字段对应：<br>MCP 字段 `date_range` ↔ 原始 CodeArts 需求管理 API 同名字段 `date_range`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日期范围，用于统计或列表查询的时间窗口。 |
| `metric_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `metric_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `metric_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>指标类型，用于选择要查询或统计的度量项。 |
| `sprint_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sprint_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `sprint_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `dividend` | 否 | `object` |  | 字段对应：<br>MCP 字段 `dividend` ↔ 原始 CodeArts 需求管理 API 同名字段 `dividend`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>被除数，用于统计指标或计算公式。 |
| `divisor` | 否 | `object` |  | 字段对应：<br>MCP 字段 `divisor` ↔ 原始 CodeArts 需求管理 API 同名字段 `divisor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>除数，用于统计指标或计算公式。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目duedaysafter。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目公共配置。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目摘要。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的项目工时配置。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_get_release_plan

所属模块：`需求管理`

说明：获取需求管理的发布计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_release_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_get_version_detail_v2

所属模块：`需求管理`

说明：获取需求管理的版本详情v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_version_detail_v2",
    "arguments": {
      "version_id": "<version_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `version_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "version_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "version_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_hour_permission

所属模块：`需求管理`

说明：获取需求管理的工作工时permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_hour_permission",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_get_work_item

所属模块：`需求管理`

说明：获取需求管理的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的工作项completionrate。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的工作项索引counts。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的官方 V2 工作项详情。该工具只调用 `IssueDetailsV2 /v2/issues/show`，不会 fallback 到 `req_get_work_item` 或评论列表接口；工具会把 `journals` 映射为 `comments`，并保留 `assignee` / `assignedToName` 以便查看处理人。返回结果会显式映射基础信息、时间、状态类型、优先级/严重程度、人员、项目结构、自定义字段、附件、标签、锁版本、关注/私有/删除状态和评论字段；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 这类 Asia/Shanghai 可读时间；并通过 `rawIssue` / `raw` 保留官方 V2 原始 issue 响应，避免上游新增字段丢失。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `include` | 否 | `string` | "children,parent" | 字段对应：<br>MCP 字段 `include` ↔ 原始 CodeArts 需求管理 API 同名字段 `include`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>兼容旧调用参数；工具会将该值透传给官方原始 `IssueDetailsV2 /v2/issues/show`，默认值为 `children,parent`，不会用于其他详情或评论接口。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：获取需求管理的工作项状态规则flag。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：获取需求管理的工作项模板配置。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：分组查询需求管理的IPD工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题类型或工作项类型，用于按需求、缺陷、任务等类型过滤。 |
| `group_field_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_field_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `group_field_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组字段 ID，用于定位对应的 CodeArts 资源。 |
| `is_project_group` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_project_group` ↔ 原始 CodeArts 需求管理 API 同名字段 `is_project_group`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否为项目群。true 表示按项目群维度处理。 |
| `group_sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `group_sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `group_sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组排序方式，用于控制分组列表或看板列的显示顺序。可选值：`asc`、`desc`。 |
| `filter` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 字段对应：<br>MCP 字段 `filter_mode` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter_mode`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤模式，用于指定多个过滤条件之间的匹配方式，例如全部匹配或任一匹配。可选值：`OR_AND`、`AND_OR`。 |
| `sort` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：退出需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_list_associated_code_v2

所属模块：`需求管理`

说明：查询需求管理的关联codev2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_code_v2",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` | "commit" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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
      "minLength": 1,
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

### req_list_associated_commits

所属模块：`需求管理`

说明：查询需求管理的关联提交。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` | "commit" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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
      "minLength": 1,
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

所属模块：`需求管理`

说明：查询需求管理的关联工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_associated_issues_v4

所属模块：`需求管理`

说明：查询需求管理的关联工作项v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_issues_v4",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的关联测试用例。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的关联Wiki。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_associated_wikis_v5

所属模块：`需求管理`

说明：查询需求管理的关联Wikiv5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_wikis_v5",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_board_work_item_status_records

所属模块：`需求管理`

说明：查询需求管理的看板工作项状态记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的看板工作项工作流配置。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `board_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `board_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `board_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>看板 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的看板工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `created_time_interval` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_time_interval` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_time_interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间范围，用于按创建时间过滤列表。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的缓存data。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 否 | `string` | "backlog" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的子级工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `query_type` | 否 | `string` | "basic" | 字段对应：<br>MCP 字段 `query_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询类型，用于切换不同查询口径或筛选范围。 |

输入 JSON Schema：

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
      "minLength": 1,
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

### req_list_child_work_items_direct_v4

所属模块：`需求管理`

说明：查询需求管理的子级工作项directv4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_child_work_items_direct_v4",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_child_work_items_v4

所属模块：`需求管理`

说明：查询需求管理的子级工作项v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_child_work_items_v4",
    "arguments": {
      "project_id": "<project_id>",
      "parent_id": "<parent_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `query_type` | 否 | `string` | "basic" | 字段对应：<br>MCP 字段 `query_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询类型，用于切换不同查询口径或筛选范围。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "type": "string",
      "minLength": 1
    },
    "query_type": {
      "type": "string",
      "minLength": 1,
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

### req_list_devuc_project_members

所属模块：`需求管理`

说明：查询需求管理的devuc项目成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_devuc_project_members",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_ipd_attached_wikis

所属模块：`需求管理`

说明：查询需求管理的IPDattachedWiki。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `category` | 否 | `string` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPDcategory状态。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `category_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_ipd_change_review_issue_approvers

所属模块：`需求管理`

说明：查询需求管理的IPDchange评审工作项approvers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_change_review_issue_approvers",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_ipd_feature_sets

所属模块：`需求管理`

说明：查询需求管理的IPD特性sets。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `snapshot_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `snapshot_version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `snapshot_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>快照版本 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作项附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `source_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_project_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `source_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源项目 ID，用于跨项目复制、迁移或关联场景中定位来源项目。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作项字段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `category_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作项relation配置。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作项树。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `number` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `number` ↔ 原始 CodeArts 需求管理 API 同名字段 `number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编号，用于工作项、构建、执行记录等资源的人类可读序号。 |
| `plan` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `plan` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划信息对象，用于提交计划名称、周期、负责人、状态等计划相关字段。 |
| `modified_date` | 否 | `object` |  | 字段对应：<br>MCP 字段 `modified_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `modified_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>修改日期过滤条件或修改日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题类型或工作项类型，用于按需求、缺陷、任务等类型过滤。 |
| `filter` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 字段对应：<br>MCP 字段 `filter_mode` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter_mode`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤模式，用于指定多个过滤条件之间的匹配方式，例如全部匹配或任一匹配。可选值：`OR_AND`、`AND_OR`。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_ipd_process_instances

所属模块：`需求管理`

说明：查询需求管理的IPD流程实例instances。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_process_instances",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `filter` | 否 | `array<object>` | [] | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |
| `sort` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |
| `page` | 否 | `object` | {"page_no":1,"page_size":200} | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
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
        "additionalProperties": true
      },
      "default": []
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
    },
    "page": {
      "type": "object",
      "properties": {
        "page_no": {
          "type": "integer",
          "exclusiveMinimum": 0,
          "default": 1
        },
        "page_size": {
          "type": "integer",
          "exclusiveMinimum": 0,
          "maximum": 200,
          "default": 200
        }
      },
      "additionalProperties": true,
      "default": {
        "page_no": 1,
        "page_size": 200
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

### req_list_ipd_project_fields

所属模块：`需求管理`

说明：查询需求管理的IPD项目字段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD项目用户。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `model` | 否 | `string` |  | 字段对应：<br>MCP 字段 `model` ↔ 原始 CodeArts 需求管理 API 同名字段 `model`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `model_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `model_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `model_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>model ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "search": {
      "type": "string"
    },
    "model": {
      "type": "string",
      "minLength": 1
    },
    "model_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_review_forms

所属模块：`需求管理`

说明：查询需求管理的IPD评审forms。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_review_forms",
    "arguments": {
      "project_id": "<project_id>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 是 | `"CR" \| "BR" \| "GR"` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`CR`、`BR`、`GR`。 |
| `created_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建人标识，用于按创建人过滤或展示资源来源。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `created_time` | 否 | `object` |  | 字段对应：<br>MCP 字段 `created_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间过滤条件或创建时间值，通常使用时间戳或 ISO 8601 时间字符串。 |
| `plan_end_date` | 否 | `object` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_start_date` | 否 | `object` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `closed_time` | 否 | `object` |  | 字段对应：<br>MCP 字段 `closed_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `closed_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>关闭时间过滤条件或关闭时间值，通常使用时间戳或 ISO 8601 时间字符串。 |
| `approver` | 否 | `string` |  | 字段对应：<br>MCP 字段 `approver` ↔ 原始 CodeArts 需求管理 API 同名字段 `approver`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>审批人标识，用于指定或过滤审批节点处理人。 |
| `reviewer` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reviewer` ↔ 原始 CodeArts 需求管理 API 同名字段 `reviewer`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人标识，用于指定或过滤代码评审、需求评审等参与人。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 需求管理 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 需求管理 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `sort` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |

输入 JSON Schema：

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
      "enum": [
        "CR",
        "BR",
        "GR"
      ]
    },
    "created_by": {
      "$ref": "#/properties/project_id"
    },
    "keyword": {
      "type": "string"
    },
    "created_time": {
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
    },
    "plan_end_date": {
      "$ref": "#/properties/created_time"
    },
    "plan_start_date": {
      "$ref": "#/properties/created_time"
    },
    "closed_time": {
      "$ref": "#/properties/created_time"
    },
    "approver": {
      "type": "string"
    },
    "reviewer": {
      "type": "string"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
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
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_review_role_users

所属模块：`需求管理`

说明：查询需求管理的IPD评审角色用户。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_review_role_users",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_type` | 否 | `"approver" \| "reviewer"` | "approver" | 字段对应：<br>MCP 字段 `user_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户类型，用于区分项目成员、租户用户、外部用户等。可选值：`approver`、`reviewer`。 |
| `target_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_project_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `target_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标项目 ID，用于跨项目迁移、复制或创建目标资源。 |
| `review_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `review_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_type": {
      "type": "string",
      "enum": [
        "approver",
        "reviewer"
      ],
      "default": "approver"
    },
    "target_project_id": {
      "$ref": "#/properties/project_id"
    },
    "review_id": {
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

### req_list_ipd_snapshot_features

所属模块：`需求管理`

说明：查询需求管理的IPDsnapshot特性。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `snapshot_version_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `snapshot_version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `snapshot_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>快照版本 ID，用于定位对应的 CodeArts 资源。 |
| `feature_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_set_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `feature_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>特性集 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPDsnapshot版本。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD状态。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `category_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `category_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD租户字段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_info` | 否 | `object` |  | 字段对应：<br>MCP 字段 `sort_info` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序配置，通常包含排序字段和排序方向。 |

输入 JSON Schema：

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
      "minimum": 10,
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

所属模块：`需求管理`

说明：查询需求管理的IPD租户工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 否 | `string \| array<object>` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题类型或工作项类型，用于按需求、缺陷、任务等类型过滤。 |
| `filter` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 字段对应：<br>MCP 字段 `filter_mode` ↔ 原始 CodeArts 需求管理 API 同名字段 `filter_mode`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤模式，用于指定多个过滤条件之间的匹配方式，例如全部匹配或任一匹配。可选值：`OR_AND`、`AND_OR`。 |
| `sort` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作工时categories。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `display_value` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_value` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>显示值，表示字段在界面上展示给用户看的文本。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作工时。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_pi` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `plan_pi` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_pi`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>PI 计划信息，用于 IPD/敏捷场景中关联或过滤 Program Increment。 |
| `plan_iteration` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `plan_iteration` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_iteration`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划迭代信息，用于指定计划关联的迭代或迭代范围。 |
| `workitem_id` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `workitem_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `workitem_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `created_by` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `created_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建人标识，用于按创建人过滤或展示资源来源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作流字段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `category_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `category_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IPD工作流模板。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `category_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `category_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `category_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的IRchildren。

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
      "query_type": "<query_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `program_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `program_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `program_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目集 ID，用于定位对应的 CodeArts 资源。 |
| `ir_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ir_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `ir_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>IR ID，用于定位对应的 CodeArts 资源。 |
| `query_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `query_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询类型，用于切换不同查询口径或筛选范围。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：查询需求管理的IRhistories。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `ir_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ir_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `ir_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>IR ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的工作项严重级别。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_status_statistics

所属模块：`需求管理`

说明：查询需求管理的迭代状态统计。

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
      "iteration_id": "<iteration_id>",
      "status_id": "<status_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `tracker_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |

输入 JSON Schema：

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
    "iteration_id",
    "status_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_work_items

所属模块：`需求管理`

说明：查询需求管理的迭代工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `tracker_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |

输入 JSON Schema：

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

### req_list_iterations

所属模块：`需求管理`

说明：查询需求管理的迭代。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的任务缓存boards。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 否 | `string` | "board" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |

输入 JSON Schema：

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

### req_list_module_settings_v2

所属模块：`需求管理`

说明：查询需求管理的模块settingsv2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_module_settings_v2",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

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
    "search": {
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

所属模块：`需求管理`

说明：查询需求管理的notadded项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的可选工作项状态配置。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

### req_list_parent_work_items

所属模块：`需求管理`

说明：查询需求管理的parent工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_parent_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_plan_addable_work_items

所属模块：`需求管理`

说明：查询需求管理的计划可添加工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的计划工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `show_type` | 否 | `"list" \| "tree"` | "list" | 字段对应：<br>MCP 字段 `show_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `show_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>展示类型，用于控制列表、看板或统计结果的展示口径。可选值：`list`、`tree`。 |
| `tracker_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

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
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `plan_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `user_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `user_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `sort` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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

### req_list_program_fields

所属模块：`需求管理`

说明：查询需求管理的program字段。

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
      "field_type": "<field_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `program_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `program_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目集 ID，用于定位对应的 CodeArts 资源。 |
| `field_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `field_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段类型，用于描述自定义字段的数据类型，例如文本、数字、日期、枚举等。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：查询需求管理的programs。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_key` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_key` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_dir` | 否 | `"ASC" \| "DESC" \| "asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_dir` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_dir`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`ASC`、`DESC`、`asc`、`desc`。 |
| `is_watched` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_watched` ↔ 原始 CodeArts 需求管理 API 同名字段 `is_watched`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否已关注。true 表示当前用户已关注该资源。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：查询需求管理的项目bug统计。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的项目demand统计。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的项目领域。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_project_domains_v2

所属模块：`需求管理`

说明：查询需求管理的项目领域v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_domains_v2",
    "arguments": {
      "project_id": "<project_id>",
      "flag": "<flag>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `flag` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `flag` ↔ 原始 CodeArts 需求管理 API 同名字段 `flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

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
    },
    "flag": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    }
  },
  "required": [
    "project_id",
    "flag"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_member_work_hours

所属模块：`需求管理`

说明：查询需求管理的项目成员工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_member_work_hours",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `staff_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `staff_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `staff_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>staff ID，用于定位对应的 CodeArts 资源。 |
| `begin_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `begin_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `begin_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `work_hours_dates` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_dates` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_dates`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时日期列表，用于批量登记或查询多个日期的工时。 |
| `work_hours_types` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_types` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_types`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时类型列表，用于按多个工时分类查询或统计。 |

输入 JSON Schema：

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
    "staff_id": {
      "$ref": "#/properties/project_id"
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
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_members

所属模块：`需求管理`

说明：查询需求管理的项目成员。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的项目模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_project_user_work_hours

所属模块：`需求管理`

说明：查询需求管理的项目用户工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_user_work_hours",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `user_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `user_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户名称。 |
| `begin_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `begin_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `begin_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `work_hours_dates` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_dates` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_dates`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时日期列表，用于批量登记或查询多个日期的工时。 |
| `work_hours_types` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_types` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_types`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时类型列表，用于按多个工时分类查询或统计。 |

输入 JSON Schema：

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
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "user_name": {
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
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_versions

所属模块：`需求管理`

说明：查询需求管理的项目版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_versions",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_project_work_hour_types

所属模块：`需求管理`

说明：查询需求管理的项目工作工时types。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

输入 JSON Schema：

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
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_hour_types_v5

所属模块：`需求管理`

说明：查询需求管理的项目工作工时typesv5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hour_types_v5",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
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

所属模块：`需求管理`

说明：查询需求管理的项目工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hours",
    "arguments": {
      "project_ids": "<project_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `project_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `project_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `begin_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `begin_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `begin_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `work_hours_dates` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_dates` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_dates`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时日期列表，用于批量登记或查询多个日期的工时。 |
| `work_hours_types` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_types` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_types`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时类型列表，用于按多个工时分类查询或统计。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的项目工作项记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `operated_time_interval` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operated_time_interval` ↔ 原始 CodeArts 需求管理 API 同名字段 `operated_time_interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作时间范围，用于按操作发生时间过滤列表。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `organization_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `organization_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `organization_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>组织 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_query_issues

所属模块：`需求管理`

说明：查询需求管理的query工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_query_issues",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `show_type` | 否 | `"kanban" \| "simpleParam"` | "kanban" | 字段对应：<br>MCP 字段 `show_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `show_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>展示类型，用于控制列表、看板或统计结果的展示口径。可选值：`kanban`、`simpleParam`。 |
| `filters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `filters` ↔ 原始 CodeArts 需求管理 API 同名字段 `filters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |

输入 JSON Schema：

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
    "show_type": {
      "type": "string",
      "enum": [
        "kanban",
        "simpleParam"
      ],
      "default": "kanban"
    },
    "filters": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "maxItems": 200
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "maxItems": 20
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_related_users

所属模块：`需求管理`

说明：查询需求管理的相关用户。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_release_plans

所属模块：`需求管理`

说明：查询需求管理的发布计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_release_plans",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `key_word` | 否 | `string` |  | 字段对应：<br>MCP 字段 `key_word` ↔ 原始 CodeArts 需求管理 API 同名字段 `key_word`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `updated_time_interval` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_time_interval` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_time_interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>更新时间范围，用于按最近更新时间过滤列表。 |

输入 JSON Schema：

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
    "key_word": {
      "type": "string"
    },
    "updated_time_interval": {
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

### req_list_rr_histories

所属模块：`需求管理`

说明：查询需求管理的RRhistories。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `rr_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rr_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `rr_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>RR ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的RR状态。

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
      "rr_ids": "<rr_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `program_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `program_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `program_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目集 ID，用于定位对应的 CodeArts 资源。 |
| `rr_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `rr_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `rr_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>RR ID 列表，用于批量定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的rrs。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `program_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `program_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `program_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目集 ID，用于定位对应的 CodeArts 资源。 |
| `query_type` | 否 | `string` | "ALL" | 字段对应：<br>MCP 字段 `query_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询类型，用于切换不同查询口径或筛选范围。 |
| `include_deleted` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `include_deleted` ↔ 原始 CodeArts 需求管理 API 同名字段 `include_deleted`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否包含已删除资源。true 表示把已删除记录也纳入查询结果。 |
| `updated_time_interval` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_time_interval` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_time_interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>更新时间范围，用于按最近更新时间过滤列表。 |

输入 JSON Schema：

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
      "minLength": 1,
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

所属模块：`需求管理`

说明：查询需求管理的用户特性。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_work_item_assigned_status_configs

所属模块：`需求管理`

说明：查询需求管理的工作项assigned状态配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_assigned_status_configs",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_work_item_comments

所属模块：`需求管理`

说明：查询需求管理的工作项评论。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_work_item_comments_v2

所属模块：`需求管理`

说明：查询需求管理的工作项评论v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_comments_v2",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 10 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` | "scrum" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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
      "default": 10
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
      "minLength": 1,
      "default": "scrum"
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

所属模块：`需求管理`

说明：查询需求管理的工作项自定义字段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_custom_fields_v4

所属模块：`需求管理`

说明：查询需求管理的工作项自定义字段v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_custom_fields_v4",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `custom_fields` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `custom_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `custom_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `included_not_in_use` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `included_not_in_use` ↔ 原始 CodeArts 需求管理 API 同名字段 `included_not_in_use`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `names` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 需求管理 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "custom_fields": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "included_not_in_use": {
      "type": "boolean"
    },
    "names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
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

### req_list_work_item_queries

所属模块：`需求管理`

说明：查询需求管理的工作项queries。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_queries",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_work_item_records

所属模块：`需求管理`

说明：查询需求管理的工作项记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `journalized_type` | 否 | `string` | "Issue" | 字段对应：<br>MCP 字段 `journalized_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `journalized_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>历史记录类型，用于过滤工作项变更、评论、状态流转等动态。 |

输入 JSON Schema：

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

### req_list_work_item_records_v2

所属模块：`需求管理`

说明：查询需求管理的工作项记录v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_records_v2",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 10 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` | "scrum" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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
      "default": 10
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
      "minLength": 1,
      "default": "scrum"
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

所属模块：`需求管理`

说明：查询需求管理的工作项状态attributes。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的工作项状态配置。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项状态详情。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项状态。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_work_item_stay_times

所属模块：`需求管理`

说明：查询需求管理的工作项staytimes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_stay_times",
    "arguments": {
      "project_id": "<project_id>",
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_list_work_item_tags

所属模块：`需求管理`

说明：查询需求管理的工作项标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的工作项模板。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项trackerhandlers。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项树。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_ids` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `tracker_ids` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

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
        "type": "integer",
        "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项工作工时。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：查询需求管理的工作项工作流配置。

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
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
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

所属模块：`需求管理`

说明：查询需求管理的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 需求管理 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 需求管理 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### req_list_work_items_v3

所属模块：`需求管理`

说明：查询需求管理的工作项v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_items_v3",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

输入 JSON Schema：

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
    "tracker_id": {
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

### req_list_work_items_v4

所属模块：`需求管理`

说明：查询需求管理的工作项v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_items_v4",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `assigned_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID，用于定位对应的 CodeArts 资源。 |
| `created_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `updated_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `due_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `custom_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `custom_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `custom_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

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
    "subject": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "type": "string",
      "minLength": 1
    },
    "assigned_id": {
      "type": "string",
      "minLength": 1
    },
    "created_on": {
      "type": "string",
      "minLength": 1
    },
    "updated_on": {
      "type": "string",
      "minLength": 1
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "custom_fields": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_setting_templates_v2

所属模块：`需求管理`

说明：查询需求管理的工作setting模板v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_setting_templates_v2",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 需求管理 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "search": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_query_iteration_immovable_issues

所属模块：`需求管理`

说明：查询需求管理的迭代immovable工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_query_scrum_version_work_items_v2

所属模块：`需求管理`

说明：查询需求管理的scrum版本工作项v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_query_scrum_version_work_items_v2",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `fixed_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fixed_version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `fixed_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fixed版本 ID，用于定位对应的 CodeArts 资源。 |
| `issue_query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `issue_query` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `display_mode` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_mode` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_mode`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "fixed_version_id": {
      "$ref": "#/properties/project_id"
    },
    "issue_query": {
      "type": "string",
      "minLength": 1
    },
    "subject": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "string",
      "minLength": 1
    },
    "display_mode": {
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

### req_quick_create_child_work_item

所属模块：`需求管理`

说明：执行需求管理的create子级工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_quick_create_child_work_item",
    "arguments": {
      "project_id": "<project_id>",
      "title": "<title>",
      "parent_issue_id": "<parent_issue_id>",
      "tracker_id": "<tracker_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `parent_issue_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `parent_issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_issue_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>parent工作项 ID，用于定位对应的 CodeArts 资源。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `assigned_to_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `assigned_to_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `assigned_to_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>assignedto ID，用于定位对应的 CodeArts 资源。 |
| `fixed_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fixed_version_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `fixed_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fixed版本 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "parent_issue_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_to_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "fixed_version_id": {
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
    "title",
    "parent_issue_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_request_official_api

所属模块：`需求管理`

说明：执行需求管理的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_request_official_api",
    "arguments": {
      "method": "<method>",
      "path": "<path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 需求管理 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 需求管理 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 需求管理 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 需求管理 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "method": {
      "type": "string",
      "enum": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "pattern": "^\\/[A-Za-z0-9._~!$&'()*+,;=:@/%{}-]*(?:\\?[A-Za-z0-9._~!$&'()*+,;=:@/?%{}-]*)?$"
    },
    "query": {
      "type": "object",
      "additionalProperties": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "number"
          },
          {
            "type": "boolean"
          },
          {
            "type": "array",
            "items": {
              "type": [
                "string",
                "number",
                "boolean"
              ]
            }
          }
        ]
      }
    },
    "body": {},
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "method",
    "path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_search_my_work_items

所属模块：`需求管理`

说明：搜索需求管理的my工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_search_my_work_items",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `created_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `updated_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `closed_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `closed_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `closed_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `due_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `author_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `author_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `developer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开发人员 ID，用于定位对应的 CodeArts 资源。 |
| `priority_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `priority_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |

输入 JSON Schema：

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
    "subject": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "created_on": {
      "type": "string",
      "minLength": 1
    },
    "updated_on": {
      "type": "string",
      "minLength": 1
    },
    "closed_on": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "type": "string",
      "minLength": 1
    },
    "author_id": {
      "type": "string",
      "minLength": 1
    },
    "developer_id": {
      "type": "string",
      "minLength": 1
    },
    "priority_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_search_todo_work_items

所属模块：`需求管理`

说明：搜索需求管理的todo工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_search_todo_work_items",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 需求管理 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 需求管理 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 需求管理 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `created_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `updated_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `updated_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `closed_on` | 否 | `string` |  | 字段对应：<br>MCP 字段 `closed_on` ↔ 原始 CodeArts 需求管理 API 同名字段 `closed_on`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `due_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `author_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `author_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `developer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开发人员 ID，用于定位对应的 CodeArts 资源。 |
| `priority_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `priority_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |

输入 JSON Schema：

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
    "subject": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "created_on": {
      "type": "string",
      "minLength": 1
    },
    "updated_on": {
      "type": "string",
      "minLength": 1
    },
    "closed_on": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "type": "string",
      "minLength": 1
    },
    "author_id": {
      "type": "string",
      "minLength": 1
    },
    "developer_id": {
      "type": "string",
      "minLength": 1
    },
    "priority_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_transfer_ipd_work_item_flow

所属模块：`需求管理`

说明：流转需求管理的IPD工作项流程。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_category` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>问题分类，用于按缺陷、风险、代码问题等类别过滤。 |
| `flow_code` | 是 | `string` |  | 字段对应：<br>MCP 字段 `flow_code` ↔ 原始 CodeArts 需求管理 API 同名字段 `flow_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流程编码，用于定位工作流、审批流或状态流转流程。 |
| `process_context` | 否 | `object` |  | 字段对应：<br>MCP 字段 `process_context` ↔ 原始 CodeArts 需求管理 API 同名字段 `process_context`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流程上下文，承载工作流或审批流执行所需的变量和状态。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的缓存data。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_cache_data",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 否 | `string` | "backlog" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `cache_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `cache_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `cache_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>缓存 ID，用于定位对应的 CodeArts 资源。 |
| `visible_fields` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `visible_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `visible_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fields` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "cache_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "visible_fields": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "fields": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "minLength": 1
          },
          "field": {
            "type": "string",
            "minLength": 1
          },
          "header": {
            "type": "string",
            "minLength": 1
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "visible": {
            "type": "boolean"
          },
          "order": {
            "type": "integer",
            "minimum": 0
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
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_cache_setting

所属模块：`需求管理`

说明：更新需求管理的缓存setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_cache_setting",
    "arguments": {
      "project_id": "<project_id>",
      "fields": "<fields>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 否 | `string` | "backlog" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 需求管理 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `fields` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    },
    "fields": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
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
    "fields"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_change_review_form

所属模块：`需求管理`

说明：更新需求管理的IPDchange评审form。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_change_review_form",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>",
      "old_status": "<old_status>",
      "status": "<status>",
      "cos": "<cos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `category` | 否 | `string` | "CR" | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。 |
| `old_status` | 是 | `object` |  | 字段对应：<br>MCP 字段 `old_status` ↔ 原始 CodeArts 需求管理 API 同名字段 `old_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原状态，用于状态流转、历史记录或变更校验。 |
| `status` | 是 | `object` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `cos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `cos` ↔ 原始 CodeArts 需求管理 API 同名字段 `cos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>坐标或制品定位信息，通常用于制品仓内定位组织、仓库、包名、版本等层级。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
    },
    "old_status": {
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
      "additionalProperties": true
    },
    "status": {
      "$ref": "#/properties/old_status"
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "review_comments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "result": {
                  "type": "string"
                },
                "comment": {
                  "type": "string"
                },
                "other_user_id": {
                  "$ref": "#/properties/project_id"
                }
              },
              "additionalProperties": true
            }
          },
          "approval_comments": {
            "type": "array",
            "items": {
              "$ref": "#/properties/cos/items/properties/review_comments/items"
            }
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
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
    "id",
    "old_status",
    "status",
    "cos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_feature_set

所属模块：`需求管理`

说明：更新需求管理的IPD特性set。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `feature_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_set_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `feature_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>特性集 ID，用于定位对应的 CodeArts 资源。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `position_float` | 否 | `number` |  | 字段对应：<br>MCP 字段 `position_float` ↔ 原始 CodeArts 需求管理 API 同名字段 `position_float`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序位置值，用于在列表、看板或模块树中调整节点位置。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的IPD标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_label",
    "arguments": {
      "project_id": "<project_id>",
      "label_id": "<label_id>",
      "label_type": "<label_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `label_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `label_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `label_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID，用于定位对应的 CodeArts 资源。 |
| `label_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `label_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `label_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签类型，用于区分系统标签、自定义标签或业务标签。 |
| `color` | 否 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 需求管理 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "label_id",
    "label_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_module

所属模块：`需求管理`

说明：更新需求管理的IPD模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `display_value` | 是 | `string` |  | 字段对应：<br>MCP 字段 `display_value` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>显示值，表示字段在界面上展示给用户看的文本。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `assignee` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assignee` ↔ 原始 CodeArts 需求管理 API 同名字段 `assignee`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人或负责人标识，用于指定当前责任人或按责任人过滤。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### req_update_ipd_process_instance

所属模块：`需求管理`

说明：更新需求管理的IPD流程实例instance。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_process_instance",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `old_status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `old_status` ↔ 原始 CodeArts 需求管理 API 同名字段 `old_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原状态，用于状态流转、历史记录或变更校验。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `plan_start_date` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_end_date` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `ccbs` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `ccbs` ↔ 原始 CodeArts 需求管理 API 同名字段 `ccbs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送人或关注人集合，用于工作项通知、评审通知等场景。 |
| `opinions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `opinions` ↔ 原始 CodeArts 需求管理 API 同名字段 `opinions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>意见内容列表，用于审批、评审或评论场景。 |
| `cc` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `cc` ↔ 原始 CodeArts 需求管理 API 同名字段 `cc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>抄送人列表或抄送人标识，用于通知相关人员。 |
| `cos` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `cos` ↔ 原始 CodeArts 需求管理 API 同名字段 `cos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>坐标或制品定位信息，通常用于制品仓内定位组织、仓库、包名、版本等层级。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "old_status": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string"
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "plan_end_date": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "ccbs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "curr_owner": {
            "$ref": "#/properties/project_id"
          }
        },
        "additionalProperties": true
      }
    },
    "opinions": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "number": {
            "type": "string"
          },
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_category": {
            "type": "string"
          },
          "change_type": {
            "type": "string"
          },
          "before_change": {
            "type": "string"
          },
          "after_change": {
            "type": "string"
          }
        },
        "additionalProperties": true
      }
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
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_project_field

所属模块：`需求管理`

说明：更新需求管理的IPD项目字段。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_project_field",
    "arguments": {
      "project_id": "<project_id>",
      "field_id": "<field_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `created_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建人标识，用于按创建人过滤或展示资源来源。 |
| `field_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段类型，用于描述自定义字段的数据类型，例如文本、数字、日期、枚举等。 |
| `show_on_card` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `show_on_card` ↔ 原始 CodeArts 需求管理 API 同名字段 `show_on_card`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `optional` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `optional` ↔ 原始 CodeArts 需求管理 API 同名字段 `optional`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `all_options` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `all_options` ↔ 原始 CodeArts 需求管理 API 同名字段 `all_options`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `default_value` | 否 | `string` |  | 字段对应：<br>MCP 字段 `default_value` ↔ 原始 CodeArts 需求管理 API 同名字段 `default_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `definition_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `definition_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `definition_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `option` | 否 | `object \| array<object>` |  | 字段对应：<br>MCP 字段 `option` ↔ 原始 CodeArts 需求管理 API 同名字段 `option`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `field_type_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段type ID，用于定位对应的 CodeArts 资源。 |
| `user_visibility` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `user_visibility` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_visibility`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `modified_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `modified_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `modified_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>修改日期过滤条件或修改日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `modified_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `modified_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `modified_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `has_same_display_name` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `has_same_display_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `has_same_display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hassamedisplay名称。 |
| `field_type_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段type名称。 |
| `created_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建日期过滤条件或创建日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `field_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `field_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "created_by": {
      "type": "string"
    },
    "field_type": {
      "type": "string"
    },
    "show_on_card": {
      "type": "boolean"
    },
    "optional": {
      "type": "boolean"
    },
    "all_options": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/id"
          },
          "code": {
            "type": "string"
          },
          "display_value": {
            "type": "string"
          },
          "value": {
            "type": "string"
          },
          "level": {
            "type": "integer"
          },
          "sequence": {
            "type": "integer"
          },
          "parent_id": {
            "$ref": "#/properties/id"
          }
        },
        "additionalProperties": true
      }
    },
    "default_value": {
      "type": "string"
    },
    "definition_type": {
      "type": "string"
    },
    "option": {
      "anyOf": [
        {
          "$ref": "#/properties/all_options/items"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/all_options/items"
          }
        }
      ]
    },
    "field_type_id": {
      "type": "string"
    },
    "user_visibility": {
      "type": "boolean"
    },
    "modified_date": {
      "type": "string"
    },
    "modified_by": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "has_same_display_name": {
      "type": "boolean"
    },
    "field_type_name": {
      "type": "string"
    },
    "created_date": {
      "type": "string"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "project_id": {
      "$ref": "#/properties/id"
    },
    "field_id": {
      "$ref": "#/properties/id"
    }
  },
  "required": [
    "project_id",
    "field_id"
  ],
  "additionalProperties": true,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_tenant_field

所属模块：`需求管理`

说明：更新需求管理的IPD租户字段。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_tenant_field",
    "arguments": {
      "field_id": "<field_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 需求管理 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `created_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建人标识，用于按创建人过滤或展示资源来源。 |
| `field_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段类型，用于描述自定义字段的数据类型，例如文本、数字、日期、枚举等。 |
| `show_on_card` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `show_on_card` ↔ 原始 CodeArts 需求管理 API 同名字段 `show_on_card`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `optional` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `optional` ↔ 原始 CodeArts 需求管理 API 同名字段 `optional`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `all_options` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `all_options` ↔ 原始 CodeArts 需求管理 API 同名字段 `all_options`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `default_value` | 否 | `string` |  | 字段对应：<br>MCP 字段 `default_value` ↔ 原始 CodeArts 需求管理 API 同名字段 `default_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `definition_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `definition_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `definition_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `option` | 否 | `object \| array<object>` |  | 字段对应：<br>MCP 字段 `option` ↔ 原始 CodeArts 需求管理 API 同名字段 `option`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `field_type_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段type ID，用于定位对应的 CodeArts 资源。 |
| `user_visibility` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `user_visibility` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_visibility`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `modified_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `modified_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `modified_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>修改日期过滤条件或修改日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `modified_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `modified_by` ↔ 原始 CodeArts 需求管理 API 同名字段 `modified_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `has_same_display_name` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `has_same_display_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `has_same_display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hassamedisplay名称。 |
| `field_type_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `field_type_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_type_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段type名称。 |
| `created_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建日期过滤条件或创建日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `extra_fields` | 否 | `object` |  | 字段对应：<br>MCP 字段 `extra_fields` ↔ 原始 CodeArts 需求管理 API 同名字段 `extra_fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `field_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `field_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `field_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>字段 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "created_by": {
      "type": "string"
    },
    "field_type": {
      "type": "string"
    },
    "show_on_card": {
      "type": "boolean"
    },
    "optional": {
      "type": "boolean"
    },
    "all_options": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/id"
          },
          "code": {
            "type": "string"
          },
          "display_value": {
            "type": "string"
          },
          "value": {
            "type": "string"
          },
          "level": {
            "type": "integer"
          },
          "sequence": {
            "type": "integer"
          },
          "parent_id": {
            "$ref": "#/properties/id"
          }
        },
        "additionalProperties": true
      }
    },
    "default_value": {
      "type": "string"
    },
    "definition_type": {
      "type": "string"
    },
    "option": {
      "anyOf": [
        {
          "$ref": "#/properties/all_options/items"
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/all_options/items"
          }
        }
      ]
    },
    "field_type_id": {
      "type": "string"
    },
    "user_visibility": {
      "type": "boolean"
    },
    "modified_date": {
      "type": "string"
    },
    "modified_by": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "has_same_display_name": {
      "type": "boolean"
    },
    "field_type_name": {
      "type": "string"
    },
    "created_date": {
      "type": "string"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "field_id": {
      "$ref": "#/properties/id"
    }
  },
  "required": [
    "field_id"
  ],
  "additionalProperties": true,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_work_hour

所属模块：`需求管理`

说明：更新需求管理的IPD工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_work_hour",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "workhour_id": "<workhour_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `workhour_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `workhour_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `workhour_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时 ID，用于定位对应的 CodeArts 资源。 |
| `work_hours` | 否 | `string \| number` |  | 字段对应：<br>MCP 字段 `work_hours` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>实际工时或工时明细，用于登记、更新或查询工作量。 |
| `work_hour_category` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_hour_category` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hour_category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时分类，用于区分不同来源或用途的工时记录。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "work_hours": {
      "type": [
        "string",
        "number"
      ]
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
    "workhour_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_iteration

所属模块：`需求管理`

说明：更新需求管理的迭代。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `begin_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `begin_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `begin_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 需求管理 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `over_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `over_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `over_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>完成或结束类型，用于区分正常结束、手动结束、超时结束等场景。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：更新需求管理的迭代state。

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
      "status": "<status>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iteration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `iteration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `status` | 是 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `due_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `due_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `due_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>截止日期，表示工作项、计划或任务期望完成时间。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "minLength": 1
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

所属模块：`需求管理`

说明：更新需求管理的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的计划图片。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `img_url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `img_url` ↔ 原始 CodeArts 需求管理 API 同名字段 `img_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>img URL，用于指定服务地址、资源地址或回调地址。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的项目。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_update_project_domain

所属模块：`需求管理`

说明：更新需求管理的项目领域。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_domain",
    "arguments": {
      "project_id": "<project_id>",
      "domain_id": "<domain_id>",
      "domain_name": "<domain_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `domain_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `domain_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>领域名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 31
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_id",
    "domain_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_member_role

所属模块：`需求管理`

说明：更新需求管理的项目成员角色。

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
      "role_id": "<role_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `role_id` | 是 | `number \| integer` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "anyOf": [
        {
          "type": "number",
          "const": -1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
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

所属模块：`需求管理`

说明：更新需求管理的项目模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `module_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块名称。 |
| `owner_user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `owner_user_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `owner_user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者用户 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的项目模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_template",
    "arguments": {
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_id": {
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
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_release_plan

所属模块：`需求管理`

说明：更新需求管理的发布计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_release_plan",
    "arguments": {
      "project_id": "<project_id>",
      "plan_id": "<plan_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 需求管理 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `category` | 否 | `"PI" \| "Iteration" \| "PlanMilestone"` |  | 字段对应：<br>MCP 字段 `category` ↔ 原始 CodeArts 需求管理 API 同名字段 `category`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。可选值：`PI`、`Iteration`、`PlanMilestone`。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 需求管理 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `status` | 否 | `"planned" \| "going" \| "ended"` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 需求管理 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`planned`、`going`、`ended`。 |
| `plan_start_date` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_start_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划开始日期，用于工作项、迭代、计划或测试计划的排期。 |
| `plan_end_date` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `plan_end_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `plan_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划结束日期，用于工作项、迭代、计划或测试计划的排期。 |
| `created_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `created_date` ↔ 原始 CodeArts 需求管理 API 同名字段 `created_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建日期过滤条件或创建日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `baseline` | 否 | `"baselined" \| "unbaseline" \| "baseline-reviewing"` |  | 字段对应：<br>MCP 字段 `baseline` ↔ 原始 CodeArts 需求管理 API 同名字段 `baseline`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>基线信息或是否启用基线，用于需求、计划、测试等资源的版本基准管理。可选值：`baselined`、`unbaseline`、`baseline-reviewing`。 |
| `workload` | 否 | `string` |  | 字段对应：<br>MCP 字段 `workload` ↔ 原始 CodeArts 需求管理 API 同名字段 `workload`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作量，用于计划、迭代或成员维度的容量/投入统计。 |
| `owner` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 需求管理 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "category": {
      "type": "string",
      "enum": [
        "PI",
        "Iteration",
        "PlanMilestone"
      ]
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "planned",
        "going",
        "ended"
      ]
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "minimum": 0
        }
      ]
    },
    "plan_end_date": {
      "$ref": "#/properties/plan_start_date"
    },
    "created_date": {
      "type": "integer",
      "minimum": 0
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "baseline": {
      "type": "string",
      "enum": [
        "baselined",
        "unbaseline",
        "baseline-reviewing"
      ]
    },
    "workload": {
      "type": "string"
    },
    "owner": {
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

### req_update_tracker_config

所属模块：`需求管理`

说明：更新需求管理的tracker配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_tracker_config",
    "arguments": {
      "project_id": "<project_id>",
      "tracker_id": "<tracker_id>",
      "status_config_id": "<status_config_id>",
      "new_position": "<new_position>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_config_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `status_config_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_config_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态配置 ID，用于定位对应的 CodeArts 资源。 |
| `new_position` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `new_position` ↔ 原始 CodeArts 需求管理 API 同名字段 `new_position`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>新的排序位置，用于移动工作项、模块、分组或节点。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_config_id": {
      "$ref": "#/properties/project_id"
    },
    "new_position": {
      "type": "integer",
      "minimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tracker_id",
    "status_config_id",
    "new_position"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item

所属模块：`需求管理`

说明：更新需求管理的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ PDF/CodeArts 路径参数 `project_id`。<br>参数解释：<br>项目的 32 位 UUID，项目唯一标识。可通过查询项目列表接口获取，响应消息体中的 project_id 字段值就是项目 ID。<br>约束限制：<br>正则表达式：[A-Za-z0-9]{32}。<br>取值范围：<br>不涉及。<br>默认取值：<br>不涉及。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ PDF/CodeArts 路径参数 `issue_id`。<br>参数解释：<br>工作项 ID。MCP 字段 work_item_id 会映射到 CodeArts 更新工作项 API 路径参数 issue_id。可通过高级查询工作项接口获取，响应消息体中的 id 字段值就是工作项 ID。<br>约束限制：<br>长度在 1 位到 10 位之间的纯数字。<br>取值范围：<br>最小长度：1，最大长度：10。<br>默认取值：<br>不涉及。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ PDF/CodeArts 请求体字段 `name`。<br>参数解释：<br>工作项标题。MCP 字段 title 会映射到 CodeArts 更新工作项 API 的 name 字段。<br>约束限制：<br>更新时可选；不传则不修改标题。<br>取值范围：<br>字符串。<br>默认取值：<br>不涉及。 |
| `work_item_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_item_type` ↔ PDF/CodeArts 请求体字段 `tracker_id`；工具会把 task/bug/epic/feature/story 转成 2/3/5/6/7。<br>参数解释：<br>工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 更新工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。<br>约束限制：<br>正则表达式：\d+。更新时可选；不传则不修改工作项类型。<br>取值范围：<br>2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。<br>默认取值：<br>不涉及。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ PDF/CodeArts 请求体字段 `description`。<br>参数解释：<br>工作项描述信息。<br>约束限制：<br>更新时可选；不传则不修改描述。<br>取值范围：<br>字符串。<br>默认取值：<br>不涉及。 |
| `status_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ PDF/CodeArts 请求体字段 `status_id`。<br>参数解释：<br>工作项状态 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（新建）；<br>2（进行中）；<br>3（已解决）；<br>4（测试中）；<br>5（已关闭）；<br>6（已拒绝）。<br>默认取值：<br>不涉及。 |
| `priority_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `priority_id` ↔ PDF/CodeArts 请求体字段 `priority_id`。<br>参数解释：<br>工作项优先级。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>1（低）；<br>2（中）；<br>3（高）。<br>默认取值：<br>不涉及。 |
| `iteration_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`。<br>参数解释：<br>迭代 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ PDF/CodeArts 请求体字段 `module_id`。<br>参数解释：<br>模块 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `severity_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `severity_id` ↔ PDF/CodeArts 请求体字段 `severity_id`。<br>参数解释：<br>重要程度。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。<br>默认取值：<br>不涉及。 |
| `assigned_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assigned_id` ↔ PDF/CodeArts 请求体字段 `assigned_id`。<br>参数解释：<br>处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `developer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `developer_id` ↔ PDF/CodeArts 请求体字段 `developer_id`。<br>参数解释：<br>开发者数字 ID。<br>约束限制：<br>正则表达式：\d+。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `done_ratio` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `done_ratio` ↔ PDF/CodeArts 请求体字段 `done_ratio`。<br>参数解释：<br>工作项完成度。例如输入 20，表示完成度为 20%。<br>约束限制：<br>正则表达式：(100\|[1-9]?\d)。<br>取值范围：<br>最小值 0，最大值 100。<br>默认取值：<br>不涉及。 |
| `expected_work_hours` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `expected_work_hours` ↔ PDF/CodeArts 请求体字段 `expected_work_hours`。<br>参数解释：<br>预计工时。<br>约束限制：<br>不涉及。<br>取值范围：<br>最小值 0。<br>默认取值：<br>不涉及。 |
| `start_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `start_date` ↔ PDF/CodeArts 请求体字段 `begin_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>开始时间。对应 CodeArts 更新工作项文档中的开始时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `begin_time` 字段（YYYY-MM-DD）提交；不传则不修改开始时间。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `due_date` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `due_date` ↔ PDF/CodeArts 请求体字段 `end_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。<br>参数解释：<br>结束时间。对应 CodeArts 更新工作项文档中的结束时间语义。<br>约束限制：<br>工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `end_time` 字段（YYYY-MM-DD）提交；不传则不修改结束时间。<br>取值范围：<br>正整数毫秒时间戳。<br>默认取值：<br>不涉及。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "developer_id": {
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

所属模块：`需求管理`

说明：更新需求管理的工作项评论。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `comment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `comment_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `comment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评论 ID，用于定位对应的 CodeArts 资源。 |
| `content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 需求管理 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：更新需求管理的工作项流程。

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
      "status_id": "<status_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `status_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_update_working_hours

所属模块：`需求管理`

说明：更新需求管理的工作工时。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_working_hours",
    "arguments": {
      "project_id": "<project_id>",
      "issue_id": "<issue_id>",
      "work_hours_id": "<work_hours_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `object \| integer` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `work_hours_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_hours_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时 ID，用于定位对应的 CodeArts 资源。 |
| `summary` | 否 | `string` |  | 字段对应：<br>MCP 字段 `summary` ↔ 原始 CodeArts 需求管理 API 同名字段 `summary`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>摘要信息，用于概括问题、需求或执行结果。 |
| `work_hours` | 否 | `number` |  | 字段对应：<br>MCP 字段 `work_hours` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hours`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>实际工时或工时明细，用于登记、更新或查询工作量。 |
| `work_hour_type` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `work_hour_type` ↔ 原始 CodeArts 需求管理 API 同名字段 `work_hour_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工时类型，用于区分开发、测试、评审等工时分类；具体字典以项目配置为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "anyOf": [
        {
          "$ref": "#/properties/project_id"
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "work_hours_id": {
      "$ref": "#/properties/project_id"
    },
    "summary": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "work_hours": {
      "type": "number",
      "minimum": 0,
      "maximum": 100000000
    },
    "work_hour_type": {
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
    "issue_id",
    "work_hours_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_attachment

所属模块：`需求管理`

说明：上传需求管理的附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 需求管理 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_upload_attachment_v3

所属模块：`需求管理`

说明：上传需求管理的附件v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_attachment_v3",
    "arguments": {
      "file_path": "<file_path>",
      "tiny_form_datas": "<tiny_form_datas>",
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `tiny_form_datas` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tiny_form_datas` ↔ 原始 CodeArts 需求管理 API 同名字段 `tiny_form_datas`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 需求管理 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "tiny_form_datas": {
      "type": "string",
      "minLength": 1
    },
    "x_auth_token": {
      "type": "string",
      "minLength": 10
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "file_path",
    "tiny_form_datas",
    "x_auth_token"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_ipd_issue_attachment

所属模块：`需求管理`

说明：上传需求管理的IPD工作项附件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：上传需求管理的IPD工作项图片。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 需求管理 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`需求管理`

说明：上传需求管理的工作项图片。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### req_upload_work_item_image_v2

所属模块：`需求管理`

说明：上传需求管理的工作项图片v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_work_item_image_v2",
    "arguments": {
      "project_id": "<project_id>",
      "file_path": "<file_path>",
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 需求管理 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 需求管理 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "x_auth_token": {
      "type": "string",
      "minLength": 10
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "file_path",
    "x_auth_token"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_validate_module_name

所属模块：`需求管理`

说明：校验需求管理的模块name。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 需求管理 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_name` ↔ 原始 CodeArts 需求管理 API 同名字段 `module_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块名称。 |

输入 JSON Schema：

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

### req_validate_project_template_name

所属模块：`需求管理`

说明：校验需求管理的项目模板name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_validate_project_template_name",
    "arguments": {
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 需求管理 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

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

