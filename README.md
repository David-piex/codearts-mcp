# CodeArts MCP

面向华为云中国站 CodeArts 的统一 MCP 服务。

当前支持：

- `stdio` 本地模式
- `http` 共享部署模式
- 使用华为云 `AK/SK` 直接进行 `SDK-HMAC-SHA256` 签名认证

Wiki 导航：
- `docs/wiki/Home.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Tool-Status-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Check-Live-Validated.md`
- `docs/wiki/Govern-Live-Validated.md`
- `docs/check-live-findings-2026-04-17.md`

## 当前支持的产品

- CodeArts Req / ProjectMan
- CodeArts Repo
- CodeArts Pipeline
- CodeArts Check
- CodeArts TestPlan
- CodeArts Deploy
- CodeArts Build
- CodeArts Artifact
- CodeArts Governance
- CodeArts Inspector
- CodeArts PerfTest

## 当前已接通的工具总览

### 业务工具

- Req：8 个
- Repo：24 个
- Pipeline：16 个
- Check：8 个
- TestPlan：7 个
- Deploy：13 个
- Build：16 个
- Artifact：12 个

业务工具总数：`149`

### 共享模式认证工具

- `auth_configure_session`
- `auth_clear_session`

加上认证工具后的总数：`151`

## 工具能力表

### Req

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `req_list_projects` | 查询项目列表 | 读 |
| `req_get_project` | 查询项目详情 | 读 |
| `req_list_work_items` | 查询工作项列表 | 读 |
| `req_get_work_item` | 查询工作项详情 | 读 |
| `req_create_work_item` | 创建工作项，支持 `dry_run` | 写 |
| `req_update_work_item` | 更新工作项，支持 `dry_run` | 写 |
| `req_list_iterations` | 查询迭代列表 | 读 |
| `req_list_project_members` | 查询项目成员列表 | 读 |

### Repo

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `repo_list_repositories` | 查询仓库列表 | 读 |
| `repo_get_repository` | 查询仓库详情 | 读 |
| `repo_list_branches` | 查询分支列表 | 读 |
| `repo_get_branch` | 查询分支详情 | 读 |
| `repo_list_commits` | 查询提交列表 | 读 |
| `repo_get_commit` | 查询提交详情 | 读 |
| `repo_get_file` | 读取仓库文件内容 | 读 |
| `repo_list_merge_requests` | 查询合并请求列表 | 读 |
| `repo_get_merge_request` | 查询合并请求详情 | 读 |
| `repo_create_merge_request` | 创建合并请求，支持 `dry_run` | 写 |
| `repo_review_merge_request` | 审核合并请求，支持 `dry_run` | 写 |
| `repo_merge_merge_request` | 合并合并请求，支持 `dry_run` | 写 |
| `repo_close_merge_request` | 关闭合并请求，支持 `dry_run` | 写 |
| `repo_list_merge_request_changes` | 查询合并请求改动 | 读 |
| `repo_create_merge_request_discussion` | 创建 MR 讨论，支持 `dry_run` | 写 |
| `repo_list_merge_request_discussions` | 查询 MR 讨论 | 读 |
| `repo_list_protected_branches` | 查询保护分支 | 读 |
| `repo_list_repository_labels` | 查询仓库标签 | 读 |
| `repo_create_tag` | 创建标签，支持 `dry_run` | 写 |
| `repo_delete_tag` | 删除标签，支持 `dry_run` | 写 |
| `repo_list_tags` | 查询标签列表 | 读 |
| `repo_get_tag` | 查询标签详情 | 读 |
| `repo_compare_refs` | 对比分支、标签或提交差异 | 读 |
| `repo_list_events` | 查询仓库事件 | 读 |

### Pipeline

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `pipeline_list_pipelines` | 查询流水线列表 | 读 |
| `pipeline_list_artifacts` | 查询流水线运行产物 | 读 |
| `pipeline_get_pipeline` | 查询流水线详情 | 读 |
| `pipeline_list_runs` | 查询运行记录列表 | 读 |
| `pipeline_get_run` | 查询单次运行详情 | 读 |
| `pipeline_get_run_detail` | 查询运行明细 | 读 |
| `pipeline_get_run_parameters` | 查询运行时参数 | 读 |
| `pipeline_get_run_log` | 查询指定任务步骤日志 | 读 |
| `pipeline_get_manual_review_context` | 查询人工审核上下文 | 读 |
| `pipeline_get_step_outputs` | 查询步骤输出结果 | 读 |
| `pipeline_reject_run` | 驳回人工审核节点，支持 `dry_run` | 写 |
| `pipeline_retry_run` | 重试某次流水线运行，支持 `dry_run` | 写 |
| `pipeline_approve_run` | 通过人工审核节点，支持 `dry_run` | 写 |
| `pipeline_stop_run` | 停止流水线运行，支持 `dry_run` | 写 |
| `pipeline_run_pipeline` | 运行流水线，支持 `dry_run` | 写 |
| `pipeline_list_templates` | 查询流水线模板列表 | 读 |

### Check

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `check_list_tasks` | 查询检查任务列表 | 读 |
| `check_get_task` | 查询检查任务详情 | 读 |
| `check_create_task` | 创建检查任务，支持 `dry_run` | 写 |
| `check_run_task` | 执行检查任务，支持 `dry_run` | 写 |
| `check_stop_task` | 终止检查任务，支持 `dry_run` | 写 |
| `check_list_task_issues` | 查询问题列表 | 读 |
| `check_get_metrics` | 查询指标摘要 | 读 |
| `check_list_rulesets` | 查询规则集列表 | 读 |

### TestPlan

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `testplan_list_plans` | 查询测试计划列表 | 读 |
| `testplan_get_plan` | 查询测试计划详情 | 读 |
| `testplan_list_cases` | 查询测试用例列表 | 读 |
| `testplan_get_case` | 查询测试用例详情 | 读 |
| `testplan_list_runs` | 查询执行记录列表 | 读 |
| `testplan_list_issues` | 查询需求树 | 读 |
| `testplan_run_cases` | 批量执行测试用例，支持 `dry_run` | 写 |

### Deploy

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `deploy_list_apps` | 查询应用列表 | 读 |
| `deploy_list_app_operations_log` | 查询应用操作历史 | 读 |
| `deploy_list_tasks` | 查询部署任务列表 | 读 |
| `deploy_get_app` | 查询应用详情 | 读 |
| `deploy_get_task` | 查询部署任务详情 | 读 |
| `deploy_get_app_log` | 查询应用部署日志 | 读 |
| `deploy_get_execution_params` | 查询部署执行参数 | 读 |
| `deploy_list_histories` | 查询部署历史 | 读 |
| `deploy_get_status` | 查询部署状态 | 读 |
| `deploy_get_history_detail` | 查询部署记录明细 | 读 |
| `deploy_start_app` | 启动部署任务，支持 `dry_run` | 写 |
| `deploy_stop_app` | 停止部署任务，支持 `dry_run` | 写 |
| `deploy_rollback_app` | 回滚到指定部署记录，支持 `dry_run` | 写 |

### Build

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `build_list_jobs` | 查询构建任务列表 | 读 |
| `build_get_job` | 查询构建任务详情 | 读 |
| `build_list_records` | 查询构建记录列表 | 读 |
| `build_get_error_log` | 查询构建失败分析日志 | 读 |
| `build_get_history_details` | 查询构建历史详情 | 读 |
| `build_get_full_stages` | 查询构建完整阶段信息 | 读 |
| `build_get_info_record` | 查询单次构建信息摘要 | 读 |
| `build_get_real_time_log` | 查询构建实时日志 | 读 |
| `build_get_record` | 查询构建记录详情 | 读 |
| `build_get_record_script` | 查询单次构建脚本快照 | 读 |
| `build_list_build_parameters` | 查询构建参数 | 读 |
| `build_list_project_records` | 查询项目级构建记录列表 | 读 |
| `build_get_project_record_statistics` | 查询项目级构建统计 | 读 |
| `build_get_record_flow_graph` | 查询构建记录流程图 | 读 |
| `build_run_job` | 执行构建任务，支持 `dry_run` | 写 |
| `build_stop_job` | 停止构建任务，支持 `dry_run` | 写 |

### Artifact

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `artifact_list_repositories` | 查询制品仓库列表 | 读 |
| `artifact_get_repository` | 查询制品仓库详情 | 读 |
| `artifact_list_files` | 查询制品文件列表 | 读 |
| `artifact_get_file` | 查询制品文件详情 | 读 |
| `artifact_get_download_url` | 查询制品文件下载地址 | 读 |
| `artifact_delete_file` | 删除制品文件，支持 `dry_run` | 写 |
| `artifact_list_build_archives` | 查询构建归档列表 | 读 |
| `artifact_list_versions` | 查询制品版本列表 | 读 |
| `artifact_get_file_tree` | 查询制品仓库目录树 | 读 |
| `artifact_list_latest_version_files` | 查询最新版本文件列表 | 读 |
| `artifact_search_artifacts` | 按名称搜索制品 | 读 |
| `artifact_show_audit` | 查询制品审计日志 | 读 |

### Governance

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `govern_alter_quota_info` | 调整开源治理套餐额度，支持 `dry_run` | 写 |
| `govern_create_task` | 创建开源治理任务，支持 `dry_run` | 写 |
| `govern_create_task_multipart_file` | 创建分片上传任务，支持 `dry_run` | 写 |
| `govern_upload_task_multipart_file` | 上传分片文件，支持 `dry_run` | 写 |
| `govern_notify_task_multipart_file` | 通知分片上传完成，支持 `dry_run` | 写 |
| `govern_stop_task` | 停止开源治理任务，支持 `dry_run` | 写 |
| `govern_delete_task` | 删除开源治理任务，支持 `dry_run` | 写 |
| `govern_get_task_status` | 查询开源治理任务状态 | 读 |
| `govern_get_open_source_summary` | 查询开源漏洞分析统计数据 | 读 |
| `govern_get_open_source_report` | 查询开源漏洞分析报告 | 读 |
| `govern_get_osi_item_detail` | 查询开源软件版本详情 | 读 |
| `govern_get_osi_statistics` | 查询开源软件版本统计信息 | 读 |
| `govern_get_info_leak_summary` | 查询信息泄露扫描统计数据 | 读 |
| `govern_get_sec_compile_summary` | 查询二进制安全编译统计数据 | 读 |
| `govern_get_sec_config_summary` | 查询配置安全扫描统计数据 | 读 |
| `govern_get_quota_info` | 查询开源治理套餐额度 | 读 |
| `govern_create_pdf_report` | 创建 PDF 报告，支持 `dry_run` | 写 |
| `govern_get_pdf_report_status` | 查询 PDF 报告状态 | 读 |
| `govern_download_pdf_report` | 下载 PDF 报告，支持 `dry_run` | 写 |
| `govern_create_excel_report` | 创建 Excel 报告，支持 `dry_run` | 写 |
| `govern_get_excel_report_status` | 查询 Excel 报告状态 | 读 |
| `govern_download_excel_report` | 下载 Excel 报告，支持 `dry_run` | 写 |
| `govern_list_osi_item_names` | 分页查询开源软件名称列表 | 读 |
| `govern_list_osi_item_versions` | 分页查询开源软件版本列表 | 读 |
| `govern_list_osi_item_vulns` | 查询开源软件版本漏洞列表 | 读 |
| `govern_list_sbc_vuln_map` | 查询漏洞影响组件映射 | 读 |
| `govern_get_vuln_info` | 查询漏洞详情 | 读 |
| `govern_get_user_info` | 查询治理用户信息 | 读 |

说明：
- 当前 `Governance` 已实现 `28` 个 MCP 工具。
- `govern_list_tasks` 仍未加入，因为官方权限名可见，但公开文档和真实探测都还没有确认可信的正式 URI。

### Inspector

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `inspector_list_domains` | 查询网站资产列表 | 读 |
| `inspector_get_task` | 查询网站扫描任务详情 | 读 |
| `inspector_list_task_histories` | 查询网站历史扫描记录 | 读 |
| `inspector_list_results` | 查询网站漏洞结果列表 | 读 |
| `inspector_list_ports` | 查询网站开放端口列表 | 读 |
| `inspector_list_business_risks` | 查询网站业务风险列表 | 读 |
| `inspector_get_report_status` | 查询网站扫描报告状态 | 读 |

### PerfTest

| 工具名 | 说明 | 类型 |
| --- | --- | --- |
| `perftest_list_projects` | 查询性能测试工程列表 | 读 |
| `perftest_get_project` | 查询性能测试工程详情 | 读 |
| `perftest_list_tasks` | 查询性能测试任务列表 | 读 |
| `perftest_get_task` | 查询性能测试任务详情 | 读 |
| `perftest_list_variables` | 查询性能测试变量列表 | 读 |
| `perftest_list_task_cases` | 查询性能测试任务关联用例列表 | 读 |
| `perftest_list_latest_runs` | 查询性能测试任务最近运行记录 | 读 |
| `perftest_list_offline_reports` | 查询性能测试离线报告列表 | 读 |
| `perftest_get_report` | 查询性能测试报告详情 | 读 |

## 环境变量

复制 `.env.example` 为 `.env`，至少按需配置以下变量：

- `HUAWEICLOUD_BASE_URL`
- `HUAWEICLOUD_REGION`
- `HUAWEICLOUD_AK`
- `HUAWEICLOUD_SK`
- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`
- `HUAWEICLOUD_CHECK_BASE_URL`
- `HUAWEICLOUD_TESTPLAN_BASE_URL`
- `HUAWEICLOUD_DEPLOY_BASE_URL`
- `HUAWEICLOUD_BUILD_BASE_URL`
- `HUAWEICLOUD_ARTIFACT_BASE_URL`
- `HUAWEICLOUD_GOVERN_BASE_URL`
- `HUAWEICLOUD_INSPECTOR_BASE_URL`
- `HUAWEICLOUD_PERFTEST_BASE_URL`
- `MCP_TRANSPORT`
- `MCP_HTTP_PORT`
- `MCP_SERVER_NAME`
- `MCP_SERVER_VERSION`

推荐的中国站默认地址：

```env
HUAWEICLOUD_BASE_URL=https://codearts.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REPO_BASE_URL=https://codehub-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_PIPELINE_BASE_URL=https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_CHECK_BASE_URL=https://codecheck-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_TESTPLAN_BASE_URL=https://cloudtest-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_DEPLOY_BASE_URL=https://codearts-deploy.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_BUILD_BASE_URL=https://cloudbuild-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_ARTIFACT_BASE_URL=https://artifact.cn-north-4.myhuaweicloud.cn
HUAWEICLOUD_GOVERN_BASE_URL=https://devsecurity.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_INSPECTOR_BASE_URL=https://vss.myhuaweicloud.com
HUAWEICLOUD_PERFTEST_BASE_URL=https://cpts.cn-north-4.myhuaweicloud.com
```

使用提醒：

- `HUAWEICLOUD_INSPECTOR_BASE_URL` 在北京四应使用 `https://vss.myhuaweicloud.com`，不要拼接区域子域名。
- `perftest_*` 工具里的 `project_id` 使用区域 IAM project id，不是 CodeArts 项目 UUID。
- `testplan_*` 工具要求目标项目已开通 CodeArts TestPlan；未开通时当前租户会返回 `CLOUDTEST.00012003`。
- `perftest_*` 工具要求账号已开通 CodeArts PerfTest；未开通时当前租户会返回 `SVCSTG.CPTS.4031009`。

## 运行模式

### `stdio` 模式

适合：

- 本地单人开发
- 本地调试
- 直接在 IDE / 编码工具里启动

特点：

- 直接使用进程启动时注入的 `HUAWEICLOUD_AK` / `HUAWEICLOUD_SK`
- 不需要额外的会话认证工具
- 最适合个人使用

启动方式：

```bash
npm run dev
```

构建后运行：

```bash
npm run build
node dist/src/server/index.js
```

### `http` 共享模式

适合：

- 团队共享部署
- 统一维护一个 MCP 服务
- 每个人使用自己的华为云权限

启动方式：

```bash
set MCP_TRANSPORT=http
npm run dev:http
```

构建后运行：

```bash
set MCP_TRANSPORT=http
node dist/src/server/index.js
```

该模式暴露的接口：

- `GET /health`
- `GET /mcp`
- `POST /mcp`
- `DELETE /mcp`

## 共享模式下的调用顺序

在 `http` 共享模式下，推荐每个用户都按下面顺序使用：

1. 先调用 `auth_configure_session`
2. 再调用具体业务工具
3. 结束时可调用 `auth_clear_session`

`auth_configure_session` 需要提供：

- `access_key`
- `secret_key`
- `region`
- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `check_base_url`
- `testplan_base_url`
- `deploy_base_url`
- `build_base_url`
- `artifact_base_url`
- `govern_base_url`
- `inspector_base_url`
- `perftest_base_url`

这意味着多人共享部署时可以做到：

- 服务端统一部署一次
- 每个用户使用自己的华为云账号权限
- 不同用户之间凭证彼此隔离
- 服务端不必保存所有人的全局业务凭证

## 编码工具接入建议

更完整的通用客户端配置示例见：

- `docs/service-profile.md`
- `docs/live-readiness-checklist.md`
- `docs/live-readiness-checklist.en.md`
- `docs/wiki/Home.md`
- `docs/product-overview.md`
- `docs/client-examples.md`
- `docs/quickstart.md`
- `docs/tool-examples.md`
- `docs/faq.md`
- `docs/release-checklist.md`

### 个人本地接入

优先使用 `stdio` 模式，并在启动命令环境变量中写入：

```env
HUAWEICLOUD_AK=...
HUAWEICLOUD_SK=...
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REPO_BASE_URL=https://codehub-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_PIPELINE_BASE_URL=https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com
```

### 团队共享接入

优先使用 `http` 模式统一部署。

每个成员分别准备自己的：

```env
HUAWEICLOUD_AK=...
HUAWEICLOUD_SK=...
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_REQ_BASE_URL=...
HUAWEICLOUD_REPO_BASE_URL=...
HUAWEICLOUD_PIPELINE_BASE_URL=...
```

这些值不需要写进服务端全局环境，而是由客户端通过 `auth_configure_session` 注入到当前 MCP 会话。

## 典型使用场景

### 查项目和工作项

可组合使用：

- `req_list_projects`
- `req_get_project`
- `req_list_work_items`
- `req_get_work_item`

### 查仓库和代码历史

可组合使用：

- `repo_list_repositories`
- `repo_get_repository`
- `repo_list_branches`
- `repo_list_commits`
- `repo_get_commit`
- `repo_get_file`

### 查合并请求

可组合使用：

- `repo_list_merge_requests`
- `repo_get_merge_request`

### 查流水线与运行记录

可组合使用：

- `pipeline_list_pipelines`
- `pipeline_get_pipeline`
- `pipeline_list_runs`
- `pipeline_get_run`
- `pipeline_list_templates`

### 发起写操作

目前支持：

- `req_create_work_item`
- `req_update_work_item`
- `pipeline_run_pipeline`

这三个工具都支持 `dry_run`，适合先让模型做预演，再决定是否真正执行。

## 部署方式

### Docker

构建并运行：

```bash
docker build -t codearts-mcp .
docker run -p 3000:3000 ^
  -e MCP_TRANSPORT=http ^
  -e MCP_HTTP_PORT=3000 ^
  -e MCP_SERVER_NAME=codearts-mcp ^
  -e MCP_SERVER_VERSION=0.1.0 ^
  codearts-mcp
```

如果你希望服务端本身也带固定凭证运行 `stdio` 或内部调试任务，再额外传入对应华为云环境变量。

### PM2

先构建：

```bash
npm install
npm run build
```

再启动：

```bash
pm2 start ecosystem.config.cjs
```

### Docker Compose + Nginx

如果希望同时启动 MCP 服务和反向代理：

```bash
docker compose up -d --build
```

默认使用：

- `deploy/nginx/codearts-mcp.conf`

代理路径：

- `/health`
- `/mcp`

### HTTPS Nginx 模板

如果希望由 nginx 直接终止 TLS，可使用：

- `deploy/nginx/codearts-mcp-ssl.conf`

证书文件默认路径：

- `deploy/nginx/ssl/fullchain.pem`
- `deploy/nginx/ssl/privkey.pem`

## 验证命令

- `npm test`
- `npm run build`

## 当前实现说明

- 认证方式不是先换取 token，而是直接用 `AK/SK` 对请求做华为云签名
- `stdio` 模式适合单人本地使用
- `http` 模式适合团队共享部署，并通过 MCP 会话隔离每个用户的凭证
- 当前已覆盖 Req、Repo、Pipeline、Check、TestPlan、Deploy、Build、Artifact 八个产品的核心能力
