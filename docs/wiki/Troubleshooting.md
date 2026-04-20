# 故障排查

这页只做一件事：帮你快速判断问题到底出在鉴权、区域、产品开通、数据不足，还是官方路由没发布。

## 常见错误码

| 错误码 | 含义 | 先检查什么 |
| --- | --- | --- |
| `CLOUDTEST.00012003` | TestPlan 没有在目标项目启用 | 项目服务开通状态、`cloudtest-ext` 地址 |
| `APIGW.0101` | 当前区域该路由未发布 | 产品地址、北京四路由发布情况 |
| `DEVPIPE.00011136` | 这个 `project_id` 不是该流水线真正所属项目 | 先跑 `pipeline_list_pipelines`，用返回结果里的 owner `project_id` |

## 如果一个模块能用，另一个模块不能用

先不要把问题归到整套 MCP 服务本身。更常见的是：

- 某个产品地址不对
- 某个产品没有开通
- 你传的 id 类型错了
- 当前租户没有足够业务数据

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

## 相关文档

- `docs/faq.md`
- `docs/quickstart.md`
- `docs/client-examples.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Deploy-Live-Validated.md`
