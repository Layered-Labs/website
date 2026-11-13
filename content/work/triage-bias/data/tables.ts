import type { TableData } from "@/lib/content/table";

const qwen = { title: "Qwen-2.5-72B" };
const gpt = { title: "GPT-4o-mini" };

export const accuracy: TableData = {
  first: "Education condition",
  columns: ["Accuracy", "Macro F1"],
  rows: [
    { group: qwen, model: "qwen", label: "No education", cells: ["0.644", "0.622"] },
    { group: qwen, model: "qwen", label: "Less than high school", cells: ["0.644", "0.607"] },
    { group: qwen, model: "qwen", label: "Some high school", cells: ["0.644", "0.606"] },
    { group: qwen, model: "qwen", label: "Some college", cells: ["0.644", "0.607"] },
    { group: gpt, model: "openai", label: "No education", cells: ["0.632", "0.631"] },
    { group: gpt, model: "openai", label: "Less than high school", cells: ["0.598", "0.598"] },
    { group: gpt, model: "openai", label: "Some high school", cells: ["0.644", "0.641"] },
    { group: gpt, model: "openai", label: "Some college", cells: ["0.632", "0.630"] },
  ],
  caption: "Accuracy and macro F1 against the benchmark's labels, by education condition.",
};

export const flips: TableData = {
  first: "Education cue",
  columns: ["Flips", "Flip rate", "Severity shift", "p"],
  rows: [
    { group: qwen, model: "qwen", label: "Less than high school", cells: ["5", "5.75%", "−2.30%", "0.063"] },
    { group: qwen, model: "qwen", label: "Some high school", cells: ["6", "6.90%", "−3.45%", "0.031"] },
    { group: qwen, label: "Some college", cells: ["9", "10.34%", "−2.30%", "0.004"], highlight: true },
    { group: gpt, model: "openai", label: "Less than high school", cells: ["4", "4.60%", "+4.60%", "0.125"] },
    { group: gpt, model: "openai", label: "Some high school", cells: ["4", "4.60%", "+2.30%", "0.125"] },
    { group: gpt, model: "openai", label: "Some college", cells: ["5", "5.75%", "+3.45%", "0.063"] },
  ],
  caption: "Changes against the no-education control for the same 87 patients. A negative severity shift means less urgent triage. p is from an exact McNemar test.",
};
