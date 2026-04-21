# 上线检查单 / 发布清单

这份清单适合在以下场景使用：

- 本地接入前
- 团队共享部署前
- 服务正式上线前
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
- [ ] 已配置 `MCP_TRANSPORT=stdio`
- [ ] 如租户使用非标准路由，才按需配置对应的 `HUAWEICLOUD_*_BASE_URL`

### 启动与验证

- [ ] 客户端已能以 `stdio` 方式拉起 `node dist/src/server/index.js`
- [ ] 已成功调用 `req_list_projects`
- [ ] 已成功调用 `repo_list_repositories`
- [ ] 已成功调用 `pipeline_list_pipelines`

## 二、共享部署前检查

### 服务模式

- [ ] 已明确使用 `http` 模式
- [ ] 已配置 `MCP_HTTP_PORT`
- [ ] 已确认部署方式是 Docker、PM2、宿主机直跑或 `systemd + nginx`

### 服务启动

- [ ] 已执行 `npm install`
- [ ] 已执行 `npm run build`
- [ ] 已能启动 `node dist/src/server/index.js`
- [ ] 已确认 `/health` 可访问
- [ ] 已确认 `/mcp` 可访问

### 共享鉴权持久化

- [ ] 已配置 `MCP_AUTH_MASTER_KEY`
- [ ] 已配置 `MCP_AUTH_DATA_PATH`
- [ ] 已确认持久化目录不会被临时清空
- [ ] 如使用 HTTPS，已配置 `MCP_AUTH_COOKIE_SECURE=true`

### 反向代理

- [ ] 已代理 `/health`
- [ ] 已代理 `/mcp`
- [ ] 已确认代理后端端口与服务实际端口一致
- [ ] 如使用 HTTPS，已正确加载证书

## 三、安全与边界检查

### 凭证策略

- [ ] 没有把所有团队成员的 `AK/SK` 固定写进服务端
- [ ] 已明确共享模式使用 `auth_configure_session`
- [ ] 已明确共享模式下每个人使用自己的凭证
- [ ] 已明确如需清理会话可调用 `auth_clear_session`

### 权限与风险控制

- [ ] 已确认使用者的华为云账号拥有目标产品权限
- [ ] 已确认遵循最小权限原则
- [ ] 已确认写操作场景会先做受控验证

## 四、用户接入前检查

### 接入说明

- [ ] 用户已能看到 `README.md`
- [ ] 用户已能看到 `docs/wiki/Home.md`
- [ ] 用户已能看到 `docs/wiki/Team-Deployment.md`
- [ ] 用户已能看到 `docs/wiki/Troubleshooting.md`
- [ ] 用户已能看到 `docs/faq.md`

### 首次接入路径

- [ ] 已明确告诉用户本次使用 `stdio` 还是 `http`
- [ ] 如使用共享 `http` 模式，已明确告诉用户先执行 `auth_configure_session`
- [ ] 已明确告诉用户：标准地区通常只需要自己的 `AK/SK + region`
- [ ] 已明确告诉用户：只有非标准路由才需要手动覆盖 `*_base_url`
- [ ] 已准备一个可直接验证的 `project_id`

## 五、业务能力检查

### 核心读路径

- [ ] `req_list_projects` 可用
- [ ] `repo_list_repositories` 可用
- [ ] `pipeline_list_pipelines` 可用
- [ ] `build_list_jobs` 可用

### 已验证模块

- [ ] `Req` 至少验证一个读工具与一个写工具
- [ ] `Repo` 至少验证一个读工具
- [ ] `Pipeline` 至少验证一个读工具与一个写工具
- [ ] `Check` 至少验证一个读工具
- [ ] `Build` 至少验证一个读工具

### 部分但可用模块

- [ ] `Deploy` 已至少验证一个读工具
- [ ] `Artifact` 已至少验证一个读工具
- [ ] `TestPlan` 已至少验证一个已发布读工具

## 六、共享 HTTP 联调验收

- [ ] 已完成 `initialize`
- [ ] 已完成 `auth_configure_session`
- [ ] 已确认 cookie 或 `auth_token` 可恢复身份
- [ ] 已确认 `tools/list` 返回完整工具面

### 写路径

- [ ] `req_create_work_item` 已验证
- [ ] `pipeline_run_pipeline` 已验证
- [ ] `deploy_start_app` 已至少完成一次受控联调

## 七、发布前验证

- [ ] 已执行 `npm test`
- [ ] 已执行 `npm run build`
- [ ] 已执行 `npm run stats:check-docs`
- [ ] 已确认健康检查可访问
- [ ] 已确认至少 1 个 Req 工具可用
- [ ] 已确认至少 1 个 Repo 工具可用
- [ ] 已确认至少 1 个 Pipeline 工具可用

## 八、推荐的最小上线验证顺序

### 本地 `stdio`

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

### 共享 `http`

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

## 九、常见上线遗漏项

- [ ] 忘了构建 `dist`
- [ ] `/mcp` 只做了表面代理，但没有确认实际请求方法和头透传
- [ ] 把标准区域也当成必须手填所有产品 `BASE_URL`
- [ ] 共享模式下忘了先配置 `auth_configure_session`
- [ ] 服务重启后才发现 `MCP_AUTH_MASTER_KEY` 或持久化目录不稳定
- [ ] 外部出现 `502` 时，没有先区分应用层与入口网络层

## 十、建议随发布一起提供的资料

- [ ] `README.md`
- [ ] `docs/wiki/Home.md`
- [ ] `docs/wiki/Team-Deployment.md`
- [ ] `docs/wiki/Testing-and-Live-Ops.md`
- [ ] `docs/wiki/Troubleshooting.md`
- [ ] `docs/faq.md`
- [ ] `docs/release-checklist.md`
