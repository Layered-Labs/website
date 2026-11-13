#!/usr/bin/env node
// Scaffold a write-up for an existing work item.
//
//   npm run new-writeup -- <slug> [paper|software|datasheet]
//
// Creates, inside content/work/<slug>/:
//   writeup.ts               ties sections and animations together (starts as a draft)
//   sections/<key>.mdx       one per section, with a note on what belongs there
//   animations/<key>.tsx     one Remotion animation per animated section (a branded starter)
//   animations/index.tsx     registers the animations for the format
// and adds the write-up to the item's index.ts.
//
// Section lists come from lib/content/formats.ts, so the format stays defined in one place.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const [slug, formatArg] = process.argv.slice(2);

const fail = (msg) => {
  console.error(`new-writeup: ${msg}`);
  process.exit(1);
};

if (!slug) fail("usage: npm run new-writeup -- <slug> [paper|software|datasheet]");

const dir = join(root, "content/work", slug);
const indexPath = join(dir, "index.ts");
if (!existsSync(indexPath)) fail(`content/work/${slug}/index.ts not found. Add the item and list it in content/work/index.ts first.`);
if (existsSync(join(dir, "writeup.ts"))) fail(`content/work/${slug} already has a write-up.`);

const index = readFileSync(indexPath, "utf8");
const type = index.match(/type:\s*"(\w+)"/)?.[1];
const DEFAULT_FORMAT = { applied: "paper", tool: "software", dataset: "datasheet" };
const format = formatArg ?? DEFAULT_FORMAT[type];

// Read the section list for this format from formats.ts.
const formatsSrc = readFileSync(join(root, "lib/content/formats.ts"), "utf8");
const block = formatsSrc.match(new RegExp(`\\n  ${format}: \\{[\\s\\S]*?\\n  \\},`))?.[0];
if (!block) fail(`unknown format "${format}". Use paper, software or datasheet.`);
const sections = [...block.matchAll(/\{ key: "(\w+)", title: "([^"]+)"(, animated: false)? \}/g)].map((m) => ({
  key: m[1],
  title: m[2],
  animated: !m[3],
}));
const animated = sections.filter((s) => s.animated);

// What belongs in each section. Shown in the draft until replaced.
const GUIDE = {
  paper: {
    abstract: "State the question, what you did, the main result with its number, and why it matters, in one paragraph of about 150 words.",
    introduction: "Explain the problem in the clinic, what is already known, the gap, and the one question this work answers.",
    methods: "Describe the data, models, setup and metrics precisely enough that someone else could repeat the study.",
    results: "Report the findings with numbers. Lead with the main result, then the supporting ones. Put the three headline numbers in `highlights` in writeup.ts, and use `<Table>` (data in data/tables.ts) for the full results.",
    discussion: "Interpret the results: what they mean for patients and clinicians, how they compare with prior work, and what should change.",
    limitations: "List what this work does not show: sample size, data sources, models tested, and anything that could change the result.",
    availability: "Link the paper, data and code, and say how to reproduce the results.",
  },
  software: {
    summary: "Say what the tool does and who it is for, in two or three sentences.",
    need: "Explain the problem researchers face without this tool, and why existing tools do not solve it.",
    design: "Describe how the tool works: its main parts, its data model, and the decisions behind them.",
    usage: "Show how to install it and run the most common task, with a short code example.",
    validation: "Show that it works: tests, benchmarks, or results checked against a known reference.",
    limitations: "List what the tool does not do yet, and the cases where it can give wrong results.",
    availability: "Link the repository, package and documentation, and state the license.",
  },
  datasheet: {
    summary: "Say what the dataset contains, its size and the task it supports, and credit the original source by name.",
    motivation: "Explain why this version exists and which problem in the original data it fixes for other researchers.",
    composition: "Describe what each record is, the fields, the counts and the splits.",
    collection: "Credit the original source: who collected it, when, how, and under what license.",
    cleaning: "List every change made to the original: removed records, fixed labels, new annotations, and how each was checked.",
    uses: "Describe the tasks it suits, and the uses it should not be put to.",
    distribution: "Say where it is hosted, the license, and how to load it, with a short code example.",
    maintenance: "Say who maintains it, how to report problems, and how versions are tracked.",
  },
};

const pascal = (s) => s.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
const today = new Date().toISOString().slice(0, 10);

mkdirSync(join(dir, "sections"), { recursive: true });
mkdirSync(join(dir, "animations"), { recursive: true });

sections.forEach(({ key, title, animated: hasAnimation }, i) => {
  writeFileSync(join(dir, "sections", `${key}.mdx`), `${GUIDE[format][key]}\n`);
  if (!hasAnimation) return;
  writeFileSync(
    join(dir, "animations", `${key}.tsx`),
    `import { StarterAnimation } from "@/components/writeup/starter-animation";

// Replace with an animation of what this section does. Its last frame is the static figure.
export default function ${pascal(key)}() {
  return <StarterAnimation label="${title}" index={${i + 1}} />;
}
`,
  );
});

writeFileSync(
  join(dir, "animations", "index.tsx"),
  `"use client";

import { defineAnimations } from "@/components/writeup/animation-player";
import { STARTER_SECONDS } from "@/components/writeup/starter-animation";
${animated.map(({ key }) => `import ${pascal(key)} from "./${key}";`).join("\n")}

export default defineAnimations("${format}", {
${animated.map(({ key }) => `  ${key}: { component: ${pascal(key)}, seconds: STARTER_SECONDS },`).join("\n")}
});
`,
);

writeFileSync(
  join(dir, "writeup.ts"),
  `import { defineWriteup } from "@/lib/content/types";
import Animation from "./animations";
${sections.map(({ key }) => `import ${pascal(key)} from "./sections/${key}.mdx";`).join("\n")}

export default defineWriteup({
  format: "${format}",
  // Remove when ready: drafts render in development only.
  draft: true,
  published: "${today.slice(0, 7)}",
  sections: {
${sections.map(({ key }) => `    ${key}: ${pascal(key)},`).join("\n")}
  },
  Animation,
});
`,
);

const patched = index
  .replace(/(import \{ defineItem \} from "@\/lib\/content\/types";\n)/, `$1import writeup from "./writeup";\n`)
  .replace(/\n\}\);\s*$/, `\n  writeup,\n});\n`);
if (patched === index || !patched.includes("writeup,")) fail(`could not add the write-up to ${indexPath}; add it by hand.`);
writeFileSync(indexPath, patched);

console.log(`Created a ${format} write-up draft for ${slug} with ${sections.length} sections.`);
console.log(`Preview it at http://localhost:3000/work/${slug} while npm run dev is running.`);
