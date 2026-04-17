import { describe, expect, it } from "vitest";
import { createInspectorClient } from "../../../src/products/inspector/client.js";

describe("createInspectorClient", () => {
  it("uses the webscan create domain endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createInspectorClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          domain_id: "domain-1",
          domain_name: "https://example.com"
        };
      }
    } as never);

    await client.createDomain({
      project_id: "project-1",
      domain_name: "https://example.com",
      alias: "main-site"
    });

    expect(requestedPath).toBe("/v3/project-1/webscan/domains");
    expect(requestedBody).toEqual({
      domain_name: "https://example.com",
      alias: "main-site"
    });
  });

  it("maps create domain responses", async () => {
    const client = createInspectorClient({
      post: async () => ({
        domain_id: "domain-1",
        domain_name: "https://example.com",
        alias: "main-site",
        auth_status: "unauth",
        create_time: "2026-04-16 10:00:00"
      })
    } as never);

    const result = await client.createDomain({
      project_id: "project-1",
      domain_name: "https://example.com",
      alias: "main-site"
    });

    expect(result).toEqual({
      domain_id: "domain-1",
      domain_name: "https://example.com",
      alias: "main-site",
      auth_status: "unauth",
      create_time: "2026-04-16 10:00:00"
    });
  });

  it("uses the webscan domains endpoint", async () => {
    let requestedPath = "";
    const client = createInspectorClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 0,
          domains: []
        };
      }
    } as never);

    await client.listDomains({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toBe("/v3/project-1/webscan/domains?offset=0&limit=20");
  });

  it("maps list domains responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        total: 1,
        domains: [
          {
            domain_id: "domain-1",
            domain_name: "https://example.com",
            auth_status: "auth",
            high: 1
          }
        ]
      })
    } as never);

    const result = await client.listDomains({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result).toEqual({
      total: 1,
      domains: [
        {
          domain_id: "domain-1",
          domain_name: "https://example.com",
          alias: undefined,
          auth_status: "auth",
          create_time: undefined,
          high: 1,
          middle: undefined,
          low: undefined,
          hint: undefined
        }
      ]
    });
  });

  it("maps get task responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        task_id: "task-1",
        task_name: "scan-main",
        task_status: "success",
        score: 100
      })
    } as never);

    const result = await client.getTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.task_id).toBe("task-1");
    expect(result.score).toBe(100);
  });

  it("uses the webscan task endpoint", async () => {
    let requestedPath = "";
    const client = createInspectorClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          task_id: "task-1"
        };
      }
    } as never);

    await client.getTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v3/project-1/webscan/tasks?task_id=task-1");
  });

  it("maps list task histories responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        total: 1,
        data: [
          {
            task_id: "task-1",
            task_name: "scan-main",
            task_status: "success"
          }
        ]
      })
    } as never);

    const result = await client.listTaskHistories({
      project_id: "project-1",
      domain_id: "domain-1",
      page: 1,
      page_size: 20
    });

    expect(result.total).toBe(1);
    expect(result.data[0]?.task_id).toBe("task-1");
  });

  it("maps list results responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        total: 1,
        statistics: { middle: 1 },
        data: [
          {
            vuln_id: "vuln-1",
            url: "https://example.com/a",
            severity: "middle",
            vuln_type: "CSRF"
          }
        ]
      })
    } as never);

    const result = await client.listResults({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.total).toBe(1);
    expect(result.statistics?.middle).toBe(1);
    expect(result.data[0]?.vuln_id).toBe("vuln-1");
  });

  it("uses the webscan results endpoint", async () => {
    let requestedPath = "";
    const client = createInspectorClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 0,
          data: []
        };
      }
    } as never);

    await client.listResults({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toBe("/v3/project-1/webscan/results?task_id=task-1&offset=0&limit=20");
  });

  it("maps list ports responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
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
    } as never);

    const result = await client.listPorts({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.total).toBe(1);
    expect(result.data[0]?.port).toBe(22);
    expect(result.data[0]?.protocol).toBe("TCP");
  });

  it("maps list business risks responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        total: 1,
        data: [
          {
            risk_id: "risk-1",
            risk_url: "https://example.com/risk",
            risk_type: "dead_link",
            risk_content: "https://dead.example.com",
            risk_status: "repairing",
            find_time: "2026-04-16 10:00:00"
          }
        ]
      })
    } as never);

    const result = await client.listBusinessRisks({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.total).toBe(1);
    expect(result.data[0]?.risk_id).toBe("risk-1");
    expect(result.data[0]?.risk_status).toBe("repairing");
  });

  it("maps get report status responses", async () => {
    const client = createInspectorClient({
      get: async () => ({
        task_id: "task-1",
        report_status: "generated"
      })
    } as never);

    const result = await client.getReportStatus({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.task_id).toBe("task-1");
    expect(result.report_status).toBe("generated");
  });
});
