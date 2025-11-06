"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { SecondSectionSecondSection } from "../expertise/type";

interface ScopsProps {
  data: SecondSectionSecondSection;
}

const Scops = ({ data }: ScopsProps) => {
  return (
    <section className="py-57px bg-black">
      <div className="container">
        <div className="mb-57px">
          <motion.h2
            variants={moveUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl leading-lh-text68 font-normal text-white"
          >
            {data.title}
          </motion.h2>
        </div>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={40}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        modules={[Autoplay]}
        breakpoints={{
          425: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1280: {
            slidesPerView: 4.5,
          },
        }}
        className="scope-swiper w-full"
      >
        {data.items.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={moveUp(index * 0.02)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="px-[15px] md:px-0 border-b border-sm-gray hover:border-primary transition-colors duration-300 flex flex-col h-full justify-between"
            >
              {/* Top: Image */}
              <div className="2xl:h-[380px] 2xl:h-[380px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom: Title */}
              <div className="mt-4 xl:mt-[27px] h-[75px]">
                <h3 className="text-[21px] leading-normal text-white">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Scops;
