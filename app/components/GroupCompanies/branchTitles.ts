import { SecondSectionItem } from "./type";

export const BRANCH_TITLES = [
  "Gulf Contractors Co. LLC",
  "Gulf Contractors Co. LLC, KSA",
];

const normalizeValue = (value: string) =>
  value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

const normalizedBranchTitles = new Set(BRANCH_TITLES.map(normalizeValue));

export const isBranchItem = (item: Pick<SecondSectionItem, "title" | "category">) =>
  item.category?.trim().toLowerCase() === "branches" ||
  normalizedBranchTitles.has(normalizeValue(item.title));
