"use client";

import { Logo } from "@/components/landing/logos";

import { Decode, Fields, Load, Merge, Steps, Weights, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";

export default defineAnimations("datasheet", {
  motivation: fig(Merge, { files: ["2005", "", "", "", "", "2010", "", "", "", "", "2015", "", "", "", "", "2020", "", "", "", "2024"], into: "One file", note: "With a year column" }, "Twenty yearly files, merged into one.", { wide: true }),
  composition: fig(Fields, { preview: "visit", fields: [{ name: "Treatment_Date", type: "date" }, { name: "Age", type: "int" }, { name: "Sex", type: "code" }, { name: "Body_Part", type: "code" }, { name: "Diagnosis", type: "code" }, { name: "Disposition", type: "code" }, { name: "Product_1", type: "code" }, { name: "Narrative_1", type: "text" }, { name: "Weight", type: "float", primary: true }, { name: "year", type: "int" }] }, "The columns of each visit. The weight turns rows into national estimates.", { wide: true }),
  collection: fig(Steps, { steps: [{ title: "About 100 hospitals", note: "A probability sample" , icon: "hospital" }, { title: "Yearly files", note: "2005 to 2024" , icon: "file" }, { title: "Align columns", note: "Add a year column" , icon: "table" }, { title: "One Parquet file", note: "7.3 million rows" , icon: "check" }] }, "From the Commission's yearly releases to one file.", { wide: true }),
  cleaning: fig(Decode, { rows: [{ field: "Diagnosis", code: "47", meaning: "Fracture" }, { field: "Disposition", code: "4", meaning: "Admitted" }, { field: "Sex", code: "2", meaning: "Female" }, { field: "Product_1", code: "3235", meaning: "Pickleball" }] }, "Codes are stored as numbers; the NEISS coding manual says what each means."),
  uses: fig(Weights, { n: 64, left: "Rows in the file", right: "What each row stands for" }, "Illustration. Each sampled visit stands for many visits nationwide; sum the weights, not the rows.", { wide: true }),
  distribution: fig(Load, { lead: <Logo name="huggingface" decorative />, repo: "Layered-Labs/neiss-injury-data", terms: "Public records, US CPSC", code: 'pd.read_parquet("hf://datasets/Layered-Labs/neiss-injury-data/neiss_all.parquet")' }, "One file, one call.", { wide: true }),
  maintenance: fig(Steps, { steps: [{ title: "2005" , icon: "calendar" }, { title: "2010" , icon: "calendar" }, { title: "2015" , icon: "calendar" }, { title: "2020" , icon: "calendar" }, { title: "2024" , icon: "calendar" }] }, "The twenty years the file covers.", { wide: true }),
});
