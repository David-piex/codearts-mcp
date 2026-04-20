import { describe, expect, it, vi } from "vitest";
import { registerScaffoldTool } from "../../src/server/register-scaffold-tool.js";

describe("registerScaffoldTool", () => {
  it("registers the phase 1 scaffold fallback", async () => {
    const registerTool = vi.fn();

    registerScaffoldTool({
      toolName: "demo_tool",
      server: { registerTool }
    });

    expect(registerTool).toHaveBeenCalledWith(
      "demo_tool",
      {
        title: "demo_tool",
        description: "CodeArts Phase 1 tool: demo_tool"
      },
      expect.any(Function)
    );

    const handler = registerTool.mock.calls[0][2] as () => Promise<{
      content: Array<{ text: string }>;
    }>;
    await expect(handler()).resolves.toMatchObject({
      content: [
        {
          text: "demo_tool is scaffolded but not yet backed by live Huawei Cloud requests."
        }
      ]
    });
  });
});
