import { motion } from "framer-motion";
import { MessageSquare, Mail, MapPin } from "lucide-react";

export default function OrderSection() {
  return (
    <section id="contact" className="relative bg-black border-t border-border/20 overflow-hidden py-24">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl uppercase mb-8"
          >
            Get In Touch.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-16 max-w-2xl mx-auto"
          >
            Have questions about your order or want to know more about our upcoming drops? We're here to help you join the NAR community.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">Quick support and direct ordering.</p>
              <a href="https://wa.me/201144364349" target="_blank" rel="noopener noreferrer" className="text-primary text-xs tracking-widest uppercase font-bold hover:underline">Chat Now</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">For business inquiries and feedback.</p>
              <a href="mailto:contact@narclothing.com" className="text-primary text-xs tracking-widest uppercase font-bold hover:underline">Send Email</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-4">Proudly based in Cairo, Egypt.</p>
              <span className="text-primary text-xs tracking-widest uppercase font-bold">EST. 2024</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
