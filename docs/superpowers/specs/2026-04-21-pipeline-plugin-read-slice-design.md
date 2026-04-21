# Pipeline Plugin Read Slice Design

日期: `2026-04-21`

## 目标

基于官方《流水线 API 参考》`4.7 扩展插件管理`，补齐一组只读 MCP 能力，覆盖发布商、插件发现、插件输入输出配置、插件版本查询这条高频检索链路。

本次设计优先解决两件事：

- 让 Pipeline 模块在官方 `4.7` 分类下形成一条完整可用的只读发现路径；
- 用最小风险方式推进官方对齐，不在这一刀里引入草稿发布、图标上传、基础插件上传等高复杂度写路径。

## 背景

当前仓库已经补齐了 Pipeline 的运行、审批、分组、标签、策略、扩展点等多条能力线，并且最近刚完成了 `4.8 扩展点管理` 中的扩展点读写补齐。

相比之下，官方 `4.7 扩展插件管理` 仍存在明显空白。这里既包含读接口，也包含创建、发布、上传图标、上传基础插件等写接口。如果一次性全补，范围会迅速膨胀到：

- 普通 JSON 写请求；
- 文件上传和 `FormData`；
- 草稿态与发布态的状态切换；
- 发布商与插件的绑定关系；
- 更复杂的 live 回归准备工作。

因此本次设计明确只切“读路径”。

## 本次范围

### 新增 MCP 工具

本次新增以下 10 个只读工具：

- `pipeline_list_publishers`
- `pipeline_list_available_publishers`
- `pipeline_list_stage_plugins`
- `pipeline_list_base_plugins`
- `pipeline_list_base_plugins_paged`
- `pipeline_list_plugins`
- `pipeline_get_plugin_inputs`
- `pipeline_get_plugin_outputs`
- `pipeline_list_plugin_versions`
- `pipeline_get_plugin_version`

### 对应官方接口

本次只对齐以下官方接口：

- `ListPublisher`
  - `GET /v1/{domain_id}/publisher/query-all`
- `ListAvailablePublisher`
  - `GET /v1/{domain_id}/publisher/optional-publisher`
- `ListStagePlugins`
  - `POST /v1/{domain_id}/relation/stage-plugins`
- `ListBasePlugins`
  - `GET /v1/{domain_id}/relation/plugin/single`
- `ListBasePluginsNewPost`
  - `POST /v1/{domain_id}/relation/plugins`
- `ListPlugins`
  - `POST /v1/{domain_id}/agent-plugin/query-all`
- `ShowPluginInputs`
  - `POST /v1/{domain_id}/agent-plugin/plugin-input`
- `ShowPluginOutputs`
  - `POST /v1/{domain_id}/agent-plugin/plugin-output`
- `ListPLuginVersion`
  - `GET /v1/{domain_id}/agent-plugin/query`
- `ShowPluginVersion`
  - `GET /v1/{domain_id}/agent-plugin/detail`

## 不在本次范围

本次明确不做以下接口：

- `CreatePluginVersion`
- `CreatePluginDraft`
- `CreatePublisher`
- `UpdatePluginDraft`
- `PublishPluginDraft`
- `UpdatePluginBaseInfo`
- `PublishPlugin`
- `PublishPluginBind`
- `UploadPluginIcon`
- `UploadPublisherIcon`
- `DeletePluginDraft`
- `DeletePublisher`
- `ShowPublisher`
- `CreateBasicPlugin`
- `UpdateBasicPlugin`
- `DeleteBasicPlugin`
- `UploadBasicPlugin`
- `ShowBasicPlugin`
- `ShowPluginMetrics`
- `ListPluginVersionNumber`

原因不是这些接口不重要，而是它们会把本次工作带入写路径、上传语义或额外对象模型，不适合作为这一刀的最小增量。

## 设计选择

### 方案一：一次补齐 10 个只读工具

这是本次推荐方案。

优点：

- 官方 `4.7` 覆盖提升明显；
- 全部是读路径，风险可控；
- 可以形成完整的“发布商 -> 插件 -> 输入输出 -> 版本”检索链；
- 测试结构清晰，便于一次性补齐文档和统计。

代价：

- 需要同时处理多种响应结构；
- 需要新增一批 schema 和 normalizer。

### 方案二：只补发布商和插件列表核心工具

优点：

- 交付更快；
- 改动面更小。

缺点：

- 很快还要回头补输入输出与版本详情；
- 文档对齐会呈现一半状态，不够完整。

### 方案三：直接补齐 `4.7` 读写全量

优点：

- 单次覆盖最大。

缺点：

- 会立刻引入发布、草稿、上传图标、上传插件包等复杂行为；
- 测试和 live 联调成本显著增加；
- 返工风险高。

结论：采用方案一。

## 输入与命名约定

### 统一使用 `domain_id`

本组接口全部是租户级接口，官方路径参数都是 `domain_id`。因此 MCP 层不做 `project_id` 映射，直接对外暴露 `domain_id`。

这样做的原因：

- 与官方接口语义一致；
- 避免把租户级接口误包装成项目级接口；
- 与现有 `pipeline_list_rule_types` 等租户级 Pipeline 工具风格一致。

### 分页约定

涉及分页的接口继续使用原生 `offset` / `limit`：

- `pipeline_list_publishers`
- `pipeline_list_base_plugins_paged`
- `pipeline_list_plugin_versions`

不额外引入 `page` / `page_size` 包装，避免与官方语义脱节。

### 只读工具不使用 `dry_run`

本次全部是读工具，不加 `dry_run` 字段。

### 工具名保持显式区分

`ListBasePlugins` 和 `ListBasePluginsNewPost` 分别落成两个 MCP 工具：

- `pipeline_list_base_plugins`
- `pipeline_list_base_plugins_paged`

不把 GET 与 POST 查询语义合并成一个工具，避免：

- schema 变复杂；
- client 分支判断变重；
- 文档映射不清晰。

## 数据模型与归一化

### 共享对象

在 `src/products/pipeline/tools/plugin-shared.ts` 中新增插件查询共享归一化逻辑，优先抽出以下对象族：

- 发布商摘要
- 阶段插件分组与插件项
- 基础插件摘要
- 自定义插件摘要
- 插件输入项
- 插件输出项
- 插件版本摘要
- 插件版本详情

### 归一化原则

保持当前仓库已有规则：

- 尽量保留官方字段原名；
- 对明显同义字段补充稳定别名时，优先在 client 侧做归一化；
- 结果必须适合 LLM 消费，避免让 handler 暴露过于杂乱的原始嵌套；
- 对列表工具统一返回 `summary + items + pagination` 风格；
- 对详情工具统一返回可直接阅读的结构化对象。

### 不做过度抽象

虽然这 10 个工具都属于插件管理，但本次不引入额外通用查询框架，不新增跨产品抽象层，继续沿用当前 Pipeline 模块的一工具一文件模式。

## 代码边界

### Client 层

在 `src/products/pipeline/client.ts` 中新增以下方法：

- `listPublishers`
- `listAvailablePublishers`
- `listStagePlugins`
- `listBasePlugins`
- `listBasePluginsPaged`
- `listPlugins`
- `getPluginInputs`
- `getPluginOutputs`
- `listPluginVersions`
- `getPluginVersion`

职责：

- 按官方 URI 发起请求；
- 处理 query/body 拼装；
- 兼容官方返回体的空字段和默认值；
- 在 client 层完成尽可能稳定的响应归一化。

### Schema 层

在 `src/products/pipeline/schemas.ts` 中新增对应输入 schema。

设计要求：

- 严格区分必选与可选字段；
- 分页字段限制维持现有风格；
- 对 `business_type`、`plugin_attribution` 等可枚举字段优先用枚举或窄字符串联合约束；
- 允许官方接口中的空字符串查询条件，但避免放宽到无边界 `unknown`。

### Tool 层

在 `src/products/pipeline/tools/` 下新增 10 个工具文件，并沿用现有结构：

- 输入校验
- 调用 client
- 生成简洁 `summary`
- 输出 `structuredContent`

列表工具使用 `asListResult`；详情工具直接返回结构化对象。

### 注册层

同步更新：

- `src/products/pipeline/tools/index.ts`
- `src/server/register-pipeline-tools.ts`

确保新工具进入总注册表和模块统计。

## 测试设计

### Client 测试

在 `tests/products/pipeline/client.test.ts` 中新增覆盖：

- URI 是否正确；
- query/body 是否正确拼装；
- 空响应与默认值是否稳定；
- 典型响应是否被归一化为预期结构。

### Tool 测试

新增一组聚焦 `4.7` 读路径的工具测试，建议文件为：

- `tests/products/pipeline/tools/query-plugin-read-slice.test.ts`

覆盖：

- schema 解析；
- handler summary；
- 列表分页输出；
- 详情结构化输出。

### Server 测试

同步更新并验证：

- `tests/server/register-pipeline-tools.test.ts`
- `tests/server/register-tools.test.ts`
- `tests/server/create-server-tools.test.ts`
- `tests/e2e/tool-contracts.test.ts`
- `tests/server/module-stats.test.ts`
- `tests/server/module-stats-docs.test.ts`

目标是确保：

- 工具名已注册；
- 总数变化同步；
- 文档统计一致。

### 最终验证

实现完成后至少执行：

- 相关 `vitest` 定向测试
- `npm run stats:sync-docs`
- `npm run stats:check-docs`
- `npm test`
- `npm run lint`
- `npm run build`

## 文档更新

实现完成后同步更新：

- `docs/wiki/Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
- `docs/wiki/Official-Category-Coverage-Matrix.md`
- 由统计脚本生成的相关状态文档

目标是让官方 `4.7` 对齐状态从“空白/部分覆盖”提升为“读路径已覆盖，写路径待补”。

## 风险与护栏

### 风险一：响应结构分散

插件管理接口的返回结构可能并不统一，列表与详情的字段也可能存在重复但命名不一致的问题。

护栏：

- 优先在 client 层做轻量归一化；
- 不在 tool 层复制复杂映射逻辑；
- 发现结构差异时保守保留官方字段。

### 风险二：把两个基础插件查询接口混成一个

`ListBasePlugins` 与 `ListBasePluginsNewPost` 虽然都叫“基础插件查询”，但 HTTP 方法与输入语义不同。

护栏：

- 严格拆成两个 MCP 工具；
- 文档中一一映射官方名。

### 风险三：范围漂移到写路径

在实现 `4.7` 时很容易顺手去补发布商详情、删除发布商、插件草稿等接口。

护栏：

- 本次只做 10 个只读工具；
- 不新增任何 `dry_run` 写工具；
- 不引入文件上传实现。

## 验收标准

本次设计落地后，视为完成当且仅当：

- 上述 10 个 Pipeline 插件只读工具全部实现；
- 每个工具都有 client 与 tool 测试覆盖；
- 服务端注册和 contract 测试同步通过；
- 文档与统计完成同步；
- 全量测试、lint、build 通过；
- 官方 `4.7` 映射文档能清楚标出这 10 个接口已覆盖。
