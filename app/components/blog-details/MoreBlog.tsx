"use client";

import BtnPrimary from "../common/BtnPrimary";
import { BlogItem } from "../blog/BlogItem";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { BlogData } from "../blog/type";

const MoreBlog = ({ category, items }: { category: string, items: BlogData }) => {
  // filter blogs by category

  const allItems = items.categories.flatMap((item: { blogs: BlogData['categories'][number]['blogs'] }) => item.blogs);
  const filtered = allItems
    .filter((item) => item.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4); // latest 4
  return (
    <section className="py-57px bg-light-white dark:bg-light-dark">
      <div className="container">
        <motion.div
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          className="flex justify-between items-center pb-5 md:pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray"
        >
          <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white">
            More Blog
          </h2>
          <BtnPrimary link={`/blog`} text="View All" bgtrans={true} />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 items-start">
          {filtered.map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.12)}
              initial="hidden"
              whileInView="show"
              key={index}
            >
              <BlogItem key={item.slug} item={item} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreBlog;
