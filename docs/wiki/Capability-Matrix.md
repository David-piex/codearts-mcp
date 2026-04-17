# Capability Matrix

基于当前仓库实现、单元测试覆盖情况，以及 `2026-04-17` 在北京四 `cn-north-4` 的真实联调结果，对 11 个 CodeArts 技术模块做能力矩阵整理。

## Legend

- `Read`: 已实现的只读工具数
- `Write`: 已实现的写工具数
- `Live`: 当前真实环境状态
- `Key Gaps`: 当前仍明确存在的关键缺口

## Matrix

| Module | Read | Write | Live | Key Gaps |
| --- | --- | --- | --- | --- |
| Req | 6 | 2 | Validated | 当前暴露范围内无明确闭环缺口 |
| Repo | 17 | 7 | Validated | 当前暴露范围内无明确闭环缺口 |
| Pipeline | 10 | 6 | Validated | 可继续补更多非空 live 样本，但无结构性缺口 |
| Check | 5 | 3 | Validated | 工具级真实闭环已完成，详见 `docs/wiki/Check-Live-Validated.md` |
| TestPlan | 6 | 1 | Empty-but-validated | 当前租户未开通 TestPlan |
| Deploy | 10 | 3 | Empty-but-validated | 当前租户缺少真实 deploy apps/tasks/histories |
| Build | 14 | 2 | Empty-but-validated | 当前租户缺少真实 build jobs/records |
| Artifact | 11 | 1 | Empty-but-validated | 当前租户缺少真实 artifact repositories/versions/files |
| Govern | 20 | 8 | Partial | `govern_list_tasks` URI 未确认；`sbc/osi/item/dependency` 当前环境未发布 |
| Inspector | 7 | 0 | Empty-but-validated | 当前租户缺少真实 domain/task 样本 |
| PerfTest | 9 | 0 | Empty-but-validated | 当前账号未开通 PerfTest |

## Check Update

CodeArts Check 当前已完成真实工具级闭环验证，已确认：

- `check_create_task`
- `check_run_task`
- `check_stop_task`
- `check_get_task`
- `check_get_metrics`
- `check_list_task_issues`
- `check_list_tasks`
- `check_list_rulesets`

详见：

- `docs/wiki/Check-Live-Validated.md`
- `docs/check-live-findings-2026-04-17.md`

## Govern Detail

当前 Govern 已实现能力：

- Task lifecycle: `create/start/stop/delete/status`
- Multipart upload: `create/upload/notify`
- Report flow: `pdf/excel create/status/download`
- Summary & report: `open source / info leak / sec compile / sec config`
- Quota: `get / alter`
- Vulnerability & user: `vuln info / vuln map / user info`
- OSI: `statistics / item names / item versions / item detail / item vulns`

当前 Govern 明确未做：

- `govern_list_tasks`
  - 权限名可见，但公开文档和真实探测仍没有可信正式 URI
- `sbc/osi/item/dependency`
  - 官方 PDF 权限矩阵里出现过
  - 但北京四真实环境当前仍返回 `APIGW.0101`

当前 Govern 输入约束里需要特别注意：

- `govern_get_osi_item_detail`
- `govern_list_osi_item_vulns`

这两项当前建议使用 `software_name + software_version`。只传 `artifact_id` 在北京四真实环境仍会报 `group_id` 缺失，所以当前仓库没有把 artifact-only 形态当作可用输入。

## How To Use This Page

如果你的目标是“判断模块是否已经可用于日常协作”，优先看：

1. `Live`
2. `Key Gaps`

如果你的目标是“继续追到每个子功能 / 每个 MCP tool 的完成度”，继续看：

1. `docs/wiki/Tool-Status-Matrix.md`
2. `docs/wiki/Check-Live-Validated.md`

如果你的目标是“决定下一步继续开发什么”，推荐顺序是：

1. 先补“官方已确认且环境已发布”的缺口
2. 再补“实现已完成但缺更多非空 live 样本”的模块
3. 最后再考虑纯扩展型能力
