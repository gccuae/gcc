"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { moveUp, moveLeft } from "../motionVarients";
import Select from "react-select";
import { OurTeamProps } from "./type";

const StaffList = ({ data }: OurTeamProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories from staff data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(data.categories.map((category) => category.category))
    );
    return ["All", ...uniqueCategories];
  }, [data]);

  // Convert categories to react-select format
  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));
  // Filter staff based on active category
  const filteredStaff = useMemo(() => {
    if (activeCategory === "All") {
      return data.secondSection.items;
    }
    return data.secondSection.items.filter(
      (category) => category.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section className="bg-black py-57px">
      <div className="container">
        <motion.h2
          variants={moveUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl leading-[1.205882352941176] text-white mb-6 lg:mb-14"
        >
          {data.secondSection.title}
        </motion.h2>

        {/* DESKTOP TABS */}
        <div className="hidden xl:block mb-12 w-full">
          <div className="flex flex-wrap justify-between min-w-max w-full border-t dark:border-white/20">
            {categories.map((category, index) => (
              <motion.button
                variants={moveLeft(index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-center py-2 text-xl font-light transition-colors duration-300 whitespace-nowrap flex-grow relative first:text-left 
                ${activeCategory === category
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  }
              `}
              >
                {category}
                <span
                  className={
                    activeCategory === category
                      ? "absolute top-[-6px] left-0 w-full h-[6px] bg-accent"
                      : "w-0"
                  }
                ></span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="xl:hidden mb-8">
          <Select
            instanceId="staff-category-select"
            options={categoryOptions}
            value={categoryOptions.find((opt) => opt.value === activeCategory)}
            onChange={(selected) => setActiveCategory(selected?.value || "All")}
            className="text-black "
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000",
                borderColor: "#555",
                color: "#fff",
                padding: "4px",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#7AC142" : "#111",
                color: "#fff",
              }),
            }}
          />
        </div>

        {/* MOBILE GRID */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-y-8">
          {filteredStaff.map((category, index) => (
            <motion.div
              // key={`${category.category}-${activeCategory}`}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className={`${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"
                  } group-hover:bg-gray-100 transition-all duration-300 flex flex-col mb-6 overflow-hidden relative`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={1000}
                  height={1000}
                  className="w-full h-[280px] object-contain mx-auto grayscale-100 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-2xl text-white/80">{category.name}</h3>
              <p className="text-lg text-white/70">{category.designation}</p>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden xl:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 xl:gap-y-14">
          {filteredStaff.map((category, index) => (
            <motion.div
              // key={`${category.category}-${activeCategory}`}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className={`${index % 2 === 0 ? "bg-[#ebebeb]" : "bg-[#dfdfdf]"
                  } group-hover:bg-gray-100 transition-all duration-300 flex flex-col mb-6   overflow-hidden relative`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={1000}
                  height={1000}
                  className="w-full h-[300px] xl:h-[398px] object-contain mx-auto grayscale-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-2xl text-white/80">{category.name}</h3>
              <p className="text-lg text-white/70">{category.designation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffList;
