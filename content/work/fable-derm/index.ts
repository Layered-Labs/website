import { defineItem } from "@/lib/content/types";
import writeup from "./writeup";

export default defineItem({
slug: "fable-derm",
  type: "dataset",
  claim: "Does a patient's emotion change the medical answer?",
  summary: "Forty-nine dermatology questions asked in six emotional framings each, 294 in all, with the model's raw answers.",
  writeup,
});
