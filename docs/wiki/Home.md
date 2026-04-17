# codearts-mcp Wiki

`codearts-mcp` 是面向华为云中国站 CodeArts 的 MCP 服务，当前覆盖 11 个 CodeArts 技术模块，并同时支持 `stdio` 本地模式与 `http + session` 共享模式。

## 先看哪几页

- [Getting Started](./Getting-Started.md)
- [Capability Matrix](./Capability-Matrix.md)
- [Tool Status Matrix](./Tool-Status-Matrix.md)
- [Module Live Readiness](./Module-Live-Readiness.md)
- [Check Live Validated](./Check-Live-Validated.md)
- [Deploy Live Validated](./Deploy-Live-Validated.md)
- [Build Live Validated](./Build-Live-Validated.md)
- [Govern Live Validated](./Govern-Live-Validated.md)
- [Current Implementation Status (2026-04-17)](./Current-Implementation-Status-2026-04-17.md)
- [AK/SK Verification Ledger (2026-04-17)](./AKSK-Verification-Ledger-2026-04-17.md)
- [Troubleshooting](./Troubleshooting.md)

## 当前状态

- `req / repo / pipeline / check` 已完成真实北京四租户非空验证。
- `deploy / build / artifact / govern / inspector / perftest / testplan` 已完成 transport/path 层验证，但当前租户表现为空数据、未开通或无业务样本。
- `govern` 当前已实现 `28` 个工具，覆盖任务、报告、multipart 上传、quota、OSI 统计/软件发现、组件详情、组件漏洞、漏洞和用户查询。
- `govern_list_tasks` 仍未开放，因为官方权限名虽可见，但公开文档和真实探测都还没有确认可信的正式 URI。
- `govern_get_osi_item_detail` / `govern_list_osi_item_vulns` 当前建议使用 `software_name + software_version`；仅传 `artifact_id` 在北京四真实环境仍会报 `group_id` 缺失。
- `sbc/osi/item/dependency` 虽然出现在官方 PDF 权限表里，但北京四真实环境当前仍返回 `APIGW.0101`，所以暂未开放。
- 当前推荐区域为 `cn-north-4`。

## 推荐默认 Endpoint

- Req: `https://projectman-ext.cn-north-4.myhuaweicloud.com`
- Repo: `https://codehub-ext.cn-north-4.myhuaweicloud.com`
- Pipeline: `https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com`
- Check: `https://codecheck-ext.cn-north-4.myhuaweicloud.com`
- TestPlan: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`
- Deploy: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`
- Build: `https://cloudbuild-ext.cn-north-4.myhuaweicloud.com`
- Artifact: `https://artifact.cn-north-4.myhuaweicloud.cn`
- Govern: `https://devsecurity.cn-north-4.myhuaweicloud.com`
- Inspector: `https://vss.myhuaweicloud.com`
- PerfTest: `https://cpts.cn-north-4.myhuaweicloud.com`

## 关键例外

- `perftest_*` 里的 `project_id` 使用区域 IAM project id，不是 CodeArts 项目 UUID。
- `artifact_*` 通常同时需要 `tenant_id` 和 `project_id`。
- `testplan_*` 需要项目已开通 TestPlan。
- `inspector_*` 推荐使用统一域名 `https://vss.myhuaweicloud.com`，而不是区域子域名。

## 关联文档

- `README.md`
- `docs/quickstart.md`
- `docs/faq.md`
- `docs/live-readiness-checklist.md`
- `docs/live-readiness-checklist.en.md`
