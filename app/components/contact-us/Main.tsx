"use client";

import { moveUp } from "../motionVarients";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <section className="pb-57px dark:bg-black">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-[387px_auto] gap-6 xl:gap-12">
          <div className="">
            <motion.h3
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl leading-[1.5625] text-black dark:text-white"
            >
              Message Us
            </motion.h3>
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-[1.5625] text-foreground dark:text-white/70"
            >
              Fill out the form to send us a message.
            </motion.p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
