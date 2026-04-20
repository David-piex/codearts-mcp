# Deploy 真实验证记录

最后更新：`2026-04-19`

区域：`cn-north-4`

Base URL：`https://codearts-deploy.cn-north-4.myhuaweicloud.com`

这页是 Deploy 模块的详细验证账本。它已经非常长，因此这一轮不强行整页翻译，而是在顶部先补中文速读，下面保留原始细节证据，避免破坏追踪链路。

## 中文速读

- 当前 Deploy MCP 面已经不是“没实现”，而是“绝大多数控制面能力已实现且真实可用”
- `deploy_create_application`、`deploy_modify_application`、`deploy_create_task_by_template`、`deploy_start_app`、`deploy_get_execution_params`、`deploy_get_status`、`deploy_get_history_detail`、`deploy_get_app_log`、`deploy_stop_app`、`deploy_rollback_app` 都已经拿到真实验证样本
- 当前主要阻塞不再是没有 app / environment / host / record，而是健康模板本身 runtime 老旧
- 当前最强证据链路是 HAR 反推出的 Node.js 模板路径：
  - 软件包下载已跑通
  - 真正的新阻塞点落在 `Node v10.9.0` + `forever` 的老旧组合上
- `v4` 发现族工具并不是“没写”，而是“路由可达但当前租户样本不足”
- 下面保留的是原始验证明细，适合排查、回归和继续补 AK/SK 闭环时使用

最近探测中复用的核心资源 id：

- `project_id`: `7bd39587c14048aebdadd0f9c22b1402`
- base app `application_id`: `1bde719ea6924c71a9fdd64dbba5b6a1`
- base task `task_id`: `12fd680dd703431da99565be7a9b2014`
- host-group id `111`: `e3688fe4160640798d6d0612f848ddb5`
- environment host id: `bb51c89c976c48818310772ddefc79a4`

仓库中的 live-smoke 入口：

- `tests/products/deploy/client-live-smoke.test.ts`

额外 env 控制的 live probe：

- `tests/products/deploy/tools/rollback-app-live.test.ts`
- `tests/products/deploy/tools/start-app-execute-live.test.ts`
- `tests/products/deploy/tools/stop-app-execute-live.test.ts`
- `tests/products/deploy/tools/rollback-app-execute-live.test.ts`

## Confirmed live results

- `deploy_list_apps`
  - Non-empty success.
- `deploy_list_tasks`
  - Non-empty success.
- `deploy_get_app`
  - Non-empty success, including `arrange_infos`, permission flags, and embedded task metadata.
- `deploy_get_task`
  - Non-empty success, including `state`, permission flags, and full `steps` when the upstream task is healthy.
  - Current live Node.js healthy-task detail still returns empty `steps[].params`; runtime parameter truth is record-bound via `deploy_get_execution_params`, not reliably discoverable from `getTask` alone.
- `deploy_list_app_host_groups`
  - Success on `GET /v1/applications/{application_id}/host-groups/base/infos?...`.
- `deploy_list_environments`
  - Success on `GET /v1/applications/{application_id}/environments?...`.
- `deploy_list_environment_hosts`
  - Success on `GET /v1/applications/{application_id}/environments/{environment_id}/hosts?...`.
- `deploy_list_host_groups`
  - Success on `GET /v1/resources/host-groups?...`.
- `deploy_get_host_group`
  - Success on `GET /v1/resources/host-groups/{group_id}`.
- `deploy_list_host_group_hosts`
  - Success on `GET /v1/resources/host-groups/{group_id}/hosts?...`.
- `deploy_list_host_group_environments`
  - Success on `GET /v1/resources/host-groups/{group_id}/environments/infos?...`.
- `deploy_list_app_operations_log`
  - Non-empty success.
  - Real service expects numeric 13-character `start_time` / `end_time`.
- `deploy_list_histories`
  - Live-valid on `GET /v2/{project_id}/task/{task_id}/history`.
  - `start_date` and `end_date` are both required.
- `deploy_get_status`
  - Real success on both metadata-only and record-bound probes.
- `deploy_list_system_configs`
  - Success on `GET /v3/system/configs`.
  - Real payload includes Artifact-related dynamic keys such as:
    - `CODEARTS_ARTIFACT_FILE`
    - `CODEARTS_ARTIFACT_APPLICATION`
    - `CODEARTS_ARTIFACT_VERSION`
    - `CODEARTS_ARTIFACT_PACKAGE_RELATIVE_PATH`
    - `CODEARTS_ARTIFACT_DOCKER_IMAGE`
    - `CODEARTS_ARTIFACT_DOCKER_TAG`

## Template and application creation

- `deploy_create_task_by_template`
  - Official route is MCP-exposed with safe `dry_run` support.
  - On `2026-04-19`, the local MCP `dry_run` path was hardened:
    - it still prefers real template-detail enrichment when available
    - if the template-detail route is unpublished on the AK/SK gateway, it now degrades to a local preview instead of failing the whole tool
  - Real probe reaches `POST /v2/tasks/template-task`.
  - Using the old damaged app/task template marker `4288aeb8b6f6446da359bf5af0aa3a6a` returns:
    - `404 Deploy.00011602`
    - `未查询到符合条件的模板`
  - Using the official SpringBoot example template id `6efb0b24e2e9489eb0e53ee12904a19e` succeeds and creates:
    - app `456f2cabc3bb441eb3249cbd44a90e6e`
    - task `5b9ea99424874552a9338afa2af2c54d`
    - environment `ce9105bd8bc443908099a5afb26a017d`
  - That SpringBoot task is healthy at the metadata layer:
    - `state: Available`
    - `template_id: f9b8e46846c943dba7eea4bd8f572e9b`
    - non-empty `steps`
  - Starting the SpringBoot task without correct runtime params still returns:
    - `400 Deploy.00015905`
    - `环境和枚举类型的非静态参数不能为空`
  - Using the HAR-captured Node.js template id `85d83c0dfcd9443ebac6b62a262e6b62` also succeeds and creates:
    - task `418443e4c4034b54b0bd399412c6e168`
  - The HAR-derived task is the strongest current path:
    - `state: Available`
    - `can_execute: true`
    - `template_id: 189944901c67458fb2d78ad2a40ddf74`
    - `stepCount: 5`
    - step names:
      - `安装Node.js`
      - `下载软件包`
      - `停止nodeJs服务`
      - `启动nodeJs服务`
      - `服务启动测试`

- `deploy_create_application`
  - Frontend HAR confirms `POST /v1/applications`.
  - Minimal template-body probe on `2026-04-18` succeeded with:
    - `template_id: 6efb0b24e2e9489eb0e53ee12904a19e`
    - `operation_list: []`
  - Created:
    - application `cb012478e8b942fea1a142a3f0e4f8c0`
    - task `e2363404b0624508a460d7a5145dc04f`
  - Follow-up reads on that minimal payload stay structurally incomplete:
    - `release_id: 0`
    - `stepCount: 0`
    - `componentCount: 0`
  - Replaying the real HAR payload with non-empty `operation_list` also succeeds and creates:
    - application `dbdd9e354fc74b89867c8f81ddf2a62c`
    - task `b16fc6dc3a3e4becaa4add3eb3ee8352`
  - Follow-up `getTask` on the HAR-created app path confirms the raw operation list is meaningful:
    - `state: Draft`
    - `stepCount: 5`
    - step names:
      - `安装Node.js`
      - `下载软件包`
      - `停止nodeJs服务`
      - `启动nodeJs服务`
      - `服务启动测试`
  - Even on this richer HAR-created app path, `start` still fails with:
    - `400 Deploy.00011042`
    - `应用配置不完整,无法执行`
  - A newer exact-HAR replay on `2026-04-18` confirms this is not caused by MCP body loss:
    - application `fca78d5c778444deb4b68ca57db8edcf`
    - task `8c2886fcdc084de5a3b4d0dc8dcdba49`
    - `state: Draft`
    - `stepCount: 5`
  - Creating a real environment and importing a real host for that app is still not enough by itself:
    - environment `7e6250a36540450fb881ee2e534f0f17`
    - `start` still returns `400 Deploy.00011042`
  - A direct create probe with `is_draft=false` on `2026-04-18` proves the service can create executable apps in one step:
    - application `89d00c82e3e3480e85a51d00da0abb56`
    - task `112bdb228afb42678b197db3ea7e67b6`
    - `state: Available`
    - `stepCount: 5`
  - A second direct probe with MCP defaulting `is_draft` off also succeeds without explicitly sending the field:
    - application `a7874e2ef0c847c79690d2a422efe09a`
    - task `d26cf4b8e8904e69926f43e98603dc71`
    - environment `44d4d55537144cf8ae682f4f385dad27`
    - `start` immediately succeeds and creates:
      - record `5833101f46c84d7b8fd2ea762a246425`

- `deploy_modify_application`
  - Frontend HAR confirms `PUT /v1/applications`.
  - Real probe on `2026-04-18` succeeded against:
    - application `cb012478e8b942fea1a142a3f0e4f8c0`
    - task `e2363404b0624508a460d7a5145dc04f`
  - The update changed the app/task name to `codex-app-1776493128532-updated`.
  - Follow-up reads still show the same structural blocker on the minimal app path:
    - `release_id: 0`
    - `stepCount: 0`
    - `componentCount: 0`
  - A newer real probe on `2026-04-18` identified the critical draft-to-executable transition:
    - target app `fca78d5c778444deb4b68ca57db8edcf`
    - target task `8c2886fcdc084de5a3b4d0dc8dcdba49`
    - using the same HAR body shape plus:
      - `arrange_infos[0].id = 8c2886fcdc084de5a3b4d0dc8dcdba49`
      - `arrange_infos[0].deploy_system = deployTemplate`
      - `is_draft = false`
    - transitions the task from:
      - `Draft`
      - to `Available`
  - After that draft-finalization update, `deploy_start_app` succeeds on the HAR-created path and creates a real record:
    - record `5c8bafeb63e641c7a432d8e8d825c0ff`
  - That record progresses through:
    - `安装Node.js: succeeded`
    - `下载软件包: succeeded`
    - `停止nodeJs服务: failed`
  - This proves the old `Deploy.00011042` blocker on the HAR-created path is specifically a draft-finalization problem, not a missing environment-only problem.

- `deploy_get_template_detail`
  - Frontend HAR and frontend bundle expose console-side routes such as:
    - `GET /v1/deploytemplate/template/{template_id}/getTemplate?taskId=...`
    - `GET /open/v1/deploytemplate/template/{template_id}/getTemplate?taskId=...`
  - Real probes in `cn-north-4` returned:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Direct AK/SK re-check on `2026-04-19` confirmed both the bare `/v1/...` and `/open/v1/...` variants still return `APIGW.0101` on the current Deploy gateway.
  - MCP read path is implemented, but the route is currently region-unpublished for this tenant on the AK/SK path.

## Current deploy status

Deploy is no longer blocked by missing project-side resources:

- the project has real apps and tasks
- real environments exist
- hosts can be imported and listed successfully
- the host-group to environment path is live

The tenant now has two distinct deploy paths:

- HAR-created application path
  - earlier draft-only app:
    - application `dbdd9e354fc74b89867c8f81ddf2a62c`
    - task `b16fc6dc3a3e4becaa4add3eb3ee8352`
  - newer exact-HAR replay:
    - application `fca78d5c778444deb4b68ca57db8edcf`
    - task `8c2886fcdc084de5a3b4d0dc8dcdba49`
  - retains non-empty steps from captured `operation_list`
  - if created with `is_draft=true`, it requires a follow-up `modifyApplication(... is_draft=false ...)` to become executable
  - after draft finalization it can create real execution records
  - if created with `is_draft=false` directly, it is executable immediately
- Official create-by-template path
  - application `4ec9b1c2a08647c385d9a62dd2b1df15`
  - task `418443e4c4034b54b0bd399412c6e168`
  - environment `8db92c3991ea4f51ac6e0cf7a895afde`
  - successfully starts and creates real execution records

Current interpretation:

- the older damaged app/task path is still blocked by incomplete deploy metadata
- the HAR-created app path is no longer blocked on mysterious missing metadata once draft finalization is applied
- MCP can now avoid that blocker by default because executable create behavior is confirmed with `is_draft=false`
- the critical state transition is:
  - `createApplication` -> `Draft`
  - `modifyApplication(... is_draft=false ...)` -> `Available`
- the HAR-derived Node.js template path has moved past metadata preflight
- `deploy_start_app` now succeeds when runtime params are supplied:
  - `host_group = 8db92c3991ea4f51ac6e0cf7a895afde`
  - `package_url = demo.zip`
  - `service_port = 3000`
- successful start calls produced real records:
  - `c0efeb5cb77642a4b57da207c8067ef9`
  - `3e146a76bd7f45039df694552557c289`
  - `0d314989b1af425f8fa1cc88d4085b33`
- the remaining blocker is no longer "no record" or generic metadata reachability
- it has now moved beyond fake-package input and into the template runtime itself

## Current blocker refinement

The upstream Build blocker is no longer the main issue:

- the real Build job `cb9308bf8ece41909247bacd26b32cad` has already been fixed
- recent real builds now finish `SUCCESS`

Additional real probes narrowed the Deploy blockers further:

- `POST /v2/tasks/{task_id}/start` on the damaged app path with documented dynamic params and numeric `trigger_source=1`
  - still returns `400 Deploy.00011042`
- `POST /v1/applications` followed by only environment creation/import on exact HAR app `fca78d5c778444deb4b68ca57db8edcf`
  - still returns `400 Deploy.00011042`
- `PUT /v1/applications` with the same HAR body but `is_draft=false` on app `fca78d5c778444deb4b68ca57db8edcf`
  - changes task `8c2886fcdc084de5a3b4d0dc8dcdba49` from `Draft` to `Available`
  - enables `POST /v2/tasks/{task_id}/start`
  - creates real record `5c8bafeb63e641c7a432d8e8d825c0ff`
  - that record reaches:
    - `安装Node.js: succeeded`
    - `下载软件包: succeeded`
    - `停止nodeJs服务: failed`
- `POST /v2/tasks/template-task` with the damaged app-derived `template_id=4288aeb8b6f6446da359bf5af0aa3a6a`
  - reaches the service layer
  - returns `404 Deploy.00011602`
- `POST /v2/tasks/5b9ea99424874552a9338afa2af2c54d/start` against the SpringBoot template task
  - returns `400 Deploy.00015905`
  - message: `环境和枚举类型的非静态参数不能为空`
- `POST /v2/tasks/418443e4c4034b54b0bd399412c6e168/start` against the HAR-derived Node.js template task
  - succeeds when passing:
    - `host_group = 8db92c3991ea4f51ac6e0cf7a895afde`
    - `package_url = demo.zip`
    - `service_port = 3000`
  - real start created:
    - record `c0efeb5cb77642a4b57da207c8067ef9`
    - job `job_c0efeb5cb77642a4b57da207c8067ef9_1776494091898`
  - using a more artifact-like value `package_url = /codeartsmcpdemo/1.0.0/codeartsmcpdemo.jar` also starts successfully and creates:
    - record `0d314989b1af425f8fa1cc88d4085b33`
  - that run progresses through:
    - `安装Node.js: succeeded`
    - `下载软件包: failed`
  - using the real Build-produced package `package_url = /codearts-mcp/1.0.0/codearts-mcp.tgz` also starts successfully and creates:
    - record `bf3093a9c392449b99c6b849b49be28e`
  - that run progresses further:
    - `安装Node.js: succeeded`
    - `下载软件包: succeeded`
    - `停止nodeJs服务: failed`

Current inference:

- the missing piece for the damaged app path is still the raw template `operation_list` configuration that the simplified app/task detail APIs do not recover once `steps` becomes `{}`
- on the exact HAR-created app path, the missing piece was not only the raw `operation_list`; a second draft-finalization `modifyApplication(... is_draft=false ...)` call is also required before execution
- the current app-derived `template_id` is not a valid input for the official `CreateDeployTaskByTemplate` route
- a HAR-captured real template id can create a healthy task with intact steps and successful `start`
- on `2026-04-19`, direct AK/SK re-check confirms the current `getTask` response for the healthy Node.js path still exposes empty `steps[].params`; runtime parameters are confirmed instead from `deploy_get_execution_params`
- the Deploy MCP surface is therefore past metadata-only validation for the Node.js template path
- the old `下载软件包` blocker is resolved on the healthy path when using `/codearts-mcp/1.0.0/codearts-mcp.tgz`
- the new blocker is the outdated template runtime:
  - the template installs `Node v10.9.0`
  - later `停止nodeJs服务` installs and checks `forever`
  - `forever` fails under Node 10 because one dependency uses unsupported numeric separators and raises `SyntaxError: Invalid or unexpected token`

## Record-bound endpoints

Real execution records now exist on the HAR-derived Node.js template task:

- task `418443e4c4034b54b0bd399412c6e168`
- record `c0efeb5cb77642a4b57da207c8067ef9`
- record `3e146a76bd7f45039df694552557c289`
- record `0d314989b1af425f8fa1cc88d4085b33`

Real record-bound validation:

- `deploy_get_execution_params`
  - Real success on `task_id=418443e4c4034b54b0bd399412c6e168` + `record_id=c0efeb5cb77642a4b57da207c8067ef9`
  - Returns exactly:
    - `host_group`
    - `package_url`
    - `service_port`
- `deploy_get_status`
  - Real success on `task_id=418443e4c4034b54b0bd399412c6e168` + `record_id=c0efeb5cb77642a4b57da207c8067ef9`
  - Returns real running state and `step_states`
  - Sample observed:
    - `initial: succeeded`
    - `安装Node.js: running`
- `deploy_get_history_detail`
  - Real success on `task_id=418443e4c4034b54b0bd399412c6e168` + `record_id=c0efeb5cb77642a4b57da207c8067ef9`
  - Returns real timing fields including `start_time` and `end_time`
- `deploy_get_app_log`
  - Real success on:
    - `application_id = 4ec9b1c2a08647c385d9a62dd2b1df15`
    - `record_id = c0efeb5cb77642a4b57da207c8067ef9`
  - Full log text confirms:
    - `安装Node.js` executed successfully
    - failure occurs in `下载软件包`
    - the concrete failure is an invalid generated package URL from fake `package_url`
- `deploy_stop_app`
  - Real success on running record `3e146a76bd7f45039df694552557c289`
  - Explicit execute live test now also exists and uses a fresh setup start before stopping:
    - `tests/products/deploy/tools/stop-app-execute-live.test.ts`
- `deploy_rollback_app`
  - Real execution is now confirmed against failed-source records in the current tenant.
  - Real dry-run preview test now also exists:
    - `tests/products/deploy/tools/rollback-app-live.test.ts`
  - Successful rollback probes on `2026-04-19`:
    - source:
      - `task_id`: `418443e4c4034b54b0bd399412c6e168`
      - `record_id`: `bf3093a9c392449b99c6b849b49be28e`
      - created rollback record: `f143ad7b51b846258358a830f519e290`
    - source:
      - `task_id`: `d26cf4b8e8904e69926f43e98603dc71`
      - `record_id`: `5833101f46c84d7b8fd2ea762a246425`
      - created rollback record: `a63a751f01a0449e967c7ed820d7da86`
  - Additional boundary observed on `2026-04-19`:
    - rolling back aborted running-source record `3e146a76bd7f45039df694552557c289` returned:
      - `400 Deploy.00060218`
      - `当前环境正在部署中，请停止历史部署，或稍后重新执行`

## SpringBoot template findings

- The official SpringBoot create-by-template path is now past the earlier generic missing-param blocker.
- Real start attempts on task `5b9ea99424874552a9338afa2af2c54d` created multiple execution records on `2026-04-19`:
  - `76f64a2dd4a3405a912d511f83f6c8e2`
  - `72a329cb37e14452876255d645020e59`
  - `14414fcb93a341f898c566844aa449e2`
  - `e53b27fecf554deebd8e9bb501604748`
  - `63dcfb32203b43a3896a8af30e11fe40`
- With fake or non-existent `.jar` package paths such as `/codeartsmcpdemo/1.0.0/codeartsmcpdemo.jar`:
  - `安装JDK` succeeds
  - `选择部署来源` fails
  - provider logs show generated `download_package_url` plus:
    - `file_type: "error"`
    - `Download error , please check your package_url`
- With the real existing tenant package `/codearts-mcp/1.0.0/codearts-mcp.tgz`:
  - record `14414fcb93a341f898c566844aa449e2` proves the download layer works
  - `安装JDK` succeeds
  - `选择部署来源` succeeds
  - `停止SpringBoot服务` and `启动SpringBoot服务` still fail
  - provider log still uses:
    - `/usr/local/${package_name}/${package_name}.jar`
  - runtime shell expands that to:
    - `/usr/local//.jar`
- Extra undeclared start-time param `package_name=codearts-mcp` was ignored:
  - record `e53b27fecf554deebd8e9bb501604748`
  - `deploy_get_execution_params` does not surface `package_name`
- Declared-param overrides such as `serviceName`, `spring_path`, and `component_name` are accepted:
  - record `63dcfb32203b43a3896a8af30e11fe40`
  - `deploy_get_execution_params` confirms those values are overrideable
  - but the template still resolves the stop/start path from an internal `package_name` derivation that is not exposed as a start-time param
- Current practical conclusion:
  - SpringBoot execution is real-live validated through task creation, start submission, and record generation
  - the remaining blocker is not MCPization
  - it is a tenant/template compatibility issue: the current template expects a real `.jar`-aligned package shape and internal `package_name` resolution
  - an additional Artifact sweep on `2026-04-19` for project `7bd39587c14048aebdadd0f9c22b1402` found published files such as:
    - `/app/1.0.0/app.js`
    - `/codearts-mcp/1.0.0/codearts-mcp.js`
    - `/codearts-mcp/1.0.0/codearts-mcp.tgz`
  - no published `.jar` file was found in that current live sample set
- Additional targeted Build-to-Artifact probe on `2026-04-19`:
  - the live Build job was temporarily updated to emit `codeartsmcpdemo.jar`, upload it, and then restored to the original `codearts-mcp.tgz` configuration
  - verified successful Build sample:
    - job `cb9308bf8ece41909247bacd26b32cad`
    - build `17`
    - final state: `SUCCESS`
  - resulting published Artifact sample:
    - `/codeartsmcpdemo/1.0.0/1.0.0/codeartsmcpdemo.jar`
  - important provider nuance:
    - current release upload configuration plus `build_version=1.0.0` produced an extra nested version directory
    - using `/codeartsmcpdemo/1.0.0/codeartsmcpdemo.jar` still fails download
    - using the actual published path `/codeartsmcpdemo/1.0.0/1.0.0/codeartsmcpdemo.jar` succeeds download
- Correct-path real SpringBoot probe on `2026-04-19`:
  - record `bd700e1e637c44c4bd5cf57928b3b91e`
  - `deploy_get_execution_params` for that record returns exactly:
    - `serviceName`
    - `releaseVersion`
    - `jdk_path`
    - `package_url`
    - `spring_path`
    - `download_path`
    - `service_port`
    - `host_group`
    - `component_name`
    - `log_path`
  - provider log confirms:
    - `download_package_url` points to the corrected nested Artifact path
    - `file_type: "file"`
    - package download succeeds
  - but stop/start still execute with:
    - `/usr/local/${package_name}/${package_name}.jar`
    - expanded at runtime to `/usr/local//.jar`
  - this is now the strongest current evidence that:
    - even with a real published `.jar`-named package
    - and even after successful source download
    - the template still does not derive internal `package_name` from the uploaded artifact path or file name
  - Combined with the current HAR sweep:
    - `package_name` does not appear in the captured request bodies
    - `package_name` does not appear in the current SpringBoot execution-param surface
    - `serviceName`, `spring_path`, and `component_name` are public inputs, but `package_name` is still internal-only from the tenant-visible MCP perspective
- Additional SpringBoot repair probe on `2026-04-20`:
  - created task `fb32c07a53df430984c19bc903cbfe82`
  - created record `f4ec9880ef374af1a3b505c25be1cc56`
  - create-time config explicitly added:
    - `package_name=codeartsmcpdemo`
    - corrected nested Artifact path `/codeartsmcpdemo/1.0.0/1.0.0/codeartsmcpdemo.jar`
  - observed behavior shift:
    - `停止SpringBoot服务` now succeeds
    - `启动SpringBoot服务` becomes the first failing step
  - provider log now resolves the runtime jar path to:
    - `/usr/local/codeartsmcpdemo/codeartsmcpdemo.jar`
  - the new blocker is no longer unresolved template vars:
    - provider reports `Error: Invalid or corrupt jarfile /usr/local/codeartsmcpdemo/codeartsmcpdemo.jar`
  - current strongest interpretation:
    - adding `package_name` is a real repair for the earlier path-resolution failure
    - the remaining blocker has moved down to artifact quality / package format compatibility rather than MCP parameter transport
  - Build and download-chain re-check on `2026-04-20` closes the remaining ambiguity:
    - Build `17` log explicitly shows:
      - `npx esbuild ... --outfile=app.js`
      - `cp app.js codeartsmcpdemo.jar`
    - the same build uploaded:
      - `codeartsmcpdemo.jar`
      - `sha256=7ae35e254113d1ec6c1eea32fe7cd37834e701158240fc11bd66188996d3e569`
    - the Deploy repair record logs the downloaded host file as:
      - `/usr/local/codeartsmcpdemo//codeartsmcpdemo.jar`
      - with the same `sha256=7ae35e254113d1ec6c1eea32fe7cd37834e701158240fc11bd66188996d3e569`
  - current conclusion:
    - MCP request transport is correct
    - Deploy download and file placement are correct
    - the published `codeartsmcpdemo.jar` sample itself is a Node `app.js` bundle renamed to `.jar`
    - `Invalid or corrupt jarfile` is therefore expected for this artifact and is not a new Deploy-side bug
- Full SpringBoot write-path closure on `2026-04-20`:
  - a Java 8 compatible executable HTTP jar was built locally, smoke-tested with `java -jar`, and published through the real Build write path
  - Build sample:
    - job `cb9308bf8ece41909247bacd26b32cad`
    - build `18`
    - uploaded artifact `/codeartsmcpdemo/1.0.2/1.0.2/codeartsmcpdemo.jar`
    - uploaded `sha256=3241ef0245f0317c051edb0ee2829b6aa8cde77914992fe81d20a7b692f6c881`
  - Deploy sample:
    - task `fb32c07a53df430984c19bc903cbfe82`
    - record `9b6b3f87eec2425a95e415cfb3a75d6a`
    - execution params used:
      - `package_name=codeartsmcpdemo`
      - `releaseVersion=1.0.2`
      - `package_url=/codeartsmcpdemo/1.0.2/1.0.2/codeartsmcpdemo.jar`
      - `service_port=8080`
  - Final result:
    - `安装JDK: succeeded`
    - `选择部署来源: succeeded`
    - `停止SpringBoot服务: succeeded`
    - `启动SpringBoot服务: succeeded`
    - `URL健康测试: succeeded`
    - overall record state: `succeeded`
  - Current strongest conclusion:
    - the SpringBoot template path is now fully validated for real write execution
    - once the uploaded artifact is a genuine Java executable jar, the Req / Build / Artifact / Deploy chain closes successfully
    - the shared Build job was restored to the original `codearts-mcp.tgz` configuration after the probe

## MCP output normalization

The local MCP output shape for Deploy has been further normalized after the recent real record-bound validation work.

- Record/detail identity
  - `deploy_get_history_detail`
    - `id` now tracks the history record itself (`record_id`)
    - `taskId` is preserved separately
  - `deploy_get_v4_deploy_record`
    - `id` now tracks `record_id`
  - `deploy_get_last_record_detail`
    - `id` now tracks the resolved deploy record id
  - `deploy_get_v4_environment_resource_detail`
    - `id` now tracks `environment_id`

- Status/log context
  - `deploy_get_status`
    - now carries explicit `taskId`
    - now preserves request-scoped `recordId` when the status probe is record-bound
  - `deploy_get_app_log`
    - now carries explicit `recordId`
    - continues to preserve request-scoped `stepId`

- Execution/variable context
  - `deploy_get_execution_params`
    - each item now carries:
      - `taskId`
      - `recordId`
    - outer `scope` now also carries the same pair
  - `deploy_get_runtime_variables`
    - each item now carries:
      - `projectId`
      - `appId`
  - `deploy_query_variables`
    - each item now carries:
      - `projectId`
      - `level`
      - `appId`
      - `envId`

- System config identity
  - `deploy_list_system_configs`
    - each config item now uses:
      - `id = name`

## Earlier route validation still retained

The following routes were validated earlier and remain useful:

- `deploy_create_environment`
  - Real creation was validated successfully in this tenant.
- `deploy_import_hosts_to_environment`
  - Real host import was validated successfully in this tenant.

## Browser-session-only routes

Additional HAR analysis exposed two useful-looking Deploy portal routes:

- `GET https://devcloud.cn-north-4.huaweicloud.com/deployman/open/v1/configs/get?taskId=...`
- `GET https://devcloud.cn-north-4.huaweicloud.com/deployman/open/v2/package_spec?...`

Important boundary:

- these routes are visible in the browser HAR and useful for reverse-engineering
- they are not currently AK/SK-callable from the MCP transport
- direct signed probes against the `devcloud` host return login redirect HTML rather than JSON
- so they are currently treated as browser-session-only evidence, not MCP-exposed Deploy tools

Useful new HAR-only evidence from `package_spec`:

- `GET /deployman/open/v2/package_spec?project_id=7bd39587c14048aebdadd0f9c22b1402`
  - returns:
    - `tenant_status: "no"`
    - `package_type: "basic"`
    - `package_status: "normal"`
    - `instance_number: 0`
    - `use_instance: 0`
    - `current_tenant_id = package_tenant_id = 0f7e42038b324b5ba415a96ef96f816a`
- current interpretation:
  - this strongly matches the live AK/SK findings that the tenant currently has no usable software-package inventory behind the Deploy package selector
  - it is consistent with:
    - Artifact repository scans staying empty
    - Build not publishing any package output
    - healthy Deploy records still failing specifically at `下载软件包`
  - because this route is browser-session-only, this remains evidence for diagnosis, not an MCP tool surface

Latest browser HAR re-check on `2026-04-19` (`C:\Users\Yao\Desktop\devcloud.cn-north-4.huaweicloud.com.har`) adds an important negative result:

- the HAR still contains frontend bundle code mentioning v4 route strings
- but it does **not** contain real runtime requests for:
  - `/v4/applications/list`
  - `/v4/projects/{project_id}/environments/list`
  - `/v4/projects/{project_id}/deploy-records`
  - `/v4/projects/{project_id}/orchestrations/list`
  - `/v4/projects/{project_id}/orchestrations/{orchestration_id}/last-record-detail`
- the only captured browser-side v4 request in that latest HAR is:
  - `GET /deployman/open/v4/projects/{project_id}/user-status`
- A second narrow HAR on `2026-04-19` (`C:\Users\Yao\Desktop\32113.har`) captured the template-management page `https://devcloud.cn-north-4.huaweicloud.com/deployman/home/templatemanage/all`.
  - It contained only 2 real Deploy portal data requests:
    - `GET /deployman/open/v1/tenant/freeze`
    - `POST /deployman/open/v1/applications/list`
  - The `applications/list` response was non-empty and returned `total_num: 14`, including current tenant apps such as:
    - `codex-springboot-1776434156964`
    - `codex-template-probe-1776494048234`
    - `codex-default-final-1776506825208`
    - `codex-har-create-1776505979974`
  - This strengthens the current interpretation that the sampled template-management UI path is still backed by the classic `v1` application-list surface, not the `v4` app / record / orchestration discovery family.

Current interpretation:

- the current evidence does not support a hidden browser-only positive sample path for the v4 deploy-record/orchestration family
- in the latest captured console session, the frontend did not actually issue those v4 data requests at all
- so the current tenant limitation is not only "AK/SK discovery returned empty", but also "the sampled browser session did not surface a positive v4 record/orchestration path to replay"

## V4 host and environment surface expansion

Additional real probes against published v4 Deploy routes confirm the following MCP surfaces:

- Tenant-wide AK/SK scan on `2026-04-19`
  - Current visible Req projects:
    - `7bd39587c14048aebdadd0f9c22b1402` `Codearts-mcp`
    - `b60f3ec187f34c35ad3033d1d6d73876` `Demo`
    - `eed055d650fb49dd88e49e6bdf88d344` `housekeeper`
    - `eb80951449fa4af8bac57494f0f4defd` `体验项目`
  - For all 4 projects, the current v4 discovery surfaces returned the same empty shapes:
    - `deploy_list_v4_applications` -> `total: 0`, `resources: []`
    - `deploy_list_v4_environments` -> `total: 0`, `resources: []`
    - `deploy_list_v4_deploy_records` -> raw `null`, normalized by MCP to `records: []`
  - Current interpretation:
    - the current tenant has no confirmed positive v4 app / environment / record samples on these discovery routes
    - this is broader than a single-project data gap
- `deploy_list_v4_orchestrations`
  - `POST /v4/projects/{project_id}/orchestrations/list` is published.
  - Current AK/SK re-check on `2026-04-19` against sampled apps:
    - `1bde719ea6924c71a9fdd64dbba5b6a1`
    - `4ec9b1c2a08647c385d9a62dd2b1df15`
    - `456f2cabc3bb441eb3249cbd44a90e6e`
    - `a7874e2ef0c847c79690d2a422efe09a`
  - all returned:
    - `total: 0`
    - `resources: []`
  - Current interpretation:
    - the route is reachable
    - the sampled project currently exposes no v4 orchestration samples through this surface
    - this is consistent with the current tenant-wide 4-project empty scan above
  - Dedicated live regression test:
    - `tests/products/deploy/tools/list-v4-orchestrations-live.test.ts`
- `deploy_list_v4_clusters`
  - `POST /v4/projects/{project_id}/clusters/list` is published.
  - The current sampled project accepts both `host` and `container` cluster types.
  - Current tenant results are empty lists for both cluster types.
- `deploy_get_v4_cluster_count`
  - `GET /v4/projects/{project_id}/clusters/count?cluster_type=...` is published.
  - Current sampled project returns:
    - host: `{ ecs: 0, third_party: 0 }`
    - container: `{ cce: 0, k8s: 0 }`
- `deploy_get_v4_cluster`
  - `GET /v4/projects/{project_id}/clusters/{cluster_id}` is published.
  - Using the old host-group id returns `400 Deploy.00021624`.
- `deploy_get_v4_cluster_host`
  - `GET /v4/projects/{project_id}/clusters/{cluster_id}/hosts/{host_id}` is published.
  - Using the old host-group id also returns `400 Deploy.00021624`.
- `deploy_list_v4_cluster_hosts`
  - `POST /v4/projects/{project_id}/clusters/{cluster_id}/hosts/list` is published.
  - Using the old host-group id returns `400 Deploy.00021624`.
- `deploy_delete_v4_cluster_hosts`
  - `DELETE /v4/projects/{project_id}/clusters/{cluster_id}/hosts/batch-delete` is published.
  - Real probing confirms the request body shape is a raw string array such as `["host_id"]`.
- `deploy_get_v4_environment`
  - `GET /v4/projects/{project_id}/environments/{environment_id}` is published.
  - The sampled old environment id currently returns `null`.
- `deploy_get_v4_environment_resource_detail`
  - `GET /v4/projects/{project_id}/environments/{environment_id}/resource-detail` is published.
  - The sampled old environment id currently returns `null`.
- `deploy_list_v4_environments`
  - `POST /v4/projects/{project_id}/environments/list` is published.
  - Current AK/SK re-check on `2026-04-19` returned:
    - `total: 0`
    - `resources: []`
  - Dedicated live regression test:
    - `tests/products/deploy/tools/list-v4-environments-live.test.ts`
- `deploy_list_v4_environment_hosts`
  - `GET /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Using the sampled old environment id reaches the route and returns `400 Deploy.00011022`.
- `deploy_add_v4_environment_hosts`
  - `POST /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Real probing with `cluster_id + host_ids` reaches service validation and returns `400 Deploy.00015002`.
- `deploy_delete_v4_environment_hosts`
  - `DELETE /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Real probing confirms the request body shape is also a raw string array such as `["host_id"]`.
- `deploy_list_v4_deploy_records`
  - `POST /v4/projects/{project_id}/deploy-records` is published.
  - Current AK/SK re-check on `2026-04-19` returned raw `null` for project `7bd39587c14048aebdadd0f9c22b1402`.
  - MCP client normalization now treats that provider `null` as:
    - `records: []`
    - `raw: null`
  - A dedicated live regression test now covers this normalization:
    - `tests/products/deploy/tools/list-v4-deploy-records-live.test.ts`
  - Current interpretation:
    - this is a tenant/project-empty result shape, not `APIGW.0101`
    - the route is reachable, but the sampled project currently exposes no v4 deploy records through this surface
- `deploy_list_v4_applications`
  - `POST /v4/applications/list` is published.
  - Current AK/SK re-check on `2026-04-19` returned:
    - `total: 0`
    - `resources: []`
  - Dedicated live regression test:
    - `tests/products/deploy/tools/list-v4-applications-live.test.ts`
- `deploy_get_v4_deploy_record`
  - `GET /v4/projects/{project_id}/deploy-records/{record_id}` is published.
  - Re-checking current classic Deploy record ids on `2026-04-19` returned:
    - `400 Deploy.00021534`
    - `部署记录不存在`
  - Current interpretation:
    - classic `/v1` and `/v2` deploy record ids are not automatically reusable as `/v4` deploy record ids on this route
    - the current tenant still lacks a confirmed positive sample id for the v4 record-detail family
- `deploy_get_last_record_detail`
  - `GET /v4/projects/{project_id}/orchestrations/{orchestration_id}/last-record-detail` is published.
  - On `2026-04-19`, no positive probe could be run because the sampled project returned zero items from `deploy_list_v4_orchestrations`.
  - Current interpretation:
    - the route family remains published
    - but the current tenant still lacks a confirmed positive orchestration sample id for this read path

Current implication for the v4 write-preview family:

- `deploy_cancel_v4_deploy_record`
- `deploy_rerun_v4_deploy_record`
- `deploy_retry_v4_deploy_record`
- `deploy_rollback_v4_deploy_record`
- `deploy_pass_v4_manual_check`
- `deploy_refuse_v4_manual_check`

All six `dry_run` paths currently depend on `deploy_get_v4_deploy_record`.

- This is not the same problem as `deploy_create_task_by_template`:
  - no `APIGW.0101` unpublished-route evidence was found here
  - the current blocker is missing tenant-visible positive sample data for the v4 record-detail family
  - the latest browser HAR also failed to expose a positive console-side request path for that family
- On `2026-04-19`, the local MCP `dry_run` behavior for these six tools was hardened:
  - it still prefers a real `deploy_get_v4_deploy_record` validation preview when that route returns a positive sample
  - if the current tenant/gateway returns the known sample-limited detail errors such as:
    - `Deploy.00021534`
    - `部署记录不存在`
    - or `APIGW.0101`
  - the tool now degrades to a local preview instead of failing the whole `dry_run`
- So these tools should currently be read as:
  - implemented
  - route family reachable
  - execute path still sample-data-limited on the current tenant
  - `dry_run` is now safe and usable even without a tenant-visible positive v4 record sample

The remaining v4 host-tag write surface is still intentionally skipped:

- route: `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts`
- frontend bundle evidence confirms the route exists
- the current tenant still does not expose a reproducible gray-release UI/path
- accepted request body shape remains undiscovered
- per the current user direction, this item stays explicitly skipped

## Start-parameter probing

Additional real probes were first run against the damaged app path `POST /v2/tasks/{task_id}/start` with minimal alternative bodies:

- `{}`
- `{"trigger_source":0}`
- `{"params":[{"key":"env","value":"305352cc6b274e26b215c8222e084928","type":"host_group"}]}`
- `{"params":[{"key":"environment","value":"305352cc6b274e26b215c8222e084928","type":"host_group"}]}`
- `{"trigger_source":1,"params":[{"key":"CODEARTS_ARTIFACT_APPLICATION","value":"fake-package.zip","type":"text"}, ...]}`

All damaged-app variants still returned:

- `400 Deploy.00011042`

For the HAR-derived Node.js template task `418443e4c4034b54b0bd399412c6e168`, the runtime parameter picture is now much clearer:

- extracting the real HAR payload exposes placeholder variables:
  - `host_group`
  - `package_url`
  - `service_port`
- `deploy_get_execution_params` confirms the same three runtime parameters at execution time
- starting with:
  - `host_group = 8db92c3991ea4f51ac6e0cf7a895afde`
  - `package_url = demo.zip`
  - `service_port = 3000`
  succeeds and creates real execution records
- app logs then prove the next blocker is business data quality:
  - `安装Node.js` succeeds
  - `下载软件包` fails because `package_url` is fake
  - the downstream error is `Download error , please check your package_url`
- trying a more realistic artifact-style path `/codeartsmcpdemo/1.0.0/codeartsmcpdemo.jar` improves the probe quality but still ends with:
  - final state `failed`
  - `安装Node.js: succeeded`
  - `下载软件包: failed`
- this sharpens the blocker from “fake example value” to “missing real package content currently accessible to this tenant”

- HAR-only `package_spec` evidence now strengthens that conclusion further:
  - `tenant_status: "no"`
  - `instance_number: 0`
  - so the problem is likely not just “wrong example path”, but “the tenant currently has no package inventory/service instance for this selector to resolve against”
Current interpretation for the healthy template path:

- the task itself is structurally valid
- the environment and host resources are present
- runtime parameter discovery is now validated on the real execution-record path
- the package value `/codearts-mcp/1.0.0/codearts-mcp.tgz` is now real and downloadable
- the next missing piece is updating or replacing the outdated Node.js runtime/process-manager behavior in the template, not more Deploy control-plane metadata

## Suggested live-smoke env overrides

- `HUAWEICLOUD_DEPLOY_LIVE_PROJECT_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_APPLICATION_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_ENVIRONMENT_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_HOST_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_RECORD_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_HOST_GROUP_PROJECT_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_HOST_GROUP_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_HOST_GROUP`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_PACKAGE_URL`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_SERVICE_PORT`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_HOST_GROUP`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_PACKAGE_URL`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_SERVICE_PORT`
- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_RECORD_ID`

## Follow-up targets

- Move the healthy Node.js deployment path past the outdated template runtime:
  - either upgrade the runtime/process-manager behavior used by the template
  - or create/use a deployment template that does not depend on `forever` under Node `v10.9.0`
- Continue expanding safe MCP write coverage beyond the now-validated `POST /v1/applications` and `PUT /v1/applications` paths.
- Keep the damaged app-path investigation separate from the healthy HAR-template path so `Deploy.00011042` does not block real record-bound validation work.
