import { describe, expect, it } from "vitest";
import { mapPipelineExtensionModuleList } from "../../../../src/products/pipeline/tools/list-extension-modules.js";
import { mapPipelineExtensionModuleDetail } from "../../../../src/products/pipeline/tools/get-extension-module.js";
import { mapPipelineExtensionEndpointList } from "../../../../src/products/pipeline/tools/list-extension-endpoints.js";
import { mapPipelineExtensionEndpoint } from "../../../../src/products/pipeline/tools/get-extension-endpoint.js";
import {
  mapCreatedPipelineExtensionEndpoint,
  previewCreatePipelineExtensionEndpoint
} from "../../../../src/products/pipeline/tools/create-extension-endpoint.js";
import {
  mapUpdatedPipelineExtensionEndpoint,
  previewUpdatePipelineExtensionEndpoint
} from "../../../../src/products/pipeline/tools/update-extension-endpoint.js";
import {
  mapDeletedPipelineExtensionEndpoint,
  previewDeletePipelineExtensionEndpoint
} from "../../../../src/products/pipeline/tools/delete-extension-endpoint.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedPage
} from "./tool-test-helpers.js";

describe("mapPipelineExtensionModuleList", () => {
  it("returns normalized pipeline extension module list data", () => {
    const result = mapPipelineExtensionModuleList(
      [
        {
          id: 1,
          module_id: "module-1",
          name: "Maven Repo",
          description: "Maven repository connector",
          location: "devcloud.open.endpoint",
          type: "InnerEndpoint",
          version: "1.0.0",
          publisher: "Huawei",
          base_url: "https://plugins.example.com",
          tags: ["maven"],
          url_relative: "plugins/maven/1.0.0",
          manifest_version: "1"
        }
      ],
      0,
      20,
      1
    );

    expectMappedPage(result, {
      items: [
        {
          id: 1,
          moduleId: "module-1",
          name: "Maven Repo",
          description: "Maven repository connector",
          location: "devcloud.open.endpoint",
          type: "InnerEndpoint",
          version: "1.0.0",
          publisher: "Huawei",
          baseUrl: "https://plugins.example.com",
          tags: ["maven"],
          urlRelative: "plugins/maven/1.0.0",
          manifestVersion: "1"
        }
      ],
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 1
      }
    });
  });
});

describe("mapPipelineExtensionModuleDetail", () => {
  it("returns normalized pipeline extension module detail data", () => {
    const result = mapPipelineExtensionModuleDetail("module-1", [
      {
        id: 1,
        module_id: "module-1",
        name: "Maven Repo",
        description: "Maven repository connector",
        location: "devcloud.open.endpoint",
        type: "InnerEndpoint",
        version: "1.0.0",
        publisher: "Huawei",
        base_url: "https://plugins.example.com",
        tags: ["maven"],
        url_relative: "plugins/maven/1.0.0",
        manifest_version: "1"
      }
    ]);

    expectMappedItem(result, {
      id: "module-1",
      moduleId: "module-1",
      versionCount: 1,
      versions: [
        {
          id: 1,
          moduleId: "module-1",
          name: "Maven Repo",
          description: "Maven repository connector",
          location: "devcloud.open.endpoint",
          type: "InnerEndpoint",
          version: "1.0.0",
          publisher: "Huawei",
          baseUrl: "https://plugins.example.com",
          tags: ["maven"],
          urlRelative: "plugins/maven/1.0.0",
          manifestVersion: "1"
        }
      ]
    });
  });
});

describe("mapPipelineExtensionEndpointList", () => {
  it("returns normalized pipeline extension endpoint list data", () => {
    const result = mapPipelineExtensionEndpointList(
      "project-1",
      [
        {
          uuid: "endpoint-1",
          url: "https://repo.example.com",
          name: "Maven Central",
          project_uuid: "project-1",
          region_name: "cn-north-4",
          module_id: "module-1",
          data: {
            repo: "central"
          },
          created_by: {
            username: "yao",
            user_id: "user-1"
          }
        }
      ],
      0,
      20,
      1
    );

    expectMappedPage(result, {
      items: [
        {
          id: "endpoint-1",
          uuid: "endpoint-1",
          projectId: "project-1",
          name: "Maven Central",
          url: "https://repo.example.com",
          regionName: "cn-north-4",
          moduleId: "module-1",
          data: {
            repo: "central"
          },
          createdBy: {
            username: "yao",
            userId: "user-1"
          }
        }
      ],
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 1
      }
    });
  });
});

describe("mapPipelineExtensionEndpoint", () => {
  it("returns normalized pipeline extension endpoint detail data", () => {
    const result = mapPipelineExtensionEndpoint({
      uuid: "endpoint-1",
      url: "https://repo.example.com",
      name: "Maven Central",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "yao"
        }
      },
      data: {
        repo: "central"
      },
      created_by: {
        username: "yao",
        user_id: "user-1"
      }
    });

    expectMappedItem(result, {
      id: "endpoint-1",
      uuid: "endpoint-1",
      projectId: "project-1",
      name: "Maven Central",
      url: "https://repo.example.com",
      regionName: "cn-north-4",
      moduleId: "module-1",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "yao"
        }
      },
      data: {
        repo: "central"
      },
      createdBy: {
        username: "yao",
        userId: "user-1"
      }
    });
  });
});

describe("previewCreatePipelineExtensionEndpoint", () => {
  it("returns a dry-run summary for creating a pipeline extension endpoint", () => {
    const result = previewCreatePipelineExtensionEndpoint({
      project_id: "project-1",
      module_id: "module-1",
      region_name: "cn-north-4",
      name: "Maven Central",
      url: "https://repo.example.com",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      moduleId: "module-1",
      regionName: "cn-north-4",
      name: "Maven Central",
      url: "https://repo.example.com",
      executed: false
    });
  });
});

describe("mapCreatedPipelineExtensionEndpoint", () => {
  it("returns normalized created extension endpoint data", () => {
    const result = mapCreatedPipelineExtensionEndpoint({
      uuid: "endpoint-1",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      name: "Maven Central",
      url: "https://repo.example.com"
    });

    expectMappedItem(result, {
      id: "endpoint-1",
      uuid: "endpoint-1",
      projectId: "project-1",
      regionName: "cn-north-4",
      moduleId: "module-1",
      name: "Maven Central",
      url: "https://repo.example.com",
      executed: true
    });
  });
});

describe("previewUpdatePipelineExtensionEndpoint", () => {
  it("returns a dry-run summary for updating a pipeline extension endpoint", () => {
    const result = previewUpdatePipelineExtensionEndpoint({
      uuid: "endpoint-1",
      project_id: "project-1",
      module_id: "module-1",
      region_name: "cn-north-4",
      name: "Maven Central v2",
      url: "https://repo.example.com/v2",
      dry_run: true
    });

    expectDryRunPreview(result, {
      uuid: "endpoint-1",
      projectId: "project-1",
      moduleId: "module-1",
      regionName: "cn-north-4",
      name: "Maven Central v2",
      url: "https://repo.example.com/v2",
      executed: false
    });
  });
});

describe("mapUpdatedPipelineExtensionEndpoint", () => {
  it("returns normalized updated extension endpoint data", () => {
    const result = mapUpdatedPipelineExtensionEndpoint({
      uuid: "endpoint-1",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      name: "Maven Central v2",
      url: "https://repo.example.com/v2"
    });

    expectMappedItem(result, {
      id: "endpoint-1",
      uuid: "endpoint-1",
      projectId: "project-1",
      regionName: "cn-north-4",
      moduleId: "module-1",
      name: "Maven Central v2",
      url: "https://repo.example.com/v2",
      executed: true
    });
  });
});

describe("previewDeletePipelineExtensionEndpoint", () => {
  it("returns a dry-run summary for deleting a pipeline extension endpoint", () => {
    const result = previewDeletePipelineExtensionEndpoint({
      uuid: "endpoint-1",
      project_id: "project-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      uuid: "endpoint-1",
      projectId: "project-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineExtensionEndpoint", () => {
  it("returns normalized deleted extension endpoint data", () => {
    const result = mapDeletedPipelineExtensionEndpoint({
      uuid: "endpoint-1",
      project_id: "project-1",
      success: true
    });

    expectMappedItem(result, {
      id: "endpoint-1",
      uuid: "endpoint-1",
      projectId: "project-1",
      success: true,
      executed: true
    });
  });
});
