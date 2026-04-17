import { describe, expect, it } from "vitest";
import { createGovernClient } from "../../../src/products/govern/client.js";

describe("createGovernClient", () => {
  it("uses the sbc create multipart task endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            file_path: "/tmp/demo.bin",
            file_name: "demo.bin",
            upload_id: "upload-1"
          }
        };
      }
    } as never);

    await client.createMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/multipart/create");
    expect(requestedBody).toEqual({
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin"
    });
  });

  it("maps create multipart task responses", async () => {
    const client = createGovernClient({
      post: async () => ({
        data: {
          file_path: "/tmp/demo.bin",
          file_name: "demo.bin",
          upload_id: "upload-1"
        }
      })
    } as never);

    const result = await client.createMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin"
    });

    expect(result).toEqual({
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1"
    });
  });

  it("uses the sbc notify multipart task endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            file_path: "/tmp/demo.bin",
            file_name: "demo.bin",
            upload_id: "upload-1"
          }
        };
      }
    } as never);

    await client.notifyMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/multipart/notify");
    expect(requestedBody).toEqual({
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1"
    });
  });

  it("maps notify multipart task responses", async () => {
    const client = createGovernClient({
      post: async () => ({
        data: {
          file_path: "/tmp/demo.bin",
          file_name: "demo.bin",
          upload_id: "upload-1"
        }
      })
    } as never);

    const result = await client.notifyMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1"
    });

    expect(result).toEqual({
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1"
    });
  });

  it("uses the sbc upload multipart task endpoint", async () => {
    let requestedPath = "";
    let requestedBody: FormData | undefined;
    const client = createGovernClient({
      postMultipart: async (path: string, body: FormData) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            file_path: "/tmp/demo.bin",
            file_name: "demo.bin",
            upload_id: "upload-1",
            part_number: 1
          }
        };
      }
    } as never);

    await client.uploadMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      part_number: 1,
      part_size: 5,
      file: new File(["hello"], "chunk.bin")
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/multipart");
    expect(requestedBody?.get("upload_id")).toBe("upload-1");
    expect(requestedBody?.get("file_path")).toBe("/tmp/demo.bin");
    expect(requestedBody?.get("file_name")).toBe("demo.bin");
    expect(requestedBody?.get("part_number")).toBe("1");
    expect(requestedBody?.get("part_size")).toBe("5");
    expect(requestedBody?.get("file")).toBeInstanceOf(File);
  });

  it("maps upload multipart task responses", async () => {
    const client = createGovernClient({
      postMultipart: async () => ({
        data: {
          file_path: "/tmp/demo.bin",
          file_name: "demo.bin",
          upload_id: "upload-1",
          part_number: 1
        }
      })
    } as never);

    const result = await client.uploadMultipartTask({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      part_number: 1,
      part_size: 5,
      file: new File(["hello"], "chunk.bin")
    });

    expect(result).toEqual({
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      part_number: 1
    });
  });

  it("uses the sbc create task endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: "task-1"
        };
      }
    } as never);

    await client.createTask({
      project_id: "project-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/start");
    expect(requestedBody).toEqual({
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });
  });

  it("maps create task responses", async () => {
    const client = createGovernClient({
      post: async () => ({
        data: "task-1"
      })
    } as never);

    const result = await client.createTask({
      project_id: "project-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });

    expect(result).toEqual({
      id: "task-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });
  });

  it("maps create task responses when the provider returns a data object", async () => {
    const client = createGovernClient({
      post: async () => ({
        data: {
          id: "task-2"
        }
      })
    } as never);

    const result = await client.createTask({
      project_id: "project-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });

    expect(result).toEqual({
      id: "task-2",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100
    });
  });

  it("uses the sbc task-status endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            id: "task-1",
            status: "R"
          }
        };
      }
    } as never);

    await client.getTaskStatus({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/status?id=task-1");
  });

  it("uses the sbc stop task endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      post: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            id: "task-1",
            result: "success"
          }
        };
      }
    } as never);

    await client.stopTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/stop?id=task-1");
  });

  it("maps stop task responses", async () => {
    const client = createGovernClient({
      post: async () => ({
        data: {
          id: "task-1",
          result: "success"
        }
      })
    } as never);

    const result = await client.stopTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result).toEqual({
      id: "task-1",
      result: "success"
    });
  });

  it("uses the sbc delete task endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      delete: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            id: "task-1",
            result: "success"
          }
        };
      }
    } as never);

    await client.deleteTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task?id=task-1");
  });

  it("maps delete task responses", async () => {
    const client = createGovernClient({
      delete: async () => ({
        data: {
          id: "task-1",
          result: "success"
        }
      })
    } as never);

    const result = await client.deleteTask({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result).toEqual({
      id: "task-1",
      result: "success"
    });
  });

  it("maps task status responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          id: "task-1",
          status: "R"
        }
      })
    } as never);

    const result = await client.getTaskStatus({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result).toEqual({
      id: "task-1",
      status: "R"
    });
  });

  it("maps open source summary responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          software: {
            component: 12,
            vuln: 3,
            no_version: 1
          },
          vuln: {
            critical: 1,
            high: 1,
            medium: 1,
            low: 0
          },
          license: {
            list: [{ name: "Apache-2.0", num: 4 }]
          },
          report_url: "https://report.example.com/1",
          start_time: "2026-04-16 10:00:00",
          end_time: "2026-04-16 10:03:00"
        }
      })
    } as never);

    const result = await client.getOpenSourceSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.software.component).toBe(12);
    expect(result.license?.list).toEqual([{ name: "Apache-2.0", num: 4 }]);
    expect(result.report_url).toBe("https://report.example.com/1");
  });

  it("maps info leak summary responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          file_count: 5,
          start_time: "2026-04-16 10:00:00",
          end_time: "2026-04-16 10:03:00",
          items: [{ name: "硬编码密码", result: 2 }]
        }
      })
    } as never);

    const result = await client.getInfoLeakSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result).toEqual({
      file_count: 5,
      start_time: "2026-04-16 10:00:00",
      end_time: "2026-04-16 10:03:00",
      items: [{ name: "硬编码密码", result: 2 }]
    });
  });

  it("uses the sbc info leak summary endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            file_count: 0,
            items: []
          }
        };
      }
    } as never);

    await client.getInfoLeakSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/summary/infoleak?id=task-1");
  });

  it("maps sec compile summary responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          version: "v1.0",
          all_file_nums: 9,
          items: [
            {
              index: "9.1",
              name: "BIND_NOW",
              severity: "high",
              result: {
                count: 1,
                coverage: "80%"
              }
            }
          ]
        }
      })
    } as never);

    const result = await client.getSecCompileSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.version).toBe("v1.0");
    expect(result.all_file_nums).toBe(9);
    expect(result.items?.[0]).toMatchObject({
      name: "BIND_NOW",
      severity: "high"
    });
  });

  it("uses the sbc sec compile summary endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            all_file_nums: 0,
            items: []
          }
        };
      }
    } as never);

    await client.getSecCompileSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/summary/seccompile?id=task-1");
  });

  it("maps sec config summary responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          version: "v1.0",
          start_time: "Jul 13 2023 10:25:02",
          end_time: "Jul 13 2023 10:25:02",
          items: [
            {
              index: "1.1",
              name: "预置账号信息检查",
              severity: "high",
              result: "NA",
              confirmation: null
            }
          ]
        }
      })
    } as never);

    const result = await client.getSecConfigSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.version).toBe("v1.0");
    expect(result.items?.[0]).toMatchObject({
      name: "预置账号信息检查",
      result: "NA"
    });
  });

  it("uses the sbc sec config summary endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            version: "v1.0",
            items: []
          }
        };
      }
    } as never);

    await client.getSecConfigSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/summary/secconfig?id=task-1");
  });

  it("uses the sbc open-source summary endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            software: {}
          }
        };
      }
    } as never);

    await client.getOpenSourceSummary({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/summary/opensource?id=task-1");
  });

  it("maps open source report responses", async () => {
    const client = createGovernClient({
      get: async () => ({
        data: {
          id: "task-1",
          status: "R",
          filename: "demo.jar",
          sha1: "abc",
          report: "https://report.example.com/1",
          creator: "user-1",
          summary: {
            vuln_detail: {
              critical: 1,
              major: 2,
              minor: 3
            },
            comp_detail: {
              no_known_vuln_comp: 4,
              vulnerable_comp: 5
            }
          },
          release_info: {
            vuln_database_version: "2026-04-01",
            plat_version: "2.0"
          },
          start_time: "2026-04-16 10:00:00",
          end_time: "2026-04-16 10:03:00",
          components: [
            {
              name: "cglib",
              version: "3.3.0",
              vuln_num: 1,
              licenses: ["Apache-2.0"]
            }
          ]
        }
      })
    } as never);

    const result = await client.getOpenSourceReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.id).toBe("task-1");
    expect(result.components?.[0]).toEqual({
      name: "cglib",
      version: "3.3.0",
      vuln_num: 1,
      licenses: ["Apache-2.0"]
    });
  });

  it("uses the sbc open-source report endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            id: "task-1"
          }
        };
      }
    } as never);

    await client.getOpenSourceReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/task/report/opensource?id=task-1");
  });

  it("maps quota info responses", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
        data: {
          package_quota: 5000,
          concurrent_task: 3,
          valid: true,
          resource_id: "quota-1"
        }
      };
      }
    } as never);

    const result = await client.getQuotaInfo({
      project_id: "project-1"
    });

    expect(result).toEqual({
      package_quota: 5000,
      concurrent_task: 3,
      valid: true,
      resource_id: "quota-1"
    });
    expect(requestedPath).toBe("/v1/project-1/sbc/quota/info");
  });

  it("uses the pdf report create endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      post: async (path: string) => {
        requestedPath = path;
        return { data: { id: "task-1", result: "success" } };
      }
    } as never);

    const result = await client.createPdfReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/pdf/create?id=task-1");
    expect(result).toEqual({ id: "task-1", result: "success" });
  });

  it("uses the pdf report status endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return { data: { id: "task-1", status: "R" } };
      }
    } as never);

    const result = await client.getPdfReportStatus({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/pdf/status?id=task-1");
    expect(result).toEqual({ id: "task-1", status: "R" });
  });

  it("uses the pdf report download endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      getBinary: async (path: string) => {
        requestedPath = path;
        return {
          body: new Uint8Array([1, 2, 3]),
          contentType: "application/pdf",
          fileName: "report.pdf"
        };
      }
    } as never);

    const result = await client.downloadPdfReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/pdf?id=task-1");
    expect(Array.from(result.body)).toEqual([1, 2, 3]);
    expect(result.file_name).toBe("report.pdf");
  });

  it("uses the excel report create endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      post: async (path: string) => {
        requestedPath = path;
        return { data: { id: "task-1", result: "success" } };
      }
    } as never);

    const result = await client.createExcelReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/excel/create?id=task-1");
    expect(result).toEqual({ id: "task-1", result: "success" });
  });

  it("uses the excel report status endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return { data: { id: "task-1", status: "R" } };
      }
    } as never);

    const result = await client.getExcelReportStatus({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/excel/status?id=task-1");
    expect(result).toEqual({ id: "task-1", status: "R" });
  });

  it("uses the excel report download endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      getBinary: async (path: string) => {
        requestedPath = path;
        return {
          body: new Uint8Array([4, 5, 6]),
          contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          fileName: "report.xlsx"
        };
      }
    } as never);

    const result = await client.downloadExcelReport({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/report/excel?id=task-1");
    expect(Array.from(result.body)).toEqual([4, 5, 6]);
    expect(result.file_name).toBe("report.xlsx");
  });

  it("uses the vuln map list endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: [
            {
              name: "openEuler:vim",
              version: "vim-9.0-1.oe2203",
              vendor: "",
              include_previous: 0,
              min_version: "",
              cve_id: "CVE-2023-4751",
              is_affected: "W",
              update_time: "2023-09-04 16:05:07"
            }
          ]
        };
      }
    } as never);

    const result = await client.listSbcVulnMap({
      project_id: "project-1",
      start_time: "2023-09-04 16:00:00",
      end_time: "2023-09-05 00:00:00"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/vuln/map/list?start_time=2023-09-04%2016%3A00%3A00&end_time=2023-09-05%2000%3A00%3A00");
    expect(result[0]).toMatchObject({ cve_id: "CVE-2023-4751" });
  });

  it("uses the vuln info endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            hw_psirt_id: "xxxx",
            cve_id: "CVE-xxxx-xxxx",
            cvss_ver: "3.1",
            cvss_value: "7.5",
            cvss_vector: "",
            priority: 1,
            is_focussed: "Y",
            official_publish_date: "2017-10-03",
            vul_mod_date: "2025-04-20",
            vul_title: "",
            vul_description: "",
            solution: "",
            solution_list: [],
            link_list: [],
            vuln_source: "vuln",
            platform: "vuln"
          }
        };
      }
    } as never);

    const result = await client.getVulnInfo({
      project_id: "project-1",
      cve_id: "CVE-xxxx-xxxx"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/vuln/info?cve_id=CVE-xxxx-xxxx");
    expect(result).toMatchObject({ cve_id: "CVE-xxxx-xxxx", cvss_value: "7.5" });
  });

  it("uses the user info endpoint", async () => {
    let requestedPath = "";
    const client = createGovernClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: {
            user_id: "user-1",
            white_list: true
          }
        };
      }
    } as never);

    const result = await client.getUserInfo({
      project_id: "project-1",
      user_id: "user-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/user/info?user_id=user-1");
    expect(result).toMatchObject({ user_id: "user-1", white_list: true });
  });

  it("uses the alter quota endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            orderId: "order-1"
          }
        };
      }
    } as never);

    const result = await client.alterQuotaInfo({
      project_id: "project-1",
      resource_id: "resource-1",
      change_mode: 1,
      product_info: [
        {
          resource_size: 5,
          resource_size_measure_id: 17
        }
      ]
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/quota/alter");
    expect(requestedBody).toEqual({
      resourceId: "resource-1",
      changeMode: 1,
      productInfo: [
        {
          resourceSize: 5,
          resouceSizeMeasureId: 17
        }
      ]
    });
    expect(result).toEqual({ order_id: "order-1" });
  });

  it("uses the osi statistics endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            Total: {
              software: 10089
            }
          }
        };
      }
    } as never);

    const result = await client.getOsiStatistics({
      project_id: "project-1"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/statistics");
    expect(requestedBody).toEqual({});
    expect(result).toEqual({
      total: {
        software: 10089
      }
    });
  });

  it("uses the osi item name page endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: [
            {
              software_name: "OpenSSL",
              language: "C/C++",
              description: "TLS/SSL and crypto library",
              version_count: 4,
              provider: "openssl"
            }
          ],
          pagination: {
            page_num: 1,
            page_size: 5,
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listOsiItemNames({
      project_id: "project-1",
      page: 1,
      page_size: 5,
      software_name: "openssl"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/item/name/page?page_num=1&page_size=5");
    expect(requestedBody).toEqual({
      software_name: "openssl"
    });
    expect(result).toEqual({
      items: [
        {
          software_name: "OpenSSL",
          language: "C/C++",
          description: "TLS/SSL and crypto library",
          version_count: 4,
          provider: "openssl"
        }
      ],
      total: 1
    });
  });

  it("uses the osi item version page endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: [
            {
              software_code: "728d261152a6102ad4f7a64f11a3d35f",
              software_name: "OpenSSL",
              software_version: "openssl-3.0.19",
              language: "C/C++",
              release_time: "2026-01-27 00:00:00",
              license_list: ["OpenSSL Combined License"],
              level: "L3",
              provider: "openssl",
              scorecard: 6.3,
              criticality: 0.709,
              vuln_amount: 0,
              scm: "https://github.com/openssl/openssl"
            }
          ],
          pagination: {
            page_num: 1,
            page_size: 5,
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listOsiItemVersions({
      project_id: "project-1",
      page: 1,
      page_size: 5,
      software_name: "openssl"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/item/version/page?page_num=1&page_size=5");
    expect(requestedBody).toEqual({
      software_name: "openssl"
    });
    expect(result).toEqual({
      items: [
        {
          software_code: "728d261152a6102ad4f7a64f11a3d35f",
          software_name: "OpenSSL",
          software_version: "openssl-3.0.19",
          language: "C/C++",
          release_time: "2026-01-27 00:00:00",
          license_list: ["OpenSSL Combined License"],
          level: "L3",
          provider: "openssl",
          scorecard: 6.3,
          criticality: 0.709,
          vuln_amount: 0,
          scm: "https://github.com/openssl/openssl"
        }
      ],
      total: 1
    });
  });

  it("uses the osi item detail endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            software_code: "728d261152a6102ad4f7a64f11a3d35f",
            software_name: "OpenSSL",
            software_version: "openssl-3.0.19",
            release_time: "2026-01-27 00:00:00",
            language: "C/C++",
            scm: "https://github.com/openssl/openssl",
            homepage: "https://www.openssl.org/",
            description: "TLS/SSL and crypto library",
            provider: "openssl",
            level: "L3",
            vuln_amount: 0,
            scorecard: 6.3,
            criticality: 0.709
          }
        };
      }
    } as never);

    const result = await client.getOsiItemDetail({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/item/detail");
    expect(requestedBody).toEqual({
      software_name: "openssl",
      software_version: "openssl-3.0.19",
      artifact_id: undefined
    });
    expect(result).toMatchObject({
      software_code: "728d261152a6102ad4f7a64f11a3d35f",
      software_name: "OpenSSL",
      software_version: "openssl-3.0.19",
      level: "L3"
    });
  });

  it("uses the osi item vuln endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: [
            {
              cve_id: "CVE-2026-0001",
              severity: "high",
              cvss_score: "7.5",
              publish_time: "2026-01-01"
            }
          ]
        };
      }
    } as never);

    const result = await client.listOsiItemVulns({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/item/vuln");
    expect(requestedBody).toEqual({
      software_name: "openssl",
      software_version: "openssl-3.0.19",
      artifact_id: undefined
    });
    expect(result.items[0]).toMatchObject({
      cve_id: "CVE-2026-0001",
      severity: "high"
    });
  });

  it("uses the osi item dependency endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createGovernClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: [
            {
              software_name: "zlib",
              software_version: "1.3.1",
              provider: "madler",
              language: "C/C++",
              relation: "direct"
            }
          ]
        };
      }
    } as never);

    const result = await client.listOsiItemDependency({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(requestedPath).toBe("/v1/project-1/sbc/osi/item/dependency");
    expect(requestedBody).toEqual({
      software_name: "openssl",
      software_version: "openssl-3.0.19",
      artifact_id: undefined
    });
    expect(result.items[0]).toMatchObject({
      software_name: "zlib",
      relation: "direct"
    });
  });
});
