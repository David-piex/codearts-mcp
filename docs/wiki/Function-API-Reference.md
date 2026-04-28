# CodeArts MCP Function API Reference

This document is generated from the ToolManifest-validated HTTP MCP `tools/list` registry. Do not edit tool entries by hand.

All function APIs use the same HTTP endpoint: `POST /mcp`. The JSON-RPC method is `tools/call`; select a function with `params.name`.

## Common Call Shape

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "<tool-name>",
    "arguments": {}
  }
}
```

## Module Directory

| Module | APIs |
| --- | ---: |
| Artifact | 12 |
| Auth / Session | 2 |
| Build | 22 |
| Check | 8 |
| Deploy | 59 |
| Pipeline | 77 |
| Repo | 25 |
| Req | 200 |
| TestPlan | 7 |
| **Total** | **412** |

## APIs

### artifact_delete_file

Module: `Artifact`

Description: Delete CodeArts Artifact file

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_delete_file",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_download_url

Module: `Artifact`

Description: Get CodeArts Artifact file download URL

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_download_url",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_file

Module: `Artifact`

Description: Get CodeArts Artifact file detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_file",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name",
    "path",
    "format"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_file_tree

Module: `Artifact`

Description: Get CodeArts Artifact file tree

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_file_tree",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1,
      "default": "/"
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "repo_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_get_repository

Module: `Artifact`

Description: Get CodeArts Artifact repository detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_get_repository",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_build_archives

Module: `Artifact`

Description: List CodeArts Artifact build archives

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_build_archives",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_files

Module: `Artifact`

Description: List CodeArts Artifact files

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_files",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "repo_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "repo_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_latest_version_files

Module: `Artifact`

Description: List CodeArts Artifact latest version files

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_latest_version_files",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_repositories

Module: `Artifact`

Description: List CodeArts Artifact repositories

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_repositories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "qname": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "format": {
      "type": "string",
      "minLength": 1
    },
    "format_list": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "is_recycle_bin": {
      "type": "boolean"
    }
  },
  "required": [
    "tenant_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_list_versions

Module: `Artifact`

Description: List CodeArts Artifact versions

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_list_versions",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_search_artifacts

Module: `Artifact`

Description: Search CodeArts Artifact artifacts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_search_artifacts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "artifact_name": {
      "type": "string",
      "minLength": 1
    },
    "repo_name": {
      "type": "string"
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "artifact_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### artifact_show_audit

Module: `Artifact`

Description: Show CodeArts Artifact audit logs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "artifact_show_audit",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/tenant_id"
    },
    "module": {
      "type": "string",
      "minLength": 1
    },
    "repo": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "type": "string"
    },
    "instance_id": {
      "type": "string"
    },
    "format": {
      "type": "string"
    },
    "resource_id": {
      "type": "string"
    }
  },
  "required": [
    "tenant_id",
    "project_id",
    "module",
    "repo"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### auth_clear_session

Module: `Auth / Session`

Description: Clear Huawei Cloud credentials for the current MCP session

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "auth_clear_session",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {}
}
```

### auth_configure_session

Module: `Auth / Session`

Description: Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides.

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "auth_configure_session",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "access_key": {
      "type": "string",
      "minLength": 1
    },
    "secret_key": {
      "type": "string",
      "minLength": 1
    },
    "region": {
      "type": "string",
      "minLength": 1
    },
    "req_base_url": {
      "type": "string",
      "format": "uri"
    },
    "repo_base_url": {
      "type": "string",
      "format": "uri"
    },
    "pipeline_base_url": {
      "type": "string",
      "format": "uri"
    },
    "check_base_url": {
      "type": "string",
      "format": "uri"
    },
    "testplan_base_url": {
      "type": "string",
      "format": "uri"
    },
    "deploy_base_url": {
      "type": "string",
      "format": "uri"
    },
    "build_base_url": {
      "type": "string",
      "format": "uri"
    },
    "artifact_base_url": {
      "type": "string",
      "format": "uri"
    }
  },
  "required": [
    "access_key",
    "secret_key",
    "region"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_append_job_step

Module: `Build`

Description: Append a new step to a CodeArts Build job

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_append_job_step",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "enable": {
      "type": "boolean",
      "default": true
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "image": {
      "type": "string",
      "minLength": 1
    },
    "command": {
      "type": "string",
      "minLength": 1
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1
    },
    "properties": {
      "type": "object",
      "additionalProperties": {}
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "step_name",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_append_release_upload_step

Module: `Build`

Description: Append the official release repository upload step to a CodeArts Build job

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_append_release_upload_step",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "path": {
      "type": "string",
      "minLength": 1
    },
    "package_name": {
      "type": "string",
      "minLength": 1
    },
    "package_version": {
      "type": "string",
      "minLength": 1
    },
    "custom_upload_path": {
      "type": "string",
      "minLength": 1
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl"
    },
    "continue_on_failure": {
      "type": "boolean",
      "default": false
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1,
      "default": "SUCCESS"
    },
    "insert_after_step_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_configure_release_upload_step

Module: `Build`

Description: Configure an existing release repository upload step in a CodeArts Build job

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_configure_release_upload_step",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1,
      "default": "Upload package to release repository"
    },
    "file": {
      "type": "string",
      "minLength": 1
    },
    "package_name": {
      "type": "string",
      "minLength": 1
    },
    "build_version": {
      "type": "string",
      "minLength": 1
    },
    "custom_upload_path": {
      "type": "string"
    },
    "upload_tool": {
      "type": "string",
      "minLength": 1,
      "default": "curl"
    },
    "remain_origin_path": {
      "type": "string",
      "minLength": 1,
      "default": "FLAT"
    },
    "pre_condition": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "file"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_error_log

Module: `Build`

Description: Get CodeArts Build error log analysis

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_error_log",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_full_stages

Module: `Build`

Description: Get CodeArts Build full stages

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_full_stages",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    },
    "cascade": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_history_details

Module: `Build`

Description: Get CodeArts Build history details

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_history_details",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_number": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_number"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_info_record

Module: `Build`

Description: Get CodeArts Build info record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_info_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_job

Module: `Build`

Description: Get CodeArts Build job detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_job",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_project_record_statistics

Module: `Build`

Description: Get CodeArts Build project record statistics

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_project_record_statistics",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "build_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_real_time_log

Module: `Build`

Description: Get CodeArts Build real-time log

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_real_time_log",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no",
    "offset"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record

Module: `Build`

Description: Get CodeArts Build record detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record_flow_graph

Module: `Build`

Description: Get CodeArts Build record flow graph

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_flow_graph",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_get_record_script

Module: `Build`

Description: Get CodeArts Build record script

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_get_record_script",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "record_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_build_parameters

Module: `Build`

Description: List CodeArts Build parameters

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_build_parameters",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_jobs

Module: `Build`

Description: List CodeArts Build jobs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_jobs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_project_records

Module: `Build`

Description: List CodeArts Build project records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_project_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "build_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_list_records

Module: `Build`

Description: List CodeArts Build records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_list_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "job_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_prepare_deployable_node_app

Module: `Build`

Description: Prepare a single-file deployable Node app by appending bundling commands to a build step

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_prepare_deployable_node_app",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### build_prepare_node_runtime_bundle

Module: `Build`

Description: Prepare a Node runtime bundle by appending packaging commands to a build step

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_prepare_node_runtime_bundle",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "step_name": {
      "type": "string",
      "minLength": 1
    },
    "output_file": {
      "type": "string",
      "minLength": 1,
      "default": "codearts-mcp.tgz"
    },
    "staging_dir": {
      "type": "string",
      "minLength": 1,
      "default": ".release-bundle"
    },
    "replace_existing": {
      "type": "boolean",
      "default": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_run_job

Module: `Build`

Description: Run CodeArts Build job

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_run_job",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_stop_job

Module: `Build`

Description: Stop CodeArts Build job

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_stop_job",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "job_id": {
      "type": "string",
      "minLength": 1
    },
    "build_no": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "job_id",
    "build_no"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### build_update_job_step

Module: `Build`

Description: Update CodeArts Build job step image or command

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "build_update_job_step",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### check_create_task

Module: `Check`

Description: Create CodeArts Check task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_create_task",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "git_url": {
      "type": "string",
      "format": "uri"
    },
    "git_branch": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "resource_pool_id": {
      "$ref": "#/properties/project_id"
    },
    "resource_pool_type": {
      "type": "string",
      "enum": [
        "default",
        "custom"
      ]
    },
    "include_paths": {
      "type": "string",
      "minLength": 1
    },
    "exclude_dir": {
      "type": "string",
      "minLength": 1
    },
    "task_type": {
      "type": "string",
      "enum": [
        "full",
        "incremental"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "task_name",
    "git_url",
    "git_branch",
    "language"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_metrics

Module: `Check`

Description: Get CodeArts Check task metrics

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_metrics",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_get_task

Module: `Check`

Description: Get CodeArts Check task detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_get_task",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_rulesets

Module: `Check`

Description: List CodeArts Check rulesets

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_rulesets",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_task_issues

Module: `Check`

Description: List CodeArts Check task issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_task_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "severity": {
      "type": "string",
      "minLength": 1
    },
    "defect_level": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_name": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "checker": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_list_tasks

Module: `Check`

Description: List CodeArts Check tasks

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_list_tasks",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_run_task

Module: `Check`

Description: Run CodeArts Check task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_run_task",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "ref": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### check_stop_task

Module: `Check`

Description: Stop CodeArts Check task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "check_stop_task",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_add_v4_environment_hosts

Module: `Deploy`

Description: Add hosts into a CodeArts Deploy v4 environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_add_v4_environment_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "environment_id",
    "cluster_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_cancel_v4_deploy_record

Module: `Deploy`

Description: Cancel CodeArts Deploy v4 deploy record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_cancel_v4_deploy_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_application

Module: `Deploy`

Description: Create CodeArts Deploy application

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_application",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "default": ""
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0"
        },
        "artifact_source_system": {
          "type": "string",
          "default": ""
        },
        "artifact_type": {
          "type": "string",
          "default": ""
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      }
    },
    "slave_cluster_id": {
      "type": "string",
      "default": ""
    },
    "slave_resource_type": {
      "type": "string",
      "default": ""
    },
    "create_type": {
      "type": "string",
      "default": "template"
    },
    "is_draft": {
      "type": "boolean",
      "default": false
    },
    "group_id": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "template_id": {
            "$ref": "#/properties/project_id"
          },
          "operation_list": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/project_id"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "params": {
                  "type": "string"
                },
                "entrance": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "module_id": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            },
            "default": []
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "arrange_infos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_environment

Module: `Deploy`

Description: Create CodeArts Deploy environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_environment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "os": {
      "type": "string",
      "minLength": 1,
      "default": "linux"
    },
    "deploy_type": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "application_id",
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_create_task_by_template

Module: `Deploy`

Description: Create CodeArts Deploy task from template

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_create_task_by_template",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "project_name": {
      "type": "string",
      "minLength": 1
    },
    "template_id": {
      "$ref": "#/properties/project_id"
    },
    "task_name": {
      "type": "string",
      "minLength": 1
    },
    "configs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "description": {
            "type": "string"
          },
          "value": {
            "type": "string"
          },
          "static_status": {
            "type": "integer"
          },
          "limits": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                }
              },
              "required": [
                "name"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": []
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "project_name",
    "template_id",
    "task_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_delete_v4_cluster_hosts

Module: `Deploy`

Description: Delete hosts from a CodeArts Deploy v4 cluster

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_v4_cluster_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_delete_v4_environment_hosts

Module: `Deploy`

Description: Delete hosts from a CodeArts Deploy v4 environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_delete_v4_environment_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "environment_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_app

Module: `Deploy`

Description: Get CodeArts Deploy application detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_app",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "application_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_app_log

Module: `Deploy`

Description: Get CodeArts Deploy application log

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_app_log",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/application_id"
    },
    "step_id": {
      "$ref": "#/properties/application_id"
    },
    "offset": {
      "type": "string",
      "default": "0"
    },
    "end_offset": {
      "type": "string",
      "default": "0"
    }
  },
  "required": [
    "application_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_deploy_source_detail

Module: `Deploy`

Description: Get CodeArts Deploy task source detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_deploy_source_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_execution_params

Module: `Deploy`

Description: Get CodeArts Deploy execution params

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_execution_params",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_history_detail

Module: `Deploy`

Description: Get CodeArts Deploy history detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_history_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_host_group

Module: `Deploy`

Description: Get CodeArts Deploy host group detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_host_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_last_record_detail

Module: `Deploy`

Description: Get CodeArts Deploy v4 orchestration last record detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_last_record_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "orchestration_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "orchestration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_runtime_variables

Module: `Deploy`

Description: Get CodeArts Deploy runtime variables

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_runtime_variables",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_status

Module: `Deploy`

Description: Get CodeArts Deploy task status

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_status",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_task

Module: `Deploy`

Description: Get CodeArts Deploy task detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_task",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_template_detail

Module: `Deploy`

Description: Get CodeArts Deploy template detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_template_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/template_id"
    }
  },
  "required": [
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster

Module: `Deploy`

Description: Get CodeArts Deploy v4 cluster detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster_count

Module: `Deploy`

Description: Get CodeArts Deploy v4 cluster counts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster_count",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    }
  },
  "required": [
    "project_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_cluster_host

Module: `Deploy`

Description: Get CodeArts Deploy v4 cluster host detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_cluster_host",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "host_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "cluster_id",
    "host_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record

Module: `Deploy`

Description: Get CodeArts Deploy v4 deploy record detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record_step_detail

Module: `Deploy`

Description: Get CodeArts Deploy v4 deploy record step detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record_step_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_deploy_record_step_logs

Module: `Deploy`

Description: Get CodeArts Deploy v4 deploy record step logs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_deploy_record_step_logs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "offset": {
      "type": [
        "string",
        "number"
      ]
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000
    },
    "start_time": {
      "type": "string"
    },
    "end_time": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_environment

Module: `Deploy`

Description: Get CodeArts Deploy v4 environment detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_environment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_get_v4_environment_resource_detail

Module: `Deploy`

Description: Get CodeArts Deploy v4 environment resource detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_get_v4_environment_resource_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_import_hosts_to_environment

Module: `Deploy`

Description: Import hosts into a CodeArts Deploy environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_import_hosts_to_environment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/application_id"
    },
    "group_id": {
      "$ref": "#/properties/application_id"
    },
    "host_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/application_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "application_id",
    "environment_id",
    "group_id",
    "host_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_app_host_groups

Module: `Deploy`

Description: List CodeArts Deploy host groups available to an application

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_app_host_groups",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    }
  },
  "required": [
    "application_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_app_operations_log

Module: `Deploy`

Description: List CodeArts Deploy application operation logs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_app_operations_log",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "app_id": {
      "type": "string",
      "minLength": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "page_index": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "start_date": {
      "type": "string"
    },
    "end_date": {
      "type": "string"
    }
  },
  "required": [
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_apps

Module: `Deploy`

Description: List CodeArts Deploy applications

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_apps",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_deployment_units

Module: `Deploy`

Description: List CodeArts Deploy deployment units for an application

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_deployment_units",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_environment_hosts

Module: `Deploy`

Description: List CodeArts Deploy hosts in an environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_environment_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/application_id"
    },
    "key_field": {
      "type": "string",
      "minLength": 1
    },
    "as_proxy": {
      "type": "boolean"
    }
  },
  "required": [
    "application_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_environments

Module: `Deploy`

Description: List CodeArts Deploy application environments

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_environments",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "application_id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/application_id"
    }
  },
  "required": [
    "application_id",
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_histories

Module: `Deploy`

Description: List CodeArts Deploy histories

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_histories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "$ref": "#/properties/project_id"
    },
    "start_date": {
      "type": "string"
    },
    "end_date": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_group_environments

Module: `Deploy`

Description: List CodeArts Deploy environments linked to a host group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_group_environments",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_group_hosts

Module: `Deploy`

Description: List CodeArts Deploy hosts in a host group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_group_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "group_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "group_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_host_groups

Module: `Deploy`

Description: List CodeArts Deploy host groups

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_host_groups",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_system_configs

Module: `Deploy`

Description: List CodeArts Deploy system config keys

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_system_configs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_tasks

Module: `Deploy`

Description: List CodeArts Deploy tasks

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_tasks",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_applications

Module: `Deploy`

Description: List CodeArts Deploy v4 applications

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_applications",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "keyword": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_cluster_hosts

Module: `Deploy`

Description: List CodeArts Deploy v4 cluster hosts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_cluster_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "keyword": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_id": {
      "$ref": "#/properties/project_id"
    },
    "ip": {
      "type": "string"
    },
    "os": {
      "type": "string"
    },
    "connection_status": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "cluster_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_clusters

Module: `Deploy`

Description: List CodeArts Deploy v4 clusters

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_clusters",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "keyword": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "cluster_type": {
      "type": "string",
      "enum": [
        "host",
        "container"
      ]
    }
  },
  "required": [
    "project_id",
    "cluster_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_deploy_records

Module: `Deploy`

Description: List CodeArts Deploy v4 deploy records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_deploy_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environment_applications

Module: `Deploy`

Description: List CodeArts Deploy v4 applications under an environment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environment_applications",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environment_hosts

Module: `Deploy`

Description: List CodeArts Deploy v4 environment hosts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environment_hosts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "environment_id": {
      "$ref": "#/properties/project_id"
    },
    "query": {
      "type": "object",
      "additionalProperties": {
        "type": [
          "string",
          "number",
          "boolean"
        ]
      },
      "default": {}
    }
  },
  "required": [
    "project_id",
    "environment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_environments

Module: `Deploy`

Description: List CodeArts Deploy v4 environments

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_environments",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_v4_orchestrations

Module: `Deploy`

Description: List CodeArts Deploy v4 orchestrations

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_v4_orchestrations",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "app_id": {
      "$ref": "#/properties/project_id"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    }
  },
  "required": [
    "project_id",
    "app_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_list_variable_history

Module: `Deploy`

Description: List CodeArts Deploy variable history by scope

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_variable_history",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_list_variables

Module: `Deploy`

Description: List CodeArts Deploy variables by scope

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_list_variables",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_modify_application

Module: `Deploy`

Description: Modify CodeArts Deploy application

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_modify_application",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "$ref": "#/properties/id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "default": ""
    },
    "timeout": {
      "type": [
        "number",
        "null"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "trigger_source": {
          "type": "string",
          "default": "0"
        },
        "artifact_source_system": {
          "type": "string",
          "default": ""
        },
        "artifact_type": {
          "type": "string",
          "default": ""
        }
      },
      "additionalProperties": false,
      "default": {
        "trigger_source": "0",
        "artifact_source_system": "",
        "artifact_type": ""
      }
    },
    "slave_cluster_id": {
      "type": "string",
      "default": ""
    },
    "slave_resource_type": {
      "type": "string",
      "default": ""
    },
    "create_type": {
      "type": "string",
      "default": "template"
    },
    "is_draft": {
      "type": "boolean",
      "default": false
    },
    "group_id": {
      "type": "string"
    },
    "agency_urn": {
      "type": "string"
    },
    "arrange_infos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/id"
          },
          "deploy_system": {
            "type": "string"
          },
          "template_id": {
            "$ref": "#/properties/id"
          },
          "operation_list": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/id"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "code": {
                  "type": "string"
                },
                "params": {
                  "type": "string"
                },
                "entrance": {
                  "type": "string"
                },
                "version": {
                  "type": "string"
                },
                "module_id": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            },
            "default": []
          }
        },
        "required": [
          "template_id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "id",
    "project_id",
    "name",
    "arrange_infos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_pass_v4_manual_check

Module: `Deploy`

Description: Pass CodeArts Deploy v4 manual check step

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_pass_v4_manual_check",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_query_variables

Module: `Deploy`

Description: Query CodeArts Deploy variables by scope

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_query_variables",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### deploy_refuse_v4_manual_check

Module: `Deploy`

Description: Refuse CodeArts Deploy v4 manual check step

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_refuse_v4_manual_check",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rerun_v4_deploy_record

Module: `Deploy`

Description: Rerun CodeArts Deploy v4 deploy record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rerun_v4_deploy_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_retry_v4_deploy_record

Module: `Deploy`

Description: Retry CodeArts Deploy v4 deploy record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_retry_v4_deploy_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rollback_app

Module: `Deploy`

Description: Rollback CodeArts Deploy task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rollback_app",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_rollback_v4_deploy_record

Module: `Deploy`

Description: Rollback CodeArts Deploy v4 deploy record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_rollback_v4_deploy_record",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "reason": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "operator": {
      "type": "string"
    },
    "body": {
      "type": "object",
      "additionalProperties": {},
      "default": {}
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_start_app

Module: `Deploy`

Description: Start CodeArts Deploy task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_start_app",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "trigger_source": {
      "type": [
        "number",
        "string"
      ],
      "enum": [
        0,
        1,
        "0",
        "1"
      ]
    },
    "params": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "additionalProperties": false
      },
      "default": []
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### deploy_stop_app

Module: `Deploy`

Description: Stop CodeArts Deploy task

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "deploy_stop_app",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "record_id": {
      "$ref": "#/properties/task_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "task_id",
    "record_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_approve_run

Module: `Pipeline`

Description: Approve CodeArts Pipeline manual review

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_approve_run",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_bind_variable_groups_to_pipeline

Module: `Pipeline`

Description: Bind CodeArts Pipeline variable groups to pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_bind_variable_groups_to_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "pipeline_group_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "pipeline_group_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_extension_endpoint

Module: `Pipeline`

Description: Create CodeArts Pipeline extension endpoint

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_extension_endpoint",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "url": {
      "type": "string",
      "minLength": 1
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {}
        },
        "scheme": {
          "type": "string",
          "minLength": 1
        }
      },
      "additionalProperties": false
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_group

Module: `Pipeline`

Description: Create CodeArts Pipeline group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_project_strategy

Module: `Pipeline`

Description: Create CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_rule

Module: `Pipeline`

Description: Create CodeArts Pipeline rule

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_rule",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "layout_content": {
      "type": "string",
      "minLength": 1
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1
          },
          "can_modify_when_inherit": {
            "type": "boolean"
          },
          "editable": {
            "type": "boolean"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "operator": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1
                },
                "is_valid": {
                  "type": "boolean"
                }
              },
              "required": [
                "key",
                "type",
                "name",
                "value",
                "value_type"
              ],
              "additionalProperties": false
            },
            "minItems": 1
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "name",
    "type",
    "layout_content",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_strategy

Module: `Pipeline`

Description: Create CodeArts Pipeline strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_tag

Module: `Pipeline`

Description: Create CodeArts Pipeline tag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "color"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_create_variable_group

Module: `Pipeline`

Description: Create CodeArts Pipeline variable group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_create_variable_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "sequence": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          },
          "is_secret": {
            "type": "boolean"
          },
          "description": {
            "type": "string"
          }
        },
        "additionalProperties": false
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_extension_endpoint

Module: `Pipeline`

Description: Delete CodeArts Pipeline extension endpoint

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_extension_endpoint",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_group

Module: `Pipeline`

Description: Delete CodeArts Pipeline group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_pipeline

Module: `Pipeline`

Description: Delete CodeArts Pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_project_strategy

Module: `Pipeline`

Description: Delete CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_rule

Module: `Pipeline`

Description: Delete CodeArts Pipeline rule

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_rule",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_strategy

Module: `Pipeline`

Description: Delete CodeArts Pipeline strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_tag

Module: `Pipeline`

Description: Delete CodeArts Pipeline tag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tag_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_delete_variable_group

Module: `Pipeline`

Description: Delete CodeArts Pipeline variable group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_delete_variable_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_disable_pipeline

Module: `Pipeline`

Description: Disable CodeArts Pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_disable_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_enable_pipeline

Module: `Pipeline`

Description: Enable CodeArts Pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_enable_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_extension_endpoint

Module: `Pipeline`

Description: Get CodeArts Pipeline extension endpoint detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extension_endpoint",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_extension_module

Module: `Pipeline`

Description: Get CodeArts Pipeline extension module detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_extension_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "module_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_manual_review_context

Module: `Pipeline`

Description: Get CodeArts Pipeline manual review context

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_manual_review_context",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_pipeline

Module: `Pipeline`

Description: Get CodeArts Pipeline detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_inputs

Module: `Pipeline`

Description: Get CodeArts Pipeline plugin inputs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_inputs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "display_name",
    "version",
    "plugin_attribution"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_outputs

Module: `Pipeline`

Description: Get CodeArts Pipeline plugin outputs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_outputs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "display_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "display_name",
    "version",
    "plugin_attribution"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_plugin_version

Module: `Pipeline`

Description: Get CodeArts Pipeline plugin version detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_plugin_version",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "plugin_name",
    "version"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy

Module: `Pipeline`

Description: Get CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy_detail

Module: `Pipeline`

Description: Get CodeArts Pipeline project strategy detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_project_strategy_related_info

Module: `Pipeline`

Description: Get CodeArts Pipeline project strategy related info

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_project_strategy_related_info",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_rule

Module: `Pipeline`

Description: Get CodeArts Pipeline rule detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_rule",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_rule_related_info

Module: `Pipeline`

Description: Get CodeArts Pipeline rule related info

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_rule_related_info",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run

Module: `Pipeline`

Description: Get CodeArts Pipeline run detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_detail

Module: `Pipeline`

Description: Get CodeArts Pipeline run detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_log

Module: `Pipeline`

Description: Get CodeArts Pipeline run step log

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_log",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_run_parameters

Module: `Pipeline`

Description: Get CodeArts Pipeline run parameters

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_run_parameters",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_step_outputs

Module: `Pipeline`

Description: Get CodeArts Pipeline step outputs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_step_outputs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "step_run_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "step_run_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_strategy

Module: `Pipeline`

Description: Get CodeArts Pipeline strategy detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_strategy_related_info

Module: `Pipeline`

Description: Get CodeArts Pipeline strategy related info

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_strategy_related_info",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_get_variable_group

Module: `Pipeline`

Description: Get CodeArts Pipeline variable group detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_get_variable_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_inherit_project_strategy

Module: `Pipeline`

Description: Inherit CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_inherit_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "rules": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "parent_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_artifacts

Module: `Pipeline`

Description: List CodeArts Pipeline artifacts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_artifacts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_available_publishers

Module: `Pipeline`

Description: List CodeArts Pipeline available publishers

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_available_publishers",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_base_plugins

Module: `Pipeline`

Description: List CodeArts Pipeline base plugins

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_base_plugins",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_base_plugins_paged

Module: `Pipeline`

Description: List CodeArts Pipeline base plugins (paged)

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_base_plugins_paged",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_extension_endpoints

Module: `Pipeline`

Description: List CodeArts Pipeline extension endpoints

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_extension_endpoints",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "project_id",
    "region_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_extension_modules

Module: `Pipeline`

Description: List CodeArts Pipeline extension modules

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_extension_modules",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "locations": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "product_line": {
      "type": "string",
      "minLength": 1
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      }
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "locations"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_groups

Module: `Pipeline`

Description: List CodeArts Pipeline groups

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_groups",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipeline_variable_groups

Module: `Pipeline`

Description: List CodeArts Pipeline variable groups for pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipeline_variable_groups",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_pipelines

Module: `Pipeline`

Description: List CodeArts Pipelines

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_pipelines",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_plugin_versions

Module: `Pipeline`

Description: List CodeArts Pipeline plugin versions

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_plugin_versions",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id",
    "plugin_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_plugins

Module: `Pipeline`

Description: List CodeArts Pipeline plugins

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_plugins",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    },
    "plugin_attribution": {
      "type": "string",
      "enum": [
        "custom",
        "official"
      ]
    },
    "business_type": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Build",
          "Gate",
          "Deploy",
          "Test",
          "Normal"
        ]
      }
    },
    "maintainer": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_project_strategies

Module: `Pipeline`

Description: List CodeArts Pipeline project strategies

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_project_strategies",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": false
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "is_valid": {
      "type": "boolean"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_publishers

Module: `Pipeline`

Description: List CodeArts Pipeline publishers

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_publishers",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_rule_types

Module: `Pipeline`

Description: List CodeArts Pipeline rule types

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_rule_types",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "organization_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "organization_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_rules

Module: `Pipeline`

Description: List CodeArts Pipeline rules

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_rules",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "cloud_project_id": {
      "$ref": "#/properties/domain_id"
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_runs

Module: `Pipeline`

Description: List CodeArts Pipeline runs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_runs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_stage_plugins

Module: `Pipeline`

Description: List CodeArts Pipeline stage plugins

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_stage_plugins",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "use_condition": {
      "type": "string",
      "minLength": 1
    },
    "business_type": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Build",
          "Gate",
          "Deploy",
          "Test",
          "Normal"
        ]
      }
    },
    "deploy_type": {
      "type": "string",
      "minLength": 1
    },
    "comp_extend_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "use_condition"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_strategies

Module: `Pipeline`

Description: List CodeArts Pipeline strategies

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_strategies",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "offset": {
      "type": "integer",
      "minimum": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    },
    "include_tenant_rule_set": {
      "type": "boolean",
      "default": true
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "is_valid": {
      "type": "boolean"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "domain_id",
    "offset",
    "limit"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_strategy_children

Module: `Pipeline`

Description: List CodeArts Pipeline strategy children

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_strategy_children",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "default": 20
    }
  },
  "required": [
    "domain_id",
    "rule_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_tags

Module: `Pipeline`

Description: List CodeArts Pipeline tags

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_tags",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "proj_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_templates

Module: `Pipeline`

Description: List CodeArts Pipeline templates

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_templates",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "tenant_id": {
      "type": "string",
      "minLength": 1
    },
    "language": {
      "type": "string"
    },
    "is_system": {
      "type": "boolean"
    }
  },
  "required": [
    "tenant_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_list_variable_groups

Module: `Pipeline`

Description: List CodeArts Pipeline variable groups

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_list_variable_groups",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_move_pipelines_to_group

Module: `Pipeline`

Description: Move CodeArts Pipelines to group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_move_pipelines_to_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "group_id": {
      "$ref": "#/properties/project_id"
    },
    "pipelines": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pipeline_id": {
            "$ref": "#/properties/project_id"
          },
          "pipeline_name": {
            "type": "string",
            "minLength": 1
          }
        },
        "required": [
          "pipeline_id",
          "pipeline_name"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "group_id",
    "pipelines"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_reject_run

Module: `Pipeline`

Description: Reject CodeArts Pipeline manual review

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_reject_run",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "job_id": {
      "$ref": "#/properties/project_id"
    },
    "step_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id",
    "job_id",
    "step_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_retry_run

Module: `Pipeline`

Description: Retry CodeArts Pipeline run

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_retry_run",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "run_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_run_pipeline

Module: `Pipeline`

Description: Run CodeArts Pipeline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_run_pipeline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_id": {
      "$ref": "#/properties/project_id"
    },
    "branch": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string",
      "maxLength": 1024
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_set_tags_for_pipelines

Module: `Pipeline`

Description: Set CodeArts Pipeline tags for pipelines

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_set_tags_for_pipelines",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "pipeline_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "tag_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "pipeline_ids",
    "tag_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_stop_run

Module: `Pipeline`

Description: Stop CodeArts Pipeline run

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_stop_run",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "pipeline_id": {
      "type": "string",
      "minLength": 1
    },
    "run_id": {
      "$ref": "#/properties/pipeline_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "pipeline_id",
    "run_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_project_strategy

Module: `Pipeline`

Description: Switch CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_switch_strategy

Module: `Pipeline`

Description: Switch CodeArts Pipeline strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_switch_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "is_valid": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id",
    "is_valid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_extension_endpoint

Module: `Pipeline`

Description: Update CodeArts Pipeline extension endpoint

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_extension_endpoint",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "minLength": 1
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "region_name": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "url": {
      "type": "string",
      "minLength": 1
    },
    "authorization": {
      "type": "object",
      "properties": {
        "parameters": {
          "type": "object",
          "additionalProperties": {}
        },
        "scheme": {
          "type": "string",
          "minLength": 1
        }
      },
      "additionalProperties": false
    },
    "data": {
      "$ref": "#/properties/authorization/properties/parameters"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "uuid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_group

Module: `Pipeline`

Description: Update CodeArts Pipeline group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 32
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_project_strategy

Module: `Pipeline`

Description: Update CodeArts Pipeline project strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_project_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "rule_set_id",
    "name",
    "rules"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_rule

Module: `Pipeline`

Description: Update CodeArts Pipeline rule

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_rule",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_id": {
      "$ref": "#/properties/domain_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "plugin_id": {
      "type": "string",
      "minLength": 1
    },
    "plugin_name": {
      "type": "string",
      "minLength": 1
    },
    "plugin_version": {
      "type": "string",
      "minLength": 1
    },
    "content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "group_name": {
            "type": "string",
            "minLength": 1
          },
          "can_modify_when_inherit": {
            "type": "boolean"
          },
          "editable": {
            "type": "boolean"
          },
          "properties": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "type": "string",
                  "minLength": 1
                },
                "operator": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": "string"
                },
                "value_type": {
                  "type": "string",
                  "minLength": 1
                },
                "is_valid": {
                  "type": "boolean"
                }
              },
              "required": [
                "key",
                "type",
                "name",
                "value",
                "value_type"
              ],
              "additionalProperties": false
            },
            "minItems": 1
          }
        },
        "required": [
          "group_name",
          "properties"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_id",
    "name",
    "type",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_strategy

Module: `Pipeline`

Description: Update CodeArts Pipeline strategy

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_strategy",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "domain_id": {
      "type": "string",
      "minLength": 1
    },
    "rule_set_id": {
      "$ref": "#/properties/domain_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/domain_id"
          },
          "is_valid": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "domain_id",
    "rule_set_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_tag

Module: `Pipeline`

Description: Update CodeArts Pipeline tag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tag_id",
    "name",
    "color"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### pipeline_update_variable_group

Module: `Pipeline`

Description: Update CodeArts Pipeline variable group

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "pipeline_update_variable_group",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "variables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "sequence": {
            "type": "integer"
          },
          "type": {
            "type": "string",
            "minLength": 1
          },
          "value": {
            "type": "string"
          },
          "is_secret": {
            "type": "boolean"
          },
          "description": {
            "type": "string"
          }
        },
        "additionalProperties": false
      }
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_close_merge_request

Module: `Repo`

Description: Close CodeArts Repo merge request

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_close_merge_request",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_compare_refs

Module: `Repo`

Description: Compare CodeArts Repo refs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_compare_refs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "from": {
      "type": "string",
      "minLength": 1
    },
    "to": {
      "type": "string",
      "minLength": 1
    },
    "straight": {
      "type": "boolean"
    },
    "ignore_whitespace_change": {
      "type": "boolean"
    },
    "view": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "from",
    "to"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_merge_request

Module: `Repo`

Description: Create CodeArts Repo merge request

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "source_branch": {
      "type": "string",
      "minLength": 1
    },
    "target_branch": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "target_project_id": {
      "$ref": "#/properties/repository_id"
    },
    "assignee_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "reviewer_ids": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string",
            "minLength": 1
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ]
      }
    },
    "remove_source_branch": {
      "type": "boolean"
    },
    "squash": {
      "type": "boolean"
    },
    "draft": {
      "type": "boolean"
    },
    "labels": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          }
        }
      ]
    },
    "milestone_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "source_branch",
    "target_branch",
    "title"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_merge_request_discussion

Module: `Repo`

Description: Create CodeArts Repo merge request discussion

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_merge_request_discussion",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "body": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "body"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_repository

Module: `Repo`

Description: Create CodeArts Repo repository

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_repository",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_uuid": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "pattern": "^[A-Za-z][A-Za-z0-9_-]*$"
    },
    "import_members": {
      "type": "integer",
      "minimum": 0,
      "maximum": 1
    },
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "visibility_level": {
      "type": "number",
      "enum": [
        0,
        20
      ]
    },
    "import_url": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "gitignore_id": {
      "type": "string",
      "minLength": 1
    },
    "license_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "enable_readme": {
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "integer",
          "minimum": 0,
          "maximum": 1
        }
      ]
    },
    "caller": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_uuid",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_create_tag

Module: `Repo`

Description: Create CodeArts Repo tag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_create_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    },
    "ref": {
      "type": "string",
      "minLength": 1
    },
    "message": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "tag_name",
    "ref"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_delete_tag

Module: `Repo`

Description: Delete CodeArts Repo tag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_delete_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "tag_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_branch

Module: `Repo`

Description: Get CodeArts Repo branch detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_branch",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "branch_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "branch_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_commit

Module: `Repo`

Description: Get CodeArts Repo commit detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_commit",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "commit_sha": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "commit_sha"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_file

Module: `Repo`

Description: Get CodeArts Repo file content

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_file",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "branch": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "file_path",
    "branch"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_merge_request

Module: `Repo`

Description: Get CodeArts Repo merge request detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_merge_request",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_repository

Module: `Repo`

Description: Get CodeArts Repo repository detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_repository",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_get_tag

Module: `Repo`

Description: Get CodeArts Repo tag detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_get_tag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "tag_name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id",
    "tag_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_branches

Module: `Repo`

Description: List CodeArts Repo branches

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_branches",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_commits

Module: `Repo`

Description: List CodeArts Repo commits

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_commits",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "ref_name": {
      "type": "string"
    },
    "since": {
      "type": "string"
    },
    "until": {
      "type": "string"
    },
    "order_by_date": {
      "type": "boolean"
    },
    "with_stats": {
      "type": "boolean"
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_events

Module: `Repo`

Description: List CodeArts Repo events

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_events",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_changes

Module: `Repo`

Description: List CodeArts Repo merge request changes

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_changes",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_request_discussions

Module: `Repo`

Description: List CodeArts Repo merge request discussions

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_request_discussions",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_merge_requests

Module: `Repo`

Description: List CodeArts Repo merge requests

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_merge_requests",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "state": {
      "type": "string",
      "enum": [
        "all",
        "opened",
        "closed",
        "merged"
      ]
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_protected_branches

Module: `Repo`

Description: List CodeArts Repo protected branches

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_protected_branches",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repositories

Module: `Repo`

Description: List CodeArts Repo repositories

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repositories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_repository_labels

Module: `Repo`

Description: List CodeArts Repo repository labels

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_repository_labels",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_list_tags

Module: `Repo`

Description: List CodeArts Repo tags

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_list_tags",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "repository_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "repository_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_merge_merge_request

Module: `Repo`

Description: Merge CodeArts Repo merge request

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_merge_merge_request",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "squash": {
      "type": "boolean"
    },
    "force_merge": {
      "type": "boolean"
    },
    "sha": {
      "type": "string",
      "minLength": 1
    },
    "merge_commit_message": {
      "type": "string",
      "minLength": 1
    },
    "squash_commit_message": {
      "type": "string",
      "minLength": 1
    },
    "should_remove_source_branch": {
      "type": "boolean"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### repo_review_merge_request

Module: `Repo`

Description: Review CodeArts Repo merge request

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "repo_review_merge_request",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "repository_id": {
      "type": "string",
      "minLength": 1
    },
    "merge_request_iid": {
      "$ref": "#/properties/repository_id"
    },
    "action_type": {
      "type": "string",
      "enum": [
        "approve",
        "reject",
        "reset"
      ]
    },
    "approver_comment": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "repository_id",
    "merge_request_iid",
    "action_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_iteration_work_items

Module: `Req`

Description: Add work items to a CodeArts Req iteration

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_iteration_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_plan_work_items

Module: `Req`

Description: Add work items to a CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_plan_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_project_member

Module: `Req`

Description: Add member to a CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_project_member",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_name": {
      "type": "string",
      "minLength": 1
    },
    "role_id": {
      "anyOf": [
        {
          "type": "number",
          "const": -1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_id",
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_work_item_comment

Module: `Req`

Description: Add comment to a CodeArts Req work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_work_item_comment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_add_work_item_work_hour

Module: `Req`

Description: Add a work hour record to a CodeArts Req work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_add_work_item_work_hour",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_batch_add_project_members

Module: `Req`

Description: Add multiple members to a CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_add_project_members",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "members": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "role_id": {
            "anyOf": [
              {
                "type": "number",
                "const": -1
              },
              {
                "type": "integer",
                "exclusiveMinimum": 0
              }
            ]
          }
        },
        "required": [
          "user_id"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "members"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_create_ipd_issues

Module: `Req`

Description: Batch create CodeArts Req IPD issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_create_ipd_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "minLength": 1
          },
          "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 256
          },
          "description": {
            "type": "string",
            "maxLength": 500000
          },
          "parent_id": {
            "$ref": "#/properties/project_id"
          },
          "status": {
            "type": "string",
            "minLength": 1
          },
          "assignee": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id"
              },
              "name": {
                "type": "string"
              },
              "nick_name": {
                "type": "string"
              }
            },
            "additionalProperties": true
          },
          "assigned_cc": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            },
            "maxItems": 50
          },
          "submitted_by": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            }
          },
          "recipient": {
            "type": "array",
            "items": {
              "$ref": "#/properties/issues/items/properties/assignee"
            }
          },
          "labels": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "$ref": "#/properties/project_id"
                },
                "label_type": {
                  "type": "string"
                },
                "color": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                }
              },
              "additionalProperties": true
            }
          },
          "custom_fields": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "code": {
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "type": [
                    "string",
                    "number",
                    "boolean",
                    "null"
                  ]
                }
              },
              "required": [
                "code",
                "value"
              ],
              "additionalProperties": false
            }
          },
          "priority": {
            "type": "string"
          },
          "workload": {
            "type": "string"
          },
          "plan_pi": {
            "$ref": "#/properties/project_id"
          },
          "plan_iteration": {
            "$ref": "#/properties/project_id"
          },
          "business_domain": {
            "type": "string"
          },
          "feature_set": {
            "$ref": "#/properties/project_id"
          },
          "plan_end_date": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "integer"
              }
            ]
          },
          "link": {
            "type": "string"
          },
          "suspended": {
            "type": "boolean"
          },
          "break_status": {
            "type": "string"
          },
          "baseline": {
            "type": "string"
          },
          "status_modified_time": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "integer"
              }
            ]
          },
          "extra_fields": {
            "type": "object",
            "additionalProperties": {}
          },
          "children": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": {}
            }
          },
          "ir2feature": {
            "type": "string"
          },
          "ir2rr": {
            "type": "string"
          },
          "related_network_security": {
            "type": "string"
          },
          "collaboratives": {
            "type": "string"
          }
        },
        "required": [
          "category",
          "title",
          "description",
          "status"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issues"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_create_tracker_config

Module: `Req`

Description: Bind custom work item statuses to a CodeArts Req tracker

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_create_tracker_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_config_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tracker_id",
    "status_config_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_ipd_issues

Module: `Req`

Description: Batch delete CodeArts Req IPD issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_ipd_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 50
    },
    "is_permanent_delete": {
      "type": "boolean"
    },
    "src_project_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_iterations

Module: `Req`

Description: Delete multiple CodeArts Req iterations

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_iterations",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_project_members

Module: `Req`

Description: Remove multiple members from a CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_project_members",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_release_plans

Module: `Req`

Description: Batch delete CodeArts Req release or iteration plans

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_release_plans",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_delete_work_items

Module: `Req`

Description: Delete multiple CodeArts Req work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_delete_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1,
      "maxItems": 100
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_transfer_ipd_work_item_flow

Module: `Req`

Description: Batch transfer CodeArts Req IPD work item flow

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_transfer_ipd_work_item_flow",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    },
    "flow_code": {
      "type": "string",
      "minLength": 1
    },
    "is_recover": {
      "type": "boolean",
      "default": false
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids",
    "issue_category",
    "flow_code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_ipd_issues

Module: `Req`

Description: Batch update CodeArts Req IPD issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_ipd_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "attribute": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string",
          "minLength": 1
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "maxLength": 256
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50000
        },
        "parent_id": {
          "$ref": "#/properties/project_id"
        },
        "status": {
          "type": "string"
        },
        "assignee": {
          "type": "object",
          "properties": {
            "id": {
              "$ref": "#/properties/project_id"
            },
            "name": {
              "type": "string"
            },
            "nick_name": {
              "type": "string"
            }
          },
          "additionalProperties": true
        },
        "assigned_cc": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          },
          "maxItems": 50
        },
        "submitted_by": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          }
        },
        "recipient": {
          "type": "array",
          "items": {
            "$ref": "#/properties/attribute/properties/assignee"
          }
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "$ref": "#/properties/project_id"
              },
              "label_type": {
                "type": "string"
              },
              "color": {
                "type": "string"
              },
              "title": {
                "type": "string"
              }
            },
            "additionalProperties": true
          }
        },
        "custom_fields": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "code": {
                "type": "string",
                "minLength": 1
              },
              "value": {
                "type": [
                  "string",
                  "number",
                  "boolean",
                  "null"
                ]
              }
            },
            "required": [
              "code",
              "value"
            ],
            "additionalProperties": false
          }
        },
        "priority": {
          "type": "string"
        },
        "workload": {
          "type": "string"
        },
        "plan_pi": {
          "$ref": "#/properties/project_id"
        },
        "plan_iteration": {
          "$ref": "#/properties/project_id"
        },
        "business_domain": {
          "type": "string"
        },
        "feature_set": {
          "$ref": "#/properties/project_id"
        },
        "plan_end_date": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            }
          ]
        },
        "link": {
          "type": "string"
        },
        "suspended": {
          "type": "boolean"
        },
        "break_status": {
          "type": "string"
        },
        "baseline": {
          "type": "string"
        },
        "status_modified_time": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            }
          ]
        },
        "extra_fields": {
          "type": "object",
          "additionalProperties": {}
        }
      },
      "required": [
        "category"
      ],
      "additionalProperties": true
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_ids",
    "attribute"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_release_plan_baseline

Module: `Req`

Description: Batch update CodeArts Req release or iteration plan baseline

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_release_plan_baseline",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "minItems": 1
    },
    "baseline": {
      "type": "string",
      "enum": [
        "baselined",
        "unbaseline",
        "baseline-reviewing"
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_ids",
    "baseline"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_batch_update_work_items

Module: `Req`

Description: Batch update CodeArts Req work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_batch_update_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_cancel_project_domain

Module: `Req`

Description: Cancel a CodeArts Req project domain association

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_cancel_project_domain",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_change_release_plan_status

Module: `Req`

Description: Change CodeArts Req release or iteration plan status

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_change_release_plan_status",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "operate": {
      "type": "string",
      "minLength": 1
    },
    "move_to_sprint_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "operate"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_check_project_name

Module: `Req`

Description: Check whether a CodeArts Req project name exists

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_check_project_name",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_check_work_item_status_name

Module: `Req`

Description: Check whether a CodeArts Req work item status name already exists

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_check_work_item_status_name",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    }
  },
  "required": [
    "project_id",
    "status_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_clear_plan_work_items

Module: `Req`

Description: Clear work items from a CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_clear_plan_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_copy_work_items

Module: `Req`

Description: Copy CodeArts Req work items between projects

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_copy_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "from_project_id": {
      "type": "string",
      "minLength": 1
    },
    "to_project_id": {
      "$ref": "#/properties/from_project_id"
    },
    "work_item_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/from_project_id"
      },
      "minItems": 1
    },
    "copy_comments": {
      "type": "boolean",
      "default": false
    },
    "copy_work_hours": {
      "type": "boolean",
      "default": false
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "from_project_id",
    "to_project_id",
    "work_item_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_count_work_item_tree

Module: `Req`

Description: Count CodeArts Req work items in tree mode

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_count_work_item_tree",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_ids": {
      "type": "array",
      "items": {
        "type": "integer",
        "exclusiveMinimum": 0
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_change_review_form

Module: `Req`

Description: Create a CodeArts Req IPD change review form

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_change_review_form",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50000
    },
    "need_approval": {
      "type": "boolean"
    },
    "status": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "code"
      ],
      "additionalProperties": true
    },
    "cc": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": true
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_number": {
            "type": "string",
            "minLength": 1
          },
          "issue_category": {
            "type": "string",
            "minLength": 1
          },
          "change_type": {
            "type": "string",
            "minLength": 1
          },
          "before_change": {
            "type": "string",
            "minLength": 1
          },
          "after_change": {
            "type": "string",
            "minLength": 1
          },
          "reviewer": {
            "type": "array",
            "items": {
              "$ref": "#/properties/project_id"
            },
            "minItems": 1
          },
          "approver": {
            "type": "array",
            "items": {
              "$ref": "#/properties/project_id"
            },
            "minItems": 1
          },
          "description": {
            "type": "string"
          }
        },
        "required": [
          "issue_id",
          "issue_number",
          "issue_category",
          "change_type",
          "before_change",
          "after_change",
          "reviewer",
          "approver"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "plan_end_date": {
      "type": "string"
    },
    "plan_start_date": {
      "type": "string"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "need_approval",
    "status",
    "cos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_feature_set

Module: `Req`

Description: Create CodeArts Req IPD feature set

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_feature_set",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_issue

Module: `Req`

Description: Create CodeArts Req IPD issue

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_issue",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string",
      "maxLength": 500000
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "status": {
      "type": "string"
    },
    "src_domain": {
      "$ref": "#/properties/project_id"
    },
    "submitted_by": {
      "$ref": "#/properties/project_id"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "recipient": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "expect_delivery_time": {
      "type": "integer"
    },
    "priority": {
      "type": "string"
    },
    "assigned_cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      },
      "maxItems": 50
    },
    "plan_pi": {
      "$ref": "#/properties/project_id"
    },
    "plan_iteration": {
      "$ref": "#/properties/project_id"
    },
    "plan_start_date": {
      "type": "integer"
    },
    "plan_end_date": {
      "type": "integer"
    },
    "workload_man_day": {
      "type": "number"
    },
    "business_domain": {
      "type": "string"
    },
    "need_break": {
      "type": "string"
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "description",
    "category",
    "assignee"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_label

Module: `Req`

Description: Create CodeArts Req IPD label

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_label",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "label_type": {
      "type": "string",
      "minLength": 1
    },
    "color": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "label_type",
    "color",
    "title"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_module

Module: `Req`

Description: Create CodeArts Req IPD module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "display_value",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_process_instance

Module: `Req`

Description: Create a CodeArts Req IPD BR/GR process instance

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_process_instance",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "operate_type": {
      "type": "string"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "BR",
        "GR"
      ]
    },
    "need_approval": {
      "type": "boolean"
    },
    "plan_end_date": {
      "type": "string"
    },
    "plan_start_date": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "attachWikis": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "attachDocuments": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ccbs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "curr_owner": {
            "$ref": "#/properties/project_id"
          }
        },
        "additionalProperties": true
      }
    },
    "opinions": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "number": {
            "type": "string"
          },
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_category": {
            "type": "string"
          },
          "change_type": {
            "type": "string"
          },
          "before_change": {
            "type": "string"
          },
          "after_change": {
            "type": "string"
          }
        },
        "additionalProperties": true
      }
    },
    "local_attachment_names": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "category",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_ipd_work_hour

Module: `Req`

Description: Create CodeArts Req IPD work hour record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_ipd_work_hour",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "work_date_begin": {
      "type": "string",
      "minLength": 1
    },
    "work_date_end": {
      "type": "string",
      "minLength": 1
    },
    "work_hours": {
      "type": [
        "string",
        "number"
      ]
    },
    "work_hour_type": {
      "anyOf": [
        {
          "type": "integer",
          "exclusiveMinimum": 0
        },
        {
          "type": "string",
          "minLength": 1
        }
      ]
    },
    "include_weekend": {
      "type": "boolean"
    },
    "work_hour_category": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "work_date_begin",
    "work_date_end",
    "work_hours",
    "work_hour_type",
    "include_weekend"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_iteration

Module: `Req`

Description: Create CodeArts Req iteration

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_iteration",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "begin_time",
    "end_time"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_iteration_work_item

Module: `Req`

Description: Create CodeArts Req iteration work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_iteration_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "developer_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_plan

Module: `Req`

Description: Create CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_plan_work_item

Module: `Req`

Description: Create CodeArts Req plan work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_plan_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "developer_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project

Module: `Req`

Description: Create CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project_domain

Module: `Req`

Description: Create CodeArts Req project domain

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_domain",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 31
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project_module

Module: `Req`

Description: Create CodeArts Req project module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id"
    },
    "parent_module_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_name",
    "owner_user_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_project_status_config

Module: `Req`

Description: Create a CodeArts Req custom project status

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_project_status_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "defined_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    },
    "status_attribute": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "defined_name",
    "status_attribute"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_release_plan

Module: `Req`

Description: Create CodeArts Req release or iteration plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_release_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "enum": [
        "PI",
        "Iteration",
        "PlanMilestone"
      ]
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "minimum": 0
        }
      ]
    },
    "plan_end_date": {
      "$ref": "#/properties/plan_start_date"
    },
    "description": {
      "type": "string"
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "workload": {
      "type": "string"
    },
    "owner": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "category",
    "plan_start_date",
    "plan_end_date"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item

Module: `Req`

Description: Create CodeArts Req work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "parent_work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string"
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "developer_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "title",
    "work_item_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_create_work_item_template

Module: `Req`

Description: Create or update a CodeArts Req work item template

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_create_work_item_template",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_delete_attachment

Module: `Req`

Description: Delete a CodeArts Req work item attachment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_attachment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_change_review_form

Module: `Req`

Description: Delete a CodeArts Req IPD change review form

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_change_review_form",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_feature_set

Module: `Req`

Description: Delete CodeArts Req IPD feature set

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_feature_set",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "feature_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_issue_image

Module: `Req`

Description: Delete image from CodeArts Req IPD issue description

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_issue_image",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_label

Module: `Req`

Description: Delete CodeArts Req IPD label

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_label",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "label_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "label_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_module

Module: `Req`

Description: Delete CodeArts Req IPD module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_process_instance

Module: `Req`

Description: Delete a CodeArts Req IPD BR/GR process instance

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_process_instance",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_ipd_work_hour

Module: `Req`

Description: Delete CodeArts Req IPD work hour record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_ipd_work_hour",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "workhour_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "workhour_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_iteration

Module: `Req`

Description: Delete CodeArts Req iteration

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_iteration",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_plan

Module: `Req`

Description: Delete CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project

Module: `Req`

Description: Delete CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project_module

Module: `Req`

Description: Delete CodeArts Req project module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_project_template

Module: `Req`

Description: Delete a CodeArts Req project template

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_project_template",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "template_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "template_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_delete_work_item

Module: `Req`

Description: Delete CodeArts Req work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_delete_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_attachment

Module: `Req`

Description: Download a CodeArts Req work item attachment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_attachment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_image_file

Module: `Req`

Description: Download a CodeArts Req image file

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_image_file",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "image_uri": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "image_uri"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_ipd_issue_attachment

Module: `Req`

Description: Download CodeArts Req IPD issue attachment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_ipd_issue_attachment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "attachment_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "attachment_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_download_ipd_issue_image

Module: `Req`

Description: Download image from CodeArts Req IPD issue description

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_download_ipd_issue_image",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_name": {
      "type": "string",
      "minLength": 1
    },
    "field_code": {
      "type": "string",
      "maxLength": 64
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_info

Module: `Req`

Description: Get current CodeArts Req user info

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_current_user_info",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_current_user_role

Module: `Req`

Description: Get current CodeArts Req user role in a project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_current_user_role",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_e2e_graph

Module: `Req`

Description: Get CodeArts Req IPD E2E trace graph

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_e2e_graph",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "is_src": {
      "type": "boolean"
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_issue

Module: `Req`

Description: Get CodeArts Req IPD issue detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_issue",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "version": {
      "type": "string",
      "enum": [
        "v1",
        "v2"
      ],
      "default": "v2"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_process_instance

Module: `Req`

Description: Get a CodeArts Req IPD process instance

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_process_instance",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_project_field_option_used

Module: `Req`

Description: Get CodeArts Req IPD project field option usage

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_project_field_option_used",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "code": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_review_form

Module: `Req`

Description: Get a CodeArts Req IPD review form

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_review_form",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string",
      "enum": [
        "CR",
        "BR",
        "GR"
      ]
    }
  },
  "required": [
    "project_id",
    "id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_statistic_dashboard

Module: `Req`

Description: Get CodeArts Req IPD statistic dashboard

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_statistic_dashboard",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "classification": {
      "type": "string",
      "minLength": 1
    },
    "plan": {
      "type": "object",
      "properties": {
        "plan_pi": {
          "type": "string"
        },
        "plan_iteration": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "created_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "classification"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_tenant_field_option_used

Module: `Req`

Description: Get CodeArts Req IPD tenant field option usage

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_tenant_field_option_used",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_tenant_field_used

Module: `Req`

Description: Get CodeArts Req IPD tenant field usage

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_tenant_field_used",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "field_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ipd_work_item_flow_detail

Module: `Req`

Description: Get CodeArts Req IPD work item flow detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ipd_work_item_flow_detail",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "issue_category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_ir

Module: `Req`

Description: Get a CodeArts Req requirement pool IR detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_ir",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "ir_id": {
      "$ref": "#/properties/program_id"
    }
  },
  "required": [
    "program_id",
    "ir_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_iteration

Module: `Req`

Description: Get CodeArts Req iteration detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_iteration",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "iteration_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_plan

Module: `Req`

Description: Get CodeArts Req plan detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project

Module: `Req`

Description: Get CodeArts Req project detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_bug_density

Module: `Req`

Description: Get CodeArts Req project bug density metric

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_bug_density",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "date_range": {
      "type": "string",
      "minLength": 1
    },
    "metric_type": {
      "type": "string",
      "minLength": 1
    },
    "dividend": {
      "type": "object",
      "properties": {
        "custom_fields": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "minLength": 1
              },
              "options": {
                "type": "string",
                "minLength": 1
              }
            },
            "additionalProperties": false
          },
          "minItems": 1
        }
      },
      "additionalProperties": false
    },
    "divisor": {
      "type": "object",
      "properties": {
        "custom_fields": {
          "type": "array",
          "items": {
            "$ref": "#/properties/dividend/properties/custom_fields/items"
          },
          "minItems": 1
        }
      },
      "additionalProperties": false
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_bugs_per_developer

Module: `Req`

Description: Get CodeArts Req project bugs per developer metric

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_bugs_per_developer",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_completion_rate

Module: `Req`

Description: Get CodeArts Req project completion rate metric

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_completion_rate",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "date_range": {
      "type": "string",
      "minLength": 1
    },
    "metric_type": {
      "type": "string",
      "minLength": 1
    },
    "sprint_id": {
      "$ref": "#/properties/project_id"
    },
    "dividend": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "divisor": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_due_days_after

Module: `Req`

Description: Get CodeArts Req project due-days-after config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_due_days_after",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_public_config

Module: `Req`

Description: Get CodeArts Req project public config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_public_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_summary

Module: `Req`

Description: Get CodeArts Req project summary

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_summary",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_project_workhour_config

Module: `Req`

Description: Get CodeArts Req project workhour config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_project_workhour_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_release_plan

Module: `Req`

Description: Get CodeArts Req release or iteration plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_release_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item

Module: `Req`

Description: Get CodeArts Req work item detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_completion_rate

Module: `Req`

Description: Get CodeArts Req work item completion rates

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_completion_rate",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_index_counts

Module: `Req`

Description: Get CodeArts Req work item index counts

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_index_counts",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_issue_details

Module: `Req`

Description: Get CodeArts Req work item issue details from the V2 detail endpoint

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_issue_details",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "include": {
      "type": "string",
      "minLength": 1,
      "default": "children,parent"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_status_rule_flag

Module: `Req`

Description: Get CodeArts Req work item status rule flag

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_status_rule_flag",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_get_work_item_template_config

Module: `Req`

Description: Get CodeArts Req work item template config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_get_work_item_template_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_group_ipd_issues

Module: `Req`

Description: Group CodeArts Req IPD issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_group_ipd_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "group_field_id": {
      "$ref": "#/properties/project_id"
    },
    "is_project_group": {
      "type": "boolean"
    },
    "group_sort": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "operator": {
              "type": "string"
            }
          },
          "additionalProperties": true
        }
      },
      "maxItems": 200
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    }
  },
  "required": [
    "project_id",
    "issue_type",
    "group_field_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_leave_project

Module: `Req`

Description: Leave a CodeArts Req project as the current member

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_leave_project",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_commits

Module: `Req`

Description: List CodeArts Req associated commits

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_commits",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "commit"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_issues

Module: `Req`

Description: List CodeArts Req associated issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_test_cases

Module: `Req`

Description: List CodeArts Req associated test cases

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_test_cases",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_associated_wikis

Module: `Req`

Description: List CodeArts Req associated wikis

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_associated_wikis",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_item_status_records

Module: `Req`

Description: List CodeArts Req board work item status records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_item_status_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_item_workflow_config

Module: `Req`

Description: List CodeArts Req board work item workflow config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_item_workflow_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "board_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "board_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_board_work_items

Module: `Req`

Description: List CodeArts Req board work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_board_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "created_time_interval": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_cache_data

Module: `Req`

Description: List CodeArts Req cache data

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_cache_data",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "backlog"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_child_work_items

Module: `Req`

Description: List CodeArts Req child work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_child_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    },
    "query_type": {
      "type": "string",
      "minLength": 1,
      "default": "basic"
    }
  },
  "required": [
    "project_id",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_attached_wikis

Module: `Req`

Description: List CodeArts Req IPD issue attached wikis

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_attached_wikis",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_category_statuses

Module: `Req`

Description: List CodeArts Req IPD category statuses

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_category_statuses",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_change_review_issue_approvers

Module: `Req`

Description: List CodeArts Req IPD change review approvers for an issue

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_change_review_issue_approvers",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_feature_sets

Module: `Req`

Description: List CodeArts Req IPD feature sets

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_feature_sets",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_attachments

Module: `Req`

Description: List CodeArts Req IPD issue attachments

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_attachments",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "source_project_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "issue_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_fields

Module: `Req`

Description: List CodeArts Req IPD issue fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_relation_config

Module: `Req`

Description: List CodeArts Req IPD issue relation config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_relation_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issue_tree

Module: `Req`

Description: List CodeArts Req IPD issue tree

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issue_tree",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "minLength": 1
    },
    "keyword": {
      "type": "string"
    },
    "number": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "plan": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "plan_pi": {
            "type": "string"
          },
          "plan_iteration": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "additionalProperties": true
      }
    },
    "modified_date": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "additionalProperties": true
    }
  },
  "required": [
    "project_id",
    "category"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_issues

Module: `Req`

Description: List CodeArts Req IPD issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "operator": {
              "type": "string"
            }
          },
          "additionalProperties": true
        }
      },
      "maxItems": 200
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    }
  },
  "required": [
    "project_id",
    "issue_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_labels

Module: `Req`

Description: List CodeArts Req IPD labels

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_labels",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_modules

Module: `Req`

Description: List CodeArts Req IPD modules

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_modules",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_process_instances

Module: `Req`

Description: List CodeArts Req IPD process instances

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_process_instances",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "object",
            "properties": {
              "values": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "operator": {
                "type": "string"
              }
            },
            "additionalProperties": true
          }
        },
        "additionalProperties": true
      },
      "default": []
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    },
    "page": {
      "type": "object",
      "properties": {
        "page_no": {
          "type": "integer",
          "exclusiveMinimum": 0,
          "default": 1
        },
        "page_size": {
          "type": "integer",
          "exclusiveMinimum": 0,
          "maximum": 200,
          "default": 200
        }
      },
      "additionalProperties": true,
      "default": {
        "page_no": 1,
        "page_size": 200
      }
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_project_fields

Module: `Req`

Description: List CodeArts Req IPD project fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_project_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_project_users

Module: `Req`

Description: List CodeArts Req IPD project users

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_project_users",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_projects

Module: `Req`

Description: List CodeArts Req IPD projects

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_projects",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_list_ipd_review_forms

Module: `Req`

Description: List CodeArts Req IPD review forms

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_review_forms",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "enum": [
        "CR",
        "BR",
        "GR"
      ]
    },
    "created_by": {
      "$ref": "#/properties/project_id"
    },
    "keyword": {
      "type": "string"
    },
    "created_time": {
      "type": "object",
      "properties": {
        "start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        }
      },
      "additionalProperties": true
    },
    "plan_end_date": {
      "$ref": "#/properties/created_time"
    },
    "plan_start_date": {
      "$ref": "#/properties/created_time"
    },
    "closed_time": {
      "$ref": "#/properties/created_time"
    },
    "approver": {
      "type": "string"
    },
    "reviewer": {
      "type": "string"
    },
    "offset": {
      "type": "integer",
      "minimum": 0,
      "default": 0
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    }
  },
  "required": [
    "project_id",
    "type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_review_role_users

Module: `Req`

Description: List CodeArts Req IPD review approver or reviewer role users

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_review_role_users",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_type": {
      "type": "string",
      "enum": [
        "approver",
        "reviewer"
      ],
      "default": "approver"
    },
    "target_project_id": {
      "$ref": "#/properties/project_id"
    },
    "review_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_snapshot_features

Module: `Req`

Description: List CodeArts Req IPD snapshot features

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_snapshot_features",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "snapshot_version_id": {
      "$ref": "#/properties/project_id"
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "snapshot_version_id",
    "feature_set_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_snapshot_versions

Module: `Req`

Description: List CodeArts Req IPD feature set snapshot versions

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_snapshot_versions",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_statuses

Module: `Req`

Description: List CodeArts Req IPD statuses

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_statuses",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_tenant_fields

Module: `Req`

Description: List CodeArts Req IPD tenant fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_tenant_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "minimum": 10,
      "maximum": 200,
      "default": 20
    },
    "search": {
      "type": "string"
    },
    "sort_info": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "asc": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_tenant_issues

Module: `Req`

Description: List CodeArts Req IPD tenant issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_tenant_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "items": {
            "$ref": "#/properties/project_id/anyOf/0"
          },
          "maxItems": 10
        }
      ]
    },
    "issue_type": {
      "type": "string",
      "minLength": 1
    },
    "filter": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "values": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "operator": {
              "type": "string"
            }
          },
          "additionalProperties": true
        }
      },
      "maxItems": 200
    },
    "filter_mode": {
      "type": "string",
      "enum": [
        "OR_AND",
        "AND_OR"
      ],
      "default": "AND_OR"
    },
    "sort": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string"
          },
          "asc": {
            "type": "boolean"
          }
        },
        "additionalProperties": true
      }
    }
  },
  "required": [
    "issue_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_work_hour_categories

Module: `Req`

Description: List CodeArts Req IPD work hour categories

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_work_hour_categories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "maxLength": 30
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_work_hours

Module: `Req`

Description: List CodeArts Req IPD work hour records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_work_hours",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_pi": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "plan_iteration": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "workitem_id": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "created_by": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_workflow_fields

Module: `Req`

Description: List CodeArts Req IPD workflow fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_workflow_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "category_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ipd_workflow_templates

Module: `Req`

Description: List CodeArts Req IPD workflow templates

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ipd_workflow_templates",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "category_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ir_children

Module: `Req`

Description: List CodeArts Req requirement pool IR children

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ir_children",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "ir_id": {
      "$ref": "#/properties/program_id"
    },
    "query_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "program_id",
    "ir_id",
    "query_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_ir_histories

Module: `Req`

Description: List CodeArts Req requirement pool IR history records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_ir_histories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "ir_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "ir_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_issue_severities

Module: `Req`

Description: List CodeArts Req issue severities

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_issue_severities",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_status_statistics

Module: `Req`

Description: List CodeArts Req iteration status statistics

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iteration_status_statistics",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iteration_work_items

Module: `Req`

Description: List CodeArts Req work items in an iteration

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iteration_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "iteration_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_iterations

Module: `Req`

Description: List CodeArts Req iterations

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_iterations",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_job_cache_boards

Module: `Req`

Description: List CodeArts Req board cache fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_job_cache_boards",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "type": {
      "type": "string",
      "minLength": 1,
      "default": "board"
    },
    "region": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_not_added_projects

Module: `Req`

Description: List CodeArts Req projects not yet added to the current domain

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_not_added_projects",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_optional_work_item_status_configs

Module: `Req`

Description: List CodeArts Req optional work item status configs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_optional_work_item_status_configs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plan_addable_work_items

Module: `Req`

Description: List addable work items for a CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plan_addable_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plan_work_items

Module: `Req`

Description: List CodeArts Req work items in a plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plan_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "subject": {
      "type": "string"
    },
    "show_type": {
      "type": "string",
      "enum": [
        "list",
        "tree"
      ],
      "default": "list"
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_plans

Module: `Req`

Description: List CodeArts Req plans

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_plans",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "search": {
      "type": "string"
    },
    "user_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/project_id"
      }
    },
    "sort": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_program_fields

Module: `Req`

Description: List CodeArts Req program IR or RR fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_program_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "field_type": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "program_id",
    "field_type"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_programs

Module: `Req`

Description: List CodeArts Req project spaces / programs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_programs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "search": {
      "type": "string",
      "minLength": 1
    },
    "sort_key": {
      "type": "string",
      "minLength": 1
    },
    "sort_dir": {
      "type": "string",
      "enum": [
        "ASC",
        "DESC",
        "asc",
        "desc"
      ]
    },
    "is_watched": {
      "type": "boolean"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_bug_statistics

Module: `Req`

Description: List CodeArts Req project bug statistics

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_bug_statistics",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_demand_statistics

Module: `Req`

Description: List CodeArts Req project demand statistics

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_demand_statistics",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_domains

Module: `Req`

Description: List CodeArts Req project domains

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_domains",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_members

Module: `Req`

Description: List CodeArts Req project members

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_members",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_modules

Module: `Req`

Description: List CodeArts Req project modules

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_modules",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_hour_types

Module: `Req`

Description: List CodeArts Req project work hour types

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hour_types",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_hours

Module: `Req`

Description: List CodeArts Req project work hour records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_hours",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_ids": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "minItems": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "work_hours_dates": {
      "type": "string",
      "minLength": 1
    },
    "work_hours_types": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_project_work_item_records

Module: `Req`

Description: List CodeArts Req project work item records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_project_work_item_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "operated_time_interval": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_projects

Module: `Req`

Description: List CodeArts Req projects

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_projects",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "organization_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_related_users

Module: `Req`

Description: List CodeArts Req related users

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_related_users",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_release_plans

Module: `Req`

Description: List CodeArts Req release or iteration plans

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_release_plans",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "key_word": {
      "type": "string"
    },
    "updated_time_interval": {
      "type": "string"
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rr_histories

Module: `Req`

Description: List CodeArts Req requirement pool RR history records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rr_histories",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "rr_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "rr_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rr_statuses

Module: `Req`

Description: List CodeArts Req requirement pool RR statuses

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rr_statuses",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "rr_ids": {
      "type": "array",
      "items": {
        "$ref": "#/properties/program_id"
      },
      "minItems": 1,
      "maxItems": 100
    }
  },
  "required": [
    "program_id",
    "rr_ids"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_rrs

Module: `Req`

Description: List CodeArts Req requirement pool RRs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_rrs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 1000,
      "default": 20
    },
    "program_id": {
      "type": "string",
      "minLength": 1
    },
    "query_type": {
      "type": "string",
      "minLength": 1,
      "default": "ALL"
    },
    "include_deleted": {
      "type": "boolean"
    },
    "updated_time_interval": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "program_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_user_features

Module: `Req`

Description: List CodeArts Req user features

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_user_features",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_comments

Module: `Req`

Description: List CodeArts Req work item comments

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_comments",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_custom_fields

Module: `Req`

Description: List CodeArts Req work item custom fields

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_custom_fields",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_records

Module: `Req`

Description: List CodeArts Req work item records

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_records",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "journalized_type": {
      "type": "string",
      "minLength": 1,
      "default": "Issue"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_attributes

Module: `Req`

Description: List CodeArts Req work item status attributes

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_attributes",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_configs

Module: `Req`

Description: List CodeArts Req work item status configs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_configs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_status_details

Module: `Req`

Description: List CodeArts Req work item status details

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_status_details",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_statuses

Module: `Req`

Description: List CodeArts Req work item statuses

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_statuses",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tags

Module: `Req`

Description: List CodeArts Req work item tags

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tags",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_templates

Module: `Req`

Description: List CodeArts Req work item templates

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_templates",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tracker_handlers

Module: `Req`

Description: List CodeArts Req work item tracker handlers

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tracker_handlers",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_tree

Module: `Req`

Description: List CodeArts Req work items in tree mode

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_tree",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_ids": {
      "type": "array",
      "items": {
        "type": "integer",
        "exclusiveMinimum": 0
      },
      "minItems": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_work_hours

Module: `Req`

Description: List CodeArts Req work hour records for a work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_work_hours",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_item_workflow_config

Module: `Req`

Description: List CodeArts Req work item workflow config

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_item_workflow_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "project_id",
    "tracker_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_list_work_items

Module: `Req`

Description: List CodeArts Req work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_list_work_items",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_query_iteration_immovable_issues

Module: `Req`

Description: Query CodeArts Req iteration immovable issues

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_query_iteration_immovable_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "version_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "version_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_transfer_ipd_work_item_flow

Module: `Req`

Description: Transfer CodeArts Req IPD work item flow

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_transfer_ipd_work_item_flow",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "issue_category": {
      "type": "string",
      "minLength": 1
    },
    "flow_code": {
      "type": "string",
      "minLength": 1
    },
    "process_context": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "issue_category",
    "flow_code"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_cache_data

Module: `Req`

Description: Update CodeArts Req cache data

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_cache_data",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_change_review_form

Module: `Req`

Description: Update a CodeArts Req IPD change review form

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_change_review_form",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "category": {
      "type": "string",
      "const": "CR",
      "default": "CR"
    },
    "old_status": {
      "type": "object",
      "properties": {
        "code": {
          "type": "string",
          "minLength": 1
        }
      },
      "required": [
        "code"
      ],
      "additionalProperties": true
    },
    "status": {
      "$ref": "#/properties/old_status"
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "$ref": "#/properties/project_id"
          },
          "review_comments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "result": {
                  "type": "string"
                },
                "comment": {
                  "type": "string"
                },
                "other_user_id": {
                  "$ref": "#/properties/project_id"
                }
              },
              "additionalProperties": true
            }
          },
          "approval_comments": {
            "type": "array",
            "items": {
              "$ref": "#/properties/cos/items/properties/review_comments/items"
            }
          }
        },
        "required": [
          "id"
        ],
        "additionalProperties": true
      },
      "minItems": 1
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id",
    "old_status",
    "status",
    "cos"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_feature_set

Module: `Req`

Description: Update CodeArts Req IPD feature set

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_feature_set",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "feature_set_id": {
      "$ref": "#/properties/project_id"
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "position_float": {
      "type": "number"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "feature_set_id",
    "parent_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_label

Module: `Req`

Description: Update CodeArts Req IPD label

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_label",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_module

Module: `Req`

Description: Update CodeArts Req IPD module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "display_value": {
      "type": "string",
      "minLength": 2,
      "maxLength": 30
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "assignee": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "display_value",
    "parent_id",
    "module_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_process_instance

Module: `Req`

Description: Update a CodeArts Req IPD BR/GR process instance

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_process_instance",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "id": {
      "$ref": "#/properties/project_id"
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "old_status": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 256
    },
    "description": {
      "type": "string"
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "plan_end_date": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    },
    "ccbs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "user_id": {
            "$ref": "#/properties/project_id"
          },
          "curr_owner": {
            "$ref": "#/properties/project_id"
          }
        },
        "additionalProperties": true
      }
    },
    "opinions": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cc": {
      "type": "array",
      "items": {
        "$ref": "#/properties/ccbs/items"
      }
    },
    "cos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "number": {
            "type": "string"
          },
          "issue_id": {
            "$ref": "#/properties/project_id"
          },
          "issue_category": {
            "type": "string"
          },
          "change_type": {
            "type": "string"
          },
          "before_change": {
            "type": "string"
          },
          "after_change": {
            "type": "string"
          }
        },
        "additionalProperties": true
      }
    },
    "extra_fields": {
      "type": "object",
      "additionalProperties": {}
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_ipd_project_field

Module: `Req`

Description: Update CodeArts Req IPD project field

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_project_field",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_tenant_field

Module: `Req`

Description: Update CodeArts Req IPD tenant field

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_tenant_field",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_ipd_work_hour

Module: `Req`

Description: Update CodeArts Req IPD work hour record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_ipd_work_hour",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_iteration

Module: `Req`

Description: Update CodeArts Req iteration

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_iteration",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "begin_time": {
      "type": "string",
      "minLength": 1
    },
    "end_time": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "over_type": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_iteration_state

Module: `Req`

Description: Update CodeArts Req iteration state

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_iteration_state",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "due_date": {
      "type": "string",
      "minLength": 1
    },
    "start_date": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "iteration_id",
    "name",
    "status"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_plan

Module: `Req`

Description: Update CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_plan_image

Module: `Req`

Description: Update image for a CodeArts Req plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_plan_image",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "img_url": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id",
    "img_url"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project

Module: `Req`

Description: Update CodeArts Req project

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_domain

Module: `Req`

Description: Update CodeArts Req project domain

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_domain",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "domain_id": {
      "$ref": "#/properties/project_id"
    },
    "domain_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 31
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "domain_id",
    "domain_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_member_role

Module: `Req`

Description: Update a CodeArts Req project member role

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_member_role",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "user_id": {
      "$ref": "#/properties/project_id"
    },
    "role_id": {
      "anyOf": [
        {
          "type": "number",
          "const": -1
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "user_id",
    "role_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_module

Module: `Req`

Description: Update CodeArts Req project module

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_module",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    },
    "owner_user_id": {
      "$ref": "#/properties/project_id"
    },
    "description": {
      "type": "string",
      "maxLength": 255
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "module_id",
    "module_name",
    "owner_user_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_project_template

Module: `Req`

Description: Update a CodeArts Req project template

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_project_template",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {}
}
```

### req_update_release_plan

Module: `Req`

Description: Update CodeArts Req release or iteration plan

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_release_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "category": {
      "type": "string",
      "enum": [
        "PI",
        "Iteration",
        "PlanMilestone"
      ]
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "planned",
        "going",
        "ended"
      ]
    },
    "plan_start_date": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "integer",
          "minimum": 0
        }
      ]
    },
    "plan_end_date": {
      "$ref": "#/properties/plan_start_date"
    },
    "created_date": {
      "type": "integer",
      "minimum": 0
    },
    "parent_id": {
      "$ref": "#/properties/project_id"
    },
    "baseline": {
      "type": "string",
      "enum": [
        "baselined",
        "unbaseline",
        "baseline-reviewing"
      ]
    },
    "workload": {
      "type": "string"
    },
    "owner": {
      "$ref": "#/properties/project_id"
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_tracker_config

Module: `Req`

Description: Update a CodeArts Req tracker status config position

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_tracker_config",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "tracker_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "status_config_id": {
      "$ref": "#/properties/project_id"
    },
    "new_position": {
      "type": "integer",
      "minimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "tracker_id",
    "status_config_id",
    "new_position"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item

Module: `Req`

Description: Update CodeArts Req work item

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "title": {
      "type": "string",
      "minLength": 1
    },
    "work_item_type": {
      "type": "string",
      "minLength": 1
    },
    "description": {
      "type": "string"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "priority_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "iteration_id": {
      "$ref": "#/properties/project_id"
    },
    "module_id": {
      "$ref": "#/properties/project_id"
    },
    "severity_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "assigned_id": {
      "$ref": "#/properties/project_id"
    },
    "developer_id": {
      "$ref": "#/properties/project_id"
    },
    "done_ratio": {
      "type": "integer",
      "minimum": 0
    },
    "expected_work_hours": {
      "type": "integer",
      "minimum": 0
    },
    "start_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "due_date": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item_comment

Module: `Req`

Description: Update a CodeArts Req work item comment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item_comment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "comment_id": {
      "$ref": "#/properties/project_id"
    },
    "content": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "comment_id",
    "content"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_work_item_flow

Module: `Req`

Description: Update CodeArts Req work item flow

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_work_item_flow",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "status_id": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "status_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_update_working_hours

Module: `Req`

Description: Update a CodeArts Req work item work hour record

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_update_working_hours",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "anyOf": [
        {
          "$ref": "#/properties/project_id"
        },
        {
          "type": "integer",
          "exclusiveMinimum": 0
        }
      ]
    },
    "work_hours_id": {
      "$ref": "#/properties/project_id"
    },
    "summary": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128
    },
    "work_hours": {
      "type": "number",
      "minimum": 0,
      "maximum": 100000000
    },
    "work_hour_type": {
      "type": "integer",
      "exclusiveMinimum": 0
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "work_hours_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_attachment

Module: `Req`

Description: Upload a CodeArts Req work item attachment

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_attachment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "work_item_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "work_item_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_ipd_issue_attachment

Module: `Req`

Description: Upload attachment to CodeArts Req IPD issue

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_ipd_issue_attachment",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_ipd_issue_image

Module: `Req`

Description: Upload image to CodeArts Req IPD issue description

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_ipd_issue_image",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "issue_id": {
      "$ref": "#/properties/project_id"
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "issue_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_upload_work_item_image

Module: `Req`

Description: Upload an image for CodeArts Req work items

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_upload_work_item_image",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "file_path": {
      "type": "string",
      "minLength": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "file_path"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### req_validate_module_name

Module: `Req`

Description: Validate whether a CodeArts Req module name already exists

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "req_validate_module_name",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "module_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 30
    }
  },
  "required": [
    "project_id",
    "module_name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_case

Module: `TestPlan`

Description: Get CodeArts TestPlan case detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_case",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "case_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "case_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_get_plan

Module: `TestPlan`

Description: Get CodeArts TestPlan plan detail

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_get_plan",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_cases

Module: `TestPlan`

Description: List CodeArts TestPlan cases

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_cases",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    },
    "owner_id": {
      "$ref": "#/properties/project_id"
    },
    "status": {
      "type": "string",
      "minLength": 1
    },
    "priority": {
      "type": "string",
      "minLength": 1
    },
    "module_id": {
      "type": "string",
      "minLength": 1
    },
    "label_id": {
      "type": "string",
      "minLength": 1
    },
    "test_case_type": {
      "type": "string",
      "minLength": 1
    },
    "query": {
      "type": "object",
      "additionalProperties": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "number"
          },
          {
            "type": "boolean"
          },
          {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        ]
      }
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_issues

Module: `TestPlan`

Description: List CodeArts TestPlan requirement tree

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_issues",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_plans

Module: `TestPlan`

Description: List CodeArts TestPlan plans

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_plans",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "project_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_list_runs

Module: `TestPlan`

Description: List CodeArts TestPlan runs

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_list_runs",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "page": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "default": 1
    },
    "page_size": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200,
      "default": 20
    },
    "keyword": {
      "type": "string"
    },
    "sort_by": {
      "type": "string"
    },
    "sort_order": {
      "type": "string",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "plan_id": {
      "$ref": "#/properties/project_id"
    }
  },
  "required": [
    "project_id",
    "plan_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### testplan_run_cases

Module: `TestPlan`

Description: Run CodeArts TestPlan cases

Call example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "testplan_run_cases",
    "arguments": {}
  }
}
```

Input JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "project_id": {
      "type": "string",
      "minLength": 1
    },
    "execute_list": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "case_id": {
            "$ref": "#/properties/project_id"
          },
          "testcase_id": {
            "$ref": "#/properties/project_id"
          },
          "executor_id": {
            "$ref": "#/properties/project_id"
          },
          "execute_id": {
            "$ref": "#/properties/project_id"
          },
          "result_id": {
            "type": "string",
            "minLength": 1
          },
          "start_time": {
            "type": "string",
            "minLength": 1
          },
          "end_time": {
            "type": "string",
            "minLength": 1
          },
          "duration": {
            "type": "integer",
            "minimum": 0
          },
          "description": {
            "type": "string",
            "minLength": 1
          },
          "remark": {
            "type": "string",
            "minLength": 1
          }
        },
        "additionalProperties": false
      },
      "minItems": 1
    },
    "dry_run": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "project_id",
    "execute_list"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

