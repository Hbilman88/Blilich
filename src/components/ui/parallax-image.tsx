"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  yPercent?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "object-cover",
  containerClassName = "relative w-full h-full overflow-hidden",
  sizes = "100vw",
  priority = false,
  yPercent = -10,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !imageWrapperRef.current) return;

      gsap.fromTo(
        imageWrapperRef.current,
        {
          yPercent: Math.abs(yPercent),
        },
        {
          yPercent: yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={containerClassName}>
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
        />
      </div>
    </div>
  );
}
