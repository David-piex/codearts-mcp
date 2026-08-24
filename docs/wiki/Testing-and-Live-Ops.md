# Testing and Live Ops

这页讲的是“怎么验证这个项目是真的可用”，不是只看 unit test。

## 测试分层

项目当前至少有 4 层验证：

### 1. 单元测试

目标：

- 验证 schema、tool handler、格式转换、错误包装
- 保证新增工具不会把基础行为弄坏

常用命令：

```bash
npm test
```

### 2. 服务层集成测试

目标：

- 验证 `stdio / http` 入口
- 验证 auth/session、工具注册、限流、写路径封装
- 覆盖 `create-server.ts`、`http-app.ts`、`session-aware-product-handlers.ts` 这些关键桥接层

### 3. Live smoke

目标：

- 用真实 AK/SK 验证核心读路径和受控写路径
- 确认不是“本地模拟可过”，而是真能碰到上游 CodeArts 服务

当 live 用例只是缺少租户当前非空样本时，统一使用 `tests/live-sample-helpers.ts` 走 soft-pass 路径。它会输出 `[live-soft-pass]` 说明并跳过依赖样本的后续断言；鉴权失败、状态码失败和返回结构回归仍然按失败处理。

### 4. 高风险 execute-class live

目标：

- 真正执行 Deploy 启动、停止、回滚等高风险动作
- 这类用例默认需要显式环境变量，不会在普通 live smoke 下直接跑

## 常用命令

```bash
npm run check
npm run test:live
npm run tool-manifest:check
npm run stats:check-docs
npm run probe:edge
```

Windows 本机 Node/npm 包装脚本：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\npmw.ps1 run check
powershell -ExecutionPolicy Bypass -File .\scripts\npmw.ps1 run test:live
powershell -ExecutionPolicy Bypass -File .\scripts\nodew.ps1 .\dist\src\server\cli.js schema req_get_work_item_issue_details
```

如果你需要在当前 PowerShell 会话里直接运行 `tsx`、`vitest`、`eslint`，先执行：

```powershell
. .\scripts\use-local-node.ps1
```

如果你想直接打开一个已经切好本机 Node/npm 的新终端，执行：

```powershell
.\scripts\dev-shell.cmd
```

## Live 联调最小环境变量

通用变量：

```env
HUAWEICLOUD_AK=...
HUAWEICLOUD_SK=...
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_BASE_URL=https://codearts.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REPO_BASE_URL=https://codehub-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_PIPELINE_BASE_URL=https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_CHECK_BASE_URL=https://codearts-check.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_TESTPLAN_BASE_URL=https://cloudtest-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_DEPLOY_BASE_URL=https://codearts-deploy.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_BUILD_BASE_URL=https://cloudbuild-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_ARTIFACT_BASE_URL=https://artifact.cn-north-4.myhuaweicloud.cn
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

## 最近一轮真实结论

### 2026-07-08 shared HTTP product-route smoke

在本机 shared HTTP staging 上，用真实 AK/SK 做过一轮产品拆分入口体验验证：

- `GET /health` 正常。
- 8 个产品入口全部可以 `initialize` 和 `tools/list`。
- 统一 `/mcp` 暴露全部产品工具，加上 `auth_configure_session` 和 `auth_clear_session`；旧 `/mcp/<family>` 仍可用于兼容验证。
- `auth_configure_session` 可签发 bearer token，token 可跨产品入口复用。
- `mcp-session-id` 按产品入口隔离，不能跨 `/mcp/req`、`/mcp/repo` 等路径复用。
- 低风险项目级读链路已跑通：`req_get_current_user_info`、`req_list_projects`、`repo_list_repositories`、`pipeline_list_pipelines`、`build_list_jobs`、`check_list_project_task_groups`、`testplan_list_project_users`、`deploy_list_v4_applications`、`artifact_list_repositories`。

同一轮还做了读工具覆盖式体验：

| Item | Count |
| --- | ---: |
| Total read tools | 1351 |
| Attempted live read calls | 685 |
| Successful live read calls | 418 |
| Tool-level provider/business errors | 265 |
| JSON-RPC errors | 0 |
| Missing resource-context skips | 617 |
| Download/log/large-file skips | 49 |
| Timeouts | 2 |

这不是“所有读工具都应该成功”的结论。许多读工具天然需要 `pipeline_id`、`job_id`、`task_id`、`case_id`、`environment_id`、`attachment_id` 等二级资源样本；没有样本时应跳过，而不是构造假 ID。下载、日志、大文件类读工具也不建议在普通体验测试里盲目拉取。

### Historical live suite

按 `2026-05-24` 在北京四租户上做的全量 `*live*.test.ts` 扫描结果：

- `131` 个 live 相关测试文件中，`127 passed / 4 skipped / 0 failed`
- `226` 个 live 测试中，`225 passed / 1 skipped / 0 failed`
- 核心共享 `http` 会话链路通过
- `repo_create_repository` 真创建通过
- `req_create_work_item` 真写入通过
- `pipeline_run_pipeline` 真触发通过
- Deploy 读路径和部分受控写路径通过

## 为什么还有 4 个 skipped

这 4 个不是代码失败，而是默认缺少专门的执行型环境变量：

- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_RECORD_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_HOST_GROUP`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_PACKAGE_URL`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_SERVICE_PORT`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_HOST_GROUP`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_PACKAGE_URL`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_SERVICE_PORT`

这些变量对应的是“真启动 / 真停止 / 真回滚”所需的显式样本，不适合默认在所有 live 扫描里盲目执行。

## 线上运维建议

### 共享 `http` 模式

优先检查：

1. `/health`
2. `/mcp` initialize
3. `auth_configure_session`
4. `req_list_projects`
5. `tools/list` on every enabled `/mcp/<family>` route
6. one low-risk read on each product route that has the required project/resource context

### 排查慢调用

优先看：

- 是否命中高频读缓存
- 是否重复建立会话
- 是否在共享 `http` 模式下频繁触发上游请求
- 是否被写路径限流

### 排查写路径失败

优先区分：

- 凭证问题
- 区域未发布
- 样本资源不存在
- 执行型参数不完整
- 上游业务规则拒绝

## 推荐验证顺序

如果你刚部署完服务，建议按这个顺序做：

1. `npm run check`
2. `npm run test:live`
3. `GET /health`
4. `POST /mcp` initialize
5. `auth_configure_session`
6. `tools/list` on all 8 product routes
7. 低风险项目级读工具
8. 显式样本上的 gated write smoke，例如 `req_create_work_item`
9. `pipeline_run_pipeline`
10. Deploy 受控写路径
