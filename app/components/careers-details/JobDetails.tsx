"use client";

import BtnPrimary from "../common/BtnPrimary";
import { AnimatePresence, motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { jobDetails } from "./data";
import { useState } from "react";
import Image from "next/image";
import JobApplicationModal from "./JobApplicationModal";

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          {/* Modal box animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.8, 0.25, 1], // smooth easing
            }}
            className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-xl bg-light-white dark:bg-[#0d0d0d] shadow-lg p-6 sm:p-10 md:p-[57px] 2xl:p-[77px]"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
            >
              <Image
                src="/assets/img/careers/close-popup.svg"
                alt="Close"
                width={20}
                height={20}
              />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const JobDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="dark:bg-[#0d0d0d]">
      <div className="container">
        {/* About the Role */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            className="text-2xl leading-lh-text32 text-black dark:text-white mb-2 lg:mb-27px"
          >
            About the Role
          </motion.h2>
          {jobDetails.about.map((para, idx) => (
            <motion.p
              key={idx}
              variants={moveUp(idx * 0.2)}
              initial="hidden"
              whileInView="show"
              className="text-lg leading-lh-text19 mb-2 font-light text-foreground dark:text-white/70"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Key Responsibilities */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <h2 className="text-2xl leading-lh-text32 text-black dark:text-white mb-3 lg:mb-27px">
            Key Responsibilities
          </h2>
          <div className="flex flex-col gap-4 lg:gap-37px">
            {jobDetails.responsibilities.map((section, idx) => (
              <motion.div
                variants={moveUp(idx * 0.2)}
                initial="hidden"
                whileInView="show"
                key={idx}
              >
                <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">
                  {section.title}
                </h3>
                <ul className="square-list list-inside">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-lg leading-lh-text19 font-light text-foreground dark:text-white/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Apply Now */}
        <div className="pt-47px pb-57px border-b border-smgray">
          <motion.h3
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            className="text-2xl leading-lh-text32 text-black dark:text-white mb-3 lg:mb-27px"
          >
            {jobDetails.apply.heading}
          </motion.h3>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            className="text-lg leading-lh-text19 font-light mb-27px text-foreground dark:text-white/70"
          >
            {jobDetails.apply.description}
          </motion.p>
          <motion.div
            variants={moveUp(0.4)}
            initial="hidden"
            whileInView="show"
            onClick={() => setIsModalOpen(true)}
          >
            <BtnPrimary
              onClick={() => setIsModalOpen(true)}
              text={jobDetails.apply.button.text}
              bgtrans={true}
            />
          </motion.div>
        </div>
      </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <JobApplicationModal onSuccess={() => setIsModalOpen(false)} />
        </Modal>
    </section>
  );
};

export default JobDetails;
