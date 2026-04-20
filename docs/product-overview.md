# 产品总览

`codearts-mcp` 是一个面向华为云 CodeArts 中国站的 MCP Server，目标不是“把接口简单包一层”，而是把多产品、多鉴权习惯、多返回格式的 CodeArts 能力收敛成一套稳定的 MCP 工具面。

截至 `2026-04-20`，仓库当前聚焦 `8` 个产品模块、`156` 个产品工具，以及 `2` 个共享 `http` 模式下的会话鉴权工具：

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## 项目解决的问题

直接对接 CodeArts 原生接口时，常见痛点包括：

- 不同产品的鉴权、路径风格和字段命名不一致
- `project_id`、`tenant_id`、`task_id`、`record_id` 等上下文字段容易混淆
- 团队共享 MCP 服务时，希望共用服务地址，但不能共用同一套 `AK/SK`
- 同一个功能“代码已实现”不代表“北京四真实可用”，需要 live 验证

本项目围绕这些问题做了四层统一：

- 统一工具命名
- 统一输入结构
- 统一输出结构
- 统一 live 状态表达

## 当前仓库结构

最重要的目录如下：

- `src/core`
  - 通用鉴权、错误规范、HTTP 客户端、配置解析
- `src/products`
  - 各产品 client、schema、tool handler
- `src/server`
  - MCP server 组装、stdio/http 双传输、session 鉴权、注册表、统计脚本
- `tests`
  - 单元测试、回归测试、live smoke、写路径联调
- `docs`
  - 根文档、接入说明、FAQ、面向维护者的说明
- `docs/wiki`
  - 面向团队协作的入口页、能力矩阵、live 状态页、模块专题页
- `deploy`
  - 部署相关资源

## 两种运行模式

### `stdio`

适合个人本地使用：

- 直接从环境变量读取 `AK/SK/region`
- 进程内构建各产品 client
- 无需 session 持久化

### `http + session`

适合团队共享部署：

- 服务端只部署一份 MCP 服务
- 每个用户通过 `auth_configure_session` 绑定自己的 `AK/SK`
- 凭证会加密持久化，支持 cookie / token 复用
- 工具通过 session-aware handler 在请求时解析当前用户上下文

## 当前 live 结论

截至 `2026-04-20` 的仓库结论可以概括为：

- 已完成模块级 live 闭环：
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- 已实现且可用，但仍受真实租户样本或区域路由限制：
  - TestPlan
  - Deploy
  - Artifact

这里的 `Partial` 主要不是“代码没写完”，而是：

- 北京四仍有未发布路由
- 当前租户缺少稳定非空样本
- Deploy 仍受老旧模板 runtime 约束

## 这轮刷新后最重要的维护结论

- 共享 `http` 模式的核心能力已经不再只是“能跑”，而是具备了持久化鉴权、session 绑定、写路径联调和回归测试
- 高频列表工具已经补了短 TTL 缓存，当前重点优化对象已从产品 client 逐步转向入口链路稳定性
- 服务进程内部日志显示，缓存命中后的很多工具调用已经下降到毫秒级；外部偶发慢调用或 `502` 更像入口网络层问题，而不是 MCP 业务处理本身

## 推荐阅读顺序

- 首先理解项目定位：
  - `README.md`
  - `docs/wiki/Home.md`
- 如果你要理解项目形态：
  - `docs/product-overview.md`
  - `docs/service-profile.md`
  - `docs/wiki/Architecture-Deep-Dive.md`
- 如果你要判断当前能不能用：
  - `docs/wiki/Capability-Matrix.md`
  - `docs/wiki/Current-Implementation-Status-2026-04-17.md`
  - `docs/wiki/Tool-Status-Matrix.md`
- 如果你要做测试、部署或排障：
  - `docs/wiki/Testing-and-Live-Ops.md`
  - `docs/wiki/Team-Deployment.md`
  - `docs/wiki/Troubleshooting.md`
