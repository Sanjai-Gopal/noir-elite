import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Menu, Trash2, ArrowRight, Sun, Moon } from "lucide-react";
import { Product } from "../types";

interface NavbarProps {
  cart: { product: Product; quantity: number }[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Navbar({
  cart,
  onRemoveFromCart,
  onClearCart,
  activeSection,
  scrollToSection,
  theme,
  onToggleTheme
}: NavbarProps) {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // e.g. 0.20 for 20%
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  
  // Custom type cast to read options safely
  const calculateSubtotal = () => {
    return cart.reduce((acc, curr) => {
      const numericPrice = parseInt(curr.product.price.replace(/[^\d]/g, ""), 10);
      let itemCost = numericPrice;
      // If gift-wrapped, add custom packaging fee
      if ((curr.product as any).giftWrapped) {
        itemCost += 45;
      }
      return acc + itemCost * curr.quantity;
    }, 0);
  };

  const currentSubtotal = calculateSubtotal();
  const discountReduction = currentSubtotal * appliedDiscount;
  const grandTotal = Math.max(0, currentSubtotal - discountReduction);

  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const code = promoCode.trim().toUpperCase();
    if (code === "NOIR20") {
      setAppliedDiscount(0.20);
      setPromoSuccess("STUDIO COUPON APPLIED: 20% OFF ALL PIECES");
    } else if (code === "COUTURE10") {
      setAppliedDiscount(0.10);
      setPromoSuccess("COUTURE OFFER APPLIED: 10% OFF TOTAL OUTLAY");
    } else if (code === "") {
      setPromoError("PLEASE ENTER A VALID ATELIER KEY.");
    } else {
      setPromoError("INVALID OR EXPIRED ATELIER KEY.");
    }
  };

  const links = [
    { name: "MAISON", id: "hero" },
    { name: "COLLECTION", id: "collections" },
    { name: "PRODUCT CATALOG", id: "catalog" },
    { name: "CAMPAIGNS", id: "campaigns" }
  ];

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      setTimeout(() => {
        onClearCart();
        setPromoCode("");
        setAppliedDiscount(0);
        setPromoSuccess("");
        setOrderPlaced(false);
        setIsBagOpen(false);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      {/* GLOBAL NAVBAR */}
      <nav
        id="noir-global-nav"
        className="fixed top-0 left-0 w-full z-40 glass-nav h-20 flex items-center justify-between px-6 md:px-12 select-none"
      >
        {/* Brand Logo - Syne / Serif Mix */}
        <div
          id="navbar-brand-logo"
          className="flex flex-col cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          <span className="font-sans text-lg md:text-xl font-light tracking-[0.4em] text-white uppercase pl-[0.4em]">
            NOIR ÉLITE
          </span>
          <span className="font-mono text-[8px] text-silver-400/30 tracking-[0.2em] mt-1 uppercase">
            STUDIO DE COUTURE
          </span>
        </div>

        {/* Desktop Direct Links */}
        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <button
              key={link.id}
              className={`font-sans text-[10px] tracking-[0.4em] uppercase font-light transition-all duration-500 cursor-pointer py-2 border-b ${
                activeSection === link.id
                  ? "text-white border-white/60 opacity-100"
                  : "text-silver-400/40 hover:text-white border-transparent hover:opacity-100"
              }`}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action Controls: Location coordinate + Shopping Bag trigger */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <span className="hidden lg:inline font-mono text-[9px] text-silver-400/35 tracking-[0.16em]">
            48.8566º N, 2.3522º E
          </span>

          {/* Luxury Theme Toggle */}
          <button
            id="theme-toggler"
            aria-label="Toggle theme"
            className="p-2 text-silver-300 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/5"
            onClick={onToggleTheme}
            title={theme === "light" ? "Switch to Noir Theme" : "Switch to Alabaster Theme"}
          >
            {theme === "light" ? (
              <Moon className="w-[18px] h-[18px] stroke-[1.25]" />
            ) : (
              <Sun className="w-[18px] h-[18px] stroke-[1.25]" />
            )}
          </button>

          {/* Luxury Bag Button */}
          <button
            id="shopping-bag-trigger"
            aria-label="Shopping bag"
            className="relative p-2 text-silver-300 hover:text-white transition-luxury cursor-pointer"
            onClick={() => setIsBagOpen(true)}
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.25]" />
            {cartCount > 0 && (
              <motion.span
                id="cart-badge-count"
                className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black font-mono text-[9px] font-bold rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            aria-label="Menu Toggle"
            className="md:hidden p-2 text-silver-300 hover:text-white transition-luxury cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </nav>

      {/* MOBILE EXPANDED MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 pt-24 pb-12 px-6 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col space-y-6 pt-10">
              {links.map((link) => (
                <button
                  key={link.id}
                  className="font-syne text-2xl font-semibold text-left tracking-[0.2em] text-silver-300 hover:text-white py-2 border-b border-white/5"
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-4 pt-10 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-mono text-silver-400">
                <span>ATELIER</span>
                <span>PARIS / MILAN / TOKYO</span>
              </div>
              <div className="text-[10px] font-mono text-silver-400/30 text-center uppercase">
                Noir Élite Custom Platform 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIGH-END CART SLIDE DRAWER */}
      <AnimatePresence>
        {isBagOpen && (
          <>
            {/* Dark glass backdrop cover */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBagOpen(false)}
            />

            {/* Shopping Bag panel */}
            <motion.div
              id="shopping-bag-drawer"
              className="fixed right-0 top-0 h-full w-full sm:w-[480px] z-50 bg-[#060606] border-l border-white/5 flex flex-col shadow-2xl overflow-hidden noise-bg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {/* Drawer header */}
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5">
                <div className="flex flex-col">
                  <span className="font-syne text-lg font-bold tracking-wider uppercase text-white">
                    LA SÉLECTION ({cartCount})
                  </span>
                  <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest">
                    Your Haute-Couture Wardrobe
                  </span>
                </div>
                <button
                  className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-luxury cursor-pointer"
                  onClick={() => setIsBagOpen(false)}
                  aria-label="Close Shopping Bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 md:px-8 space-y-6">
                {orderPlaced ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-syne text-xl font-bold tracking-widest text-[#ffffff] uppercase">
                      COUTURE TRANSFERRED
                    </h3>
                    <p className="font-serif italic text-sm text-silver-400/80 leading-relaxed max-w-xs">
                      "Your exclusive selection has been directed to the central Parisian Atelier. Our sartorial technologists will connect shortly."
                    </p>
                    <span className="font-mono text-[9px] text-silver-400/30 font-bold uppercase tracking-widest">
                      INITIATING SPECIFICATION NO. {Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 py-12">
                    <ShoppingBag className="w-8 h-8 text-silver-400/40 stroke-[1]" />
                    <p className="font-serif italic text-sm text-silver-400">
                      "Absolute emptiness holds the greatest sartorial potential."
                    </p>
                    <button
                      className="font-mono text-[9px] tracking-widest text-white underline cursor-pointer hover:text-white/80"
                      onClick={() => setIsBagOpen(false)}
                    >
                      CONTINUE SELECTION
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => {
                    const prodOpt = item.product as any;
                    return (
                      <div
                        key={`${item.product.id}-${idx}`}
                        className="flex gap-4 p-4 rounded-lg bg-[#0c0c0c] border border-white/5 relative group"
                      >
                        {/* Product Mini Thumbnail */}
                        <div className="w-[80px] h-[100px] bg-[#050505] flex-shrink-0 overflow-hidden rounded relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Product Descriptions */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="font-mono text-[8px] text-silver-400/40 tracking-wider">
                              {item.product.category}
                            </span>
                            <h4 className="font-syne text-xs font-bold tracking-wider text-white">
                              {item.product.name}
                            </h4>
                            <span className="font-mono text-[10px] text-silver-300 mt-1 block">
                              {item.product.price}
                            </span>

                            {/* Custom Bespoke Attributes */}
                            {(prodOpt.selectedSize || prodOpt.skuColor || prodOpt.initials || prodOpt.giftWrapped) && (
                              <div className="mt-2 space-y-1 font-mono text-[8px] uppercase tracking-wider text-silver-400 border-t border-white/5 pt-1.5">
                                {prodOpt.selectedSize && (
                                  <div>SIZE: <span className="text-white">{prodOpt.selectedSize}</span></div>
                                )}
                                {prodOpt.skuColor && (
                                  <div className="flex items-center gap-1">
                                    COLOR: <span className="text-white">{prodOpt.skuColor}</span>
                                  </div>
                                )}
                                {prodOpt.initials && (
                                  <div>MONOGRAM: <span className="text-emerald-400">{prodOpt.initials}</span></div>
                                )}
                                {prodOpt.giftWrapped && (
                                  <div className="text-[#bf9f62] font-semibold">★ OBSIDIAN BOX GIFT WRAP (+€45)</div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Quantity management & Trash button */}
                          <div className="flex justify-between items-center text-[10px] font-mono text-silver-400 mt-2">
                            <span>QUANTITY: {item.quantity}</span>
                            <button
                              className="text-silver-400/50 hover:text-red-400 transition-all duration-300 cursor-pointer"
                              onClick={() => onRemoveFromCart(item.product.id)}
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer footer containing pricing / controls */}
              {cart.length > 0 && !orderPlaced && (
                <div className="p-6 md:p-8 bg-[#090909] border-t border-white/5 space-y-6">
                  {/* Promo Code Input Panel */}
                  <div className="space-y-2 border-b border-white/5 pb-4">
                    <span className="font-mono text-[9px] text-[#ffffff]/40 uppercase tracking-widest block">
                      PROMOTIONAL ATELIER KEY
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="ENTER CODE (E.G. NOIR20)"
                        className="flex-1 bg-black/40 border border-white/10 px-3 py-2 text-xs font-mono text-white placeholder-silver-600 focus:outline-none focus:border-white/40 uppercase"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-[#e5e5eb] cursor-pointer transition-all duration-300"
                      >
                        APPLY
                      </button>
                    </div>
                    {promoError && (
                      <p className="font-mono text-[8px] text-red-400 uppercase tracking-wider">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="font-mono text-[8px] text-emerald-400 uppercase tracking-wider">{promoSuccess}</p>
                    )}
                  </div>

                  {/* Ledger lines */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-silver-400">
                      <span>SARTORIAL SUBTOTAL</span>
                      <span>€{currentSubtotal.toLocaleString()}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>ATELIER KEY DISCOUNT ({(appliedDiscount * 100)}%)</span>
                        <span>-€{discountReduction.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-silver-400">
                      <span>SECURE ATELIER SHIPPING</span>
                      <span className="text-[10px] uppercase tracking-wider text-white">COMPLIMENTARY</span>
                    </div>
                    <div className="border-t border-white/5 my-2 pt-2 flex justify-between font-syne text-sm font-bold text-white">
                      <span>TOTAL OUTLAY</span>
                      <span>€{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative group">
                    <button
                      className="w-full py-4 bg-white hover:bg-[#e5e5eb] text-black font-syne text-xs font-bold tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer relative"
                      disabled={isSubmitting}
                      onClick={handleCheckout}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          INITIATE COUTURE ORDER <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="font-serif italic text-[10px] text-silver-400/30 text-center leading-relaxed">
                    "Authenticity guaranteed by the NOIR ÉLITE global cryptography ledger. Returns acceptable within 14 Earth days."
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
