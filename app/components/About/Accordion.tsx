'use client';
import { useState, useRef, useLayoutEffect } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      const offsets = titleRefs.current.map(titleRef => {
        if (titleRef) {
          const containerRect = titleRef.closest('.accordion-item')?.getBoundingClientRect();
          const titleRect = titleRef.getBoundingClientRect();
          if (containerRect && titleRect) {
            return titleRect.left - containerRect.left;
          }
        }
        return 0;
      });
      setTitleOffsets(offsets);
    };

    calculateOffsets();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateOffsets, 50);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  return (
    <>
      {/* Hidden measurement elements */}
      <div className="fixed top-[-9999px] left-0 opacity-0 pointer-events-none">
        {items.map((item, index) => (
          <div
            key={`measure-${index}`}
            ref={el => { measureRefs.current[index] = el; }}
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

      <div className="space-y-2">
        {items.map((item, index) => (
          <div className="border-b border-smgray accordion-item" key={index}>
            <div className="flex flex-col w-full">
              <button
                onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
                className="w-full flex justify-between items-start py-4 xl:py-[27px] text-left"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 md:gap-6 xl:gap-[183px]">
                    <Image src={item.icon} alt={item.title} width={50} height={50} />
                    <div ref={el => { titleRefs.current[index] = el; }}>
                      <span className="text-2xl leading-[1.5625] font-medium">{item.title}</span>
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
                      opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                    style={{ paddingLeft: `${titleOffsets[index] || 0}px` }}
                  >
                    <div className="pb-2 max-w-[85%]">
                      <ul className="square-list pl-[1em]">
                        {item.content.map((content, index) => (
                          <li key={index} className="text-lg leading-lh-text19 mb-3 xl:mb-5 font-extralight">{content}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <ArrowDown strokeWidth={1}
                  className={`w-10 h-10 xl:w-12 xl:h-12 transform transition-transform duration-250 mt-1 ${openIndex === index ? "rotate-180 text-green-600" : "text-black"
                    }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};