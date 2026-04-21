# 故障排查

这页只做一件事：帮你快速判断问题到底出在接入、鉴权、项目归属、真实样本、区域发布，还是入口网络层。

## 先记住一个原则

不要把“某个工具失败”直接等同于“整套 MCP 服务坏了”。

当前项目里最常见的问题大致分成五类：

- 接入层问题
  - 例如共享 `http` 模式没有先完成 `auth_configure_session`
- 项目归属或 id 使用问题
  - 例如 `pipeline_*` 使用了错误的 owner `project_id`
- 权限/服务开通问题
  - 例如成员权限不足，或目标项目未开通对应服务
- 样本或区域问题
  - 例如当前项目没有数据，或北京四该路由未发布
- 入口网络层问题
  - 例如客户端外部看到慢调用或 `502`，但请求根本没进入 Node 服务日志

## 推荐的固定排障顺序

共享 `http` 模式下，先固定排这条链路：

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

如果这条链路本身不通，先不要去怀疑具体业务产品。

## 常见错误码

| 错误码 | 含义 | 先检查什么 |
| --- | --- | --- |
| `auth_error` | 当前 session 没有可用的华为云身份 | 是否已调用 `auth_configure_session`；cookie / `auth_token` 是否失效 |
| `DEVPIPE.00011136` | 当前 `project_id` 不是该流水线真实归属项目 | 先跑 `pipeline_list_pipelines`，使用返回记录里的 owner `project_id` |
| `CLOUDTEST.00012003` | TestPlan 没有在目标项目启用 | 项目服务开通状态、`cloudtest-ext` 地址 |
| `APIGW.0101` | 当前区域该路由未发布 | 产品地址、北京四路由发布情况 |
| `Deploy.00011042` | Deploy 某条老链路或样本路径不健康 | 先回到经典链路，确认是否是样本或模板 runtime 问题 |

## 如果一个模块能用，另一个模块不能用

先不要把问题归到整套 MCP 服务。

更常见的是：

- 某个产品没有开通
- 某个产品地址被错误覆盖
- 你传的 id 类型错了
- 当前租户没有足够业务数据
- 该路由在北京四还未发布

现在共享层还会补两类提示：

- 权限/服务类失败时，会尽量追加产品级排查建议
- 高频项目级列表返回 `0` 时，会提示先确认 `project_id`、服务配置与当前账号可见性

## 最容易传错的 id

- 大多数模块：
  - `project_id` 是 CodeArts 项目 UUID
- `pipeline_*`
  - 后续操作使用的 `project_id`，不一定等于你最初查询时的那个项目；以 `pipeline_list_pipelines` 返回的 owner `project_id` 为准
- `artifact_*`
  - 除了 `project_id`，通常还需要 `tenant_id`
- `deploy_*`
  - `application_id`、`task_id`、`record_id`、`step_id` 各自含义不同，最好沿着上一个工具的返回值继续传

## 如何判断是“空结果”还是“真正错误”

如果工具调用成功，但列表返回 `0` 条，不要立刻判定服务异常。先确认：

- 当前 `project_id` 是否正确
- 该项目是否真的开通并使用了对应服务
- 当前账号是否对这个项目和对应产品可见

如果调用失败，并且返回文本里已经附带权限/服务开通提示，优先按提示排查，而不是直接改代码。

## 如果你看到慢调用或偶发 `502`

截至 `2026-04-20` 的部署联调结论，必须把两种“慢”分开看：

- 服务内部慢
  - 看 `durationMs`、`upstreamDurationMs`、`cacheHits`
- 入口链路慢
  - 客户端外部计时很高，但 Node 日志里没有对应慢请求，甚至没有对应请求记录

当前已经确认：

- 服务内很多缓存命中请求已经是毫秒级
- 外部偶发 `502` 不一定来自 MCP 应用本身

所以如果你看到：

- 客户端报 `502`
- 但 `journalctl -u codearts-mcp.service` 里没有对应请求

优先怀疑入口代理、网络层或客户端到服务器之间的链路。

## 当前北京四最常见的真实边界

### TestPlan

以下路由目前仍可能直接返回未发布：

- `testplan_get_plan`
- `testplan_list_runs`
- `testplan_get_case`
- `testplan_run_cases`

### Artifact

以下路由当前在北京四仍未发布：

- `artifact_delete_file`
- `artifact_list_build_archives`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_search_artifacts`
- `artifact_show_audit`

### Deploy

Deploy 当前主干能力大多已可用，但仍要注意：

- 某些 `v4` record 详情路径仍缺稳定正样本
- 现实阻塞更多来自模板 runtime，而不是 MCP 没实现
- 当前更建议优先走经典链路，再看 `v4`

## 当前最实用的日志观察点

共享 `http` 模式下，服务日志建议重点关注：

- `sessionId`
- `mcpMethod`
- `toolName`
- `durationMs`
- `cacheHits`
- `upstreamRequestCount`
- `upstreamDurationMs`
- `upstreamStatusCodes`

如果要做入口层采样，可以直接运行：

```bash
npm run probe:edge -- --url http://123.249.85.184/mcp --access-key "$HUAWEICLOUD_AK" --secret-key "$HUAWEICLOUD_SK" --region cn-north-4 --iterations 5 --timeout-ms 30000 --output summary
```

## 推荐继续看的页面

- `docs/wiki/Team-Deployment.md`
- `docs/wiki/Testing-and-Live-Ops.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- `docs/wiki/Deploy-Live-Validated.md`
