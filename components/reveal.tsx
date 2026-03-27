"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700 will-change-transform",
        visible ? "translate-y-0 opacity-100 blur-0" : "opacity-0 blur-[2px]",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
