# CodeArts MCP 函数 API 参考 - 部署

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`部署`

API 数量：`110`

所有函数 API 默认使用统一 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数；当前模块工具直接在统一入口调用。旧的 `/mcp/<family>` 产品入口仍作为兼容路径保留。

## API 清单

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `cluster_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `host_ids` ↔ 原始 CodeArts 部署 API 同名字段 `host_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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

### deploy_batch_delete_applications

所属模块：`部署`

说明：批量处理部署的deleteapplications。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_batch_delete_applications",
    "arguments": {
      "project_id": "<project_id>",
      "application_ids": "<application_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `application_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `application_ids` ↔ 原始 CodeArts 部署 API 同名字段 `application_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "application_ids": {
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
    "application_ids"
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
| `reason` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reason` ↔ 原始 CodeArts 部署 API 同名字段 `reason`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `operator` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operator` ↔ 原始 CodeArts 部署 API 同名字段 `operator`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作人标识，表示执行本次操作的用户。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### deploy_check_application_creatable

所属模块：`部署`

说明：检查部署的applicationcreatable。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_check_application_creatable",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### deploy_check_application_exists

所属模块：`部署`

说明：检查部署的applicationexists。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_check_application_exists",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

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

### deploy_check_host_group_creatable

所属模块：`部署`

说明：检查部署的主机组creatable。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_check_host_group_creatable",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### deploy_copy_application

所属模块：`部署`

说明：复制部署的application。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_copy_application",
    "arguments": {
      "app_id": "<app_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `app_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "app_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "app_id"
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `timeout` | 否 | `number \| null` |  | 字段对应：<br>MCP 字段 `timeout` ↔ 原始 CodeArts 部署 API 同名字段 `timeout`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>超时时间，通常以秒或分钟为单位，超过后任务会被服务端终止。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 字段对应：<br>MCP 字段 `trigger` ↔ 原始 CodeArts 部署 API 同名字段 `trigger`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>触发方式，用于区分手动触发、定时触发、代码提交触发等执行来源。 |
| `slave_cluster_id` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `slave_cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `slave_cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>从集群 ID，用于定位对应的 CodeArts 资源。 |
| `slave_resource_type` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `slave_resource_type` ↔ 原始 CodeArts 部署 API 同名字段 `slave_resource_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>从资源类型，用于部署应用关联从属资源时标识资源类别。 |
| `create_type` | 否 | `string` | "template" | 字段对应：<br>MCP 字段 `create_type` ↔ 原始 CodeArts 部署 API 同名字段 `create_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建类型，用于区分手工创建、模板创建、复制创建等来源。 |
| `is_draft` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `is_draft` ↔ 原始 CodeArts 部署 API 同名字段 `is_draft`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否为草稿。true 表示创建为草稿状态，暂不正式生效或发布。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `agency_urn` | 否 | `string` |  | 字段对应：<br>MCP 字段 `agency_urn` ↔ 原始 CodeArts 部署 API 同名字段 `agency_urn`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>委托 URN，用于部署等服务通过云委托访问其他云资源。 |
| `arrange_infos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `arrange_infos` ↔ 原始 CodeArts 部署 API 同名字段 `arrange_infos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编排信息列表，用于描述部署任务或应用下各步骤的执行顺序和参数。 |
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

### deploy_create_application_group

所属模块：`部署`

说明：创建部署的application组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_application_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 部署 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `os` | 否 | `string` | "linux" | 字段对应：<br>MCP 字段 `os` ↔ 原始 CodeArts 部署 API 同名字段 `os`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作系统类型，例如 Linux 或 Windows；用于部署环境、主机或运行时选择。 |
| `deploy_type` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `deploy_type` ↔ 原始 CodeArts 部署 API 同名字段 `deploy_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署类型，用于区分主机部署、容器部署、函数部署等部署方式；具体取值以部署服务为准。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `project_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_name` ↔ 原始 CodeArts 部署 API 同名字段 `project_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目名称。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 部署 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `task_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_name` ↔ 原始 CodeArts 部署 API 同名字段 `task_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务名称。 |
| `configs` | 否 | `array<object>` | [] | 字段对应：<br>MCP 字段 `configs` ↔ 原始 CodeArts 部署 API 同名字段 `configs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>配置项列表或配置对象，用于创建部署任务、模板任务或执行参数。 |
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

### deploy_delete_application_environment

所属模块：`部署`

说明：删除部署的application环境。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_application_environment",
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "dry_run": {
      "type": "boolean",
      "default": true
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

### deploy_delete_application_group

所属模块：`部署`

说明：删除部署的application组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_application_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "dry_run": {
      "type": "boolean",
      "default": true
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

### deploy_delete_applications_3c383635

所属模块：`部署`

说明：删除部署的applications3c383635。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_applications_3c383635",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_applications_environments_43e93148

所属模块：`部署`

说明：删除部署的applications环境43e93148。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_applications_environments_43e93148",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_host_groups_2d706a13

所属模块：`部署`

说明：删除部署的主机组2d706a13。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_host_groups_2d706a13",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_host_groups_hosts_65fc6080

所属模块：`部署`

说明：删除部署的主机组主机65fc6080。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_host_groups_hosts_65fc6080",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_resources_host_groups_1e7e2030

所属模块：`部署`

说明：删除部署的resources主机组1e7e2030。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_resources_host_groups_1e7e2030",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_resources_host_groups_hosts_1c20cc7c

所属模块：`部署`

说明：删除部署的resources主机组主机1c20cc7c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_resources_host_groups_hosts_1c20cc7c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_delete_tasks_ae8dc757

所属模块：`部署`

说明：删除部署的任务ae8dc757。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_tasks_ae8dc757",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `host_ids` ↔ 原始 CodeArts 部署 API 同名字段 `host_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `host_ids` ↔ 原始 CodeArts 部署 API 同名字段 `host_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |

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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 部署 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `string` | "0" | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `end_offset` | 否 | `string` | "0" | 字段对应：<br>MCP 字段 `end_offset` ↔ 原始 CodeArts 部署 API 同名字段 `end_offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志结束偏移量，用于增量读取部署或构建日志。 |

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

### deploy_get_application_environment

所属模块：`部署`

说明：获取部署的application环境。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_application_environment",
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_application_messages

所属模块：`部署`

说明：获取部署的applicationmessages。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_application_messages",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `app_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
    "app_id"
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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_environment_permissions

所属模块：`部署`

说明：获取部署的环境permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_environment_permissions",
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |

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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_host_group_host

所属模块：`部署`

说明：获取部署的主机组主机。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group_host",
    "arguments": {
      "group_id": "<group_id>",
      "host_id": "<host_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `host_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `host_id` ↔ 原始 CodeArts 部署 API 同名字段 `host_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "host_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "host_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_host_group_host_v2

所属模块：`部署`

说明：获取部署的主机组主机v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group_host_v2",
    "arguments": {
      "group_id": "<group_id>",
      "host_id": "<host_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `host_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `host_id` ↔ 原始 CodeArts 部署 API 同名字段 `host_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "host_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "host_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_host_group_permissions

所属模块：`部署`

说明：获取部署的主机组permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group_permissions",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_host_group_v2

所属模块：`部署`

说明：获取部署的主机组v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group_v2",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `orchestration_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `orchestration_id` ↔ 原始 CodeArts 部署 API 同名字段 `orchestration_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编排 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_metrics_success_rate_7a84244f

所属模块：`部署`

说明：获取部署的metricssuccessrate7a84244f。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_metrics_success_rate_7a84244f",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_get_projects_applications_messages_0a909575

所属模块：`部署`

说明：获取部署的项目applicationsmessages0a909575。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_projects_applications_messages_0a909575",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `app_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |

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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_success_rate_metrics

所属模块：`部署`

说明：获取部署的successratemetrics。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_success_rate_metrics",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
    "project_id"
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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_get_task_success_rate_metrics

所属模块：`部署`

说明：获取部署的任务successratemetrics。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_task_success_rate_metrics",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "project_id"
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
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 部署 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `task_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群 ID，用于定位对应的 CodeArts 资源。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 字段对应：<br>MCP 字段 `cluster_type` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群类型，用于区分主机集群、Kubernetes 集群或代理集群等。可选值：`host`、`container`。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 字段对应：<br>MCP 字段 `cluster_type` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群类型，用于区分主机集群、Kubernetes 集群或代理集群等。可选值：`host`、`container`。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群 ID，用于定位对应的 CodeArts 资源。 |
| `host_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `host_id` ↔ 原始 CodeArts 部署 API 同名字段 `host_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 部署 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 部署 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
| `offset` | 否 | `string \| number` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `start_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 部署 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 部署 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |

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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `host_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `host_ids` ↔ 原始 CodeArts 部署 API 同名字段 `host_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主机 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
| `app_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `page_index` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page_index` ↔ 原始 CodeArts 部署 API 同名字段 `page_index`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>页码或页索引，用于分页查询；起始值以对应接口约定为准。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 部署 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 部署 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |

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

### deploy_list_application_groups

所属模块：`部署`

说明：查询部署的application组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_application_groups",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### deploy_list_application_permissions

所属模块：`部署`

说明：查询部署的applicationpermissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_application_permissions",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `app_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "app_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/app_id"
    }
  },
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `app_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `key_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `key_field` ↔ 原始 CodeArts 部署 API 同名字段 `key_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>关键字段名，用于指定排序、分组、统计或去重时使用的字段。 |
| `as_proxy` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `as_proxy` ↔ 原始 CodeArts 部署 API 同名字段 `as_proxy`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否作为代理使用。true 表示该主机、节点或连接用于代理访问。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 部署 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 部署 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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

### deploy_list_host_group_hosts_v2

所属模块：`部署`

说明：查询部署的主机组主机v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_group_hosts_v2",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### deploy_list_host_groups_v2

所属模块：`部署`

说明：查询部署的主机组v2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_groups_v2",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 部署 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 部署 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |

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
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 部署 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群 ID，用于定位对应的 CodeArts 资源。 |
| `ip` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ip` ↔ 原始 CodeArts 部署 API 同名字段 `ip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>IP 地址，用于主机、集群、代理或部署目标定位。 |
| `os` | 否 | `string` |  | 字段对应：<br>MCP 字段 `os` ↔ 原始 CodeArts 部署 API 同名字段 `os`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作系统类型，例如 Linux 或 Windows；用于部署环境、主机或运行时选择。 |
| `connection_status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `connection_status` ↔ 原始 CodeArts 部署 API 同名字段 `connection_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>连接状态，用于过滤主机、服务端点、镜像或外部系统连接结果。 |

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
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 部署 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 部署 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 部署 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 部署 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `cluster_type` | 是 | `"host" \| "container"` |  | 字段对应：<br>MCP 字段 `cluster_type` ↔ 原始 CodeArts 部署 API 同名字段 `cluster_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>集群类型，用于区分主机集群、Kubernetes 集群或代理集群等。可选值：`host`、`container`。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `app_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `limit` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 部署 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 部署 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

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
    "arguments": {
      "project_id": "<project_id>",
      "level": "<level>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `level` | 是 | `"app" \| "env" \| "app_env"` |  | 字段对应：<br>MCP 字段 `level` ↔ 原始 CodeArts 部署 API 同名字段 `level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`app`、`env`、`app_env`。 |
| `app_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `env_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `env_id` ↔ 原始 CodeArts 部署 API 同名字段 `env_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>env ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "level": {
      "type": "string",
      "enum": [
        "app",
        "env",
        "app_env"
      ]
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    },
    "env_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "level"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
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
    "arguments": {
      "project_id": "<project_id>",
      "level": "<level>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `level` | 是 | `"app" \| "env" \| "app_env"` |  | 字段对应：<br>MCP 字段 `level` ↔ 原始 CodeArts 部署 API 同名字段 `level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`app`、`env`、`app_env`。 |
| `app_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `env_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `env_id` ↔ 原始 CodeArts 部署 API 同名字段 `env_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>env ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "level": {
      "type": "string",
      "enum": [
        "app",
        "env",
        "app_env"
      ]
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    },
    "env_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "level"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
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
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 部署 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `timeout` | 否 | `number \| null` |  | 字段对应：<br>MCP 字段 `timeout` ↔ 原始 CodeArts 部署 API 同名字段 `timeout`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>超时时间，通常以秒或分钟为单位，超过后任务会被服务端终止。 |
| `trigger` | 否 | `object` | {"trigger_source":"0","artifact_source_system":"","artifact_type":""} | 字段对应：<br>MCP 字段 `trigger` ↔ 原始 CodeArts 部署 API 同名字段 `trigger`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>触发方式，用于区分手动触发、定时触发、代码提交触发等执行来源。 |
| `slave_cluster_id` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `slave_cluster_id` ↔ 原始 CodeArts 部署 API 同名字段 `slave_cluster_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>从集群 ID，用于定位对应的 CodeArts 资源。 |
| `slave_resource_type` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `slave_resource_type` ↔ 原始 CodeArts 部署 API 同名字段 `slave_resource_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>从资源类型，用于部署应用关联从属资源时标识资源类别。 |
| `create_type` | 否 | `string` | "template" | 字段对应：<br>MCP 字段 `create_type` ↔ 原始 CodeArts 部署 API 同名字段 `create_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建类型，用于区分手工创建、模板创建、复制创建等来源。 |
| `is_draft` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `is_draft` ↔ 原始 CodeArts 部署 API 同名字段 `is_draft`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否为草稿。true 表示创建为草稿状态，暂不正式生效或发布。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `agency_urn` | 否 | `string` |  | 字段对应：<br>MCP 字段 `agency_urn` ↔ 原始 CodeArts 部署 API 同名字段 `agency_urn`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>委托 URN，用于部署等服务通过云委托访问其他云资源。 |
| `arrange_infos` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `arrange_infos` ↔ 原始 CodeArts 部署 API 同名字段 `arrange_infos`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>编排信息列表，用于描述部署任务或应用下各步骤的执行顺序和参数。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### deploy_move_application_group

所属模块：`部署`

说明：执行部署的application组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_move_application_group",
    "arguments": {
      "project_id": "<project_id>",
      "id": "<id>",
      "movement": "<movement>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 部署 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `movement` | 是 | `1 \| -1` |  | 字段对应：<br>MCP 字段 `movement` ↔ 原始 CodeArts 部署 API 同名字段 `movement`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`1`、`-1`。 |
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
    "movement": {
      "type": "number",
      "enum": [
        1,
        -1
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "movement"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_move_applications_to_group

所属模块：`部署`

说明：执行部署的applicationsto组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_move_applications_to_group",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>",
      "application_ids": "<application_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `application_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `application_ids` ↔ 原始 CodeArts 部署 API 同名字段 `application_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "application_ids": {
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
    "group_id",
    "application_ids"
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 部署 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### deploy_post_host_groups_b7fb2358

所属模块：`部署`

说明：执行部署的主机组b7fb2358。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_host_groups_b7fb2358",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_host_groups_hosts_40490a2c

所属模块：`部署`

说明：执行部署的主机组主机40490a2c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_host_groups_hosts_40490a2c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_resources_host_groups_6a926285

所属模块：`部署`

说明：执行部署的resources主机组6a926285。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_resources_host_groups_6a926285",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_resources_host_groups_hosts_69e49263

所属模块：`部署`

说明：执行部署的resources主机组主机69e49263。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_resources_host_groups_hosts_69e49263",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_resources_host_groups_hosts_b635db8a

所属模块：`部署`

说明：执行部署的resources主机组主机b635db8a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_resources_host_groups_hosts_b635db8a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_resources_host_groups_hosts_batch_bd918392

所属模块：`部署`

说明：执行部署的resources主机组主机batchbd918392。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_resources_host_groups_hosts_batch_bd918392",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_post_tasks_records_rollback_d29ab9ee

所属模块：`部署`

说明：执行部署的任务记录rollbackd29ab9ee。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_post_tasks_records_rollback_d29ab9ee",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_applications_disable_70260846

所属模块：`部署`

说明：执行部署的applicationsdisable70260846。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_applications_disable_70260846",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_applications_permissions_8cc45f8d

所属模块：`部署`

说明：执行部署的applicationspermissions8cc45f8d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_applications_permissions_8cc45f8d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_host_groups_7e085a2c

所属模块：`部署`

说明：执行部署的主机组7e085a2c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_host_groups_7e085a2c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_host_groups_hosts_04148b02

所属模块：`部署`

说明：执行部署的主机组主机04148b02。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_host_groups_hosts_04148b02",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_resources_host_groups_38128aaf

所属模块：`部署`

说明：执行部署的resources主机组38128aaf。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_resources_host_groups_38128aaf",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### deploy_put_resources_host_groups_hosts_1ea6aa7d

所属模块：`部署`

说明：执行部署的resources主机组主机1ea6aa7d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_put_resources_host_groups_hosts_1ea6aa7d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 部署 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "arguments": {
      "project_id": "<project_id>",
      "level": "<level>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `level` | 是 | `"app" \| "env" \| "app_env"` |  | 字段对应：<br>MCP 字段 `level` ↔ 原始 CodeArts 部署 API 同名字段 `level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`app`、`env`、`app_env`。 |
| `app_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `app_id` ↔ 原始 CodeArts 部署 API 同名字段 `app_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `env_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `env_id` ↔ 原始 CodeArts 部署 API 同名字段 `env_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>env ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "level": {
      "type": "string",
      "enum": [
        "app",
        "env",
        "app_env"
      ]
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    },
    "env_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "level"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `step_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 部署 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
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

### deploy_request_official_api

所属模块：`部署`

说明：执行部署的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 部署 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 部署 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 部署 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `reason` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reason` ↔ 原始 CodeArts 部署 API 同名字段 `reason`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `operator` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operator` ↔ 原始 CodeArts 部署 API 同名字段 `operator`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作人标识，表示执行本次操作的用户。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `reason` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reason` ↔ 原始 CodeArts 部署 API 同名字段 `reason`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `operator` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operator` ↔ 原始 CodeArts 部署 API 同名字段 `operator`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作人标识，表示执行本次操作的用户。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
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
| `reason` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reason` ↔ 原始 CodeArts 部署 API 同名字段 `reason`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `operator` | 否 | `string` |  | 字段对应：<br>MCP 字段 `operator` ↔ 原始 CodeArts 部署 API 同名字段 `operator`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>操作人标识，表示执行本次操作的用户。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 部署 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `trigger_source` | 否 | `0 \| 1 \| "0" \| "1"` |  | 字段对应：<br>MCP 字段 `trigger_source` ↔ 原始 CodeArts 部署 API 同名字段 `trigger_source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>触发来源，用于标识任务由手动、定时、代码提交、流水线等来源触发。可选值：`0`、`1`、`0`、`1`。 |
| `params` | 否 | `array<object>` | [] | 字段对应：<br>MCP 字段 `params` ↔ 原始 CodeArts 部署 API 同名字段 `params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>参数对象，承载接口需要透传给下游任务、部署步骤或流水线的键值配置。 |
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
| `task_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_id` ↔ 原始 CodeArts 部署 API 同名字段 `task_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务 ID，用于定位对应的 CodeArts 资源。 |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 部署 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
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

### deploy_update_application_environment

所属模块：`部署`

说明：更新部署的application环境。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_update_application_environment",
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 部署 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "application_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_update_application_group

所属模块：`部署`

说明：更新部署的application组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_update_application_group",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>",
      "name": "<name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 部署 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
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
    "group_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_update_application_permission_level

所属模块：`部署`

说明：更新部署的applicationpermissionlevel。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_update_application_permission_level",
    "arguments": {
      "project_id": "<project_id>",
      "application_ids": "<application_ids>",
      "permission_level": "<permission_level>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `application_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `application_ids` ↔ 原始 CodeArts 部署 API 同名字段 `application_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `permission_level` | 是 | `"project" \| "instance"` |  | 字段对应：<br>MCP 字段 `permission_level` ↔ 原始 CodeArts 部署 API 同名字段 `permission_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`project`、`instance`。 |
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
    "application_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "permission_level": {
      "type": "string",
      "enum": [
        "project",
        "instance"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "application_ids",
    "permission_level"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_update_environment_permissions

所属模块：`部署`

说明：更新部署的环境permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_update_environment_permissions",
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
| `application_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `application_id` ↔ 原始 CodeArts 部署 API 同名字段 `application_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>应用 ID，用于定位对应的 CodeArts 资源。 |
| `environment_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `environment_id` ↔ 原始 CodeArts 部署 API 同名字段 `environment_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署环境 ID，用于定位对应的 CodeArts 资源。 |
| `role_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 部署 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `permission_name` | 否 | `"can_view" \| "can_edit" \| "can_delete" \| "can_deploy" \| "can_manage"` |  | 字段对应：<br>MCP 字段 `permission_name` ↔ 原始 CodeArts 部署 API 同名字段 `permission_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>permission名称。可选值：`can_view`、`can_edit`、`can_delete`、`can_deploy`、`can_manage`。 |
| `permission_value` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `permission_value` ↔ 原始 CodeArts 部署 API 同名字段 `permission_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "role_id": {
      "$ref": "#/properties/application_id"
    },
    "permission_name": {
      "type": "string",
      "enum": [
        "can_view",
        "can_edit",
        "can_delete",
        "can_deploy",
        "can_manage"
      ]
    },
    "permission_value": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### deploy_update_host_group_permissions

所属模块：`部署`

说明：更新部署的主机组permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_update_host_group_permissions",
    "arguments": {
      "group_id": "<group_id>",
      "project_id": "<project_id>",
      "role_id": "<role_id>",
      "permission_name": "<permission_name>",
      "permission_value": "<permission_value>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 部署 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 部署 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `role_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 部署 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `permission_name` | 是 | `"can_view" \| "can_edit" \| "can_delete" \| "can_add_host" \| "can_manage" \| "can_copy"` |  | 字段对应：<br>MCP 字段 `permission_name` ↔ 原始 CodeArts 部署 API 同名字段 `permission_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>permission名称。可选值：`can_view`、`can_edit`、`can_delete`、`can_add_host`、`can_manage`、`can_copy`。 |
| `permission_value` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `permission_value` ↔ 原始 CodeArts 部署 API 同名字段 `permission_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "project_id": {
      "$ref": "#/properties/group_id"
    },
    "role_id": {
      "$ref": "#/properties/group_id"
    },
    "permission_name": {
      "type": "string",
      "enum": [
        "can_view",
        "can_edit",
        "can_delete",
        "can_add_host",
        "can_manage",
        "can_copy"
      ]
    },
    "permission_value": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "project_id",
    "role_id",
    "permission_name",
    "permission_value"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

