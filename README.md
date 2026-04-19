# CodeArts MCP

`codearts-mcp` is an MCP server for Huawei Cloud CodeArts in the China region.

It currently exposes:

<!-- GENERATED:readme-exposure-summary:start -->
- `8` product modules
- `156` product tools
- `2` session/auth tools for shared `http` mode
- `158` total MCP tools in shared `http` mode
<!-- GENERATED:readme-exposure-summary:end -->

Supported transport modes:

- `stdio` for local personal use
- `http + session` for shared team deployment

In shared `http + session` mode:

- each user configures their own session with their own `AK/SK`
- standard usage only requires `AK/SK + region`
- the server resolves the standard CodeArts product endpoints from `region`
- advanced users can still override individual product endpoints

## Covered CodeArts modules

- Req / ProjectMan
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## Current live-validation snapshot

As of `2026-04-19` in `cn-north-4`:

- Fully validated:
  - Req
  - Repo
  - Pipeline
  - Check
  - Build
- Partially but concretely live-validated:
  - TestPlan
  - Deploy
  - Artifact

The main reason some modules are still marked `Partial` is not missing MCP code, but live tenant conditions:

- the target tenant has empty business data
- some official routes are not published in Beijing 4
- some write flows still lack safe real execution samples

## What Works Now

- `Req / Repo / Pipeline / Check`
  - can be used directly on the current exposed surface
- `Build`
  - the main live surface can be used directly
  - all `22` tools are now real-live validated
- `Deploy`
  - the main MCP surface is usable
  - current gaps are mostly template/runtime age and SpringBoot template/package compatibility, not missing base app/environment/host paths
- `Artifact`
  - all currently published routes have corresponding MCP tools
  - the main remaining gap is Beijing 4 unpublished routes, not missing local MCP implementation
- `TestPlan`
  - the published read surface is usable
  - the main remaining gap is still Beijing 4 unpublished routes

## Current module numbers

<!-- GENERATED:readme-module-numbers:start -->
| Module | Tools | Live status | Current breakdown |
| --- | --- | --- | --- |
| Req | 8 | Validated | `8 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Repo | 24 | Validated | `24 Full` |
| Pipeline | 16 | Validated | `16 Full` |
| Check | 8 | Validated | `8 Full` |
| TestPlan | 7 | Partial | `1 Full / 2 Reachable / 4 Unpublished / 0 Code` |
| Deploy | 59 | Partial | Expanded surface; see `docs/wiki/Deploy-Live-Validated.md` for the current live split |
| Build | 22 | Validated | `22 Full / 0 Reachable / 0 Unpublished / 0 Code` |
| Artifact | 12 | Partial | `5 Full / 0 Reachable / 7 Unpublished / 0 Code` |
<!-- GENERATED:readme-module-numbers:end -->

## What is actually blocked

- `TestPlan`
  - `get_plan / list_runs / get_case / run_cases` are currently `APIGW.0101` in Beijing 4
  - current 4-project sweep now finds real plan samples on 2 projects, but issues/cases are still empty
- `Deploy`
  - the control-plane surface is expanded to 59 MCP tools
  - `Codearts-mcp` project now has a real app, task, environment, and connected host path
  - the older `Deploy.00011042` conclusion is no longer the current summary
  - the healthy Node.js template path now has real successful record-bound validation for:
    - `deploy_start_app`
    - `deploy_get_execution_params`
    - `deploy_get_status`
    - `deploy_get_history_detail`
    - `deploy_get_app_log`
    - `deploy_stop_app`
    - `deploy_rollback_app`
  - the current main blocker has moved later into the outdated template runtime:
    - `Node v10.9.0`
    - `forever`
  - detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md`
- `Artifact`
  - 5 tools are fully live-validated
  - 7 routes are re-confirmed by live smoke as unpublished in Beijing 4
  - the local MCP output shape is already normalized across:
    - `repositoryId`
    - `versionId`
    - `archiveId`
    - `fileId`

## Recommended reading order

- Entry:
  - `docs/wiki/Home.md`
- Fast onboarding:
  - `docs/quickstart.md`
  - `docs/client-examples.md`
- Current status:
  - `docs/wiki/Capability-Matrix.md`
  - `docs/wiki/Module-Live-Readiness.md`
  - `docs/wiki/Current-Implementation-Status-2026-04-17.md`
  - `docs/wiki/AKSK-Verification-Ledger-2026-04-17.md`
- Detailed live notes:
  - `docs/wiki/Build-Live-Validated.md`
  - `docs/wiki/Artifact-Live-Validated.md`
  - `docs/wiki/TestPlan-Live-Validated.md`

## Quick start

Install and build:

```bash
npm install
npm run build
```

For maintainers, use `npm run stats:modules` to inspect the current tool counts, `npm run stats:check-docs` to detect drift, and `npm run stats:sync-docs` after changing the exposed tool surface.

For local `stdio` mode, prepare at least:

```env
MCP_TRANSPORT=stdio
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

Standard regions can stop there. The server will resolve the standard CodeArts product endpoints from `region`.

If you need custom routes, override only the product `HUAWEICLOUD_*_BASE_URL` values you actually need. See `.env.example` for the full optional key list.

For shared `http + session` mode, users usually only need to call `auth_configure_session` with:

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

The server will fill the standard CodeArts product endpoints for that region automatically. If needed, callers can still override any individual `*_base_url`.

Full onboarding steps are in `docs/quickstart.md`.
