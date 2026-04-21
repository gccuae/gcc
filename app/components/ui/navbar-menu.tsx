"use client";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
// import arrow from "@/public/assets/img/redarrow.svg";
import { slideDown } from "@/public/frameranimation/animation";

import { useTheme } from "next-themes";
import { Search, X } from 'lucide-react';
import { RiArrowDownSLine } from "react-icons/ri";



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
      className="relative mr-0 not-first:ml-3 not-first:lg:ml-[12px] not-first:2xl:ml-[25px] not-first:2xl:ml-[37px] dark:bg-black">
      <div className="flex gap-2 mb-0">
        <Link href={url}>
          <motion.p transition={{ duration: 0.3, ease: easeOut }}
            className="cursor-pointer hover:text-secondary text-black dark:text-white  uppercase transition-all duration-500 ease-in-out">
            {/* <span className="flex gap-3 text-base leading-[1.82] text-[13px] xl:text-[15px]  2xl:text-base hover:text-primary transition-all duration-300 font-normal">{item}</span> */}
            <span className="flex items-center gap-2 text-base leading-[1.82] text-[13px]  3xl:text-base hover:text-primary transition-all duration-300 font-normal">
              {item}
              {!noMenu && (
                <RiArrowDownSLine
                  className="text-[20px] dark:text-white transition-transform duration-300"
                />
              )}
            </span>

          </motion.p>
        </Link>
        {/* {!noMenu && <Image src={arrow} alt="arrow" className="arrowst" />} */}
      </div>
      {active !== null && !noMenu && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
          {active === item && (
            <div onClick={() => setActive(null)}>
              <motion.div layoutId="active"
                className="bg-white absolute dark:bg-black backdrop-blur-sm  overflow-hidden rounded-[8px] dark:border-white/[0.2] shadow-xl">
                <motion.div layout className="w-max h-full px-3 ">
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
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<[] | null>(null);

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

  const handleSearch = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    try {
      if (searchQuery.trim()) {
        setLoading(true);
        console.log('Searching for:', searchQuery);
        // Add your search logic here
        const res = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchQuery }),
        });

        const data = await res.json();

        if (data.success) {
          console.log(data)
          setResult(data.data);
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
    <div className="dark:bg-black">
      <AnimatePresence>
        <motion.div key="header-menu" {...slideDown()} className="bg-white dark:bg-black" >
          <div className="container" ref={containerRef}></div>
          <div className="relative" style={{ marginLeft: `${rightMargin}px` }}>
            <nav onMouseLeave={() => setActive(null)} // resets the state
              className="relative z-50 flex justify-center items-stretch gap-2 xl:gap-[20px] h-full">
              <div className="pr-[28px] xxl:pr-[28px] xxxl:pr-[50px] w-full flex items-center justify-between gap-3 py-[10px]">
                <div className="">
                  <Link href="/">
                    <div className="flex items-center ">
                      <img src="/assets/img/logo-light.svg" alt="Crest Logo" width={500} height={160} className="h-[66px] object-contain w-auto dark:hidden" />
                      <img src="/assets/img/logo.svg" alt="Crest Logo" width={500} height={160} className="h-[66px] object-contain w-auto hidden dark:block" />
                    </div>
                  </Link>
                </div>
                <div>

                  <div className="flex items-center gap-4 w-fit ml-auto  mb-[19px] ">
                    <div className="flex items-center justify-end gap-2">
                      <Link href="https://www.facebook.com/profile.php?id=61585660241145" target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center group" >
                        <Image src="/assets/img/icons/fb.svg" alt="fb" width={8} height={14} className="group-hover:filter-[brightness(0)_invert(1)] transition-all duration-300" />
                      </Link>
                      <Link href="https://www.linkedin.com/company/gccae/ " target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center group" >
                        <Image src="/assets/img/icons/ln.svg" alt="ln" width={12} height={11} className="group-hover:filter-[brightness(0)_invert(1)] transition-all duration-300" />
                      </Link>
                      <Link href="https://www.youtube.com/@GCCae" target="_blank" className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center group" >
                        <Image src="/assets/img/icons/youtube.svg" alt="youtube" width={14} height={10} className="group-hover:filter-[brightness(0)_invert(1)] transition-all duration-300" />
                      </Link>
                      <button onClick={openPopup} className="w-8 h-8 rounded-full group hover:bg-primary border border-[#C2C2C2] bg-white hover:border-none cursor-pointer flex items-center justify-center group" >
                        <Image src="/assets/img/icons/search.svg" alt="youtube" width={14} height={10} className="group-hover:filter-[brightness(0)_invert(1)] transition-all duration-300" />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="relative w-[68px] h-[30px] flex items-center  overflow-hidden rounded-full border border-foreground dark:border-white bg-light-white dark:bg-black cursor-pointer" >
                        {/* Light mode icon */}
                        <span className={` transition-all duration-500 ease-in-out ${theme === "light" ? "translate-x-2 opacity-100" : "translate-x-10 opacity-0"} `} >
                          <Image src="/assets/img/icons/light.svg" alt="light" width={20} height={20} />
                        </span>

                        {/* Dark mode icon */}
                        <span className={`transition-all duration-500 ease-in-out ${theme === "dark" ? "translate-x-5 opacity-100" : "translate-x-[50%] opacity-0"}`} >
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
                  <Link href="/contact-us" className="flex flex-1 justify-center items-center transition h-full w-full gap-2 ">
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-15 px-4">
          <div
            ref={popupRef}
            className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all duration-300 ease-out ${isAnimating
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
            <div className="p-6 h-full">
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

              <div className="mt-5 px-4 flex flex-col gap-5 text-black h-[300px]"> {/* 👈 fixed height */}
                {result && result.length > 0 ? (
                  <div className="text-md font-semibold">Results</div>
                ) : null}

                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="loader">
                      <div className="bar1"></div>
                      <div className="bar2"></div>
                      <div className="bar3"></div>
                      <div className="bar4"></div>
                      <div className="bar5"></div>
                      <div className="bar6"></div>
                      <div className="bar7"></div>
                      <div className="bar8"></div>
                      <div className="bar9"></div>
                      <div className="bar10"></div>
                      <div className="bar11"></div>
                      <div className="bar12"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 overflow-hidden h-full">
                    {/* 👇 scrollable area */}
                    <ul className="grid grid-cols-3 list-disc gap-5 text-md px-4 max-h-full overflow-y-auto pr-2 text-black gap-x-10">
                      {result && result.length > 0 ? (
                        result.map(
                          (
                            item: {
                              title: string,
                              slug: string
                              type: string;
                              project?: { title: string; slug: string };
                              item?: { title: string; slug: string };
                            },
                            index: number
                          ) => {
                            if (item.type === "project") {
                              return (
                                <Link
                                  href={`/projects/${item.item?.slug}`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setResult(null);
                                    closePopup();
                                  }}
                                >
                                  <li>{item.item?.title || "Untitled Project"}</li>
                                </Link>
                              );
                            } else if (item.type === "news") {
                              return (
                                <Link
                                  href={`/news/${item.item?.slug}`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setResult(null);
                                    closePopup();
                                  }}
                                >
                                  <li>{item.item?.title || "Untitled"}</li>
                                </Link>
                              );
                            } else if (item.type === "expertise") {
                              return (
                                <Link
                                  href={`/expertise/${item.item?.slug}`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{item.item?.title || "Untitled Expertise"}</li>
                                </Link>
                              );
                            } else if (item.type === "expertise-listing") {
                              return (
                                <Link
                                  href={`/expertise`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"Expertise"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "about") {
                              return (
                                <Link
                                  href={`/about-us`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{item.item?.title || "About Us"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "group-company") {
                              return (
                                <Link
                                  href={`/group-companies`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"Group Companies"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "qhse") {
                              return (
                                <Link
                                  href={`/qhse`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"Qhse"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "sustainability") {
                              return (
                                <Link
                                  href={`/sustainability`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"Sustainability"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "aiTechnology") {
                              return (
                                <Link
                                  href={`/ai-technology`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"AI Technology"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "blogs") {
                              return (
                                <Link
                                  href={`/blog`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{"Blog"}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "blogs-indi") {
                              return (
                                <Link
                                  href={`/blog/${item.slug}`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>{item.title}</li>
                                </Link>
                              );
                            }
                            else if (item.type === "gallery") {
                              return (
                                <Link
                                  href={`/gallery`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>Gallery</li>
                                </Link>
                              );
                            }
                            else if (item.type === "currentOpenings") {
                              return (
                                <Link
                                  href={`/careers`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>Careers</li>
                                </Link>
                              );
                            }
                            else if (item.type === "contact") {
                              return (
                                <Link
                                  href={`/contact-us`}
                                  key={index}
                                  className="cursor-pointer"
                                  onClick={() => { setResult(null); closePopup(); }}
                                >
                                  <li>Contact Us</li>
                                </Link>
                              );
                            }
                            else if (item.type === "vendor") {
                              return (
                                <li key={index}>
                                  <Link
                                    href={`/${item.slug}`}
                                    className="cursor-pointer block"
                                    onClick={() => {
                                      setResult(null);
                                      closePopup();
                                    }}
                                  >
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            }
                          }
                        )
                      ) : result?.length === 0 ? (
                        <div>No Results</div>
                      ) : null}
                    </ul>
                  </div>
                )}
              </div>


              {/* Recent Searches or Suggestions */}
              {/* <div className="mt-8">
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
              </div> */}




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
      <Image src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white"> {title} </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300"> {description} </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black"> {children} </Link>
  );
};
