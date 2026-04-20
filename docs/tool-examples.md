# 工具示例

下面这些示例只覆盖当前保留的 `8` 个活跃模块。

## 共享 Session

如果你使用标准区域下的共享 `http + session` 模式，第一步先调用 `auth_configure_session`：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

只有在你的租户确实使用非标准路由时，才需要额外传产品级 `*_base_url` 字段。

## Req

### `req_list_projects`

```json
{
  "page": 1,
  "page_size": 20
}
```

### `req_create_work_item`

```json
{
  "project_id": "project-id",
  "work_item_type": "Epic",
  "title": "demo work item",
  "description": "created from MCP dry run example",
  "dry_run": true
}
```

## Repo

### `repo_list_repositories`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `repo_create_merge_request`

```json
{
  "repository_id": "repository-id",
  "source_branch": "feature/demo",
  "target_branch": "master",
  "title": "demo mr",
  "dry_run": true
}
```

## Pipeline

### `pipeline_list_pipelines`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `pipeline_run_pipeline`

```json
{
  "project_id": "project-id",
  "pipeline_id": "pipeline-id",
  "dry_run": true
}
```

## Check

### `check_list_tasks`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

## TestPlan

### `testplan_list_plans`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

## Deploy

当前默认建议先走经典链路，不要先从 `v4` 开始。

### `deploy_list_apps`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `deploy_get_app`

```json
{
  "application_id": "application-id"
}
```

### `deploy_list_tasks`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `deploy_get_task`

```json
{
  "task_id": "task-id"
}
```

### `deploy_start_app`

```json
{
  "task_id": "task-id",
  "trigger_source": 1,
  "params": [
    {
      "name": "host_group",
      "type": "host_group",
      "value": "host-group-id"
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

### `deploy_get_status`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_get_history_detail`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_get_app_log`

```json
{
  "application_id": "application-id",
  "record_id": "record-id"
}
```

### `deploy_stop_app`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

### `deploy_rollback_app`

```json
{
  "task_id": "task-id",
  "record_id": "record-id"
}
```

## Build

### `build_list_jobs`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `build_run_job`

```json
{
  "job_id": "job-id",
  "branch": "master",
  "dry_run": true
}
```

## Artifact

### `artifact_list_repositories`

```json
{
  "project_id": "project-id",
  "tenant_id": "tenant-id",
  "page": 1,
  "page_size": 20
}
```

### `artifact_delete_file`

```json
{
  "tenant_id": "tenant-id",
  "project_id": "project-id",
  "repo_name": "libs-release",
  "path": "/com/demo/app/1.0.0/app-1.0.0.jar",
  "format": "maven2",
  "dry_run": true
}
```
