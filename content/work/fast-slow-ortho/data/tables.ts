import type { TableData } from "@/lib/content/table";

// Every number here comes from the study's results.

export const calibration: TableData = {
  first: "How sure Jev was",
  columns: ["Share right"],
  rows: [
    { label: "Under 50%", cells: ["50%"] },
    { label: "50 to 80%", cells: ["72%"] },
    { label: "80 to 95%", cells: ["88%"] },
    { label: "95% or more", cells: ["98.5%"], highlight: true },
  ],
  caption: "How often Jev was right at each level of confidence, across all 3,019 questions.",
};

export const eachModelAlone: TableData = {
  first: "Model",
  columns: ["Accuracy", { label: "95% range", dim: true }, "Cost per 1,000", "Median s"],
  rows: [
    { model: "claude", label: "Claude Opus 5.5", cells: ["94.2%", "91.8 to 95.9", "$7.25", "3.88"] },
    { model: "openai", label: "GPT-6 Sol", cells: ["92.8%", "90.2 to 94.8", "$1.32", "2.73"] },
    { model: "gemini", label: "Gemini 3.1 Pro", cells: ["92.2%", "89.5 to 94.2", "$6.47", "5.93"] },
    { model: "deepseek", label: "DeepSeek v4.1 Flash", cells: ["91.0%", "88.2 to 93.2", "$0.30", "1.66"] },
    { model: "liquid", label: "Liquid d1-ultra", cells: ["86.8%", "83.6 to 89.5", "$0.005", "0.38"] },
    { model: "deepseek", label: "DeepSeek, no reasoning", cells: ["85.8%", "82.5 to 88.6", "$0.059", "1.04"] },
    { model: "liquid", label: "Liquid d1.1", cells: ["84.6%", "81.2 to 87.5", "$0.002", "0.35"] },
    { model: "jev", label: "Jev 1.14", cells: ["82.8%", "79.2 to 85.9", "$0.017", "0.21"] },
  ],
  caption: "Each model alone on the same 500 questions. Range is the 95% confidence interval; cost is in US dollars per 1,000 questions; median s is the median seconds per question.",
};

const at95 = { title: "Cutoff 0.95", note: "49% sent on to the reasoning model" };
const at80 = { title: "Cutoff 0.80", note: "32% sent on to the reasoning model" };

export const jevFirst: TableData = {
  first: "Reasoning model",
  columns: ["Accuracy", "Change vs alone", "Cheaper", "Faster"],
  rows: [
    { group: at95, model: "claude", label: "Claude Opus 5.5", cells: ["94.2%", "+0.0", "1.7×", "12×"] },
    { group: at95, model: "openai", label: "GPT-6 Sol", cells: ["93.0%", "+0.2", "1.4×", "8×"] },
    { group: at95, model: "gemini", label: "Gemini 3.1 Pro", cells: ["92.2%", "+0.0", "1.6×", "18×"] },
    { group: at95, model: "deepseek", label: "DeepSeek v4.1 Flash", cells: ["91.0%", "+0.0", "1.1×", "5×"] },
    { group: at80, model: "claude", label: "Claude Opus 5.5", cells: ["93.6%", "−0.6", "2.5×", "17×"] },
    { group: at80, model: "openai", label: "GPT-6 Sol", cells: ["93.0%", "+0.2", "2.0×", "12×"] },
    { group: at80, model: "gemini", label: "Gemini 3.1 Pro", cells: ["91.8%", "−0.4", "2.2×", "26×"] },
    { group: at80, model: "deepseek", label: "DeepSeek v4.1 Flash", cells: ["90.4%", "−0.6", "1.4×", "7×"] },
  ],
  caption: "Jev first, each reasoning model only when Jev is unsure. At a cutoff of 0.95, Jev keeps its answer only when it is at least 95% sure; at 0.80, when it is at least 80% sure. Change is in percentage points against the reasoning model alone; none is significant (exact McNemar test, smallest p = 0.45).",
};
