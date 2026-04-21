"use client";

import StandardBnr from "../common/StandardBnr";
import { useMemo } from "react";
import { SecondSectionFirstSection } from "../expertise/type";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const Main = ({ data, title }: { data: SecondSectionFirstSection; title: string }) => {
  const parsedDescription = useMemo(
    () =>
      (data.description || "").replace(
        /class="([^"]*)"/g,
        (match, classNames) => {
          const classes = classNames.split(" ");
          const inlineStyles: string[] = [];
          const remainingClasses: string[] = [];

          classes.forEach((cls: string) => {
            const colorMatch = cls.match(/^text-\[(#[0-9A-Fa-f]{3,6})\]$/);
            if (colorMatch) {
              inlineStyles.push(`color:${colorMatch[1]}`);
            } else {
              remainingClasses.push(cls);
            }
          });

          const classAttr =
            remainingClasses.length > 0
              ? `class="${remainingClasses.join(" ")}"`
              : "";
          const styleAttr =
            inlineStyles.length > 0 ? ` style="${inlineStyles.join(";")}"` : "";

          return `${classAttr}${styleAttr}`;
        }
      ),
    [data.description]
  );

  return (
    <section className="pt-47px xl:pt-57px dark:bg-light-dark">
      <div className="container">
        <StandardBnr title={title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-5 xl:gap-10 justify-items-between  lg:pt-[23px] pb-7 lg:pb-10 xl:pb-20">
          <motion.div variants={moveUp(0.2)} initial="hidden" animate="show" transition={{ duration: 1 }}>
            <h2 className="text-3xl leading-lh-text48 font-normal text-black dark:text-white"> {data.title} </h2>
          </motion.div>
          <motion.div variants={moveUp(0.4)} initial="hidden" animate="show" transition={{ duration: 1, delay: 0.2 }}>
            <p className="text-lg leading-lh-text19 text-[#515151] dark:text-white lg:w-[96%]" dangerouslySetInnerHTML={{ __html: parsedDescription, }} ></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Main;
