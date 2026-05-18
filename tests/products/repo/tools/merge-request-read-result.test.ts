import { describe, expect, it } from "vitest";
import {
  mapMergeRequestCommits,
  mapMergeRequestStatistics,
  mapMergeRequestVotes
} from "../../../../src/products/repo/tools/merge-request-read-result.js";

describe("merge request read result mappers", () => {
  it("maps merge request commits", () => {
    const result = mapMergeRequestCommits(
      [
        {
          id: "abc123",
          short_id: "abc123",
          title: "Add feature",
          author_name: "Dev",
          committed_date: "2026-05-18T01:00:00Z",
          verification_status: "verified",
          parent_ids: ["parent1"]
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "abc123",
      shortId: "abc123",
      title: "Add feature",
      authorName: "Dev",
      committedDate: "2026-05-18T01:00:00Z",
      verificationStatus: "verified",
      parentIds: ["parent1"]
    });
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps merge request votes", () => {
    const result = mapMergeRequestVotes({
      scores: 2,
      merge_request_id: 7,
      merge_request_creator: "creator",
      votes: [
        {
          id: 1,
          score: 2,
          author_name: "Reviewer",
          author_username: "reviewer",
          author_id: 9
        }
      ]
    });

    expect(result.item).toMatchObject({
      scores: 2,
      mergeRequestId: "7",
      mergeRequestCreator: "creator",
      votes: [
        {
          id: "1",
          score: 2,
          authorName: "Reviewer",
          authorUsername: "reviewer",
          authorId: "9"
        }
      ]
    });
  });

  it("maps merge request statistics", () => {
    const result = mapMergeRequestStatistics(
      [
        {
          id: 7,
          iid: 3,
          title: "MR",
          state: "opened",
          commits_count: 4,
          changed_files_count: 5,
          notes_count: 6,
          changed_lines_count: 7,
          votes: 1
        }
      ],
      1,
      1,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "7",
      iid: "3",
      title: "MR",
      state: "opened",
      commitsCount: 4,
      changedFilesCount: 5,
      notesCount: 6,
      changedLinesCount: 7,
      votes: 1
    });
  });
});
