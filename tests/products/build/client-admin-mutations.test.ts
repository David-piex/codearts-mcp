import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient admin mutations", () => {
  it("maps delete, keep-time, recycling, template, keystore, follow, and admin mutation endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const multipartRequests: Array<{ path: string; fileName?: string; privacy?: string | null; description?: string | null }> = [];
    const client = createBuildClient({
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "DELETE", path, body });

        if (path.includes("/recycling-deletion")) {
          return { status: "success" };
        }

        if (path.includes("/recycling-empty")) {
          return { status: "success" };
        }

        if (path.includes("/template/")) {
          return { status: "success" };
        }

        if (path.includes("/keystore/")) {
          return { status: "success" };
        }

        if (path.includes("/group/delete")) {
          return {
            status: "success",
            result: {
              project_id: "project-v3",
              job_id: "job-v3"
            }
          };
        }

        if (path.includes("/batch-delete")) {
          return {
            status: "success",
            result: {
              project_id: "project-v3",
              job_id: "job-v3"
            }
          };
        }

        return {
          status: "success",
          result: {
            project_id: "project-1",
            job_id: "job-1"
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });

        if (path.includes("/keep-time")) {
          return {
            status: "success",
            result: {
              keep_time: 29
            }
          };
        }

        if (path.includes("/recycling-restoration")) {
          return { status: "success" };
        }

        if (path.includes("/template/used-info")) {
          return { status: "success" };
        }

        if (path.includes("/check/webhook-url")) {
          return { status: "success" };
        }

        if (path.includes("/auto-execute")) {
          return { status: "success" };
        }

        if (path.includes("/group/move")) {
          return {
            status: "success",
            result: []
          };
        }

        if (path.includes("/group/swap")) {
          return { status: "success" };
        }

        if (path.includes("/batch-agency")) {
          return { status: "success" };
        }

        if (path.includes("/permissions/batch")) {
          return { status: "success" };
        }

        if (path.includes("/keystore/permission/add")) {
          return { status: "success" };
        }

        if (path.includes("/follow")) {
          return {
            status: "success",
            result: {
              favorite: true
            }
          };
        }

        if (path.includes("/delete")) {
          return {
            status: "success",
            result: {
              project_id: "project-v3",
              job_id: "job-v3"
            }
          };
        }

        return {
          status: "success",
          result: {
            favorite: false
          }
        };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });
        return { status: "success" };
      },
      postMultipart: async (path: string, body: FormData) => {
        multipartRequests.push({
          path,
          fileName: (body.get("file") as File | null)?.name,
          privacy: body.get("privacy") ? String(body.get("privacy")) : null,
          description: body.get("description") ? String(body.get("description")) : null
        });
        return { status: "success", result: { id: "key-new-1", name: "android.jks" } };
      }
    } as never);

    await expect(client.deleteJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      project_id: "project-1",
      status: "success"
    });
    await expect(client.setKeepTime({ keep_time: 29 })).resolves.toEqual({
      keep_time: 29,
      status: "success"
    });
    await expect(client.deleteRecyclingJobs({ job_ids: ["job-a", "job-b"] })).resolves.toEqual({
      job_ids: ["job-a", "job-b"],
      status: "success"
    });
    await expect(client.clearRecyclingJobs()).resolves.toEqual({
      status: "success"
    });
    await expect(client.restoreRecyclingJobs({ job_ids: ["job-c"] })).resolves.toEqual({
      job_ids: ["job-c"],
      status: "success"
    });
    await expect(client.followJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      favorite: true,
      status: "success"
    });
    await expect(client.unfollowJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      favorite: false,
      status: "success"
    });
    await expect(client.deleteTemplate({ uuid: "tpl-1" })).resolves.toEqual({
      uuid: "tpl-1",
      status: "success"
    });
    await expect(client.saveTemplateUsedInfo({
      job_id: "job-1",
      template_id: "tpl-1"
    })).resolves.toEqual({
      job_id: "job-1",
      template_id: "tpl-1",
      status: "success",
      result: undefined
    });
    await expect(client.followCustomTemplate({ uuid: "tpl-custom-1" })).resolves.toEqual({
      uuid: "tpl-custom-1",
      favorite: true,
      status: "success"
    });
    await expect(client.unfollowCustomTemplate({ uuid: "tpl-custom-1" })).resolves.toEqual({
      uuid: "tpl-custom-1",
      favorite: false,
      status: "success"
    });
    await expect(client.followOfficialTemplate({ uuid: "tpl-official-1" })).resolves.toEqual({
      uuid: "tpl-official-1",
      favorite: true,
      status: "success"
    });
    await expect(client.unfollowOfficialTemplate({ uuid: "tpl-official-1" })).resolves.toEqual({
      uuid: "tpl-official-1",
      favorite: false,
      status: "success"
    });
    await expect(client.deleteKeystore({ keystore_id: "key-1" })).resolves.toEqual({
      keystore_id: "key-1",
      status: "success"
    });
    await expect(client.deleteKeystorePermission({ permission_id: "perm-1" })).resolves.toEqual({
      permission_id: "perm-1",
      status: "success"
    });
    await expect(client.deleteJobV3({ job_id: "job-v3" })).resolves.toEqual({
      job_id: "job-v3",
      project_id: "project-v3",
      status: "success"
    });
    await expect(client.recoverJobV3({ job_id: "job-v3" })).resolves.toEqual({
      job_id: "job-v3",
      status: "success"
    });
    await expect(client.checkWebhookUrl({
      job_id: "job-2",
      notice_type: "DING_TALK",
      webhook_url: "https://oapi.example.com/hook"
    })).resolves.toEqual({
      job_id: "job-2",
      notice_type: "DING_TALK",
      webhook_url: "https://oapi.example.com/hook",
      status: "success",
      result: undefined
    });
    await expect(client.autoExecuteJob({
      job_id: "job-2",
      event_type: "push",
      ref: "refs/heads/main",
      after: "abc",
      before: "def"
    })).resolves.toEqual({
      job_id: "job-2",
      status: "success",
      result: undefined
    });
    await expect(client.batchUpdateJobPermissions({
      project_id: "project-1",
      job_ids: ["job-a", "job-b"],
      project_switch: true,
      permissions: [{ role_id: -1, is_view: true }]
    })).resolves.toEqual({
      project_id: "project-1",
      job_ids: ["job-a", "job-b"],
      status: "success"
    });
    await expect(client.batchDeleteJobs({ job_ids: ["job-a", "job-b"] })).resolves.toEqual({
      job_ids: ["job-a", "job-b"],
      project_id: "project-v3",
      deleted_job_id: "job-v3",
      status: "success"
    });
    await expect(client.batchSetAgency({
      job_ids: ["job-a", "job-b"],
      agency_urn: "iam::test:agency:build"
    })).resolves.toEqual({
      job_ids: ["job-a", "job-b"],
      agency_urn: "iam::test:agency:build",
      status: "success"
    });
    await expect(client.updateJobRolePermission({
      job_id: "job-2",
      role_id: "5",
      permission_name: "is_modify",
      permission_value: true
    })).resolves.toEqual({
      job_id: "job-2",
      role_id: "5",
      permission_name: "is_modify",
      permission_value: true,
      status: "success"
    });
    await expect(client.moveJobGroup({
      project_id: "project-1",
      group_id: "group-1",
      jobs: [{ job_id: "job-a", job_name: "Build-A" }]
    })).resolves.toEqual({
      project_id: "project-1",
      group_id: "group-1",
      jobs: [],
      status: "success"
    });
    await expect(client.deleteJobGroup({
      project_id: "project-1",
      id: "group-1"
    })).resolves.toEqual({
      project_id: "project-1",
      id: "group-1",
      status: "success",
      result: {
        project_id: "project-v3",
        job_id: "job-v3"
      }
    });
    await expect(client.swapJobGroup({
      project_id: "project-1",
      source_group_id: "group-a",
      target_group_id: "group-b"
    })).resolves.toEqual({
      project_id: "project-1",
      source_group_id: "group-a",
      target_group_id: "group-b",
      status: "success"
    });
    await expect(client.addKeystorePermission({
      keystore_id: "key-1",
      user_id: "user-1",
      user_name: "alice",
      setting: false,
      delete: false,
      modify: false,
      usage: false,
      can_absent: true
    })).resolves.toEqual({
      keystore_id: "key-1",
      user_id: "user-1",
      user_name: "alice",
      status: "success"
    });
    await expect(client.createJob({
      project_id: "project-1",
      job_name: "build-new",
      arch: "x86-64",
      auto_update_sub_module: true,
      flavor: "normal"
    })).resolves.toEqual({
      project_id: "project-1",
      job_name: "build-new",
      job_id: undefined,
      status: undefined,
      raw: { favorite: false }
    });
    await expect(client.copyJob({
      project_id: "project-1",
      copy_job_id: "job-src",
      job_name: "build-copy",
      arch: "x86-64"
    })).resolves.toEqual({
      project_id: "project-1",
      copy_job_id: "job-src",
      job_name: "build-copy",
      job_id: undefined,
      status: undefined,
      raw: { favorite: false }
    });
    await expect(client.updateJobNotice({
      job_id: "job-2",
      notice_type: "DING_TALK",
      enabled_event_type_names: ["buildJobSuccess", "buildJobFail"],
      webhook_url: "https://oapi.example.com/hook"
    })).resolves.toEqual({
      job_id: "job-2",
      status: "success",
      raw: { status: "success" }
    });
    await expect(client.createJobGroup({
      project_id: "project-1",
      name: "Group-A",
      parent_id: "parent-1"
    })).resolves.toEqual({
      project_id: "project-1",
      id: undefined,
      group_id: undefined,
      name: "Group-A",
      parent_id: "parent-1",
      status: "success",
      raw: { favorite: false }
    });
    await expect(client.uploadKeystore({
      file_name: "android.jks",
      file_content: new Uint8Array([1, 2, 3]),
      privacy: true,
      description: "android signing",
      content_type: "application/octet-stream"
    })).resolves.toEqual({
      file_name: "android.jks",
      privacy: true,
      description: "android signing",
      status: undefined,
      raw: { id: "key-new-1", name: "android.jks" }
    });

    expect(requests).toEqual([
      {
        method: "DELETE",
        path: "/v1/job/job-1/delete",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/keep-time",
        body: {
          keep_time: 29
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/recycling-deletion",
        body: {
          job_ids: ["job-a", "job-b"]
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/recycling-empty",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/recycling-restoration",
        body: {
          job_ids: ["job-c"]
        }
      },
      {
        method: "POST",
        path: "/v1/job/job-1/follow",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/job-1/unfollow",
        body: undefined
      },
      {
        method: "DELETE",
        path: "/v1/template/tpl-1/delete",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/template/used-info",
        body: {
          job_id: "job-1",
          template_id: "tpl-1"
        }
      },
      {
        method: "POST",
        path: "/v1/template/custom/tpl-custom-1/follow",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/template/custom/tpl-custom-1/unfollow",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/template/official/tpl-official-1/follow",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/template/official/tpl-official-1/unfollow",
        body: undefined
      },
      {
        method: "DELETE",
        path: "/v2/keystore/key-1/delete",
        body: undefined
      },
      {
        method: "DELETE",
        path: "/v2/keystore/permission/perm-1/delete",
        body: undefined
      },
      {
        method: "POST",
        path: "/v3/jobs/job-v3/delete",
        body: undefined
      },
      {
        method: "POST",
        path: "/v3/jobs/job-v3/recover",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/check/webhook-url",
        body: {
          job_id: "job-2",
          notice_type: "DING_TALK",
          webhook_url: "https://oapi.example.com/hook"
        }
      },
      {
        method: "POST",
        path: "/v1/job/job-2/auto-execute",
        body: {
          event_type: "push",
          ref: "refs/heads/main",
          after: "abc",
          before: "def"
        }
      },
      {
        method: "POST",
        path: "/v1/job/permissions/batch",
        body: {
          project_id: "project-1",
          job_ids: ["job-a", "job-b"],
          project_switch: true,
          permissions: [{ role_id: -1, is_view: true }]
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/batch-delete",
        body: {
          job_ids: ["job-a", "job-b"]
        }
      },
      {
        method: "POST",
        path: "/v1/job/batch-agency",
        body: {
          job_ids: ["job-a", "job-b"],
          agency_urn: "iam::test:agency:build"
        }
      },
      {
        method: "PUT",
        path: "/v1/job/role-permission",
        body: {
          job_id: "job-2",
          role_id: "5",
          permission_name: "is_modify",
          permission_value: true
        }
      },
      {
        method: "POST",
        path: "/v1/job/project-1/group/move",
        body: {
          group_id: "group-1",
          jobs: [{ job_id: "job-a", job_name: "Build-A" }]
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/project-1/group/delete?id=group-1",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/project-1/group/swap?source_group_id=group-a&target_group_id=group-b",
        body: undefined
      },
      {
        method: "POST",
        path: "/v2/keystore/permission/add",
        body: {
          keystore_id: "key-1",
          user_id: "user-1",
          user_name: "alice",
          setting: false,
          delete: false,
          modify: false,
          usage: false,
          can_absent: true
        }
      },
      {
        method: "POST",
        path: "/v1/job/create",
        body: {
          project_id: "project-1",
          job_name: "build-new",
          arch: "x86-64",
          auto_update_sub_module: "true",
          flavor: "normal"
        }
      },
      {
        method: "POST",
        path: "/v1/job/copy",
        body: {
          project_id: "project-1",
          copy_job_id: "job-src",
          job_name: "build-copy",
          arch: "x86-64"
        }
      },
      {
        method: "PUT",
        path: "/v1/job/job-2/notice",
        body: {
          notice_type: "DING_TALK",
          enabled_event_type_names: ["buildJobSuccess", "buildJobFail"],
          webhook_url: "https://oapi.example.com/hook"
        }
      },
      {
        method: "POST",
        path: "/v1/job/project-1/group/create",
        body: {
          project_id: "project-1",
          name: "Group-A",
          parent_id: "parent-1"
        }
      }
    ]);
    expect(multipartRequests).toEqual([
      {
        path: "/v2/keystore/upload",
        fileName: "android.jks",
        privacy: "true",
        description: "android signing"
      }
    ]);
  });
});
