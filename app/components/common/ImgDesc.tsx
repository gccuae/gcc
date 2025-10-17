"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { ImgDescProps } from "../About/type";

const ImgDesc = ({ data }: { data: ImgDescProps }) => {
  return (
    <section className="py-57px dark:bg-black">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-[70px] items-stretch">
          {/* Text Section */}
          <div className="flex flex-col gap-6 justify-center order-1 lg:order-2 w-[105%]">
            <div>
              <motion.h2
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-4xl 2xl:text-5xl leading-[1.147058823529412] capitalize text-black dark:text-white pb-3 xl:pb-[27px] xl:tracking-[-2.2px]"
              >
                {data.title}
              </motion.h2>
              <div>
                {data.description
                  .split("\n")
                  .map((line: string, idx: number) => (
                    <motion.p
                      key={idx}
                      variants={moveUp(0.35 + idx * 0.1)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="dark:text-white text-lg font-light leading-[1.526315789473684] mb-3 lg:mb-6 last:mb-0 text-para-color"
                    >
                      {line}
                    </motion.p>
                  ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="
              relative order-2 xl:order-1
              h-[350px] md:h-[400px] lg:h-[500px] xl:h-full
            "
          >
            <Image
              src={data.image}
              alt={data.imageAlt || ""}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImgDesc;
