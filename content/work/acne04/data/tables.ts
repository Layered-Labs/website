import type { TableData } from "@/lib/content/table";

export const severity: TableData = {
  first: "Severity",
  columns: ["Level", "Images", "Share"],
  rows: [
    { label: "Mild", cells: ["0", "513", "35%"] },
    { label: "Moderate", cells: ["1", "633", "43%"] },
    { label: "Severe", cells: ["2", "182", "12%"] },
    { label: "Very severe", cells: ["3", "129", "9%"] },
  ],
  caption: "Images per Hayashi severity grade, across all 1,457 photographs.",
};
