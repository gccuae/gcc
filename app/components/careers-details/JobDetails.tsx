"use client";

import BtnPrimary from "../common/BtnPrimary";
import { AnimatePresence, motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
import { jobDetails } from "./data";
import { useEffect, useState } from "react";
import Image from "next/image";
import JobApplicationModal from "./JobApplicationModal";
import { careerData } from "../careers/type";

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
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black/75 p-4"
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
              onClick={disableClose ? undefined : onClose}
              disabled={disableClose}
              className={`absolute top-2 right-2 sm:top-5 sm:right-5 md:top-6 md:right-6 p-1 rounded-full text-gray-500 hover:text-black dark:hover:text-white ${
                disableClose
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
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

const JobDetails = ({
  secondSection,
  thirdSection,
  forthSection,
  title,
}: {
  secondSection: careerData["openings"][number]["secondSection"];
  thirdSection: careerData["openings"][number]["thirdSection"];
  forthSection: careerData["openings"][number]["forthSection"];
  title: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  // const sanitizeHtml = (html: string) => html.replace(/&nbsp;/g, " ");

  // const cleanedContent = thirdSection.description
  //   .replace(/<span[^>]*>/g, "")
  //   .replace(/<\/span>/g, "")
  //   .replace(/ style="[^"]*"/g, "");

  const formatHtml = (html: string) => {
    return html.replace(
      /<p>(?:&nbsp;|\s|<br\s*\/?>)*<\/p>/gi,
      '<p class="empty-paragraph"></p>',
    );
  };

  return (
    <section className="dark:bg-[#0d0d0d] overflow-hidden">
      <div className="container">
        {/* About the Role */}
        {!secondSection.hidden && (
          <div className="pt-47px pb-4 md:pb-57px border-b dark:border-white/20">
            <motion.h2
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              className="text-2xl leading-lh-text32 text-black dark:text-white mb-2 lg:mb-27px"
            >
              {secondSection.title}
            </motion.h2>
            {secondSection.description
              .split("\n")
              .map((para: string, idx: number) => (
                <motion.p
                  key={idx}
                  variants={moveUp(idx * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  className="text-lg leading-lh-text19 mb-2 -mt-1 font-light text-para-color dark:text-white/70"
                >
                  {para}
                </motion.p>
              ))}
          </div>
        )}

        {/* Key Responsibilities */}
        {!thirdSection.hidden && (
          <motion.div
            className="pt-4 md:pt-47px pb-6 md:pb-57px border-b dark:border-white/20 overflow-hidden"
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
          >
            <h2 className="text-2xl leading-lh-text32 text-black dark:text-white mb-3 lg:mb-27px">
              {thirdSection.title}
            </h2>
            <div className="job-detail-responsibility">
              <motion.div
                variants={moveUp()}
                initial="hidden"
                whileInView="show"
                className="text-lg leading-lh-text19 font-light text-para-color dark:text-white/70"
                // className="flex flex-col gap-4 lg:gap-27px job-detail-responsibility [&_p>span]:text-para-color [&_p>span]:font-light [&_p>span]:text-lg [&_p>span]:leading-lh-text19 dark:[&_p>span]:!text-white/70 dark:[&_h3>span]:!text-white/70 dark:[&_li>span]:!text-white/70"
                dangerouslySetInnerHTML={{
                  __html: formatHtml(thirdSection.description),
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Apply Now */}
        {!forthSection.hidden && (
          <div className="pt-4 md:pt-47px pb-13 md:pb-15 xl:pb-57px border-b dark:border-white/20">
            <motion.h3
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              className="text-2xl leading-lh-text32 text-black dark:text-white mb-3 lg:mb-27px"
            >
              {forthSection.title}
            </motion.h3>
            <div className="job-detail-responsibility">
              <motion.p
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                className="text-lg leading-lh-text19 font-light text-para-color dark:text-white/70"
                dangerouslySetInnerHTML={{
                  __html: formatHtml(forthSection.description),
                }}
              />
            </div>
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              className="mt-27px"
              onClick={() => setIsModalOpen(true)}
            >
              <BtnPrimary
                onClick={() => setIsModalOpen(true)}
                text={jobDetails.apply.button.text}
                bgtrans={true}
              />
            </motion.div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        disableClose={isSubmittingApplication}
        onClose={() => {
          if (isSubmittingApplication) return;
          setIsModalOpen(false);
        }}
      >
        <JobApplicationModal
          title={title}
          onSubmittingChange={setIsSubmittingApplication}
          onSuccess={() => {
            setIsSubmittingApplication(false);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </section>
  );
};

export default JobDetails;
