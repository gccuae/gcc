"use client";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "@/public/assets/img/redarrow.svg";
import { slideDown } from "@/public/frameranimation/animation";

import { useTheme } from "next-themes";
import { Search, X } from 'lucide-react';


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
    <div onMouseEnter={() => (noMenu ? setActive(null) : setActive(item))}
      className="relative mr-0 not-first:ml-3 not-first:lg:ml-[15px] not-first:xl:ml-[25px] not-first:2xl:ml-[37px] ">
      <div className="flex gap-2 mb-0">
        <Link href={url}>
          <motion.p
            transition={{ duration: 0.3, ease: easeOut }}
            className="cursor-pointer hover:text-secondary text-black dark:text-white  uppercase transition-all duration-500 ease-in-out">
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
                  className="w-max h-full px-3 ">
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
  const { theme, setTheme } = useTheme();


  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Focus input when popup opens and is animating in
  useEffect(() => {
    if (isOpen && isAnimating && searchInputRef.current) {
      // Delay focus slightly to let animation start
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isAnimating]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      closePopup();
    }
  };

  const openPopup = () => {
    setIsOpen(true);
    // Small delay to trigger entry animation
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  const closePopup = () => {
    setIsAnimating(false);
    // Delay the actual close to allow exit animation
    setTimeout(() => {
      setIsOpen(false);
      setSearchQuery('');
    }, 200);
  };
  return (
    <div>
      <AnimatePresence>
        <motion.div
          key="header-menu"
          {...slideDown()}
          className="bg-white dark:bg-black"
        >
          <div className="container" ref={containerRef}></div>
          <div className="relative" style={{ marginLeft: `${rightMargin}px` }}>
            <nav onMouseLeave={() => setActive(null)} // resets the state
              className="relative z-50 flex justify-center items-stretch gap-2 xl:gap-[20px] h-full">
              <div className="pr-[28px] xxl:pr-[28px] xxxl:pr-[50px] w-full flex items-center justify-between gap-3 py-[10px]  " >
                <div className="pl-5">
                  <Link href="/">
                    <div className="flex items-center ">
                      <Image src="/assets/img/logo-light.svg" alt="Crest Logo" width={233} height={66} className="h-[66px] w-auto dark:hidden" />
                      <Image src="/assets/img/logo.svg" alt="Crest Logo" width={233} height={66} className="h-[66px] w-auto hidden dark:block" />
                    </div>
                  </Link>
                </div>
                <div>

                  <div className="flex items-center gap-4 w-fit ml-auto  mb-[19px] ">
                    <div className="flex items-center justify-end gap-2">
                      <Link href="https://www.facebook.com" target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/fb.svg" alt="fb" width={8} height={14} />
                      </Link>
                      <Link href="https://www.linkedin.com" target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/ln.svg" alt="ln" width={12} height={11} />
                      </Link>
                      <Link href="https://www.youtube.com" target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/youtube.svg" alt="youtube" width={14} height={10} className="group-hover:filter-[brightness(0)_invert(1)]" />
                      </Link>
                      <button onClick={openPopup} className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center" >
                        <Image src="/assets/img/icons/search.svg" alt="youtube" width={14} height={10} className="group-hover:filter-[brightness(0)_invert(1)]" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="relative w-[68px] h-[30px] flex items-center  overflow-hidden rounded-full border border-foreground dark:border-white bg-light-white dark:bg-black cursor-pointer"
                      >
                        {/* Light mode icon */}
                        <span className={` transition-all duration-500 ease-in-out ${theme === "light" ? "translate-x-2 opacity-100" : "translate-x-10 opacity-0"} `}
                        >
                          <Image src="/assets/img/icons/light.svg" alt="light" width={20} height={20} />
                        </span>

                        {/* Dark mode icon */}
                        <span className={`transition-all duration-500 ease-in-out ${theme === "dark" ? "translate-x-5 opacity-100" : "translate-x-[50%] opacity-0"}`}
                        >
                          <Image src="/assets/img/icons/dark.svg" alt="dark" width={20} height={20} />
                        </span>
                      </button>
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
                  <Link href="/" className="flex flex-1 justify-center items-center transition h-full w-full gap-2 ">
                    <span className="text-white text-base leading-[1.82] group-hover:text-primary transition-all duration-200">CONTACT</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ease-out ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
        />
      )}

      {/* Search Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-40 px-4">
          <div
            ref={popupRef}
            className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-out ${isAnimating
                ? 'translate-y-0 opacity-100 scale-100'
                : '-translate-y-8 opacity-0 scale-95'
              }`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Search</h2>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Search Form */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e);
                      }
                    }}
                    placeholder="What are you looking for?"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300 text-black"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Press Enter to search or Escape to close
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim()}
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium hover:scale-105 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Recent Searches or Suggestions */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-3">
                  {['Civil & Structural Works', 'Projects Completed', 'Manpower'].map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className={`px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300`}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
