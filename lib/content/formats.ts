// Write-up formats. The format follows what the work is, not which filter it
// sits under: a finding is a paper, software is a software paper, data is a
// datasheet, an app people can open is an app write-up. Section keys are also the anchor ids and the file names in
// sections/ and animations/. Every section has an animation unless it is
// marked `animated: false`.

export const FORMATS = {
  paper: {
    label: "Paper",
    sections: [
      { key: "abstract", title: "Abstract", animated: false },
      { key: "introduction", title: "Introduction" },
      { key: "methods", title: "Methods" },
      { key: "results", title: "Results" },
      { key: "discussion", title: "Discussion" },
      { key: "limitations", title: "Limitations" },
      { key: "availability", title: "Availability" },
    ],
  },
  software: {
    label: "Software",
    sections: [
      { key: "summary", title: "Summary", animated: false },
      { key: "need", title: "Statement of need" },
      { key: "design", title: "Design" },
      { key: "usage", title: "Usage" },
      { key: "validation", title: "Validation" },
      { key: "limitations", title: "Limitations" },
      { key: "availability", title: "Availability" },
    ],
  },
  datasheet: {
    label: "Datasheet",
    sections: [
      { key: "summary", title: "Summary", animated: false },
      { key: "motivation", title: "Motivation" },
      { key: "composition", title: "Composition" },
      { key: "collection", title: "Collection" },
      { key: "cleaning", title: "Cleaning and labels" },
      { key: "uses", title: "Uses" },
      { key: "distribution", title: "Distribution" },
      { key: "maintenance", title: "Maintenance" },
    ],
  },
  app: {
    label: "Application",
    // A short write-up beside the app itself. Only How it works has a figure:
    // the app in use.
    sections: [
      { key: "summary", title: "Summary", animated: false },
      { key: "how", title: "How it works" },
      { key: "privacy", title: "Privacy", animated: false },
      { key: "limitations", title: "Limitations", animated: false },
    ],
  },
} as const;

export type Format = keyof typeof FORMATS;
type SectionOf<F extends Format> = (typeof FORMATS)[F]["sections"][number];

export type SectionKey<F extends Format> = SectionOf<F>["key"];

/** Sections that must have an animation. */
export type AnimatedKey<F extends Format> = Exclude<SectionOf<F>, { animated: false }>["key"];

export type SectionDef = { key: string; title: string; animated?: boolean };

export const isAnimated = (section: SectionDef) => section.animated !== false;
