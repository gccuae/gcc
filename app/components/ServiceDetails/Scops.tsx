"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { SecondSectionSecondSection } from "../expertise/type";

interface ScopsProps {
  data: SecondSectionSecondSection;
}

const Scops = ({ data }: ScopsProps) => {
  return (
    <section className="py-57px bg-black">
      <div className="container">
        <div className="mb-57px">
          <h2 className="text-5xl leading-lh-text68 font-normal text-white">
            {data.title}
          </h2>
        </div>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={40}
        allowTouchMove={false}
        simulateTouch={false}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={false}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={700}
        watchOverflow={true}
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
            <div className="px-[15px] md:px-0 border-b border-sm-gray hover:border-primary transition-colors duration-300 flex flex-col h-full justify-between">
              {/* Top: Image */}
              <div className="aspect-[4/3] md:aspect-[5/4] 2xl:aspect-auto 2xl:h-[380px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={500}
                  height={500}
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 768px) 33vw, 85vw"
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom: Title */}
              <div className="mt-4 xl:mt-[27px] h-[75px]">
                <h3 className="text-[21px] leading-normal text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Scops;
