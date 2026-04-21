# Check 真实验证记录

最后更新：`2026-04-17`

区域：`cn-north-4`

Base URL：`https://codecheck-ext.cn-north-4.myhuaweicloud.com`

已使用真实 `AK/SK`、真实端点和真实租户数据验证。

## 中文速读

- `Check` 当前已经是完整闭环模块
- 当前 `8` 个工具都已经拿到真实验证样本
- 这一轮最关键的真实兼容点主要有 4 个：
  - `check_create_task` 需要使用文档要求的 payload 结构
  - CodeHub 仓库创建路径验证使用的是 SSH `git_url`，不是 HTTPS
  - `check_run_task` / `check_stop_task` 需要显式发送 `{}` 请求体
  - `check_list_task_issues` 真实可用路由是 `/defects-detail`，不是 `/issues`
- `check_get_metrics` 也已经确认真实环境下走的是 project-scoped 路由

仓库中的 live-smoke 入口：

- `tests/products/check/client-live-smoke.test.ts`

## 工具状态

| Tool | Status | Evidence |
| --- | --- | --- |
| `check_list_tasks` | Validated | 返回了真实非空任务列表 |
| `check_list_rulesets` | Validated | 返回了真实非空规则集列表 |
| `check_create_task` | Validated | 使用 CodeHub SSH `git_url` 成功创建了真实任务 |
| `check_run_task` | Validated | 显式发送 `{}` 后真实触发成功 |
| `check_stop_task` | Validated | 真实停止成功；provider 返回 `200` + 空 body |
| `check_get_task` | Validated | 在一次真实检查完成后返回真实摘要字段 |
| `check_get_metrics` | Validated | 已确认真实路由是 `/v2/{project_id}/tasks/{task_id}/metrics-summary` |
| `check_list_task_issues` | Validated | 已确认真实路由是 `defects-detail`；并观测到非空和空成功两种真实响应 |

## 关键真实发现

- `check_create_task` 必须使用文档要求的 payload 结构：
  - `check_type: ["source"]`
  - `rule_sets` 或 `language[]`
- CodeHub 仓库创建路径验证用的是 SSH `git_url`，不是 HTTPS
- `check_run_task` 和 `check_stop_task` 需要把 `{}` 作为请求体发送
- `check_stop_task` 的真实成功响应可能是空 body
- `check_get_task` 读取的是 `defects-summary`，但真实成功 payload 是顶层对象
- `check_get_metrics` 在真实环境下是 project-scoped 路由
- `check_list_task_issues` 必须走 `/defects-detail`，不能走 `/issues`

## 真实样本 id

- 带真实问题数据的既有任务：
  - `d5026e942a7b4d639f4ea6369f45a6f5`
- 新创建的干净任务：
  - `db8b9d30a38e45c09ab61dc9cf392844`

## 建议的 live-smoke 环境变量覆盖项

- `HUAWEICLOUD_CHECK_LIVE_PROJECT_ID`
- `HUAWEICLOUD_CHECK_LIVE_TASK_ID`

## 相关文档

- [Home](./Home.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Testing and Live Ops](./Testing-and-Live-Ops.md)
