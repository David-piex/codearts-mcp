export type TestPlanOfficialEndpointTool = {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  pathTemplate: string;
  description: string;
  write: boolean;
};

export const testPlanOfficialEndpointTools = [
  {
    name: "testplan_get_aw_cata_child_cata_data",
    method: "GET",
    pathTemplate: "/v1/{project_id}/aw_cata/child_cata_data",
    description: "Get CodeArts TestPlan AW catalog child catalog data through the official v1 API",
    write: false
  },
  {
    name: "testplan_get_aw_name_view",
    method: "GET",
    pathTemplate: "/v1/{project_id}/get_awName_view",
    description: "Get CodeArts TestPlan AW name view through the official v1 API",
    write: false
  },
  {
    name: "testplan_upload_custom_aw_files_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/{custom_aw_id}/files",
    description: "Upload CodeArts TestPlan custom AW files through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_import_testcases_swagger_file_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcases/swagger-file",
    description: "Import CodeArts TestPlan testcases from Swagger file through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_dynamic_param_variables_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/variables/updateDynamicParam",
    description: "Update CodeArts TestPlan dynamic parameter variables through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_import_basic_aw_json_merge_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/basic_aw/import_json_merge",
    description: "Import and merge CodeArts TestPlan basic AW JSON through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_testcase_node_id_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcases/node-id",
    description: "Get CodeArts TestPlan testcase node IDs through the official v2 API",
    write: false
  },
  {
    name: "testplan_create_combined_aw_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/basic-aw/combined-aw",
    description: "Create CodeArts TestPlan combined AW through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_deal_variables_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/variables/batch-deal",
    description: "Batch process CodeArts TestPlan variables through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_combined_aw_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/basic-aw/combined-aw",
    description: "Create CodeArts TestPlan combined AW through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_download_export_testcases_file_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/export-testcases-file/download",
    description: "Create CodeArts TestPlan testcase export download through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_upload_images_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/images/upload",
    description: "Upload CodeArts TestPlan images through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_deal_variables_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/variables/batch-deal",
    description: "Batch process CodeArts TestPlan variables through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_feature_structures_v4",
    method: "POST",
    pathTemplate: "/v4/feature/structures",
    description: "Create CodeArts TestPlan feature structures through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_project_phoenix_demo_v4",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/phoenix-demo",
    description: "Create CodeArts TestPlan project Phoenix demo data through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_project_user_record_v4",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/user-record",
    description: "Create CodeArts TestPlan project user record through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_asset_tree_node_v1",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/asset-tree/{asset_id}/{id}",
    description: "Delete CodeArts TestPlan asset-tree node through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_testcase_v1",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/delete/testcase",
    description: "Delete CodeArts TestPlan testcase through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_delete_mindmaps_v1",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/mindmaps/batch",
    description: "Batch delete CodeArts TestPlan mindmaps through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_testcase_cache_deprecated_v1",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/testcase/{tmss_case_uri}/cache/deprecated",
    description: "Delete deprecated CodeArts TestPlan testcase cache through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_testcases_v1",
    method: "DELETE",
    pathTemplate: "/v1/{project_id}/testcases/delete",
    description: "Delete CodeArts TestPlan testcases through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_project_testcases_quote_keyword_v1",
    method: "DELETE",
    pathTemplate: "/v1/projects/{project_id}/testcases/quote-keyword",
    description: "Delete CodeArts TestPlan project testcase quote-keyword data through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_service_v1",
    method: "DELETE",
    pathTemplate: "/v1/services/{service_id}",
    description: "Delete CodeArts TestPlan service through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_basic_aw_cata_v3",
    method: "DELETE",
    pathTemplate: "/v3/{project_id}/basic-aw/cata/{id}",
    description: "Delete CodeArts TestPlan basic AW catalog through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_resource_number_rule_v4",
    method: "DELETE",
    pathTemplate: "/v4/{project_id}/resource-number-rule/{uri}",
    description: "Delete CodeArts TestPlan resource number rule through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_delete_project_field_config_option_value_v4",
    method: "DELETE",
    pathTemplate: "/v4/projects/{project_id}/field-configs/option-value",
    description: "Delete CodeArts TestPlan project field config option value through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_excel_template_v1",
    method: "GET",
    pathTemplate: "/v1/{project_id}/excel/template",
    description: "Get CodeArts TestPlan Excel testcase template through the official v1 API",
    write: false
  },
  {
    name: "testplan_get_testcase_variable_v1",
    method: "GET",
    pathTemplate: "/v1/{project_id}/testcase/{tmss_case_uri}/varaiable",
    description: "Get CodeArts TestPlan testcase variable data through the official v1 API",
    write: false
  },
  {
    name: "testplan_get_testcase_logdata_v2",
    method: "GET",
    pathTemplate: "/v2/testcase/logdata",
    description: "Get CodeArts TestPlan testcase log data through the official v2 API",
    write: false
  },
  {
    name: "testplan_get_tep_agent_deploy_script_v3",
    method: "GET",
    pathTemplate: "/v3/hutaf-ticc/tm/tep-agent/deploy-script",
    description: "Get CodeArts TestPlan TEP agent deploy script through the official v3 API",
    write: false
  },
  {
    name: "testplan_get_background_file_v4",
    method: "GET",
    pathTemplate: "/v4/{project_id}/background/{file_name}",
    description: "Get CodeArts TestPlan background file metadata through the official v4 API",
    write: false
  },
  {
    name: "testplan_import_asset_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/asset/import",
    description: "Import CodeArts TestPlan asset through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_basic_aw_ids_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/basic-aw/ids",
    description: "Get CodeArts TestPlan basic AW IDs through the official v1 API",
    write: false
  },
  {
    name: "testplan_batch_testcase_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/batch/testcase",
    description: "Batch process CodeArts TestPlan testcases through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_import_excel_testcases_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/excel/testcases",
    description: "Import CodeArts TestPlan Excel testcases through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_copy_mindmaps_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/mindmaps/copy",
    description: "Copy CodeArts TestPlan mindmaps through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_notice_config_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/notice_config/update",
    description: "Update CodeArts TestPlan notice config through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_testcase_cache_deprecated_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcase/{tmss_case_uri}/cache/deprecated",
    description: "Create deprecated CodeArts TestPlan testcase cache through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_testcase_legacy_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcase/batch",
    description: "Batch process CodeArts TestPlan testcase data through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_merge_testcase_branch_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcase/branch/merge",
    description: "Merge CodeArts TestPlan testcase branch through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_query_testcases_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcases/batch-query",
    description: "Batch query CodeArts TestPlan testcases through the official v1 API",
    write: false
  },
  {
    name: "testplan_import_testcases_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/testcases/import",
    description: "Import CodeArts TestPlan testcases through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_export_variables_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/variables/export",
    description: "Export CodeArts TestPlan variables through the official v1 API",
    write: false
  },
  {
    name: "testplan_import_variables_v1",
    method: "POST",
    pathTemplate: "/v1/{project_id}/variables/import",
    description: "Import CodeArts TestPlan variables through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_automatic_testsuite_v1",
    method: "POST",
    pathTemplate: "/v1/automatic/{project_id}/testsuite",
    description: "Create CodeArts TestPlan automatic testsuite through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_project_execute_info_v1",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/execute-info",
    description: "Create CodeArts TestPlan project execute info through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_project_testcases_quote_keyword_v1",
    method: "POST",
    pathTemplate: "/v1/projects/{project_id}/testcases/quote-keyword",
    description: "Create CodeArts TestPlan project testcase quote-keyword data through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_backup_mindmaps_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/mindmap-backups/backup",
    description: "Backup CodeArts TestPlan mindmaps through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_list_reviews_page_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/reviews/page",
    description: "List CodeArts TestPlan testcase reviews through the official v2 page API",
    write: false
  },
  {
    name: "testplan_copy_testcase_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcase/copy",
    description: "Copy CodeArts TestPlan testcase through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_import_testcases_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcases/import",
    description: "Import CodeArts TestPlan testcases through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_confirm_import_testcases_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcases/import/confirm",
    description: "Confirm CodeArts TestPlan testcase import through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_list_testcases_page_v2",
    method: "POST",
    pathTemplate: "/v2/{project_id}/testcases/page",
    description: "List CodeArts TestPlan testcases through the official v2 page API",
    write: false
  },
  {
    name: "testplan_create_testcase_logdata_v2",
    method: "POST",
    pathTemplate: "/v2/testcase/logdata",
    description: "Create CodeArts TestPlan testcase log data through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_list_aw_cata_aw_info_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/aw_cata/aw_info_list",
    description: "List CodeArts TestPlan AW catalog info through the official v3 API",
    write: false
  },
  {
    name: "testplan_list_aw_cata_aw_info_kebab_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/aw-cata/aw-info-list",
    description: "List CodeArts TestPlan AW catalog info through the official v3 kebab-case API",
    write: false
  },
  {
    name: "testplan_create_basic_aw_cata_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/basic-aw/cata",
    description: "Create CodeArts TestPlan basic AW catalog through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_basic_aw_order_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/basic-aw/order",
    description: "Update CodeArts TestPlan basic AW order through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_list_templates_page_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/templates/page",
    description: "List CodeArts TestPlan templates through the official v3 page API",
    write: false
  },
  {
    name: "testplan_copy_testcases_v3",
    method: "POST",
    pathTemplate: "/v3/{project_id}/testcases/copy",
    description: "Copy CodeArts TestPlan testcases through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_task_obj_tcinfo_v3",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/task-objs/tcinfo",
    description: "Get CodeArts TestPlan task object testcase info through the official v3 API",
    write: false
  },
  {
    name: "testplan_list_tcresult_attachment_names_v3",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/tcresult-attachment-names",
    description: "List CodeArts TestPlan testcase result attachment names through the official v3 API",
    write: false
  },
  {
    name: "testplan_generate_tep_agent_deploy_package_v3",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/tep-agent/deploy-package/generate",
    description: "Generate CodeArts TestPlan TEP agent deploy package through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_create_testcase_log_v3",
    method: "POST",
    pathTemplate: "/v3/hutaf-ticc/tm/testcase-log",
    description: "Create CodeArts TestPlan testcase log through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_task_detail_v3",
    method: "POST",
    pathTemplate: "/v3/task/detail",
    description: "Get CodeArts TestPlan task detail through the official v3 API",
    write: false
  },
  {
    name: "testplan_get_task_execution_v3",
    method: "POST",
    pathTemplate: "/v3/task/execution",
    description: "Get CodeArts TestPlan task execution through the official v3 API",
    write: false
  },
  {
    name: "testplan_list_tasks_v3",
    method: "POST",
    pathTemplate: "/v3/task/list",
    description: "List CodeArts TestPlan tasks through the official v3 API",
    write: false
  },
  {
    name: "testplan_batch_add_features_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/features/batch-add",
    description: "Batch add CodeArts TestPlan features through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_check_testcase_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcase/check",
    description: "Check CodeArts TestPlan testcase through the official v4 API",
    write: false
  },
  {
    name: "testplan_query_testcases_keyword_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/testcases/keyword",
    description: "Query CodeArts TestPlan testcase keywords through the official v4 API",
    write: false
  },
  {
    name: "testplan_generate_custom_report_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{plan_id}/custom-reports/generate",
    description: "Generate CodeArts TestPlan custom report through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_version_issue_tree_v4",
    method: "POST",
    pathTemplate: "/v4/{project_id}/versions/{version_uri}/issue-tree",
    description: "Get CodeArts TestPlan version issue tree through the official v4 API",
    write: false
  },
  {
    name: "testplan_create_project_field_config_option_value_v4",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/field-configs/option-value",
    description: "Create CodeArts TestPlan project field config option value through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_batch_update_user_package_enable_v4",
    method: "POST",
    pathTemplate: "/v4/projects/{project_id}/user-package-enable/batch-update",
    description: "Batch update CodeArts TestPlan user package enablement through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_get_resource_restore_types_v4",
    method: "POST",
    pathTemplate: "/v4/resource/restore/types",
    description: "Get CodeArts TestPlan resource restore types through the official v4 API",
    write: false
  },
  {
    name: "testplan_batch_query_testcases_v5",
    method: "POST",
    pathTemplate: "/v5/{project_id}/testcases/batch-query",
    description: "Batch query CodeArts TestPlan v5 testcases through the official v5 API",
    write: false
  },
  {
    name: "testplan_update_mindmap_name_v1",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/mindmaps/{id}/name",
    description: "Update CodeArts TestPlan mindmap name through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_default_variable_v1",
    method: "PUT",
    pathTemplate: "/v1/{project_id}/variable/default",
    description: "Update CodeArts TestPlan default variable through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_service_v1",
    method: "PUT",
    pathTemplate: "/v1/services/{service_id}",
    description: "Update CodeArts TestPlan service through the official v1 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_mark_basic_aws_v2",
    method: "PUT",
    pathTemplate: "/v2/{project_id}/basic-aws/mark",
    description: "Mark CodeArts TestPlan basic AWs through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_testcase_v2",
    method: "PUT",
    pathTemplate: "/v2/{project_id}/testcase/{tmss_case_uri}",
    description: "Update CodeArts TestPlan testcase through the official v2 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_basic_aw_cata_v3",
    method: "PUT",
    pathTemplate: "/v3/{project_id}/basic-aw/cata/{id}",
    description: "Update CodeArts TestPlan basic AW catalog through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_combined_aw_v3",
    method: "PUT",
    pathTemplate: "/v3/{project_id}/basic-aw/combined-aw/{aw_id}",
    description: "Update CodeArts TestPlan combined AW through the official v3 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_basic_aw_order_put_v3",
    method: "PUT",
    pathTemplate: "/v3/{project_id}/basic-aw/order",
    description: "Update CodeArts TestPlan basic AW order through the official v3 PUT API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_combined_aw_v4",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/basic-aw/combined-aw/{aw_id}",
    description: "Update CodeArts TestPlan combined AW through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_resource_number_rule_v4",
    method: "PUT",
    pathTemplate: "/v4/{project_id}/resource-number-rule/{uri}",
    description: "Update CodeArts TestPlan resource number rule through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_move_feature_v4",
    method: "PUT",
    pathTemplate: "/v4/features/{feature_uri}/move",
    description: "Move CodeArts TestPlan feature through the official v4 API (dry-run by default)",
    write: true
  },
  {
    name: "testplan_update_project_field_config_option_value_v4",
    method: "PUT",
    pathTemplate: "/v4/projects/{project_id}/field-configs/option-value",
    description: "Update CodeArts TestPlan project field config option value through the official v4 API (dry-run by default)",
    write: true
  }
] as const satisfies readonly TestPlanOfficialEndpointTool[];

export const testPlanOfficialEndpointToolNames = testPlanOfficialEndpointTools.map((tool) => tool.name);

export function getTestPlanOfficialEndpointTool(name: string) {
  return testPlanOfficialEndpointTools.find((tool) => tool.name === name);
}
