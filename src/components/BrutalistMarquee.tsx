import { motion } from "motion/react";

const MARQUEE_ITEMS = [
  "NOIR ÉLITE | COLD METROPOLIS CAPSULE I",
  "PARIS SHOWROOM: 48.8566º N, 2.3522º E",
  "MATTE BLACK OBSIDIAN TEXTURE",
  "MILANO ATELIER DE COUTURE: 45.4642º N, 9.1900º E",
  "SILENT LUXURY, CHROME METALS",
  "TOKYO ECLIPSE PROTOCOL CONCEPT",
  "LIMITED QUANTITIES AVAILABLE"
];

export default function BrutalistMarquee() {
  // We duplicate items for seamless loop wrapping
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      id="brutalist-marquee-container"
      className="w-full bg-[#050505] py-5 border-y border-white/5 overflow-hidden flex items-center select-none"
    >
      <motion.div
        className="flex whitespace-nowrap gap-12 text-[10px] font-mono font-medium tracking-[0.3em] uppercase text-silver-400/40"
        animate={{ x: [0, -1800] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
