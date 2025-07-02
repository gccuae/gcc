"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { menuItems } from "./data";

import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";

const Header = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const pagesWithBackground = ["/"]; // Add required pages
  const hasBackground = pagesWithBackground.includes(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR errors

    // Screen size check for mobile
    const handleScreenCheck = () => {
      setIsMobile(window.innerWidth < 1139);
    };
    handleScreenCheck();
    window.addEventListener("resize", handleScreenCheck);

    // Scroll event for fixing header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleScreenCheck);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    }
  }, []);

  if (isMobile) {
    return <MobileNav />;
  } else if (isMobile == null) {
    return null;
  } else {
    return (
      <header
        className={`transition duration-300 ease-in-out w-full top-0 z-50 fixed border-b border-[#DBDBDB] z-[999]
          ${
            isScrolled
              ? "  left-0 bg-black  border-b-0 "
              : hasBackground
              ? "     text-white "
              : "relative bg-transparent text-white tanspheader"
          }
        `}
      >
        <Menu setActive={setActive}>
          {menuItems.map((menuItem, index) =>
            menuItem.children ? (
              <MenuItem
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
                key={index}
              >
                <div className="grid grid-cols-1 py-4">
                  {menuItem.children.map((item, index) => (
                    <HoveredLink href={`${item.url}`} key={index}>
                      <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:text-secondary hover:scale-105 flex gap-2 items-center self-start spckbtn whts">
                        <div>
                          <Image
                            src={"/assets/img/icons/arrow.svg"}
                            alt=""
                            width={15}
                            height={15}
                          />
                        </div>{" "}
                        <p className="m-0 p-0 text-[16px] uppercase ">
                          {item.title}
                        </p>
                      </div>
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            ) : (
              <MenuItem
                item={menuItem.title}
                url={menuItem.url}
                setActive={setActive}
                active={active}
                noMenu={true}
                key={index}
              >
                <div className="p-4">
                  <Link href="/">{menuItem.title}</Link>
                </div>
              </MenuItem>
            )
          )}
        </Menu>
      </header>
    );
  }
};

export default Header;
