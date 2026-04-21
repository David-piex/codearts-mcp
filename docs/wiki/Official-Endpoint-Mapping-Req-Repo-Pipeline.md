# Official Endpoint Mapping: Req / Repo / Pipeline

这页继续往下细化:

不仅回答“模块整体对齐到什么程度”, 还回答“当前主链 MCP 工具分别对应官方 PDF 里的哪个接口能力”。

当前范围只覆盖三个最值得继续补齐的模块:

- Req
- Repo
- Pipeline

其余 5 个模块的补完页见:

- `Official-Endpoint-Mapping-Check-Build-Deploy-Artifact-TestPlan.md`

说明:

- 这里的 `Direct` 表示 MCP 工具和官方 operation 基本是 1:1 能力映射。
- `Derived` 表示 MCP 工具复用了同一官方能力族, 但做了二次整形、路径兼容或结果提炼。
- `Composite` 表示 MCP 工具是从一个或多个官方接口结果里提炼出的更高层上下文工具。

## Req

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `req_list_projects` | `ListProjectsV4` | Direct | `GET /v4/projects` | 项目列表主链直映射 |
| `req_get_project` | `ShowProjectInfoV4` | Direct | `GET /v4/projects/{project_id}` | provider 会把业务对象包在顶层 `project` 字段里, MCP 已做归一化 |
| `req_list_project_members` | `ListProjectMembersV4` | Direct | `GET /v4/projects/{project_id}/members` | 项目成员读取主链 |
| `req_list_iterations` | `ListProjectIterationsV4` | Direct | `GET /v4/projects/{project_id}/iterations` | 迭代主链 |
| `req_list_work_items` | `ListIssuesSfV4` / `ListIssuesV4` | Derived | `GET /v4/projects/{project_id}/issues` | 当前真实已发布读链走 `/issues`, 不是旧的 `/work-items` 家族 |
| `req_get_work_item` | `ShowIssueV4` | Derived | `GET /v4/projects/{project_id}/issues/{work_item_id}` | 真实 provider 已验证走 `/issues/{id}` |
| `req_create_work_item` | `CreateIssueV4` | Derived | `POST /v4/projects/{project_id}/issue` | MCP 额外做了 `priority_id` 默认值兼容 |
| `req_update_work_item` | `UpdateIssueV4` | Derived | `PUT /v4/projects/{project_id}/issues/{work_item_id}` | 更新主链和详情/列表保持同一 `issues` 业务族 |

## Pipeline

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `pipeline_list_templates` | `ListPipelineTemplates` | Direct | `POST /v5/{tenant_id}/api/pipeline-templates/list` | 模板列表 |
| `pipeline_list_pipelines` | `ListPipelines` | Direct | `POST /v5/{project_id}/api/pipelines/list` | 项目下流水线列表 |
| `pipeline_get_pipeline` | `ShowPipelineDetail` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}` | 流水线详情 |
| `pipeline_list_runs` | `ListPipelineRuns` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/list` | 执行记录列表 |
| `pipeline_get_run` | `ShowPipelineRunDetail` | Derived | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | MCP 只取 run detail 的较轻量子集 |
| `pipeline_get_run_detail` | `ShowPipelineRunDetail` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | 保留 stages / jobs / steps 层级结构 |
| `pipeline_run_pipeline` | `RunPipeline` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/run` | 启动流水线 |
| `pipeline_stop_run` | `StopPipelineRun` | Direct | `POST /v5/pipelines/{pipeline_id}/pipeline-runs/{run_id}/stop` | 停止执行 |
| `pipeline_retry_run` | `RetryPipelineRun` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/retry` | 重试执行 |
| `pipeline_approve_run` | `AcceptManualReview` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/pass` | 人工审核通过 |
| `pipeline_reject_run` | `RejectManualReview` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/reject` | 人工审核驳回 |
| `pipeline_get_run_parameters` | `ListRuntimeVars` | Derived | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/run-variables` | 失败时会回退到 `list-runtime-vars` 兼容路径 |
| `pipeline_get_run_log` | `ShowPipelineLog` | Direct | `POST /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/jobs/{job_id}/steps/{step_id}/logs` | 步骤日志 |
| `pipeline_get_step_outputs` | `ShowStepOutputs` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/step-outputs` | 步骤输出 |
| `pipeline_list_artifacts` | `ShowPipelineArtifacts` | Direct | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/{run_id}/artifacts` | 构建产物 |
| `pipeline_get_manual_review_context` | `ShowPipelineRunDetail` | Composite | `GET /v5/{project_id}/api/pipelines/{pipeline_id}/pipeline-runs/detail?pipeline_run_id={run_id}` | 这个工具不是官方单个 endpoint 的直接翻版, 而是从 run detail 里提炼待审核步骤上下文 |

## Repo

### 仓库 / 分支 / 提交 / 文件 / 标签

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `repo_list_repositories` | `ListProjectRepositories` | Direct | `GET /v4/projects/{project_id}/repositories` | 项目下仓库列表 |
| `repo_get_repository` | `ShowRepository` | Direct | `GET /v4/repositories/{repository_id}` | 仓库详情 |
| `repo_list_branches` | `ListBranches` | Direct | `GET /v4/repositories/{repository_id}/repository/branches` | 分支列表 |
| `repo_get_branch` | `ShowBranch` | Direct | `GET /v4/repositories/{repository_id}/repository/branch?branch_name=...` | 分支详情 |
| `repo_list_commits` | `ListCommits` | Direct | `GET /v2/projects/{repository_id}/repository/commits` | provider 当前仍走 legacy `v2` 提交路径 |
| `repo_get_commit` | `ShowCommit` | Direct | `GET /v2/projects/{repository_id}/repository/commits/{commit_sha}` | 提交详情 |
| `repo_get_file` | `ShowBlobs` | Direct | `GET /v2/projects/{repository_id}/repository/files?file_path=...&ref=...` | 文件内容读取 |
| `repo_compare_refs` | `ShowRefCompare` | Direct | `GET /v4/repositories/{repository_id}/compare?from=...&to=...` | ref/branch/tag/commit compare |
| `repo_list_tags` | `ListTags` | Direct | `GET /v2/repositories/{repository_id}/tags` | 标签列表 |
| `repo_get_tag` | `ShowTag` | Direct | `GET /v4/repositories/{repository_id}/repository/tag?tag_name=...` | 标签详情 |
| `repo_create_tag` | `CreateTag` | Direct | `POST /v2/repositories/{repository_id}/tags` | 标签创建 |
| `repo_delete_tag` | `DeleteTag` | Direct | `DELETE /v2/repositories/{repository_id}/tags/{tag_name}` | 标签删除 |
| `repo_list_events` | `ListRepositoryEvents` | Direct | `GET /v4/repositories/{repository_id}/events` | 仓库动态 |
| `repo_list_protected_branches` | `ListProtectedBranches` | Direct | `GET /v4/repositories/{repository_id}/protected-branches` | 保护分支列表 |
| `repo_list_repository_labels` | `ListRepositoryLabels` | Direct | `GET /v4/repositories/{repository_id}/labels` | 仓库标签列表 |

### Merge Request / Discussion / Review

| MCP Tool | Official Operation | Mapping | Actual Provider Path | Notes |
| --- | --- | --- | --- | --- |
| `repo_list_merge_requests` | `ListRepositoryMergeRequests` | Direct | `GET /v4/repositories/{repository_id}/merge-requests` | MR 列表 |
| `repo_get_merge_request` | `ShowMergeRequestDetail` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}` | MR 详情 |
| `repo_create_merge_request` | `CreateMergeRequest` | Direct | `POST /v4/repositories/{repository_id}/merge-requests` | 创建 MR |
| `repo_close_merge_request` | `UpdateMergeRequest` | Derived | `PUT /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}` | 当前通过 update 语义把 MR 置为关闭态 |
| `repo_merge_merge_request` | `MergeMergeRequest` | Direct | `PUT /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/merge` | 合入 MR |
| `repo_review_merge_request` | `ReviewMergeRequest` | Direct | `POST /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/approval` | 审核 / 拒绝 / reset |
| `repo_list_merge_request_changes` | `ListMergeRequestChanges` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/changes` | MR 变更列表 |
| `repo_list_merge_request_discussions` | `ListMergeRequestDiscussions` | Direct | `GET /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/discussions` | 检视意见列表 |
| `repo_create_merge_request_discussion` | `CreateMergeRequestDiscussion` | Direct | `POST /v4/repositories/{repository_id}/merge-requests/{merge_request_iid}/discussions` | 创建 MR 检视意见 |

## 这页怎么用

如果你现在要判断“下一步该补哪些官方接口”, 推荐这样读:

1. 先看 `Official-API-Alignment.md`
   - 判断模块整体差距
2. 再看 `Official-Category-Coverage-Matrix.md`
   - 判断差距主要集中在哪些大类
3. 最后看这页
   - 判断当前主链工具和官方 operation 的逐项对应关系

## 当前仍然没有做的事

这页现在只剩下三类未覆盖内容:

- Req / Repo / Pipeline 的外围非主链接口逐项映射
- “官方 operation -> 当前未实现原因 -> 推荐优先级”的全量 backfill 表
- 更细的页码级索引、章节回链和优先级路线图

如果继续补, 最有价值的顺序仍然是:

1. Pipeline 外围管理面
2. Repo webhook / group / permission 面
3. Req 的 Scrum / IPD 非主链能力
