"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import EnvironmentModal from "./EnvironmentModal";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { QhseType } from "../type";

type Matter = QhseType["forthSection"]["items"][number];

type Props = {
  title: string;
  description: string;
  matters: QhseType["forthSection"]["items"];
};

const EnvironmentalResponsibility = ({
  title,
  description,
  matters,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<Matter | null>(null);
  return (
    <section className="pb-2 md:pb-57px py-57px bg-white dark:bg-black">
      <div className="container">
        {/* Title */}
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-light leading-lh-title text-black dark:text-white mb-4 md:mb-27px"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg leading-lh-text19 font-light text-para-color dark:text-white max-w-[100ch] mb-57px"
        >
          {description}
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-30px gap-20px">
          {matters.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.22)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              key={index}
              className="group flex flex-col overflow-hidden md:border-b border-gray-200 dark:border-white/50 hover:border-primary transition-colors duration-300 pb-27px xl:pb-[31px]"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.thumbnailAlt}
                  width={486}
                  height={475}
                  className="object-cover w-full max-w-full max-h-[300px] lg:max-h-[475px] group-hover:scale-[1.02] transition-all duration-300 group-hover:blur-[2px]"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </div>

              <div className="mt-[27px] flex justify-between items-center">
                {/* Title */}
                <h3 className="text-xl font-medium text-black dark:text-white leading-lh-text32">
                  {item.title}
                </h3>
                {/* Small images row */}
                <div className="flex justify-center gap-2">
                  {item.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-200 -ml-4"
                    >
                      <Image
                        src={img.image}
                        alt={`${item.title} ${i + 1}`}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedItem && (
            <EnvironmentModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EnvironmentalResponsibility;
