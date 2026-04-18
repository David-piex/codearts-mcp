# Tool Examples

The examples below only cover the current `8` active modules.

## Shared Session

For shared `http + session` mode in a standard region, start with `auth_configure_session`:

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

Only add product `*_base_url` fields if your tenant really uses non-standard routes.

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
  "subject": "demo work item",
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
  "project_id": "project-id",
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

### `deploy_list_apps`

```json
{
  "project_id": "project-id",
  "page": 1,
  "page_size": 20
}
```

### `deploy_start_app`

```json
{
  "project_id": "project-id",
  "application_id": "application-id",
  "dry_run": true
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
