"use client";

import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { Project } from "@/types/Projects";
import ProjectCard from "../projects/sections/ProjectCard";

interface Props {
  projects: Project["projects"];
}

const MoreProjects = ({ projects }: Props) => {
  return (
    <section className="pt-57px pb-13 md:pb-15 xl:pt-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <div className="flex justify-between items-center pb-5 md:pb-8 xl:pb-[45px] mb-5 md:mb-8 xl:mb-15 border-b dark:border-white/20">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl xl:text-5xl leading-[1.147058823529412] text-black dark:text-white"
          >
            More Projects
          </motion.h2>
          <motion.div
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <BtnPrimary link={"/projects"} text="View All" bgtrans={true} />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {projects?.slice(0, 3).map((item, index) => (

            <ProjectCard key={index} item={item} index={index} showDescription={false} />

            // <motion.div

            //   key={index}
            //   className="group border-b dark:border-white/20 pb-27px"
            //   variants={moveUp(index * 0.24)}
            //   initial="hidden"
            //   whileInView="show"
            //   viewport={{ once: true }}
            // >
            //   <div>
            //     <Image
            //       onClick={() => router.push(`/projects/${project.slug}`)}
            //       src={project.thumbnail || ""}
            //       alt={project.thumbnailAlt || ""}
            //       width={1000}
            //       height={1000}
            //       className="object-cover w-full h-[300px] md:h-[400px] xl:h-[430px] 2xl:h-[475px] cursor-pointer"
            //     />
            //   </div>
            //   <div className="pt-5 xl:pt-[27px]">
            //     <p className="text-lg leading-lh-text19 text-[#515151] dark:text-white/80 mb-2 xl:mb-[12px]">
            //       {project.secondSection?.projectType?.name}{" "}
            //       <span className="mx-2">|</span>{" "}
            //       {project.secondSection?.sector?.name}{" "}
            //       <span className="mx-2">|</span>{" "}
            //       {project.secondSection?.location?.name}
            //     </p>
            //     <h3 className="text-2xl leading-normal text-black dark:text-white " >
            //       <Link href={`/projects/${project.slug}`} >
            //       {project.title}
            //       </Link>
            //     </h3>
            //   </div>
            // </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProjects;
