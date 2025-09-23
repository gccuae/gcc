"use client";

import Link from "next/link";
import { newsDetails } from "./data";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp, moveLeft } from "../motionVarients";

const SidebarContent = () => {
  return (
    <aside>
      <motion.div
        className="border-b border-smgray pb-5 xl:pb-27px mb-5 xl:mb-27px"
        variants={moveUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h3
          className="text-3xl leading-lh-subtitle font-normal mb-5 xl:mb-[27px] text-black dark:text-white"
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Share
        </motion.h3>
        <ul className="flex gap-3 items-center">
          <motion.li
            className="bg-black rounded-full w-8 h-8 xl:w-[41px] xl:h-[41px] flex items-center justify-center hover:translate-y-[-2px] hover:bg-accent transition-colors duration-300 ease-in-out cursor-pointer active:bg-accent active:translate-y-0"
            variants={moveLeft()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="#">
              <svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3831 16.9291H6.57557C6.15132 16.9291 5.79448 16.7866 5.50506 16.5018C5.21563 16.2171 5.07091 15.8561 5.07091 15.4189V2.50361C5.07091 2.08006 5.21563 1.72357 5.50506 1.43414C5.79448 1.14472 6.15316 1 6.58109 1H13.7512L17.8877 5.12344V15.4189C17.8877 15.8561 17.743 16.2171 17.4536 16.5018C17.1642 16.7866 16.8073 16.9291 16.3831 16.9291ZM13.4097 5.46487V1.66973H6.58109C6.37098 1.66973 6.17838 1.75728 6.00328 1.93237C5.82819 2.10746 5.74064 2.30007 5.74064 2.51018V15.4189C5.74064 15.6378 5.82819 15.8326 6.00328 16.0033C6.17838 16.174 6.37098 16.2594 6.58109 16.2594H16.3775C16.5877 16.2594 16.7803 16.174 16.9554 16.0033C17.1304 15.8326 17.218 15.6378 17.218 15.4189V5.46487H13.4097ZM2.50624 21C2.08094 21 1.72357 20.8576 1.43414 20.5727C1.14471 20.288 1 19.927 1 19.4898V7.13263H1.66973V19.4898C1.66973 19.7087 1.75728 19.9035 1.93237 20.0742C2.10746 20.2449 2.30007 20.3303 2.51018 20.3303H11.742V21H2.50624Z"
                  fill="white"
                />
                <path
                  d="M5.74064 5.46487V1.66973V16.2594M16.3831 16.9291H6.57558C6.15132 16.9291 5.79448 16.7866 5.50506 16.5018C5.21563 16.2171 5.07091 15.8561 5.07091 15.4189V2.50361C5.07091 2.08006 5.21563 1.72357 5.50506 1.43414C5.79448 1.14472 6.15316 1 6.58109 1H13.7511L17.8877 5.12344V15.4189C17.8877 15.8561 17.743 16.2171 17.4536 16.5018C17.1641 16.7866 16.8073 16.9291 16.3831 16.9291ZM13.4097 5.46487V1.66973H6.58109C6.37098 1.66973 6.17838 1.75728 6.00328 1.93237C5.82819 2.10746 5.74064 2.30007 5.74064 2.51018V15.4189C5.74064 15.6378 5.82819 15.8326 6.00328 16.0033C6.17838 16.174 6.37098 16.2594 6.58109 16.2594H16.3775C16.5877 16.2594 16.7803 16.174 16.9554 16.0033C17.1304 15.8326 17.218 15.6378 17.218 15.4189V5.46487H13.4097ZM2.50624 21C2.08094 21 1.72357 20.8576 1.43414 20.5727C1.14471 20.288 1 19.927 1 19.4898V7.13263H1.66973V19.4898C1.66973 19.7087 1.75728 19.9035 1.93237 20.0742C2.10746 20.2449 2.30007 20.3303 2.51018 20.3303H11.742V21H2.50624Z"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            </Link>
          </motion.li>
          <motion.li
            className="bg-black rounded-full w-8 h-8 xl:w-[41px] xl:h-[41px] flex items-center justify-center hover:translate-y-[-2px] hover:bg-accent transition-colors duration-300 ease-in-out cursor-pointer active:bg-accent active:translate-y-0"
            variants={moveLeft(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="#">
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 9.195V15H12.5688V9.585C12.5688 8.226 12.0734 7.296 10.8318 7.296C9.88379 7.296 9.3211 7.92 9.07339 8.526C8.98165 8.742 8.96024 9.042 8.96024 9.345V14.997H5.52905C5.52905 14.997 5.57492 5.826 5.52905 4.875H8.96024V6.309C8.96024 6.309 8.94495 6.33 8.93884 6.342H8.96024V6.309C9.4159 5.622 10.2294 4.638 12.052 4.638C14.3089 4.638 16 6.084 16 9.192V9.195ZM1.9419 0C0.767584 0 0 0.756 0 1.749C0 2.742 0.746177 3.498 1.89602 3.498H1.91743C3.11315 3.498 3.85627 2.721 3.85627 1.749C3.83486 0.756 3.11315 0 1.93884 0H1.9419ZM0.204893 15H3.63303V4.878H0.204893V15Z"
                  fill="white"
                />
              </svg>
            </Link>
          </motion.li>
          <motion.li
            className="bg-black rounded-full w-8 h-8 xl:w-[41px] xl:h-[41px] flex items-center justify-center hover:translate-y-[-2px] hover:bg-accent transition-colors duration-300 ease-in-out cursor-pointer active:bg-accent active:translate-y-0"
            variants={moveLeft(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="#">
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.64445 0H5.74068C3.60188 0 2.21812 1.446 2.21812 3.69V5.391H0.299667C0.135144 5.391 0 5.526 0 5.697V8.163C0 8.331 0.135144 8.469 0.299667 8.469H2.21519V14.691C2.21519 14.859 2.35033 14.997 2.51485 14.997H5.01208C5.1766 14.997 5.31175 14.859 5.31175 14.691V8.469H7.55043C7.71496 8.469 7.8501 8.331 7.8501 8.163V5.697C7.8501 5.616 7.82072 5.538 7.76196 5.481C7.70614 5.424 7.62976 5.391 7.55043 5.391H5.30881V3.948C5.30881 3.255 5.47039 2.901 6.3547 2.901H7.63857C7.80309 2.901 7.93824 2.763 7.93824 2.595V0.309C7.93824 0.141 7.80603 0.003 7.63857 0.003L7.64445 0Z"
                  fill="white"
                />
              </svg>
            </Link>
          </motion.li>
          <motion.li
            className="bg-black rounded-full w-8 h-8 xl:w-[41px] xl:h-[41px] flex items-center justify-center hover:translate-y-[-2px] hover:bg-accent transition-colors duration-300 ease-in-out cursor-pointer active:bg-accent active:translate-y-0"
            variants={moveLeft(0.45)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link href="#">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33097 6.35146L13.5437 0H12.3092L7.78395 5.51421L4.16841 0H0L5.4672 8.33879L0 15H1.23443L6.01421 9.17604L9.83159 15H14L8.33097 6.35146ZM6.6402 8.41239L6.08734 7.58127L1.67906 0.975261H3.57752L7.13456 6.30853L7.68742 7.13964L12.3092 14.0707H10.4108L6.63728 8.41239H6.6402Z"
                  fill="white"
                />
              </svg>
            </Link>
          </motion.li>
        </ul>
      </motion.div>
      <div>
        <motion.h3
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl leading-lh-text32 font-light mb-5 xl:mb-27px text-black dark:text-white"
        >
          Related News
        </motion.h3>
        <div>
          {newsDetails.relatedNews.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={index}
              className="mb-8 md:mb-5 xl:mb-[17px] border-b border-smgray pb-5 xl:pb-[17px]"
            >
              <Link href={`/news/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={700}
                  className="w-full h-50 object-cover"
                />
                <h4 className="text-lg leading-lh-text19 font-light text-black dark:text-white mt-3 xl:mt-[17px]">
                  {item.title}
                </h4>
              </Link>
              <div className="flex mt-3 items-center justify-between">
                <span className="font-light text-base text-black dark:text-white/70">
                  {item.sector}
                </span>
                <span className="font-light text-base text-black dark:text-white/70">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          variants={moveUp(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="group cursor-pointer px-6 py-2 text-black rounded-3xl bg-light-white border border-mdgray uppercase flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
        >
          <span>View All</span>
          <Image
            src={assets.singleGreenArrow}
            alt="arrow"
            width={20}
            height={20}
            className="inline group-hover:translate-x-2 transition-all duration-300 ease-in-out"
          />
        </motion.button>
      </div>
    </aside>
  );
};

export default SidebarContent;
