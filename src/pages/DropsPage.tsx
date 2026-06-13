import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import DropSection from "@/components/sections/DropSection";

export default function DropsPage() {
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
            <p className="text-xs tracking-[0.4em] text-primary uppercase mb-3">Exclusive Releases</p>
            <h1 className="font-display text-6xl md:text-8xl uppercase">The Drops.</h1>
            <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
              NAR drops are limited, scheduled, and never restocked. Miss it — you missed it. Stay ready.
            </p>
          </motion.div>
        </div>
        <DropSection />
        {/* Past Drops */}
        <section className="py-24 border-t border-border/20 container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 opacity-30"
          >
            <div className="flex-1 h-[1px] bg-border" />
            <p className="font-display text-3xl uppercase tracking-widest text-muted-foreground">Drop 000 — Sold Out</p>
            <div className="flex-1 h-[1px] bg-border" />
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
