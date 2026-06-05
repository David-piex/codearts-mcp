# Capability Matrix

这页回答两个问题：

1. 每个模块当前暴露了多少工具，读写比例如何
2. 哪些模块已经完成真实 live 闭环，哪些仍然受区域或样本限制

## 模块读写矩阵

<!-- GENERATED:capability-matrix:start -->
| Module | Read | Write | Live | Key Gaps |
| --- | --- | --- | --- | --- |
| Req | 208 | 135 | Partial | Current-user info/role reads, user-feature reads, Scrum project, module, member, project-domain, iteration, plan, work-item, work-item-tree count/list, work-item tag/index-count reads, project-wide work-item record history, child-work-item, comment, work-hour, work-hour-type, image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, plan work-item management, plan image update, plan-context work item creation, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, work-item template/copy writes, project-template update/delete writes, and field/cache reads are implemented; deeper live coverage is still expanding for member, batch, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics/metric reads, cache reads, and board samples |
| Repo | 241 | 131 | Partial | The original 25 Repo collaboration tools have real AK/SK validation; the 6 repository import / remote mirror tools are implemented and unit-tested, but still need dedicated live samples |
| Pipeline | 75 | 51 | Partial | The original execution surface is live-validated, but the 51 newly added extension-endpoint/group/variable-group/rule-management/tag-management/tenant-strategy/project-strategy tools still need real AK/SK validation |
| Check | 82 | 10 | Partial | Core Check task/ruleset/metrics/defect reads and the six official read routes are AK/SK validated; newer write/trigger configuration tools are dry-run safe and still need dedicated real-write samples |
| TestPlan | 250 | 35 | Partial | `get_plan / list_runs / get_case / run_cases` are unpublished in Beijing 4 |
| Deploy | 57 | 17 | Partial | Expanded Deploy v4 environment/record/variable surface is implemented, but execute-class write paths still require dedicated runtime samples |
| Build | 90 | 9 | Validated | Core Build job, record, log, parameter, domain metadata, permission, code-tag, report, and resource-spec tools have live or smoke coverage; optional Git-code endpoint reads need endpoint-specific samples |
| Artifact | 42 | 6 | Partial | 5 tools are fully live-validated, and 7 routes are now re-confirmed by live smoke as unpublished in Beijing 4 |
<!-- GENERATED:capability-matrix:end -->

## 如何阅读这个表

- `Read / Write` 是从当前 MCP 工具名自动分类出来的统计，不是手填表
- `Live` 表示真实 AK/SK 联调闭环程度，不等于“代码是否存在”
- `Key Gaps` 描述的是当前最影响落地使用的缺口，而不是所有瑕疵列表

## 重点结论

- `Req`、`Repo`、`Check`、`Build` 是当前最成熟的闭环模块
- `Pipeline` 功能面已经很大，但新增管理类工具还缺真实 AK/SK 联调
- `Deploy` 已经覆盖经典路径和 v4 扩展面，但 execute-class 场景仍依赖专门样本
- `TestPlan`、`Artifact` 的主要阻塞不在本仓库代码，而在北京四当前未发布的上游路由

## 建议怎么用

- 要做可靠自动化：优先用 `Req / Repo / Check / Build`
- 要做流水线和部署联调：先看 [Module-Live-Readiness](./Module-Live-Readiness.md) 再决定走哪条路径
- 要继续补齐官方 API 覆盖：先看 [Official-API-Alignment](./Official-API-Alignment.md)
