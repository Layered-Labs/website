import Image from "next/image";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "GitHub", href: "https://github.com/layered-labs" },
];

export function SiteHeader({ current }: { current?: "/" }) {
  return (
    <div className="wrap">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Layered Labs home">
          <Image src="/logo-dark.svg" alt="" width={16} height={16} />
          <span className="l1">Layered</span>
          <span className="l2">Labs</span>
        </a>
        <nav className="site-nav" aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-current={current === l.href ? "page" : undefined}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
          <a className="pill-btn dark" href="mailto:hello@layeredlabs.ai">Join us</a>
        </nav>
      </header>
    </div>
  );
}

export function SiteFooter() {
  return (
    <div className="wrap">
      <footer className="site-footer">
        <span>Layered Labs · New York City</span>
        <a href="mailto:hello@layeredlabs.ai">hello@layeredlabs.ai</a>
      </footer>
    </div>
  );
}
