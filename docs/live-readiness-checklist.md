# Live Readiness Checklist

这份清单用于快速判断北京四租户下各 CodeArts 模块当前的可用状态、输入约束和非空返回前提。

适用前提：

- 区域：`cn-north-4`
- 当前验证日期：`2026-04-16`
- 目标仓库：`codearts-mcp`

## 一页结论

| 模块 | 首次建议工具 | `project_id` 类型 | 推荐 endpoint | 当前 live 状态 | 非空前提 |
| --- | --- | --- | --- | --- | --- |
| Req | `req_list_projects` | CodeArts 项目无关 | `https://projectman-ext.cn-north-4.myhuaweicloud.com` | Validated | 已有项目数据 |
| Repo | `repo_list_repositories` | CodeArts 项目 UUID | `https://codehub-ext.cn-north-4.myhuaweicloud.com` | Validated | 项目下已有仓库 |
| Pipeline | `pipeline_list_pipelines` | CodeArts 项目 UUID | `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com` | Validated | 项目下已有流水线 |
| Check | `check_list_tasks` / `check_list_rulesets` | CodeArts 项目 UUID | `https://codecheck-ext.cn-north-4.myhuaweicloud.com` | Validated | 项目下已有检查任务；规则集无需任务即可非空 |
| TestPlan | `testplan_list_plans` | CodeArts 项目 UUID | `https://cloudtest-ext.cn-north-4.myhuaweicloud.com` | Empty-but-validated | 项目已开通 TestPlan，且已有计划/用例 |
| Deploy | `deploy_list_apps` | CodeArts 项目 UUID | `https://codearts-deploy.cn-north-4.myhuaweicloud.com` | Empty-but-validated | 租户已有部署应用或部署记录 |
| Build | `build_list_jobs` | CodeArts 项目 UUID | `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com` | Empty-but-validated | 项目已有构建任务或记录 |
| Artifact | `artifact_list_repositories` | CodeArts 项目 UUID + tenant id | `https://artifact.cn-north-4.myhuaweicloud.cn` | Empty-but-validated | 租户已有制品仓/版本数据 |
| Govern | `govern_get_quota_info` | CodeArts 项目 UUID | `https://devsecurity.cn-north-4.myhuaweicloud.com` | Empty-but-validated | 租户已开通治理能力，且已有真实治理任务 |
| Inspector | `inspector_list_domains` | CodeArts 项目 UUID | `https://vss.myhuaweicloud.com` | Empty-but-validated | 租户已配置扫描域名并产生任务 |
| PerfTest | `perftest_list_projects` | 区域 IAM project id | `https://cpts.cn-north-4.myhuaweicloud.com` | Empty-but-validated | 账号已开通 PerfTest，且已有测试工程/任务 |

## ID 规则

- 大多数 `CodeArts` 模块使用 CodeArts 项目 UUID。
- `PerfTest` 例外：`perftest_*` 工具中的 `project_id` 应传区域 IAM project id。
- `Artifact` 除 `project_id` 外还需要 `tenant_id`。

## 当前已确认的真实返回特征

### 可直接认为“已打通”的情况

- `req_*`：返回真实项目列表。
- `repo_*`：返回真实仓库、分支和比对数据。
- `pipeline_*`：返回真实流水线和运行记录。
- `check_list_tasks`：返回真实检查任务。
- `check_list_rulesets`：返回真实规则集。

### 可直接认为“服务可达，但租户无数据/未开通”的情况

- `testplan_list_plans` 返回 `CLOUDTEST.00012003`
  - 表示项目未开通 TestPlan，不是 MCP 路由错误。
- `perftest_list_projects` 返回 `SVCSTG.CPTS.4031009`
  - 表示账号未开通 PerfTest。
- `govern_get_quota_info` 返回 `valid: false` 且 quota 为 0
  - 表示治理能力当前未开通。
- `inspector_list_domains` 返回 `200` 且 `domains: []`
  - 表示 Inspector 接口可达，但当前没有扫描域名。
- `deploy/build/artifact` 返回空列表
  - 表示接口路径和解析已验证，但当前租户缺少业务数据。

### 可直接认为“detail path 已接通”的情况

- `govern_get_task_status` / `govern_get_open_source_summary` / `govern_get_open_source_report`
  - 对伪造任务 id 返回 `APIGW.0106` 参数校验错误。
  - 说明官方 `sbc/*` 路径存在并已进入网关参数校验。
- `inspector_get_task` / `inspector_list_results` / `inspector_list_ports` / `inspector_list_business_risks` / `inspector_get_report_status`
  - 对伪造任务 id 返回 `CodeArtsInspector.00009999`
  - 说明请求已进入服务 ACL / 归属校验层，而不是路由不存在。

## 最少排障顺序

1. 先用 `req_list_projects` 验证 AK/SK、区域和基础连通性。
2. 再用 `repo_list_repositories` 与 `pipeline_list_pipelines` 验证常用 CodeArts endpoint。
3. 然后按目标模块选择首个只读工具验证。
4. 如果是 `TestPlan / PerfTest / Inspector / Govern`，优先看错误码含义，不要先怀疑 MCP 实现。

## 遇到下面这些返回时，优先判断

| 返回 | 优先判断 |
| --- | --- |
| `CLOUDTEST.00012003` | 项目未开通 TestPlan |
| `SVCSTG.CPTS.4031009` | 账号未开通 PerfTest |
| `CodeArtsInspector.00009999` | Inspector detail path 已通，当前任务不属于该账号或不存在 |
| `APIGW.0106` on `govern_*` detail path | Govern SBC detail path 已通，但参数不合法 |

## 相关文档

- `docs/quickstart.md`
- `docs/tool-examples.md`
- `docs/faq.md`
- `docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md`

## Govern OSI 补充

- `govern_get_osi_statistics` / `govern_list_osi_item_names` / `govern_list_osi_item_versions`
  - 已在北京四真实环境拿到成功响应
- `govern_get_osi_item_detail`
  - 已在北京四真实环境拿到真实非空组件详情
- `govern_list_osi_item_vulns`
  - 已在北京四真实环境拿到合法空列表响应
- `govern_get_osi_item_detail` / `govern_list_osi_item_vulns`
  - 当前建议使用 `software_name + software_version`
  - 只传 `artifact_id` 仍会报 `group_id` 缺失
- `sbc/osi/item/dependency`
  - 虽然出现在官方 PDF 权限矩阵里
  - 但北京四真实环境当前仍返回 `APIGW.0101`
