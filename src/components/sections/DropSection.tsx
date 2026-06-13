import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Bell } from "lucide-react";
import imgBFW from "@assets/WhatsApp_Image_2026-06-12_at_5.33.57_PM_(1)_1781342986655.jpeg";
import imgBTBLW from "@assets/WhatsApp_Image_2026-06-12_at_5.33.57_PM_(2)_1781342986657.jpeg";
import imgBFFB from "@assets/WhatsApp_Image_2026-06-12_at_5.33.57_PM_1781342986657.jpeg";
import imgBTBLBk from "@assets/WhatsApp_Image_2026-06-12_at_5.33.58_PM_1781342986658.jpeg";

const bannerSlides = [
  { src: imgBFFB,   label: "Born From Fire",   sub: "Black — Drop 001"     },
  { src: imgBFW,    label: "Born From Fire",   sub: "Off White — Drop 001"  },
  { src: imgBTBLBk, label: "Born To Be Loud", sub: "Black — Drop 001"      },
  { src: imgBTBLW,  label: "Born To Be Loud", sub: "White — Drop 001"      },
];

const TARGET_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-7xl md:text-9xl text-primary leading-none tabular-nums"
        data-testid={`countdown-${label.toLowerCase()}`}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-xs md:text-sm tracking-[0.3em] text-muted-foreground uppercase font-medium">
        {label}
      </span>
    </div>
  );
}

function DropBanner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 60, damping: 22 });
  const rotateY = useSpring(mouseX, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % bannerSlides.length), 3500);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 15);
    mouseY.set(-(e.clientY - rect.top - rect.height / 2) / 15);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
    >
      <div className="absolute -inset-6 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

      <div
        className="relative"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full aspect-[16/9] overflow-hidden border border-white/8 shadow-2xl"
        >
          {/* All images stacked — fade via opacity (no AnimatePresence) */}
          {bannerSlides.map((slide, i) => (
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.label}
              className="absolute inset-0 w-full h-full object-cover select-none"
              animate={{ opacity: i === activeIdx ? 1 : 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              draggable={false}
            />
          ))}

          {/* Shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/30 pointer-events-none z-10"
            style={{ rotateX, rotateY }}
          />

          {/* Label + dots */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent pt-10 pb-4 px-5 flex items-end justify-between">
            <div>
              <motion.p
                key={`label-${activeIdx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-2xl text-white leading-none"
              >
                {bannerSlides[activeIdx].label}
              </motion.p>
              <motion.p
                key={`sub-${activeIdx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase mt-1"
              >
                {bannerSlides[activeIdx].sub}
              </motion.p>
            </div>

            <div className="flex items-center gap-1.5 pb-0.5">
              {bannerSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIdx ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function DropSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="drops" className="relative py-24 md:py-36 overflow-hidden bg-[#0A0A0A] border-t border-border/20">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          NAR
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <h2 className="font-display text-6xl md:text-8xl uppercase text-foreground">DROP 001</h2>
                <span className="bg-primary text-white text-xs font-bold tracking-[0.2em] px-3 py-1.5 uppercase shrink-0 self-start mt-2">
                  Only 200 Pieces
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base tracking-wide leading-relaxed max-w-md">
                Born From Fire Collection.<br />
                This isn't just clothing. It's a statement.<br />
                For those who know.<br />
                <span className="text-foreground/60 italic mt-2 block text-xs tracking-widest uppercase">
                  We don't follow. We build. We burn.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-end gap-6 md:gap-10"
            >
              <TimeUnit value={timeLeft.days}    label="Days"    />
              <span className="font-display text-5xl md:text-7xl text-primary pb-7 leading-none">:</span>
              <TimeUnit value={timeLeft.hours}   label="Hours"   />
              <span className="font-display text-5xl md:text-7xl text-primary pb-7 leading-none">:</span>
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <span className="font-display text-5xl md:text-7xl text-primary pb-7 leading-none">:</span>
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => { setNotified(true); setTimeout(() => setNotified(false), 3000); }}
                className="flex items-center gap-3 bg-primary hover:bg-primary/80 text-white font-display text-2xl px-10 py-4 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                data-testid="button-notify"
              >
                <Bell className="w-5 h-5" />
                {notified ? "Notified!" : "Notify Me"}
              </button>
            </motion.div>
          </div>

          <DropBanner />
        </div>
      </div>
    </section>
  );
}
