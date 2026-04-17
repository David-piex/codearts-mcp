# 上线检查单 / 发布清单

这份清单适合在以下场景使用：

- 本地准备接入前
- 团队共享部署前
- 服务上线前
- 对外发布给团队使用前

建议逐条核对。

## 一、本地使用前检查

### 代码与依赖

- [ ] 已执行 `npm install`
- [ ] 已执行 `npm run build`
- [ ] 本地存在 `dist/src/server/index.js`

### 环境变量

- [ ] 已配置 `HUAWEICLOUD_AK`
- [ ] 已配置 `HUAWEICLOUD_SK`
- [ ] 已配置 `HUAWEICLOUD_REGION=cn-north-4`
- [ ] 已配置 `HUAWEICLOUD_REQ_BASE_URL`
- [ ] 已配置 `HUAWEICLOUD_REPO_BASE_URL`
- [ ] 已配置 `HUAWEICLOUD_PIPELINE_BASE_URL`
- [ ] 已配置 `MCP_TRANSPORT=stdio`

### 启动与验证

- [ ] 客户端已能以 `stdio` 方式拉起 `node dist/src/server/index.js`
- [ ] 已成功调用 `req_list_projects`
- [ ] 已成功调用 `repo_list_repositories`
- [ ] 已成功调用 `pipeline_list_pipelines`

## 二、共享部署前检查

### 服务模式

- [ ] 已明确使用 `http` 模式
- [ ] 已配置 `MCP_HTTP_PORT`
- [ ] 已确认部署方式是 Docker、PM2 或宿主机直跑

### 服务启动

- [ ] 已执行 `npm install`
- [ ] 已执行 `npm run build`
- [ ] 已能启动 `node dist/src/server/index.js`
- [ ] 已确认 `/health` 可访问
- [ ] 已确认 `/mcp` 可访问

### 反向代理

- [ ] 已代理 `/health`
- [ ] 已代理 `/mcp`
- [ ] 已确认代理后端端口与服务实际端口一致
- [ ] 如使用 HTTPS，已正确加载证书

## 三、安全检查

### 凭证策略

- [ ] 没有把所有团队成员的 `AK/SK` 固定写入服务端
- [ ] 已明确共享模式使用 `auth_configure_session`
- [ ] 已明确共享模式下每个人使用自己的凭证
- [ ] 已明确如需清理会话可调用 `auth_clear_session`

### 权限与边界

- [ ] 已确认使用者的华为云账号拥有目标产品权限
- [ ] 已确认最小权限原则
- [ ] 已确认写操作场景优先使用 `dry_run`

## 四、用户接入前检查

### 接入说明

- [ ] 用户已能看到 `README.md`
- [ ] 用户已能看到 `docs/quickstart.md`
- [ ] 用户已能看到 `docs/client-examples.md`
- [ ] 用户已能看到 `docs/tool-examples.md`
- [ ] 用户已能看到 `docs/faq.md`

### 首次接入路径

- [ ] 已明确告诉用户本次使用 `stdio` 还是 `http`
- [ ] 如果是 `http`，已明确告诉用户先执行 `auth_configure_session`
- [ ] 已准备一个可直接验证的 `project_id`

## 五、业务能力检查

### Req

- [ ] `req_list_projects` 可用
- [ ] `req_get_project` 可用
- [ ] `req_list_work_items` 可用
- [ ] `req_get_work_item` 可用
- [ ] `req_list_iterations` 可用
- [ ] `req_list_project_members` 可用

### Repo

- [ ] `repo_list_repositories` 可用
- [ ] `repo_get_repository` 可用
- [ ] `repo_list_branches` 可用
- [ ] `repo_list_commits` 可用
- [ ] `repo_get_commit` 可用
- [ ] `repo_get_file` 可用
- [ ] `repo_list_merge_requests` 可用
- [ ] `repo_get_merge_request` 可用

### Pipeline

- [ ] `pipeline_list_pipelines` 可用
- [ ] `pipeline_get_pipeline` 可用
- [ ] `pipeline_list_runs` 可用
- [ ] `pipeline_get_run` 可用
- [ ] `pipeline_list_templates` 可用

### 写操作

- [ ] `req_create_work_item` 已用 `dry_run` 验证
- [ ] `req_update_work_item` 已用 `dry_run` 验证
- [ ] `pipeline_run_pipeline` 已用 `dry_run` 验证

## 六、发布前验证

- [ ] 已执行 `npm test`
- [ ] 已执行 `npm run build`
- [ ] 已确认健康检查可访问
- [ ] 已确认至少 1 个 Req 工具可用
- [ ] 已确认至少 1 个 Repo 工具可用
- [ ] 已确认至少 1 个 Pipeline 工具可用

## 七、推荐的最小上线验证顺序

建议按以下顺序验收：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `auth_configure_session`（仅共享模式）
5. `req_create_work_item` 的 `dry_run`
6. `pipeline_run_pipeline` 的 `dry_run`

## 八、常见上线遗漏项

最常漏掉的是：

- [ ] 忘了构建 `dist`
- [ ] `/mcp` 只代理了 `POST`，没放开其他请求
- [ ] base URL 写错产品域名
- [ ] 团队共享模式下忘了先配会话凭证
- [ ] 写操作直接真执行，没先 `dry_run`

## 九、建议的发布资料包

如果要正式提供给团队使用，建议至少一起提供：

- [ ] `README.md`
- [ ] `docs/service-profile.md`
- [ ] `docs/quickstart.md`
- [ ] `docs/client-examples.md`
- [ ] `docs/tool-examples.md`
- [ ] `docs/faq.md`
- [ ] `docs/release-checklist.md`
