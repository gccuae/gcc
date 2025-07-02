"use client";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import {Pagination} from "swiper/modules";
import Image from "next/image";
// import BtnPrimary from "../common/BtnPrimary";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
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
const SectorSlider = ({data}: SectorSliderProps) => {
  return ( 
    <section className="wrapper pt-6 xl:pt-[56px] pb-6 xl:pb-[120px] bg-black text-white overflow-hidden">
      <div className="container"> 
        <motion.h2 variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-[56px] ">{data.title}</motion.h2>
        <div>
          <Swiper className="!overflow-visible"
            slidesPerView={2}
            spaceBetween={0}
            modules={[Pagination]}
            pagination={false}
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
                <div className="absolute -top-1 left-0 w-full h-0 group-hover:h-[6px] bg-accent transition-all duration-300"></div>
                <div className="flex flex-col justify-between pl-4 pr-3 pt-6 xl:pl-[37px] xl:pt-[35px] xl:pr-[35px] group-first:pl-0 overflow-hidden">
                  <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex items-center justify-between mb-3 xl:mb-[25px]">
                    <Image src={item.icon} alt={item.title} width={200} height={200} className="w-auto h-15 object-contain" />
                    <Link href={item.slug} className="bg-white px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"><Image src={assets.singleGreenArrow} alt={item.title} width={200} height={200} className="w-4 xl:w-[21.5px] h-auto object-contain" /> </Link>
                  </motion.div>
                  <div>
                    <motion.h3 variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-2xl font-normal mb-4 xl:mb-[49px] group-hover:xl:mb-6 transition-all duration-300">{item.title}</motion.h3>
                    <p className="text-lg font-[300] leading-[1.526315789473684] opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 group-hover:xl:pb-[63px]">{item.description}</p>
                  </div>
                  <div className="mt-auto overflow-hidden">
                    <Image src={item.image} alt={item.title} width={600} height={600} className="w-full h-full xl:h-[400px] object-cover flex overflow-hidden" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
   );
}
 
export default SectorSlider;