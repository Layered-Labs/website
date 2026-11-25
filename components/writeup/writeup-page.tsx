import type { ComponentType, CSSProperties } from "react";
import type { MDXContent } from "mdx/types";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { FORMATS, isAnimated, type SectionDef } from "@/lib/content/formats";
import { TYPE_LABEL, type AnyWriteup, type WorkItem } from "@/lib/content/types";
import { AppHero } from "./app-hero";
import { Highlights } from "./highlights";

// "YYYY-MM" as "November 2026". Pages show the month, never the day.
const formatDate = (month: string) =>
  new Date(`${month.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * One template for every write-up. The format decides the sections; the item
 * folder supplies each section's MDX and animation.
 */
export function WriteupPage({ item, writeup: w }: { item: WorkItem; writeup: AnyWriteup }) {
  const format = FORMATS[w.format];
  const sections = format.sections as readonly SectionDef[];
  const bodies = w.sections as Record<string, MDXContent>;
  const Animation = w.Animation as ComponentType<{ section: string }>;
  const app = item.app;
  // Apps wear their own colours on their write-up (see AppInfo).
  const appColors = app
    ? ({ "--app-accent": app.colors.accent, "--app-soft": app.colors.soft, "--app-ink": app.colors.ink } as CSSProperties)
    : undefined;
  const logo = w.logo ?? app?.icon;

  return (
    <>
      <SiteHeader />
      <main id="main">
        {app?.mark && <AppHero mark={app.mark} accent={app.colors.accent} soft={app.colors.soft} />}
        <article className={app ? "wrap wu wu-grid wu-app" : "wrap wu wu-grid"} style={appColors}>
          <header className="wu-head">
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="wu-logo" src={logo} alt="" aria-hidden="true" />
            )}
            <p className="wu-kicker">
              <a href="/#work">{TYPE_LABEL[item.type]}</a>
              <span>{formatDate(w.published)}</span>
            </p>
            <h1>{w.title ?? item.claim}</h1>
            {app && (
              <a className="wu-open" href={app.url}>
                Open {app.name} <span aria-hidden="true">↗</span>
              </a>
            )}
            <nav className="wu-actions" aria-label="Contents and links">
              {sections.map((s) => (
                <a key={s.key} href={`#${s.key}`}>
                  {s.title}
                </a>
              ))}
            </nav>
          </header>

          {w.highlights && <Highlights items={w.highlights} />}

          {sections.map((s, i) => {
            const Body = bodies[s.key];
            const last = i === sections.length - 1;
            return (
              <section id={s.key} className="sec" key={s.key}>
                <h2 className="sh">
                  <em>{i + 1}</em>
                  {s.title}
                </h2>
                {isAnimated(s) && <Animation section={s.key} />}
                <div className="prose">
                  <Body />
                </div>
                {last && (
                  <>
                    {w.links && w.links.length > 0 && (
                      <p className="wu-endlinks">
                        {w.links.map((l) => (
                          <a key={l.href} href={l.href}>
                            {l.label}
                          </a>
                        ))}
                      </p>
                    )}
                    <p className="wu-note">
                      Living draft{w.updated ? `, updated ${formatDate(w.updated)}` : ""}. This page can change before
                      formal publication.
                      {w.draft && " Draft: visible in development only."}
                    </p>
                  </>
                )}
              </section>
            );
          })}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
