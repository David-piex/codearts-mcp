# Official API Alignment

这页按官方 8 个产品资料的视角，说明当前 MCP 化到了哪里、哪里已经可用、哪里还只是代码实现或受上游限制。

## 对齐原则

项目没有走“官方 PDF 看到什么，就 1:1 生成一个 MCP 工具”的路线，而是按下面的优先级推进：

1. 高频读路径优先
2. 真实业务常用写路径优先
3. 能做真实 AK/SK 验证的优先
4. 对区域未发布或租户样本缺失的路由，明确标注状态而不是假装完成

## 8 个产品模块的当前对齐情况

| 模块 | 当前 MCP 工具数 | 对齐结论 | 当前重点缺口 |
| --- | --- | --- | --- |
| Req | 40 | 已对齐到 Scrum 高频实用层 | IPD / 需求池 / 看板 / 字段与状态配置 / 附件等仍未进入 MCP；新增工具的 live 仍需继续补 |
| Repo | 25 | 已形成完整实用面 | 无明显阻塞，含创建仓库 |
| Pipeline | 77 | 覆盖面大，但 live 深度不均 | 新增管理类工具仍需 AK/SK 实测 |
| Check | 8 | 当前工具面已稳定 | 无明显阻塞 |
| TestPlan | 7 | 已覆盖基础查询和执行入口 | 部分北京四路由未发布 |
| Deploy | 59 | 经典路径和 v4 扩展面都已进入 MCP | execute-class 场景仍需专门样本 |
| Build | 22 | 当前工具面已稳定 | 无明显阻塞 |
| Artifact | 12 | 读面已有实用覆盖 | 多条路由在北京四未发布 |

## 按模块看重点

### Req

- 当前对齐到官方 Req API 的 `Scrum 高频实用层`，不再只是旧文档里的 8 个核心工具，而是已经覆盖 `project / member / iteration / work-item / collaboration` 五个资源面，共 `36` 个工具
- phase-1 collaboration 已进入 MCP，包括 `req_list_associated_issues`、`req_list_associated_commits`、`req_list_associated_test_cases`、`req_list_related_users`、`req_update_work_item_flow`
- 这不等于已经做完官方 Req API 的全量对齐。当前更像是“Scrum 常用操作已成面”，而不是“Req 全家桶都已进 MCP”
- 当前仓库里能明确看到的真实 AK/SK smoke 仍主要集中在项目读取、成员读取、迭代读取，以及 work-item core 的 create/get/update/list；新增协作读工具和多数管理类写工具还需要继续补 live
- 明确还没进入当前对齐范围的方向包括：IPD、需求池、项目空间/看板、字段配置、模块配置、状态配置、域级管理、工时、附件传输

### Repo

- 覆盖仓库、分支、标签、提交、MR、讨论、评审
- `repo_create_repository` 已补齐并完成真实联调

### Pipeline

- 原有执行面已经 live 过
- 现在新增了大量管理面，包括分组、标签、变量组、规则、扩展端点、项目策略、租户策略
- 这部分当前更像“代码与回归已完成，live 样本待补”

### Check

- 当前 8 个工具已是稳定闭环
- 适合与 Repo / Build 一起作为静态质量分析链路使用

### TestPlan

- 当前难点不是实现，而是上游接口在北京四的发布状态
- 因此要明确区分“工具存在”和“服务真的可用”

### Deploy

- 不是只覆盖传统应用部署，还补到了 v4 环境、集群、记录、变量等扩展面
- 当前最需要进一步验证的是 execute-class 高风险动作

### Build

- 当前 22 个工具已形成较完整的构建实用面
- 包括若干用于发布前整理或 dry-run 预览的辅助工具

### Artifact

- 已有版本、仓库、文件、审计、下载等关键查询面
- 一部分路由在北京四仍是未发布状态

## 对齐现状的现实判断

如果从“别人拿来能不能用”的角度看：

- `Req / Repo / Check / Build` 仍是当前最接近“可以直接上手”的模块，但 Req 现在要区分“功能面已经扩到 Scrum 常用层”和“哪些路径已经真实 AK/SK 验证”
- `Pipeline / Deploy` 已经具备很强的工程价值，但还需要继续补 live 样本，才能把“代码上有”变成“默认敢用”
- `TestPlan / Artifact` 的剩余问题更多是上游区域发布而不是仓库缺实现

## 下一步最值得补的点

1. Req 新扩展的 project/member/iteration 写路径与 collaboration tools 的真实 AK/SK smoke
2. Pipeline 管理类工具的真实 AK/SK 验证
3. Deploy execute-class 场景的真实样本和回归
4. 对区域未发布路由维持显式状态说明，避免文档与现实脱节
