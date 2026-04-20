"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thumbs, Autoplay } from "swiper/modules";
import { SecondSection } from "../expertise/type";

interface AreaOfExpertiseProps {
  data: SecondSection;
}

const AreaOfExpertise = ({ data }: AreaOfExpertiseProps) => {
  const expertiseItems = data.items.filter((item) => item.status !== "draft");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAutoplay = () => {
    if (!mainSwiper) return;
    mainSwiper.autoplay?.stop();
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      mainSwiper.autoplay?.start();
    }, 6000);
  };

  const handlePrev = () => {
    if (!mainSwiper) return;
    mainSwiper.slidePrev();
    pauseAutoplay();
  };

  const handleNext = () => {
    if (!mainSwiper) return;
    mainSwiper.slideNext();
    pauseAutoplay();
  };

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        // Text fade
        gsap.utils.toArray<HTMLElement>(".slide-text").forEach((text) => {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: text, start: "top 80%" },
            }
          );
        });

        // Button fade
        gsap.utils.toArray<HTMLElement>(".slide-btn").forEach((btn) => {
          gsap.fromTo(
            btn,
            { y: 30, opacity: 1 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: btn,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Pause main swiper autoplay when hovering over thumbs swiper
  useEffect(() => {
    if (!thumbsSwiper || !mainSwiper) return;
    const el = thumbsSwiper.el as HTMLElement;
    const handleEnter = () => mainSwiper.autoplay?.stop();
    const handleLeave = () => mainSwiper.autoplay?.start();
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [thumbsSwiper, mainSwiper]);



  return (
    <section className="wrapper pt-30px md:pt-37px pb-5 overflow-hidden bg-light-white dark:bg-black">
      <div>
        <div className="flex justify-between items-center container mb-6 xl:mb-[43px]" >
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className=" text-4xl xl:text-5xl font-normal leading-[1.147058823529412] text-black dark:text-white"
          >
            Area of Expertise
          </motion.h2>
          <div className="flex items-center gap-2">
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex border border-foreground dark:border-white/20 rounded-full"
            >
              <div
                ref={prevRef}
                onClick={handlePrev}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-r border-foreground dark:border-white/20 rounded-tl-full rounded-bl-full group  cursor-pointer hover:bg-accent  transition-all duration-300"
              >
                {/* <Image src="/assets/img/icons/greenrightarrow.svg" alt="image" className="rotate-180 group-hover:brightness-0 group-hover:invert transition-all duration-300 min-w-[6px] min-h-[13px]" width={6} height={13} /> */}
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                  <path d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div
                ref={nextRef}
                onClick={handleNext}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-secondary transition-all duration-300"
              >
                {/* <Image src="/assets/img/icons/greenrightarrow.svg" alt="image" className="group-hover:brightness-0 group-hover:invert transition-all duration-300 min-w-[6px] min-h-[13px]" width={6} height={13} /> */}
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                  <path d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="container relative" >
          <Swiper
            className="area-of-expertise-thumbs relative"
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            slidesPerView={4}
            modules={[Thumbs]}
            allowTouchMove={false}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            watchSlidesProgress
          >
            {expertiseItems.map((item, index) => (
              <SwiperSlide key={item._id} className="sliderexp cursor-pointer transition mb-4 xl:mb-5 group" onClick={pauseAutoplay} >
                <div className="exp-icon-div pb-4 mb-6 xl:pb-[30px] xl:mb-[15px] relative flex items-center gap-5">
                  <motion.div
                    variants={fadeIn(index * 0.15)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-center justify-center flex-shrink-0 rounded-full border-1 dark:border-white/20 dark:border-white/20 w-[85px] h-[85px] group-hover:bg-primary transition-colors duration-300 icon-wrapper dark:bg-[#0d0d0d]"
                  >
                    <Image src={item.logo} alt={item.logoAlt} width={200} height={200} className="mb-2 w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert-100" />
                  </motion.div>
                  <motion.h3
                    variants={moveUp(index * 0.13)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-lg text-para-color font-normal leading-sm xl:leading-[1.2] group-hover:text-primary dark:text-white transition-colors duration-300 pr-2"
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </SwiperSlide>
            ))}
            <div className="absolute bottom-[39px] lg:bottom-[39px] xl:bottom-[35px] left-0 w-full h-[1px] bg-smgray dark:bg-white/20 -z-[1]" />
          </Swiper>
        </motion.div>

        <div className="relative  xl:mb-0">
          <Swiper
            onSwiper={setMainSwiper}
            thumbs={{ swiper: thumbsSwiper }}
            slidesPerView={1}
            spaceBetween={30}
            modules={[Thumbs, EffectFade, Autoplay]}
            loop={true}
            speed={800}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            onTouchStart={pauseAutoplay}
            className="px-6"
          >
            {expertiseItems.map((item) => (
              <SwiperSlide key={item._id}>
                <motion.div
                  variants={moveUp(0.17)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="container h-full slide-container grid md:grid-cols-2 xl:grid-cols-[6fr_4fr] items-start gap-3 md:gap-6 xl:gap-50px  group"
                >
                  <div className="img-wrapper md:border-r-1 border-r-smgray dark:border-white/20 md:pr-4 xl:pr-[50px] pb-0 xl:py-5 relative">
                    <Image
                      src={item.homeThumbnail}
                      alt={item.homeThumbnailAlt}
                      width={1000}
                      height={1000}
                      className="slide-img w-full sm:h-[300px] md:h-[400px] 2xl:h-[500px] rounded object-cover mb-2"
                    />
                  </div>
                  <div className="group">
                    <h3 className="text-2xl font-normal leading-[1.2] mb-2 xl:mb-5 dark:text-white hover:text-primary transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-lg font-[300] leading-[1.526315789473684] text-para-color dark:text-white/80 transition-all duration-300 w-full">
                      {item.description}
                    </p>
                    <div className="lg:slide-btn mt-6 xl:mt-[43px] mb-4">
                      <BtnPrimary link={"/expertise/" + item.slug} text="Read More" bgtrans={false} />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AreaOfExpertise;
