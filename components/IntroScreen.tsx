"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroScreen() {
  // Start hidden to avoid hydration flash; reveal after mount if not yet seen.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("sharon-intro-seen");
    if (!seen) setVisible(true);
  }, []);

  // Lock body scroll while the intro is in front.
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  function handleEnter() {
    sessionStorage.setItem("sharon-intro-seen", "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          // Clicking anywhere outside the button also enters (quality of life).
          onClick={handleEnter}
        >
          {/* Banner — zooms in slightly on exit for a "step through" feel */}
          <motion.div
            className="absolute inset-0"
            exit={{ scale: 1.06 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Desktop fill layer: blurred + dimmed, covers black bars on wide viewports */}
            <Image
              src="/banner/banner-desktop-ratio.png"
              alt=""
              fill
              className="hidden object-cover opacity-40 blur-2xl md:block"
              priority
              aria-hidden
            />
            {/* Mobile: portrait banner */}
            <Image
              src="/banner/banner.png"
              alt="Sharon Shakti — Tattoo Nightmare"
              fill
              className="object-contain md:hidden"
              priority
            />
            {/* Desktop: sharp image on top of the fill */}
            <Image
              src="/banner/banner-desktop-ratio.png"
              alt="Sharon Shakti — Tattoo Nightmare"
              fill
              className="hidden object-contain md:block"
              priority
            />
          </motion.div>

          {/* Edge vignette — reinforces the dark frame of the business card */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

          {/* Enter — left, vertically centred */}
          <div
            className="relative z-10 flex h-full items-center"
            style={{ paddingLeft: "clamp(2rem, 8vw, 9rem)" }}
          >
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleEnter(); }}
              className="intro-enter font-display leading-none text-[#898989]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)" }}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, scale: 1.12 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Enter site"
            >
              Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
