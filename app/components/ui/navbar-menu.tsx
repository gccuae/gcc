"use client";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "@/public/assets/img/redarrow.svg";
import { slideDown } from "@/public/frameranimation/animation";



export const MenuItem = ({
  setActive,
  active,
  item,
  url,
  children,
  noMenu,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  url: string;
  children?: React.ReactNode;
  noMenu?: boolean;
}) => {

  return (
    <div
      onMouseEnter={() => (noMenu ? setActive(null) : setActive(item))}
      className="relative mr-0 not-first:ml-3 not-first:lg:ml-[15px] not-first:xl:ml-[25px] not-first:2xl:ml-[37px] ">
      <div className="flex gap-2 mb-0">
        <Link href={url}>
          <motion.p
            transition={{ duration: 0.3, ease: easeOut }}
            className="cursor-pointer text-white   hover:text-secondary dark:text-white  uppercase transition-all duration-500 ease-in-out">
            <span className="flex gap-3  text-base  leading-[1.82] text-[13px] xl:text-[15px]  2xl:text-base   hover:text-primary transition-all duration-300 font-normal">{item}</span>
          </motion.p>
        </Link>
        {!noMenu && <Image src={arrow} alt="arrow" className="arrowst" />}
      </div>
      {active !== null && !noMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          {active === item && (
            <div className="">
              <motion.div
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white absolute dark:bg-black backdrop-blur-sm mt-6 overflow-hidden rounded-[8px] dark:border-white/[0.2] shadow-xl">
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full px-3  ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [rightMargin, setRightMargin] = useState(0);

  useEffect(() => {
    const updateMargin = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const margin = (windowWidth - containerWidth) / 2;
        setRightMargin(margin);
      }
    };
    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, []);
  return (
    <div>
      <AnimatePresence>
        <motion.div
          key="header-menu"
          {...slideDown()}
          className=""
        >
          <div className="container" ref={containerRef}></div>
          <div className="relative" style={{ marginLeft: `${rightMargin}px` }}>
            <nav onMouseLeave={() => setActive(null)} // resets the state
              className="relative z-50 flex justify-center items-stretch gap-2 xl:gap-[20px] h-full">

              <div className="pr-[28px] xxl:pr-[28px] xxxl:pr-[50px] w-full flex items-center justify-between gap-3 py-[10px]  " >
                <div className="pl-5">
                  <Link href="/">
                    <div className="flex items-center ">
                      <Image
                        src="/assets/img/logo.svg"
                        alt="Crest Logo"
                        width={233}
                        height={66}
                        className="h-[66px] w-auto"
                      />
                    </div>
                  </Link>
                </div>
                <div>

                  <div>
                    <div className="flex items-center justify-end gap-2   mb-[19px] ">
                      <div className="w-8 h-8 bg-white rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/fb.svg" alt="fb" width={8} height={14} />
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/ln.svg" alt="ln" width={12} height={11} />
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/youtube.svg" alt="youtube" width={14} height={10} className="group-hover:filter-[brightness(0)_invert(1)]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-[25px] xxl:space-x-[20px] xxxl:space-x-[50px] items-center">
                    <div className="flex space-x-[15px] xxl:space-x-[20px] xxxl:space-x-[30px] items-center group">
                      {children}
                    </div>
                  </div>

                </div>
              </div>

              <div className="rghtsc flex flex-col justify-center ml-[2px] bg-primary px-6 xl:px-10 ">
                <div className="rounded-full px-6 py-[7px] border border-white hover:bg-white transition-all duration-300 hover:scale-110 group">
                  <Link href="/contact" className="flex flex-1 justify-center items-center transition h-full w-full gap-2 ">
                    <span className="text-white text-base leading-[1.82] group-hover:text-primary transition-all duration-200">CONTACT</span>
                  </Link>
                </div>

              </div>

            </nav>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>

  );
};


export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </Link>
  );
};
