"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";

type Props = {
  title: string;
  description: string;
  measures: { name: string; icon: string }[];
};

const HealthandSafety = ({ title, description, measures }: Props) => {
  return (
    <section className="py-57px bg-black dark:bg-light-dark">
      <div className="container">
        <div className="mb-6 xl:mb-[47px]">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-6xl leading-lh-title font-normal mb-4 xl:mb-[27px] text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg leading-lh-text19 text-white font-light max-w-[100ch]"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 border border-smgray overflow-hidden"
        >
          {measures.map((item, index) => {
            const isLastCol = (index + 1) % 4 === 0; // last col in lg grid
            const isLastRow = index >= measures.length - 4; // last row in lg grid

            return (
              <motion.div
                key={index}
                variants={moveUp(index * 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`
          p-[20px] lg:p-[32px] xl:p-[35px] 2xl:p-[40px]
          hover:bg-primary hover:text-white transition-colors duration-300 group
          border-b lg:border-b-0 border-smgray lg:border-b-${
            isLastRow ? "0" : "smgray"
          } 
          ${!isLastCol ? "lg:border-r border-smgray" : ""}
        `}
              >
                <div>
                  <div className="mb-[60px] md:mb-[80px] xl:mb-[123px]">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] xl:w-15 group-hover:brightness-0 group-hover:invert-100 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-2xl leading-lh-text32 text-white group-hover:text-white transition-all duration-300">
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HealthandSafety;
