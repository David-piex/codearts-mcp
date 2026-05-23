# CodeArts MCP 函数 API 参考 - 编译构建

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`编译构建`

API 数量：`51`

所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。

## API 清单

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

