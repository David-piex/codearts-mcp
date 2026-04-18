# FAQ

## 1. I set `AK/SK`, but authentication still fails

Check these first:

- region is really `cn-north-4`
- for standard regions, rely on `region` first; only inspect `*_base_url` if you intentionally use non-standard routes
- in `http + session` mode, `auth_configure_session` was actually called

## 2. Req works, but other modules do not

That usually means:

- `AK/SK` is probably fine
- the problem is the specific product endpoint, permissions, or missing business data

Validate one read tool per module instead of assuming the whole server is broken.

## 3. Why does shared mode require `auth_configure_session` first

In shared deployment, credentials are isolated per MCP session. The server does not keep one global business credential for every user.

## 4. In shared deployment, does everyone need to configure all product base URLs

Usually no.

For standard regions, each user normally only needs:

- their own `AK`
- their own `SK`
- their own `region`

The server resolves the standard CodeArts product endpoints from `region`.

You only need per-product `*_base_url` overrides if your tenant really uses non-standard routes.

## 5. Why do you recommend `dry_run` first for write operations

It lets you validate parameters and intent before changing real resources.

## 6. Why are some modules still marked `Partial`

Common reasons:

- code and schema are implemented, but the tenant has no matching business data
- the official route is not published in the current region
- the write path is implemented, but there is no safe real execution sample yet

## 7. Why did the docs become messy

The repository went through a larger expansion phase before being narrowed back to the current 8-module surface. During that process, root docs and wiki docs briefly mixed snapshots from different stages. The current source of truth is the `docs/wiki/` set plus the top-level `README.md`.
