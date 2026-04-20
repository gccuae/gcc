"use client";

import BusinessNetworkCard from "./BusinessNetworkCard";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { SecondSection } from "./type";
import Link from "next/link";

export interface SecondSectionProps {
  data: SecondSection;
}

const BusinessNetworks = ({ data }: SecondSectionProps) => {
  return (
    <section className="pt-37px pb-57px xl:pt-57px xl:pb-57px">
      <div className="container">
        <div className="mb-5 xl:mb-[47px]">
          <motion.h2
            variants={moveUp()}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className=" text-4xl xl:text-5xl leading-[1.147058823529412] text-black dark:text-white mb-2 md:mb-4 xl:mb-[27px]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="text-lg max-w-[88ch] leading-lh-text19 text-black dark:text-white/70 font-light mb-0 text-para-color"
          >
            {data.description}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 xl:gap-x-8 xl:gap-y-47px">
          {data.items.filter((item) => !item.hideCompany).map((item, index) => (
            <motion.div className="border-b dark:border-white/20 hover:border-primary"
              key={index}
              variants={moveUp(index * 0.12)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
            >
              {item?.link !== '#' ? (
                <Link href={item.link} target="_blank" className="cursor-pointer ">
                  <BusinessNetworkCard item={item} index={index} hasLink={true} />
                </Link>
              ) : (
                <div>
                  <BusinessNetworkCard item={item} index={index} hasLink={false} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessNetworks;
