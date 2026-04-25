import { describe, expect, it } from "vitest";
import { testPlanListCasesInput } from "../../../src/products/testplan/schemas.js";

describe("testplan schemas", () => {
  it("accepts list case filter fields and query overrides", () => {
    const parsed = testPlanListCasesInput.parse({
      project_id: "project-1",
      plan_id: "plan-1",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      query: {
        custom_field: "value",
        include_deleted: false,
        labels: ["core", "smoke"]
      }
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      plan_id: "plan-1",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      query: {
        custom_field: "value",
        include_deleted: false,
        labels: ["core", "smoke"]
      },
      page: 1,
      page_size: 20
    });
  });
});
