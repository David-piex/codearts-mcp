# Getting Started

## 1. Install and Build

```bash
npm install
npm run build
```

## 2. Minimum Environment

```env
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
HUAWEICLOUD_REGION=cn-north-4
MCP_TRANSPORT=stdio
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

For standard regions, that is enough. If you need custom routes, set only the specific `HUAWEICLOUD_*_BASE_URL` values you need. The full optional key list is kept in `.env.example`.

## 3. Start

```bash
node dist/src/server/index.js
```

## 4. Recommended First Checks

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `check_list_rulesets`

This quickly separates credential, region, and endpoint issues from deeper module-specific issues.

## 5. Shared HTTP Mode

If you use `http` mode, call this first in every session:

- `auth_configure_session`

In a normal shared deployment:

- the MCP server can be deployed once for the team
- each user still uses their own Huawei Cloud identity
- each user usually only needs:
  - `AK`
  - `SK`
  - `region`

Standard shared usage only needs:

```json
{
  "access_key": "your-ak",
  "secret_key": "your-sk",
  "region": "cn-north-4"
}
```

The server resolves the standard CodeArts product endpoints from `region`.

So for standard regions, most users do not need to manually provide any product-specific base URL.

If your tenant needs a custom route, you can still override any subset of the product `*_base_url` session fields.

## 6. Common First Pitfalls

- `TestPlan` returns `CLOUDTEST.00012003` when the product is not enabled on the target project
- `Artifact` usually also requires a real `tenant_id`
