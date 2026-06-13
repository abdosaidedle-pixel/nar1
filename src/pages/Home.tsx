import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CollectionSection from "@/components/sections/CollectionSection";
import DropSection from "@/components/sections/DropSection";
import AboutSection from "@/components/sections/AboutSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import WhyNarSection from "@/components/sections/WhyNarSection";
import GallerySection from "@/components/sections/GallerySection";
import OrderSection from "@/components/sections/OrderSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    import("lenis").then(({ default: Lenis }) => {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      setLenis(lenisInstance);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden w-full selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <CollectionSection />
        <DropSection />
        <AboutSection />
        <ShowcaseSection />
        <WhyNarSection />
        <GallerySection />
        <OrderSection />
      </main>
      <Footer />
    </div>
  );
}
