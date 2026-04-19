# 快速上手

这页是 wiki 内的上手入口，适合想先跑通再深入看细节的人。

## 1. 本地运行

先安装并构建：

```bash
npm install
npm run build
```

准备最小环境变量：

```env
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_TRANSPORT=stdio
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

启动：

```bash
node dist/src/server/index.js
```

## 2. 团队共享运行

如果你把服务部署在服务器上，建议使用 `http + session`。

共享模式下：

- 服务只部署一次
- 用户第一次配置自己的 `AK/SK`
- 每个用户的凭证独立隔离，不是全局共享

使用共享模式时，先调用：

- `auth_configure_session`

标准北京四下，通常只需要：

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

现在共享 HTTP 模式已经支持持久化鉴权：

- 用户第一次调用 `auth_configure_session` 后，服务端会加密保存该用户的凭证
- 客户端后续正常重连时，不需要再次填写 `AK/SK`
- 如果要主动撤销当前用户保存的凭证，调用 `auth_clear_session`

## 3. 第一次连通性验证

建议按这个顺序试：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

如果这几步都正常，再继续试：

- `check_list_rulesets`
- `deploy_list_apps`
- `testplan_list_plans`
- `artifact_list_repositories`

## 4. 常见第一层问题

- `AK/SK` 填错
- `region` 不是 `cn-north-4`
- 共享模式下忘了先跑 `auth_configure_session`
- 某产品在目标项目上没有开通
- 当前模块在北京四对应路由未发布

## 5. 下一步看哪里

- 看总览：`Home.md`
- 看当前真实可用性：`Module-Live-Readiness.md`
- 看具体工具分档：`Tool-Status-Matrix.md`
- 看故障排查：`Troubleshooting.md`
