"use client";

import Breadcrumb from "../common/BreadCrumb";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveLeft } from "../motionVarients";

interface PageHeaderProps {
  title: string;
}
const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <section className="pt-57px dark:bg-[#0d0d0d]">
      <div className="container">
        <div className="border-b border-smgray pb-5 xl:pb-10 pb-8 xl:pb-57px">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white"
            >
              {title}
            </motion.h1>
            <motion.div
              variants={moveLeft()}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
            >
              <BtnPrimary link="#" text="Apply Now" bgtrans={true} />
            </motion.div>
          </div>
          <Breadcrumb standard={true} />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
