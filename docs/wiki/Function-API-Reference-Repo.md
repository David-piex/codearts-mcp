# CodeArts MCP 函数 API 参考 - 代码仓库

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`代码仓库`

API 数量：`142`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### repo_add_tenant_trusted_ip_address

所属模块：`代码仓库`

说明：添加代码仓库的租户trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_tenant_trusted_ip_address",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `ip_type` | 否 | `0 \| 1 \| 2` |  | 字段对应：<br>MCP 字段 `ip_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`、`2`。 |
| `ip_start` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ip_start` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_start`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ip_end` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ip_end` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_end`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `view_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `view_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `download_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `download_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `download_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `upload_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `upload_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `upload_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `remark` | 否 | `string` |  | 字段对应：<br>MCP 字段 `remark` ↔ 原始 CodeArts 代码仓库 API 同名字段 `remark`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "ip_type": {
      "type": "number",
      "enum": [
        0,
        1,
        2
      ]
    },
    "ip_start": {
      "type": "string",
      "minLength": 1
    },
    "ip_end": {
      "type": "string",
      "minLength": 1
    },
    "view_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "download_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "upload_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "remark": {
      "type": "string",
      "maxLength": 200
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

### repo_associate_branch_work_items

所属模块：`代码仓库`

说明：将 CodeArts Repo 分支关联到一个或多个工作项，用于让分支和 MR 页面显示关联工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_associate_branch_work_items",
    "arguments": {
      "project_id": "<project_id>",
      "repository_id": "<repository_id>",
      "branch": "<branch>",
      "work_item_ids": "<work_item_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `work_item_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 代码仓库 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "repository_id": {
      "$ref": "#/properties/project_id"
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
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
    "repository_id",
    "branch",
    "work_item_ids"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_batch_create_protected_branches

所属模块：`代码仓库`

说明：批量处理代码仓库的create保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_create_protected_branches",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `actions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "push",
              "merge"
            ]
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "addition_switchers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "enum": [
                    "allowed_force_push"
                  ]
                },
                "enable": {
                  "type": "boolean"
                }
              },
              "required": [
                "name",
                "enable"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "action"
        ],
        "additionalProperties": false
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "names"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_create_protected_tags

所属模块：`代码仓库`

说明：批量处理代码仓库的create保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_create_protected_tags",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `actions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "create"
            ],
            "default": "create"
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
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
    "repository_id",
    "names"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_delete_repository_file_push_permissions

所属模块：`代码仓库`

说明：批量处理代码仓库的delete仓库文件pushpermissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_delete_repository_file_push_permissions",
    "arguments": {
      "repository_id": "<repository_id>",
      "ids": "<ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `ids` | 是 | `array<string \| integer>` |  | 字段对应：<br>MCP 字段 `ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ids": {
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
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_update_protected_branches

所属模块：`代码仓库`

说明：批量处理代码仓库的update保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_update_protected_branches",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>",
      "actions": "<actions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `actions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "push",
              "merge"
            ]
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "addition_switchers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "enum": [
                    "allowed_force_push"
                  ]
                },
                "enable": {
                  "type": "boolean"
                }
              },
              "required": [
                "name",
                "enable"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "action"
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
    "repository_id",
    "names",
    "actions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_update_protected_tags

所属模块：`代码仓库`

说明：批量处理代码仓库的update保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_update_protected_tags",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>",
      "actions": "<actions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `actions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "create"
            ],
            "default": "create"
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
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
    "repository_id",
    "names",
    "actions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_update_repository_file_push_permissions

所属模块：`代码仓库`

说明：批量处理代码仓库的update仓库文件pushpermissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_update_repository_file_push_permissions",
    "arguments": {
      "repository_id": "<repository_id>",
      "permissions": "<permissions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `permissions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `permissions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `permissions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "permissions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
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
          "path": {
            "type": "string",
            "minLength": 1
          },
          "actions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "action": {
                  "type": "string",
                  "enum": [
                    "push"
                  ],
                  "default": "push"
                },
                "enable": {
                  "type": "boolean"
                },
                "user_ids": {
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
                "user_team_ids": {
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
                "related_role_ids": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "additionalProperties": false
            }
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
    "repository_id",
    "permissions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_bulk_delete_protected_branches

所属模块：`代码仓库`

说明：执行代码仓库的delete保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_bulk_delete_protected_branches",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
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
    "repository_id",
    "names"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_bulk_delete_protected_tags

所属模块：`代码仓库`

说明：执行代码仓库的delete保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_bulk_delete_protected_tags",
    "arguments": {
      "repository_id": "<repository_id>",
      "names": "<names>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `names` ↔ 原始 CodeArts 代码仓库 API 同名字段 `names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "names": {
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
    "repository_id",
    "names"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_check_group_deploy_key

所属模块：`代码仓库`

说明：检查代码仓库的组部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_check_group_deploy_key",
    "arguments": {
      "group_id": "<group_id>",
      "key": "<key>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1,
      "maxLength": 5000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "key"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_check_repository_deploy_key

所属模块：`代码仓库`

说明：检查代码仓库的仓库部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_check_repository_deploy_key",
    "arguments": {
      "repository_id": "<repository_id>",
      "key": "<key>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "key": {
      "type": "string",
      "minLength": 1,
      "maxLength": 5000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "key"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `from` | 是 | `string` |  | 字段对应：<br>MCP 字段 `from` ↔ 原始 CodeArts 代码仓库 API 同名字段 `from`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>起始引用、来源分支或开始位置。比较代码时通常表示源分支、源标签或源提交。 |
| `to` | 是 | `string` |  | 字段对应：<br>MCP 字段 `to` ↔ 原始 CodeArts 代码仓库 API 同名字段 `to`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标引用、目标分支或结束位置。比较代码时通常表示目标分支、目标标签或目标提交。 |
| `straight` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `straight` ↔ 原始 CodeArts 代码仓库 API 同名字段 `straight`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否直线比较。代码比较场景下用于控制比较两个引用时的提交范围口径。 |
| `ignore_whitespace_change` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `ignore_whitespace_change` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ignore_whitespace_change`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否忽略空白字符变化。true 表示代码比较时忽略空格、缩进、换行等差异。 |
| `view` | 否 | `string` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。 |

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

### repo_create_file_push_permission

所属模块：`代码仓库`

说明：创建代码仓库的文件pushpermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_file_push_permission",
    "arguments": {
      "repository_id": "<repository_id>",
      "path": "<path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `actions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "push"
            ],
            "default": "push"
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
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
    "repository_id",
    "path"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `source_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `target_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `target_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_project_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标项目 ID，用于跨项目迁移、复制或创建目标资源。 |
| `assignee_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `assignee_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>负责人用户 ID，用于指定工作项、任务或评审的当前处理人。 |
| `reviewer_ids` | 否 | `array<string \| integer>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `remove_source_branch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `remove_source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `remove_source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并后是否删除源分支。 |
| `squash` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `squash` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否压缩提交。 |
| `draft` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `draft` ↔ 原始 CodeArts 代码仓库 API 同名字段 `draft`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否创建为草稿合并请求。 |
| `labels` | 否 | `string \| array<string>` |  | 字段对应：<br>MCP 字段 `labels` ↔ 原始 CodeArts 代码仓库 API 同名字段 `labels`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表或逗号分隔的标签字符串。 |
| `milestone_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `milestone_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `milestone_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>里程碑 ID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `body` | 是 | `string` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_create_project_protected_branches

所属模块：`代码仓库`

说明：创建代码仓库的项目保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_project_protected_branches",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `actions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
      "maxLength": 1000
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "push",
              "merge"
            ]
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "addition_switchers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "enum": [
                    "allowed_force_push"
                  ]
                },
                "enable": {
                  "type": "boolean"
                }
              },
              "required": [
                "name",
                "enable"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "action"
        ],
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

### repo_create_project_protected_tags

所属模块：`代码仓库`

说明：创建代码仓库的项目保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_project_protected_tags",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `actions` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
      "maxLength": 1000
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "read",
              "create-delete",
              "create"
            ],
            "default": "create"
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_names": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "user_team_ids": {
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
          "user_team_names": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
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
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 代码仓库 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `import_members` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `import_members` ↔ 原始 CodeArts 代码仓库 API 同名字段 `import_members`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否导入成员。true 表示导入仓库或项目资源时同步导入成员关系。 |
| `template_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `visibility_level` | 否 | `0 \| 20` |  | 字段对应：<br>MCP 字段 `visibility_level` ↔ 原始 CodeArts 代码仓库 API 同名字段 `visibility_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库可见性级别。常见取值与 CodeArts Repo/GitLab 风格一致，例如 private/internal/public 对应的数字级别；以接口返回为准。可选值：`0`、`20`。 |
| `import_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `import_url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `import_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>import URL，用于指定服务地址、资源地址或回调地址。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `gitignore_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `gitignore_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `gitignore_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Gitignore 模板 ID，用于定位对应的 CodeArts 资源。 |
| `license_id` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `license_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `license_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>许可证 ID，用于定位对应的 CodeArts 资源。 |
| `enable_readme` | 否 | `boolean \| integer` |  | 字段对应：<br>MCP 字段 `enable_readme` ↔ 原始 CodeArts 代码仓库 API 同名字段 `enable_readme`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否初始化 README 文件。true 表示创建仓库时自动生成 README。 |
| `caller` | 否 | `string` |  | 字段对应：<br>MCP 字段 `caller` ↔ 原始 CodeArts 代码仓库 API 同名字段 `caller`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>调用方标识，用于审计或区分请求来源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "maxLength": 256,
      "pattern": "^[A-Za-z0-9_][A-Za-z0-9_.-]*$"
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

### repo_create_repository_webhook

所属模块：`代码仓库`

说明：创建代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository_webhook",
    "arguments": {
      "url": "<url>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `token` | 否 | `string` |  | 字段对应：<br>MCP 字段 `token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `token_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `token_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `token_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `push_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `push_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `push_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tag_push_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `tag_push_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_push_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merge_requests_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `merge_requests_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_requests_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `issues_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `issues_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `issues_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `note_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `note_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `note_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `job_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `job_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `job_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pipeline_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `pipeline_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pipeline_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `wiki_page_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `wiki_page_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `wiki_page_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `enable_ssl_verification` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `enable_ssl_verification` ↔ 原始 CodeArts 代码仓库 API 同名字段 `enable_ssl_verification`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_filter_strategy` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_filter_strategy` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_filter_strategy`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `push_events_branch_regex_filter` | 否 | `string` |  | 字段对应：<br>MCP 字段 `push_events_branch_regex_filter` ↔ 原始 CodeArts 代码仓库 API 同名字段 `push_events_branch_regex_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "url": {
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
    "token": {
      "type": "string",
      "minLength": 1
    },
    "token_type": {
      "type": "string",
      "minLength": 1
    },
    "push_events": {
      "type": "boolean"
    },
    "tag_push_events": {
      "type": "boolean"
    },
    "merge_requests_events": {
      "type": "boolean"
    },
    "issues_events": {
      "type": "boolean"
    },
    "note_events": {
      "type": "boolean"
    },
    "job_events": {
      "type": "boolean"
    },
    "pipeline_events": {
      "type": "boolean"
    },
    "wiki_page_events": {
      "type": "boolean"
    },
    "enable_ssl_verification": {
      "type": "boolean"
    },
    "branch_filter_strategy": {
      "type": "string",
      "minLength": 1
    },
    "push_events_branch_regex_filter": {
      "type": "string",
      "minLength": 1
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "url",
    "repository_id"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |
| `ref` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `message` | 否 | `string` |  | 字段对应：<br>MCP 字段 `message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>消息内容或提交说明。代码仓场景常用于提交信息，通知场景用于消息正文。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_create_tenant_kms_grant

所属模块：`代码仓库`

说明：创建代码仓库的租户kmsgrant。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_tenant_kms_grant",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `key` | 否 | `string \| null` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `title` | 否 | `string \| number` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
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
    "key": {
      "type": [
        "string",
        "null"
      ]
    },
    "title": {
      "type": [
        "string",
        "number"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_protected_branch

所属模块：`代码仓库`

说明：删除代码仓库的保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_protected_branch",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### repo_delete_protected_tag

所属模块：`代码仓库`

说明：删除代码仓库的保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_protected_tag",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_delete_repository_webhook

所属模块：`代码仓库`

说明：删除代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repository_webhook",
    "arguments": {
      "repository_id": "<repository_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "hook_id"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_delete_tenant_trusted_ip_address

所属模块：`代码仓库`

说明：删除代码仓库的租户trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_tenant_trusted_ip_address",
    "arguments": {
      "ip_id": "<ip_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `ip_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ip_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ip ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "ip_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "ip_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_export_tenant_repositories

所属模块：`代码仓库`

说明：执行代码仓库的租户仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_export_tenant_repositories",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_ids` | 否 | `array<string \| integer>` |  | 字段对应：<br>MCP 字段 `repository_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_ids": {
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
      },
      "minItems": 1
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `commit_sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 提交 SHA，用于精确定位一次提交；可填写完整 SHA，部分接口也支持短 SHA。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |

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

### repo_get_protected_branch

所属模块：`代码仓库`

说明：获取代码仓库的保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_protected_branch",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |

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

### repo_get_protected_tag

所属模块：`代码仓库`

说明：获取代码仓库的保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_protected_tag",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_get_repository_webhook

所属模块：`代码仓库`

说明：获取代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository_webhook",
    "arguments": {
      "repository_id": "<repository_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_repository_webhook_log

所属模块：`代码仓库`

说明：获取代码仓库的仓库webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository_webhook_log",
    "arguments": {
      "repository_id": "<repository_id>",
      "hook_id": "<hook_id>",
      "log_id": "<log_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `log_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `log_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `log_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/repository_id"
    },
    "log_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "hook_id",
    "log_id"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |

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

### repo_import_repository

所属模块：`代码仓库`

说明：从 GitHub、GitLab、Gitee、Bitbucket、Coding、Codeup 或通用 Git/SVN HTTPS 地址导入仓库到 CodeArts Repo。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_import_repository",
    "arguments": {
      "project_uuid": "<project_uuid>",
      "name": "<name>",
      "source_type": "<source_type>",
      "source_url": "<source_url>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts Repo API 请求体字段 `project_uuid`，表示目标 CodeArts 项目 UUID。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts Repo 导入接口请求体字段 `target_repo_name`；当导入接口不可用并回退到创建仓库接口时，对应创建接口字段 `name`。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `source_type` | 是 | `"gitee" \| "self_managed_gitlab" \| "gitlab" \| "github" \| "git" \| "svn" \| "coding" \| "bitbucket" \| "gerrit" \| "codeup"` |  | 字段对应：<br>MCP 字段 `source_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_type`，表示来源平台类型。<br>导入来源类型，例如 gitee、github、gitlab、git、svn 等。可选值：`gitee`、`self_managed_gitlab`、`gitlab`、`github`、`git`、`svn`、`coding`、`bitbucket`、`gerrit`、`codeup`。 |
| `source_url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `source_url` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_url`；工具会在需要时把用户名/令牌拼入 HTTPS URL。回退到创建仓库接口时，会编码为 `import_url`。<br>待导入的源仓库 HTTPS URL；工具会按 CodeArts Repo 要求转换为 Base64 import_url。 |
| `source_repo_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_repo_id` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_repo_id`。<br>第三方平台源仓库 ID；从 Gitee 等平台仓库列表选择导入时可传。 |
| `source_full_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_full_name` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_full_name`。<br>第三方平台源仓库完整名称，例如 owner/repo。 |
| `source_visibility` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_visibility` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_visibility`。<br>第三方平台源仓库可见性，例如 public 或 private。 |
| `source_username` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_username` 用于生成带凭据的 `source_url`，原始导入接口无独立同名字段。<br>源仓库 HTTPS 认证用户名；私有仓库导入时可与 source_token 一起使用。 |
| `source_token` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_token` 用于生成带凭据的 `source_url`，原始导入接口无独立同名字段；工具只传给上游，不在结果中回显明文。<br>源仓库 HTTPS 认证令牌或密码；工具只用于拼接并编码 import_url，不会在结果中明文回显。 |
| `import_type` | 否 | `string` | "git" | 字段对应：<br>MCP 字段 `import_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `import_type`。<br>导入类型。页面从 Gitee 导入时通常为 git。 |
| `fetch_refs_type` | 否 | `"all" \| "default"` | "default" | 字段对应：<br>MCP 字段 `fetch_refs_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `fetch_refs_type`。<br>导入引用范围。default 表示默认分支，all 表示全部引用。可选值：`all`、`default`。 |
| `endpoint_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `endpoint_uuid` ↔ 原始 CodeArts Repo 导入接口请求体字段 `endpoint_uuid`。<br>服务端点 UUID，用于远程镜像认证或网络访问配置。 |
| `codecheck` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `codecheck` ↔ 原始 CodeArts Repo 导入接口请求体字段 `codecheck`。<br>导入后是否启用代码检查，0 表示不启用，1 表示启用。 |
| `group_id` | 否 | `string \| integer \| null` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts Repo 导入接口请求体字段 `group_id`。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `mirror_repository` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `mirror_repository` ↔ 原始 CodeArts Repo 导入接口请求体字段 `mirror_repository`。<br>是否创建为镜像仓，0 表示普通导入，1 表示镜像仓。 |
| `security_level` | 否 | `string` |  | 字段对应：<br>MCP 字段 `security_level` ↔ 原始 CodeArts Repo 导入接口请求体字段 `security_level`。<br>仓库安全级别配置。 |
| `import_members` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `import_members` ↔ 回退创建仓库接口请求体字段 `import_members`；导入接口本身不使用该字段。<br>是否导入成员。true 表示导入仓库或项目资源时同步导入成员关系。 |
| `visibility_level` | 否 | `0 \| 20` |  | 字段对应：<br>MCP 字段 `visibility_level` ↔ 原始 CodeArts Repo 导入接口或回退创建仓库接口请求体字段 `visibility_level`。<br>仓库可见性级别。常见取值与 CodeArts Repo/GitLab 风格一致，例如 private/internal/public 对应的数字级别；以接口返回为准。可选值：`0`、`20`。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 回退创建仓库接口请求体字段 `description`；导入接口本身不使用该字段。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `caller` | 否 | `string` |  | 字段对应：<br>MCP 字段 `caller` ↔ 回退创建仓库接口请求体字段 `caller`；导入接口本身不使用该字段。<br>调用方标识，用于审计或区分请求来源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts Repo API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
      "maxLength": 256,
      "pattern": "^[A-Za-z0-9_][A-Za-z0-9_.-]*$"
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
    "source_url": {
      "type": "string",
      "format": "uri"
    },
    "source_repo_id": {
      "type": "string",
      "minLength": 1
    },
    "source_full_name": {
      "type": "string",
      "minLength": 1
    },
    "source_visibility": {
      "type": "string",
      "minLength": 1
    },
    "source_username": {
      "type": "string",
      "minLength": 1
    },
    "source_token": {
      "type": "string",
      "minLength": 1
    },
    "import_type": {
      "type": "string",
      "minLength": 1,
      "default": "git"
    },
    "fetch_refs_type": {
      "type": "string",
      "enum": [
        "all",
        "default"
      ],
      "default": "default"
    },
    "endpoint_uuid": {
      "type": "string"
    },
    "codecheck": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
      "default": 0
    },
    "group_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        },
        {
          "type": "null"
        }
      ]
    },
    "mirror_repository": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
      "default": 0
    },
    "security_level": {
      "type": "string"
    },
    "import_members": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "visibility_level": {
      "type": "number",
      "enum": [
        0,
        20
      ]
    },
    "description": {
      "type": "string"
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
    "name",
    "source_type",
    "source_url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_branch_related_work_items

所属模块：`代码仓库`

说明：查询代码仓库的分支相关工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_branch_related_work_items",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |

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
      "minLength": 1,
      "maxLength": 200
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `ref_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ref名称。 |
| `since` | 否 | `string` |  | 字段对应：<br>MCP 字段 `since` ↔ 原始 CodeArts 代码仓库 API 同名字段 `since`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>起始边界。常用于时间范围、提交范围或分页游标的开始位置。 |
| `until` | 否 | `string` |  | 字段对应：<br>MCP 字段 `until` ↔ 原始 CodeArts 代码仓库 API 同名字段 `until`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束边界。常用于时间范围、提交范围或分页游标的截止位置。 |
| `order_by_date` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `order_by_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>按日期排序或过滤的日期字段，用于选择创建时间、更新时间、结束时间等口径。 |
| `with_stats` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `with_stats` ↔ 原始 CodeArts 代码仓库 API 同名字段 `with_stats`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否返回统计信息。true 表示结果中附带数量、占比或汇总指标。 |

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

### repo_list_current_user_repositories

所属模块：`代码仓库`

说明：查询代码仓库的当前用户仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_current_user_repositories",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `order_by` | 否 | `"created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `archived` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `archived` ↔ 原始 CodeArts 代码仓库 API 同名字段 `archived`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `starred` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `starred` ↔ 原始 CodeArts 代码仓库 API 同名字段 `starred`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `membership` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `membership` ↔ 原始 CodeArts 代码仓库 API 同名字段 `membership`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `user_created` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `user_created` ↔ 原始 CodeArts 代码仓库 API 同名字段 `user_created`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `include_abnormal` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `include_abnormal` ↔ 原始 CodeArts 代码仓库 API 同名字段 `include_abnormal`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "order_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "archived": {
      "type": "boolean"
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "starred": {
      "type": "boolean"
    },
    "membership": {
      "type": "boolean"
    },
    "user_created": {
      "type": "boolean"
    },
    "include_abnormal": {
      "type": "boolean"
    }
  },
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_group_deploy_keys

所属模块：`代码仓库`

说明：查询代码仓库的组部署keys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_deploy_keys",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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

### repo_list_group_protected_branches

所属模块：`代码仓库`

说明：查询代码仓库的组保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_protected_branches",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `user_actions` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `user_actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `user_actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "user_actions": {
      "type": "boolean"
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_protected_refs_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的组保护引用用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_protected_refs_user_groups",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
    "search": {
      "type": "string",
      "minLength": 1
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

### repo_list_group_repositories

所属模块：`代码仓库`

说明：查询代码仓库的组仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_repositories",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `order_by` | 否 | `"id" \| "name" \| "created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`id`、`name`、`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |

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
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "order_by": {
      "type": "string",
      "enum": [
        "id",
        "name",
        "created_at",
        "updated_at"
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
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_impersonation_tokens

所属模块：`代码仓库`

说明：查询当前用户的个人访问令牌元数据，不返回令牌明文。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_impersonation_tokens",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `state` | 否 | `"all" \| "active" \| "inactive"` |  | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`all`、`active`、`inactive`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
        "all",
        "active",
        "inactive"
      ]
    },
    "search": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_item_commits

所属模块：`代码仓库`

说明：查询代码仓库的项提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_item_commits",
    "arguments": {
      "project_id": "<project_id>",
      "item_id": "<item_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `item_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `item_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `item_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项 ID，用于定位对应的 CodeArts 资源。 |
| `type` | 否 | `"commit" \| "branch" \| "mergerequest"` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`commit`、`branch`、`mergerequest`。 |

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
    "item_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "type": {
      "type": "string",
      "enum": [
        "commit",
        "branch",
        "mergerequest"
      ]
    }
  },
  "required": [
    "project_id",
    "item_id"
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |

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

### repo_list_merge_request_commits

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_commits",
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `view` | 否 | `"simple"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`simple`。 |

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
    },
    "view": {
      "type": "string",
      "enum": [
        "simple"
      ]
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `state` | 否 | `"all" \| "opened" \| "closed" \| "merged"` |  | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`all`、`opened`、`closed`、`merged`。 |

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

### repo_list_personal_recent_push_events

所属模块：`代码仓库`

说明：查询代码仓库的personalrecentpushevents。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_personal_recent_push_events",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `size` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `size` ↔ 原始 CodeArts 代码仓库 API 同名字段 `size`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100
    }
  },
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `state` | 否 | `"finished" \| "fail" \| "importing"` |  | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`finished`、`fail`、`importing`。 |
| `source_type` | 否 | `"gitee" \| "self_managed_gitlab" \| "gitlab" \| "github" \| "git" \| "svn" \| "coding" \| "bitbucket" \| "gerrit" \| "codeup"` |  | 字段对应：<br>MCP 字段 `source_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>导入来源类型，例如 gitee、github、gitlab、git、svn 等。可选值：`gitee`、`self_managed_gitlab`、`gitlab`、`github`、`git`、`svn`、`coding`、`bitbucket`、`gerrit`、`codeup`。 |
| `created_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `created_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间上界，通常使用 ISO 8601 时间字符串。 |
| `finished_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `finished_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `finished_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>完成时间下界，通常使用 ISO 8601 时间字符串。 |
| `finished_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `finished_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `finished_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>完成时间上界，通常使用 ISO 8601 时间字符串。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `order_by` | 否 | `"created_at" \| "source_repo_name" \| "size"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created_at`、`source_repo_name`、`size`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |

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

### repo_list_project_deploy_keys

所属模块：`代码仓库`

说明：查询代码仓库的项目部署keys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_deploy_keys",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_list_project_protected_branches

所属模块：`代码仓库`

说明：查询代码仓库的项目保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_protected_branches",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `user_actions` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `user_actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `user_actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `view` | 否 | `"simple"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`simple`。 |

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
    "search": {
      "type": "string",
      "minLength": 1
    },
    "user_actions": {
      "type": "boolean"
    },
    "view": {
      "type": "string",
      "enum": [
        "simple"
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

### repo_list_project_protected_refs_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的项目保护引用用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_protected_refs_user_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
    "search": {
      "type": "string",
      "minLength": 1
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

### repo_list_project_protected_tags

所属模块：`代码仓库`

说明：查询代码仓库的项目保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_protected_tags",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_list_project_subgroups_and_repositories

所属模块：`代码仓库`

说明：查询代码仓库的项目subgroupsand仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_subgroups_and_repositories",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `filter` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 代码仓库 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |
| `order_by` | 否 | `"id" \| "name" \| "created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`id`、`name`、`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `archived` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `archived` ↔ 原始 CodeArts 代码仓库 API 同名字段 `archived`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "filter": {
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
    "order_by": {
      "type": "string",
      "enum": [
        "id",
        "name",
        "created_at",
        "updated_at"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "archived": {
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
    "search": {
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

### repo_list_protected_tags

所属模块：`代码仓库`

说明：查询代码仓库的保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_protected_tags",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
    "search": {
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

### repo_list_refs

所属模块：`代码仓库`

说明：查询代码仓库的引用。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_refs",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `type` | 否 | `"branch" \| "tag"` | "branch" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`branch`、`tag`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
    "type": {
      "type": "string",
      "enum": [
        "branch",
        "tag"
      ],
      "default": "branch"
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_list_repository_commit_rules

所属模块：`代码仓库`

说明：查询代码仓库的仓库提交rules。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_commit_rules",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_repository_contributors

所属模块：`代码仓库`

说明：查询代码仓库的仓库contributors。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_contributors",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `order_by` | 否 | `"name" \| "email" \| "commits"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`name`、`email`、`commits`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `ref_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ref名称。 |
| `skip_merge` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `skip_merge` ↔ 原始 CodeArts 代码仓库 API 同名字段 `skip_merge`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "order_by": {
      "type": "string",
      "enum": [
        "name",
        "email",
        "commits"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "ref_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "skip_merge": {
      "type": "boolean"
    },
    "author": {
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

### repo_list_repository_deploy_keys

所属模块：`代码仓库`

说明：查询代码仓库的仓库部署keys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_deploy_keys",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_repository_file_push_permissions

所属模块：`代码仓库`

说明：查询代码仓库的仓库文件pushpermissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_file_push_permissions",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
    "search": {
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

### repo_list_repository_forks

所属模块：`代码仓库`

说明：查询代码仓库的仓库forks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_forks",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `order_by` | 否 | `"created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `view` | 否 | `"basic" \| "least"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`basic`、`least`。 |

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
    "order_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "view": {
      "type": "string",
      "enum": [
        "basic",
        "least"
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_repository_languages

所属模块：`代码仓库`

说明：查询代码仓库的仓库languages。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_languages",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_repository_members

所属模块：`代码仓库`

说明：查询代码仓库的仓库成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_members",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `permission` | 否 | `"repository" \| "code" \| "member" \| "branch" \| "tag" \| "mr" \| "label"` |  | 字段对应：<br>MCP 字段 `permission` ↔ 原始 CodeArts 代码仓库 API 同名字段 `permission`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`repository`、`code`、`member`、`branch`、`tag`、`mr`、`label`。 |
| `action` | 否 | `string` |  | 字段对应：<br>MCP 字段 `action` ↔ 原始 CodeArts 代码仓库 API 同名字段 `action`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "permission": {
      "type": "string",
      "enum": [
        "repository",
        "code",
        "member",
        "branch",
        "tag",
        "mr",
        "label"
      ]
    },
    "action": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_navigation_references

所属模块：`代码仓库`

说明：查询代码仓库的仓库navigationreferences。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_navigation_references",
    "arguments": {
      "repository_id": "<repository_id>",
      "symbol": "<symbol>",
      "language": "<language>",
      "blob": "<blob>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `revision` | 否 | `string` |  | 字段对应：<br>MCP 字段 `revision` ↔ 原始 CodeArts 代码仓库 API 同名字段 `revision`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `symbol` | 是 | `string` |  | 字段对应：<br>MCP 字段 `symbol` ↔ 原始 CodeArts 代码仓库 API 同名字段 `symbol`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `language` | 是 | `"C" \| "C++" \| "Go" \| "Java" \| "JavaScript" \| "PHP" \| "Python" \| "Ruby" \| "Rust"` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 代码仓库 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `blob` | 是 | `string` |  | 字段对应：<br>MCP 字段 `blob` ↔ 原始 CodeArts 代码仓库 API 同名字段 `blob`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "revision": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "symbol": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "language": {
      "type": "string",
      "enum": [
        "C",
        "C++",
        "Go",
        "Java",
        "JavaScript",
        "PHP",
        "Python",
        "Ruby",
        "Rust"
      ]
    },
    "blob": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    }
  },
  "required": [
    "repository_id",
    "symbol",
    "language",
    "blob",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_protected_refs_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的仓库保护引用用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_protected_refs_user_groups",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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
    "search": {
      "type": "string",
      "minLength": 1
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

### repo_list_repository_resource_permissions

所属模块：`代码仓库`

说明：查询代码仓库的仓库资源permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_resource_permissions",
    "arguments": {
      "repository_id": "<repository_id>",
      "resource_name": "<resource_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `resource_name` | 是 | `"repository" \| "code" \| "member" \| "branch" \| "tag" \| "mr" \| "label"` |  | 字段对应：<br>MCP 字段 `resource_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resource_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源名称。可选值：`repository`、`code`、`member`、`branch`、`tag`、`mr`、`label`。 |

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
    "resource_name": {
      "type": "string",
      "enum": [
        "repository",
        "code",
        "member",
        "branch",
        "tag",
        "mr",
        "label"
      ]
    }
  },
  "required": [
    "repository_id",
    "resource_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_templates

所属模块：`代码仓库`

说明：查询代码仓库的仓库模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_templates",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `type` | 否 | `"SYSTEM,USER" \| "SYSTEM" \| "USER"` | "SYSTEM,USER" | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`SYSTEM,USER`、`SYSTEM`、`USER`。 |
| `platform` | 否 | `string` |  | 字段对应：<br>MCP 字段 `platform` ↔ 原始 CodeArts 代码仓库 API 同名字段 `platform`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pipeline` | 否 | `"SupportPipeline" \| "UnsupportedPipeline"` |  | 字段对应：<br>MCP 字段 `pipeline` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pipeline`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`SupportPipeline`、`UnsupportedPipeline`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `enter_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `enter_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `enter_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `date_order` | 否 | `"up" \| "down"` |  | 字段对应：<br>MCP 字段 `date_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `date_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`up`、`down`。 |
| `language` | 否 | `string` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 代码仓库 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
    "type": {
      "type": "string",
      "enum": [
        "SYSTEM,USER",
        "SYSTEM",
        "USER"
      ],
      "default": "SYSTEM,USER"
    },
    "platform": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "pipeline": {
      "type": "string",
      "enum": [
        "SupportPipeline",
        "UnsupportedPipeline"
      ]
    },
    "search": {
      "type": "string",
      "maxLength": 50
    },
    "enter_type": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "date_order": {
      "type": "string",
      "enum": [
        "up",
        "down"
      ]
    },
    "language": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
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

### repo_list_repository_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的仓库用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_user_groups",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

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
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_webhook_logs

所属模块：`代码仓库`

说明：查询代码仓库的仓库webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_webhook_logs",
    "arguments": {
      "repository_id": "<repository_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

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
    "hook_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_webhooks

所属模块：`代码仓库`

说明：查询代码仓库的仓库webhooks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_webhooks",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `include_system` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `include_system` ↔ 原始 CodeArts 代码仓库 API 同名字段 `include_system`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
    "include_system": {
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

### repo_list_repository_work_items

所属模块：`代码仓库`

说明：查询代码仓库的仓库工作项。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_work_items",
    "arguments": {
      "repository_id": "<repository_id>",
      "project_id": "<project_id>",
      "is_ipd": "<is_ipd>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `is_ipd` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `is_ipd` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_ipd`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 代码仓库 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |

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
    "project_id": {
      "$ref": "#/properties/repository_id"
    },
    "is_ipd": {
      "type": "boolean"
    },
    "subject": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    }
  },
  "required": [
    "repository_id",
    "project_id",
    "is_ipd"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_submodules

所属模块：`代码仓库`

说明：查询代码仓库的submodules。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_submodules",
    "arguments": {
      "repository_id": "<repository_id>",
      "sha": "<sha>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

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
    "sha": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "sha"
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_list_tenant_cmks

所属模块：`代码仓库`

说明：查询代码仓库的租户cmks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tenant_cmks",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
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

### repo_list_tenant_encrypted_repositories

所属模块：`代码仓库`

说明：查询代码仓库的租户encrypted仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tenant_encrypted_repositories",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
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

### repo_list_tenant_repositories

所属模块：`代码仓库`

说明：查询代码仓库的租户仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tenant_repositories",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `repository_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |
| `member_number` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `member_number` ↔ 原始 CodeArts 代码仓库 API 同名字段 `member_number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `status` | 否 | `0 \| 3 \| 4 \| 5 \| 7` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 代码仓库 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`0`、`3`、`4`、`5`、`7`。 |
| `owner` | 否 | `string` |  | 字段对应：<br>MCP 字段 `owner` ↔ 原始 CodeArts 代码仓库 API 同名字段 `owner`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者或负责人标识，用于按资源归属过滤或设置归属人。 |
| `created_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `created_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间上界，通常使用 ISO 8601 时间字符串。 |
| `sort` | 否 | `"asc" \| "desc"` | "desc" | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `sort_field` | 否 | `"owner" \| "capacity" \| "status" \| "create_time" \| "member_number" \| "repository_name"` | "create_time" | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`owner`、`capacity`、`status`、`create_time`、`member_number`、`repository_name`。 |
| `locked` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `locked` ↔ 原始 CodeArts 代码仓库 API 同名字段 `locked`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "repository_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "member_number": {
      "type": "integer",
      "minimum": 0
    },
    "status": {
      "type": "number",
      "enum": [
        0,
        3,
        4,
        5,
        7
      ]
    },
    "owner": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "created_after": {
      "type": "string",
      "minLength": 1
    },
    "created_before": {
      "type": "string",
      "minLength": 1
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ],
      "default": "desc"
    },
    "sort_field": {
      "type": "string",
      "enum": [
        "owner",
        "capacity",
        "status",
        "create_time",
        "member_number",
        "repository_name"
      ],
      "default": "create_time"
    },
    "locked": {
      "type": "boolean"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_tenant_trusted_ip_addresses

所属模块：`代码仓库`

说明：查询代码仓库的租户trustedipaddresses。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tenant_trusted_ip_addresses",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `squash` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `squash` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否压缩提交。 |
| `force_merge` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `force_merge` ↔ 原始 CodeArts 代码仓库 API 同名字段 `force_merge`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否强制合并。 |
| `sha` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |
| `merge_commit_message` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并提交信息。 |
| `squash_commit_message` | 否 | `string` |  | 字段对应：<br>MCP 字段 `squash_commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash_commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>压缩提交信息。 |
| `should_remove_source_branch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `should_remove_source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `should_remove_source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并后是否删除源分支。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_remove_repository_deploy_key

所属模块：`代码仓库`

说明：执行代码仓库的仓库部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_repository_deploy_key",
    "arguments": {
      "repository_id": "<repository_id>",
      "key_id": "<key_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `key_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>key ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "key_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "key_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_request_official_api

所属模块：`代码仓库`

说明：执行代码仓库的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 代码仓库 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `action_type` | 是 | `"approve" \| "reject" \| "reset"` |  | 字段对应：<br>MCP 字段 `action_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `action_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审动作类型，例如通过、拒绝、重新打开或提交评论；可选值以对应评审接口为准。 |
| `approver_comment` | 否 | `string` |  | 字段对应：<br>MCP 字段 `approver_comment` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_comment`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审意见。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_show_blobs

所属模块：`代码仓库`

说明：执行代码仓库的blobs。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_blobs",
    "arguments": {
      "repository_id": "<repository_id>",
      "blob_id": "<blob_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `blob_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `blob_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `blob_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>blob ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "blob_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "blob_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_commit_statistics

所属模块：`代码仓库`

说明：执行代码仓库的提交统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_commit_statistics",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |

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
      "minLength": 1,
      "maxLength": 2000
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

### repo_show_diff_lines

所属模块：`代码仓库`

说明：执行代码仓库的difflines。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_diff_lines",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "commit_id": "<commit_id>",
      "start": "<start>",
      "end": "<end>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `commit_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 ID，用于定位对应的 CodeArts 资源。 |
| `start` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `start` ↔ 原始 CodeArts 代码仓库 API 同名字段 `start`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `end` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `end` ↔ 原始 CodeArts 代码仓库 API 同名字段 `end`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

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
      "minLength": 1,
      "maxLength": 10000
    },
    "commit_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 40
    },
    "start": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "end": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "commit_id",
    "start",
    "end"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_group_e2e_setting

所属模块：`代码仓库`

说明：执行代码仓库的组e2esetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_e2e_setting",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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

### repo_show_last_push_event_in_repository

所属模块：`代码仓库`

说明：执行代码仓库的lastpusheventin仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_last_push_event_in_repository",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_merge_request_statistic

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_statistic",
    "arguments": {
      "repository_id": "<repository_id>",
      "iids": "<iids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `iids` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `iids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fields` | 否 | `string` |  | 字段对应：<br>MCP 字段 `fields` ↔ 原始 CodeArts 代码仓库 API 同名字段 `fields`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "iids": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "fields": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "repository_id",
    "iids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_merge_request_votes

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求votes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_votes",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |

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

### repo_show_notification_subscription

所属模块：`代码仓库`

说明：执行代码仓库的notificationsubscription。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_notification_subscription",
    "arguments": {
      "repository_id": "<repository_id>",
      "type": "<type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `type` | 是 | `"internal_message" \| "email" \| "qyweixin" \| "feishu" \| "dingding"` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`internal_message`、`email`、`qyweixin`、`feishu`、`dingding`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "enum": [
        "internal_message",
        "email",
        "qyweixin",
        "feishu",
        "dingding"
      ]
    }
  },
  "required": [
    "repository_id",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_notification_subscriptions_status

所属模块：`代码仓库`

说明：执行代码仓库的notificationsubscriptions状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_notification_subscriptions_status",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_project_e2e_setting

所属模块：`代码仓库`

说明：执行代码仓库的项目e2esetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_e2e_setting",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_project_general_policy

所属模块：`代码仓库`

说明：执行代码仓库的项目generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_general_policy",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_project_member_setting

所属模块：`代码仓库`

说明：执行代码仓库的项目成员setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_member_setting",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_project_settings_inherit_cfg

所属模块：`代码仓库`

说明：执行代码仓库的项目settingsinheritcfg。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_settings_inherit_cfg",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_project_tenant_settings

所属模块：`代码仓库`

说明：执行代码仓库的项目租户settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_tenant_settings",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_project_watermark

所属模块：`代码仓库`

说明：执行代码仓库的项目watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_watermark",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_projects_general_policy

所属模块：`代码仓库`

说明：执行代码仓库的项目generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_projects_general_policy",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### repo_show_repo_last_statistics

所属模块：`代码仓库`

说明：执行代码仓库的repolast统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repo_last_statistics",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |

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
      "minLength": 1,
      "maxLength": 2000
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

### repo_show_repo_statistics_summary

所属模块：`代码仓库`

说明：执行代码仓库的repo统计摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repo_statistics_summary",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_e2e_setting

所属模块：`代码仓库`

说明：执行代码仓库的仓库e2esetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_e2e_setting",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `take_effect` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `take_effect` ↔ 原始 CodeArts 代码仓库 API 同名字段 `take_effect`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "take_effect": {
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

### repo_show_repository_general_commit_rule

所属模块：`代码仓库`

说明：执行代码仓库的仓库general提交规则。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_general_commit_rule",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_general_policy

所属模块：`代码仓库`

说明：执行代码仓库的仓库generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_general_policy",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_inherit_setting

所属模块：`代码仓库`

说明：执行代码仓库的仓库inheritsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_inherit_setting",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_inherit_setting_source

所属模块：`代码仓库`

说明：执行代码仓库的仓库inheritsetting来源。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_inherit_setting_source",
    "arguments": {
      "repository_id": "<repository_id>",
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `name` | 是 | `"protected_branches" \| "protected_tags" \| "merge_requests"` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。可选值：`protected_branches`、`protected_tags`、`merge_requests`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "enum": [
        "protected_branches",
        "protected_tags",
        "merge_requests"
      ]
    }
  },
  "required": [
    "repository_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_repository_navigation_language

所属模块：`代码仓库`

说明：执行代码仓库的仓库navigationlanguage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_navigation_language",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_navigation_outline

所属模块：`代码仓库`

说明：执行代码仓库的仓库navigationoutline。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_navigation_outline",
    "arguments": {
      "repository_id": "<repository_id>",
      "language": "<language>",
      "blob": "<blob>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `revision` | 否 | `string` |  | 字段对应：<br>MCP 字段 `revision` ↔ 原始 CodeArts 代码仓库 API 同名字段 `revision`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `language` | 是 | `"C" \| "C++" \| "Go" \| "Java" \| "JavaScript" \| "PHP" \| "Python" \| "Ruby" \| "Rust"` |  | 字段对应：<br>MCP 字段 `language` ↔ 原始 CodeArts 代码仓库 API 同名字段 `language`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。 |
| `blob` | 是 | `string` |  | 字段对应：<br>MCP 字段 `blob` ↔ 原始 CodeArts 代码仓库 API 同名字段 `blob`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "revision": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "language": {
      "type": "string",
      "enum": [
        "C",
        "C++",
        "Go",
        "Java",
        "JavaScript",
        "PHP",
        "Python",
        "Ruby",
        "Rust"
      ]
    },
    "blob": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    }
  },
  "required": [
    "repository_id",
    "language",
    "blob",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_repository_navigation_schema

所属模块：`代码仓库`

说明：执行代码仓库的仓库navigationschema。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_navigation_schema",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_permission_inherit_enabled

所属模块：`代码仓库`

说明：执行代码仓库的仓库permissioninheritenabled。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_permission_inherit_enabled",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_statistics_status

所属模块：`代码仓库`

说明：执行代码仓库的仓库统计状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_statistics_status",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_statistics_summary

所属模块：`代码仓库`

说明：执行代码仓库的仓库统计摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_statistics_summary",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_repository_watermark

所属模块：`代码仓库`

说明：执行代码仓库的仓库watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_watermark",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_show_resource_permissions

所属模块：`代码仓库`

说明：执行代码仓库的资源permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_resource_permissions",
    "arguments": {
      "group_id": "<group_id>",
      "resource_id": "<resource_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `resource_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resource_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，用于定位审计、附件、制品或业务资源。具体资源类型由所在 API 决定。 |

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
    },
    "resource_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "resource_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_tenant_develop_mode

所属模块：`代码仓库`

说明：执行代码仓库的租户developmode。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_tenant_develop_mode",
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

### repo_show_tenant_kms_grant

所属模块：`代码仓库`

说明：执行代码仓库的租户kmsgrant。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_tenant_kms_grant",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

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

### repo_show_tenant_repo_encryption_setting

所属模块：`代码仓库`

说明：执行代码仓库的租户repoencryptionsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_tenant_repo_encryption_setting",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |

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

### repo_show_user_ref_permission

所属模块：`代码仓库`

说明：执行代码仓库的用户refpermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_user_ref_permission",
    "arguments": {
      "repository_id": "<repository_id>",
      "target_ref": "<target_ref>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `target_ref` | 是 | `string` |  | 字段对应：<br>MCP 字段 `target_ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `action` | 否 | `"read" \| "review" \| "approval" \| "create-change" \| "merge" \| "create-delete" \| "push"` |  | 字段对应：<br>MCP 字段 `action` ↔ 原始 CodeArts 代码仓库 API 同名字段 `action`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`read`、`review`、`approval`、`create-change`、`merge`、`create-delete`、`push`。 |
| `change_request_iid` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `change_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `change_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "target_ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 210
    },
    "action": {
      "type": "string",
      "enum": [
        "read",
        "review",
        "approval",
        "create-change",
        "merge",
        "create-delete",
        "push"
      ]
    },
    "change_request_iid": {
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
  "required": [
    "repository_id",
    "target_ref"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `username` | 否 | `string` |  | 字段对应：<br>MCP 字段 `username` ↔ 原始 CodeArts 代码仓库 API 同名字段 `username`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程镜像认证用户名。按官方接口要求需要传入 base64 后的值。 |
| `password` | 否 | `string` |  | 字段对应：<br>MCP 字段 `password` ↔ 原始 CodeArts 代码仓库 API 同名字段 `password`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程镜像认证密码。按官方接口要求需要传入 base64 后的值。 |
| `endpoint_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `endpoint_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `endpoint_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>服务端点 UUID，用于远程镜像认证或网络访问配置。 |
| `force_fetch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `force_fetch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `force_fetch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否强制拉取远端镜像。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_update_group_resource_permissions

所属模块：`代码仓库`

说明：更新代码仓库的组资源permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_resource_permissions",
    "arguments": {
      "group_id": "<group_id>",
      "resource_id": "<resource_id>",
      "data": "<data>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `resource_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `resource_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resource_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，用于定位审计、附件、制品或业务资源。具体资源类型由所在 API 决定。 |
| `data` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `data` ↔ 原始 CodeArts 代码仓库 API 同名字段 `data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务数据对象，承载接口需要提交或返回的结构化内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_id": {
      "$ref": "#/properties/group_id"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "role_id": {
            "type": "string",
            "minLength": 1
          },
          "role_name": {
            "type": "string",
            "minLength": 1
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "permission_id": {
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
                "enabled": {
                  "type": "boolean"
                }
              },
              "additionalProperties": false
            }
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
    "group_id",
    "resource_id",
    "data"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_project_general_policy

所属模块：`代码仓库`

说明：更新代码仓库的项目generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_general_policy",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `disable_fork` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `disable_fork` ↔ 原始 CodeArts 代码仓库 API 同名字段 `disable_fork`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tag_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tag_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `generate_pre_merge_ref` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `generate_pre_merge_ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `generate_pre_merge_ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "disable_fork": {
      "type": "boolean"
    },
    "branch_name_regex": {
      "type": "string"
    },
    "tag_name_regex": {
      "type": "string"
    },
    "generate_pre_merge_ref": {
      "type": "boolean"
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

### repo_update_project_settings_inherit_cfg

所属模块：`代码仓库`

说明：更新代码仓库的项目settingsinheritcfg。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_settings_inherit_cfg",
    "arguments": {
      "project_id": "<project_id>",
      "data": "<data>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `data` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `data` ↔ 原始 CodeArts 代码仓库 API 同名字段 `data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务数据对象，承载接口需要提交或返回的结构化内容。 |
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
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "enum": [
              "protected_branches",
              "protected_tags",
              "repository_settings",
              "push_rules",
              "merge_requests",
              "e2e_settings",
              "watermark",
              "webhook_settings",
              "mr_branch_policies",
              "reviews",
              "deploy_keys"
            ]
          },
          "inherit_mod": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "name",
          "inherit_mod"
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
    "data"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_project_watermark

所属模块：`代码仓库`

说明：更新代码仓库的项目watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_watermark",
    "arguments": {
      "project_id": "<project_id>",
      "watermark": "<watermark>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `watermark` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `watermark` ↔ 原始 CodeArts 代码仓库 API 同名字段 `watermark`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "watermark": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "watermark"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_protected_branch

所属模块：`代码仓库`

说明：更新代码仓库的保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_protected_branch",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch_name": "<branch_name>",
      "actions": "<actions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `actions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "push",
              "merge"
            ]
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "addition_switchers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "enum": [
                    "allowed_force_push"
                  ]
                },
                "enable": {
                  "type": "boolean"
                }
              },
              "required": [
                "name",
                "enable"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "action"
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
    "repository_id",
    "branch_name",
    "actions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_protected_tag

所属模块：`代码仓库`

说明：更新代码仓库的保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_protected_tag",
    "arguments": {
      "repository_id": "<repository_id>",
      "tag_name": "<tag_name>",
      "actions": "<actions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `tag_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tag_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 标签名称，例如 v1.0.0。 |
| `actions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "create"
            ],
            "default": "create"
          },
          "enable": {
            "type": "boolean"
          },
          "user_ids": {
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
          "user_team_ids": {
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
          "related_role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
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
    "repository_id",
    "tag_name",
    "actions"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `sync_branch_type` | 否 | `"all" \| "default"` |  | 字段对应：<br>MCP 字段 `sync_branch_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sync_branch_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程镜像同步分支范围，all 表示全部分支，default 表示默认分支。可选值：`all`、`default`。 |
| `mirroring_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `mirroring_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `mirroring_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否启用远程镜像。 |
| `endpoint_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `endpoint_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `endpoint_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>服务端点 UUID，用于远程镜像认证或网络访问配置。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### repo_update_repository_permission_inherit_enabled

所属模块：`代码仓库`

说明：更新代码仓库的仓库permissioninheritenabled。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_permission_inherit_enabled",
    "arguments": {
      "repository_id": "<repository_id>",
      "inherit_parent_permission": "<inherit_parent_permission>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `inherit_parent_permission` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `inherit_parent_permission` ↔ 原始 CodeArts 代码仓库 API 同名字段 `inherit_parent_permission`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "inherit_parent_permission": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "inherit_parent_permission"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_resource_permissions

所属模块：`代码仓库`

说明：更新代码仓库的仓库资源permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_resource_permissions",
    "arguments": {
      "repository_id": "<repository_id>",
      "resource_name": "<resource_name>",
      "data": "<data>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `resource_name` | 是 | `"repository" \| "code" \| "member" \| "branch" \| "tag" \| "mr" \| "label"` |  | 字段对应：<br>MCP 字段 `resource_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resource_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源名称。可选值：`repository`、`code`、`member`、`branch`、`tag`、`mr`、`label`。 |
| `data` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `data` ↔ 原始 CodeArts 代码仓库 API 同名字段 `data`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>业务数据对象，承载接口需要提交或返回的结构化内容。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "resource_name": {
      "type": "string",
      "enum": [
        "repository",
        "code",
        "member",
        "branch",
        "tag",
        "mr",
        "label"
      ]
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "role_id": {
            "type": "string",
            "minLength": 1
          },
          "role_name": {
            "type": "string",
            "minLength": 1
          },
          "permissions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "permission_id": {
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
                "enabled": {
                  "type": "boolean"
                }
              },
              "additionalProperties": false
            }
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
    "repository_id",
    "resource_name",
    "data"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_webhook

所属模块：`代码仓库`

说明：更新代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_webhook",
    "arguments": {
      "repository_id": "<repository_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `token` | 否 | `string` |  | 字段对应：<br>MCP 字段 `token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `token_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `token_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `token_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `push_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `push_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `push_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tag_push_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `tag_push_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_push_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merge_requests_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `merge_requests_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_requests_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `issues_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `issues_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `issues_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `note_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `note_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `note_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `job_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `job_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `job_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pipeline_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `pipeline_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pipeline_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `wiki_page_events` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `wiki_page_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `wiki_page_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `enable_ssl_verification` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `enable_ssl_verification` ↔ 原始 CodeArts 代码仓库 API 同名字段 `enable_ssl_verification`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_filter_strategy` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_filter_strategy` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_filter_strategy`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `push_events_branch_regex_filter` | 否 | `string` |  | 字段对应：<br>MCP 字段 `push_events_branch_regex_filter` ↔ 原始 CodeArts 代码仓库 API 同名字段 `push_events_branch_regex_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "url": {
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
    "token": {
      "type": "string",
      "minLength": 1
    },
    "token_type": {
      "type": "string",
      "minLength": 1
    },
    "push_events": {
      "type": "boolean"
    },
    "tag_push_events": {
      "type": "boolean"
    },
    "merge_requests_events": {
      "type": "boolean"
    },
    "issues_events": {
      "type": "boolean"
    },
    "note_events": {
      "type": "boolean"
    },
    "job_events": {
      "type": "boolean"
    },
    "pipeline_events": {
      "type": "boolean"
    },
    "wiki_page_events": {
      "type": "boolean"
    },
    "enable_ssl_verification": {
      "type": "boolean"
    },
    "branch_filter_strategy": {
      "type": "string",
      "minLength": 1
    },
    "push_events_branch_regex_filter": {
      "type": "string",
      "minLength": 1
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_tenant_repo_encryption_setting

所属模块：`代码仓库`

说明：更新代码仓库的租户repoencryptionsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_tenant_repo_encryption_setting",
    "arguments": {
      "tenant_id": "<tenant_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `tenant_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `tenant_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tenant_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。 |
| `encryption_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `encryption_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `encryption_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `default_encryption_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `default_encryption_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `default_encryption_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `cmk_key_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `cmk_key_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `cmk_key_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>cmkkey名称。 |
| `cmk_key_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `cmk_key_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `cmk_key_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>cmkkey ID，用于定位对应的 CodeArts 资源。 |
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
    "encryption_type": {
      "type": "string",
      "minLength": 1
    },
    "default_encryption_enabled": {
      "type": "boolean"
    },
    "cmk_key_name": {
      "type": "string",
      "minLength": 1
    },
    "cmk_key_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_tenant_trusted_ip_address

所属模块：`代码仓库`

说明：更新代码仓库的租户trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_tenant_trusted_ip_address",
    "arguments": {
      "ip_id": "<ip_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `ip_type` | 否 | `0 \| 1 \| 2` |  | 字段对应：<br>MCP 字段 `ip_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`、`2`。 |
| `ip_start` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ip_start` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_start`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ip_end` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ip_end` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_end`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `view_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `view_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `download_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `download_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `download_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `upload_flag` | 否 | `0 \| 1` |  | 字段对应：<br>MCP 字段 `upload_flag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `upload_flag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`0`、`1`。 |
| `remark` | 否 | `string` |  | 字段对应：<br>MCP 字段 `remark` ↔ 原始 CodeArts 代码仓库 API 同名字段 `remark`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |
| `ip_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ip_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ip ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "ip_type": {
      "type": "number",
      "enum": [
        0,
        1,
        2
      ]
    },
    "ip_start": {
      "type": "string",
      "minLength": 1
    },
    "ip_end": {
      "type": "string",
      "minLength": 1
    },
    "view_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "download_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "upload_flag": {
      "type": "number",
      "enum": [
        0,
        1
      ]
    },
    "remark": {
      "type": "string",
      "maxLength": 200
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "ip_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "ip_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

