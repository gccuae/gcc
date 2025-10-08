"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

interface EngProps {
  data: {
    title: string;
    desc: string;
    items: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
}
const WhyChoose = ({ data }: EngProps) => {
  return (
    <section className="2xl:pb-[100px]  py-57px bg-light-white dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-3  tracking-[-1.9px]"
        >
          {data.title}
        </motion.h2>
        <motion.p
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-xl max-w-[96ch] leading-[1.526315789473684] text-forground dark:text-white/70"
        >
          {data.desc}
        </motion.p>
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-5 md:mt-57px lg:mt-[35px] gap-5 xl:gap-0 "
        >
          {data.items.map((item, index) => (
            <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true }} key={index}
              className="flex flex-col border xl:border-r-0 xl:last:border-r-1 border-smgray dark:border-[#434343]  second:border-r-0   group"
            >
              <div className="border-b border-smgray dark:border-[#434343] xl:pt-5 2xl:pr-1 p-5 pb-2 2xl:pb-0  2xl:p-8 xl:pb-0 group-hover:border-b-primary group-hover:border-b-[4px] transition-all duration-300">
                <div className=" w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full transition-all duration-300 flex items-center justify-center mb-3 lg:mb-4">
                  <Image src={item.icon} alt={item.title} width={100} height={100}
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl max-w-[16ch] 2xl:text-2xl leading-[1.3155] dark:text-white pb-3 xl:pb-[27px] text-black">
                  {item.title}
                </h3>
              </div>
              <div className="p-4 xl:p-5 2xl:p-10 2xl:pt-[27px]">
                <p className="text-lg leading-[1.5625] dark:text-white">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
