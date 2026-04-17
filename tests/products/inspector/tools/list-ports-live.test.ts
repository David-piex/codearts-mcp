import { describe, expect, it } from "vitest";
import { createInspectorListPortsHandler } from "../../../../src/products/inspector/tools/list-ports.js";

describe("createInspectorListPortsHandler", () => {
  it("maps inspector ports into MCP output", async () => {
    const handler = createInspectorListPortsHandler({
      listPorts: async () => ({
        total: 1,
        data: [
          {
            port: 22,
            service: "ssh",
            protocol: "TCP",
            status: "open"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "22",
      port: 22,
      protocol: "TCP",
      status: "open"
    });
  });
});
