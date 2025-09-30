"use client";

import dynamic from "next/dynamic";
import { ComponentType, useState, useRef, useEffect } from "react";
import {
  components,
  DropdownIndicatorProps,
  Props as ReactSelectProps,
} from "react-select";
import { StylesConfig } from "react-select";
import { motion } from "framer-motion";
import { moveUp } from "../../motionVarients";
import Image from "next/image";
type Option = { value: string; label: string };
import { MapPin } from "lucide-react";
import { assets } from "@/public/assets/assets";

const Select = dynamic<ReactSelectProps<Option, false>>(
  () => import("react-select"),
  { ssr: false }
) as ComponentType<ReactSelectProps<Option, false>>;

export interface Project {
  id: number;
  name: string;
  type: string;
  sector: string;
  location: string;
  status: string;
  image: string;
  mapUrl: string;
}

// Custom dropdown indicator
const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7L10 12L15 7"
          stroke="#000000"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

type FilterKey = "type" | "sector" | "status";

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    type: "All",
    sector: "All",
    status: "All",
  });
  const [mobileMapOpen, setMobileMapOpen] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    return (
      (filters.type === "All" || project.type === filters.type) &&
      (filters.sector === "All" || project.sector === filters.sector) &&
      (filters.status === "All" || project.status === filters.status)
    );
  });

  // Config for mapping filters
  const filterConfigs: { key: FilterKey; placeholder: string }[] = [
    { key: "type", placeholder: "Project Type" },
    { key: "sector", placeholder: "Sector" },
    { key: "status", placeholder: "Status" },
  ];

  // Get unique options for each filter
  const getOptions = (field: FilterKey) => [
    "All",
    ...Array.from(new Set(projects.map((p) => p[field]))),
  ];

  // Styles for react-select
  const selectStyles: StylesConfig<Option, false> = {
    control: (base) => ({
      ...base,
      border: "none",
      backgroundColor: "transparent",
      borderBottom: "1px solid #BCBCBC",
      borderRadius: 0,
      boxShadow: "none",
      padding: "2px 0",
      "&:hover": { borderBottom: "1px solid #000" },
      transition: "all 0.3s ease-in-out",
    }),
    valueContainer: (base) => ({ ...base, padding: 0 }),
    input: (base) => ({ ...base, margin: 0, padding: 0 }),
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
      "&:hover": { backgroundColor: "#f3f3f3", color: "black" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  useEffect(() => {
    const updateOffset = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        setLeftOffset(rect.left + 15); // distance from viewport left
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <section className="pt-15 xl:pt-25px bg-light-white">
      <motion.h2
        ref={headingRef}
        variants={moveUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container text-4xl lg:text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white mb-47px"
      >
        Featured Projects
      </motion.h2>
      <div style={{ paddingLeft: `${leftOffset}px`, paddingRight: 0 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-smgray pr-[15px] lg:pr-0">
          {/* Left Column */}
          <div className="lg:border-r border-smgray">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-37px 2xl:gap-47px my-37px 2xl:my-47px lg:pr-37px w-full">
              {filterConfigs.map(({ key, placeholder }) => (
                <Select
                  key={key}
                  components={{ DropdownIndicator }}
                  className="xl:w-[220px] h-[40px]"
                  classNamePrefix="react-select"
                  options={getOptions(key).map((label) => ({
                    value: label,
                    label,
                  }))}
                  placeholder={placeholder}
                  value={{ value: filters[key], label: filters[key] }}
                  onChange={(option) =>
                    setFilters({ ...filters, [key]: option?.value || "All" })
                  }
                  styles={selectStyles}
                />
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-37px 2xl:space-y-47px">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="cursor-pointer relative group"
                  onMouseEnter={() => {
                    // Hover only on desktop (lg and above)
                    if (window.innerWidth >= 1024) setActiveProject(project);
                  }}
                >
                  <div className="relative lg:pr-[47px]">
                    <div className="relative">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={742}
                        height={475}
                        className="w-full object-cover"
                      />

                      {/* Overlay + Blur */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm backdrop-blur-[4px]"></div>

                      {/* Centered Arrow */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white rounded-full border border-accent w-12 h-12 xl:w-20 xl:h-20 flex items-center justify-center">
                          <Image
                            src={assets.linkArrowGreen}
                            alt="Arrow"
                            width={19}
                            height={19}
                            className="w-7 h-7 xl:w-[19px] xl:h-[19.05px] transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-2 translate-y-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Map Button on Mobile */}
                    <button
                      className="absolute top-2 right-2 lg:hidden bg-white text-black px-1 py-1"
                      onClick={() =>
                        setMobileMapOpen(
                          mobileMapOpen === project.id ? null : project.id
                        )
                      }
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                    </button>
                  </div>

                  {/* Project Info */}
                  <div className="mt-[17px] gap-x-5 gap-y-2 font-light text-lg leading-1h-text19 flex flex-wrap text-foreground dark:text-white/70">
                    <span>{project.type}</span>|<span>{project.sector}</span>|
                    <span>{project.location}</span>|
                    <span>{project.status}</span>
                  </div>
                  <h3 className="text-2xl leading-1h-text32 text-primary mt-[17px] pb-[15px] border-b border-smgray lg:mr-[47px]">
                    {project.name}
                  </h3>

                  {/* Mobile Map */}
                  <div className="block lg:hidden mt-4">
                    {mobileMapOpen === project.id && (
                      <iframe
                        src={project.mapUrl}
                        width="100%"
                        height={300}
                        loading="lazy"
                        className="border-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Map for Desktop */}
          <div className="hidden lg:block w-full h-[350px] lg:h-[500px] xl:h-[800px] 2xl:h-[1200px] max-h-[1200px] lg:pl-37px 2xl:pl-47px pt-37px 2xl:pt-47px">
            <iframe
              src={activeProject.mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
