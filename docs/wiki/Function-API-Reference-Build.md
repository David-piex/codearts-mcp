# CodeArts MCP 函数 API 参考 - 编译构建

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`编译构建`

API 数量：`167`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

### build_add_keystore_permission

所属模块：`编译构建`

说明：添加编译构建的keystorepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_add_keystore_permission",
    "arguments": {
      "keystore_id": "<keystore_id>",
      "user_id": "<user_id>",
      "user_name": "<user_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `keystore_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `keystore_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `keystore_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>keystore ID，用于定位对应的 CodeArts 资源。 |
| `user_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户 ID，用于定位对应的 CodeArts 资源。 |
| `user_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `user_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户名称。 |
| `setting` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `setting` ↔ 原始 CodeArts 编译构建 API 同名字段 `setting`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `delete` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `delete` ↔ 原始 CodeArts 编译构建 API 同名字段 `delete`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `modify` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `modify` ↔ 原始 CodeArts 编译构建 API 同名字段 `modify`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `usage` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `usage` ↔ 原始 CodeArts 编译构建 API 同名字段 `usage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `can_absent` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `can_absent` ↔ 原始 CodeArts 编译构建 API 同名字段 `can_absent`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "keystore_id": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/keystore_id"
    },
    "user_name": {
      "type": "string",
      "minLength": 1
    },
    "setting": {
      "type": "boolean",
      "default": true
    },
    "delete": {
      "type": "boolean",
      "default": false
    },
    "modify": {
      "type": "boolean",
      "default": true
    },
    "usage": {
      "type": "boolean",
      "default": true
    },
    "can_absent": {
      "type": "boolean",
      "default": true
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "keystore_id",
    "user_id",
    "user_name"
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `module_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `module_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `module_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模块 ID，用于定位对应的 CodeArts 资源。 |
| `enable` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `enable` ↔ 原始 CodeArts 编译构建 API 同名字段 `enable`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否启用。true 表示启用该配置、步骤、规则或能力。 |
| `version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `version` ↔ 原始 CodeArts 编译构建 API 同名字段 `version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。 |
| `image` | 否 | `string` |  | 字段对应：<br>MCP 字段 `image` ↔ 原始 CodeArts 编译构建 API 同名字段 `image`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>镜像名称或镜像地址，用于构建、部署或运行环境选择。 |
| `command` | 否 | `string` |  | 字段对应：<br>MCP 字段 `command` ↔ 原始 CodeArts 编译构建 API 同名字段 `command`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>命令行内容，用于构建、部署或脚本步骤执行。 |
| `pre_condition` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pre_condition` ↔ 原始 CodeArts 编译构建 API 同名字段 `pre_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>前置条件表达式，满足条件时才执行对应步骤。 |
| `properties` | 否 | `object` |  | 字段对应：<br>MCP 字段 `properties` ↔ 原始 CodeArts 编译构建 API 同名字段 `properties`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>属性配置对象，用于构建步骤、部署步骤或插件步骤的键值参数。 |
| `insert_after_step_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `insert_after_step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `insert_after_step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>insertafter步骤名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 编译构建 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `package_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `package_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `package_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>package名称。 |
| `package_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `package_version` ↔ 原始 CodeArts 编译构建 API 同名字段 `package_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>发布包或制品版本号，用于上传、查询或归档构建产物。 |
| `custom_upload_path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `custom_upload_path` ↔ 原始 CodeArts 编译构建 API 同名字段 `custom_upload_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>自定义上传路径，用于指定制品上传到仓库中的目标目录。 |
| `upload_tool` | 否 | `string` | "curl" | 字段对应：<br>MCP 字段 `upload_tool` ↔ 原始 CodeArts 编译构建 API 同名字段 `upload_tool`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>上传工具类型，用于选择发布包或制品上传方式。 |
| `continue_on_failure` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `continue_on_failure` ↔ 原始 CodeArts 编译构建 API 同名字段 `continue_on_failure`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>失败后是否继续。true 表示当前步骤失败后仍继续后续步骤。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `pre_condition` | 否 | `string` | "SUCCESS" | 字段对应：<br>MCP 字段 `pre_condition` ↔ 原始 CodeArts 编译构建 API 同名字段 `pre_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>前置条件表达式，满足条件时才执行对应步骤。 |
| `insert_after_step_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `insert_after_step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `insert_after_step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>insertafter步骤名称。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_auto_execute_job

所属模块：`编译构建`

说明：执行编译构建的execute任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_auto_execute_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `event_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `event_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `event_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 编译构建 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `after` ↔ 原始 CodeArts 编译构建 API 同名字段 `after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `before` ↔ 原始 CodeArts 编译构建 API 同名字段 `before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `commits` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `commits` ↔ 原始 CodeArts 编译构建 API 同名字段 `commits`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository` | 否 | `object` |  | 字段对应：<br>MCP 字段 `repository` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "event_type": {
      "type": "string",
      "minLength": 1
    },
    "ref": {
      "type": "string",
      "minLength": 1
    },
    "after": {
      "type": "string",
      "minLength": 1
    },
    "before": {
      "type": "string",
      "minLength": 1
    },
    "commits": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "repository": {
      "type": "object",
      "additionalProperties": {}
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

### build_batch_delete_jobs

所属模块：`编译构建`

说明：批量处理编译构建的delete任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_batch_delete_jobs",
    "arguments": {
      "job_ids": "<job_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `job_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_ids": {
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
    "job_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_batch_set_agency

所属模块：`编译构建`

说明：批量处理编译构建的setagency。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_batch_set_agency",
    "arguments": {
      "job_ids": "<job_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `job_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `agency_urn` | 否 | `string` |  | 字段对应：<br>MCP 字段 `agency_urn` ↔ 原始 CodeArts 编译构建 API 同名字段 `agency_urn`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>委托 URN，用于部署等服务通过云委托访问其他云资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "agency_urn": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_batch_update_job_permissions

所属模块：`编译构建`

说明：批量处理编译构建的update任务permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_batch_update_job_permissions",
    "arguments": {
      "project_id": "<project_id>",
      "job_ids": "<job_ids>",
      "permissions": "<permissions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_ids` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `job_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `project_switch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `project_switch` ↔ 原始 CodeArts 编译构建 API 同名字段 `project_switch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `permissions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `permissions` ↔ 原始 CodeArts 编译构建 API 同名字段 `permissions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "job_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "project_switch": {
      "type": "boolean"
    },
    "permissions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "role_id": {
            "type": "integer"
          },
          "devuc_role_id": {
            "type": "string",
            "minLength": 1
          },
          "role_name": {
            "type": "string",
            "minLength": 1
          },
          "is_modify": {
            "type": "boolean"
          },
          "is_delete": {
            "type": "boolean"
          },
          "is_view": {
            "type": "boolean"
          },
          "is_execute": {
            "type": "boolean"
          },
          "is_copy": {
            "type": "boolean"
          },
          "is_forbidden": {
            "type": "boolean"
          },
          "is_manager": {
            "type": "boolean"
          },
          "count": {
            "type": "integer"
          }
        },
        "required": [
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
    "job_ids",
    "permissions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_check_job_count_limit

所属模块：`编译构建`

说明：检查编译构建的任务数量limit。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_check_job_count_limit",
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

### build_check_job_name_exists

所属模块：`编译构建`

说明：检查编译构建的任务nameexists。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_check_job_name_exists",
    "arguments": {
      "project_id": "<project_id>",
      "job_name": "<job_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "job_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "job_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_check_webhook_url

所属模块：`编译构建`

说明：检查编译构建的webhookurl。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_check_webhook_url",
    "arguments": {
      "job_id": "<job_id>",
      "notice_type": "<notice_type>",
      "webhook_url": "<webhook_url>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `notice_type` | 是 | `"MESSAGE" \| "MAIL" \| "WECOM" \| "DING_TALK" \| "FEISHU"` |  | 字段对应：<br>MCP 字段 `notice_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `notice_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`MESSAGE`、`MAIL`、`WECOM`、`DING_TALK`、`FEISHU`。 |
| `webhook_url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `webhook_url` ↔ 原始 CodeArts 编译构建 API 同名字段 `webhook_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>webhook URL，用于指定服务地址、资源地址或回调地址。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "notice_type": {
      "type": "string",
      "enum": [
        "MESSAGE",
        "MAIL",
        "WECOM",
        "DING_TALK",
        "FEISHU"
      ]
    },
    "webhook_url": {
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
    "notice_type",
    "webhook_url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_clear_recycling_jobs

所属模块：`编译构建`

说明：清除编译构建的recycling任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_clear_recycling_jobs",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 否 | `string` | "Upload package to release repository" | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `file` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file` ↔ 原始 CodeArts 编译构建 API 同名字段 `file`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件路径或文件内容。具体含义取决于所在接口：上传场景通常是文件路径，配置场景可能是文件名或配置内容。 |
| `package_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `package_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `package_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>package名称。 |
| `build_version` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_version` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_version`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建产物版本号，用于发布上传步骤中标识本次产物版本。 |
| `custom_upload_path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `custom_upload_path` ↔ 原始 CodeArts 编译构建 API 同名字段 `custom_upload_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>自定义上传路径，用于指定制品上传到仓库中的目标目录。 |
| `upload_tool` | 否 | `string` | "curl" | 字段对应：<br>MCP 字段 `upload_tool` ↔ 原始 CodeArts 编译构建 API 同名字段 `upload_tool`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>上传工具类型，用于选择发布包或制品上传方式。 |
| `remain_origin_path` | 否 | `string` | "FLAT" | 字段对应：<br>MCP 字段 `remain_origin_path` ↔ 原始 CodeArts 编译构建 API 同名字段 `remain_origin_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否保留原始路径。true 表示上传制品时保留本地目录结构。 |
| `pre_condition` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pre_condition` ↔ 原始 CodeArts 编译构建 API 同名字段 `pre_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>前置条件表达式，满足条件时才执行对应步骤。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_copy_job

所属模块：`编译构建`

说明：复制编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_copy_job",
    "arguments": {
      "project_id": "<project_id>",
      "copy_job_id": "<copy_job_id>",
      "job_name": "<job_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `copy_job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `copy_job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `copy_job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>copy任务 ID，用于定位对应的 CodeArts 资源。 |
| `job_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务名称。 |
| `arch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `arch` ↔ 原始 CodeArts 编译构建 API 同名字段 `arch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `auto_update_sub_module` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `auto_update_sub_module` ↔ 原始 CodeArts 编译构建 API 同名字段 `auto_update_sub_module`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `flavor` | 否 | `string` |  | 字段对应：<br>MCP 字段 `flavor` ↔ 原始 CodeArts 编译构建 API 同名字段 `flavor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "copy_job_id": {
      "$ref": "#/properties/project_id"
    },
    "job_name": {
      "type": "string",
      "minLength": 1
    },
    "arch": {
      "type": "string",
      "minLength": 1
    },
    "auto_update_sub_module": {
      "type": "boolean"
    },
    "flavor": {
      "type": "string",
      "minLength": 1
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
    "copy_job_id",
    "job_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_create_job

所属模块：`编译构建`

说明：创建编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_create_job",
    "arguments": {
      "project_id": "<project_id>",
      "job_name": "<job_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务名称。 |
| `arch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `arch` ↔ 原始 CodeArts 编译构建 API 同名字段 `arch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `auto_update_sub_module` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `auto_update_sub_module` ↔ 原始 CodeArts 编译构建 API 同名字段 `auto_update_sub_module`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `flavor` | 否 | `string` |  | 字段对应：<br>MCP 字段 `flavor` ↔ 原始 CodeArts 编译构建 API 同名字段 `flavor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "job_name": {
      "type": "string",
      "minLength": 1
    },
    "arch": {
      "type": "string",
      "minLength": 1
    },
    "auto_update_sub_module": {
      "type": "boolean"
    },
    "flavor": {
      "type": "string",
      "minLength": 1
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
    "job_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_create_job_group

所属模块：`编译构建`

说明：创建编译构建的任务组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_create_job_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `group_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
      "maxLength": 128
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "group_id": {
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
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_create_job_v3

所属模块：`编译构建`

说明：创建编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_create_job_v3",
    "arguments": {
      "project_id": "<project_id>",
      "job_name": "<job_name>",
      "arch": "<arch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务名称。 |
| `arch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `arch` ↔ 原始 CodeArts 编译构建 API 同名字段 `arch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `auto_update_sub_module` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `auto_update_sub_module` ↔ 原始 CodeArts 编译构建 API 同名字段 `auto_update_sub_module`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `flavor` | 否 | `string` |  | 字段对应：<br>MCP 字段 `flavor` ↔ 原始 CodeArts 编译构建 API 同名字段 `flavor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `host_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `host_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `host_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `build_config_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_config_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_config_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `agency_urn` | 否 | `string` |  | 字段对应：<br>MCP 字段 `agency_urn` ↔ 原始 CodeArts 编译构建 API 同名字段 `agency_urn`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>委托 URN，用于部署等服务通过云委托访问其他云资源。 |
| `source_code` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_code` ↔ 原始 CodeArts 编译构建 API 同名字段 `source_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `parameters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameters` ↔ 原始 CodeArts 编译构建 API 同名字段 `parameters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `scms` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `scms` ↔ 原始 CodeArts 编译构建 API 同名字段 `scms`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `steps` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `steps` ↔ 原始 CodeArts 编译构建 API 同名字段 `steps`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "job_name": {
      "type": "string",
      "minLength": 1
    },
    "arch": {
      "type": "string",
      "minLength": 1
    },
    "auto_update_sub_module": {
      "type": "boolean"
    },
    "flavor": {
      "type": "string",
      "minLength": 1
    },
    "host_type": {
      "type": "string",
      "minLength": 1
    },
    "build_config_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string",
      "minLength": 1
    },
    "source_code": {
      "type": "string",
      "minLength": 1
    },
    "parameters": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "scms": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
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
    "job_name",
    "arch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_create_template

所属模块：`编译构建`

说明：创建编译构建的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_create_template",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "name": "<name>",
      "template": "<template>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 编译构建 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `tool_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tool_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `tool_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `template` | 是 | `object` |  | 字段对应：<br>MCP 字段 `template` ↔ 原始 CodeArts 编译构建 API 同名字段 `template`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `parameters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameters` ↔ 原始 CodeArts 编译构建 API 同名字段 `parameters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `resource_limit` | 否 | `object` |  | 字段对应：<br>MCP 字段 `resource_limit` ↔ 原始 CodeArts 编译构建 API 同名字段 `resource_limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
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
    "tool_type": {
      "type": "string",
      "minLength": 1
    },
    "template": {
      "type": "object",
      "additionalProperties": {}
    },
    "parameters": {
      "type": "array",
      "items": {
        "$ref": "#/properties/template"
      }
    },
    "resource_limit": {
      "$ref": "#/properties/template"
    },
    "body": {
      "$ref": "#/properties/template",
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "name",
    "template"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_create_template_v3

所属模块：`编译构建`

说明：创建编译构建的模板v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_create_template_v3",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "name": "<name>",
      "template": "<template>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 编译构建 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `tool_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tool_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `tool_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `template` | 是 | `object` |  | 字段对应：<br>MCP 字段 `template` ↔ 原始 CodeArts 编译构建 API 同名字段 `template`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `parameters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameters` ↔ 原始 CodeArts 编译构建 API 同名字段 `parameters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `resource_limit` | 否 | `object` |  | 字段对应：<br>MCP 字段 `resource_limit` ↔ 原始 CodeArts 编译构建 API 同名字段 `resource_limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
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
    "tool_type": {
      "type": "string",
      "minLength": 1
    },
    "template": {
      "type": "object",
      "additionalProperties": {}
    },
    "parameters": {
      "type": "array",
      "items": {
        "$ref": "#/properties/template"
      }
    },
    "resource_limit": {
      "$ref": "#/properties/template"
    },
    "body": {
      "$ref": "#/properties/template",
      "default": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "name",
    "template"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_delete_job

所属模块：`编译构建`

说明：删除编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_delete_job_group

所属模块：`编译构建`

说明：删除编译构建的任务组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_job_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
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

### build_delete_job_v3

所属模块：`编译构建`

说明：删除编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_job_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_delete_keystore

所属模块：`编译构建`

说明：删除编译构建的keystore。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_keystore",
    "arguments": {
      "keystore_id": "<keystore_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `keystore_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `keystore_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `keystore_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>keystore ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "keystore_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "keystore_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_delete_keystore_permission

所属模块：`编译构建`

说明：删除编译构建的keystorepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_keystore_permission",
    "arguments": {
      "permission_id": "<permission_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `permission_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `permission_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `permission_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>permission ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "permission_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "permission_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_delete_recycling_jobs

所属模块：`编译构建`

说明：删除编译构建的recycling任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_recycling_jobs",
    "arguments": {
      "job_ids": "<job_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `job_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_ids": {
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
    "job_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_delete_template

所属模块：`编译构建`

说明：删除编译构建的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
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

### build_delete_templates_delete_7fa91100

所属模块：`编译构建`

说明：删除编译构建的模板delete7fa91100。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_delete_templates_delete_7fa91100",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_disable_job

所属模块：`编译构建`

说明：停用编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_disable_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `disabled` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `disabled` ↔ 原始 CodeArts 编译构建 API 同名字段 `disabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reason` | 否 | `string` | "" | 字段对应：<br>MCP 字段 `reason` ↔ 原始 CodeArts 编译构建 API 同名字段 `reason`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "disabled": {
      "type": "boolean",
      "default": true
    },
    "reason": {
      "type": "string",
      "default": ""
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

### build_disable_job_notice

所属模块：`编译构建`

说明：停用编译构建的任务notice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_disable_job_notice",
    "arguments": {
      "job_id": "<job_id>",
      "notice_type": "<notice_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `notice_type` | 是 | `"message" \| "mail" \| "wecom" \| "ding_talk" \| "feishu" \| "MESSAGE" \| "MAIL" \| "WECOM" \| "DING_TALK" \| "FEISHU"` |  | 字段对应：<br>MCP 字段 `notice_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `notice_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`message`、`mail`、`wecom`、`ding_talk`、`feishu`、`MESSAGE`、`MAIL`、`WECOM`、`DING_TALK`、`FEISHU`。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "notice_type": {
      "type": "string",
      "enum": [
        "message",
        "mail",
        "wecom",
        "ding_talk",
        "feishu",
        "MESSAGE",
        "MAIL",
        "WECOM",
        "DING_TALK",
        "FEISHU"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "notice_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_disable_job_v3

所属模块：`编译构建`

说明：停用编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_disable_job_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_download_build_log_v4

所属模块：`编译构建`

说明：下载编译构建的构建日志v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_build_log_v4",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `log_level` | 否 | `"INFO" \| "DEBUG"` | "INFO" | 字段对应：<br>MCP 字段 `log_level` ↔ 原始 CodeArts 编译构建 API 同名字段 `log_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`INFO`、`DEBUG`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    },
    "log_level": {
      "type": "string",
      "enum": [
        "INFO",
        "DEBUG"
      ],
      "default": "INFO"
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_download_full_log

所属模块：`编译构建`

说明：下载编译构建的full日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_full_log",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### build_download_keystore_v2

所属模块：`编译构建`

说明：下载编译构建的keystorev2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_keystore_v2",
    "arguments": {
      "name": "<name>",
      "domain_id": "<domain_id>",
      "id": "<id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "name",
    "domain_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_download_keystore_v3

所属模块：`编译构建`

说明：下载编译构建的keystorev3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_keystore_v3",
    "arguments": {
      "file_name": "<file_name>",
      "domain_id": "<domain_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `file_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |
| `domain_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `domain_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `domain_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "file_name",
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_download_log_by_record_id_v3

所属模块：`编译构建`

说明：下载编译构建的日志by记录idv3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_log_by_record_id_v3",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### build_download_task_log

所属模块：`编译构建`

说明：下载编译构建的任务日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_task_log",
    "arguments": {
      "record_id": "<record_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### build_download_task_log_v4

所属模块：`编译构建`

说明：下载编译构建的任务日志v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_download_task_log_v4",
    "arguments": {
      "record_id": "<record_id>",
      "task_name": "<task_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `task_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `task_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `task_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>任务名称。 |
| `log_level` | 否 | `"INFO" \| "DEBUG"` | "INFO" | 字段对应：<br>MCP 字段 `log_level` ↔ 原始 CodeArts 编译构建 API 同名字段 `log_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`INFO`、`DEBUG`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "log_level": {
      "type": "string",
      "enum": [
        "INFO",
        "DEBUG"
      ],
      "default": "INFO"
    }
  },
  "required": [
    "record_id",
    "task_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_edit_keystore_permission

所属模块：`编译构建`

说明：执行编译构建的keystorepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_edit_keystore_permission",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "id": "<id>",
      "keystore_id": "<keystore_id>",
      "user_name": "<user_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 编译构建 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `keystore_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `keystore_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `keystore_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>keystore ID，用于定位对应的 CodeArts 资源。 |
| `user_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `user_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户名称。 |
| `modify` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `modify` ↔ 原始 CodeArts 编译构建 API 同名字段 `modify`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `usage` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `usage` ↔ 原始 CodeArts 编译构建 API 同名字段 `usage`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `delete` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `delete` ↔ 原始 CodeArts 编译构建 API 同名字段 `delete`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `can_absent` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `can_absent` ↔ 原始 CodeArts 编译构建 API 同名字段 `can_absent`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "type": "string",
      "minLength": 1
    },
    "keystore_id": {
      "$ref": "#/properties/id"
    },
    "user_name": {
      "type": "string",
      "minLength": 1
    },
    "modify": {
      "type": "boolean",
      "default": true
    },
    "usage": {
      "type": "boolean",
      "default": true
    },
    "delete": {
      "type": "boolean",
      "default": false
    },
    "can_absent": {
      "type": "boolean",
      "default": true
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "id",
    "keystore_id",
    "user_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_follow_custom_template

所属模块：`编译构建`

说明：执行编译构建的自定义模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_follow_custom_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
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

### build_follow_job

所属模块：`编译构建`

说明：执行编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_follow_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_follow_official_template

所属模块：`编译构建`

说明：执行编译构建的official模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_follow_official_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
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

### build_get_build_details

所属模块：`编译构建`

说明：获取编译构建的构建详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_build_details",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_get_code_git_code_branches_20ab4e40

所属模块：`编译构建`

说明：获取编译构建的codegitcode分支20ab4e40。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_code_git_code_branches_20ab4e40",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_coverage_metrics

所属模块：`编译构建`

说明：获取编译构建的coveragemetrics。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_coverage_metrics",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": "<build_no>",
      "root_id": "<root_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `root_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `root_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `root_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>root ID，用于定位对应的 CodeArts 资源。 |

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
    "root_id": {
      "$ref": "#/properties/job_id"
    }
  },
  "required": [
    "job_id",
    "build_no",
    "root_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_dockerfile_template

所属模块：`编译构建`

说明：获取编译构建的dockerfile模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_dockerfile_template",
    "arguments": {
      "image_id": "<image_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `image_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `image_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `image_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>图片 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "image_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "image_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_domain_charge_type

所属模块：`编译构建`

说明：获取编译构建的领域chargetype。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_charge_type",
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

### build_get_domain_federation

所属模块：`编译构建`

说明：获取编译构建的领域federation。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_federation",
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

### build_get_domain_job_summary

所属模块：`编译构建`

说明：获取编译构建的领域任务摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_job_summary",
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

### build_get_domain_package_quota

所属模块：`编译构建`

说明：获取编译构建的领域packagequota。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_package_quota",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### build_get_domain_status

所属模块：`编译构建`

说明：获取编译构建的领域状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_status",
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

### build_get_domain_user_permission

所属模块：`编译构建`

说明：获取编译构建的领域用户permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_domain_user_permission",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### build_get_download_log_d13d5ecb

所属模块：`编译构建`

说明：获取编译构建的下载日志d13d5ecb。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_download_log_d13d5ecb",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |
| `cascade` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `cascade` ↔ 原始 CodeArts 编译构建 API 同名字段 `cascade`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否级联查询或级联操作。true 表示包含下级资源或对子资源同步处理。 |

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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_number` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_number` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_number`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_build_success_ratio

所属模块：`编译构建`

说明：获取编译构建的任务构建successratio。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_build_success_ratio",
    "arguments": {
      "job_id": "<job_id>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |
| `branch` | 否 | `string` | "all" | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 编译构建 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `interval` | 否 | `integer` | 7 | 字段对应：<br>MCP 字段 `interval` ↔ 原始 CodeArts 编译构建 API 同名字段 `interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "default": "all"
    },
    "interval": {
      "type": "integer",
      "minimum": 1,
      "maximum": 30,
      "default": 7
    }
  },
  "required": [
    "job_id",
    "repository_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job_build_time

所属模块：`编译构建`

说明：获取编译构建的任务构建time。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_build_time",
    "arguments": {
      "job_id": "<job_id>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |
| `branch` | 否 | `string` | "all" | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 编译构建 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `interval` | 否 | `integer` | 7 | 字段对应：<br>MCP 字段 `interval` ↔ 原始 CodeArts 编译构建 API 同名字段 `interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "default": "all"
    },
    "interval": {
      "type": "integer",
      "minimum": 1,
      "maximum": 30,
      "default": 7
    }
  },
  "required": [
    "job_id",
    "repository_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job_config_diff

所属模块：`编译构建`

说明：获取编译构建的任务配置diff。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_config_diff",
    "arguments": {
      "job_id": "<job_id>",
      "revisedl_no": "<revisedl_no>",
      "original_no": "<original_no>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `revisedl_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `revisedl_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `revisedl_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `original_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `original_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `original_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "revisedl_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "original_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "revisedl_no",
    "original_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job_copy_name

所属模块：`编译构建`

说明：获取编译构建的任务copyname。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_copy_name",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_disable_check

所属模块：`编译构建`

说明：获取编译构建的任务disable检查。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_disable_check",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_info

所属模块：`编译构建`

说明：获取编译构建的任务信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_info",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_notice

所属模块：`编译构建`

说明：获取编译构建的任务notice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_notice",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_output

所属模块：`编译构建`

说明：获取编译构建的任务output。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_output",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_get_job_permission

所属模块：`编译构建`

说明：获取编译构建的任务permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_permission",
    "arguments": {
      "project_id": "<project_id>",
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job_permission_internal

所属模块：`编译构建`

说明：获取编译构建的任务permissioninternal。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_permission_internal",
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

### build_get_job_pipeline_info

所属模块：`编译构建`

说明：获取编译构建的任务流水线信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_pipeline_info",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_running_status

所属模块：`编译构建`

说明：获取编译构建的任务running状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_running_status",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_running_status_v3

所属模块：`编译构建`

说明：获取编译构建的任务running状态v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_running_status_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_step_status

所属模块：`编译构建`

说明：获取编译构建的任务步骤状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_step_status",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_job_success_ratio_v3

所属模块：`编译构建`

说明：获取编译构建的任务successratiov3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job_success_ratio_v3",
    "arguments": {
      "job_id": "<job_id>",
      "start_time": "<start_time>",
      "end_time": "<end_time>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `start_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "start_time": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    },
    "end_time": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    }
  },
  "required": [
    "job_id",
    "start_time",
    "end_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_jobs_query_80247a54

所属模块：`编译构建`

说明：获取编译构建的任务query80247a54。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_jobs_query_80247a54",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_jobs_record_info_700d2d87

所属模块：`编译构建`

说明：获取编译构建的任务记录信息700d2d87。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_jobs_record_info_700d2d87",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_keystore_list_1e22880a

所属模块：`编译构建`

说明：获取编译构建的keystorelist1e22880a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_keystore_list_1e22880a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_keystore_permission

所属模块：`编译构建`

说明：获取编译构建的keystorepermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_keystore_permission",
    "arguments": {
      "keystore_id": "<keystore_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `keystore_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `keystore_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `keystore_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>keystore ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "keystore_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "keystore_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_last_history_v3

所属模块：`编译构建`

说明：获取编译构建的last历史v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_last_history_v3",
    "arguments": {
      "project_id": "<project_id>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "project_id",
    "repository_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_log_real_time_log_24c4401b

所属模块：`编译构建`

说明：获取编译构建的日志realtime日志24c4401b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_log_real_time_log_24c4401b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_log_stage_page_c09f6cbb

所属模块：`编译构建`

说明：获取编译构建的日志阶段pagec09f6cbb。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_log_stage_page_c09f6cbb",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_log_task_step_78933f4d

所属模块：`编译构建`

说明：获取编译构建的日志任务步骤78933f4d。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_log_task_step_78933f4d",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_output_info_v3

所属模块：`编译构建`

说明：获取编译构建的output信息v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_output_info_v3",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_get_project_default_permission

所属模块：`编译构建`

说明：获取编译构建的项目defaultpermission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_project_default_permission",
    "arguments": {
      "project_id": "<project_id>",
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `build_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_project_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建工程 ID，用于定位对应的 CodeArts 资源。 |

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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `offset` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 编译构建 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |

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
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_record_info_v4

所属模块：`编译构建`

说明：获取编译构建的记录信息v4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_info_v4",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_get_record_record_info_c2ab88aa

所属模块：`编译构建`

说明：获取编译构建的记录记录信息c2ab88aa。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_record_info_c2ab88aa",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_record_records_d83a7c42

所属模块：`编译构建`

说明：获取编译构建的记录记录d83a7c42。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_records_d83a7c42",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
| `record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>执行记录 ID，用于定位对应的 CodeArts 资源。 |

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

### build_get_record_statistics_48ef3cbe

所属模块：`编译构建`

说明：获取编译构建的记录统计48ef3cbe。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_statistics_48ef3cbe",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_report_junit_coverage_download_112871cc

所属模块：`编译构建`

说明：获取编译构建的reportjunitcoverage下载112871cc。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_report_junit_coverage_download_112871cc",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_report_summary

所属模块：`编译构建`

说明：获取编译构建的report摘要。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_report_summary",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_get_running_step_log

所属模块：`编译构建`

说明：获取编译构建的running步骤日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_running_step_log",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
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

### build_get_stage_log_page

所属模块：`编译构建`

说明：获取编译构建的阶段日志page。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_stage_log_page",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
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

### build_get_task_log_27885946

所属模块：`编译构建`

说明：获取编译构建的任务日志27885946。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_task_log_27885946",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_get_task_log_page

所属模块：`编译构建`

说明：获取编译构建的任务日志page。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_task_log_page",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": "<build_no>",
      "step_id": "<step_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `step_id` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `step_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤 ID，用于定位对应的 CodeArts 资源。 |
| `start_offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `start_offset` ↔ 原始 CodeArts 编译构建 API 同名字段 `start_offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `end_offset` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `end_offset` ↔ 原始 CodeArts 编译构建 API 同名字段 `end_offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志结束偏移量，用于增量读取部署或构建日志。 |
| `sort` | 否 | `"AES" \| "DESC"` | "DESC" | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`AES`、`DESC`。 |

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
    "step_id": {
      "type": "integer",
      "minimum": 0
    },
    "start_offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "end_offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "sort": {
      "type": "string",
      "enum": [
        "AES",
        "DESC"
      ],
      "default": "DESC"
    }
  },
  "required": [
    "job_id",
    "build_no",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_template

所属模块：`编译构建`

说明：获取编译构建的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |

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

### build_get_yaml_template

所属模块：`编译构建`

说明：获取编译构建的yaml模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_yaml_template",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_list_all_jobs

所属模块：`编译构建`

说明：查询编译构建的all任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_all_jobs",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `build_status` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_status` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `creator_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `creator_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `creator_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>creator ID，用于定位对应的 CodeArts 资源。 |
| `sort_field` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_field` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_field`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `sort_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "build_status": {
      "type": "string",
      "minLength": 1
    },
    "creator_id": {
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
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_brief_records

所属模块：`编译构建`

说明：查询编译构建的brief记录。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_brief_records",
    "arguments": {
      "build_project_ids": "<build_project_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `build_project_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `build_project_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_project_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建工程 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "build_project_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "build_project_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_build_info_records_v3

所属模块：`编译构建`

说明：查询编译构建的构建信息记录v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_build_info_records_v3",
    "arguments": {
      "job_id": "<job_id>",
      "start_time": "<start_time>",
      "end_time": "<end_time>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `start_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "start_time": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$"
    },
    "end_time": {
      "$ref": "#/properties/start_time"
    }
  },
  "required": [
    "job_id",
    "start_time",
    "end_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_build_parameter_types

所属模块：`编译构建`

说明：查询编译构建的构建parametertypes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_build_parameter_types",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_list_code_tags

所属模块：`编译构建`

说明：查询编译构建的code标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_code_tags",
    "arguments": {
      "scm_type": "<scm_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `scm_type` | 是 | `string` |  | 字段对应：<br>MCP 字段 `scm_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `scm_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repo_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repo_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `repo_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>repo ID，用于定位对应的 CodeArts 资源。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 编译构建 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "scm_type": {
      "type": "string",
      "minLength": 1
    },
    "repo_id": {
      "type": "string",
      "minLength": 1
    },
    "search": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "scm_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_custom_templates

所属模块：`编译构建`

说明：查询编译构建的自定义模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_custom_templates",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `filter` | 否 | `string` |  | 字段对应：<br>MCP 字段 `filter` ↔ 原始 CodeArts 编译构建 API 同名字段 `filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>过滤条件对象或过滤表达式，用于缩小查询范围。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "name": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_default_parameters

所属模块：`编译构建`

说明：查询编译构建的default参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_default_parameters",
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

### build_list_domain_related_projects

所属模块：`编译构建`

说明：查询编译构建的领域相关项目。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_domain_related_projects",
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

### build_list_domain_related_projects_page

所属模块：`编译构建`

说明：查询编译构建的领域相关项目page。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_domain_related_projects_page",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 编译构建 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "search": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_git_code_branches

所属模块：`编译构建`

说明：查询编译构建的gitcode分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_git_code_branches",
    "arguments": {
      "endpoint_id": "<endpoint_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `endpoint_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `endpoint_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `endpoint_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>服务端点 ID，用于定位对应的 CodeArts 资源。 |
| `repository_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "endpoint_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "endpoint_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_git_code_repositories

所属模块：`编译构建`

说明：查询编译构建的gitcode仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_git_code_repositories",
    "arguments": {
      "endpoint_id": "<endpoint_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `endpoint_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `endpoint_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `endpoint_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>服务端点 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "endpoint_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "endpoint_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_image_templates

所属模块：`编译构建`

说明：查询编译构建的图片模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_image_templates",
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

### build_list_job_badge_branches

所属模块：`编译构建`

说明：查询编译构建的任务badge分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_badge_branches",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_list_job_config_v3

所属模块：`编译构建`

说明：查询编译构建的任务配置v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_config_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `get_all_params` | 否 | `"true" \| "false"` |  | 字段对应：<br>MCP 字段 `get_all_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `get_all_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`true`、`false`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "get_all_params": {
      "type": "string",
      "enum": [
        "true",
        "false"
      ]
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_job_group_tree

所属模块：`编译构建`

说明：查询编译构建的任务组树。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_group_tree",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### build_list_job_history_v3

所属模块：`编译构建`

说明：查询编译构建的任务历史v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_history_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `interval` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `interval` ↔ 原始 CodeArts 编译构建 API 同名字段 `interval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "interval": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_job_notices_v3

所属模块：`编译构建`

说明：查询编译构建的任务noticesv3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_notices_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_list_job_permission_roles

所属模块：`编译构建`

说明：查询编译构建的任务permissionroles。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_permission_roles",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_list_job_update_history

所属模块：`编译构建`

说明：查询编译构建的任务update历史。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_job_update_history",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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

### build_list_junit_coverage_summaries

所属模块：`编译构建`

说明：查询编译构建的junitcoveragesummaries。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_junit_coverage_summaries",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |

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

### build_list_keystore_files

所属模块：`编译构建`

说明：查询编译构建的keystore文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_keystore_files",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `query` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
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

### build_list_official_templates

所属模块：`编译构建`

说明：查询编译构建的official模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_official_templates",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_package_spec_statuses

所属模块：`编译构建`

说明：查询编译构建的packagespec状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_package_spec_statuses",
    "arguments": {
      "project_id": "<project_id>",
      "status": "<status>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `status` | 是 | `string` |  | 字段对应：<br>MCP 字段 `status` ↔ 原始 CodeArts 编译构建 API 同名字段 `status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |

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
    "project_id",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_period_history_v3

所属模块：`编译构建`

说明：查询编译构建的period历史v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_period_history_v3",
    "arguments": {
      "job_id": "<job_id>",
      "start_time": "<start_time>",
      "end_time": "<end_time>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `start_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `start_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `start_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |
| `end_time` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `end_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "start_time": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    },
    "end_time": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    }
  },
  "required": [
    "job_id",
    "start_time",
    "end_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_project_endpoints

所属模块：`编译构建`

说明：查询编译构建的项目endpoints。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_project_endpoints",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

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

### build_list_project_jobs_v3

所属模块：`编译构建`

说明：查询编译构建的项目任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_project_jobs_v3",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `build_project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_project_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_project_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建工程 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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

### build_list_recommended_official_templates

所属模块：`编译构建`

说明：查询编译构建的recommendedofficial模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_recommended_official_templates",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
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
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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

### build_list_recycling_jobs

所属模块：`编译构建`

说明：查询编译构建的recycling任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_recycling_jobs",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 编译构建 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "search": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_report_branches

所属模块：`编译构建`

说明：查询编译构建的report分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_report_branches",
    "arguments": {
      "job_id": "<job_id>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "job_id",
    "repository_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_report_repositories

所属模块：`编译构建`

说明：查询编译构建的report仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_report_repositories",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |

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

### build_list_resource_specs

所属模块：`编译构建`

说明：查询编译构建的资源specs。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_resource_specs",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `arch` | 否 | `string` | "x86-64" | 字段对应：<br>MCP 字段 `arch` ↔ 原始 CodeArts 编译构建 API 同名字段 `arch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "arch": {
      "type": "string",
      "minLength": 1,
      "default": "x86-64"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_system_parameters

所属模块：`编译构建`

说明：查询编译构建的system参数。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_system_parameters",
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

### build_list_templates

所属模块：`编译构建`

说明：查询编译构建的模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_templates",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 编译构建 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 编译构建 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 编译构建 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 编译构建 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
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
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_usable_keystore_names

所属模块：`编译构建`

说明：查询编译构建的usablekeystorenames。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_usable_keystore_names",
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

### build_move_job_group

所属模块：`编译构建`

说明：执行编译构建的任务组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_move_job_group",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>",
      "jobs": "<jobs>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `jobs` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `jobs` ↔ 原始 CodeArts 编译构建 API 同名字段 `jobs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "jobs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "job_id": {
            "$ref": "#/properties/project_id"
          },
          "job_name": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "job_id",
          "job_name"
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
    "jobs"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_post_job_project_permission_3abbbee3

所属模块：`编译构建`

说明：执行编译构建的任务项目permission3abbbee3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_post_job_project_permission_3abbbee3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_post_jobs_notice_update_cd7cebc4

所属模块：`编译构建`

说明：执行编译构建的任务noticeupdatecd7cebc4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_post_jobs_notice_update_cd7cebc4",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_post_jobs_stop_67f81687

所属模块：`编译构建`

说明：执行编译构建的任务stop67f81687。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_post_jobs_stop_67f81687",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `entry_file` | 否 | `string` | "src/server/deploy-entry.ts" | 字段对应：<br>MCP 字段 `entry_file` ↔ 原始 CodeArts 编译构建 API 同名字段 `entry_file`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `bootstrap_entry_file` | 否 | `string` |  | 字段对应：<br>MCP 字段 `bootstrap_entry_file` ↔ 原始 CodeArts 编译构建 API 同名字段 `bootstrap_entry_file`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `bootstrap_entry_source` | 否 | `string` |  | 字段对应：<br>MCP 字段 `bootstrap_entry_source` ↔ 原始 CodeArts 编译构建 API 同名字段 `bootstrap_entry_source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `output_file` | 否 | `string` | "app.js" | 字段对应：<br>MCP 字段 `output_file` ↔ 原始 CodeArts 编译构建 API 同名字段 `output_file`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>输出文件路径，用于保存生成的包、归档或运行时文件。 |
| `target_runtime` | 否 | `string` | "node20" | 字段对应：<br>MCP 字段 `target_runtime` ↔ 原始 CodeArts 编译构建 API 同名字段 `target_runtime`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `replace_existing` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `replace_existing` ↔ 原始 CodeArts 编译构建 API 同名字段 `replace_existing`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否替换已存在文件或目录。true 表示存在同名内容时覆盖。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "entry_file": {
      "type": "string",
      "minLength": 1,
      "default": "src/server/deploy-entry.ts"
    },
    "bootstrap_entry_file": {
      "type": "string",
      "minLength": 1
    },
    "bootstrap_entry_source": {
      "type": "string",
      "minLength": 1
    },
    "output_file": {
      "type": "string",
      "minLength": 1,
      "default": "app.js"
    },
    "target_runtime": {
      "type": "string",
      "minLength": 1,
      "default": "node20"
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `output_file` | 否 | `string` | "codearts-mcp.tgz" | 字段对应：<br>MCP 字段 `output_file` ↔ 原始 CodeArts 编译构建 API 同名字段 `output_file`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>输出文件路径，用于保存生成的包、归档或运行时文件。 |
| `staging_dir` | 否 | `string` | ".release-bundle" | 字段对应：<br>MCP 字段 `staging_dir` ↔ 原始 CodeArts 编译构建 API 同名字段 `staging_dir`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>临时目录路径，用于打包、构建或生成运行时文件。 |
| `replace_existing` | 否 | `boolean` | false | 字段对应：<br>MCP 字段 `replace_existing` ↔ 原始 CodeArts 编译构建 API 同名字段 `replace_existing`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否替换已存在文件或目录。true 表示存在同名内容时覆盖。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_recover_job_v3

所属模块：`编译构建`

说明：执行编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_recover_job_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_request_official_api

所属模块：`编译构建`

说明：执行编译构建的officialapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_request_official_api",
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
| `method` | 是 | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` |  | 字段对应：<br>MCP 字段 `method` ↔ 原始 CodeArts 编译构建 API 同名字段 `method`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 编译构建 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 编译构建 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### build_restore_recycling_jobs

所属模块：`编译构建`

说明：执行编译构建的recycling任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_restore_recycling_jobs",
    "arguments": {
      "job_ids": "<job_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_ids` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `job_ids` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_ids": {
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
    "job_ids"
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 编译构建 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_run_job_v3

所属模块：`编译构建`

说明：运行编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_run_job_v3",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 编译构建 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `parameter` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameter` ↔ 原始 CodeArts 编译构建 API 同名字段 `parameter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `scm` | 否 | `object` |  | 字段对应：<br>MCP 字段 `scm` ↔ 原始 CodeArts 编译构建 API 同名字段 `scm`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "parameter": {
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
    "scm": {
      "type": "object",
      "additionalProperties": {}
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
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_save_template_used_info

所属模块：`编译构建`

说明：执行编译构建的模板used信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_save_template_used_info",
    "arguments": {
      "job_id": "<job_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/job_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_set_keep_time

所属模块：`编译构建`

说明：设置编译构建的keeptime。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_set_keep_time",
    "arguments": {
      "keep_time": "<keep_time>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `keep_time` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `keep_time` ↔ 原始 CodeArts 编译构建 API 同名字段 `keep_time`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "keep_time": {
      "type": "integer",
      "minimum": 1,
      "maximum": 30
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "keep_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_show_domains_statuses

所属模块：`编译构建`

说明：执行编译构建的领域状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_show_domains_statuses",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_show_flow_graph_v3

所属模块：`编译构建`

说明：执行编译构建的流程图v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_show_flow_graph_v3",
    "arguments": {
      "build_flow_record_id": "<build_flow_record_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `build_flow_record_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `build_flow_record_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_flow_record_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建流程记录 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "build_flow_record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "build_flow_record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_show_package_spec_countdown

所属模块：`编译构建`

说明：执行编译构建的packagespeccountdown。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_show_package_spec_countdown",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_stop_job_v1

所属模块：`编译构建`

说明：停止编译构建的任务v1。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_stop_job_v1",
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
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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

### build_swap_job_group

所属模块：`编译构建`

说明：执行编译构建的任务组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_swap_job_group",
    "arguments": {
      "project_id": "<project_id>",
      "source_group_id": "<source_group_id>",
      "target_group_id": "<target_group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `source_group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `source_group_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `source_group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>来源组 ID，用于定位对应的 CodeArts 资源。 |
| `target_group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `target_group_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `target_group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target组 ID，用于定位对应的 CodeArts 资源。 |
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
    "source_group_id": {
      "$ref": "#/properties/project_id"
    },
    "target_group_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "source_group_id",
    "target_group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_unfollow_custom_template

所属模块：`编译构建`

说明：执行编译构建的自定义模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_unfollow_custom_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
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

### build_unfollow_job

所属模块：`编译构建`

说明：执行编译构建的任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_unfollow_job",
    "arguments": {
      "job_id": "<job_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
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

### build_unfollow_official_template

所属模块：`编译构建`

说明：执行编译构建的official模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_unfollow_official_template",
    "arguments": {
      "uuid": "<uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 编译构建 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
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

### build_update_job_group

所属模块：`编译构建`

说明：更新编译构建的任务组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 编译构建 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `parent_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `parent_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `parent_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。 |
| `ordinal` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `ordinal` ↔ 原始 CodeArts 编译构建 API 同名字段 `ordinal`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `path_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `path_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>path ID，用于定位对应的 CodeArts 资源。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
      "maxLength": 128
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "ordinal": {
      "type": "integer"
    },
    "path_id": {
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
    "id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_job_notice

所属模块：`编译构建`

说明：更新编译构建的任务notice。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_notice",
    "arguments": {
      "job_id": "<job_id>",
      "notice_type": "<notice_type>",
      "enabled_event_type_names": "<enabled_event_type_names>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `notice_type` | 是 | `"MESSAGE" \| "MAIL" \| "WECOM" \| "DING_TALK" \| "FEISHU"` |  | 字段对应：<br>MCP 字段 `notice_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `notice_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`MESSAGE`、`MAIL`、`WECOM`、`DING_TALK`、`FEISHU`。 |
| `enabled_event_type_names` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `enabled_event_type_names` ↔ 原始 CodeArts 编译构建 API 同名字段 `enabled_event_type_names`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `send_switch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `send_switch` ↔ 原始 CodeArts 编译构建 API 同名字段 `send_switch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `webhook_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `webhook_url` ↔ 原始 CodeArts 编译构建 API 同名字段 `webhook_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>webhook URL，用于指定服务地址、资源地址或回调地址。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "notice_type": {
      "type": "string",
      "enum": [
        "MESSAGE",
        "MAIL",
        "WECOM",
        "DING_TALK",
        "FEISHU"
      ]
    },
    "enabled_event_type_names": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "send_switch": {
      "type": "string",
      "minLength": 1
    },
    "webhook_url": {
      "type": "string",
      "minLength": 1
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
    "job_id",
    "notice_type",
    "enabled_event_type_names"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_job_role_permission

所属模块：`编译构建`

说明：更新编译构建的任务角色permission。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_role_permission",
    "arguments": {
      "job_id": "<job_id>",
      "role_id": "<role_id>",
      "permission_name": "<permission_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `role_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `role_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `role_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。 |
| `permission_name` | 是 | `"is_modify" \| "is_delete" \| "is_view" \| "is_execute" \| "is_copy" \| "is_forbidden" \| "is_manager"` |  | 字段对应：<br>MCP 字段 `permission_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `permission_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>permission名称。可选值：`is_modify`、`is_delete`、`is_view`、`is_execute`、`is_copy`、`is_forbidden`、`is_manager`。 |
| `permission_value` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `permission_value` ↔ 原始 CodeArts 编译构建 API 同名字段 `permission_value`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "role_id": {
      "type": "string",
      "minLength": 1
    },
    "permission_name": {
      "type": "string",
      "enum": [
        "is_modify",
        "is_delete",
        "is_view",
        "is_execute",
        "is_copy",
        "is_forbidden",
        "is_manager"
      ]
    },
    "permission_value": {
      "type": "boolean",
      "default": true
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "role_id",
    "permission_name"
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
    "arguments": {
      "job_id": "<job_id>",
      "step_name": "<step_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `step_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `step_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `step_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>步骤名称。 |
| `image` | 否 | `string` |  | 字段对应：<br>MCP 字段 `image` ↔ 原始 CodeArts 编译构建 API 同名字段 `image`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>镜像名称或镜像地址，用于构建、部署或运行环境选择。 |
| `command` | 否 | `string` |  | 字段对应：<br>MCP 字段 `command` ↔ 原始 CodeArts 编译构建 API 同名字段 `command`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>命令行内容，用于构建、部署或脚本步骤执行。 |
| `pre_condition` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pre_condition` ↔ 原始 CodeArts 编译构建 API 同名字段 `pre_condition`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>前置条件表达式，满足条件时才执行对应步骤。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "step_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_job_v3

所属模块：`编译构建`

说明：更新编译构建的任务v3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_v3",
    "arguments": {
      "project_id": "<project_id>",
      "job_id": "<job_id>",
      "job_name": "<job_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 编译构建 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `job_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务名称。 |
| `arch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `arch` ↔ 原始 CodeArts 编译构建 API 同名字段 `arch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `auto_update_sub_module` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `auto_update_sub_module` ↔ 原始 CodeArts 编译构建 API 同名字段 `auto_update_sub_module`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `flavor` | 否 | `string` |  | 字段对应：<br>MCP 字段 `flavor` ↔ 原始 CodeArts 编译构建 API 同名字段 `flavor`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `host_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `host_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `host_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `build_config_type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_config_type` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_config_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `agency_urn` | 否 | `string` |  | 字段对应：<br>MCP 字段 `agency_urn` ↔ 原始 CodeArts 编译构建 API 同名字段 `agency_urn`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>委托 URN，用于部署等服务通过云委托访问其他云资源。 |
| `source_code` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_code` ↔ 原始 CodeArts 编译构建 API 同名字段 `source_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `parameters` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `parameters` ↔ 原始 CodeArts 编译构建 API 同名字段 `parameters`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `scms` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `scms` ↔ 原始 CodeArts 编译构建 API 同名字段 `scms`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `steps` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `steps` ↔ 原始 CodeArts 编译构建 API 同名字段 `steps`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `body` | 否 | `object` | {} | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 编译构建 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "job_name": {
      "type": "string",
      "minLength": 1
    },
    "arch": {
      "type": "string",
      "minLength": 1
    },
    "auto_update_sub_module": {
      "type": "boolean"
    },
    "flavor": {
      "type": "string",
      "minLength": 1
    },
    "host_type": {
      "type": "string",
      "minLength": 1
    },
    "build_config_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string",
      "minLength": 1
    },
    "source_code": {
      "type": "string",
      "minLength": 1
    },
    "parameters": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "scms": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
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
    "job_id",
    "job_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_keystore

所属模块：`编译构建`

说明：更新编译构建的keystore。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_keystore",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "id": "<id>",
      "keystore_name": "<keystore_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 编译构建 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 编译构建 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `keystore_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `keystore_name` ↔ 原始 CodeArts 编译构建 API 同名字段 `keystore_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>keystore名称。 |
| `share` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `share` ↔ 原始 CodeArts 编译构建 API 同名字段 `share`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "type": "string",
      "minLength": 1
    },
    "keystore_name": {
      "type": "string",
      "minLength": 1
    },
    "share": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
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
    "x_auth_token",
    "id",
    "keystore_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_upload_junit_coverage

所属模块：`编译构建`

说明：上传编译构建的junitcoverage。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_upload_junit_coverage",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": "<build_no>",
      "node_id": "<node_id>",
      "file_paths": "<file_paths>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `node_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `node_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `node_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Node ID，用于定位对应的 CodeArts 资源。 |
| `file_paths` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `file_paths` ↔ 原始 CodeArts 编译构建 API 同名字段 `file_paths`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "node_id": {
      "type": "string",
      "minLength": 1
    },
    "file_paths": {
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
    "job_id",
    "build_no",
    "node_id",
    "file_paths"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_upload_junit_report

所属模块：`编译构建`

说明：上传编译构建的junitreport。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_upload_junit_report",
    "arguments": {
      "job_id": "<job_id>",
      "build_no": "<build_no>",
      "node_id": "<node_id>",
      "file_paths": "<file_paths>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `job_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `job_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `job_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建任务 ID，用于定位对应的 CodeArts 资源。 |
| `build_no` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `build_no` ↔ 原始 CodeArts 编译构建 API 同名字段 `build_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建编号，用于定位某一次构建执行记录。 |
| `node_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `node_id` ↔ 原始 CodeArts 编译构建 API 同名字段 `node_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Node ID，用于定位对应的 CodeArts 资源。 |
| `file_paths` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `file_paths` ↔ 原始 CodeArts 编译构建 API 同名字段 `file_paths`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

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
    "node_id": {
      "type": "string",
      "minLength": 1
    },
    "file_paths": {
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
    "job_id",
    "build_no",
    "node_id",
    "file_paths"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_upload_keystore

所属模块：`编译构建`

说明：上传编译构建的keystore。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_upload_keystore",
    "arguments": {
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 编译构建 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `privacy` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `privacy` ↔ 原始 CodeArts 编译构建 API 同名字段 `privacy`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 编译构建 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
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
    "privacy": {
      "type": "boolean",
      "default": true
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
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

