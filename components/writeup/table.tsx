import { Fragment, type CSSProperties } from "react";
import { MODELS } from "@/lib/content/models";
import type { TableData, TableGroup, TableRow } from "@/lib/content/table";
import { InViewFigure } from "./in-view";
import { ModelLogo } from "./model";

const LIME = "#C6F432";

const asGroup = (g: string | TableGroup): TableGroup => (typeof g === "string" ? { title: g } : g);
const groupKey = (g?: string | TableGroup) => (g === undefined ? "" : asGroup(g).title);

function rowStyle(row: TableRow, i: number): CSSProperties {
  if (row.highlight) return { "--i": i, "--c": LIME, "--tint": "#F6FBE3" } as CSSProperties;
  if (row.model) return { "--i": i, "--c": MODELS[row.model].color } as CSSProperties;
  return { "--i": i } as CSSProperties;
}

/**
 * The table for every write-up, in the ortho page's style. Rows with a model
 * show its logo and are tinted in its colour; a `highlight` row is lime; other
 * rows are light grey.
 */
export function Table({ data }: { data: TableData }) {
  const { first, rows, caption } = data;
  const columns = data.columns.map((c) => (typeof c === "string" ? { label: c } : c));
  const cls = (c: (typeof columns)[number]) =>
    [c.align === "left" ? "" : "r", c.dim ? "dim" : ""].filter(Boolean).join(" ") || undefined;
  return (
    <InViewFigure className="dtbl-fig">
      <div className="tbl-wrap">
        <table className="tbl dtbl">
          <thead>
            <tr>
              <th>{first}</th>
              {columns.map((c) => (
                <th key={c.label} className={c.align === "left" ? undefined : "r"}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const group = row.group === undefined ? undefined : asGroup(row.group);
              const newGroup = group && group.title !== groupKey(rows[i - 1]?.group);
              return (
                <Fragment key={`${groupKey(row.group)}-${row.label}`}>
                  {newGroup && (
                    <tr className="dtbl-group" style={{ "--i": i } as CSSProperties}>
                      <td colSpan={columns.length + 1}>
                        <b>{group.title}</b>
                        {group.note && <span>{group.note}</span>}
                      </td>
                    </tr>
                  )}
                  <tr className={[row.highlight && "dtbl-hi", (row.model || row.highlight) && "dtbl-c"].filter(Boolean).join(" ") || undefined} style={rowStyle(row, i)}>
                    <td>
                      <span className="dtbl-label">
                        {row.model && <ModelLogo model={row.model} className="dtbl-logo" />}
                        {row.label}
                      </span>
                    </td>
                    {row.cells.map((cell, j) => (
                      <td key={columns[j].label} className={cls(columns[j])}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption className="wu-cap wu-cap-tbl">{caption}</figcaption>
    </InViewFigure>
  );
}
