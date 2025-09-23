"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper";
import { StaticImageData } from "next/image";
import Image from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";

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

const AreaOfExpertise = ({ data }: AreaOfExpertiseProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOffset = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        setLeftOffset(rect.left + 15); // distance from viewport left
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

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

            // gsap.fromTo(
            //   img,
            //   { y: "-20vh" },
            //   {
            //     y: "20vh",
            //     ease: "none",
            //     scrollTrigger: {
            //       trigger: container,
            //       start: "top bottom",
            //       end: "bottom top",
            //       scrub: true,
            //     },
            //   }
            // );
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
              duration: 0.8,
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

  return (
    <section className="wrapper pt-37px overflow-hidden dark:bg-black">
      <div>
        <div
          ref={headingRef}
          className="flex justify-between items-center container mb-6 xl:mb-[43px]"
        >
          <h2 className="text-5xl font-normal leading-[1.147058823529412] text-black dark:text-white">
            {data.title}
          </h2>
          {/* <div className="flex items-center gap-2">
            <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex border border-foreground dark:border-white rounded-full"
            >
              <div
                ref={prevRef}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] border-r border-foreground dark:border-white rounded-tl-full rounded-bl-full group  cursor-pointer hover:bg-accent  transition-all duration-300"
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
                    d="M8.33594 1.33154L1.66731 8.00017L8.33594 14.6688"
                    stroke="#7AC142"
                    className="group-hover:stroke-white transition-all duration-300"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                ref={nextRef}
                className="px-3 py-2 md:px-6 md:py-4 xl:py-[12px] rounded-tr-full rounded-br-full cursor-pointer group hover:bg-accent dark:hover:bg-white transition-all duration-300"
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
          </div> */}
        </div>
        <div>
          <motion.div
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
            style={{ paddingLeft: `${leftOffset}px`, paddingRight: 0 }}
          >
            <Swiper
              className="area-of-expertise-thumbs relative"
              onSwiper={setThumbsSwiper}
              spaceBetween={20}
              slidesPerView={4}
              modules={[Thumbs, Autoplay, Navigation]}
              loop={true}
              speed={800}
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.4,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              watchSlidesProgress
            >
              {data.items.map((item, index) => (
                <SwiperSlide
                  key={item.id}
                  className="sliderexp cursor-pointer transition mb-4 xl:mb-5 group"
                  onClick={() => handleSlideHover(index)}
                >
                  <div className="exp-icon-div group-hover:border-primary transition-colors duration-400 pb-4 mb-6 xl:pb-[30px] xl:mb-[15px] relative flex items-center gap-5">
                    <motion.div
                      variants={fadeIn(index * 0.3)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="flex items-center justify-center rounded-full border-1 border-smgray dark:border-white w-[85px] h-[85px] group-hover:bg-primary transition-all duration-300 icon-wrapper dark:bg-[#0d0d0d]  "
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="mb-2 w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert-100"
                      />
                    </motion.div>
                    <motion.h3
                      variants={moveUp(index * 0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="text-lg text-foreground font-normal leading-sm xl:leading-[1.2] group-hover:text-primary dark:text-white transition-colors duration-300 pr-2"
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </SwiperSlide>
              ))}
              <div className="absolute bottom-[39px] lg:bottom-[39px] xl:bottom-[35px] left-0 w-full h-[2px] bg-smgray -z-[1]">
                {" "}
              </div>
            </Swiper>
          </motion.div>

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
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className="px-6"
            >
              {data.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    variants={moveUp(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="container slide-container grid md:grid-cols-2 xl:grid-cols-[6fr_4fr] items-start gap-6 xl:gap-50px bg-white dark:bg-black group"
                  >
                    <div className="img-wrapper border-r-1 border-r-smgray pr-4 xl:pr-[50px] pb-0 xl:py-5 relative overflow-hidden ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="slide-img w-full h-auto rounded object-cover "
                      />
                    </div>
                    <div className="group">
                      <h3 className="text-2xl font-normal leading-[1.5625] mb-2 xl:mb-5 dark:text-white hover:text-primary transition-all duration-300 ">
                        {" "}
                        {item.title}
                      </h3>
                      <p className="slide-text text-lg font-[300] leading-[1.526315789473684] text-foreground dark:text-white/80  transition-all duration-300 w-full">
                        {" "}
                        {item.description}
                      </p>
                      <div className="slide-btn mt-6 xl:mt-[43px] mb-4">
                        {" "}
                        <BtnPrimary
                          link={item.slug}
                          text="Read More"
                          bgtrans={false}
                        />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaOfExpertise;
