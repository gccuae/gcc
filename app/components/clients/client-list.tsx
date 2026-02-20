"use client";

import { ClientsFirstSection } from "./type";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const ClientList = ({ data }: { data: ClientsFirstSection }) => {
  return (
    <section className="py-57px">
      <div className="container">
        <div className="mb-57px">
          <motion.p
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl leading-[1.608695652173913] text-para-color dark:text-white/80"
          >
            {data.description}
          </motion.p>
        </div>
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t dark:border-white/20"
        >
          {data.items.map((client, index) => (
            <div key={index} className="p-4 xl:p-6 flex items-center justify-center border-r border-b dark:border-white/20 group h-30 xl:h-[380px] " >
              <motion.div variants={moveUp(index * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} className="dark:bg-white dark:h-full dark:rounded-2xl dark:w-full" >
                <Image
                  src={client.logo}
                  alt={client.logoAlt}
                  width={300}
                  height={300}
                  className="max-w-full h-full object-contain group-hover:scale-110 transition-all duration-300 dark:mix-blend-multiply"
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
