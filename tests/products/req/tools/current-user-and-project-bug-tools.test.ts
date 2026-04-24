import { describe, expect, it, vi } from "vitest";
import {
  reqGetCurrentUserInfoInput as reqGetCurrentUserInfoInputFromBarrel,
  reqGetCurrentUserRoleInput as reqGetCurrentUserRoleInputFromBarrel,
  reqListProjectBugStatisticsInput as reqListProjectBugStatisticsInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqGetCurrentUserInfoInput,
  reqGetCurrentUserRoleInput,
  reqListProjectBugStatisticsInput
} from "../../../../src/products/req/schemas/user.js";
import {
  createReqGetCurrentUserInfoHandler,
  mapReqCurrentUserInfo
} from "../../../../src/products/req/tools/get-current-user-info.js";
import {
  createReqGetCurrentUserRoleHandler,
  mapReqCurrentUserRole
} from "../../../../src/products/req/tools/get-current-user-role.js";
import {
  createReqListProjectBugStatisticsHandler,
  mapReqProjectBugStatistics
} from "../../../../src/products/req/tools/list-project-bug-statistics.js";

describe("current user and project bug statistic schema exports", () => {
  it("keeps current user info schema exports compatible", () => {
    const input = {};

    expect(reqGetCurrentUserInfoInput.parse(input)).toEqual(input);
    expect(reqGetCurrentUserInfoInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps current user role schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetCurrentUserRoleInput.parse(input)).toEqual(input);
    expect(reqGetCurrentUserRoleInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps project bug statistic schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListProjectBugStatisticsInput.parse(input)).toEqual(input);
    expect(reqListProjectBugStatisticsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("mapReqCurrentUserInfo", () => {
  it("returns normalized current user info data", () => {
    const result = mapReqCurrentUserInfo({
      domain_id: "domain-1",
      domain_name: "tenant-a",
      user_num_id: 4060,
      user_id: "user-1",
      user_name: "demo_user_name",
      nick_name: "Tom",
      created_time: 1562318865000,
      updated_time: 1598074854000,
      gender: "male",
      user_type: "User"
    });

    expect(result.item).toEqual({
      domainId: "domain-1",
      domainName: "tenant-a",
      userNumId: 4060,
      userId: "user-1",
      userName: "demo_user_name",
      nickName: "Tom",
      createdTime: 1562318865000,
      updatedTime: 1598074854000,
      gender: "male",
      userType: "User"
    });
  });
});

describe("createReqGetCurrentUserInfoHandler", () => {
  it("returns normalized current user info output", async () => {
    const client = {
      getCurrentUserInfo: vi.fn(async () => ({
        domain_id: "domain-1",
        domain_name: "tenant-a",
        user_num_id: 4060,
        user_id: "user-1",
        user_name: "demo_user_name",
        nick_name: "Tom",
        created_time: 1562318865000,
        updated_time: 1598074854000,
        gender: "male",
        user_type: "User"
      }))
    };
    const handler = createReqGetCurrentUserInfoHandler(client);

    const result = await handler({});

    expect(client.getCurrentUserInfo).toHaveBeenCalledWith({});
    expect(result.content[0]?.text).toContain("Loaded current CodeArts Req user info");
    expect(result.structuredContent.item).toEqual(
      expect.objectContaining({
        userId: "user-1",
        nickName: "Tom"
      })
    );
  });
});

describe("mapReqCurrentUserRole", () => {
  it("returns normalized current user role data", () => {
    const result = mapReqCurrentUserRole({
      project_id: "project-1",
      user_role: 3
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      userRole: 3
    });
  });
});

describe("createReqGetCurrentUserRoleHandler", () => {
  it("returns normalized current user role output", async () => {
    const client = {
      getCurrentUserRole: vi.fn(async () => ({
        project_id: "project-1",
        user_role: 3
      }))
    };
    const handler = createReqGetCurrentUserRoleHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getCurrentUserRole).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded current user role for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      userRole: 3
    });
  });
});

describe("mapReqProjectBugStatistics", () => {
  it("returns normalized project bug statistic data", () => {
    const result = mapReqProjectBugStatistics({
      project_id: "project-1",
      bug_statistics: [
        {
          critical_num: 0,
          defect_index: 1,
          module: "统计分数",
          normal_num: 1,
          serious_num: 0,
          tip_num: 0,
          total: 1
        }
      ]
    });

    expect(result.items).toEqual([
      {
        module: "统计分数",
        total: 1,
        criticalNum: 0,
        seriousNum: 0,
        normalNum: 1,
        tipNum: 0,
        defectIndex: 1
      }
    ]);
  });
});

describe("createReqListProjectBugStatisticsHandler", () => {
  it("returns normalized project bug statistic output", async () => {
    const client = {
      listProjectBugStatistics: vi.fn(async () => ({
        project_id: "project-1",
        bug_statistics: [
          {
            critical_num: 0,
            defect_index: 1,
            module: "统计分数",
            normal_num: 1,
            serious_num: 0,
            tip_num: 0,
            total: 1
          }
        ]
      }))
    };
    const handler = createReqListProjectBugStatisticsHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listProjectBugStatistics).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("1 project bug statistics found");
    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        module: "统计分数",
        defectIndex: 1
      })
    ]);
  });
});
