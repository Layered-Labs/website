import type { TableData } from "@/lib/content/table";

export const splits: TableData = {
  first: "Split",
  columns: ["X-rays", "Children", "With a fracture"],
  rows: [
    { label: "Train", cells: ["14,234", "4,264", "66.8%"] },
    { label: "Validation", cells: ["3,127", "914", "66.7%"] },
    { label: "Test", cells: ["2,966", "913", "66.1%"] },
  ],
  caption: "Splits are made by patient, so no child appears in more than one.",
};
