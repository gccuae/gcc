"use client";
import { blogData } from "./data";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { BlogItem } from "./BlogItem";

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
    <section className="py-57px bg-light-white">
      <div className="container">
        {/* Tab buttons */}
        <div className="relative border-t border-gray-200 flex space-x-8 xl:space-x-20 overflow-x-auto">
          {categories.map((cat, idx) => (
            <button key={cat} onClick={() => setActiveTab(idx)}
              className={`py-4 xl:py-[27px] text-xl leading-normal font-medium relative ${activeTab === idx
                ? "text-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              {cat}
              {activeTab === idx && (
                <motion.div layoutId="underline" className="absolute top-[-2px] left-0 right-0 h-[4px] bg-green-600" transition={{ type: "spring", duration: 0.5 }} />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {/* <div> */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-30px items-start"
        >
          {filteredItems.map((item, i) => (
            // <div>
           <motion.div
              key={`${item.id || item.title}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <BlogItem item={item} key={`${item.id || item.title}-${i}`} index={i} />
            </motion.div>
            // </div>
          ))}
        </motion.div>
        {/* </div> */}
      </div>
    </section>
  );
};

export default BlogList;