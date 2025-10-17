"use client";

import StandardBnr from "../common/StandardBnr";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { SecondSectionFirstSection } from "../expertise/type";

const Main = ({ data }: { data: SecondSectionFirstSection }) => {
  return (
    <section className="pt-57px xl:pt-25   dark:bg-light-dark">
      <div className="container">
        <StandardBnr title="Civil & Structural Works" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10 justify-items-between  lg:pt-[23px] pb-7 lg:pb-10 xl:pb-20">
          <div>
            <motion.h2
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl leading-lh-text48 font-normal text-black dark:text-white"
            >
              {data.title}
            </motion.h2>
          </div>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=""
          >
            <div
              className="text-lg leading-lh-text19 text-[#515151] dark:text-white lg:w-[96%]"
              dangerouslySetInnerHTML={{
                __html: (data.description || "").replace(
                  /class="([^"]*)"/g, // match each class=""
                  (match, classNames) => {
                    // Split classes by space
                    const classes = classNames.split(" ");
                    const inlineStyles: string[] = [];
                    const remainingClasses: string[] = [];

                    classes.forEach((cls: string) => {
                      // Match Tailwind arbitrary color class: text-[#xxxxxx]
                      const colorMatch = cls.match(
                        /^text-\[(#[0-9A-Fa-f]{3,6})\]$/
                      );
                      if (colorMatch) {
                        inlineStyles.push(`color:${colorMatch[1]}`);
                      } else {
                        remainingClasses.push(cls);
                      }
                    });

                    // Construct the new class + style string
                    const classAttr =
                      remainingClasses.length > 0
                        ? `class="${remainingClasses.join(" ")}"`
                        : "";
                    const styleAttr =
                      inlineStyles.length > 0
                        ? ` style="${inlineStyles.join(";")}"`
                        : "";

                    return `${classAttr}${styleAttr}`;
                  }
                ),
              }}
            ></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Main;
