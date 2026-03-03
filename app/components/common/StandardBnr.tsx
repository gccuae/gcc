// "use client";

// import { moveUp } from "../motionVarients";
// import Breadcrumb from "./BreadCrumb";
// import { motion } from "framer-motion";

// interface Props {
//   title: string;
// }
// const StandardBnr = ({ title }: Props) => {
//   return (
//     <motion.div
//       variants={moveUp()}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true }}
//       className="border-b dark:border-white/20 pb-5 xl:pb-10 mb-8 xl:mb-57px"
//     >
//       <motion.h2
//         initial={{ opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" }}
//         animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
//         transition={{ duration: 1.3, ease: "easeOut" }}
//         className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white"
//       >
//         {title}
//       </motion.h2>
//       <Breadcrumb standard={true} />
//     </motion.div>
//   );
// };
// export default StandardBnr;

"use client";

import { useEffect, useRef } from "react";
import BreadcrumbStd from "./BreadCrumbStd";
import gsap from "gsap";

interface Props {
  title: string;
}

const StandardBnr = ({ title }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // container animation (same as moveUp() + fade)
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // title animation (matches your Framer version)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border-b dark:border-white/20 pb-5 xl:pb-10 mb-8 xl:mb-57px"
    >
      <h2
        ref={titleRef}
        className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white"
      >
        {title}
      </h2>
      <BreadcrumbStd standard={true} />
    </div>
  );
};

export default StandardBnr;
