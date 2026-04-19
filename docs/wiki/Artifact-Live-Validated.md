# Artifact Live Validated

Last updated: `2026-04-19`

Region: `cn-north-4`

Base URL: `https://artifact.cn-north-4.myhuaweicloud.cn`

Validated with real tenant credentials.

Repository live-smoke entry:

- `tests/products/artifact/client-live-smoke.test.ts`
- Consolidated live-smoke status:
  - `6` test cases passing under real `AK/SK`
  - includes both published and unpublished-route confirmation

Scanned CodeArts project ids:

- `7bd39587c14048aebdadd0f9c22b1402`
- `b60f3ec187f34c35ad3033d1d6d73876`
- `eed055d650fb49dd88e49e6bdf88d344`
- `eb80951449fa4af8bac57494f0f4defd`

## Confirmed live results

- `artifact_list_repositories`
  - Real API call succeeds against the scanned Beijing 4 project ids when using the real account-level `tenant_id`.
  - Confirmed route:
    - `GET /cloudartifact/v5/{tenant_id}/{project_id}/repositories?page_no={page}&page_size={page_size}`
  - Validated real `tenant_id` type:
    - Huawei Cloud `Account ID` / IAM `domainId`
  - Current tenant returns empty repository lists for the scanned projects.
  - The empty responses are real business results, not route or auth failures.
  - Re-confirmed on `2026-04-19` with a real `tenant_id` derived from `req_list_project_members(...).members[].domain_id`.

- `artifact_list_versions`
  - Real API call succeeds against the scanned Beijing 4 project ids.
  - Confirmed route:
    - `GET /v5/{project_id}/versions`
  - The current tenant is no longer fully empty on this route.
  - Real sample now observed on project `7bd39587c14048aebdadd0f9c22b1402`:
    - `build_version: 1.0.0`
    - `files_count: 1`
    - `category: test`

- `artifact_list_latest_version_files`
  - Real API call succeeds against the scanned Beijing 4 project ids.
  - Confirmed route:
    - `GET /devreposerver/v5/{project_id}/files/version`
  - The current tenant is no longer fully empty on this route.
  - Real sample now observed on project `7bd39587c14048aebdadd0f9c22b1402`:
    - `path: /codearts-mcp/1.0.0/`
    - `name: codearts-mcp.tgz`
    - `version: 1.0.0`
    - provider-reported `size: 0.0 B`
  - Additional real sample observed on `2026-04-19` after a targeted Build publish probe:
    - `path: /codeartsmcpdemo/1.0.0/1.0.0/`
    - `name: codeartsmcpdemo.jar`
    - `version: 1.0.0`

- `artifact_get_repository`
  - Real API call succeeds against the live Beijing 4 endpoint.
  - Confirmed route:
    - `GET /cloudartifact/v5/repositories/{repository_id}`
  - With a valid-shape placeholder repository id:
    - `00000000000000000000000000000000`
  - The current tenant returns a successful minimal payload:
    - `id`: echoed from the request
    - `name`: empty string
  - The consolidated client live smoke now passes with the same placeholder id.
  - Current conclusion:
    - the detail path is published and reachable
    - non-empty repository detail still requires a tenant with real Artifact repositories

- `artifact_get_file_tree`
  - Real API call succeeds against the live Beijing 4 endpoint when using:
    - real account-level `tenant_id`
    - the 4 scanned CodeArts project ids listed above
    - a repo-name sweep including `libs-release`, `libs-snapshot`, `generic`, `docker`, `maven`, and `npm`
  - Confirmed route:
    - `GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-tree?path=/`
  - Important compatibility note:
    - the provider requires query parameter `path`
    - the MCP client now defaults it to `/`
  - Current tenant returns:
    - `root_path: "/"`
    - `nodes: []`
  - Real gateway note:
    - broader file-tree sweeps can hit roughly `10 req/s` user-side throttling
    - the live smoke now runs this sweep serially to avoid false negatives from rate limiting
  - Current conclusion:
    - the detail path is published and reachable
    - the current tenant still does not expose non-empty file tree content across the current project and common repo-name sweep
  - Re-confirmed on `2026-04-19` with the same real `tenant_id` derived from Req member `domain_id`.

- `artifact_list_build_archives`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /cloudartifact/v5/build-archives?offset={offset}&limit={limit}`
  - Current conclusion:
    - the tool is implemented locally
    - the route is not published in the current environment yet
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_search_artifacts`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `POST /cloudartifact/v5/artifacts`
  - Current conclusion:
    - the tool is implemented locally
    - the route is not published in the current environment yet
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_list_files`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `POST /cloudartifact/v5/file-detail`
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_get_file`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /cloudartifact/v5/file-detail?...`
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_get_download_url`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /cloudartifact/v5/file-detail?...`
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_show_audit`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /cloudartifact/v5/audit?...`
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

- `artifact_delete_file`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `DELETE /cloudartifact/v5/file-detail?...`
  - Validation was performed with a clearly non-existent probe path to avoid touching any real artifact content.
  - Re-confirmed in the consolidated live smoke on `2026-04-19`.

## Current tenant state

- The current tenant still returns empty repository lists and empty common-repo file trees on the scanned project sweep.
- But the Artifact-facing version/file discovery surface is no longer empty:
  - `artifact_list_versions` now returns a real published version sample
  - `artifact_list_latest_version_files` now returns the real file `codearts-mcp.tgz`
  - it also now exposes an additional real `.jar`-named sample:
    - `/codeartsmcpdemo/1.0.0/1.0.0/codeartsmcpdemo.jar`
- This matches the live Build publish flow that now uploads `/codearts-mcp/1.0.0/codearts-mcp.tgz`.

## MCP output normalization

The local MCP output shape for Artifact has been further normalized after the latest live-validation pass.

- Repository line
  - `artifact_list_repositories` now returns both:
    - `id`
    - `repositoryId`
  - `artifact_get_repository` now returns both:
    - `id`
    - `repositoryId`
  - `artifact_search_artifacts` already returns:
    - `repositoryId`
    - `repositoryName`
  - when the provider omits `repo_name`, the MCP layer now falls back to the requested `repo_name`

- Version line
  - `artifact_list_versions` now returns both:
    - `id`
    - `versionId`
  - it also surfaces:
    - `projectId`
    - `fileCount`
    - `category`

- Build-archive line
  - `artifact_list_build_archives` now returns both:
    - `id`
    - `archiveId`

- File line
  - `artifact_list_files`, `artifact_get_file`, and `artifact_get_download_url` now all return both:
    - `id`
    - `fileId`
  - the file detail routes also retain:
    - `tenantId`
    - `projectId`
    - `repoName`
    - `format`

- Search/result context
  - `artifact_search_artifacts` now also carries:
    - request-derived `projectId`
    - fallback `repositoryName`
  - `artifact_list_latest_version_files` already carries:
    - `projectId`

## Live smoke inputs

- The repo now includes a real smoke test at:
  - `tests/products/artifact/client-live-smoke.test.ts`
- Required env for the currently validated read-only smoke:
  - `HUAWEICLOUD_REGION`
  - `HUAWEICLOUD_AK`
  - `HUAWEICLOUD_SK`
  - `HUAWEICLOUD_ARTIFACT_BASE_URL`
  - `MCP_SERVER_NAME`
  - `MCP_SERVER_VERSION`
- Optional generic console override:
  - `HUAWEICLOUD_BASE_URL`
- Optional env for repository-list validation:
  - `HUAWEICLOUD_ARTIFACT_LIVE_TENANT_ID`
  - this should be the Huawei Cloud `Account ID` / IAM `domainId`, not the CodeArts project id
  - practical way to obtain it in this tenant:
    - call `req_list_project_members`
    - reuse `members[].domain_id` as Artifact `tenant_id`
- Optional env for custom project sweep:
  - `HUAWEICLOUD_ARTIFACT_LIVE_PROJECT_IDS`
  - comma-separated CodeArts project ids
  - when omitted, the repository now defaults to the same 4-project sweep listed above
- Optional env for custom repo-name sweep:
  - `HUAWEICLOUD_ARTIFACT_LIVE_REPO_NAMES`
  - comma-separated repo names
  - when omitted, the repository defaults to `libs-release,libs-snapshot,generic,docker,maven,npm`

## Follow-up targets

- The consolidated live smoke has now been re-run with a real `tenant_id`, and all currently published read tools plus all 7 unpublished-route probes are covered under real `AK/SK`.
- In the current tenant, Artifact `tenant_id` can be recovered directly from Req project-member payloads:
  - `req_list_project_members(...).members[].domain_id`
- Obtain at least one non-empty Artifact repository sample so `artifact_get_repository`, `artifact_list_files`, `artifact_get_file`, and `artifact_get_download_url` can be closed with real business data.
- Re-check `artifact_list_build_archives` later in case the route gets published in Beijing 4.
- Re-check `artifact_search_artifacts` later in case the route gets published in Beijing 4.
- Re-check `artifact_list_files`, `artifact_get_file`, `artifact_get_download_url`, and `artifact_show_audit` later in case the routes get published in Beijing 4.
- Re-check `artifact_delete_file` later in case the route gets published in Beijing 4.
