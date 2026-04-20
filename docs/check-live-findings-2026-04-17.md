# Check 模块真实验证记录（2026-04-17）

这份记录用于说明 CodeArts Check 模块在 `cn-north-4` 下最近一轮真实环境验证的结果。

## 验证环境

- Region: `cn-north-4`
- Base URL: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- 验证日期: `2026-04-17`
- 本轮探测使用的真实任务 id: `d5026e942a7b4d639f4ea6369f45a6f5`

## 当前结论

- `check_list_tasks`
  - 真实请求成功，并返回了非空任务数据
- `check_list_rulesets`
  - 真实请求成功，并返回了非空规则集数据
- `check_create_task`
  - 现在已经能对真实 CodeHub SSH 仓库 URL 成功创建任务
- `check_run_task`
  - 把请求体从 `null` 改为发送空 JSON 后，真实调用成功
- `check_stop_task`
  - 对真实运行中的任务已经可以成功停止
  - provider 的真实成功响应形态是 `200` + 空 body
- `check_get_task`
  - 在一次真实检查执行完成后可成功返回顶层任务摘要字段
- `check_list_task_issues`
  - client 路径已从 `/issues` 修正为 `/defects-detail`
  - 现在能对现有任务返回真实缺陷数据，并对新创建的干净任务返回空成功结果
- `check_get_metrics`
  - `cn-north-4` 下真实路由是 `/v2/{project_id}/tasks/{task_id}/metrics-summary`
  - 在提供 `project_id` 后已可成功调用

## 本轮代码变更

- `src/products/check/client.ts`
  - `check_create_task` 现在发送文档要求的 payload 结构：
    - `check_type: ["source"]`
    - `rule_sets` or `language[]`
    - CodeHub 创建路径已用 SSH `git_url` 验证
  - `check_run_task` 和 `check_stop_task`
    - 现在发送 `{}`
    - 以满足 provider 对请求体的要求
  - `check_stop_task`
    - 现在兼容真实成功响应形态：`200` + 空 body
  - `check_list_task_issues`
    - 现在使用：
    - `/v2/tasks/{task_id}/defects-detail`
  - 增加了对文档化 defect payload 字段的兼容处理，例如：
    - `defect_id`
    - `defect_level`
    - `line_number`
  - `check_get_task`
    - 现在映射真实顶层 defects-summary payload
  - `check_get_metrics`
    - 现在使用真实的 project-scoped 路由，并映射顶层 `metric_info`

## 本轮新增测试

- `tests/products/check/client.test.ts`
  - 验证 create-task payload 规范化
  - 验证 run/stop 请求体
  - 验证 stop 空响应会回退到输入的 `task_id`
  - 验证 `defects-detail` 请求路径
  - 验证 defect payload 到 MCP issue items 的映射
  - 验证 project-scoped metrics 路由选择
  - 验证顶层 task-summary 和 metric-info 的映射
- `tests/core/http/client.test.ts`
  - 验证成功的空响应会被视为 `null`

## 真实探测摘要

- `GET /v2/tasks/{task_id}/defects-summary`
  - 在一次真实检查执行完成后成功
- `GET /v2/tasks/{task_id}/defects-detail`
  - 把路径修正为 `defects-detail` 后成功
- `GET /v2/{project_id}/tasks/{task_id}/metrics-summary`
  - 切到 project-scoped 路由后成功
- `POST /v2/tasks/{task_id}/run`
  - 发送 `{}` 后成功
- `POST /v2/tasks/{task_id}/stop`
  - 在真实 `200` 空 body 响应下成功
- `POST /v2/{project_id}/task`
  - 使用 CodeHub SSH `git_url` 成功

## 当前文档结论

当前 Check 模块下面这些工具都可以视为“工具级真实验证完成”：

- `check_create_task`
- `check_run_task`
- `check_stop_task`
- `check_get_task`
- `check_list_task_issues`
- `check_get_metrics`
- `check_list_tasks`
- `check_list_rulesets`
