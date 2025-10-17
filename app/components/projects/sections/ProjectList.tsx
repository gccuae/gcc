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
import { fadeIn, moveLeft, moveUp } from "../../motionVarients";
import Image from "next/image";
type Option = { value: string; label: string };
import { assets } from "@/public/assets/assets";
import {
  Map,
  MapCameraChangedEvent,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

const Select = dynamic<ReactSelectProps<Option, false>>(
  () => import("react-select"),
  { ssr: false }
) as ComponentType<ReactSelectProps<Option, false>>;

export interface Project {
  projects: {
    _id: string;
    name: string;
    type: string;
    sector: string;
    location: string;
    status: string;
    image: string;
    mapUrl: string;
    latitude: string;
    longitude: string;
    title: string;
    slug: string;
    thumbnail: string;
    thumbnailAlt: string;
    secondSection: {
      sector: {
        name: string;
        _id: string;
      };
      location: {
        name: string;
        _id: string;
      };
      projectType: {
        name: string;
        _id: string;
      };
      status: string;
    };
  }[];
}

interface Sector {
  name: string;
}

interface ProjectType {
  name: string;
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
  sectors,
  projectTypes,
}: {
  projects: Project;
  sectors: Sector[];
  projectTypes: ProjectType[];
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const [activeProject, setActiveProject] = useState<string>(
    projects.projects[0]._id
  );
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    type: "Project Type",
    sector: "Sector",
    status: "Status",
  });

  const [visibleProjects, setVisibleProjects] = useState<Project["projects"]>(
    []
  );

  const filteredProjects = projects.projects.filter((project) => {
    return (
      (filters.type === "All" ||
        filters.type === "Project Type" ||
        project.secondSection.projectType.name === filters.type) &&
      (filters.sector === "All" ||
        filters.sector === "Sector" ||
        project.secondSection.sector.name === filters.sector) &&
      (filters.status === "All" ||
        filters.status === "Status" ||
        project.secondSection.status === filters.status)
    );
  });
  // Config for mapping filters
  const filterConfigs: { key: FilterKey; placeholder: string }[] = [
    { key: "type", placeholder: "Project Type" },
    { key: "sector", placeholder: "Sector" },
    { key: "status", placeholder: "Status" },
  ];

  // Get unique options for each filter
  const getOptions = (field: FilterKey): Option[] => {
    const baseOption = [{ value: "All", label: "All" }];

    switch (field) {
      case "type":
        return [
          ...baseOption,
          ...projectTypes.map((p) => ({
            value: p.name,
            label: p.name,
          })),
        ];

      case "sector":
        return [
          ...baseOption,
          ...sectors.map((s) => ({
            value: s.name,
            label: s.name,
          })),
        ];

      case "status":
        return [
          ...baseOption,
          { value: "Completed", label: "Completed" },
          { value: "Ongoing", label: "Ongoing" },
        ];

      default:
        return baseOption;
    }
  };

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

  const [highlighted, setHighlighted] = useState<string[]>([]);
  const map = useMap();

  const handleCameraChanged = (event: MapCameraChangedEvent) => {
    const { bounds } = event.detail || {};
    if (!bounds) return;

    // Filter only from already filtered projects
    const visibleProjectsInBounds = filteredProjects.filter(
      (p) =>
        parseFloat(p.latitude) >= bounds.south &&
        parseFloat(p.latitude) <= bounds.north &&
        parseFloat(p.longitude) >= bounds.west &&
        parseFloat(p.longitude) <= bounds.east
    );

    const visibleIds = visibleProjectsInBounds.map((p) => p._id);

    setVisibleProjects(visibleProjectsInBounds);
    setHighlighted(visibleIds);

    if (visibleProjectsInBounds.length > 0) {
      if (!visibleIds.includes(activeProject)) {
        setActiveProject(visibleProjectsInBounds[0]._id);
      }
    } else {
      setActiveProject("");
    }
  };

  useEffect(() => {
    if (!map || filteredProjects.length === 0) return;

    const firstProject = filteredProjects[0];
    const newCenter = {
      lat: parseFloat(firstProject.latitude),
      lng: parseFloat(firstProject.longitude),
    };

    const currentCenter = map.getCenter();
    if (
      !currentCenter ||
      currentCenter.lat() !== newCenter.lat ||
      currentCenter.lng() !== newCenter.lng
    ) {
      // Smooth pan (Google handles the animation)
      map.panTo(newCenter);
    }

    // Only reset zoom if it’s not already correct
    if (map.getZoom() !== 11) {
      map.setZoom(11);
    }
  }, [filters]);

  const navigate = useRouter();
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
        <motion.div
          variants={moveUp(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col-reverse lg:grid lg:grid-cols-2 border-t border-smgray pr-[15px] lg:pr-0"
        >
          {/* Left Column */}
          <div className="lg:border-r border-smgray max-md:z-20 relative bg-light-white">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-37px 2xl:gap-47px my-37px 2xl:my-47px lg:pr-37px w-full">
              {filterConfigs.map(({ key, placeholder }, index) => (
                <motion.div
                  key={key}
                  variants={moveUp(index * 0.15)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="xl:w-[220px] h-[40px]"
                >
                  <Select
                    components={{ DropdownIndicator }}
                    className="w-full h-full"
                    classNamePrefix="react-select"
                    options={getOptions(key)}
                    placeholder={placeholder}
                    value={
                      filters[key] === placeholder
                        ? null
                        : { value: filters[key], label: filters[key] }
                    }
                    onChange={async (option) => {
                      setFilters({
                        ...filters,
                        [key]: option?.value ?? placeholder,
                      });
                    }}
                    styles={selectStyles}
                  />
                </motion.div>
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-37px 2xl:space-y-47px relative bg-light-white">
              {visibleProjects.length > 0 ? (
                visibleProjects?.map((project, index) => (
                  <motion.div
                    onClick={() => navigate.push(`/projects/${project.slug}`)}
                    key={project._id}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="cursor-pointer relative group"
                    onMouseEnter={() => {
                      // Hover only on desktop (lg and above)
                      if (window.innerWidth >= 1024)
                        setActiveProject(project._id);
                    }}
                  >
                    <div className="relative lg:pr-[47px]">
                      <div className="relative">
                        <Image
                          src={project.thumbnail}
                          alt={project.thumbnailAlt}
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
                      {/* <button
                      className="absolute top-2 right-2 lg:hidden bg-white text-black px-1 py-1"
                      onClick={() =>
                        setMobileMapOpen(
                          mobileMapOpen === project._id ? null : project._id
                        )
                      }
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                    </button> */}
                    </div>

                    {/* Project Info */}
                    <motion.div
                      variants={moveLeft(index * 0.15)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="mt-[17px] gap-x-5 gap-y-2 font-light text-lg leading-1h-text19 flex flex-wrap text-para-color dark:text-white/70"
                    >
                      <span>{project.secondSection.projectType.name}</span>|
                      <span>{project.secondSection.sector.name}</span>|
                      <span>{project.secondSection.location.name}</span>|
                      <span>{project.secondSection.status}</span>
                    </motion.div>

                    {/* Mobile Map */}
                    {/* <motion.div
                    variants={moveUp(0.15)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="block lg:hidden mt-4"
                  >
                    {mobileMapOpen === project._id && (
                      <iframe
                        src={project.mapUrl}
                        width="100%"
                        height={300}
                        loading="lazy"
                        className="border-0"
                      />
                    )}
                  </motion.div> */}

                    <motion.h3
                      variants={moveUp(0.15)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-2xl leading-1h-text32 text-primary mt-[17px] pb-[15px] border-b border-smgray lg:mr-[47px]"
                    >
                      {project.title}
                    </motion.h3>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={fadeIn()}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mb-10 lg:mb-0"
                >
                  <motion.p
                    variants={moveUp(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-2xl"
                  >
                    No results in this area
                  </motion.p>
                  <motion.p
                    variants={moveUp(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    Try zooming out, moving the map, or changing your filters.
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column Map for Desktop */}
          <motion.div
            variants={moveLeft(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" lg:block lg:pl-37px 2xl:pl-47px pt-37px 2xl:pt-47px 
            sticky top-[60px] h-[calc(100vh-70px)] max-md:h-[300px] z-10"
          >
            {/* <iframe
              src={activeProject.mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            ></iframe> */}
            <Map
              defaultCenter={{
                lat: parseFloat(projects.projects[0].latitude),
                lng: parseFloat(projects.projects[0].longitude),
              }}
              defaultZoom={15}
              mapId="2567b86b459988d06657407f"
              className="w-full h-full"
              gestureHandling="greedy"
              onCameraChanged={handleCameraChanged}
              disableDefaultUI={true}
            >
              {projects?.projects?.map((project) => {
                // Only show markers that are either hovered or inside bounds
                const isHovered = activeProject === project._id;
                const isHighlighted = highlighted.includes(project._id);

                console.log(isHovered);

                if (!isHovered && !isHighlighted) return null; // Don't render

                return (
                  <Marker
                    key={project._id}
                    position={{
                      lat: parseFloat(project.latitude),
                      lng: parseFloat(project.longitude),
                    }}
                    title={project.title}
                    icon={{
                      url: isHovered
                        ? "/active-icon.svg" // Hovered project
                        : "/inactive-icon.svg", // Project in bounds
                    }}
                    onClick={() => {
                      // Move clicked project to the start of visibleProjects
                      setVisibleProjects((prev) => {
                        const newArr = prev.filter(
                          (p) => p._id !== project._id
                        ); // remove clicked project
                        return [project, ...newArr]; // add it to the start
                      });

                      setActiveProject(project._id); // set as active
                      window.scrollTo({ top: 700, behavior: "smooth" }); // scroll to top
                    }}
                  />
                );
              })}
            </Map>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
