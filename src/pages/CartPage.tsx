import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const checkoutSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", address: "", notes: "" },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (items.length === 0) return;

    const itemLines = items
      .map(
        (item) =>
          `• ${item.product.name} (${item.product.tagline})\n  المقاس: ${item.size} | اللون: ${item.color} | الكمية: ${item.quantity} | السعر: EGP ${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join("\n\n");

    const msg =
      "مرحبا فريق NAR 👋\n\n" +
      "━━━━━━━━━━━━━━━━━━━━\n" +
      "🛍 طلب جديد\n" +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "👤 الاسم: " + data.name + "\n" +
      "📱 الهاتف: " + data.phone + "\n" +
      "📍 العنوان: " + data.address + "\n" +
      (data.notes ? "📝 ملاحظات: " + data.notes + "\n" : "") +
      "\n━━━━━━━━━━━━━━━━━━━━\n" +
      "🧾 المنتجات:\n\n" +
      itemLines +
      "\n\n━━━━━━━━━━━━━━━━━━━━\n" +
      "💰 الإجمالي: EGP " + totalPrice.toFixed(2) + "\n" +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "أرجو تأكيد الطلب. شكراً! 🔥";

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
    setSubmitted(true);
    clearCart();
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
          <span className="text-foreground">Cart & Checkout</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl uppercase mb-12"
        >
          Your Order
        </motion.h1>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-24 gap-6"
          >
            <div className="w-20 h-20 border-2 border-primary flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-foreground">Order Sent!</h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Your order has been sent to WhatsApp. Our team will confirm your order within 24 hours.
            </p>
            <button
              onClick={() => setLocation("/")}
              className="mt-4 bg-primary hover:bg-primary/80 text-white font-display text-xl px-10 py-4 uppercase tracking-widest transition-all"
            >
              Back To Home
            </button>
          </motion.div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-24 gap-6"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <h2 className="font-display text-4xl uppercase text-muted-foreground">Your Cart Is Empty</h2>
            <p className="text-muted-foreground">Add some pieces to your cart first.</p>
            <button
              onClick={() => setLocation("/collection")}
              className="mt-4 bg-primary hover:bg-primary/80 text-white font-display text-xl px-10 py-4 uppercase tracking-widest transition-all"
              data-testid="btn-go-collection"
            >
              Shop Collection
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.4em] text-primary uppercase mb-2">{totalItems} Item{totalItems > 1 ? "s" : ""}</p>
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex gap-5 bg-zinc-900/40 border border-white/5 p-4 hover:border-white/10 transition-colors"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <div className="w-20 h-24 shrink-0 overflow-hidden border border-white/10">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.tagline}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-xl uppercase text-foreground leading-tight">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">{item.color} — {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                          data-testid={`btn-remove-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-white/20">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-colors"
                            data-testid={`btn-minus-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center font-display text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-colors"
                            data-testid={`btn-plus-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-display text-2xl text-foreground">
                          EGP {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              {/* Order Summary */}
              <div className="bg-zinc-900/40 border border-white/5 p-6">
                <p className="font-display text-2xl uppercase mb-5 border-b border-border/30 pb-4">Order Summary</p>
                <div className="flex flex-col gap-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex justify-between text-sm text-muted-foreground"
                    >
                      <span className="truncate max-w-[200px]">{item.product.tagline} × {item.quantity}</span>
                      <span className="text-foreground shrink-0 ml-2">EGP {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/30 pt-4 flex justify-between items-center">
                  <p className="font-display text-xl uppercase">Total</p>
                  <p className="font-display text-3xl text-primary">EGP {totalPrice.toFixed(2)}</p>
                </div>
              </div>

              {/* Customer Info Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <p className="font-display text-2xl uppercase">Your Details</p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Full Name</label>
                  <input
                    {...register("name")}
                    placeholder="Your full name"
                    className="bg-zinc-900/60 border border-border/50 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-checkout-name"
                  />
                  {errors.name && <p className="text-primary text-xs">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Phone Number</label>
                  <input
                    {...register("phone")}
                    placeholder="+20 100 000 0000"
                    className="bg-zinc-900/60 border border-border/50 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-checkout-phone"
                  />
                  {errors.phone && <p className="text-primary text-xs">{errors.phone.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Address</label>
                  <input
                    {...register("address")}
                    placeholder="Street, City, Governorate"
                    className="bg-zinc-900/60 border border-border/50 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-checkout-address"
                  />
                  {errors.address && <p className="text-primary text-xs">{errors.address.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Notes (Optional)</label>
                  <textarea
                    {...register("notes")}
                    placeholder="Any special requests..."
                    rows={3}
                    className="bg-zinc-900/60 border border-border/50 text-foreground placeholder-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    data-testid="input-checkout-notes"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/80 text-white font-display text-2xl py-5 uppercase tracking-widest transition-all"
                  data-testid="btn-checkout-submit"
                >
                  <MessageCircle className="w-6 h-6" />
                  Order Via WhatsApp
                </motion.button>

                <p className="text-xs text-center text-muted-foreground">
                  Clicking will open WhatsApp with your complete order details.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
