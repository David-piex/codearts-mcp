import { describe, expect, it } from "vitest";
import {
  createTestPlanCreateDefectAssociationHandler,
  createTestPlanDeleteDefectAssociationHandler,
  createTestPlanUpdateDefectAssociationHandler
} from "../../../../src/products/testplan/tools/defect-association.js";

describe("testplan defect association handlers", () => {
  it("returns dry-run preview for create", async () => {
    const handler = createTestPlanCreateDefectAssociationHandler({
      createDefectAssociation: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      defect_id: "defect-1",
      iterator_uri: "iter-1"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "defect-1",
      iteratorUri: "iter-1",
      executed: false
    });
  });

  it("executes create when dry_run is false", async () => {
    const handler = createTestPlanCreateDefectAssociationHandler({
      createDefectAssociation: async (input) => ({
        project_id: input.project_id,
        defect_id: input.defect_id,
        iterator_uri: input.iterator_uri,
        status: "success",
        value: true,
        raw: { status: "success", value: true }
      })
    });

    const result = await handler({
      project_id: "project-1",
      defect_id: "defect-1",
      iterator_uri: "iter-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "defect-1",
      status: "success",
      value: true,
      executed: true
    });
  });

  it("returns dry-run preview for update and delete", async () => {
    const updateHandler = createTestPlanUpdateDefectAssociationHandler({
      updateDefectAssociation: async () => {
        throw new Error("should not execute");
      }
    });
    const deleteHandler = createTestPlanDeleteDefectAssociationHandler({
      deleteDefectAssociation: async () => {
        throw new Error("should not execute");
      }
    });

    const updateResult = await updateHandler({
      project_id: "project-1",
      defect_id: "defect-1",
      old_iterator_uri: "iter-1",
      new_iterator_uri: "iter-2"
    });
    const deleteResult = await deleteHandler({
      project_id: "project-1",
      defect_id: "defect-1",
      iterator_uri: "iter-2"
    });

    expect(updateResult.structuredContent.item).toMatchObject({
      id: "defect-1",
      oldIteratorUri: "iter-1",
      newIteratorUri: "iter-2",
      executed: false
    });
    expect(deleteResult.structuredContent.item).toMatchObject({
      id: "defect-1",
      iteratorUri: "iter-2",
      executed: false
    });
  });
});
