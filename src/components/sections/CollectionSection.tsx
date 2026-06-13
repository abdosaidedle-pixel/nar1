import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { products } from "@/data/products";

function Card3D({ product, idx }: { product: typeof products[0]; idx: number }) {
  const [, setLocation] = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 80, damping: 22 });
  const rotateY = useSpring(mouseX, { stiffness: 80, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 10);
    mouseY.set(-(e.clientY - rect.top - rect.height / 2) / 10);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.6 }}
      className="group flex flex-col gap-4 cursor-pointer"
      onClick={() => setLocation(`/product/${product.slug}`)}
    >
      <div
        className="relative aspect-[3/4]"
        style={{ perspective: "900px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-full relative border border-white/5 group-hover:border-white/15 transition-colors overflow-hidden bg-zinc-900/40"
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-black/20 pointer-events-none"
            style={{ rotateX, rotateY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
            <button
              onClick={(e) => { e.stopPropagation(); setLocation(`/product/${product.slug}`); }}
              className="w-full bg-white text-black font-display text-lg py-3 uppercase hover:bg-primary hover:text-white transition-colors"
              data-testid={`btn-view-${product.id}`}
            >
              View Product
            </button>
          </div>
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(139,0,0,0.05)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">{product.drop}</p>
        <h3 className="font-display text-2xl uppercase group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">{product.tagline.split("—")[1]?.trim() || product.tagline}</p>
          <p className="text-foreground font-mono text-sm">EGP {product.price}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionSection() {
  const [, setLocation] = useLocation();

  return (
    <section id="collection" className="py-24 bg-black relative z-10 border-t border-border/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl uppercase"
          >
            Curated For The Few.
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => setLocation("/collection")}
            className="text-sm font-semibold tracking-widest uppercase border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors self-start md:self-auto"
            data-testid="btn-view-all"
          >
            View All →
          </motion.button>
        </div>

        {/* 6-card grid: 2 cols on sm, 3 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <Card3D key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
