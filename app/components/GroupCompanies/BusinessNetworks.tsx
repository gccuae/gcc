"use client";

import BusinessNetworkCard from "./BusinessNetworkCard";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { SecondSection } from "./type";

export interface SecondSectionProps {
  data: SecondSection;
}

const BusinessNetworks = ({ data }: SecondSectionProps) => {
  return (
    <section className="py-57px">
      <div className="container">
        <div className="mb-5 xl:mb-[47px]">
          <motion.h2
            variants={moveUp()}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-5 xl:mb-[27px]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"
            className="text-lg max-w-[88ch] leading-lh-text19 text-black dark:text-white/70 font-light mb-0"
          >
            {data.description}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-8 ">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.12)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
            >
              <BusinessNetworkCard item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessNetworks;
