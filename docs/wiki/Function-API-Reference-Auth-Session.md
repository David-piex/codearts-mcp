# CodeArts MCP 函数 API 参考 - 鉴权会话

本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。

[返回函数 API 总目录](./Function-API-Reference.md)

模块：`鉴权会话`

API 数量：`2`

所有函数 API 默认使用统一 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数；当前模块工具直接在统一入口调用。旧的 `/mcp/<family>` 产品入口仍作为兼容路径保留。

## API 清单

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
| `access_key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `access_key` 仅用于配置本地 MCP 会话鉴权，原始业务 API 无对应字段。<br>华为云访问密钥 ID，用于当前 MCP 会话鉴权。 |
| `secret_key` | 是 | `string` |  | 字段对应：<br>MCP 字段 `secret_key` 仅用于配置本地 MCP 会话签名密钥，原始业务 API 无对应字段。<br>华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。 |
| `region` | 是 | `string` |  | 字段对应：<br>MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。<br>华为云区域标识，例如 cn-north-4。 |
| `req_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `req_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `req_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>reqbase URL，用于指定服务地址、资源地址或回调地址。 |
| `repo_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `repo_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `repo_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>repobase URL，用于指定服务地址、资源地址或回调地址。 |
| `pipeline_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `pipeline_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `pipeline_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>流水线base URL，用于指定服务地址、资源地址或回调地址。 |
| `check_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `check_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `check_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>检查base URL，用于指定服务地址、资源地址或回调地址。 |
| `testplan_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `testplan_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `testplan_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>testplanbase URL，用于指定服务地址、资源地址或回调地址。 |
| `deploy_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `deploy_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `deploy_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>部署base URL，用于指定服务地址、资源地址或回调地址。 |
| `build_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `build_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `build_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>构建base URL，用于指定服务地址、资源地址或回调地址。 |
| `artifact_base_url` | 否 | `string` |  | 字段对应：<br>MCP 字段 `artifact_base_url` ↔ 原始 CodeArts 鉴权会话 API 同名字段 `artifact_base_url`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。<br>制品base URL，用于指定服务地址、资源地址或回调地址。 |

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

