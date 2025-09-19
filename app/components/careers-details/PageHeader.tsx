"use client";

import Breadcrumb from "../common/BreadCrumb";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveLeft } from "../motionVarients";
import { useState } from "react";
import JobApplicationModal from "./JobApplicationModal";
import Image from "next/image";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-9999 flex items-center justify-center">
      {/* Wrapper for scrolling */}
      <div className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-light-white dark:bg-[#0d0d0d] p-6 sm:p-10 md:p-[57px] 2xl:p-[77px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute 2xl:top-[42px] 2xl:right-[42px] xl:top-[35px] xl:right-[35px] top-[20px] right-[20px] hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          <Image
            src="/assets/img/careers/close-popup.svg"
            alt="Close"
            width={20}
            height={20}
          />
        </button>

        {children}
      </div>
    </div>
  );
};

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <div onClick={() => setIsOpen(true)}>
                <BtnPrimary link="#" text="Apply Now" bgtrans={false} />
              </div>
            </motion.div>
          </div>
          <Breadcrumb standard={true} />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <JobApplicationModal onSuccess={() => setIsOpen(false)} />
      </Modal>
    </section>
  );
};

export default PageHeader;
