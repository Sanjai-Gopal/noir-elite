import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const BRAND_QUOTES = [
  "ATELIER NO. 48 | PARIS",
  "EMBRACING THE SOLAR SHADOW",
  "SILENT LUXURY, BOLD GEOMETRY",
  "ARCHITECTURAL HAUTE COUTURE",
  "MILAN / PARIS / TOKYO",
  "NOIR ÉLITE | EST. 2026"
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Counter progress effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds loading time

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(progressPercent);

      if (progressPercent < 100) {
        timer = setTimeout(updateProgress, 30);
      } else {
        // Hold at 100% briefly for animation satisfaction
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onCompleteRef.current();
          }, 800); // Wait for fade-out animation to complete
        }, 400);
      }
    };

    updateProgress();

    return () => clearTimeout(timer);
  }, []);

  // Quote rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % BRAND_QUOTES.length);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader-container"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050505] p-10 h-screen w-screen overflow-hidden noise-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Info Header */}
          <div className="w-full flex justify-between items-start text-[10px] font-mono text-silver-400/40 tracking-widest uppercase">
            <div>NOIR ÉLITE INITIATION</div>
            <div className="text-right">COUTURE COGNITIVE AGENT</div>
          </div>

          {/* Central Typography and Quote reveal */}
          <div className="flex flex-col items-center gap-6 max-w-lg text-center">
            <motion.h1
              id="preloader-brand-title"
              className="font-syne text-3xl md:text-5xl font-extrabold tracking-[0.45em] text-white select-none transition-all"
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.45em", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              NOIR ÉLITE
            </motion.h1>

            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  className="font-mono text-xs md:text-sm font-light text-silver-300/65 tracking-[0.25em]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {BRAND_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Loading Progress bar and Coordinates */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 border-t border-white/5 pt-10">
            <div className="flex flex-col align-start font-mono text-[10px] text-silver-400/50 space-y-1">
              <div>48.8566º N, 2.3522º E [ATELIER PARIS]</div>
              <div>45.4642º N, 9.1900º E [SHOWROOM MILANO]</div>
            </div>

            {/* Percentage design */}
            <div className="flex flex-col items-end w-full md:w-80">
              <div className="flex justify-between items-baseline w-full mb-2 font-mono">
                <span className="text-[10px] uppercase text-silver-400/35 tracking-wider">Loading System Modules</span>
                <span className="text-2xl font-light text-white tracking-widest">{progress}%</span>
              </div>
              <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
