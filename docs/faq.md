# FAQ 与故障排查

这份文档收集的是 `codearts-mcp` 最常见的问题。

如果你已经完成接入，但使用过程中遇到报错，建议优先从这里开始排查。

## 1. 为什么已经配置了 `AK/SK`，还是报认证错误

最常见原因不是 `AK/SK` 本身错了，而是以下几类问题：

- 区域写错，通常应该是 `cn-north-4`
- 某个产品的 base URL 写错
- 共享模式下还没有先执行 `auth_configure_session`
- 请求实际上打到了错误的服务域名

优先检查：

- `HUAWEICLOUD_REGION`
- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`

## 2. 为什么 Req 能查，Repo 或 Pipeline 不能查

这通常说明：

- 你的 `AK/SK` 基本是可用的
- 某个产品的 base URL 或权限有问题

重点排查：

- Req 对应 `HUAWEICLOUD_REQ_BASE_URL`
- Repo 对应 `HUAWEICLOUD_REPO_BASE_URL`
- Pipeline 对应 `HUAWEICLOUD_PIPELINE_BASE_URL`

不要把三个产品的地址混用。

## 3. 共享模式下为什么查业务前要先调 `auth_configure_session`

因为共享模式的设计目标就是：

- 服务端统一部署
- 每个用户使用自己的华为云权限
- 服务端不保存所有人的全局业务凭证

所以在 `http` 模式下，每个会话第一次使用前，都应先调用：

- `auth_configure_session`

用完后如有需要，再调用：

- `auth_clear_session`

## 4. 为什么本地 `stdio` 模式不需要 `auth_configure_session`

因为 `stdio` 模式直接使用启动进程时注入的环境变量：

- `HUAWEICLOUD_AK`
- `HUAWEICLOUD_SK`

它更适合单人本地使用，所以不需要在 MCP 会话里再保存一份凭证。

## 5. 如何判断是 MCP 连接问题，还是华为云接口问题

可以按下面顺序判断：

### 先看服务本身是否在线

如果是 `http` 模式，检查：

- `GET /health`

### 再看 MCP 是否连上

如果客户端连不上 `/mcp`，说明问题还在接入层。

### 最后看业务工具是否报错

如果 MCP 已连通，但业务工具报错，通常问题在：

- 认证
- base URL
- 用户权限
- 参数值

## 6. 写操作为什么建议先用 `dry_run`

当前支持 `dry_run` 的工具有：

- `req_create_work_item`
- `req_update_work_item`
- `pipeline_run_pipeline`

推荐原因：

- 先让模型验证参数
- 避免直接对真实项目产生副作用
- 适合在团队共享环境中先确认意图

建议流程：

1. 先用 `dry_run: true`
2. 确认返回结果和意图一致
3. 再改成 `dry_run: false`

## 7. 为什么客户端里看到中文乱码，但文件本身没问题

这是终端或客户端显示编码的问题，不一定是文件内容损坏。

在当前仓库里，文档文件已经按 UTF-8 写入。  
如果 PowerShell 控制台仍然显示乱码，通常是控制台代码页问题，而不是文件内容问题。

## 8. `stdio` 和 `http` 该怎么选

### 选 `stdio`

适合：

- 只自己使用
- 本机可以直接运行 Node
- 不需要共享给团队

### 选 `http`

适合：

- 团队共享部署
- 希望通过 nginx / HTTPS 对外提供 MCP
- 每个人都需要用自己的华为云权限

## 9. 为什么建议团队共享时不要把大家的 `AK/SK` 都写到服务端

这样做会带来几个问题：

- 权限边界不清晰
- 审计困难
- 凭证轮换麻烦
- 一旦泄露影响面过大

当前这套 MCP 已经支持共享模式下的会话凭证隔离，所以更推荐：

- 服务端统一部署
- 每个人在自己的 MCP 会话里配置自己的凭证

## 10. 第一次接入时最推荐先试哪几个工具

建议顺序：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`

原因：

- 能分别验证三个产品的 base URL
- 都是只读操作
- 参数最简单

## 11. 反向代理部署时最容易漏什么

最容易漏的是：

- 没有把 `/mcp` 转发出去
- 只转发了 `POST`，却漏了 `GET` 和 `DELETE`
- HTTPS 层可访问，但后端 `codearts-mcp` 服务没起来

建议至少确认：

- `/health` 可访问
- `/mcp` 已正确反向代理
- 反向代理和后端端口一致

## 12. 为什么 `testplan_*` 返回 `CLOUDTEST.00012003`

这通常不是 MCP 实现错误，而是目标项目还没有开通 CodeArts TestPlan 服务。

当前北京四租户的真实返回就是：

- `CLOUDTEST.00012003`
- “您当前使用项目暂不支持测试服务”

这时应优先判断为“项目侧服务未开通”，而不是：

- AK/SK 失效
- base URL 错误
- MCP 路由不存在

建议先确认：

- 项目是否真的开通了 TestPlan
- `HUAWEICLOUD_TESTPLAN_BASE_URL` 是否为 `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`

## 13. 为什么 `perftest_*` 返回 `SVCSTG.CPTS.4031009`

这通常表示账号或租户尚未开通 CodeArts PerfTest。

当前北京四租户的真实返回是：

- `SVCSTG.CPTS.4031009`
- “You're not allowed to operate the resource. Please open CodeArts PerfTest first.”

另外，`perftest_*` 工具中的 `project_id` 不是 CodeArts 项目 UUID，而是区域 IAM project id。

如果这里传错，即使服务可达，也会遇到另一类错误，例如：

- `Validation does not passed. The projectId in token is different from the projectId in url.`

建议先确认：

- 账号是否已经开通 PerfTest
- 使用的是否是区域 IAM project id
- `HUAWEICLOUD_PERFTEST_BASE_URL` 是否为 `https://cpts.cn-north-4.myhuaweicloud.com`

## 14. 为什么 `inspector_*` 的 detail 接口返回 `CodeArtsInspector.00009999`

如果 `inspector_list_domains` 已经能正常返回 `200`，但 `inspector_get_task`、`inspector_list_results`、`inspector_list_ports`、`inspector_list_business_risks` 或 `inspector_get_report_status` 对一个不存在的任务返回：

- `CodeArtsInspector.00009999`
- `Cannot get user acl info of [task_id]`

这更像是服务已经正确接收到请求，并开始做 ACL / 任务归属校验。

也就是说，这通常说明：

- endpoint 是通的
- `webscan/*` 路由是对的
- 问题不在 MCP 路由层

应优先继续确认：

- `HUAWEICLOUD_INSPECTOR_BASE_URL` 是否为 `https://vss.myhuaweicloud.com`
- 任务 id 是否真实存在且属于当前项目/账号
- 当前租户是否已经创建过网站扫描域名和任务

## 15. 为什么 `govern_*` 的 detail 接口返回 `APIGW.0106`

对于 `govern_get_task_status`、`govern_get_open_source_summary`、`govern_get_open_source_report`，如果传入明显无效的任务 id，当前真实服务会返回参数校验错误，例如：

- `APIGW.0106`
- `Invalid query parameter: id, too short`

这类返回通常说明：

- 官方 `sbc/*` 路径是存在的
- 请求已经进入服务网关并完成参数校验
- 问题不是 endpoint 不存在

这时应优先判断为“任务 id 不合法或当前租户没有真实治理任务”，并继续确认：

- `HUAWEICLOUD_GOVERN_BASE_URL` 是否为 `https://devsecurity.cn-north-4.myhuaweicloud.com`
- 是否有真实的治理任务 id 可用于进一步验证

## 16. 我只想让模型查代码仓库，不想碰 Req / Pipeline，可以吗

可以。

这套服务是一个统一入口，但工具是分产品独立的。你完全可以只使用：

- `repo_list_repositories`
- `repo_get_repository`
- `repo_list_branches`
- `repo_list_commits`
- `repo_get_commit`
- `repo_get_file`
- `repo_list_merge_requests`
- `repo_get_merge_request`

## 17. 我该把哪些 ID 先记录下来

最常需要反复使用的是：

- `project_id`
- `repository_id`
- `pipeline_id`
- `tenant_id`
- `work_item_id`
- `merge_request_iid`
- `run_id`

建议第一次接入成功后，把这些常用 ID 在你自己的接入文档或工具配置备注里留一份。

## 18. 文档应该先看哪几份

推荐顺序：

1. `README.md`
2. `docs/quickstart.md`
3. `docs/client-examples.md`
4. `docs/tool-examples.md`
5. `docs/faq.md`

如果你是第一次接入，优先看：

- `docs/quickstart.md`

如果你已经接上，只是参数不熟，优先看：

- `docs/tool-examples.md`

## 19. 为什么 `govern_get_osi_item_detail` / `govern_list_osi_item_vulns` 不建议只传 `artifact_id`

当前北京四真实环境里，这两条 OSI detail/vuln 接口在只传 `artifact_id` 时，服务端仍会继续要求：

- `group_id`

真实返回示例：

- `SG.03011300`
- `Parameter verification failed: name=group_id, value=<NULL>`

基于当前已经验证通过的真实请求形态，仓库现在只推荐也只接受：

- `software_name`
- `software_version`

也就是直接使用 `software_name + software_version` 组合调用这两条工具。

## 20. 为什么 `sbc/osi/item/dependency` 还没做成 MCP 工具

这条路径已经出现在官方 `2026-01-08` 的 Govern API PDF 权限矩阵里：

- `POST /v1/{project_id}/sbc/osi/item/dependency`

但在北京四真实环境里，当前探测仍稳定返回：

- `APIGW.0101`
- `The API does not exist or has not been published in the environment`

所以当前结论不是“不会做”，而是“该环境下暂未发布/不可用”，因此仓库暂不暴露对应 MCP 工具，避免做出一个必然 404 的接口。

## 21. 为什么 `govern_list_tasks` 还是没有

到目前为止，`govern_list_tasks` 的问题不是 schema 或代码难度，而是正式 URI 仍没有被可靠确认。

当前已知：

- 权限名可以看到 `listBinaryTask`
- 公开 PDF / 文档没有给出可信的正式任务列表路径
- 历次 live 探测的候选路径都没有形成可接受的正式结论

所以当前策略仍然是不伪造接口，不为了“看起来完整”去上线一个不可信的路径。
