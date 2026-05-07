import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoE2eSetting } from "../client.js";

export function mapE2eSetting(summary: string, item: RepoE2eSetting) {
  return asItemResult(summary, {
    e2ePolicies: item.e2e_policies,
    req: item.req,
    link: item.link
  });
}
