# Quick Start

## 1. Install and Build

```bash
npm install
npm run build
```

## 2. Configure Environment Variables

Minimum setup:

```env
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

For standard regions, that is enough. The server resolves the standard CodeArts product endpoints from `region`.

If your tenant uses non-standard routes, add only the specific `HUAWEICLOUD_*_BASE_URL` overrides you need. The optional key list and Beijing 4 examples are kept in `.env.example`.

## 3. Start the Server

Local `stdio`:

```bash
npx tsx src/server/index.ts
```

Shared `http`:

```bash
set MCP_TRANSPORT=http
set MCP_HTTP_PORT=3000
npx tsx src/server/index.ts
```

## 4. Configure a Shared HTTP Session

After connecting to the shared MCP server, run `auth_configure_session`.

In normal shared deployment:

- the server can be deployed once on a shared machine
- each user keeps using their own Huawei Cloud account
- each user only needs to configure their own:
  - `AK`
  - `SK`
  - `region`

Standard usage only needs:

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

For standard regions, the server fills the CodeArts product endpoints automatically from `region`.

That means most users do not need to manually configure any product-specific `*_base_url`.

If a tenant needs a custom route, you can still override any subset of the product `*_base_url` fields in the session payload.

## 5. Recommended First Validation Order

Try these read tools first:

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `build_list_jobs`

This quickly tells you whether credentials, region, and the main product endpoints are configured correctly.

## 6. Common Notes

- `Artifact` often also needs a real `tenant_id`
- prefer `dry_run: true` before real writes
- `stdio` mode still uses startup environment variables
- in shared `http + session` mode, `AK/SK + region` is enough for standard regions
- in shared `http + session` mode, run `auth_configure_session` first
- shared deployment does not mean shared business credentials
- shared mode still supports explicit per-product endpoint overrides
- use `docs/wiki/` as the source of truth for current live status
