# Optimization Roadmap

这页整理的是基于当前代码、测试和最近几轮真实联调结论得出的“真实优化清单 v2”。

目标不是把所有看起来像问题的点都堆进 backlog，而是把它们分成三类：

- 当前已经确认属实的问题
- 需要更精确表述的工程约束
- 暂时不建议当作核心问题推进的点

最后更新：`2026-04-21`

## 先说结论

当前项目最值得优先投入的，不是大规模重构，而是下面四类：

1. 运维基础能力补齐
   - `/health/ready`
   - 更统一的结构化日志
   - 监控指标导出
2. 共享 HTTP 可靠性增强
   - token 续期
   - 幂等保护
   - 多实例部署策略明确化
3. 性能策略细化
   - 缓存 TTL 分层
   - 可选启动预热
4. 开发卫生与文档自动化
   - 临时文件治理
   - 工具文档自动生成
   - CHANGELOG 自动化

## 当前判断基准

这份清单基于下面这些已知事实：

- 共享 `http` 模式已经可用，并完成了真实读写联调
- 凭证本身已经支持文件持久化，不再是纯内存身份模型
- 部分模块 `Partial` 的根因是北京四未发布路由或租户样本边界，不是简单的“代码没写完”
- 高频列表缓存和请求诊断能力已经具备基础形态，但仍有精细化空间

## P0

### 1. 临时文件治理

当前根目录仍存在多份 `tmp-*` 文件，`.gitignore` 只覆盖了部分模式：

- 已覆盖：
  - `tmp-*.log`
  - `tmp-govern-*`
  - `.deploy-upload*.tgz`
- 未完全覆盖：
  - `tmp-dist-src.tgz`
  - `tmp-app.js`
  - `tmp-app.cjs`
  - `tmp-app.mjs`
  - `tmp-deploy-create-from-har.json`

建议：

- 补齐 `tmp-*` 相关忽略规则
- 清理当前根目录历史临时文件
- 明确哪些调试产物应进入 `scripts/` 或 `fixtures/`，哪些应保持临时态

### 2. 健康检查增强

当前 `/health` 只返回：

```json
{ "status": "ok" }
```

它适合做基础存活探针，但不够作为真正的 readiness 判定。

建议增加：

- `/health/ready`
  - 检查关键配置是否存在
  - 检查 auth repository 是否可读写
  - 可选检测共享 HTTP 运行模式下的依赖状态
- `/health/live`
  - 保留现有简单 `200` 语义也可以

## P1

### 3. 共享 HTTP 多实例策略明确化

当前系统不是“凭证全内存”，但也还不是天然多实例友好。

现状：

- session 绑定存在内存 `Map`
- HTTP transport 也存在单机内存 `Map`
- 凭证记录本身已经持久化到文件

这意味着：

- 单机部署没有问题
- 重启后如果客户端保留 cookie / `auth_token`，凭证可恢复
- 但如果做多副本扩容，仍需要 sticky session 或外部共享状态层

建议：

- 先在文档中明确：当前生产推荐单机或 sticky session
- 后续如果要做真正多副本，再考虑 Redis / SQLite / 其他共享状态层

### 4. Token 续期机制

当前 `auth_token` 是配置时生成固定过期时间，过期后需要重新配置。

建议：

- 增加接近过期自动续期
- 或在成功使用时做滑动续期

这样可以显著降低长期共享部署中的人工重新配置成本。

### 5. 写路径幂等保护

当前写操作主要依赖：

- 限流
- `dry_run`
- 业务方自身接口行为

但还没有统一的幂等 key 机制。

建议：

- 为 create/update/delete 类工具支持 `Idempotency-Key`
- 优先覆盖：
  - `req_create_work_item`
  - `pipeline_run_pipeline`
  - `deploy_start_app`

### 6. 统一结构化日志

当前 HTTP 请求日志已经是结构化 JSON，并且包含：

- `cacheHits`
- `phaseTimings`
- `upstreamRequestCount`
- `upstreamDurationMs`
- `upstreamStatusCodes`

但还不是完整的全项目日志规范。

建议：

- 抽一个统一 logger 封装
- 统一输出字段：
  - `timestamp`
  - `level`
  - `component`
  - `sessionId`
  - `mcpMethod`
  - `toolName`
  - `requestId`
  - `traceId`
- 保证非 HTTP 入口、auth、写路径异常也能复用相同格式

### 7. 缓存 TTL 分层

当前高频列表缓存已经存在，但默认 TTL 仍统一为 `15s`，主要覆盖：

- `req_list_projects`
- `repo_list_repositories`
- `pipeline_list_pipelines`
- `build_list_jobs`

建议：

- 低频稳定数据走更长 TTL：
  - 项目列表
  - 仓库列表
- 高频变化数据走更短 TTL：
  - 流水线状态
  - 构建记录
- 支持环境变量覆盖，便于线上按场景调优

## P2

### 8. Prometheus 指标导出

当前请求诊断主要通过日志与 `probe:edge` 完成，还没有 `/metrics`。

建议导出：

- 请求总数
- 工具级 QPS
- P50 / P95 / P99 延迟
- 缓存命中率
- 上游请求数
- 5xx 计数
- 限流命中数

### 9. OpenTelemetry / Trace 贯穿

当前还没有 trace-id / span 级能力。

建议：

- 从 HTTP 入口生成或继承 trace
- 在上游请求时透传
- 把共享写链路串起来，便于定位慢点和失败点

### 10. 启动预热

当前 HTTP 服务启动后即进入监听，没有预热阶段。

建议：

- 可选预热 auth repository
- 可选预热 region defaults
- 可选预热高频列表缓存

这会降低冷启动后的第一次用户请求延迟。

### 11. 工具文档自动生成

当前工具的参数和能力描述分散在：

- 各产品 `schemas.ts`
- 各产品 `tools/*`
- `register-*` 工具注册逻辑

建议：

- 从 Zod schema 和 tool registry 自动生成 Markdown 工具文档
- 后续如果需要，再考虑 OpenAPI 风格导出

### 12. CHANGELOG 自动化

当前还没有：

- conventional commits 校验
- 自动 CHANGELOG 生成

建议：

- 引入 commitlint / release-please / changesets 其一
- 至少先把版本变更和文档发布记录自动化

## P3

### 13. 外部共享状态层

如果未来目标是多实例水平扩展，这是最核心但也最重的工程项。

它会影响：

- session binding
- token lookup cache
- 限流状态
- 可能的 transport 路由策略

建议：

- 不要在当前阶段提前重做
- 只有在明确要支持多副本共享服务时再推进

### 14. HTTP client / 连接池压测后再决定是否重构

当前已经有按 `authId` 的 client cache。

因此“连接池没有任何共享”这个说法并不准确；是否真的会在多用户下出现明显连接膨胀，需要压测和 socket 观测来证明。

建议：

- 先补压测与连接数采样
- 再决定是否要把底层连接池抽成更强的共享层

## 产品覆盖相关结论

### 属实且应保留关注

- TestPlan 仍有 `4` 条北京四未发布路由
- Artifact 仍有 `7` 条北京四未发布路由
- Deploy 仍受真实样本与老旧模板 runtime 影响

### 不建议继续当作主优化项

- “限流算法是固定窗口，存在窗口交界双倍突发”
  - 这个表述不准确，当前实现更接近滑动日志
- “Build 模块目录结构异常，没有 `tools/`”
  - 这个判断不成立，Build 已经有标准 `tools/` 目录

## 推荐推进顺序

### 第一阶段

- 临时文件治理
- `/health/ready`
- 统一结构化日志

### 第二阶段

- token 续期
- 幂等保护
- 缓存 TTL 分层
- Prometheus 指标

### 第三阶段

- 启动预热
- 工具文档自动生成
- CHANGELOG 自动化

### 第四阶段

- 多实例共享状态层
- 更深的 trace / 连接池重构

## 相关页面

- [Home](./Home.md)
- [Testing and Live Ops](./Testing-and-Live-Ops.md)
- [Troubleshooting](./Troubleshooting.md)
- [Current Implementation Status](./Current-Implementation-Status-2026-04-17.md)
