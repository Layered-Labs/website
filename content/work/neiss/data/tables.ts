import type { TableData } from "@/lib/content/table";

export const columns: TableData = {
  first: "Column",
  columns: [{ label: "What it holds", align: "left" }],
  rows: [
    { label: "Treatment_Date", cells: ["Date of the emergency visit"] },
    { label: "Age, Sex", cells: ["The patient's age in years, and sex"] },
    { label: "Body_Part, Diagnosis", cells: ["NEISS codes for the injury"] },
    { label: "Disposition", cells: ["Outcome, such as treated and released, or admitted"] },
    { label: "Product_1", cells: ["The product or activity involved"] },
    { label: "Narrative_1", cells: ["A short free-text description"] },
    { label: "Weight", cells: ["Sample weight for national estimates"], highlight: true },
    { label: "year", cells: ["Year of the visit, added when merging"] },
  ],
  caption: "The main columns. Codes are read with the official NEISS coding manual.",
};
