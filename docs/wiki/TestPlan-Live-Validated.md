# TestPlan Live Validated

Last updated: `2026-04-17`

Region: `cn-north-4`

Base URL: `https://cloudtest-ext.cn-north-4.myhuaweicloud.com`

Validated with real tenant credentials.

Scanned CodeArts project ids:

- `7bd39587c14048aebdadd0f9c22b1402`
- `b60f3ec187f34c35ad3033d1d6d73876`
- `eed055d650fb49dd88e49e6bdf88d344`
- `eb80951449fa4af8bac57494f0f4defd`

Known live TestPlan samples:

- `project_id`: `7bd39587c14048aebdadd0f9c22b1402`
  - `plan_id`: `vd1j00011amm0nec`
  - `plan_name`: `dwc`
- `project_id`: `7bd39587c14048aebdadd0f9c22b1402`
  - `plan_id`: `vd1k00011am7d6gv`
  - `plan_name`: provider returns a second non-empty real plan name on this project
- `project_id`: `eb80951449fa4af8bac57494f0f4defd`
  - `plan_id`: `vd040000umltrdd2`
  - `plan_name`: provider returns a non-empty real plan name on this project

## Confirmed live results

- `testplan_list_plans`
  - Real API call succeeds on projects:
    - `7bd39587c14048aebdadd0f9c22b1402`
    - `eb80951449fa4af8bac57494f0f4defd`
  - Confirmed route:
    - `GET /v1/projects/{project_id}/plans?offset={offset}&limit={limit}`
  - Real success samples contain:
    - `plan_id: vd1j00011amm0nec`
    - `plan_id: vd1k00011am7d6gv`
    - `plan_id: vd040000umltrdd2`
    - non-empty `name`
    - `status: create` or `status: execute`
  - On projects:
    - `b60f3ec187f34c35ad3033d1d6d73876`
    - `eed055d650fb49dd88e49e6bdf88d344`
  - The current tenant returns:
    - `400 CLOUDTEST.00012003`
    - target project has not enabled TestPlan

- `testplan_list_issues`
  - Real API call succeeds on the known live plans.
  - Confirmed route:
    - `GET /v1/projects/{project_id}/plans/{plan_id}/issues?offset=0&limit=100`
  - Important compatibility note:
    - the provider requires query parameter `limit`
    - the MCP client now defaults to `offset=0&limit=100`
  - Current tenant returns:
    - `issues: []`

- `testplan_list_cases`
  - Real API call succeeds on the known live plans.
  - Confirmed route:
    - `POST /GT3KServer/v4/{project_id}/testcases/batch-query`
  - Current tenant returns:
    - `cases: []`

- `testplan_get_plan`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /v1/projects/{project_id}/plans/{plan_id}`

- `testplan_list_runs`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /v1/projects/{project_id}/plans/{plan_id}/runs?...`

- `testplan_get_case`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `GET /GT3KServer/v4/{project_id}/testcases/{case_id}`

- `testplan_run_cases`
  - Real API call reaches the live gateway but the current Beijing 4 environment returns:
    - `404 APIGW.0101`
    - `The API does not exist or has not been published in the environment`
  - Current route under test:
    - `POST /GT3KServer/v4/{project_id}/testcases/execute`
  - Safe validation was performed with a clearly non-existent probe `case_id` to avoid triggering a real execution.

## Current tenant state

- TestPlan is not uniformly enabled across the scanned projects.
- Two scanned projects already have real plan samples.
- The currently validated live plan still has empty issues and cases.

## Live smoke inputs

- The repo now includes a real smoke test at:
  - `tests/products/testplan/client-live-smoke.test.ts`
- Required env:
  - `HUAWEICLOUD_REGION`
  - `HUAWEICLOUD_AK`
  - `HUAWEICLOUD_SK`
  - `HUAWEICLOUD_TESTPLAN_BASE_URL`
  - `MCP_SERVER_NAME`
  - `MCP_SERVER_VERSION`
- Optional generic console override:
  - `HUAWEICLOUD_BASE_URL`
- Optional env:
  - `HUAWEICLOUD_TESTPLAN_LIVE_PROJECT_IDS`
  - `HUAWEICLOUD_TESTPLAN_LIVE_PLAN_ID`
  - when `HUAWEICLOUD_TESTPLAN_LIVE_PROJECT_IDS` is omitted, the repository now defaults to the 4-project sweep listed above

## Follow-up targets

- Re-check `testplan_get_plan`, `testplan_list_runs`, `testplan_get_case`, and `testplan_run_cases` later in case the currently tested routes are not the published Beijing 4 routes.
- Obtain a non-empty plan sample with issues, cases, and runs so `list_issues` and `list_cases` can be upgraded from empty/reachable to full.
