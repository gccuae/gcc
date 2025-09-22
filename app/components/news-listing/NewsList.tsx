"use client";
import NewsCard from "./NewsCard";
import { newsData } from "./data";
import { useRef, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const NewsList = () => {
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially

  const sectionRef = useRef<HTMLElement | null>(null);

  // sort news by date (latest first)
  const sortedNews = [...newsData.items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalNews = sortedNews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6); // reset back to first 6
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: sectionRef.current?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-57px" ref={sectionRef}>
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl font-normal text-black dark:text-white mb-27px"
        >
          More News
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {/* skip the latest (index 0), then show visibleCount */}
          {sortedNews.slice(1, visibleCount + 1).map((item, index) => (
            <motion.div
              variants={moveUp(index * 0.17)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={item.id}
            >
              <NewsCard item={item} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          {visibleCount < totalNews ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
            >
              <span>Load More</span>
              <Image
                src={assets.singleGreenArrow}
                alt="arrow"
                width={20}
                height={20}
                className="inline rotate-90"
              />
            </button>
          ) : totalNews > 6 ? (
            <button
              onClick={handleShowLess}
              className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
            >
              <span>Show Less</span>
              <Image
                src={assets.singleGreenArrow}
                alt="arrow"
                width={20}
                height={20}
                className="inline -rotate-90"
              />
            </button>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsList;
