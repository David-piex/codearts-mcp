import { describe, expect, it, vi } from "vitest";
import {
  reqDeleteProjectTemplateInput as reqDeleteProjectTemplateInputFromBarrel,
  reqListUserFeaturesInput as reqListUserFeaturesInputFromBarrel,
  reqUpdateProjectTemplateInput as reqUpdateProjectTemplateInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqDeleteProjectTemplateInput,
  reqListUserFeaturesInput,
  reqUpdateProjectTemplateInput
} from "../../../../src/products/req/schemas/project.js";
import {
  createReqListUserFeaturesHandler,
  mapReqUserFeatures
} from "../../../../src/products/req/tools/list-user-features.js";
import {
  createReqDeleteProjectTemplateHandler,
  mapDeletedProjectTemplate,
  previewDeleteProjectTemplate
} from "../../../../src/products/req/tools/delete-project-template.js";
import {
  createReqUpdateProjectTemplateHandler,
  mapUpdatedProjectTemplate,
  previewUpdateProjectTemplate
} from "../../../../src/products/req/tools/update-project-template.js";

describe("project template and feature schema exports", () => {
  it("keeps user feature schema exports compatible", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListUserFeaturesInput.parse(input)).toEqual(input);
    expect(reqListUserFeaturesInputFromBarrel.parse(input)).toEqual(input);
  });

  it("keeps delete project template schema exports compatible", () => {
    const input = {
      template_id: "1518"
    };

    expect(reqDeleteProjectTemplateInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteProjectTemplateInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("keeps update project template schema exports compatible", () => {
    const input = {
      template_id: "1538",
      name: "12344",
      description: ""
    };

    expect(reqUpdateProjectTemplateInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateProjectTemplateInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("mapReqUserFeatures", () => {
  it("returns normalized user feature data", () => {
    const result = mapReqUserFeatures({
      project_id: "project-1",
      features: [
        {
          key: "issue.associate-wiki",
          control: "show",
          enabled: true
        },
        {
          key: "issue.automation",
          control: "show"
        }
      ]
    });

    expect(result.items).toEqual([
      {
        key: "issue.associate-wiki",
        control: "show",
        enabled: true
      },
      {
        key: "issue.automation",
        control: "show"
      }
    ]);
    expect(result.raw).toEqual({
      project_id: "project-1",
      features: [
        {
          key: "issue.associate-wiki",
          control: "show",
          enabled: true
        },
        {
          key: "issue.automation",
          control: "show"
        }
      ]
    });
  });

  it("accepts result, data, and dictionary response shapes", () => {
    expect(
      mapReqUserFeatures({
        project_id: "project-1",
        result: [{ key: "from-result", control: "show" }]
      }).items
    ).toEqual([{ key: "from-result", control: "show" }]);

    expect(
      mapReqUserFeatures({
        project_id: "project-1",
        data: [{ key: "from-data", control: "hide" }]
      }).items
    ).toEqual([{ key: "from-data", control: "hide" }]);

    expect(
      mapReqUserFeatures({
        project_id: "project-1",
        associateWiki: { key: "issue.associate-wiki", control: "show" },
        automation: { key: "issue.automation", control: "hide" }
      }).items
    ).toEqual([
      { key: "issue.associate-wiki", control: "show" },
      { key: "issue.automation", control: "hide" }
    ]);
  });
});

describe("createReqListUserFeaturesHandler", () => {
  it("returns normalized user feature output", async () => {
    const client = {
      listUserFeatures: vi.fn(async () => ({
        project_id: "project-1",
        features: [
          {
            key: "issue.associate-wiki",
            control: "show"
          }
        ]
      }))
    };
    const handler = createReqListUserFeaturesHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listUserFeatures).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("1 user features found");
    expect(result.structuredContent.items).toEqual([
      {
        key: "issue.associate-wiki",
        control: "show"
      }
    ]);
  });
});

describe("previewDeleteProjectTemplate", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewDeleteProjectTemplate({
      template_id: "1518",
      dry_run: true
    });

    expect(result.item).toEqual({
      id: "1518",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedProjectTemplate", () => {
  it("returns normalized deleted project template data", () => {
    const result = mapDeletedProjectTemplate({
      id: 1518,
      name: "1233",
      sourceId: "381fcca9c056482d92da3e8b9da71db5",
      sourceName: "DevOps全流程示例项目xxxx",
      description: null,
      identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
      authorId: 233087,
      domainId: "073a9e220f000f620fb8c010f47a3f80",
      type: "scrum",
      isPublic: 1
    });

    expect(result.item).toEqual({
      id: "1518",
      name: "1233",
      sourceId: "381fcca9c056482d92da3e8b9da71db5",
      sourceName: "DevOps全流程示例项目xxxx",
      description: null,
      identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
      authorId: 233087,
      domainId: "073a9e220f000f620fb8c010f47a3f80",
      type: "scrum",
      isPublic: 1,
      deleted: true,
      executed: true
    });
  });
});

describe("createReqDeleteProjectTemplateHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteProjectTemplate: vi.fn()
    };
    const handler = createReqDeleteProjectTemplateHandler(client);

    const result = await handler({
      template_id: "1518",
      dry_run: true
    });

    expect(client.deleteProjectTemplate).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes deletes when dry_run is false", async () => {
    const client = {
      deleteProjectTemplate: vi.fn(async () => ({
        id: 1518,
        name: "1233",
        sourceId: "381fcca9c056482d92da3e8b9da71db5",
        sourceName: "DevOps全流程示例项目xxxx",
        description: null,
        identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
        authorId: 233087,
        domainId: "073a9e220f000f620fb8c010f47a3f80",
        type: "scrum",
        isPublic: 1
      }))
    };
    const handler = createReqDeleteProjectTemplateHandler(client);

    const result = await handler({
      template_id: "1518",
      dry_run: false
    });

    expect(client.deleteProjectTemplate).toHaveBeenCalledWith({
      template_id: "1518",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "1518",
      name: "1233",
      sourceId: "381fcca9c056482d92da3e8b9da71db5",
      sourceName: "DevOps全流程示例项目xxxx",
      description: null,
      identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
      authorId: 233087,
      domainId: "073a9e220f000f620fb8c010f47a3f80",
      type: "scrum",
      isPublic: 1,
      deleted: true,
      executed: true
    });
  });
});

describe("previewUpdateProjectTemplate", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateProjectTemplate({
      template_id: "1538",
      name: "12344",
      description: "",
      dry_run: true
    });

    expect(result.item).toEqual({
      id: "1538",
      name: "12344",
      description: "",
      executed: false
    });
  });
});

describe("mapUpdatedProjectTemplate", () => {
  it("returns normalized updated project template data", () => {
    const result = mapUpdatedProjectTemplate({
      id: 1538,
      name: "12344",
      type: null
    });

    expect(result.item).toEqual({
      id: "1538",
      name: "12344",
      type: null,
      executed: true
    });
  });
});

describe("createReqUpdateProjectTemplateHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateProjectTemplate: vi.fn()
    };
    const handler = createReqUpdateProjectTemplateHandler(client);

    const result = await handler({
      template_id: "1538",
      name: "12344",
      description: "",
      dry_run: true
    });

    expect(client.updateProjectTemplate).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updateProjectTemplate: vi.fn(async () => ({
        id: 1538,
        name: "12344",
        type: null
      }))
    };
    const handler = createReqUpdateProjectTemplateHandler(client);

    const result = await handler({
      template_id: "1538",
      name: "12344",
      description: "",
      dry_run: false
    });

    expect(client.updateProjectTemplate).toHaveBeenCalledWith({
      template_id: "1538",
      name: "12344",
      description: "",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "1538",
      name: "12344",
      type: null,
      executed: true
    });
  });
});
