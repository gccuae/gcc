"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  standard?: boolean;
}

const Breadcrumb = ({ standard = false }: Props) => {
  const pathname = usePathname();

  // Split and clean path parts
  const pathParts = pathname.split("/").filter((part) => part);

  // Accumulate paths for links
  const buildHref = (index: number) =>
    "/" + pathParts.slice(0, index + 1).join("/");

  return (
    <ul
      className={`flex items-center gap-4 text-16 font-medium uppercase  ${
        standard
          ? "text-black dark:text-white pt-4 xl:pt-[17px]"
          : "text-white pt-6 xl:pt-[25px]"
      }`}
    >
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-4 text-15 leading-[1.2] font-normal group"
      >
        <Link
          href="/"
          className={`${
            standard ? "text-mdgray dark:text-white" : "text-light-white"
          } hover:underline`}
        >
          Home
        </Link>
        {pathParts.length > 0 && (
          <span className="group-last:hidden">
            <svg
              width="26"
              height="11"
              viewBox="0 0 26 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10H24L15 1"
                stroke="#7AC142"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
          </span>
        )}
      </motion.li>

      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1;
        const label = decodeURIComponent(part.replace(/-/g, " "));
        const href = buildHref(index);

        return (
          <motion.li
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-4 text-15 leading-[1.2] font-normal group uppercase"
          >
            {!isLast ? (
              <Link href={href} className="text-mdgray">
                {label}
              </Link>
            ) : (
              <span className="uppercase">{label}</span>
            )}

            {!isLast && (
              <span className="group-last:hidden">
                <svg
                  width="26"
                  height="11"
                  viewBox="0 0 26 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10H24L15 1"
                    stroke="#7AC142"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
              </span>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
