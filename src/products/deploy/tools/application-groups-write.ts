import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import {
  deployCreateApplicationGroupInput,
  deployDeleteApplicationGroupInput,
  deployMoveApplicationGroupInput,
  deployMoveApplicationsToGroupInput,
  deployUpdateApplicationGroupInput
} from "../schemas.js";

type CreateInput = {
  project_id: string;
  name: string;
  parent_id?: string;
  dry_run: boolean;
};

type UpdateInput = {
  project_id: string;
  group_id: string;
  name: string;
  dry_run: boolean;
};

type DeleteInput = {
  project_id: string;
  group_id: string;
  dry_run: boolean;
};

type MoveGroupInput = {
  project_id: string;
  id: string;
  movement: 1 | -1;
  dry_run: boolean;
};

type MoveAppsInput = {
  project_id: string;
  group_id: string;
  application_ids: string[];
  dry_run: boolean;
};

export function createDeployCreateApplicationGroupHandler(client: {
  createApplicationGroup: (input: Omit<CreateInput, "dry_run">) => Promise<{
    project_id: string;
    group_id: string;
    name: string;
    parent_id?: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = deployCreateApplicationGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: create deploy application group ${parsed.name}`, {
        projectId: parsed.project_id,
        name: parsed.name,
        parentId: parsed.parent_id,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createApplicationGroup(parsed);
    const result = asItemResult(`Created deploy application group ${response.name}`, {
      id: response.group_id,
      groupId: response.group_id,
      projectId: response.project_id,
      name: response.name,
      parentId: response.parent_id,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createDeployUpdateApplicationGroupHandler(client: {
  updateApplicationGroup: (input: Omit<UpdateInput, "dry_run">) => Promise<{
    project_id: string;
    group_id: string;
    name: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = deployUpdateApplicationGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update deploy application group ${parsed.group_id}`, {
        projectId: parsed.project_id,
        groupId: parsed.group_id,
        name: parsed.name,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateApplicationGroup(parsed);
    const result = asItemResult(`Updated deploy application group ${response.group_id}`, {
      id: response.group_id,
      groupId: response.group_id,
      projectId: response.project_id,
      name: response.name,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createDeployDeleteApplicationGroupHandler(client: {
  deleteApplicationGroup: (input: Omit<DeleteInput, "dry_run">) => Promise<{
    project_id: string;
    group_id: string;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = deployDeleteApplicationGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: delete deploy application group ${parsed.group_id}`, {
        projectId: parsed.project_id,
        groupId: parsed.group_id,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteApplicationGroup(parsed);
    const result = asItemResult(`Deleted deploy application group ${response.group_id}`, {
      id: response.group_id,
      groupId: response.group_id,
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

export function createDeployMoveApplicationGroupHandler(client: {
  moveApplicationGroup: (input: Omit<MoveGroupInput, "dry_run">) => Promise<{
    project_id: string;
    group_id: string;
    movement: 1 | -1;
    status?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = deployMoveApplicationGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: move deploy application group ${parsed.id}`, {
        projectId: parsed.project_id,
        groupId: parsed.id,
        movement: parsed.movement,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.moveApplicationGroup(parsed);
    const result = asItemResult(`Moved deploy application group ${response.group_id}`, {
      id: response.group_id,
      groupId: response.group_id,
      projectId: response.project_id,
      movement: response.movement,
      status: response.status,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createDeployMoveApplicationsToGroupHandler(client: {
  moveApplicationsToGroup: (input: Omit<MoveAppsInput, "dry_run">) => Promise<{
    project_id: string;
    group_id: string;
    application_ids: string[];
    result: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = deployMoveApplicationsToGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: move ${parsed.application_ids.length} deploy applications to group`, {
        projectId: parsed.project_id,
        groupId: parsed.group_id,
        applicationIds: parsed.application_ids,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.moveApplicationsToGroup(parsed);
    const result = asListResult(
      `Moved ${response.application_ids.length} deploy applications to group ${response.group_id}`,
      response.result.map((item) => ({
        id: String(item.application_id ?? item.application_name ?? item.error_code ?? ""),
        applicationId: item.application_id,
        applicationName: item.application_name,
        code: item.code,
        errorCode: item.error_code,
        errorMessage: item.error_msg
      })),
      undefined,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        projectId: response.project_id,
        groupId: response.group_id,
        applicationIds: response.application_ids,
        status: response.status,
        executed: true
      }
    };
  };
}
