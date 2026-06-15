export const productToolFamilies = [
  "artifact",
  "build",
  "check",
  "deploy",
  "pipeline",
  "repo",
  "req",
  "testplan"
] as const;

export type ProductToolFamily = (typeof productToolFamilies)[number];

export function isProductToolFamily(value: string): value is ProductToolFamily {
  return (productToolFamilies as readonly string[]).includes(value);
}
