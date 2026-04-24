import { describe, expect, it, vi } from "vitest";
import {
  reqGetProjectBugDensityInput as reqGetProjectBugDensityInputFromBarrel,
  reqListProjectWorkHourTypesInput as reqListProjectWorkHourTypesInputFromBarrel,
  reqCheckWorkItemStatusNameInput as reqCheckWorkItemStatusNameInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqGetProjectBugDensityInput
} from "../../../../src/products/req/schemas/project.js";
import {
  reqCheckWorkItemStatusNameInput,
  reqListProjectWorkHourTypesInput
} from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetProjectBugDensityHandler,
  mapReqProjectBugDensity
} from "../../../../src/products/req/tools/get-project-bug-density.js";
import {
  createReqListProjectWorkHourTypesHandler,
  mapReqProjectWorkHourTypes
} from "../../../../src/products/req/tools/list-project-work-hour-types.js";
import {
  createReqCheckWorkItemStatusNameHandler,
  mapCheckedWorkItemStatusName
} from "../../../../src/products/req/tools/check-work-item-status-name.js";

describe("project support schema exports", () => {
  it("keeps bug density schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      metric_type: "bug_density",
      dividend: {
        custom_fields: [
          {
            name: "severity",
            options: "high,medium"
          }
        ]
      },
      divisor: {
        custom_fields: [
          {
            name: "module",
            options: "billing"
          }
        ]
      }
    };

    expect(reqGetProjectBugDensityInput.parse(input)).toEqual(input);
    expect(reqGetProjectBugDensityInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps project work hour type schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      page: 2,
      page_size: 10,
      status: 1
    };

    expect(reqListProjectWorkHourTypesInput.parse(input)).toEqual(input);
    expect(reqListProjectWorkHourTypesInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps work item status name check schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      status_name: "In Review"
    };

    expect(reqCheckWorkItemStatusNameInput.parse(input)).toEqual(input);
    expect(reqCheckWorkItemStatusNameInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("mapReqProjectBugDensity", () => {
  it("returns normalized project bug density data", () => {
    const result = mapReqProjectBugDensity({
      project_id: "project-1",
      project_name: "Payments",
      metric_value: "0.45",
      metric_name: "bug_density",
      dividend_value: "9",
      divisor_value: "20"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: "0.45",
      metricName: "bug_density",
      dividendValue: "9",
      divisorValue: "20"
    });
  });
});

describe("createReqGetProjectBugDensityHandler", () => {
  it("returns normalized project bug density output", async () => {
    const client = {
      getProjectBugDensity: vi.fn(async () => ({
        project_id: "project-1",
        project_name: "Payments",
        metric_value: "0.45",
        metric_name: "bug_density",
        dividend_value: "9",
        divisor_value: "20"
      }))
    };
    const handler = createReqGetProjectBugDensityHandler(client);

    const result = await handler({
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      metric_type: "bug_density",
      dividend: {
        custom_fields: [
          {
            name: "severity",
            options: "high,medium"
          }
        ]
      },
      divisor: {
        custom_fields: [
          {
            name: "module",
            options: "billing"
          }
        ]
      }
    });

    expect(client.getProjectBugDensity).toHaveBeenCalledWith({
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      metric_type: "bug_density",
      dividend: {
        custom_fields: [
          {
            name: "severity",
            options: "high,medium"
          }
        ]
      },
      divisor: {
        custom_fields: [
          {
            name: "module",
            options: "billing"
          }
        ]
      }
    });
    expect(result.content[0]?.text).toContain("Loaded bug density metric for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: "0.45",
      metricName: "bug_density",
      dividendValue: "9",
      divisorValue: "20"
    });
  });
});

describe("mapReqProjectWorkHourTypes", () => {
  it("returns normalized project work hour type data", () => {
    const result = mapReqProjectWorkHourTypes(
      [
        {
          id: 21,
          name: "研发设计",
          status: 1
        },
        {
          id: 22,
          name: "后端开发",
          status: 2
        }
      ],
      2,
      10,
      2
    );

    expect(result.items).toEqual([
      {
        id: 21,
        name: "研发设计",
        status: 1
      },
      {
        id: 22,
        name: "后端开发",
        status: 2
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 2
    });
  });
});

describe("createReqListProjectWorkHourTypesHandler", () => {
  it("returns normalized project work hour type output", async () => {
    const client = {
      listProjectWorkHourTypes: vi.fn(async () => ({
        total: 2,
        work_hours_types: [
          {
            id: 21,
            name: "研发设计",
            status: 1
          },
          {
            id: 22,
            name: "后端开发",
            status: 1
          }
        ]
      }))
    };
    const handler = createReqListProjectWorkHourTypesHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      status: 1
    });

    expect(client.listProjectWorkHourTypes).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      status: 1
    });
    expect(result.content[0]?.text).toContain("2 project work hour types found");
    expect(result.structuredContent.items).toEqual([
      {
        id: 21,
        name: "研发设计",
        status: 1
      },
      {
        id: 22,
        name: "后端开发",
        status: 1
      }
    ]);
  });
});

describe("mapCheckedWorkItemStatusName", () => {
  it("returns normalized work item status name check result", () => {
    const result = mapCheckedWorkItemStatusName({
      project_id: "project-1",
      status_name: "In Review",
      exist: false
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      statusName: "In Review",
      exists: false,
      available: true
    });
  });
});

describe("createReqCheckWorkItemStatusNameHandler", () => {
  it("returns normalized work item status name check output", async () => {
    const client = {
      checkWorkItemStatusName: vi.fn(async () => ({
        exist: false
      }))
    };
    const handler = createReqCheckWorkItemStatusNameHandler(client);

    const result = await handler({
      project_id: "project-1",
      status_name: "In Review"
    });

    expect(client.checkWorkItemStatusName).toHaveBeenCalledWith({
      project_id: "project-1",
      status_name: "In Review"
    });
    expect(result.content[0]?.text).toContain("Work item status name In Review is available");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      statusName: "In Review",
      exists: false,
      available: true
    });
  });
});
