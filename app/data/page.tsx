import { DataTable } from "@/components/ui/data-table";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getClinicRows } from "@/lib/nyc-clinic";

export const metadata = {
  title: "Data · Layered Labs",
  description:
    "NYC Clinic AI-readiness data: broadband access, power reliability, and cost to run local open-source models in the clinic, per ZIP code.",
};

export default async function DataPage() {
  const rows = await getClinicRows();

  return (
    <>
      <SiteHeader current="/data" />
      <main id="main" className="wrap">
        <div className="page-head">
          <h1>NYC Clinic AI-readiness</h1>
          <p className="lede">
            Can a clinic actually run open-source AI locally? We score every NYC ZIP code on the raw inputs that
            decide it: broadband access, grid reliability, and the monthly cost of a machine to serve a model.
          </p>
        </div>
        <p className="small muted" style={{ maxWidth: "46rem", margin: "1.6rem 0 1.2rem" }}>
          To run on-device AI you need fiber and a reliable grid. Numbers are per ZIP from the{" "}
          <a
            href="https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure"
            target="_blank"
            rel="noopener noreferrer"
          >
            full dataset
          </a>
          .
        </p>
        <DataTable rows={rows} />
      </main>
      <SiteFooter />
    </>
  );
}
