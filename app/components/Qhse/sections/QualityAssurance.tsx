"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, moveUp, moveLeft } from "../../motionVarients";
import { QhseType } from "../type";

type Props = {
  title: string;
  description: string;
  image: string;
  certifications: QhseType["secondSection"]["items"];
};

const QualityAssurance = ({
  title,
  description,
  image,
  certifications,
}: Props) => {
  return (
    <section className="bg-light-white dark:bg-black py-57px">
      <div className="container flex flex-col-reverse lg:flex-row items-stretch gap-[35px] xl:gap-[70px]">
        {/* Left Image */}
        <motion.div
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full lg:w-[49%]"
        >
          <Image src={image} alt="Quality Assurance" width={705} height={502} className="object-cover w-full h-[402px] lg:h-[502px] xl:h-full" />
        </motion.div>

        {/* Right Content */}
        <div className="w-full lg:w-[51%]">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl text-black dark:text-white leading-lh-title"
          >
            {title}
          </motion.h2>
          {description.split("\n").map((para, index) => (
            <motion.p
              key={index}
              variants={moveUp(index * 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg text-para-color dark:text-white font-light leading-lh-text19 mt-3 md:mt-6"
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="container mx-auto flex justify-center mt-[23px] md:mt-[46px] items-center">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-smgray border-t border-t-smgray dark:divide-white/20 dark:border-white/20">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={moveLeft(index * 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`flex flex-col items-center py-[11px] px-[20px] xl:px-[82px] last:border-r dark:border-white/20 first:border-l last:border-b ${index % 2 == 0 && "max-md:border-l"} ${index % 3 == 0 && "md:border-l lg:border-l-0"}`}
            >
              <Image
                src={cert.image}
                alt={cert.imageAlt}
                width={140}
                height={140}
              />
              <p className="mt-[12px] font-bold text-sm text-para-color dark:text-white text-center">
                {cert.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QualityAssurance;
