'use client'
import { SliderData } from "./data";  

import { Swiper, SwiperSlide } from "swiper/react"; 
import { useState } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { moveUp } from "../motionVarients";
import { motion } from "framer-motion";

const AiSlider = () => {
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);
  const [bgImage, setBgImage] = useState(SliderData.items[0]?.image);
  const [activeImage, setActiveImage] = useState(SliderData.items[0]?.image);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
   
  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ( "ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches );
    const handleTouch = (index: number, image: string) => {
      if (!isTouchDevice()) return;  
    
      if (touchedIndex === index) {
        setTouchedIndex(null);
        setBgImage(activeImage);
      } else {
        setTouchedIndex(index);
        setBgImage(image);
      }
    };
    interface SliderItem {
      title: string;
      image: string;
      desc?: string;
      ul?: string[];
    }
  return (
    <motion.div   variants={moveUp(0.2)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}>
    <section
    className=" transition-all duration-500 h-[400px]  lg:h-[500px] xl:h-[750px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full afterbgf "
    style={{ background: `url(${bgImage}) center/cover no-repeat` }}
  >
    <div className="container relative h-full w-full  ">
      <motion.div   variants={moveUp(0.2)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
    className="border-b border-smgray  w-full pt-5 md:pt-0">
    <Swiper 
    className="md:border-b border-smgray aislider"
        slidesPerView={3} 
        loop={true}
        spaceBetween={0}
         modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: true, }}
        onSlideChange={(swiper) => {
          const currentIndex = swiper.realIndex;
          setActiveImage(SliderData.items[currentIndex].image);
          setBgImage(SliderData.items[currentIndex].image);
          setTouchedIndex(null); 
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          }, 
          
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
       > 
        {SliderData.items.map((item: SliderItem, index: number) => (
            <SwiperSlide key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(index)}
            onClick={() => handleTouch(index, item.image)}>
              <motion.div variants={moveUp(0.4)}
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}>
              <div className={`group itmmn h-[360px]  lg:h-[450px] xl:h-[700px] flex flex-col justify-end transition-all duration-300   
             ${
              hoveredIndex === index ? "bg-[#ffffff40]" : "bg-[#ffffff10] md:bg-transparent hover:bg-[#ffffff10]"
            } `}>
              <div className={`transition-all duration-300 px-5 py-5 lg:pb-12 ${
                  hoveredIndex === index
                    ? "opacity-100"
                    : "md:opacity-0 group-hover:opacity-100"
                }`}>
                <p className="text-white text-22 mb-2 leading-[1.3]">{item.desc}</p>
                <ul className="text-white">
                  {item.ul?.map((li, index: number) => (
                    <li key={index} className="mb-2 last:mb-0 flex items-center gap-2 libullet"><div className="w-[8px] h-[8px]   bg-secondary"></div>{li}</li>
                  ))}
                </ul>
              </div>
             <div>
             <div   className={`bgsre px-2 py-3 md:py-5 md:p-8 lg:p-10 transition-all duration-300 cursor-pointer ${
                    hoveredIndex === index
                      ? "bg-primary"
                      : "bg-primary md:bg-transparent group-hover:bg-primary"
                  }`}>
                <h3 className="text-xl xl:text-2xl leading-[1] font-normal text-white ">
                  {item.title}
                </h3>
              </div> 
             </div>
              </div>
              </motion.div>
            </SwiperSlide>
          ))}
      </Swiper>
      </motion.div>
    </div>
    </section>
    </motion.div>
  );
}

export default AiSlider;