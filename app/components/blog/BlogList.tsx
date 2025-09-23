"use client";

import { blogData } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { BlogItem } from "./BlogItem";
import { moveUp, moveLeft } from "../motionVarients";

const BlogList = () => {
  const { items } = blogData;

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...unique];
  }, [items]);

  const [activeTab, setActiveTab] = useState(0);

  // Filter blogs based on selected category
  const filteredItems =
    activeTab === 0
      ? items
      : items.filter((item) => item.category === categories[activeTab]);

  return (
    <section className="py-57px bg-light-white dark:bg-dark-black">
      <div className="container">
        {/* ----------- Desktop Tabs ----------- */}
        <div className="hidden md:flex relative border-t border-gray-200 space-x-8 xl:space-x-20 overflow-x-auto">
          {categories.map((cat, idx) => (
            <motion.button
              variants={moveLeft(idx * 0.2)}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              key={cat}
              onClick={() => setActiveTab(idx)}
              className={`py-4 xl:py-[27px] text-md lg:text-xl leading-normal font-medium relative ${
                activeTab === idx
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {cat}
              {activeTab === idx && (
                <motion.div
                  layoutId="underline"
                  className="absolute top-[-2px] left-0 right-0 h-[4px] bg-green-600"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* ----------- Mobile Accordion Tabs ----------- */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="md:hidden border-t border-gray-200 divide-y divide-gray-200"
        >
          {categories.map((cat, idx) => (
            <div key={cat} className="w-full">
              <button
                onClick={
                  () => setActiveTab(activeTab === idx ? -1 : idx) // toggle open/close
                }
                className="w-full flex justify-between items-center py-4 text-lg font-medium"
              >
                <span
                  className={`${
                    activeTab === idx ? "text-black" : "text-gray-500"
                  }`}
                >
                  {cat}
                </span>
                <span>{activeTab === idx ? "−" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {activeTab === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-1 gap-5">
                      {filteredItems.map((item, i) => (
                        <motion.div
                          key={`${item.id || item.title}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          <BlogItem
                            item={item}
                            key={`${item.id || item.title}-${i}`}
                            index={i}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* ----------- Desktop Content ----------- */}
        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-30px items-start"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={`${item.id || item.title}-${i}`}
              variants={moveUp(i * 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <BlogItem
                item={item}
                key={`${item.id || item.title}-${i}`}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;
