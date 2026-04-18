# Product Overview

The current repository only keeps these `8` CodeArts modules:

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## Positioning

`codearts-mcp` is a unified MCP server layer for CodeArts. It exposes the modules above through a consistent authentication model, transport model, and tool style.

## Module Boundaries

- `Req`: projects, iterations, members, and work-item read/write flows
- `Repo`: repositories, branches, commits, files, tags, and merge requests
- `Pipeline`: pipelines, runs, logs, approvals, retries, stops, and triggers
- `Check`: code check tasks, rulesets, issues, metrics, and task execution
- `TestPlan`: plans, cases, runs, and related issues
- `Deploy`: applications, tasks, histories, logs, start/stop, and rollback
- `Build`: jobs, records, stages, logs, parameters, and execution
- `Artifact`: repositories, versions, files, download, audit, and delete

## Status Entry Points

Use these wiki pages as the source of truth:

- `docs/wiki/Home.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Current-Implementation-Status-2026-04-17.md`
- `docs/wiki/Deploy-Live-Validated.md`
- `docs/wiki/Artifact-Live-Validated.md`

## Current Practical Reading

- If you want the fastest current module summary:
  - start with `docs/wiki/Home.md`
- If you want to know what is truly usable right now:
  - read `docs/wiki/Module-Live-Readiness.md`
- If you want the latest Deploy and Artifact live reality:
  - read `docs/wiki/Deploy-Live-Validated.md`
  - read `docs/wiki/Artifact-Live-Validated.md`
