"use client";

import StandardBnr from "../common/StandardBnr";
import { useMemo } from "react";
import { SecondSectionFirstSection } from "../expertise/type";

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
    <section className="pt-57px xl:pt-25   dark:bg-light-dark">
      <div className="container">
        <StandardBnr title={title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-10 justify-items-between  lg:pt-[23px] pb-7 lg:pb-10 xl:pb-20">
          <div>
            <h2 className="text-3xl leading-lh-text48 font-normal text-black dark:text-white">
              {data.title}
            </h2>
          </div>
          <div>
            <div
              className="text-lg leading-lh-text19 text-[#515151] dark:text-white lg:w-[96%]"
              dangerouslySetInnerHTML={{
                __html: parsedDescription,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
