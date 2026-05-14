# CodeArts MCP 函数 API 参考 - 代码检查

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`代码检查`

API 数量：`18`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### check_create_task

所属模块：`代码检查`

说明：创建代码检查的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_name` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务名称。 |
| `git_url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `git_url` ↔ 原始 CodeArts 代码检查 API 同名字段 `git_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>git URL，用于指定服务地址、资源地址或回调地址。 |
| `git_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `git_branch` ↔ 原始 CodeArts 代码检查 API 同名字段 `git_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于代码检查、构建或流水线运行时指定代码来源分支。 |
| `language` | 是 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 代码检查 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `rule_set_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `rule_set_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `rule_set_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则集 ID，用于定位对应的 CodeArts 资源。 |
| `resource_pool_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `resource_pool_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `resource_pool_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源池 ID，用于定位对应的 CodeArts 资源。 |
| `resource_pool_type` | 否 | `"default" \| "custom"` |  | 字段对应：<br>MCP 字段 `resource_pool_type` ↔ 原始 CodeArts 代码检查 API 同名字段 `resource_pool_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源池类型，用于选择构建、检查或部署使用的执行资源池。可选值：`default`、`custom`。 |
| `include_paths` | 否 | `string` |  | 字段对应：<br>MCP 字段 `include_paths` ↔ 原始 CodeArts 代码检查 API 同名字段 `include_paths`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>包含路径列表，代码检查或扫描时只分析这些路径下的文件。 |
| `exclude_dir` | 否 | `string` |  | 字段对应：<br>MCP 字段 `exclude_dir` ↔ 原始 CodeArts 代码检查 API 同名字段 `exclude_dir`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排除目录列表，代码检查或扫描时跳过这些目录。 |
| `task_type` | 否 | `"full" \| "incremental"` |  | 字段对应：<br>MCP 字段 `task_type` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务类型，用于区分构建任务、检查任务、部署任务或测试任务。可选值：`full`、`incremental`。 |
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
    "resource_pool_id": {
      "$ref": "#/properties/project_id"
    },
    "resource_pool_type": {
      "type": "string",
      "enum": [
        "default",
        "custom"
      ]
    },
    "include_paths": {
      "type": "string",
      "minLength": 1
    },
    "exclude_dir": {
      "type": "string",
      "minLength": 1
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

所属模块：`代码检查`

说明：获取代码检查的metrics。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_task

所属模块：`代码检查`

说明：获取代码检查的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_get_task_progress

所属模块：`代码检查`

说明：获取代码检查的任务progress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task_progress",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_get_task_resource_pool

所属模块：`代码检查`

说明：获取代码检查的任务资源pool。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task_resource_pool",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_get_task_ruleset_check_parameters_v2

所属模块：`代码检查`

说明：获取代码检查的任务ruleset检查参数v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task_ruleset_check_parameters_v2",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>",
      "ruleset_id": "<ruleset_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `ruleset_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ruleset_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `ruleset_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ruleset ID，用于定位对应的 CodeArts 资源。 |

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
    },
    "ruleset_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_id",
    "ruleset_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_task_ruleset_check_parameters_v3

所属模块：`代码检查`

说明：获取代码检查的任务ruleset检查参数v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task_ruleset_check_parameters_v3",
    "arguments": {
      "project_id": "<project_id>",
      "task_id": "<task_id>",
      "ruleset_id": "<ruleset_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `ruleset_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ruleset_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `ruleset_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ruleset ID，用于定位对应的 CodeArts 资源。 |

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
    },
    "ruleset_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "task_id",
    "ruleset_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_task_settings

所属模块：`代码检查`

说明：获取代码检查的任务settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task_settings",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_list_rulesets

所属模块：`代码检查`

说明：查询代码检查的rulesets。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码检查 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码检查 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码检查 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `language` | 否 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 代码检查 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |

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

### check_list_task_branches

所属模块：`代码检查`

说明：查询代码检查的任务分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_branches",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_list_task_issues

所属模块：`代码检查`

说明：查询代码检查的任务工作项。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码检查 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码检查 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码检查 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `severity` | 否 | `string` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 代码检查 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。 |
| `defect_level` | 否 | `string` |  | 字段对应：<br>MCP 字段 `defect_level` ↔ 原始 CodeArts 代码检查 API 同名字段 `defect_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>缺陷等级或问题等级，用于代码检查问题过滤；常见值按服务端规则集返回为准。 |
| `rule_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `rule_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则 ID，用于定位对应的 CodeArts 资源。 |
| `rule_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `rule_name` ↔ 原始 CodeArts 代码检查 API 同名字段 `rule_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>规则名称。 |
| `file_path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码检查 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 代码检查 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `checker` | 否 | `string` |  | 字段对应：<br>MCP 字段 `checker` ↔ 原始 CodeArts 代码检查 API 同名字段 `checker`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>检查规则或检查器名称，用于代码检查问题过滤。 |

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
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "severity": {
      "type": "string",
      "minLength": 1
    },
    "defect_level": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_name": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "checker": {
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

### check_list_task_jobs

所属模块：`代码检查`

说明：查询代码检查的任务任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_jobs",
    "arguments": {
      "task_id": "<task_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_list_task_rulesets_v2

所属模块：`代码检查`

说明：查询代码检查的任务rulesetsv2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_rulesets_v2",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_list_task_rulesets_v3

所属模块：`代码检查`

说明：查询代码检查的任务rulesetsv3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_rulesets_v3",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### check_list_tasks

所属模块：`代码检查`

说明：查询代码检查的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码检查 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码检查 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码检查 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码检查 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码检查 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_request_official_api

所属模块：`代码检查`

说明：执行代码检查的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 代码检查 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码检查 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码检查 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码检查 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### check_run_task

所属模块：`代码检查`

说明：运行代码检查的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码检查 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "ref": {
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

所属模块：`代码检查`

说明：停止代码检查的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 代码检查 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

