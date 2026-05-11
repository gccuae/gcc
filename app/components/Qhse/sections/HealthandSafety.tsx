"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { QhseType } from "../type";

type Props = {
  title: string;
  description: string;
  measures: QhseType["thirdSection"]["items"];
};

const HealthandSafety = ({ title, description, measures }: Props) => {
  return (
    <section className="py-37px md:py-47px xl:py-57px bg-black dark:bg-light-dark">
      <div className="container">
        <div className="mb-6 xl:mb-8">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl 2xl:text-5xl leading-lh-title font-normal mb-4 xl:mb-[27px] text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg leading-lh-text19 text-white font-light max-w-[120ch] "
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }} 
        >
        <div className="grid grid-cols-3 gap-5 md:gap-3 w-fit mb-6 xl:mb-10 items-center px-8 py-3 rounded-[8px] bg-light-white  divide-x divide-gray-250 dark:divide-gray-300">
          <div className="pr-5 md:pr-8 h-full">
            <Image src="assets/img/qhse/logo33.png" alt="Health and Safety" width={100} height={100} className="h-[40px] md:h-[55px] w-auto object-contain" />
            <p className="text-sm text-black mt-2 md:mt-3 max-w-[20ch]">12 Million Safe Man-Hours With No LTI</p>
          </div>
          <div className="px-5 md:px-8 h-full">
            <Image src="assets/img/qhse/logo22.png" alt="Health and Safety" width={100} height={100} className="h-[40px] md:h-[55px] w-auto object-contain" />
            <p className="text-sm text-black mt-2 md:mt-3 max-w-[20ch]">4.5 Million Man-Hours Without a Lost Time Injury (LTI)</p>
          </div>
          <div className="pl-5 md:pl-8 h-full">
            <Image src="assets/img/qhse/logo11.png" alt="Health and Safety" width={100} height={100} className="h-[40px] md:h-[55px] w-auto object-contain " />
            <p className="text-sm text-black mt-2 md:mt-3 max-w-[20ch]">4M Man-Hours Without LTI for Abu Dhabi Municipality Project</p>
          </div>
        </div>
        </motion.div>

        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 border dark:border-white/20 overflow-hidden"
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
                className={`p-[20px] lg:p-[32px] xl:p-[35px] 2xl:p-[40px]
          hover:bg-primary hover:text-white transition-colors duration-300 group
          border-b lg:border-b-0 dark:border-white/20 lg:border-b-${isLastRow ? "0" : "smgray"
                  } 
          ${!isLastCol ? "md:border-r dark:border-white/20" : ""}
        `}
              >
                <div>
                  <div className="mb-[60px] md:mb-[80px] xl:mb-[123px]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] xl:w-15 group-hover:brightness-0 group-hover:invert-100 transition-all duration-300 group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="text-2xl leading-lh-text32 text-white group-hover:text-white transition-all duration-300 group-hover:scale-[1.05]">
                    {item.title}
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
