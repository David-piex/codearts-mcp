import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient configureReleaseUploadStep", () => {
  it("loads the current job config, updates the release upload step properties, and posts the merged payload", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          result: {
            job_id: "job-1",
            job_name: "gateway-build",
            project_id: "project-1",
            arch: "x86-64",
            host_type: "devcloud",
            flavor: "DEFAULT",
            parameters: [],
            scms: [],
            steps: [
              {
                name: "Npm build",
                enable: true,
                module_id: "devcloud2018.codeci_action_20014.action",
                version: null,
                properties: {
                  image: "nodejs18",
                  command: "npm ci && npm run build",
                  preCondition: "SUCCESS"
                }
              },
              {
                name: "Upload package to release repository",
                enable: true,
                module_id: "devcloud2018.codeci_action_20018.action",
                version: null,
                properties: {
                  image: "shell4.2.46-git1.8.3-zip6.00",
                  buildVersion: "",
                  file: "bin/*",
                  name: "codearts-mcp",
                  remainOriginPath: "FLAT",
                  uploadTool: "curl",
                  customUploadPath: "",
                  preCondition: "SUCCESS"
                }
              }
            ]
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {};
      }
    } as never);

    const result = await client.configureReleaseUploadStep({
      job_id: "job-1",
      step_name: "Upload package to release repository",
      file: "codearts-mcp.tgz",
      build_version: "1.0.0",
      custom_upload_path: "/prod/codearts-mcp"
    });

    expect(result).toEqual({
      job_id: "job-1",
      name: "gateway-build",
      configured_step_name: "Upload package to release repository",
      module_id: "devcloud2018.codeci_action_20018.action",
      file: "codearts-mcp.tgz",
      package_name: "codearts-mcp",
      build_version: "1.0.0",
      custom_upload_path: "/prod/codearts-mcp",
      upload_tool: "curl",
      remain_origin_path: "FLAT",
      pre_condition: "SUCCESS"
    });

    expect(requests).toEqual([
      { method: "GET", path: "/v1/job/job-1/config" },
      {
        method: "POST",
        path: "/v1/job/update",
        body: {
          job_id: "job-1",
          job_name: "gateway-build",
          project_id: "project-1",
          arch: "x86-64",
          host_type: "devcloud",
          flavor: "DEFAULT",
          parameters: [],
          scms: [],
          steps: [
            {
              name: "Npm build",
              enable: true,
              module_id: "devcloud2018.codeci_action_20014.action",
              version: null,
              properties: {
                image: "nodejs18",
                command: "npm ci && npm run build",
                preCondition: "SUCCESS"
              }
            },
            {
              name: "Upload package to release repository",
              enable: true,
              module_id: "devcloud2018.codeci_action_20018.action",
              version: null,
              properties: {
                image: "shell4.2.46-git1.8.3-zip6.00",
                buildVersion: "1.0.0",
                file: "codearts-mcp.tgz",
                name: "codearts-mcp",
                remainOriginPath: "FLAT",
                uploadTool: "curl",
                customUploadPath: "/prod/codearts-mcp",
                preCondition: "SUCCESS"
              }
            }
          ]
        }
      }
    ]);
  });
});
