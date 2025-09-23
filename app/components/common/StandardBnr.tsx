"use client";

import { moveUp } from "../motionVarients";
import Breadcrumb from "./BreadCrumb";
import { motion } from "framer-motion";

interface Props {
  title: string;
}
const StandardBnr = ({ title }: Props) => {
  return (
    <motion.div
      variants={moveUp()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="border-b border-smgray pb-5 xl:pb-10 mb-8 xl:mb-57px"
    >
      <motion.h2
        initial={{ opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white"
      >
        {title}
      </motion.h2>
      <Breadcrumb standard={true} />
    </motion.div>
  );
};
export default StandardBnr;
