import {
  testPlanCreateAwCataFirstInput,
  testPlanDeleteAwCatasInput,
  testPlanDeleteCustomAwFileInput,
  testPlanSaveAwRefreshToAllInput,
  testPlanUpdateAwNameViewInput,
  testPlanUpdateTimeOutViewInput
} from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type ValueResponse = {
  value?: unknown;
  raw: Record<string, unknown>;
};

type CreateAwCataFirstInput = {
  project_id: string;
  name?: string;
  desc?: string;
  parent_id?: string;
  aw_type?: string | number;
  body?: Record<string, unknown>;
  dry_run: boolean;
};

type DeleteAwCatasInput = {
  project_id: string;
  items: Array<Record<string, unknown> & { id: string; is_folder?: boolean }>;
  dry_run: boolean;
};

type DeleteCustomAwFileInput = {
  project_id: string;
  basic_aw_id: string;
  aw_lib_id: string;
  dry_run: boolean;
};

type UpdateAwNameViewInput = {
  project_id: string;
  name_view?: string;
  source_type?: string | number;
  body?: string | Record<string, unknown>;
  dry_run: boolean;
};

type UpdateTimeOutViewInput = {
  project_id: string;
  time_out?: string | number;
  source_type?: string | number;
  body?: string | Record<string, unknown>;
  dry_run: boolean;
};

type SaveAwRefreshToAllInput = {
  project_id: string;
  aw_id: string;
  body: Record<string, unknown>;
  dry_run: boolean;
};

function createAwCataRequestBody(input: CreateAwCataFirstInput) {
  return {
    ...(input.body ?? {}),
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.desc !== undefined ? { desc: input.desc } : {}),
    ...(input.parent_id !== undefined ? { parent_id: input.parent_id } : {}),
    ...(input.aw_type !== undefined ? { aw_type: input.aw_type } : {})
  };
}

function createAwNameViewRequestBody(input: UpdateAwNameViewInput) {
  return input.body ?? (input.name_view !== undefined ? { project_id: input.project_id, name_view: input.name_view } : {});
}

function createTimeOutViewRequestBody(input: UpdateTimeOutViewInput) {
  return input.body ?? (input.time_out !== undefined ? { project_id: input.project_id, time_out: input.time_out } : {});
}

export function createTestPlanCreateAwCataFirstHandler(client: {
  createAwCataFirst: (input: Omit<CreateAwCataFirstInput, "dry_run">) => Promise<
    ValueResponse & {
      cata_id?: string;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateAwCataFirstInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        `Dry run: create AW catalog ${parsed.name ?? "(unnamed)"}`,
        parsed.name ?? parsed.parent_id ?? parsed.project_id,
        "awCatalog",
        createAwCataRequestBody(parsed),
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createAwCataFirst(parsed);
    const result = mapTestPlanRecordItem(
      `Created AW catalog ${response.cata_id || parsed.name || "(unknown)"}`,
      response.cata_id || parsed.name || parsed.project_id,
      "awCatalog",
      response.raw,
      {
        projectId: parsed.project_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteAwCatasHandler(client: {
  deleteAwCatas: (input: Omit<DeleteAwCatasInput, "dry_run">) => Promise<
    ValueResponse & {
      ids: string[];
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteAwCatasInput.parse(input);
    const ids = parsed.items.map((item) => item.id);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        `Dry run: delete ${ids.length} AW catalogs`,
        ids.join(","),
        "awCatalogs",
        { items: parsed.items },
        {
          projectId: parsed.project_id,
          deletedCount: ids.length,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteAwCatas(parsed);
    const result = mapTestPlanRecordItem(
      `Deleted ${response.ids.length} AW catalogs`,
      response.ids.join(","),
      "awCatalogs",
      response.raw,
      {
        projectId: parsed.project_id,
        deletedCount: response.ids.length,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteCustomAwFileHandler(client: {
  deleteCustomAwFile: (input: Omit<DeleteCustomAwFileInput, "dry_run">) => Promise<
    ValueResponse & {
      basic_aw_id: string;
      aw_lib_id: string;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteCustomAwFileInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        `Dry run: delete custom AW file ${parsed.aw_lib_id}`,
        parsed.aw_lib_id,
        "customAwFile",
        {
          basic_aw_id: parsed.basic_aw_id,
          aw_lib_id: parsed.aw_lib_id
        },
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteCustomAwFile(parsed);
    const result = mapTestPlanRecordItem(
      `Deleted custom AW file ${response.aw_lib_id}`,
      response.aw_lib_id,
      "customAwFile",
      response.raw,
      {
        projectId: parsed.project_id,
        basicAwId: response.basic_aw_id,
        value: response.value,
        executed: true
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateAwNameViewHandler(client: {
  updateAwNameView: (input: Omit<UpdateAwNameViewInput, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateAwNameViewInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: update AW name view",
        parsed.project_id,
        "awNameView",
        {
          body: createAwNameViewRequestBody(parsed),
          source_type: parsed.source_type
        },
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateAwNameView(parsed);
    const result = mapTestPlanRecordItem("Updated AW name view", parsed.project_id, "awNameView", response.raw, {
      projectId: parsed.project_id,
      value: response.value,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateTimeOutViewHandler(client: {
  updateTimeOutView: (input: Omit<UpdateTimeOutViewInput, "dry_run">) => Promise<ValueResponse>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTimeOutViewInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        "Dry run: update timeout view",
        parsed.project_id,
        "timeOutView",
        {
          body: createTimeOutViewRequestBody(parsed),
          source_type: parsed.source_type
        },
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTimeOutView(parsed);
    const result = mapTestPlanRecordItem("Updated timeout view", parsed.project_id, "timeOutView", response.raw, {
      projectId: parsed.project_id,
      value: response.value,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanSaveAwRefreshToAllHandler(client: {
  saveAwRefreshToAll: (input: Omit<SaveAwRefreshToAllInput, "dry_run">) => Promise<
    ValueResponse & {
      aw_id: string;
    }
  >;
}) {
  return async (input: unknown) => {
    const parsed = testPlanSaveAwRefreshToAllInput.parse(input);

    if (parsed.dry_run) {
      const result = mapTestPlanRecordItem(
        `Dry run: refresh AW ${parsed.aw_id} to all`,
        parsed.aw_id,
        "awRefresh",
        parsed.body,
        {
          projectId: parsed.project_id,
          executed: false
        }
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.saveAwRefreshToAll(parsed);
    const result = mapTestPlanRecordItem(`Started refresh for AW ${response.aw_id}`, response.aw_id, "awRefresh", response.raw, {
      projectId: parsed.project_id,
      value: response.value,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
