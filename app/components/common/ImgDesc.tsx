"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";

interface ImgDescProps {
  data: {
    img: string;
    title: string;
    description: string;
  };
}

const ImgDesc = ({ data }: ImgDescProps) => {
  return (
    <section className="py-57px dark:bg-black">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:flex gap-6 xl:gap-[70px] items-center">
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="xl:w-[48.6%]"
          >
            <Image
              src={data.img}
              alt=""
              width={1500}
              height={1500}
              className="w-full max-h-[772px] object-cover"
            />
          </motion.div>
          <div className="xl:w-[51.3%] flex flex-col gap-6 justify-center">
            <div>
              <motion.h2
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-5xl leading-[1.147058823529412] text-black dark:text-white pb-3 xl:pb-[27px] xl:tracking-[-2.1px]"
              >
                {data.title}
              </motion.h2>
              <div>
                <motion.p
                  variants={moveUp(0.35)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="dark:text-white text-lg font-light leading-[1.526315789473684] mb-6 last:mb-0"
                >
                  {data.description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgDesc;
