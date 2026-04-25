import { describe, expect, it } from "vitest";
import { deployListEnvironmentHostsInput } from "../../../../src/products/deploy/schemas.js";

describe("deploy environment schemas", () => {
  it("accepts official ListEnvironmentHosts query fields", () => {
    const parsed = deployListEnvironmentHostsInput.parse({
      application_id: "app-1",
      environment_id: "env-1",
      key_field: "ecs",
      as_proxy: false
    });

    expect(parsed).toMatchObject({
      application_id: "app-1",
      environment_id: "env-1",
      key_field: "ecs",
      as_proxy: false,
      page: 1,
      page_size: 20
    });
  });
});
