"use client";

import Image from "next/image";
import Breadcrumb from "./BreadCrumb";
import { motion } from "framer-motion";

interface PageBnrProps {
  pageTitle: string;
  bannerImg: string;
}

const PageBnr = ({ pageTitle, bannerImg }: PageBnrProps) => {
  return (
    <section className="relative h-[300px] md:h-[350px]  xl:h-[450px] flex flex-col justify-end pb-6 md:pb-15 xl:pb-[83x]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <Image
          src={bannerImg}
          alt=""
          width={1920}
          height={800}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black/80 from-0% via-black/55 via-51% to-black/85 to-100%"></div>
      <div className="container relative z-10">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="text-white text-5xl md:text-6xl leading-[1.2]"
          >
            {pageTitle}
          </motion.h2>
        </div>
        <Breadcrumb />
      </div>
    </section>
  );
};

export default PageBnr;
