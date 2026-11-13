import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "neiss",
  type: "dataset",
  claim: "Twenty years of US emergency injuries in one file.",
  summary: "7.3 million emergency department visits from 2005 to 2024, merged into one query-ready file.",
  writeup,
});
