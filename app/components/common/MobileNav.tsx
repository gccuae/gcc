"use client";
import React, { useEffect, useState } from "react";
import { menuItems } from "./data";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

type MobileNavItem = {
  title: string;
  url: string;
  hidden?: boolean;
  subItems: {
    title: string;
    url: string;
    hidden?: boolean;
  }[];
};

const MobileNav = ({ items }: { items?: MobileNavItem[] }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  // const [projectList, setProjectList] = useState<
  //   {
  //     metaTitle: string,
  //     metaDescription: string,
  //     banners: [
  //       {
  //         image: string,
  //         imageAlt: string,
  //         title: string
  //       }
  //     ],
  //     aboutSection: {
  //       title: string,
  //       description: string,
  //       image: string,
  //       items: [
  //         {
  //           number: string,
  //           value: string
  //         }
  //       ]
  //     },
  //     partners: {
  //       title: string,
  //       items: [
  //         {
  //           image: string,
  //           imageAlt: string
  //         }
  //       ]
  //     },
  //     services: {
  //       title: string,
  //       items: [
  //         {
  //           image: string,
  //           imageAlt: string
  //         }
  //       ]
  //     },
  //     systems: {
  //       title: string,
  //       items: [
  //         {
  //           image: string,
  //           imageAlt: string,
  //           title: string
  //         }
  //       ]
  //     },
  //     certifications: {
  //       title: string,
  //       items: [
  //         {
  //           image: string,
  //           imageAlt: string
  //         }
  //       ]
  //     },
  //     projects: {
  //       title: string,
  //       description: string
  //     },
  //     socials: {
  //       title: string,
  //       email: string,
  //       phone: string,
  //       items: [
  //         {
  //           title: string,
  //           link: string
  //         }
  //       ]
  //     }
  //   }
  // >();
  // const handleFetchProjects = async () => {
  //   try {
  //     const response = await fetch("/api/admin/home");
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.data);
  //       setProjectList(data.data);
  //     } else {
  //       const data = await response.json();
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching industry", error);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchProjects();
  // }, []);

  const navItems =
    items && items.length > 0
      ? items
      : menuItems.map((item) => ({
          title: item.title,
          url: item.url,
          hidden: false,
          subItems: (item.children ?? []).map((child) => ({
            title: child.title,
            url: child.url,
            hidden: false,
          })),
        }));

  useEffect(() => {
    if (!menuOpen) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      return;
    }

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      const bodyTop = document.body.style.top;
      const lockedScrollY = bodyTop ? Math.abs(parseInt(bodyTop, 10)) : 0;

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      if (menuOpen) {
        window.scrollTo(0, lockedScrollY);
      }
    };
  }, [menuOpen]);

  return (
    <>

      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-white text-black dark:bg-black dark:text-white tanspheader py-4 z-50 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <Link href="/">
                <Image src="/assets/img/logo-light.svg" alt="Assent" width={180} height={140} className="h-[48px] w-auto dark:hidden" />
                <Image src="/assets/img/logo.svg" alt="Assent" width={180} height={140} className="h-[48px] w-auto hidden dark:block" />
              </Link>
            </div>

          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Hamburger Button */}
            <div
              className="cursor-pointer px-3 py-6"
              onClick={() => setMenuOpen(!menuOpen)}>
              <div
                className={`relative block h-[2px] w-7 bg-primary transition-all
                  before:absolute before:top-[-0.35rem] before:block before:h-full before:w-full before:bg-primary before:transition-all
                  after:absolute after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-primary after:transition-all
                  ${menuOpen
                    ? "bg-transparent before:rotate-45 before:top-0 after:-rotate-45 after:bottom-0"
                    : ""
                  }`}></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)} // Clicking outside closes menu
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white text-black dark:bg-black dark:text-white shadow-2xl transform transition-transform duration-500
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="min-h-full px-6 pt-[30px] pb-[40px] flex flex-col relative">
          {/* Close Button */}
          <button
            className="absolute top-8 right-4 text-[25px] text-primary font-[600]"
            onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          {/* Logo */}
          <div className="mb-[50px]">
            <div className="text-left ">
              <Link href="/">
                <Image src="/assets/img/logo-light.svg" alt="Assent" width={120} height={50} className="h-[45px] w-auto dark:hidden" />
                <Image src="/assets/img/logo.svg" alt="Assent" width={120} height={50} className="h-[45px] w-auto hidden dark:block" />
              </Link>
            </div>

          </div>
          {/* Navigation Items */}
          <ul className="flex flex-col gap-4">
            {navItems
              .filter((item) => !item.hidden)
              .map((item, index) => {
              if (item.subItems.length > 0) {
                return (
                  <li key={index}>
                    <div
                      className="pb-2 flex justify-between items-center cursor-pointer uppercase"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === index ? null : index)
                      }
                    >
                      <span className="font-semibold">{item.title}</span>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {activeDropdown === index && (
                      <ul>
                        {item.subItems
                          .filter((childItem) => !childItem.hidden)
                          .map((childItem, childIndex) => (
                          <li key={childIndex} className="py-1 text-black dark:text-white">
                            <Link
                              href={childItem.url}
                              onClick={() => {
                                setActiveDropdown(null);
                                setMenuOpen(false);
                              }}
                              className="flex items-center gap-2 rounded-[8px] py-1 transition-colors duration-300 hover:text-primary"
                            >
                              <Image
                                src="/assets/img/icons/arrow.svg"
                                alt=""
                                width={12}
                                height={12}
                                className="h-3 w-3 dark:invert-50"
                              />
                              <span>{childItem.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={index} className="pb-2 uppercase font-semibold">
                  <Link href={item.url} onClick={() => setMenuOpen(false)}>
                    {item.title}
                  </Link>
                </li>
              );
            })}

            {/* Contact Link */}
            <li className="uppercase">
              <Link href="/contact-us" onClick={() => setMenuOpen(false)} className="font-semibold">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-auto">
            <hr />
            <div className="flex space-x-4 mt-4">
              <div>
                <div className="flex space-x-4" >
                  <Link href="https://www.facebook.com/profile.php?id=61585660241145" target="_blank" className="cursor-pointer rounded-full p-2 bg-black text-white dark:bg-white dark:text-black hover:bg-primary transition-all duration-500">
                    <FaFacebookF className="cursor-pointer w-5 h-5 transition-all duration-500" />
                  </Link>
                  <Link href="https://www.linkedin.com" target="_blank" className="cursor-pointer rounded-full p-2 bg-black text-white dark:bg-white dark:text-black hover:bg-primary transition-all duration-500">
                    <FaLinkedinIn className="cursor-pointer w-5 h-5 transition-all duration-500" />
                  </Link>
                  <Link href="https://www.youtube.com/@GCCae" target="_blank" className="cursor-pointer rounded-full p-2 bg-black text-white dark:bg-white dark:text-black hover:bg-primary transition-all duration-500">
                    <FaYoutube className="cursor-pointer w-5 h-5 transition-all duration-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
