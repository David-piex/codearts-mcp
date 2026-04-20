# 常见问题

## 1. 明明已经填了 `AK/SK`，为什么还是鉴权失败

先检查这几项：

- `region` 是否真的是 `cn-north-4`
- 标准区域下是否误填了错误的 `*_base_url`
- 如果你走的是共享 `http + session` 模式，是否真的先调用了 `auth_configure_session`

## 2. 为什么 `Req` 能用，别的模块不行

这通常不代表整个 MCP 服务坏了，更常见的原因是：

- 某个具体产品地址不对
- 该产品在目标项目上没有开通
- 当前账号对该产品权限不足
- 当前租户没有足够业务数据

建议按模块逐个验证，不要因为一个模块失败就把问题归到整套服务上。

## 3. 为什么共享部署还要每个人自己配 `auth_configure_session`

因为共享的是 MCP 服务，不是共享一套业务凭证。

这个项目的设计是：

- 服务端可统一部署
- 每个用户的业务凭证隔离在自己的 MCP session 中

这样更适合团队共用，也更安全。

## 4. 共享模式下，每个人都要配所有产品地址吗

一般不需要。

如果你是标准区域，通常每个人只需要：

- 自己的 `AK`
- 自己的 `SK`
- 自己的 `region`

服务端会自动推导各产品的标准地址。

## 5. 为什么建议写操作优先跑 `dry_run`

因为这样可以先确认：

- 参数是否合理
- 目标对象是否正确
- 当前租户/区域是否支持该路径

在 `Deploy` 这类写路径较多的模块里，`dry_run` 尤其重要。

## 6. 为什么有些模块还是 `Partial`

最常见的原因有三个：

- 代码已经实现，但当前租户没有对应业务数据
- 官方接口在北京四没有发布
- 写路径已实现，但还缺真实、安全的正样本闭环

也就是说，`Partial` 往往不是“没 MCP 化”，而是“真实环境还有客观限制”。

## 7. 为什么之前会感觉文档比较乱

这个仓库经历过一轮较大的扩张和回收，文档里一度混杂了不同阶段的快照、验证结论和模块范围。

现在建议以这几类文档为准：

- 入口总览：`README.md`、`docs/wiki/Home.md`
- 团队共享部署：`docs/wiki/Team-Deployment.md`
- 使用接入：`docs/quickstart.md`、`docs/client-examples.md`
- 当前状态：`docs/wiki/Current-Implementation-Status-2026-04-17.md`
- 细粒度验证：`docs/wiki/*-Live-Validated.md`

## 8. Shared HTTP Auth Persistence

共享 HTTP 模式下，用户第一次调用 `auth_configure_session` 后，服务器会把该用户的 CodeArts 凭证加密保存，并签发稳定的 auth cookie/token。

这意味着：

- 如果客户端会保留 cookie，后续正常重连时，不需要再次填写 `AK/SK`
- 如果客户端不保留 cookie，也可以把返回的 `auth_token` 固定写到 MCP URL 里继续复用
- 只要服务器端的 `MCP_AUTH_MASTER_KEY` 和 `MCP_AUTH_DATA_PATH` 保持不变，服务重启后也能恢复
- 如果想撤销当前用户已保存的凭证，调用 `auth_clear_session`

推荐的跨对话写法是：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "type": "http",
      "url": "http://your-server-ip/mcp?auth_token=替换成第一次配置后返回的auth_token"
    }
  }
}
```

## 9. 为什么不能直接在 MCP 客户端配置里写 `AK/SK`

本项目推荐不要把 `AK/SK` 直接写进共享 HTTP 客户端配置，原因有两个：

- 客户端配置文件通常更容易被复制、同步或误提交
- 共享 HTTP 模式已经提供了更合适的入口: `auth_configure_session`

推荐方式是：

1. 客户端配置里只写共享服务地址
2. 连上后调用 `auth_configure_session`
3. 让服务端加密持久化保存当前用户凭证

这样对团队共享部署更安全，也更符合这个项目当前的鉴权模型。

## 10. 日志里反复出现 `Connected` / `Disconnected` 是不是服务有问题

不一定。

更准确的判断标准是：

- 如果客户端已经成功列出了工具，说明服务是可达的
- 如果后续工具也还能正常调用，通常只是 MCP HTTP transport 在重连
- 只有在业务工具返回 `auth_error`，或者提示没有已配置凭证时，才需要检查当前用户是否完成了 `auth_configure_session`
