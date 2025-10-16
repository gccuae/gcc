"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { Thumbs, EffectFade, Navigation, Autoplay } from "swiper/modules";
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


const SocialImpact = ({ data }: {data:SustainabilityType['thirdSection']}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [canClick, setCanClick] = useState(true);

  const handlePrev = () => {
    if (!canClick || !thumbsSwiper || !mainSwiper) return;

    setCanClick(false); // lock further clicks

    // Slide both swipers immediately
    thumbsSwiper.slidePrev();
    mainSwiper.slidePrev();

    // Unlock clicks after 600ms
    setTimeout(() => setCanClick(true), 200);
  };

  const handleNext = () => {
    if (!canClick || !thumbsSwiper || !mainSwiper) return;

    setCanClick(false); // lock further clicks

    thumbsSwiper.slideNext();
    mainSwiper.slideNext();

    setTimeout(() => setCanClick(true), 200);
  };

  const handleSlideHover = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };

  useEffect(() => {
    // Setup responsive GSAP effects
    ScrollTrigger.matchMedia({
      // Run only on tablet and above (min-width: 768px, adjust as needed)
      "(min-width: 768px)": function () {
        // Parallax images
        gsap.utils
          .toArray<HTMLElement>(".slide-container")
          .forEach((container) => {
            const img = container.querySelector(".slide-img");
            if (!img) return;

            gsap.fromTo(
              img,
              { y: "-10vh" },
              {
                y: "10vh",
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

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
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
              },
            }
          );
        });

        // Button fade
        gsap.utils.toArray<HTMLElement>(".slide-btn").forEach((btn) => {
          gsap.fromTo(
            btn,
            { y: 30, opacity: 1 }, // opacity 0 to fade in properly
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
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
      ScrollTrigger.getAll().forEach((st) => st.kill()); // cleanup
    };
  }, []);

  useEffect(() => {
    if (
      thumbsSwiper &&
      prevRef.current &&
      nextRef.current &&
      thumbsSwiper.params.navigation &&
      thumbsSwiper.params.navigation !== true
    ) {
      thumbsSwiper.params.navigation.prevEl = prevRef.current;
      thumbsSwiper.params.navigation.nextEl = nextRef.current;

      thumbsSwiper.navigation.destroy();
      thumbsSwiper.navigation.init();
      thumbsSwiper.navigation.update();
    }
  }, [thumbsSwiper]);

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
    <section className="wrapper py-57px overflow-hidden bg-black">
      <div className="container">
        <div className="flex justify-between items-center mb-6 xl:mb-[43px]">
          <motion.h2
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-5xl font-normal leading-[1.147058823529412] text-white"
          >
            {data.title}
          </motion.h2>
          <div className="flex items-center gap-2">
            <motion.div variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex border border-foreground dark:border-white rounded-full" >
              <div ref={prevRef} onClick={handlePrev}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tl-full rounded-bl-full group  cursor-pointer hover:bg-accent  transition-all duration-300"
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]" >
                  <path d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688" stroke="#7AC142" className="group-hover:stroke-white transition-all duration-300" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div
                ref={nextRef}
                onClick={handleNext}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-l border-white/30 rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-white transition-all duration-300"
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex w-[6px] h-[13px] lg:w-[10px] lg:h-[16px]"
                >
                  <path
                    d="M1.66406 1.33154L8.33269 8.00017L1.66406 14.6688"
                    stroke="#7AC142"
                    className="group-hover:stroke-white transition-all duration-300"
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
            className="area-of-expertise-thumbs greenslide"
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={4}
            modules={[Thumbs, Autoplay, Navigation]}
            allowTouchMove={false}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            watchSlidesProgress
            navigation={{
              lockClass: "my-custom-lock",
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {data.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer transition mb-4 xl:mb-[65px] group"
                onMouseOver={() => handleSlideHover(index)}
              >
                <motion.div
                  variants={moveUp()}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="transition-colors duration-400 pb-4 mb-6 xl:pb-[37px] mb-6 xl:mb-[42px] relative"
                >
                  <motion.div
                    variants={fadeIn(index * 0.25)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className={`flex items-center justify-center rounded-full bg-white w-[85px] h-[85px] border-3 border-white group-hover:border-accent transition-all duration-300 icon-wrapper`}
                  >
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      width={200}
                      height={200}
                      className="mb-2 w-10 h-10 object-contain"
                    />
                  </motion.div>
                  <div className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-smgray -z-[1]">
                    {" "}
                  </div>
                  <div className="hoverline absolute bottom-[-8px] left-0 w-0 h-[6px] bg-secondary -z-[1] transition-all duration-300 rounded-sm">
                    {" "}
                  </div>
                </motion.div>
                <motion.h3
                  variants={moveUp(index * 0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xl text-white/80 font-normal leading-sm xl:leading-[1] group-hover:text-white transition-colors duration-300"
                >
                  {item.title}
                </motion.h3>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Swiper */}
          <div className="relative">
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
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={() => {
                mainSwiper?.autoplay?.stop();
                mainSwiper?.autoplay?.start();
              }}
              className="px-6"
            >
              {data.items.map((item,index) => (
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
                        className="w-full max-w-[775px] h-[350px] lg:h-[433px] xl:h-[483px] object-cover"
                      />
                    </motion.div>

                    {/* Text */}
                    <div className="w-full">
                      <motion.h3
                        variants={moveUp()}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-2xl font-normal leading-[1.3] mb-2 xl:mb-3 text-white transition-colors duration-300"
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        variants={moveUp()}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-lg font-light leading-[1.526315789473684] transition-colors duration-300 w-full text-white/80"
                      >
                        {item.description.split("\n").map((line, i) => (
                          <span
                            key={i}
                            className="block slide-text mt-4 xl:mt-[17px]"
                          >
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
