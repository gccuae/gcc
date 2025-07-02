"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { StaticImageData } from "next/image";
import BtnPrimary from "../common/BtnPrimary";


interface NewsBlockProps {
  title: string;
  link: string;
  items: {
    title: string;
    description: string;
    image: string | StaticImageData;
    link: string;
    date: string;
    category: string;
  }[];
}
const NewsBlock = ({ title, link, items }: NewsBlockProps) => {
  return (
    <section className="pt-10 pb-12 xl:pt-[57px] xl:pb-25"> 
      <div className="container">
        <div className="flex justify-between items-center pb-8 xl:pb-[45px] mb-8 xl:mb-15 border-b border-smgray">
          <h2 className="text-5xl font-normal leading-[1.147058823529412] text-black">{title}</h2>
          <BtnPrimary link={link} text="View All" />
        </div>
        <div>
          <Swiper className="w-full home-news-swiper !pb-15" slidesPerView={1} spaceBetween={0} modules={[Pagination]} pagination={{ clickable: true }} >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center gap-4 xl:gap-[69px]">
                  <div className="lg:w-1/2">
                    <Image src={item.image} alt="newsBlockImage" width={2000} height={2000} className="w-full h-full object-cover" />
                  </div>
                  <div className="lg:w-1/2 group">
                    <div className="flex items-center justify-between mb-3 xl:mb-[28px]">
                      <button className="bg-accent px-5 py-2 transition-all duration-300 uppercase ">
                        <span className="text-foreground group-hover:text-white transition-all duration-300">{item.category}</span>
                      </button>
                      <p className="text-base font-light text-forground underline underline-offset-8">{item.date}</p>
                    </div>
                    <h3 className="text-2xl font-normal leading-[1.40625] text-forground mb-3 xl:mb-[22px]">{item.title}</h3>
                    <p className="text-lg font-light text-forground">{item.description}</p>
                    <div className="mt-4 xl:mt-[53px]">
                      <BtnPrimary link={item.link} text="Read More" />
                    </div>
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

export default NewsBlock;