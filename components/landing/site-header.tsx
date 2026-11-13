import { Mark } from "./mark";

export function SiteHeader() {
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <a href="/" className="brand">
          <Mark color="#0D0D0D" />
          Layered Labs
        </a>
        <nav aria-label="Main" className="nav">
          <a href="/#work">Work</a>
          <a href="/#contact">Mission</a>
          <a href="https://huggingface.co/Layered-Labs">Hugging Face</a>
          <a href="mailto:hello@layeredlabs.ai" className="btn">
            Work with us
          </a>
        </nav>
      </div>
    </header>
  );
}
