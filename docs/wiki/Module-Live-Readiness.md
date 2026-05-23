# Module Live Readiness

这页聚焦“真实 AK/SK 联调”这一层，不讨论单纯的代码存在与否。

## 模块级联调状态

<!-- GENERATED:module-live-readiness-table:start -->
| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Req | 201 | 117 | 84 | Partial | Req now covers current-user info/role reads, user-feature reads, Scrum project, module, member, project-domain, iteration, plan, work-item, work-item-tree count/list, work-item tag/index-count reads, project-wide work-item record history, child-work-item, comment, work-hour, work-hour-type, image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, related-user, plan work-item management, plan image update, plan-context work item creation, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, work-item template/copy writes, project-template update/delete writes, field/cache reads, and flow-transition tools. Core project/work-item paths have live coverage; member, batch-operation, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics/metric reads, cache reads, and board reads still need deeper live coverage. |
| Repo | 176 | 132 | 44 | Partial | The original 25 Repo collaboration tools are live-validated, including `repo_create_repository` through the HTTP MCP session on the writable sampled project. The 6 repository import / remote mirror tools are implemented and covered by unit regression tests, but still need dedicated live samples before being marked AK/SK Full. |
| Pipeline | 88 | 52 | 36 | Partial | The original 16-tool execution surface remains live-validated. The newly added delete/enable/disable, extension-endpoint, tag-management, group-management, variable-group, rule-management, tenant-strategy, and project-strategy tools currently have unit regression coverage, but real AK/SK validation is still pending. |
| Check | 47 | 43 | 4 | Validated | Full tool-level live loop completed. |
| TestPlan | 238 | 228 | 10 | Partial | Two scanned projects now return real plan samples; 4 routes are re-confirmed as unpublished in Beijing 4. |
| Deploy | 60 | 43 | 17 | Partial | `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, `deploy_stop_app`, and `deploy_rollback_app` already have real AK/SK coverage on at least one healthy path. The remaining practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`) and the need for dedicated execute-class samples. |
| Build | 62 | 53 | 9 | Validated | Core Build job, record, log, parameter, domain metadata, permission, code-tag, report, and resource-spec tools are covered by live or smoke validation. Git-code endpoint reads are implemented and unit-tested, with endpoint-specific live samples optional. |
| Artifact | 31 | 29 | 2 | Partial | Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4. |
<!-- GENERATED:module-live-readiness-table:end -->

## 当前总量

<!-- GENERATED:module-live-readiness-totals:start -->
- Product modules implemented: `8`
- Product tools implemented: `903`
- Auth/session tools implemented: `2`
- Total MCP tools exposed: `905`
<!-- GENERATED:module-live-readiness-totals:end -->

## 模块摘要

<!-- GENERATED:module-live-readiness-summary:start -->
| Module | Tools | Real-Live Summary | Current Conclusion |
| --- | --- | --- | --- |
| Req | 201 | Expanded Req surface with current-user info/role, user-feature, project bug/summary/statistics/metric, and project-domain reads plus tree count/list, work-item tag/index-count, project work-item history, child work items, work-hours/work-hour-types, issue image upload/download, attachment upload/download/delete, associated wiki reads, plan work-item management, work-item template/copy writes, project-template update/delete writes, project due-days-after/workhour-config reads, and status/public-config/cache support | The Req MCP surface has grown from the original 8-tool core to current-user info/role and user-feature reads, project/module/member/project-domain/iteration/plan/work-item/work-item-tree/project-wide-record-history/child-work-item collaboration, work-item tag/index-count reads, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, work-hours/work-hour-type reads, issue image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, plan work-item management, plan image update, plan-context work item creation, work-item template/copy writes, project-template update/delete writes, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler and project-public-config reads, field/cache reads, and initial board work-item read coverage; core live loops are validated while deeper member, batch, plan, plan work-item management, plan image update, plan-context work item creation, summary/statistics/metric read samples, cache-read, and board samples remain pending. |
| Repo | 176 | `25 Full / 0 Reachable / 0 Unpublished / 6 Code` | `repo_create_repository` remains live-validated with the previous Repo surface. The repository import / remote mirror tools are code-complete and unit-tested, but not yet counted as AK/SK Full. |
| Pipeline | 88 | `16 Full / 0 Reachable / 0 Unpublished / 51 Code` | Core execution closure remains complete, but the new extension-endpoint/tag/group/variable-group/rule-management/tenant-strategy/project-strategy tools still need live AK/SK validation. |
| Check | 47 | `8 Full` | Tool-level closure is complete. |
| TestPlan | 238 | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` | Real plan samples now exist on two projects, but detail/run routes are still unpublished in Beijing 4. |
| Deploy | 60 | Expanded v4 surface with partial live closure | The Deploy MCP surface now includes v4 application/environment/cluster/record/variable tools. Read paths and selected write paths are live-validated, while full execute-class coverage still depends on dedicated runtime samples. |
| Build | 62 | Expanded metadata read surface with live smoke coverage | The Build surface now includes metadata reads for domain status, permissions, code tags, report repositories/branches, resource specs, and optional Git-code repositories/branches. |
| Artifact | 31 | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` | Five tools are fully validated; seven routes are unpublished in Beijing 4. The current tenant now exposes a real published file sample at `/codearts-mcp/1.0.0/codearts-mcp.tgz`. |
<!-- GENERATED:module-live-readiness-summary:end -->

## 当前最现实的剩余阻塞

### 1. Pipeline 新增管理面还缺 live 样本

Pipeline 当前不是“没做”，而是“代码和回归测试已经有了，但新加的管理类写路径还没全部完成真实 AK/SK 联调”。

### 2. Deploy execute-class 场景仍依赖专门资源

当前剩下的跳过项主要是：

- 真启动执行
- 真停止执行
- 真回滚执行

这些场景需要显式提供专用 `task_id / record_id / host_group / package_url / service_port`。

### 3. TestPlan 和 Artifact 的一部分缺口来自上游未发布

这类问题的关键不是补代码，而是识别北京四上游路由是否真的已经开放。

## 推荐落地方向

- 要补 live 闭环优先级：`Pipeline -> Deploy execute-class`
- 要做稳定生产使用优先级：`Req / Repo / Check / Build`
- 要继续补齐官方 API 对齐：参考 [Official-API-Alignment](./Official-API-Alignment.md)
