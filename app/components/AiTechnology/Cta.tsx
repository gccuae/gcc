'use client' 
import { motion } from "framer-motion";
import BtnPrimary from "../common/BtnPrimary"; 
import { moveUp } from "../motionVarients";
const Cta = () => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
         <motion.h2 variants={moveUp(0.2)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
         className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-6 xl:mb-9 tracking-[-1.9px]"><span className="text-primary">
          Let’s Build Smarter</span> Together For<br></br>
         Efficient, Precise, and Future‑Ready Infrastructures</motion.h2> 
         <motion.div variants={moveUp(0.3)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               className="flex justify-between items-center pb-0 ">
           <BtnPrimary link={`#`} text="Contact Us Today" bgtrans={true} />
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;