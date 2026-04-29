# CodeArts MCP 函数 API 参考

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## 通用调用结构

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

## 模块目录

| 模块 | API 数量 |
| --- | ---: |
| 制品仓 | 12 |
| 鉴权会话 | 2 |
| 编译构建 | 22 |
| 代码检查 | 8 |
| 部署 | 59 |
| 流水线 | 77 |
| 代码仓库 | 30 |
| 需求管理 | 200 |
| 测试计划 | 7 |
| **总计** | **417** |

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
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 资源名称。 |
| `path` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `format` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 资源名称。 |
| `path` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `format` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 资源名称。 |
| `path` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `format` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 资源名称。 |
| `path` | 否 | `string` | "/" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `repo_name` | 是 | `string` |  | 资源名称。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `qname` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `format` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `format_list` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_recycle_bin` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `artifact_name` | 是 | `string` |  | 资源名称。 |
| `repo_name` | 否 | `string` |  | 资源名称。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `repo` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `user_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `instance_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `format` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `resource_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

### auth_clear_session

所属模块：`鉴权会话`

说明：清除当前 MCP 会话中保存的华为云凭据。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {}
}
```

### auth_configure_session

所属模块：`鉴权会话`

说明：配置当前 MCP 会话使用的华为云 AK/SK、区域和可选服务地址。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `access_key` | 是 | `string` |  | 华为云访问密钥 ID，用于当前 MCP 会话鉴权。 |
| `secret_key` | 是 | `string` |  | 华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。 |
| `region` | 是 | `string` |  | 华为云区域标识，例如 cn-north-4。 |
| `req_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `repo_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `pipeline_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `check_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `testplan_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `deploy_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `build_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `artifact_base_url` | 否 | `string` |  | 服务地址或资源 URL。 |

输入 JSON Schema：

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

### build_append_job_step

所属模块：`编译构建`

说明：追加编译构建的任务步骤。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 是 | `string` |  | 资源名称。 |
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `enable` | 否 | `boolean` | true | 请参考字段名和上游 CodeArts API 语义填写。 |
| `version` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `image` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `command` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `pre_condition` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `properties` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `insert_after_step_name` | 否 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：追加编译构建的发布上传步骤。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `path` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `package_name` | 否 | `string` |  | 资源名称。 |
| `package_version` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `custom_upload_path` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `upload_tool` | 否 | `string` | "curl" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `continue_on_failure` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 资源名称。 |
| `pre_condition` | 否 | `string` | "SUCCESS" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `insert_after_step_name` | 否 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：配置编译构建的发布上传步骤。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 资源名称。 |
| `file` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `package_name` | 否 | `string` |  | 资源名称。 |
| `build_version` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `custom_upload_path` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `upload_tool` | 否 | `string` | "curl" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `remain_origin_path` | 否 | `string` | "FLAT" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `pre_condition` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的错误日志。

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
      "build_no": "<build_no>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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

所属模块：`编译构建`

说明：获取编译构建的full阶段。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `cascade` | 否 | `boolean` | true | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的历史详情。

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
      "build_number": "<build_number>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_number` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的信息记录。

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
      "build_no": "<build_no>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的项目记录统计。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `build_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的realtime日志。

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
      "build_no": "<build_no>",
      "offset": "<offset>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `offset` | 是 | `integer` |  | 分页偏移量。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的记录流程图。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：获取编译构建的记录脚本。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：查询编译构建的构建参数。

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
      "build_no": "<build_no>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：查询编译构建的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

### build_list_project_records

所属模块：`编译构建`

说明：查询编译构建的项目记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `build_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`编译构建`

说明：查询编译构建的记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`编译构建`

说明：准备编译构建的deployableNode应用。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### build_prepare_node_runtime_bundle

所属模块：`编译构建`

说明：准备编译构建的Noderuntimebundle。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 否 | `string` |  | 资源名称。 |
| `output_file` | 否 | `string` | "codearts-mcp.tgz" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `staging_dir` | 否 | `string` | ".release-bundle" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `replace_existing` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：运行编译构建的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：停止编译构建的任务。

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
      "build_no": "<build_no>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`编译构建`

说明：更新编译构建的任务步骤。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_name` | 是 | `string` |  | 资源名称。 |
| `git_url` | 是 | `string` |  | 服务地址或资源 URL。 |
| `git_branch` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `language` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `rule_set_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `resource_pool_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `resource_pool_type` | 否 | `"default" \| "custom"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`default`、`custom`。 |
| `include_paths` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `exclude_dir` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `task_type` | 否 | `"full" \| "incremental"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`full`、`incremental`。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `language` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `severity` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `defect_level` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `rule_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_name` | 否 | `string` |  | 资源名称。 |
| `file_path` | 否 | `string` |  | 仓库内文件路径。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `checker` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `ref` | 否 | `string` |  | Git 引用，可以是分支、标签或提交 SHA。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### deploy_add_v4_environment_hosts

所属模块：`部署`

说明：添加部署的v4环境主机。

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
      "host_ids": "<host_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `cluster_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：取消部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reason` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `operator` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
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

所属模块：`部署`

说明：创建部署的application。

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
      "arrange_infos": "<arrange_infos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` | "" | 资源描述信息。 |
| `timeout` | 否 | `number \| null` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `slave_cluster_id` | 否 | `string` | "" | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `slave_resource_type` | 否 | `string` | "" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `create_type` | 否 | `string` | "template" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_draft` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `group_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `agency_urn` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `arrange_infos` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/project_id"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "params": {
                  "type": "string"
                },
                "entrance": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "module_id": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            },
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

所属模块：`部署`

说明：创建部署的环境。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `os` | 否 | `string` | "linux" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `deploy_type` | 否 | `integer` | 0 | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：创建部署的任务by模板。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `project_name` | 是 | `string` |  | 资源名称。 |
| `template_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `task_name` | 是 | `string` |  | 资源名称。 |
| `configs` | 否 | `array<object>` | [] | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：删除部署的v4集群主机。

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
      "host_ids": "<host_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：删除部署的v4环境主机。

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
      "host_ids": "<host_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的应用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的应用日志。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `string` | "0" | 分页偏移量。 |
| `end_offset` | 否 | `string` | "0" | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的部署来源详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_execution_params

所属模块：`部署`

说明：获取部署的执行params。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的历史详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的主机组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的last记录详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `orchestration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的runtime变量。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的状态。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_template_detail

所属模块：`部署`

说明：获取部署的模板详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `task_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4集群。

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
      "cluster_type": "<cluster_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`host`、`container`。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4集群数量。

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
      "cluster_type": "<cluster_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`host`、`container`。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4集群主机。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `host_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4部署记录步骤详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4部署记录步骤日志。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `string \| number` |  | 分页偏移量。 |
| `limit` | 否 | `integer` |  | 分页数量上限。 |
| `start_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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
    "offset": {
      "type": [
        "string",
        "number"
      ]
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000
    },
    "start_time": {
      "type": "string"
    },
    "end_time": {
      "type": "string"
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

所属模块：`部署`

说明：获取部署的v4环境。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：获取部署的v4环境资源详情。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：导入部署的主机to环境。

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
      "host_ids": "<host_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `group_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的应用主机组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

所属模块：`部署`

说明：查询部署的应用operations日志。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `app_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `page_index` | 否 | `integer` | 1 | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的应用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

### deploy_list_deployment_units

所属模块：`部署`

说明：查询部署的deploymentunits。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的环境主机。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `key_field` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `as_proxy` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/application_id"
    },
    "key_field": {
      "type": "string",
      "minLength": 1
    },
    "as_proxy": {
      "type": "boolean"
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

所属模块：`部署`

说明：查询部署的环境。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

所属模块：`部署`

说明：查询部署的histories。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `start_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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

所属模块：`部署`

说明：查询部署的主机组环境。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`部署`

说明：查询部署的主机组主机。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

所属模块：`部署`

说明：查询部署的主机组。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

### deploy_list_system_configs

所属模块：`部署`

说明：查询部署的system配置。

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

### deploy_list_tasks

所属模块：`部署`

说明：查询部署的任务。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

### deploy_list_v4_applications

所属模块：`部署`

说明：查询部署的v4applications。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的v4集群主机。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `limit` | 否 | `integer` |  | 分页数量上限。 |
| `offset` | 否 | `integer` |  | 分页偏移量。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `ip` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `os` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `connection_status` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "keyword": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "status": {
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
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "ip": {
      "type": "string"
    },
    "os": {
      "type": "string"
    },
    "connection_status": {
      "type": "string"
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

所属模块：`部署`

说明：查询部署的v4集群。

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
      "cluster_type": "<cluster_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `limit` | 否 | `integer` |  | 分页数量上限。 |
| `offset` | 否 | `integer` |  | 分页偏移量。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`host`、`container`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "keyword": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "status": {
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
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
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

### deploy_list_v4_deploy_records

所属模块：`部署`

说明：查询部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的v4环境applications。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的v4环境主机。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `environment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的v4环境。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的v4编排。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `app_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的变量历史。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_list_variables

所属模块：`部署`

说明：查询部署的变量。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_modify_application

所属模块：`部署`

说明：修改部署的application。

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
      "arrange_infos": "<arrange_infos>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` | "" | 资源描述信息。 |
| `timeout` | 否 | `number \| null` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `slave_cluster_id` | 否 | `string` | "" | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `slave_resource_type` | 否 | `string` | "" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `create_type` | 否 | `string` | "template" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_draft` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `group_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `agency_urn` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `arrange_infos` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/id"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "params": {
                  "type": "string"
                },
                "entrance": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "module_id": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            },
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

所属模块：`部署`

说明：通过部署的v4人工检查。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：查询部署的变量。

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

参数：

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_refuse_v4_manual_check

所属模块：`部署`

说明：拒绝部署的v4人工检查。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：执行部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reason` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `operator` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
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

所属模块：`部署`

说明：重试部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reason` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `operator` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
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

所属模块：`部署`

说明：回滚部署的应用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：回滚部署的v4部署记录。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `reason` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `operator` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `body` | 否 | `object` | {} | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
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

所属模块：`部署`

说明：启动部署的应用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `trigger_source` | 否 | `0 \| 1 \| "0" \| "1"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`0`、`1`、`0`、`1`。 |
| `params` | 否 | `array<object>` | [] | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`部署`

说明：停止部署的应用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `task_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `pipeline_group_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | 资源名称。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `url` | 否 | `string` |  | 远程仓库或镜像地址。 |
| `authorization` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `data` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `parent_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `rules` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `layout_content` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plugin_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 否 | `string` |  | 资源名称。 |
| `plugin_version` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `content` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `rules` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `color` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `variables` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `uuid` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tag_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `uuid` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 资源名称。 |
| `display_name` | 是 | `string` |  | 资源名称。 |
| `version` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plugin_attribution` | 是 | `"custom" \| "official"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`custom`、`official`。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 资源名称。 |
| `display_name` | 是 | `string` |  | 资源名称。 |
| `version` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plugin_attribution` | 是 | `"custom" \| "official"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`custom`、`official`。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 资源名称。 |
| `version` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_run_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `cloud_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rules` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_valid` | 是 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 是 | `string` |  | 资源名称。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `locations` | 是 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | 资源名称。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `product_line` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `tags` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 是 | `string` |  | 资源名称。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `plugin_attribution` | 否 | `"custom" \| "official"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`custom`、`official`。 |
| `business_type` | 否 | `array<"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal">` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `maintainer` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plugin_name` | 否 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `offset` | 是 | `integer` |  | 分页偏移量。 |
| `limit` | 是 | `integer` |  | 分页数量上限。 |
| `include_tenant_rule_set` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `is_valid` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `organization_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 是 | `integer` |  | 分页偏移量。 |
| `limit` | 是 | `integer` |  | 分页数量上限。 |
| `cloud_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `name` | 否 | `string` |  | 资源名称。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `use_condition` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `business_type` | 否 | `array<"Build" \| "Gate" \| "Deploy" \| "Test" \| "Normal">` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`Build`、`Gate`、`Deploy`、`Test`、`Normal`。 |
| `deploy_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `comp_extend_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 是 | `integer` |  | 分页偏移量。 |
| `limit` | 是 | `integer` |  | 分页数量上限。 |
| `include_tenant_rule_set` | 否 | `boolean` | true | 请参考字段名和上游 CodeArts API 语义填写。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `is_valid` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `proj_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `tenant_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `language` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_system` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 否 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `group_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `pipelines` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `job_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `pipeline_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `tag_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `pipeline_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `run_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `is_valid` | 是 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `is_valid` | 是 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `uuid` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `region_name` | 否 | `string` |  | 资源名称。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 资源名称。 |
| `url` | 否 | `string` |  | 远程仓库或镜像地址。 |
| `authorization` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `data` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `rules` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plugin_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `plugin_name` | 否 | `string` |  | 资源名称。 |
| `plugin_version` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `content` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rule_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `rules` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tag_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `color` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `variables` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_associate_remote_mirror

所属模块：`代码仓库`

说明：关联代码仓远程镜像地址。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_associate_remote_mirror",
    "arguments": {
      "repository_id": "<repository_id>",
      "url": "<url>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `url` | 是 | `string` |  | 远程仓库或镜像地址。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "url": {
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
    "url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_close_merge_request

所属模块：`代码仓库`

说明：关闭代码仓库的合并请求请求。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：对比代码仓库的引用。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `from` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `to` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `straight` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `ignore_whitespace_change` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `view` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：创建代码仓库的合并请求请求。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `source_branch` | 是 | `string` |  | 源分支名称。 |
| `target_branch` | 是 | `string` |  | 目标分支名称。 |
| `title` | 是 | `string` |  | 标题。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `target_project_id` | 否 | `string` |  | 目标项目 ID。 |
| `assignee_id` | 否 | `string \| integer` |  | 负责人用户 ID。 |
| `reviewer_ids` | 否 | `array<string \| integer>` |  | 评审人用户 ID 列表。 |
| `remove_source_branch` | 否 | `boolean` |  | 合并后是否删除源分支。 |
| `squash` | 否 | `boolean` |  | 是否压缩提交。 |
| `draft` | 否 | `boolean` |  | 是否创建为草稿合并请求。 |
| `labels` | 否 | `string \| array<string>` |  | 标签列表或逗号分隔的标签字符串。 |
| `milestone_id` | 否 | `string \| integer` |  | 里程碑 ID。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "target_project_id": {
      "$ref": "#/properties/repository_id"
    },
    "assignee_id": {
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
    "reviewer_ids": {
      "type": "array",
      "items": {
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
      }
    },
    "remove_source_branch": {
      "type": "boolean"
    },
    "squash": {
      "type": "boolean"
    },
    "draft": {
      "type": "boolean"
    },
    "labels": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          }
        }
      ]
    },
    "milestone_id": {
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

所属模块：`代码仓库`

说明：创建代码仓库的合并请求请求讨论。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |
| `body` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：创建代码仓库的仓库。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | CodeArts 项目的 UUID，用于创建代码仓或定位项目资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `import_members` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `template_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `visibility_level` | 否 | `0 \| 20` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`0`、`20`。 |
| `import_url` | 否 | `string` |  | 服务地址或资源 URL。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `gitignore_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `license_id` | 否 | `integer` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `enable_readme` | 否 | `boolean \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `caller` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：创建代码仓库的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `tag_name` | 是 | `string` |  | 标签名称。 |
| `ref` | 是 | `string` |  | Git 引用，可以是分支、标签或提交 SHA。 |
| `message` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：删除代码仓库的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `tag_name` | 是 | `string` |  | 标签名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：获取代码仓库的分支。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `branch_name` | 是 | `string` |  | 分支名称。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：获取代码仓库的提交。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `commit_sha` | 是 | `string` |  | 提交 SHA。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：获取代码仓库的文件。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `file_path` | 是 | `string` |  | 仓库内文件路径。 |
| `branch` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：获取代码仓库的合并请求请求。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |

输入 JSON Schema：

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

### repo_get_remote_mirror

所属模块：`代码仓库`

说明：获取代码仓远程镜像配置和同步状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_remote_mirror",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

### repo_get_repository

所属模块：`代码仓库`

说明：获取代码仓库的仓库。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

### repo_get_tag

所属模块：`代码仓库`

说明：获取代码仓库的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `tag_name` | 是 | `string` |  | 标签名称。 |

输入 JSON Schema：

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

所属模块：`代码仓库`

说明：查询代码仓库的分支。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的提交。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `ref_name` | 否 | `string` |  | 资源名称。 |
| `since` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `until` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `order_by_date` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `with_stats` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ref_name": {
      "type": "string"
    },
    "since": {
      "type": "string"
    },
    "until": {
      "type": "string"
    },
    "order_by_date": {
      "type": "boolean"
    },
    "with_stats": {
      "type": "boolean"
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

所属模块：`代码仓库`

说明：查询代码仓库的events。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求changes。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求讨论。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `state` | 否 | `"all" \| "opened" \| "closed" \| "merged"` |  | 状态过滤条件或目标状态。可选值：`all`、`opened`、`closed`、`merged`。 |

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

### repo_list_personal_repository_import_records

所属模块：`代码仓库`

说明：查询当前用户的代码仓导入记录。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_personal_repository_import_records",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `state` | 否 | `"finished" \| "fail" \| "importing"` |  | 状态过滤条件或目标状态。可选值：`finished`、`fail`、`importing`。 |
| `source_type` | 否 | `"gitee" \| "self_managed_gitlab" \| "gitlab" \| "github" \| "git" \| "svn" \| "coding" \| "bitbucket" \| "gerrit" \| "codeup"` |  | 导入来源类型，例如 gitee、github、gitlab、git、svn 等。可选值：`gitee`、`self_managed_gitlab`、`gitlab`、`github`、`git`、`svn`、`coding`、`bitbucket`、`gerrit`、`codeup`。 |
| `created_after` | 否 | `string` |  | 创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `created_before` | 否 | `string` |  | 创建时间上界，通常使用 ISO 8601 时间字符串。 |
| `finished_after` | 否 | `string` |  | 完成时间下界，通常使用 ISO 8601 时间字符串。 |
| `finished_before` | 否 | `string` |  | 完成时间上界，通常使用 ISO 8601 时间字符串。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `order_by` | 否 | `"created_at" \| "source_repo_name" \| "size"` |  | 排序字段。用于选择服务端排序字段。可选值：`created_at`、`source_repo_name`、`size`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |

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
    "state": {
      "type": "string",
      "enum": [
        "finished",
        "fail",
        "importing"
      ]
    },
    "source_type": {
      "type": "string",
      "enum": [
        "gitee",
        "self_managed_gitlab",
        "gitlab",
        "github",
        "git",
        "svn",
        "coding",
        "bitbucket",
        "gerrit",
        "codeup"
      ]
    },
    "created_after": {
      "type": "string",
      "minLength": 1
    },
    "created_before": {
      "type": "string",
      "minLength": 1
    },
    "finished_after": {
      "type": "string",
      "minLength": 1
    },
    "finished_before": {
      "type": "string",
      "minLength": 1
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "order_by": {
      "type": "string",
      "enum": [
        "created_at",
        "source_repo_name",
        "size"
      ]
    },
    "sort": {
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

### repo_list_protected_branches

所属模块：`代码仓库`

说明：查询代码仓库的保护分支。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的仓库。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

### repo_list_repository_labels

所属模块：`代码仓库`

说明：查询代码仓库的仓库标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

所属模块：`代码仓库`

说明：查询代码仓库的标签。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |

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

所属模块：`代码仓库`

说明：合并代码仓库的合并请求请求。

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

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |
| `squash` | 否 | `boolean` |  | 是否压缩提交。 |
| `force_merge` | 否 | `boolean` |  | 是否强制合并。 |
| `sha` | 否 | `string` |  | 提交 SHA，用于校验合并请求头部提交。 |
| `merge_commit_message` | 否 | `string` |  | 合并提交信息。 |
| `squash_commit_message` | 否 | `string` |  | 压缩提交信息。 |
| `should_remove_source_branch` | 否 | `boolean` |  | 合并后是否删除源分支。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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
    "sha": {
      "type": "string",
      "minLength": 1
    },
    "merge_commit_message": {
      "type": "string",
      "minLength": 1
    },
    "squash_commit_message": {
      "type": "string",
      "minLength": 1
    },
    "should_remove_source_branch": {
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

所属模块：`代码仓库`

说明：评审代码仓库的合并请求请求。

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
      "action_type": "<action_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `merge_request_iid` | 是 | `string` |  | 合并请求在仓库内的 IID。 |
| `action_type` | 是 | `"approve" \| "reject" \| "reset"` |  | 评审动作类型。可选值：`approve`、`reject`、`reset`。 |
| `approver_comment` | 否 | `string` |  | 评审意见。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

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

### repo_start_remote_mirror_synchronization

所属模块：`代码仓库`

说明：启动代码仓远程镜像同步任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_start_remote_mirror_synchronization",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `username` | 否 | `string` |  | 远程镜像认证用户名。按官方接口要求需要传入 base64 后的值。 |
| `password` | 否 | `string` |  | 远程镜像认证密码。按官方接口要求需要传入 base64 后的值。 |
| `endpoint_uuid` | 否 | `string` |  | 服务端点 UUID，用于远程镜像认证或网络访问配置。 |
| `force_fetch` | 否 | `boolean` |  | 是否强制拉取远端镜像。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "username": {
      "type": "string",
      "minLength": 1
    },
    "password": {
      "type": "string",
      "minLength": 1
    },
    "endpoint_uuid": {
      "type": "string",
      "minLength": 1
    },
    "force_fetch": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_remote_mirror

所属模块：`代码仓库`

说明：更新代码仓远程镜像配置。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_remote_mirror",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。 |
| `url` | 否 | `string` |  | 远程仓库或镜像地址。 |
| `sync_branch_type` | 否 | `"all" \| "default"` |  | 远程镜像同步分支范围，all 表示全部分支，default 表示默认分支。可选值：`all`、`default`。 |
| `mirroring_enabled` | 否 | `boolean` |  | 是否启用远程镜像。 |
| `endpoint_uuid` | 否 | `string` |  | 服务端点 UUID，用于远程镜像认证或网络访问配置。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "url": {
      "type": "string",
      "minLength": 1
    },
    "sync_branch_type": {
      "type": "string",
      "enum": [
        "all",
        "default"
      ]
    },
    "mirroring_enabled": {
      "type": "boolean"
    },
    "endpoint_uuid": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `domain_name` | 否 | `string` |  | 资源名称。 |
| `role_id` | 否 | `number \| integer` |  | 项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `content` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `members` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issues` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_config_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `is_permanent_delete` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `src_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `flow_code` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_recover` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `process_context` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `attribute` | 是 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `baseline` | 是 | `"baselined" \| "unbaseline" \| "baseline-reviewing"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`baselined`、`unbaseline`、`baseline-reviewing`。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `operate` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `move_to_sprint_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `name` | 是 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status_name` | 是 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `from_project_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `to_project_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `work_item_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `copy_comments` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `copy_work_hours` | 否 | `boolean` | false | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_ids` | 否 | `array<integer>` |  | Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category` | 否 | `string` | "CR" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `title` | 是 | `string` |  | 标题。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `need_approval` | 是 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `status` | 是 | `object` |  | 状态过滤条件或目标状态。 |
| `cc` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `cos` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_start_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `extra_fields` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。 |
| `description` | 是 | `string` |  | 资源描述信息。 |
| `category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `assignee` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `src_domain` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `submitted_by` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `domain_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `recipient` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `expect_delivery_time` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `priority` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `assigned_cc` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_pi` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_iteration` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_start_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `workload_man_day` | 否 | `number` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `business_domain` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `need_break` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `extra_fields` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `label_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `color` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `title` | 是 | `string` |  | 标题。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `assignee` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `operate_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `domain_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 标题。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `category` | 是 | `"BR" \| "GR"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`BR`、`GR`。 |
| `need_approval` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_start_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `status` | 是 | `string` |  | 状态过滤条件或目标状态。 |
| `cc` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `attachWikis` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `attachDocuments` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `ccbs` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `opinions` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `cos` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `local_attachment_names` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `extra_fields` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `work_date_begin` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_date_end` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hours` | 是 | `string \| number` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hour_type` | 是 | `integer \| string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `include_weekend` | 是 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hour_category` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `begin_time` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_time` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 是 | `string` |  | 标题。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。 |
| `assigned_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `done_ratio` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `expected_work_hours` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `due_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 是 | `string` |  | 标题。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `iteration_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `assigned_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `done_ratio` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `expected_work_hours` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `due_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `domain_name` | 是 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_name` | 是 | `string` |  | 资源名称。 |
| `owner_user_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `parent_module_id` | 否 | `integer` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `defined_name` | 是 | `string` |  | 资源名称。 |
| `status_attribute` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。 |
| `category` | 是 | `"PI" \| "Iteration" \| "PlanMilestone"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`PI`、`Iteration`、`PlanMilestone`。 |
| `plan_start_date` | 是 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 是 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `parent_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `workload` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `owner` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `title` | 是 | `string` |  | 标题。 |
| `work_item_type` | 是 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `parent_work_item_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `iteration_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。 |
| `assigned_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `done_ratio` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `expected_work_hours` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `due_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `attachment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `category` | 否 | `string` | "CR" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `feature_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `file_name` | 是 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `label_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `workhour_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `template_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `attachment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `image_uri` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `attachment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `file_name` | 是 | `string` |  | 资源名称。 |
| `field_code` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `is_src` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `version` | 否 | `"v1" \| "v2"` | "v2" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`v1`、`v2`。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `code` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `category` | 是 | `"CR" \| "BR" \| "GR"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`CR`、`BR`、`GR`。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `classification` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `created_date` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `code` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `field_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `program_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `ir_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `date_range` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `metric_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dividend` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `divisor` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `date_range` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `metric_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `sprint_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `dividend` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `divisor` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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

说明：获取需求管理的工作项工作项详情。

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `include` | 否 | `string` | "children,parent" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `group_field_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `is_project_group` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `group_sort` | 否 | `"asc" \| "desc"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`asc`、`desc`。 |
| `filter` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`OR_AND`、`AND_OR`。 |
| `sort` | 否 | `array<object>` |  | 排序方向。asc 表示升序，desc 表示降序。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `string` | "commit" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `board_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `created_time_interval` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 否 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `type` | 否 | `string` | "backlog" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `subject` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `query_type` | 否 | `string` | "basic" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `category` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `snapshot_version_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `source_project_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `number` | 否 | `array<string>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `modified_date` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `filter` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`OR_AND`、`AND_OR`。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `filter` | 否 | `array<object>` | [] | 请参考字段名和上游 CodeArts API 语义填写。 |
| `sort` | 否 | `array<object>` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `page` | 否 | `object` | {"page_no":1,"page_size":200} | 页码。用于 page/page_size 分页。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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

无参数。

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `type` | 是 | `"CR" \| "BR" \| "GR"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`CR`、`BR`、`GR`。 |
| `created_by` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `created_time` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_start_date` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `closed_time` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `approver` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `reviewer` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `offset` | 否 | `integer` | 0 | 分页偏移量。 |
| `limit` | 否 | `integer` | 20 | 分页数量上限。 |
| `sort` | 否 | `array<object>` |  | 排序方向。asc 表示升序，desc 表示降序。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_type` | 否 | `"approver" \| "reviewer"` | "approver" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`approver`、`reviewer`。 |
| `target_project_id` | 否 | `string` |  | 目标项目 ID。 |
| `review_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `snapshot_version_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `feature_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_info` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 否 | `string \| array<object>` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `filter` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `filter_mode` | 否 | `"OR_AND" \| "AND_OR"` | "AND_OR" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`OR_AND`、`AND_OR`。 |
| `sort` | 否 | `array<object>` |  | 排序方向。asc 表示升序，desc 表示降序。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_pi` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_iteration` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `workitem_id` | 否 | `array<object>` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `created_by` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `category_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `program_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `ir_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `query_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `ir_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
      "iteration_id": "<iteration_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |

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
    "iteration_id"
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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `type` | 否 | `string` | "board" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `region` | 否 | `string` |  | 华为云区域标识，例如 cn-north-4。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `subject` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `subject` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `show_type` | 否 | `"list" \| "tree"` | "list" | 请参考字段名和上游 CodeArts API 语义填写。可选值：`list`、`tree`。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `plan_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `user_ids` | 否 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `sort` | 否 | `string` |  | 排序方向。asc 表示升序，desc 表示降序。 |
| `type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `program_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `field_type` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `search` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_key` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `sort_dir` | 否 | `"ASC" \| "DESC" \| "asc" \| "desc"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`ASC`、`DESC`、`asc`、`desc`。 |
| `is_watched` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `status` | 否 | `integer` |  | 状态过滤条件或目标状态。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_ids` | 是 | `array<string>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `begin_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hours_dates` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hours_types` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `operated_time_interval` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `organization_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `key_word` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `updated_time_interval` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `rr_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `program_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `rr_ids` | 是 | `array<object>` |  | 资源 ID 列表，用于批量定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `program_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `query_type` | 否 | `string` | "ALL" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `include_deleted` | 否 | `boolean` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `updated_time_interval` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `journalized_type` | 否 | `string` | "Issue" | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 否 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 否 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_ids` | 否 | `array<integer>` |  | Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `version_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `issue_category` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `flow_code` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `process_context` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `category` | 否 | `string` | "CR" | 请参考字段名和上游 CodeArts API 语义填写。 |
| `old_status` | 是 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `status` | 是 | `object` |  | 状态过滤条件或目标状态。 |
| `cos` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `extra_fields` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `feature_set_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 标题。 |
| `position_float` | 否 | `number` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `display_value` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `parent_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `assignee` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `id` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `domain_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `old_status` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `title` | 否 | `string` |  | 标题。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `plan_start_date` | 否 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `ccbs` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `opinions` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `cc` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `cos` | 否 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `extra_fields` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
  "properties": {}
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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `begin_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `end_time` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `over_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `iteration_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `status` | 是 | `string` |  | 状态过滤条件或目标状态。 |
| `due_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `img_url` | 是 | `string` |  | 服务地址或资源 URL。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `name` | 是 | `string` |  | 资源名称。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `domain_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `domain_name` | 是 | `string` |  | 资源名称。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `user_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `role_id` | 是 | `number \| integer` |  | 项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `module_name` | 是 | `string` |  | 资源名称。 |
| `owner_user_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
  "properties": {}
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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 标题。 |
| `category` | 否 | `"PI" \| "Iteration" \| "PlanMilestone"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`PI`、`Iteration`、`PlanMilestone`。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `status` | 否 | `"planned" \| "going" \| "ended"` |  | 状态过滤条件或目标状态。可选值：`planned`、`going`、`ended`。 |
| `plan_start_date` | 否 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `plan_end_date` | 否 | `string \| integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `created_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `parent_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `baseline` | 否 | `"baselined" \| "unbaseline" \| "baseline-reviewing"` |  | 请参考字段名和上游 CodeArts API 语义填写。可选值：`baselined`、`unbaseline`、`baseline-reviewing`。 |
| `workload` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `owner` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `tracker_id` | 是 | `integer` |  | Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。 |
| `status_config_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `new_position` | 是 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 标题。 |
| `work_item_type` | 否 | `string` |  | 工作项类型，会映射为 Scrum tracker_id：task/"2"=Task/任务，bug/"3"=Bug/缺陷，epic/"5"=Epic，feature/"6"=Feature，story/"7"=Story。 |
| `description` | 否 | `string` |  | 资源描述信息。 |
| `status_id` | 否 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `priority_id` | 否 | `integer` |  | 工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。 |
| `iteration_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `severity_id` | 否 | `integer` |  | 严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。 |
| `assigned_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `developer_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `done_ratio` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `expected_work_hours` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `start_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `due_date` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `comment_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `content` | 是 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `status_id` | 是 | `integer` |  | 工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `object \| integer` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `work_hours_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `summary` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hours` | 否 | `number` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `work_hour_type` | 否 | `integer` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `work_item_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 仓库内文件路径。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 仓库内文件路径。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `issue_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 仓库内文件路径。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `file_path` | 是 | `string` |  | 仓库内文件路径。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `module_name` | 是 | `string` |  | 资源名称。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `case_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `owner_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `status` | 否 | `string` |  | 状态过滤条件或目标状态。 |
| `priority` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `module_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `label_id` | 否 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |
| `test_case_type` | 否 | `string` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `query` | 否 | `object` |  | 请参考字段名和上游 CodeArts API 语义填写。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |

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
| `page` | 否 | `integer` | 1 | 页码。用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 每页数量。用于分页查询。 |
| `keyword` | 否 | `string` |  | 搜索关键字。用于按名称、标题、编号等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 排序字段。用于选择服务端排序字段。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `plan_id` | 是 | `string` |  | 资源 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | CodeArts 项目的唯一标识，用于确定本次操作所属项目。 |
| `execute_list` | 是 | `array<object>` |  | 请参考字段名和上游 CodeArts API 语义填写。 |
| `dry_run` | 否 | `boolean` | true | 为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

