import { describe, expect, it, vi } from "vitest";
import {
  reqCancelProjectDomainInput as reqCancelProjectDomainInputFromBarrel,
  reqCreateProjectDomainInput as reqCreateProjectDomainInputFromBarrel,
  reqUpdateProjectDomainInput as reqUpdateProjectDomainInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqCancelProjectDomainInput,
  reqCreateProjectDomainInput,
  reqUpdateProjectDomainInput
} from "../../../../src/products/req/schemas/project.js";
import {
  createReqCancelProjectDomainHandler,
  previewCancelProjectDomain
} from "../../../../src/products/req/tools/cancel-project-domain.js";
import {
  createReqCreateProjectDomainHandler,
  mapCreatedProjectDomain,
  previewCreateProjectDomain
} from "../../../../src/products/req/tools/create-project-domain.js";
import {
  createReqUpdateProjectDomainHandler,
  mapUpdatedProjectDomain,
  previewUpdateProjectDomain
} from "../../../../src/products/req/tools/update-project-domain.js";

describe("project domain write input exports", () => {
  it("keeps the barrel exports compatible with the project schema module", () => {
    const createInput = {
      project_id: "project-1",
      domain_name: "性能"
    };
    const updateInput = {
      ...createInput,
      domain_id: "domain-1"
    };
    const cancelInput = {
      project_id: "project-1",
      domain_id: "domain-1"
    };

    expect(reqCreateProjectDomainInput.parse(createInput)).toEqual({
      ...createInput,
      dry_run: true
    });
    expect(reqCreateProjectDomainInputFromBarrel.parse(createInput)).toEqual({
      ...createInput,
      dry_run: true
    });
    expect(reqUpdateProjectDomainInput.parse(updateInput)).toEqual({
      ...updateInput,
      dry_run: true
    });
    expect(reqUpdateProjectDomainInputFromBarrel.parse(updateInput)).toEqual({
      ...updateInput,
      dry_run: true
    });
    expect(reqCancelProjectDomainInput.parse(cancelInput)).toEqual({
      ...cancelInput,
      dry_run: true
    });
    expect(reqCancelProjectDomainInputFromBarrel.parse(cancelInput)).toEqual({
      ...cancelInput,
      dry_run: true
    });
  });
});

describe("project domain write previews", () => {
  it("previews create, update, and cancel without execution", () => {
    expect(
      previewCreateProjectDomain({
        project_id: "project-1",
        domain_name: "性能",
        dry_run: true
      }).item
    ).toEqual({
      projectId: "project-1",
      name: "性能",
      executed: false
    });

    expect(
      previewUpdateProjectDomain({
        project_id: "project-1",
        domain_id: "domain-1",
        domain_name: "质量",
        dry_run: true
      }).item
    ).toEqual({
      projectId: "project-1",
      id: "domain-1",
      name: "质量",
      executed: false
    });

    expect(
      previewCancelProjectDomain({
        project_id: "project-1",
        domain_id: "domain-1",
        dry_run: true
      }).item
    ).toEqual({
      id: "domain-1",
      projectId: "project-1",
      cancelled: false,
      executed: false
    });
  });
});

describe("project domain response mappers", () => {
  it("maps created and updated project domains", () => {
    expect(
      mapCreatedProjectDomain({
        domain_id: "domain-1",
        domain_name: "性能"
      }).item
    ).toEqual({
      id: "domain-1",
      name: "性能",
      executed: true
    });

    expect(
      mapUpdatedProjectDomain({
        domain_id: "domain-1",
        domain_name: "质量"
      }).item
    ).toEqual({
      id: "domain-1",
      name: "质量",
      executed: true
    });
  });
});

describe("project domain write handlers", () => {
  it("short-circuits dry-run create, update, and cancel calls", async () => {
    const createClient = { createProjectDomain: vi.fn() };
    const updateClient = { updateProjectDomain: vi.fn() };
    const cancelClient = { cancelProjectDomain: vi.fn() };

    const createResult = await createReqCreateProjectDomainHandler(createClient)({
      project_id: "project-1",
      domain_name: "性能"
    });
    const updateResult = await createReqUpdateProjectDomainHandler(updateClient)({
      project_id: "project-1",
      domain_id: "domain-1",
      domain_name: "质量"
    });
    const cancelResult = await createReqCancelProjectDomainHandler(cancelClient)({
      project_id: "project-1",
      domain_id: "domain-1"
    });

    expect(createClient.createProjectDomain).not.toHaveBeenCalled();
    expect(updateClient.updateProjectDomain).not.toHaveBeenCalled();
    expect(cancelClient.cancelProjectDomain).not.toHaveBeenCalled();
    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(updateResult.structuredContent.item?.executed).toBe(false);
    expect(cancelResult.structuredContent.item?.executed).toBe(false);
  });

  it("executes create, update, and cancel when dry_run is false", async () => {
    const createClient = {
      createProjectDomain: vi.fn(async () => ({
        domain_id: "domain-1",
        domain_name: "性能"
      }))
    };
    const updateClient = {
      updateProjectDomain: vi.fn(async () => ({
        domain_id: "domain-1",
        domain_name: "质量"
      }))
    };
    const cancelClient = {
      cancelProjectDomain: vi.fn(async () => ({
        project_id: "project-1",
        domain_id: "domain-1",
        cancelled: true as const
      }))
    };

    const createResult = await createReqCreateProjectDomainHandler(createClient)({
      project_id: "project-1",
      domain_name: "性能",
      dry_run: false
    });
    const updateResult = await createReqUpdateProjectDomainHandler(updateClient)({
      project_id: "project-1",
      domain_id: "domain-1",
      domain_name: "质量",
      dry_run: false
    });
    const cancelResult = await createReqCancelProjectDomainHandler(cancelClient)({
      project_id: "project-1",
      domain_id: "domain-1",
      dry_run: false
    });

    expect(createClient.createProjectDomain).toHaveBeenCalledWith({
      project_id: "project-1",
      domain_name: "性能",
      dry_run: false
    });
    expect(updateClient.updateProjectDomain).toHaveBeenCalledWith({
      project_id: "project-1",
      domain_id: "domain-1",
      domain_name: "质量",
      dry_run: false
    });
    expect(cancelClient.cancelProjectDomain).toHaveBeenCalledWith({
      project_id: "project-1",
      domain_id: "domain-1",
      dry_run: false
    });
    expect(createResult.structuredContent.item).toEqual({
      id: "domain-1",
      name: "性能",
      executed: true
    });
    expect(updateResult.structuredContent.item).toEqual({
      id: "domain-1",
      name: "质量",
      executed: true
    });
    expect(cancelResult.structuredContent.item).toEqual({
      id: "domain-1",
      projectId: "project-1",
      cancelled: true,
      executed: true
    });
  });
});
