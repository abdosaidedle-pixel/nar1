import { motion } from "framer-motion";
import narLogo from "@assets/703890814_18075540629300719_7161724007546567254_n_1781276971472.jpg";
import img1 from "@assets/e7a67829-0b8b-460d-91e4-660bb1563255_1781346965222.jpg";
import img2 from "@assets/88875a89-65c9-4db9-ae98-ef216e30cdbb_1781346969615.jpg";
import img3 from "@assets/373b3391-7762-480e-a220-534e3d19d92b_1781346973584.jpg";
import img4 from "@assets/8926290d-b8b3-4166-a83c-bae4bc9ac5cf_1781346996266.jpg";
import img5 from "@assets/ec9fc131-3d6d-4079-a384-99851be3fce5_1781347004617.jpg";

const storyLines = [
  "NAR is more than a brand.",
  "It is a mindset.",
  "Premium streetwear for those who refuse to follow the crowd.",
  "For those who know that real ones move different.",
  "This is not for everyone.",
  "This is for you.",
];

const bannerImages = [img1, img2, img3, img4, img5];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-black border-t border-border/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.4em] text-primary uppercase mb-4">Our Story</p>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-tight text-foreground">
                Built Different.<br />
                <span className="text-foreground/60">Made To Stand Out.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-3">
              {storyLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`text-base md:text-lg leading-relaxed ${
                    i < 2 ? "text-foreground" :
                    i < 5 ? "text-muted-foreground" :
                    "text-foreground font-semibold"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col gap-3 border-l-2 border-primary pl-6 mt-2"
            >
              <p className="text-sm tracking-[0.3em] text-primary uppercase font-semibold">
                We Don't Follow. We Build. We Burn.
              </p>
              <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
                Cairo, Egypt. EST. 2024.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img src={narLogo} alt="NAR Logo" className="w-16 h-16 object-cover opacity-70" />
            </motion.div>
          </div>

          {/* Photo Banner */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden"
          >
            <div className="absolute -inset-6 bg-primary/5 blur-3xl pointer-events-none" />

            {/* Label */}
            <div className="relative mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <p className="text-xs tracking-[0.4em] text-primary uppercase">Real People. Real Style.</p>
            </div>

            {/* Marquee strip 1 — left to right */}
            <div className="relative overflow-hidden mb-3">
              <div className="flex gap-3 animate-marquee-ltr w-max">
                {[...bannerImages, ...bannerImages].map((src, i) => (
                  <div key={i} className="shrink-0 w-40 h-52 overflow-hidden border border-white/5">
                    <img src={src} alt="NAR customer" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee strip 2 — right to left */}
            <div className="relative overflow-hidden">
              <div className="flex gap-3 animate-marquee-rtl w-max">
                {[...bannerImages, ...bannerImages].map((src, i) => (
                  <div key={i} className="shrink-0 w-40 h-52 overflow-hidden border border-white/5">
                    <img src={src} alt="NAR customer" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>

            {/* Edge fade overlays */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
