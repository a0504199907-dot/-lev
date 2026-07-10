import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { BoardSection } from "@/components/site/BoardSection";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { ArchiveGallery } from "@/components/site/ArchiveGallery";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BoardSection />
        <HowItWorks />
        <ClientsMarquee />
        <ArchiveGallery />
      </main>
      <Footer />
    </>
  );
}
