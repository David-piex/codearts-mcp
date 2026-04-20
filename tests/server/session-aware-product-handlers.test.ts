import { describe, expect, it } from "vitest";
import {
  createSessionAwarePipelineListHandler,
  createSessionAwareReqProjectsHandler,
  createSessionAwareTestPlanListPlansHandler
} from "../../src/server/session-aware-product-handlers.js";

describe("session-aware product handlers module", () => {
  it("exports req, pipeline, and testplan handler factories", () => {
    expect(createSessionAwareReqProjectsHandler).toBeTypeOf("function");
    expect(createSessionAwarePipelineListHandler).toBeTypeOf("function");
    expect(createSessionAwareTestPlanListPlansHandler).toBeTypeOf("function");
  });
});
