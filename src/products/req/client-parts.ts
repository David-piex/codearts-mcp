import type { ReqClient } from "./client.js";

export type ReqClientResourceGroup =
  | "project"
  | "member"
  | "iteration"
  | "plan"
  | "work-item"
  | "config"
  | "ipd"
  | "attachment"
  | "work-hour";

export type ReqClientSlices = Record<ReqClientResourceGroup, Partial<ReqClient>>;

const resourceGroupOrder: ReqClientResourceGroup[] = [
  "project",
  "member",
  "iteration",
  "plan",
  "work-item",
  "config",
  "ipd",
  "attachment",
  "work-hour"
];

function createEmptySlices(): ReqClientSlices {
  return Object.fromEntries(resourceGroupOrder.map((group) => [group, {}])) as ReqClientSlices;
}

export function resolveReqClientResourceGroup(methodName: string): ReqClientResourceGroup {
  if (methodName.includes("Ipd")) {
    if (methodName.includes("Attachment") || methodName.includes("Image")) {
      return "attachment";
    }
    if (methodName.includes("WorkHour")) {
      return "work-hour";
    }
    return "ipd";
  }

  if (methodName.includes("Attachment") || methodName.includes("Image")) {
    return "attachment";
  }

  if (methodName.includes("WorkHour") || methodName.includes("Workhour")) {
    return "work-hour";
  }

  if (
    methodName.includes("Status") ||
    methodName.includes("Config") ||
    methodName.includes("Template") ||
    methodName.includes("Tracker") ||
    methodName.includes("Cache") ||
    methodName.includes("Feature")
  ) {
    return "config";
  }

  if (methodName.includes("Member") || methodName === "leaveProject") {
    return "member";
  }

  if (methodName.includes("Iteration")) {
    return "iteration";
  }

  if (
    methodName.includes("Plan") ||
    methodName.includes("Release") ||
    methodName.includes("Ir") ||
    methodName.includes("Rr") ||
    methodName.includes("Program") ||
    methodName.includes("Severity")
  ) {
    return "plan";
  }

  if (methodName.includes("WorkItem") || methodName.includes("Issue")) {
    return "work-item";
  }

  return "project";
}

export function createReqClientSlices(client: ReqClient): ReqClientSlices {
  const slices = createEmptySlices();

  for (const methodName of Object.keys(client) as Array<keyof ReqClient & string>) {
    const group = resolveReqClientResourceGroup(methodName);
    slices[group][methodName] = client[methodName] as never;
  }

  return slices;
}

