"use client";

import dynamic from "next/dynamic";
import BtnPrimary from "../common/BtnPrimary";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveLeft, moveUp } from "../motionVarients";
import { components, DropdownIndicatorProps } from "react-select";
import { ChevronDown } from "lucide-react";
import { careerData } from "./type";

const Select = dynamic(() => import("react-select"), { ssr: false });

const isDarkMode = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

type FilterState = {
  jobType: string;
  department: string;
  location: string;
};

type SelectOption = {
  value: string;
  label: string;
};

const CurrentOpenings = ({ data, jobs, departments, locations }: { data: careerData['secondSection'], jobs: careerData['openings'], departments: careerData['departments'], locations: careerData['locations'] }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const lastTouchY = useRef<number | null>(null);
  const defaultFilters: FilterState = {
    jobType: "All Jobs",
    department: "All Departments",
    location: "All Locations",
  };
  const [pendingFilters, setPendingFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);

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
    "All Jobs",
    "Full Time",
    "Part Time"
  ];

  const jobDepartments = [
    "All Departments",
    ...new Set(departments.map((department: { name: string; }) => department.name)),
  ];

  const jobLocations = [
    "All Locations",
    ...new Set(locations.map((location: { name: string; }) => location.name)),
  ];

  const dropdowns = [jobTitles, jobDepartments, jobLocations];

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={22} className="select-down-arrow" />
      </components.DropdownIndicator>
    );
  };

  const toOption = (value: string): SelectOption => ({ value, label: value });
  const normalize = (value: string) => value.trim().toLowerCase();
  const isAllOrPlaceholder = (value: string, allValue: string, placeholderValue: string) =>
    value === allValue || value === placeholderValue;

  const filteredJobs = jobs.filter((job) => {
    const jobType = normalize(job.firstSection.employmentType);
    const department = normalize(job.firstSection.department);
    const location = normalize(job.firstSection.location);

    if (
      !isAllOrPlaceholder(appliedFilters.jobType, "All Jobs", "Job Title") &&
      normalize(appliedFilters.jobType) !== jobType
    ) {
      return false;
    }
    if (
      !isAllOrPlaceholder(appliedFilters.department, "All Departments", "Department") &&
      normalize(appliedFilters.department) !== department
    ) {
      return false;
    }
    if (
      !isAllOrPlaceholder(appliedFilters.location, "All Locations", "Location") &&
      normalize(appliedFilters.location) !== location
    ) {
      return false;
    }

    return true;
  });

  const isFilterApplied = (value: string, allValue: string, placeholderValue: string) =>
    !isAllOrPlaceholder(value, allValue, placeholderValue);

  const hasActiveFilters =
    isFilterApplied(pendingFilters.jobType, "All Jobs", "Job Title") ||
    isFilterApplied(pendingFilters.department, "All Departments", "Department") ||
    isFilterApplied(pendingFilters.location, "All Locations", "Location") ||
    isFilterApplied(appliedFilters.jobType, "All Jobs", "Job Title") ||
    isFilterApplied(appliedFilters.department, "All Departments", "Department") ||
    isFilterApplied(appliedFilters.location, "All Locations", "Location");

  const handleClearFilters = () => {
    setPendingFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  return (
    <section className="pt-37px md:pb-57px md:pt-47px xl:pt-57px dark:bg-light-dark overflow-hidden">
      <div className="container">
        <div className="lg:mb-6 xl:mb-27px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white mb-3 md:mb-4 xl:mb-[17px]"
          >
            {data.mainTitle}
          </motion.h2>
          <motion.p
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="xl:text-xl 2xl:text-2xl leading-lh-text32 text-para-color dark:text-white"
          >
            {data.subTitle}
          </motion.p>
        </div>
        <div className="pt-6 xl:pt-10 pb-6 xl:pb-47px">
          <div className="flex flex-col gap-6 xl:flex-row md:gap-6 xl:gap-10 w-full xl:w-fit">
            {dropdowns.map((options, idx) => (
              <motion.div key={idx} variants={moveLeft(idx * 0.25)} initial="hidden" whileInView="show" viewport={{ once: true }} >
                <Select
                  components={{ DropdownIndicator }}
                  className="xl:w-[280px] current-openings-select"
                  key={idx}
                  classNamePrefix="react-select"
                  options={options.map((label) => ({ value: label, label }))}
                  placeholder={options[0]}
                  value={
                    idx === 0
                      ? toOption(pendingFilters.jobType)
                      : idx === 1
                        ? toOption(pendingFilters.department)
                        : toOption(pendingFilters.location)
                  }
                  onChange={(selected) => {
                    const value = (selected as SelectOption | null)?.value;
                    if (!value) return;
                    setPendingFilters((prev) => {
                      if (idx === 0) return { ...prev, jobType: value };
                      if (idx === 1) return { ...prev, department: value };
                      return { ...prev, location: value };
                    });
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      border: "none",
                      backgroundColor: "transparent",
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
                      color: isDarkMode() ? "#fff" : "#000",
                      fontSize: "19px",
                      fontWeight: 300,
                      margin: 0,
                      padding: 0,
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#000",
                      fontWeight: 300,
                      fontSize: "19px",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#000",
                      fontWeight: 300,
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
              className="bg-accent px-6 py-3 rounded-3xl uppercase w-full md:w-auto cursor-pointer hover:bg-primary transition-all duration-300 text-white font-semibold"
              onClick={() => setAppliedFilters(pendingFilters)}
            >
              Apply filter
            </motion.button>
            {hasActiveFilters && (
              <motion.button
                variants={moveLeft(0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="px-6 py-3 rounded-3xl uppercase w-full md:w-auto cursor-pointer border border-priamry text-mdgray dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-light "
                onClick={handleClearFilters}
              >
                Clear filter
              </motion.button>
            )}
          </div>
        </div>
        <div className="relative">
          <motion.div
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-[55%_40%] 2xl:grid-cols-[55%_45%] justify-between gap-0 md:gap-0 xl:gap-0 border-t dark:border-white/20 relative"
            ref={sectionRef}
          >
            <div
              className="md:border-r dark:border-white/20 pr-6 xl:pr-[67px] pt-6 xl:pt-[67px] max-h-[842px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden left-col"
              ref={leftRef}
            >
              {filteredJobs.filter((item)=>item.status !== "draft").map((job, index) => (
                <motion.div
                  variants={moveUp(index * 0.15)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  key={index}
                  className="pb-6 xl:pb-10 mb-6 xl:mb-10 border-b dark:border-white/20 flex xl:flex-row flex-col justify-between gap-6 xl:items-center"
                >
                  <div className="xl:w-[60%]">
                    <h3 className="text-xl lg:text-2xl leading-[1.3] lg:leading-[1.5625] font-normal text-black dark:text-white">
                      <Link href={`careers/${job.firstSection.slug}`} >
                        {job.firstSection.jobTitle}
                      </Link>
                    </h3>
                    <h4 className="text-lg leading-[1.5625] font-normal text-para-color dark:text-white/50">
                      <span>{job.firstSection.department}</span> <span className="mx-2">|</span>{" "}
                      <span>{job.firstSection.location}</span>{" "}
                      <span className="mx-2">|</span> <span>{job.firstSection.employmentType}</span>
                    </h4>
                  </div>
                  <div className="">
                    <BtnPrimary
                      link={`careers/${job.firstSection.slug}`}
                      text="Apply Now"
                      bgtrans={true}
                    />
                  </div>
                </motion.div>
              ))}
              {filteredJobs.length === 0 && (
                <p className="text-lg leading-[1.5] text-para-color dark:text-white/60">
                  No openings found for the selected filters.
                </p>
              )}
            </div>
            <motion.div
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="sticky top-0 self-start right-col"
            >
              <div className="bg-light-white dark:bg-[#0d0d0d] p-6 xl:p-10 mb-57px   md:max-w-[575px] m-auto md:mr-0 ml-auto md:mt-6 xl:mt-[67px]">
                <div className="border-b dark:border-white/20 pb-27px">
                  <h3 className="text-xl xl:text-2xl leading-[1.205882352941176] mb-4 xl:mb-6 font-normal text-black dark:text-white">
                    Didn’t find a role that fits you?
                  </h3>
                  <p className="text-lg leading-[1.46875] font-light text-para-color dark:text-white/50">
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
                    href="mailto:careers@gcc.ae"
                    className="flex items-center gap-[10.28px] bg-black/5 p-4 xl:p-5 dark:bg-black"
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
                    <span className="text-lg leading-[1.526315789473684] font-normal text-para-color dark:text-white/50">
                      Mail Your Resume to careers@gcc.ae
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
