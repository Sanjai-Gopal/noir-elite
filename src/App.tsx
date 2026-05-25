import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Eye,
  Globe,
  Sparkles,
  ChevronRight,
  Info,
  Clock,
  Heart,
  Plus,
  Mail,
  Instagram,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  ListFilter,
  RotateCcw,
  Check
} from "lucide-react";

import { Product } from "./types";
import { PRODUCTS, COLLECTIONS, CAMPAIGNS } from "./data";

// Components
import Preloader from "./components/Preloader";
import ThreeBackdrop from "./components/ThreeBackdrop";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import BrutalistMarquee from "./components/BrutalistMarquee";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [filter, setFilter] = useState("ALL");

  // Haute Couture Light/Dark Theme Switcher
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("noir-elite-theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }
    localStorage.setItem("noir-elite-theme", theme);
  }, [theme]);
  
  // Advanced e-commerce search, sort and tracking states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("DEFAULT");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Recently Viewed tracker trigger
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 4); // Keep last 4 items
    });
  };
  
  // High fidelity micro-interactions
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [utcTime, setUtcTime] = useState("");

  // Live UTC Clock running effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setUtcTime(now.toLocaleTimeString("en-US", options) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer simulation for scroll highlights
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      const sections = ["hero", "collections", "catalog", "campaigns"];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Fire premium micro toast feedback
    setToastMessage(`ADDED ${product.name} TO LA SÉLECTION`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    const isAdded = !wishlist.includes(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setToastMessage(
        isAdded
          ? `ADDED ${prod.name} TO ARCHIVE WISHLIST`
          : `REMOVED ${prod.name} FROM ARCHIVE WISHLIST`
      );
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Filter Categories
  const categories = ["ALL", "HAUTE COUTURE", "MAISON DE PARFUM", "ACCESSORIES", "FOOTWEAR", "LEATHER GOODS"];
  
  // Advanced filtered and sorted computations
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category Filter
    if (filter !== "ALL" && product.category !== filter) return false;

    // 2. Search Query (Matches name, category, composition, tags, or specifications)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCat = product.category.toLowerCase().includes(q);
      const matchesComp = product.composition.toLowerCase().includes(q);
      const matchesSpec = product.specifications.some((spec) => spec.toLowerCase().includes(q));
      if (!matchesName && !matchesCat && !matchesComp && !matchesSpec) return false;
    }

    // 3. Sizes filter
    if (selectedSizes.length > 0) {
      if (!product.sizes) return false;
      const hasSize = product.sizes.some((sz) => selectedSizes.includes(sz));
      if (!hasSize) return false;
    }

    // 4. Tags filter
    if (selectedTags.length > 0) {
      if (!product.tags) return false;
      const hasTag = product.tags.some((tg) => selectedTags.includes(tg));
      if (!hasTag) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "PRICE_ASC") {
      const pA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
      const pB = parseInt(b.price.replace(/[^\d]/g, ""), 10);
      return pA - pB;
    }
    if (sortBy === "PRICE_DESC") {
      const pA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
      const pB = parseInt(b.price.replace(/[^\d]/g, ""), 10);
      return pB - pA;
    }
    if (sortBy === "RATING_DESC") {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === "ALPHABETICAL") {
      return a.name.localeCompare(b.name);
    }
    return 0; // Default order
  });

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-white selection:text-black scroll-smooth">
      
      {/* 1. CINEMATIC LOADING INITIALIZATION */}
      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          {/* GLOBAL AMBIENT LIGHTING SPOTLIGHT */}
          <div className="fixed inset-0 ambient-spotlight opacity-80 pointer-events-none z-0" />

          {/* 3D WEBGL PERFUME MONOLITH PARALLAX FIELD */}
          <div className="fixed inset-0 w-full h-full z-1 pointer-events-none opacity-60">
            <ThreeBackdrop theme={theme} />
          </div>

          {/* BACKGROUND MATTE NOISE TEXTURE */}
          <div className="fixed inset-0 w-full h-full noise-bg z-2 pointer-events-none" />

          {/* SUBTLE NOISE OVERLAY */}
          <div className="fixed inset-0 pointer-events-none z-50 stardust-overlay" />

          {/* FLOAT TOAST PANEL */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                id="global-toast-indicator"
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3 shadow-2xl"
                initial={{ y: 50, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                exit={{ y: 20, x: "-50%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-medium">
                  {toastMessage}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GLOBAL NAVBAR */}
          <Navbar
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          {/* --- MAIN EDITORIAL LAYOUT WRAP --- */}
          <main className="relative z-10 w-full">

            {/* A. HERO SECTION */}
            <section
              id="hero"
              className="min-h-screen relative flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 select-none"
            >
              <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 mt-12">
                {/* Editorial quote */}
                <div className="max-w-md">
                  <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                    Collection Manifeste
                  </span>
                  <p className="font-serif italic text-lg md:text-xl text-silver-300 leading-relaxed mt-2">
                    "We seek the timeless form that sculpts the human silhouette in absolute shadow. Every weave is an echo of raw tectonic structure."
                  </p>
                </div>

                <div className="text-right font-mono text-[9px] text-silver-400/30 space-y-1 uppercase tracking-widest">
                  <div>Model No. NE-W26</div>
                  <div>Interactive Orbital 3D Mesh</div>
                  <div>Mouse parallax enabled</div>
                </div>
              </div>

              {/* Giant Centered Display Branding Title */}
              <div className="relative my-[6vh] text-center flex flex-col items-center justify-center min-h-[30vh]">
                {/* Giant Ambient Background Watermark */}
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] leading-none font-bold text-white/[0.02] tracking-tighter italic select-none pointer-events-none z-0">
                  ÉLITE
                </h2>

                <motion.h1
                  id="hero-main-title"
                  className="font-sans text-[7vw] font-extralight tracking-[0.8em] uppercase text-white leading-none inline-block relative z-10 transition-all duration-700 hover:tracking-[0.85em] cursor-default select-none pl-[0.8em]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  NOIR ÉLITE
                </motion.h1>
                <p className="font-mono text-[9px] md:text-[11px] text-silver-400/50 uppercase tracking-[0.5em] mt-6 relative z-10">
                  Paris / Milan / Tokyo · Automated Haute Couture System
                </p>
              </div>

              {/* Showcase Highlight Box: signature perfume */}
              <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 pt-8 border-t border-white/5">
                <div
                  className="group flex items-center gap-5 cursor-pointer p-4 rounded-xl border border-white/5 bg-[#090909]/45 backdrop-blur-md max-w-sm transition-luxury"
                  onClick={() => setSelectedProduct(PRODUCTS[0])} // L'Éternel Perfume
                >
                  <img
                     src="./assets/images/perfume-bottle.png"
                     alt="L'Éternel bottle preview"
                     className="w-14 h-18 object-cover rounded grayscale group-hover:grayscale-0 transition-luxury"
                  />
                  <div>
                    <span className="font-mono text-[8px] text-silver-400/40 uppercase tracking-widest block">
                      Signature Essence
                    </span>
                    <h3 className="font-syne text-xs font-bold text-white tracking-widest uppercase">
                      L'ÉTERNEL NOIR
                    </h3>
                    <span className="font-mono text-[9px] text-silver-300 hover:underline mt-1 flex items-center gap-1">
                      DISCOVER SACRED FORM <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Micro Action Button and down indicators */}
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                  <button
                    className="font-montserrat text-[10px] tracking-widest text-[#ffffff]/60 hover:text-white uppercase flex items-center gap-2 border-b border-white/20 pb-1 cursor-pointer transition-luxury"
                    onClick={() => scrollToSection("collections")}
                  >
                    EXPLORE CHRONICLES <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </button>
                </div>
              </div>
            </section>

            {/* CONTINUOUS BRUTALIST INFINTY RUNNER MARQUEE */}
            <BrutalistMarquee />

            {/* B. MAISON PHILOSOPHY & MANIFESTO GRID */}
            <section
              id="philosophies"
              className="py-24 px-6 md:px-12 bg-[#060606] border-b border-white/5 relative"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Col 1: High Resolution Showroom view */}
                <div className="col-span-1 lg:col-span-7 relative group overflow-hidden rounded-xl border border-white/5">
                  <div className="absolute inset-0 bg-black/10 z-10" />
                  <img
                    src="./assets/images/showroom-banner.png"
                    alt="Noir Elite architecture"
                    className="w-full aspect-[16/9] object-cover transition-all duration-700"
                  />
                  <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-silver-400 tracking-wider flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 animate-spin" /> ARCHITECTURE RECORD NO. 8847/MILAN
                  </div>
                </div>

                {/* Col 2: Text Manifesto representation */}
                <div className="col-span-1 lg:col-span-5 space-y-6">
                  <span className="font-mono text-[9px] text-[#ffffff]/40 uppercase tracking-[0.25em] block">
                    Maison Philosophy & Ideals
                  </span>
                  <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-wider text-white">
                    SHADOW & MASS
                  </h2>
                  <p className="font-serif italic text-[#d1d1d6]/80 text-[15px] leading-relaxed">
                    "We do not design clothes for seasons; we construct shields for individuals navigating the hyper-exposed cities. Noir is not merely a hue, it is an optical sanctuary—a canvas of zero scattering."
                  </p>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-white">
                        01
                      </div>
                      <div>
                        <h4 className="font-syne text-xs font-semibold text-white tracking-widest uppercase">
                          Basalt Sintered Textures
                        </h4>
                        <p className="font-sans text-xs text-silver-400 mt-1 leading-relaxed">
                          Fusing organic threads with mineral elements for garments that retain geometric weight and shape.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-white">
                        02
                      </div>
                      <div>
                        <h4 className="font-syne text-xs font-semibold text-white tracking-widest uppercase">
                          Crystalline Chemistry
                        </h4>
                        <p className="font-sans text-xs text-silver-400 mt-1 leading-relaxed">
                          Pure obsidian mineral integration within accessories to absorb stray radiation and reflect high-contrast luster.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* C. COLLECTIONS SECTION */}
            <section
              id="collections"
              className="py-32 px-6 md:px-12 backdrop-blur-sm relative"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-left">
                  <div>
                    <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                      Seasonal Releases
                    </span>
                    <h2 className="font-syne text-3xl md:text-5xl font-extrabold tracking-wider text-white mt-2">
                      EXCLUSIVE CAPSULES
                    </h2>
                  </div>
                  <p className="max-w-md font-serif italic text-xs md:text-sm text-silver-400/80 leading-relaxed">
                    "Two cohesive worlds designed to construct complete visual and physical shields. Made in limited runs with traceable cryptography labels."
                  </p>
                </div>

                {/* Collections Slide/Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {COLLECTIONS.map((c) => (
                    <div
                      key={c.id}
                      className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#080808]/75 border border-white/5 hover:border-white/20 transition-luxury overflow-hidden noise-bg h-[540px]"
                    >
                      {/* Background banner parallax overlay */}
                      <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-all duration-1000">
                        <img
                          src={c.heroImage}
                          alt=""
                          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-luxury-long grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Header block */}
                      <div className="relative z-10 flex justify-between items-start font-mono text-[9px] text-silver-400">
                        <span>{c.season}</span>
                        <span>{c.coordinates}</span>
                      </div>

                      {/* Title narrative block */}
                      <div className="relative z-10 space-y-4">
                        <span className="font-mono text-[9px] text-[#ffffff]/30 uppercase tracking-[0.3em] block">
                          Capsule Chronograph
                        </span>
                        <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-wider text-white uppercase">
                          {c.title}
                        </h3>
                        <p className="font-serif italic text-sm text-[#ffffff]/70 group-hover:text-white transition-colors duration-500">
                          "{c.tagline}"
                        </p>
                        <p className="font-sans text-xs text-silver-400 leading-relaxed max-w-sm">
                          {c.description}
                        </p>

                        <blockquote className="border-l border-white/40 pl-4 py-1 italic font-serif text-[11px] text-silver-400 max-w-sm">
                          {c.manifesto}
                        </blockquote>
                      </div>

                      {/* Action trigger button */}
                      <div className="relative z-10 pt-4 border-t border-white/5">
                        <button
                          className="font-montserrat text-[10px] font-bold tracking-[0.25em] text-white hover:text-silver-300 uppercase flex items-center gap-2 cursor-pointer transition-colors"
                          onClick={() => {
                            setFilter("ALL");
                            scrollToSection("catalog");
                          }}
                        >
                          EXPLORE PRODUCTS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* D. PRODUCT CATALOG SECTION (HAUTE COUTURE SPECIMENS) */}
            <section
              id="catalog"
              className="py-32 px-6 md:px-12 bg-[#060606] border-y border-white/5 relative"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Catalog headers */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 text-left">
                  <div>
                    <span className="font-mono text-[9px] text-[#ffffff]/40 uppercase tracking-[0.25em] block">
                      Maison Specimen Ledger
                    </span>
                    <h2 className="font-syne text-3xl md:text-5xl font-extrabold tracking-wider text-white mt-2">
                      HAUTE COUTURE CATALOG
                    </h2>
                  </div>

                  {/* Horizontal filter capsules */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`px-4 py-2 font-mono text-[9px] tracking-widest rounded-full border transition-luxury cursor-pointer uppercase ${
                          filter === cat
                            ? "bg-white text-black border-white"
                            : "bg-[#0b0b0b] border-white/5 hover:border-white/35 text-silver-400/80"
                        }`}
                        onClick={() => setFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ADVANCED RETAIL FILTERS BELT */}
                <div className="p-6 bg-[#090909] border border-white/5 rounded-2xl md:p-8 space-y-6">
                  {/* Top belt: search + sorting dropdown */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                    {/* Omni Search Box */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-500 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH THE ATELIER ARCHIVE..."
                        className="w-full bg-black/50 border border-white/5 hover:border-white/15 focus:border-white/30 rounded-full pl-11 pr-5 py-3 text-xs font-mono text-white placeholder-silver-500 focus:outline-none transition-all uppercase"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-silver-500 hover:text-white text-xs font-mono cursor-pointer"
                        >
                          CLEAR
                        </button>
                      )}
                    </div>

                    {/* Sorting criteria & live counter */}
                    <div className="flex items-center gap-4 justify-between md:justify-end font-mono">
                      <span className="text-[10px] text-silver-400/50 uppercase tracking-widest">
                        {filteredProducts.length} SPECIMENS
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <ListFilter className="w-3.5 h-3.5 text-silver-400" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-black/80 border border-white/5 hover:border-white/20 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded focus:outline-none cursor-pointer transition-all"
                        >
                          <option value="DEFAULT">CHOOSE SORT CRITERIA</option>
                          <option value="PRICE_ASC">PRICE: LOW TO HIGH</option>
                          <option value="PRICE_DESC">PRICE: HIGH TO LOW</option>
                          <option value="RATING_DESC">CUSTOMER RATING</option>
                          <option value="ALPHABETICAL">ALPHABETICAL A-Z</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bottom belt: Sizing toggles, Tag tokens, reset button */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/5">
                    {/* Sizing selection filter */}
                    <div className="md:col-span-5 space-y-2 text-left">
                      <span className="font-mono text-[8px] text-[#ffffff]/30 uppercase tracking-widest block">
                        ANATOMICAL CALIBER FILTER:
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-start">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((itemSize) => {
                          const isSelected = selectedSizes.includes(itemSize);
                          return (
                            <button
                              key={itemSize}
                              onClick={() => {
                                setSelectedSizes((prev) =>
                                  isSelected ? prev.filter((s) => s !== itemSize) : [...prev, itemSize]
                                );
                              }}
                              className={`px-2.5 py-1.5 font-mono text-[9px] rounded border transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-white text-black border-white"
                                  : "bg-black/30 border-white/5 hover:border-white/20 text-silver-400"
                              }`}
                            >
                              {itemSize}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tag filter selector */}
                    <div className="md:col-span-5 space-y-2 text-left">
                      <span className="font-mono text-[8px] text-[#ffffff]/30 uppercase tracking-widest block">
                        SPECIMEN STATUS TAG:
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-start">
                        {["NEW SEASON", "EXCLUSIVE", "COUTURE", "LIMITED RUN", "READY TO WEAR"].map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => {
                                setSelectedTags((prev) =>
                                  isSelected ? prev.filter((t) => t !== tag) : [...prev, tag]
                                );
                              }}
                              className={`px-2.5 py-1.5 font-mono text-[8px] tracking-wider rounded border uppercase transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-white text-black border-white"
                                  : "bg-black/30 border-white/5 hover:border-white/20 text-silver-400"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Clear actions */}
                    <div className="md:col-span-2 flex items-end justify-start md:justify-end">
                      {(searchQuery || sortBy !== "DEFAULT" || selectedSizes.length > 0 || selectedTags.length > 0 || filter !== "ALL") && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSortBy("DEFAULT");
                            setSelectedSizes([]);
                            setSelectedTags([]);
                            setFilter("ALL");
                          }}
                          className="font-mono text-[9px] text-[#bf9f62] hover:text-white uppercase tracking-widest flex items-center gap-1.5 cursor-pointer border border-[#bf9f62]/20 hover:border-white/40 px-3 py-2 rounded bg-amber-500/5 transition-all w-full md:w-auto justify-center"
                        >
                          <RotateCcw className="w-3 h-3" /> RESTORE FILTERS
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => {
                      const isProductWishlisted = wishlist.includes(product.id);
                      return (
                        <motion.div
                          key={product.id}
                          className="group bg-[#090909] border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-white/20 transition-luxury relative cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                          layout
                          onClick={() => handleSelectProduct(product)}
                        >
                          {/* Image box */}
                          <div className="w-full aspect-[3/4] rounded-lg bg-[#050505] overflow-hidden relative">
                            {/* Wishlist toggle */}
                            <button
                              aria-label="Wishlist toggle"
                              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 flex items-center justify-center text-silver-400 hover:text-white transition-luxury cursor-pointer"
                              onClick={(e) => toggleWishlist(product.id, e)}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  isProductWishlisted
                                    ? "fill-white text-white"
                                    : "text-silver-400"
                                }`}
                              />
                            </button>

                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                              referrerPolicy="no-referrer"
                            />

                            {/* Hover overlay text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-luxury flex items-end p-4">
                              <span className="font-mono text-[9px] text-white tracking-[0.25em] flex items-center gap-1.5 pt-1 uppercase">
                                <Eye className="w-3.5 h-3.5" /> SPECIFICATION SHEET
                              </span>
                            </div>
                          </div>

                          {/* Product meta label info */}
                          <div className="pt-5 space-y-2">
                            <div className="flex justify-between items-baseline">
                              <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest">
                                {product.category}
                              </span>
                              <span className="font-mono text-[9px] text-silver-400/40 tracking-widest uppercase">
                                {product.origin.split(",")[0]}
                              </span>
                            </div>

                            <div className="flex justify-between items-start">
                              <h3 className="font-syne text-sm font-bold tracking-wider uppercase text-white group-hover:text-silver-200 transition-colors">
                                {product.name}
                              </h3>
                              <span className="font-mono text-xs text-white pl-2">
                                {product.price}
                              </span>
                            </div>
                          </div>

                          {/* Action panel underneath */}
                          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-[#ffffff]/30 uppercase tracking-[0.15em] hover:underline flex items-center gap-1">
                              Quick View <ArrowUpRight className="w-3 h-3" />
                            </span>
                            
                            <button
                              aria-label="Add to cart directly"
                              className="w-7 h-7 rounded-full border border-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-luxury cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* RECENT COUTURE ENCOUNTERS (Recently Viewed Catalog Items) */}
                <AnimatePresence>
                  {recentlyViewed.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="pt-16 mt-16 border-t border-white/5 space-y-6"
                    >
                      <div className="flex justify-between items-end">
                        <div className="text-left">
                          <span className="font-mono text-[9px] text-[#ffffff]/30 uppercase tracking-[0.25em] block">
                            Browsing Chronicles
                          </span>
                          <h3 className="font-syne text-lg font-bold tracking-wider text-white uppercase mt-1">
                            RECENT COUTURE ENCOUNTERS
                          </h3>
                        </div>
                        <button
                          onClick={() => setRecentlyViewed([])}
                          className="font-mono text-[10px] text-silver-400 hover:text-white uppercase tracking-widest flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none"
                        >
                          Wipe History
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {recentlyViewed.map((item) => (
                          <div
                            key={`recent-${item.id}`}
                            onClick={() => handleSelectProduct(item)}
                            className="group p-3 rounded-lg bg-black/40 border border-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer text-left flex gap-3 items-center"
                          >
                            <div className="w-[50px] h-[65px] bg-[#050505] overflow-hidden rounded flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="font-mono text-[8px] text-silver-500 block uppercase tracking-wide truncate">
                                {item.category}
                              </span>
                              <h4 className="font-syne text-[11px] font-bold text-white uppercase tracking-wide truncate group-hover:text-[#bf9f62] transition-colors duration-300">
                                {item.name}
                              </h4>
                              <span className="font-mono text-[10px] text-silver-300 block mt-0.5">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* E. CAMPAIGNS SECTION */}
            <section
              id="campaigns"
              className="py-32 px-6 md:px-12 backdrop-blur-sm relative"
            >
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Campaigns headers */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-left">
                  <div>
                    <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block font-bold">
                      Atmospheric Chronicles
                    </span>
                    <h2 className="font-syne text-3xl md:text-5xl font-extrabold tracking-wider text-white mt-1">
                      GLOBAL CAMPAIGNS
                    </h2>
                  </div>
                  <p className="max-w-md font-serif italic text-xs md:text-sm text-silver-400/80 leading-relaxed">
                    "Sculptural dialogues in dramatic natural environments. Realised with high-gravity reflective reflectors and analog cameras."
                  </p>
                </div>

                {/* Campaigns Split Bento Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {CAMPAIGNS.map((camp) => (
                    <div
                      key={camp.id}
                      className="group relative h-[480px] rounded-xl overflow-hidden border border-white/5 flex flex-col justify-end p-8"
                    >
                      {/* Interactive background Zoom photo */}
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/0 z-10" />
                        <img
                          src={camp.image}
                          alt={camp.title}
                          className="w-full h-full object-cover grayscale brightness-75 scale-100 group-hover:scale-105 transition-luxury-long"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Monospace Year indicator */}
                      <div className="absolute top-6 right-6 z-20 font-mono text-[10px] text-white/50 tracking-widest px-3 py-1 rounded bg-[#050505]/60 border border-white/5">
                        {camp.year}
                      </div>

                      {/* Content block */}
                      <div className="relative z-20 space-y-4">
                        <span className="font-mono text-[8px] text-[#ffffff]/40 uppercase tracking-[0.25em] block">
                          {camp.subtitle}
                        </span>
                        <h3 className="font-syne text-xl md:text-2xl font-bold tracking-widest uppercase text-white">
                          {camp.title}
                        </h3>
                        <p className="font-sans text-xs text-silver-300 leading-relaxed max-w-sm">
                          {camp.description}
                        </p>
                        
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-silver-400">
                          <span className="flex items-center gap-1.5 uppercase tracking-wider">
                            LOCATION: {camp.location}
                          </span>
                          <span className="text-white group-hover:underline flex items-center gap-1 cursor-pointer">
                            VIEW GALLERY <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* F. DIGITAL EXCLUSIVE SIGNUP & SYSTEM METADATA FOOTER */}
            <footer className="bg-[#050505] border-t border-white/5 py-24 px-6 md:px-12 relative z-10 noise-bg select-none">
              <div className="max-w-7xl mx-auto space-y-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-16">
                  
                  {/* Left block - newsletter subscription */}
                  <div className="col-span-1 lg:col-span-6 space-y-6">
                    <span className="font-mono text-[9px] text-[#ffffff]/30 uppercase tracking-[0.25em] block">
                      Exclusive Communications
                    </span>
                    <h3 className="font-syne text-2xl font-bold tracking-wider text-white uppercase">
                      THE ECLIPSE DISPATCH
                    </h3>
                    <p className="font-serif italic text-sm text-silver-400 leading-relaxed max-w-md">
                      "Join the inner capsule register. Receive invitations to localized metropolitan showrooms, limited cryptography allocations, and physical manifestos."
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          placeholder="ENTER DEPOSIT EMAIL"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-[#090909] border border-white/10 rounded focus:border-white focus:outline-none font-mono text-xs tracking-wider"
                          disabled={newsletterSubscribed}
                        />
                        <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-silver-400/30" />
                      </div>
                      <button
                        type="submit"
                        className="px-6 bg-white hover:bg-[#e5e5eb] text-black font-syne text-xs font-bold tracking-widest uppercase transition-luxury cursor-pointer"
                        disabled={newsletterSubscribed}
                      >
                        {newsletterSubscribed ? "REGISTERED" : "SIGN UP"}
                      </button>
                    </form>

                    <AnimatePresence>
                      {newsletterSubscribed && (
                        <motion.div
                          className="flex items-center gap-2 text-xs font-mono text-green-400"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <CheckCircle2 className="w-4 h-4" /> SECURE REGISTER VERIFIED: WELCOME TO NOIR ÉLITE
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right block - links and credentials */}
                  <div className="col-span-1 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                    
                    <div className="space-y-4">
                      <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                        COLLECTIONS
                      </span>
                      <ul className="space-y-2 font-mono text-xs text-silver-400">
                        <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollToSection("collections")}>CAPSULE I: COLD METROPOLIS</li>
                        <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollToSection("collections")}>HAUTE COUTURE II</li>
                        <li className="hover:text-silver-400/35 transition-colors cursor-not-allowed">ARCHIVE SPECIMENS [LOCKED]</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                        METROPOLIS ATELIERS
                      </span>
                      <ul className="space-y-2 font-mono text-xs text-silver-400 uppercase">
                        <li>RUE DE L'OBSIDIENNE, PARIS</li>
                        <li>CORSO GARIBALDI, MILANO</li>
                        <li>AOYAMA CRESCENT, TOKYO</li>
                      </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 space-y-4">
                      <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                        DIGITAL CHANNELS
                      </span>
                      <div className="flex gap-4">
                        <a
                          href="https://instagram.com"
                          className="w-10 h-10 border border-white/5 rounded flex items-center justify-center text-silver-400 hover:text-white hover:border-white/20 transition-luxury"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a
                          href="https://google.com"
                          className="w-10 h-10 border border-white/5 rounded flex items-center justify-center text-silver-400 hover:text-white hover:border-white/20 transition-luxury"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Subfooter: Global headquarters coordinates and Running clock */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-silver-400/35">
                  <div className="flex gap-4 flex-wrap justify-center text-center">
                    <span>© 2026 NOIR ÉLITE CORPORATION. ALL RIGHTS PRESERVED.</span>
                    <span>ATELIER DE CRYPTOGRAPHIE SARTORIALE</span>
                  </div>

                  {/* Live Clock display */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-[#090909]/60">
                    <Clock className="w-3.5 h-3.5 animate-pulse text-white/55" />
                    <span className="text-white tracking-widest font-semibold">{utcTime}</span>
                  </div>
                </div>

              </div>
            </footer>
          </main>

          {/* HAUTE COUTURE SYSTEM MODAL (PRODUCT DETAILS COMPANION) */}
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        </>
      )}
    </div>
  );
}
