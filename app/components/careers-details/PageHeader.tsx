"use client";

import BreadcrumbStd from "../common/BreadCrumbStd";
import BtnPrimary from "../common/BtnPrimary";
import { AnimatePresence, motion } from "framer-motion";
import { moveLeft, moveUp } from "../motionVarients";
import { useEffect, useState } from "react";
import JobApplicationModal from "./JobApplicationModal";
import Image from "next/image";

const Modal = ({
  isOpen,
  onClose,
  disableClose = false,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  disableClose?: boolean;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
            <button onClick={disableClose ? undefined : onClose} disabled={disableClose} className={`absolute top-5 right-5 md:top-6 md:right-6 xl:top-8 xl:right-8 p-1 rounded-full text-gray-500 hover:text-black dark:hover:text-white ${disableClose ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <Image
                src="/assets/img/careers/close-popup.svg"
                alt="Close"
                width={30}
                height={30}
                className="w-7 h-7 md:w-8 md:h-8 dark:invert-100"
              />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);

  return (
    <section className="pt-57px dark:bg-[#0d0d0d]">
      <div className="container">
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="border-b dark:border-white/20 pb-5 xl:pb-10 pb-8 xl:pb-57px"
        >
          <div className="flex justify-between items-center flex-wrap gap-y-5 mb-4 xl:mb-0">
            <motion.h1
              initial={{ opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className=" text-4xl xl:text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white"
            >
              {title}
            </motion.h1>
            <motion.div
              variants={moveLeft()}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.2, once: true }}
            >
              <BtnPrimary
                onClick={() => setIsOpen(true)}
                text="Apply Now"
                bgtrans={false}
              />
            </motion.div>
          </div>
          <BreadcrumbStd standard={true} />
        </motion.div>
      </div>

      <Modal
        isOpen={isOpen}
        disableClose={isSubmittingApplication}
        onClose={() => {
          if (isSubmittingApplication) return;
          setIsOpen(false);
        }}
      >
        <JobApplicationModal
          onSubmittingChange={setIsSubmittingApplication}
          onSuccess={() => {
            setIsSubmittingApplication(false);
            setIsOpen(false);
          }}
        />
      </Modal>
    </section>
  );
};

export default PageHeader;
