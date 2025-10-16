'use client' 
import { motion } from "framer-motion";
import BtnPrimary from "../common/BtnPrimary"; 
import { moveUp } from "../motionVarients";
import { AiTechnologyType } from "./type";


const Cta = ({data}: {data: AiTechnologyType['thirdSection']}) => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
         <motion.h2
  variants={moveUp(0.2)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-6 xl:mb-9 tracking-[-1.9px]"
>
  {/* Primary colour text */}
  <span className="text-primary">{data.primaryColourText}</span>{" "}

  {/* First line of data.title stays inline */}
  {data.title.split("\n")[0]}{" "}

  {/* Rest of the lines go block (new lines) */}
  {data.title
    .split("\n")
    .slice(1)
    .map((item: string, index: number) => (
      <span key={index} className="block">{item}</span>
    ))}
</motion.h2>

         <motion.div variants={moveUp(0.3)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               className="flex justify-between items-center pb-0 ">
           <BtnPrimary link={`#`} text={data.buttonText} bgtrans={true} />
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;