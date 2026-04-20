# 客户端接入示例

这份文档只回答三个问题：

- 本地个人怎么配
- 共享 HTTP 服务怎么配
- 第一次连上后应该先做什么

## 1. 本地 `stdio` 模式

适合个人在本机直接使用。

```json
{
  "mcpServers": {
    "codearts-mcp": {
      "command": "node",
      "args": ["dist/src/server/index.js"],
      "env": {
        "HUAWEICLOUD_AK": "your-ak",
        "HUAWEICLOUD_SK": "your-sk",
        "HUAWEICLOUD_REGION": "cn-north-4",
        "MCP_SERVER_NAME": "codearts-mcp",
        "MCP_SERVER_VERSION": "0.1.0"
      }
    }
  }
}
```

标准区域下，通常这样就够了。服务端会根据 `region` 自动解析标准 CodeArts 产品地址。

## 2. 共享 HTTP 模式: 适合 Cursor / Codex Desktop 一类客户端

这类客户端通常直接写 `type + url`：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "https://your-host.example.com/mcp"
    }
  }
}
```

如果你当前就是用服务器 IP，也只需要把 `url` 换成自己的地址，例如：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://your-server-ip/mcp"
    }
  }
}
```

## 3. 共享 HTTP 模式: 通用 MCP 客户端写法

有些客户端要求把 HTTP transport 包在 `transport` 里：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "transport": {
        "type": "http",
        "url": "https://your-host.example.com/mcp"
      }
    }
  }
}
```

如果你的客户端文档要求这种结构，就用这一种。

## 4. 第一次连上共享服务后要做什么

共享 HTTP 模式下，客户端配置里不要直接写 `AK/SK`。正确做法是连上之后先调用：

- `auth_configure_session`

标准北京四下，绝大多数用户只需要传：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

只有在你确认自己租户用了非标准路由时，才额外补这些可选字段：

- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `check_base_url`
- `testplan_base_url`
- `deploy_base_url`
- `build_base_url`
- `artifact_base_url`

## 5. 共享 HTTP 鉴权现在是什么行为

共享 HTTP 模式现在支持服务端持久化鉴权：

- 用户第一次调用 `auth_configure_session` 后，服务端会加密保存当前用户的凭证
- 如果客户端会保留 cookie，正常重连时不需要再次填写 `AK/SK`
- 如果客户端切换对话后不保留 cookie，改用固定 `auth_token` 也不需要再次填写 `AK/SK`
- 如果服务端的 `MCP_AUTH_MASTER_KEY` 和 `MCP_AUTH_DATA_PATH` 不变，服务重启后仍可恢复
- 如果要主动清掉当前用户保存的凭证，调用 `auth_clear_session`

如果你要换账号，也建议走这个顺序：

1. 调用 `auth_clear_session`
2. 再调用新的 `auth_configure_session`

## 6. 想做到“切换对话也不用重新配 AK/SK”，怎么用

第一步，先用普通 URL 连上共享服务：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://123.249.85.184/mcp"
    }
  }
}
```

第二步，调用一次 `auth_configure_session`。

成功后，返回结果里会带：

- `auth_token`

第三步，把客户端配置里的 URL 改成带 token 的固定地址：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://123.249.85.184/mcp?auth_token=替换成你第一次拿到的auth_token"
    }
  }
}
```

这样做的效果是：

- 即使客户端不保留 cookie
- 即使切换到新对话
- 只要这个 `auth_token` 还没过期、没被清除，就还能恢复到你自己的已保存凭证

需要重新配置 `AK/SK` 的典型情况只有：

- 你主动调用了 `auth_clear_session`
- 服务端更换了 `MCP_AUTH_MASTER_KEY`
- 服务端删除了 `MCP_AUTH_DATA_PATH` 对应的持久化数据
- 这个 `auth_token` 已过期

## 7. `auth_token` 要怎么保管

- 它不是明文 `AK/SK`，但它等价于“恢复你当前已保存身份”的访问令牌
- 不建议发到群里、截图外传或提交到仓库
- 如果怀疑泄露，直接调用 `auth_clear_session`，再重新执行一次 `auth_configure_session`

## 8. 推荐首轮测试

接入后建议先跑这四个低风险读接口：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

如果这些都正常，再继续试具体业务模块。

## 9. 看到 `onClose` / `Disconnected` 日志时怎么判断

如果客户端日志里出现这类信息，不要第一时间判断成服务坏了。

更准确的判断标准是：

- 如果 `listTools` 能成功列出工具，说明 HTTP 服务本身是通的
- 如果后续业务工具还能正常调用，说明只是客户端 transport 在重连
- 只有当工具调用返回 `auth_error`，或者提示没有已配置的华为云凭证时，才需要重新检查 `auth_configure_session`

## 10. 兼容性提醒

如果某个客户端不支持 MCP over HTTP，只支持本地 `command` 拉起，那就不能直接连共享服务器。此时有两个选择：

- 换支持 HTTP MCP 的客户端
- 改回本地 `stdio` 模式

## 11. 团队部署补充说明

如果你要把它部署到服务器给多人共用，继续看：

- `docs/wiki/Team-Deployment.md`
