import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import narLogo from "@assets/703890814_18075540629300719_7161724007546567254_n_1781276971472.jpg";

const quickLinks = ["Home", "Collection", "Drops", "About", "Contact"];
const shopLinks = ["T-Shirts", "Hoodies", "Shirts", "Shorts", "Accessories"];
const helpLinks = ["FAQ", "Shipping", "Returns", "Size Guide", "Privacy Policy"];

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16 gap-4"
        >
          <img src={narLogo} alt="NAR" className="w-16 h-16 object-cover mb-2" />
          <h2 className="font-display text-7xl md:text-9xl text-foreground tracking-tighter leading-none">NAR</h2>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase">Not For Everyone</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-lg tracking-widest uppercase text-foreground mb-5 border-b border-border/30 pb-3">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
                    data-testid={`footer-link-${link.toLowerCase()}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display text-lg tracking-widest uppercase text-foreground mb-5 border-b border-border/30 pb-3">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-lg tracking-widest uppercase text-foreground mb-5 border-b border-border/30 pb-3">
              Help
            </h3>
            <ul className="flex flex-col gap-3">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-lg tracking-widest uppercase text-foreground mb-5 border-b border-border/30 pb-3">
              Stay Connected
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/nar.wolrd.raw?igsh=Z3d6eGgwMHI4Nm9h&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                data-testid="footer-ig"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1Afeq2Ghno/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                data-testid="footer-fb"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@nar_40400?_r=1&_t=ZS-979z8r4illt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                data-testid="footer-tiktok"
              >
                <SiTiktok className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
              Follow us for exclusive drops, behind the scenes, and lifestyle content.
            </p>
            <p className="text-xs text-primary mt-3 tracking-widest uppercase">@nar.clothing</p>
          </motion.div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">
            © 2024 NAR Clothing. All rights reserved. Cairo, Egypt. EST. 2024.
          </p>
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">Not For Everyone</p>
        </div>
      </div>
    </footer>
  );
}
