# 故障排查

这页只做一件事：帮你快速判断问题到底出在鉴权、区域、产品开通、数据不足，还是官方路由没发布。

## 先记住一个排障原则

不要把“某个工具失败”直接等同于“整套 MCP 服务坏了”。

当前项目里的问题大致分成四类：

- 接入层问题
  - 例如共享 `http` 模式没有先完成 `auth_configure_session`
- 区域/路由问题
  - 例如北京四未发布
- 真实租户样本问题
  - 例如目标项目没有数据、没有计划、没有部署记录
- 入口网络层问题
  - 例如外部偶发高延迟或 `502`，但请求甚至没进入 Node 服务日志

## 常见错误码

| 错误码 | 含义 | 先检查什么 |
| --- | --- | --- |
| `CLOUDTEST.00012003` | TestPlan 没有在目标项目启用 | 项目服务开通状态、`cloudtest-ext` 地址 |
| `APIGW.0101` | 当前区域该路由未发布 | 产品地址、北京四路由发布情况 |
| `DEVPIPE.00011136` | 这个 `project_id` 不是该流水线真正所属项目 | 先跑 `pipeline_list_pipelines`，用返回结果里的 owner `project_id` |
| `auth_error` | 当前 session 没有可用的华为云身份 | 共享 `http` 模式下先确认是否已调用 `auth_configure_session` |
| `Deploy.00011042` | Deploy 某条老链路或样本路径不健康 | 先回到经典链路，确认是不是样本或模板 runtime 问题 |

## 如果一个模块能用，另一个模块不能用

先不要把问题归到整套 MCP 服务本身。更常见的是：

- 某个产品地址不对
- 某个产品没有开通
- 你传的 id 类型错了
- 当前租户没有足够业务数据

## 共享 `http` 模式先检查什么

如果你连的是共享 HTTP MCP 服务，排障顺序建议固定为：

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

如果前四步都正常，通常说明：

- session 建立正常
- auth token / cookie 复用正常
- 基础 region 默认地址正常
- 签名链路正常

如果这里就失败，先不要去怀疑具体产品模块。

## 几类最容易传错的 id

- 大多数模块：
  - `project_id` 是 CodeArts 项目 UUID
- `artifact_*`
  - 除了 `project_id`，通常还需要 `tenant_id`
- `pipeline_*`
  - `pipeline_list_pipelines` 返回的记录里，真正后续要用的 `project_id` 可能和最初查询的项目不同
- `deploy_*`
  - `application_id`、`task_id`、`record_id`、`step_id` 各自含义不同，最好沿着上一个工具返回值继续传

## 最小排障顺序

1. 先跑 `req_list_projects`
2. 再跑 `repo_list_repositories`
3. 再跑 `pipeline_list_pipelines`
4. 然后跑目标模块的第一个读接口
5. 最后根据 provider 错误码判断，不要先猜

## 如果你看到慢调用或偶发 `502`

截至 `2026-04-20` 的最新联调结论里，要把两种“慢”分开看：

- 服务内部慢
  - 看 `codearts-mcp.service` 日志里的 `durationMs`
- 外部链路慢
  - 客户端外部计时很高，但 Node 日志里没有对应慢请求，甚至没有对应记录

当前已确认的一点是：

- 服务内部很多缓存命中请求已经可以做到毫秒级
- 外部偶发 `502` 不一定来自 MCP 应用本身

所以如果你看到：

- 客户端报 `502`
- 但 `journalctl -u codearts-mcp.service` 里没有对应请求

优先怀疑入口网络层，不要继续在产品 handler 里空转。

## 当前北京四下最常见的真实限制

### TestPlan

- `get_plan`
- `list_runs`
- `get_case`
- `run_cases`

这几条目前仍可能直接返回：

- `APIGW.0101`

### Artifact

下面这些路由当前在北京四仍未发布：

- `artifact_delete_file`
- `artifact_list_build_archives`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_search_artifacts`
- `artifact_show_audit`

### Deploy

`Deploy` 当前大部分主干路径已经能用，但还要注意：

- 某些 `v4` record 详情路径当前租户没有正样本
- `dry_run` 已经尽量做了安全 fallback
- 剩余实际阻塞更多来自模板/runtime 本身，而不是 MCP 没实现

## 当前最实用的日志观察点

共享 `http` 模式下，服务日志现在会带这些字段：

- `sessionId`
- `mcpMethod`
- `toolName`
- `durationMs`

最常用的看法是：

- 看服务状态
  - `systemctl is-active codearts-mcp.service`
- 看最近请求
  - `journalctl -u codearts-mcp.service -n 80 --no-pager`
- 看是不是应用层真的处理慢
  - 对照某个 `toolName` 的 `durationMs`

## 什么时候该先看哪份文档

- 共享部署接入问题：
  - `docs/wiki/Team-Deployment.md`
- 不确定服务怎么工作的：
  - `docs/wiki/Architecture-Deep-Dive.md`
- 想看当前 live 与性能结论：
  - `docs/wiki/Testing-and-Live-Ops.md`
- 想看模块是否真可用：
  - `docs/wiki/Capability-Matrix.md`

## 相关文档

- `docs/faq.md`
- `docs/quickstart.md`
- `docs/client-examples.md`
- `docs/wiki/Architecture-Deep-Dive.md`
- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Deploy-Live-Validated.md`
