# Troubleshooting

## 常见错误码速查

| 错误码 | 常见含义 | 优先检查 |
| --- | --- | --- |
| `CLOUDTEST.00012003` | 项目未开通 TestPlan | 项目服务状态、`cloudtest-ext` endpoint |
| `SVCSTG.CPTS.4031009` | 账号未开通 PerfTest | 账号服务状态、是否使用区域 IAM project id |
| `CodeArtsInspector.00009999` | Inspector 已进入 ACL / 归属校验 | `vss.myhuaweicloud.com` endpoint、task id 是否真实存在 |
| `APIGW.0106` on `govern_*` detail path | Govern 路径已命中但参数不合法 | task id 是否真实、`devsecurity` endpoint |

## 如果一个产品能用，另一个不能用

通常优先怀疑：

- 该产品的 base URL 错了
- 服务没开通
- 你传入的 id 类型不对

不要先默认：

- MCP server 坏了
- AK/SK 整体失效

## 特别注意的 id 类型

- `perftest_*`: `project_id` = 区域 IAM project id
- 大多数其他 CodeArts 模块：`project_id` = CodeArts 项目 UUID
- `artifact_*`: 还需要 `tenant_id`

## 最少排障顺序

1. 先跑 `req_list_projects`
2. 再跑 `repo_list_repositories`
3. 再跑 `pipeline_list_pipelines`
4. 再跑目标模块的首个只读工具
5. 最后看错误码含义，不要先猜

## 推荐进一步阅读

- `docs/faq.md`
- `docs/live-readiness-checklist.md`
- `docs/live-readiness-checklist.en.md`

## Govern OSI 补充说明

- `govern_get_osi_item_detail` / `govern_list_osi_item_vulns`
  - 当前优先使用 `software_name + software_version`
  - 只传 `artifact_id` 在北京四真实环境仍会报 `group_id` 缺失
- `sbc/osi/item/dependency`
  - 官方 PDF 权限矩阵里已经出现
  - 但北京四真实环境当前仍返回 `APIGW.0101`
  - 因此当前不要假定该接口已经可用
