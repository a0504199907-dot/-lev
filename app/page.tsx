import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Ticker } from "@/components/site/Ticker";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Packages } from "@/components/site/Packages";
import { Testimonials } from "@/components/site/Testimonials";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { ArchiveGallery } from "@/components/site/ArchiveGallery";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <HowItWorks />
        <Packages />
        <Testimonials />
        <ClientsMarquee />
        <ArchiveGallery />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
