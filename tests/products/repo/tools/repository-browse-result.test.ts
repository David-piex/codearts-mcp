import { describe, expect, it } from "vitest";
import {
  mapCommitAssociatedRefs,
  mapDefaultReviewCategories,
  mapNoteRequiredAttributes,
  mapRepositoryFileList,
  mapRepositoryReadmeFile,
  mapRepositoryReviewAuthors,
  mapRepositoryReviews,
  mapRepositoryTrees,
  mapReviewSetting
} from "../../../../src/products/repo/tools/repository-browse-result.js";

describe("repository browse result mappers", () => {
  it("maps repository tree and file list reads", () => {
    const trees = mapRepositoryTrees(
      [{ id: "1", name: "src", type: "tree", path: "src", mode: "040000", submodule_branch: "main" }],
      2,
      10,
      11
    ).items ?? [];
    expect(trees[0]).toMatchObject({
      id: "1",
      name: "src",
      type: "tree",
      path: "src",
      mode: "040000",
      submoduleBranch: "main"
    });

    const files = mapRepositoryFileList(["src/index.ts"], 1, 20, 1).items ?? [];
    expect(files[0]).toEqual({
      id: "src/index.ts",
      path: "src/index.ts"
    });
  });

  it("maps README and commit associated refs", () => {
    expect(
      mapRepositoryReadmeFile({
        blob_id: "blob-1",
        content: "IyBEZW1v",
        encoding: "base64",
        file_name: "README.md",
        file_path: "README.md",
        file_type: "markdown",
        size: 6
      }).item
    ).toMatchObject({
      blobId: "blob-1",
      fileName: "README.md",
      encoding: "base64"
    });

    const refs = mapCommitAssociatedRefs(["master"], 1, 20, 1).items ?? [];
    expect(refs[0]).toEqual({
      id: "master",
      name: "master"
    });
  });

  it("maps repository review settings and category trees", () => {
    const setting = mapReviewSetting({
      categories_and_modules_enabled: true,
      secondary_category_enabled: true,
      primary_categories: [
        {
          key: "code_style",
          name_zh: "Code Style ZH",
          name_en: "Code Style",
          sub_categories: [{ key: "format", name_zh: "Format ZH", name_en: "Format" }]
        }
      ],
      review_modules: [{ key: "security", name_zh: "Security ZH", name_en: "Security" }],
      note_required_attributes: [{ name: "Severity", is_required: true }]
    });

    expect(setting.item).toMatchObject({
      categoriesAndModulesEnabled: true,
      secondaryCategoryEnabled: true,
      primaryCategories: [
        {
          key: "code_style",
          subCategories: [{ key: "format" }]
        }
      ],
      reviewModules: [{ key: "security" }],
      noteRequiredAttributes: [{ name: "Severity", required: true }]
    });
  });

  it("maps note attributes and default review categories", () => {
    expect(
      mapNoteRequiredAttributes({
        note_required_attributes: [{ name: "Body", is_required: true }]
      }).items
    ).toEqual([{ name: "Body", required: true }]);

    expect(
      mapDefaultReviewCategories({
        codehub_default_categories: [{ key: "code_style", name_en: "Code Style" }],
        hicode_default_categories: [{ key: "security", name_en: "Security" }]
      }).item
    ).toMatchObject({
      codehubDefaultCategories: [{ key: "code_style" }],
      hicodeDefaultCategories: [{ key: "security" }]
    });
  });

  it("maps repository reviews and review authors", () => {
    const reviews = mapRepositoryReviews(
      [
        {
          id: 1399939,
          body: "test",
          noteable_type: "MergeRequest",
          discussion_id: "discussion-1",
          repository_id: 100,
          severity: "suggestion",
          author: { id: 9124, name: "dev", username: "readyrunning" },
          position: { new_path: "README.md", new_line: 1 }
        }
      ],
      1,
      20,
      1
    ).items ?? [];

    expect(reviews[0]).toMatchObject({
      id: "1399939",
      body: "test",
      noteableType: "MergeRequest",
      discussionId: "discussion-1",
      repositoryId: "100",
      severity: "suggestion",
      author: { id: "9124", username: "readyrunning" },
      position: { newPath: "README.md", newLine: 1 }
    });

    const authors = mapRepositoryReviewAuthors(
      [{ id: 9124, name: "dev", username: "readyrunning", state: "active" }],
      1,
      20,
      1
    ).items ?? [];

    expect(authors[0]).toMatchObject({
      id: "9124",
      name: "dev",
      username: "readyrunning",
      state: "active"
    });
  });
});
