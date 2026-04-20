# Testing and Live Ops

这页把项目当前的测试形态、live 联调方式、部署观察点和性能结论放在一起，方便测试、运维和维护者对齐。

## 1. 当前测试层次

仓库里的测试大致可以分成四层：

### 单元与回归测试

- `tests/products/*`
  - 产品 client 映射、错误处理、缓存行为
- `tests/server/*`
  - auth、session、http app、注册器、写路径集成

### 共享 HTTP 模式测试

- `tests/server/http-app.test.ts`
  - HTTP app 行为与请求日志
- `tests/server/http.test.ts`
  - HTTP 入口 keep-alive 与服务参数
- `tests/server/http-live-smoke.test.ts`
  - 共享 `http` 模式下的真实 initialize / auth / tools/call 链路

### 写路径集成测试

- `tests/server/write-path-integration.test.ts`
  - Req / Deploy / Pipeline 写路径
  - 验证 session-aware runtime client 真正带上了用户鉴权

### live smoke / 模块级联调

- `tests/products/*/client-live-smoke.test.ts`
  - 用真实 `AK/SK`、真实区域和真实 endpoint 对模块能力做抽样验证

## 2. 当前 live 结论

截至 `2026-04-20`：

- 已完成模块级 live 闭环：
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- 已实现且可用，但仍受样本或区域限制：
  - TestPlan
  - Deploy
  - Artifact

对测试同学最重要的一点是：

- `Partial` 不等于“代码没写”
- 它更多表示“真实环境里还缺可稳定复现的成功样本”

## 3. 当前共享 HTTP 模式怎么验证

推荐的最小验证路径：

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

如果这几步通了，通常说明：

- session 建立正常
- auth token / cookie 复用正常
- 区域默认地址正常
- 基础签名能力正常

## 4. 最近几轮真实写路径联调关注点

最近仓库重点做过的是真实写路径联调，尤其是：

- Req
  - `req_create_work_item`
  - `req_update_work_item`
- Pipeline
  - `pipeline_run_pipeline`
- Deploy
  - `deploy_start_app`
  - `deploy_get_execution_params`
  - `deploy_get_history_detail`
  - `deploy_get_app_log`
  - `deploy_stop_app`
  - `deploy_rollback_app`

这类联调的价值在于：

- 不只是验证“工具能返回”
- 而是验证共享 `http` 模式下，用户身份真的能走完整条写链路

## 5. 当前服务器与部署观察点

当前已知联调服务器：

- 主机：`123.249.85.184`
- 服务目录：`/opt/codearts-mcp`
- systemd 服务：`codearts-mcp.service`
- 健康检查：
  - `GET /health`
  - `POST /mcp`

最近已经确认：

- 线上服务可正常 build、restart、health-check
- 共享 MCP endpoint 可正常 initialize
- 真正的 `tools/call` 已可通过真实 `AK/SK` 会话执行

## 6. 性能结论怎么解读

截至 `2026-04-20`，项目已经补上的性能加固包括：

- 用户级产品 client 缓存
- auth 仓库文件检查节流
- 高频列表工具短 TTL 缓存
- HTTP request log 扩展
- HTTP keep-alive

最近联调的一个关键结论是：

- 服务进程内部日志里，缓存命中后的很多调用已经是毫秒级
- 外部链路仍可能看到 `0.5s-2s` 甚至偶发 `502`

这意味着：

- 应用层性能问题已经显著下降
- 入口链路与外部网络稳定性仍然值得单独排查

## 7. 现在最值得继续测试的方向

如果继续做深度测试，建议优先看下面三类：

### 入口链路稳定性

- 外部直连 `/mcp` 的长连接表现
- 是否存在未进入 Node 进程的 `502`

### 写路径回归

- Req / Pipeline / Deploy 的真实写链路
- 回归时优先共享 `http` 模式，而不是只测 `stdio`

### 区域与样本边界

- TestPlan 未发布路由是否发生变化
- Artifact 未发布路由是否发生变化
- Deploy 是否新增健康模板样本

## 8. 推荐配套页面

- `docs/wiki/Architecture-Deep-Dive.md`
- `docs/wiki/Team-Deployment.md`
- `docs/wiki/Troubleshooting.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Tool-Status-Matrix.md`
