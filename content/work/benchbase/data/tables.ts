import type { TableData } from "@/lib/content/table";

// From the conversion logs in unified_datasets/<key>.rejected.json.

export const benchmarks: TableData = {
  first: "Benchmark",
  columns: [{ label: "What it is", align: "left" }, "Questions", { label: "License", align: "left", dim: true }],
  rows: [
    { label: "MedMCQA", cells: ["Indian medical entrance exams", "187,005", "Apache 2.0"] },
    { label: "MedQA", cells: ["US medical licensing exam style, 4 options", "11,451", "CC BY 4.0"] },
    { label: "MMLU Medical", cells: ["Six medical subjects from MMLU", "1,242", "MIT"] },
    { label: "PubMedQA", cells: ["Yes, no or maybe, from research abstracts", "1,000", "MIT"] },
    { label: "TRIAGE", cells: ["Mass-casualty triage, 4 options", "86", "Pending"] },
    { label: "All five", cells: ["", "200,784", ""], highlight: true },
  ],
  caption: "The five benchmarks in BenchBase. Every split each source has is converted.",
};

export const conversion: TableData = {
  first: "Benchmark",
  columns: ["Source rows", "Converted", "Rejected", { label: "Note", align: "left", dim: true }],
  rows: [
    { label: "MedMCQA", cells: ["193,155", "187,005", "0", "Test split skipped: its 6,150 answers are not public"] },
    { label: "MedQA", cells: ["11,451", "11,451", "0", ""] },
    { label: "MMLU Medical", cells: ["1,242", "1,242", "0", "99 items share a hash with another item"] },
    { label: "PubMedQA", cells: ["1,000", "1,000", "0", ""] },
    { label: "TRIAGE", cells: ["87", "86", "1", "One row has an empty question"] },
  ],
  caption: "Every source row either passes the schema or is rejected and logged. A converter that rejects more than 5% of a split fails.",
};
