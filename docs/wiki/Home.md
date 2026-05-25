# Wiki Home

`codearts-mcp` 是一个把华为云 CodeArts 多产品能力封装成统一 MCP 工具层的服务端项目，目标不是机械镜像官方 API，而是围绕真实使用场景把“高频读路径、受控写路径、共享会话、测试联调”做成可落地的工程化能力。

## 先知道这 4 件事

1. 项目当前收敛到 `8` 个产品模块：Req、Repo、Pipeline、Check、TestPlan、Deploy、Build、Artifact。
2. 运行模式分两种：个人本地用 `stdio`，团队共享用 `http + session`；脚本化调用可以使用内置 CLI。
3. 共享模式不是共享凭证，而是共享入口。每个用户仍然使用自己的 `AK/SK`。
4. 文档里会明确区分“代码已实现”“真实 live 已验证”“区域未发布 / 租户样本不足”。

## 推荐阅读路径

### 如果你是第一次部署

1. [Getting-Started](./Getting-Started.md)
2. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
3. [Troubleshooting](./Troubleshooting.md)

### 如果你要理解实现架构

1. [Architecture-Deep-Dive](./Architecture-Deep-Dive.md)
2. [Module-Functions-Overview](./Module-Functions-Overview.md)
3. [Capability-Matrix](./Capability-Matrix.md)
4. [Module-Live-Readiness](./Module-Live-Readiness.md)

### 如果你想按角色快速上手

1. [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)
2. [Getting-Started](./Getting-Started.md)
3. [Module-Functions-Overview](./Module-Functions-Overview.md)

### 如果你想直接照着剧本调用

1. [Typical-Workflow-Playbooks](./Typical-Workflow-Playbooks.md)
2. [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)
3. [CLI-Usage](./CLI-Usage.md)
4. [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)

### 如果你要核对官方 API 对齐情况

1. [Official-API-Alignment](./Official-API-Alignment.md)
2. [Capability-Matrix](./Capability-Matrix.md)
3. [Module-Live-Readiness](./Module-Live-Readiness.md)

### 如果你要直接查 MCP API

1. [HTTP-MCP-Interface](./HTTP-MCP-Interface.md)
2. [Function-API-Reference](./Function-API-Reference.md)
3. [API-Reference](./API-Reference.md)
4. [Req-API-Reference](./Req-API-Reference.md)
5. [Module-Functions-Overview](./Module-Functions-Overview.md)

## 当前 wiki 结构

| 页面 | 用途 |
| --- | --- |
| [Getting-Started](./Getting-Started.md) | 从 0 到可调用的最短路径 |
| [CLI-Usage](./CLI-Usage.md) | 命令行调用 MCP 工具：本地模式、远程模式、profile、表格输出和补全 |
| [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md) | 按开发、测试、运维、交付、管理、维护者视角给出模块与阅读路径 |
| [Typical-Workflow-Playbooks](./Typical-Workflow-Playbooks.md) | 按开发排障、测试联动、发布部署、运维排障、制品追踪给出可直接照着跑的工具剧本 |
| [Module-Functions-Overview](./Module-Functions-Overview.md) | 用中文讲清 8 个模块分别能干什么、适合什么场景 |
| [Architecture-Deep-Dive](./Architecture-Deep-Dive.md) | 入口、会话、注册、限流、缓存、持久化的真实实现结构 |
| [Capability-Matrix](./Capability-Matrix.md) | 各模块读写规模、live 状态和关键缺口 |
| [Module-Live-Readiness](./Module-Live-Readiness.md) | 模块级真实联调就绪度、总量和剩余阻塞 |
| [Testing-and-Live-Ops](./Testing-and-Live-Ops.md) | 测试分层、AK/SK live 联调、线上排查和执行型变量 |
| [Official-API-Alignment](./Official-API-Alignment.md) | 8 个官方 PDF 维度下的 MCP 化现状 |
| [HTTP-MCP-Interface](./HTTP-MCP-Interface.md) | HTTP 端点、MCP JSON-RPC、鉴权会话、请求响应和接入示例 |
| [Function-API-Reference](./Function-API-Reference.md) | 完整 MCP 功能 API 总目录；完整参数表、字段对应和 JSON Schema 按模块拆分到明细页 |
| [API-Reference](./API-Reference.md) | 8 个 CodeArts 服务的 MCP API 总览、基础 URL、工具清单和 live 边界 |
| [Req-API-Reference](./Req-API-Reference.md) | Req MCP API 工具、写入 gate、真实 smoke 和剩余样本缺口 |
| [Troubleshooting](./Troubleshooting.md) | 常见问题、排查顺序和修复建议 |

## 关键实现文件

如果你要直接从代码入口开始读，优先看这些文件：

- `src/server/index.ts`
- `src/server/cli.ts`
- `src/server/http-app.ts`
- `src/server/create-server.ts`
- `src/server/tool-manifest.ts`
- `src/server/check-tool-manifest.ts`
- `src/server/product-tool-registry.ts`
- `src/server/session-aware-product-handlers.ts`
- `src/server/auth-repository.ts`
- `src/server/module-stats.ts`

## 当前文档原则

- 少页数，不堆重复表格
- README 只做入口，不再塞进全部背景材料
- 统计数字尽量来自自动生成块，而不是手工维护
- 工具清单以 `ToolManifest` 为准，注册、统计和 Function API 文档都要能通过 `npm run tool-manifest:check`
- 对“没做完”的部分写清楚，不做模糊表达
