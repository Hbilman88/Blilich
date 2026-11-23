"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface StatItem {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  highlight?: boolean;
}

const STATS: StatItem[] = [
  { prefix: "+", value: 40, label: "Collaborateurs Qualifiés", highlight: true },
  { value: 5, label: "Ingénieurs Chefs de Projet" },
  { value: 8, label: "Conducteurs de Travaux" },
  { prefix: "+", value: 30, label: "Techniciens de Terrain" },
  { value: 1, label: "Atelier Câblage à Casablanca", highlight: true },
];

export function TelemetryStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Staggered entry of the stats boxes
      gsap.from(".telemetry-box", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Count-up animation for each number
      STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (el) {
              el.innerText = Math.round(obj.val).toString();
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-white dark:bg-slate-900 border-b border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`telemetry-box pt-4 md:pt-0 ${
                idx === STATS.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <p
                className={`text-3xl sm:text-4xl font-heading font-extrabold ${
                  stat.highlight ? "text-[#007A63]" : "text-foreground"
                }`}
              >
                {stat.prefix && <span>{stat.prefix}</span>}
                <span
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                >
                  {stat.value}
                </span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </p>
              <p className="text-xs uppercase font-mono tracking-wider text-muted-foreground mt-1.5 px-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
