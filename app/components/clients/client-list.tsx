"use client";

import { clientsData } from "./data";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const ClientList = () => {
  return (
    <section className="py-57px">
      <div className="container">
        <div className="mb-57px">
          <motion.p
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl leading-lh-text23 text-foreground dark:text-white/80"
          >
            {clientsData.desc}
          </motion.p>
        </div>
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-smgray/56"
        >
          {clientsData.clients.map((client, index) => (
            <div
              key={index}
              className="p-4 xl:p-6 flex items-center justify-center border-r border-b border-smgray/56 group h-30 xl:h-[380px] dark:bg-white"
            >
              <motion.div
              variants={moveUp(index * 0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }} >
              <Image
                src={client}
                alt={`client-${index + 1}`}
                width={300}
                height={300}
                className="max-w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
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
