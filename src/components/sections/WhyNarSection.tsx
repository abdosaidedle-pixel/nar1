import { motion } from "framer-motion";
import { Gem, Maximize2, Lock, Eye, Globe } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "240 GSM premium cotton. Soft, breathable, and built to last season after season.",
  },
  {
    icon: Maximize2,
    title: "Oversized Fit",
    desc: "Drop shoulder construction. Designed for maximum comfort and streetwear silhouette.",
  },
  {
    icon: Lock,
    title: "Limited Drops",
    desc: "Once it's gone, it's gone. Never restocked. Exclusive by design. This is the value.",
  },
  {
    icon: Eye,
    title: "Attention To Detail",
    desc: "Screen printed graphics. Woven labels. Pre-shrunk fabric. Every detail is intentional.",
  },
  {
    icon: Globe,
    title: "Made For The Culture",
    desc: "Built in Cairo, Egypt. For those who live the lifestyle and speak through what they wear.",
  },
];

export default function WhyNarSection() {
  return (
    <section className="relative py-24 md:py-36 bg-black border-t border-border/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-primary uppercase mb-3">Why NAR</p>
          <h2 className="font-display text-5xl md:text-7xl uppercase">Quality You Can Feel.</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-6 flex flex-col gap-4 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                data-testid={`card-feature-${i}`}
              >
                <div className="w-10 h-10 border border-primary/40 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground uppercase tracking-wide">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
