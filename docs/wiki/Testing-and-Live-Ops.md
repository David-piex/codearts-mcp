# Testing and Live Ops

这页把项目当前的测试层次、真实联调路径、部署观察点和性能结论放在一起，方便研发、测试和运维快速对齐。

## 当前测试层次

仓库里的测试可以按四层理解：

### 1. 单元与回归测试

- `tests/products/*`
  - 产品 client 映射、错误归一化、缓存行为
- `tests/server/*`
  - auth、session、http app、工具注册、写路径集成

### 2. 共享 HTTP 模式测试

- `tests/server/http-app.test.ts`
  - HTTP app 行为、请求日志、会话恢复
- `tests/server/http.test.ts`
  - HTTP 入口 keep-alive 与服务参数
- `tests/server/http-live-smoke.test.ts`
  - `initialize -> auth -> tools/call` 的真实共享链路

### 3. 写路径集成测试

- `tests/server/write-path-integration.test.ts`
  - Req / Deploy / Pipeline 写路径
  - 验证 session-aware runtime client 是否真正带上了当前用户身份

### 4. 模块级 live smoke

- `tests/products/*/client-live-smoke.test.ts`
  - 使用真实 `AK/SK`、真实区域和真实 endpoint 对模块能力做抽样验证

## 当前 live 结论

截至 `2026-04-21`：

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

这里的 `Partial` 主要不是“代码没写完”，而是：

- 当前租户缺稳定正样本
- 北京四仍有未发布路由
- Deploy 仍受到老旧模板 runtime 的现实约束

## 当前共享 HTTP 模式最小验证路径

推荐按固定顺序验证：

1. `initialize`
2. `auth_configure_session`
3. `req_list_projects`
4. `repo_list_repositories`
5. `pipeline_list_pipelines`
6. `build_list_jobs`

如果这条链路通了，通常说明：

- session 建立正常
- cookie / `auth_token` 恢复正常
- 标准区域默认地址正常
- 基础签名链路正常

## 最近一轮已完成的公网部署联调

截至 `2026-04-20`，已在这台实例上完成真实部署与联调：

- 主机：`123.249.85.184`
- 健康检查：`http://123.249.85.184/health`
- MCP 入口：`http://123.249.85.184/mcp`
- 实际部署方式：
  - `systemd + nginx`
  - Node 运行时：`/opt/node22`
  - 应用目录：`/root/codearts-mcp`
  - 服务名：`codearts-mcp.service`

这轮对部署后服务的真实验证已覆盖：

- `initialize`
- `tools/list`
  - 返回 `158` 个工具
- `auth_configure_session`
- cookie 重连
- `auth_token` 重连
- 读路径：
  - `req_list_projects`
  - `repo_list_repositories`
  - `pipeline_list_pipelines`
  - `build_list_jobs`
- 写路径：
  - `req_create_work_item`
  - `pipeline_run_pipeline`
  - `deploy_start_app`

其中 `deploy_start_app` 当前返回的是“该应用需通过流水线触发发布”的受控业务错误，这恰恰说明共享写链路已经真正打到了上游 Deploy 服务，而不是只停留在本地参数校验层。

## 当前性能结论

最近一轮加固后，已落地的性能优化包括：

- 用户级产品 client 缓存
- auth 仓库文件检查节流
- 高频列表工具短 TTL 缓存
- shared read-through cache + in-flight dedupe
- HTTP request log 扩展
- `GET` 请求受控超时与单次重试
- HTTP keep-alive

最近联调采样得到的关键结论：

- 服务内调用：
  - `req_list_projects` 约 `108ms -> 2.1ms`
  - `pipeline_list_pipelines` 约 `175.8ms -> 2.3ms`
  - `build_list_jobs` 约 `568.5ms -> 2.1ms`
- 公网入口：
  - `req_list_projects` 约 `187.8ms -> 58.2ms`

这说明两件事：

- 应用层内部性能已经明显改善
- 如果外部仍出现 `0.5s-2s` 或偶发 `502`，优先怀疑入口网络层、代理层或客户端到服务器的链路，而不是先怀疑产品 handler 本身

## 现在怎么看请求日志

共享 HTTP 请求日志已经扩展为可直接辅助排障：

- `cacheHits`
- `upstreamRequestCount`
- `upstreamDurationMs`
- `upstreamStatusCodes`
- `durationMs`

最实用的读法：

- `cacheHits` 有值且 `upstreamRequestCount = 0`
  - 说明这次完全命中进程内缓存
- `durationMs` 明显高于 `upstreamDurationMs`
  - 更像入口代理或网络抖动
- `upstreamStatusCodes` 里反复出现 `5xx`
  - 先查上游服务状态，再决定是否需要修改 MCP 逻辑

## 当前最值得继续回归的方向

### 1. 可操作提示回归

重点关注：

- 权限不足时是否给出产品级 hint
- 列表空结果时是否补出 `project_id` / 服务开通 / 可见性提示

### 2. 入口链路稳定性

当前已经提供 `probe:edge` 脚本做连续采样：

```bash
npm run probe:edge -- --url http://123.249.85.184/mcp --access-key "$HUAWEICLOUD_AK" --secret-key "$HUAWEICLOUD_SK" --region cn-north-4 --iterations 20 --sleep-ms 1000 --output summary
```

它会连续执行：

- `GET /health`
- `POST /mcp` `initialize`
- `POST /mcp` `auth_configure_session`

并输出成功率、延迟分位数以及 `502` / network error / timeout 的入口层归因提示。

### 3. 写路径回归

继续优先覆盖共享 `http` 模式下的：

- Req 写路径
- Pipeline 写路径
- Deploy 写路径

### 4. 区域与样本边界

持续观察：

- TestPlan 未发布路由是否有变化
- Artifact 未发布路由是否有变化
- Deploy 是否出现新的健康模板样本

## 配套页面

- `docs/wiki/Architecture-Deep-Dive.md`
- `docs/wiki/Team-Deployment.md`
- `docs/wiki/Troubleshooting.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Tool-Status-Matrix.md`
