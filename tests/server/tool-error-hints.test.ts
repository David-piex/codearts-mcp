import { describe, expect, it } from "vitest";
import { AppError } from "../../src/core/errors/app-error.js";
import { formatToolErrorMessage } from "../../src/server/tool-error-hints.js";

describe("formatToolErrorMessage", () => {
  it("adds a project-access hint for repo permission failures", () => {
    const message = formatToolErrorMessage(
      "repo_list_repositories",
      new AppError("auth_error", "Insufficient permissions. Apply for the required permission and try again.", undefined, undefined, 403)
    );

    expect(message).toContain("Insufficient permissions.");
    expect(message).toContain("Check that `project_id` belongs to a project where the current account can access CodeArts Repo");
  });

  it("adds a build-specific project permission hint", () => {
    const message = formatToolErrorMessage(
      "build_list_jobs",
      new AppError("provider_error", "用户[readyrunning]项目权限不足，请加入当前项目并授予权限", undefined, undefined, 422)
    );

    expect(message).toContain("项目权限不足");
    expect(message).toContain("Build");
    expect(message).toContain("加入当前项目");
  });

  it("adds a service-enable hint for testplan unsupported projects", () => {
    const message = formatToolErrorMessage(
      "testplan_list_plans",
      new AppError("provider_error", "您当前使用项目暂不支持测试服务.", undefined, undefined, 400)
    );

    expect(message).toContain("暂不支持测试服务");
    expect(message).toContain("TestPlan service enabled");
  });

  it("keeps generic provider failures unchanged when no hint applies", () => {
    const message = formatToolErrorMessage(
      "pipeline_get_run",
      new AppError("provider_error", "demo boom", undefined, undefined, 500)
    );

    expect(message).toBe("demo boom");
  });

  it("adds a member-role hint for check permission failures", () => {
    const message = formatToolErrorMessage(
      "check_list_tasks",
      new AppError(
        "provider_error",
        "service internal error: service_error_code is: CC.10010226.403, service_error_msg is: 操作权限不足,请在项目内的设置-成员管理确认成员角色。",
        undefined,
        undefined,
        400
      )
    );

    expect(message).toContain("操作权限不足");
    expect(message).toContain("成员管理");
    expect(message).toContain("CodeArts Check");
  });

  it("adds a project-id hint for deploy project-not-found failures", () => {
    const message = formatToolErrorMessage(
      "deploy_list_apps",
      new AppError("provider_error", "项目不存在", undefined, undefined, 400)
    );

    expect(message).toContain("项目不存在");
    expect(message).toContain("Confirm `project_id`");
    expect(message).toContain("Deploy");
  });

  it("adds a project-permission hint for artifact access failures", () => {
    const message = formatToolErrorMessage(
      "artifact_list_versions",
      new AppError("provider_error", "DEV.CR.4102：当前用户没有该项目权限", undefined, undefined, 400)
    );

    expect(message).toContain("当前用户没有该项目权限");
    expect(message).toContain("CodeArts Artifact");
    expect(message).toContain("project membership");
  });
});
