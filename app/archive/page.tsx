"use client";

import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// ============================================
// CROWD CANVAS COMPONENT
// ============================================

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = { src, rows, cols };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0;
    const removeFromArray = <T,>(array: T[], i: number) =>
      array.splice(i, 1)[0];
    const removeRandomFromArray = <T,>(array: T[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]) =>
      array[randomIndex(array) | 0];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: unknown[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: gsap.core.Timeline | null;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // TWEEN FACTORIES
    const resetPeep = ({
      stage,
      peep,
    }: {
      stage: { width: number; height: number };
      peep: Peep;
    }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY =
        100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return { startX, startY, endX };
    };

    const normalWalk = ({
      peep,
      props,
    }: {
      peep: Peep;
      props: { startY: number; endX: number };
    }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [
            peep.image,
            ...rect,
            0,
            0,
            peep.width,
            peep.height,
          ];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const addPeepToCrowd = (): Peep => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      const index = crowd.indexOf(peep);
      if (index > -1) crowd.splice(index, 1);
      availablePeeps.push(peep);
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk?.progress(Math.random());
      }
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 h-[calc(100%+10rem)] w-full -translate-y-40"
    />
  );
};

// ============================================
// PRELOADER COMPONENT
// ============================================

const Preloader = () => {
  const text = "You do nothing. We build everything.";
  const words = text.split(" ");

  return (
    <motion.div className="fixed inset-0 z-50">
      {/* Welcome Text */}
      <div className="absolute z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <motion.h1
          className="font-[family-name:var(--font-bebas)] text-3xl tracking-wider text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 4 } }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 * index }}
              className="mr-2 inline-block md:mr-3"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Stairs Animation - Top */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-[50vh]">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * index,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            className="h-full w-[10vw]"
            style={{ backgroundColor: "#1400ff" }}
          />
        ))}
      </motion.div>

      {/* Stairs Animation - Bottom */}
      <motion.div className="pointer-events-none fixed bottom-0 left-0 z-[2] flex h-[50vh] items-end">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * index,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            className="h-full w-[10vw]"
            style={{ backgroundColor: "#1400ff" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// ============================================
// HERO SECTION COMPONENT
// ============================================

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-white">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1400ff 1px, transparent 1px), linear-gradient(90deg, #1400ff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-8 text-center sm:px-6 sm:pt-12 md:pt-16">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1400ff]/10 bg-[#1400ff]/5 px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="h-1 w-1 rounded-full bg-[#1400ff] sm:h-1.5 sm:w-1.5" />
            <span className="font-[family-name:var(--font-playfair)] text-sm font-semibold tracking-normal text-[#1400ff] sm:text-base">
              Caldera Turbo
            </span>
          </span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight text-[#0a0a0a]"
        >
          <span className="block sm:inline">Stand Out From the </span>
          <span className="text-[#1400ff]">LinkedIn Crowd</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:max-w-xl sm:text-base md:mt-6 md:text-lg"
        >
          We&apos;ll turn your LinkedIn profile into a full website, no effort
          from your side
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-4 md:mt-8"
        >
          {/* Primary CTA */}
          <Link
            href="https://calderaturbo.perspectivefunnel.com/launchoffer/"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
            style={{ backgroundColor: "#1400ff" }}
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-[100%]" />
            <span className="relative">Get Your Website</span>
            <svg
              className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="https://caldera.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full border-2 border-[#1400ff]/20 bg-transparent px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:border-[#1400ff] hover:bg-[#1400ff]/5 sm:px-8 sm:py-4 sm:text-base"
          >
            <span>Visit Caldera Agency</span>
            <svg
              className="ml-2 h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100 sm:h-4 sm:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Spacer to push crowd down */}
      <div className="min-h-8 flex-1" />

      {/* Crowd Canvas */}
      <div className="relative h-[50vh] w-full overflow-hidden pt-40 sm:h-[55vh] md:h-[60vh]">
        <CrowdCanvas
          src="/images/peeps/open-peeps-sheet.png"
          rows={15}
          cols={7}
        />
      </div>
    </section>
  );
};

// ============================================
// CASE STUDIES SECTION
// ============================================

const caseStudies = [
  {
    id: 1,
    title: "Peak Athletics",
    description: "Transformed their digital presence with a modern rebrand.",
    stats: ["45% More Leads", "3x Site Traffic"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    logo: "Logoipsum",
    testimonial: {
      quote:
        "Caldera completely transformed how prospects see us online. Within weeks of launch we saw a measurable jump in inbound leads.",
      author: "Marcus Chen",
      role: "Founder, Peak Athletics",
    },
  },
  {
    id: 2,
    title: "Vertex Outdoors",
    description: "Achieved a 60% boost in conversion rates.",
    stats: ["60% Conversion Increase", "20% Revenue Growth"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    logo: "IPSUM",
    testimonial: {
      quote:
        "The site paid for itself in the first month. Our conversion rate jumped 60% and we finally have a brand that matches our ambition.",
      author: "Sarah Lindgren",
      role: "CEO, Vertex Outdoors",
    },
  },
  {
    id: 3,
    title: "Aura Wellness",
    description: "Built a premium brand identity from the ground up.",
    stats: ["80% Brand Recall", "2x Client Retention"],
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    logo: "LOQO",
    testimonial: {
      quote:
        "We went from a DIY site that embarrassed us to a brand clients actually compliment. Retention doubled because people finally trust us at first glance.",
      author: "Priya Desai",
      role: "Director, Aura Wellness",
    },
  },
];

const CaseStudyCard = ({
  study,
}: {
  study: (typeof caseStudies)[number];
}) => {
  return (
    <div className="flex flex-col">
      {/* Main image card */}
      <div className="group relative h-[500px] cursor-pointer overflow-hidden rounded-t-2xl sm:h-[560px] md:h-[620px]">
        {/* Background Image */}
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/60" />

        {/* Arrow icon - top right */}
        <div className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <svg
            className="h-4 w-4 text-[#0a0a0a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>

        {/* Logo - centered, visible by default */}
        <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-wider text-white sm:text-4xl">
            {study.logo}
          </span>
        </div>

        {/* Hover overlay content */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
          {/* Explore badge */}
          <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            Explore 👀
          </span>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white sm:text-3xl">
            {study.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-sm leading-relaxed text-white/80">
            {study.description}
          </p>

          {/* Stat pills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {study.stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial extension card */}
      <div className="rounded-b-2xl border border-t-0 border-neutral-100 bg-neutral-50 px-5 py-5 sm:px-6 sm:py-6">
        <div className="mb-3 flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="h-3.5 w-3.5 text-[#1400ff]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-neutral-600 italic">
          &ldquo;{study.testimonial.quote}&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1400ff]/10 text-xs font-semibold text-[#1400ff]">
            {study.testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-[#0a0a0a]">
              {study.testimonial.author}
            </p>
            <p className="text-xs text-neutral-500">
              {study.testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:gap-6">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function ArchiveHome() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader />}
      </AnimatePresence>
      <HeroSection />
      <CaseStudiesSection />
    </main>
  );
}
