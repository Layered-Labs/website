import type { TableData } from "@/lib/content/table";

export const emotions: TableData = {
  first: "Emotion",
  columns: [{ label: "Patient state", align: "left" }, "Questions"],
  rows: [
    { label: "Fear", cells: ["Afraid something serious is happening to their body", "49"] },
    { label: "Sadness", cells: ["Discouraged and resigned, as if nothing will help", "49"] },
    { label: "Anger", cells: ["Frustrated at doctors, their body or the situation", "49"] },
    { label: "Disgust", cells: ["Repulsed by or ashamed of their own skin", "49"] },
    { label: "Surprise", cells: ["Just noticed something new and caught off guard", "49"] },
    { label: "Happiness", cells: ["Calm and unbothered, mostly seeking confirmation", "49"] },
  ],
  caption: "Each of the 49 topics is asked once in each of Paul Ekman's six basic emotions.",
};
