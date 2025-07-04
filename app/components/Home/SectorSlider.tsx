"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";
// import BtnPrimary from "../common/BtnPrimary";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";
import { useRef } from "react";
interface SectorSliderProps {
  data: {
    title: string;
    items: {
      id: number;
      icon: string;
      title: string;
      description: string;
      image: string;
      slug: string;
    }[];
  };
}
const SectorSlider = ({ data }: SectorSliderProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="wrapper pt-6 xl:pt-[56px] pb-6 xl:pb-[120px] bg-black text-white overflow-hidden">
      <div className="container">
        <motion.h2 variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
         className="text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-[56px] ">{data.title}</motion.h2>
        <div>
          <div className="relative">
            <div className="absolute top-4/6 -right-24 z-50 w-[50px] h-[50px] xl:w-[94px] xl:h-[94px] bg-black rounded-full flex items-center justify-center gap-6">
              {/* Custom Navigation Buttons */}
              <button ref={prevRef} className="text-accent xl:w-[12px] h-auto"><svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1L2 13L14 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
              </svg>
              </button>
              <button ref={nextRef} className="text-accent xl:w-[12px] h-auto"><svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13L1 25" stroke="#7AC142" strokeWidth="2" strokeLinecap="round" />
              </svg>
              </button>
            </div>
            <Swiper className="!overflow-visible sector-slider "
              slidesPerView={2}
              spaceBetween={0}
              // loop={true}
              modules={[Pagination, Navigation]}
              pagination={false}
              onBeforeInit={(swiper) => {
                // Bind custom navigation elements
                // @ts-expect-error: Swiper expects element or selector string, but we’re assigning a ref
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-expect-error: Swiper expects element or selector string, but we’re assigning a ref
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
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
                  slidesPerView: 2.9,
                },
              }}
            >
              {data.items.map((item, index) => (
                <SwiperSlide key={index} className="border-t-1 border-r-1 border-foreground relative group">
                  <div className="absolute -top-1 left-0 w-full h-0 group-hover:h-[6px] bg-accent transition-all duration-300 z-50"></div>
                  <div className="flex flex-col justify-between xl:max-h-[39em] overflow-hidden z-40 relative">
                    <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} 
                      className="flex items-center justify-between mb-3 xl:mb-[25px] pl-4 pr-3 pt-6 group-hover:xl:pl-[37px] group-hover:xl:pt-[35px] group-hover:xl:pr-[35px] group-first:pl-0 transition-all duration-300">
                      <Image src={item.icon} alt={item.title} width={200} height={200} className="w-auto h-15 object-contain" />
                      <Link href={item.slug} className="bg-white px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"><Image src={assets.singleGreenArrow} alt={item.title} width={200} height={200} className="w-4 xl:w-[21.5px] h-auto object-contain" /> </Link>
                    </motion.div>
                    <div className="pl-4 pr-3 pt-6 group-hover:xl:pl-[37px] group-hover:xl:pt-[35px] group-hover:xl:pr-[35px] group-first:pl-0 transition-all duration-300">
                      <motion.h3 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-2xl font-normal mb-4 xl:mb-[49px] group-hover:xl:mb-6 transition-all duration-300">{item.title}</motion.h3>
                      <p className="text-lg font-[300] leading-[1.526315789473684] opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all ease-in-out duration-300 group-hover:xl:pb-[63px] sector-description relative z-10">{item.description}</p>
                    </div>
                    <div className="mt-auto overflow-hidden pr-[15px] pl-[15px] group-first:pl-0 transition-all duration-300 relative z-20">
                      <Image src={item.image} alt={item.title} width={600} height={600} className="w-full h-full xl:h-[400px] object-cover object-top flex overflow-hidden" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectorSlider;