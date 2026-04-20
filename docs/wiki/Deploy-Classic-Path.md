# Deploy 经典链路用法

这页面向真正要开始用 `Deploy` 的人。

当前北京四 `cn-north-4` 下，推荐默认先走经典链路，不要先从 `v4` 开始。

原因很简单：

- 经典链路已经有真实 `AK/SK` 成功样本
- `v4` 路由虽然大部分已实现，但当前租户里很多仍缺正样本
- 你如果一上来就试 `v4`，更容易遇到空列表、拿不到可用 id、或只能 `dry_run`

## 先用哪些工具

推荐按这个顺序用：

1. `deploy_list_apps`
2. `deploy_get_app`
3. `deploy_list_tasks`
4. `deploy_get_task`
5. `deploy_start_app`
6. `deploy_get_status`
7. `deploy_get_history_detail`
8. `deploy_get_app_log`
9. `deploy_stop_app`
10. `deploy_rollback_app`

如果你还要查环境和主机，再补：

- `deploy_list_environments`
- `deploy_list_environment_hosts`
- `deploy_list_histories`

## 一条最稳的使用路径

### 1. 先找应用

先拿应用列表：

```json
{
  "project_id": "your-project-id",
  "page": 1,
  "page_size": 20
}
```

对应工具：

- `deploy_list_apps`

拿到 `application_id` 之后，再看应用详情：

```json
{
  "application_id": "your-application-id"
}
```

对应工具：

- `deploy_get_app`

### 2. 再找任务

```json
{
  "project_id": "your-project-id",
  "page": 1,
  "page_size": 20
}
```

对应工具：

- `deploy_list_tasks`

这一步当前按项目维度列任务；拿到返回结果后，再根据返回里的 `applicationId` / `name` 对齐到目标应用即可。

拿到 `task_id` 后，再看任务详情：

```json
{
  "task_id": "your-task-id"
}
```

对应工具：

- `deploy_get_task`

### 3. 执行前先做一次 `dry_run`

这是当前最推荐的习惯。

```json
{
  "task_id": "your-task-id",
  "trigger_source": 1,
  "params": [
    {
      "name": "host_group",
      "type": "host_group",
      "value": "your-host-group-id"
    },
    {
      "name": "package_url",
      "type": "text",
      "value": "/codearts-mcp/1.0.0/codearts-mcp.tgz"
    },
    {
      "name": "service_port",
      "type": "text",
      "value": "3000"
    }
  ],
  "dry_run": true
}
```

对应工具：

- `deploy_start_app`

当前已验证过的健康 Node.js 样本里，最常见的运行参数就是：

- `host_group`
- `package_url`
- `service_port`

### 4. 真正执行启动

确认 `dry_run` 结果没问题后，再去掉 `dry_run`：

```json
{
  "task_id": "your-task-id",
  "trigger_source": 1,
  "params": [
    {
      "name": "host_group",
      "type": "host_group",
      "value": "your-host-group-id"
    },
    {
      "name": "package_url",
      "type": "text",
      "value": "your-real-package-path"
    },
    {
      "name": "service_port",
      "type": "text",
      "value": "3000"
    }
  ]
}
```

执行成功后，通常会拿到新的部署记录 id。

### 5. 启动后不要盲猜，直接查记录

推荐按这个顺序查：

先看状态：

```json
{
  "task_id": "your-task-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_get_status`

再看记录详情：

```json
{
  "task_id": "your-task-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_get_history_detail`

最后看应用日志：

```json
{
  "application_id": "your-application-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_get_app_log`

如果你不确定这次启动到底需要哪些运行参数，可以再查：

```json
{
  "task_id": "your-task-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_get_execution_params`

## 停止和回滚怎么做

### 停止

```json
{
  "task_id": "your-task-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_stop_app`

### 回滚

```json
{
  "task_id": "your-task-id",
  "record_id": "your-record-id"
}
```

对应工具：

- `deploy_rollback_app`

## 什么时候再去碰 `v4`

只有下面这种情况，才建议再看 `v4`：

- 你已经把经典链路跑通
- 你明确需要 `v4` 记录级操作
- 你接受当前租户里 `v4` 仍可能缺正样本

如果你的目标只是：

- 列应用
- 查任务
- 启动部署
- 看状态
- 看日志
- 停止
- 回滚

那就先别碰 `v4`。

## 当前最重要的边界

当前 `Deploy` 的主要问题，不再是“控制面没打通”，而是“某些模板本身老旧”。

尤其是旧 Node.js 模板路径，当前真实阻塞点在：

- `Node v10.9.0`
- `forever`

所以你如果遇到的情况是：

- 应用能列出来
- 任务能列出来
- 启动也能创建记录
- 但执行卡在模板步骤

优先理解成模板/runtime 问题，不是 MCP 工具没实现。
