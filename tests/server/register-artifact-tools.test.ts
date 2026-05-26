import { describe, expect, it, vi } from "vitest";
import { registerArtifactTool } from "../../src/server/register-artifact-tools.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("registerArtifactTool", () => {
  it("registers a known artifact tool in stdio mode", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "artifact_list_repositories",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "artifact_list_repositories",
      expect.objectContaining({
        title: "artifact_list_repositories",
        description: "List CodeArts Artifact repositories"
      }),
      expect.any(Function)
    );
  });

  it("registers a known artifact tool in http mode", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "artifact_get_file",
      server: { registerTool },
      mode: "http",
      sessionStore: createSessionCredentialStore()
    });

    expect(handled).toBe(true);
    expect(registerTool).toHaveBeenCalledWith(
      "artifact_get_file",
      expect.objectContaining({
        title: "artifact_get_file",
        description: "Get CodeArts Artifact file detail"
      }),
      expect.any(Function)
    );
  });

  it("registers additional read-only artifact tools", () => {
    const registerTool = vi.fn();
    const tools = [
      ["artifact_show_auto_delete_job_settings", "Show CodeArts Artifact auto delete job settings"],
      ["artifact_get_repository_user_info", "Get CodeArts Artifact repository user info"],
      ["artifact_list_repository_users", "List CodeArts Artifact repository users"],
      ["artifact_list_project_role_permissions", "List CodeArts Artifact project role permissions"],
      ["artifact_list_storage_statistics", "List CodeArts Artifact storage statistics"],
      ["artifact_list_attentions", "List CodeArts Artifact attentions"],
      ["artifact_list_sec_guard_tasks", "List CodeArts Artifact security guard tasks"],
      ["artifact_show_open_source_enabled", "Show CodeArts Artifact open source enabled status"],
      ["artifact_search_by_checksum", "Search CodeArts Artifact artifacts by checksum"],
      ["artifact_list_maven_project_repositories", "List CodeArts Artifact Maven project repositories"],
      ["artifact_list_maven_repositories", "List CodeArts Artifact Maven repositories"],
      ["artifact_list_maven_repository_list", "List CodeArts Artifact Maven repository list records"],
      ["artifact_get_repository_detail", "Get CodeArts Artifact repository detail by project and repo"],
      ["artifact_list_project_release_files", "List CodeArts Artifact project release files"],
      ["artifact_list_release_files", "List CodeArts Artifact release files"],
      ["artifact_list_project_users", "List CodeArts Artifact project users"],
      ["artifact_list_domain_ip_configs", "List CodeArts Artifact domain IP configs"],
      ["artifact_show_repository_privileges", "Show CodeArts Artifact repository privileges"],
      ["artifact_show_user_privileges_v3", "Show CodeArts Artifact v3 user privileges"],
      ["artifact_get_repo_file_info_by_id", "Get CodeArts Artifact repository file info by id"],
      ["artifact_get_repo_file_info_by_name", "Get CodeArts Artifact repository file info by name"]
    ] as const;

    for (const [toolName, description] of tools) {
      const handled = registerArtifactTool({
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

  it("returns false for non-artifact tools", () => {
    const registerTool = vi.fn();

    const handled = registerArtifactTool({
      toolName: "deploy_list_apps",
      server: { registerTool },
      mode: "stdio",
      stdioClient: {} as never
    });

    expect(handled).toBe(false);
    expect(registerTool).not.toHaveBeenCalled();
  });
});
