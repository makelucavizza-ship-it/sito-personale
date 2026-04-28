"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState =
  | "default"
  | "link"
  | "carousel"
  | "faq"
  | "linkedin"
  | "instagram";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
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

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const detectState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;

      if (!el) {
        setState("default");
        return;
      }

      const cursor = el.dataset.cursor;
      if (cursor === "carousel") setState("carousel");
      else if (cursor === "faq") setState("faq");
      else if (cursor === "linkedin") setState("linkedin");
      else if (cursor === "instagram") setState("instagram");
      else setState("link");
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousemove", detectState);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousemove", detectState);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  const borderColor =
    state === "linkedin"
      ? "#0077B5"
      : state === "instagram"
      ? "#E1306C"
      : "#ffffff";

  const scale =
    state === "link" || state === "carousel" || state === "faq"
      ? 2.5
      : 1;

  const showText = state === "carousel" || state === "faq";
  const cursorText = state === "carousel" ? "scopri →" : "+";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 20,
          height: 20,
          border: `1.5px solid ${borderColor}`,
          backgroundColor:
            state === "link" ? "rgba(255,255,255,0.15)" : "transparent",
        }}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {showText && (
          <span
            className="text-[7px] font-phenomena font-bold whitespace-nowrap text-white select-none"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
