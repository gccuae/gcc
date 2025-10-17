"use client";

import StandardBnr from "../../common/StandardBnr";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  primaryColorText?: string;
};

const Main = ({ title, subtitle, description, primaryColorText }: Props) => {
  return (
    <section className="pt-57px xl:pt-25 dark:bg-light-dark">
      <div className="container">
        <StandardBnr title={title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 xl:gap-10 justify-items-between lg:pt-10 pb-[40px] xl:pb-[80px]">
          <div>
            <motion.h2
              variants={moveUp()}
              initial="hidden"
              animate="show"
              className="text-3xl leading-lh-text48 font-normal text-black dark:text-white capitalize max-w-[30ch]"
            >
              {subtitle}
            </motion.h2>
          </div>
          <div>
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              animate="show"
              className="text-lg lg:text-xl leading-[1.4] lg:leading-[1.608695652173913] text-para-color dark:text-white font-light"
            >
              <span className="text-primary font-normal">{primaryColorText}, </span>
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
