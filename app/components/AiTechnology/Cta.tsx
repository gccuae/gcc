"use client";
import { motion } from "framer-motion";
import BtnPrimary from "../common/BtnPrimary";
import { moveUp } from "../motionVarients";
import { AiTechnologyType } from "./type";

const Cta = ({ data }: { data: AiTechnologyType["thirdSection"] }) => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-xl lg:text-2xl xl:text-5xl leading-[1.147058823529412] text-black dark:text-white mb-6 xl:mb-9 xl:tracking-[-3px] capitalize"
        >
          {/* Primary colour text */}
          <span className="text-primary">{data.primaryColourText}</span>{" "}
          {/* Split title into only two parts */}
          {(() => {
            const [firstLine, ...rest] = data.title.split("\n", 3);
            return (
              <>
                <span className="text-nowrap">{firstLine}{" "}</span>
                {rest.length > 0 && (
                  <span className="block">{rest.join(" ")}</span>
                )}
              </>
            );
          })()}
        </motion.h2>

        <motion.div
          variants={moveUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-between items-center pb-0 "
        >
          <BtnPrimary link={`/contact-us`} text={data.buttonText} bgtrans={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
