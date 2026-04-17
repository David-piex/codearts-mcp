# CodeArts Module Completion Matrix

## Rubric

Each module is graded against:

1. module skeleton
2. tool registration
3. read/write capability depth
4. test coverage
5. shared-session support
6. documentation closure
7. live-validation readiness

Grades:

- A: essentially complete
- B: usable but incomplete
- C: connected but still needing visible strengthening

## Live Validation Legend

- Validated: confirmed against the user's Beijing 4 tenant with real credentials and real provider responses.
- Empty-but-validated: request path, auth, and parsing are confirmed, but the current tenant has no business data for that module, so live responses are empty.
- Pending-live-sample: implementation and compatibility layers are ready, but the current tenant lacks the concrete sample data needed to validate non-empty detail paths.

## Matrix

| Module | Grade | Skeleton | Registration | Capability | Tests | Session | Docs | Live | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| req | A | Complete | Complete | Core read/write loop present | Strong | Present | Strong | Validated | Project discovery is confirmed with non-empty Beijing 4 responses |
| repo | A | Complete | Complete | Strong and broad | Strong | Present | Strong | Validated | Repository, branch, branch detail, and compare flows are confirmed against real data |
| pipeline | A | Complete | Complete | Strong and broad | Strong | Present | Strong | Validated | Pipeline list, run list, run summary, run detail, and run-parameter empty responses are confirmed |
| check | A | Complete | Complete | Core read/write present | Strong | Present | Strong | Validated | Project-scoped task and ruleset discovery are now confirmed against real Beijing 4 data |
| testplan | A | Complete | Complete | Core read/write present | Strong | Present | Strong | Empty-but-validated | CloudTest endpoint is reachable, but the sampled CodeArts projects currently do not have TestPlan service enabled |
| deploy | A | Complete | Complete | Strong and broad | Strong | Present | Strong | Empty-but-validated | List paths now resolve correctly in Beijing 4, but the tenant currently has no deploy apps, tasks, or histories |
| build | A | Complete | Complete | Strong and broad | Strong | Present | Strong | Empty-but-validated | Project-level build paths are reachable and parse correctly, but the tenant currently has no build jobs or records |
| artifact | A | Complete | Complete | Broad enough for daily use | Strong | Present | Strong | Empty-but-validated | Repository, version, and latest-file discovery paths are reachable, but the tenant currently has no artifact data |
| govern | A | Complete | Complete | Focused but coherent | Strong | Present | Strong | Empty-but-validated | SBC quota endpoint is now confirmed live and returns a valid not-open state for the sampled tenant |
| inspector | A | Complete | Complete | Focused and coherent | Strong | Present | Strong | Empty-but-validated | Official VSS endpoint is confirmed live and the sampled tenant currently has no website scan domains |
| perftest | A | Complete | Complete | Focused and coherent | Strong | Present | Strong | Empty-but-validated | API path is reachable with the regional IAM project id, but the tenant has not opened CodeArts PerfTest |

## req

- Grade: A
- Strengths:
  - `req` has a complete product skeleton with `client.ts`, `schemas.ts`, `tools/index.ts`, and 8 tool files.
  - It is included in tool registration, product tests, server registration tests, and session-aware server tests.
  - README and tool examples cover the main Req workflow, including create/update work item behavior.
- Live validation:
  - `req_list_projects` was validated against the user's Beijing 4 tenant and returned 3 real projects.
- Gaps:
  - The module can still be expanded in depth later, but there is no obvious completion blocker in the current scope.
- Recommended priority:
  - low, because the current implementation looks operationally complete for the exposed scope.

## repo

- Grade: A
- Strengths:
  - `repo` has a complete product skeleton and 24 implemented tool files.
  - The scoped closure package is already implemented: MR changes, discussions, review, merge, protected branches, labels, and tag operations are all present.
  - Repo has strong product tests and shared-session server coverage.
- Live validation:
  - `repo_list_repositories`, `repo_get_repository`, `repo_list_branches`, `repo_get_branch`, and `repo_compare_refs` were validated against real Beijing 4 data.
  - The repo branch-list path needed a real-environment correction and is now aligned with the official endpoint.
- Gaps:
  - Future expansion can still add more scenario-oriented examples, but there is no current completion blocker in the exposed scope.
- Recommended priority:
  - low, because the current exposed Repo scope is now implemented, tested, session-aware, and documented.

## pipeline

- Grade: A
- Strengths:
  - `pipeline` has a complete product skeleton and 16 implemented tool files.
  - The scoped closure package is already implemented: run detail, step outputs, artifacts, approve, reject, retry, stop, runtime parameters, logs, and manual-review context are all present.
  - Pipeline has strong test coverage and shared-session server coverage.
- Live validation:
  - `pipeline_list_pipelines`, `pipeline_list_runs`, `pipeline_get_run`, and `pipeline_get_run_detail` were validated against a real pipeline in the user's Beijing 4 tenant.
  - `pipeline_get_run_parameters` is now confirmed to return a valid empty result when the selected run has no executed parameters.
  - Real-environment corrections were applied for run-summary loading and `pipeline_runs` response parsing.
- Gaps:
  - Future expansion can add more scenario bundles, but the current exposed Pipeline scope has no visible closure blocker.
- Recommended priority:
  - low, because the current exposed Pipeline scope is implemented, tested, session-aware, and documented.

## check

- Grade: A
- Strengths:
  - `check` has a full skeleton and 8 implemented tools, including both read and write operations.
  - Product tests exist and the module is included in registration and shared-session wiring.
- Live validation:
  - `check_list_rulesets` is now validated against the real Beijing 4 tenant through the project-scoped ruleset endpoint.
  - `check_list_tasks` is now validated against the real Beijing 4 tenant and returned a non-empty task sample.
  - Real-environment corrections were required for the project-scoped `/v2/{project_id}/rulesets` and `/v2/{project_id}/tasks` paths.
- Gaps:
  - Detail paths such as task metrics and issue pagination still need another live pass, but the module is no longer blocked at the discovery layer.
- Recommended priority:
  - low for implementation, medium for future live-sample verification.

## testplan

- Grade: A
- Strengths:
  - `testplan` has a full skeleton and 7 implemented tools, including `run_cases`.
  - Product tests, registration coverage, and shared-session support are present.
- Live validation:
  - The CloudTest project plan endpoint is reachable in Beijing 4.
  - The sampled CodeArts projects currently return `CLOUDTEST.00012003`, which means the projects do not have TestPlan service enabled rather than the client path being broken.
- Gaps:
  - Non-empty live validation still requires a project that has actually opened TestPlan service.
- Recommended priority:
  - low for implementation, medium for future live-sample verification.

## deploy

- Grade: A
- Strengths:
  - `deploy` has a full skeleton and 13 implemented tools spanning inspection and action workflows.
  - The module has strong product-level tests and shared-session support.
  - Newer Beijing 4 endpoint and request-shape compatibility is now baked into the client.
- Live validation:
  - `deploy_list_apps` and `deploy_list_tasks` were validated against the user's Beijing 4 tenant after endpoint and pagination-shape corrections.
  - The current tenant has no deploy apps, tasks, or histories, so Deploy detail tools are in an empty-but-validated state rather than blocked.
  - Compatibility support is now in place for newer Deploy history, execution-param, status, and app-log request shapes.
- Gaps:
  - Non-empty live detail validation still requires a tenant with actual deploy records.
- Recommended priority:
  - low for implementation, medium for future live-sample verification once deploy data exists.

## build

- Grade: A
- Strengths:
  - `build` has a full skeleton and 16 implemented tools with both read and write operations.
  - Product tests and server integration coverage are present.
  - Beijing 4 endpoint configuration has been corrected and validated.
- Live validation:
  - `build_list_jobs`, `build_list_project_records`, and `build_get_project_record_statistics` now resolve successfully against the user's Beijing 4 tenant.
  - The tenant currently has no build jobs or records, so the live responses are empty rather than missing.
- Gaps:
  - Non-empty live validation still requires a tenant that has actual build execution data.
- Recommended priority:
  - low for implementation, medium for later non-empty live-sample verification.

## artifact

- Grade: A
- Strengths:
  - `artifact` has a full skeleton and 12 implemented tools, including read, search, audit, and delete operations.
  - Product tests and server/session integration coverage are present.
  - Beijing 4 endpoint configuration and repository-list path shape have been corrected and validated.
- Live validation:
  - `artifact_list_repositories`, `artifact_list_versions`, and `artifact_list_latest_version_files` now resolve successfully against the user's Beijing 4 tenant.
  - The tenant currently has no artifact repositories, versions, or latest-version files, so the live responses are empty rather than failing.
- Gaps:
  - Non-empty live detail validation still requires a tenant with real artifact data.
- Recommended priority:
  - low for implementation, medium for later non-empty live-sample verification.

## govern

- Grade: A
- Strengths:
  - `govern` has a full skeleton and a coherent 28-tool capability set spanning task lifecycle, multipart upload, report generation/download, quota operations, OSI discovery, and vulnerability/user lookup.
  - Product tests, registration coverage, shared-session coverage, and examples are aligned.
  - The module now covers both the earlier read-only SBC detail paths and the write-side report / quota / upload orchestration paths, plus OSI statistics, software discovery lists, component detail, and component vulnerability lookup.
- Live validation:
  - `govern_get_quota_info` is now confirmed against the real Beijing 4 tenant after aligning the client to the official SBC quota path.
  - The sampled tenant returns a valid closed-state payload with zero quotas, so this module is in an empty-but-validated state.
  - `govern_get_task_status`, `govern_get_open_source_summary`, and `govern_get_open_source_report` now also return provider-side parameter validation on the official SBC paths, which confirms those detail endpoints are wired rather than missing.
  - Multipart task creation is confirmed to hit the real official endpoint and currently fails with provider code `SG.03111300`, which indicates the tenant has zero governance quota rather than an MCP routing issue.
  - `govern_get_osi_statistics`, `govern_list_osi_item_names`, `govern_list_osi_item_versions`, and `govern_get_osi_item_detail` are now confirmed against the real Beijing 4 tenant with successful provider responses, and `govern_list_osi_item_vulns` is confirmed with a valid empty response for a real version sample.
- Gaps:
  - Task-status, summary, and report detail paths still need a tenant that has actual governance tasks to validate non-empty responses.
  - `govern_list_tasks` is still intentionally not exposed because the public materials and live probing have not yielded a trustworthy official URI yet.
  - `sbc/osi/item/dependency` appears in the official January 8, 2026 permission matrix, but live Beijing 4 probing still returns `APIGW.0101`, so it is not exposed yet.
- Recommended priority:
  - low for implementation, medium for future live-sample verification.

## inspector

- Grade: A
- Strengths:
  - `inspector` has a full skeleton and 7 implemented tools.
  - Product tests, registration coverage, and session-aware coverage are present.
  - README and examples now align with the full current Inspector surface.
- Live validation:
  - The official VSS endpoint for this module is `https://vss.myhuaweicloud.com`, matching Huawei's SDK region mapping rather than a region-scoped subdomain.
  - `inspector_list_domains` now returns a real `200` response against the user's Beijing 4 tenant and currently yields an empty domain set.
  - `inspector_get_task`, `inspector_list_results`, `inspector_list_ports`, `inspector_list_business_risks`, and `inspector_get_report_status` all reach the live service and currently fail at the service ACL layer for a fabricated task id instead of failing at routing, which confirms the `webscan` detail-path family is wired correctly.
- Gaps:
  - Non-empty live validation for task detail, results, ports, and business risks still requires at least one configured Inspector domain and scan task.
- Recommended priority:
  - low for implementation, medium for future live-sample verification.

## perftest

- Grade: A
- Strengths:
  - `perftest` has a full skeleton and 9 implemented tools.
  - Product tests, registration coverage, shared-session support, and examples are all present.
  - The current surface is focused and documented well enough for use.
- Live validation:
  - The PerfTest project-list endpoint is reachable in Beijing 4 when called with the regional IAM project id rather than a CodeArts project UUID.
  - The sampled tenant currently returns `SVCSTG.CPTS.4031009`, indicating CodeArts PerfTest has not been opened for this account.
- Gaps:
  - Non-empty live validation still requires the tenant to open PerfTest and create suites/tasks.
- Recommended priority:
  - low for implementation, medium for future live-sample verification.

## Overall Conclusion

- The current repository still reaches an `A`-level completion state for the 11 exposed technical modules under the implementation rubric.
- Real Beijing 4 validation now confirms that `req`, `repo`, and `pipeline` are validated with non-empty tenant data.
- `deploy`, `build`, `artifact`, `govern`, `testplan`, `inspector`, and `perftest` are now validated at the transport and parsing layer in Beijing 4, but the current tenant currently returns empty, closed, or not-enabled business states for them.
- The next phase is not basic module completion. It is either:
  - obtaining richer tenant samples for `deploy`, `build`, and `artifact` detail-path live verification, or
  - expanding depth in the remaining modules that are implementation-complete but not yet sampled live in this tenant.
