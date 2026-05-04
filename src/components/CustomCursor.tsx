"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsMobile(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const detect = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [role='button'], [role='switch']");
      setHovered(!!el);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousemove", detect);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousemove", detect);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="rounded-full border border-primary"
        style={{ width: 18, height: 18 }}
        animate={{ scale: hovered ? 1.8 : 1, backgroundColor: hovered ? "rgba(71,71,71,0.08)" : "transparent" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}
