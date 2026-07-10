"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const MAX_PULL = 10;

export function MagneticButton({
  children,
  className,
  href,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 16, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 180, damping: 16, mass: 0.2 });

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.3)));
    rawY.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.3)));
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const shared = {
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    whileTap: { scale: 0.97 },
    className,
  };

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        ref={(node) => {
          ref.current = node;
        }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...shared}
      type={type}
      onClick={onClick}
      ref={(node) => {
        ref.current = node;
      }}
    >
      {children}
    </motion.button>
  );
}
