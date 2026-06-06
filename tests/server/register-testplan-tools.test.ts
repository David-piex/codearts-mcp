import { describe, expect, it, vi } from "vitest";
import { registerTestPlanTool } from "../../src/server/register-testplan-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerTestPlanTool", () => {
  it("registers a known testplan tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_plans",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_plans",
      expect.objectContaining({
        title: "testplan_list_plans",
        description: "List CodeArts TestPlan plans"
      }),
      expect.any(Function)
    );
  });

  it("registers a known testplan tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_run_cases",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_run_cases",
      expect.objectContaining({
        title: "testplan_run_cases",
        description: "Run CodeArts TestPlan cases"
      }),
      expect.any(Function)
    );
  });

  it("registers project local config read tool", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_get_project_local_config",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_get_project_local_config",
      expect.objectContaining({
        title: "testplan_get_project_local_config",
        description: "Get CodeArts TestPlan project local configuration"
      }),
      expect.any(Function)
    );
  });

  it("registers API test AW metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_api_test_child_basic_aws",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_api_test_child_basic_aws",
      expect.objectContaining({
        title: "testplan_list_api_test_child_basic_aws",
        description: "List CodeArts TestPlan API test child basic AW entries without script content"
      }),
      expect.any(Function)
    );
  });

  it("registers test design template download metadata tool", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_download_test_design_template",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_download_test_design_template",
      expect.objectContaining({
        title: "testplan_download_test_design_template",
        description: "Get CodeArts TestPlan test design template download metadata"
      }),
      expect.any(Function)
    );
  });

  it("registers testcase dataset and Excel error read tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_get_excel_error_testcases", "Get CodeArts TestPlan Excel error testcase generation result"],
      ["testplan_get_testcase_dataset", "Get CodeArts TestPlan testcase dataset by case URI and group ID"],
      ["testplan_get_case_logdata_upload_url", "Get CodeArts TestPlan case logdata upload URL"],
      ["testplan_get_case_logdata_archive", "Get CodeArts TestPlan case logdata archive request data"],
      ["testplan_list_resource_operation_records", "List CodeArts TestPlan resource operation records"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers testcase existence and automation URI query tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_check_testcase_exists", "Check whether CodeArts TestPlan testcase URIs exist"],
      ["testplan_search_testcase_uris_used_for_automation", "Search CodeArts TestPlan testcase URIs used for automation"],
      ["testplan_list_iterator_stage_counts", "List CodeArts TestPlan iterator stage counts"],
      ["testplan_list_issues_tree", "List CodeArts TestPlan issues tree"],
      ["testplan_list_ipd_issues_tree", "List CodeArts TestPlan IPD issues tree"],
      ["testplan_delete_work_item_testrelation", "Delete testcase relations from a CodeArts TestPlan work item"],
      ["testplan_copy_task_relations", "Copy CodeArts TestPlan task relations to another task (dry-run by default)"],
      ["testplan_create_defect_association", "Associate a CodeArts TestPlan defect with an iterator"],
      ["testplan_update_defect_association", "Move a CodeArts TestPlan defect association between iterators"],
      ["testplan_delete_defect_association", "Remove a CodeArts TestPlan defect association from an iterator"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers test report write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_create_test_report", "Create a CodeArts TestPlan test report"],
      ["testplan_create_custom_template_report", "Create a CodeArts TestPlan custom template report"],
      ["testplan_update_custom_template_report", "Update a CodeArts TestPlan custom template report"],
      ["testplan_delete_custom_template_report", "Delete a CodeArts TestPlan custom template report"],
      ["testplan_update_progress_report", "Update a CodeArts TestPlan progress report"],
      ["testplan_delete_progress_report", "Delete a CodeArts TestPlan progress report"],
      ["testplan_refresh_progress_report", "Refresh a CodeArts TestPlan progress report"],
      ["testplan_create_progress_report", "Create a CodeArts TestPlan progress report"],
      ["testplan_update_test_report", "Update a CodeArts TestPlan test report overview"],
      ["testplan_update_test_report_quality_attributes", "Update CodeArts TestPlan test report quality attributes"],
      ["testplan_refresh_custom_template_report", "Refresh a CodeArts TestPlan custom template report"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers project settings write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_add_project_users", "Add CodeArts TestPlan project users (dry-run by default)"],
      ["testplan_delete_project_users", "Delete CodeArts TestPlan project users (dry-run by default)"],
      [
        "testplan_update_project_issue_update_notification",
        "Update CodeArts TestPlan project issue update notification setting (dry-run by default)"
      ],
      [
        "testplan_update_project_message_notices",
        "Update CodeArts TestPlan project message notice configuration (dry-run by default)"
      ]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers functional test status read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_get_functional_test_parallel_summary",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_get_functional_test_parallel_summary",
      expect.objectContaining({
        title: "testplan_get_functional_test_parallel_summary",
        description: "Get CodeArts TestPlan functional test parallel summary"
      }),
      expect.any(Function)
    );
  });

  it("registers additional project metadata read tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_list_project_defects",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_list_project_defects",
      expect.objectContaining({
        title: "testplan_list_project_defects",
        description: "List CodeArts TestPlan project defects"
      }),
      expect.any(Function)
    );
  });

  it("registers official v1 TestPlan read aliases", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_list_project_assets_v1", "List CodeArts TestPlan project assets via official v1 API"],
      ["testplan_list_project_branches_v1", "List CodeArts TestPlan project branches via official v1 API"],
      ["testplan_get_project_dns_mapping_v1", "Get CodeArts TestPlan project DNS mapping via official v1 API"],
      ["testplan_download_asset_template", "Get CodeArts TestPlan asset template download metadata via official v1 API"],
      ["testplan_export_mindmap", "Get CodeArts TestPlan mindmap export metadata via official v1 API"],
      ["testplan_show_task_status", "Show CodeArts TestPlan task status via official v1 API"],
      ["testplan_show_task_status_two", "Show CodeArts TestPlan v2 task status via official v2 API"],
      ["testplan_show_mindmap_creator_name", "Show CodeArts TestPlan mindmap creator names via official v2 API"],
      [
        "testplan_list_variable_synchronization",
        "List CodeArts TestPlan variable synchronization information via official v1 API"
      ],
      [
        "testplan_list_variable_synchronization_two",
        "List CodeArts TestPlan v2 variable synchronization information via official v2 API"
      ],
      ["testplan_show_aw_name_view", "Show CodeArts TestPlan AW name display settings via official v1 API"],
      ["testplan_show_time_out_view", "Show CodeArts TestPlan timeout display settings via official v1 API"],
      [
        "testplan_list_variables_by_group_with_sensitive",
        "List CodeArts TestPlan variables by group via official sensitive endpoint with values redacted"
      ],
      ["testplan_show_sensitive_property_by_id", "Show CodeArts TestPlan variable sensitive property with value redacted"],
      ["testplan_show_variables_decrypt", "Show CodeArts TestPlan decrypted variable value with value redacted"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers official AW catalog update tool", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "testplan_update_aw_cata_first",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "testplan_update_aw_cata_first",
      expect.objectContaining({
        title: "testplan_update_aw_cata_first",
        description: "Update CodeArts TestPlan AW catalog via official v1 API"
      }),
      expect.any(Function)
    );
  });

  it("registers official AW write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      [
        "testplan_create_aw_cata_first",
        "Create a CodeArts TestPlan AW catalog via official v1 API (dry-run by default)"
      ],
      [
        "testplan_delete_aw_catas",
        "Batch delete CodeArts TestPlan AW keywords and catalogs via official v1 API (dry-run by default)"
      ],
      [
        "testplan_delete_custom_aw_file",
        "Delete a CodeArts TestPlan custom AW jar file relation via official v1 API (dry-run by default)"
      ],
      [
        "testplan_update_aw_name_view",
        "Update CodeArts TestPlan AW name display settings via official v1 API (dry-run by default)"
      ],
      [
        "testplan_update_time_out_view",
        "Update CodeArts TestPlan timeout display settings via official v1 API (dry-run by default)"
      ],
      [
        "testplan_save_aw_refresh_to_all",
        "Refresh matching CodeArts TestPlan cases from an AW keyword via official v1 API (dry-run by default)"
      ]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers official TestPlan misc tools", () => {
    const registerTool = vi.fn();
    const tools = [
      [
        "testplan_batch_send_notifications",
        "Batch send CodeArts TestPlan notifications via official v4 API (dry-run by default)"
      ],
      [
        "testplan_create_resource_uri_v4",
        "Create a CodeArts TestPlan v4 resource URI via official API (dry-run by default)"
      ],
      [
        "testplan_download_classes",
        "Get CodeArts TestPlan class file download metadata via official v1 API"
      ],
      [
        "testplan_get_executor_elements",
        "Get CodeArts TestPlan executor runtime elements via official v1 API"
      ],
      [
        "testplan_update_tep_share",
        "Update CodeArts TestPlan TEP share setting (dry-run by default)"
      ],
      [
        "testplan_get_tep_register_code",
        "Get CodeArts TestPlan TEP register code"
      ],
      [
        "testplan_list_teps",
        "List CodeArts TestPlan TEP executors"
      ],
      [
        "testplan_search_autotask",
        "Search CodeArts TestPlan autotasks"
      ],
      [
        "testplan_query_testhub_etl_data",
        "Query CodeArts TestPlan TestHub ETL data rows"
      ],
      [
        "testplan_get_design_data",
        "Get CodeArts TestPlan API design data"
      ],
      [
        "testplan_get_test_suites_var_list_for_pipeline",
        "Get CodeArts TestPlan pipeline environment parameter list"
      ],
      [
        "testplan_update_user_infos",
        "Update CodeArts TestPlan resource owner user information via official v1 API (dry-run by default)"
      ]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers official TestPlan delete tools", () => {
    const registerTool = vi.fn();
    const tools = [
      [
        "testplan_delete_asset",
        "Delete a CodeArts TestPlan test factor center asset by ID (dry-run by default)"
      ],
      [
        "testplan_delete_basic_aws_v1",
        "Batch delete CodeArts TestPlan basic AW keywords via official v1 API (dry-run by default)"
      ],
      [
        "testplan_delete_basic_aws_v2",
        "Batch delete CodeArts TestPlan basic AW keywords via official v2 API (dry-run by default)"
      ],
      [
        "testplan_delete_attachment",
        "Delete a CodeArts TestPlan testcase attachment by URI (dry-run by default)"
      ],
      [
        "testplan_delete_customized_filter",
        "Delete a CodeArts TestPlan customized filter by URI (dry-run by default)"
      ],
      [
        "testplan_delete_factor",
        "Delete a CodeArts TestPlan factor by ID (dry-run by default)"
      ],
      [
        "testplan_batch_delete_factors",
        "Batch delete CodeArts TestPlan factors by IDs (dry-run by default)"
      ],
      [
        "testplan_delete_issue_dynamic_records",
        "Delete CodeArts TestPlan issue dynamic records by issue and owner (dry-run by default)"
      ],
      [
        "testplan_delete_mindmap",
        "Delete a CodeArts TestPlan mindmap by ID (dry-run by default)"
      ],
      [
        "testplan_delete_mindmap_backup",
        "Delete a CodeArts TestPlan mindmap backup by ID (dry-run by default)"
      ],
      [
        "testplan_delete_mindmap_recycle",
        "Delete a CodeArts TestPlan mindmap recycle-bin item by ID (dry-run by default)"
      ],
      [
        "testplan_delete_test_design_template",
        "Delete a CodeArts TestPlan test design template by ID (dry-run by default)"
      ],
      [
        "testplan_delete_recycle_resource",
        "Permanently delete CodeArts TestPlan recycle-bin resources (dry-run by default)"
      ],
      [
        "testplan_delete_testcases_v3",
        "Batch delete CodeArts TestPlan v3 testcases and scripts (dry-run by default)"
      ],
      [
        "testplan_delete_vectors",
        "Delete CodeArts TestPlan testcase vectors by case URIs (dry-run by default)"
      ]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers dynamic global variable tools", () => {
    const registerTool = vi.fn();

    expect(
      registerTestPlanTool({
        toolName: "testplan_list_dynamic_global_variables",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_get_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_update_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
    expect(
      registerTestPlanTool({
        toolName: "testplan_delete_dynamic_global_variable",
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      })
    ).toBe(true);
  });

  it("registers upload and import write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_import_tasks", "Import CodeArts TestPlan tasks between versions (dry-run by default)"],
      ["testplan_upload_background", "Upload a CodeArts TestPlan report background image (dry-run by default)"],
      [
        "testplan_create_test_step_by_collection",
        "Create CodeArts TestPlan steps from a Postman collection upload (dry-run by default)"
      ],
      ["testplan_upload_file_to_git", "Upload a CodeArts TestPlan step file to git-backed storage (dry-run by default)"],
      ["testplan_upload_file_v3", "Upload a CodeArts TestPlan v3 step file (dry-run by default)"],
      ["testplan_create_repository_testsuite", "Create a CodeArts TestPlan testsuite from a repository file (dry-run by default)"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers attachment write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_associate_attachments", "Associate attachments with a CodeArts TestPlan resource"],
      ["testplan_upload_resource_attachment", "Upload an attachment to a CodeArts TestPlan resource"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers task execution mutation write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_update_task_execution_info", "Update CodeArts TestPlan testcase execution info for a task"],
      ["testplan_update_task_execution_status", "Update CodeArts TestPlan testcase execution status for a task"],
      ["testplan_stop_task_execution_by_case", "Stop CodeArts TestPlan testcase execution for a task by official execution-stop API"],
      ["testplan_batch_update_testcase_execution_info", "Batch update CodeArts TestPlan testcase execution info"],
      ["testplan_execute_task_group", "Execute a CodeArts TestPlan task group (dry-run by default)"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers legacy case official API tools", () => {
    const registerTool = vi.fn();
    const tools = [
      [
        "testplan_list_cases_status",
        "List CodeArts TestPlan legacy case statuses via official v2 API"
      ],
      [
        "testplan_list_cases_status_v3",
        "List CodeArts TestPlan legacy case statuses via official v3 API"
      ],
      [
        "testplan_list_case_history",
        "List CodeArts TestPlan legacy case execution histories via official v2 API"
      ],
      [
        "testplan_list_cases_by_stid",
        "List CodeArts TestPlan legacy suite cases by suite ID via official v2 API"
      ],
      [
        "testplan_create_cases_task",
        "Create a CodeArts TestPlan legacy cases task via official v2 API (dry-run by default)"
      ],
      [
        "testplan_delete_project_notice",
        "Delete CodeArts TestPlan project notice via official v2 API (dry-run by default)"
      ],
      [
        "testplan_stop_case_task",
        "Stop CodeArts TestPlan legacy case task via official v2 API (dry-run by default)"
      ]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers testhub and task attribute write tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_batch_update_task_attributes", "Batch update CodeArts TestPlan task attributes"],
      ["testplan_create_testhub_iterator", "Create CodeArts TestPlan TestHub iterator"],
      ["testplan_create_testhub_service", "Create CodeArts TestPlan TestHub service"],
      ["testplan_batch_add_iterator_testcases", "Batch add CodeArts TestPlan testcases to a TestHub iterator"],
      ["testplan_update_testhub_service", "Update CodeArts TestPlan TestHub service"],
      ["testplan_delete_testhub_service", "Delete CodeArts TestPlan TestHub service"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("registers task group read tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["testplan_get_task_group_detail", "Get CodeArts TestPlan task group detail"],
      ["testplan_list_task_group_detail_history", "List CodeArts TestPlan task group detail history"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerTestPlanTool({
        toolName,
        server: { registerTool },
        mode: "stdio",
        stdioClient: {} as never
      });

      expect(handled).toBe(true);
      expect(registerTool).toHaveBeenLastCalledWith(
        toolName,
        expect.objectContaining({
          title: toolName,
          description
        }),
        expect.any(Function)
      );
    }
  });

  it("returns false for non-testplan tools", () => {
    const registerTool = vi.fn();

    const handled = registerTestPlanTool({
      toolName: "repo_list_repositories",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
