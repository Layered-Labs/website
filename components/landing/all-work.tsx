"use client";

import { Fragment, useEffect, useState } from "react";
import type { WorkRow } from "@/lib/content/registry";
import { TYPES, TYPE_LABEL, TYPE_LIT, type WorkType } from "@/lib/content/types";
import { Mark } from "./mark";

type Filter = "all" | WorkType;

// Footer links use these hashes to open the list on one type.
const HASH_TO_FILTER: Record<string, Filter> = {
  "#all-work": "all",
  "#applied": "applied",
  "#tools": "tool",
  "#datasets": "dataset",
};

export function AllWork({ items: all }: { items: WorkRow[] }) {
  const filters: { key: Filter; label: string; lit?: 0 | 1 | 2; count: number }[] = [
    { key: "all", label: "All", count: all.length },
    ...TYPES.map((t) => ({ key: t.key, label: t.label, lit: t.lit, count: all.filter((w) => w.type === t.key).length })),
  ];
  const [filter, setFilter] = useState<Filter>("all");
  // Rows animate in only after the visitor changes the filter, never on first load.
  const [animate, setAnimate] = useState(false);
  const choose = (next: Filter) => {
    setAnimate(true);
    setFilter(next);
  };

  useEffect(() => {
    const fromHash = () => {
      const next = HASH_TO_FILTER[window.location.hash];
      if (!next) return;
      choose(next);
      document.getElementById("all-work")?.scrollIntoView();
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const items = filter === "all" ? all : all.filter((w) => w.type === filter);

  return (
    <div>
      <div className="chips" role="radiogroup" aria-label="Filter work">
        {filters.map((f) => (
          <Fragment key={f.key}>
            <input
              className="fr"
              type="radio"
              name="work-filter"
              id={`f-${f.key}`}
              checked={filter === f.key}
              onChange={() => choose(f.key)}
            />
            <label htmlFor={`f-${f.key}`}>
              <Mark className="cg" lit={f.lit} />
              {f.label} <span className="mono">{f.count}</span>
            </label>
          </Fragment>
        ))}
      </div>
      {/* A new key per filter remounts the rows so their enter animation replays. */}
      <div className={animate ? "ixl ixl-anim" : "ixl"} key={filter}>
        {items.map((item, i) => {
          const order = { "--i": i } as React.CSSProperties;
          if (item.app) {
            // An app: its own icon, a link into the app, and Read for the write-up.
            const app = item.app;
            return (
              <div className="ix ix-app" key={item.slug} style={{ ...order, "--app-accent": app.accent } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="lg lg-app" src={app.icon} alt={app.name} />
                <span className="ixb">
                  {/* Apps lead with their name, so people know what it is called. */}
                  {item.href ? (
                    <a className="ixc" href={item.href}>
                      <strong className="ixname">{app.name}:</strong> {item.claim}
                    </a>
                  ) : (
                    <span className="ixc">
                      <strong className="ixname">{app.name}:</strong> {item.claim}
                    </span>
                  )}
                  <span className="ixs">{item.summary}</span>
                </span>
                <span className="ixacts">
                  <a className="ixopen" href={app.url}>
                    Open {app.name} <span aria-hidden="true">↗</span>
                  </a>
                  {item.href && (
                    <a className="ixgo" href={item.href}>
                      Read <span aria-hidden="true">→</span>
                    </a>
                  )}
                </span>
              </div>
            );
          }
          const body = (
            <>
              <Mark className="lg" lit={TYPE_LIT[item.type]} label={TYPE_LABEL[item.type]} />
              <span className="ixb">
                <span className="ixc">{item.claim}</span>
                <span className="ixs">{item.summary}</span>
              </span>
            </>
          );
          return item.href ? (
            <a className="ix" href={item.href} key={item.slug} style={order}>
              {body}
              <span className="ixgo">
                Read <span aria-hidden="true">→</span>
              </span>
            </a>
          ) : (
            <div className="ix" key={item.slug} style={order}>
              {body}
            </div>
          );
        })}
      </div>
    </div>
  );
}
