"use client";

import ProjectCard from "./ProjectCard";
import { useRef, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import { Listbox } from "@headlessui/react";
import { ProjectsPageData } from "../type";
import { projectStatus } from "@/app/components/AdminProjects/projectStatus";

interface Sector {
  _id: string;
  name: string;
}

interface ProjectType {
  _id: string;
  name: string;
}

interface Location {
  _id: string;
  name: string;
}

const ProjectsList = ({
  data,
  sectorsData,
  projectTypesData,
  locationsData,
}: {
  data: ProjectsPageData;
  sectorsData: Sector[];
  projectTypesData: ProjectType[];
  locationsData: Location[];
}) => {
  const [visibleCount, setVisibleCount] = useState(9);

  // Filters that are actively applied to the list
  const [filters, setFilters] = useState({
    projectType: "All",
    sector: "All",
    location: "All",
    status: "All",
    search: "",
  });

  // Temporary selections before clicking Apply
  const [pendingFilters, setPendingFilters] = useState({
    projectType: "All",
    sector: "All",
    location: "All",
    status: "All",
    search: "",
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 9);
  const handleShowLess = () => {
    setVisibleCount(9);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ When Apply Filter clicked
  const handleApplyFilters = () => {
    setFilters(pendingFilters);
  };

  // ✅ Filter logic applies only when "Apply" is clicked
  const filteredProjects = data.projects.filter((project) => {
    const matchesSearch =
      filters.search.trim() === "" ||
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.thumbDescription
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesType =
      filters.projectType === "All" ||
      project.secondSection.projectType.name === filters.projectType;

    const matchesSector =
      filters.sector === "All" ||
      project.secondSection.sector.name === filters.sector;

    const matchesLocation =
      filters.location === "All" ||
      project.secondSection.location._id === filters.location;

    const matchesStatus =
      filters.status === "All" ||
      project.secondSection.status === filters.status;

    return (
      matchesSearch &&
      matchesType &&
      matchesSector &&
      matchesLocation &&
      matchesStatus
    );
  });
  return (
    <section className="dark:bg-light-dark" ref={sectionRef}>
      {/* ===================== Filter Bar ===================== */}
      <div className="border-b border-gray-300 mb-57px">
        <div className="container">
          <div className="grid grid-cols-1 2xl:grid-cols-[1fr_repeat(4,1fr)_auto] xl:grid-cols-[2fr_repeat(4,1fr)_auto] items-center gap-4 xl:gap-[30px]">
            {/* Search Input */}
            <div className="flex items-center justify-start gap-5 xl:border-r border-gray-300 h-full py-[20px] xl:py-47px 2xl:w-[303px]">
              <Image
                src={"/assets/img/projects/searchIcon.svg"}
                alt="search"
                width={32}
                height={32}
              />
              <input
                type="text"
                placeholder="FIND A PROJECT"
                value={pendingFilters.search}
                onChange={(e) =>
                  setPendingFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="w-full bg-transparent outline-none text-para-color placeholder-para-color uppercase tracking-wide"
              />
            </div>

            {/* Project Type */}
            <Listbox
              value={pendingFilters.projectType}
              onChange={(value) =>
                setPendingFilters((prev) => ({ ...prev, projectType: value }))
              }
            >
              <div className="relative">
                <Listbox.Button className="flex w-full items-center justify-between border-b border-sm-gray pb-1 font-light text-para-color text-lg capitalize min-w-[140px] 2xl:max-w-[220px]">
                  <span>
                    {pendingFilters.projectType === "All"
                      ? "Project Type"
                      : pendingFilters.projectType}
                  </span>

                  <Image
                    src={"/assets/img/projects/downArrow.svg"}
                    alt="arrowDown"
                    width={8}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white border border-sm-gray rounded-md z-50">
                  {["All", ...projectTypesData.map((pt) => pt.name)].map(
                    (option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `cursor-pointer select-none px-3 py-2 text-sm ${
                            active
                              ? "bg-green-100 text-green-700"
                              : "text-gray-700"
                          }`
                        }
                      >
                        {option}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* Sector */}
            <Listbox
              value={pendingFilters.sector}
              onChange={(value) =>
                setPendingFilters((prev) => ({ ...prev, sector: value }))
              }
            >
              <div className="relative">
                <Listbox.Button className="flex w-full items-center justify-between border-b border-sm-gray pb-1 text-para-color text-lg font-light capitalize min-w-[140px] 2xl:max-w-[220px]">
                  <span>
                    {pendingFilters.sector === "All"
                      ? "Sector"
                      : pendingFilters.sector}
                  </span>
                  <Image
                    src={"/assets/img/projects/downArrow.svg"}
                    alt="arrowDown"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white border border-sm-gray rounded-md z-50">
                  {["All", ...sectorsData.map((s) => s.name)].map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `cursor-pointer select-none px-3 py-2 text-sm ${
                          active
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700"
                        }`
                      }
                    >
                      {option}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* Location */}
            <Listbox
              value={pendingFilters.location}
              onChange={(value) =>
                setPendingFilters((prev) => ({ ...prev, location: value }))
              }
            >
              <div className="relative">
                <Listbox.Button className="flex w-full items-center justify-between border-b border-sm-gray pb-1 text-para-color text-lg font-light capitalize min-w-[140px] 2xl:max-w-[220px]">
                  <span>
                    {pendingFilters.location === "All"
                      ? "Location"
                      : locationsData.find(
                          (loc) => loc._id === pendingFilters.location
                        )?.name || "Location"}
                  </span>
                  <Image
                    src="/assets/img/projects/downArrow.svg"
                    alt="arrowDown"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 w-full bg-white border border-sm-gray rounded-md z-50">
                  {/* All */}
                  <Listbox.Option
                    key="All"
                    value="All"
                    className={({ active }) =>
                      `cursor-pointer select-none px-3 py-2 text-sm ${
                        active ? "bg-green-100 text-green-700" : "text-gray-700"
                      }`
                    }
                  >
                    All
                  </Listbox.Option>

                  {/* Real locations */}
                  {locationsData.map((option) => (
                    <Listbox.Option
                      key={option._id}
                      value={option._id} // <-- IMPORTANT
                      className={({ active }) =>
                        `cursor-pointer select-none px-3 py-2 text-sm ${
                          active
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700"
                        }`
                      }
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            {/* Status */}
            <Listbox
              value={pendingFilters.status}
              onChange={(value) =>
                setPendingFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <div className="relative">
                <Listbox.Button className="flex w-full items-center justify-between border-b border-sm-gray pb-1 text-para-color text-lg font-light capitalize min-w-[140px] 2xl:max-w-[220px]">
                  <span>
                    {pendingFilters.status === "All"
                      ? "Status"
                      : pendingFilters.status}
                  </span>
                  <Image
                    src={"/assets/img/projects/downArrow.svg"}
                    alt="arrowDown"
                    width={15}
                    height={15}
                    className="w-[15px] h-[15px]"
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white border border-sm-gray rounded-md z-50">
                  {projectStatus.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `cursor-pointer select-none px-3 py-2 text-sm ${
                          active
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700"
                        }`
                      }
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            {/* Apply Filter Button */}
            <button
              className="bg-[#7AC142] hover:bg-[#5cb43d] text-white px-6 py-[11px] rounded-[25px] font-semibold uppercase text-base leading-[1] transition-colors"
              onClick={handleApplyFilters}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* ===================== Projects Grid ===================== */}
      <div className="container">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
            {filteredProjects.slice(0, visibleCount).map((item, index) => (
              <motion.div
                variants={moveUp(index * 0.17)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={index}
              >
                <ProjectCard item={item} index={index} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More / Show Less */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          {visibleCount < filteredProjects.length ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
            >
              <span>Load More</span>
              <Image
                src={assets.singleGreenArrow}
                alt="arrow"
                width={20}
                height={20}
                className="inline rotate-90"
              />
            </button>
          ) : filteredProjects.length > 9 ? (
            <button
              onClick={handleShowLess}
              className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
            >
              <span>Show Less</span>
              <Image
                src={assets.singleGreenArrow}
                alt="arrow"
                width={20}
                height={20}
                className="inline -rotate-90"
              />
            </button>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsList;
