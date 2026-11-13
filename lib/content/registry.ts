import { WORK_ITEMS } from "@/content/work";
import type { WorkItem, WorkType } from "./types";

const isDev = process.env.NODE_ENV === "development";

/** Every item, in the order the site lists them. */
export const WORK: WorkItem[] = WORK_ITEMS;

/** True when the item's write-up page should exist in this environment. */
export function hasWriteup(item: WorkItem): boolean {
  return Boolean(item.writeup && (!item.writeup.draft || isDev));
}

export function getItem(slug: string): WorkItem | undefined {
  return WORK.find((w) => w.slug === slug);
}

/** Where a row or card links: the write-up when live, else the external page. */
export function itemHref(item: WorkItem): string | undefined {
  return hasWriteup(item) ? `/work/${item.slug}` : item.href;
}

/** Plain data for client components (no MDX or animation code). */
export type WorkRow = { slug: string; type: WorkType; claim: string; summary: string; href?: string };

export function workRows(): WorkRow[] {
  return WORK.map((w) => ({ slug: w.slug, type: w.type, claim: w.claim, summary: w.summary, href: itemHref(w) }));
}
