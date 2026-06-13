import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ShoppingBag, Check, Minus, Plus, ChevronRight, Ruler } from "lucide-react";
import { getProductBySlug, sizeGuide } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { addItem } = useCart();

  const product = getProductBySlug(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = -(e.clientY - rect.top - rect.height / 2) / 18;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-foreground mb-4">PRODUCT NOT FOUND</p>
          <button onClick={() => setLocation("/collection")} className="text-primary underline">
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    let hasError = false;
    if (!selectedSize) { setSizeError(true); hasError = true; } else setSizeError(false);
    if (!selectedColor) { setColorError(true); hasError = true; } else setColorError(false);
    if (hasError) return;

    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    let hasError = false;
    if (!selectedSize) { setSizeError(true); hasError = true; } else setSizeError(false);
    if (!selectedColor) { setColorError(true); hasError = true; } else setColorError(false);
    if (hasError) return;

    addItem(product, selectedSize, selectedColor, quantity);
    setLocation("/cart");
  };

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 container mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-muted-foreground tracking-widest uppercase mb-10"
        >
          <button onClick={() => setLocation("/")} className="hover:text-primary transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setLocation("/collection")} className="hover:text-primary transition-colors">Collection</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.tagline}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* LEFT — 3D Image Viewer */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-14 h-18 md:w-16 md:h-20 border-2 overflow-hidden shrink-0 transition-all duration-300 ${
                    activeImage === i ? "border-primary shadow-lg shadow-primary/20" : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                  data-testid={`thumbnail-${i}`}
                  style={{ height: "80px" }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>

            {/* Main 3D Image */}
            <div
              className="flex-1 relative"
              style={{ perspective: "1000px" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative aspect-[3/4] w-full"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={product.tagline}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover border border-white/5 shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                  />
                </AnimatePresence>
                {/* Glow */}
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full -z-10 pointer-events-none" />
                {/* Shine overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                  style={{ rotateX, rotateY }}
                />
              </motion.div>
              <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mt-3">
                Hover to rotate — 3D view
              </p>
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="text-xs tracking-[0.4em] text-primary uppercase mb-2">{product.drop}</p>
              <h1 className="font-display text-5xl md:text-6xl xl:text-7xl uppercase leading-tight">{product.name}</h1>
              <p className="text-muted-foreground text-sm tracking-widest uppercase mt-1">{product.tagline}</p>
            </div>

            <p className="font-display text-4xl text-foreground">EGP {product.price.toFixed(2)}</p>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{product.description}</p>

            {/* Color */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-[0.3em] uppercase font-semibold text-foreground">
                  Color: <span className="text-primary">{selectedColor || "—"}</span>
                </p>
                {colorError && <p className="text-primary text-xs">Select a color</p>}
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => {
                  const bg =
                    color === "Black" ? "#111" :
                    color === "Off White" ? "#E8E4DA" :
                    color === "Deep Red" ? "#8B0000" :
                    color === "White" ? "#F2F2F2" : "#888";
                  return (
                    <motion.button
                      key={color}
                      onClick={() => { setSelectedColor(color); setColorError(false); }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 border text-xs tracking-widest uppercase transition-all ${
                        selectedColor === color
                          ? "border-primary text-primary"
                          : "border-white/20 text-muted-foreground hover:border-white/50"
                      }`}
                      data-testid={`color-${color.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                        style={{ background: bg }}
                      />
                      {color}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-[0.3em] uppercase font-semibold text-foreground">
                  Size: <span className="text-primary">{selectedSize || "—"}</span>
                </p>
                {sizeError && <p className="text-primary text-xs">Select a size</p>}
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 border font-display text-xl tracking-widest transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/20 text-muted-foreground hover:border-white/50 hover:text-foreground"
                    }`}
                    data-testid={`size-${size}`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-0 border border-white/20 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                  data-testid="btn-qty-minus"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-display text-2xl" data-testid="text-quantity">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors"
                  data-testid="btn-qty-plus"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-3 font-display text-xl py-4 px-8 uppercase tracking-widest transition-all border ${
                  added
                    ? "border-green-500 text-green-400 bg-green-500/10"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
                data-testid="btn-add-to-cart"
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                {added ? "Added!" : "Add To Cart"}
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-3 bg-primary hover:bg-primary/80 text-white font-display text-xl py-4 px-8 uppercase tracking-widest transition-all"
                data-testid="btn-buy-now"
              >
                Order Now
              </motion.button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border/30 pt-6">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-foreground mb-4">Product Details</p>
              <div className="grid grid-cols-2 gap-2">
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Size Guide */}
            <div className="border-t border-border/30 pt-6">
              <button
                onClick={() => setShowSizeGuide((v) => !v)}
                className="flex items-center justify-between w-full group"
                data-testid="btn-size-guide-toggle"
              >
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  <p className="text-xs tracking-[0.3em] uppercase font-semibold text-foreground">
                    Size Guide — Weight & Height
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: showSizeGuide ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-muted-foreground text-lg leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {showSizeGuide && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                        NAR tees are oversized by design — if you're between sizes, size down for a more fitted look.
                      </p>
                      <table className="w-full text-sm border-collapse" data-testid="table-size-guide">
                        <thead>
                          <tr className="border-b border-border/40">
                            <th className="text-left py-2.5 pr-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Size</th>
                            <th className="text-left py-2.5 pr-4 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Height (cm)</th>
                            <th className="text-left py-2.5 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Weight (kg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide.map((row, i) => (
                            <motion.tr
                              key={row.size}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              onClick={() => { setSelectedSize(row.size); setSizeError(false); }}
                              className={`border-b border-border/20 cursor-pointer transition-colors hover:bg-white/5 ${
                                selectedSize === row.size ? "bg-primary/10" : ""
                              }`}
                              data-testid={`size-guide-row-${row.size}`}
                            >
                              <td className={`py-3 pr-4 font-display text-xl ${selectedSize === row.size ? "text-primary" : "text-foreground"}`}>
                                {row.size}
                              </td>
                              <td className="py-3 pr-4 text-muted-foreground tabular-nums">
                                {row.heightMin} – {row.heightMax}
                              </td>
                              <td className="py-3 text-muted-foreground tabular-nums">
                                {row.weightMin} – {row.weightMax}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-[11px] text-muted-foreground mt-3 opacity-60">
                        * Click a row to select that size automatically.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
