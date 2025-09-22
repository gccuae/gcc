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
      if(window.innerWidth > 768){
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
    }
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

      <div >
        {items.map((item, index) => (
          <div className="border-b border-smgray accordion-item" key={index}>
            <div className="flex flex-col w-full">
              <button
                onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
                className="w-full flex justify-between   py-4 md:py-4 xl:py-[27px] text-left"
              >
                <div className="flex flex-col  ">
                  <div className="flex items-center gap-4 md:gap-6 xl:gap-[183px]">
                    <Image src={item.icon} alt={item.title} width={50} height={50}  className="w-6 h-6 md:w-11 md:h-11 lg:w-15 lg:h-15"/>
                    <div ref={el => { titleRefs.current[index] = el; }}>
                      <span className="text-xl leading-[1] md:text-2xl xl:leading-[1.5625] font-medium">{item.title}</span>
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
                    className="overflow-hidden  "
                    style={{ paddingLeft: `${titleOffsets[index] || 0}px` }}
                  >
                    <div className="pb-2 max-w-full lg:max-w-[85%] pt-3 md:pt-5">
                      <ul className="square-list pl-[1em]">
                        {item.content.map((content, index) => (
                          <li key={index} className="text-lg leading-lh-text19 mb-3 xl:mb-5 font-extralight">{content}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="w-[36px] h-fit lg:w-[21px] lg:h-[21px] relative md:top-4 xl:top-3">
                <ArrowDown strokeWidth={1}
                  className={` transform transition-transform duration-250 mt-1 ${openIndex === index ? "rotate-180 text-green-600" : "text-black"
                    }`}
                />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};