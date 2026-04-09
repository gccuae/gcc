"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { BlogItem } from "./BlogItem";
import { moveUp, moveLeft } from "../motionVarients";
import { BlogData } from "./type";

const BlogList = ({ data }: { data: BlogData }) => {
  const items = data.categories.flatMap(
    (item: { blogs: BlogData["categories"][number]["blogs"] }) => item.blogs
  ).filter((item)=>item.status !== "draft");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        data.categories.map((item: { category: string }) => item.category)
      )
    );
    return ["All", ...unique];
  }, [data]);

  const [activeTab, setActiveTab] = useState(0);
  const [expandedMobileTabs, setExpandedMobileTabs] = useState<
    Record<number, boolean>
  >({});
  const [openMobileTabs, setOpenMobileTabs] = useState<Record<number, boolean>>({
    0: true,
  });
  const mobileTabRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const scrollRafRef = useRef<number | null>(null);
  const delayedScrollTimeoutRef = useRef<number | null>(null);

  const getItemsByTab = (idx: number, cat: string) => {
    return idx === 0 ? items : items.filter((item) => item.category === cat);
  };

  const smoothScrollTo = (targetY: number) => {
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 480;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeOutCubic(progress));
      if (progress < 1) {
        scrollRafRef.current = requestAnimationFrame(animate);
      } else {
        scrollRafRef.current = null;
      }
    };

    scrollRafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      if (delayedScrollTimeoutRef.current !== null) {
        window.clearTimeout(delayedScrollTimeoutRef.current);
      }
    };
  }, []);

  const handleMobileAccordionTabToggle = (idx: number) => {
    const willOpen = !openMobileTabs[idx];

    if (delayedScrollTimeoutRef.current !== null) {
      window.clearTimeout(delayedScrollTimeoutRef.current);
      delayedScrollTimeoutRef.current = null;
    }

    setOpenMobileTabs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));

    if (willOpen) {
      setActiveTab(idx);
      delayedScrollTimeoutRef.current = window.setTimeout(() => {
        const tabEl = mobileTabRefs.current[idx];
        if (!tabEl) return;
        const tabTop = tabEl.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(Math.max(tabTop - 90, 0));
        delayedScrollTimeoutRef.current = null;
      }, 320);
    }
  };

  const handleMobileToggleMoreLess = (idx: number) => {
    const isExpanded = !!expandedMobileTabs[idx];
    setExpandedMobileTabs((prev) => ({ ...prev, [idx]: !prev[idx] }));

    if (!isExpanded) return;
    if (delayedScrollTimeoutRef.current !== null) {
      window.clearTimeout(delayedScrollTimeoutRef.current);
    }
    delayedScrollTimeoutRef.current = window.setTimeout(() => {
      const tabEl = mobileTabRefs.current[idx];
      if (!tabEl) return;
      const tabTop = tabEl.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(Math.max(tabTop - 90, 0));
      delayedScrollTimeoutRef.current = null;
    }, 200);
  };

  const filteredItems =
    activeTab === 0
      ? items
      : items.filter((item) => item.category === categories[activeTab])

  return (
    <section className="pt-57px pb-12 md:pb-15 xl:py-57px bg-light-white dark:bg-black">
      <div className="container">
        {/* ----------- Desktop Tabs ----------- */}
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:flex relative border-t border-gray-200 dark:border-white/50 space-x-8 xl:space-x-20 overflow-x-auto"
        >
          {categories.map((cat, idx) => (
            <motion.button
              variants={moveLeft(idx * 0.2)}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              key={cat}
              onClick={() => setActiveTab(idx)}
              className={`cursor-pointer py-4 xl:py-[27px] text-md lg:text-xl leading-normal font-medium relative ${activeTab === idx
                  ? "text-para-color dark:text-white"
                  : "text-para-color dark:text-white/70 hover:text-black dark:hover:text-white font-normal transition-colors duration-300"
                }`}
            >
              {cat}
              {activeTab === idx && (
                <motion.div
                  layoutId="underline"
                  className="absolute top-[-2px] left-0 right-0 h-[6px] bg-accent"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* ----------- Mobile Accordion Tabs ----------- */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:hidden border-t border-gray-200 divide-y divide-gray-200"
        >
          {categories.map((cat, idx) => (
            <div
              key={cat}
              className="w-full"
              ref={(el) => {
                mobileTabRefs.current[idx] = el;
              }}
            >
              <button
                onClick={() => handleMobileAccordionTabToggle(idx)}
                className="w-full flex justify-between items-center py-4 text-lg font-medium"
              >
                <span className={openMobileTabs[idx] ? "text-black" : "text-gray-500"}>
                  {cat}
                </span>
                <span className="text-xl">{openMobileTabs[idx] ? "−" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {openMobileTabs[idx] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-1 gap-5">
                      {(expandedMobileTabs[idx]
                        ? getItemsByTab(idx, cat)
                        : getItemsByTab(idx, cat).slice(0, 5)
                      ).map((item, i) => (
                        <motion.div
                          key={`${item.title}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          <BlogItem item={item} key={`${item.title}-${i}`} index={i} />
                        </motion.div>
                      ))}
                    </div>
                    {getItemsByTab(idx, cat).length > 5 && (
                      <div className="flex justify-center mt-6 mb-4">
                        <button
                          onClick={() => handleMobileToggleMoreLess(idx)}
                          className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition cursor-pointer"
                        >
                          <span>
                            {expandedMobileTabs[idx] ? "Show Less" : "Show More"}
                          </span>
                          <Image
                            src={assets.singleGreenArrow}
                            alt="arrow"
                            width={20}
                            height={20}
                            className={`inline ${expandedMobileTabs[idx] ? "-rotate-90" : "rotate-90"
                              }`}
                          />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* ----------- Desktop Content ----------- */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-30px items-start"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              variants={moveUp(i * 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <BlogItem item={item} key={`${item.title}-${i}`} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
