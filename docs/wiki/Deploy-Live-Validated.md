# Deploy Live Validated

Last updated: `2026-04-19`

Region: `cn-north-4`

Base URL: `https://codearts-deploy.cn-north-4.myhuaweicloud.com`

Validated with real tenant credentials against the current `Codearts-mcp` project resources.

Core resource ids used across the latest probes:

- `project_id`: `7bd39587c14048aebdadd0f9c22b1402`
- base app `application_id`: `1bde719ea6924c71a9fdd64dbba5b6a1`
- base task `task_id`: `12fd680dd703431da99565be7a9b2014`
- host-group id `111`: `e3688fe4160640798d6d0612f848ddb5`
- environment host id: `bb51c89c976c48818310772ddefc79a4`

Repository live-smoke entry:

- `tests/products/deploy/client-live-smoke.test.ts`

## Confirmed live results

- `deploy_list_apps`
  - Non-empty success.
- `deploy_list_tasks`
  - Non-empty success.
- `deploy_get_app`
  - Non-empty success, including `arrange_infos`, permission flags, and embedded task metadata.
- `deploy_get_task`
  - Non-empty success, including `state`, permission flags, and full `steps` when the upstream task is healthy.
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
  - Frontend bundle exposes `GET /v1/deploytemplate/template/{template_id}/getTemplate?taskId=...`.
  - Real probes in `cn-north-4` returned:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - MCP read path is implemented, but the route is currently region-unpublished for this tenant.

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
- a HAR-captured real template id can create a healthy task with intact steps, discoverable runtime params, and successful `start`
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
- `deploy_rollback_app`
  - Still pending a rollback-eligible real execution sample

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

## V4 host and environment surface expansion

Additional real probes against published v4 Deploy routes confirm the following MCP surfaces:

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
- `deploy_list_v4_environment_hosts`
  - `GET /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Using the sampled old environment id reaches the route and returns `400 Deploy.00011022`.
- `deploy_add_v4_environment_hosts`
  - `POST /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Real probing with `cluster_id + host_ids` reaches service validation and returns `400 Deploy.00015002`.
- `deploy_delete_v4_environment_hosts`
  - `DELETE /v4/projects/{project_id}/environments/{environment_id}/hosts` is published.
  - Real probing confirms the request body shape is also a raw string array such as `["host_id"]`.

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

## Follow-up targets

- Move the healthy Node.js deployment path past the outdated template runtime:
  - either upgrade the runtime/process-manager behavior used by the template
  - or create/use a deployment template that does not depend on `forever` under Node `v10.9.0`
- Validate `deploy_rollback_app` with a real rollback-eligible `record_id`.
- Continue expanding safe MCP write coverage beyond the now-validated `POST /v1/applications` and `PUT /v1/applications` paths.
- Keep the damaged app-path investigation separate from the healthy HAR-template path so `Deploy.00011042` does not block real record-bound validation work.
