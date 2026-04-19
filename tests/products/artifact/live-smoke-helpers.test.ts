import { describe, expect, it, vi } from "vitest";
import { mapSequentiallyWithDelay } from "./live-smoke-helpers.js";

describe("mapSequentiallyWithDelay", () => {
  it("processes items in order and sleeps between items but not after the last", async () => {
    const events: string[] = [];
    const sleep = vi.fn(async (delayMs: number) => {
      events.push(`sleep:${delayMs}`);
    });

    const result = await mapSequentiallyWithDelay(
      ["a", "b", "c"],
      async (item) => {
        events.push(`item:${item}`);
        return item.toUpperCase();
      },
      {
        delayMs: 150,
        sleep
      }
    );

    expect(result).toEqual(["A", "B", "C"]);
    expect(events).toEqual([
      "item:a",
      "sleep:150",
      "item:b",
      "sleep:150",
      "item:c"
    ]);
    expect(sleep).toHaveBeenCalledTimes(2);
  });
});
