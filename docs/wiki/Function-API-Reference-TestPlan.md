# CodeArts MCP 函数 API 参考 - 测试计划

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`测试计划`

API 数量：`210`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### testplan_batch_delete_tasks

所属模块：`测试计划`

说明：批量处理测试计划的delete任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_batch_delete_tasks",
    "arguments": {
      "project_id": "<project_id>",
      "task_uris": "<task_uris>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uris` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `task_uris` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uris`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "task_uris": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_uris"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_alert_template_name

所属模块：`测试计划`

说明：检查测试计划的alert模板name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_alert_template_name",
    "arguments": {
      "service_id": "<service_id>",
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/service_id"
    }
  },
  "required": [
    "service_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_alert_user_name

所属模块：`测试计划`

说明：检查测试计划的alert用户name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_alert_user_name",
    "arguments": {
      "service_id": "<service_id>",
      "user_name": "<user_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `user_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `user_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户名称。 |
| `user_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "user_name": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/service_id"
    }
  },
  "required": [
    "service_id",
    "user_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_api_test_task_name

所属模块：`测试计划`

说明：检查测试计划的api测试任务name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_api_test_task_name",
    "arguments": {
      "service_id": "<service_id>",
      "task_name": "<task_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `task_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务名称。 |
| `task_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/service_id"
    }
  },
  "required": [
    "service_id",
    "task_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_project_member_exists

所属模块：`测试计划`

说明：检查测试计划的项目成员exists。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_project_member_exists",
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

### testplan_check_resource_exists

所属模块：`测试计划`

说明：检查测试计划的资源exists。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_resource_exists",
    "arguments": {
      "project_id": "<project_id>",
      "resource_uri": "<resource_uri>",
      "version_uri": "<version_uri>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `resource_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `resource_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_uri": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "integer"
    }
  },
  "required": [
    "project_id",
    "resource_uri",
    "version_uri",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_user_defined_config_used

所属模块：`测试计划`

说明：检查测试计划的用户defined配置used。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_user_defined_config_used",
    "arguments": {
      "project_id": "<project_id>",
      "config_id": "<config_id>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `config_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `config_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `config_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>配置 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "config_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "config_id",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_check_user_exists

所属模块：`测试计划`

说明：检查测试计划的用户exists。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_user_exists",
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

### testplan_check_user_info

所属模块：`测试计划`

说明：检查测试计划的用户信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_check_user_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_create_task

所属模块：`测试计划`

说明：创建测试计划的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_create_task",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 测试计划 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "uri": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "version_uri": {
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

### testplan_create_task_relations

所属模块：`测试计划`

说明：创建测试计划的任务relations。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_create_task_relations",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `number` | 否 | `string` |  | 字段对应：<br>MCP 字段 `number` ↔ 原始 CodeArts 测试计划 API 同名字段 `number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编号，用于工作项、构建、执行记录等资源的人类可读序号。 |
| `tags` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tags` ↔ 原始 CodeArts 测试计划 API 同名字段 `tags`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表，用于给资源打标或按标签过滤。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 测试计划 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `owner_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
| `parent_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `test_case_condition` | 否 | `string` |  | 字段对应：<br>MCP 字段 `test_case_condition` ↔ 原始 CodeArts 测试计划 API 同名字段 `test_case_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `service_type` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `module_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块名称。 |
| `release_dev` | 否 | `string` |  | 字段对应：<br>MCP 字段 `release_dev` ↔ 原始 CodeArts 测试计划 API 同名字段 `release_dev`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `status_code` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status_code` ↔ 原始 CodeArts 测试计划 API 同名字段 `status_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ext_param` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ext_param` ↔ 原始 CodeArts 测试计划 API 同名字段 `ext_param`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `execute_way` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `execute_way` ↔ 原始 CodeArts 测试计划 API 同名字段 `execute_way`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "uri": {
      "$ref": "#/properties/project_id"
    },
    "stage": {
      "type": "string",
      "minLength": 1
    },
    "number": {
      "type": "string",
      "minLength": 1
    },
    "tags": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "owner_id": {
      "$ref": "#/properties/project_id"
    },
    "parent_uri": {
      "$ref": "#/properties/project_id"
    },
    "test_case_condition": {
      "type": "string",
      "minLength": 1
    },
    "service_type": {
      "type": "integer"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "module_name": {
      "type": "string",
      "minLength": 1
    },
    "release_dev": {
      "type": "string",
      "minLength": 1
    },
    "status_code": {
      "type": "integer"
    },
    "ext_param": {
      "type": "string",
      "minLength": 1
    },
    "execute_way": {
      "type": "integer"
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

### testplan_get_api_test_available_config

所属模块：`测试计划`

说明：获取测试计划的api测试available配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_available_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_api_test_basic_aw_v3

所属模块：`测试计划`

说明：获取测试计划的api测试basicawv3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_basic_aw_v3",
    "arguments": {
      "project_id": "<project_id>",
      "aw_id": "<aw_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `aw_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "aw_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "aw_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_basic_aw_v4

所属模块：`测试计划`

说明：获取测试计划的api测试basicawv4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_basic_aw_v4",
    "arguments": {
      "project_id": "<project_id>",
      "aw_id": "<aw_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `aw_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw ID，用于定位对应的 CodeArts 资源。 |
| `is_api` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_api` ↔ 原始 CodeArts 测试计划 API 同名字段 `is_api`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "aw_id": {
      "$ref": "#/properties/project_id"
    },
    "is_api": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id",
    "aw_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_concurrency_package_status

所属模块：`测试计划`

说明：获取测试计划的api测试concurrencypackage状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_concurrency_package_status",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `test_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `test_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `test_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "test_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_debug_log

所属模块：`测试计划`

说明：获取测试计划的api测试debug日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_debug_log",
    "arguments": {
      "project_id": "<project_id>",
      "case_id": "<case_id>",
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `case_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `case_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `case_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>测试用例 ID，用于定位对应的 CodeArts 资源。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "case_id",
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_dns_mapping

所属模块：`测试计划`

说明：获取测试计划的api测试dnsmapping。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_dns_mapping",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_api_test_package_charge_message

所属模块：`测试计划`

说明：获取测试计划的api测试packagechargemessage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_package_charge_message",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_api_test_package_charge_popup

所属模块：`测试计划`

说明：获取测试计划的api测试packagechargepopup。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_package_charge_popup",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_api_test_project_info

所属模块：`测试计划`

说明：获取测试计划的api测试项目信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_project_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_task_status

所属模块：`测试计划`

说明：获取测试计划的api测试任务状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_task_status",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    "project_id",
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_api_test_task_status_v2

所属模块：`测试计划`

说明：获取测试计划的api测试任务状态v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_api_test_task_status_v2",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    "project_id",
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_background_info

所属模块：`测试计划`

说明：获取测试计划的background信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_background_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_branch

所属模块：`测试计划`

说明：获取测试计划的分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_branch",
    "arguments": {
      "branch_uri": "<branch_uri>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `branch_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `branch_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "branch_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/branch_uri"
    }
  },
  "required": [
    "branch_uri",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_case

所属模块：`测试计划`

说明：获取测试计划的用例。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `case_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `case_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `case_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>测试用例 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### testplan_get_case_template

所属模块：`测试计划`

说明：获取测试计划的用例模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_case_template",
    "arguments": {
      "project_id": "<project_id>",
      "template_uri": "<template_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `template_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `template_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "template_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "template_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_current_user_package_permission

所属模块：`测试计划`

说明：获取测试计划的当前用户packagepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_current_user_package_permission",
    "arguments": {
      "project_id": "<project_id>",
      "package_type": "<package_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `package_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `package_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `package_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "package_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "package_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_custom_template

所属模块：`测试计划`

说明：获取测试计划的自定义模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_custom_template",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_customized_columns

所属模块：`测试计划`

说明：获取测试计划的customizedcolumns。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_customized_columns",
    "arguments": {
      "project_id": "<project_id>",
      "service_type": "<service_type>",
      "stage_type": "<stage_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `service_type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `stage_type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `stage_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `stage_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "service_type": {
      "type": "integer"
    },
    "stage_type": {
      "type": "integer"
    }
  },
  "required": [
    "project_id",
    "service_type",
    "stage_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_customized_columns_v4

所属模块：`测试计划`

说明：获取测试计划的customizedcolumnsv4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_customized_columns_v4",
    "arguments": {
      "project_id": "<project_id>",
      "service_type": "<service_type>",
      "stage_type": "<stage_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `service_type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `stage_type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `stage_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `stage_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "service_type": {
      "type": "integer"
    },
    "stage_type": {
      "type": "integer"
    }
  },
  "required": [
    "project_id",
    "service_type",
    "stage_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_dashboard_run_panel

所属模块：`测试计划`

说明：获取测试计划的dashboard运行panel。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_dashboard_run_panel",
    "arguments": {
      "service_id": "<service_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "service_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_domain_access_info

所属模块：`测试计划`

说明：获取测试计划的领域access信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_domain_access_info",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_domain_detail_info

所属模块：`测试计划`

说明：获取测试计划的领域详情信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_domain_detail_info",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `order_query_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `order_query_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `order_query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "order_query_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_domain_frozen_info

所属模块：`测试计划`

说明：获取测试计划的领域frozen信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_domain_frozen_info",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_domain_need_popup

所属模块：`测试计划`

说明：获取测试计划的领域needpopup。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_domain_need_popup",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_domain_user_count

所属模块：`测试计划`

说明：获取测试计划的领域用户数量。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_domain_user_count",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_factor

所属模块：`测试计划`

说明：获取测试计划的factor。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_factor",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_free_declaration

所属模块：`测试计划`

说明：获取测试计划的freedeclaration。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_free_declaration",
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

### testplan_get_free_test_time

所属模块：`测试计划`

说明：获取测试计划的free测试time。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_free_test_time",
    "arguments": {
      "testServiceId": "<testServiceId>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `testServiceId` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testServiceId` ↔ 原始 CodeArts 测试计划 API 同名字段 `testServiceId`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "testServiceId": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "testServiceId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_functional_test_package_status

所属模块：`测试计划`

说明：获取测试计划的functional测试package状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_functional_test_package_status",
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

### testplan_get_functional_test_parallel_summary

所属模块：`测试计划`

说明：获取测试计划的functional测试parallel摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_functional_test_parallel_summary",
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

### testplan_get_gt3k_background_info

所属模块：`测试计划`

说明：获取测试计划的gt3kbackground信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_background_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_gt3k_branch

所属模块：`测试计划`

说明：获取测试计划的gt3k分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_branch",
    "arguments": {
      "branch_id": "<branch_id>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `branch_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `branch_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分支 ID，用于定位对应的 CodeArts 资源。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "branch_id": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/branch_id"
    }
  },
  "required": [
    "branch_id",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_gt3k_domain_info

所属模块：`测试计划`

说明：获取测试计划的gt3k领域信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_domain_info",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_gt3k_free_declaration

所属模块：`测试计划`

说明：获取测试计划的gt3kfreedeclaration。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_free_declaration",
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

### testplan_get_gt3k_iterator

所属模块：`测试计划`

说明：获取测试计划的gt3kiterator。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_iterator",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "iterator_id": "<iterator_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `iterator_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>iterator ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "iterator_id": {
      "$ref": "#/properties/project_uuid"
    }
  },
  "required": [
    "project_uuid",
    "iterator_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_gt3k_progress

所属模块：`测试计划`

说明：获取测试计划的gt3kprogress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_progress",
    "arguments": {
      "operation_uri": "<operation_uri>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `operation_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `operation_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `operation_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "operation_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/operation_uri"
    }
  },
  "required": [
    "operation_uri",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_gt3k_testcase_change_statistics

所属模块：`测试计划`

说明：获取测试计划的gt3ktestcasechange统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_testcase_change_statistics",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本 ID，用于定位对应的 CodeArts 资源。 |

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

### testplan_get_gt3k_user_info_domain

所属模块：`测试计划`

说明：获取测试计划的gt3k用户信息领域。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_gt3k_user_info_domain",
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

### testplan_get_image_capacity_warning

所属模块：`测试计划`

说明：获取测试计划的图片capacitywarning。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_image_capacity_warning",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_iterator

所属模块：`测试计划`

说明：获取测试计划的iterator。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_iterator",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "iterator_uri": "<iterator_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `iterator_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "iterator_uri": {
      "$ref": "#/properties/project_uuid"
    }
  },
  "required": [
    "project_uuid",
    "iterator_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_license_specification

所属模块：`测试计划`

说明：获取测试计划的licensespecification。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_license_specification",
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

### testplan_get_mindmap

所属模块：`测试计划`

说明：获取测试计划的mindmap。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_mindmap_backup

所属模块：`测试计划`

说明：获取测试计划的mindmapbackup。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap_backup",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_mindmap_creator_name

所属模块：`测试计划`

说明：获取测试计划的mindmapcreatorname。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap_creator_name",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_mindmap_permission

所属模块：`测试计划`

说明：获取测试计划的mindmappermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap_permission",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_mindmap_recycle

所属模块：`测试计划`

说明：获取测试计划的mindmaprecycle。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap_recycle",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_mindmap_statistics

所属模块：`测试计划`

说明：获取测试计划的mindmap统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_mindmap_statistics",
    "arguments": {
      "project_id": "<project_id>",
      "mindmap_id": "<mindmap_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `mindmap_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `mindmap_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `mindmap_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>mindmap ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "mindmap_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "mindmap_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_plan

所属模块：`测试计划`

说明：获取测试计划的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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

### testplan_get_progress

所属模块：`测试计划`

说明：获取测试计划的progress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_progress",
    "arguments": {
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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
    }
  },
  "required": [
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_advanced_feature_trial

所属模块：`测试计划`

说明：获取测试计划的项目advanced特性trial。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_advanced_feature_trial",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_project_advanced_feature_trusted

所属模块：`测试计划`

说明：获取测试计划的项目advanced特性trusted。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_advanced_feature_trusted",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_project_domain_detail_info

所属模块：`测试计划`

说明：获取测试计划的项目领域详情信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_domain_detail_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `order_query_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `order_query_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `order_query_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "order_query_type": {
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

### testplan_get_project_issue_update_notification

所属模块：`测试计划`

说明：获取测试计划的项目工作项updatenotification。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_issue_update_notification",
    "arguments": {
      "project_id": "<project_id>",
      "owner_id": "<owner_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `owner_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "owner_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "owner_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_local_config

所属模块：`测试计划`

说明：获取测试计划的项目local配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_local_config",
    "arguments": {
      "project_id": "<project_id>",
      "property": "<property>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `property` | 是 | `string` |  | 字段对应：<br>MCP 字段 `property` ↔ 原始 CodeArts 测试计划 API 同名字段 `property`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "property": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "property"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_master_version

所属模块：`测试计划`

说明：获取测试计划的项目master版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_master_version",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_project_message_notices

所属模块：`测试计划`

说明：获取测试计划的项目messagenotices。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_message_notices",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_project_progress

所属模块：`测试计划`

说明：获取测试计划的项目progress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_progress",
    "arguments": {
      "project_id": "<project_id>",
      "operation_uri": "<operation_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `operation_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `operation_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `operation_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "operation_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "operation_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_service_config

所属模块：`测试计划`

说明：获取测试计划的项目service配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_service_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `key` | 否 | `string` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 测试计划 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1
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

### testplan_get_project_service_repo

所属模块：`测试计划`

说明：获取测试计划的项目servicerepo。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_service_repo",
    "arguments": {
      "project_id": "<project_id>",
      "service_id": "<service_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `service_id` | 是 | `object \| integer` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "service_id": {
      "anyOf": [
        {
          "$ref": "#/properties/project_id"
        },
        {
          "type": "integer"
        }
      ]
    }
  },
  "required": [
    "project_id",
    "service_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_system_config

所属模块：`测试计划`

说明：获取测试计划的项目system配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_system_config",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "owner_id": "<owner_id>",
      "feature_name": "<feature_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `owner_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
| `feature_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `feature_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>特性名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "owner_id": {
      "$ref": "#/properties/project_uuid"
    },
    "feature_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid",
    "owner_id",
    "feature_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_testcase

所属模块：`测试计划`

说明：获取测试计划的项目testcase。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_testcase",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_id": "<testcase_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>testcase ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "testcase_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_testcase_by_number

所属模块：`测试计划`

说明：获取测试计划的项目testcasebynumber。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_testcase_by_number",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_number": "<testcase_number>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_number` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_number` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "testcase_number": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_number"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_project_testcase_global_config

所属模块：`测试计划`

说明：获取测试计划的项目testcaseglobal配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_testcase_global_config",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_get_project_testcase_v4

所属模块：`测试计划`

说明：获取测试计划的项目testcasev4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_project_testcase_v4",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_uri": "<testcase_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `plan_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "testcase_uri": {
      "$ref": "#/properties/project_id"
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_quality_report_overview

所属模块：`测试计划`

说明：获取测试计划的qualityreportoverview。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_quality_report_overview",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `fixed_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fixed_version_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `fixed_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fixed版本 ID，用于定位对应的 CodeArts 资源。 |
| `owner_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
| `own` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `own` ↔ 原始 CodeArts 测试计划 API 同名字段 `own`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pi_filter` | 否 | `object` |  | 字段对应：<br>MCP 字段 `pi_filter` ↔ 原始 CodeArts 测试计划 API 同名字段 `pi_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "fixed_version_id": {
      "type": "string",
      "minLength": 1
    },
    "owner_id": {
      "type": "string",
      "minLength": 1
    },
    "own": {
      "type": "boolean"
    },
    "pi_filter": {
      "type": "object",
      "properties": {
        "all_pi": {
          "type": "boolean"
        },
        "pi_sprints": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "pi_id": {
                "type": "string"
              },
              "sprints": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_rule_check_task_report

所属模块：`测试计划`

说明：获取测试计划的规则检查任务report。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_rule_check_task_report",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "task_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_rule_check_task_summary

所属模块：`测试计划`

说明：获取测试计划的规则检查任务摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_rule_check_task_summary",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `severity` | 否 | `string` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 测试计划 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。 |
| `status` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 测试计划 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "severity": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "integer"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_service_config

所属模块：`测试计划`

说明：获取测试计划的service配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_service_config",
    "arguments": {
      "service_id": "<service_id>",
      "key": "<key>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 测试计划 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "service_id",
    "key",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_service_type_overview

所属模块：`测试计划`

说明：获取测试计划的servicetypeoverview。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_service_type_overview",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `fixed_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fixed_version_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `fixed_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fixed版本 ID，用于定位对应的 CodeArts 资源。 |
| `owner_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
| `own` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `own` ↔ 原始 CodeArts 测试计划 API 同名字段 `own`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pi_filter` | 否 | `object` |  | 字段对应：<br>MCP 字段 `pi_filter` ↔ 原始 CodeArts 测试计划 API 同名字段 `pi_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "fixed_version_id": {
      "type": "string",
      "minLength": 1
    },
    "owner_id": {
      "type": "string",
      "minLength": 1
    },
    "own": {
      "type": "boolean"
    },
    "pi_filter": {
      "type": "object",
      "properties": {
        "all_pi": {
          "type": "boolean"
        },
        "pi_sprints": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "pi_id": {
                "type": "string"
              },
              "sprints": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_suite_info_page_url

所属模块：`测试计划`

说明：获取测试计划的suite信息pageurl。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_suite_info_page_url",
    "arguments": {
      "testServiceId": "<testServiceId>",
      "suiteId": "<suiteId>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `testServiceId` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testServiceId` ↔ 原始 CodeArts 测试计划 API 同名字段 `testServiceId`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `suiteId` | 是 | `string` |  | 字段对应：<br>MCP 字段 `suiteId` ↔ 原始 CodeArts 测试计划 API 同名字段 `suiteId`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "testServiceId": {
      "type": "string",
      "minLength": 1
    },
    "suiteId": {
      "$ref": "#/properties/testServiceId"
    }
  },
  "required": [
    "testServiceId",
    "suiteId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_task

所属模块：`测试计划`

说明：获取测试计划的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_task",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_task_execution_param

所属模块：`测试计划`

说明：获取测试计划的任务执行参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_task_execution_param",
    "arguments": {
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/task_uri"
    }
  },
  "required": [
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_task_result_detail

所属模块：`测试计划`

说明：获取测试计划的任务result详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_task_result_detail",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>",
      "result_uri": "<result_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `result_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `result_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `result_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `result` | 否 | `string` |  | 字段对应：<br>MCP 字段 `result` ↔ 原始 CodeArts 测试计划 API 同名字段 `result`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "result_uri": {
      "$ref": "#/properties/project_id"
    },
    "result": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "task_uri",
    "result_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_task_success_testcases_count

所属模块：`测试计划`

说明：获取测试计划的任务successtestcases数量。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_task_success_testcases_count",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "task_uri": {
      "$ref": "#/properties/project_uuid"
    }
  },
  "required": [
    "project_uuid",
    "version_uri",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_test_design_template

所属模块：`测试计划`

说明：获取测试计划的测试design模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_test_design_template",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_test_design_testcase

所属模块：`测试计划`

说明：获取测试计划的测试designtestcase。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_test_design_testcase",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 测试计划 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### testplan_get_test_report

所属模块：`测试计划`

说明：获取测试计划的测试report。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_test_report",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "report_uri": "<report_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `report_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `report_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `report_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "report_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "report_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_change_statistics

所属模块：`测试计划`

说明：获取测试计划的testcasechange统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_change_statistics",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_field

所属模块：`测试计划`

说明：获取测试计划的testcase字段。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_field",
    "arguments": {
      "project_id": "<project_id>",
      "uri": "<uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_script_detail_v1

所属模块：`测试计划`

说明：获取测试计划的testcase脚本详情v1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_script_detail_v1",
    "arguments": {
      "project_id": "<project_id>",
      "tmss_case_uri": "<tmss_case_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tmss_case_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tmss_case_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `tmss_case_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tmss_case_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "tmss_case_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_script_detail_v3

所属模块：`测试计划`

说明：获取测试计划的testcase脚本详情v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_script_detail_v3",
    "arguments": {
      "project_id": "<project_id>",
      "tmss_case_uri": "<tmss_case_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tmss_case_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tmss_case_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `tmss_case_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tmss_case_uri": {
      "$ref": "#/properties/project_id"
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "tmss_case_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_script_detail_v4

所属模块：`测试计划`

说明：获取测试计划的testcase脚本详情v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_script_detail_v4",
    "arguments": {
      "project_id": "<project_id>",
      "tmss_case_uri": "<tmss_case_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tmss_case_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tmss_case_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `tmss_case_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tmss_case_uri": {
      "$ref": "#/properties/project_id"
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "tmss_case_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testcase_v4

所属模块：`测试计划`

说明：获取测试计划的testcasev4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testcase_v4",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>",
      "case_uri": "<case_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `case_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `case_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `case_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "case_uri": {
      "$ref": "#/properties/project_uuid"
    }
  },
  "required": [
    "project_uuid",
    "version_uri",
    "case_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testhub_case

所属模块：`测试计划`

说明：获取测试计划的testhub用例。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testhub_case",
    "arguments": {
      "project_id": "<project_id>",
      "case_uri": "<case_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `case_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `case_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `case_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "case_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "case_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testhub_case_by_number

所属模块：`测试计划`

说明：获取测试计划的testhub用例bynumber。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testhub_case_by_number",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_number": "<testcase_number>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_number` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_number` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "testcase_number": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_number"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testhub_progress

所属模块：`测试计划`

说明：获取测试计划的testhubprogress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testhub_progress",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "operation_uri": "<operation_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `operation_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `operation_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `operation_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "operation_uri": {
      "$ref": "#/properties/project_uuid"
    }
  },
  "required": [
    "project_uuid",
    "operation_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_testhub_task

所属模块：`测试计划`

说明：获取测试计划的testhub任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_testhub_task",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_user_disclaimer

所属模块：`测试计划`

说明：获取测试计划的用户disclaimer。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_user_disclaimer",
    "arguments": {
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_user_info_domain

所属模块：`测试计划`

说明：获取测试计划的用户信息领域。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_user_info_domain",
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

### testplan_get_user_package_permission

所属模块：`测试计划`

说明：获取测试计划的用户packagepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_user_package_permission",
    "arguments": {
      "project_id": "<project_id>",
      "user_id": "<user_id>",
      "package_type": "<package_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `package_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `package_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `package_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "package_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "user_id",
    "package_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_variable_synchronization

所属模块：`测试计划`

说明：获取测试计划的变量synchronization。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_variable_synchronization",
    "arguments": {
      "project_id": "<project_id>",
      "variable_name": "<variable_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `variable_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `variable_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `variable_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量名称。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "variable_name": {
      "type": "string",
      "minLength": 1
    },
    "group_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "variable_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_variable_synchronization_v2

所属模块：`测试计划`

说明：获取测试计划的变量synchronizationv2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_variable_synchronization_v2",
    "arguments": {
      "project_id": "<project_id>",
      "variable_name": "<variable_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `variable_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `variable_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `variable_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量名称。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "variable_name": {
      "type": "string",
      "minLength": 1
    },
    "group_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "variable_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_init_task_execution

所属模块：`测试计划`

说明：执行测试计划的任务执行。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_init_task_execution",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `release_dev` | 否 | `string` |  | 字段对应：<br>MCP 字段 `release_dev` ↔ 原始 CodeArts 测试计划 API 同名字段 `release_dev`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_query` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_query` ↔ 原始 CodeArts 测试计划 API 同名字段 `is_query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "release_dev": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "is_query": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_alert_templates

所属模块：`测试计划`

说明：查询测试计划的alert模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_alert_templates",
    "arguments": {
      "service_id": "<service_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

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
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "service_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_test_aw_name_views

所属模块：`测试计划`

说明：查询测试计划的api测试awnameviews。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_aw_name_views",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_api_test_basic_aw_infos

所属模块：`测试计划`

说明：查询测试计划的api测试basicawinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_basic_aw_infos",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `aw_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |

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
    "aw_name": {
      "type": "string"
    },
    "parent_id": {
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

### testplan_list_api_test_basic_aw_infos_v2

所属模块：`测试计划`

说明：查询测试计划的api测试basicawinfosv2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_basic_aw_infos_v2",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `aw_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |

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
    "aw_name": {
      "type": "string"
    },
    "parent_id": {
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

### testplan_list_api_test_basic_aw_param_properties

所属模块：`测试计划`

说明：查询测试计划的api测试basicaw参数properties。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_basic_aw_param_properties",
    "arguments": {
      "project_id": "<project_id>",
      "aw_id": "<aw_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `aw_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "aw_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "aw_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_test_basic_aws_batch

所属模块：`测试计划`

说明：查询测试计划的api测试basicawsbatch。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_basic_aws_batch",
    "arguments": {
      "project_id": "<project_id>",
      "aw_ids": "<aw_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `aw_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `aw_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw ID 列表，用于批量定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "aw_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id",
    "aw_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_test_child_basic_aws

所属模块：`测试计划`

说明：查询测试计划的api测试子级basicaws。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_child_basic_aws",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `aw_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `aw_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `aw_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>aw名称。 |
| `source_type` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `source_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `source_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>导入来源类型，例如 gitee、github、gitlab、git、svn 等。 |

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
      "type": "string",
      "minLength": 1
    },
    "aw_name": {
      "type": "string"
    },
    "source_type": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
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

### testplan_list_api_test_global_param_names

所属模块：`测试计划`

说明：查询测试计划的api测试global参数names。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_global_param_names",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_api_test_package_status

所属模块：`测试计划`

说明：查询测试计划的api测试package状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_package_status",
    "arguments": {
      "service_id": "<service_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "service_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "service_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_test_package_usage

所属模块：`测试计划`

说明：查询测试计划的api测试packageusage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_package_usage",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_api_test_variables

所属模块：`测试计划`

说明：查询测试计划的api测试变量。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_test_variables",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
    "group_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_testcase_execute_histories

所属模块：`测试计划`

说明：查询测试计划的apitestcaseexecutehistories。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_testcase_execute_histories",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_id": "<testcase_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>testcase ID，用于定位对应的 CodeArts 资源。 |
| `plan_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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
    "testcase_id": {
      "$ref": "#/properties/project_id"
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_testcase_history

所属模块：`测试计划`

说明：查询测试计划的apitestcase历史。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_testcase_history",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_api_testsuite_history

所属模块：`测试计划`

说明：查询测试计划的apitestsuite历史。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_api_testsuite_history",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_asset_tree

所属模块：`测试计划`

说明：查询测试计划的asset树。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_asset_tree",
    "arguments": {
      "project_id": "<project_id>",
      "asset_id": "<asset_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `asset_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `asset_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `asset_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>asset ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "asset_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "asset_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_assets

所属模块：`测试计划`

说明：查询测试计划的assets。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_assets",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_attachments

所属模块：`测试计划`

说明：查询测试计划的附件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_attachments",
    "arguments": {
      "project_id": "<project_id>",
      "resource_uri": "<resource_uri>",
      "resource_type": "<resource_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `resource_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `resource_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `resource_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `resource_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_uri": {
      "$ref": "#/properties/project_id"
    },
    "resource_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "resource_uri",
    "resource_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_branch_testcase_duplicate_numbers

所属模块：`测试计划`

说明：查询测试计划的分支testcaseduplicatenumbers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_branch_testcase_duplicate_numbers",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `numbers` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `numbers` ↔ 原始 CodeArts 测试计划 API 同名字段 `numbers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `uri_to_number_list` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `uri_to_number_list` ↔ 原始 CodeArts 测试计划 API 同名字段 `uri_to_number_list`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "numbers": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "uri_to_number_list": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uri": {
            "type": "string",
            "minLength": 1
          },
          "number": {
            "type": "string",
            "minLength": 1
          }
        },
        "additionalProperties": false
      }
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_case_templates

所属模块：`测试计划`

说明：查询测试计划的用例模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_case_templates",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 测试计划 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_recommended` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_recommended` ↔ 原始 CodeArts 测试计划 API 同名字段 `is_recommended`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `industry_type` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `industry_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `industry_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string"
    },
    "is_default": {
      "type": "boolean"
    },
    "is_recommended": {
      "type": "boolean"
    },
    "industry_type": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
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

### testplan_list_cases

所属模块：`测试计划`

说明：查询测试计划的用例。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |
| `owner_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 测试计划 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `priority` | 否 | `string` |  | 字段对应：<br>MCP 字段 `priority` ↔ 原始 CodeArts 测试计划 API 同名字段 `priority`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>优先级。需求管理场景通常表示工作项优先级；具体名称和取值以项目字段配置为准。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `label_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `label_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `label_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID，用于定位对应的 CodeArts 资源。 |
| `test_case_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `test_case_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `test_case_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>测试用例类型，用于区分手工用例、自动化用例等。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 测试计划 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "owner_id": {
      "$ref": "#/properties/project_id"
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "priority": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "label_id": {
      "type": "string",
      "minLength": 1
    },
    "test_case_type": {
      "type": "string",
      "minLength": 1
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
              "type": "string"
            }
          }
        ]
      }
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

### testplan_list_current_user_testcases

所属模块：`测试计划`

说明：查询测试计划的当前用户testcases。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_current_user_testcases",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string",
      "minLength": 1
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
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_custom_reports

所属模块：`测试计划`

说明：查询测试计划的自定义reports。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_custom_reports",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_custom_template_reports

所属模块：`测试计划`

说明：查询测试计划的自定义模板reports。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_custom_template_reports",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_dashboard_statistic_blocks

所属模块：`测试计划`

说明：查询测试计划的dashboard统计blocks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_dashboard_statistic_blocks",
    "arguments": {
      "service_id": "<service_id>",
      "start_time": "<start_time>",
      "end_time": "<end_time>",
      "label": "<label>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `start_time` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 测试计划 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 测试计划 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `executor_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `executor_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `executor_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `label` | 是 | `string` |  | 字段对应：<br>MCP 字段 `label` ↔ 原始 CodeArts 测试计划 API 同名字段 `label`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `location_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `location_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `location_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>location ID，用于定位对应的 CodeArts 资源。 |

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
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "start_time": {
      "type": "integer"
    },
    "end_time": {
      "type": "integer"
    },
    "executor_type": {
      "type": "string",
      "minLength": 1
    },
    "label": {
      "type": "string",
      "minLength": 1
    },
    "location_id": {
      "$ref": "#/properties/service_id"
    }
  },
  "required": [
    "service_id",
    "start_time",
    "end_time",
    "label"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_dashboards

所属模块：`测试计划`

说明：查询测试计划的dashboards。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_dashboards",
    "arguments": {
      "service_id": "<service_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `service_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `service_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>service ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

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
    "service_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "service_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_defect_iterators

所属模块：`测试计划`

说明：查询测试计划的defectiterators。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_defect_iterators",
    "arguments": {
      "project_id": "<project_id>",
      "defect_id": "<defect_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `defect_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `defect_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `defect_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>defect ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "defect_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "defect_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_domain_usage_infos

所属模块：`测试计划`

说明：查询测试计划的领域usageinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_domain_usage_infos",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_environments

所属模块：`测试计划`

说明：查询测试计划的环境。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_environments",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_feature_case_counts

所属模块：`测试计划`

说明：查询测试计划的特性用例counts。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_feature_case_counts",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `contain_root` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `contain_root` ↔ 原始 CodeArts 测试计划 API 同名字段 `contain_root`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `contain_child` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `contain_child` ↔ 原始 CodeArts 测试计划 API 同名字段 `contain_child`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `filter_child` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `filter_child` ↔ 原始 CodeArts 测试计划 API 同名字段 `filter_child`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `not_in_other_it` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `not_in_other_it` ↔ 原始 CodeArts 测试计划 API 同名字段 `not_in_other_it`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `condition_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `condition_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `condition_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `condition_value` | 否 | `string` |  | 字段对应：<br>MCP 字段 `condition_value` ↔ 原始 CodeArts 测试计划 API 同名字段 `condition_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `test_case_conditions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `test_case_conditions` ↔ 原始 CodeArts 测试计划 API 同名字段 `test_case_conditions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `feature_uris` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `feature_uris` ↔ 原始 CodeArts 测试计划 API 同名字段 `feature_uris`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `upward_recursion` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `upward_recursion` ↔ 原始 CodeArts 测试计划 API 同名字段 `upward_recursion`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "contain_root": {
      "type": "boolean"
    },
    "contain_child": {
      "type": "boolean"
    },
    "task_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "filter_child": {
      "type": "boolean"
    },
    "not_in_other_it": {
      "type": "boolean"
    },
    "condition_type": {
      "type": "string",
      "minLength": 1
    },
    "condition_value": {
      "type": "string"
    },
    "test_case_conditions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field_name": {
            "type": "string",
            "minLength": 1
          },
          "field_value": {
            "type": "string"
          },
          "operator": {
            "type": "string",
            "minLength": 1
          },
          "sour_value": {
            "type": "string"
          },
          "tar_value": {
            "type": "string"
          },
          "field_type": {
            "type": "string",
            "minLength": 1
          }
        },
        "additionalProperties": false
      }
    },
    "feature_uris": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_uuid"
      }
    },
    "upward_recursion": {
      "type": "boolean"
    }
  },
  "required": [
    "project_uuid",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_feature_children

所属模块：`测试计划`

说明：查询测试计划的特性children。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_feature_children",
    "arguments": {
      "feature_uri": "<feature_uri>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `feature_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `feature_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `owner` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `activity` | 否 | `string` |  | 字段对应：<br>MCP 字段 `activity` ↔ 原始 CodeArts 测试计划 API 同名字段 `activity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `service_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `contain_total` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `contain_total` ↔ 原始 CodeArts 测试计划 API 同名字段 `contain_total`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "feature_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/feature_uri"
    },
    "owner": {
      "type": "string",
      "minLength": 1
    },
    "stage": {
      "type": "string",
      "minLength": 1
    },
    "activity": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/feature_uri"
    },
    "task_uri": {
      "$ref": "#/properties/feature_uri"
    },
    "service_type": {
      "type": "string",
      "minLength": 1
    },
    "contain_total": {
      "type": "boolean"
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "feature_uri",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_feature_descendant_uris

所属模块：`测试计划`

说明：查询测试计划的特性descendanturis。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_feature_descendant_uris",
    "arguments": {
      "project_id": "<project_id>",
      "feature_uri": "<feature_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `feature_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `feature_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "feature_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "feature_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_branches

所属模块：`测试计划`

说明：查询测试计划的gt3k分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_branches",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_current_user_testcases

所属模块：`测试计划`

说明：查询测试计划的gt3k当前用户testcases。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_current_user_testcases",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string",
      "minLength": 1
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
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_defect_iterators

所属模块：`测试计划`

说明：查询测试计划的gt3kdefectiterators。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_defect_iterators",
    "arguments": {
      "project_id": "<project_id>",
      "defect_id": "<defect_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `defect_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `defect_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `defect_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>defect ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "defect_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "defect_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_domain_usage_infos

所属模块：`测试计划`

说明：查询测试计划的gt3k领域usageinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_domain_usage_infos",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_feature_children

所属模块：`测试计划`

说明：查询测试计划的gt3k特性children。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_feature_children",
    "arguments": {
      "feature_uri": "<feature_uri>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `feature_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `feature_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `feature_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `owner` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `activity` | 否 | `string` |  | 字段对应：<br>MCP 字段 `activity` ↔ 原始 CodeArts 测试计划 API 同名字段 `activity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `task_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `service_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `contain_total` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `contain_total` ↔ 原始 CodeArts 测试计划 API 同名字段 `contain_total`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "feature_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/feature_uri"
    },
    "owner": {
      "type": "string",
      "minLength": 1
    },
    "stage": {
      "type": "string",
      "minLength": 1
    },
    "activity": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/feature_uri"
    },
    "task_uri": {
      "$ref": "#/properties/feature_uri"
    },
    "service_type": {
      "type": "string",
      "minLength": 1
    },
    "contain_total": {
      "type": "boolean"
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "feature_uri",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_iterator_infos

所属模块：`测试计划`

说明：查询测试计划的gt3kiteratorinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_iterator_infos",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_gt3k_project_service_repos

所属模块：`测试计划`

说明：查询测试计划的gt3k项目servicerepos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_project_service_repos",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |

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
    "project_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_gt3k_testcase_fields

所属模块：`测试计划`

说明：查询测试计划的gt3ktestcase字段。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_testcase_fields",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_gt3k_visible_services

所属模块：`测试计划`

说明：查询测试计划的gt3kvisibleservices。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_gt3k_visible_services",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_issue_case_counts

所属模块：`测试计划`

说明：查询测试计划的工作项用例counts。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_issue_case_counts",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "issue_ids": "<issue_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `issue_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `issue_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `issue_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `service_type` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `service_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `service_types` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `service_types` ↔ 原始 CodeArts 测试计划 API 同名字段 `service_types`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `task_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "service_type": {
      "type": "integer"
    },
    "service_types": {
      "type": "array",
      "items": {
        "type": "integer"
      }
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "task_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "issue_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_issue_testcases

所属模块：`测试计划`

说明：查询测试计划的工作项testcases。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_issue_testcases",
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `issue_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `issue_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `issue_id`，表示工作项/议题 ID。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `relate_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `relate_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `relate_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `key_word` | 否 | `string` |  | 字段对应：<br>MCP 字段 `key_word` ↔ 原始 CodeArts 测试计划 API 同名字段 `key_word`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `rank_ids` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `rank_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `rank_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>rank ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `result_codes` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `result_codes` ↔ 原始 CodeArts 测试计划 API 同名字段 `result_codes`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "relate_type": {
      "type": "string",
      "minLength": 1
    },
    "key_word": {
      "type": "string"
    },
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    },
    "rank_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "result_codes": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
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

### testplan_list_issues

所属模块：`测试计划`

说明：查询测试计划的工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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

### testplan_list_iterator_histories

所属模块：`测试计划`

说明：查询测试计划的iteratorhistories。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_iterator_histories",
    "arguments": {
      "project_id": "<project_id>",
      "iterator_uri": "<iterator_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iterator_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "iterator_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "iterator_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_iterator_infos

所属模块：`测试计划`

说明：查询测试计划的iteratorinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_iterator_infos",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_iterator_issue_cases

所属模块：`测试计划`

说明：查询测试计划的iterator工作项用例。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_iterator_issue_cases",
    "arguments": {
      "project_id": "<project_id>",
      "iterator_uri": "<iterator_uri>",
      "workitem_list": "<workitem_list>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iterator_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `workitem_list` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `workitem_list` ↔ 原始 CodeArts 测试计划 API 同名字段 `workitem_list`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iterator_uri": {
      "$ref": "#/properties/project_id"
    },
    "workitem_list": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id",
    "iterator_uri",
    "workitem_list"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_iterator_issue_ids

所属模块：`测试计划`

说明：查询测试计划的iterator工作项ids。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_iterator_issue_ids",
    "arguments": {
      "project_id": "<project_id>",
      "iterator_uri": "<iterator_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iterator_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iterator_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "iterator_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_iterator_issues

所属模块：`测试计划`

说明：查询测试计划的iterator工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_iterator_issues",
    "arguments": {
      "project_id": "<project_id>",
      "iterator_uri": "<iterator_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `iterator_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "iterator_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "iterator_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_notice_configs

所属模块：`测试计划`

说明：查询测试计划的notice配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_notice_configs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_plan_journals

所属模块：`测试计划`

说明：查询测试计划的计划journals。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_plan_journals",
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`测试计划`

说明：查询测试计划的计划。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_plans_v2

所属模块：`测试计划`

说明：查询测试计划的计划v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_plans_v2",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `current_stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `current_stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `current_stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fix_version_ids` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fix_version_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `fix_version_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fix版本 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `branch_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `branch_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query_all_version` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `query_all_version` ↔ 原始 CodeArts 测试计划 API 同名字段 `query_all_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "current_stage": {
      "type": "string",
      "minLength": 1
    },
    "fix_version_ids": {
      "type": "string",
      "minLength": 1
    },
    "branch_uri": {
      "type": "string",
      "minLength": 1
    },
    "query_all_version": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_progress_reports

所属模块：`测试计划`

说明：查询测试计划的progressreports。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_progress_reports",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 测试计划 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

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
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid",
    "version_uri",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_project_defects

所属模块：`测试计划`

说明：查询测试计划的项目defects。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_defects",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `iteration_ids` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `iteration_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID 列表，用于批量定位对应的 CodeArts 资源。 |

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
      "type": "string",
      "minLength": 1
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
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "iteration_ids": {
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

### testplan_list_project_field_configs

所属模块：`测试计划`

说明：查询测试计划的项目字段配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_field_configs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_project_issues

所属模块：`测试计划`

说明：查询测试计划的项目工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_issues",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `iteration_ids` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iteration_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `iteration_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>迭代 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `status_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `status_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `show_page_flag` | 否 | `string` |  | 字段对应：<br>MCP 字段 `show_page_flag` ↔ 原始 CodeArts 测试计划 API 同名字段 `show_page_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string",
      "minLength": 1
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
    "tracker_id": {
      "$ref": "#/properties/project_id"
    },
    "iteration_ids": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "show_page_flag": {
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

### testplan_list_project_service_repos

所属模块：`测试计划`

说明：查询测试计划的项目servicerepos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_service_repos",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_project_tags

所属模块：`测试计划`

说明：查询测试计划的项目标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_tags",
    "arguments": {
      "project_id": "<project_id>",
      "resource_type": "<resource_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `resource_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `resource_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "resource_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_project_users

所属模块：`测试计划`

说明：查询测试计划的项目用户。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_project_users",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
      "type": "string",
      "minLength": 1
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

### testplan_list_public_aw_lib_and_aws

所属模块：`测试计划`

说明：查询测试计划的公共awlibandaws。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_public_aw_lib_and_aws",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_registered_services

所属模块：`测试计划`

说明：查询测试计划的registeredservices。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_registered_services",
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

### testplan_list_release_versions

所属模块：`测试计划`

说明：查询测试计划的发布版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_release_versions",
    "arguments": {
      "project_id": "<project_id>",
      "resource_type": "<resource_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `resource_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `resource_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 测试计划 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_type": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "resource_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_requirements_overview

所属模块：`测试计划`

说明：查询测试计划的requirementsoverview。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_requirements_overview",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fixed_version_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fixed_version_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `fixed_version_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fixed版本 ID，用于定位对应的 CodeArts 资源。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `key_word` | 否 | `string` |  | 字段对应：<br>MCP 字段 `key_word` ↔ 原始 CodeArts 测试计划 API 同名字段 `key_word`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `pi_filter` | 否 | `object` |  | 字段对应：<br>MCP 字段 `pi_filter` ↔ 原始 CodeArts 测试计划 API 同名字段 `pi_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "fixed_version_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "key_word": {
      "type": "string"
    },
    "pi_filter": {
      "type": "object",
      "properties": {
        "all_pi": {
          "type": "boolean"
        },
        "pi_sprints": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "pi_id": {
                "type": "string"
              },
              "sprints": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_requirements_overview_defects

所属模块：`测试计划`

说明：查询测试计划的requirementsoverviewdefects。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_requirements_overview_defects",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 测试计划 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_item_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `work_item_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项名称。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "work_item_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_name": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_requirements_overview_testcases

所属模块：`测试计划`

说明：查询测试计划的requirementsoverviewtestcases。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_requirements_overview_testcases",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "work_item_id": "<work_item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `work_item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `work_item_id` ↔ 原始 CodeArts 测试计划 API 中的工作项 ID 字段，常见原字段名为 `issue_id` 或路径参数中的 issue 标识。<br>工作项 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `work_item_name` ↔ 原始 CodeArts 测试计划 API 同名字段 `work_item_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项名称。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "work_item_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_name": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_resource_number_rules

所属模块：`测试计划`

说明：查询测试计划的资源numberrules。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_resource_number_rules",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_resource_pools

所属模块：`测试计划`

说明：查询测试计划的资源pools。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_resource_pools",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_rule_check_tasks

所属模块：`测试计划`

说明：查询测试计划的规则检查任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_rule_check_tasks",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_runs

所属模块：`测试计划`

说明：查询测试计划的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `plan_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plan_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `plan_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>计划 ID，用于定位对应的 CodeArts 资源。 |

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

### testplan_list_service_offerings

所属模块：`测试计划`

说明：查询测试计划的serviceofferings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_service_offerings",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `serviceNames` | 否 | `string` |  | 字段对应：<br>MCP 字段 `serviceNames` ↔ 原始 CodeArts 测试计划 API 同名字段 `serviceNames`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "serviceNames": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_solution_templates

所属模块：`测试计划`

说明：查询测试计划的solution模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_solution_templates",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `is_recommended` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_recommended` ↔ 原始 CodeArts 测试计划 API 同名字段 `is_recommended`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `industry_type` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `industry_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `industry_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string"
    },
    "is_recommended": {
      "type": "boolean"
    },
    "industry_type": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
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

### testplan_list_task_cases

所属模块：`测试计划`

说明：查询测试计划的任务用例。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_task_cases",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `status` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 测试计划 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "task_id": {
      "$ref": "#/properties/project_id"
    },
    "status": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
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

### testplan_list_task_cases_v4

所属模块：`测试计划`

说明：查询测试计划的任务用例v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_task_cases_v4",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `results` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `results` ↔ 原始 CodeArts 测试计划 API 同名字段 `results`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `status` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 测试计划 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `owners` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `owners` ↔ 原始 CodeArts 测试计划 API 同名字段 `owners`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `rank_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `rank_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `rank_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>rank ID 列表，用于批量定位对应的 CodeArts 资源。 |

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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "results": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "status": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "owners": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "rank_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_task_defects

所属模块：`测试计划`

说明：查询测试计划的任务defects。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_task_defects",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_task_results

所属模块：`测试计划`

说明：查询测试计划的任务results。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_task_results",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `iterator_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `iterator_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `iterator_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "iterator_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_tasks

所属模块：`测试计划`

说明：查询测试计划的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_tasks",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `status_codes` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `status_codes` ↔ 原始 CodeArts 测试计划 API 同名字段 `status_codes`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `executor_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `executor_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `executor_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>executor ID 列表，用于批量定位对应的 CodeArts 资源。 |

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
      "type": "string",
      "minLength": 1
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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "status_codes": {
      "type": "array",
      "items": {
        "type": "integer"
      }
    },
    "executor_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    }
  },
  "required": [
    "project_id",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_report_custom_infos

所属模块：`测试计划`

说明：查询测试计划的测试report自定义infos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_report_custom_infos",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "report_uri": "<report_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `report_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `report_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `report_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "report_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "report_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_report_defects

所属模块：`测试计划`

说明：查询测试计划的测试reportdefects。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_report_defects",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "report_uri": "<report_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `report_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `report_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `report_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `resolved` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `resolved` ↔ 原始 CodeArts 测试计划 API 同名字段 `resolved`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 测试计划 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "report_uri": {
      "$ref": "#/properties/project_id"
    },
    "resolved": {
      "type": "boolean"
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
              "type": "string"
            }
          }
        ]
      }
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "report_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_report_issues

所属模块：`测试计划`

说明：查询测试计划的测试report工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_report_issues",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "report_uri": "<report_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `report_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `report_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `report_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `completed` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `completed` ↔ 原始 CodeArts 测试计划 API 同名字段 `completed`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 测试计划 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "report_uri": {
      "$ref": "#/properties/project_id"
    },
    "completed": {
      "type": "boolean"
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
              "type": "string"
            }
          }
        ]
      }
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "report_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_report_quality_attributes

所属模块：`测试计划`

说明：查询测试计划的测试reportqualityattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_report_quality_attributes",
    "arguments": {
      "project_id": "<project_id>",
      "version_uri": "<version_uri>",
      "report_uri": "<report_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `report_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `report_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `report_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "report_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_uri",
    "report_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_reports

所属模块：`测试计划`

说明：查询测试计划的测试reports。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_reports",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `own` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `own` ↔ 原始 CodeArts 测试计划 API 同名字段 `own`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "type": "string",
      "minLength": 1
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
    "own": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_test_types

所属模块：`测试计划`

说明：查询测试计划的测试types。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_test_types",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_testcase_comments

所属模块：`测试计划`

说明：查询测试计划的testcase评论。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testcase_comments",
    "arguments": {
      "project_id": "<project_id>",
      "testcase_id": "<testcase_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `testcase_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>testcase ID，用于定位对应的 CodeArts 资源。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "testcase_id": {
      "$ref": "#/properties/project_id"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "testcase_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_testcase_fields

所属模块：`测试计划`

说明：查询测试计划的testcase字段。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testcase_fields",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_testcase_relations

所属模块：`测试计划`

说明：查询测试计划的testcaserelations。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testcase_relations",
    "arguments": {
      "project_id": "<project_id>",
      "test_case_uris": "<test_case_uris>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `test_case_uris` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `test_case_uris` ↔ 原始 CodeArts 测试计划 API 同名字段 `test_case_uris`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tracker_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tracker_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `tracker_id`，表示工作项类型 ID。<br>Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `relate_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `relate_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `relate_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `owner` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 测试计划 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `severity` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 测试计划 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。 |
| `status` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 测试计划 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `findReleaseDev` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `findReleaseDev` ↔ 原始 CodeArts 测试计划 API 同名字段 `findReleaseDev`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `keyWord` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyWord` ↔ 原始 CodeArts 测试计划 API 同名字段 `keyWord`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ownerContainEmpty` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `ownerContainEmpty` ↔ 原始 CodeArts 测试计划 API 同名字段 `ownerContainEmpty`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `severityContainEmpty` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `severityContainEmpty` ↔ 原始 CodeArts 测试计划 API 同名字段 `severityContainEmpty`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `statusContainEmpty` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `statusContainEmpty` ↔ 原始 CodeArts 测试计划 API 同名字段 `statusContainEmpty`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "test_case_uris": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "$ref": "#/properties/project_id"
    },
    "relate_type": {
      "type": "string",
      "minLength": 1
    },
    "owner": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "severity": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "status": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "findReleaseDev": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "keyWord": {
      "type": "string"
    },
    "ownerContainEmpty": {
      "type": "boolean"
    },
    "severityContainEmpty": {
      "type": "boolean"
    },
    "statusContainEmpty": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id",
    "test_case_uris"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_testcase_reviews

所属模块：`测试计划`

说明：查询测试计划的testcasereviews。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testcase_reviews",
    "arguments": {
      "testcase_uri": "<testcase_uri>",
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `testcase_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "testcase_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/testcase_uri"
    },
    "version_uri": {
      "$ref": "#/properties/testcase_uri"
    }
  },
  "required": [
    "testcase_uri",
    "project_uuid",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_testexecutor_resource_pools

所属模块：`测试计划`

说明：查询测试计划的testexecutor资源pools。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testexecutor_resource_pools",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_testhub_branches

所属模块：`测试计划`

说明：查询测试计划的testhub分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testhub_branches",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
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

### testplan_list_testhub_iterators

所属模块：`测试计划`

说明：查询测试计划的testhubiterators。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testhub_iterators",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `current_stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `current_stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `current_stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `branch_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "name": {
      "type": "string",
      "minLength": 1
    },
    "current_stage": {
      "type": "string",
      "minLength": 1
    },
    "branch_uri": {
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

### testplan_list_testhub_iterators_v5

所属模块：`测试计划`

说明：查询测试计划的testhubiteratorsv5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testhub_iterators_v5",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `current_stage` | 否 | `string` |  | 字段对应：<br>MCP 字段 `current_stage` ↔ 原始 CodeArts 测试计划 API 同名字段 `current_stage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `branch_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fix_version_ids` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fix_version_ids` ↔ 原始 CodeArts 测试计划 API 同名字段 `fix_version_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fix版本 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `query_all_version` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `query_all_version` ↔ 原始 CodeArts 测试计划 API 同名字段 `query_all_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "name": {
      "type": "string",
      "minLength": 1
    },
    "current_stage": {
      "type": "string",
      "minLength": 1
    },
    "branch_uri": {
      "$ref": "#/properties/project_id"
    },
    "fix_version_ids": {
      "type": "string",
      "minLength": 1
    },
    "query_all_version": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_testhub_services

所属模块：`测试计划`

说明：查询测试计划的testhubservices。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_testhub_services",
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

### testplan_list_timeout_settings

所属模块：`测试计划`

说明：查询测试计划的timeoutsettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_timeout_settings",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_v1_branches

所属模块：`测试计划`

说明：查询测试计划的v1分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_v1_branches",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
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

### testplan_list_v4_branches

所属模块：`测试计划`

说明：查询测试计划的v4分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_v4_branches",
    "arguments": {
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "sort_field": {
      "type": "string",
      "minLength": 1
    },
    "sort_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_v4_project_field_configs

所属模块：`测试计划`

说明：查询测试计划的v4项目字段配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_v4_project_field_configs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_v4_testcase_reviews

所属模块：`测试计划`

说明：查询测试计划的v4testcasereviews。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_v4_testcase_reviews",
    "arguments": {
      "testcase_uri": "<testcase_uri>",
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `testcase_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `testcase_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `testcase_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "testcase_uri": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/testcase_uri"
    },
    "version_uri": {
      "$ref": "#/properties/testcase_uri"
    }
  },
  "required": [
    "testcase_uri",
    "project_uuid",
    "version_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_variable_groups

所属模块：`测试计划`

说明：查询测试计划的变量组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_variable_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_list_variables_by_group

所属模块：`测试计划`

说明：查询测试计划的变量by组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_variables_by_group",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
    "group_id": {
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

### testplan_list_variables_v3

所属模块：`测试计划`

说明：查询测试计划的变量v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_variables_v3",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
    "group_id": {
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

### testplan_list_visible_services

所属模块：`测试计划`

说明：查询测试计划的visibleservices。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_visible_services",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### testplan_request_official_api

所属模块：`测试计划`

说明：执行测试计划的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 测试计划 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 测试计划 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 测试计划 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 测试计划 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### testplan_run_cases

所属模块：`测试计划`

说明：运行测试计划的用例。

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
      "execute_list": "<execute_list>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `execute_list` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `execute_list` ↔ 原始 CodeArts 测试计划 API 同名字段 `execute_list`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行列表，用于指定要运行的用例、任务、步骤或节点集合。 |
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
    "execute_list": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "case_id": {
            "$ref": "#/properties/project_id"
          },
          "testcase_id": {
            "$ref": "#/properties/project_id"
          },
          "executor_id": {
            "$ref": "#/properties/project_id"
          },
          "execute_id": {
            "$ref": "#/properties/project_id"
          },
          "result_id": {
            "type": "string",
            "minLength": 1
          },
          "start_time": {
            "type": "string",
            "minLength": 1
          },
          "end_time": {
            "type": "string",
            "minLength": 1
          },
          "duration": {
            "type": "integer",
            "minimum": 0
          },
          "description": {
            "type": "string",
            "minLength": 1
          },
          "remark": {
            "type": "string",
            "minLength": 1
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
    "execute_list"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_search_api_test_basic_aw_infos

所属模块：`测试计划`

说明：搜索测试计划的api测试basicawinfos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_search_api_test_basic_aw_infos",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `search_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search_type` ↔ 原始 CodeArts 测试计划 API 同名字段 `search_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `search_value` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search_value` ↔ 原始 CodeArts 测试计划 API 同名字段 `search_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "parent_id": {
      "type": "string",
      "minLength": 1
    },
    "search_type": {
      "type": "string",
      "minLength": 1
    },
    "search_value": {
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

### testplan_search_features

所属模块：`测试计划`

说明：搜索测试计划的特性。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_search_features",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "version_uri": "<version_uri>",
      "key_word": "<key_word>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 测试计划 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 测试计划 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 测试计划 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 测试计划 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 测试计划 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `version_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `key_word` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key_word` ↔ 原始 CodeArts 测试计划 API 同名字段 `key_word`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `parent_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `parent_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "version_uri": {
      "$ref": "#/properties/project_uuid"
    },
    "key_word": {
      "type": "string",
      "minLength": 1
    },
    "parent_uri": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_uuid",
    "version_uri",
    "key_word"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_stop_task_execution

所属模块：`测试计划`

说明：停止测试计划的任务执行。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_stop_task_execution",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>",
      "result_uri": "<result_uri>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `result_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `result_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `result_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "result_uri": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_uri",
    "result_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_update_task

所属模块：`测试计划`

说明：更新测试计划的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_update_task",
    "arguments": {
      "project_id": "<project_id>",
      "task_uri": "<task_uri>",
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 测试计划 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_uri` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `task_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 测试计划 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 测试计划 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `version_uri` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_uri` ↔ 原始 CodeArts 测试计划 API 同名字段 `version_uri`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "task_uri": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "uri": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "version_uri": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_uri",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

