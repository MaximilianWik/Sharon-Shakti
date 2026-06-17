"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroScreen() {
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
          exit={{ opacity: 0, transition: { duration: 0.55, delay: 0.2, ease: "easeIn" } }}
          onClick={handleEnter}
        >
          {/* Banner — rushes toward the viewer on exit */}
          <motion.div
            className="absolute inset-0"
            exit={{ scale: 1.55, transition: { duration: 0.85, ease: [0.4, 0, 1, 1] } }}
          >
            <Image
              src="/banner/banner-desktop-ratio.png"
              alt="Sharon Shakti — Tattoo Nightmare"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Edge vignette */}
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
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              exit={{ opacity: 0, scale: 1.18, transition: { duration: 0.25, ease: "easeIn" } }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Enter site"
            >
              {/* Breathing handled on inner span — completely isolated from x/entrance */}
              <motion.span
                style={{ display: "block" }}
                animate={{
                  opacity: [1, 0.45, 1],
                  filter: [
                    "drop-shadow(0 0 0px transparent)",
                    "drop-shadow(0 0 22px rgba(154,22,32,0.65))",
                    "drop-shadow(0 0 0px transparent)",
                  ],
                }}
                transition={{
                  delay: 1.4,
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Enter
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
