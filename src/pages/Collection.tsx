import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

function ProductCard3D({ product, idx }: { product: typeof products[0]; idx: number }) {
  const [, setLocation] = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 12;
    const y = -(e.clientY - rect.top - rect.height / 2) / 12;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.6 }}
      className="group flex flex-col gap-4"
    >
      <div
        className="relative aspect-[3/4] cursor-pointer"
        style={{ perspective: "800px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setLocation(`/product/${product.slug}`)}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-full relative bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-colors overflow-hidden"
        >
          <motion.img
            src={product.images[0]}
            alt={product.tagline}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5 }}
          />
          {/* 3D Shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none"
            style={{ rotateX, rotateY }}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
            <div className="w-full">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{product.drop}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setLocation(`/product/${product.slug}`); }}
                className="w-full bg-white text-black font-display text-lg py-3 uppercase hover:bg-primary hover:text-white transition-colors"
                data-testid={`btn-view-${product.id}`}
              >
                View Product
              </button>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-2 bg-primary/5 blur-2xl -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      <div
        className="flex flex-col gap-1 cursor-pointer"
        onClick={() => setLocation(`/product/${product.slug}`)}
      >
        <p className="text-xs text-muted-foreground tracking-widest uppercase">{product.drop}</p>
        <h3 className="font-display text-2xl uppercase text-foreground group-hover:text-primary transition-colors">
          {product.tagline}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-foreground font-mono text-sm">EGP {product.price.toFixed(2)}</p>
          <div className="flex gap-1">
            {product.colors.map((c) => {
              const bg =
                c === "Black" ? "#111" :
                c === "Off White" ? "#E8E4DA" :
                c === "Deep Red" ? "#8B0000" :
                c === "White" ? "#F2F2F2" : "#888";
              return (
                <div
                  key={c}
                  title={c}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ background: bg }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      <div className="pt-28 pb-24">
        {/* Header */}
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] text-primary uppercase mb-3">Drop 001</p>
            <h1 className="font-display text-6xl md:text-8xl uppercase leading-tight">
              The Collection.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed text-sm">
              Limited pieces. Unlimited identity. Every item is part of Drop 001 — once it's gone, it's gone. Click any product to explore, choose your size, and order directly via WhatsApp.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
            {products.map((product, idx) => (
              <ProductCard3D key={product.id} product={product} idx={idx} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
