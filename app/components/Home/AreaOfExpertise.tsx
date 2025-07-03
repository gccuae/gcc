
"use client";
import {useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Thumbs, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper";
import { StaticImageData } from "next/image";
import Image from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients";
interface AreaOfExpertiseProps {
    data: {
        title: string;
        items: {
            id: number;
            title: string;
            description: string;
            image: string | StaticImageData;
            slug: string;
            icon: string | StaticImageData;
        }[];
    };
}
const AreaOfExpertise = ({data}: AreaOfExpertiseProps) => {
  // const thumbsSwiperRef = useRef<SwiperType | null>(null);
  // Change this line
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return ( 
    <section className="wrapper pt-6 xl:pt-[88px] overflow-hidden">
      <div className="container">
        <h2 className="text-5xl font-normal leading-[1.147058823529412] pb-4 xl:pb-[56px] text-black mb-4 xl:mb-[43px]">{data.title}</h2>
        <div>
          <Swiper className="!overflow-visible area-of-expertise-thumbs"
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={3.8}
            modules={[Thumbs]}
            loop = {true}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3.8,
              },
            }}
            watchSlidesProgress
          >
            {data.items.map((item, index) => (
              <SwiperSlide key={item.id} className="cursor-pointer transition mb-8 xl:mb-[65px] group">
                <div className="border-b-2 border-b-smgray group-hover:border-primary transition-all duration-400 pb-4 mb-4">
                  <motion.div variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex items-center justify-center rounded-full border-1 border-mdgray w-[85px] h-[85px] group-hover:bg-primary transition-all duration-300 icon-wrapper">
                    <Image src={item.icon} alt={item.title} width={200} height={200} className=" mb-2 w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert-100" />
                  </motion.div>
                </div>
                <motion.h3 variants={moveUp(index * 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-xl text-foreground font-normal leading-[2.173913043478261]">{item.title}</motion.h3>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Swiper */}
          <div className="relative">
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={1}
              spaceBetween={30}
              modules={[Thumbs, EffectFade]}
              loop={true}
              speed={800}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="px-6"
            >
              {data.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="grid md:grid-cols-2 items-center gap-6 bg-white">
                    <div className="border-r-2 border-r-smgray pr-4 pb-4 xl:pr-10 xl:pb-10">
                      <Image src={item.image} alt={item.title} width={1000} height={1000} className="w-full h-auto rounded object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-normal leading-[1.5625] mb-2">{item.title}</h3>
                      <p className="text-lg font-[300] leading-[1.526315789473684] text-foreground">{item.description}</p>
                      <div className="mt-6 xl:mt-[43px] mb-4">
                        <BtnPrimary link={item.slug} text="Read More" bgtrans={false}/>
                      </div>
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
 
export default AreaOfExpertise;