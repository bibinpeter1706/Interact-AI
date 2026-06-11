import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MeshCanvas from "@/components/MeshCanvas";
import DoodleBackground from "@/components/DoodleBackground";
import UnifiedContourBackground from "@/components/UnifiedContourBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden relative">
      <DoodleBackground />
      <Navbar />
      <Hero />
      <hr className="border-none border-t border-mint/10 m-0" />
      <Features />
      <hr className="border-none border-t border-mint/10 m-0" />
      <Solutions />
      <hr className="border-none border-t border-mint/10 m-0" />
      <Demo />
      <hr className="border-none border-t border-mint/10 m-0" />
      <div className="relative">
        <UnifiedContourBackground />
        <Pricing />
        <Testimonials />
      </div>
      <hr className="border-none border-t border-mint/10 m-0" />
      <Contact />
      <Footer />
    </main>
  );
}
