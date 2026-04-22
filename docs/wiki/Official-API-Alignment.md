# Official API Alignment

这页回答的是一个很具体的问题:

当前仓库里的 MCP 化能力, 到底和官方 CodeArts API 文档对齐到了什么程度?

截至 `2026-04-21`, 我们基于以下 8 份官方 PDF 做了一次模块级对照:

- `代码托管 CodeArts Repo API参考.pdf`
- `代码检查 CodeArts Check API参考.pdf`
- `制品仓库 CodeArts Artifact API参考.pdf`
- `流水线 CodeArts Pipeline API参考.pdf`
- `测试计划 CodeArts TestPlan API参考.pdf`
- `编译构建 CodeArts Build API参考.pdf`
- `部署 CodeArts Deploy API参考.pdf`
- `需求管理 CodeArts Req API参考.pdf`

## 一句话结论

- 仓库文档和当前代码是对齐的。
- 当前 MCP 暴露面和官方 API 语义是大体对齐的。
- 当前项目不是官方 PDF 全量 API 的 1:1 MCP 镜像, 而是面向真实联调、运维和受控写路径的精选能力面。

如果你想继续往下看“官方哪些功能大类已经覆盖、哪些还没做”, 继续看:

- `docs/wiki/Official-Category-Coverage-Matrix.md`
- `docs/wiki/Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
- `docs/wiki/Official-Endpoint-Mapping-Check-Build-Deploy-Artifact-TestPlan.md`

## 这次怎么对

- 官方侧:
  - 读取 8 份 PDF 的目录书签。
  - 粗略统计 API section 下的 endpoint-like 条目数量。
- MCP 侧:
  - 读取 `src/products/*/tools/index.ts` 中实际暴露的工具名。
- 文档侧:
  - 运行 `npm run stats:check-docs`。
  - 确认 README 和 wiki 中的统计块没有和代码漂移。

说明:

- PDF 侧的数量是基于目录书签提取的近似值, 用来衡量能力面大小, 不是官方精确接口总数。
- MCP 侧有一部分工具是增强型复合工具, 不一定和某一个官方 endpoint 1:1 对应。

## 总表

| Module | MCP Tools | PDF API-like Items | Alignment Read | Current Judgment |
| --- | ---: | ---: | --- | --- |
| Req | 8 | 约 252 | Very selective subset | 聚焦项目、成员、迭代、工作项这条主链, 不是需求管理全量镜像 |
| Repo | 25 | 约 321 | Selective subset | 在原有仓库协作主链之上，已补到官方 CreateRepository 创建仓库能力 |
| Pipeline | 77 | 约 225 | Broadening subset | 执行主链之外, 已扩到分组、标签、扩展点、变量组、规则、策略和一批插件读取面 |
| Check | 8 | 约 106 | Selective subset | 聚焦检查任务生命周期、规则集、问题、指标 |
| TestPlan | 7 | 约 668 | Thin subset | 只覆盖很小一层, 且北京四还有未发布路由 |
| Build | 22 | 约 152 | Medium subset | 覆盖任务/记录/日志主路径, 也补了少量增强型 helper 工具 |
| Deploy | 59 | 约 73 | Broad subset | 这是当前最接近官方能力面的模块, 尤其是 v4 surface |
| Artifact | 12 | 约 59 | Medium subset | 覆盖仓库、版本、文件查询主链, 不是制品仓库全量面 |

## 文档和代码是否对齐

答案是: 对齐。

当前仓库已经把下面这些数字统一到了同一套自动统计源:

- `8` 个产品模块
- `218` 个产品工具
- `2` 个 shared `http` 会话工具
- `220` 个 shared `http` 总暴露工具

对应入口:

- `README.md`
- `docs/wiki/Home.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- `docs/wiki/Capability-Matrix.md`

并且 `npm run stats:check-docs` 当前是通过的。

## 当前 MCP 和官方文档是怎么对齐的

### Req

当前已覆盖的主链:

- 项目列表与项目详情
- 项目成员列表
- 迭代列表
- 工作项列表与详情
- 工作项创建与更新

当前没有覆盖的大面:

- 用户信息
- 字段管理
- 项目统计/项目指标
- 项目 CRUD 全量能力
- 成员角色管理和批量成员管理

判断:

当前 Req MCP 更像是“项目与工作项主链工具集”, 不是官方 Req 全量 API 的镜像。

### Repo

当前已覆盖的主链:

- 创建仓库
- 仓库列表与详情
- 分支、提交、文件内容
- 标签创建/删除/查询
- MR 列表、详情、变更、讨论、评审、合并、关闭
- 仓库事件、标签、保护分支、仓库标签
- ref compare

当前没有覆盖的大面:

- WebHook 全面管理
- 代码组能力
- 仓库成员组绑定
- IP 白名单
- 子模块管理
- 更多仓库设置型接口

判断:

当前 Repo MCP 已经覆盖了最常用的仓库协作主链，并补到了官方 CreateRepository 创建仓库能力，但和官方 Repo PDF 的总能力面相比仍然只是精选子集。

### Pipeline

当前已覆盖的主链:

- 模板列表
- 流水线列表与详情
- 运行记录与运行详情
- 启动、重试、停止
- 人工审核通过/驳回
- 日志、步骤输出、运行参数、产物
- 流水线删除、启用、禁用
- 分组管理
- 标签管理
- 扩展模块与扩展点管理
- 变量组管理
- 规则管理
- 租户级策略与项目级策略管理
- 一批插件读取面

当前没有覆盖的大面:

- 扩展插件管理完整生命周期
- 变更管理
- 微服务管理
- 模板 CRUD 全量能力
- 模板管理旧版面
- 流水线管理旧版面
- GitCode 流水线
- 扩展点 OAuth 授权 URL 等辅助链路

判断:

当前 Pipeline MCP 已经不只是“执行与排障优先”的薄层入口, 而是进入了管理面扩展阶段; 但新增管理工具的真实 AK/SK 联调仍未全部补齐, 所以依然不是完整产品面。

### Check

当前已覆盖的主链:

- 任务创建、查询、执行、停止
- 规则集列表
- 任务详情
- 问题列表
- 指标查询

当前没有覆盖的大面:

- 任务删除
- 任务配置修改
- 执行机/资源池管理
- 高级配置
- 通知配置
- 分支任务与目录树
- 更多任务规则参数接口

判断:

当前 Check MCP 是围绕“任务闭环”的精选子集。

### TestPlan

当前已覆盖的主链:

- 测试计划列表
- 计划关联 issues
- 用例列表
- 执行记录列表
- 单用例详情
- 执行用例

当前没有覆盖的大面:

- 报表/看板/质量报告
- 需求覆盖分析
- 更大范围的计划、报告、统计能力

额外说明:

- 这个模块不仅覆盖面小, 还受北京四未发布路由影响。
- 当前 wiki 已经明确标注了 Reachable / Unpublished 的边界。

判断:

TestPlan 目前和官方 PDF 的差距最大, 当前只覆盖了很薄的一层计划/用例主链。

### Build

当前已覆盖的主链:

- 构建任务列表与详情
- 构建记录、日志、脚本、详情、统计
- 运行、停止
- 参数、阶段、流程图等读取
- 针对 job config 的 step 追加/配置 helper
- Node runtime bundle / deployable app 这类增强型 helper

当前没有覆盖的大面:

- 代码仓管理接口
- 租户管理接口
- 镜像模板接口
- 任务 CRUD 全量能力
- 回收站、通知、权限矩阵等更完整配置面

判断:

Build 不是全量镜像, 但在“构建主链 + 实用增强工具”这一层已经比较扎实。

### Deploy

当前已覆盖的主链:

- 应用、任务、环境、主机组
- v4 application / cluster / environment / orchestration / deploy record
- manual check
- variables / runtime variables
- start / stop / rollback / retry / rerun
- 多种 deploy 记录与日志读取

当前没有覆盖的大面:

- 主机和主机集群的完整 CRUD 全量能力
- 一些旧接口面或管理面
- 应用删除/复制等部分外围接口

额外说明:

- Deploy 是当前和官方能力面对齐度最高的模块。
- 但 live 状态仍然会被真实样本、模板 runtime、区域能力发布影响。

判断:

Deploy 目前最接近“产品级 MCP 化”, 但也还没有达到官方 API 全量镜像。

### Artifact

当前已覆盖的主链:

- 仓库列表与详情
- 版本列表
- 最新版本文件
- 文件列表、详情、下载链接
- 删除文件
- 搜索与审计

当前没有覆盖的大面:

- 套餐/容量
- 项目角色权限
- 仓库 CRUD 全量能力
- Maven / Docker / non-Maven 细分管理面
- 各种 count 类与更多设置接口

额外说明:

- Artifact 还受北京四未发布路由影响。
- 所以它的 gap 既有“没做”, 也有“官方区域未发布”两类。

判断:

Artifact 当前是中等覆盖, 不是制品仓库完整能力面。

## 两个必须说明的例外

### `auth_*` 工具不属于官方产品 API

下面这两个工具是 shared `http` 模式下项目自己加的会话能力:

- `auth_configure_session`
- `auth_clear_session`

它们不应该拿去和官方 PDF 做 1:1 对齐比较。

### 一部分 Build 工具是增强型 MCP 能力

下面这些工具不是官方 PDF 中某个 endpoint 的简单改名:

- `build_append_job_step`
- `build_append_release_upload_step`
- `build_configure_release_upload_step`
- `build_prepare_node_runtime_bundle`
- `build_prepare_deployable_node_app`

它们是基于官方 job config 接口之上的组合能力封装。

## 当前更准确的对外表述

如果要用一句话描述这个项目, 比“CodeArts API 的 MCP 化”更准确的说法是:

“面向真实联调、团队共享部署和受控写路径的 CodeArts MCP 工具层, 当前覆盖 8 个核心产品模块的精选能力面, 并不是官方 API 全量镜像。”

## 如果后面要继续补齐

推荐优先级:

1. Pipeline
2. Repo
3. Req
4. Build
5. Artifact
6. TestPlan

原因:

- Pipeline / Repo / Req 的用户价值高, 但当前仍然是明显精选子集。
- Build 已经不差, 但还可以补更多官方管理面。
- Artifact / TestPlan 除了代码覆盖问题, 还受区域发布问题影响。
- Deploy 当前已经是相对最完整的模块, 不需要优先为了“全量对齐”继续堆接口。
