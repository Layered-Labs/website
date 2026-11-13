"use client";

import { Logo } from "@/components/landing/logos";
import { Faces, Fields, Grid, Load, Steps, TileRows, fig } from "@/components/writeup/anim/figures";
import { defineAnimations } from "@/components/writeup/animation-player";

export default defineAnimations("datasheet", {
  motivation: fig(TileRows, { tile: "photo", per: 10, rows: [{ label: "This release", note: "1,457 photographs", total: 1457, marked: 0 }, { label: "Smallest copy on the Hub", note: "394 photographs", total: 394, marked: 0 }] }, "Each tile is ten photographs. Some earlier copies held barely a quarter of the dataset.", { wide: true }),
  composition: fig(Faces, { faces: [{ label: "Mild", lesions: 6, note: "513 images" }, { label: "Moderate", lesions: 14, note: "633 images" }, { label: "Severe", lesions: 26, note: "182 images" }, { label: "Very severe", lesions: 44, note: "129 images" }] }, "The four Hayashi severity grades, with the number of photographs in each. Faces are drawn for illustration.", { wide: true }),
  collection: fig(Steps, { steps: [{ title: "Classification archive", note: "Images and severity grades" , icon: "archive" }, { title: "Detection archive", note: "Lesion boxes, Pascal VOC" , icon: "archive" }, { title: "Join on file name", note: "One row per image" , icon: "table" }, { title: "One dataset", note: "1,457 rows, nothing dropped" , icon: "check" }] }, "The two original archives, joined row by row.", { wide: true }),
  cleaning: fig(Fields, { preview: "face", fields: [{ name: "image", type: "Image" }, { name: "level", type: "int 0 to 3", primary: true }, { name: "severity", type: "string" }, { name: "lesion_boxes", type: "boxes" }, { name: "num_lesions_annotated", type: "int" }, { name: "lesion_count_label", type: "int" }, { name: "split", type: "fold 0" }, { name: "fold_0_split ... fold_4_split", type: "train or test" }] }, "The columns of each row. The severity level is the primary label.", { wide: true }),
  uses: fig(Grid, { total: 1457, marked: 292, cols: 50, label: "test images in the canonical split", seed: 11 }, "The canonical fold 0 split holds out 292 of the 1,457 images for testing."),
  distribution: fig(Load, { lead: <Logo name="huggingface" decorative />, repo: "Layered-Labs/ACNE04", terms: "Academic research only", code: 'load_dataset("Layered-Labs/ACNE04")' }, "One call loads every image with its labels.", { wide: true }),
  maintenance: fig(Faces, { faces: [{ label: "One photograph", lesions: 18 }], boxes: true }, "Every lesion carries the box the original annotators drew; 18,983 boxes across the dataset. Drawn for illustration."),
});
