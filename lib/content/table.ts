import type { ModelId } from "./models";

// Every table in a write-up is data, not Markdown, and renders through one
// component (components/writeup/table.tsx), so they all look the same.

export type TableColumn =
  | string
  | {
      label: string;
      /** Numbers align right (the default); set "left" for text columns. */
      align?: "left" | "right";
      /** Secondary values, such as confidence intervals, in grey. */
      dim?: boolean;
    };

/** A group heading: a short bold title, then an optional grey note on the same line. */
export type TableGroup = { title: string; note?: string };

export type TableRow = {
  /** First column. With `model`, it shows the model's logo. */
  label: string;
  /** Tints the row in this model's colour, with a bar of that colour on the left. */
  model?: ModelId;
  /** The one row that matters: lime tint and bar. Use once per table at most. */
  highlight?: boolean;
  cells: string[];
  /**
   * Rows sharing a group get one heading row above them. Put values that are
   * the same for every row of the group in its note, not in a column.
   */
  group?: string | TableGroup;
};

export type TableData = {
  /** Heading of the first column. */
  first: string;
  columns: TableColumn[];
  rows: TableRow[];
  /** Caption under the table, after an automatic "Table N." */
  caption: string;
};
