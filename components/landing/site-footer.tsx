import { Mark } from "./mark";

export function SiteFooter() {
  return (
    <footer className="ftr dk">
      <div className="wrap ftr-in">
        <div className="ftr-top">
          <div className="ftr-brand">
            <span className="ftr-name">
              <Mark color="#FFFFFF" />
              Layered Labs
            </span>
            <span className="ftr-tag">Applied AI safety research for medicine, based in New York City.</span>
          </div>
          <div className="ftr-cols">
            <div className="ftr-col">
              <span className="mono">Work</span>
              <a href="/#all-work">All work</a>
              <a href="/#applied">Applied</a>
              <a href="/#datasets">Datasets</a>
              <a href="/#tools">Tools</a>
            </div>
            <div className="ftr-col">
              <span className="mono">Contact</span>
              <a href="mailto:hello@layeredlabs.ai">Work with us</a>
              <a href="mailto:hello@layeredlabs.ai">hello@layeredlabs.ai</a>
              <a href="https://huggingface.co/Layered-Labs">Hugging Face</a>
            </div>
          </div>
        </div>
        <div className="ftr-legal">
          <span>© {new Date().getFullYear()} Layered Labs</span>
          <span>layeredlabs.ai · New York City</span>
        </div>
      </div>
      <div aria-hidden="true" className="wrap ftr-big">
        <Mark color="#1C1C1C" />
        Layered Labs
      </div>
    </footer>
  );
}
