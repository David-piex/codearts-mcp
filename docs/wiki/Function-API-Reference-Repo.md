# CodeArts MCP 函数 API 参考 - 代码仓库

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`代码仓库`

API 数量：`459`

所有函数 API 使用按产品拆分的 HTTP 入口：`POST /mcp/<family>`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数；当前模块工具应走对应模块的产品入口。

## API 清单

### repo_add_group_webhook

所属模块：`代码仓库`

说明：添加代码仓库的组webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_group_webhook",
    "arguments": {
      "url": "<url>",
      "group_id": "<group_id>"
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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "group_id": {
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
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_add_project_webhook

所属模块：`代码仓库`

说明：添加代码仓库的项目webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_project_webhook",
    "arguments": {
      "url": "<url>",
      "project_id": "<project_id>"
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
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
    "url",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_add_repository_deploy_key

所属模块：`代码仓库`

说明：添加代码仓库的仓库部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_repository_deploy_key",
    "arguments": {
      "repository_id": "<repository_id>",
      "key_title": "<key_title>",
      "key": "<key>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `key_title` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `can_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `can_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `can_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `application` | 否 | `string` |  | 字段对应：<br>MCP 字段 `application` ↔ 原始 CodeArts 代码仓库 API 同名字段 `application`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "key_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "key": {
      "type": "string",
      "minLength": 1,
      "maxLength": 5000
    },
    "can_push": {
      "type": "boolean"
    },
    "application": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "key_title",
    "key"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_add_repository_members

所属模块：`代码仓库`

说明：添加代码仓库的仓库成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_repository_members",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "users": "<users>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `users` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `users` ↔ 原始 CodeArts 代码仓库 API 同名字段 `users`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128
          },
          "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255
          },
          "role": {
            "type": "number",
            "enum": [
              20,
              30,
              40
            ]
          },
          "domain_id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 128
          },
          "domain_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255
          }
        },
        "required": [
          "id",
          "name",
          "role"
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
    "x_auth_token",
    "repository_uuid",
    "users"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_add_repository_webhook

所属模块：`代码仓库`

说明：添加代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_repository_webhook",
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

### repo_add_ssh_key

所属模块：`代码仓库`

说明：添加代码仓库的sshkey。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_ssh_key",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | 否 | `string \| number` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `key` | 否 | `string \| null` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "title": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000
        },
        {
          "type": "number"
        }
      ]
    },
    "key": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000
        },
        {
          "type": "null"
        }
      ]
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

### repo_add_submodule

所属模块：`代码仓库`

说明：添加代码仓库的submodule。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_submodule",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch_name": "<branch_name>",
      "file_path": "<file_path>",
      "subrepo_id": "<subrepo_id>",
      "commit_message": "<commit_message>",
      "subrepo_branch": "<subrepo_branch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `subrepo_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `subrepo_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `subrepo_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>subrepo ID，用于定位对应的 CodeArts 资源。 |
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `subrepo_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `subrepo_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `subrepo_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
      "minLength": 1,
      "maxLength": 100
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "subrepo_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "subrepo_branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "branch_name",
    "file_path",
    "subrepo_id",
    "commit_message",
    "subrepo_branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

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

### repo_add_trusted_ip_address

所属模块：`代码仓库`

说明：添加代码仓库的trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_add_trusted_ip_address",
    "arguments": {
      "repository_id": "<repository_id>"
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |

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

### repo_approval_merge_request

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_approval_merge_request",
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

### repo_associate_group_user_group

所属模块：`代码仓库`

说明：执行代码仓库的组用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_associate_group_user_group",
    "arguments": {
      "project_id": "<project_id>",
      "group_id": "<group_id>",
      "user_group_id": "<user_group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `user_group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `user_group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户组 ID，用于定位对应的 CodeArts 资源。 |
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
    "user_group_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "group_id",
    "user_group_id"
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
      "x_auth_token": "<x_auth_token>",
      "repository_id": "<repository_id>",
      "url": "<url>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `url` | 是 | `string` |  | 字段对应：<br>MCP 字段 `url` ↔ 原始 CodeArts 代码仓库 API 同名字段 `url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>远程仓库或镜像地址。 |
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
    "x_auth_token",
    "repository_id",
    "url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_associate_repository_user_group

所属模块：`代码仓库`

说明：执行代码仓库的仓库用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_associate_repository_user_group",
    "arguments": {
      "project_id": "<project_id>",
      "repository_id": "<repository_id>",
      "user_group_id": "<user_group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `user_group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `user_group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `user_group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>用户组 ID，用于定位对应的 CodeArts 资源。 |
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
    "user_group_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "repository_id",
    "user_group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_create_protected_branch

所属模块：`代码仓库`

说明：批量处理代码仓库的create保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_create_protected_branch",
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

### repo_batch_delete_branch

所属模块：`代码仓库`

说明：批量处理代码仓库的delete分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_delete_branch",
    "arguments": {
      "repository_id": "<repository_id>",
      "branches": "<branches>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branches` | 是 | `array<string>` |  | 字段对应：<br>MCP 字段 `branches` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branches`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "branches": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 200
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
    "branches"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_delete_protected_branches

所属模块：`代码仓库`

说明：批量处理代码仓库的delete保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_delete_protected_branches",
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

### repo_batch_delete_protected_tags

所属模块：`代码仓库`

说明：批量处理代码仓库的delete保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_delete_protected_tags",
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

### repo_batch_validate_repo_names

所属模块：`代码仓库`

说明：批量处理代码仓库的validatereponames。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_validate_repo_names",
    "arguments": {
      "items": "<items>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `items` ↔ 原始 CodeArts 代码仓库 API 同名字段 `items`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255
          },
          "project_id": {
            "type": "string",
            "minLength": 1
          },
          "group_id": {
            "$ref": "#/properties/items/items/properties/project_id"
          }
        },
        "required": [
          "name",
          "project_id"
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
    "items"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_batch_validate_user_group_permissions

所属模块：`代码仓库`

说明：批量处理代码仓库的validate用户组permissions。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_batch_validate_user_group_permissions",
    "arguments": {
      "items": "<items>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `items` ↔ 原始 CodeArts 代码仓库 API 同名字段 `items`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_id": {
            "type": "string",
            "minLength": 1
          },
          "project_id": {
            "$ref": "#/properties/items/items/properties/group_id"
          },
          "group_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 256
          }
        },
        "required": [
          "group_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    }
  },
  "required": [
    "items"
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

### repo_check_deploy_key

所属模块：`代码仓库`

说明：检查代码仓库的部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_check_deploy_key",
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

### repo_create_branch

所属模块：`代码仓库`

说明：创建代码仓库的分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_branch",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch": "<branch>",
      "ref": "<ref>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `ref` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `related_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `related_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `related_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>相关 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "related_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/repository_id"
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
    "branch",
    "ref"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_cherry_pick_merge_request

所属模块：`代码仓库`

说明：创建代码仓库的cherrypick合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_cherry_pick_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "branch": "<branch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `with_new_merge_request` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `with_new_merge_request` ↔ 原始 CodeArts 代码仓库 API 同名字段 `with_new_merge_request`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "branch": {
      "type": "string",
      "minLength": 1
    },
    "with_new_merge_request": {
      "type": "boolean"
    },
    "message": {
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
    "branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_commit

所属模块：`代码仓库`

说明：创建代码仓库的提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_commit",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch": "<branch>",
      "commit_message": "<commit_message>",
      "actions": "<actions>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `actions` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `actions` ↔ 原始 CodeArts 代码仓库 API 同名字段 `actions`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `start_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `start_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_email` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author名称。 |
| `stats` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `stats` ↔ 原始 CodeArts 代码仓库 API 同名字段 `stats`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `force` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `force` ↔ 原始 CodeArts 代码仓库 API 同名字段 `force`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action": {
            "type": "string",
            "enum": [
              "create",
              "create_dir",
              "update",
              "move",
              "delete",
              "chmod"
            ]
          },
          "file_path": {
            "type": "string",
            "minLength": 1,
            "maxLength": 100000
          },
          "previous_path": {
            "type": "string",
            "minLength": 1,
            "maxLength": 100000
          },
          "content": {
            "type": "string"
          },
          "encoding": {
            "type": "string",
            "enum": [
              "text",
              "base64"
            ]
          },
          "last_commit_id": {
            "type": "string",
            "minLength": 1
          },
          "execute_filemode": {
            "type": "boolean"
          }
        },
        "required": [
          "action",
          "file_path"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "start_branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "author_email": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "author_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "stats": {
      "type": "boolean"
    },
    "force": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "branch",
    "commit_message",
    "actions"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_commit_revert

所属模块：`代码仓库`

说明：创建代码仓库的提交revert。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_commit_revert",
    "arguments": {
      "repository_id": "<repository_id>",
      "sha": "<sha>",
      "branch": "<branch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |
| `branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。 |
| `with_new_merge_request` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `with_new_merge_request` ↔ 原始 CodeArts 代码仓库 API 同名字段 `with_new_merge_request`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "with_new_merge_request": {
      "type": "boolean"
    },
    "message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "sha",
    "branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_dir

所属模块：`代码仓库`

说明：创建代码仓库的dir。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_dir",
    "arguments": {
      "repository_id": "<repository_id>",
      "branch_name": "<branch_name>",
      "file_path": "<file_path>",
      "commit_message": "<commit_message>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
      "minLength": 1,
      "maxLength": 200
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "branch_name",
    "file_path",
    "commit_message"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_file

所属模块：`代码仓库`

说明：创建代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "branch": "<branch>",
      "commit_message": "<commit_message>",
      "content": "<content>"
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
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 代码仓库 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `author_email` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author名称。 |
| `encoding` | 否 | `"text" \| "base64"` |  | 字段对应：<br>MCP 字段 `encoding` ↔ 原始 CodeArts 代码仓库 API 同名字段 `encoding`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`text`、`base64`。 |
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
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "author_email": {
      "type": "string",
      "minLength": 1
    },
    "author_name": {
      "type": "string",
      "minLength": 1
    },
    "encoding": {
      "type": "string",
      "enum": [
        "text",
        "base64"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "branch",
    "commit_message",
    "content"
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

### repo_create_group

所属模块：`代码仓库`

说明：创建代码仓库的组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_group",
    "arguments": {
      "project_id": "<project_id>",
      "name": "<name>",
      "visibility": "<visibility>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `visibility` | 是 | `"private" \| "internal" \| "public"` |  | 字段对应：<br>MCP 字段 `visibility` ↔ 原始 CodeArts 代码仓库 API 同名字段 `visibility`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`private`、`internal`、`public`。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
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
      "maxLength": 255
    },
    "visibility": {
      "type": "string",
      "enum": [
        "private",
        "internal",
        "public"
      ]
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
    "visibility"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_group_merge_request_approver_setting

所属模块：`代码仓库`

说明：创建代码仓库的组合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_group_merge_request_approver_setting",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "group_id": {
      "$ref": "#/properties/id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_group_merge_request_template

所属模块：`代码仓库`

说明：创建代码仓库的组合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_group_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_name",
    "group_id"
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
| `work_item_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 代码仓库 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/repository_id"
      },
      "minItems": 1
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

### repo_create_merge_request_approver_setting

所属模块：`代码仓库`

说明：创建代码仓库的合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request_approver_setting",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "repository_id": {
      "$ref": "#/properties/id"
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

### repo_create_merge_request_discussion_response

所属模块：`代码仓库`

说明：创建代码仓库的合并请求请求讨论response。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request_discussion_response",
    "arguments": {
      "body": "<body>",
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "discussion_id": "<discussion_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 是 | `string` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `severity` | 否 | `"suggestion" \| "minor" \| "major" \| "fatal"` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 代码仓库 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。可选值：`suggestion`、`minor`、`major`、`fatal`。 |
| `assignee_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assignee_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>负责人用户 ID，用于指定工作项、任务或评审的当前处理人。 |
| `review_categories` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `proposer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `proposer_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `proposer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>proposer ID，用于定位对应的 CodeArts 资源。 |
| `resolved` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `resolved` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resolved`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `discussion_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `discussion_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `discussion_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>讨论 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "string",
      "minLength": 1
    },
    "severity": {
      "type": "string",
      "enum": [
        "suggestion",
        "minor",
        "major",
        "fatal"
      ]
    },
    "assignee_id": {
      "type": "string",
      "minLength": 1
    },
    "review_categories": {
      "type": "string",
      "minLength": 1
    },
    "review_modules": {
      "type": "string",
      "minLength": 1
    },
    "proposer_id": {
      "$ref": "#/properties/assignee_id"
    },
    "resolved": {
      "type": "boolean"
    },
    "repository_id": {
      "$ref": "#/properties/assignee_id"
    },
    "merge_request_iid": {
      "$ref": "#/properties/assignee_id"
    },
    "discussion_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "body",
    "repository_id",
    "merge_request_iid",
    "discussion_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_merge_request_template

所属模块：`代码仓库`

说明：创建代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
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
    "template_name",
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_project_merge_request_approver_setting

所属模块：`代码仓库`

说明：创建代码仓库的项目合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_project_merge_request_approver_setting",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "project_id": {
      "$ref": "#/properties/id"
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

### repo_create_project_merge_request_template

所属模块：`代码仓库`

说明：创建代码仓库的项目合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_project_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
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
    "template_name",
    "project_id"
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

### repo_create_repository_commit_rule

所属模块：`代码仓库`

说明：创建代码仓库的仓库提交规则。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository_commit_rule",
    "arguments": {
      "name": "<name>",
      "branch_name": "<branch_name>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `commit_message_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `commit_message_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `commit_message_negative_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `commit_message_negative_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message_negative_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_email_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `prohibited_file_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `prohibited_file_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `prohibited_file_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `max_file_size` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `max_file_size` ↔ 原始 CodeArts 代码仓库 API 同名字段 `max_file_size`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `binary_gate_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `binary_gate_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `binary_gate_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `allowed_modify_binary` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `allowed_modify_binary` ↔ 原始 CodeArts 代码仓库 API 同名字段 `allowed_modify_binary`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `allowed_binary_file_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `allowed_binary_file_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `allowed_binary_file_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `privileged_user_ids` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `privileged_user_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `privileged_user_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>privileged用户 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `effective_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `effective_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `effective_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `skip_rule_check` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `skip_rule_check` ↔ 原始 CodeArts 代码仓库 API 同名字段 `skip_rule_check`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `skip_rule_end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `skip_rule_end_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `skip_rule_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "branch_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "commit_message_regex": {
      "type": "string"
    },
    "commit_message_negative_regex": {
      "type": "string"
    },
    "author_regex": {
      "type": "string"
    },
    "author_email_regex": {
      "type": "string"
    },
    "prohibited_file_name_regex": {
      "type": "string"
    },
    "max_file_size": {
      "type": "integer",
      "minimum": 1,
      "maximum": 300
    },
    "binary_gate_enabled": {
      "type": "boolean"
    },
    "allowed_modify_binary": {
      "type": "boolean"
    },
    "allowed_binary_file_name_regex": {
      "type": "string"
    },
    "privileged_user_ids": {
      "type": "array",
      "items": {
        "type": "integer",
        "exclusiveMinimum": 0
      }
    },
    "effective_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "skip_rule_check": {
      "type": "boolean"
    },
    "skip_rule_end_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
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
    "name",
    "branch_name",
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_repository_label

所属模块：`代码仓库`

说明：创建代码仓库的仓库标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository_label",
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
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `color` | 否 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 代码仓库 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `expires_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `expires_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `expires_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "color": {
      "type": "string",
      "pattern": "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
    },
    "description": {
      "type": "string",
      "maxLength": 1000
    },
    "expires_at": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### repo_create_repository_system_labels

所属模块：`代码仓库`

说明：创建代码仓库的仓库system标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository_system_labels",
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

### repo_create_review_setting

所属模块：`代码仓库`

说明：创建代码仓库的评审setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_review_setting",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `categories_and_modules_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `categories_and_modules_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `categories_and_modules_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `secondary_category_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `secondary_category_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `secondary_category_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_default_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_default_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_default_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_customized_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_customized_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_customized_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "categories_and_modules_enabled": {
      "type": "boolean"
    },
    "review_modules": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "secondary_category_enabled": {
      "type": "boolean"
    },
    "review_default_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "review_customized_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
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

### repo_create_user_ssh_key

所属模块：`代码仓库`

说明：创建代码仓库的用户sshkey。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_user_ssh_key",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | 否 | `string \| number` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `key` | 否 | `string \| null` |  | 字段对应：<br>MCP 字段 `key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "title": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000
        },
        {
          "type": "number"
        }
      ]
    },
    "key": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000
        },
        {
          "type": "null"
        }
      ]
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

### repo_delete_branch

所属模块：`代码仓库`

说明：删除代码仓库的分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_branch",
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
      "minLength": 1,
      "maxLength": 2000
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

### repo_delete_file

所属模块：`代码仓库`

说明：删除代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "branch": "<branch>",
      "commit_message": "<commit_message>"
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
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author名称。 |
| `author_email` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "author_name": {
      "type": "string",
      "minLength": 1
    },
    "author_email": {
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
    "file_path",
    "branch",
    "commit_message"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_group

所属模块：`代码仓库`

说明：删除代码仓库的组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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

### repo_delete_group_merge_request_approver_setting

所属模块：`代码仓库`

说明：删除代码仓库的组合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_group_merge_request_approver_setting",
    "arguments": {
      "group_id": "<group_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "setting_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_group_merge_request_template

所属模块：`代码仓库`

说明：删除代码仓库的组合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_group_merge_request_template",
    "arguments": {
      "group_id": "<group_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
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
    "template_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_groups_hooks_2dc6d4f5

所属模块：`代码仓库`

说明：删除代码仓库的组hooks2dc6d4f5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_groups_hooks_2dc6d4f5",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_groups_merge_requests_template_ce366152

所属模块：`代码仓库`

说明：删除代码仓库的组合并请求请求模板ce366152。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_groups_merge_requests_template_ce366152",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_merge_request_approver_setting

所属模块：`代码仓库`

说明：删除代码仓库的合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_merge_request_approver_setting",
    "arguments": {
      "repository_id": "<repository_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "setting_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_merge_request_discussion

所属模块：`代码仓库`

说明：删除代码仓库的合并请求请求讨论。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_merge_request_discussion",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "discussion_id": "<discussion_id>",
      "note_id": "<note_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `discussion_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `discussion_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `discussion_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>讨论 ID，用于定位对应的 CodeArts 资源。 |
| `note_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `note_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `note_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>note ID，用于定位对应的 CodeArts 资源。 |
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
    "discussion_id": {
      "type": "string",
      "minLength": 1
    },
    "note_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "discussion_id",
    "note_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_merge_request_template

所属模块：`代码仓库`

说明：删除代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_merge_request_template",
    "arguments": {
      "repository_id": "<repository_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
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
    "template_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_merge_request_vote

所属模块：`代码仓库`

说明：删除代码仓库的合并请求请求vote。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_merge_request_vote",
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

### repo_delete_project_merge_request_approver_setting

所属模块：`代码仓库`

说明：删除代码仓库的项目合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_project_merge_request_approver_setting",
    "arguments": {
      "project_id": "<project_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "setting_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_project_merge_request_template

所属模块：`代码仓库`

说明：删除代码仓库的项目合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_project_merge_request_template",
    "arguments": {
      "project_id": "<project_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
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
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_projects_hooks_edb30d3c

所属模块：`代码仓库`

说明：删除代码仓库的项目hooksedb30d3c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_projects_hooks_edb30d3c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_projects_merge_requests_template_1c4a248e

所属模块：`代码仓库`

说明：删除代码仓库的项目合并请求请求模板1c4a248e。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_projects_merge_requests_template_1c4a248e",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_bfe20cec

所属模块：`代码仓库`

说明：删除代码仓库的仓库bfe20cec。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_bfe20cec",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_deploy_keys_0eeb6b27

所属模块：`代码仓库`

说明：删除代码仓库的仓库部署keys0eeb6b27。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_deploy_keys_0eeb6b27",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_deploy_keys_8908f606

所属模块：`代码仓库`

说明：删除代码仓库的仓库部署keys8908f606。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_deploy_keys_8908f606",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_deploy_keys_f22fb9f9

所属模块：`代码仓库`

说明：删除代码仓库的仓库部署keysf22fb9f9。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_deploy_keys_f22fb9f9",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_hooks_b964e30b

所属模块：`代码仓库`

说明：删除代码仓库的仓库hooksb964e30b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_hooks_b964e30b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_hooks_dbdf3d02

所属模块：`代码仓库`

说明：删除代码仓库的仓库hooksdbdf3d02。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_hooks_dbdf3d02",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_members_3a8be189

所属模块：`代码仓库`

说明：删除代码仓库的仓库成员3a8be189。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_members_3a8be189",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_merge_requests_3f33c4ce

所属模块：`代码仓库`

说明：删除代码仓库的仓库合并请求请求3f33c4ce。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_merge_requests_3f33c4ce",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_protected_branch_b8c28055

所属模块：`代码仓库`

说明：删除代码仓库的仓库保护分支b8c28055。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_protected_branch_b8c28055",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_protected_branches_9d268092

所属模块：`代码仓库`

说明：删除代码仓库的仓库保护分支9d268092。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_protected_branches_9d268092",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_protected_branches_a82a73f5

所属模块：`代码仓库`

说明：删除代码仓库的仓库保护分支a82a73f5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_protected_branches_a82a73f5",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_protected_tag_74fa6545

所属模块：`代码仓库`

说明：删除代码仓库的仓库保护标签74fa6545。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_protected_tag_74fa6545",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_protected_tags_cbccfeeb

所属模块：`代码仓库`

说明：删除代码仓库的仓库保护标签cbccfeeb。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_protected_tags_cbccfeeb",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repositories_repository_tag_9e91bf60

所属模块：`代码仓库`

说明：删除代码仓库的仓库仓库标签9e91bf60。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repositories_repository_tag_9e91bf60",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_delete_repository

所属模块：`代码仓库`

说明：删除代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repository",
    "arguments": {
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_repository_label

所属模块：`代码仓库`

说明：删除代码仓库的仓库标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repository_label",
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
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
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
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### repo_delete_repository_member

所属模块：`代码仓库`

说明：删除代码仓库的仓库成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_repository_member",
    "arguments": {
      "repository_uuid": "<repository_uuid>",
      "member_id": "<member_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `member_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `member_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `member_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>成员 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "member_id": {
      "$ref": "#/properties/repository_uuid"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_uuid",
    "member_id"
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

### repo_delete_ssh_key

所属模块：`代码仓库`

说明：删除代码仓库的sshkey。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_ssh_key",
    "arguments": {
      "key_id": "<key_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `key_id` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `key_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>key ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "key_id": {
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
    "key_id"
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

### repo_delete_trusted_ip_address

所属模块：`代码仓库`

说明：删除代码仓库的trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_trusted_ip_address",
    "arguments": {
      "repository_id": "<repository_id>",
      "ip_id": "<ip_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `ip_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ip_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ip_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ip ID，用于定位对应的 CodeArts 资源。 |
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
    "ip_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "ip_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_user_ssh_key

所属模块：`代码仓库`

说明：删除代码仓库的用户sshkey。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_user_ssh_key",
    "arguments": {
      "key_id": "<key_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `key_id` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `key_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `key_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>key ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "key_id": {
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
    "key_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_users_impersonation_bearer_tokens_5fbef924

所属模块：`代码仓库`

说明：删除代码仓库的用户impersonationbearertokens5fbef924。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_users_impersonation_bearer_tokens_5fbef924",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_download_archive

所属模块：`代码仓库`

说明：下载代码仓库的archive。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_download_archive",
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
| `sha` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `archive_format` | 否 | `"zip" \| "tar.gz" \| "tar.bz2" \| "tar"` |  | 字段对应：<br>MCP 字段 `archive_format` ↔ 原始 CodeArts 代码仓库 API 同名字段 `archive_format`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`zip`、`tar.gz`、`tar.bz2`、`tar`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "archive_format": {
      "type": "string",
      "enum": [
        "zip",
        "tar.gz",
        "tar.bz2",
        "tar"
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

### repo_download_blobs_raw

所属模块：`代码仓库`

说明：下载代码仓库的blobsraw。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_download_blobs_raw",
    "arguments": {
      "repository_id": "<repository_id>",
      "blob_id": "<blob_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `blob_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `blob_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `blob_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>blob ID，用于定位对应的 CodeArts 资源。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `file_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `file_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>文件名称。 |

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
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "blob_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_execute_repository_statistics

所属模块：`代码仓库`

说明：执行代码仓库的仓库统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_execute_repository_statistics",
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
| `branch_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
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
      "minLength": 1,
      "maxLength": 200
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

### repo_fork_repository

所属模块：`代码仓库`

说明：执行代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_fork_repository",
    "arguments": {
      "project_name": "<project_name>",
      "repo_name": "<repo_name>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 代码仓库 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `project_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `project_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>项目名称。 |
| `repo_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repo_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repo_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `import_members` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `import_members` ↔ 原始 CodeArts 代码仓库 API 同名字段 `import_members`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否导入成员。true 表示导入仓库或项目资源时同步导入成员关系。 |
| `type` | 否 | `string` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `visibility_level` | 否 | `0 \| 20` |  | 字段对应：<br>MCP 字段 `visibility_level` ↔ 原始 CodeArts 代码仓库 API 同名字段 `visibility_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库可见性级别。常见取值与 CodeArts Repo/GitLab 风格一致，例如 private/internal/public 对应的数字级别；以接口返回为准。可选值：`0`、`20`。 |
| `external_project_info` | 否 | `object` |  | 字段对应：<br>MCP 字段 `external_project_info` ↔ 原始 CodeArts 代码仓库 API 同名字段 `external_project_info`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "project_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "repo_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256,
      "pattern": "^[A-Za-z0-9_][A-Za-z0-9_.-]*$"
    },
    "template_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "import_members": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "visibility_level": {
      "type": "number",
      "enum": [
        0,
        20
      ]
    },
    "external_project_info": {
      "type": "object",
      "properties": {
        "external_key_message": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048
        },
        "external_service": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255
        }
      },
      "additionalProperties": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_name",
    "repo_name",
    "template_id"
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

### repo_get_group_webhook

所属模块：`代码仓库`

说明：获取代码仓库的组webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_group_webhook",
    "arguments": {
      "group_id": "<group_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_group_webhook_log

所属模块：`代码仓库`

说明：获取代码仓库的组webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_group_webhook_log",
    "arguments": {
      "group_id": "<group_id>",
      "hook_id": "<hook_id>",
      "log_id": "<log_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `log_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `log_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `log_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/group_id"
    },
    "log_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "hook_id",
    "log_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_groups_637449e8

所属模块：`代码仓库`

说明：获取代码仓库的组637449e8。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_groups_637449e8",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_groups_merge_requests_reviewers_147eb83f

所属模块：`代码仓库`

说明：获取代码仓库的组合并请求请求reviewers147eb83f。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_groups_merge_requests_reviewers_147eb83f",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_groups_permissions_resources_d9409406

所属模块：`代码仓库`

说明：获取代码仓库的组permissionsresourcesd9409406。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_groups_permissions_resources_d9409406",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_merge_request_template

所属模块：`代码仓库`

说明：获取代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_merge_request_template",
    "arguments": {
      "repository_id": "<repository_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_project_webhook

所属模块：`代码仓库`

说明：获取代码仓库的项目webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_project_webhook",
    "arguments": {
      "project_id": "<project_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_project_webhook_log

所属模块：`代码仓库`

说明：获取代码仓库的项目webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_project_webhook_log",
    "arguments": {
      "project_id": "<project_id>",
      "hook_id": "<hook_id>",
      "log_id": "<log_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `log_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `log_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `log_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/project_id"
    },
    "log_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "hook_id",
    "log_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_projects_merge_requests_reviewers_f04b72e0

所属模块：`代码仓库`

说明：获取代码仓库的项目合并请求请求reviewersf04b72e0。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_merge_requests_reviewers_f04b72e0",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repositories_27ecf7b7

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库27ecf7b7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repositories_27ecf7b7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repositories_3f986948

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库3f986948。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repositories_3f986948",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repositories_908d7cd5

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库908d7cd5。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repositories_908d7cd5",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repository_commits_9616b2f4

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库提交9616b2f4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repository_commits_9616b2f4",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repository_commits_a12d740b

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库提交a12d740b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repository_commits_a12d740b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repository_commits_diff_9a5c3ba7

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库提交diff9a5c3ba7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repository_commits_diff_9a5c3ba7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_repository_files_0fcb416b

所属模块：`代码仓库`

说明：获取代码仓库的项目仓库文件0fcb416b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_repository_files_0fcb416b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_projects_usage_3fbfa804

所属模块：`代码仓库`

说明：获取代码仓库的项目usage3fbfa804。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_projects_usage_3fbfa804",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_314ba4f7

所属模块：`代码仓库`

说明：获取代码仓库的仓库314ba4f7。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_314ba4f7",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_archive_f45a9c24

所属模块：`代码仓库`

说明：获取代码仓库的仓库archivef45a9c24。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_archive_f45a9c24",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_branch_image_d4fa1be6

所属模块：`代码仓库`

说明：获取代码仓库的仓库分支图片d4fa1be6。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_branch_image_d4fa1be6",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_cba07848

所属模块：`代码仓库`

说明：获取代码仓库的仓库cba07848。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_cba07848",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_commits_00d17315

所属模块：`代码仓库`

说明：获取代码仓库的仓库提交00d17315。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_commits_00d17315",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_e2e_setting_f13c6174

所属模块：`代码仓库`

说明：获取代码仓库的仓库e2esettingf13c6174。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_e2e_setting_f13c6174",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_hooks_fd3e1ead

所属模块：`代码仓库`

说明：获取代码仓库的仓库hooksfd3e1ead。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_hooks_fd3e1ead",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_management_members_4d816faa

所属模块：`代码仓库`

说明：获取代码仓库的仓库management成员4d816faa。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_management_members_4d816faa",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_members_b8f7e94c

所属模块：`代码仓库`

说明：获取代码仓库的仓库成员b8f7e94c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_members_b8f7e94c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_merge_request_ce1459de

所属模块：`代码仓库`

说明：获取代码仓库的仓库合并请求请求ce1459de。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_merge_request_ce1459de",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_merge_requests_conflict_78242a89

所属模块：`代码仓库`

说明：获取代码仓库的仓库合并请求请求conflict78242a89。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_merge_requests_conflict_78242a89",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_repository_archive_bb8b1f07

所属模块：`代码仓库`

说明：获取代码仓库的仓库仓库archivebb8b1f07。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_repository_archive_bb8b1f07",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_repository_tags_d25d2036

所属模块：`代码仓库`

说明：获取代码仓库的仓库仓库标签d25d2036。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_repository_tags_d25d2036",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_repository_upper_files_74f25ade

所属模块：`代码仓库`

说明：获取代码仓库的仓库仓库upper文件74f25ade。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_repository_upper_files_74f25ade",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_review_setting_36d7fd8c

所属模块：`代码仓库`

说明：获取代码仓库的仓库评审setting36d7fd8c。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_review_setting_36d7fd8c",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_review_setting_878352e9

所属模块：`代码仓库`

说明：获取代码仓库的仓库评审setting878352e9。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_review_setting_878352e9",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repositories_transfer_task_3876f204

所属模块：`代码仓库`

说明：获取代码仓库的仓库transfer任务3876f204。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repositories_transfer_task_3876f204",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_repository_blame

所属模块：`代码仓库`

说明：获取代码仓库的仓库blame。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository_blame",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "sha": "<sha>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

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
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_repository_file_content_v4

所属模块：`代码仓库`

说明：获取代码仓库的仓库文件contentv4。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository_file_content_v4",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "sha": "<sha>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

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
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_repository_id_by_name

所属模块：`代码仓库`

说明：获取代码仓库的仓库idbyname。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository_id_by_name",
    "arguments": {
      "group_name": "<group_name>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组名称。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "repository_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    }
  },
  "required": [
    "group_name",
    "repository_name"
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

### repo_get_tenant_setting_a95a3e82

所属模块：`代码仓库`

说明：获取代码仓库的租户settinga95a3e82。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_tenant_setting_a95a3e82",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_user_gpg_keys_d0754748

所属模块：`代码仓库`

说明：获取代码仓库的用户gpgkeysd0754748。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_user_gpg_keys_d0754748",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_user_recent_push_events_13f7ca44

所属模块：`代码仓库`

说明：获取代码仓库的用户recentpushevents13f7ca44。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_user_recent_push_events_13f7ca44",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_get_users_impersonation_bearer_tokens_1cc42a02

所属模块：`代码仓库`

说明：获取代码仓库的用户impersonationbearertokens1cc42a02。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_users_impersonation_bearer_tokens_1cc42a02",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_import_merge_request

所属模块：`代码仓库`

说明：导入代码仓库的合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_import_merge_request",
    "arguments": {
      "repository_id": "<repository_id>",
      "iid": "<iid>",
      "source_uniq_key": "<source_uniq_key>",
      "state": "<state>",
      "source_branch": "<source_branch>",
      "target_branch": "<target_branch>",
      "target_repository_id": "<target_repository_id>",
      "diff_refs": "<diff_refs>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `iid` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `source_uniq_key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `source_uniq_key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_uniq_key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `state` | 是 | `string` |  | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。 |
| `source_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `target_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `target_repository_id` | 是 | `string \| integer` |  | 字段对应：<br>MCP 字段 `target_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target仓库 ID，用于定位对应的 CodeArts 资源。 |
| `diff_refs` | 是 | `object` |  | 字段对应：<br>MCP 字段 `diff_refs` ↔ 原始 CodeArts 代码仓库 API 同名字段 `diff_refs`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `author_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author ID，用于定位对应的 CodeArts 资源。 |
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `labels` | 否 | `object` |  | 字段对应：<br>MCP 字段 `labels` ↔ 原始 CodeArts 代码仓库 API 同名字段 `labels`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表或逗号分隔的标签字符串。 |
| `created_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `updated_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `updated_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merged_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merged_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merged_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `closed_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `closed_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `closed_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `squash` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `squash` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否压缩提交。 |
| `remove_source_branch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `remove_source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `remove_source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并后是否删除源分支。 |
| `branch_is_deleted` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `branch_is_deleted` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_is_deleted`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `fork` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `fork` ↔ 原始 CodeArts 代码仓库 API 同名字段 `fork`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `import_source_from` | 否 | `string` |  | 字段对应：<br>MCP 字段 `import_source_from` ↔ 原始 CodeArts 代码仓库 API 同名字段 `import_source_from`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "iid": {
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
    "source_uniq_key": {
      "type": "string",
      "minLength": 1
    },
    "state": {
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
    "target_repository_id": {
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
    "diff_refs": {
      "type": "object",
      "properties": {
        "base_sha": {
          "type": "string",
          "minLength": 1
        },
        "start_sha": {
          "type": "string",
          "minLength": 1
        },
        "head_sha": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "base_sha",
        "start_sha",
        "head_sha"
      ],
      "additionalProperties": false
    },
    "author_id": {
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
    "title": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "labels": {
      "type": "object",
      "additionalProperties": {}
    },
    "created_at": {
      "type": "string",
      "minLength": 1
    },
    "updated_at": {
      "type": "string",
      "minLength": 1
    },
    "merged_at": {
      "type": "string",
      "minLength": 1
    },
    "closed_at": {
      "type": "string",
      "minLength": 1
    },
    "approvers": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "approver_id": {
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
          "code_owner": {
            "type": "boolean"
          },
          "accept": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      }
    },
    "squash": {
      "type": "boolean"
    },
    "remove_source_branch": {
      "type": "boolean"
    },
    "branch_is_deleted": {
      "type": "boolean"
    },
    "fork": {
      "type": "boolean"
    },
    "import_source_from": {
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
    "iid",
    "source_uniq_key",
    "state",
    "source_branch",
    "target_branch",
    "target_repository_id",
    "diff_refs"
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

### repo_list_branch_sub_files

所属模块：`代码仓库`

说明：查询代码仓库的分支sub文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_branch_sub_files",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "branch_name": "<branch_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 100 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |
| `keyword` | 否 | `string` |  | 字段对应：<br>MCP 字段 `keyword` ↔ 原始 CodeArts 代码仓库 API 的搜索关键字字段，常见原字段名为 `keyword`、`search` 或 `name`。<br>搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。 |
| `sort_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `sort_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。 |
| `sort_order` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort_order` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort_order`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
      "default": 100
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
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "branch_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "path": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid",
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

### repo_list_commit_associated_merge_requests

所属模块：`代码仓库`

说明：查询代码仓库的提交关联合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_commit_associated_merge_requests",
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
      "minLength": 1,
      "maxLength": 64
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

### repo_list_commit_associated_refs

所属模块：`代码仓库`

说明：查询代码仓库的提交关联引用。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_commit_associated_refs",
    "arguments": {
      "repository_id": "<repository_id>",
      "sha": "<sha>",
      "type": "<type>"
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
| `type` | 是 | `"branch" \| "tag"` |  | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。可选值：`branch`、`tag`。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
      "minLength": 1,
      "maxLength": 2000
    },
    "type": {
      "type": "string",
      "enum": [
        "branch",
        "tag"
      ]
    }
  },
  "required": [
    "repository_id",
    "sha",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_commit_discussions

所属模块：`代码仓库`

说明：查询代码仓库的提交讨论。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_commit_discussions",
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
      "minLength": 1,
      "maxLength": 64
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
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `message` | 否 | `string` |  | 字段对应：<br>MCP 字段 `message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>消息内容或提交说明。代码仓场景常用于提交信息，通知场景用于消息正文。 |
| `author` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `order_by_date` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `order_by_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>按日期排序或过滤的日期字段，用于选择创建时间、更新时间、结束时间等口径。 |
| `follow` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `follow` ↔ 原始 CodeArts 代码仓库 API 同名字段 `follow`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "path": {
      "type": "string"
    },
    "message": {
      "type": "string"
    },
    "author": {
      "type": "string"
    },
    "order_by_date": {
      "type": "boolean"
    },
    "follow": {
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

### repo_list_default_review_categories

所属模块：`代码仓库`

说明：查询代码仓库的default评审categories。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_default_review_categories",
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

### repo_list_discussion_templates

所属模块：`代码仓库`

说明：查询代码仓库的讨论模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_discussion_templates",
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

### repo_list_file_blame_lines

所属模块：`代码仓库`

说明：查询代码仓库的文件blamelines。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_file_blame_lines",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "sha": "<sha>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

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
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_file_upper_tree_entries

所属模块：`代码仓库`

说明：查询代码仓库的文件upper树entries。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_file_upper_tree_entries",
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
| `file_path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `ref_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ref名称。 |

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
    "ref_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_files

所属模块：`代码仓库`

说明：查询代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_files",
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
    "ref_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
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

### repo_list_group_addable_members

所属模块：`代码仓库`

说明：查询代码仓库的组可添加成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_addable_members",
    "arguments": {
      "group_id": "<group_id>",
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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_addable_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的组可添加用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_addable_user_groups",
    "arguments": {
      "group_id": "<group_id>",
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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "project_id"
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

### repo_list_group_members

所属模块：`代码仓库`

说明：查询代码仓库的组成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_members",
    "arguments": {
      "group_id": "<group_id>",
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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `join_way` | 否 | `"domain" \| "normal" \| "inherit"` |  | 字段对应：<br>MCP 字段 `join_way` ↔ 原始 CodeArts 代码仓库 API 同名字段 `join_way`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`domain`、`normal`、`inherit`。 |
| `access_level` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `access_level` ↔ 原始 CodeArts 代码仓库 API 同名字段 `access_level`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "project_id": {
      "$ref": "#/properties/group_id"
    },
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "join_way": {
      "type": "string",
      "enum": [
        "domain",
        "normal",
        "inherit"
      ]
    },
    "access_level": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer"
        }
      ]
    }
  },
  "required": [
    "group_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_merge_request_approver_settings

所属模块：`代码仓库`

说明：查询代码仓库的组合并请求请求approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_merge_request_approver_settings",
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

### repo_list_group_merge_request_can_be_assigned_reviewers

所属模块：`代码仓库`

说明：查询代码仓库的组合并请求请求canbeassignedreviewers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_merge_request_can_be_assigned_reviewers",
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

### repo_list_group_merge_request_templates

所属模块：`代码仓库`

说明：查询代码仓库的组合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_merge_request_templates",
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
| `template_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_merge_request_valid_assigned_candidates

所属模块：`代码仓库`

说明：查询代码仓库的组合并请求请求validassignedcandidates。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_merge_request_valid_assigned_candidates",
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

### repo_list_group_permission_resources

所属模块：`代码仓库`

说明：查询代码仓库的组permissionresources。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_permission_resources",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `scope` | 否 | `"group" \| "project" \| "all"` | "all" | 字段对应：<br>MCP 字段 `scope` ↔ 原始 CodeArts 代码仓库 API 同名字段 `scope`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`group`、`project`、`all`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "scope": {
      "type": "string",
      "enum": [
        "group",
        "project",
        "all"
      ],
      "default": "all"
    }
  },
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

### repo_list_group_subgroups_and_repositories

所属模块：`代码仓库`

说明：查询代码仓库的组subgroupsand仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_subgroups_and_repositories",
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
    "group_id": {
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
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_user_groups

所属模块：`代码仓库`

说明：查询代码仓库的组用户组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_user_groups",
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
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "project_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_webhook_logs

所属模块：`代码仓库`

说明：查询代码仓库的组webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_webhook_logs",
    "arguments": {
      "hook_id": "<hook_id>",
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
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
| `created_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `created_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间上界，通常使用 ISO 8601 时间字符串。 |
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
    "hook_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_id": {
      "$ref": "#/properties/hook_id"
    },
    "uuid": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "created_after": {
      "type": "string",
      "minLength": 1
    },
    "created_before": {
      "type": "string",
      "minLength": 1
    },
    "group_id": {
      "$ref": "#/properties/hook_id"
    }
  },
  "required": [
    "hook_id",
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_group_webhooks

所属模块：`代码仓库`

说明：查询代码仓库的组webhooks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_group_webhooks",
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

### repo_list_groups

所属模块：`代码仓库`

说明：查询代码仓库的组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_groups",
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
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `all_available` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `all_available` ↔ 原始 CodeArts 代码仓库 API 同名字段 `all_available`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `order_by` | 否 | `"id" \| "name" \| "path" \| "created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`id`、`name`、`path`、`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `starred` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `starred` ↔ 原始 CodeArts 代码仓库 API 同名字段 `starred`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `owned` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `owned` ↔ 原始 CodeArts 代码仓库 API 同名字段 `owned`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
      "minLength": 1,
      "maxLength": 256
    },
    "all_available": {
      "type": "boolean"
    },
    "order_by": {
      "type": "string",
      "enum": [
        "id",
        "name",
        "path",
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
    "starred": {
      "type": "boolean"
    },
    "owned": {
      "type": "boolean"
    }
  },
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

### repo_list_latest_pipeline_jobs

所属模块：`代码仓库`

说明：查询代码仓库的最新流水线任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_latest_pipeline_jobs",
    "arguments": {
      "repository_id": "<repository_id>",
      "pipeline_id": "<pipeline_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_logs_tree

所属模块：`代码仓库`

说明：查询代码仓库的日志树。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_logs_tree",
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
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_manageable_groups

所属模块：`代码仓库`

说明：查询代码仓库的manageable组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_manageable_groups",
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
| `scope` | 否 | `"group" \| "repository"` | "repository" | 字段对应：<br>MCP 字段 `scope` ↔ 原始 CodeArts 代码仓库 API 同名字段 `scope`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`group`、`repository`。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "scope": {
      "type": "string",
      "enum": [
        "group",
        "repository"
      ],
      "default": "repository"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_members

所属模块：`代码仓库`

说明：查询代码仓库的成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_members",
    "arguments": {
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `repository_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `subject` | 否 | `string` |  | 字段对应：<br>MCP 字段 `subject` ↔ 原始 CodeArts 代码仓库 API 同名字段 `subject`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>主题或摘要，用于工作项、评论、通知等内容的简短说明。 |
| `permission` | 否 | `"repository" \| "code" \| "member" \| "branch" \| "tag" \| "mr" \| "label"` |  | 字段对应：<br>MCP 字段 `permission` ↔ 原始 CodeArts 代码仓库 API 同名字段 `permission`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`repository`、`code`、`member`、`branch`、`tag`、`mr`、`label`。 |
| `action` | 否 | `string` |  | 字段对应：<br>MCP 字段 `action` ↔ 原始 CodeArts 代码仓库 API 同名字段 `action`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_uuid": {
      "$ref": "#/properties/repository_id"
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "subject": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
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
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100
    },
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
  "required": [
    "x_auth_token"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_approver_settings

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_approver_settings",
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

### repo_list_merge_request_approvers

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求approvers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_approvers",
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
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `merge_request_iid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `target_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target仓库 ID，用于定位对应的 CodeArts 资源。 |
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
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "type": "string",
      "minLength": 1
    },
    "target_repository_id": {
      "$ref": "#/properties/merge_request_iid"
    },
    "repository_id": {
      "$ref": "#/properties/merge_request_iid"
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

### repo_list_merge_request_changes_trees

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求changestrees。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_changes_trees",
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
| `approval_user_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `approval_user_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_user_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approval用户 ID，用于定位对应的 CodeArts 资源。 |
| `commit_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `commit_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 ID，用于定位对应的 CodeArts 资源。 |
| `from_diff_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `from_diff_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `from_diff_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>fromdiff ID，用于定位对应的 CodeArts 资源。 |
| `to_diff_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `to_diff_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `to_diff_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>todiff ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "approval_user_id": {
      "$ref": "#/properties/repository_id"
    },
    "commit_id": {
      "type": "string",
      "minLength": 1,
      "maxLength": 40
    },
    "from_diff_id": {
      "$ref": "#/properties/repository_id"
    },
    "to_diff_id": {
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

### repo_list_merge_request_conflict_files

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求conflict文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_conflict_files",
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
| `hide_content` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `hide_content` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hide_content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "hide_content": {
      "type": "boolean"
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

### repo_list_merge_request_evaluations

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求evaluations。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_evaluations",
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

### repo_list_merge_request_participants

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求participants。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_participants",
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

### repo_list_merge_request_reviewers

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求reviewers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_reviewers",
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
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `merge_request_iid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `target_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target仓库 ID，用于定位对应的 CodeArts 资源。 |
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
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "type": "string",
      "minLength": 1
    },
    "target_repository_id": {
      "$ref": "#/properties/merge_request_iid"
    },
    "repository_id": {
      "$ref": "#/properties/merge_request_iid"
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_system_notes

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求systemnotes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_system_notes",
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

### repo_list_merge_request_templates

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_templates",
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
| `template_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_valid_assigned_candidates

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求validassignedcandidates。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_valid_assigned_candidates",
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
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `merge_request_iid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `target_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target仓库 ID，用于定位对应的 CodeArts 资源。 |
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
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "type": "string",
      "minLength": 1
    },
    "target_repository_id": {
      "$ref": "#/properties/merge_request_iid"
    },
    "repository_id": {
      "$ref": "#/properties/merge_request_iid"
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_versions

所属模块：`代码仓库`

说明：查询代码仓库的合并请求请求版本。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_versions",
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

### repo_list_personal_merge_requests

所属模块：`代码仓库`

说明：查询代码仓库的personal合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_personal_merge_requests",
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
| `state` | 否 | `"all" \| "opened" \| "closed" \| "locked" \| "merged"` | "all" | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`all`、`opened`、`closed`、`locked`、`merged`。 |
| `order_by` | 否 | `"created_at" \| "updated_at" \| "merged_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created_at`、`updated_at`、`merged_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `labels` | 否 | `string` |  | 字段对应：<br>MCP 字段 `labels` ↔ 原始 CodeArts 代码仓库 API 同名字段 `labels`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表或逗号分隔的标签字符串。 |
| `created_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间上界，通常使用 ISO 8601 时间字符串。 |
| `created_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `updated_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `updated_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `updated_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `updated_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `updated_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `view` | 否 | `"simple" \| "basic"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`simple`、`basic`。 |
| `author_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author ID，用于定位对应的 CodeArts 资源。 |
| `scope` | 否 | `"created_by_me" \| "assigned_to_me" \| "need_my_review" \| "need_my_approve" \| "all"` |  | 字段对应：<br>MCP 字段 `scope` ↔ 原始 CodeArts 代码仓库 API 同名字段 `scope`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`created_by_me`、`assigned_to_me`、`need_my_review`、`need_my_approve`、`all`。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `wip` | 否 | `string` |  | 字段对应：<br>MCP 字段 `wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merged_by` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merged_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merged_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merged_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merged_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merged_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `merged_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merged_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merged_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_count` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_count` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_count`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
        "opened",
        "closed",
        "locked",
        "merged"
      ],
      "default": "all"
    },
    "order_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at",
        "merged_at"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "labels": {
      "type": "string",
      "minLength": 1
    },
    "created_before": {
      "type": "string",
      "minLength": 1
    },
    "created_after": {
      "type": "string",
      "minLength": 1
    },
    "updated_after": {
      "type": "string",
      "minLength": 1
    },
    "updated_before": {
      "type": "string",
      "minLength": 1
    },
    "view": {
      "type": "string",
      "enum": [
        "simple",
        "basic"
      ]
    },
    "author_id": {
      "type": "string",
      "minLength": 1
    },
    "scope": {
      "type": "string",
      "enum": [
        "created_by_me",
        "assigned_to_me",
        "need_my_review",
        "need_my_approve",
        "all"
      ]
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "wip": {
      "type": "string",
      "minLength": 1
    },
    "merged_by": {
      "$ref": "#/properties/author_id"
    },
    "merged_after": {
      "type": "string",
      "minLength": 1
    },
    "merged_before": {
      "type": "string",
      "minLength": 1
    },
    "only_count": {
      "type": "boolean"
    }
  },
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

### repo_list_pipeline_jobs

所属模块：`代码仓库`

说明：查询代码仓库的流水线任务。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_pipeline_jobs",
    "arguments": {
      "repository_id": "<repository_id>",
      "pipeline_id": "<pipeline_id>"
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
| `pipeline_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pipeline_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "pipeline_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_product_permission_resources_granted_users

所属模块：`代码仓库`

说明：查询代码仓库的productpermissionresourcesgranted用户。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_product_permission_resources_granted_users",
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
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "project_id"
  ],
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

### repo_list_project_members

所属模块：`代码仓库`

说明：查询代码仓库的项目成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_members",
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
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_project_merge_request_approver_settings

所属模块：`代码仓库`

说明：查询代码仓库的项目合并请求请求approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_merge_request_approver_settings",
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

### repo_list_project_merge_request_can_be_assigned_reviewers

所属模块：`代码仓库`

说明：查询代码仓库的项目合并请求请求canbeassignedreviewers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_merge_request_can_be_assigned_reviewers",
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

### repo_list_project_merge_request_can_be_assigned_users

所属模块：`代码仓库`

说明：查询代码仓库的项目合并请求请求canbeassigned用户。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_merge_request_can_be_assigned_users",
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

### repo_list_project_merge_request_templates

所属模块：`代码仓库`

说明：查询代码仓库的项目合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_merge_request_templates",
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
| `template_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_project_merge_requests

所属模块：`代码仓库`

说明：查询代码仓库的项目合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_merge_requests",
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
| `state` | 否 | `"all" \| "opened" \| "closed" \| "locked" \| "merged"` |  | 字段对应：<br>MCP 字段 `state` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。可选值：`all`、`opened`、`closed`、`locked`、`merged`。 |
| `order_by` | 否 | `"created_at" \| "updated_at" \| "title"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created_at`、`updated_at`、`title`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `author_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `author_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author ID，用于定位对应的 CodeArts 资源。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `source_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>来源仓库 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "state": {
      "type": "string",
      "enum": [
        "all",
        "opened",
        "closed",
        "locked",
        "merged"
      ]
    },
    "order_by": {
      "type": "string",
      "enum": [
        "created_at",
        "updated_at",
        "title"
      ]
    },
    "sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "author_id": {
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
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "source_repository_id": {
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

### repo_list_project_note_required_attributes

所属模块：`代码仓库`

说明：查询代码仓库的项目noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_note_required_attributes",
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

### repo_list_project_repositories

所属模块：`代码仓库`

说明：查询代码仓库的项目仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_repositories",
    "arguments": {
      "x_auth_token": "<x_auth_token>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `project_uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 代码仓库 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `order_by` | 否 | `"id" \| "name" \| "created_at" \| "updated_at"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`id`、`name`、`created_at`、`updated_at`。 |
| `sort` | 否 | `"asc" \| "desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`asc`、`desc`。 |
| `offset` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `offset` ↔ 原始 CodeArts 代码仓库 API 同名字段 `offset`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。 |
| `limit` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `limit` ↔ 原始 CodeArts 代码仓库 API 同名字段 `limit`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分页数量上限，表示本次最多返回多少条记录。 |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "$ref": "#/properties/project_id"
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
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100
    },
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
  "required": [
    "x_auth_token"
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

### repo_list_project_template_status_repositories

所属模块：`代码仓库`

说明：查询代码仓库的项目模板状态仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_template_status_repositories",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "project_uuid": "<project_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 代码仓库 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `page_no` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page_no` ↔ 原始 CodeArts 代码仓库 API 同名字段 `page_no`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `page_size` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `page_size` ↔ 原始 CodeArts 代码仓库 API 的分页大小字段，常见原字段名为 `page_size`、`limit` 或 `pageSize`。<br>每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "page_no": {
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
  "required": [
    "x_auth_token",
    "project_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_project_webhook_logs

所属模块：`代码仓库`

说明：查询代码仓库的项目webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_webhook_logs",
    "arguments": {
      "hook_id": "<hook_id>",
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
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `uuid` | 否 | `string` |  | 字段对应：<br>MCP 字段 `uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。 |
| `created_after` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_after` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_after`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间下界，通常使用 ISO 8601 时间字符串。 |
| `created_before` | 否 | `string` |  | 字段对应：<br>MCP 字段 `created_before` ↔ 原始 CodeArts 代码仓库 API 同名字段 `created_before`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>创建时间上界，通常使用 ISO 8601 时间字符串。 |
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
    "hook_id": {
      "type": "string",
      "minLength": 1
    },
    "repository_id": {
      "$ref": "#/properties/hook_id"
    },
    "uuid": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "created_after": {
      "type": "string",
      "minLength": 1
    },
    "created_before": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/hook_id"
    }
  },
  "required": [
    "hook_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_project_webhooks

所属模块：`代码仓库`

说明：查询代码仓库的项目webhooks。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_project_webhooks",
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

### repo_list_refs_list

所属模块：`代码仓库`

说明：查询代码仓库的引用list。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_refs_list",
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

### repo_list_repository_events

所属模块：`代码仓库`

说明：查询代码仓库的仓库events。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_events",
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

### repo_list_repository_file_list

所属模块：`代码仓库`

说明：查询代码仓库的仓库文件list。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_file_list",
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
    "ref_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
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
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `sort` | 否 | `"name_asc" \| "name_desc" \| "created_asc" \| "created_desc" \| "updated_asc" \| "updated_desc"` |  | 字段对应：<br>MCP 字段 `sort` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sort`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序方向。asc 表示升序，desc 表示降序。可选值：`name_asc`、`name_desc`、`created_asc`、`created_desc`、`updated_asc`、`updated_desc`。 |
| `include_expired` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `include_expired` ↔ 原始 CodeArts 代码仓库 API 同名字段 `include_expired`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `view` | 否 | `"simple" \| "basic" \| "detail"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`simple`、`basic`、`detail`。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "sort": {
      "type": "string",
      "enum": [
        "name_asc",
        "name_desc",
        "created_asc",
        "created_desc",
        "updated_asc",
        "updated_desc"
      ]
    },
    "include_expired": {
      "type": "boolean"
    },
    "view": {
      "type": "string",
      "enum": [
        "simple",
        "basic",
        "detail"
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

### repo_list_repository_logs_tree

所属模块：`代码仓库`

说明：查询代码仓库的仓库日志树。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_logs_tree",
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
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
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

### repo_list_repository_merge_requests

所属模块：`代码仓库`

说明：查询代码仓库的仓库合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_merge_requests",
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

### repo_list_repository_related_commits

所属模块：`代码仓库`

说明：查询代码仓库的仓库相关提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_related_commits",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `type` | 否 | `integer` | 0 | 字段对应：<br>MCP 字段 `type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `page` | 否 | `integer` | 1 | 字段对应：<br>MCP 字段 `page` ↔ 原始 CodeArts 代码仓库 API 的分页页码或由 `offset/limit` 换算得到的页码。<br>页码，从服务端约定的起始页开始，用于 page/page_size 分页。 |
| `per_page` | 否 | `integer` | 20 | 字段对应：<br>MCP 字段 `per_page` ↔ 原始 CodeArts 代码仓库 API 同名字段 `per_page`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1,
      "default": 0
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "per_page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid"
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

### repo_list_repository_review_authors

所属模块：`代码仓库`

说明：查询代码仓库的仓库评审authors。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_review_authors",
    "arguments": {
      "repository_id": "<repository_id>",
      "noteable_type": "<noteable_type>",
      "resolved_status": "<resolved_status>"
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
| `noteable_type` | 是 | `"Commit" \| "MergeRequest"` |  | 字段对应：<br>MCP 字段 `noteable_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `noteable_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`Commit`、`MergeRequest`。 |
| `resolved_status` | 是 | `"resolved" \| "unresolved" \| "all"` |  | 字段对应：<br>MCP 字段 `resolved_status` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resolved_status`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`resolved`、`unresolved`、`all`。 |
| `reviewers_filter` | 否 | `string` |  | 字段对应：<br>MCP 字段 `reviewers_filter` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers_filter`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "noteable_type": {
      "type": "string",
      "enum": [
        "Commit",
        "MergeRequest"
      ]
    },
    "resolved_status": {
      "type": "string",
      "enum": [
        "resolved",
        "unresolved",
        "all"
      ]
    },
    "reviewers_filter": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    }
  },
  "required": [
    "repository_id",
    "noteable_type",
    "resolved_status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_reviews

所属模块：`代码仓库`

说明：查询代码仓库的仓库reviews。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_reviews",
    "arguments": {
      "repository_id": "<repository_id>",
      "noteable_type": "<noteable_type>"
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
| `noteable_type` | 是 | `"Commit" \| "MergeRequest"` |  | 字段对应：<br>MCP 字段 `noteable_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `noteable_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`Commit`、`MergeRequest`。 |
| `search` | 否 | `string` |  | 字段对应：<br>MCP 字段 `search` ↔ 原始 CodeArts 代码仓库 API 同名字段 `search`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>搜索关键字，用于按名称、标题、编号等文本条件过滤列表。 |
| `start_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `start_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |
| `only_count` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_count` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_count`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_categories` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `severity` | 否 | `string` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 代码仓库 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。 |
| `assignee_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `assignee_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>负责人用户 ID，用于指定工作项、任务或评审的当前处理人。 |
| `proposer_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `proposer_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `proposer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>proposer ID，用于定位对应的 CodeArts 资源。 |
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `include_reply` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `include_reply` ↔ 原始 CodeArts 代码仓库 API 同名字段 `include_reply`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `order_by` | 否 | `"created" \| "updated"` |  | 字段对应：<br>MCP 字段 `order_by` ↔ 原始 CodeArts 代码仓库 API 同名字段 `order_by`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>排序字段，用于选择服务端排序依据。可选值：`created`、`updated`。 |
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
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "noteable_type": {
      "type": "string",
      "enum": [
        "Commit",
        "MergeRequest"
      ]
    },
    "search": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "start_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "end_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "only_count": {
      "type": "boolean"
    },
    "review_categories": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "review_modules": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "severity": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "assignee_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "proposer_id": {
      "$ref": "#/properties/assignee_id"
    },
    "target_branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "include_reply": {
      "type": "boolean"
    },
    "order_by": {
      "type": "string",
      "enum": [
        "created",
        "updated"
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
    "repository_id",
    "noteable_type"
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

### repo_list_repository_trees

所属模块：`代码仓库`

说明：查询代码仓库的仓库trees。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_trees",
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
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `recursive` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `recursive` ↔ 原始 CodeArts 代码仓库 API 同名字段 `recursive`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "recursive": {
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

### repo_list_trees

所属模块：`代码仓库`

说明：查询代码仓库的trees。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_trees",
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
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `recursive` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `recursive` ↔ 原始 CodeArts 代码仓库 API 同名字段 `recursive`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "recursive": {
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

### repo_list_trusted_ip_addresses

所属模块：`代码仓库`

说明：查询代码仓库的trustedipaddresses。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_trusted_ip_addresses",
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

### repo_list_user_gpg_keys

所属模块：`代码仓库`

说明：查询代码仓库的用户gpgkeys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_user_gpg_keys",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_user_keys

所属模块：`代码仓库`

说明：查询代码仓库的用户keys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_user_keys",
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
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_user_ssh_keys

所属模块：`代码仓库`

说明：查询代码仓库的用户sshkeys。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_user_ssh_keys",
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
| `query` | 否 | `string` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_lock_repository

所属模块：`代码仓库`

说明：执行代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_lock_repository",
    "arguments": {
      "project_id": "<project_id>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
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
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
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

### repo_post_groups_bc1b5085

所属模块：`代码仓库`

说明：执行代码仓库的组bc1b5085。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_groups_bc1b5085",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_projects_repositories_e143bba0

所属模块：`代码仓库`

说明：执行代码仓库的项目仓库e143bba0。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_projects_repositories_e143bba0",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_projects_repository_commits_4666f0cc

所属模块：`代码仓库`

说明：执行代码仓库的项目仓库提交4666f0cc。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_projects_repository_commits_4666f0cc",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_repositories_hooks_cf84809a

所属模块：`代码仓库`

说明：执行代码仓库的仓库hookscf84809a。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_repositories_hooks_cf84809a",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_repositories_members_7d2de4d2

所属模块：`代码仓库`

说明：执行代码仓库的仓库成员7d2de4d2。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_repositories_members_7d2de4d2",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_repositories_repository_tags_13efa16b

所属模块：`代码仓库`

说明：执行代码仓库的仓库仓库标签13efa16b。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_repositories_repository_tags_13efa16b",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_repository_names_validations_13148e24

所属模块：`代码仓库`

说明：执行代码仓库的仓库namesvalidations13148e24。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_repository_names_validations_13148e24",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_post_users_impersonation_bearer_tokens_9c26f145

所属模块：`代码仓库`

说明：执行代码仓库的用户impersonationbearertokens9c26f145。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_post_users_impersonation_bearer_tokens_9c26f145",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_groups_merge_requests_template_d16a20e6

所属模块：`代码仓库`

说明：执行代码仓库的组合并请求请求模板d16a20e6。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_groups_merge_requests_template_d16a20e6",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_projects_merge_requests_template_2331d2f8

所属模块：`代码仓库`

说明：执行代码仓库的项目合并请求请求模板2331d2f8。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_projects_merge_requests_template_2331d2f8",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repositories_branch_protect_1596d582

所属模块：`代码仓库`

说明：执行代码仓库的仓库分支protect1596d582。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repositories_branch_protect_1596d582",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repositories_merge_requests_approval_1b256854

所属模块：`代码仓库`

说明：执行代码仓库的仓库合并请求请求approval1b256854。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repositories_merge_requests_approval_1b256854",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repositories_merge_requests_approval_737afd30

所属模块：`代码仓库`

说明：执行代码仓库的仓库合并请求请求approval737afd30。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repositories_merge_requests_approval_737afd30",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repositories_merge_requests_template_0ccdac80

所属模块：`代码仓库`

说明：执行代码仓库的仓库合并请求请求模板0ccdac80。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repositories_merge_requests_template_0ccdac80",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repositories_transfer_task_f0dc68db

所属模块：`代码仓库`

说明：执行代码仓库的仓库transfer任务f0dc68db。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repositories_transfer_task_f0dc68db",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_put_repository_123456_permissions_code_bd564ad3

所属模块：`代码仓库`

说明：执行代码仓库的仓库123456permissionscodebd564ad3。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_put_repository_123456_permissions_code_bd564ad3",
    "arguments": {}
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `path_params` | 否 | `object` |  | 字段对应：<br>MCP 字段 `path_params` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path_params`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `query` | 否 | `object` |  | 字段对应：<br>MCP 字段 `query` ↔ 原始 CodeArts 代码仓库 API 同名字段 `query`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。 |
| `body` | 否 | `object` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
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

### repo_rebase_merge_request_for_open_api

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求foropenapi。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_rebase_merge_request_for_open_api",
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

### repo_rebuild_repository_navigation

所属模块：`代码仓库`

说明：执行代码仓库的仓库navigation。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_rebuild_repository_navigation",
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

### repo_remove_deploy_key

所属模块：`代码仓库`

说明：执行代码仓库的部署key。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_deploy_key",
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

### repo_remove_deploy_key_from_submodules

所属模块：`代码仓库`

说明：执行代码仓库的部署keyfromsubmodules。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_deploy_key_from_submodules",
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

### repo_remove_group_webhook

所属模块：`代码仓库`

说明：执行代码仓库的组webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_group_webhook",
    "arguments": {
      "group_id": "<group_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
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
    "hook_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_remove_project_webhook

所属模块：`代码仓库`

说明：执行代码仓库的项目webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_project_webhook",
    "arguments": {
      "project_id": "<project_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
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
    "hook_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "hook_id"
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

### repo_remove_repository_webhook

所属模块：`代码仓库`

说明：执行代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_remove_repository_webhook",
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

### repo_rename_file

所属模块：`代码仓库`

说明：执行代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_rename_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "previous_path": "<previous_path>",
      "branch_name": "<branch_name>",
      "commit_message": "<commit_message>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `previous_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `previous_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `previous_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `start_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `start_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_email` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author名称。 |
| `infer_content` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `infer_content` ↔ 原始 CodeArts 代码仓库 API 同名字段 `infer_content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `content` | 否 | `string` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 代码仓库 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `encoding` | 否 | `"text" \| "base64"` |  | 字段对应：<br>MCP 字段 `encoding` ↔ 原始 CodeArts 代码仓库 API 同名字段 `encoding`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`text`、`base64`。 |
| `last_commit_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `last_commit_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `last_commit_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>last提交 ID，用于定位对应的 CodeArts 资源。 |
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
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "previous_path": {
      "type": "string",
      "minLength": 1
    },
    "branch_name": {
      "type": "string",
      "minLength": 1
    },
    "commit_message": {
      "type": "string",
      "minLength": 1
    },
    "start_branch": {
      "type": "string",
      "minLength": 1
    },
    "author_email": {
      "type": "string",
      "minLength": 1
    },
    "author_name": {
      "type": "string",
      "minLength": 1
    },
    "infer_content": {
      "type": "boolean"
    },
    "content": {
      "type": "string"
    },
    "encoding": {
      "type": "string",
      "enum": [
        "text",
        "base64"
      ]
    },
    "last_commit_id": {
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
    "file_path",
    "previous_path",
    "branch_name",
    "commit_message"
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

### repo_resolve_merge_request_conflicts

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求conflicts。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_resolve_merge_request_conflicts",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "commit_message": "<commit_message>",
      "files": "<files>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `files` | 是 | `array<object>` |  | 字段对应：<br>MCP 字段 `files` ↔ 原始 CodeArts 代码仓库 API 同名字段 `files`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "commit_message": {
      "type": "string",
      "minLength": 1
    },
    "files": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "old_path": {
            "type": "string",
            "minLength": 1
          },
          "new_path": {
            "type": "string",
            "minLength": 1
          },
          "sections": {
            "type": "object",
            "additionalProperties": {}
          },
          "content": {
            "type": "string"
          }
        },
        "required": [
          "old_path",
          "new_path"
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
    "merge_request_iid",
    "commit_message",
    "files"
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

### repo_send_user_email_verify_code

所属模块：`代码仓库`

说明：执行代码仓库的用户emailverifycode。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_send_user_email_verify_code",
    "arguments": {
      "email": "<email>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `email` | 是 | `string` |  | 字段对应：<br>MCP 字段 `email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "email"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_actual_head_pipeline

所属模块：`代码仓库`

说明：执行代码仓库的actualhead流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_actual_head_pipeline",
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

### repo_show_average_evaluation

所属模块：`代码仓库`

说明：执行代码仓库的averageevaluation。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_average_evaluation",
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

### repo_show_branch

所属模块：`代码仓库`

说明：执行代码仓库的分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_branch",
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

### repo_show_branch_conflict

所属模块：`代码仓库`

说明：执行代码仓库的分支conflict。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_branch_conflict",
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
| `source_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>来源仓库 ID，用于定位对应的 CodeArts 资源。 |
| `source_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。 |
| `target_branch` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。 |
| `target_repository_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target_repository_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_repository_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>target仓库 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "source_repository_id": {
      "$ref": "#/properties/repository_id"
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_repository_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_branch_file

所属模块：`代码仓库`

说明：执行代码仓库的分支文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_branch_file",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "branch_name": "<branch_name>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `branch_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "branch_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid",
    "branch_name",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_commit

所属模块：`代码仓库`

说明：执行代码仓库的提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_commit",
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

### repo_show_commit_comments_by_line

所属模块：`代码仓库`

说明：执行代码仓库的提交评论byline。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_commit_comments_by_line",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
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

### repo_show_commit_diff_metadata

所属模块：`代码仓库`

说明：执行代码仓库的提交diffmetadata。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_commit_diff_metadata",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
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

### repo_show_commit_file_diff

所属模块：`代码仓库`

说明：执行代码仓库的提交文件diff。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_commit_file_diff",
    "arguments": {
      "repository_id": "<repository_id>",
      "sha": "<sha>",
      "path": "<path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |
| `path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `old_path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `old_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `old_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `ignore_whitespace_change` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `ignore_whitespace_change` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ignore_whitespace_change`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否忽略空白字符变化。true 表示代码比较时忽略空格、缩进、换行等差异。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "old_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100000
    },
    "ignore_whitespace_change": {
      "type": "boolean"
    }
  },
  "required": [
    "repository_id",
    "sha",
    "path"
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

### repo_show_diff_commit

所属模块：`代码仓库`

说明：执行代码仓库的diff提交。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_diff_commit",
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
| `ignore_whitespace_change` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `ignore_whitespace_change` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ignore_whitespace_change`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否忽略空白字符变化。true 表示代码比较时忽略空格、缩进、换行等差异。 |
| `not_statistic` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `not_statistic` ↔ 原始 CodeArts 代码仓库 API 同名字段 `not_statistic`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
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
      "minLength": 1,
      "maxLength": 2000
    },
    "ignore_whitespace_change": {
      "type": "boolean"
    },
    "not_statistic": {
      "type": "boolean"
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

### repo_show_file

所属模块：`代码仓库`

说明：执行代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |

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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_file_content

所属模块：`代码仓库`

说明：执行代码仓库的文件content。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_file_content",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "sha": "<sha>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `sha` | 是 | `string` |  | 字段对应：<br>MCP 字段 `sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交 SHA，用于校验合并请求头部提交。 |

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
    "sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_file_raw

所属模块：`代码仓库`

说明：执行代码仓库的文件raw。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_file_raw",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `file_path` | 是 | `string` |  | 字段对应：<br>MCP 字段 `file_path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `file_path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。 |
| `ref` | 否 | `string` |  | 字段对应：<br>MCP 字段 `ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。 |

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
    "ref": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    }
  },
  "required": [
    "repository_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_group

所属模块：`代码仓库`

说明：执行代码仓库的组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |

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
    "project_id",
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_group_approver_settings

所属模块：`代码仓库`

说明：执行代码仓库的组approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_approver_settings",
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

### repo_show_group_general_policy

所属模块：`代码仓库`

说明：执行代码仓库的组generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_general_policy",
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

### repo_show_group_inherit_setting

所属模块：`代码仓库`

说明：执行代码仓库的组inheritsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_inherit_setting",
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

### repo_show_group_merge_request_setting

所属模块：`代码仓库`

说明：执行代码仓库的组合并请求请求setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_merge_request_setting",
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

### repo_show_group_note_required_attributes

所属模块：`代码仓库`

说明：执行代码仓库的组noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_note_required_attributes",
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

### repo_show_group_permission_inherit_enabled

所属模块：`代码仓库`

说明：执行代码仓库的组permissioninheritenabled。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_permission_inherit_enabled",
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

### repo_show_group_review_settings

所属模块：`代码仓库`

说明：执行代码仓库的组评审settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_review_settings",
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

### repo_show_group_settings_inherit_cfg

所属模块：`代码仓库`

说明：执行代码仓库的组settingsinheritcfg。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_settings_inherit_cfg",
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

### repo_show_group_watermark

所属模块：`代码仓库`

说明：执行代码仓库的组watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_watermark",
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

### repo_show_group_webhook

所属模块：`代码仓库`

说明：执行代码仓库的组webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_webhook",
    "arguments": {
      "group_id": "<group_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_group_webhook_log

所属模块：`代码仓库`

说明：执行代码仓库的组webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_group_webhook_log",
    "arguments": {
      "group_id": "<group_id>",
      "hook_id": "<hook_id>",
      "log_id": "<log_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `log_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `log_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `log_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/group_id"
    },
    "log_id": {
      "$ref": "#/properties/group_id"
    }
  },
  "required": [
    "group_id",
    "hook_id",
    "log_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_groups_general_policy

所属模块：`代码仓库`

说明：执行代码仓库的组generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_groups_general_policy",
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

### repo_show_groups_inherit

所属模块：`代码仓库`

说明：执行代码仓库的组inherit。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_groups_inherit",
    "arguments": {
      "group_id": "<group_id>",
      "setting_type": "<setting_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `setting_type` | 是 | `"protected_branches" \| "protected_tags" \| "push_rules" \| "merge_requests" \| "mr_branch_policies" \| "reviews" \| "e2e_settings" \| "webhook_settings" \| "deploy_keys" \| "watermark" \| "repository_settings"` |  | 字段对应：<br>MCP 字段 `setting_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`protected_branches`、`protected_tags`、`push_rules`、`merge_requests`、`mr_branch_policies`、`reviews`、`e2e_settings`、`webhook_settings`、`deploy_keys`、`watermark`、`repository_settings`。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "setting_type": {
      "type": "string",
      "enum": [
        "protected_branches",
        "protected_tags",
        "push_rules",
        "merge_requests",
        "mr_branch_policies",
        "reviews",
        "e2e_settings",
        "webhook_settings",
        "deploy_keys",
        "watermark",
        "repository_settings"
      ]
    }
  },
  "required": [
    "group_id",
    "setting_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_https_password_setting

所属模块：`代码仓库`

说明：执行代码仓库的httpspasswordsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_https_password_setting",
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

### repo_show_merge_request_comments_by_line

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求评论byline。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_comments_by_line",
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
| `line` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `line` ↔ 原始 CodeArts 代码仓库 API 同名字段 `line`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `with_commit_comments` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `with_commit_comments` ↔ 原始 CodeArts 代码仓库 API 同名字段 `with_commit_comments`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `path` | 否 | `string` |  | 字段对应：<br>MCP 字段 `path` ↔ 原始 CodeArts 代码仓库 API 同名字段 `path`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。 |
| `view` | 否 | `"basic" \| "sample"` |  | 字段对应：<br>MCP 字段 `view` ↔ 原始 CodeArts 代码仓库 API 同名字段 `view`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>视图类型或视图配置，用于控制列表、看板、树形等展示方式。可选值：`basic`、`sample`。 |
| `base_sha` | 否 | `string` |  | 字段对应：<br>MCP 字段 `base_sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `base_sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `start_sha` | 否 | `string` |  | 字段对应：<br>MCP 字段 `start_sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `start_sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `head_sha` | 否 | `string` |  | 字段对应：<br>MCP 字段 `head_sha` ↔ 原始 CodeArts 代码仓库 API 同名字段 `head_sha`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "line": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "with_commit_comments": {
      "type": "boolean"
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "view": {
      "type": "string",
      "enum": [
        "basic",
        "sample"
      ]
    },
    "base_sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "start_sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "head_sha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
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

### repo_show_merge_request_detail

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_detail",
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

### repo_show_merge_request_discussion

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求讨论。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_discussion",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "discussion_id": "<discussion_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `discussion_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `discussion_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `discussion_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>讨论 ID，用于定位对应的 CodeArts 资源。 |

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
    "discussion_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "discussion_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_merge_request_setting

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_setting",
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

### repo_show_merge_request_template

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_template",
    "arguments": {
      "repository_id": "<repository_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "template_id"
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

### repo_show_merge_request_votes_detail

所属模块：`代码仓库`

说明：执行代码仓库的合并请求请求votes详情。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_merge_request_votes_detail",
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

### repo_show_mergeable_state_outer

所属模块：`代码仓库`

说明：执行代码仓库的mergeablestateouter。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_mergeable_state_outer",
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

### repo_show_note_required_attributes

所属模块：`代码仓库`

说明：执行代码仓库的noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_note_required_attributes",
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

### repo_show_project_approver_settings

所属模块：`代码仓库`

说明：执行代码仓库的项目approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_approver_settings",
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

### repo_show_project_merge_request_setting

所属模块：`代码仓库`

说明：执行代码仓库的项目合并请求请求setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_merge_request_setting",
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

### repo_show_project_review_settings

所属模块：`代码仓库`

说明：执行代码仓库的项目评审settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_review_settings",
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

### repo_show_project_webhook

所属模块：`代码仓库`

说明：执行代码仓库的项目webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_webhook",
    "arguments": {
      "project_id": "<project_id>",
      "hook_id": "<hook_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_project_webhook_log

所属模块：`代码仓库`

说明：执行代码仓库的项目webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_project_webhook_log",
    "arguments": {
      "project_id": "<project_id>",
      "hook_id": "<hook_id>",
      "log_id": "<log_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `hook_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `hook_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `hook_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>hook ID，用于定位对应的 CodeArts 资源。 |
| `log_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `log_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `log_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>日志 ID，用于定位对应的 CodeArts 资源。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/project_id"
    },
    "log_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "hook_id",
    "log_id"
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

### repo_show_protected_branch

所属模块：`代码仓库`

说明：执行代码仓库的保护分支。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_protected_branch",
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

### repo_show_protected_tag

所属模块：`代码仓库`

说明：执行代码仓库的保护标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_protected_tag",
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

### repo_show_readme_file

所属模块：`代码仓库`

说明：执行代码仓库的readme文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_readme_file",
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

### repo_show_ref_compare

所属模块：`代码仓库`

说明：执行代码仓库的refcompare。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_ref_compare",
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

### repo_show_remote_mirror

所属模块：`代码仓库`

说明：执行代码仓库的remotemirror。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_remote_mirror",
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

### repo_show_repository

所属模块：`代码仓库`

说明：执行代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository",
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

### repo_show_repository_approver_settings

所属模块：`代码仓库`

说明：执行代码仓库的仓库approversettings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_approver_settings",
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

### repo_show_repository_commit_lines

所属模块：`代码仓库`

说明：执行代码仓库的仓库提交lines。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_commit_lines",
    "arguments": {
      "repository_id": "<repository_id>",
      "ref_name": "<ref_name>",
      "begin_date": "<begin_date>",
      "end_date": "<end_date>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `ref_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `ref_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `ref_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>ref名称。 |
| `begin_date` | 是 | `string` |  | 字段对应：<br>MCP 字段 `begin_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `begin_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `end_date` | 是 | `string` |  | 字段对应：<br>MCP 字段 `end_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ref_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "begin_date": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    },
    "end_date": {
      "type": "string",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    }
  },
  "required": [
    "repository_id",
    "ref_name",
    "begin_date",
    "end_date"
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

### repo_show_repository_master

所属模块：`代码仓库`

说明：执行代码仓库的仓库master。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_master",
    "arguments": {
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_show_repository_merge_request_setting

所属模块：`代码仓库`

说明：执行代码仓库的仓库合并请求请求setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_merge_request_setting",
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

### repo_show_repository_merge_requests_statistic

所属模块：`代码仓库`

说明：执行代码仓库的仓库合并请求请求统计。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_merge_requests_statistic",
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

### repo_show_repository_readme_file

所属模块：`代码仓库`

说明：执行代码仓库的仓库readme文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_readme_file",
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

### repo_show_repository_statistic_data

所属模块：`代码仓库`

说明：执行代码仓库的仓库统计data。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_statistic_data",
    "arguments": {
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_uuid"
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

### repo_show_repository_status

所属模块：`代码仓库`

说明：执行代码仓库的仓库状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_status",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid"
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

### repo_show_repository_webhook

所属模块：`代码仓库`

说明：执行代码仓库的仓库webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_webhook",
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

### repo_show_repository_webhook_log

所属模块：`代码仓库`

说明：执行代码仓库的仓库webhook日志。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_repository_webhook_log",
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

### repo_show_review_setting

所属模块：`代码仓库`

说明：执行代码仓库的评审setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_review_setting",
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
| `with_default_review_categories` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `with_default_review_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `with_default_review_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "with_default_review_categories": {
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

### repo_show_tag

所属模块：`代码仓库`

说明：执行代码仓库的标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_tag",
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

### repo_show_user_emails

所属模块：`代码仓库`

说明：执行代码仓库的用户emails。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_show_user_emails",
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

### repo_start_house_keeping

所属模块：`代码仓库`

说明：启动代码仓库的housekeeping。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_start_house_keeping",
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
      "x_auth_token": "<x_auth_token>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
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
    "x_auth_token",
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_sync_deploy_key_to_submodules

所属模块：`代码仓库`

说明：执行代码仓库的部署keytosubmodules。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_sync_deploy_key_to_submodules",
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

### repo_transfer_group

所属模块：`代码仓库`

说明：流转代码仓库的组。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_transfer_group",
    "arguments": {
      "group_id": "<group_id>",
      "owner_id": "<owner_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `owner_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `owner_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `owner_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>拥有者 ID，用于定位对应的 CodeArts 资源。 |
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
    "owner_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "owner_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_transfer_repository

所属模块：`代码仓库`

说明：流转代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_transfer_repository",
    "arguments": {
      "repository_id": "<repository_id>",
      "namespace": "<namespace>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `namespace` | 是 | `string` |  | 字段对应：<br>MCP 字段 `namespace` ↔ 原始 CodeArts 代码仓库 API 同名字段 `namespace`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "namespace": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "namespace"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_unlock_repository

所属模块：`代码仓库`

说明：执行代码仓库的仓库。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_unlock_repository",
    "arguments": {
      "project_id": "<project_id>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
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
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_branch_name

所属模块：`代码仓库`

说明：更新代码仓库的分支name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_branch_name",
    "arguments": {
      "repository_id": "<repository_id>",
      "old_branch": "<old_branch>",
      "new_branch": "<new_branch>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `old_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `old_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `old_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `new_branch` | 是 | `string` |  | 字段对应：<br>MCP 字段 `new_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `new_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "old_branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "new_branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "old_branch",
    "new_branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_file

所属模块：`代码仓库`

说明：更新代码仓库的文件。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_file",
    "arguments": {
      "repository_id": "<repository_id>",
      "file_path": "<file_path>",
      "branch": "<branch>",
      "commit_message": "<commit_message>",
      "content": "<content>"
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
| `commit_message` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `content` | 是 | `string` |  | 字段对应：<br>MCP 字段 `content` ↔ 原始 CodeArts 代码仓库 API 同名字段 `content`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>正文内容。评论、文件或请求体场景下表示要提交的文本内容。 |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `author_email` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>author名称。 |
| `encoding` | 否 | `"text" \| "base64"` |  | 字段对应：<br>MCP 字段 `encoding` ↔ 原始 CodeArts 代码仓库 API 同名字段 `encoding`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`text`、`base64`。 |
| `last_commit_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `last_commit_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `last_commit_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>last提交 ID，用于定位对应的 CodeArts 资源。 |
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
    "file_path": {
      "type": "string",
      "minLength": 1,
      "maxLength": 10000
    },
    "branch": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "commit_message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "author_email": {
      "type": "string",
      "minLength": 1
    },
    "author_name": {
      "type": "string",
      "minLength": 1
    },
    "encoding": {
      "type": "string",
      "enum": [
        "text",
        "base64"
      ]
    },
    "last_commit_id": {
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
    "file_path",
    "branch",
    "commit_message",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_general_policy

所属模块：`代码仓库`

说明：更新代码仓库的组generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_general_policy",
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
    "group_id": {
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
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_merge_request_approver_setting

所属模块：`代码仓库`

说明：更新代码仓库的组合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_merge_request_approver_setting",
    "arguments": {
      "group_id": "<group_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "group_id": {
      "$ref": "#/properties/id"
    },
    "setting_id": {
      "$ref": "#/properties/id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_merge_request_template

所属模块：`代码仓库`

说明：更新代码仓库的组合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "group_id": "<group_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_name",
    "group_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_note_required_attributes

所属模块：`代码仓库`

说明：更新代码仓库的组noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_note_required_attributes",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id"
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

### repo_update_group_review_settings

所属模块：`代码仓库`

说明：更新代码仓库的组评审settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_review_settings",
    "arguments": {
      "group_id": "<group_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `categories_and_modules_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `categories_and_modules_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `categories_and_modules_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `secondary_category_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `secondary_category_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `secondary_category_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_default_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_default_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_default_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_customized_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_customized_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_customized_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "categories_and_modules_enabled": {
      "type": "boolean"
    },
    "review_modules": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "secondary_category_enabled": {
      "type": "boolean"
    },
    "review_default_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "review_customized_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_watermark

所属模块：`代码仓库`

说明：更新代码仓库的组watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_watermark",
    "arguments": {
      "group_id": "<group_id>",
      "watermark": "<watermark>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
| `watermark` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `watermark` ↔ 原始 CodeArts 代码仓库 API 同名字段 `watermark`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "watermark": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "watermark"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_group_webhook

所属模块：`代码仓库`

说明：更新代码仓库的组webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_group_webhook",
    "arguments": {
      "group_id": "<group_id>",
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
| `group_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `group_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `group_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>分组 ID，用于定位对应的 CodeArts 资源。 |
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
    "group_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/group_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "group_id",
    "hook_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_https_password_setting

所属模块：`代码仓库`

说明：更新代码仓库的httpspasswordsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_https_password_setting",
    "arguments": {
      "https_clone_iam_auth": "<https_clone_iam_auth>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `https_clone_iam_auth` | 是 | `boolean \| "true" \| "false"` |  | 字段对应：<br>MCP 字段 `https_clone_iam_auth` ↔ 原始 CodeArts 代码仓库 API 同名字段 `https_clone_iam_auth`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`true`、`false`。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "https_clone_iam_auth": {
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "string",
          "enum": [
            "true",
            "false"
          ]
        }
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "https_clone_iam_auth"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request",
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
| `title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `title` ↔ 原始 CodeArts 代码仓库 API 中的标题字段，常见原字段名为 `name`、`subject` 或 `title`。<br>标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。 |
| `state_event` | 否 | `string` |  | 字段对应：<br>MCP 字段 `state_event` ↔ 原始 CodeArts 代码仓库 API 同名字段 `state_event`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `string \| array<string \| integer>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `reviewer_ids` | 否 | `string \| array<string \| integer>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `milestone_id` | 否 | `string \| integer` |  | 字段对应：<br>MCP 字段 `milestone_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `milestone_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>里程碑 ID。 |
| `labels` | 否 | `string \| array<string> \| object` |  | 字段对应：<br>MCP 字段 `labels` ↔ 原始 CodeArts 代码仓库 API 同名字段 `labels`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>标签列表或逗号分隔的标签字符串。 |
| `force_remove_source_branch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `force_remove_source_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `force_remove_source_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `squash` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `squash` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>是否压缩提交。 |
| `squash_commit_message` | 否 | `string` |  | 字段对应：<br>MCP 字段 `squash_commit_message` ↔ 原始 CodeArts 代码仓库 API 同名字段 `squash_commit_message`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>压缩提交信息。 |
| `work_item_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `work_item_ids` ↔ 原始 CodeArts 代码仓库 API 中的工作项 ID 集合字段，常见原字段名为 `issue_ids`、`issueIds`、`id`。<br>工作项 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "title": {
      "type": "string",
      "minLength": 1
    },
    "state_event": {
      "type": "string",
      "minLength": 1
    },
    "assignee_ids": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
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
        }
      ]
    },
    "reviewer_ids": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
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
        }
      ]
    },
    "description": {
      "type": "string"
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
        },
        {
          "type": "object",
          "additionalProperties": {}
        }
      ]
    },
    "force_remove_source_branch": {
      "type": "boolean"
    },
    "squash": {
      "type": "boolean"
    },
    "squash_commit_message": {
      "type": "string",
      "minLength": 1
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/repository_id"
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
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_approver_setting

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_approver_setting",
    "arguments": {
      "repository_id": "<repository_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "repository_id": {
      "$ref": "#/properties/id"
    },
    "setting_id": {
      "$ref": "#/properties/id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_approvers

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求approvers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_approvers",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "approver_ids": "<approver_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `approver_ids` | 是 | `string \| array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "approver_ids": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/repository_id"
          },
          "minItems": 1
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
    "merge_request_iid",
    "approver_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_discussion

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求讨论。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_discussion",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "discussion_id": "<discussion_id>",
      "note_id": "<note_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 否 | `string` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `severity` | 否 | `"suggestion" \| "minor" \| "major" \| "fatal"` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 代码仓库 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。可选值：`suggestion`、`minor`、`major`、`fatal`。 |
| `assignee_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assignee_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>负责人用户 ID，用于指定工作项、任务或评审的当前处理人。 |
| `review_categories` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `proposer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `proposer_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `proposer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>proposer ID，用于定位对应的 CodeArts 资源。 |
| `resolved` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `resolved` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resolved`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `discussion_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `discussion_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `discussion_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>讨论 ID，用于定位对应的 CodeArts 资源。 |
| `note_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `note_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `note_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>note ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "string",
      "minLength": 1
    },
    "severity": {
      "type": "string",
      "enum": [
        "suggestion",
        "minor",
        "major",
        "fatal"
      ]
    },
    "assignee_id": {
      "type": "string",
      "minLength": 1
    },
    "review_categories": {
      "type": "string",
      "minLength": 1
    },
    "review_modules": {
      "type": "string",
      "minLength": 1
    },
    "proposer_id": {
      "$ref": "#/properties/assignee_id"
    },
    "resolved": {
      "type": "boolean"
    },
    "repository_id": {
      "$ref": "#/properties/assignee_id"
    },
    "merge_request_iid": {
      "$ref": "#/properties/assignee_id"
    },
    "discussion_id": {
      "type": "string",
      "minLength": 1
    },
    "note_id": {
      "$ref": "#/properties/assignee_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "discussion_id",
    "note_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_discussion_info

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求讨论信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_discussion_info",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "discussion_id": "<discussion_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `body` | 否 | `string` |  | 字段对应：<br>MCP 字段 `body` ↔ 原始 CodeArts 代码仓库 API 同名字段 `body`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。 |
| `severity` | 否 | `"suggestion" \| "minor" \| "major" \| "fatal"` |  | 字段对应：<br>MCP 字段 `severity` ↔ 原始 CodeArts 代码仓库 API 同名字段 `severity`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。可选值：`suggestion`、`minor`、`major`、`fatal`。 |
| `assignee_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `assignee_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>负责人用户 ID，用于指定工作项、任务或评审的当前处理人。 |
| `review_categories` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `string` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `proposer_id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `proposer_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `proposer_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>proposer ID，用于定位对应的 CodeArts 资源。 |
| `resolved` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `resolved` ↔ 原始 CodeArts 代码仓库 API 同名字段 `resolved`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `discussion_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `discussion_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `discussion_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>讨论 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "body": {
      "type": "string",
      "minLength": 1
    },
    "severity": {
      "type": "string",
      "enum": [
        "suggestion",
        "minor",
        "major",
        "fatal"
      ]
    },
    "assignee_id": {
      "type": "string",
      "minLength": 1
    },
    "review_categories": {
      "type": "string",
      "minLength": 1
    },
    "review_modules": {
      "type": "string",
      "minLength": 1
    },
    "proposer_id": {
      "$ref": "#/properties/assignee_id"
    },
    "resolved": {
      "type": "boolean"
    },
    "repository_id": {
      "$ref": "#/properties/assignee_id"
    },
    "merge_request_iid": {
      "$ref": "#/properties/assignee_id"
    },
    "discussion_id": {
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
    "discussion_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_reviewers

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求reviewers。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_reviewers",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "reviewer_ids": "<reviewer_ids>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `reviewer_ids` | 是 | `string \| array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
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
    "reviewer_ids": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/repository_id"
          },
          "minItems": 1
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
    "merge_request_iid",
    "reviewer_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_setting

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求setting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_setting",
    "arguments": {
      "repository_id": "<repository_id>",
      "settings": "<settings>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `settings` | 是 | `object` |  | 字段对应：<br>MCP 字段 `settings` ↔ 原始 CodeArts 代码仓库 API 同名字段 `settings`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "settings": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "settings"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_template

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "repository_id": "<repository_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_name",
    "repository_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_merge_request_vote

所属模块：`代码仓库`

说明：更新代码仓库的合并请求请求vote。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_merge_request_vote",
    "arguments": {
      "repository_id": "<repository_id>",
      "merge_request_iid": "<merge_request_iid>",
      "score": "<score>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `merge_request_iid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_iid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_iid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。 |
| `score` | 是 | `integer` |  | 字段对应：<br>MCP 字段 `score` ↔ 原始 CodeArts 代码仓库 API 同名字段 `score`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `action` | 否 | `string` | "vote" | 字段对应：<br>MCP 字段 `action` ↔ 原始 CodeArts 代码仓库 API 同名字段 `action`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "score": {
      "type": "integer",
      "minimum": -2,
      "maximum": 2
    },
    "action": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64,
      "default": "vote"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "score"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_note_required_attributes

所属模块：`代码仓库`

说明：更新代码仓库的noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_note_required_attributes",
    "arguments": {
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
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
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_notification_subscription

所属模块：`代码仓库`

说明：更新代码仓库的notificationsubscription。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_notification_subscription",
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
| `enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `config_source` | 否 | `string` |  | 字段对应：<br>MCP 字段 `config_source` ↔ 原始 CodeArts 代码仓库 API 同名字段 `config_source`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `waring_repo_usage_rate` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `waring_repo_usage_rate` ↔ 原始 CodeArts 代码仓库 API 同名字段 `waring_repo_usage_rate`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `webhook_config` | 否 | `object` |  | 字段对应：<br>MCP 字段 `webhook_config` ↔ 原始 CodeArts 代码仓库 API 同名字段 `webhook_config`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `subscript_events` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `subscript_events` ↔ 原始 CodeArts 代码仓库 API 同名字段 `subscript_events`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "enabled": {
      "type": "boolean"
    },
    "config_source": {
      "type": "string",
      "minLength": 1
    },
    "waring_repo_usage_rate": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100
    },
    "webhook_config": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "minLength": 1
        },
        "token": {
          "type": "string",
          "minLength": 1
        },
        "mention_users": {
          "type": "string",
          "minLength": 1
        },
        "mention_phone": {
          "type": "string",
          "minLength": 1
        }
      },
      "additionalProperties": false
    },
    "subscript_events": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "resource_type": {
            "type": "string",
            "minLength": 1
          },
          "action": {
            "type": "string",
            "minLength": 1
          },
          "enabled": {
            "type": "boolean"
          },
          "role_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "minLength": 1
            }
          }
        },
        "required": [
          "resource_type",
          "action",
          "enabled"
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
    "repository_id"
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

### repo_update_project_merge_request_approver_setting

所属模块：`代码仓库`

说明：更新代码仓库的项目合并请求请求approversetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_merge_request_approver_setting",
    "arguments": {
      "project_id": "<project_id>",
      "setting_id": "<setting_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 否 | `string` |  | 字段对应：<br>MCP 字段 `id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。 |
| `target` | 否 | `string` |  | 字段对应：<br>MCP 字段 `target` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `target_type` | 否 | `"branch"` |  | 字段对应：<br>MCP 字段 `target_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `target_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`branch`。 |
| `is_use_approval` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_use_approval` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_use_approval`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_reviewers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approval_required_approvers` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `approval_required_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approval_required_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_approvals_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_approvals_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_approvals_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reset_reviewers_on_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reset_reviewers_on_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reset_reviewers_on_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approvers_from_project` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `approvers_from_project` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers_from_project`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>append评审人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `append_approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>appendapprover ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `append_approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `append_approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `append_approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `only_merge_when_pipeline_pass` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `only_merge_when_pipeline_pass` ↔ 原始 CodeArts 代码仓库 API 同名字段 `only_merge_when_pipeline_pass`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `assignee_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignee_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignee_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>处理人 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `assignees` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `assignees` ↔ 原始 CodeArts 代码仓库 API 同名字段 `assignees`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `approver_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approver_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approver_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>approver ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `approvers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `approvers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `approvers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reviewer_ids` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewer_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewer_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>评审人用户 ID 列表。 |
| `reviewers` | 否 | `array<object>` |  | 字段对应：<br>MCP 字段 `reviewers` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reviewers`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `setting_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `setting_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `setting_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>setting ID，用于定位对应的 CodeArts 资源。 |
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
    "target": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2000
    },
    "target_type": {
      "type": "string",
      "enum": [
        "branch"
      ]
    },
    "is_use_approval": {
      "type": "boolean"
    },
    "approval_required_reviewers": {
      "type": "integer",
      "minimum": 0
    },
    "approval_required_approvers": {
      "type": "integer",
      "minimum": 0
    },
    "reset_approvals_on_push": {
      "type": "boolean"
    },
    "reset_reviewers_on_push": {
      "type": "boolean"
    },
    "approvers_from_project": {
      "type": "boolean"
    },
    "append_reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_reviewers": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    },
    "append_approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "append_approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "only_merge_when_pipeline_pass": {
      "type": "boolean"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "assignees": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "approver_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "approvers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/id"
      }
    },
    "reviewers": {
      "type": "array",
      "items": {
        "$ref": "#/properties/append_reviewers/items"
      }
    },
    "project_id": {
      "$ref": "#/properties/id"
    },
    "setting_id": {
      "$ref": "#/properties/id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "setting_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_project_merge_request_template

所属模块：`代码仓库`

说明：更新代码仓库的项目合并请求请求模板。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_merge_request_template",
    "arguments": {
      "template_name": "<template_name>",
      "project_id": "<project_id>",
      "template_id": "<template_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `template_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板名称。 |
| `merge_request_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `merge_request_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `merge_request_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `auto_extract_mr_title` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `auto_extract_mr_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `auto_extract_mr_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_wip` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_wip` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_wip`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_default` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_default` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_default`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `template_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `template_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>模板 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "merge_request_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "description": {
      "type": "string"
    },
    "auto_extract_mr_title": {
      "type": "integer",
      "minimum": 0,
      "maximum": 2
    },
    "is_wip": {
      "type": "boolean"
    },
    "is_default": {
      "type": "boolean"
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_name",
    "project_id",
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_project_note_required_attributes

所属模块：`代码仓库`

说明：更新代码仓库的项目noterequiredattributes。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_note_required_attributes",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
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
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_project_review_settings

所属模块：`代码仓库`

说明：更新代码仓库的项目评审settings。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_review_settings",
    "arguments": {
      "project_id": "<project_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `categories_and_modules_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `categories_and_modules_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `categories_and_modules_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_modules` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_modules` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_modules`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `secondary_category_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `secondary_category_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `secondary_category_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_default_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_default_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_default_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `review_customized_categories` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `review_customized_categories` ↔ 原始 CodeArts 代码仓库 API 同名字段 `review_customized_categories`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_assignee_id_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_assignee_id_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_assignee_id_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_categories_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_categories_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_categories_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `is_review_modules_required` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `is_review_modules_required` ↔ 原始 CodeArts 代码仓库 API 同名字段 `is_review_modules_required`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "categories_and_modules_enabled": {
      "type": "boolean"
    },
    "review_modules": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "secondary_category_enabled": {
      "type": "boolean"
    },
    "review_default_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "review_customized_categories": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256
      }
    },
    "is_assignee_id_required": {
      "type": "boolean"
    },
    "is_review_categories_required": {
      "type": "boolean"
    },
    "is_review_modules_required": {
      "type": "boolean"
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

### repo_update_project_webhook

所属模块：`代码仓库`

说明：更新代码仓库的项目webhook。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_project_webhook",
    "arguments": {
      "project_id": "<project_id>",
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
| `project_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_id` ↔ 原始 CodeArts 代码仓库 API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。<br>CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。 |
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
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "hook_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "hook_id"
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
      "x_auth_token": "<x_auth_token>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
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
    "x_auth_token",
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_commit_rule

所属模块：`代码仓库`

说明：更新代码仓库的仓库提交规则。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_commit_rule",
    "arguments": {
      "repository_id": "<repository_id>",
      "commit_rule_id": "<commit_rule_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `branch_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>Git 分支名称，例如 master、main、develop 或 feature/login。 |
| `commit_message_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `commit_message_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `commit_message_negative_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `commit_message_negative_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_message_negative_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `author_email_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `author_email_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `author_email_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `prohibited_file_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `prohibited_file_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `prohibited_file_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `max_file_size` | 否 | `integer` |  | 字段对应：<br>MCP 字段 `max_file_size` ↔ 原始 CodeArts 代码仓库 API 同名字段 `max_file_size`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `binary_gate_enabled` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `binary_gate_enabled` ↔ 原始 CodeArts 代码仓库 API 同名字段 `binary_gate_enabled`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `allowed_modify_binary` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `allowed_modify_binary` ↔ 原始 CodeArts 代码仓库 API 同名字段 `allowed_modify_binary`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `allowed_binary_file_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `allowed_binary_file_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `allowed_binary_file_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `privileged_user_ids` | 否 | `array<integer>` |  | 字段对应：<br>MCP 字段 `privileged_user_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `privileged_user_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>privileged用户 ID 列表，用于批量定位对应的 CodeArts 资源。 |
| `effective_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `effective_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `effective_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `skip_rule_check` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `skip_rule_check` ↔ 原始 CodeArts 代码仓库 API 同名字段 `skip_rule_check`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `skip_rule_end_date` | 否 | `string` |  | 字段对应：<br>MCP 字段 `skip_rule_end_date` ↔ 原始 CodeArts 代码仓库 API 同名字段 `skip_rule_end_date`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `commit_rule_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `commit_rule_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `commit_rule_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>提交规则 ID，用于定位对应的 CodeArts 资源。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "branch_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "commit_message_regex": {
      "type": "string"
    },
    "commit_message_negative_regex": {
      "type": "string"
    },
    "author_regex": {
      "type": "string"
    },
    "author_email_regex": {
      "type": "string"
    },
    "prohibited_file_name_regex": {
      "type": "string"
    },
    "max_file_size": {
      "type": "integer",
      "minimum": 1,
      "maximum": 300
    },
    "binary_gate_enabled": {
      "type": "boolean"
    },
    "allowed_modify_binary": {
      "type": "boolean"
    },
    "allowed_binary_file_name_regex": {
      "type": "string"
    },
    "privileged_user_ids": {
      "type": "array",
      "items": {
        "type": "integer",
        "exclusiveMinimum": 0
      }
    },
    "effective_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "skip_rule_check": {
      "type": "boolean"
    },
    "skip_rule_end_date": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "commit_rule_id": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "commit_rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_general_commit_rule

所属模块：`代码仓库`

说明：更新代码仓库的仓库general提交规则。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_general_commit_rule",
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
| `reject_unsigned_commits` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reject_unsigned_commits` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reject_unsigned_commits`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `reject_not_signed_by_gpg` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `reject_not_signed_by_gpg` ↔ 原始 CodeArts 代码仓库 API 同名字段 `reject_not_signed_by_gpg`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `deny_delete_tag` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `deny_delete_tag` ↔ 原始 CodeArts 代码仓库 API 同名字段 `deny_delete_tag`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `prevent_secrets` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `prevent_secrets` ↔ 原始 CodeArts 代码仓库 API 同名字段 `prevent_secrets`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `deny_force_push` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `deny_force_push` ↔ 原始 CodeArts 代码仓库 API 同名字段 `deny_force_push`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "reject_unsigned_commits": {
      "type": "boolean"
    },
    "reject_not_signed_by_gpg": {
      "type": "boolean"
    },
    "deny_delete_tag": {
      "type": "boolean"
    },
    "prevent_secrets": {
      "type": "boolean"
    },
    "deny_force_push": {
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

### repo_update_repository_general_policy

所属模块：`代码仓库`

说明：更新代码仓库的仓库generalpolicy。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_general_policy",
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
| `disable_fork` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `disable_fork` ↔ 原始 CodeArts 代码仓库 API 同名字段 `disable_fork`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `branch_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `branch_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `branch_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `tag_name_regex` | 否 | `string` |  | 字段对应：<br>MCP 字段 `tag_name_regex` ↔ 原始 CodeArts 代码仓库 API 同名字段 `tag_name_regex`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `generate_pre_merge_ref` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `generate_pre_merge_ref` ↔ 原始 CodeArts 代码仓库 API 同名字段 `generate_pre_merge_ref`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `forbidden_developer_create_branch` | 否 | `boolean` |  | 字段对应：<br>MCP 字段 `forbidden_developer_create_branch` ↔ 原始 CodeArts 代码仓库 API 同名字段 `forbidden_developer_create_branch`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `create_branch_whitelist_user_ids` | 否 | `string` |  | 字段对应：<br>MCP 字段 `create_branch_whitelist_user_ids` ↔ 原始 CodeArts 代码仓库 API 同名字段 `create_branch_whitelist_user_ids`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>create分支whitelist用户 ID 列表，用于批量定位对应的 CodeArts 资源。 |
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
    "forbidden_developer_create_branch": {
      "type": "boolean"
    },
    "create_branch_whitelist_user_ids": {
      "type": "string"
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

### repo_update_repository_inherit_setting

所属模块：`代码仓库`

说明：更新代码仓库的仓库inheritsetting。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_inherit_setting",
    "arguments": {
      "repository_id": "<repository_id>",
      "data": "<data>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
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
    "repository_id",
    "data"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_label

所属模块：`代码仓库`

说明：更新代码仓库的仓库标签。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_label",
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
| `name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。 |
| `new_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `new_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `new_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>new名称。 |
| `color` | 否 | `string` |  | 字段对应：<br>MCP 字段 `color` ↔ 原始 CodeArts 代码仓库 API 同名字段 `color`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。 |
| `description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。 |
| `expires_at` | 否 | `string` |  | 字段对应：<br>MCP 字段 `expires_at` ↔ 原始 CodeArts 代码仓库 API 同名字段 `expires_at`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "new_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "color": {
      "type": "string",
      "pattern": "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
    },
    "description": {
      "type": "string",
      "maxLength": 1000
    },
    "expires_at": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "dry_run": {
      "type": "boolean",
      "default": true
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

### repo_update_repository_member

所属模块：`代码仓库`

说明：更新代码仓库的仓库成员。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_member",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "member_id": "<member_id>",
      "role": "<role>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `member_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `member_id` ↔ 原始 CodeArts 代码仓库 API 同名字段 `member_id`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>成员 ID，用于定位对应的 CodeArts 资源。 |
| `role` | 是 | `20 \| 30 \| 40` |  | 字段对应：<br>MCP 字段 `role` ↔ 原始 CodeArts 代码仓库 API 同名字段 `role`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`20`、`30`、`40`。 |
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
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "member_id": {
      "$ref": "#/properties/repository_uuid"
    },
    "role": {
      "type": "number",
      "enum": [
        20,
        30,
        40
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid",
    "member_id",
    "role"
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

### repo_update_repository_pipeline

所属模块：`代码仓库`

说明：更新代码仓库的仓库流水线。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_pipeline",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
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
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_remote_mirror

所属模块：`代码仓库`

说明：更新代码仓库的仓库remotemirror。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_remote_mirror",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_id": "<repository_id>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
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
    "x_auth_token",
    "repository_id"
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

### repo_update_repository_template_status

所属模块：`代码仓库`

说明：更新代码仓库的仓库模板状态。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_template_status",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "template_type": "<template_type>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `template_type` | 是 | `"SHARE" \| "PUBLIC"` |  | 字段对应：<br>MCP 字段 `template_type` ↔ 原始 CodeArts 代码仓库 API 同名字段 `template_type`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。可选值：`SHARE`、`PUBLIC`。 |
| `code_title` | 否 | `string` |  | 字段对应：<br>MCP 字段 `code_title` ↔ 原始 CodeArts 代码仓库 API 同名字段 `code_title`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `creator_name` | 否 | `string` |  | 字段对应：<br>MCP 字段 `creator_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `creator_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>creator名称。 |
| `code_description` | 否 | `string` |  | 字段对应：<br>MCP 字段 `code_description` ↔ 原始 CodeArts 代码仓库 API 同名字段 `code_description`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `languages` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `languages` ↔ 原始 CodeArts 代码仓库 API 同名字段 `languages`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `plateform` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `plateform` ↔ 原始 CodeArts 代码仓库 API 同名字段 `plateform`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `entertype` | 否 | `array<string>` |  | 字段对应：<br>MCP 字段 `entertype` ↔ 原始 CodeArts 代码仓库 API 同名字段 `entertype`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "template_type": {
      "type": "string",
      "enum": [
        "SHARE",
        "PUBLIC"
      ]
    },
    "code_title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "creator_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "code_description": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4000
    },
    "languages": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128
      }
    },
    "plateform": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128
      }
    },
    "entertype": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1,
        "maxLength": 128
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid",
    "template_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_repository_watermark

所属模块：`代码仓库`

说明：更新代码仓库的仓库watermark。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_repository_watermark",
    "arguments": {
      "repository_id": "<repository_id>",
      "watermark": "<watermark>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
| `watermark` | 是 | `boolean` |  | 字段对应：<br>MCP 字段 `watermark` ↔ 原始 CodeArts 代码仓库 API 同名字段 `watermark`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "watermark": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "watermark"
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

### repo_update_trusted_ip_address

所属模块：`代码仓库`

说明：更新代码仓库的trustedipaddress。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_trusted_ip_address",
    "arguments": {
      "repository_id": "<repository_id>",
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
| `repository_id` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_id` ↔ 原始 CodeArts 代码仓库 API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。<br>CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。 |
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
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ip_id": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "ip_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_update_user_emails

所属模块：`代码仓库`

说明：更新代码仓库的用户emails。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_update_user_emails",
    "arguments": {
      "email": "<email>",
      "verify_code": "<verify_code>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `email` | 是 | `string` |  | 字段对应：<br>MCP 字段 `email` ↔ 原始 CodeArts 代码仓库 API 同名字段 `email`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `verify_code` | 是 | `string` |  | 字段对应：<br>MCP 字段 `verify_code` ↔ 原始 CodeArts 代码仓库 API 同名字段 `verify_code`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "verify_code": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "email",
    "verify_code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_validate_https_info

所属模块：`代码仓库`

说明：校验代码仓库的https信息。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_validate_https_info",
    "arguments": {
      "iam_user_uuid": "<iam_user_uuid>",
      "pwd": "<pwd>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `iam_user_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `iam_user_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `iam_user_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `pwd` | 是 | `string` |  | 字段对应：<br>MCP 字段 `pwd` ↔ 原始 CodeArts 代码仓库 API 同名字段 `pwd`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `dry_run` | 否 | `boolean` | true | 字段对应：<br>MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。<br>为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "iam_user_uuid": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "pwd": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "iam_user_uuid",
    "pwd"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_validate_project_repository_name

所属模块：`代码仓库`

说明：校验代码仓库的项目仓库name。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_validate_project_repository_name",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "project_uuid": "<project_uuid>",
      "repository_name": "<repository_name>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `project_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `project_uuid` ↔ 原始 CodeArts 代码仓库 API 中表示项目 UUID 的字段，常见原字段名为 `project_uuid`、`projectUuid` 或 `projectUUId`，以对应接口实际定义为准。<br>CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。 |
| `repository_name` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_name` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_name`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>仓库名称。 |

输入 JSON Schema：

```json
{
  "type": "object",
  "properties": {
    "x_auth_token": {
      "type": "string",
      "minLength": 1
    },
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "repository_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    }
  },
  "required": [
    "x_auth_token",
    "project_uuid",
    "repository_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_verify_user_ssh_private_key

所属模块：`代码仓库`

说明：执行代码仓库的用户sshprivatekey。

调用示例：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_verify_user_ssh_private_key",
    "arguments": {
      "x_auth_token": "<x_auth_token>",
      "repository_uuid": "<repository_uuid>",
      "private_key": "<private_key>"
    }
  }
}
```

参数：

| 参数 | 必填 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `x_auth_token` | 是 | `string` |  | 字段对应：<br>MCP 字段 `x_auth_token` ↔ 原始 CodeArts 代码仓库 API 同名字段 `x_auth_token`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
| `repository_uuid` | 是 | `string` |  | 字段对应：<br>MCP 字段 `repository_uuid` ↔ 原始 CodeArts 代码仓库 API 同名字段 `repository_uuid`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。 |
| `private_key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `private_key` ↔ 原始 CodeArts 代码仓库 API 同名字段 `private_key`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。 |
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
    "repository_uuid": {
      "type": "string",
      "minLength": 1
    },
    "private_key": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4096
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "x_auth_token",
    "repository_uuid",
    "private_key"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

