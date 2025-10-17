"use client";

import Counter from "../common/Counter";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { FirstSection, FirstSectionItem } from "./type";

export interface FirstSectionProps {
  data: FirstSection;
}

const CounterSection = ({ data }: FirstSectionProps) => {
  return (
    <section className="py-57px lg:pb-0 bg-light-white dark:bg-light-dark">
      <div className="container">
        <div className="mb-6 xl:mb-[47px]">
          <motion.h2
            variants={moveUp()}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="text-5xl leading-[1.147058823529412] font-normal mb-4 xl:mb-[27px] text-black dark:text-white"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="text-lg leading-lh-text19 text-black dark:text-white font-light"
          >
            {data.description}
          </motion.p>
        </div>
        <motion.div
          variants={moveUp(0.32)}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-r border-smgray dark:border-[#3f3f3f]"
        >
          {data.items.map((item: FirstSectionItem, index: number) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.22)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
              className="border-b lg:border-b-0 border-r dark:border-[#3f3f3f] border-smgray last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(4)]:border-r-0 lg:[&:nth-child(2)]:border-r-1
            px-5 md:px-10 xl:px-14 2xl:px-18 pt-4 xl:pt-[22px] pb-4 xl:pb-[21px]
               hover:bg-primary hover:text-white transition-colors duration-300 group"
            >
              <div>
                <div className="mb-47px h-10 xl:h-[60px] xl:w-[62px] flex items-center">
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={62}
                    height={60}
                    className="w-10 h-auto xl:w-[62px] group-hover:brightness-0 group-hover:invert-100 transition-all duration-300"
                  />
                </div>
                <h3 className="text-5xl leading-lh-text68 font-normal mb-4 xl:mb-[16px] text-black dark:text-white group-hover:text-white transition-all duration-300">
                  {/* <Counter from={0} to={Number(item.number)} duration={2} />+ */}
                  <Counter
                    from={0}
                    to={
                      Number(
                        item.number.toString().replace(/[^0-9.eE-]/g, "")
                      ) || 0
                    }
                    duration={2}
                  />
                  +
                </h3>
                <p className="text-lg leading-lh-text19 dark:text-white uppercase">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CounterSection;
