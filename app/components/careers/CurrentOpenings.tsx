"use client";

import dynamic from "next/dynamic";
import BtnPrimary from "../common/BtnPrimary";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveLeft, moveUp } from "../motionVarients";
import { components } from "react-select";
import { ChevronDown } from "lucide-react";

interface CurrentOpeningsProps {
  data: {
    jobs: { title: string; sector: string; location: string; type: string }[];
  };
}

const CurrentOpenings = ({ data }: CurrentOpeningsProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const lastTouchY = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    if (!section || !left) return;

    const leftCanScroll = (dir: number) => {
      if (dir > 0) {
        return left.scrollTop + left.clientHeight < left.scrollHeight - 1;
      } else {
        return left.scrollTop > 0;
      }
    };

    const sectionIsVisible = () => {
      const r = section.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (!sectionIsVisible()) return;

      const delta = e.deltaY;
      if (!delta) return;

      if (leftCanScroll(Math.sign(delta))) {
        left.scrollBy({ top: delta }); // Removed smooth behavior
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY.current == null) return;
      if (!sectionIsVisible()) return;

      const currentY = e.touches?.[0]?.clientY ?? 0;
      const delta = lastTouchY.current - currentY;

      if (leftCanScroll(Math.sign(delta))) {
        left.scrollBy({ top: delta });
        lastTouchY.current = currentY;
        e.preventDefault();
      } else {
        lastTouchY.current = currentY;
      }
    };

    const onTouchEnd = () => {
      lastTouchY.current = null;
    };

    // Attach listeners to section instead of window for touch events
    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const jobTitles = [
    "Job Title",
    "All Jobs",
    "Software Engineer",
    "Senior Software Engineer",
    "Team Lead",
    "Project Manager",
    "QA Engineer",
  ];

  const departments = [
    "Department",
    "All Departments",
    "IT",
    "Civil",
    "Mechanical",
    "Electrical",
    "QA Engineer",
  ];

  const locations = [
    "Location",
    "All Locations",
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
  ];

  const dropdowns = [jobTitles, departments, locations];
  const Select = dynamic(() => import("react-select"), { ssr: false });

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={20} color="#000" />
      </components.DropdownIndicator>
    );
  };

  return (
    <section className="pt-57px">
      <div className="container">
        <div className="mb-6 xl:mb-27px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white mb-4 xl:mb-[17px]"
          >
            Current Openings
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl leading-lh-text32 text-foreground dark:text-white"
          >
            We’re always on the lookout for outstanding talent
          </motion.p>
        </div>
        <div className="pt-6 xl:pt-10 pb-6 xl:pb-47px">
          <div className="flex flex-col gap-6 xl:flex-row md:gap-6 xl:gap-10 w-full md:w-fit">
            {dropdowns.map((options, idx) => (
              <motion.div
                key={idx}
                variants={moveLeft(idx * 0.25)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Select
                  components={{ DropdownIndicator }}
                  className="md:w-[280px]"
                  key={idx}
                  classNamePrefix="react-select"
                  options={options.map((label) => ({ value: label, label }))}
                  placeholder={options[0]}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      borderBottom: "1px solid #BCBCBC",
                      borderRadius: 0,
                      boxShadow: "none",
                      padding: "2px 0",
                      "&:hover": {
                        borderBottom: "1px solid #000",
                      },
                      transition: "all 0.3s ease-in-out",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: 0, // remove extra padding
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0,
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#000000",
                      fontSize: "19px",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#000000",
                      fontSize: "19px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? "#EE3524" : "white",
                      color: state.isSelected ? "white" : "black",
                      fontSize: "19px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f3f3f3",
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </motion.div>
            ))}
            <motion.button
              variants={moveLeft(0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-accent px-6 py-3 rounded-3xl uppercase w-full md:w-auto"
            >
              Apply filter
            </motion.button>
          </div>
        </div>
        <div className="relative">
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10 border-t border-smgray relative"
            ref={sectionRef}
          >
            <div
              className="border-r border-smgray pr-6 xl:pr-[67px] pt-6 xl:pt-[67px] max-h-[842px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden left-col"
              ref={leftRef}
            >
              {data.jobs.map((job, index) => (
                <motion.div
                  variants={moveUp(index * 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={index}
                  className="pb-6 xl:pb-10 mb-6 xl:mb-10 border-b border-smgray last:border-b-0 flex md:flex-row flex-col justify-between gap-6 md:items-center"
                >
                  <div>
                    <h3 className="text-2xl leading-[1.5625] font-normal">
                      {job.title}
                    </h3>
                    <h4 className="text-lg leading-[1.5625] font-normal">
                      <span>{job.sector}</span> <span className="mx-2">|</span>{" "}
                      <span>{job.location}</span>{" "}
                      <span className="mx-2">|</span> <span>{job.type}</span>
                    </h4>
                  </div>
                  <div>
                    <BtnPrimary link="#" text="Apply Now" bgtrans={true} />
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="sticky top-0 self-start right-col"
            >
              <div className="bg-light-white dark:bg-black p-6 xl:p-10 max-w-[575px] ml-auto mt-6 xl:mt-[67px]">
                <div className="border-b border-smgray pb-27px">
                  <h3 className="text-2xl leading-[1.205882352941176] mb-4 xl:mb-6 font-normal dark:text-white">
                    Didn’t find a role that fits you?
                  </h3>
                  <p className="text-xl leading-[1.46875] font-light dark:text-white">
                    Send your resume and we’ll get in touch with you.
                  </p>
                </div>
                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="pt-27px"
                >
                  <Link
                    href="mailto:info@gcc.ae"
                    className="flex items-center gap-[10.28px] bg-black/5 p-4 xl:p-5"
                  >
                    <svg
                      width="27"
                      height="22"
                      viewBox="0 0 27 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.588 4.81999L12.228 12.46C12.9 13.132 13.992 13.132 14.664 12.46L22.324 4.79999M4.504 1H22.22C24.1552 1 25.724 2.56879 25.724 4.504V17.496C25.724 19.4312 24.1552 21 22.22 21H4.504C2.56879 21 1 19.4312 1 17.496V4.504C1 2.56879 2.56879 1 4.504 1Z"
                        stroke="#EE3524"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-lg leading-[1.526315789473684] font-normal dark:text-white">
                      Mail Your Resume to info@gcc.ae
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentOpenings;
