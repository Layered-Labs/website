"use client";

import { Logo } from "@/components/landing/logos";
import { Fields, Load, Merge, Split, Steps, TileRows, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";

export default defineAnimations("datasheet", {
  motivation: fig(Merge, { files: ["Images, part 1", "Part 2", "Part 3", "Part 4", "Label table", "Box files"], into: "One dataset", note: "Joined by file name" }, "Four image archives and two label files, joined into one dataset.", { wide: true }),
  composition: fig(Split, { people: 60, bins: [{ label: "Train", share: 0.7, note: "4,264 children" }, { label: "Validation", share: 0.15, note: "914 children" }, { label: "Test", share: 0.15, note: "913 children" }] }, "Each child, with all of their X-rays, goes to exactly one split. Dots stand for children.", { wide: true }),
  collection: fig(Steps, { steps: [{ title: "Figshare archives", note: "Images, 16 GB" , icon: "archive" }, { title: "Label table", note: "Fracture, AO code, flags" , icon: "table" }, { title: "YOLO box files", note: "Nine finding types" , icon: "image" }, { title: "Join on file name", note: "One row per X-ray" , icon: "table" }, { title: "Split by patient", note: "Fixed seed" , icon: "split" }] }, "From the original release to one dataset.", { wide: true }),
  cleaning: fig(Fields, { preview: "xray", fields: [{ name: "image", type: "16-bit PNG" }, { name: "fracture_visible", type: "0 or 1", primary: true }, { name: "ao_classification", type: "string" }, { name: "bboxes", type: "9 types" }, { name: "patient_id", type: "int" }, { name: "age_years", type: "float" }, { name: "has_cast", type: "0 or 1" }, { name: "has_metal", type: "0 or 1" }, { name: "has_osteopenia", type: "0 or 1" }, { name: "has_confound", type: "0 or 1" }] }, "Some of the columns of each row. The fracture label is primary.", { wide: true }),
  uses: fig(TileRows, { tile: "xray", per: 100, rows: [{ label: "Train", note: "66.8% show a fracture", total: 14234, marked: 9508 }, { label: "Validation", note: "66.7%", total: 3127, marked: 2086 }, { label: "Test", note: "66.1%", total: 2966, marked: 1961 }] }, "Each tile is 100 X-rays; lime tiles show a fracture. The share is nearly the same in every split.", { wide: true }),
  distribution: fig(Load, { lead: <Logo name="huggingface" decorative />, repo: "Layered-Labs/clearwrist-pediatric-wrist-xray", terms: "CC BY 4.0", code: 'load_dataset("Layered-Labs/clearwrist-pediatric-wrist-xray")' }, "One call loads every X-ray with its labels and boxes.", { wide: true }),
  maintenance: fig(Steps, { steps: [{ title: "v1.0", note: "First release" , icon: "box" }, { title: "v1.0.1", note: "Training images fixed" , icon: "image" }, { title: "v1.1", note: "Boxes added" , icon: "tag" }, { title: "v1.2", note: "Named ClearWrist" , icon: "check" }] }, "Every release, from the dataset's changelog.", { wide: true }),
});
