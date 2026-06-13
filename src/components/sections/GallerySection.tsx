import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import img1 from "@assets/e7a67829-0b8b-460d-91e4-660bb1563255_1781346965222.jpg";
import img2 from "@assets/88875a89-65c9-4db9-ae98-ef216e30cdbb_1781346969615.jpg";
import img3 from "@assets/373b3391-7762-480e-a220-534e3d19d92b_1781346973584.jpg";
import img4 from "@assets/8926290d-b8b3-4166-a83c-bae4bc9ac5cf_1781346996266.jpg";
import img5 from "@assets/ec9fc131-3d6d-4079-a384-99851be3fce5_1781347004617.jpg";

const galleryItems = [
  { src: img1, span: "row-span-2", label: "BFF — Deep Red" },
  { src: img3, span: "row-span-1", label: "BFF — Black" },
  { src: img4, span: "row-span-1", label: "BFF — Off White" },
  { src: img2, span: "row-span-2", label: "BFF — Black" },
  { src: img5, span: "row-span-1", label: "BFF — Off White" },
];

export default function GallerySection() {
  return (
    <section className="relative py-24 md:py-36 bg-[#0A0A0A] border-t border-border/20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs tracking-[0.4em] text-primary uppercase mb-3">Customer Gallery</p>
            <h2 className="font-display text-5xl md:text-7xl uppercase">Real People. Real Style.</h2>
          </div>
          <a
            href="https://www.instagram.com/nar.wolrd.raw?igsh=Z3d6eGgwMHI4Nm9h&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm tracking-widest uppercase border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors self-start md:self-auto"
            data-testid="link-instagram"
          >
            <Instagram className="w-4 h-4" />
            Follow Us @nar.clothing
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden ${item.span} ${i === 0 ? "col-span-1" : ""}`}
              data-testid={`gallery-item-${i}`}
            >
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover object-top"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4">
                <div>
                  <p className="font-display text-lg md:text-2xl text-foreground uppercase">{item.label}</p>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">NAR Drop 001</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
