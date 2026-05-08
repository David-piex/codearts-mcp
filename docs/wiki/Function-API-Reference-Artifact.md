# CodeArts MCP 函数 API 参考 - 制品仓

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`制品仓`

API 数量：`19`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### artifact_delete_file

所属模块：`制品仓`

说明：删除制品仓的文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 制品仓 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `format` | 是 | `string` |  | 字段对应：<br>MCP 字段 `format` ↔ 原始 CodeArts 制品仓 API 同名字段 `format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。 |
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

所属模块：`制品仓`

说明：获取制品仓的下载url。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 制品仓 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `format` | 是 | `string` |  | 字段对应：<br>MCP 字段 `format` ↔ 原始 CodeArts 制品仓 API 同名字段 `format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。 |

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

所属模块：`制品仓`

说明：获取制品仓的文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 制品仓 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `format` | 是 | `string` |  | 字段对应：<br>MCP 字段 `format` ↔ 原始 CodeArts 制品仓 API 同名字段 `format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。 |

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

所属模块：`制品仓`

说明：获取制品仓的文件树。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `path` | 否 | `string` | "/" | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 制品仓 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |

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
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "default": "/"
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

所属模块：`制品仓`

说明：获取制品仓的仓库。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 制品仓 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

输入 JSON Schema：

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

所属模块：`制品仓`

说明：查询制品仓的构建archives。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |

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
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_files

所属模块：`制品仓`

说明：查询制品仓的文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |

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

所属模块：`制品仓`

说明：查询制品仓的最新版本文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### artifact_list_repositories

所属模块：`制品仓`

说明：查询制品仓的仓库。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `qname` | 否 | `string` |  | 字段对应：<br>MCP 字段 `qname` ↔ 原始 CodeArts 制品仓 API 同名字段 `qname`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库名称查询关键字，用于按仓库名模糊搜索。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 制品仓 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `format` | 否 | `string` |  | 字段对应：<br>MCP 字段 `format` ↔ 原始 CodeArts 制品仓 API 同名字段 `format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。 |
| `format_list` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `format_list` ↔ 原始 CodeArts 制品仓 API 同名字段 `format_list`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式列表，用于一次按多个仓库格式过滤。 |
| `is_recycle_bin` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_recycle_bin` ↔ 原始 CodeArts 制品仓 API 同名字段 `is_recycle_bin`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否查询回收站。true 表示查询已删除或回收站中的制品仓资源。 |

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
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "qname": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    },
    "format_list": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "is_recycle_bin": {
      "type": "boolean"
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

所属模块：`制品仓`

说明：查询制品仓的版本。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### artifact_request_official_api

所属模块：`制品仓`

说明：执行制品仓的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 制品仓 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 制品仓 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 制品仓 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 制品仓 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### artifact_search_artifacts

所属模块：`制品仓`

说明：搜索制品仓的制品。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `artifact_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `artifact_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `artifact_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品名称。 |
| `repo_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

所属模块：`制品仓`

说明：执行制品仓的审计日志。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 制品仓 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 制品仓 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 制品仓 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 制品仓 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `module` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module` ↔ 原始 CodeArts 制品仓 API 同名字段 `module`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块名称或模块标识，用于按功能模块过滤或定位资源。 |
| `repo` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo` ↔ 原始 CodeArts 制品仓 API 同名字段 `repo`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称或仓库标识，用于定位代码仓或制品仓资源。 |
| `user_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `instance_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `instance_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `instance_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>实例 ID，用于定位对应的 CodeArts 资源。 |
| `format` | 否 | `string` |  | 字段对应：<br>MCP 字段 `format` ↔ 原始 CodeArts 制品仓 API 同名字段 `format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。 |
| `resource_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `resource_id` ↔ 原始 CodeArts 制品仓 API 同名字段 `resource_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，用于定位审计、附件、制品或业务资源。具体资源类型由所在 API 决定。 |

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

### artifact_show_domain_release_repo_storage

所属模块：`制品仓`

说明：执行制品仓的领域发布repostorage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_domain_release_repo_storage",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `package_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `package_type` ↔ 原始 CodeArts 制品仓 API 同名字段 `package_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "minLength": 1
    },
    "package_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_show_latest_version_files_count

所属模块：`制品仓`

说明：执行制品仓的最新版本文件数量。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_latest_version_files_count",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 制品仓 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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
    "status": {
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

### artifact_show_package_data_detail

所属模块：`制品仓`

说明：执行制品仓的packagedata详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_package_data_detail",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_show_package_info

所属模块：`制品仓`

说明：执行制品仓的package信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_package_info",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_show_project_storage_info

所属模块：`制品仓`

说明：执行制品仓的项目storage信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_project_storage_info",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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

### artifact_show_project_versions_count

所属模块：`制品仓`

说明：执行制品仓的项目版本数量。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_project_versions_count",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 制品仓 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 制品仓 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 制品仓 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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
    "status": {
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

