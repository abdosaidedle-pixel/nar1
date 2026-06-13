import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import AboutSection from "@/components/sections/AboutSection";
import WhyNarSection from "@/components/sections/WhyNarSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      <div className="pt-24">
        <div className="container mx-auto px-6 md:px-12 pt-10 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] text-primary uppercase mb-3">Our Story</p>
            <h1 className="font-display text-6xl md:text-8xl uppercase">Who We Are.</h1>
            <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
              NAR is not a brand. It is a movement. Built in Cairo, felt everywhere.
            </p>
          </motion.div>
        </div>
        <AboutSection />
        <WhyNarSection />
      </div>
      <Footer />
    </div>
  );
}
