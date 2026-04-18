# Troubleshooting

## Common Error Codes

| Error Code | Meaning | Check First |
| --- | --- | --- |
| `CLOUDTEST.00012003` | TestPlan is not enabled on the target project | project service state, `cloudtest-ext` endpoint |
| `APIGW.0101` | Route is not published in the current region | current product endpoint and regional publication state |
| `DEVPIPE.00011136` | the `project_id` does not own that pipeline | call `pipeline_list_pipelines` first and use the returned owner `project_id` |

## If One Product Works but Another Does Not

Check these before assuming the whole MCP server is broken:

- the base URL for that product is wrong
- the target product is not enabled
- the id type you passed is wrong
- the tenant does not have enough business data for that route

## Important ID Types

- most CodeArts modules: `project_id` is a CodeArts project UUID
- `artifact_*`: you also need `tenant_id`
- `pipeline_*`:
  - `pipeline_list_pipelines` can return pipelines whose owner `project_id` differs from the query project
  - for follow-up calls like `pipeline_get_pipeline`, `pipeline_get_run`, `pipeline_get_run_detail`, and `pipeline_list_artifacts`, prefer the `project_id` returned on the pipeline record itself

## Minimal Debug Order

1. run `req_list_projects`
2. run `repo_list_repositories`
3. run `pipeline_list_pipelines`
4. run the first read tool of the target module
5. then read the provider error code before guessing

## Related Docs

- `docs/faq.md`
- `docs/live-readiness-checklist.md`
- `docs/live-readiness-checklist.en.md`
