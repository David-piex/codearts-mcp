# CodeArts MCP 函数 API 参考 - 流水线

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`流水线`

API 数量：`257`

所有函数 API 使用按产品拆分的 HTTP 入口：`POST /mcp/<family>`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数；当前模块工具应走对应模块的产品入口。

## API 清单

### pipeline_accept_checkpoint

所属模块：`流水线`

说明：执行流水线的checkpoint。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_accept_checkpoint",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
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
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_accept_delay_job

所属模块：`流水线`

说明：执行流水线的delay任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_accept_delay_job",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_approve_run

所属模块：`流水线`

说明：审批通过流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_batch_delete_pipelines

所属模块：`流水线`

说明：批量处理流水线的delete流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_batch_delete_pipelines",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_ids": "<pipeline_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "pipeline_ids": {
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
    "pipeline_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_batch_get_pipeline_status

所属模块：`流水线`

说明：批量处理流水线的get流水线状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_batch_get_pipeline_status",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

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
    "body": {
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

### pipeline_batch_run_pipelines

所属模块：`流水线`

说明：批量处理流水线的运行流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_batch_run_pipelines",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_ids": "<pipeline_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 流水线 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
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
    "pipeline_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
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
    "pipeline_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_batch_show_pipelines_status

所属模块：`流水线`

说明：批量处理流水线的show流水线状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_batch_show_pipelines_status",
    "arguments": {
      "pipeline_ids": "<pipeline_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    }
  },
  "required": [
    "pipeline_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_batch_update_pipeline_permission

所属模块：`流水线`

说明：批量处理流水线的update流水线permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_batch_update_pipeline_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_ids": "<pipeline_ids>",
      "is_project_switch": "<is_project_switch>",
      "roles": "<roles>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `is_project_switch` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `is_project_switch` ↔ 原始 CodeArts 流水线 API 同名字段 `is_project_switch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `roles` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `roles` ↔ 原始 CodeArts 流水线 API 同名字段 `roles`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "is_project_switch": {
      "type": "boolean"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "operation_query": {
            "type": "boolean"
          },
          "operation_execute": {
            "type": "boolean"
          },
          "operation_update": {
            "type": "boolean"
          },
          "operation_delete": {
            "type": "boolean"
          },
          "operation_authorize": {
            "type": "boolean"
          },
          "role_id": {
            "type": "integer"
          }
        },
        "required": [
          "operation_query",
          "operation_execute",
          "operation_update",
          "operation_delete",
          "operation_authorize",
          "role_id"
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
    "pipeline_ids",
    "is_project_switch",
    "roles"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_bind_variable_groups_to_pipeline

所属模块：`流水线`

说明：绑定流水线的变量组to流水线。

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
      "pipeline_group_ids": "<pipeline_group_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `pipeline_group_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_group_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_group_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线组 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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

### pipeline_cancel_queue

所属模块：`流水线`

说明：取消流水线的queue。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_cancel_queue",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "queue_id": "<queue_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `queue_id` | 是 | `object \| integer` |  | 字段对应：<br>MCP 字段 `queue_id` ↔ 原始 CodeArts 流水线 API 同名字段 `queue_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>queue ID，用于定位对应的 CodeArts 资源。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "queue_id": {
      "anyOf": [
        {
          "$ref": "#/properties/project_id"
        },
        {
          "type": "integer"
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
    "pipeline_id",
    "run_id",
    "queue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_check_component

所属模块：`流水线`

说明：检查流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_check_component",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `component_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `component_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `component_name` ↔ 原始 CodeArts 流水线 API 同名字段 `component_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component名称。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/project_id"
    },
    "component_name": {
      "type": "string",
      "minLength": 1
    },
    "query": {
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

### pipeline_check_project

所属模块：`流水线`

说明：检查流水线的项目。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_check_project",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

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
      "minLength": 1
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

### pipeline_check_variable_group_rights

所属模块：`流水线`

说明：检查流水线的变量组rights。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_check_variable_group_rights",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### pipeline_continue_delay_job

所属模块：`流水线`

说明：执行流水线的delay任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_continue_delay_job",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_create_change_request

所属模块：`流水线`

说明：创建流水线的change请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_change_request",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>",
      "title": "<title>",
      "workitem_ids": "<workitem_ids>",
      "repos": "<repos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 流水线 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `workitem_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `workitem_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `workitem_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `repos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `repos` ↔ 原始 CodeArts 流水线 API 同名字段 `repos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "workitem_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/cloud_project_id"
      },
      "minItems": 1
    },
    "repos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "repo_id": {
            "$ref": "#/properties/cloud_project_id"
          },
          "http_url": {
            "type": "string",
            "minLength": 1
          },
          "git_url": {
            "type": "string",
            "minLength": 1
          },
          "feature_branch": {
            "type": "string",
            "minLength": 1
          },
          "main_branch": {
            "type": "string",
            "minLength": 1
          },
          "delete_branch_after_released": {
            "type": "boolean"
          }
        },
        "required": [
          "repo_id",
          "http_url",
          "git_url",
          "feature_branch",
          "main_branch"
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
    "cloud_project_id",
    "component_id",
    "title",
    "workitem_ids",
    "repos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_component

所属模块：`流水线`

说明：创建流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "name": "<name>",
      "type": "<type>",
      "repos": "<repos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `parent_id` | 否 | `object \| null` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 流水线 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `desc` | 否 | `string` |  | 字段对应：<br>MCP 字段 `desc` ↔ 原始 CodeArts 流水线 API 同名字段 `desc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `repos` ↔ 原始 CodeArts 流水线 API 同名字段 `repos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
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
    "parent_id": {
      "anyOf": [
        {
          "$ref": "#/properties/cloud_project_id"
        },
        {
          "type": "null"
        }
      ]
    },
    "desc": {
      "type": "string"
    },
    "repos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1
          },
          "repo_id": {
            "type": "string",
            "minLength": 1
          },
          "http_url": {
            "type": "string",
            "minLength": 1
          },
          "git_url": {
            "type": "string",
            "minLength": 1
          },
          "branch": {
            "type": "string",
            "minLength": 1
          },
          "language": {
            "type": "string",
            "minLength": 1
          },
          "endpoint_id": {
            "type": "string"
          }
        },
        "required": [
          "type",
          "repo_id",
          "http_url",
          "git_url",
          "branch",
          "language"
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
    "cloud_project_id",
    "name",
    "type",
    "repos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_extension_endpoint

所属模块：`流水线`

说明：创建流水线的extensionendpoint。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `region_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region_name` ↔ 原始 CodeArts 流水线 API 同名字段 `region_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>region名称。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 流水线 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 流水线 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `authorization` | 否 | `object` |  | 字段对应：<br>MCP 字段 `authorization` ↔ 原始 CodeArts 流水线 API 同名字段 `authorization`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>授权信息，用于访问受保护资源；请勿在日志或公开文档中暴露敏感值。 |
| `data` | 否 | `object` |  | 字段对应：<br>MCP 字段 `data` ↔ 原始 CodeArts 流水线 API 同名字段 `data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务数据对象，承载接口需要提交或返回的结构化内容。 |
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

所属模块：`流水线`

说明：创建流水线的组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 流水线 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
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

### pipeline_create_pipeline

所属模块：`流水线`

说明：创建流水线的流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_pipeline",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `manifest_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `manifest_version` ↔ 原始 CodeArts 流水线 API 同名字段 `manifest_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sources` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sources` ↔ 原始 CodeArts 流水线 API 同名字段 `sources`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
| `parameters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameters` ↔ 原始 CodeArts 流水线 API 同名字段 `parameters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `definition` | 否 | `object` |  | 字段对应：<br>MCP 字段 `definition` ↔ 原始 CodeArts 流水线 API 同名字段 `definition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
      "type": "string",
      "maxLength": 1024
    },
    "manifest_version": {
      "type": "string",
      "minLength": 1
    },
    "sources": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "variables": {
      "type": "array",
      "items": {
        "$ref": "#/properties/sources/items"
      }
    },
    "parameters": {
      "type": "array",
      "items": {
        "$ref": "#/properties/sources/items"
      }
    },
    "definition": {
      "$ref": "#/properties/sources/items"
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

### pipeline_create_pipeline_by_template

所属模块：`流水线`

说明：创建流水线的流水线by模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_pipeline_by_template",
    "arguments": {
      "project_id": "<project_id>",
      "template_id": "<template_id>",
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `component_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 流水线 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "template_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 1024
    },
    "component_id": {
      "$ref": "#/properties/project_id"
    },
    "group_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "template_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_plugin_draft

所属模块：`流水线`

说明：创建流水线的plugindraft。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_plugin_draft",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `unique_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `unique_id` ↔ 原始 CodeArts 流水线 API 同名字段 `unique_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>unique ID，用于定位对应的 CodeArts 资源。 |
| `icon_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `icon_url` ↔ 原始 CodeArts 流水线 API 同名字段 `icon_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>icon URL，用于指定服务地址、资源地址或回调地址。 |
| `runtime_attribution` | 否 | `"agent" \| "agentless"` |  | 字段对应：<br>MCP 字段 `runtime_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `runtime_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`agent`、`agentless`。 |
| `plugin_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `business_type` | 否 | `"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal"` |  | 字段对应：<br>MCP 字段 `business_type` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务类型，用于按服务或场景区分不同资源。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `business_type_display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `business_type_display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type_display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>businesstypedisplay名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `is_private` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `is_private` ↔ 原始 CodeArts 流水线 API 同名字段 `is_private`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `maintainers` | 否 | `string` |  | 字段对应：<br>MCP 字段 `maintainers` ↔ 原始 CodeArts 流水线 API 同名字段 `maintainers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `plugin_composition_type` | 否 | `"single" \| "multi"` |  | 字段对应：<br>MCP 字段 `plugin_composition_type` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_composition_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`single`、`multi`。 |
| `manifest_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `manifest_version` ↔ 原始 CodeArts 流水线 API 同名字段 `manifest_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `version_description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_description` ↔ 原始 CodeArts 流水线 API 同名字段 `version_description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `execution_info` | 否 | `object` |  | 字段对应：<br>MCP 字段 `execution_info` ↔ 原始 CodeArts 流水线 API 同名字段 `execution_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `output_info` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `output_info` ↔ 原始 CodeArts 流水线 API 同名字段 `output_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `input_info` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `input_info` ↔ 原始 CodeArts 流水线 API 同名字段 `input_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "unique_id": {
      "$ref": "#/properties/domain_id"
    },
    "icon_url": {
      "type": "string",
      "minLength": 1
    },
    "runtime_attribution": {
      "type": "string",
      "enum": [
        "agent",
        "agentless"
      ]
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "business_type": {
      "type": "string",
      "enum": [
        "Build",
        "Gate",
        "Deploy",
        "Test",
        "Normal"
      ]
    },
    "business_type_display_name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "minLength": 1
    },
    "is_private": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "maintainers": {
      "type": "string",
      "minLength": 1
    },
    "plugin_composition_type": {
      "type": "string",
      "enum": [
        "single",
        "multi"
      ]
    },
    "manifest_version": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "version_description": {
      "type": "string"
    },
    "execution_info": {
      "type": "object",
      "additionalProperties": {}
    },
    "output_info": {
      "type": "array",
      "items": {
        "$ref": "#/properties/execution_info"
      }
    },
    "input_info": {
      "type": "array",
      "items": {
        "$ref": "#/properties/execution_info"
      }
    },
    "body": {
      "$ref": "#/properties/execution_info"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_project_strategy

所属模块：`流水线`

说明：创建流水线的项目strategy。

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
      "rules": "<rules>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `rules` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `rules` ↔ 原始 CodeArts 流水线 API 同名字段 `rules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。 |
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

所属模块：`流水线`

说明：创建流水线的规则。

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
      "content": "<content>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `layout_content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `layout_content` ↔ 原始 CodeArts 流水线 API 同名字段 `layout_content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>布局内容配置，用于页面、看板或表单布局的结构化配置。 |
| `plugin_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_id` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `plugin_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_version` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件版本号，用于指定安装、查询或运行的插件版本。 |
| `content` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 流水线 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：创建流水线的strategy。

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
      "rules": "<rules>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `rules` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `rules` ↔ 原始 CodeArts 流水线 API 同名字段 `rules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：创建流水线的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `color` | 是 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 流水线 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
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

### pipeline_create_template

所属模块：`流水线`

说明：创建流水线的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_template",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "name": "<name>",
      "language": "<language>",
      "definition": "<definition>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `language` | 是 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 流水线 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
| `definition` | 是 | `string` |  | 字段对应：<br>MCP 字段 `definition` ↔ 原始 CodeArts 流水线 API 同名字段 `definition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_system` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_system` ↔ 原始 CodeArts 流水线 API 同名字段 `is_system`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否系统内置。true 表示系统预置资源，false 表示用户自定义资源。 |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `is_show_source` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_show_source` ↔ 原始 CodeArts 流水线 API 同名字段 `is_show_source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
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
    "language": {
      "type": "string",
      "minLength": 1
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "definition": {
      "type": "string",
      "minLength": 1
    },
    "is_system": {
      "type": "boolean"
    },
    "domain_id": {
      "$ref": "#/properties/tenant_id"
    },
    "is_show_source": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "name",
    "language",
    "definition"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_template_task_v3

所属模块：`流水线`

说明：创建流水线的模板任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_template_task_v3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `flow` | 否 | `object` |  | 字段对应：<br>MCP 字段 `flow` ↔ 原始 CodeArts 流水线 API 同名字段 `flow`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `states` | 否 | `object` |  | 字段对应：<br>MCP 字段 `states` ↔ 原始 CodeArts 流水线 API 同名字段 `states`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `workflow` | 否 | `object` |  | 字段对应：<br>MCP 字段 `workflow` ↔ 原始 CodeArts 流水线 API 同名字段 `workflow`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "flow": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      }
    },
    "states": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "workflow": {
      "$ref": "#/properties/states/additionalProperties"
    },
    "body": {
      "$ref": "#/properties/states/additionalProperties"
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

### pipeline_create_variable_group

所属模块：`流水线`

说明：创建流水线的变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
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

### pipeline_delete_component

所属模块：`流水线`

说明：删除流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_extension_endpoint

所属模块：`流水线`

说明：删除流水线的extensionendpoint。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 流水线 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### pipeline_delete_extension_info_delete_f3fb8463

所属模块：`流水线`

说明：删除流水线的extension信息deletef3fb8463。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_extension_info_delete_f3fb8463",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_group

所属模块：`流水线`

说明：删除流水线的组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 流水线 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
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

### pipeline_delete_pac_pipelines_actions_03cf040f

所属模块：`流水线`

说明：删除流水线的pac流水线actions03cf040f。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_pac_pipelines_actions_03cf040f",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_pipeline

所属模块：`流水线`

说明：删除流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_delete_pipelines_f20767fd

所属模块：`流水线`

说明：删除流水线的流水线f20767fd。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_pipelines_f20767fd",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_plugin_draft

所属模块：`流水线`

说明：删除流水线的plugindraft。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_plugin_draft",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "version": "<version>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `version` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### pipeline_delete_project_strategy

所属模块：`流水线`

说明：删除流水线的项目strategy。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_delete_publisher_delete_57b6ab3b

所属模块：`流水线`

说明：删除流水线的publisherdelete57b6ab3b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_publisher_delete_57b6ab3b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_rule

所属模块：`流水线`

说明：删除流水线的规则。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### pipeline_delete_serviceconnect_endpoints_d941afb3

所属模块：`流水线`

说明：删除流水线的serviceconnectendpointsd941afb3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_serviceconnect_endpoints_d941afb3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_strategy

所属模块：`流水线`

说明：删除流水线的strategy。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：删除流水线的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tag_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tag_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_delete_template

所属模块：`流水线`

说明：删除流水线的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_template",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/tenant_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_variable_group

所属模块：`流水线`

说明：删除流水线的变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 流水线 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
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

### pipeline_disable_pipeline

所属模块：`流水线`

说明：停用流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
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

所属模块：`流水线`

说明：启用流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_favorite_template

所属模块：`流水线`

说明：执行流水线的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_favorite_template",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "template_id": "<template_id>",
      "flag": "<flag>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `flag` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `flag` ↔ 原始 CodeArts 流水线 API 同名字段 `flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/tenant_id"
    },
    "flag": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "template_id",
    "flag"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_follow_component

所属模块：`流水线`

说明：执行流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_follow_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_accept_free_declaration

所属模块：`流水线`

说明：获取流水线的acceptfreedeclaration。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_accept_free_declaration",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_actions_all_361d529e

所属模块：`流水线`

说明：获取流水线的actionsall361d529e。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_actions_all_361d529e",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_actions_detail_32de0964

所属模块：`流水线`

说明：获取流水线的actions详情32de0964。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_actions_detail_32de0964",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_agent_plugin_all_version_8654a68a

所属模块：`流水线`

说明：获取流水线的agentpluginall版本8654a68a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_agent_plugin_all_version_8654a68a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_artifact_versions_86f2bf09

所属模块：`流水线`

说明：获取流水线的制品版本86f2bf09。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_artifact_versions_86f2bf09",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_batch_run_result

所属模块：`流水线`

说明：获取流水线的batch运行result。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_batch_run_result",
    "arguments": {
      "project_id": "<project_id>",
      "query": "<query>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `query` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "query": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pipeline_id": {
            "$ref": "#/properties/project_id"
          },
          "pipeline_run_id": {
            "$ref": "#/properties/project_id"
          }
        },
        "required": [
          "pipeline_id",
          "pipeline_run_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id",
    "query"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_change_request

所属模块：`流水线`

说明：获取流水线的change请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_change_request",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "change_request_id": "<change_request_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `change_request_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `change_request_id` ↔ 原始 CodeArts 流水线 API 同名字段 `change_request_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>change请求 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "change_request_id": {
      "$ref": "#/properties/cloud_project_id"
    }
  },
  "required": [
    "cloud_project_id",
    "change_request_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_change_request_creator_list_7daaa52d

所属模块：`流水线`

说明：获取流水线的change请求creatorlist7daaa52d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_change_request_creator_list_7daaa52d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_change_request_oplog_query_2e25ba54

所属模块：`流水线`

说明：获取流水线的change请求oplogquery2e25ba54。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_change_request_oplog_query_2e25ba54",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_change_request_releasing_query_a4f71756

所属模块：`流水线`

说明：获取流水线的change请求releasingquerya4f71756。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_change_request_releasing_query_a4f71756",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_cicd_devuc_auth_query_dea0860d

所属模块：`流水线`

说明：获取流水线的cicddevucauthquerydea0860d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_cicd_devuc_auth_query_dea0860d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_code_branches_2b5b4be7

所属模块：`流水线`

说明：获取流水线的code分支2b5b4be7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_code_branches_2b5b4be7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_code_repositories_page_fb58be1c

所属模块：`流水线`

说明：获取流水线的code仓库pagefb58be1c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_code_repositories_page_fb58be1c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_component

所属模块：`流水线`

说明：获取流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_component_follow_status

所属模块：`流水线`

说明：获取流水线的componentfollow状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_component_follow_status",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_dashboard_concurrency

所属模块：`流水线`

说明：获取流水线的dashboardconcurrency。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_dashboard_concurrency",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `start_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 流水线 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 流水线 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
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
    "query": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_dashboard_concurrency_09ee4de3

所属模块：`流水线`

说明：获取流水线的dashboardconcurrency09ee4de3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_dashboard_concurrency_09ee4de3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_dashboard_executions_overview

所属模块：`流水线`

说明：获取流水线的dashboardexecutionsoverview。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_dashboard_executions_overview",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `start_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 流水线 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 流水线 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
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
    "query": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_dashboard_executions_overview_6372a9b1

所属模块：`流水线`

说明：获取流水线的dashboardexecutionsoverview6372a9b1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_dashboard_executions_overview_6372a9b1",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_dashboard_pipeline_count_5c50b2bf

所属模块：`流水线`

说明：获取流水线的dashboard流水线数量5c50b2bf。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_dashboard_pipeline_count_5c50b2bf",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_devuc_auth

所属模块：`流水线`

说明：获取流水线的devucauth。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_devuc_auth",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "query": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_exec_log

所属模块：`流水线`

说明：获取流水线的exec日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_exec_log",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
| `start_offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `start_offset` ↔ 原始 CodeArts 流水线 API 同名字段 `start_offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `end_offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `end_offset` ↔ 原始 CodeArts 流水线 API 同名字段 `end_offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志结束偏移量，用于增量读取部署或构建日志。 |
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 流水线 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

输入 JSON Schema：

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
    "start_offset": {
      "type": "integer",
      "minimum": 0
    },
    "end_offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "offset": {
      "type": "integer",
      "minimum": 0
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

### pipeline_get_extension_detail_67d4b676

所属模块：`流水线`

说明：获取流水线的extension详情67d4b676。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extension_detail_67d4b676",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_extension_endpoint

所属模块：`流水线`

说明：获取流水线的extensionendpoint。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 流水线 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的extension模块。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 流水线 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_extensions_modules_a8b48eb1

所属模块：`流水线`

说明：获取流水线的extensions模块a8b48eb1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extensions_modules_a8b48eb1",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_manifest_versions

所属模块：`流水线`

说明：获取流水线的manifest版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_manifest_versions",
    "arguments": {
      "pipeline_ids": "<pipeline_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `body` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "body": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    }
  },
  "required": [
    "pipeline_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_manual_review_context

所属模块：`流水线`

说明：获取流水线的人工评审context。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_notice_detail

所属模块：`流水线`

说明：获取流水线的notice详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_notice_detail",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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
    "type": {
      "type": "string",
      "minLength": 1
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

### pipeline_get_notice_messages

所属模块：`流水线`

说明：获取流水线的noticemessages。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_notice_messages",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_notice_status

所属模块：`流水线`

说明：获取流水线的notice状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_notice_status",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_oauth_authorization_url

所属模块：`流水线`

说明：获取流水线的oauthauthorizationurl。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_oauth_authorization_url",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_official_notice

所属模块：`流水线`

说明：获取流水线的officialnotice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_official_notice",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_pac_action

所属模块：`流水线`

说明：获取流水线的pacaction。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pac_action",
    "arguments": {
      "domain_id": "<domain_id>",
      "pipeline_id": "<pipeline_id>",
      "pipeline_run_id": "<pipeline_run_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `pipeline_run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线运行 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/domain_id"
    },
    "pipeline_run_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "pipeline_id",
    "pipeline_run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_package_specs_count_down_c783c5a1

所属模块：`流水线`

说明：获取流水线的packagespecs数量downc783c5a1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_package_specs_count_down_c783c5a1",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_package_specs_is_freeze_12173619

所属模块：`流水线`

说明：获取流水线的packagespecsisfreeze12173619。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_package_specs_is_freeze_12173619",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_package_specs_unauthorized_b14c69ea

所属模块：`流水线`

说明：获取流水线的packagespecsunauthorizedb14c69ea。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_package_specs_unauthorized_b14c69ea",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_package_specs_usage_0539c634

所属模块：`流水线`

说明：获取流水线的packagespecsusage0539c634。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_package_specs_usage_0539c634",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_package_usage

所属模块：`流水线`

说明：获取流水线的packageusage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_package_usage",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_permission_switch

所属模块：`流水线`

说明：获取流水线的permissionswitch。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_permission_switch",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_pipeline

所属模块：`流水线`

说明：获取流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_pipeline_notices_notice_detail_74f258c0

所属模块：`流水线`

说明：获取流水线的流水线noticesnotice详情74f258c0。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipeline_notices_notice_detail_74f258c0",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipeline_tag_list_07963e31

所属模块：`流水线`

说明：获取流水线的流水线标签list07963e31。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipeline_tag_list_07963e31",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_build_records_eb6191ad

所属模块：`流水线`

说明：获取流水线的流水线构建记录eb6191ad。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_build_records_eb6191ad",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_build_result_08f2ceb8

所属模块：`流水线`

说明：获取流水线的流水线构建result08f2ceb8。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_build_result_08f2ceb8",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_component_check_8d8d2b91

所属模块：`流水线`

说明：获取流水线的流水线component检查8d8d2b91。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_component_check_8d8d2b91",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_detail_336a1c76

所属模块：`流水线`

说明：获取流水线的流水线详情336a1c76。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_detail_336a1c76",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_status_a6754e16

所属模块：`流水线`

说明：获取流水线的流水线状态a6754e16。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_status_a6754e16",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipelines_status_f2c5bcd6

所属模块：`流水线`

说明：获取流水线的流水线状态f2c5bcd6。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipelines_status_f2c5bcd6",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_inputs

所属模块：`流水线`

说明：获取流水线的plugininputs。

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
      "plugin_attribution": "<plugin_attribution>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `version` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `plugin_attribution` | 是 | `"custom" \| "official"` |  | 字段对应：<br>MCP 字段 `plugin_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件归属信息，用于标识插件来源、所属服务或扩展点。可选值：`custom`、`official`。 |

输入 JSON Schema：

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

### pipeline_get_plugin_metrics

所属模块：`流水线`

说明：获取流水线的pluginmetrics。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_metrics",
    "arguments": {
      "domain_id": "<domain_id>",
      "body": "<body>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `body` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
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
          },
          "version_attribution": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "plugin_name",
          "version",
          "plugin_attribution"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    }
  },
  "required": [
    "domain_id",
    "body"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_outputs

所属模块：`流水线`

说明：获取流水线的pluginoutputs。

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
      "plugin_attribution": "<plugin_attribution>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `version` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `plugin_attribution` | 是 | `"custom" \| "official"` |  | 字段对应：<br>MCP 字段 `plugin_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件归属信息，用于标识插件来源、所属服务或扩展点。可选值：`custom`、`official`。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的plugin版本。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `version` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |

输入 JSON Schema：

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

### pipeline_get_popup_status_069582cd

所属模块：`流水线`

说明：获取流水线的popup状态069582cd。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_popup_status_069582cd",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_query_related_project_d93797a4

所属模块：`流水线`

说明：获取流水线的项目query相关项目d93797a4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_query_related_project_d93797a4",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy

所属模块：`流水线`

说明：获取流水线的项目strategy。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的项目strategy详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的项目strategy相关信息。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_repository_number

所属模块：`流水线`

说明：获取流水线的仓库number。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_repository_number",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "domain_id": "<domain_id>",
      "region": "<region>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `region` | 是 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/tenant_id"
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    }
  },
  "required": [
    "tenant_id",
    "domain_id",
    "region"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_role_permission

所属模块：`流水线`

说明：获取流水线的角色permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_role_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_rule

所属模块：`流水线`

说明：获取流水线的规则。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的规则相关信息。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_run_change_requests

所属模块：`流水线`

说明：获取流水线的运行change请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_change_requests",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    "component_id": {
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

所属模块：`流水线`

说明：获取流水线的运行详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的运行日志。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的运行参数。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_serviceconnect_oauth_6a592552

所属模块：`流水线`

说明：获取流水线的serviceconnectoauth6a592552。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_serviceconnect_oauth_6a592552",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_step_jump_link

所属模块：`流水线`

说明：获取流水线的步骤jumplink。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_step_jump_link",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_step_outputs

所属模块：`流水线`

说明：获取流水线的步骤outputs。

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
      "step_run_ids": "<step_run_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_run_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `step_run_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `step_run_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤运行 ID 列表，用于批量定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的strategy。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `cloud_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：获取流水线的strategy相关信息。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_template

所属模块：`流水线`

说明：获取流水线的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_template",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/tenant_id"
    }
  },
  "required": [
    "tenant_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_templates_2f79c06e

所属模块：`流水线`

说明：获取流水线的模板2f79c06e。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_templates_2f79c06e",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_templates_31c8ee10

所属模块：`流水线`

说明：获取流水线的模板31c8ee10。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_templates_31c8ee10",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_tenant_package_is_freeze

所属模块：`流水线`

说明：获取流水线的租户packageisfreeze。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_tenant_package_is_freeze",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_tenant_popup_status

所属模块：`流水线`

说明：获取流水线的租户popup状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_tenant_popup_status",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

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

### pipeline_get_tenant_rule_sets_children_3446c018

所属模块：`流水线`

说明：获取流水线的租户规则setschildren3446c018。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_tenant_rule_sets_children_3446c018",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_tenant_rule_sets_detail_7774400e

所属模块：`流水线`

说明：获取流水线的租户规则sets详情7774400e。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_tenant_rule_sets_detail_7774400e",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_tenant_version_detail

所属模块：`流水线`

说明：获取流水线的租户版本详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_tenant_version_detail",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_user_permission

所属模块：`流水线`

说明：获取流水线的用户permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_user_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_variable_group

所属模块：`流水线`

说明：获取流水线的变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 流水线 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

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

### pipeline_get_webhook_info

所属模块：`流水线`

说明：获取流水线的webhook信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_webhook_info",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_get_whitelist_query_3cc8e969

所属模块：`流水线`

说明：获取流水线的whitelistquery3cc8e969。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_whitelist_query_3cc8e969",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_whitelist_record_visible_days_59bf3825

所属模块：`流水线`

说明：获取流水线的whitelist记录visibledays59bf3825。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_whitelist_record_visible_days_59bf3825",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_whitelist_repository_number_ec85abf2

所属模块：`流水线`

说明：获取流水线的whitelist仓库numberec85abf2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_whitelist_repository_number_ec85abf2",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_inherit_project_strategy

所属模块：`流水线`

说明：执行流水线的项目strategy。

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
      "is_valid": "<is_valid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `parent_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 流水线 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `rules` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `rules` ↔ 原始 CodeArts 流水线 API 同名字段 `rules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。 |
| `is_valid` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `is_valid` ↔ 原始 CodeArts 流水线 API 同名字段 `is_valid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否有效。true 表示启用或有效，false 表示停用或无效。 |
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

### pipeline_list_artifact_versions

所属模块：`流水线`

说明：查询流水线的制品版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_artifact_versions",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `page_index` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page_index` ↔ 原始 CodeArts 流水线 API 同名字段 `page_index`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>页码或页索引，用于分页查询；起始值以对应接口约定为准。 |
| `page_size` | 否 | `integer` | 10 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `parent_id` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 流水线 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `metadata_type` | 否 | `string` | "generic" | 字段对应：<br>MCP 字段 `metadata_type` ↔ 原始 CodeArts 流水线 API 同名字段 `metadata_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `repo_branch` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `repo_branch` ↔ 原始 CodeArts 流水线 API 同名字段 `repo_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "query": {
      "type": "string",
      "default": ""
    },
    "page_index": {
      "type": "integer",
      "minimum": 1,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 10
    },
    "parent_id": {
      "type": "string",
      "default": ""
    },
    "metadata_type": {
      "type": "string",
      "minLength": 1,
      "default": "generic"
    },
    "name": {
      "type": "string",
      "default": ""
    },
    "repo_branch": {
      "type": "string",
      "default": ""
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_artifacts

所属模块：`流水线`

说明：查询流水线的制品。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的availablepublishers。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的baseplugins。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的basepluginspaged。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

### pipeline_list_change_request_creators

所属模块：`流水线`

说明：查询流水线的change请求creators。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_change_request_creators",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_change_request_operation_logs

所属模块：`流水线`

说明：查询流水线的change请求操作日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_change_request_operation_logs",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "change_request_id": "<change_request_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `change_request_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `change_request_id` ↔ 原始 CodeArts 流水线 API 同名字段 `change_request_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>change请求 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "change_request_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 20
    }
  },
  "required": [
    "cloud_project_id",
    "change_request_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_change_request_work_items

所属模块：`流水线`

说明：查询流水线的change请求工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_change_request_work_items",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "change_request_id": "<change_request_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `change_request_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `change_request_id` ↔ 原始 CodeArts 流水线 API 同名字段 `change_request_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>change请求 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "change_request_id": {
      "$ref": "#/properties/cloud_project_id"
    }
  },
  "required": [
    "cloud_project_id",
    "change_request_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_change_requests

所属模块：`流水线`

说明：查询流水线的change请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_change_requests",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
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
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_code_branches

所属模块：`流水线`

说明：查询流水线的code分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_code_branches",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `repoUrl` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repoUrl` ↔ 原始 CodeArts 流水线 API 同名字段 `repoUrl`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `authEndpoint` | 否 | `string` |  | 字段对应：<br>MCP 字段 `authEndpoint` ↔ 原始 CodeArts 流水线 API 同名字段 `authEndpoint`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repoId` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repoId` ↔ 原始 CodeArts 流水线 API 同名字段 `repoId`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pipelineId` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pipelineId` ↔ 原始 CodeArts 流水线 API 同名字段 `pipelineId`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 流水线 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 30 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "repoUrl": {
      "type": "string",
      "minLength": 1
    },
    "authEndpoint": {
      "type": "string"
    },
    "repoId": {
      "type": "string",
      "minLength": 1
    },
    "pipelineId": {
      "$ref": "#/properties/cloud_project_id"
    },
    "search": {
      "type": "string"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 30
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_code_repositories

所属模块：`流水线`

说明：查询流水线的code仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_code_repositories",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `repoType` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repoType` ↔ 原始 CodeArts 流水线 API 同名字段 `repoType`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `workspace` | 否 | `string` |  | 字段对应：<br>MCP 字段 `workspace` ↔ 原始 CodeArts 流水线 API 同名字段 `workspace`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `authEndpoint` | 否 | `string` |  | 字段对应：<br>MCP 字段 `authEndpoint` ↔ 原始 CodeArts 流水线 API 同名字段 `authEndpoint`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 30 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "repoType": {
      "type": "string",
      "minLength": 1
    },
    "query": {
      "type": "string"
    },
    "workspace": {
      "type": "string"
    },
    "authEndpoint": {
      "type": "string"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 30
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_components

所属模块：`流水线`

说明：查询流水线的components。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_components",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
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
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "cloud_project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_dashboard_pipeline_counts

所属模块：`流水线`

说明：查询流水线的dashboard流水线counts。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_dashboard_pipeline_counts",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `start_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 流水线 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 流水线 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
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
    "query": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_execution_plans

所属模块：`流水线`

说明：查询流水线的执行计划。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_execution_plans",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_list_extension_endpoints

所属模块：`流水线`

说明：查询流水线的extensionendpoints。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `region_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `region_name` ↔ 原始 CodeArts 流水线 API 同名字段 `region_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>region名称。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 流水线 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的extension模块。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_extension_modules",
    "arguments": {
      "locations": "<locations>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `locations` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `locations` ↔ 原始 CodeArts 流水线 API 同名字段 `locations`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>位置列表，用于描述资源部署位置、文件位置或组织层级位置。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `region_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region_name` ↔ 原始 CodeArts 流水线 API 同名字段 `region_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>region名称。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `product_line` | 否 | `string` |  | 字段对应：<br>MCP 字段 `product_line` ↔ 原始 CodeArts 流水线 API 同名字段 `product_line`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>产品线，用于按业务产品线归类或过滤需求、计划、缺陷等资源。 |
| `tags` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `tags` ↔ 原始 CodeArts 流水线 API 同名字段 `tags`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表，用于给资源打标或按标签过滤。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### pipeline_list_modify_history

所属模块：`流水线`

说明：查询流水线的modify历史。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_modify_history",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_list_pac_actions

所属模块：`流水线`

说明：查询流水线的pacactions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pac_actions",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

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
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipeline_build_records

所属模块：`流水线`

说明：查询流水线的流水线构建记录。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipeline_build_records",
    "arguments": {
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 流水线 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 流水线 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 流水线 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `outcome` | 否 | `string` |  | 字段对应：<br>MCP 字段 `outcome` ↔ 原始 CodeArts 流水线 API 同名字段 `outcome`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "end_date": {
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
      "maximum": 200,
      "default": 20
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "outcome": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipeline_build_results

所属模块：`流水线`

说明：查询流水线的流水线构建results。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipeline_build_results",
    "arguments": {
      "project_id": "<project_id>",
      "start_date": "<start_date>",
      "end_date": "<end_date>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `start_date` | 是 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 流水线 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `end_date` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 流水线 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "end_date": {
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
      "maximum": 200,
      "default": 20
    }
  },
  "required": [
    "project_id",
    "start_date",
    "end_date"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipeline_variable_groups

所属模块：`流水线`

说明：查询流水线的流水线变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_list_pipeline_vars

所属模块：`流水线`

说明：查询流水线的流水线vars。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipeline_vars",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 流水线 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### pipeline_list_pipelines_v3

所属模块：`流水线`

说明：查询流水线的流水线v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipelines_v3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `project_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `project_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `project_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `pipeline_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_name` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线名称。 |
| `creator_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `creator_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `creator_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>creator ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `executor_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `executor_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `executor_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>executor ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 流水线 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `outcome` | 否 | `string` |  | 字段对应：<br>MCP 字段 `outcome` ↔ 原始 CodeArts 流水线 API 同名字段 `outcome`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_key` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_key` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_dir` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_dir` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_dir`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `git_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `git_url` ↔ 原始 CodeArts 流水线 API 同名字段 `git_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>git URL，用于指定服务地址、资源地址或回调地址。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 10 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "project_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 10
    },
    "pipeline_name": {
      "type": "string",
      "minLength": 1
    },
    "creator_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 10
    },
    "executor_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 10
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "outcome": {
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
        "asc",
        "desc"
      ]
    },
    "git_url": {
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
      "maximum": 50,
      "default": 10
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_plugin_version_numbers

所属模块：`流水线`

说明：查询流水线的plugin版本numbers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_plugin_version_numbers",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

### pipeline_list_plugin_versions

所属模块：`流水线`

说明：查询流水线的plugin版本。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的plugins。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `plugin_attribution` | 否 | `"custom" \| "official"` |  | 字段对应：<br>MCP 字段 `plugin_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件归属信息，用于标识插件来源、所属服务或扩展点。可选值：`custom`、`official`。 |
| `business_type` | 否 | `array<"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal">` |  | 字段对应：<br>MCP 字段 `business_type` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务类型，用于按服务或场景区分不同资源。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `maintainer` | 否 | `string` |  | 字段对应：<br>MCP 字段 `maintainer` ↔ 原始 CodeArts 流水线 API 同名字段 `maintainer`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>维护人标识，用于指定资源维护负责人。 |
| `plugin_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的项目strategies。

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
      "offset": "<offset>",
      "limit": "<limit>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `offset` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `include_tenant_rule_set` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `include_tenant_rule_set` ↔ 原始 CodeArts 流水线 API 同名字段 `include_tenant_rule_set`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否包含租户级规则集。true 表示查询结果中包含租户公共规则集。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `is_valid` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_valid` ↔ 原始 CodeArts 流水线 API 同名字段 `is_valid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否有效。true 表示启用或有效，false 表示停用或无效。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的publishers。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

### pipeline_list_queue

所属模块：`流水线`

说明：查询流水线的queue。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_queue",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_list_related_projects

所属模块：`流水线`

说明：查询流水线的相关项目。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_related_projects",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `page_index` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page_index` ↔ 原始 CodeArts 流水线 API 同名字段 `page_index`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>页码或页索引，用于分页查询；起始值以对应接口约定为准。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 流水线 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "page_index": {
      "type": "integer",
      "minimum": 1,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 20
    },
    "search": {
      "type": "string"
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_reusable_jobs

所属模块：`流水线`

说明：查询流水线的reusable任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_reusable_jobs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

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
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "body": {
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

### pipeline_list_rule_types

所属模块：`流水线`

说明：查询流水线的规则types。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `organization_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `organization_id` ↔ 原始 CodeArts 流水线 API 同名字段 `organization_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>组织 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的rules。

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
      "offset": "<offset>",
      "limit": "<limit>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `cloud_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 流水线 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`流水线`

说明：查询流水线的阶段plugins。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `use_condition` | 是 | `string` |  | 字段对应：<br>MCP 字段 `use_condition` ↔ 原始 CodeArts 流水线 API 同名字段 `use_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>使用条件表达式，满足条件时才使用该配置、规则或步骤。 |
| `business_type` | 否 | `array<"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal">` |  | 字段对应：<br>MCP 字段 `business_type` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务类型，用于按服务或场景区分不同资源。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `deploy_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `deploy_type` ↔ 原始 CodeArts 流水线 API 同名字段 `deploy_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署类型，用于区分主机部署、容器部署、函数部署等部署方式；具体取值以部署服务为准。 |
| `comp_extend_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `comp_extend_type` ↔ 原始 CodeArts 流水线 API 同名字段 `comp_extend_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>组件扩展类型，用于区分组件、插件或扩展配置类别。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的strategies。

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
      "offset": "<offset>",
      "limit": "<limit>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `offset` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `include_tenant_rule_set` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `include_tenant_rule_set` ↔ 原始 CodeArts 流水线 API 同名字段 `include_tenant_rule_set`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否包含租户级规则集。true 表示查询结果中包含租户公共规则集。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `is_valid` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_valid` ↔ 原始 CodeArts 流水线 API 同名字段 `is_valid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否有效。true 表示启用或有效，false 表示停用或无效。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的strategychildren。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

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

### pipeline_list_system_vars

所属模块：`流水线`

说明：查询流水线的systemvars。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_system_vars",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_list_tags

所属模块：`流水线`

说明：查询流水线的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `proj_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `proj_id` ↔ 原始 CodeArts 流水线 API 同名字段 `proj_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：查询流水线的模板。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 流水线 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `language` | 否 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 流水线 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `is_system` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_system` ↔ 原始 CodeArts 流水线 API 同名字段 `is_system`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否系统内置。true 表示系统预置资源，false 表示用户自定义资源。 |

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

### pipeline_list_templates_v3

所属模块：`流水线`

说明：查询流水线的模板v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_templates_v3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_type` | 否 | `string` | "pipeline" | 字段对应：<br>MCP 字段 `template_type` ↔ 原始 CodeArts 流水线 API 同名字段 `template_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_build_in` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `is_build_in` ↔ 原始 CodeArts 流水线 API 同名字段 `is_build_in`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 流水线 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 流水线 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `sort` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 流水线 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。 |
| `asc` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `asc` ↔ 原始 CodeArts 流水线 API 同名字段 `asc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_type": {
      "type": "string",
      "minLength": 1,
      "default": "pipeline"
    },
    "is_build_in": {
      "type": "boolean",
      "default": false
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 20
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "sort": {
      "type": "string",
      "minLength": 1
    },
    "asc": {
      "type": "boolean"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_trigger_failed_records

所属模块：`流水线`

说明：查询流水线的triggerfailed记录。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_trigger_failed_records",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 流水线 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

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

### pipeline_list_variable_groups

所属模块：`流水线`

说明：查询流水线的变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 流水线 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 流水线 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 流水线 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

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

所属模块：`流水线`

说明：执行流水线的流水线to组。

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
      "pipelines": "<pipelines>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 流水线 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `pipelines` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipelines` ↔ 原始 CodeArts 流水线 API 同名字段 `pipelines`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线列表，用于批量查询、批量运行或关联多条流水线。 |
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

### pipeline_post_agent_plugin_create_f86c47c0

所属模块：`流水线`

说明：执行流水线的agentplugincreatef86c47c0。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_agent_plugin_create_f86c47c0",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_extension_info_add_3491c6e8

所属模块：`流水线`

说明：执行流水线的extension信息add3491c6e8。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_extension_info_add_3491c6e8",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_extension_info_update_8d9358f7

所属模块：`流水线`

说明：执行流水线的extension信息update8d9358f7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_extension_info_update_8d9358f7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_extension_upload_0ab66896

所属模块：`流水线`

说明：执行流水线的extension上传0ab66896。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_extension_upload_0ab66896",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_actors_b5085887

所属模块：`流水线`

说明：执行流水线的pac流水线actionsactorsb5085887。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_actors_b5085887",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_d49ac317

所属模块：`流水线`

说明：执行流水线的pac流水线actionsd49ac317。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_d49ac317",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_events_69f81e45

所属模块：`流水线`

说明：执行流水线的pac流水线actionsevents69f81e45。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_events_69f81e45",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_rerun_8dcce5b7

所属模块：`流水线`

说明：执行流水线的pac流水线actionsrerun8dcce5b7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_rerun_8dcce5b7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_run_404c6bc8

所属模块：`流水线`

说明：执行流水线的pac流水线actions运行404c6bc8。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_run_404c6bc8",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_actions_yml_bddf3fcd

所属模块：`流水线`

说明：执行流水线的pac流水线actionsymlbddf3fcd。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_actions_yml_bddf3fcd",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pac_pipelines_run_ea58e731

所属模块：`流水线`

说明：执行流水线的pac流水线运行ea58e731。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pac_pipelines_run_ea58e731",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipeline_change_requests_search_477046ff

所属模块：`流水线`

说明：执行流水线的流水线change请求search477046ff。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipeline_change_requests_search_477046ff",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipeline_templates_create_a5440fe1

所属模块：`流水线`

说明：执行流水线的流水线模板createa5440fe1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipeline_templates_create_a5440fe1",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipeline_templates_list_527190c6

所属模块：`流水线`

说明：执行流水线的流水线模板list527190c6。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipeline_templates_list_527190c6",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_batch_runs_ede5d31a

所属模块：`流水线`

说明：执行流水线的流水线batch运行ede5d31a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_batch_runs_ede5d31a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_callback_run_43c0b817

所属模块：`流水线`

说明：执行流水线的流水线callback运行43c0b817。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_callback_run_43c0b817",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_check_rights_cd9a0fd6

所属模块：`流水线`

说明：执行流水线的流水线检查rightscd9a0fd6。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_check_rights_cd9a0fd6",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_pipeline_runs_list_4e1ace94

所属模块：`流水线`

说明：执行流水线的流水线流水线运行list4e1ace94。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_pipeline_runs_list_4e1ace94",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_stop_b5f0fb89

所属模块：`流水线`

说明：执行流水线的流水线stopb5f0fb89。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_stop_b5f0fb89",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_webhook_callback_run_f053daab

所属模块：`流水线`

说明：执行流水线的流水线webhookcallback运行f053daab。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_webhook_callback_run_f053daab",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_pipelines_webhook_switch_446cf887

所属模块：`流水线`

说明：执行流水线的流水线webhookswitch446cf887。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_pipelines_webhook_switch_446cf887",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_publisher_create_cece4f4a

所属模块：`流水线`

说明：执行流水线的publishercreatecece4f4a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_publisher_create_cece4f4a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_post_publisher_detail_a832d0a3

所属模块：`流水线`

说明：执行流水线的publisher详情a832d0a3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_post_publisher_detail_a832d0a3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_publish_plugin

所属模块：`流水线`

说明：执行流水线的plugin。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_publish_plugin",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "publisher_unique_id": "<publisher_unique_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `publisher_unique_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `publisher_unique_id` ↔ 原始 CodeArts 流水线 API 同名字段 `publisher_unique_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>publisherunique ID，用于定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "type": "string"
    },
    "publisher_unique_id": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "publisher_unique_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_publish_plugin_bind

所属模块：`流水线`

说明：执行流水线的pluginbind。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_publish_plugin_bind",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "publisher_unique_id": "<publisher_unique_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `publisher_unique_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `publisher_unique_id` ↔ 原始 CodeArts 流水线 API 同名字段 `publisher_unique_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>publisherunique ID，用于定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
      "type": "string"
    },
    "publisher_unique_id": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "publisher_unique_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_publish_plugin_draft

所属模块：`流水线`

说明：执行流水线的plugindraft。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_publish_plugin_draft",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "display_name": "<display_name>",
      "version": "<version>",
      "plugin_attribution": "<plugin_attribution>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `version` | 是 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `plugin_attribution` | 是 | `"custom" \| "official"` |  | 字段对应：<br>MCP 字段 `plugin_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件归属信息，用于标识插件来源、所属服务或扩展点。可选值：`custom`、`official`。 |
| `version_attribution` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `version_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    },
    "version_attribution": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### pipeline_put_change_request_repos_update_b7a9bcf7

所属模块：`流水线`

说明：执行流水线的change请求reposupdateb7a9bcf7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_put_change_request_repos_update_b7a9bcf7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_put_change_request_status_update_91e502cc

所属模块：`流水线`

说明：执行流水线的change请求状态update91e502cc。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_put_change_request_status_update_91e502cc",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_put_pac_pipelines_cdba332d

所属模块：`流水线`

说明：执行流水线的pac流水线cdba332d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_put_pac_pipelines_cdba332d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 流水线 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "path_params": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      }
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
  "additionalProperties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_query_manifest_versions

所属模块：`流水线`

说明：查询流水线的manifest版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_query_manifest_versions",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_ids": "<pipeline_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `body` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

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
    "body": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    }
  },
  "required": [
    "project_id",
    "pipeline_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_reject_checkpoint

所属模块：`流水线`

说明：驳回流水线的checkpoint。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_reject_checkpoint",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>",
      "step_id": "<step_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
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
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_reject_delay_job

所属模块：`流水线`

说明：驳回流水线的delay任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_reject_delay_job",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_reject_run

所属模块：`流水线`

说明：驳回流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_request_official_api

所属模块：`流水线`

说明：执行流水线的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 流水线 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 流水线 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 流水线 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### pipeline_resume_pipeline

所属模块：`流水线`

说明：执行流水线的流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_resume_pipeline",
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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 流水线 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 流水线 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

所属模块：`流水线`

说明：重试流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
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

### pipeline_rollback_run

所属模块：`流水线`

说明：回滚流水线的运行。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_rollback_run",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "run_id": "<run_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `sources` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `sources` ↔ 原始 CodeArts 流水线 API 同名字段 `sources`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
| `choose_jobs` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `choose_jobs` ↔ 原始 CodeArts 流水线 API 同名字段 `choose_jobs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `choose_stages` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `choose_stages` ↔ 原始 CodeArts 流水线 API 同名字段 `choose_stages`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "sources": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "description": {
      "type": "string",
      "maxLength": 1024
    },
    "variables": {
      "type": "array",
      "items": {
        "$ref": "#/properties/sources/items"
      }
    },
    "choose_jobs": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "choose_stages": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
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

所属模块：`流水线`

说明：运行流水线的流水线。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 流水线 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
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

所属模块：`流水线`

说明：设置流水线的标签for流水线。

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
      "pipeline_ids": "<pipeline_ids>",
      "tag_ids": "<tag_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `pipeline_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `tag_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `tag_ids` ↔ 原始 CodeArts 流水线 API 同名字段 `tag_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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

### pipeline_show_pipeline_detail_v3

所属模块：`流水线`

说明：执行流水线的流水线详情v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_show_pipeline_detail_v3",
    "arguments": {
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `build_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_id` ↔ 原始 CodeArts 流水线 API 同名字段 `build_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "build_id": {
      "$ref": "#/properties/pipeline_id"
    }
  },
  "required": [
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_show_pipeline_status

所属模块：`流水线`

说明：执行流水线的流水线状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_show_pipeline_status",
    "arguments": {
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `build_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_id` ↔ 原始 CodeArts 流水线 API 同名字段 `build_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "build_id": {
      "$ref": "#/properties/pipeline_id"
    }
  },
  "required": [
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_show_template_detail_v3

所属模块：`流水线`

说明：执行流水线的模板详情v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_show_template_detail_v3",
    "arguments": {
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `template_type` | 否 | `string` | "pipeline" | 字段对应：<br>MCP 字段 `template_type` ↔ 原始 CodeArts 流水线 API 同名字段 `template_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `source` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source` ↔ 原始 CodeArts 流水线 API 同名字段 `source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "template_type": {
      "type": "string",
      "minLength": 1,
      "default": "pipeline"
    },
    "source": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_show_template_task_status

所属模块：`流水线`

说明：执行流水线的模板任务状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_show_template_task_status",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 流水线 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

### pipeline_start_new_pipeline_v3

所属模块：`流水线`

说明：启动流水线的new流水线v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_start_new_pipeline_v3",
    "arguments": {
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `build_params` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `build_params` ↔ 原始 CodeArts 流水线 API 同名字段 `build_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "build_params": {
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
          "name",
          "value"
        ],
        "additionalProperties": false
      }
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_stop_pipeline_v3

所属模块：`流水线`

说明：停止流水线的流水线v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_stop_pipeline_v3",
    "arguments": {
      "pipeline_id": "<pipeline_id>",
      "build_id": "<build_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `build_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `build_id` ↔ 原始 CodeArts 流水线 API 同名字段 `build_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "build_id": {
      "$ref": "#/properties/pipeline_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "pipeline_id",
    "build_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_stop_run

所属模块：`流水线`

说明：停止流水线的运行。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `run_id` ↔ 原始 CodeArts 流水线 API 同名字段 `run_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>运行记录 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### pipeline_swap_pipeline_group_order

所属模块：`流水线`

说明：执行流水线的流水线组order。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_swap_pipeline_group_order",
    "arguments": {
      "project_id": "<project_id>",
      "group_id_1": "<group_id_1>",
      "group_id_2": "<group_id_2>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id_1` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id_1` ↔ 原始 CodeArts 流水线 API 同名字段 `group_id_1`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id_2` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id_2` ↔ 原始 CodeArts 流水线 API 同名字段 `group_id_2`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "group_id_1": {
      "$ref": "#/properties/project_id"
    },
    "group_id_2": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "group_id_1",
    "group_id_2"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_notice

所属模块：`流水线`

说明：切换流水线的notice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_notice",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "notice_type": "<notice_type>",
      "notice_switch": "<notice_switch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `notice_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `notice_type` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_switch` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `notice_switch` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_switch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "notice_type": {
      "type": "string",
      "minLength": 1
    },
    "notice_switch": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "notice_type",
    "notice_switch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_permission

所属模块：`流水线`

说明：切换流水线的permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "flag": "<flag>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `flag` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `flag` ↔ 原始 CodeArts 流水线 API 同名字段 `flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "flag": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "flag"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_project_strategy

所属模块：`流水线`

说明：切换流水线的项目strategy。

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
      "is_valid": "<is_valid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `is_valid` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `is_valid` ↔ 原始 CodeArts 流水线 API 同名字段 `is_valid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否有效。true 表示启用或有效，false 表示停用或无效。 |
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

所属模块：`流水线`

说明：切换流水线的strategy。

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
      "is_valid": "<is_valid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `is_valid` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `is_valid` ↔ 原始 CodeArts 流水线 API 同名字段 `is_valid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否有效。true 表示启用或有效，false 表示停用或无效。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### pipeline_unfollow_component

所属模块：`流水线`

说明：执行流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_unfollow_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_change_request_status

所属模块：`流水线`

说明：更新流水线的change请求状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_change_request_status",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "change_request_id": "<change_request_id>",
      "status": "<status>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `change_request_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `change_request_id` ↔ 原始 CodeArts 流水线 API 同名字段 `change_request_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>change请求 ID，用于定位对应的 CodeArts 资源。 |
| `status` | 是 | `"developing" \| "to_be_released" \| "releasing" \| "released" \| "revoked"` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 流水线 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`developing`、`to_be_released`、`releasing`、`released`、`revoked`。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "change_request_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "status": {
      "type": "string",
      "enum": [
        "developing",
        "to_be_released",
        "releasing",
        "released",
        "revoked"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "change_request_id",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_change_request_work_items

所属模块：`流水线`

说明：更新流水线的change请求工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_change_request_work_items",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "change_request_id": "<change_request_id>",
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `change_request_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `change_request_id` ↔ 原始 CodeArts 流水线 API 同名字段 `change_request_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>change请求 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 流水线 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "change_request_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/cloud_project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "change_request_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_component

所属模块：`流水线`

说明：更新流水线的component。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_component",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `desc` | 否 | `string` |  | 字段对应：<br>MCP 字段 `desc` ↔ 原始 CodeArts 流水线 API 同名字段 `desc`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "desc": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "cloud_project_id",
    "component_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_component_repos

所属模块：`流水线`

说明：更新流水线的componentrepos。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_component_repos",
    "arguments": {
      "cloud_project_id": "<cloud_project_id>",
      "component_id": "<component_id>",
      "repos": "<repos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `cloud_project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cloud_project_id` ↔ 原始 CodeArts 流水线 API 同名字段 `cloud_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>云项目 ID，用于定位对应的 CodeArts 资源。 |
| `component_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `component_id` ↔ 原始 CodeArts 流水线 API 同名字段 `component_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>component ID，用于定位对应的 CodeArts 资源。 |
| `repos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `repos` ↔ 原始 CodeArts 流水线 API 同名字段 `repos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "cloud_project_id": {
      "type": "string",
      "minLength": 1
    },
    "component_id": {
      "$ref": "#/properties/cloud_project_id"
    },
    "repos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "minLength": 1
          },
          "repo_id": {
            "type": "string",
            "minLength": 1
          },
          "http_url": {
            "type": "string",
            "minLength": 1
          },
          "git_url": {
            "type": "string",
            "minLength": 1
          },
          "branch": {
            "type": "string",
            "minLength": 1
          },
          "language": {
            "type": "string",
            "minLength": 1
          },
          "endpoint_id": {
            "type": "string"
          }
        },
        "required": [
          "type",
          "repo_id",
          "http_url",
          "git_url",
          "branch",
          "language"
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
    "cloud_project_id",
    "component_id",
    "repos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_extension_endpoint

所属模块：`流水线`

说明：更新流水线的extensionendpoint。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 流水线 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `region_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region_name` ↔ 原始 CodeArts 流水线 API 同名字段 `region_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>region名称。 |
| `module_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 流水线 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 流水线 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `authorization` | 否 | `object` |  | 字段对应：<br>MCP 字段 `authorization` ↔ 原始 CodeArts 流水线 API 同名字段 `authorization`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>授权信息，用于访问受保护资源；请勿在日志或公开文档中暴露敏感值。 |
| `data` | 否 | `object` |  | 字段对应：<br>MCP 字段 `data` ↔ 原始 CodeArts 流水线 API 同名字段 `data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务数据对象，承载接口需要提交或返回的结构化内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：更新流水线的组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 流水线 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
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

### pipeline_update_notice_status

所属模块：`流水线`

说明：更新流水线的notice状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_notice_status",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "type": "<type>",
      "enable": "<enable>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `enable` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `enable` ↔ 原始 CodeArts 流水线 API 同名字段 `enable`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否启用。true 表示启用该配置、步骤、规则或能力。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "integer"
    },
    "enable": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "type",
    "enable"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_official_notice

所属模块：`流水线`

说明：更新流水线的officialnotice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_official_notice",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "event_type": "<event_type>",
      "notice_data": "<notice_data>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `event_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `event_type` ↔ 原始 CodeArts 流水线 API 同名字段 `event_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_data` | 是 | `object` |  | 字段对应：<br>MCP 字段 `notice_data` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "event_type": {
      "type": "string",
      "minLength": 1
    },
    "notice_data": {
      "type": "object",
      "properties": {
        "notice_types": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1
        },
        "notice_roles": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1
        }
      },
      "required": [
        "notice_types",
        "notice_roles"
      ],
      "additionalProperties": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "event_type",
    "notice_data"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_pipeline_info

所属模块：`流水线`

说明：更新流水线的流水线信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_pipeline_info",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `is_publish` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_publish` ↔ 原始 CodeArts 流水线 API 同名字段 `is_publish`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `manifest_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `manifest_version` ↔ 原始 CodeArts 流水线 API 同名字段 `manifest_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 1024
    },
    "is_publish": {
      "type": "boolean"
    },
    "manifest_version": {
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
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_pipeline_notice_conf

所属模块：`流水线`

说明：更新流水线的流水线noticeconf。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_pipeline_notice_conf",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "type": "<type>",
      "event": "<event>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `event` | 是 | `object` |  | 字段对应：<br>MCP 字段 `event` ↔ 原始 CodeArts 流水线 API 同名字段 `event`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "event": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "minLength": 1
        },
        "selected": {
          "type": "boolean"
        },
        "notice_roles": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "minItems": 1
        }
      },
      "required": [
        "id",
        "selected",
        "notice_roles"
      ],
      "additionalProperties": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "type",
    "event"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_plugin_base_info

所属模块：`流水线`

说明：更新流水线的pluginbase信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_plugin_base_info",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `business_type` | 否 | `"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal"` |  | 字段对应：<br>MCP 字段 `business_type` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务类型，用于按服务或场景区分不同资源。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `business_type_display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `business_type_display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type_display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>businesstypedisplay名称。 |
| `icon_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `icon_url` ↔ 原始 CodeArts 流水线 API 同名字段 `icon_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>icon URL，用于指定服务地址、资源地址或回调地址。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `maintainers` | 否 | `string` |  | 字段对应：<br>MCP 字段 `maintainers` ↔ 原始 CodeArts 流水线 API 同名字段 `maintainers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "business_type": {
      "type": "string",
      "enum": [
        "Build",
        "Gate",
        "Deploy",
        "Test",
        "Normal"
      ]
    },
    "business_type_display_name": {
      "type": "string",
      "minLength": 1
    },
    "icon_url": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "maintainers": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### pipeline_update_plugin_draft

所属模块：`流水线`

说明：更新流水线的plugindraft。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_plugin_draft",
    "arguments": {
      "domain_id": "<domain_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `unique_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `unique_id` ↔ 原始 CodeArts 流水线 API 同名字段 `unique_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>unique ID，用于定位对应的 CodeArts 资源。 |
| `icon_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `icon_url` ↔ 原始 CodeArts 流水线 API 同名字段 `icon_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>icon URL，用于指定服务地址、资源地址或回调地址。 |
| `runtime_attribution` | 否 | `"agent" \| "agentless"` |  | 字段对应：<br>MCP 字段 `runtime_attribution` ↔ 原始 CodeArts 流水线 API 同名字段 `runtime_attribution`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`agent`、`agentless`。 |
| `plugin_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>display名称。 |
| `business_type` | 否 | `"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal"` |  | 字段对应：<br>MCP 字段 `business_type` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务类型，用于按服务或场景区分不同资源。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `business_type_display_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `business_type_display_name` ↔ 原始 CodeArts 流水线 API 同名字段 `business_type_display_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>businesstypedisplay名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `is_private` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `is_private` ↔ 原始 CodeArts 流水线 API 同名字段 `is_private`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `region` | 否 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `maintainers` | 否 | `string` |  | 字段对应：<br>MCP 字段 `maintainers` ↔ 原始 CodeArts 流水线 API 同名字段 `maintainers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `plugin_composition_type` | 否 | `"single" \| "multi"` |  | 字段对应：<br>MCP 字段 `plugin_composition_type` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_composition_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`single`、`multi`。 |
| `manifest_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `manifest_version` ↔ 原始 CodeArts 流水线 API 同名字段 `manifest_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 流水线 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `version_description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version_description` ↔ 原始 CodeArts 流水线 API 同名字段 `version_description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `execution_info` | 否 | `object` |  | 字段对应：<br>MCP 字段 `execution_info` ↔ 原始 CodeArts 流水线 API 同名字段 `execution_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `output_info` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `output_info` ↔ 原始 CodeArts 流水线 API 同名字段 `output_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `input_info` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `input_info` ↔ 原始 CodeArts 流水线 API 同名字段 `input_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 流水线 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "unique_id": {
      "$ref": "#/properties/domain_id"
    },
    "icon_url": {
      "type": "string",
      "minLength": 1
    },
    "runtime_attribution": {
      "type": "string",
      "enum": [
        "agent",
        "agentless"
      ]
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "business_type": {
      "type": "string",
      "enum": [
        "Build",
        "Gate",
        "Deploy",
        "Test",
        "Normal"
      ]
    },
    "business_type_display_name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "minLength": 1
    },
    "is_private": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "maintainers": {
      "type": "string",
      "minLength": 1
    },
    "plugin_composition_type": {
      "type": "string",
      "enum": [
        "single",
        "multi"
      ]
    },
    "manifest_version": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "version_description": {
      "type": "string"
    },
    "execution_info": {
      "type": "object",
      "additionalProperties": {}
    },
    "output_info": {
      "type": "array",
      "items": {
        "$ref": "#/properties/execution_info"
      }
    },
    "input_info": {
      "type": "array",
      "items": {
        "$ref": "#/properties/execution_info"
      }
    },
    "body": {
      "$ref": "#/properties/execution_info"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_project_notice_event_switch

所属模块：`流水线`

说明：更新流水线的项目noticeeventswitch。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_project_notice_event_switch",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "type": "<type>",
      "enable": "<enable>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `enable` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `enable` ↔ 原始 CodeArts 流水线 API 同名字段 `enable`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否启用。true 表示启用该配置、步骤、规则或能力。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "integer"
    },
    "enable": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "type",
    "enable"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_project_strategy

所属模块：`流水线`

说明：更新流水线的项目strategy。

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
      "rules": "<rules>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `rules` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `rules` ↔ 原始 CodeArts 流水线 API 同名字段 `rules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。 |
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

### pipeline_update_role_permission

所属模块：`流水线`

说明：更新流水线的角色permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_role_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "operation_query": "<operation_query>",
      "operation_execute": "<operation_execute>",
      "operation_update": "<operation_update>",
      "operation_delete": "<operation_delete>",
      "operation_authorize": "<operation_authorize>",
      "role_id": "<role_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `operation_query` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_query` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_execute` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_execute` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_execute`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_update` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_update` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_update`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_delete` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_delete` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_delete`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_authorize` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_authorize` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_authorize`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `role_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 流水线 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |

输入 JSON Schema：

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
    "operation_query": {
      "type": "boolean"
    },
    "operation_execute": {
      "type": "boolean"
    },
    "operation_update": {
      "type": "boolean"
    },
    "operation_delete": {
      "type": "boolean"
    },
    "operation_authorize": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "role_id": {
      "type": "integer"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "operation_query",
    "operation_execute",
    "operation_update",
    "operation_delete",
    "operation_authorize",
    "role_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_rule

所属模块：`流水线`

说明：更新流水线的规则。

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
      "content": "<content>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 流水线 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `plugin_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_id` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `plugin_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `plugin_version` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件版本号，用于指定安装、查询或运行的插件版本。 |
| `content` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 流水线 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：更新流水线的strategy。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 流水线 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `rules` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `rules` ↔ 原始 CodeArts 流水线 API 同名字段 `rules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`流水线`

说明：更新流水线的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `tag_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tag_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `color` | 是 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 流水线 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
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

### pipeline_update_template

所属模块：`流水线`

说明：更新流水线的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_template",
    "arguments": {
      "tenant_id": "<tenant_id>",
      "template_id": "<template_id>",
      "name": "<name>",
      "language": "<language>",
      "definition": "<definition>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 流水线 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 流水线 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `language` | 是 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 流水线 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
| `definition` | 是 | `string` |  | 字段对应：<br>MCP 字段 `definition` ↔ 原始 CodeArts 流水线 API 同名字段 `definition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_system` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_system` ↔ 原始 CodeArts 流水线 API 同名字段 `is_system`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否系统内置。true 表示系统预置资源，false 表示用户自定义资源。 |
| `domain_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `is_show_source` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_show_source` ↔ 原始 CodeArts 流水线 API 同名字段 `is_show_source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/tenant_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "language": {
      "type": "string",
      "minLength": 1
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "definition": {
      "type": "string",
      "minLength": 1
    },
    "is_system": {
      "type": "boolean"
    },
    "domain_id": {
      "$ref": "#/properties/tenant_id"
    },
    "is_show_source": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "template_id",
    "name",
    "language",
    "definition"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_third_party_notice

所属模块：`流水线`

说明：更新流水线的thirdpartynotice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_third_party_notice",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "notice_id": "<notice_id>",
      "notice_type": "<notice_type>",
      "notice_status": "<notice_status>",
      "send_url": "<send_url>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `notice_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `notice_id` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>notice ID，用于定位对应的 CodeArts 资源。 |
| `notice_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `notice_type` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_status` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `notice_status` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `send_url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `send_url` ↔ 原始 CodeArts 流水线 API 同名字段 `send_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>send URL，用于指定服务地址、资源地址或回调地址。 |
| `secret_info` | 否 | `string` |  | 字段对应：<br>MCP 字段 `secret_info` ↔ 原始 CodeArts 流水线 API 同名字段 `secret_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_events` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `notice_events` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_contents` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `notice_contents` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_contents`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `notice_users` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `notice_users` ↔ 原始 CodeArts 流水线 API 同名字段 `notice_users`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_index` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `sort_index` ↔ 原始 CodeArts 流水线 API 同名字段 `sort_index`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "notice_id": {
      "$ref": "#/properties/project_id"
    },
    "notice_type": {
      "type": "string",
      "minLength": 1
    },
    "notice_status": {
      "type": "boolean"
    },
    "send_url": {
      "type": "string",
      "minLength": 1
    },
    "secret_info": {
      "type": "string"
    },
    "notice_events": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "notice_contents": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "notice_users": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "sort_index": {
      "type": "integer"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "notice_id",
    "notice_type",
    "notice_status",
    "send_url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_user_permission

所属模块：`流水线`

说明：更新流水线的用户permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_user_permission",
    "arguments": {
      "project_id": "<project_id>",
      "pipeline_id": "<pipeline_id>",
      "operation_query": "<operation_query>",
      "operation_execute": "<operation_execute>",
      "operation_update": "<operation_update>",
      "operation_delete": "<operation_delete>",
      "operation_authorize": "<operation_authorize>",
      "user_id": "<user_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 流水线 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |
| `operation_query` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_query` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_execute` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_execute` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_execute`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_update` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_update` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_update`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_delete` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_delete` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_delete`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `operation_authorize` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `operation_authorize` ↔ 原始 CodeArts 流水线 API 同名字段 `operation_authorize`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 流水线 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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
    "operation_query": {
      "type": "boolean"
    },
    "operation_execute": {
      "type": "boolean"
    },
    "operation_update": {
      "type": "boolean"
    },
    "operation_delete": {
      "type": "boolean"
    },
    "operation_authorize": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "operation_query",
    "operation_execute",
    "operation_update",
    "operation_delete",
    "operation_authorize",
    "user_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_variable_group

所属模块：`流水线`

说明：更新流水线的变量组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 流水线 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 流水线 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 流水线 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 流水线 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `variables` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `variables` ↔ 原始 CodeArts 流水线 API 同名字段 `variables`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。 |
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

### pipeline_upload_plugin_icon

所属模块：`流水线`

说明：上传流水线的pluginicon。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_upload_plugin_icon",
    "arguments": {
      "domain_id": "<domain_id>",
      "plugin_name": "<plugin_name>",
      "file_name": "<file_name>",
      "file_content": "<file_content>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `plugin_name` ↔ 原始 CodeArts 流水线 API 同名字段 `plugin_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>插件名称。 |
| `file_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 流水线 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |
| `file_content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_content` ↔ 原始 CodeArts 流水线 API 同名字段 `file_content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `content_type` | 否 | `string` | "application/octet-stream" | 字段对应：<br>MCP 字段 `content_type` ↔ 原始 CodeArts 流水线 API 同名字段 `content_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "file_content": {
      "type": "string",
      "minLength": 1
    },
    "content_type": {
      "type": "string",
      "minLength": 1,
      "default": "application/octet-stream"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "file_name",
    "file_content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_upload_publisher_icon

所属模块：`流水线`

说明：上传流水线的publishericon。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_upload_publisher_icon",
    "arguments": {
      "domain_id": "<domain_id>",
      "publisher_en_name": "<publisher_en_name>",
      "file_name": "<file_name>",
      "file_content": "<file_content>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 流水线 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `publisher_en_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `publisher_en_name` ↔ 原始 CodeArts 流水线 API 同名字段 `publisher_en_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>publisheren名称。 |
| `file_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 流水线 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |
| `file_content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_content` ↔ 原始 CodeArts 流水线 API 同名字段 `file_content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `content_type` | 否 | `string` | "application/octet-stream" | 字段对应：<br>MCP 字段 `content_type` ↔ 原始 CodeArts 流水线 API 同名字段 `content_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "publisher_en_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "file_content": {
      "type": "string",
      "minLength": 1
    },
    "content_type": {
      "type": "string",
      "minLength": 1,
      "default": "application/octet-stream"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "publisher_en_name",
    "file_name",
    "file_content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

