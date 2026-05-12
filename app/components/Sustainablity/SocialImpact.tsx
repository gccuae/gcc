"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { Thumbs, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SustainabilityType } from "./type";

gsap.registerPlugin(ScrollTrigger);

const SocialImpact = ({
  data,
}: {
  data: SustainabilityType["thirdSection"];
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [canClick, setCanClick] = useState(true);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // ✅ Fix 5: Removed manual thumbsSwiper?.slidePrev() / slideNext() calls
  const handlePrev = () => {
    if (!canClick || !mainSwiper || isBeginning) return;
    setCanClick(false);
    mainSwiper.slidePrev();
    setTimeout(() => setCanClick(true), 250);
  };

  const handleNext = () => {
    if (!canClick || !mainSwiper || isEnd) return;
    setCanClick(false);
    mainSwiper.slideNext();
    setTimeout(() => setCanClick(true), 250);
  };

  const handleThumbSelect = (index: number) => {
    if (!mainSwiper || mainSwiper.realIndex === index) return;
    mainSwiper.slideToLoop(index, 900);
  };

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        gsap.utils
          .toArray<HTMLElement>(".slide-container")
          .forEach((container) => {
            const img = container.querySelector(".slide-img");
            if (!img) return;

            gsap.fromTo(
              img,
              { y: "-6vh" },
              {
                y: "6vh",
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          });

        gsap.utils.toArray<HTMLElement>(".slide-text").forEach((text) => {
          gsap.fromTo(
            text,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".slide-btn").forEach((btn) => {
          gsap.fromTo(
            btn,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
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
    <section className="wrapper pt-37px pb-47px md:py-47px xl:pt-57px xl:pb-57px overflow-hidden bg-black">
      <div className="container">
        <div className="flex justify-between items-center mb-6 md:mb-10 xl:mb-[43px]">
          <motion.h2 variants={moveUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-4xl 2xl:text-5xl font-normal leading-[1.147058823529412] text-white max-lg:max-w-[18ch]">
            {data.title}
          </motion.h2>
          <div className="flex items-center gap-2">
            <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex border border-white/50 dark:border-white/50 rounded-full">
              <div onClick={handlePrev} className={`px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tl-full rounded-bl-full group transition-all duration-300 ${isBeginning ? "cursor-not-allowed opacity-50 bg-black/30" : "cursor-pointer hover:bg-accent"}`}> 
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className="flex w-3 h-3 md:w-5 md:h-5 lg:w-[10px] lg:h-[16px]">
                  <path
                    d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688"
                    stroke="#7AC142"
                    className={`transition-all duration-300 ${isBeginning ? "" : "group-hover:stroke-white"
                      }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                onClick={handleNext}
                className={`px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-l border-white/30 rounded-tr-full rounded-br-full group transition-all duration-300 ${isEnd
                    ? "cursor-not-allowed opacity-50 bg-black/30"
                    : "cursor-pointer hover:bg-accent dark:hover:bg-accent"
                  }`}
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-3 h-3 md:w-5 md:h-5 lg:w-[10px] lg:h-[16px]">
                  <path
                    d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688"
                    stroke="#7AC142"
                    className={`transition-all duration-300 ${isEnd ? "" : "group-hover:stroke-white"
                      }`}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
        <div>
          <Swiper
            className="area-of-expertise-thumbs greenslide select-none"
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={4}
            modules={[Thumbs, Autoplay]}
            allowTouchMove={false}
            // loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            watchSlidesProgress
          >
            {data.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer transition mb-4 xl:mb-[65px] group select-none"
                onClick={() => handleThumbSelect(index)}
              >
                <motion.div
                  variants={moveUp()}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  // ✅ Fix 1 & 2: Removed duplicate mb-6 and replaced duration-400 with duration-300
                  className="transition-colors duration-300 pb-4 xl:pb-[37px] mb-6 xl:mb-[42px] relative"
                >
                  <motion.div
                    variants={fadeIn(index * 0.25)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className={`flex items-center justify-center rounded-full bg-white w-15 h-15 md:w-[85px] md:h-[85px] border-3 border-white group-hover:border-accent transition-all duration-300 icon-wrapper`}
                  >
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      width={200}
                      height={200}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-500 ease-out"
                    />
                  </motion.div>
                  <div className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-smgray dark:bg-white/50 -z-[1]">
                    {" "}
                  </div>
                  <div className="hoverline absolute bottom-[-8px] left-0 w-0 h-[6px] bg-secondary -z-[1] transition-all duration-500 ease-out rounded-sm">
                    {" "}
                  </div>
                </motion.div>
                <motion.h3
                  variants={moveUp(index * 0.12)}
                  initial="hidden"
                  animate="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xl text-white/80 font-normal leading-sm xl:leading-[1] max-w-[20ch] group-hover:text-white transition-colors duration-300"
                >
                  {item.title}
                </motion.h3>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Swiper */}
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                setMainSwiper(swiper);
                updateNavState(swiper);
              }}
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={1}
              spaceBetween={30}
              modules={[Thumbs, EffectFade, Autoplay]}
              // loop={true}
              speed={850}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5600, disableOnInteraction: true, waitForTransition: false }}
              onSlideChange={updateNavState}
              className="px-6"
            >
              {data.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="slide-container grid grid-cols-1 lg:grid-cols-2 gap-[20px] md:gap-[30px] lg:gap-[50px] xl:gap-[70px] 2xl:gap-[95px] items-center">
                    {/* Image */}
                    <motion.div
                      variants={fadeIn()}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="img-wrapper slide-img w-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={775}
                        height={483}
                        className="w-full max-w-[775px] h-[250px] md:h-[350px] lg:h-[433px] xl:h-[483px] object-cover"
                      />
                    </motion.div>

                    {/* Text */}
                    <div className="w-full">
                      <motion.h3
                        variants={moveUp()}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-2xl font-normal leading-[1.3] mb-2 xl:mb-3 text-white transition-colors duration-300 hidden lg:block"
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        variants={moveUp()}
                        viewport={{ once: true }}
                        className="text-lg font-light leading-[1.526315789473684] transition-colors duration-300 w-full text-white/80"
                      >
                        {item.description.split("\n").map((line, i) => (
                          <span key={i} className="block slide-text xl:mt-[17px]">
                            {line}
                          </span>
                        ))}
                      </motion.p>
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
};

export default SocialImpact;
