import type { ComponentType } from "react";
import type { MDXContent } from "mdx/types";
import type { AnimatedKey, Format, SectionKey } from "./formats";

export type WorkType = "applied" | "tool" | "dataset";

export const TYPES: { key: WorkType; label: string; lit: 0 | 1 | 2 }[] = [
  { key: "applied", label: "Applied", lit: 0 },
  { key: "tool", label: "Tools", lit: 1 },
  { key: "dataset", label: "Datasets", lit: 2 },
];
export const TYPE_LIT: Record<WorkType, 0 | 1 | 2> = { applied: 0, tool: 1, dataset: 2 };
export const TYPE_LABEL: Record<WorkType, string> = { applied: "Applied", tool: "Tools", dataset: "Datasets" };

export type ActionLink = { label: string; href: string };

/**
 * One of the key facts shown under the title: a short value and one short
 * line, never a sentence. A paper shows results, a tool its scope, a dataset
 * its size, use and license. Mark at most one `lime`.
 */
/** A month, "YYYY-MM". Days are never shown on the site, so they are not stored. */
export type MonthDate = `${number}-${number}`;

export type Highlight = { value: string; label: string; lime?: boolean };

export type Writeup<F extends Format = Format> = {
  format: F;
  /**
   * Drafts render in development only. In production the item keeps linking
   * to its `href` until the flag is removed.
   */
  draft?: boolean;
  /** Write-up title. Defaults to the item's claim. */
  title?: string;
  /** Month only, "YYYY-MM". Pages never show a day. */
  published: MonthDate;
  /** Month only, "YYYY-MM". */
  updated?: MonthDate;
  /** Buttons in the last section, e.g. Read the paper, Get the data, Code. */
  links?: ActionLink[];
  /** The item's own logo (a path under public/), shown above the title. Most items have none. */
  logo?: string;
  /** Up to three key facts shown under the title. Leave out to show none. */
  highlights?: [Highlight] | [Highlight, Highlight] | [Highlight, Highlight, Highlight];
  /** One MDX file per section of the format. Missing or extra keys fail the build. */
  sections: Record<SectionKey<F>, MDXContent>;
  /** Client component from animations/index.tsx that renders one animated section's animation. */
  Animation: ComponentType<{ section: AnimatedKey<F> }>;
};

export type AnyWriteup = { [F in Format]: Writeup<F> }[Format];

/**
 * An application people can open and use. An item with `app` is listed with the
 * app's icon and an Open link beside Read, and its write-up page wears the
 * app's own colours instead of the site's.
 */
export type AppInfo = {
  name: string;
  /** Square app icon under public/. */
  icon: string;
  /** Where the app runs. */
  url: string;
  /** The app's brand colours: accent for links and buttons, soft for highlights, ink for text. */
  colors: { accent: string; soft: string; ink: string };
  /** Optional mark, one path per part, shown as a calm animated band at the top of the write-up. */
  mark?: AppMark;
};

/** An app's mark as separate parts, so each part can animate on its own. */
export type AppMark = { viewBox: string; paths: string[] };

export type WorkItem = {
  slug: string;
  type: WorkType;
  /** The finding or purpose, as the row title and default write-up title. */
  claim: string;
  /** One sentence on what was done. */
  summary: string;
  /** External page (dataset, demo, repo). Used until a write-up is live. */
  href?: string;
  writeup?: AnyWriteup;
  /** Set when the work is an app people can open (see AppInfo). */
  app?: AppInfo;
};

/** Ties a write-up together; infers the format so section keys are checked. */
export function defineWriteup<F extends Format>(writeup: Writeup<F>): Writeup<F> {
  return writeup;
}

export function defineItem(item: WorkItem): WorkItem {
  return item;
}
