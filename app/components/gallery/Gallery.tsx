"use client";

import React, { useRef, useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import GalleryModal from "./GalleryModal";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { GalleryType } from "./type";


const GalleryCard: React.FC<{
  item: GalleryType['items'][number];
  onOpenModal: (item: GalleryType['items'][number]) => void;
}> = ({ item, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCircularImages = () => {
    const maxCircles = 3;
    const displayImages = item.images.slice(0, maxCircles);

    return displayImages.map((image, index) => {
      const isLast = index === maxCircles - 1;
      const hasMoreThan9 = item.images.length > 9;

      return (
        <div key={index} className="relative flex last:-ml-2">
          <div
            className={`w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full overflow-hidden border-1 border-white shadow-sm ${
              index % 2 === 0 ? "" : "-ml-2"
            }`}
          >
            <Image
              width={50}
              height={50}
              src={image.image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          {isLast && hasMoreThan9 && (
            <div className="absolute inset-0 bg-black/38 rounded-full flex items-center justify-center">
              <span className="text-white text-xs xl:text-sm font-semibold">
                09+
              </span>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="overflow-hidden transition-transform group border-b border-smgray hover:border-primary transition-colors duration-300">
      {/* Header Image */}
      <div
        className="relative h-48 xl:h-[475px] overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpenModal(item)}
      >
        <Image
          width={1920}
          height={1280}
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          className="w-full h-full object-cover group-hover:blur-[2px] transition-transform"
        />

        {/* Hover Icon */}
        <div className="absolute inset-0 bg-white/12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 xl:w-20 xl:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Image
              src={assets.expandPlusIcon}
              alt="Expand"
              width={30}
              height={30}
              className={`w-full h-full xl:w-[29.99px] xl:h-[29.99px] object-contain transition-transform duration-300 ${
                isHovered ? "scale-110" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex items-center justify-between py-5 xl:py-8">
        <h3 className="text-xl lg:text-2xl leading-[1] font-normal text-black dark:text-white">
          {item.item}
        </h3>

        {/* Circular Images */}
        <div className="flex">{getCircularImages()}</div>
      </div>
    </div>
  );
};

const Gallery: React.FC<{data: GalleryType}> = ({data}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryType['items'][number] | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const sectionRef = useRef<HTMLElement | null>(null);

  const totalAlbum = data.items.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => (prev ? prev + 3 : 8));
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => (prev ? prev - 3 : 6));
    if (sectionRef.current) {
      const elementTop = sectionRef.current.offsetTop;
      const offsetPosition = elementTop - 200;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-screen pb-57px" ref={sectionRef}>
      <div className="container">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30px gap-y-47px">
          {data.items.slice(0, visibleCount + 1).map((item, index) => (
            <motion.div
              key={index}
              variants={moveUp(index * 0.13)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <GalleryCard
                key={index}
                item={item}
                onOpenModal={setSelectedItem}
              />
            </motion.div>
          ))}
        </div>

        {/* Load More / Show Less */}
        <motion.div
          variants={moveUp(0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          {visibleCount < totalAlbum ? (
            <button
              onClick={handleLoadMore}
              className="group px-6 py-2 bg-light-white hover:bg-primary text-black group-hover:text-white rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
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
          ) : totalAlbum > 6 ? (
            <button
              onClick={handleShowLess}
              className="group px-6 py-2 bg-light-white hover:bg-primary text-black hover:text-white rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition"
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

      {/* Modal */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

export default Gallery;
