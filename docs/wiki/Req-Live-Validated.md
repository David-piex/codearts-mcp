# Req 真实验证记录

最后更新：`2026-04-17`

区域：`cn-north-4`

Base URL：`https://projectman-ext.cn-north-4.myhuaweicloud.com`

已使用真实租户凭证验证。

## 中文速读

- `Req` 当前已经是完整闭环模块
- 项目、迭代、成员、工作项读写都已经拿到真实样本
- 当前真实可写项目是：
  - `7bd39587c14048aebdadd0f9c22b1402`
- 一个非常关键的真实结论是：
  - 已发布工作项读接口走的是 `/issues` 家族，不是 `/work-items`
- `req_create_work_item` 还确认了一个 provider 兼容点：
  - 真实请求里必须带 `priority_id`
- 下面保留原始验证细节，方便继续复核或做 smoke 回归

仓库中的 live-smoke 入口：

- `tests/products/req/client-live-smoke.test.ts`

扫描过的 CodeArts 项目 id：

- `7bd39587c14048aebdadd0f9c22b1402`
- `b60f3ec187f34c35ad3033d1d6d73876`
- `eed055d650fb49dd88e49e6bdf88d344`
- `eb80951449fa4af8bac57494f0f4defd`

## 已确认的真实结果

- `req_list_projects`
  - Real API call succeeds and returns non-empty project data.
- `req_get_project`
  - Real API call succeeds.
  - The provider returns the business object under top-level `project`.
  - The MCP client now normalizes that nested payload correctly.
- `req_list_iterations`
  - Real API call succeeds on sampled projects.
  - Current tenant returns empty-but-successful iteration lists.
- `req_list_project_members`
  - Real API call succeeds and returns non-empty member data.
- `req_list_work_items`
  - Real API call succeeds on the writable sampled project:
    - `7bd39587c14048aebdadd0f9c22b1402`
  - The published live route is:
    - `GET /v4/projects/{project_id}/issues?offset={offset}&limit={limit}`
  - The provider may return stringified JSON for the list payload.
- `req_get_work_item`
  - Real API call succeeds on a newly created live work item.
  - The published live route is:
    - `GET /v4/projects/{project_id}/issues/{work_item_id}`
- `req_create_work_item`
  - Real API call succeeds on the writable sampled project.
  - Important compatibility note:
    - `priority_id` is required by the real provider payload
    - the MCP client now defaults it to `2` unless explicitly provided
- `req_update_work_item`
  - Real API call succeeds on the same live-created work item.
  - The provider accepts the same `issues/{id}` business object family used by detail/list reads.

## 关键真实发现

- The real published work-item read routes are `/issues` and `/issues/{id}`, not `/work-items`.
- `req_create_work_item` must send `priority_id`; omitting it causes:
  - `400 PM.02100001`
  - `参数priority_id错误`
- The live provider can return stringified JSON for `listWorkItems`, so the MCP client now unwraps that payload before mapping.
- In the current tenant:
  - `7bd39587c14048aebdadd0f9c22b1402` has real readable and writable work-item samples
  - the other scanned projects currently return empty work-item lists rather than permission errors

## 建议的 live-smoke 环境变量覆盖项

- `HUAWEICLOUD_REQ_LIVE_PROJECT_IDS`
- `HUAWEICLOUD_REQ_LIVE_WORK_ITEM_PROJECT_ID`
- `HUAWEICLOUD_REQ_LIVE_WORK_ITEM_ID`
- `HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID`
