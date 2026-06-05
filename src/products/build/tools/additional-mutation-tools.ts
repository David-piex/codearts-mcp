import { asItemResult } from "../../../contracts/tool-result.js";
import {
  buildClearRecyclingJobsInput,
  buildDeleteJobInput,
  buildDeleteRecyclingJobsInput,
  buildFollowJobInput,
  buildRestoreRecyclingJobsInput,
  buildSetKeepTimeInput,
  buildUnfollowJobInput
} from "../schemas.js";

export function createBuildDeleteJobHandler(client: {
  deleteJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    project_id?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteJobInput.parse(input);
    const preview = asItemResult(`Dry run: delete build job ${parsed.job_id}`, {
      id: parsed.job_id,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteJob({ job_id: parsed.job_id });
    const result = asItemResult(`Deleted build job ${response.job_id}`, {
      id: response.job_id,
      projectId: response.project_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildSetKeepTimeHandler(client: {
  setKeepTime: (input: { keep_time: number }) => Promise<{
    keep_time: number;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildSetKeepTimeInput.parse(input);
    const preview = asItemResult(`Dry run: set Build recycling keep time to ${parsed.keep_time} day(s)`, {
      keepTime: parsed.keep_time,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.setKeepTime({ keep_time: parsed.keep_time });
    const result = asItemResult(`Set Build recycling keep time to ${response.keep_time} day(s)`, {
      keepTime: response.keep_time,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildDeleteRecyclingJobsHandler(client: {
  deleteRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildDeleteRecyclingJobsInput.parse(input);
    const preview = asItemResult(`Dry run: permanently delete ${parsed.job_ids.length} Build recycling job(s)`, {
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.deleteRecyclingJobs({ job_ids: parsed.job_ids });
    const result = asItemResult(`Deleted ${response.job_ids.length} Build recycling job(s)`, {
      jobIds: response.job_ids,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildClearRecyclingJobsHandler(client: {
  clearRecyclingJobs: () => Promise<{
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildClearRecyclingJobsInput.parse(input);
    const preview = asItemResult("Dry run: clear all Build recycling jobs", {
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.clearRecyclingJobs();
    const result = asItemResult("Cleared all Build recycling jobs", {
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildRestoreRecyclingJobsHandler(client: {
  restoreRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildRestoreRecyclingJobsInput.parse(input);
    const preview = asItemResult(`Dry run: restore ${parsed.job_ids.length} Build recycling job(s)`, {
      jobIds: parsed.job_ids,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.restoreRecyclingJobs({ job_ids: parsed.job_ids });
    const result = asItemResult(`Restored ${response.job_ids.length} Build recycling job(s)`, {
      jobIds: response.job_ids,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildFollowJobHandler(client: {
  followJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildFollowJobInput.parse(input);
    const preview = asItemResult(`Dry run: follow build job ${parsed.job_id}`, {
      id: parsed.job_id,
      favorite: true,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.followJob({ job_id: parsed.job_id });
    const result = asItemResult(`Followed build job ${response.job_id}`, {
      id: response.job_id,
      favorite: response.favorite,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createBuildUnfollowJobHandler(client: {
  unfollowJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = buildUnfollowJobInput.parse(input);
    const preview = asItemResult(`Dry run: unfollow build job ${parsed.job_id}`, {
      id: parsed.job_id,
      favorite: false,
      executed: !parsed.dry_run
    });

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: preview.summary }],
        structuredContent: preview
      };
    }

    const response = await client.unfollowJob({ job_id: parsed.job_id });
    const result = asItemResult(`Unfollowed build job ${response.job_id}`, {
      id: response.job_id,
      favorite: response.favorite,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
