import { ENTRIES, GROUPS } from "@/lib/entries";

export function WorkSections() {
  return (
    <div className="areas">
      {GROUPS.map((g) => {
        const items = ENTRIES.filter((e) => e.group === g.key);
        return (
          <section className="area" key={g.key} aria-labelledby={`area-${g.key}`}>
            <div className="area-side">
              <h3 id={`area-${g.key}`}>
                <span className={`dot ${g.color}`} aria-hidden="true" />
                {g.title}
              </h3>
              <p className="muted">{g.blurb}</p>
            </div>
            <ul className="area-list">
              {items.map((e) => (
                <li key={e.title}>
                  <h4>
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noopener noreferrer">{e.title}</a>
                    ) : (
                      e.title
                    )}
                  </h4>
                  <p className="area-desc">{e.description}</p>
                  {e.status && <span className={`tag ${e.pending ? "yellow" : g.color}`}>{e.status}</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
