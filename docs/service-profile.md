# Service Profile

## Active Modules

The repository currently exposes only these `8` CodeArts modules:

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## Unified Access Model

- personal local usage: `stdio`
- shared team deployment: `http + auth_configure_session`

## Shared Constraints

- default region is `cn-north-4`
- standard regions normally only need `AK/SK + region`
- each module can still override its own base URL when a tenant uses non-standard routes
- in shared mode, every session uses its own `AK/SK`
- write tools should prefer `dry_run` first where supported

## Module Characteristics

- `Req / Repo / Pipeline` are usually the fastest modules to validate first
- `Check / TestPlan / Deploy / Build / Artifact` depend more on existing tenant business data
- `Artifact` often needs `tenant_id` in addition to `project_id`
- `Deploy` is no longer mainly blocked by missing basic resources; the current practical blocker is the outdated healthy-template runtime path

## Recommended Reading Order

1. `README.md`
2. `docs/quickstart.md`
3. `docs/client-examples.md`
4. `docs/tool-examples.md`
5. `docs/wiki/Home.md`
