# Module Functions Overview

这页不讲实现细节，也不讲官方 API 对齐率，只回答一个更直接的问题：

每个模块现在在 MCP 里到底能帮你干什么。

## 先看总判断

如果从“实际拿来用”来分，当前 8 个模块大致可以这样理解：

- `Req / Repo / Check / Build`：现在最适合直接接入到真实日常流程里
- `Pipeline / Deploy`：能力很强，适合联调和自动化，但要先确认具体租户样本和 live 状态
- `TestPlan / Artifact`：有实用查询面，但部分上游路由在北京四仍受发布限制

## 模块总览表

| 模块 | 中文定位 | 你可以用它做什么 | 典型工具 | 当前建议 |
| --- | --- | --- | --- | --- |
| Req | 需求与工作项管理 | 查项目、查成员、查迭代、查工单、创建工单、更新工单 | `req_list_projects` `req_list_work_items` `req_create_work_item` | 适合直接使用 |
| Repo | 代码仓库协作 | 查仓库、查分支、查提交、查文件、查 MR、创建仓库、发起/评审/合并 MR、打标签 | `repo_list_repositories` `repo_create_repository` `repo_create_merge_request` | 适合直接使用 |
| Pipeline | 流水线执行与治理 | 查流水线、查运行、触发运行、审批/拒绝/重试/停止运行，还能管分组、标签、变量组、规则、策略和扩展点 | `pipeline_list_pipelines` `pipeline_run_pipeline` `pipeline_create_group` | 适合进阶自动化 |
| Check | 代码检查 | 查规则集、查检查任务、看问题、看指标、创建/执行/停止检查任务 | `check_list_rulesets` `check_list_task_issues` `check_run_task` | 适合和 Repo / Build 配套 |
| TestPlan | 测试计划与测试用例 | 查测试计划、查用例、查问题、查运行记录、批量执行用例 | `testplan_list_plans` `testplan_list_cases` `testplan_run_cases` | 先按租户可用性使用 |
| Deploy | 部署编排与环境资源 | 查应用、查任务、查环境、查主机组、查部署记录、创建应用/环境/任务、启动/停止/回滚部署、操作 v4 环境和记录 | `deploy_list_apps` `deploy_create_task_by_template` `deploy_start_app` | 联调前先确认样本 |
| Build | 编译构建 | 查构建任务、查记录、查日志、查参数、运行/停止任务，还能补步骤和发布上传步骤 | `build_list_jobs` `build_run_job` `build_get_real_time_log` | 适合直接接 CI/CD |
| Artifact | 制品仓库 | 查仓库、查版本、查文件树、查下载地址、查构建归档、删文件、查审计 | `artifact_list_repositories` `artifact_list_versions` `artifact_get_download_url` | 适合做制品查询 |

## 各模块怎么理解

### Req

Req 是最典型的“把项目管理动作做成 MCP 工具”的模块。

适合场景：

- 让 AI 先列项目，再定位某个项目下的需求或缺陷
- 自动创建工单，或把处理结果回写到已有工单
- 联动成员和迭代信息，做简单的项目管理辅助

它的优势是模型容易理解、输入输出也比较稳定，真实写路径已经比较成熟。

### Repo

Repo 是当前最像“代码协作工作台”的模块。

适合场景：

- 查看仓库、分支、提交、标签、文件内容
- 围绕 Merge Request 做创建、讨论、评审、合并、关闭
- 直接从 MCP 里创建一个新仓库

如果你想让 AI 真正参与“代码协作流程”，Repo 是目前最值得先接入的模块之一。

### Pipeline

Pipeline 不是只会“跑流水线”。

当前已经覆盖了三层能力：

1. 执行面：列表、详情、运行、重试、审批、停止
2. 治理面：标签、分组、变量组、规则、策略
3. 扩展面：插件、发布者、扩展模块、扩展端点

这让它很适合做更复杂的 DevOps 自动化，但也意味着你要更关注 live 样本是否齐全。

### Check

Check 是静态质量分析模块。

适合场景：

- 看某个检查任务的问题和指标
- 对规则集做查询
- 触发或停止检查任务

如果你希望 AI 在“代码合并前”帮忙看质量风险，Check 和 Repo 非常适合一起使用。

### TestPlan

TestPlan 聚焦测试计划、测试用例和执行情况。

适合场景：

- 查某个项目下有哪些测试计划和测试用例
- 关联测试计划中的问题
- 在租户和区域允许的情况下批量执行用例

这个模块的主要限制不是 MCP 表达层，而是上游接口在北京四的发布状态。

### Deploy

Deploy 是现在最容易被低估的模块，因为它已经不只是传统应用部署查询，而是扩展到了 v4 环境和部署记录面。

适合场景：

- 查应用、环境、主机组、记录、变量
- 从模板创建部署任务
- 做受控的启动、停止、回滚
- 围绕 v4 环境、集群和部署记录做进一步自动化

它的难点在于 execute-class 场景依赖更具体的真实样本，不建议在没有明确资源的情况下直接放开。

### Build

Build 是最适合与 Pipeline / Deploy 串联的模块之一。

适合场景：

- 查构建任务和构建记录
- 看实时日志、错误日志、阶段信息、脚本
- 运行或停止构建任务
- 对发布上传步骤做预配置或增量修改

如果你的目标是让 AI 参与构建排障或发布前准备，Build 很有用。

### Artifact

Artifact 更偏向“制品可见性”和“下载/追踪能力”。

适合场景：

- 查仓库、查版本、查文件树
- 获取下载地址
- 查询构建归档与审计信息
- 做受控文件删除

它很适合给 Build / Deploy 做后置追踪，但部分 API 在北京四仍未发布。

## 如果你是按场景选模块

### 想做项目协作

- 先看 `Req`
- 再配 `Repo`

### 想做代码审查和质量门禁

- 先看 `Repo`
- 再配 `Check`

### 想做 CI/CD 自动化

- 先看 `Build`
- 再配 `Pipeline`
- 真正落部署时再接 `Deploy`

### 想做制品追踪

- 先看 `Build`
- 再配 `Artifact`

## 下一步看什么

- 想按角色选模块和阅读路径：看 [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)
- 想看模块规模和 live 缺口：看 [Capability-Matrix](./Capability-Matrix.md)
- 想看真实 AK/SK 联调状态：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
- 想看测试和部署联调策略：看 [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
