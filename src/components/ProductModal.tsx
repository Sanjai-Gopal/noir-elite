import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [monogramInitials, setMonogramInitials] = useState("");
  const [added, setAdded] = useState(false);

  // Initialize state whenever modal opens/changes
  const initImage = product ? product.image : "";
  if (product && !selectedImage) {
    setSelectedImage(initImage);
  }

  // Set default size and color when product is loaded
  if (product && !size) {
    const availableSizes = product.sizes || ["XS", "S", "M", "L", "XL"];
    setSize(availableSizes[0]);
  }
  if (product && !selectedColor) {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }

  const handleAdd = () => {
    if (!product) return;
    // Embed details of customization
    const customizedProduct = {
      ...product,
      selectedSize: size,
      skuColor: selectedColor?.name,
      giftWrapped: isGiftWrapped,
      initials: monogramInitials || undefined
    };
    onAddToCart(customizedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const availableSizes = product?.sizes || ["XS", "S", "M", "L", "XL"];

  // Custom mock review testimonials for the specific category
  const mockReviews = [
    { author: "Evelyn K.", rating: 5, date: "2 days ago", comment: "The structure is phenomenal. Perfectly maintains its dynamic drapes.", verified: true },
    { author: "H. Takahashi", rating: 5, date: "1 week ago", comment: "The composition is breathtaking. Exactly as described.", verified: true },
    { author: "Jean-Pierre", rating: 4, date: "1 month ago", comment: "Exceptional speed of couture delivery. Atomizer weight is substantial.", verified: true },
  ];

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/85 z-50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage("");
              onClose();
            }}
          />

          {/* Modal Container */}
          <motion.div
            id="product-detail-modal"
            className="fixed inset-4 md:inset-12 lg:inset-x-32 lg:inset-y-16 z-50 bg-[#090909] border border-white/5 rounded-xl flex flex-col md:flex-row overflow-hidden shadow-2xl noise-bg"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Column: Premium Interactive Showcase Gallery */}
            <div className="w-full md:w-1/2 h-[320px] md:h-full bg-[#050505] flex flex-col justify-between p-6 relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/5 text-[9px] font-mono tracking-[0.2em] rounded text-silver-300">
                  {product.category}
                </span>
              </div>

              {/* Main Image Display */}
              <div className="flex-1 flex items-center justify-center overflow-hidden rounded relative">
                <motion.img
                  key={selectedImage}
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover max-h-[480px] grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                  initial={{ opacity: 0.5, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Alternate View Slices */}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  className={`w-12 h-16 rounded overflow-hidden border ${
                    selectedImage === product.image ? "border-white" : "border-white/10"
                  } transition-luxury cursor-pointer`}
                  onClick={() => setSelectedImage(product.image)}
                >
                  <img
                    src={product.image}
                    alt="View 1"
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </button>
                {product.secondaryImage && (
                  <button
                    className={`w-12 h-16 rounded overflow-hidden border ${
                      selectedImage === product.secondaryImage ? "border-white" : "border-white/10"
                    } transition-luxury cursor-pointer`}
                    onClick={() => setSelectedImage(product.secondaryImage)}
                  >
                    <img
                      src={product.secondaryImage}
                      alt="View 2"
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Deep Haute-Couture Details */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-y-auto border-t md:border-t-0 md:border-l border-white/5">
              {/* Top Row: Title, Price, Close button */}
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.25em]">
                        NOIR ÉLITE ARCHIVE NO. {product.id.split("-")[1].toUpperCase()}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px]">
                          <span>★</span>
                          <span>{product.rating.toFixed(1)}</span>
                          <span className="opacity-50">({product.reviewsCount || 12})</span>
                        </div>
                      )}
                    </div>
                    <h2 className="font-syne text-2xl lg:text-3xl font-light tracking-wider text-white">
                      {product.name}
                    </h2>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedImage("");
                      onClose();
                    }}
                    aria-label="Close Product Details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Price tag with potential sale markdown */}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xl text-white font-light">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs text-silver-400/50 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded uppercase tracking-wider">
                      STUDIO DIRECT RATE
                    </span>
                  )}
                </div>

                <div className="h-[1px] bg-white/5 my-4" />

                {/* Narrative description */}
                <p className="font-serif italic text-sm text-silver-300/90 leading-relaxed">
                  "{product.description}"
                </p>

                {/* Dynamic Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-[#ffffff]/40 uppercase tracking-widest block">
                      ARCHIVAL SHADE PATTERN: <span className="text-white font-normal uppercase">{selectedColor?.name}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                            selectedColor?.name === color.name
                              ? "border-white scale-110"
                              : "border-white/10 hover:border-white/40"
                          }`}
                          title={color.name}
                        >
                          <span
                            className="w-5 h-5 rounded-full block"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dynamic Size Selection */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-[#ffffff]/40 uppercase tracking-widest">
                      CHOOSE SIZE PROFILE
                    </span>
                    <span className="font-mono text-[9px] text-silver-400 hover:text-white cursor-pointer transition-all">
                      ANATOMICAL LEDGER
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((s) => (
                      <button
                        key={s}
                        className={`px-4 py-2 font-mono text-xs flex items-center justify-center transition-all duration-300 cursor-pointer border ${
                          size === s
                            ? "bg-white text-black border-white"
                            : "border-white/5 hover:border-white/40 text-silver-400"
                        }`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Stock Alert & Atelier location */}
                {product.stockCount && (
                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded font-mono text-[10px] text-amber-300 flex items-center justify-between">
                    <span>
                      ⚠️ EXTREMELY LIMITED RUN: <strong>{product.stockCount} UNITS REMAINING</strong>
                    </span>
                    <span className="opacity-80">
                      Couture Loc: {product.origin.split(",")[0]}
                    </span>
                  </div>
                )}

                {/* Luxury Bespoke Packaging & Monogramming Addons */}
                <div className="space-y-3 p-4 rounded bg-[#ffffff]/[0.02] border border-white/5">
                  <span className="font-mono text-[9px] text-[#ffffff]/50 uppercase tracking-widest block">
                    Bespoke Atelier Commissioning
                  </span>
                  
                  {/* Monogram Box */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-silver-400 block uppercase">
                      Laser Engrave Initials (Max 3 Characters)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={monogramInitials}
                      onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                      placeholder="E.g., ELT"
                      className="w-full bg-black/40 border border-white/10 px-3 py-1.5 rounded font-mono text-xs text-white uppercase placeholder-silver-600 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  {/* Gift Wrapping checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer mt-2 group select-none">
                    <input
                      type="checkbox"
                      checked={isGiftWrapped}
                      onChange={() => setIsGiftWrapped(!isGiftWrapped)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border flex items-center justify-center rounded transition-all duration-300 ${
                      isGiftWrapped ? "bg-white border-white text-black" : "border-white/20 group-hover:border-white/50 bg-transparent"
                    }`}>
                      {isGiftWrapped && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="font-mono text-[10px] text-silver-300 group-hover:text-white transition-colors uppercase">
                      Obsidian Solid-Oak Custom Box Wrap (+€45)
                    </span>
                  </label>
                </div>

                {/* Specifications Ledger */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                    Product Anatomical Ledger
                  </span>
                  <div className="p-4 rounded bg-[#050505] border border-white/5 space-y-2">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex gap-2 items-start font-mono text-[10px] text-silver-400">
                        <span className="text-white/20 select-none">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composition, Origin */}
                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono p-4 border border-white/5 rounded">
                  <div className="space-y-1">
                    <span className="text-silver-400/40 uppercase tracking-wider block">COMPOSITION:</span>
                    <span className="text-silver-300 font-light">{product.composition}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-silver-400/40 uppercase tracking-wider block">ORIGIN:</span>
                    <span className="text-silver-300 font-light flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> {product.origin}
                    </span>
                  </div>
                </div>

                {/* Chronicles of Acquisition (Reviews Section) */}
                <div className="space-y-4 pt-2">
                  <span className="font-mono text-[9px] text-silver-400/40 uppercase tracking-widest block">
                    Chronicles of Acquisition (Reviews)
                  </span>
                  <div className="space-y-3">
                    {mockReviews.map((review, idx) => (
                      <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-white/80 font-medium">{review.author}</span>
                          <span className="text-silver-500">{review.date}</span>
                        </div>
                        <div className="flex gap-1 text-[9px] text-amber-400 font-mono">
                          {"★".repeat(review.rating)}
                          <span className="px-1.5 ml-1 py-0.2 text-[8px] bg-green-500/10 text-green-400 uppercase rounded">
                            Verified Client
                          </span>
                        </div>
                        <p className="font-serif italic text-xs text-silver-300/80 leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Cart addition, safety indicators */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-6">
                <div className="flex gap-4">
                  <button
                    className={`flex-1 py-4 font-syne text-xs font-bold tracking-[0.25em] uppercase transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 ${
                      product.availStatus === "ARCHIVE ONLY"
                        ? "bg-transparent border border-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white hover:bg-[#e5e5eb] text-black"
                    }`}
                    disabled={product.availStatus === "ARCHIVE ONLY"}
                    onClick={handleAdd}
                  >
                    {added ? (
                      <>
                        SECURED <Check className="w-4 h-4" />
                      </>
                    ) : product.availStatus === "ARCHIVE ONLY" ? (
                      "ARCHIVED"
                    ) : (
                      <>
                        ADD TO COLLECTION <Sparkles className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center text-[9px] font-mono text-silver-400/40">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE DEPOSIT GUARANTEED
                  </span>
                  <span>STATUS: {product.availStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
