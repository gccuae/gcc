"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  standard?: boolean;
}

const BreadcrumbStd = ({ standard = false }: Props) => {
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter((part) => part);

  const buildHref = (index: number) =>
    "/" + pathParts.slice(0, index + 1).join("/");

  const truncateLabel = (label: string) =>
    label.length > 8 ? label.slice(0, 8) + "…" : label;

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
            standard ? "text-mdgray dark:text-white/70" : "text-mdgray dark:text-white/70"
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
        const fullLabel = decodeURIComponent(part.replace(/-/g, " "));
        const truncatedLabel = truncateLabel(fullLabel);
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
              <Link
                href={href}
                className="text-mdgray dark:text-white/70 hover:underline"
              >
                {/* Show truncated on mobile, full on larger screens */}
                <span className="block sm:hidden">{truncatedLabel}</span>
                <span className="hidden sm:block">{fullLabel}</span>
              </Link>
            ) : (
              <span className="uppercase">
                <span className="block sm:hidden">{truncatedLabel}</span>
                <span className="hidden sm:block">{fullLabel}</span>
              </span>
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

export default BreadcrumbStd;
