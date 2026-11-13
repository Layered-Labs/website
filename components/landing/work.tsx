import { workRows } from "@/lib/content/registry";
import { AllWork } from "./all-work";
import { SelectedWork } from "./selected-work";

export function Work() {
  return (
    <section id="work" className="wrap work">
      <h2 className="sech">Selected work</h2>
      <SelectedWork />
      <h2 id="all-work" className="sech sech-gap">
        All work
      </h2>
      <AllWork items={workRows()} />
    </section>
  );
}
