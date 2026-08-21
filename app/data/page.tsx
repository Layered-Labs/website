import { BlurFade } from "@/components/ui/blur-fade";
import { DataTable } from "@/components/ui/data-table";
import { getClinicRows } from "@/lib/nyc-clinic";

export const metadata = {
  title: "Data · Layered Labs",
  description:
    "NYC Clinic AI-readiness data: broadband access, power reliability, and cost to run local open-source models in the clinic, per ZIP code.",
};

export default async function DataPage() {
  const rows = await getClinicRows();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-800/10 blur-[130px]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <BlurFade delay={0.05} duration={0.5}>
            <p
              className="text-xs tracking-[0.25em] text-lime-300 uppercase"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 500 }}
            >
              Data
            </p>
          </BlurFade>
          <BlurFade delay={0.15} duration={0.6}>
            <h1
              className="mt-4 max-w-3xl text-4xl text-white md:text-5xl"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 200 }}
            >
              NYC Clinic AI-readiness
            </h1>
          </BlurFade>
          <BlurFade delay={0.25} duration={0.6}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 400 }}>
              Can a clinic actually run open-source AI locally? We score every
              NYC ZIP code on the raw inputs that decide it — broadband access,
              grid reliability, and the real monthly cost of a machine to serve
              a model.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Table */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <BlurFade delay={0.05} duration={0.5}>
            <p className="mb-6 text-sm text-white/50"
              style={{ fontFamily: "var(--font-satoshi)", fontWeight: 400 }}>
              Most disadvantaged? No internet (%). To run on-device AI you need
              fiber and a reliable grid. Numbers are per ZIP from the{" "}
              <a
                href="https://huggingface.co/datasets/Layered-Labs/nyc-clinic-ai-infrastructure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-300 underline decoration-lime-300/40 underline-offset-4 hover:text-lime-200"
              >
                full dataset
              </a>
              .
            </p>
          </BlurFade>
          <BlurFade delay={0.1} duration={0.5}>
            <DataTable rows={rows} />
          </BlurFade>
        </div>
      </section>
    </div>
  );
}