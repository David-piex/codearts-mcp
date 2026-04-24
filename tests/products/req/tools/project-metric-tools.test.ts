import { describe, expect, it, vi } from "vitest";
import {
  reqGetProjectBugsPerDeveloperInput as reqGetProjectBugsPerDeveloperInputFromBarrel,
  reqGetProjectCompletionRateInput as reqGetProjectCompletionRateInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqGetProjectBugsPerDeveloperInput,
  reqGetProjectCompletionRateInput
} from "../../../../src/products/req/schemas/project.js";
import {
  createReqGetProjectBugsPerDeveloperHandler,
  mapReqProjectBugsPerDeveloper
} from "../../../../src/products/req/tools/get-project-bugs-per-developer.js";
import {
  createReqGetProjectCompletionRateHandler,
  mapReqProjectCompletionRate
} from "../../../../src/products/req/tools/get-project-completion-rate.js";

describe("project metric schema exports", () => {
  it("keeps bugs per developer schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetProjectBugsPerDeveloperInput.parse(input)).toEqual(input);
    expect(reqGetProjectBugsPerDeveloperInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps completion rate schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      sprint_id: "8883443",
      metric_type: "on-time_completion_rate",
      dividend: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      },
      divisor: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      }
    };

    expect(reqGetProjectCompletionRateInput.parse(input)).toEqual(input);
    expect(reqGetProjectCompletionRateInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("mapReqProjectBugsPerDeveloper", () => {
  it("returns normalized bugs per developer data", () => {
    const result = mapReqProjectBugsPerDeveloper({
      project_id: "project-1",
      project_name: "Payments",
      metric_value: "2.0",
      metric_name: "bugs_per_developer",
      dividend_value: "2",
      divisor_value: "1"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: "2.0",
      metricName: "bugs_per_developer",
      dividendValue: "2",
      divisorValue: "1"
    });
  });
});

describe("createReqGetProjectBugsPerDeveloperHandler", () => {
  it("returns normalized bugs per developer output", async () => {
    const client = {
      getProjectBugsPerDeveloper: vi.fn(async () => ({
        project_id: "project-1",
        project_name: "Payments",
        metric_value: "2.0",
        metric_name: "bugs_per_developer",
        dividend_value: "2",
        divisor_value: "1"
      }))
    };
    const handler = createReqGetProjectBugsPerDeveloperHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getProjectBugsPerDeveloper).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded bugs per developer metric for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: "2.0",
      metricName: "bugs_per_developer",
      dividendValue: "2",
      divisorValue: "1"
    });
  });
});

describe("mapReqProjectCompletionRate", () => {
  it("returns normalized completion rate data", () => {
    const result = mapReqProjectCompletionRate({
      project_id: "project-1",
      project_name: "Payments",
      metric_value: 0.8945,
      metric_name: "completion_rate",
      dividend_value: 15,
      divisor_value: 20
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: 0.8945,
      metricName: "completion_rate",
      dividendValue: 15,
      divisorValue: 20
    });
  });
});

describe("createReqGetProjectCompletionRateHandler", () => {
  it("returns normalized completion rate output", async () => {
    const client = {
      getProjectCompletionRate: vi.fn(async () => ({
        project_id: "project-1",
        project_name: "Payments",
        metric_value: 0.8945,
        metric_name: "completion_rate",
        dividend_value: 15,
        divisor_value: 20
      }))
    };
    const handler = createReqGetProjectCompletionRateHandler(client);

    const result = await handler({
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      sprint_id: "8883443",
      metric_type: "on-time_completion_rate",
      dividend: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      },
      divisor: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      }
    });

    expect(client.getProjectCompletionRate).toHaveBeenCalledWith({
      project_id: "project-1",
      date_range: "1598457600000,1598544000000",
      sprint_id: "8883443",
      metric_type: "on-time_completion_rate",
      dividend: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      },
      divisor: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      }
    });
    expect(result.content[0]?.text).toContain("Loaded completion rate metric for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      projectName: "Payments",
      metricValue: 0.8945,
      metricName: "completion_rate",
      dividendValue: 15,
      divisorValue: 20
    });
  });
});
