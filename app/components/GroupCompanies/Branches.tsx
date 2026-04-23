"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BusinessNetworkCard from "./BusinessNetworkCard";
import { BRANCH_TITLES } from "./branchTitles";
import { moveUp } from "../../components/motionVarients";
import { SecondSection } from "./type";

interface BranchesProps {
  data: SecondSection;
}

const Branches = ({ data }: BranchesProps) => {
  const branchItems = data.items.filter((item) =>
    BRANCH_TITLES.includes(item.title)
  );

  if (!branchItems.length) {
    return null;
  }

  return (
    <section className="pt-37px pb-57px xl:pt-57px xl:pb-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="show"
          className=" text-4xl 2xl:text-5xl leading-[1.147058823529412] text-black dark:text-white mb-2 md:mb-4 xl:mb-[27px]"
        >
          Branches
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 xl:gap-x-8 xl:gap-y-47px">
          {branchItems.map((branchItem, index) => (
            <motion.div
              key={branchItem._id || branchItem.title}
              className="border-b dark:border-white/20 hover:border-primary"
              variants={moveUp((index % 6) * 0.1)}
              viewport={{ once: true }}
              initial="hidden"
              whileInView="show"
            >
              {branchItem.link !== "#" ? (
                <Link href={branchItem.link} target="_blank" className="cursor-pointer">
                  <BusinessNetworkCard item={branchItem} index={index} hasLink={true} />
                </Link>
              ) : (
                <div>
                  <BusinessNetworkCard item={branchItem} index={index} hasLink={false} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
