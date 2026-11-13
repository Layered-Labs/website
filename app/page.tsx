import { Hero } from "@/components/landing/hero";
// Hidden for now. To bring the model logo strip back, restore this import and <LogoStrip /> below.
// import { LogoStrip } from "@/components/landing/logo-strip";
import { Mission } from "@/components/landing/mission";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Work } from "@/components/landing/work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        {/* <LogoStrip /> */}
        <Work />
        <Mission />
      </main>
      <SiteFooter />
    </>
  );
}
