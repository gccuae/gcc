"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { SingleProject } from "../expertise/type";
import gsap from "gsap";

interface KeyProjectsProps {
  projects: SingleProject[];
}

const ArrowLoopIcon = ({ playTick }: { playTick: number }) => {
  const outRef = useRef<HTMLSpanElement | null>(null);
  const inRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!outRef.current || !inRef.current) return;
    gsap.set(outRef.current, { x: 0, y: 0, opacity: 1 });
    gsap.set(inRef.current, { x: -34, y: 34, opacity: 1 });
  }, []);

  useEffect(() => {
    if (!outRef.current || !inRef.current || playTick === 0) return;
    tlRef.current?.kill();
    gsap.set(outRef.current, { x: 0, y: 0, opacity: 1 });
    gsap.set(inRef.current, { x: -34, y: 34, opacity: 1 });
    tlRef.current = gsap
      .timeline({ defaults: { duration: 0.62, ease: "power2.out" } })
      .to(outRef.current, { x: 34, y: -34 }, 0)
      .to(inRef.current, { x: 0, y: 0 }, 0);
  }, [playTick]);

  return (
    <span className="bg-black w-10 h-10 xl:w-15 xl:h-15 rounded-full flex items-center justify-center relative overflow-hidden shrink-0">
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span ref={outRef} className="absolute">
          <Image
            src={assets.linkArrowGreen}
            alt="arrow-right"
            width={20}
            height={20}
            className="w-5 h-5 xl:w-[19px] xl:h-[19.05px]"
          />
        </span>
        <span ref={inRef} className="absolute opacity-0">
          <Image
            src={assets.linkArrowGreen}
            alt="arrow-right"
            width={20}
            height={20}
            className="w-5 h-5 xl:w-[19px] xl:h-[19.05px]"
          />
        </span>
      </span>
    </span>
  );
};

const ProjectTitleCta = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="bg-light-white inline-flex max-w-[85%] min-w-0 p-2 lg:p-4 items-center">
      <h3 className="min-w-0 md:flex-1 text-lg lg:text-2xl leading-normal font-normal text-black break-words">
        {title}
      </h3>
    </div>
  );
};

const ProjectArrowCta = ({ href, title }: { href: string; title: string }) => {
  const [playTick, setPlayTick] = useState(0);

  return (
    <Link
      href={href}
      onMouseEnter={() => setPlayTick((p) => p + 1)}
      className="absolute top-4 right-4 xl:top-6 xl:right-6 z-10"
      aria-label={`View project: ${title}`}
    >
      <ArrowLoopIcon playTick={playTick} />
    </Link>
  );
};

const KeyProjects = ({ projects }: KeyProjectsProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [virtualIndex, setVirtualIndex] = useState(projects.length);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // All drag logic in refs — pointer events fire before React re-renders,
  // so reading state gives stale values. Refs are always live.
  const isDraggingRef = useRef(false);
  const virtualIndexRef = useRef(projects.length);
  const activePointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragAxisRef = useRef<"x" | "y" | null>(null);
  // Set to true only after a confirmed swipe — blocks the post-swipe click
  const didSwipeRef = useRef(false);

  const projectsCount = projects.length;

  const loopItems = useMemo(() => {
    if (!projectsCount) return [];
    return [...projects, ...projects, ...projects];
  }, [projects, projectsCount]);

  useEffect(() => {
    if (!projectsCount) return;
    setVirtualIndex(projectsCount);
    virtualIndexRef.current = projectsCount;
  }, [projectsCount]);

  useEffect(() => {
    virtualIndexRef.current = virtualIndex;
  }, [virtualIndex]);

  useEffect(() => {
    const updateLayout = () => {
      setWindowWidth(window.innerWidth);
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const getPerView = () => {
    if (windowWidth >= 1024) return 2;
    if (windowWidth >= 768) return 2;
    if (windowWidth >= 425) return 1;
    return 1.1;
  };

  const gap = windowWidth >= 1024 ? 40 : 15;
  const perView = getPerView();
  const slideWidth =
    viewportWidth > 0 ? (viewportWidth - gap * (perView - 1)) / perView : 0;
  const step = slideWidth + gap;
  const translateX = -(virtualIndex * step);
  const activeIndex = projectsCount
    ? ((virtualIndex % projectsCount) + projectsCount) % projectsCount
    : 0;
  const isLayoutReady = viewportWidth > 0;

  useEffect(() => {
    if (enableTransition) return;
    const id = requestAnimationFrame(() => setEnableTransition(true));
    return () => cancelAnimationFrame(id);
  }, [enableTransition]);

  useEffect(() => {
    if (!projectsCount || isPaused || isDragging) return;
    const id = setInterval(() => recenterWithoutJump("next"), 3500);
    return () => clearInterval(id);
  }, [projectsCount, isPaused, isDragging]);

  const recenterWithoutJump = useCallback(
    (direction: "next" | "prev") => {
      if (!projectsCount) return;
      const current = virtualIndexRef.current;
      if (direction === "next" && current >= projectsCount * 2 - 1) {
        setEnableTransition(false);
        setVirtualIndex(current - projectsCount);
        requestAnimationFrame(() => {
          setEnableTransition(true);
          setVirtualIndex((prev) => prev + 1);
        });
        return;
      }
      if (direction === "prev" && current <= projectsCount) {
        setEnableTransition(false);
        setVirtualIndex(current + projectsCount);
        requestAnimationFrame(() => {
          setEnableTransition(true);
          setVirtualIndex((prev) => prev - 1);
        });
        return;
      }
      setEnableTransition(true);
      setVirtualIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
    },
    [projectsCount],
  );

  const handlePrevClick = () => {
    if (projectsCount) recenterWithoutJump("prev");
  };
  const handleNextClick = () => {
    if (projectsCount) recenterWithoutJump("next");
  };

  const resetDragState = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragAxisRef.current = null;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!projectsCount || step <= 0) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    didSwipeRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    activePointerIdRef.current = event.pointerId;

    // ✅ NO setPointerCapture — this was causing click events to fire on the
    // viewport div instead of the Link underneath, breaking link navigation.
    // Without capture, mouse drag still works as long as pointer stays in viewport.

    dragAxisRef.current = null;
    isDraggingRef.current = true;
    setIsDragging(true);
    setEnableTransition(false);
    setDragOffset(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isDraggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    )
      return;
    const dx = event.clientX - dragStartXRef.current;
    const dy = event.clientY - dragStartYRef.current;

    if (!dragAxisRef.current) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      dragAxisRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (dragAxisRef.current !== "x") {
      activePointerIdRef.current = null;
      resetDragState();
      setEnableTransition(true);
      return;
    }

    setDragOffset(dx);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isDraggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    )
      return;
    const dx = event.clientX - dragStartXRef.current;
    const dragAxis = dragAxisRef.current;
    const swipeThreshold = Math.max(40, step * 0.2);

    activePointerIdRef.current = null;
    resetDragState();
    setEnableTransition(true);

    if (dragAxis === "x" && Math.abs(dx) >= swipeThreshold) {
      // Real swipe — block the synthetic click that fires right after pointerup
      didSwipeRef.current = true;
      if (dx < 0) handleNextClick();
      else handlePrevClick();
    }
    // No swipe → didSwipeRef stays false → onClickCapture lets the click through → Links navigate
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    activePointerIdRef.current = null;
    didSwipeRef.current = false;
    resetDragState();
    setEnableTransition(true);
  };

  return (
    <section className="py-37px pb-13 xl:pt-57px xl:pb-25 bg-light-white dark:bg-light-dark mx-auto overflow-hidden">
      <div className="container">
        <div className="mb-4 md:mb-6 xl:mb-47px 3xl:mb-57px flex items-center justify-between">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl 2xl:text-5xl leading-lh-text68 font-normal text-black dark:text-white"
          >
            Key Projects
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex border border-foreground dark:border-white rounded-full"
          >
            <button
              type="button"
              aria-label="Previous project"
              onClick={handlePrevClick}
              className="px-3 py-2 md:px-6 md:py-2 xl:py-[12px] border-r border-foreground dark:border-white rounded-tl-full rounded-bl-full group cursor-pointer hover:bg-accent transition-all duration-300"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-3 h-3 md:w-5 md:h-5 lg:w-[10px] lg:h-[16px]"
              >
                <path
                  d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688"
                  stroke="#7AC142"
                  className="group-hover:stroke-white transition-all duration-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={handleNextClick}
              className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-secondary transition-all duration-300"
            >
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-3 h-3 md:w-5 md:h-5 lg:w-[10px] lg:h-[16px]"
              >
                <path
                  d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688"
                  stroke="#7AC142"
                  className="group-hover:stroke-white transition-all duration-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        <div
          ref={viewportRef}
          className={`overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onDragStart={(e) => e.preventDefault()}
          // Only fires when didSwipeRef=true (after a real swipe) — blocks the
          // synthetic click that the browser fires after pointerup on mouse devices.
          // For a simple tap/click, didSwipeRef is always false so this is a no-op.
          onClickCapture={(e) => {
            if (!didSwipeRef.current) return;
            didSwipeRef.current = false;
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            // visibility: isLayoutReady ? "visible" : "hidden",
            touchAction: "pan-y",
            userSelect: isDragging ? "none" : "auto",
          }}
        >
          {isLayoutReady && (
            <div
              className="flex"
              style={{
                gap: `${gap}px`,
                transform: `translate3d(${translateX + dragOffset}px, 0, 0)`,
                transition:
                  enableTransition && !isDragging
                    ? "transform 0.8s ease"
                    : "none",
                willChange: "transform",
              }}
            >
              {loopItems.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden shrink-0 3xl:h-[533px]"
                  style={{ width: `${slideWidth}px` }}
                >
                  <motion.div
                    variants={moveUp(
                      (projectsCount ? index % projectsCount : index) * 0.15,
                    )}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="relative h-[350px] xl:h-[450px] 3xl:h-[533px] w-full flex flex-col justify-end px-4 md:px-6 py-6 xl:py-8 group"
                  >
                    {/* Full-card image link — no setPointerCapture means click events
                    fire on this Link (not the viewport), so navigation works.
                    Drag works because pointermove/pointerup still bubble to the viewport. */}
                    <Link
                      href={`/projects/${item.slug}`}
                      className="absolute inset-0 z-0"
                      tabIndex={-1}
                      aria-label={`View project: ${item.title}`}
                      draggable={false}
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={2000}
                        height={1633}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </Link>

                    <div className="relative z-10 max-w-full transition-all duration-500 content-box opacity-100 translate-y-0">
                      <Link
                        href={`/projects/${item.slug}`}
                        className="bg-black inline-block max-w-full p-2 lg:px-5 lg:py-3"
                      >
                        <p className="text-sm md:text-lg leading-lh-text19 font-normal text-white !text-left">
                          {item.secondSection.projectType.name},{" "}
                          {item.secondSection.sector.name},{" "}
                          {item.secondSection.location.name}
                        </p>
                      </Link>
                      <ProjectTitleCta
                        title={item.title}
                        href={`/projects/${item.slug}`}
                      />
                    </div>
                    <ProjectArrowCta
                      href={`/projects/${item.slug}`}
                      title={item.title}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="swiper-pagination w-full">
          <div className="flex justify-center items-center gap-2 mt-4 lg:mt-[40px] w-fit mx-auto">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEnableTransition(true);
                  setVirtualIndex(projectsCount + idx);
                }}
                className={`w-3 h-[3px] rounded-full cursor-pointer transition-all duration-300 ${
                  activeIndex === idx ? "bg-accent w-[27px]" : "bg-mdgray"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyProjects;
