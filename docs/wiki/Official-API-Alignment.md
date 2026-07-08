# Official API Alignment

这一页按官方 8 个产品资料的视角，说明当前 MCP 已经对齐到哪里、哪些已经可用、哪些仍处在“代码已实现但 live 深度不足”阶段。

## 对齐原则

项目没有走“官方 PDF 里有一个接口，就 1:1 生成一个 MCP 工具”的路线，而是按下面的优先级推进：

1. 高频读路径优先。
2. 真实业务常用写路径优先。
3. 能做真实 AK/SK 验证的优先。
4. 对区域未发布或租户样本缺失的路径，明确标注状态，而不是假装完成。

字段对齐口径：

- MCP 工具名不强求和官方接口名 1:1，但工具参数必须能追溯到原始 CodeArts API 字段。
- `Function-API-Reference.md` 是字段对应的总入口，最终参数明细在各模块 `Function-API-Reference-*.md` 页面；每个参数都包含“字段对应”说明。
- 如果 MCP 字段为了易读做过改名，文档会写明原始字段，例如 `title -> name/subject`、`work_item_type -> tracker_id`、`parent_work_item_id -> parent_issue_id`、`name -> target_repo_name`。
- 如果 MCP 字段是封装字段或安全字段，文档会说明原始 API 无对应字段，例如 `dry_run`、HTTP 会话鉴权字段。

## 8 个产品模块的当前对齐情况

| 模块 | 当前 MCP 工具数 | 对齐结论 | 当前重点缺口 |
| --- | --- | --- | --- |
| Req | 363 | 已对齐到 Scrum 高频实用层，并补入规划本身 + 规划内工作项管理 + 规划图片更新 + 计划上下文创建工作项、需求池/项目空间只读面、IPD 读取基础面、IPD 树/关联 Wiki/分组/租户列表/统计仪表盘读取、IPD 特性集/追溯/状态读取、IPD 模块/标签/特性集写面、IPD 工作项创建/批量创建/批量更新/批量删除/流程流转写面、IPD 附件/图片面、IPD 工时管理、IPD 字段配置读写，以及工作项状态/公共配置读面 | 需求池写面 / 看板更深写面等仍未进入 MCP；新增路径的 live 仍需继续补 |
| Repo | 459 | 已形成完整实用面，并补入仓库导入记录、从外部仓库导入、远程镜像配置与同步，以及大量官方读写端点 | 导入、远程镜像和部分管理面仍需更多稳定 live 样本 |
| Pipeline | 257 | 覆盖执行面、治理面、扩展点和大量官方读写端点，但 live 深度不均 | 新增管理类工具仍需 AK/SK 实测 |
| Check | 135 | 核心 task / ruleset / metrics / defects 读路径稳定，并补入官方读面、PDF/异步任务和 dry-run 安全配置写面 | 写入/触发配置类工具仍需专门真实写样本 |
| TestPlan | 762 | 已覆盖基础查询、执行入口和更大测试计划读写面，并补入大量官方端点 | 部分北京四路径未发布，深层样本仍需继续补 |
| Deploy | 110 | 经典路径和 v4 扩展面都已进入 MCP | execute-class 场景仍需专门样本 |
| Build | 167 | 当前工具面已扩展到构建元数据、日志、记录、资源规格、模板、keystore、通知和受控写面 | 新增官方只读路径已完成单测，后续可继续补 endpoint-specific live 样本 |
| Artifact | 81 | 读面已有实用覆盖，并补入文件、版本、下载、审计和删除面 | 多条路径在北京四未发布 |

## 按模块看重点

### Req

- 当前对齐到官方 Req API 的“Scrum 高频实用层”，并已经补入规划、规划图片更新、计划上下文创建工作项、需求池/项目空间只读面、IPD 读取基础面、IPD 特性集/追溯/状态读取、IPD 模块/标签/特性集写面、工作项状态属性、状态详情、状态配置、可选状态配置和项目公共配置读取能力。
- 功能面已经覆盖 `project / module / member / iteration / plan / work-item / collaboration / config-read / board-read / cache-read / program-read / requirement-pool-read / ipd-read / ipd-config-write / ipd-work-item-write / ipd-work-hour / ipd-field-config` 十七个资源面，当前 Req 总工具数为 `363`。
- 工作项读面继续补强了信息完整性：`req_list_work_items`、`req_get_work_item`、`req_list_work_item_tree` 和 `req_list_work_item_records` 会保留官方原始字段，并补充 Asia/Shanghai 可读时间；`req_list_user_features` 兼容数组、包裹数组和对象字典响应；`req_list_iteration_status_statistics` 按上游要求把 `status_id` 作为必填参数。
- `IssueDetailsV2 /v2/issues/show` 是 Req 工作项详情的官方原始接口；当前 MCP 的 `req_get_work_item_issue_details` 只调用该 V2 详情接口，并把 `journals` 映射为 `comments`，同时保留 `assignee` / `assignedToName` 便于查看处理人；该工具不会 fallback 到 `req_get_work_item` 或评论列表接口。工具输出会显式映射基础信息、时间、状态类型、优先级/严重程度、人员、项目结构、自定义字段、附件、标签、锁版本、关注/私有/删除状态和评论字段；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 这类 Asia/Shanghai 可读时间；并通过 `rawIssue` / `raw` 保留官方 V2 原始 issue 响应。
- `plan` 面现在已经覆盖规划列表、规划详情、创建、更新、删除、规划图片更新、计划上下文创建工作项、规划内工作项查看、当前规划可添加的工作项，以及规划内工作项加入/清空，方便 agent 在迭代与工作项之间补足“规划”这一层上下文，并直接维护规划内工作项集合；其中 `/v3/plan/{project_id}/managements` 并没有新增独立 MCP 工具，而是并入 `req_list_plans` 的增强过滤能力。
- `config-read` 面现在已经不只是模板、字段和状态规则，还补齐了更靠近真实流转配置的状态配置读面，方便 agent 在执行前理解项目当前状态体系。
- `board-read` 和 `cache-read` 面已经可用，能够读取看板工作项、状态记录、工作流配置以及字段缓存。
- `requirement-pool-read` 面已经覆盖项目空间、IR/RR 字段、IR 详情/子节点/历史、RR 列表/状态/历史，以及严重程度列表。
- `ipd-read` 面已经覆盖 IPD 项目、项目用户、工作项详情/列表/树、工作项关联 Wiki、工作项分组、租户工作项列表、统计仪表盘、模块树、状态、关联配置、标签、字段、工作流模板/字段、特性集快照版本、特性集树、快照特性、E2E 追溯图、分类状态和工作项流程详情读取。
- `ipd-config-write` 面已经补入 IPD 模块、标签、特性集的创建、更新、删除，全部保持 `dry_run=true` 默认预演。
- `ipd-work-item-write` 面已经补入 IPD 工作项创建、批量创建、批量更新、批量删除、单工作项流程流转、批量流程流转、附件上传/列表/下载，以及描述图片上传/删除/下载；写操作全部保持 `dry_run=true` 默认预演。
- `ipd-work-hour` 面已经补入工时查询、工时类别查询、创建工时、更新工时和删除工时；写操作全部保持 `dry_run=true` 默认预演。
- `ipd-field-config` 面已经补入租户字段列表、租户字段使用情况、租户/项目字段选项使用情况，以及租户字段和项目字段更新；写操作全部保持 `dry_run=true` 默认预演。
- 这不等于已经做完官方 Req API 的全量对齐。当前更准确的判断是“Scrum 常用操作已成面”，而不是“Req 全家桶都进了 MCP”。
- 当前仓库里能明确看到的真实 AK/SK smoke 已覆盖项目读取、成员读取、迭代读取、规划面读取、board/cache 读取，以及一批状态/公共配置/模板/工作流只读探测；但规划本身写路径、规划内工作项管理写路径、`req_update_plan_image` 和 `req_create_plan_work_item` 这些新增写路径都还没有进入真实 smoke 闭环。
- 还没进入当前对齐范围的方向包括：需求池写面、看板更深写面等。

### Repo

- 覆盖仓库、分支、标签、提交、MR、讨论、评审。
- `repo_create_repository` 已补齐并完成真实联调。
- `repo_import_repository` 已按原始导入 API 字段补齐字段对应：MCP `name` 对应 `target_repo_name`，`source_url` 对应导入源地址，`source_username/source_token` 用于生成带凭据的源地址，不作为独立原始字段提交。
- 远程镜像相关工具已覆盖关联镜像、启动同步、查询镜像、更新镜像，字段按原始 Repo 镜像 API 语义保留。

### Pipeline

- 原有执行面已形成稳定闭环。
- 新增了大量治理面，包含分组、标签、变量组、规则、扩展端点、项目策略和租户策略。
- 这部分当前更像“代码与回归已完成，live 样本待补”。

### Check

- 当前已接入 135 个 Check MCP 工具，核心 task / ruleset / metrics / defects 读路径已用北京四 AK/SK 验证。
- 新增的 `check_list_plugins`、`check_get_task_webhook_info`、`check_get_code_health_svg`、`check_list_criterion_filters`、`check_list_criterions`、`check_get_defect_task_statistics`、`check_list_issues_by_filter`、`check_get_issue_filter`、`check_get_async_job`、`check_get_pdf_file`、`check_extract_task_assistant_summary` 已按官方 URI MCP 化，并有单测覆盖；2026-05-23 用北京四 AK/SK 在 `codearts-check.cn-north-4.myhuaweicloud.com` 实测通过，旧 `codecheck-ext` 网关会对这些新路径返回 `APIGW.0101`。
- `check_update_issue_status`、`check_create_pdf_async_job`、`check_update_code_gate`、`check_update_ignore_files`、`check_update_check_mode` 已接入为 dry-run 优先的受控写/触发工具，真实写闭环仍需要专门样本。
- 适合和 Repo / Build 一起作为质量分析链路使用；默认 Check endpoint 已切到 `codearts-check`，仍可通过 `HUAWEICLOUD_CHECK_BASE_URL` 覆盖。

### TestPlan

- 当前难点不是实现，而是上游接口在北京四的发布状态。
- 所以要区分“工具存在”和“服务真的可用”。

### Deploy

- 不只是传统应用部署，也补到了 v4 环境、集群、记录、变量等扩展面。
- 当前最需要进一步验证的是 execute-class 场景。

### Build

- 当前 93 个工具已形成较完整的构建实用面。
- 新增 `build_get_job_info`、`build_get_build_details`、`build_get_task_log_page`、`build_list_custom_templates`、`build_list_usable_keystore_names`、`build_list_job_notices_v3` 6 个官方只读路径，补齐任务构建信息、构建状态详情、完成后步骤日志分页、自定义模板、可用 keystore 文件和 v3 通知查询。
- 包含若干用于发布前整理和 dry-run 预览的辅助工具。

### Artifact

- 已有版本、仓库、文件、审计、下载等关键查询面。
- 一部分路径在北京四仍是未发布状态。

## 对齐现状的现实判断

如果从“别人拿来能不能用”的角度看：

- `Req / Repo / Check / Build` 仍是当前最接近“可以直接上手”的模块，其中 Req 需要区分“功能面已经扩到 Scrum 常用层”和“哪些路径已经做过真实 AK/SK 验证”。
- `Pipeline / Deploy` 已有很强的工程价值，但还需要继续补 live 样本，才能把“代码上有”变成“默认敢用”。
- `TestPlan / Artifact` 的剩余问题更多是上游区域发布，而不是仓库缺实现。

## 下一步最值得补的点

1. Req member/batch 写面、规划新增写路径、IPD 新增读取路径与更深非空样本的真实 AK/SK smoke。
2. Pipeline 管理类工具的真实 AK/SK 验证。
3. Deploy execute-class 场景的真实样本和回归。
4. 对区域未发布路径继续维持显式状态说明，避免文档与现实脱节。
