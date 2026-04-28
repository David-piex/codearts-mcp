import { describe, expect, it } from "vitest";
import {
  createReqClientSlices,
  resolveReqClientResourceGroup,
  type ReqClient
} from "../../../src/products/req/client.js";

describe("Req client resource slices", () => {
  it.each([
    ["createProject", "project"],
    ["listProjectMembers", "member"],
    ["listIterations", "iteration"],
    ["createPlanWorkItem", "plan"],
    ["getWorkItem", "work-item"],
    ["listWorkItemStatusConfigs", "config"],
    ["listIpdIssues", "ipd"],
    ["uploadIpdIssueAttachment", "attachment"],
    ["createIpdWorkHour", "work-hour"]
  ] as const)("maps %s to the %s slice", (methodName, expectedGroup) => {
    expect(resolveReqClientResourceGroup(methodName)).toBe(expectedGroup);
  });

  it("creates resource slices without changing method references", () => {
    const createProject = async () => ({ project_id: "project-1", project_name: "Demo" });
    const listProjectMembers = async () => ({ members: [], total: 0 });
    const createIpdWorkHour = async () => ({
      id: "work-hour-1",
      issue_id: "issue-1",
      user_id: "user-1",
      work_hours: 1
    });
    const client = {
      createProject,
      listProjectMembers,
      createIpdWorkHour
    } as unknown as ReqClient;

    const slices = createReqClientSlices(client);

    expect(slices.project.createProject).toBe(createProject);
    expect(slices.member.listProjectMembers).toBe(listProjectMembers);
    expect(slices["work-hour"].createIpdWorkHour).toBe(createIpdWorkHour);
  });
});

