# Official Category Coverage Matrix

这页比 `Official-API-Alignment.md` 更细一层。

它不再只看“模块总量”，而是按官方 PDF 的功能大类来回答:

- 哪些大类已经被当前 MCP 覆盖到
- 哪些只是部分覆盖
- 哪些目前明确不在当前能力面里
- 哪些受北京四真实路由发布状态影响

## 状态说明

| Status | Meaning |
| --- | --- |
| Covered | 当前 MCP 已覆盖该大类里的核心主链 |
| Partial | 当前只覆盖该大类的一部分主链, 不是完整能力面 |
| Thin | 当前只有很薄的一层能力触达 |
| Region-limited | 代码侧已触达, 但真实北京四路由发布状态限制了闭环 |
| Not targeted | 当前项目没有把这块作为优先 MCP 能力面 |

## Repo

官方大类来自 `代码托管 CodeArts Repo API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `V4 / Repository` | Partial | 已覆盖仓库列表、详情、事件、compare、标签、部分 repository 主链, 但未覆盖仓库设置、白名单、子模块、下载、通知等完整面 |
| `V4 / ProtectedRefs` | Partial | 已覆盖保护分支查询, 不是完整 protected refs 管理 |
| `V4 / MergeRequest` | Covered | MR 列表、详情、变更、讨论、评审、合并、关闭主链已覆盖 |
| `V4 / Discussion` | Covered | MR discussion 列表与创建已覆盖 |
| `V4 / Commit` | Covered | commit 列表与详情已覆盖 |
| `V4 / File` | Covered | 文件内容读取已覆盖 |
| `V4 / Refs` | Covered | branch/tag/ref compare 主链已覆盖 |
| `V4 / WebHook` | Not targeted | 当前没有做 webhook 管理面 |
| `V4 / Permission` | Not targeted | 没有做仓库/项目权限管理大面 |
| `V4 / Project` | Partial | 已覆盖项目下仓库相关读取, 但不是完整 project 管理 |
| `V4 / Group` | Not targeted | 没有做代码组管理面 |
| `V4 / Member` | Not targeted | 没有做仓库成员管理面 |
| `V4 / User` | Not targeted | 没有做用户账户侧能力 |
| `V4 / Pipeline` | Not targeted | repo 里的 pipeline 关联能力未做 |
| `V2 / Repository / Project / Commit / File / User` | Not targeted | 当前优先走更现代、直接的仓库协作主链, 没有追求旧面全量 |

## Check

官方大类来自 `代码检查 CodeArts Check API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `任务管理` | Covered | 任务创建、列表、详情、执行、停止、问题、指标、规则集主链已覆盖 |
| `缺陷管理` | Partial | 当前主要通过任务问题列表触达, 不是缺陷管理完整能力面 |
| `规则管理` | Partial | 规则集列表已覆盖, 更完整规则管理面未做 |
| `代码问题` | Partial | 问题列表已覆盖, 但不是完整代码问题管理面 |
| `问题导出` | Not targeted | 未覆盖 |
| `代码度量` | Partial | metrics 查询已覆盖一部分 |
| `获取检查日志` | Not targeted | 当前没有把独立检查日志面完整暴露出来 |
| `智能化辅助分析` | Not targeted | 未覆盖 |

## Artifact

官方大类来自 `制品仓库 CodeArts Artifact API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `发布库版本管理` | Partial | 版本列表、最新版本文件已覆盖, count 类未做 |
| `发布库文件管理` | Region-limited | 文件列表/详情/下载/删除这条链在代码里已做, 但北京四多条路由未发布 |
| `仓库管理` | Partial | 仓库列表、仓库详情已覆盖, 仓库创建/更新/删除等未做 |
| `搜索` | Region-limited | 搜索接口已实现, 但北京四真实路由未发布 |
| `审计日志` | Region-limited | 审计接口已实现, 但北京四真实路由未发布 |
| `发布库文件查询` | Partial | 已覆盖一部分文件查询链 |
| `发布库套餐查询` | Not targeted | 未覆盖 |
| `发布库仓库详情` | Thin | 当前只覆盖很薄的一层 |
| `发布库权限管理` | Not targeted | 未覆盖 |
| `发布库设置` | Not targeted | 未覆盖 |
| `发布库仓库容量` | Not targeted | 未覆盖 |
| `权限管理` | Not targeted | 未覆盖 |
| `回收站` | Not targeted | 未覆盖 |
| `仓库关联项目` | Not targeted | 未覆盖 |
| `仓库容量` | Not targeted | 未覆盖 |
| `用户管理` | Not targeted | 未覆盖 |
| `仓库详情` | Thin | 当前只触达单点仓库详情 |
| `关注` | Not targeted | 未覆盖 |
| `文件管理` | Region-limited | 有实现, 但部分真实链路受区域发布限制 |
| `权限查看` | Not targeted | 未覆盖 |
| `制品安全` | Not targeted | 未覆盖 |
| `中心仓` | Not targeted | 未覆盖 |

## Pipeline

官方大类来自 `流水线 CodeArts Pipeline API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `模板管理` | Partial | 只覆盖模板列表, 未覆盖模板 CRUD 全量能力 |
| `流水线管理` | Covered | 运行、停止、重试、人工审核、日志、参数、产物、步骤输出主链已覆盖 |
| `分组管理` | Not targeted | 未覆盖 |
| `规则管理` | Not targeted | 未覆盖 |
| `租户级策略管理` | Not targeted | 未覆盖 |
| `项目级策略管理` | Not targeted | 未覆盖 |
| `扩展插件管理` | Not targeted | 未覆盖 |
| `扩展点管理` | Not targeted | 未覆盖 |
| `流水线标签管理` | Not targeted | 未覆盖 |
| `变更管理` | Not targeted | 未覆盖 |
| `微服务管理` | Not targeted | 未覆盖 |
| `模板管理（旧版）` | Not targeted | 未覆盖 |
| `流水线管理（旧版）` | Not targeted | 未覆盖 |
| `GitCode流水线` | Not targeted | 未覆盖 |

## TestPlan

官方大类来自 `测试计划 CodeArts TestPlan API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `测试计划管理` | Thin | 计划列表与部分详情链路较薄, 且 detail/run 路由在北京四有未发布情况 |
| `测试用例管理` | Thin | 用例列表与单用例详情主链较薄 |
| `工作项管理` | Thin | 当前主要通过 `list_issues` 触达 |
| `用例执行管理` | Region-limited | `run_cases` 已实现, 但北京四路由未完整发布 |
| `测试报告管理 / 报告管理 / 测试报表管理` | Not targeted | 当前没有做这一整片报表与质量报告面 |
| `测试套管理` | Not targeted | 未覆盖 |
| `附件管理` | Not targeted | 未覆盖 |
| `评审管理 / 用例评审` | Not targeted | 未覆盖 |
| `测试设置 / 项目配置 / 项目配置相关管理` | Not targeted | 未覆盖 |
| `需求管理` | Not targeted | 未覆盖完整需求关联面 |
| `测试结果管理` | Not targeted | 未覆盖 |
| `资源池管理 / 资源操作管理 / 迭代资源操作管理` | Not targeted | 未覆盖 |
| `接口测试管理 / 接口测试套管理 / 接口测试套餐信息查询` | Not targeted | 未覆盖 |
| `功能自动化任务管理 / 拨测相关管理 / 测试执行任务管理` | Not targeted | 未覆盖 |
| `其余大量外围管理类目` | Not targeted | 当前都不在主能力面里 |

结论:

TestPlan 目前不是“大类级覆盖”，而是围绕计划/用例/执行主链做了一个很薄的入口层。

## Build

官方大类来自 `编译构建 CodeArts Build API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `构建任务管理` | Covered | 任务列表、详情、运行、停止、配置辅助修改主链已覆盖 |
| `构建记录` | Covered | 记录列表、详情、历史、统计、阶段、流程图主链已覆盖 |
| `构建日志` | Covered | 实时日志、错误日志、脚本读取主链已覆盖 |
| `构建报告` | Partial | 当前覆盖报告侧的一部分读取链 |
| `代码管理` | Not targeted | 未覆盖 |
| `租户管理` | Not targeted | 未覆盖 |
| `镜像模板` | Not targeted | 未覆盖 |
| `模板管理` | Not targeted | 未覆盖 |
| `分组管理` | Not targeted | 未覆盖 |
| `文件管理` | Not targeted | 未覆盖 |
| `编译构建(已过时)` | Not targeted | 不追旧面 |
| `编译构建(待下线)` | Not targeted | 不追待下线旧面 |

补充:

Build 里还有一组增强型 MCP helper:

- `build_append_job_step`
- `build_append_release_upload_step`
- `build_configure_release_upload_step`
- `build_prepare_node_runtime_bundle`
- `build_prepare_deployable_node_app`

它们超出了官方“原子 API”目录本身。

## Deploy

官方大类来自 `部署 CodeArts Deploy API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `应用管理` | Covered | 应用列表、详情、日志、执行参数、创建/修改/启动/停止/回滚主链覆盖较深 |
| `部署任务管理` | Covered | task 与 history/status 主链已覆盖 |
| `环境管理` | Covered | 环境列表、详情、资源、主机相关读取主链已覆盖 |
| `主机集群管理` | Partial | v4 cluster 与 host-group 主链覆盖较多, 但不是官方主机集群全量 CRUD |
| `主机管理` | Partial | 查询、详情、部分增删关联已覆盖, 不是完整主机管理面 |
| `应用分组管理` | Not targeted | 未覆盖 |
| `应用权限管理` | Not targeted | 未覆盖 |
| `部署记录度量` | Partial | record/detail/log/status 已覆盖一部分, 不是独立度量管理全量面 |
| `主机集群权限管理` | Not targeted | 未覆盖 |
| `环境权限管理` | Not targeted | 未覆盖 |

结论:

Deploy 已经是当前最接近官方大类覆盖面的模块。

## Req

官方大类来自 `需求管理 CodeArts Req API参考.pdf`。

| Official Category | Current Status | Notes |
| --- | --- | --- |
| `项目信息` | Partial | 项目列表与详情已覆盖, 不是完整项目管理面 |
| `项目成员` | Partial | 成员列表已覆盖, 成员增删改角色等未覆盖 |
| `Scrum项目的迭代` | Partial | 迭代列表已覆盖, 不是完整迭代管理面 |
| `Scrum项目的工作项` | Covered | 工作项列表、详情、创建、更新主链已覆盖 |
| `用户信息` | Not targeted | 未覆盖 |
| `字段管理` | Not targeted | 未覆盖 |
| `项目指标` | Not targeted | 未覆盖 |
| `项目统计` | Not targeted | 未覆盖 |
| `Scrum项目的模块 / 领域 / 设置 / 成员 / 规划 / 状态` | Not targeted | 未覆盖 |
| `看板项目的工作项` | Not targeted | 未覆盖 |
| `IPD* 整片能力` | Not targeted | 当前完全没有追 IPD 大面 |
| `需求池` | Not targeted | 未覆盖 |
| `工作项工时` | Not targeted | 未覆盖 |
| `项目空间` | Not targeted | 未覆盖 |
| `Issue 严重程度相关 rest 接口` | Not targeted | 未覆盖 |

结论:

Req 目前非常明确地聚焦在“项目与工作项主链”，没有尝试覆盖 Scrum + 看板 + IPD 的完整产品面。

## 推荐怎么读这两页

- 想快速知道“整体到底对齐到什么程度”:
  - 看 `Official-API-Alignment.md`
- 想知道“官方哪些大类没做, 以后该往哪补”:
  - 看这页 `Official-Category-Coverage-Matrix.md`
