# 官方 8 份 PDF 与当前 MCP 覆盖清单

这页直接回答 3 个问题：

- 8 份官方 PDF 里，哪些能力已经做成了 MCP
- 哪些大块还没有 MCP 化
- 哪些虽然代码里已经有了，但真实北京四 `cn-north-4` 还受路由发布或租户样本限制

先说明一个边界：

- 这个项目不是把 8 份官方 PDF 全量 1:1 镜像成 MCP
- 当前定位是把最常用的读链、真实可写路径、联调排障主链和团队共享 `http` 会话模式做实
- 所以“还没 MCP 化”更适合按“能力面 / 功能大类”来理解，不适合简单等价成“还差多少个 endpoint”

## 当前总览

- 当前已经实现 `8` 个产品模块
- 当前已经实现 `218` 个产品工具
- 共享 `http` 模式再加上 `auth_configure_session` 和 `auth_clear_session` 两个会话工具后，总共是 `220` 个 MCP 工具
- 现有对齐文档估算，8 份 PDF 合计约有 `1856` 个 API-like item
- 如果只做粗略数量对比，仍有约 `1638` 个官方条目没有直接变成当前 MCP 工具

这组数字只能当“能力面量级感知”看，不能机械理解成“项目还差 1639 个接口没开发完”。

## 按官方大类看还差多少

以 `Official-Category-Coverage-Matrix.md` 为准：

- `Covered`: `13` 个官方大类
- `Partial`: `17` 个官方大类
- `Thin`: `3` 个官方大类
- `Region-limited`: `4` 个官方大类
- `Not targeted`: `48` 个官方大类

结论很直接：

- 已经 MCP 化的，主要集中在真正高频的项目主链、仓库协作主链、流水线执行主链、部署主链、构建主链
- 还没 MCP 化的，大多是外围治理面、权限面、报表面、模板管理面、旧版兼容面和产品深水区能力

## 8 个模块一页看懂

| 模块 | 当前工具数 | 已 MCP 化的主能力 | 还没 MCP 化的主能力 | 当前现实状态 |
| --- | --- | --- | --- | --- |
| Req | 8 | 项目 / 成员 / 迭代 / Scrum 工作项主链 | 用户、字段、项目指标统计、看板、IPD、需求池、工时 | 已 live 打通 |
| Repo | 25 | 仓库创建 + 仓库 / 分支 / 提交 / 文件 / 标签 / MR / Discussion / Review 主链 | webhook、group、member、permission、repo 设置外围面 | 原有面 live，新建仓库待补 live |
| Pipeline | 77 | 流水线执行主链 + 分组 + 标签 + 扩展点 + 变量组 + 规则 + 策略 + 一批插件读取面 | 插件管理完整生命周期、变更管理、微服务管理、旧版面 | 核心执行链 live，新增管理面仍待补真实 AK/SK |
| Check | 8 | 检查任务创建、执行、停止、问题、指标、规则集主链 | 导出、独立日志、AI 分析、完整缺陷治理面 | 已 live 打通 |
| TestPlan | 7 | 计划 / 需求树 / 用例 / 执行薄主链 | 报告、评审、附件、资源池、自动化任务、接口测试大面 | 很薄，且北京四部分路由未发布 |
| Deploy | 59 | 应用 / 任务 / 环境 / 主机组 / 变量 / v4 集群环境编排记录主链 | 权限治理、应用分组、完整主机治理与独立度量面 | 覆盖最广，但受真实资源与模板健康度影响 |
| Build | 22 | 构建任务 / 记录 / 日志 / 参数 / 阶段 / 配置 helper 主链 | 租户、模板、分组、文件、旧版构建外围面 | 已 live 打通 |
| Artifact | 12 | 仓库 / 版本 / 文件 / 下载 / 搜索 / 审计主链 | 权限、设置、容量、回收站、中心仓、安全、用户管理 | 多条北京四路由未发布 |

## 逐模块清单

## Req

已 MCP 化：

- 项目列表与详情
- 项目成员列表
- Scrum 迭代列表
- Scrum 工作项列表、详情、创建、更新

代表工具：

- `req_list_projects`
- `req_get_project`
- `req_list_project_members`
- `req_list_iterations`
- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`

还没 MCP 化：

- 用户信息
- 字段管理
- 项目指标与项目统计
- Scrum 项目的模块、领域、设置、成员、规划、状态等外围能力
- 看板项目工作项
- IPD 整片能力
- 需求池、工时、项目空间

当前判断：

- 这个模块是“项目与工作项主链优先”，不是完整 Req 产品面
- 当前读写闭环已经完成真实联调

## Repo

已 MCP 化：

- 在项目上创建仓库
- 项目下仓库列表、仓库详情
- 分支、提交、文件读取
- ref compare、标签、仓库事件、保护分支、标签列表
- Merge Request 列表、详情、创建、关闭、合并、评审
- MR change 与 discussion 主链

代表工具：

- `repo_list_repositories`
- `repo_create_repository`
- `repo_get_repository`
- `repo_list_branches`
- `repo_list_commits`
- `repo_get_file`
- `repo_compare_refs`
- `repo_list_tags`
- `repo_create_tag`
- `repo_list_merge_requests`
- `repo_create_merge_request`
- `repo_merge_merge_request`
- `repo_review_merge_request`

还没 MCP 化：

- webhook 管理
- group 管理
- repository / project permission 管理
- member 管理
- user 账户侧能力
- repository 设置、白名单、子模块、通知等外围管理面
- repo 里的 pipeline 关联能力

当前判断：

- Repo 当前已经覆盖最核心的代码协作主链，并补到了“创建仓库”
- 当前 25 个 Repo 工具都已完成真实 AK/SK live 验证

## Pipeline

已 MCP 化：

- 流水线列表、详情、运行、停止、重试、人工审核、日志、参数、产物、步骤输出
- 流水线删除、启用、禁用
- 模板列表
- 分组树读取、分组创建、更新、删除、批量移动流水线
- 标签列表、创建、更新、删除、批量打标签
- 扩展模块读取、扩展点列表、详情、创建、更新、删除
- 变量组创建、更新、删除、绑定、列表、详情
- 规则读取、创建、更新、删除、关联信息、类型列表
- 租户级策略与项目级策略的列表、详情、创建、更新、删除、继承、启停切换、关联信息
- 一批插件读取面，包括 publisher、plugins、plugin versions、inputs、outputs

还没 MCP 化：

- 扩展插件管理的完整生命周期
- 变更管理
- 微服务管理
- 模板管理旧版面
- 流水线管理旧版面
- GitCode 流水线
- 扩展点 OAuth 授权 URL 等辅助链路

当前判断：

- 这是当前工具数最多的模块
- 核心执行面已经 real-live 打通
- 新增的分组、标签、变量组、规则、策略、扩展点等管理工具目前以单测和回归覆盖为主，真实 AK/SK 补联调仍在后续队列里

## Check

已 MCP 化：

- 检查任务创建、列表、详情
- 任务执行、停止
- 任务问题列表
- 任务指标
- 规则集列表

代表工具：

- `check_create_task`
- `check_list_tasks`
- `check_get_task`
- `check_list_task_issues`
- `check_get_metrics`
- `check_list_rulesets`
- `check_run_task`
- `check_stop_task`

还没 MCP 化：

- 问题导出
- 独立检查日志面
- AI 辅助分析
- 更完整的缺陷管理与规则管理外围能力

当前判断：

- 当前模块已经覆盖“创建任务 -> 执行 -> 看问题 -> 看指标”这条最实用主链
- 模块级 live 闭环已完成

## TestPlan

已 MCP 化：

- 测试计划列表
- 测试计划详情
- 计划下需求树
- 用例列表
- 用例详情
- 执行记录列表
- 按 case 列表触发执行

代表工具：

- `testplan_list_plans`
- `testplan_get_plan`
- `testplan_list_issues`
- `testplan_list_cases`
- `testplan_get_case`
- `testplan_list_runs`
- `testplan_run_cases`

还没 MCP 化：

- 测试报告、测试报表、报告管理
- 测试套管理
- 附件管理
- 评审管理
- 测试设置、项目配置
- 测试结果管理
- 资源池、资源操作、迭代资源操作
- 接口测试、接口测试套
- 功能自动化任务、拨测、测试执行任务外围面

当前判断：

- 当前只是“计划 / 用例 / 执行”的一层很薄入口
- 北京四下 `get_plan / list_runs / get_case / run_cases` 相关真实路由仍存在未完整发布情况，所以它不是稳定的大类级覆盖

## Deploy

已 MCP 化：

- 经典应用主链，包括应用列表、详情、创建、修改、日志
- 部署任务列表、详情、状态、历史、执行参数、部署源详情
- 启动、停止、回滚
- 主机组、环境、环境主机、应用操作日志、系统配置
- v4 变量、变量查询、变量历史、运行时变量
- v4 应用、集群、环境、环境应用、部署单元、编排、部署记录
- v4 记录详情、step 详情、step 日志
- v4 环境/集群主机增删
- v4 记录 cancel、rerun、retry、rollback
- v4 人工审核 pass / refuse

还没 MCP 化：

- 应用分组管理
- 应用权限管理
- 主机集群权限管理
- 环境权限管理
- 更完整的主机治理面
- 独立部署记录度量面全量能力

当前判断：

- Deploy 是当前最接近“产品级 MCP 化”的模块
- 但它对真实租户资源、模板健康度和环境样本依赖也最大
- 当前主要现实阻塞不是本地工具没写，而是历史模板 runtime 仍偏旧，以及目标项目资源健康度并不总是理想

## Build

已 MCP 化：

- 构建任务列表、详情、运行、停止
- 构建记录列表、详情、工程记录、统计、参数、阶段、流程图、脚本
- 实时日志、错误日志
- job step 局部更新
- 追加 step、追加发布库上传 step、配置发布库上传 step
- 打包 Node runtime bundle、准备单文件 Node 部署包

代表工具：

- `build_list_jobs`
- `build_get_job`
- `build_run_job`
- `build_stop_job`
- `build_list_records`
- `build_get_record`
- `build_get_real_time_log`
- `build_get_error_log`
- `build_update_job_step`
- `build_prepare_node_runtime_bundle`

还没 MCP 化：

- 代码管理
- 租户管理
- 镜像模板
- 模板管理
- 分组管理
- 文件管理
- 已过时或待下线的旧版构建能力面

当前判断：

- Build 当前暴露的 `22` 个工具已经全部完成 live 验证
- 它不只是读接口，也包括几类对真实任务配置很实用的增强 helper

## Artifact

已 MCP 化：

- 仓库列表、仓库详情
- 文件树
- 文件列表、文件详情、下载链接、删除
- 构建归档包列表
- 最新版本文件列表
- 版本列表
- 制品搜索
- 审计日志

代表工具：

- `artifact_list_repositories`
- `artifact_get_repository`
- `artifact_get_file_tree`
- `artifact_list_files`
- `artifact_get_file`
- `artifact_get_download_url`
- `artifact_delete_file`
- `artifact_list_versions`
- `artifact_search_artifacts`
- `artifact_show_audit`

还没 MCP 化：

- 发布库套餐查询
- 发布库权限管理
- 发布库设置
- 发布库仓库容量
- 权限查看
- 回收站
- 仓库关联项目
- 仓库容量
- 用户管理
- 制品安全
- 中心仓
- 关注类能力

当前判断：

- 当前 MCP 已经覆盖仓库、版本、文件这条主链
- 但北京四下文件管理、搜索、审计等多个真实路由仍有未发布项，所以代码已实现不等于当前区域能完整 live 闭环

## 推荐怎么继续读

如果你想看“每个模块具体已经对齐到官方哪一层”，建议按这个顺序：

1. `Current-Implementation-Status-2026-04-17.md`
2. `Official-Category-Coverage-Matrix.md`
3. `Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
4. `Official-Endpoint-Mapping-Check-Build-Deploy-Artifact-TestPlan.md`

如果你想看“真实北京四到底哪些已经打通过”，再看：

- `Req-Live-Validated.md`
- `Check-Live-Validated.md`
- `Build-Live-Validated.md`
- `Deploy-Live-Validated.md`
- `Artifact-Live-Validated.md`
- `TestPlan-Live-Validated.md`
