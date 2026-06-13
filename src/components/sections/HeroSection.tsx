import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import imgBFFBlack from "@assets/d3efa852-813a-43f6-bc6e-2a8d2b737f6c_1781286527273.png";
import imgBFFOffWhite from "@assets/33ef5afe-ec2a-405c-be2f-c4786d17960c_1781286522480.png";
import imgBFFBurgundy from "@assets/7caf832d-63cd-48b2-a49c-12b82cd814e0_1781286888023.png";
import imgBTBLBlack from "@assets/9d3a0bd0-d738-48f1-be9b-3e9651f9fcc3_1781286532075.png";
import imgBTBLWhite from "@assets/6d2a65d8-3515-4327-8674-8f989f695ad6_1781286536554.png";
import imgBlackout from "@assets/WhatsApp_Image_2026-06-12_at_5.33.58_PM_(1)_1781286541601.jpg";

const heroImages = [
  { src: imgBFFBlack,    label: "Born From Fire — Black"    },
  { src: imgBFFOffWhite, label: "Born From Fire — Off White" },
  { src: imgBFFBurgundy, label: "Born From Fire — Burgundy"  },
  { src: imgBTBLBlack,   label: "Born To Be Loud — Black"   },
  { src: imgBTBLWhite,   label: "Born To Be Loud — White"   },
  { src: imgBlackout,    label: "Blackout Collection"        },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.35 + 0.08,
}));

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-cycle images every 3.5s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const xRaw    = useMotionValue(0);
  const yRaw    = useMotionValue(0);
  const rotXRaw = useMotionValue(0);
  const rotYRaw = useMotionValue(0);

  const xSpring    = useSpring(xRaw,    { stiffness: 50, damping: 20 });
  const ySpring    = useSpring(yRaw,    { stiffness: 50, damping: 20 });
  const rotXSpring = useSpring(rotXRaw, { stiffness: 70, damping: 25 });
  const rotYSpring = useSpring(rotYRaw, { stiffness: 70, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    xRaw.set(dx * 0.05);
    yRaw.set(dy * 0.05);
    rotXRaw.set(-(dy / rect.height) * 10);
    rotYRaw.set( (dx / rect.width)  * 10);
  };

  const handleMouseLeave = () => {
    xRaw.set(0); yRaw.set(0);
    rotXRaw.set(0); rotYRaw.set(0);
  };

  return (
    <section
      className="relative min-h-[100dvh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_60%_50%,_rgba(20,5,5,0.3)_0%,_#000_75%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_40%_60%_at_65%_50%,_rgba(139,0,0,0.08)_0%,_transparent_70%)]" />

      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-5 z-20">
        <a href="https://www.instagram.com/nar.wolrd.raw?igsh=Z3d6eGgwMHI4Nm9h&utm_source=qr" target="_blank" rel="noopener noreferrer"
          className="text-muted-foreground hover:text-white transition-colors">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="https://www.facebook.com/share/1Afeq2Ghno/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
          className="text-muted-foreground hover:text-white transition-colors">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="https://www.tiktok.com/@nar_40400?_r=1&_t=ZS-979z8r4illt" target="_blank" rel="noopener noreferrer"
          className="text-muted-foreground hover:text-white transition-colors">
          <SiTiktok className="w-4 h-4" />
        </a>
        <div className="w-[1px] h-20 bg-white/10 mx-auto mt-2" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

        {/* LEFT: Text */}
        <div className="flex flex-col items-start gap-6 lg:pl-14 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs font-semibold tracking-[0.35em] text-muted-foreground uppercase">
              Premium Streetwear
            </span>
          </motion.div>

          <div className="relative">
            {["NOT", "FOR", "EVERYONE"].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 60, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.75, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden leading-none"
              >
                <span className="block font-display text-[min(22vw,9rem)] md:text-[min(12vw,8.5rem)] leading-[0.88] tracking-tight text-white">
                  {word}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[42%] -left-2 right-4 h-[6px] md:h-[10px] bg-primary -rotate-[4deg] origin-left mix-blend-screen pointer-events-none"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-base md:text-lg text-muted-foreground max-w-xs font-light tracking-wide leading-relaxed"
          >
            Premium Streetwear Built Different.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => setLocation("/collection")}
              className="bg-primary hover:bg-primary/85 text-white font-display text-xl px-9 py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop Collection
            </button>
            <button
              onClick={() => setLocation("/drops")}
              className="bg-transparent border border-white/60 hover:bg-white hover:text-black text-white font-display text-xl px-9 py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Drops
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Drop 001 — Live Now</span>
          </motion.div>
        </div>

        {/* RIGHT: 3D Image Carousel — hidden on mobile */}
        <div className="relative order-1 md:order-2 items-center justify-center md:justify-end hidden md:flex">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] h-[60%] bg-primary/10 blur-[80px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px]"
            style={{ perspective: "1100px" }}
          >
            <motion.div
              style={{
                x: xSpring, y: ySpring,
                rotateX: rotXSpring, rotateY: rotYSpring,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full aspect-[3/4] overflow-hidden"
            >
              {/* All images stacked — fade via opacity (no AnimatePresence) */}
              {heroImages.map((img, i) => (
                <motion.img
                  key={img.src}
                  src={img.src}
                  alt={img.label}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  animate={{ opacity: i === activeIdx ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  draggable={false}
                />
              ))}

              {/* Shine overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none z-10"
                style={{ rotateX: rotXSpring, rotateY: rotYSpring }}
              />

              {/* Product label */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4">
                <motion.p
                  key={`hero-label-${activeIdx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-xs tracking-[0.3em] text-white/70 uppercase font-semibold"
                >
                  {heroImages[activeIdx].label}
                </motion.p>
              </div>
            </motion.div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIdx
                      ? "w-6 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Show product ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/20 pointer-events-none"
              style={{ left: p.left + "%", top: p.top + "%", width: p.size + "px", height: p.size + "px" }}
              animate={{ y: [-8, -60, -8], opacity: [p.opacity, 0, p.opacity] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent"
        />
        <span className="text-[9px] tracking-[0.4em] text-muted-foreground uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
