"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

type AccordionItem = {
  icon: string;
  title: string;
  content: string[];
};

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [titleOffsets, setTitleOffsets] = useState<number[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate title positions using useLayoutEffect to avoid flashing

  useLayoutEffect(() => {
    const calculateOffsets = () => {
      if (window.innerWidth > 768) {
        const offsets = titleRefs.current.map((titleRef) => {
          if (titleRef) {
            const containerRect = titleRef
              .closest(".accordion-item")
              ?.getBoundingClientRect();
            const titleRect = titleRef.getBoundingClientRect();
            if (containerRect && titleRect) {
              return titleRect.left - containerRect.left;
            }
          }
          return 0;
        });
        setTitleOffsets(offsets);
      }
    };

    calculateOffsets();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateOffsets, 50);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  return (
    <>
      {/* Hidden measurement elements */}
      <div className="fixed top-[-9999px] left-0 opacity-0 pointer-events-none">
        {items.map((item, index) => (
          <div
            key={`measure-${index}`}
            ref={(el) => {
              measureRefs.current[index] = el;
            }}
            style={{ paddingLeft: `${titleOffsets[index] || 0}px` }}
            className="pb-2"
          >
            <ul>
              {item.content.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        {items.map((item, index) => (
          <motion.div
            variants={moveUp(index * 0.17)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="border-b border-smgray accordion-item"
            key={index}
          >
            <div className="flex flex-col w-full">
              <button
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
                className="w-full flex justify-between   py-4 md:py-4 xl:py-[27px] text-left"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 md:gap-6 xl:gap-[183px]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="w-6 h-6 md:w-11 md:h-11 lg:w-15 lg:h-15"
                    />
                    <div
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                    >
                      <span className="text-xl leading-[1] lg:text-2xl xl:leading-[1.5625] font-medium dark:text-white">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden  "
                    style={{ paddingLeft: `${titleOffsets[index] || 0}px` }}
                  >
                    <div className="pb-2 max-w-full lg:max-w-[85%] pt-3 md:pt-5">
                      <ul className="square-list pl-[1rem]">
                        {item.content.map((content, index) => (
                          <li
                            key={index}
                            className="text-lg pl-[7px] dark:text-white/70 text-para-color leading-lh-text19 mb-3 xl:mb-6 last:mb-0 font-light"
                          >
                            {content}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="w-[17px] h-[17px] lg:w-[25px] lg:h-[25px] flex-shrink-0">
                  <Image
                    src="/assets/img/accordian-arrow.svg"
                    alt="Arrow"
                    width={25}
                    height={25}
                    className={`transform transition-transform duration-250 lg:mt-4 ${
                      openIndex === index
                        ? "rotate-0" // clicked → normal
                        : "rotate-180" // initial → rotated
                    }`}
                    style={{
                      filter:
                        openIndex === index
                          ? "invert(0)"
                          : "brightness(0) saturate(100%) invert(32%) sepia(1%) saturate(10%) hue-rotate(337deg)", // #515151
                    }}
                  />
                </div>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
