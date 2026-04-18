# AKSK Validation Gap Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining non-`AK/SK Full` gaps in the current CodeArts MCP surface and leave every unfinished item explicitly classified as either live-validated, tenant-blocked, or region-unpublished.

**Architecture:** This closure pass does not add new product modules. It focuses on tightening validation around the existing Build, Artifact, TestPlan, and Deploy tools by separating three states: `Code/Test Only`, `AK/SK Reachable`, and `Region Unpublished`. Each task updates the matching live tests and the status wiki so the repo has one consistent source of truth.

**Tech Stack:** TypeScript, Node.js, Jest, Huawei Cloud CodeArts AK/SK live smoke tests, Markdown wiki docs.

---

### Task 1: Close Build helper tools from `Code/Test Only` to explicit live outcome

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\build\tools\configure-release-upload-step.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\tools\prepare-deployable-node-app.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\tools\prepare-node-runtime-bundle.ts`
- Test: `D:\Code\codearts-mcp\tests\products\build\client-configure-release-upload-step.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\build\tools\configure-release-upload-step.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\build\tools\prepare-deployable-node-app.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\build\tools\prepare-node-runtime-bundle.test.ts`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Current-Implementation-Status-2026-04-17.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`

- [ ] Confirm whether each helper can be validated through a real job mutation preview or only through deterministic local transformation.
- [ ] If a helper can safely read current remote job state in `dry_run`, add a live probe path and capture a real preview result.
- [ ] If a helper is inherently local-only, keep it in `Code/Test Only` and document the reason explicitly in the status wiki instead of leaving it as an ambiguous gap.
- [ ] Run targeted tests for the three helpers and update module totals only after the live outcome is confirmed.

### Task 2: Re-scan Artifact unpublished routes and separate `Region Unpublished` from `tenant empty`

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\delete-file.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\list-build-archives.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\list-files.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\get-file.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\get-download-url.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\search-artifacts.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\show-audit.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\client-live-smoke.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\delete-file-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-build-archives-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-files-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\get-file-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\get-download-url-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\search-artifacts-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\artifact\tools\show-audit-live.test.ts`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Artifact-Live-Validated.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Module-Live-Readiness.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`

- [ ] Re-run the 7 unpublished Artifact routes against Beijing 4 with the current AK/SK and current tenant inputs.
- [ ] Keep any route that still returns `APIGW.0101` in `Region Unpublished`, but record the exact route, date, and probe shape.
- [ ] If any route becomes published, promote it to either `AK/SK Reachable` or `AK/SK Full` based on whether real repository/file business data exists.
- [ ] Keep the live smoke suite aligned with the current published/unpublished split so status numbers can be regenerated from tests instead of manual notes.

### Task 3: Upgrade TestPlan from `one plan list works` to a stable live-state matrix

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\list-plans.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\list-issues.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\list-cases.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\get-plan.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\list-runs.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\get-case.ts`
- Modify: `D:\Code\codearts-mcp\src\products\testplan\tools\run-cases.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\client-live-smoke.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\list-plans-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\list-issues-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\list-cases-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\get-plan-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\list-runs-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\get-case-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\testplan\tools\run-cases-live.test.ts`
- Modify: `D:\Code\codearts-mcp\docs\wiki\TestPlan-Live-Validated.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Current-Implementation-Status-2026-04-17.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`

- [ ] Re-scan the known live projects and confirm whether `list_issues` and `list_cases` are still only empty-but-reachable or can now be upgraded with non-empty business data.
- [ ] Re-probe `get_plan`, `list_runs`, `get_case`, and `run_cases` to make sure they are still true `Region Unpublished` results rather than route-shape drift.
- [ ] If richer plan/case/run data appears, promote the corresponding tools and record the exact project id and sample ids in the wiki.
- [ ] If the routes remain unpublished, leave the tools implemented but lock the status wording so no one mistakes them for unfinished MCP work.

### Task 4: Finish Deploy live-closure around real write previews and rollback-capable records

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\deploy\tools\modify-application.ts`
- Modify: `D:\Code\codearts-mcp\src\products\deploy\tools\create-task-by-template.ts`
- Modify: `D:\Code\codearts-mcp\src\products\deploy\tools\start-app.ts`
- Modify: `D:\Code\codearts-mcp\src\products\deploy\tools\stop-app.ts`
- Modify: `D:\Code\codearts-mcp\src\products\deploy\tools\rollback-app.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\client-live-smoke.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\client-modify-application.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\tools\create-task-by-template.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\tools\modify-application.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\tools\start-app-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\tools\stop-app-live.test.ts`
- Test: `D:\Code\codearts-mcp\tests\products\deploy\tools\rollback-app-live.test.ts`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Deploy-Live-Validated.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Module-Live-Readiness.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`

- [ ] Keep `modify_application` and `create_task_by_template` `dry_run` on real validation previews and extend them only if the current preview still misses critical provider checks.
- [ ] Obtain at least one rollback-eligible real record and upgrade `deploy_rollback_app` from `AK/SK Reachable` to `AK/SK Full` if the service accepts the rollback.
- [ ] Reconfirm that `deploy_start_app`, `deploy_stop_app`, `deploy_get_execution_params`, `deploy_get_status`, `deploy_get_history_detail`, and `deploy_get_app_log` stay on the healthy Node.js template path and are not regressed by template drift.
- [ ] Keep the remaining blocker wording precise: the gap is outdated template runtime and missing rollback sample, not `Deploy not MCPized`.

### Task 5: Regenerate the final status ledger and freeze one source of truth

**Files:**
- Modify: `D:\Code\codearts-mcp\docs\wiki\Current-Implementation-Status-2026-04-17.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Module-Live-Readiness.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Artifact-Live-Validated.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\TestPlan-Live-Validated.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Deploy-Live-Validated.md`

- [ ] Recompute the counts for `AK/SK Full`, `AK/SK Reachable`, `Region Unpublished`, and `Code/Test Only`.
- [ ] Make the top-level status page match the detailed module pages exactly.
- [ ] Add a short `still not AK/SK Full` table so future sessions can answer this question without re-reading five wiki pages.
- [ ] Run the repo build plus the relevant targeted live/unit suites before declaring the numbers final.

## Current non-`AK/SK Full` baseline to close

- `Build`
  - `Code/Test Only`
    - `build_configure_release_upload_step`
    - `build_prepare_deployable_node_app`
    - `build_prepare_node_runtime_bundle`
- `Artifact`
  - `Region Unpublished`
    - `artifact_delete_file`
    - `artifact_list_build_archives`
    - `artifact_list_files`
    - `artifact_get_file`
    - `artifact_get_download_url`
    - `artifact_search_artifacts`
    - `artifact_show_audit`
- `TestPlan`
  - `AK/SK Reachable`
    - `testplan_list_issues`
    - `testplan_list_cases`
  - `Region Unpublished`
    - `testplan_get_plan`
    - `testplan_list_runs`
    - `testplan_get_case`
    - `testplan_run_cases`
- `Deploy`
  - `AK/SK Reachable / Partial closure`
    - `deploy_rollback_app`
    - healthy template path still blocked by outdated runtime (`Node v10.9.0` + `forever`)
    - one explicit skipped route remains outside closure scope:
      - `PUT /v4/projects/{project_id}/environments/{environment_id}/hosts`
