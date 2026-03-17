"use client";

import { ClientsFirstSection } from "./type";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const ClientList = ({ data }: { data: ClientsFirstSection }) => {
  return (
    <section className="pt-57px pb-13 md:pb-15 xl:py-57px">
      <div className="container">
        <div className="mb-4 md:mb-57px">
          <motion.p variants={moveUp()} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="xl:text-xl leading-[1.608695652173913] text-para-color dark:text-white/80" >
            {data.description}
          </motion.p>
        </div>
        <motion.div variants={moveUp()} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t dark:border-white/20" >
          {data.items.map((client, index) => (
            <div key={index} className="p-4 xl:p-6 flex items-stretch justify-center border-r border-b dark:border-white/20 group h-auto xl:min-h-[280px] " >
              <motion.div variants={moveUp(index * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
               className="w-full overflow-hidden flex items-center justify-center md:py-6 xl:py-8 dark:h-full dark:bg-white dark:rounded-2xl dark:px-6 dark:py-6 2xl:dark:px-8 2xl:dark:py-8" >
                <Image src={client.logo} alt={client.logoAlt} width={300} height={300}
                  className="max-w-[82%] max-h-[82%] mx-auto h-auto object-contain group-hover:scale-105 transition-all duration-300 dark:mix-blend-multiply"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientList;
